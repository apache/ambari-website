---
title: 操作
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

# 操作 {#operations}

## 指标收集器 {#metrics-collector}

**Pid 文件位置**

守护进程 | 默认用户 | Pid 文件路径
---------------|-------------------------------------------------|----------------------------------------
Metrics Collector API   |ams   |/var/run/ambari-metrics-collector/ambari-metrics-collector.pid
Metrics Collector Hbase |ams |/var/run/ambari-metrics-collector/hbase-ams-master.pid

**日志文件位置**

守护进程 | 日志文件路径
---------------|------------------------------------------------
Metrics Collector API    |/var/log/ambari-metrics-collector/ambari-metrics-collector.log<br></br>/var/log/ambari-metrics-collector/ambari-metrics-collector.out
Metrics Collector HBase  |/var/log/ambari-metrics-collector/hbase-ams-master-&lt;hostname&gt;.log<br></br>/var/log/ambari-metrics-collector/hbase-ams-master-&lt;hostname&gt;.out

**手动重启指标收集器**

停止命令

```bash
su - ams -c '/usr/sbin/ambari-metrics-collector --config /etc/ambari-metrics-collector/conf/ stop'
```

启动命令

```bash
su - ams -c '/usr/sbin/ambari-metrics-collector --config /etc/ambari-metrics-collector/conf/ start'
```

## 指标监控器 {#metrics-monitor}

**Pid 文件位置**

```
/var/run/ambari-metrics-monitor/ambari-metrics-monitor.pid
```

**日志文件位置**

```
/var/log/ambari-metrics-monitor/ambari-metrics-monitor.out
```

**手动重启指标监控器**
停止命令

```bash
su - ams -c '/usr/sbin/ambari-metrics-monitor --config /etc/ambari-metrics-monitor/conf stop'
```

启动命令

```bash
su - ams -c '/usr/sbin/ambari-metrics-monitor --config /etc/ambari-metrics-monitor/conf start'
```

## 构建说明 {#build-instructions}

ambari-metrics-assembly 软件包为各种平台构建程序集（rpm/deb/msi）。

构建成功后，可以在 ambari-metrics-assembly/target 文件夹中找到以下二进制文件。

```
ambari-metrics-collecor-<ambari-version>.<arch>
ambari-metrics-monitor-<ambari-version>.<arch>
ambari-hadoop-sink-<ambari-version>.<arch>
```

**注意**：必须先构建 Ambari Metrics，再构建 Ambari Server。

### RPM 软件包 {#rpm-packages}

```bash
cd ambari-metrics
mvn clean package -Dbuild-rpm
```

### Debian 软件包 {#debian-packages}
与上述说明相同，将 Maven 目标改为 build-deb。

### Windows msi {#windows-msi}
待补充

### 命令行参数 {#command-line-parameters}

参数 | 默认值 | 注释
---------------|------------------|------------------------------
hbase.tar | http://public-repo-1.hortonworks.com/HDP/centos6/2.x/updates/2.3.0.0/tars/hbase-1.1.1.2.3.0.0-2557.tar.gz | HBase tar 包。这是 Ambari 2.1.2 的默认版本
hbase.folder | hbase-1.1.1.2.3.0.0-2557 |-
hadoop.tar | http://public-repo-1.hortonworks.com/HDP/centos6/2.x/updates/2.3.0.0/tars/hadoop-2.7.1.2.3.0.0-2557.tar.gz | Hadoop tar 包，用于本地库。这是 Ambari 2.1.2 的默认版本
hadoop.folder | hadoop-2.7.1.2.3.0.0-2557 |-

**注意**

