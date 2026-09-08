---
title: Ambari 设计
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

# Ambari 设计 {#ambari-design}

Ambari 3.1 在保留集群部署和管理能力的同时，替换监控后端和主要 Web 界面。本节说明当前管理契约，不提供归档版本的安装操作流程。

## 系统边界 {#system-boundaries}

首先阅读[整体架构](./ambari-architecture.md)和[技术栈](./technology-stack.md)。Ambari Server 管理拓扑、授权、期望配置和操作记录，Agent 执行主机级任务，React 提供管理工作流。监控拥有独立的抓取、存储和查询数据面。

## 部署与安全 {#provisioning-and-security}

[Blueprint](./blueprints/index.md) 使用逻辑主机组和配置描述可重复的集群部署，集群模板再将这些组映射到实际主机。应检查异步请求状态，不能把提交成功视为安装已经完成。

[Kerberos](./kerberos/index.md) 提供身份、keytab 和服务配置管理。即使时序监控不再使用 AMS，其描述符和 KDC 设置仍是集群管理契约。

## Stack 与服务契约 {#stack-and-service-contracts}

[Stack 定义](./stack-and-services/index.md) 声明支持的服务、组件、软件包、命令、配置、依赖和升级行为。继承与公共服务复用可避免复制完整服务定义。

[增强配置](./enhanced-configs/index.md)通过服务 Theme 生成配置表单。这些表单控件与已经移除的监控小组件并非同一功能。[快速链接](./quick-links.md)根据已安装拓扑和生效配置解析服务端点。

## 运维反馈与扩展 {#operational-feedback-and-extensions}

[告警](./alerts.md) 是 Ambari 的健康检查与通知机制。安装 VictoriaMetrics 并不等于同时安装了 Prometheus Alertmanager。

[Views](./views/index.md) 通过服务器管理的视图定义、实例、权限和嵌入式应用扩展 Ambari。选择集成边界前，请阅读[扩展概览](../ambari-plugin-contribution/index.md)。

关于历史时序数据、仪表盘和 PromQL，请使用独立的[监控架构](../monitoring/architecture.md)和[服务遥测接入指南](../monitoring/service-integration.md)。
