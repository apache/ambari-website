---
title: 编译 Ambari Bigtop Stack 的组件
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# 编译 Ambari Bigtop Stack 的组件 {#compiling-components-for-ambari-bigtop-stack}

## 简介 {#introduction}

Apache Bigtop 面向希望全面打包、测试和配置主流开源大数据组件的基础设施工程师和数据科学家。Bigtop 支持众多组件/项目，包括但不限于 Hadoop、HBase 和 Spark。本指南专门介绍如何编译 **Ambari Bigtop Stack** 的组件。

## Apache Bigtop 的使用场景 {#use-cases-for-apache-bigtop}

1. **简化软件包构建**：Bigtop 通过预配置的 Docker 镜像，显著简化了在不同操作系统上为大数据组件编译 RPM 或 DEB 软件包的过程，使其快速高效。

2. **依赖管理**：Bigtop 集成编译过程中所需的复杂依赖，通过代码补丁有效解决常见编译错误，确保编译顺利进行。这意味着用户不再需要担心官方软件包无法编译或搭建复杂的编译环境。

3. **Apache Ambari 支持**：Bigtop 支持 Apache Ambari，用户可以轻松打包与 Ambari 兼容且满足安装要求的大数据软件。

## 开始使用 Bigtop {#getting-started-with-bigtop}

本指南以官方 Bigtop 3.3.0 和 CentOS 7 编译操作系统为例。其他系统和版本的操作步骤相同。

### 前置条件 {#prerequisites}

- Linux 环境
- 系统已安装 Docker
- Git

### 分步指南 {#step-by-step-guide}

#### 1. 创建开发目录 {#1-create-a-development-directory}

```bash
mkdir ~/dev/
```

#### 2. 克隆 Bigtop 仓库 {#2-clone-bigtop-repository}

```bash
cd ~/dev/
git clone https://github.com/apache/bigtop.git
```

#### 3. 切换到 3.3.0 版本 {#3-switch-to-version-330}

```bash
cd bigtop
git checkout release-3.3.0
```

#### 4. 拉取 Bigtop CentOS 7 编译环境镜像 {#4-pull-the-bigtop-centos-7-compilation-environment-image}

```bash
# If you need to compile for other operating systems or architectures (e.g., ARM),
# you can search for the corresponding Bigtop version in the image repository
# https://hub.docker.com/r/bigtop/slaves/tags
docker pull bigtop/slaves:3.3.0-centos-7
```

#### 5. 启动容器 {#5-launch-the-container}

**场景 1**：如果此前已在本地编译过大数据组件并拥有 Maven 仓库缓存，最好将该目录映射到容器默认的 Maven 下载目录，以避免重复下载软件包。

例如，本地 Maven 仓库目录为 `/data/repository`：

```bash
cd ~/dev/bigtop
docker run -d -it --network host -v `pwd`:/ws -v /data/repository:/root/.m2/repository --workdir /ws --name bigtopr bigtop/slaves:3.3.0-centos-7
```

**场景 2**：如果本地没有 Maven 缓存或对此不熟悉，仍应将一个目录映射到 Bigtop 容器，以便利用已下载的 Maven 缓存进行重复编译。否则删除容器后 Maven 缓存也会丢失，而依赖下载是重新编译最耗时的阶段。

```bash
mkdir -p ~/m2/repository
cd ~/dev/bigtop
docker run -d -it --network host -v `pwd`:/ws -v ~/m2/repository:/root/.m2/repository --workdir /ws --name bigtopr bigtop/slaves:3.3.0-centos-7
```

#### 6. 修改 Maven 仓库设置（可选） {#6-modify-maven-repository-settings-optional}

可以配置 Maven 使用对于所在位置更快的镜像。此步骤可选，但能显著提高下载速度。

1. 进入容器：
```bash
docker exec -it bigtopr /bin/bash
```

2. 编辑 Maven 设置文件：
```bash
vi /usr/local/maven/conf/settings.xml
```

3. 根据所在位置添加适当的镜像仓库。例如：

```xml
<mirrors>
  <mirror>
    <id>central-mirror</id>
    <mirrorOf>central</mirrorOf>
    <name>Central Repository Mirror</name>
    <url>https://repo1.maven.org/maven2/</url>
  </mirror>
  <!-- Add other mirrors as needed -->
</mirrors>
```

#### 7. 编译大数据组件 {#7-compile-big-data-components}

进入正在运行的容器：

```bash
docker exec -it bigtopr /bin/bash
```

编译组件：

```bash
. /etc/profile.d/bigtop.sh
./gradlew flink-clean flink-pkg -PparentDir=/usr/bigtop -PpkgSuffix -PbuildThreads=2C repo
```

**编译参数说明**：

- `-PparentDir=/usr/bigtop`：更改软件包的默认安装路径，使 Bigtop 构建的软件包符合 Ambari 安装规范。
- `-PpkgSuffix`：使输出软件包包含 Bigtop 版本号（例如 hadoop_3_3_0），符合 Ambari Bigtop 服务规范。
- `-PbuildThreads=2C`：设置编译线程数（CPU 核数的 2 倍）。

## 并行编译以提高性能 {#parallel-compilation-for-improved-performance}

社区已提交加速构建过程的并行编译拉取请求，目前正在审核中。合并后，Bigtop 中所有 Java 组件都可以并行编译，预计将在 Bigtop 3.3.1 之后的版本中提供。

依赖全部下载完成后的并行编译性能对比：

| 组件 | 之前耗时 | 之后耗时 |
|------------|-------------|------------|
| Alluxio | 21min | 07:43min |
| Hive | 05:33min | 03:04min |
| HBase | 06:18min | 02:55min |
| Zookeeper | 01:25min | 35s |
| Livy | 03:29min | 03:12min |
| Phoenix | 11:23min | 05:32min |
| Zeppelin | 14:15min | 13:19min |
| Flink | 36:27min | 14:16min |
| Hadoop | 50min | 16min |

并行编译命令示例：

```bash
docker run -d -it --network host -v `pwd`:/ws -v /data/repository:/data/repository --workdir /ws --name bigtop bigtop/slaves:trunk-centos-7 --cpus 16
source /etc/profile.d/bigtop.sh
./gradlew alluxio-clean alluxio-pkg -PcompileThreads=2C
```

这种方法可将编译速度提高 2 到 3 倍；首次编译时效果更加明显（例如 Hadoop 首次编译时间从 3 小时缩短到 1 小时）。
