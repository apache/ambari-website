---
title: Stack 定义的指标
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# Stack 定义的指标 {#stack-defined-metrics}

Ambari Stack 定义代表集群中各项服务的完整声明式描述。

Stack 定义还包含一个定义文件，其中列出了服务支持的所有指标。

目前，metrics.json 描述 REST API 请求的指标名称与调用指标服务时使用的指标名称之间的映射。

Stack 中 **metrics.json** 的位置：

级别|位置|注释
-----|--------|-------
集群和主机 | ganglia_properties.json | 目前，此文件也为主机组件和服务组件定义指标，但这些定义仅用于 Stack < 2.0 的旧版本和单元测试。<br></br>此 JSON 文件中的集群和主机部分驱动仪表盘图表。
组件和主机组件 | common-services.&lt;SERVICE_NAME&gt; | 此文件包含 Ambari Metrics（type = ganglia）和 JMX 的指标映射定义。

**注意**：覆盖公共服务行为的各个 Stack 可以重新定义 metrics.json 文件；继承是全有或全无的，也就是说，如果子 Stack 中存在 metrics.json 文件，它将覆盖 common-services 中的 metrics.json。

**metrics.json 文件结构**

键|允许的值|注释
-----|--------|-------------
类型  |"ganglia" / "jmx" | type = ganglia 表示指标服务请求由 Ganglia（最高到 2.0 版本）或 Ambari Metrics（2.0 及以上版本）后端服务处理，该决定由 Ambari server 在运行时作出。
类别 | "default" / "performance" ... | 用于将指标分组为子集，以便浏览
指标 | metricKey : `{ "metricName": "", "pointInTime": "", "temporal": "" }` | metricKey = REST API 使用的键。它对于一个服务是唯一的，并标识请求的指标以及提供数据时使用的端点（AMS 或 JMX）
  * metricName = 指标服务后端使用的名称
  * pointInTime = 获取最新值，不允许查询时间范围
  * temporal = 支持时间范围查询

示例：

```json
{

  "NAMENODE": {

    "Component": [

      {

        "type": "ganglia",

        "metrics": {

          "default": {

            "metrics/dfs/FSNamesystem/TotalLoad": {

              "metric": "dfs.FSNamesystem.TotalLoad",

              "pointInTime": false,

              "temporal": true

            }

        } ]

    },

    "HostComponent" : [

         { "type" : "ganglia", ... }

         {  "type" : "jmx", .... }

   ]

}
```

**用于检索指标定义的 API 调用示例**：

服务指标：
```
Template => http://<ambari-server>:<port>/api/v1/stacks/<stackName>/versions/<stackVersion>/services/<serviceName>/artifacts/metrics_descriptor
Example => http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/HDFS/artifacts/metrics_descriptor
```
集群和主机指标：
```
Template => http://<ambari-server>:<port>/api/v1/stacks/<stackName>/versions/<stackVersion>/artifacts/metrics_descriptor
Example => http://localhost:8080/api/v1/stacks/HDP/versions/2.3/artifacts/metrics_descriptor
