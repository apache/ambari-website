---
title: Ambari Metrics - 白名单
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

# Ambari Metrics - 白名单 {#ambari-metrics---whitelisting}

在大型集群（500 个以上节点）中，AMS 聚合有时会出现性能问题。在 ambari-metrics-collector 日志中，可能会看到类似以下的日志行：

```
20:51:30,952 INFO 2080712366@qtp-974606690-381 AsyncProcess:1597 - #1, waiting for 13948 actions to finish
20:51:31,601 INFO 1279097595@qtp-974606690-359 AsyncProcess:1597 - #1, waiting for 19376 actions to finish
```

在 Ambari 3.0.0 中，我们通过全面改造架构和聚合逻辑来解决这些性能问题。在此之前，可以使用 AMS 白名单减少 AMS 跟踪的指标数量，从而解决这一规模问题。

## 如何在 AMS 中启用白名单 {#how-do-we-enable-whitelisting-in-ams}

**Ambari 2.4.3 之前**
可以使用指标白名单文件跟踪 AMS 中的指标集合，所有其他指标都会被丢弃。

**步骤**

* 指标白名单文件位于 /etc/ambari-metrics-collector/conf。如果旧版 Ambari 中不存在，可从 https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-timelineservice/conf/unix/metrics_whitelist 下载到 Collector 主机。
* 添加配置 ams-site : timeline.metrics.whitelist.file = `/path/to/whitelist_file`
* 重启 AMS Collector。
* 验证白名单配置已生效。在 ambari-metrics-collector 日志中确认出现 'Whitelisting # metrics' 行。

**Ambari 2.5.0 及更高版本**
从 Ambari 2.5.0 开始，白名单功能进行了进一步完善。

* **应用黑名单** - 将一个或多个服务的指标列入黑名单。其他服务的指标将全部允许，或由白名单文件控制。

   ```
   ams-site : timeline.metrics.apps.blacklist = hbase,namenode
   ```

* **应用白名单** - 将一个或多个服务的指标列入白名单。

    ```
    ams-site:timeline.metrics.apps.whitelist = nimbus,datanode   
    ```

   注意：可以从元数据 URL 找到应用名称：
   
   ```
   http://<metrics_collector_host>:6188/ws/v1/timeline/metrics/metadata
   ```

* **指标白名单** - 与 Ambari 2.4.3 中的白名单方法相同（通过白名单文件）。除了在白名单文件中提供指标名称外，还可以使用 ._p_ 前缀提供模式。例如，可以指定以下模式：

._p_dfs.FSNamesystem.*

._p_jvm.JvmMetrics*

包含指标和模式的指标白名单文件示例：[https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-timelineservice/src/test/resources/test_data/metric_whitelist.dat](https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-timelineservice/src/test/resources/test_data/metric_whitelist.dat)。

这些白名单和黑名单技术可以结合使用。

* 如果只有 timeline.metrics.whitelist.file = `/path/to/whitelist_file`，则只允许该文件中的指标（无论哪些应用可能正在发送指标）。
* 如果只有 timeline.metrics.apps.blacklist = datanode，则不允许任何 datanode 指标，其他所有服务的指标都会被允许。
* 如果只有 timeline.metrics.apps.whitelist = namenode，则没有任何黑名单，因此该设置没有作用。
* 如果启用了指标白名单（通过文件），并且设置了 timeline.metrics.apps.blacklist = datanode，则不允许任何 datanode 指标，其他服务中的白名单指标会被允许。
* 如果设置了 timeline.metrics.apps.blacklist = datanode、timeline.metrics.apps.whitelist = namenode 并启用了指标白名单（通过文件），则 datanode 指标会被列入黑名单，所有 namenode 指标都会被允许，其他服务中的白名单指标也会被允许。
