---
title: React 用户指南
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

# React 用户指南 {#react-user-guide}

## 主 UI {#primary-ui}

Ambari 3.1 使用 `ambari-web/latest` 中的 React 应用作为主要 Web UI。它保留 Ambari shell、身份验证、路由、授权、服务上下文，以及此前由 Ember 应用提供的主要运维工作流。

主要 React 体验涵盖集群安装、主机、服务、配置编辑、后台操作、告警、Kerberos、高可用、升级、管理、Views、服务 Theme，以及权限和功能标志控制。这些工作流已在当前 React 代码树中实现，但仍需结合 Ambari Server、stack、拓扑和用户角色进行验收。

## 打开 Ambari {#opening-ambari}

正常打开 Ambari Web 基础 URL。3.1 引导页使用主要 React 入口 `/latest/#`。

没有浏览器偏好设置时默认选择 React。必要时，部署可以将旧的浏览器偏好迁移到主要 React 入口。引导行为由 `ambari-web/public/index.html` 实现。

历史 Ember 应用仅用于迁移比较；本指南不将其作为 3.1 的运行路径介绍。

## 工作流覆盖范围 {#workflow-coverage}

### 安装和主机 {#installation-and-hosts}

Installer 和 Add Host 流程引导 stack 选择、主机注册、引导、组件分配、配置组、安装和请求进度。Hosts 支持分页、排序、筛选、选择、组件操作、维护、停用/重新启用、日志、告警、stack 版本和 Add Host 恢复。

主机选择会在导航和刷新过程中保留。选中的主机镜像到本地浏览器状态，离开 Hosts 模块时筛选条件会重置。近期修复还解决了从 Hosts List 打开 Host Summary 时组件加载问题。

### 服务和配置 {#services-and-configurations}

服务页面提供摘要、组件状态、操作、快速链接、配置组、覆盖、验证、建议和只读行为。支持仪表板的服务会显示 Metrics 选项卡。配置保存保留默认组的完整属性集，并报告验证或请求失败。

Capacity Scheduler 使用合并的 `capacity-scheduler.xml` 键值编辑器。成功修改后，Ambari 可以提示用户刷新 YARN 队列，并向 ResourceManager 提交刷新操作。

### 后台操作和告警 {#background-operations-and-alerts}

后台操作整合请求快照、实时更新、任务和主机详情、日志、筛选、进度、失败状态、重试操作和 Request Schedule 状态。轮询是串行的，计划请求与普通请求 ID 保持区分。

![React 运维请求从权限检查、Server 持久化任务、Agent 执行到状态更新和重试的完整生命周期](/img/3.1.0/handdrawn/react-request-lifecycle-zh.webp)

*API 接受请求只表示操作已经开始。React 持续读取 Ambari Server 保存的权威请求和任务状态，直到操作成功或失败。*

告警提供列表、详情、创建、编辑、删除、分组、授权、轮询和失败反馈。指标告警定义及旧 Metrics 数据不属于非 Metrics 对等范围。

### HA、Kerberos 和升级 {#ha-kerberos-and-upgrades}

React 工作流覆盖 NameNode/JournalNode HA、ResourceManager HA、Ranger Admin HA、联邦，以及相关安装、KDC 凭据、持久化、请求进度、重试和所有者路径。Kerberos 支持描述符/配置、凭据门控、服务安装和恢复检查点。

Stack 管理包括版本列表、仓库信息、升级和降级启动、预检查、进度、暂停/恢复、历史、服务帐户和自动启动控制。升级和 HA 工作流在需要时使用持久化检查点和所有者保护。

### Views 和 Theme {#views-and-themes}

Views 从已认证的 React shell 列出，并在服务器提供的同源 iframe 上下文中打开。View-only 用户获得精简 shell，并可直接导航到 Views。Ambari Admin 是位于 `ambari-admin/src/main/resources/ui/ambari-admin` 的独立 React 模块；其打包的 React `latest` 输出与主 UI 一起构建。

服务 Theme 提供 stack 定义的布局、配置 widget、属性、条件、建议以及只读/权限处理。Theme 解析和代表性消费者已经存在；完整的自定义 stack 和往返组合仍需验收。

## 原生 Monitoring {#native-monitoring}

React 在 `/main/monitoring` 提供原生 Prometheus 兼容监控区域，包括数据源管理、PromQL 探索、仪表板、仪表板编辑/导入/导出/克隆、抓取目标、共享图表，以及由数据源驱动的集群和服务仪表板。参阅[查询和仪表板](../monitoring/queries-and-dashboards.md)。

监控路由使用 `CLUSTER.VIEW_METRICS` 保护集群查询、仪表板、探索器和数据源；使用 `HOST.VIEW_METRICS` 保护抓取目标；使用 `SERVICE.VIEW_METRICS` 保护服务 Metrics 选项卡；数据源和仪表板修改另有独立的变更保护。

旧的独立 Dashboard Heatmaps 路由会重定向到 `/main/dashboard/metrics`。这是有意的替换边界：React 不提供 AMS 或 Ganglia 兼容路径，旧 Heatmaps 或 AMS/Ganglia 行为不应被视为尚未完成的 React 工作。

## 构建和部署 {#build-and-deployment}

Maven 的 `ambari-web` 模块使用配置的 Node/npm 工具链，从 `ambari-web/latest` 构建主要 React 应用并写入 `latest/dist`；Maven 会将该输出复制到服务器 Web UI 构件中。独立的 `ambari-admin` 模块从 `src/main/resources/ui/ambari-admin` 构建 Admin React 应用，并将输出打包到 `classes/latest`。

升级和管理流程参阅[升级指南](../upgrade-guide.md)。部署构件应使用目标 Ambari 安装相同的基础路径、代理上下文和身份验证模式进行检查。

## 验收清单 {#acceptance-checklist}

本指南的证据边界如下：

* 已实现工作流：上述领域已有 React 路由、屏幕、API 客户端、权限保护，以及文档化的后备、空状态和错误状态。
* 真实 stack 验证：安装、升级、服务操作、HA/Kerberos、Views、Theme、Prometheus 数据源连接、目标健康状态和仪表板查询需要真实 Ambari Server 及代表性 stack/拓扑。
* 角色验证：直接 URL、只读用户、变更权限、View-only 用户、集群隔离和 Admin View 转换需要代表性的授权响应。
* 恢复验证：浏览器刷新、会话过期、SSO、服务器重启、请求失败、重试、过期响应、轮询清理和持久化工作流所有权需要浏览器/服务器执行验证。
* 源码参考：React 审计使用 PR4182 head `4e95d2e3` 和合并后的 trunk `94c6389a96` 作为代码证据。这些引用说明实现来源，不代表所有运行时验证均已完成。
