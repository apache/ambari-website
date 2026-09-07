---
title: 指标
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->
---

# 指标 {#metrics}

**Ambari Metrics System**（“AMS”）是用于在 Ambari 管理的集群中收集、聚合和提供 Hadoop 及系统指标的系统。

## 术语 {#terminology}

术语 | 定义
----|----
Ambari Metrics System（“AMS”） | Ambari 内置的指标收集系统。
Metrics Collector | 独立服务器，负责收集和聚合指标，并从 Hadoop 服务 Sink 与 Metrics Monitor 提供指标。
Metrics Monitor | 安装在集群每台主机上，负责收集系统级指标并转发给 Metrics Collector。
Metrics Hadoop Sinks | 接入各 Hadoop 组件的 Sink，将 Hadoop 指标发送给 Metrics Collector。

## 架构 {#architecture}
下图展示了新版 Ambari Metrics System 的高层概念架构：

![](@site/versioned_docs/version-3.0.0/ambari-design/metrics/imgs/ams-arch.jpg "AMS 架构")

**Metrics Collector** 是接收注册发布者（Monitor 和 Sink）数据的守护进程。Collector 本身使用 HBase、Phoenix 和 ATS 等 Hadoop 技术构建。Collector 可以将数据存储在本地文件系统（称为“嵌入式模式”），也可以使用外部 HDFS（称为“分布式模式”）。

## 了解更多 {#learn-more}
浏览以下内容，了解 [Ambari Metrics REST API](./metrics-api-specification.md) 规范以及 AMS 的高级[配置](./configuration.mdx)。
