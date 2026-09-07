<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# Ambari 开发 {#ambari-development}

## 检出 Ambari 源代码 {#checking-out-ambari-source}

请按照“如何贡献”指南中的[检出源代码](./how-to-contribute.md)部分操作。

本文将顶层的 "ambari" 目录称为 `AMBARI_DIR`。

## 构建 Ambari 所需的工具 {#tools-needed-to-build-ambari}

从源代码构建 Ambari 需要以下工具。

也可以直接启动已预配置全部所需工具的 VM。请参阅[快速入门指南](../quick-start/quick-start-guide.md)中的**预配置开发环境**部分。

- xCode（使用 Mac 时，可从 Apple Store 免费下载）
- JDK 8（Ambari 2.6 及更低版本可使用 JDK 7 编译；从 Ambari 2.7 开始，至少需要 JDK 8）
- [Apache Maven](http://maven.apache.org/download.html) 3.3.9 或更高版本。提示：要持久化对 JAVA_HOME 环境变量的修改并将 Maven 添加到路径，请创建以下文件：文件：~/.profile

```bash
source ~/.bashrc
```

文件：~/.bashrc

```bash
export PATH=/usr/local/apache-maven-3.3.9/bin:$PATH
export JAVA_HOME=$(/usr/libexec/java_home)
export _JAVA_OPTIONS="-Xmx2048m -XX:MaxPermSize=512m -Djava.awt.headless=true"
```

- Python 2.6（Ambari 2.7 或更高版本要求 Python 2.7 作为最低支持版本）
- Python setuptools：对于 Python 2.6：[下载](http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg#md5=bfa92100bd772d5a213eedd356d64086) setuptools 并运行：

```bash
sh setuptools-0.6c11-py2.6.egg
```

对于 Python 2.7：[下载](https://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg#md5=fe1f997bc722265116870bc7919059ea) setuptools 并运行：

```bash
sh setuptools-0.6c11-py2.7.egg
```

- rpmbuild（rpm-build 软件包）
- g++（gcc-c++ 软件包）

## 运行单元测试 {#running-unit-tests}

- `mvn clean test`
- 在单个模块中运行单元测试：

```bash
mvn -pl ambari-server test
```

- 仅运行 Java 测试：

```bash
mvn -pl ambari-server -DskipPythonTests
```

- 仅运行指定的 Java 测试：

```bash
mvn -pl ambari-server -DskipPythonTests -Dtest=AgentHostInfoTest test
```

- 仅运行 Python 测试：

```bash
mvn -pl ambari-server -DskipSurefireTests test
```

- 仅运行指定的 Python 测试：

```bash
mvn -pl ambari-server -DskipSurefireTests -Dpython.test.mask=TestUtils.py test
```

- 仅运行 Checkstyle 和 RAT 检查：

```bash
mvn -pl ambari-server -DskipTests test
```

注意：运行单元测试前，请确保 npm 已在路径中。

## 生成 Findbugs 报告 {#generating-findbugs-report}

- mvn clean install

这将在 target/findbugs 下生成 xml 和 html 报告。也可以添加跳过单元测试的参数，以更快生成报告。

## 构建 Ambari {#building-ambari}

注意：如果构建时出现打开文件过多的错误，请运行：例如 ulimit -n 10000。

要构建 Ambari RPM，请运行以下命令。

注意：将 `${AMBARI_VERSION}` 替换为希望构件使用的四位版本（例如 -DnewVersion=1.6.1.1）。

**注意**：如果由于缺少 jms、jmxri、jmxtools 构件而在编译 ambari-metrics 软件包时遇到错误：

```
[ERROR] Failed to execute goal on project ambari-metrics-kafka-sink: Could not resolve dependencies for project org.apache.ambari:ambari-metrics-kafka-sink:jar:2.0.0-0: The following artifacts could not be resolved: javax.jms:jms:jar:1.1, com.sun.jdmk:jmxtools:jar:1.2.1, com.sun.jmx:jmxri:jar:1.2.1: Could not transfer artifact javax.jms:jms:jar:1.1 from/to java.net (https://maven-repository.dev.java.net/nonav/repository): No connector available to access repository java.net (https://maven-repository.dev.java.net/nonav/repository) of type legacy using the available factories WagonRepositoryConnectorFactory
```

解决方法是手动安装这三个缺少的构件：

```
mvn install:install-file -Dfile=jms-1.1.pom -DgroupId=javax.jms -DartifactId=jms -Dversion=1.1 -Dpackaging=jar
mvn install:install-file -Dfile=jmxtools-1.2.1.pom -DgroupId=com.sun.jdmk -DartifactId=jmxtools -Dversion=1.2.1 -Dpackaging=jar
mvn install:install-file -Dfile=jmxri-1.2.1.pom -DgroupId=com.sun.jmx -DartifactId=jmxri -Dversion=1.2.1 -Dpackaging=jar

If when compiling it seems stuck, and you've already increased Java and Maven heapsize, it could be that Ambari Views has a lot of artifacts, and the rat-check is choking up. In this case, try running

git clean -df (this will remove untracked files and directories)
mvn clean package -DskipTests -Drat.ignoreErrors=true
or
mvn clean package -DskipTests -Drat.skip
```

## 使用 Maven 设置版本 {#setting-the-version-using-maven}

Ambari 2.8+ 在构建 Ambari 时使用更新版本的方法来更新版本。

**RHEL/CentOS 6**：

```
# Update the revision property to the release version
mvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0

mvn -B clean install package rpm:rpm -DskipTests -Dpython.ver="python >= 2.6" -Preplaceurl
```

**SUSE/SLES 11**

```
# Update the revision property to the release version
mvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0

mvn -B clean install package rpm:rpm -DskipTests -Psuse11 -Dpython.ver="python >= 2.6" -Preplaceurl
```

**Ubuntu 12**：

```
# Update the revision property to the release version
mvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0

mvn -B clean install package jdeb:jdeb -DskipTests -Dpython.ver="python >= 2.6" -Preplaceurl
```

Ambari Server 将创建以下软件包：

- RPM 将创建在 `AMBARI_DIR`/ambari-server/target/rpm/ambari-server/RPMS/noarch 下。
- DEB 将创建在 `AMBARI_DIR`/ambari-server/target/ 下。

Ambari Agent 将创建以下软件包：

- RPM 将创建在 `AMBARI_DIR`/ambari-agent/target/rpm/ambari-agent/RPMS/x86_64 下。
- DEB 将创建在 `AMBARI_DIR`/ambari-agent/target 下。

可选参数：

- -X -e：添加这些选项以获得 Maven 更详细的输出，对调试 Maven 问题很有用。
- -DdefaultStackVersion=STACK-VERSION
- 设置用于安装的默认 Stack 和版本（例如 -DdefaultStackVersion=HDP-1.3.0）
- -DenableExperimental=true
- 启用可通过 Ambari Web 使用的实验性功能（默认值为 false）
- 添加 _-Dviews_ 参数即可将所有视图打包到 RPM 中
  - _mvn -B clean install package rpm:rpm -Dviews -DskipTests_
- 在 _-Dviews_ 中添加 `--projects` 参数即可构建指定视图
  - _mvn -B clean install package rpm:rpm --projects ambari-web,ambari-project,ambari-views,ambari-admin,contrib/views/files,contrib/views/pig,ambari-server,ambari-agent,ambari-client,ambari-shell -Dviews -DskipTests_

_注意：以下所有操作均以 `root` 身份运行。_

## 构建 Ambari Metrics {#building-ambari-metrics}

如果计划安装 Ambari Metrics 服务，还需要构建 Ambari Metrics 项目。

```bash
cd ambari-metrics
mvn clean package -Dbuild-rpm -DskipTests

For Ubuntu:
cd ambari-metrics
mvn clean package -Dbuild-deb -DskipTests
```

**注意：**

指标 RPM 位于 ambari-metrics-assembly/target/。安装 Ambari Metrics 服务需要这些文件。

## 运行 Ambari Server {#running-the-ambari-server}

首先安装 Ambari Server RPM。

**在 RHEL/CentOS 上：**

```bash
yum install ambari-server/target/rpm/ambari-server/RPMS/noarch/ambari-server-*.noarch.rpm
```

在 SUSE/SLES 上：

```bash
zypper install ambari-server/target/rpm/ambari-server/RPMS/noarch/ambari-server-*.noarch.rpm
```

**在 Ubuntu 12 上：**

```bash
dpkg --install ambari-server/target/ambari-server-*.deb          # Will fail with missing dependencies errors
apt-get update                                                   # Update locations of dependencies
apt-get install -f                                               # Install all failed dependencies
dpkg --install ambari-server/target/ambari-server-*.deb          # Will succeed
```

初始化 Ambari Server：

```bash
ambari-server setup
```

启动 Ambari Server：

```
ambari-server start
```

查看 Ambari Server 日志：

```bash
tail -f /var/log/ambari-server/ambari-server.log
```

要访问 Ambari，请在浏览器中打开

```
http://{ambari-server-hostname}:8080
```

并使用用户名和密码登录。

## 在集群的每台主机上手动安装并启动 Ambari Agent {#install-and-start-the-ambari-agent-manually-on-each-host-in-the-cluster}

安装 Ambari Agent RPM。

在 RHEL/CentOS 上：

在 SUSE/SLES 上：

```bash
zypper install ambari-agent/target/rpm/ambari-agent/RPMS/x86_64/ambari-agent-*.rpm
```

Ubuntu12：

```bash
dpkg --install ambari-agent/target/ambari-agent-*.deb
```

编辑 /etc/ambari-agent/conf/ambari-agent.ini 中的 _hostname_ 行，设置 Ambari Server 的位置。

启动 Ambari Agent：

```
ambari-agent start
```

查看 Ambari Agent 日志：

```bash
tail -f /var/log/ambari-agent/ambari-agent.log
```

## 在 Eclipse 中设置 Ambari {#setting-up-ambari-in-eclipse}

```
$ mvn clean eclipse:eclipse
```

完成上述操作后，可以通过 Eclipse 的 “Import > Maven > Existing Maven Project” 导入项目。选择克隆 git 仓库的根目录，即可在 Eclipse 中看到以下项目：

```
ambari
|
|- ambari-project
|- ambari-server
|- ambari-agent
|- ambari-web
```

选择顶层的 “ambari pom.xml”，然后点击 Finish。
