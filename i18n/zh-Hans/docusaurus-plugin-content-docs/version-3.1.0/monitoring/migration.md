---
title: 从 AMS 迁移
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

# 从 AMS 迁移 {#migrate-from-ams}

![从 Ambari Metrics System 迁移到 Agent 遥测、VMAGENT、VictoriaMetrics 和 React 仪表盘](/img/3.1.0/handdrawn/ams-migration-zh.webp)

| 旧版集成 | 3.1.0 替代方案或操作 |
| --- | --- |
| AMS Collector/Monitor 和 timeline-metrics Sink | Agent telemetry 端点、VMAGENT 抓取以及 VictoriaMetrics 存储 |
| AMS 监控 `metrics.json` 定义 | `telemetry.json` 加类型化 JMX 配置文件 |
| 旧版监控 Widget/WidgetLayout API | React Board/Dashboard/Datasource 工作流 |
| AMS/Ganglia 指标名称和自定义小组件查询 | 将所需信号映射到新的导出清单并重写查询 |
| 旧版 Heatmaps 页面 | 原生监控仪表板；旧路由会重定向到 Metrics |
| Categraf/Telegraf 仪表板模板 | 使用原生 Ambari 仪表板或调整查询；不会导出这些模板的别名 |
| 自定义服务 telemetry | 实现[服务集成契约](./service-integration.md)，并验证实际输出 |

并非所有包含 metrics 或 widget 一词的内容都会被移除。直接 JMX 管理值、JMX 告警、Hadoop YARN Timeline Service 以及服务 Theme 表单控件仍是独立的受支持功能。

## 数据库升级不是历史数据转换 {#database-upgrade}

3.0.0 到 3.1.0 的目录会创建 `datasource`、`board`、`board_payload` 和 `chart_share` 持久化模型及其序列/约束。这些记录描述监控配置和仪表板，而不是存储在 VictoriaMetrics 中的时间序列样本。

该目录不是 AMS 历史样本或旧版小组件布局的转换器。不要根据新表名推断数据转换、归档，或所有旧表都会被删除。备份数据库，并使用正在安装的候选版本验证实际架构升级。

## 切换顺序 {#cutover-sequence}

1. 为 Server、Agents、配置和数据库建立回滚点。导出重建所需的旧版监控定义。
2. 在[平台指南](../platform/python-runtime.md)中验证运行时和软件包前提条件。
3. 按照候选版本支持的 Ambari 升级流程升级 Server 和 Agents。不要只使用新的 React 资源包而复用 3.0 软件包集合。
4. 使用[托管服务流程](./deployment.md)部署目标 VictoriaMetrics 拓扑和 VMAGENT。
5. 验证 HTTP 发现、主机/组件抓取结果、远程写入传送、数据源访问以及随包提供的仪表板。
6. 使用新的指标名称、类型、单位和权威集群标签重建自定义仪表板和集成。
7. 在停用旧读取路径前比较代表性信号和故障场景。记录监控缺口以及新的保留起始时间。

新的 Ambari 监控运行时不会将 AMS 作为并行受支持的后端维护。任何临时旧版归档或外部读取服务都应作为单独规划的运维安排。

## 自定义指标和仪表板 {#custom-metrics-and-dashboards}

名称相似的指标不一定等价。检查单位、计数器与仪表盘语义、标签集合、HA 角色过滤、缺失值行为和收集频率。使用有界标签清单，不要将进程 ID、命令行、任意对象名称或用户名复制到时间序列标签中。

从 Explorer 中经过验证的 PromQL 查询开始创建自定义仪表板。主机查询应保留 `cluster` 隔离和 `ambari_target="host"`。验证服务的 active/standby 行为，而不只是单个健康节点。

## 回滚和验收 {#rollback-and-acceptance}

仅降级 RPM 文件并不能完整回滚数据库和监控模型变更。演练一致的数据库/配置/软件包恢复。将 VictoriaMetrics 数据和 VMAGENT 队列生命周期与 Ambari 元数据库分开管理。

验收应包括 Server/Agent 重启、错过分配后的恢复、组件端点不可用、无效数据源凭据、临时存储不可用、队列恢复以及只读用户。可用的仪表板截图只能证明已捕获的场景。

## 实现参考 {#implementation-references}

迁移边界见固定版本的[telemetry 架构](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/ambari-agent-prometheus-telemetry-architecture.md)。实际架构操作位于 [UpgradeCatalog310](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/upgrade/UpgradeCatalog310.java)。