在 [AMBARI-18915](https://issues.apache.org/jira/browse/AMBARI-18915) 的更改之后，AMS pom 更新为使用 Apache hbase、hadoop、phoenix tar 包；AMS 默认使用从 Apache 下载的 hadoop tar 包。由于该版本的 libhadoop 未使用 libsnappy 构建，需要在 ams-site 中进行以下配置更改，才能正确启动 AMS。

**timeline.metrics.hbase.compression.scheme = None**

## 磁盘空间使用指导 {#disk-space-utilization-guidance}

节点数 | METRIC_RECORD (MB) | METRIC_RECORD_MINUTE (MB) | METRIC_RECORD_HOURLY (MB) | METRIC_RECORD_DAILY (MB) | METRIC_AGGREGATE (MB) | METRIC_AGGREGATE_MINUTE (MB) | METRIC_AGGREGATE_HOURLY (MB) | METRIC_AGGREGATE_DAILY (MB) | TOTAL (GB)
-------|----------|-----------|----------|----------|---------|--------|----------|-----------------|-------------
50  | 5120  | 2700  | 245   | 10  | 1500  |305 |28  |1 |10
100 | 10240 | 5400  | 490   | 20  | 1500  |305 |28  |1 |18
300 | 30720 | 16200 | 1470  | 60  | 1500  |305 |28  |1 |49
500 | 51200 | 27000 | 2450  | 100 | 1500  |305 |28  |1 |81
800 | 81920 | 43200 | 3920  | 160 | 1500  |305 |28  |1 |128

**注意**：

以上指导源自对实际集群中 AMS 磁盘使用情况的观察。实际数值来自一个安装了基本服务（HDFS、YARN、HBase）以及 Storm、Kafka 和 Flume 的集群。Kafka 和 Flume 仅在作业运行时生成指标。如果大量使用这些服务，建议增加磁盘空间。推导这些数值时，我们运行了 STORM 和 KAFKA 示例作业，以确保其有所贡献。

**实际磁盘使用数据**

节点数 | METRIC_RECORD (MB) | METRIC_RECORD_MINUTE (MB) | METRIC_RECORD_HOURLY (MB) | METRIC_RECORD_DAILY (MB) | METRIC_AGGREGATE (MB) | METRIC_AGGREGATE_MINUTE (MB) | METRIC_AGGREGATE_HOURLY (MB) | METRIC_AGGREGATE_DAILY (MB) | TOTAL (GB)
-------|----------|-----------|----------|----------|---------|--------|----------|-----------------|-------------
2   | 120   | 175 | 17  | 1 | 545     | 136 | 16  | 1 | 1
3   | 294   | 51  | 3.4 | 1 | 104     | 26  | 1.8 | 1 | 0.5
10  | 1024  | 540 | 49  | 2 | 1433.6  | 305 | 28  | 1 | 3.3

## Phoenix 架构 {#phoenix-schema}

### Phoenix 表 {#phoenix-tables}

表名 | 描述 | 清理间隔（默认）
------------------------|---------------------------------------------------------------------------|-------------------------
METRIC_RECORD           | 每个主机每项指标以 10 秒精度保存的数据，并包含 1 分钟聚合。| 1 天
METRIC_RECORD_MINUTE    | 每个主机每项指标以 5 分钟精度保存的数据                            | 1 周
METRIC_RECORD_HOURLY    | 每个主机每项指标以 1 小时精度保存的数据                              | 30 天
METRIC_RECORD_DAILY     | 每个主机每项指标以 1 天精度保存的数据                               | 1 年
METRIC_AGGREGATE        | 每项指标以 30 秒精度保存的集群范围聚合数据                | 1 周
METRIC_AGGREGATE_MINUTE | 每项指标以 5 分钟精度保存的集群范围聚合数据                  | 30 天
METRIC_AGGREGATE_HOURLY | 每项指标以 1 小时精度保存的集群范围聚合数据                    | 1 年
METRIC_AGGREGATE_DAILY  | 每项指标以 1 天精度保存的集群范围聚合数据                     | 2 年

### 连接 Phoenix {#connecting-to-phoenix}
* 将 Phoenix（4.2.0+）tar 包解压到指标收集器主机
* 将目录切换到 phonenix-4.*/bin
* 编辑 sqlline.py，搜索 "java"，将 java 替换为 java 可执行文件的完整路径，例如："/usr/jdk64/jdk1.8.0_40/bin/java"
* 连接命令：
Ambari 2.2.0 及更低版本：./sqlline.py localhost:61181:/hbase
Ambari 2.2.0 以上版本：
```bash
./sqlline.py localhost:61181:/ams-hbase-unsecure (embedded mode) and <cluster-zookeeper-quorum-host>:<cluster_zookeeper_port>:/ams-hbase-unsecure (distributed mode)
```
![](@site/versioned_docs/version-3.0.0/ambari-design/metrics/imgs/connect-phoenix.png "Connect Phoenix")
