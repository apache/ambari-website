---
title: 故障排除
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 故障排除 {#troubleshooting}

## 清理 Ambari Metrics 系统数据 {#cleaning-up-ambari-metrics-system-data}

以下步骤有助于清理指定集群中的 Ambari Metrics 系统数据。

重要说明：

1. 清理 AMS 数据会删除所有可用的历史 AMS 数据
2. 上述 hbase 参数专用于 AMS，与集群 Hbase 参数不同

### 分步指南 {#step-by-step-guide}

1. 使用 Ambari
   * 将 AMS 设置为维护模式
   * 在 Ambari 中停止 AMS。在 AMS 配置屏幕中确定以下内容
      * 'Metrics Service operation mode'（嵌入式或分布式）
      * hbase.rootdir
      * hbase.zookeeper.property.dataDir
2. AMS 数据存储在上面确定的 'hbase.rootdir' 中。备份并删除 AMS 数据。
     * 如果指标服务操作模式
         * 为 'embedded'，数据存储在操作系统文件中。使用常规操作系统命令备份并删除 hbase.rootdir 中的文件
         * 为 'distributed'，数据存储在 HDFS 中。使用 'hdfs dfs' 命令备份并删除 hbase.rootdir 中的文件
3. 备份并删除 'hbase.tmp.dir'/zookeeper 的内容，以删除 AMS ZooKeeper 数据
4. 从 'hbase.tmp.dir'/phoenix-spool 文件夹中删除所有 Phoenix spool 文件
5. 使用 Ambari 重启 AMS

## 将指标收集器移动到新主机 {#moving-metrics-collector-to-a-new-host}

1. 停止 AMS 服务

2. 执行以下 API 调用以删除指标收集器。（将 server-host、cluster-name 和 host-name 替换为指标收集器主机）

```
curl -u admin:admin  -H "X-Requested-By:ambari" -i -X DELETE http://<server-host>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>/host_components/METRICS_COLLECTOR
```

3. 执行以下 API 调用，将指标收集器添加到新主机。（替换 server-host、cluster-name、host-name）

```
curl -u admin:admin  -H "X-Requested-By:ambari" -i -X POST http://<server-host>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>/host_components/METRICS_COLLECTOR
```

4. 从新主机的主机页面安装指标收集器组件。

5. 如果 AMS 处于嵌入式模式，请将 AMS 数据从旧节点复制到新节点。

     * 对于嵌入式模式（ams-site: timeline.metrics.service.operation.mode），将 hbase.rootdir 和 tmpdir 从旧收集器主机复制到新主机。
     * 对于分布式模式，由于 AMS HBase 正在写入 HDFS，因此无需更改。
     * 确保新 AMS 节点中的 ams:hbase-site:hbase.rootdir 和 hbase.tmp.dir 指向正确位置
6. 启动指标服务。

7. 服务守护进程仍将指向旧指标收集器主机。对从属组件执行滚动重启，对主组件执行普通重启，使其获取新的收集器主机。

注意：Ambari-2.5.0 之后不需要重启服务，因为实时收集器信息保存在集群 ZooKeeper 中。

![](@site/versioned_docs/version-3.0.0/ambari-design/metrics/imgs/restart-datanode.png)

## 故障排除指南 {#troubleshooting-guide}

以下页面记录了 Ambari Metrics 服务中发现的常见问题，并提供需要关注的问题和已解决问题的指南。

**需要从系统收集的重要信息**：

指标收集器主机的问题
* 收集器主机上 "rpm -qa | grep ambari" 的输出。
* 系统可用内存总量，输出："free -g"
* 可用磁盘空间和可用分区总量，输出："df -h "
* 集群中的主机总数
* 配置：/etc/ams-hbase/conf/hbase-env.sh、/etc/ams-hbase/conf/hbase-site.xml、/etc/ambari-metrics-collector/conf/ams-env.sh、/etc/ambari-metrics-collector/conf/ams-site.xml
* 收集器日志：

```
/var/log/ambari-metrics-collector/ambari-metrics-collector.log, /var/log/ambari-metrics-collector/hbase-ams-master-<host>.log, /var/log/ambari-metrics-collector/hbase-ams-master-<host>.out
Note: Additionally, If distributed mode is enabled, /var/log/ambari-metrics-collector/hbase-ams-zookeeper-<host>.log, /var/log/ambari-metrics-collector/hbase-ams-regionserver-<host>.log
```

* 以下 URL 的响应：

```
http://<ams-host>:6188/ws/v1/timeline/metrics/metadata
http://<ams-host>:6188/ws/v1/timeline/metrics/hosts 
```

* 响应为 JSON，可作为文件附加。
* 从 AMS HBase Master UI 查看 - http://&lt;METRICS_COLLECTOR_HOST&gt;:61310
    * Region Count
    * StoreFile Count
    * JMX Snapshot - http://&lt;METRICS_COLLECTOR_HOST&gt;:61310/jmx

**指标监控器主机的问题**

```
Monitor log file: /etc/ambari-metrics-monitor/ambari-metrics-monitor.out
```

**查看[配置 - 调优](https://cwiki.apache.org/confluence/display/AMBARI/Configurations+-+Tuning)，了解扩展性问题的故障排除方法。**

**问题 1：AMS HBase 进程磁盘写入速度慢**

以下症状和解决方案仅针对 AMS 的**嵌入式**模式。

_症状_：

行为|检测方法
--------|--------------
CPU 使用率高 | 收集器主机上的 HBase 进程占用每个核心接近 100%
HBase 日志：压缩时间 | grep hbase-ams-master-&lt;host&gt;.log | grep "Finished memstore flush"<br></br>这会显示 X 毫秒内写入的 MB 数，除非磁盘存在竞争，通常平均速度为 128 MBps 及以上。<br></br>此搜索还会显示每分钟执行压缩的次数。大于 6 或 8 表示写入量远超 HBase 内存可容纳量，是一个警告
HBase 日志：ZK 超时 | HBase 崩溃并提示 zookeeper 会话超时。这是因为嵌入式模式下 zk 会话超时最多限制为 30 秒（HBase 问题：计划在 2.1.3 中修复）。<br></br>原因同样是磁盘读取缓慢。
收集器日志：“waiting for some tasks to finish” | ambari-metric-collector 日志显示 AsyncProcess 写入已排队

_解决方案_：

配置更改|描述
--------|-----------------------
ams-hbase-site :: hbase.rootdir | 将此路径更改为不繁忙的磁盘挂载点。
ams-hbase-ste :: hbase.tmp.dir  | 将此路径更改为不同于 hbase.rootdir 的位置
ams-hbase-env :: hbase_master_heapsize<br></br>ams-hbase-site :: hbase.hregion.memstore.flush.size | 增大此值，使更多数据保留在内存中，以应对 I/O 速度。<br></br>如果增大堆大小后常驻内存使用量没有增加，可以更改此参数以调整每个 Region 的 memstore 可存储数据量。默认设置为 128 MB，大小单位为字节。<br></br>请谨慎修改此值，通常限制在 64 MB（堆较小且磁盘写入快）到 512 MB（堆较大、超过 8 GB 且平均写入速度）之间，因为内存中保留更多数据意味着 Flush 操作写入磁盘所需时间更长。

**问题 2：Ambari Metrics 加载时间过长**

_症状_：

行为|检测方法
--------|--------------
图表：加载时间过长<br></br>图表：无可用数据 | 查看服务页面/主机页面的指标图表
Socket 读取超时 | ambari-server.log 显示指标 socket 超时错误消息
Ambari UI 变慢  | 主机页面加载时间很长，热力图不显示数据<br></br>仪表盘加载时间过长<br></br>多个会话导致速度变慢

_解决方案_：

强烈建议升级到 2.1.2 或更高版本。

以下是 2.1.2 版本中的修复列表，应能大幅缓解加载缓慢和超时问题：

https://issues.apache.org/jira/browse/AMBARI-12654

https://issues.apache.org/jira/browse/AMBARI-12983

https://issues.apache.org/jira/browse/AMBARI-13108

## [已知问题](https://cwiki.apache.org/confluence/display/AMBARI/Known+Issues) {#known-issues}
