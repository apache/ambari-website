---
title: 从源代码构建
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

# 从源代码构建 Apache Ambari {#building-apache-ambari-from-source}

本指南介绍如何从源代码构建 Apache Ambari 3.0 及其相关子项目。

## 前置条件 {#prerequisites}

开始前，请确保已安装以下依赖：

### 系统要求 {#system-requirements}
- 操作系统：Rocky Linux 8 或 9（推荐）
- Python 3 开发工具（`python3-devel`）

### Java 要求 {#java-requirements}
- Ambari 主项目：JDK 17
- Ambari Metrics：JDK 8
- Ambari Infra：JDK 8

## 构建 Ambari 主项目 {#building-ambari-main-project}

### 1. 克隆仓库 {#1-clone-the-repository}
```bash
git clone git@github.com:apache/ambari.git
cd ambari
```

### 2. 构建选项 {#2-build-options}

#### 不生成 RPM 构建 {#build-without-rpm}
不创建 RPM 软件包而构建 Ambari：
```bash
mvn -B -T 2C clean install package \
    -Drat.skip=true \
    -DskipTests \
    -Dmaven.test.skip=true \
    -Dfindbugs.skip=true \
    -Dcheckstyle.skip=true
```

#### 生成 RPM 构建 {#build-with-rpm}
构建 Ambari 并创建 RPM 软件包：
```bash
mvn -B -T 2C clean install package rpm:rpm \
    -Drat.skip=true \
    -DskipTests \
    -Dmaven.test.skip=true \
    -Dfindbugs.skip=true \
    -Dcheckstyle.skip=true
```

RPM 软件包将生成在：
- Ambari Agent：`ambari/ambari-agent/target/rpm/ambari-agent/RPMS/x86_64/ambari-agent-3.0.0.0-SNAPSHOT.x86_64.rpm`
- Ambari Server：`ambari/ambari-server/target/rpm/ambari-server/RPMS/x86_64/ambari-server-3.0.0.0-SNAPSHOT.x86_64.rpm`

## 构建 Ambari Metrics {#building-ambari-metrics}

:::tip 性能优化
要显著提高构建性能，请在构建前将二进制依赖下载到本地：

1. 创建依赖目录：
```bash
mkdir -p /ws/dl/
```

2. 下载所需的二进制文件：
```bash
wget -P /ws/dl/ http://repo.bigtop.apache.org.s3.amazonaws.com/bigtop-stack-binary/3.2.0/centos-7/x86_64/hbase-2.4.13-bin.tar.gz
wget -P /ws/dl/ http://repo.bigtop.apache.org.s3.amazonaws.com/bigtop-stack-binary/3.2.0/centos-7/x86_64/hadoop-3.3.4.tar.gz
wget -P /ws/dl/ https://dl.grafana.com/oss/release/grafana-11.1.4.linux-amd64.tar.gz
wget -P /ws/dl/ http://repo.bigtop.apache.org.s3.amazonaws.com/bigtop-stack-binary/3.2.0/centos-7/x86_64/phoenix-hbase-2.4-5.1.2-bin.tar.gz
```

3. 修改 ambari-metrics 项目中的 `pom.xml` 以使用本地文件：
```xml
<!-- Update these properties to use local files -->
<properties>
    <hbase.tar>file:///ws/dl/hbase-2.4.13-bin.tar.gz</hbase.tar>
    <hadoop.tar>file:///ws/dl/hadoop-3.3.4.tar.gz</hadoop.tar>
    <grafana.tar>file:///ws/dl/grafana-11.1.4.linux-amd64.tar.gz</grafana.tar>
    <phoenix.tar>file:///ws/dl/phoenix-hbase-2.4-5.1.2-bin.tar.gz</phoenix.tar>
</properties>
```

此优化可避免重复构建时进行大文件下载，从而节省大量时间。
:::

### 1. 克隆仓库 {#1-clone-the-repository-1}
```bash
git clone git@github.com:apache/ambari-metrics.git
cd ambari-metrics
```

### 2. 构建选项 {#2-build-options-1}

#### 不生成 RPM 构建 {#build-without-rpm-1}
不创建 RPM 软件包而构建 Ambari Metrics：
```bash
mvn -T 2C clean install -DskipTests
```

#### 生成 RPM 构建 {#build-with-rpm-1}
构建 Ambari Metrics 并创建 RPM 软件包：
```bash
mvn -T 2C clean install -DskipTests -Dbuild-rpm
```

查找生成的 RPM 软件包：
```bash
find ./ -name "*.rpm"
```

## 构建 Ambari Infra {#building-ambari-infra}

### 1. 克隆仓库 {#1-clone-the-repository-2}
```bash
git clone git@github.com:apache/ambari-infra.git
cd ambari-infra
```

### 2. 构建 RPM 软件包 {#2-build-rpm-package}
```bash
make rpm
