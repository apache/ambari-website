---
title: 管理包操作与恢复
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

# 管理包操作与恢复 {#mpack-operations-recovery}

在管理包的**操作记录**中跟踪定义变更，在 Ambari 正常的请求、任务页面中跟踪主机安装和服务操作。两种记录的身份与完成条件不同。

以下说明适用于[运行时预览](./overview.md)，不适用于手工修改 Server 资源目录或数据库记录的做法。

## 理解操作阶段 {#operation-phases}

| 阶段 | 含义与下一步 |
| --- | --- |
| `ACCEPTED` | 持久化提交已存在，等待处理 |
| `PREPARING` | 正在准备候选资源和前提条件 |
| `WAITING_MAINTENANCE` | 检查影响范围、阻塞项和所需维护操作 |
| `WAITING_RESTART` | 需要真正重启 Server，按该操作的重启流程处理 |
| `PUBLISHING` | 正在发布已验证的定义视图 |
| `SUCCEEDED` | 使用部署交接前，核对操作身份与实际结果 |
| `FAILED` | 检查准确错误和回执，判断是否需要新计划或符合条件的重试 |
| `RECOVERY_REQUIRED` | 结果仍未确定，先核对已有回执再决定后续操作 |
| `CANCELLING` | 正在核对取消过程，尚未完成 |
| `CANCELLED` | 已按 Server 验证过的策略完成取消 |

HTTP 202 只表示已接受，不表示已完成。超时、响应缺失、日志文字或未知状态，都不能直接当作成功。

## 断开后保留操作身份 {#preserve-identity}

提交前保留准确的 `plan_id`、`plan_digest` 和幂等键。得到响应后，也要保留 `operation_id` 与 `generation`。浏览器按当前账号保存待确认的提交检查点，并在接受结果不确定时提供核对入口。

以相同用户、计划和键重放，会返回原来的操作。丢失响应后另造一个键或计划，可能产生另一项工作，应先核对原提交是否被接受。已经明确拒绝的过期计划可以重新预览。

共享操作历史与另一个账号的本地检查点不是一回事，不要通过复制他人的浏览器检查点或凭据来强行恢复。

## 使用 CLI 查看状态 {#inspect-cli}

使用[编写与打包](./authoring-and-bundling.md#cli-import)中介绍的匹配 CLI，并替换为实际记录的操作 ID：

~~~shell
ambari-mpack --json operations list
ambari-mpack --json operations show "$OPERATION_ID"
ambari-mpack --json operations members "$OPERATION_ID"
~~~

检查阶段、错误码、受影响范围、成员身份和 hook 回执。诊断信息用于解释问题，自动化判断则必须使用结构化字段和准确标识。

## 核对、重试与取消 {#recovery-actions}

**核对恢复**要求 Server 确定已经发生的事情，不会盲目重新执行 hook：

~~~shell
ambari-mpack --json operations recover "$OPERATION_ID"
~~~

**重试**用于符合条件的失败 hook，要求有权威的未产生效果观察，并支持幂等执行：

~~~shell
ambari-mpack --json operations retry "$OPERATION_ID"
~~~

**取消**取决于已经保留的效果与当前操作状态：

~~~shell
ambari-mpack --json operations cancel "$OPERATION_ID"
~~~

应根据观察到的状态选择动作。这些命令是不同选项，不能作为脚本依次全部执行。已产生或尚未确定的效果可能阻止取消、重试；已完成的效果不会重放。取消中断后继续的是取消流程，不会重新开始原来的安装或更新。

## 维护范围与并发 {#scoped-maintenance}

耗时的准备、验证和 hook 子进程工作放在独占发布锁之外。协调器保护最终视图切换及持久化，预留机制只阻止受影响的定义消费者和相关服务、配置、拓扑变更。

无关的普通写操作和任务可以继续，但这不表示所有管理包发布都能并发，也不表示两个冲突变更可以同时修改同一定义。共享 Stack/版本可能影响多个集群。

阻塞任务由集群、请求、任务 ID 和权威状态标识。已有任务保留兼容的资源引用。活跃 Stack 升级或不支持的在用组件模型变化可能导致计划被拒绝；重启 Server 不能替代尚未实现的组件迁移。

## 区分定义、软件、配置和数据 {#different-change-types}

| 变更 | 实际修改的对象 | 仍可能需要单独完成的工作 |
| --- | --- | --- |
| 导入新版 bundle | 登记更多定义版本 | 显式选择并激活版本 |
| 更新活跃定义 | 脚本、元数据和管理资源绑定 | 升级主机软件或迁移组件 |
| 保存 content | 创建 Ambari 配置版本 | Reload、重启与原生验证 |
| 退役或卸载定义 | 移除符合条件的定义归属和可用性 | 显式退役服务并落实数据策略 |
| 恢复应用数据 | 服务自身的数据状态 | 经验证的备份恢复流程 |

其他包、绑定、操作、服务或集群仍在使用资源时，移除可能失败。旧版本记录也可能为追溯而保留。不要通过删除 Server 目录或数据库行绕过引用检查。

参考包在停止和定义退役时保留用户持久数据，但这不是通用回滚引擎。PostgreSQL 声明的备份恢复操作有自己的隔离目标和结果观察规则，不能推广为每个服务都具备相同能力。

## 按现象排查 {#troubleshooting}

| 现象 | 首先检查 | 恢复方向 |
| --- | --- | --- |
| 看不到管理包入口 | 当前账号及管理员授权 | 使用授权账号，直接访问 URL 也不能绕过 Server 权限 |
| 导入成功，但主机上没有应用 | 服务选择与部署交接 | 继续创建集群或添加服务向导 |
| 服务不可用 | 目录原因和兼容的 Stack 上下文 | 修正依赖或目标定义，再刷新目录 |
| 多项服务无法一起选择 | 准确 Stack 上下文与目标集群 | 按兼容环境分组部署 |
| 提交响应丢失 | 已保存的计划、键和操作记录 | 核对原提交 |
| 计划以 `STALE_PLAN` 拒绝 | 目录修订及变化的前提 | 明确拒绝后重新预览 |
| 移除时报 `RESOURCE_IN_USE` | 资源引用关系 | 通过受支持的生命周期操作解除实际使用 |
| 一直处于 `WAITING_RESTART` | 是否真正重启 Server，以及后续操作观察 | 完成规定的重启与核对步骤 |
| 包操作成功，但安装失败 | 主机请求、任务和原生观察 | 修复主机前提或配置，不要盲目重新导入 |
| 所有图表都没有数据 | 时间范围、刷新状态、数据源和近期目标观察 | 按[监控指南](../monitoring/queries-and-dashboards.md#workspace-interactions)处理 |

## 报告中应保留的证据 {#report-evidence}

记录 Server/Agent 构建、包名称和版本及摘要、准确计划与操作身份、受影响集群、观察到的阶段和错误码、相关任务 ID、软件观察，以及已经尝试的恢复动作。配置问题应附脱敏差异和配置版本身份。

不要把密码、令牌、Cookie、数据库连接秘密或私钥放进报告和截图。包成功记录、服务任务结果和监控查询结果应分别标识。
