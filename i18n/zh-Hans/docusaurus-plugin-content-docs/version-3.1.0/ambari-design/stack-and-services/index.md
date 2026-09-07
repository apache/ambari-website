---
title: 堆栈和服务
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

# 堆栈和服务 {#stacks-and-services}

Ambari 将堆栈管理为按版本划分的服务集合。堆栈版本选择服务定义、软件包、配置、生命周期脚本和升级元数据。服务由 MASTER、SLAVE 和 CLIENT 等组件组成，每个组件都有生命周期命令和部署规则。

当前 BIGTOP 堆栈展示了这一模型：堆栈服务可以从 `common-services` 继承共享定义，而堆栈专用元数据会覆盖继承的定义。堆栈和服务描述符是 `metainfo.xml` 文件；其中的字段定义身份、组件、命令、配置依赖、软件包和支持的操作系统。

指标按用途区分。服务的 `metrics.json` 描述 Ambari 为该服务收集的控制平面指标。当前 BIGTOP 监控设计另外使用 `telemetry.json` 配置遥测提供程序；它不会替代 Ambari 保留的控制平面 `metrics.json` 契约。本页不介绍已退出的 AMS/Ganglia 或 Ember 工作流。

请参阅[堆栈和服务概览](./overview.mdx)、[编写 metainfo.xml](./writing-metainfo.md)和[升级指南](../../upgrade-guide.md)。
