---
title: 监控架构对比
---

<!--
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# 监控架构对比 {#monitoring-architecture-comparison}

| 领域 | 旧架构 | 3.1.0 架构 |
| --- | --- | --- |
| 采集 | AMS Monitor 和服务专用的指标输出器 | Agent 指标端点、类型化组件路由和 VMAGENT 抓取 |
| 存储 | AMS Collector 和基于 HBase 的时序存储 | VictoriaMetrics 单节点或分布式存储 |
| 目标配置 | 旧版监控服务配置 | Server 编译的分配和 HTTP 服务发现 |
| 查询 | AMS 专用的指标和属性接口 | 通过 Ambari 访问兼容 Prometheus 的查询 API |
| 仪表盘模型 | 监控小组件及其布局 | 原生 React 仪表盘、面板和数据源 |
| 自定义服务接入 | 旧版时序指标定义 | 遥测描述符和适配具体版本的 JMX 配置 |
| 管理信号 | 直接 JMX 值与历史监控定义混合 | 独立保留高可用状态等管理操作所需的少量直接 JMX 属性 |

## 兼容 Prometheus 的模型 {#prometheus-compatible-model}

新路径包含四项职责：

| 层 | 职责 |
| --- | --- |
| Ambari Agent | 在 `/metrics` 暴露 Linux 主机指标，并在 `/metrics/components/{routeId}` 暴露已分配的组件路由。 |
| Ambari Server 和 Stack | 解析拓扑、端点 URL、端口、协议、身份验证和类型化 JMX 配置，并发布完整 Agent 分配。 |
| VMAGENT | 从 Ambari HTTP 服务发现获取目标，抓取目标、重标记并远程写入样本。 |
| VictoriaMetrics | 在单节点或集群拓扑中存储并提供兼容 Prometheus 的时间序列数据。 |

受管部署不需要独立的 Prometheus Server，也不使用其本地时序数据库。VMAGENT 是采集器，VictoriaMetrics 是存储和查询后端。

## 支持范围 {#supported-scope}

初始 Stack 契约涵盖 HDFS NameNode 和 DataNode 的原生 `/prom`、YARN ResourceManager 的原生 `/prom`，以及 YARN NodeManager、HBase Master、HBase RegionServer 和 HiveServer2 的类型化 JMX 转换。NodeManager 使用稳定的 Web UI `/jmx`，因为进程内的 Timeline Collector 可能将 Prometheus 输出器绑定到其他位置，使预期的 Web UI `/prom` 端点返回空内容。

Agent 主机收集器涵盖 CPU、内存、交换区、负载、运行时间、文件系统、磁盘、网络、进程线程总数以及选定的内核计数器。内核不提供可选数据源时会独立跳过。

内置 React 仪表盘涵盖 HDFS、NameNode、DataNode、HBase Master、HBase RegionServer、HiveServer2、NodeManager、ResourceManager、ResourceManager 主机指标、Linux Fleet Overview 和 Linux Host Detail。

## 优势和权衡 {#benefits-and-trade-offs}

新路径分离配置分发与指标采集，为每个组件路由提供独立验证和故障处理，并提供标准的兼容 Prometheus 目标和查询模型。完整分配携带修订哈希，JMX 配置按内容寻址；Agent 保留最后有效配置，但不缓存抓取值。

这些是架构属性，不是基准测试声明。设计不承诺特定吞吐量、延迟或资源减少比例。

对于指标消费者，此迁移会造成行为变化：不会发出旧 Categraf 或 Telegraf 名称及别名，现有仪表盘和 recording rule 必须查询新的指标清单。不会自动将历史 AMS 数据导入 VictoriaMetrics。更改部署前请保留或导出所需 AMS 数据，并使用配套迁移指南规划仪表盘和查询更新。

请参阅[监控架构](./architecture.md)、[部署](./deployment.md)、[查询和仪表盘](./queries-and-dashboards.md)以及[迁移](./migration.md)了解操作详情。
