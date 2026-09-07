---
title: Ambari 3.1 整体架构
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

# Ambari 3.1 整体架构 {#ambari-31-architecture}

![Ambari Server、Agent、React 应用、元数据库、受管服务和监控数据平面](/img/3.1.0/handdrawn/overall-architecture-zh.webp)

| 组件 | 职责 |
| --- | --- |
| Ambari Server | REST API、授权、拓扑和配置、操作调度、Agent 协调、Stack 元数据及监控查询边界 |
| 元数据数据库 | 持久化管理状态、配置版本、请求和任务记录、用户和权限数据，以及监控仪表盘和数据源定义 |
| Ambari Agent | 主机注册、软件包和配置处理、服务生命周期脚本、命令状态以及 Linux 和组件遥测端点 |
| React Web 与 Admin 应用 | 根据 Server 状态提供经过授权的运维和管理工作流 |
| 受管服务 | 已安装 Stack 定义的 Hadoop 生态系统进程 |
| VMAGENT 与 VictoriaMetrics | 独立的指标抓取、远程写入缓冲、时序存储和查询 |

## 请求与数据路径 {#request-and-data-paths}

下图表示控制和请求路径，指标响应会返回采集器：

```text
React / Admin UI -> Ambari REST API -> Ambari Server -> Metadata database
                                          |
Stack metadata ---------------------------+
                                          |
                                          +-> Agent commands -> Service scripts
                                          +-> Telemetry assignments -> Agent exporter

VMAGENT -> HTTP service discovery -> Ambari Server
VMAGENT -> Agent exporter -> Linux /proc and service endpoints
VMAGENT -> remote write -> VictoriaMetrics
React -> Ambari query proxy -> VictoriaMetrics
```

Server 将操作记录为请求和任务。Agent 脚本执行主机任务并报告状态，界面通过 REST 和实时更新观察权威状态。API 提交成功不等于操作已经完成。

## 请求、任务与恢复状态 {#request-task-recovery-state}

![持久化的 Ambari 请求、阶段、主机任务、Agent 命令、状态报告、重连恢复和受支持重试](/img/3.1.0/handdrawn/request-task-recovery-zh.webp)

*刷新和重连会重新加载 Server 持久化状态，而不是重新启动工作。受支持的重试从失败边界创建后续工作，不会静默重复已完成任务。*

## 配置与扩展 {#configuration-and-extensions}

Stack 元数据决定哪些服务、组件、配置属性、依赖和命令有效。Agent 任务下发前会解析配置版本及主机或配置组覆盖。[Blueprint](./blueprints/index.md)、[Stack 继承](./stack-and-services/stack-inheritance.md)和 [Theme](./enhanced-configs/index.md) 都建立在这些契约之上。

扩展必须保留权限、状态转换、取消、重试和刷新恢复行为。仅增加 React 路由或按钮，并不能构成受支持的管理操作。

## 监控分离 {#monitoring-separation}

遥测描述符和 JMX 配置会被编译成每台主机的完整分配。Agent 端点暴露当前值，指标样本不通过 Agent 心跳传输。VMAGENT 发现并抓取目标，再将样本发送到 VictoriaMetrics。

元数据数据库保存数据源和仪表盘定义，而不是历史指标样本。管理和健康检查需要的少量直接 JMX 值，与时序监控保持独立。详见[监控架构](../monitoring/architecture.md)。

## 安全与恢复 {#security-and-recovery}

Ambari API 授权、Agent 注册和信任、组件 Kerberos 身份验证、指标端点网络访问以及数据源凭据，是不同的安全边界，需要分别配置和验证。监控查看权限并不包含服务安装或配置修改权限。

应根据 Server 请求和任务状态，通过工作流支持的重试方式恢复失败操作。回滚前应验证软件包、数据库和配置的一致性，详见[升级指南](../upgrade-guide.md)。

## 源码参考 {#source-references}

参见固定版本的 [Server 源码](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server)、[Agent 源码](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-agent/src/main/python/ambari_agent)和 [React 路由](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-web/latest/src/router/RoutesList.tsx)。
