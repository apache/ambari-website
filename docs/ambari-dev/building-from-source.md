---
title: Building from Source
---

# Building Apache Ambari from Source

This guide explains how to build Apache Ambari 3.0 and its related subprojects from source code.

## Prerequisites

Before you begin, ensure you have the following requirements installed:

### System Requirements
- Operating System: Rocky Linux 8 or 9 (recommended)
- Python 3 Development Tools (`python3-devel`)

### Java Requirements
- Ambari Main Project: JDK 17
- Ambari Metrics: JDK 8
- Ambari Infra: JDK 8

### Additional Packages
- snappy-devel

## Building Ambari Main Project

### 1. Clone the Repository
```bash
git clone git@github.com:apache/ambari.git
cd ambari
```

### 2. Build Options

#### Build Without RPM
To build Ambari without creating RPM packages:
```bash
mvn -B -T 2C clean install package \
    -Drat.skip=true \
    -DskipTests \
    -Dmaven.test.skip=true \
    -Dfindbugs.skip=true \
    -Dcheckstyle.skip=true
```

#### Build With RPM
To build Ambari and create RPM packages:
```bash
mvn -B -T 2C clean install package rpm:rpm \
    -Drat.skip=true \
    -DskipTests \
    -Dmaven.test.skip=true \
    -Dfindbugs.skip=true \
    -Dcheckstyle.skip=true
```

The RPM packages will be generated at:
- Ambari Agent: `ambari/ambari-agent/target/rpm/ambari-agent/RPMS/x86_64/ambari-agent-3.0.0.0-SNAPSHOT.x86_64.rpm`
- Ambari Server: `ambari/ambari-server/target/rpm/ambari-server/RPMS/x86_64/ambari-server-3.0.0.0-SNAPSHOT.x86_64.rpm`

## Building Ambari Metrics

:::tip Performance Optimization
To significantly improve build performance, download binary dependencies locally before building:

1. Create a local directory for dependencies:
```bash
mkdir -p /ws/dl/
```

2. Download the required binary files:
```bash
wget -P /ws/dl/ http://repo.bigtop.apache.org.s3.amazonaws.com/bigtop-stack-binary/3.2.0/centos-7/x86_64/hbase-2.4.13-bin.tar.gz
wget -P /ws/dl/ http://repo.bigtop.apache.org.s3.amazonaws.com/bigtop-stack-binary/3.2.0/centos-7/x86_64/hadoop-3.3.4.tar.gz
wget -P /ws/dl/ https://dl.grafana.com/oss/release/grafana-11.1.4.linux-amd64.tar.gz
wget -P /ws/dl/ http://repo.bigtop.apache.org.s3.amazonaws.com/bigtop-stack-binary/3.2.0/centos-7/x86_64/phoenix-hbase-2.4-5.1.2-bin.tar.gz
```

3. Modify the `pom.xml` in ambari-metrics project to use local files:
```xml
<!-- Update these properties to use local files -->
<properties>
    <hbase.tar>file:///ws/dl/hbase-2.4.13-bin.tar.gz</hbase.tar>
    <hadoop.tar>file:///ws/dl/hadoop-3.3.4.tar.gz</hadoop.tar>
    <grafana.tar>file:///ws/dl/grafana-11.1.4.linux-amd64.tar.gz</grafana.tar>
    <phoenix.tar>file:///ws/dl/phoenix-hbase-2.4-5.1.2-bin.tar.gz</phoenix.tar>
</properties>
```

This optimization will save significant time during repeated builds by avoiding large downloads.
:::

### 1. Clone the Repository
```bash
git clone git@github.com:apache/ambari-metrics.git
cd ambari-metrics
```

### 2. Build Options

#### Build Without RPM
To build Ambari Metrics without creating RPM packages:
```bash
mvn -T 2C clean install -DskipTests
```

#### Build With RPM
To build Ambari Metrics and create RPM packages:
```bash
mvn -T 2C clean install -DskipTests -Dbuild-rpm
```

To locate the generated RPM packages:
```bash
find ./ -name "*.rpm"
```

## Building Ambari Infra

### 1. Clone the Repository
```bash
git clone git@github.com:apache/ambari-infra.git
cd ambari-infra
```

### 2. Build RPM Package
```bash
make rpm
```
