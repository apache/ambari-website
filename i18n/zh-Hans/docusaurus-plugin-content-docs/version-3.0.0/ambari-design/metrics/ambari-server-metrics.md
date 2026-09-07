---
title: Ambari Server 指标
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

# Ambari Server 指标 {#ambari-server-metrics}

## 概要 {#outline}
Ambari Server 可用于管理几十个节点到 1000 多个节点。在大型集群或基础设施不理想的集群中，采集 Ambari Server 性能有助于调整服务器，并指导未来的性能优化。借助此功能，AmbariServer 中实现了 Metrics Source-Sink 框架，可对各种指标源进行细粒度控制，也便于添加未来的指标源。

具体而言，Ambari Server JVM 和数据库（EclipseLink）指标源已连接到 AMS 以发送指标，并通过 Grafana 仪表板进行可视化。

## 指标系统术语 {#metrics-system-terminology}

## 配置/启用 {#configuration--enabling}
* 要启用 Ambari Server 指标，请确保 Ambari Server 启动或重启期间存在以下配置文件：/etc/ambari-server/conf/metrics.properties。
* 当前只实现了两个指标源：JVM Metric Source 和 Database Metric Source。
* 如需添加或移除要跟踪的指标源，需要修改 metrics.properties 文件中的以下配置。
    ```
        metric.sources=jvm,database
    ```
* 源特定配置将在指标源部分讨论。

## 指标源 {#metric-sources}

名称|功能|接口|实现
----|----|----|----
Metrics Service | 作为 Metrics 系统的起点。<br></br>加载指标配置。<br></br>初始化 Sink。如果 Sink 未正确初始化（AMS 尚未部署），则每 5 分钟异步尝试重新初始化。<br></br>初始化并启动已配置的源。 | org.apache.ambari.server.metrics.system.MetricsService | org.apache.ambari.server.metrics.system.impl.MetricsServiceImpl
Metric Source | Ambari Server 中具有相关指标的任意子组件。<br></br>需要初始化与该源对应的部分指标配置以及 Sink。<br></br>定期向 Sink 发布指标。<br></br>示例：JVM、数据库等。 | org.apache.ambari.server.metrics.system.MetricsSource |org.apache.ambari.server.metrics.system.impl.JvmMetricsSource<br></br>org.apache.ambari.server.metrics.system.impl.DatabaseMetricsSource
Metric Sink | 将指标刷新到外部指标收集系统（Metrics Collector）。 | org.apache.ambari.server.metrics.system.MetricsSink | org.apache.ambari.server.metrics.system.impl.AmbariMetricSinkImp

### JVM 指标 {#jvm-metrics}

**工作方式**

* 使用 Codahale 库收集并发布 Ambari Server JVM 相关指标。
* 收集 GC、缓冲区、线程、内存和文件描述符指标。
* 要启用此源，请将 jvm 添加到 metrics.properties 的 metric.sources 配置中，然后重启 Ambari Server。

**配置**

配置名称|默认值|说明
-----------|-------------|-----
source.jvm.class | org.apache.ambari.server.metrics.system.impl.JvmMetricsSource | 用于收集 JVM 指标的类。
source.jvm.interval | 10 | 指标收集频率间隔，单位为秒。

**Grafana 仪表板**

* “Ambari Server - JVM”仪表板展示从 JvmMetricsSource 捕获的指标。
* 包含可能有助于分析性能不佳系统的内存、GC 和线程相关图表。

### 数据库指标 {#database-metrics}

**工作方式**

EclipseLink PeformanceMonitor 已扩展为支持自定义 Ambari Database Metrics 源。它提供按实体和实体操作划分的监控数据。

Performance Monitor 提供两类指标：

* Counter：操作/查询的发生次数。此类指标的名称以 Counter 开头。
* Timer：操作/查询耗费的累计总时间。此类指标的名称以 Timer 开头。
例如，Database Metrics Source 收集的一些指标如下：

* Counter.ReadObjectQuery.HostRoleCommandEntity.readHostRoleCommandEntity

* Timer.ReadAllQuery.StackEntity.StackEntity.findByNameAndVersion.ObjectBuilding

除了从 EclipseLink 收集的 Counter 和 Timer 指标外，还会发送 Timer/Counter（相除）的计算指标。该指标提供一段时间内某项操作所耗费的平均时间。

例如：

```
 Counter Metric : Counter.ReadAllQuery.HostRoleCommandEntity = 10000
 Timer Metric : Timer.ReadAllQuery.HostRoleCommandEntity = 50
 Computed Metric (Avg time for the operation) : ReadAllQuery.HostRoleCommandEntity = 200 (10000 div by 50)
```

如上所示，计算指标名称与 Timer 和 Counter 指标相同，但不包含 Timer./Counter. 前缀。

要启用此源，请将“**database**”添加到 metrics.properties 的 **metric.sources** 配置中，然后重启 Ambari Server。

**配置**

配置名称|默认值|说明
-----------|-------------|-----
source.database.class | org.apache.ambari.server.metrics.system.impl.DatabaseMetricsSource | 用于从扩展的 Performance Monitor 类 org.apache.ambari.server.metrics.system.impl.AmbariPerformanceMonitor 收集数据库指标的类。
source.database.performance.monitor.query.weight | HEAVY | EclipseLink Performance monitor 粒度：NONE / NORMAL / HEAVY / ALL
source.database.monitor.dumptime | 60000 | 收集间隔，单位为毫秒
source.database.monitor.entities | Cluster(.*)Entity,Host(.*)Entity,ExecutionCommandEntity, ServiceComponentDesiredStateEntity,Alert(.*)Entity,StackEntity,StageEntity | 仅收集和跟踪这些实体的指标（org.apache.ambari.server.orm.entities）。
source.database.monitor.query.keywords.include | CacheMisses | 即使不属于请求实体，也包含带有该关键字的部分指标。

**Grafana 仪表板**

Ambari 数据库指标已在两个 Grafana 仪表板中展示。

* “Ambari Server - Database”仪表板
    * 聚合展示所有实体的 Total ReadAllQuery、Cache Hits、Cache Misses、Query Stages 和 Query Types。
    * 还展示如何为特定实体 HostRoleCommandEntity 可视化 Timer、Counter 和 Avg Timing 数据的示例。
* “Ambari Server - Top N Entities”仪表板
    * 展示 ReadAllQuery 操作次数最多的前 N 个实体。
    * 展示数据库在 ReadAllQuery 操作上耗时最多的前 N 个实体。
    * 展示 Cache Misses 数量最多的前 N 个实体。

这些仪表板图表旨在示范如何以临时方式创建图表来查询特定实体或操作。

## 全局禁用 Ambari Server 指标 {#disabling-ambari-server-metrics-globally}

* 将以下配置添加到 /etc/ambari-server/conf/ambari.properties：
  * ambariserver.metrics.disable=true
* 重启 Ambari Server。

## 相关 JIRA {#related-jira}

[AMBARI-17589](https://issues.apache.org/jira/browse/AMBARI-17589)
