---
title: 告警
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

# 告警 {#alerts}

Ambari 告警使用 Stack 服务提供的定义和 Ambari 告警 API 评估服务健康状况。告警定义标识服务/组件目标、间隔、阈值或检查实现及其报告状态。

![Stack 和 API 告警定义经过间隔调度、检查、状态评估和历史记录，并由 React 展示和可选通知分发](/img/3.1.0/handdrawn/alert-lifecycle-zh.webp)

*每个配置周期都会评估并记录告警状态和历史。通知交付是从评估状态分出的独立可选链路。*

## 定义类型 {#definition-types}

Stack 的 `alerts.json` 定义可以使用适合服务的检查。`WEB` 检查 HTTP 端点，`PORT` 检查 TCP 可达性，`SCRIPT` 运行服务健康脚本，`JMX` 在服务暴露 JMX 时评估 JMX 值。这些检查彼此不同，不能视为可互换的 Prometheus 集成。

定义会分组并关联到服务。Ambari 按配置间隔进行评估，并记录 `OK`、`WARNING`、`CRITICAL` 或 `UNKNOWN` 状态。告警 API 通过常规 Ambari Server API 暴露定义、组、当前状态和历史记录。

## 配置和权限 {#configuration-and-permissions}

告警定义可以从有效服务配置解析主机、端口、协议和凭据。请将机密值保存在受保护的 Ambari 配置中，不要将密码放入 Blueprint 或告警示例。用户需要相关集群和服务权限才能读取或修改告警定义和组。

通知与评估分离。启用后，Ambari 可以通过已配置的通知目标分发告警通知，包括电子邮件、SNMP 或脚本。本文不定义 Prometheus Alertmanager 集成或 AMS 端点。

## 使用告警 API {#use-the-alert-api}

1. 在 Ambari API 中检查服务告警定义和组。
2. 确认检查使用的有效配置。
3. 等待配置间隔或执行检查，并查看生成的状态。
4. 修正告警报告的端点、端口、脚本、JMX 属性、阈值或服务状态。
5. 将通知交付与告警状态分开验证。

当前定义和检查实现位于固定版本的 [BIGTOP 服务资源](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP)和[告警分发器](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/notifications/dispatchers)。
