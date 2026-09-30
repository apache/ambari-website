---
title: 开发者：服务商店如何工作
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

# 开发者：服务商店如何工作 {#how-service-store-works}

服务商店给 Ambari 增加的是“怎么安装和管理某个服务”的说明与脚本。真正把软件装到机器上，仍然使用 Ambari 原有的部署流程。所以，导入合集和安装服务是两件事。

普通使用从[服务商店](./overview.md)开始；接口和工具用法见[API 与服务接入](./authoring-and-bundling.md)。

## 三个部分，各自负责什么？ {#three-parts}

| 部分 | 负责的事情 | 例子 |
| --- | --- | --- |
| 独立的商店仓库 | 描述服务，提供配置模板和操作脚本 | Nginx 怎么安装、怎么检查 |
| Ambari Server | 检查服务包、生成目录、处理依赖，并让选中的服务定义生效 | 判断某个环境应该使用哪份 Nginx 服务包 |
| Ambari Agent | 使用选定的资源执行机器上的任务 | 安装软件、写配置、启动进程 |

这些服务定义按管理包，也就是 mpack，组织。一个合集可以装下多个管理包。参考商店仓库独立于 Ambari 核心维护，增加服务时，不必把所有服务代码都放进 Server 的源码树。

每个服务包有自己的版本。打成合集不意味着它们变成了一个服务，也不要求用户全部安装。

## 用户点击之后，发生了什么？ {#request-flow}

~~~text
Upload bundle
    -> inspect archives and member digests
    -> import package records
    -> show services in the catalog
    -> select services and destination
    -> check dependencies and preview the change
    -> accept and record an operation
    -> prepare and publish selected definitions
    -> hand off to Create Cluster / Add Services
    -> run host installation and service checks
~~~

上传和导入让服务包进入可用列表，这时还没有在机器上安装软件。用户选好服务后，Server 会计算需要哪些兼容的服务包和依赖，不要求用户手工拼出包之间的关联。

服务目录按提供者和准确的 Stack 名称、版本区分服务。这里的 Stack，可以理解为“一个环境可使用的服务定义集合”；绑定则是把服务包提供的定义关联到这个环境。

操作成功后，Server 还会再检查一次选中的服务定义，才返回安装向导需要的信息。这样可以避免页面拿着已经变化的服务定义开始安装。

## 为什么要先预览，再执行？ {#plans-and-operations}

方案记录了准备做什么、检查时商店处于哪个版本、会影响哪些集群，以及是否需要维护或重启。方案有有效期。如果环境发生变化，Server 可以拒绝旧方案，避免实际执行的内容与用户刚才确认的不一致。

操作记录则表示“这个方案已经被接收，开始执行了”。即使浏览器断开，记录也不会跟着消失，客户端可以回来继续查询同一项工作。

幂等 key 用来识别某个用户对某份准确方案的一次提交。相同请求复用它，会返回原来的操作，防止响应丢失后重复接收任务。但它不会让所有应用脚本都自动变成可以安全重复执行的脚本。

## 为什么不会锁住整个 Server？ {#scoped-publication}

Server 会记录本次变更影响哪些服务定义，在这个范围内阻止相互冲突的服务、配置和拓扑修改。不相关的普通写操作和任务可以继续。

准备文件、检查候选内容、运行服务包钩子等耗时工作，在独占发布锁之外执行。只有最后切换生效资源和保存状态时，才由协调器保护。

这不代表服务包操作可以无限并行。冲突的变更仍然需要等待或被拒绝，发布阶段也只有一个协调器。服务定义按 Stack 名称和版本共享，所以更新可能影响使用同一环境的多个集群。

已有任务继续保留与其兼容的资源引用。正在使用的组件结构，如果没有实现对应迁移，就拒绝不支持的修改；重启 Server 并不能代替迁移。

## 快照保存的是什么？ {#snapshots-and-versions}

