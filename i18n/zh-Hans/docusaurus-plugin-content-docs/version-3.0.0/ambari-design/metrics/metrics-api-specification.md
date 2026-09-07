---
title: Ambari Metrics API 规范
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

Ambari REST API 支持 CLUSTER、HOST、COMPONENT 和 HOST COMPONENT 层级的指标查询。

总体而言，支持的指标查询类型包括：**时间范围**或**时间点**。

下面展示了使用 Ambari API 从 Metrics 后端服务获取指标的调用示例。

## CLUSTER {#cluster}

例如：仪表板指标：获取集群所有节点的平均负载
```
http://<ambari-server>:8080/api/v1/clusters/<cluster-name>?fields=metrics/load[1430844925,1430848525,15]&_=1430848532904
```
上述 API 调用获取集群所有主机聚合后的平均负载。

API 调用的请求部分选择集群实例，谓词包含带时间范围查询的指标，后面跟当前的毫秒时间。

时间范围查询：

字段 | 值 | 说明
------|----|----
开始时间 | 1430844925 | 时间范围的开始时间（Epoch）。
结束时间 | 1430848525 | 时间范围的结束时间（Epoch）。
步长 | 15 | 默认步长；仅用于补零，或无法从获取的数据确定填充间隔时进行空值填充。

## HOST {#host}

例如：主机指标：获取集群中特定主机的 CPU 使用率

```
http://<ambari-server>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>?fields=metrics/cpu/cpu_user[1430844610,1430848210,15],metrics/cpu/cpu_wio[1430844610,1430848210,15],metrics/cpu/cpu_nice[1430844610,1430848210,15],metrics/cpu/cpu_aidle[1430844610,1430848210,15],metrics/cpu/cpu_system[1430844610,1430848210,15],metrics/cpu/cpu_idle[1430844610,1430848210,15]&_=1430848217591
```

上述 API 调用获取主机页面绘制 CPU 使用率所需的全部 CPU 相关指标。

上述 API 调用的请求部分选择要查询的主机，谓词部分包含带时间范围查询的指标名称。

## COMPONENT {#component}

例如：服务指标：获取所有 DataNode 聚合后的容量使用率指标，但只获取最新值（时间点）

```
 http://<ambari-server>:8080/api/v1/clusters/<cluster-name>/services/HDFS/components/DATANODE?fields=metrics/dfs/datanode/DfsUsed,metrics/dfs/datanode/Capacity&_=1430849798630
```

上述 API 调用获取两个指标值，它们表示从 Metrics Service 后端获取的请求指标的时间点值（非 JMX）。

如需直接从 Hadoop 守护进程获取 JMX 指标，请使用对应 JMX MBean 指标的指标名称，例如：metrics/dfs/FSNamesystem/CapacityUsedGB（更多信息请参阅 Stack Defined Metrics）。

上述 API 调用的请求部分选择集群中的服务，谓词部分包含指标名称。

## HOST COMPONENT {#host-component}
例如：守护进程指标：获取活动 NameNode 的堆内存使用量

```
http://<ambari-server>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>/host_components/NAMENODE?fields=metrics/jvm/memHeapCommittedM[1430847303,1430850903,15],metrics/jvm/memHeapUsedM[1430847303,1430850903,15]&_=1430850903846
The above API call retrieves JVM heap metrics for the Active Namenode in the cluster.
```

API 的请求部分选择 NameNode 主机组件，谓词部分包含带时间范围的指标。
