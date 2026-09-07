---
title: 在 Docker 中开发
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--->

# 在 Docker 中开发 {#development-in-docker}

## 概述 {#overview}

本页介绍如何在 Docker 上开发、构建和测试 Ambari。

为了构建 Ambari，需要执行相当多的步骤，过程有些繁琐。你可以在 Docker 中构建一个环境，然后直接开始工作！

这并不是为了在 Docker 中运行生产级别的 Ambari（不过你可以在单个 Docker 容器中运行 Ambari 并部署 Hadoop，用于测试）。

![](@site/versioned_docs/version-3.0.0/ambari-dev/imgs/with-without-docker.png)

（这不仅适用于 Jenkins slave，也可以是你的笔记本电脑。）

首先，我们将创建一个包含 Ambari 所需全部第三方库的 Docker image。

其次，在 Docker 主机上准备代码。代码可以是 trunk、某个分支、正在开发的代码，或已经应用补丁的代码。请注意，代码不位于 Docker 容器内部，而是在 Docker 主机上，并通过 Docker volume（类似 mount）链接到容器。

现在就可以开始了！

### 源代码 {#source-code}

此代码已迁移到 Ambari trunk。

https://github.com/apache/ambari/tree/trunk/dev-support/docker

## 要求 {#requirements}

如果要按照本文操作，需要满足一些系统要求。

- Docker https://docs.docker.com/#installation-guides

## 创建 Docker Image {#create-docker-image}

首先需要为此方案构建一个 Docker image。这将设置包括 yum 中的库和 maven 依赖在内的各项依赖。在我的环境中（Centos 6.5 VM，8GB 内存和 4 个 CPU）需要 30 分钟。好消息是这只需执行一次。

```bash
git clone https://github.com/apache/ambari.git
cd ambari
docker build -t ambari/build ./dev-support/docker/docker
```

这将从 ./dev-support/docker/docker 下的配置文件构建名为 "ambari/build" 的 image。

## 单元测试 {#unit-test}

例如，trunk 上的单元测试 Jenkins job 在 Docker 上运行。如果要复现该环境，请阅读本节。

基本命令：

```bash
cd {ambari_root}
docker run --privileged -h node1.mydomain.com -v $(pwd):/tmp/ambari ambari/build /tmp/ambari/dev-support/docker/docker/bin/ambaribuild.py test -b
```

- 'docker run' 是从 image 运行容器的命令。运行的是哪个 image？即 'ambari/build'。
- -h 设置容器中的主机名。
- -v 将主机上的 Ambari 代码挂载到容器的 /tmp。请确保当前位于 Ambari 根目录。
- ambaribuild.py 运行一些脚本，最终为 ambari 运行 'mvn test'。
- -b 选项用于重新构建整个源代码树。如果省略该选项，则按主机上的当前状态运行测试。

## 部署 Hadoop {#deploy-hadoop}

你可能希望运行 Ambari 和 Hadoop，以测试刚刚在主机上编写的改进。方法如下！

```bash
cd {ambari_root}
docker run --privileged -t -p 80:80 -p 5005:5005 -p 8080:8080 -h node1.mydomain.com --name ambari1 -v $(pwd):/tmp/ambari ambari/build /tmp/ambari-build-docker/bin/ambaribuild.py deploy -b
  
# once your are done
docker kill ambari1 && docker rm ambari1
```

- --privileged 很重要，因为 ambari-server 会访问 /proc/??/exe。
- -p 80:80 确保你可以从主机访问 Web UI。
- -p 5005 是 Java 调试端口。
- 'deploy' 用于构建、安装 rpm、启动 ambari-server 和 ambari-agent，并通过 blueprint 部署 Hadoop。

你可以查看 [https://github.com/apache/ambari/tree/trunk/dev-support/docker/docker/blueprints](https://github.com/apache/ambari/tree/trunk/dev-support/docker/docker/blueprints)，了解实际部署的内容。

还可以尝试其他一些参数。

```bash
cd {ambari_root}
docker run --privileged -t -p 80:80 -p 5005:5005 -p 8080:8080 -h node1.mydomain.com --name ambari1 -v ${AMBARI_SRC:-$(pwd)}:/tmp/ambari ambari/build /tmp/ambari-build-docker/bin/ambaribuild.py [test|server|agent|deploy] [-b] [-s [HDP|BIGTOP|PHD]]
```

- test: mvn test
- server: 安装并运行 ambari-server
- agent: 安装并运行 ambari-server 和 ambari-agent
- deploy: 安装并运行 ambari-server 和 ambari-agent，并部署 hadoop
