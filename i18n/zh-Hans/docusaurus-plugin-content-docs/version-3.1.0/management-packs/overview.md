---
title: Mpack 商店概览
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

# Mpack 商店概览 {#mpack-store-overview}

mpack 商店是独立维护的 Ambari 服务定义与生命周期脚本集合。分发方可以把选定的发布版本打成一个 `mpackstore.bundle.tar.gz`。管理员整体导入后，再通过 Ambari 的正常部署向导选择要管理的服务。

:::info 开发快照
本组文档描述 2026-09-29 检查的 `AMBARI-26663` 开发实现，包括 Ambari 提交 `3a71190847` 和参考商店提交 `c10a271`。使用前需确认构建包含该实现。3.1 文档仍为预览版，这些快照不代表 ASF 正式发布或生产支持矩阵。参见[源码基线](../release-baseline.md#runtime-mpack-follow-up)。
:::

## 商店包含什么 {#store-contents}

完整商店 bundle 用于运输独立版本的管理包、清单、服务描述、配置定义和安装管理脚本。参考快照共包含十一个包：一个基础包和十项可选择的服务。

主机软件来自各包声明的软件仓库、经校验的二进制归档、Python 依赖或固定源码构建。导入商店不会把全部运行时软件下载到每台主机；应在安装前准备好这些来源，断网环境尤其如此。

| 对象 | 用途 | 示例 |
| --- | --- | --- |
| Bundle | 一次运输多个独立管理包 | `mpackstore.bundle.tar.gz` |
| 管理包发布版本 | 标识不可变的管理定义 | `nginx/1.0.1.1` |
| Stack 上下文 | 定义服务可以绑定的环境 | `GENERIC/1.0` 或 `BIGTOP/3.3.0` |
| 目录服务 ID | 在部署计划中选择准确的提供方和上下文 | 服务目录返回的 ID |
| 服务描述版本 | 提供服务元数据中的版本标签 | `metainfo.xml` 中的版本 |
| 软件版本 | 标识主机上安装的应用 | Trino `483` |
| 操作 | 跟踪持久化的管理包变更及恢复 | 操作 ID 和权威阶段状态 |

服务名称旁的版本来自描述元数据，不能替代对已安装软件版本的实际观察。例如 Kyuubi 的描述版本可以是 `1.0`，而参考运行时是 `1.9.4`。选择器里的包版本标识管理定义。修改包内脚本本身，不会自动升级应用二进制或数据库结构。

## 从导入到运行的完整流程 {#end-to-end-flow}

| 阶段 | 需要确认的结果 |
| --- | --- |
| 获取与检查 | Bundle 的分发方、版本和摘要符合预期 |
| 上传与导入 | 管理包版本出现在目录中，尚未部署主机软件 |
| 选择服务与目标 | 每项服务只选一个提供方，且目标环境兼容 |
| 启用定义 | 管理包操作达到经验证的成功状态 |
| 使用向导部署 | 主机分配和配置产生成功的安装、启动任务 |
| 执行服务检查 | 服务正确响应，检查结果属于实际执行的请求 |
| 日常管理 | 编辑配置、查看告警、执行已声明的生命周期命令 |

导入包含多项服务的 bundle 不会自动选择全部服务。Server 会为所选服务解析必要的管理包依赖和绑定；部署前提条件仍需要管理员提供。

新集群的交接进入创建集群流程；兼容已有集群的交接进入添加服务流程，并保留所选服务。服务定义操作成功，不代表随后的软件安装已经完成。

## 管理权限与影响范围 {#administration-and-scope}

管理包入口属于 Ambari 管理员功能。运行时接口要求已认证的管理员身份以及 `AMBARI.MANAGE_STACK_VERSIONS` 权限。服务部署和后续生命周期操作仍遵守各自的权限与校验规则。

商店在一台 Ambari Server 内全局可见。定义按准确的 Stack 名称和版本共享绑定，并不为每个集群提供独立的定义版本。因此，更新定义可能影响使用同一上下文的多个集群，需要检查计划中的受影响集群与维护要求。

管理包操作会预留受影响的定义范围，不涉及该范围的普通写操作和任务可以继续执行。这不意味着服务定义正在替换时，仍可并发执行与其冲突的服务、配置或拓扑变更。参见[操作恢复](./operations-and-recovery.md)。

## 按任务选择阅读路径 {#reading-paths}

- 部署人员：先阅读[商店使用流程](./store-guide.md)，再检查[服务前提条件](./service-catalog.md)。
- 修改服务配置的管理员：阅读[完整内容配置指南](./content-configuration.md)。
- 管理包维护者：阅读[编写与整体打包](./authoring-and-bundling.md)。
- 处理失败或中断的操作人员：阅读[操作与恢复](./operations-and-recovery.md)。
- Web 用户：阅读[工作区导航与外观](../frontend/workspace-and-appearance.md)和[监控交互](../monitoring/queries-and-dashboards.md#workspace-interactions)。

## 当前能力边界 {#current-boundaries}

参考验收环境为带 systemd 的 Rocky Linux 8 / aarch64。各服务对 Java、Python、数据库、软件仓库和网络的要求不同。仓库中保留了其他平台的定义，并不等于已验证那些平台上的部署。

首批服务包主要覆盖基础安装、配置、启停和服务检查。高可用、自动故障转移、拓扑扩容、软件升级、数据库迁移与生产安全能力因服务而异，不能默认具备。安装服务也不会自动接入它的 exporter 和仪表盘。

运行时商店流程与旧版 `ambari-server install-mpack` 的清单和激活行为不同。混用旧说明前，请先阅读[管理包兼容性入口](../ambari-design/stack-and-services/management-packs.md)。
