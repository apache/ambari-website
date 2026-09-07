---
title: Apache Ambari 3.1.0 概览
slug: /
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

# Apache Ambari 3.1.0 概览 {#ambari-310-overview}

| 领域 | 3.1.0 变更 | 指南 |
| --- | --- | --- |
| 监控 | 使用兼容 Prometheus 的采集、VMAGENT、VictoriaMetrics 和原生 React 监控替换 AMS | [架构比较](./monitoring/architecture-comparison.md) |
| 用户界面 | 将 React 作为从 Ember 延续而来的运维和管理工作流的主要体验 | [React 用户界面](./frontend/react-ui.md) |
| Java | 统一 JDK 17/Maven 3.9 基线、受管理的框架依赖以及独立的 Ambari/Stack JDK 选择 | [Java 依赖](./platform/java-dependencies.md) |
| Python | 使用锁定的上游发行版和标准库 API 替换树内维护的第三方分支 | [Python 运行时](./platform/python-runtime.md) |
| 分发 | 明确 Python ABI、目标架构、依赖来源和 RPM 内容 | [RPM 打包](./platform/rpm-packaging.md) |

新的监控系统不是 AMS 配置开关。指标名称、仪表板存储、服务描述符和存储部署都会变化。在替换现有安装之前，请先规划迁移。

## 阅读路径 {#reading-paths}

- 部署监控的运维人员：先阅读[部署](./monitoring/deployment.md)，然后阅读[查询和仪表板](./monitoring/queries-and-dashboards.md)。
- 现有 3.0.0 安装：从[升级检查清单](./upgrade-guide.md)和[监控迁移](./monitoring/migration.md)开始。
- Stack 维护者：阅读[架构](./monitoring/architecture.md)和[服务遥测契约](./monitoring/service-integration.md)。
- 软件包构建者：结合阅读 [Java](./platform/java-dependencies.md)、[Python](./platform/python-runtime.md) 和 [RPM](./platform/rpm-packaging.md) 契约。

## 图解文档 {#illustrated-guides}

| 图解主题 | 文档 |
| --- | --- |
| Ambari 整体架构 | [Ambari 架构](./ambari-design/ambari-architecture.md) |
| React 请求生命周期 | [React 用户界面](./frontend/react-ui.md) |
| 仓库模块图 | [Ambari 代码布局](./ambari-dev/ambari-code-layout.md) |
| Stack 和服务结构 | [Stack 和服务](./ambari-design/stack-and-services/overview.mdx) |
| Blueprint 集群创建 | [Blueprint](./ambari-design/blueprints/index.md) |
| Kerberos 启用 | [Kerberos](./ambari-design/kerberos/index.md) |
| 构建流水线 | [从源码构建](./ambari-dev/building-from-source.md) |
| 安装和 Agent 注册 | [安装指南](./quick-start/installation-guide.md) |
| 监控架构 | [监控架构](./monitoring/architecture.md) |
| VictoriaMetrics 拓扑 | [监控部署](./monitoring/deployment.md) |
| 服务遥测集成 | [服务集成](./monitoring/service-integration.md) |
| AMS 迁移 | [监控迁移](./monitoring/migration.md) |
| 仪表盘查询链路 | [查询和仪表盘](./monitoring/queries-and-dashboards.md) |
| 告警评估与通知 | [告警](./ambari-design/alerts.md) |
| 配置解析 | [增强配置](./ambari-design/enhanced-configs/index.md) |
| 请求、任务与恢复状态 | [Ambari 架构](./ambari-design/ambari-architecture.md) |

## 版本边界 {#version-boundaries}

这些页面介绍的是 Ambari 3.1.0，而不是新的 3.0.x 维护版本。现有 3.0.0 文档仍是 AMS 和旧版打包说明的历史参考。

Ambari 发布版本号、BIGTOP Stack 版本和 VictoriaMetrics 软件版本彼此独立。位于 BIGTOP 3.2.0 下的 Stack 描述符可以由另一个 Stack 版本继承；其目录名称不是 Ambari 发布版本要求。请使用正在部署的软件包中的 Stack 元数据。

在 3.1.0 处于预览阶段时，网站文档默认入口仍是已发布的 3.0.0 版本。有关变更摘要，请参阅[发行说明](./release-notes.md)；有关审查过的版本，请参阅[源代码基线](./release-baseline.md)。
