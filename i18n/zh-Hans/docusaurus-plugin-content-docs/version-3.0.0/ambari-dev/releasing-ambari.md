---
title: 发布 Ambari
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 发布 Ambari {#releasing-ambari}

## 有用链接 {#useful-links}

### [发布 Maven 构件](http://apache.org/dev/publishing-maven-artifacts.html) {#publishing-maven-artifacts}

- 设置发布签名密钥
- 将构件上传到暂存和发布仓库

### [Apache 发布指南](http://www.apache.org/legal/release-policy.html) {#apache-release-guidelines}

- 发布要求
- 暂存流程

## 发布准备 {#preparing-for-release}

首次担任发布经理的准备工作

如果你第一次担任发布经理，需要执行以下额外步骤，以免在实际发布过程中受阻。

**配置到 home.apache.org 的 SSH/SFTP**

home.apache.org 上的 SFTP 仅支持基于密钥的 SSH 登录

```bash
# Generate RSA Keys
 mkdir ~/.ssh
 chmod 700 ~/.ssh
 ssh-keygen -t rsa -b 4096

# Note: This will create ~/.ssh/id_rsa and ~/.ssh/id_rsa.pub files will be generated

# Upload Public RSA Key
Login at http://id.apache.org
Add Public SSH Key to your profile from ~/.ssh/id_rsa.pub
SSH Key (authorized_keys line):
Submit changes

# Verify SSH to minotaur.apache.org works
ssh -i ~/.ssh/id_rsa {username}@minotaur.apache.org

# SFTP to home.apache.org
sftp {username}@home.apache.org
mkdir public_html
cd public_html
put test #This test file is a sample empty file present in current working directory from which you sftp.

Verify URL http://home.apache.org/{username}/test
```

**生成 OpenGPG 密钥**

你应获取一个签名密钥，将其保存在安全位置，将公钥上传到 Apache，并建立信任网络。

参考：http://zacharyvoase.com/2009/08/20/openpgp/

```bash
gpg2 --gen-key
gpg2 --keyserver pgp.mit.edu --send-key {key}
gpg2 --armor --export {username}@apache.org > {username}.asc
Copy over {username}.asc to {username}@home.apache.org:public_html/~{username}.asc
Verify URL http://home.apache.org/~{username}/{username}.asc
Query PGP KeyServer http://pgp.mit.edu:11371/pks/lookup?search=0x{key}&op=vindex

Web of Trust:
Request others to sign your PGP key.

Login at http://id.apache.org
Add OpenPGP Fingerprint to your profile
OpenPGP Public Key Primary Fingerprint: XXXX YYYY ZZZZ ....
Submit changes
Verify that the public PGP key is exported to http://home.apache.org/keys/committer/{username}.asc
```

**至少提前一周向 dev@ambari.apache.org 邮件列表发送邮件，通知将创建发布分支**

```
Subject: Preparing Ambari X.Y.Z branch

Hi developers and PMCs,

I am proposing cutting a new branch branch-X.Y for Ambari X.Y.Z on __________  as per the outlined tasks in the Ambari Feature + Roadmap page (https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=30755705).

After making the branch, we (i.e., development community) should only accept blocker or critical bug fixes into the branch and harden it until it meets a high enough quality bar.

If you have a bug fix, it should first be committed to trunk, and after ensuring that it does not break any tests (including smoke tests), then it should be integrated to the Ambari branch-X.Y
If you have any doubts whether a fix should be committed into branch-X.Y, please email me for input at ____________
Stay tuned for updates on the release process.

Thanks
```

**创建发布分支**

使用 branch-X.Y（例如 branch-2.1）作为分支名称创建发布分支。

注意：今后应创建 branch-[majorVersion].[minorVersion]，这样同一分支可用于维护版本。

**检出发布分支**

```bash
git checkout branch-X.Y
```

**更新 Ambari REST API 文档**

从 Ambari 2.8 开始，针对 Ambari 的 `<span>trunk</span>` 分支，发布经理应根据现有源代码生成文档。执行发布前，应将文档提交回分支。

```bash
# Generate the following artifacts:
# - Configuration markdown at docs/configuration/index.md
# - swagger.json and index.html at docs/api/generated/
cd ambari-server/
mvn clean compile exec:java@configuration-markdown test -Drat.skip -Dcheckstyle.skip -DskipTests -Dgenerate.swagger.resources

# Review and Commit the changes to branch-X.Y
git commit
```

**更新发布版本**

创建分支后必须设置并提交发布版本。更改应提交到发布分支。

**Ambari 2.8+**

从 Ambari 2.8 开始，构建过程依赖 [Maven 3.5+，它允许](https://maven.apache.org/maven-ci-friendly.html) [使用 `${revision}` 标签](https://maven.apache.org/maven-ci-friendly.html)。这意味着可以在根 `pom.xml` 中定义一次发布版本，然后由所有子模块继承。要使用特定构建号构建 Ambari，有两种方式：

```bash
mvn -Drevision=2.8.0.0.0 ...
Editing the root pom.xml to include the new build number
<revision>2.8.0.0-SNAPSHOT</revision>
```

为与之前的发布版本保持一致，应更新 `pom.xml` 以包含新版本。

**作为参考的 2.8.0 发布步骤**

```bash
# Update the revision property to the release version
mvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0

# Remove .versionsBackup files
git clean -f -x

# Review and commit the changes to branch-X.Y
git commit
```

:::danger Ambari 2.7 及更早版本发布（已弃用） :::

旧版 Ambari 分支仍要求按照以下流程手动更新每个 `pom.xml`：

**作为参考的 2.2.0 发布步骤**

```bash
# Update the release version
mvn versions:set -DnewVersion=2.2.0.0.0
pushd ambari-metrics
mvn versions:set -DnewVersion=2.2.0.0.0
popd
pushd contrib/ambari-log4j
mvn versions:set -DnewVersion=2.2.0.0.0
popd
pushd contrib/ambari-scom
mvn versions:set -DnewVersion=2.2.0.0.0
popd
pushd docs
mvn versions:set -DnewVersion=2.2.0.0.0
popd

# Update the ambari.version properties in all pom.xml
$ find . -name "pom.xml" | xargs grep "ambari\.version"

./contrib/ambari-scom/ambari-scom-server/pom.xml:        2.1.0-SNAPSHOT
./contrib/ambari-scom/ambari-scom-server/pom.xml:            ${ambari.version}
./contrib/views/hive/pom.xml:    2.1.0.0.0
./contrib/views/jobs/pom.xml:        ${ambari.version}
./contrib/views/pig/pom.xml:    2.1.0.0.0
./contrib/views/pom.xml:    2.1.0.0.0
./contrib/views/storm/pom.xml:      ${ambari.version}
./contrib/views/tez/pom.xml:      ${ambari.version}
./docs/pom.xml:        2.1.0
./docs/pom.xml:        ${project.artifactId}-${ambari.version}

# Update any 2.1.0-SNAPSHOT references in pom.xml
$ grep -r --include "pom.xml" "2.1.0-SNAPSHOT" .

# Remove .versionsBackup files
git clean -f -x -d

# Review and commit the changes to branch-X.Y
git commit
```

**更新 KEYS**

如果这是你第一次承担发布管理职责，请确保更新 KEYS 文件，并将更新后的 KEYS 同时提交到 ambari trunk 分支和发布分支。此外，除了更新代码树中的 KEYS 文件，还需要将 KEYS 文件推送到 [https://dist.apache.org/repos/dist/release/ambari/](https://dist.apache.org/repos/dist/release/ambari/)。

```bash
gpg2 --list-keys jluniya@apache.org >> KEYS
gpg2 --armor --export jluniya@apache.org >> KEYS

# commit the changes to both trunk and new release branch
git commit

# push the updated KEYS file to https://dist.apache.org/repos/dist/release/ambari/.

# Only PMCs members can do this 'svn' step.

svn co https://dist.apache.org/repos/dist/release/ambari ambari_svn
cp {path_to_keys_file}/KEYS ambari_svn/KEYS
svn update KEYS
svn commit -m "Updating KEYS for Ambari"
```

**设置构建**

在 http://builds.apache.org 上为新分支设置 Jenkins 作业。

## 创建发布候选版本 {#creating-release-candidate}

```
Note: The first release candidate is rc0. The following documented process assumes rc0, but replace it with the appropriate rc number as required.

```

**检出发布分支**

```
git checkout branch-X.Y
```

**从发布分支创建发布标签**

```bash
git tag -a release-X.Y.Z-rc0 -m 'Ambari X.Y.Z RC0'
git push origin release-X.Y.Z-rc0
```

**创建 tar 包**

```bash
# create a clean copy of the source
 cd ambari-git-X.Y.Z
 git clean -f -x -d
 cd ..

 cp -R ambari-git-X.Y.Z apache-ambari-X.Y.Z-src

 # create ambari-web/public by running the build instructions per https://cwiki.apache.org/confluence/display/AMBARI/Ambari+Development
 # once ambari-web/public is created, copy it as ambari-web/public-static
 cp -R ambari-git-X.Y.Z/ambari-web/public apache-ambari-X.Y.Z-src/ambari-web/public-static

 # make sure apache rat tool runs successfully
 cp -R apache-ambari-X.Y.Z-src apache-ambari-X.Y.Z-ratcheck
 cd apache-ambari-X.Y.Z-ratcheck
 mvn clean apache-rat:check
 cd ..

 # if rat check fails, file JIRAs and fix them before proceeding.

 # tar it up, but exclude git artifacts
 tar --exclude=.git --exclude=.gitignore --exclude=.gitattributes -zcvf apache-ambari-X.Y.Z-src.tar.gz apache-ambari-X.Y.Z-src
```

**签署 tar 包**

```bash
gpg2  --armor --output apache-ambari-X.Y.Z-src.tar.gz.asc --detach-sig apache-ambari-X.Y.Z-src.tar.gz
```

**生成 SHA512 校验和：**

```
sha512sum apache-ambari-X.Y.Z-src.tar.gz > apache-ambari-X.Y.Z-src.tar.gz.sha512
```

或

```
openssl sha512 apache-ambari-X.Y.Z-src.tar.gz > apache-ambari-X.Y.Z-src.tar.gz.sha512
```

**将构件上传到 Apache 主目录：**

随后需要通过 SFTP 将构件复制到

```
public_html/apache-ambari-X.Y.Z-rc0
```

## 对发布候选版本投票 {#voting-on-release-candidate}

**在 dev@ambari.apache.org 邮件列表中发起投票，例如：**

我已创建 ambari-** 发布候选版本。

GIT 源代码标签（r***）

```
https://git-wip-us.apache.org/repos/asf/ambari/repo?p=ambari.git;a=log;h=refs/tags/release-x.y.z-rc0
```

暂存站点：http://home.apache.org/user_name/apache-ambari-X.Y.Z-rc0

投票将开放 72 小时。

```
[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove (and reason why)
```

投票通过/失败后，向 dev@ambari.apache.org 发送主题类似“[RESULT] [VOTE] Apache Ambari x.y.z rc0”的邮件。投票通过需要 3 个 +1 票。如果投票未通过，则需在处理社区反馈后创建另一个发布候选版本。

## 发布和公告 {#publishing-and-announcement}

- 登录 [https://id.apache.org](https://id.apache.org)，确认上面用于签名的 PGP 密钥指纹已提供。（gpg --fingerprint）
- 只将 PGP 公钥上传到 _/home/_

按以下方式发布版本：

```bash
svn co https://dist.apache.org/repos/dist/release/ambari ambari

# Note : Only PMCs members can do this 'svn' step.

cd ambari
mkdir ambari-X.Y.Z
scp ~/public_html/apache-ambari-X.Y.Z-rc0/* ambari-X.Y.Z
svn add ambari-X.Y.Z
svn rm ambari-A.B.C  # Remove the older release from the mirror.  Only the latest version should appear in dist.

svn commit -m "Committing Release X.Y.Z"
```

创建发布标签：

```bash
git tag -a release-X.Y.Z -m 'Ambari X.Y.Z'
git push origin release-X.Y.Z
```

注意，更改需要 24 小时才能传播到镜像。

等待 24 小时并确认镜像中可用这些文件后，再发送公告。

**更新 Ambari 网站和 Wiki**

http://ambari.apache.org 的 Git 检出目录为 `/ambari/docs/src/site`。

```bash
cd docs
mvn versions:set -DnewVersion=X.Y.Z

# Make necessary changes, typically to pom.xml, site.xml, index.apt, and whats-new.apt
mvn clean site
```

检查 _/ambari/docs/target_ 文件夹中的更改。

更新 wiki，添加新版本的安装页面。_通常可以复制上一版本的页面，并修改 URL 使其指向新的仓库/tar 包位置。_

**向 dev@ambari.apache.org 和 user@ambari.apache.org 发送公告。**

主题：[ANNOUNCE] Apache Ambari X.Y.Z。

Apache Ambari 团队很自豪地宣布 Apache Ambari X.Y.Z 版本。

Apache Ambari 是一个用于配置、管理和监控 Apache Hadoop 集群的工具。Ambari 由一组 RESTful API 和基于浏览器的管理控制台 UI 组成。

发布文件位于：http://www.apache.org/dyn/closer.cgi/ambari/ambari-X.Y.Z

要使用发布文件，请参阅以下文档：

https://cwiki.apache.org/confluence/display/AMBARI/Installation+Guide+for+Ambari+X.Y.Z

感谢所有让本次发布成为可能的贡献者。

此致

Ambari 团队

**向 Apache reporter 数据库提交发布数据。**

此步骤只能由项目 PMC 完成。如果发布经理不是 Ambari PMC，请联系现有 Ambari PMC 或 Ambari PMC 主席完成此步骤。

- 使用 Apache 凭据登录 https://reporter.apache.org/addrelease.html?ambari
- 填写字段：
  - 委员会：ambari
  - 完整版本名称：2.2.0
  - 发布日期（YYYY-MM-DD）：2015-12-19
- 提交数据
- 确认提交的数据显示在 https://reporter.apache.org/?ambari

执行此步骤可保持 [https://reporter.apache.org/?ambari](https://reporter.apache.org/?ambari) 网站更新，使用 Apache Reporter Service 的人员可以看到 Ambari 的最新发布数据。

## 将 Ambari 构件发布到 Maven central {#publish-ambari-artifacts-to-maven-central}

请使用以下[文档](https://docs.google.com/document/d/1RjWQOaTUne6t8DPJorPhOMWAfOb6Xou6sAdHk96CHDw/edit)将 Ambari 构件发布到 Maven central。