定义快照标识一组确定的管理资源。保留这个标识后，即使正在准备新版本，Server 和 Agent 也能引用任务预期使用的脚本和元数据。

它不是业务数据的备份。回退服务定义文件，不能撤销数据库迁移，也不能找回被删除的数据。

| 版本或标识 | 表示什么 |
| --- | --- |
| 服务包版本 | 某一版安装脚本和服务定义 |
| 服务描述版本 | 服务元数据中声明的显示版本 |
| 已安装软件版本 | 机器上实际运行的应用版本 |
| 快照标识 | 某一组生效的管理资源 |

例如，参考 Kyuubi 的服务描述可能显示 1.0，而实际软件版本是 1.9.4，不能把两者当成同一个版本。

## 中断后，怎么避免重复执行？ {#recovery-design}

服务包钩子会返回结构化结果，里面带有操作、方案、压缩包、执行尝试和实际效果的信息。Server 核对这些标识后，才接受结果，不会靠搜索日志文字来判断成功。

| 阶段 | 客户端应该怎样理解 |
| --- | --- |
| `ACCEPTED`、`PREPARING` | 已记录、正在准备，还没完成 |
| `WAITING_MAINTENANCE`、`WAITING_RESTART` | 需要完成提示的维护动作，或真正重启 Server |
| `PUBLISHING` | 正在切换生效的服务定义 |
| `SUCCEEDED` | 操作完成，使用结果前仍要核对是否属于本次操作 |
| `FAILED` | 已失败，重试前先看错误和已产生的效果 |
| `RECOVERY_REQUIRED` | 结果还没查清楚，不能当作成功 |
| `CANCELLING`、`CANCELLED` | 正在取消，或已经取消完成 |

恢复会核对已有结果，已经完成的效果不重复执行。无法确认的效果继续保留为未解决。只有满足条件、确认没有产生效果且支持幂等行为的失败钩子，才允许重试。

在线执行的服务包钩子必须声明 `scope: "DEFINITIONS"`。未声明时按 Server 范围的效果处理，不允许在线执行，但仍可以导入。这个声明约束的是支持的行为范围，不是操作系统级沙箱。

## 完整配置文件是怎么保存的？ {#configuration-content}

服务可以声明一个名为 `content` 的配置属性，用来保存整份原生配置文件。编辑器把它保存成 Ambari 的配置版本，Agent 脚本在配置任务或重启任务中填入必要的管理值，再应用到服务。

这样，上游增加参数时，不必每次都增加新的表单字段。服务包默认值更新后，用户已经保存的内容会保留。配置组如果覆盖完整文件，替换的是整份文档，不会逐行合并。

Nginx 和 PostgreSQL 会在替换前检查候选文件，并保留原文件用于恢复。单个文件的替换是原子的，但多个文件一起更换并不构成一个崩溃时也保持原子的事务。有人同时在外部修改文件时，需要先核对冲突。

## 想看代码，从哪里开始？ {#source-map}

下面的名称对应[源码版本说明](../release-baseline.md#runtime-mpack-follow-up)记录的开发快照，需要在包含这项实现的源码中查看，并不表示这些代码已经作为正式版本发布。

| 源码位置 | 适合了解什么 |
| --- | --- |
| `MpackLifecycleApiService` | HTTP 接口入口 |
| `MpackServiceCatalog` | 服务选择和兼容的安装位置 |
| `MpackLifecycleService` | 预览、接收、发布和恢复 |
| `MpackLifecycleState` | 方案、操作和结果的数据约定 |
| `dev-support/mpack` | CLI、校验、生成模板和整体打包 |
| `ambari-web/latest/src/screens/Mpacks` | 商店选择、导入和进度页面 |
| `docs/mpack/http-api.md` | 详细的 HTTP 接口约定 |

软件升级、数据备份、自动清理缓存，以及尚未接入的服务部署模式，仍然需要分别实现。服务包的生命周期管理不会自动完成这些工作。
