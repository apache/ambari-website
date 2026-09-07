---
title: 验证发布候选版本
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 验证发布候选版本 {#verifying-release-candidate}

[Apache 发布流程](http://www.apache.org/dev/release-publishing)

这些步骤基于在根据[快速入门指南](../quick-start/quick-start-guide.md)创建的全新 centos6 VM 上所需的操作。

## 验证哈希和签名 {#verify-hashes-and-signature}

```bash
mkdir -p /usr/work/ambari
pushd /usr/work/ambari
```

_下载源代码 tar 包、asc 签名以及 md5/sha1 哈希。_

验证哈希

```
openssl md5 apache-ambari-2.4.1-src.tar.gz | diff apache-ambari-2.4.1-src.tar.gz.md5 -
openssl sha1 apache-ambari-2.4.1-src.tar.gz | diff apache-ambari-2.4.1-src.tar.gz.sha1 -
```

验证签名

```bash
gpg --keyserver pgpkeys.mit.edu --recv-key <key ID>
gpg apache-ambari-2.4.1-src.tar.gz.asc
```

## 编译代码 {#compiling-the-code}

如果在干净的机器（例如刚安装的 VM）上验证发布版本，则需要执行几个准备步骤。

### 安装 mvn {#install-mvn}

```bash
mkdir /usr/local/apache-maven
cd /usr/local/apache-maven
wget http://mirror.olnevhost.net/pub/apache/maven/binaries/apache-maven-3.2.1-bin.tar.gz
tar -xvf apache-maven-3.2.1-bin.tar.gz
export M2_HOME=/usr/local/apache-maven/apache-maven-3.2.1
export M2=$M2_HOME/bin
export PATH=$M2:$PATH
```

### 安装 java {#install-java}

```bash
mkdir /usr/jdk
cd /usr/jdk
cp "FROM SOURCE"/jdk-7u67-linux-x64.tar.gz . (or download the latest)
tar -xvf jdk-7u67-linux-x64.tar.gz
export PATH=$PATH:/usr/jdk/jdk1.7.0_67/bin
export JAVA_HOME=/usr/jdk/jdk1.7.0_67
export _JAVA_OPTIONS="-Xmx2048m -XX:MaxPermSize=1024m -Djava.awt.headless=true"
```

### 安装软件包 {#install-packages}

```bash
yum install -y git
curl --silent --location https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
yum install -y gcc-c++ make
npm install -g brunch@1.7.20
yum install -y libfreetype.so.6
yum install -y freetype
yum install -y fontconfig
yum install -y python-devel
yum install -y rpm-build
```

### 安装 Python 工具 {#install-python-tools}

```bash
wget http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg --no-check-certificate

sh setuptools-0.6c11-py2.6.egg
```

### 其他步骤 {#additional-steps}

这些步骤并非每个环境都需要。可以在构建前或构建后执行；如果遇到特定错误，也可以执行这些步骤。

_安装 ambari-metrics-kafka-sink 所需的 pom 文件_

```bash
mkdir /tmp/pom-files
pushd /tmp/pom-files
cp "FROM SOURCE"/jms-1.1.pom .
cp "FROM SOURCE"/jmxri-1.2.1.pom .
cp "FROM SOURCE"/jmxtools-1.2.1.pom .
mvn install:install-file -Dfile=jmxri-1.2.1.pom -DgroupId=com.sun.jmx -DartifactId=jmxri -Dversion=1.2.1 -Dpackaging=jar
mvn install:install-file -Dfile=jms-1.1.pom -DgroupId=javax.jms -DartifactId=jms -Dversion=1.1 -Dpackaging=jar
mvn install:install-file -Dfile=jmxtools-1.2.1.pom -DgroupId=com.sun.jdmk -DartifactId=jmxtools -Dversion=1.2.1 -Dpackaging=jar
popd
```

### 编译代码 {#compile-the-code}

```bash
pushd /usr/work/ambari
tar -xvf apache-ambari-2.4.1-src.tar.gz
cd apache-ambari-2.4.1-src
mvn clean install -DskipTests
```
