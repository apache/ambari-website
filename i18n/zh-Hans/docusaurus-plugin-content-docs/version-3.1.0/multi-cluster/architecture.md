---
title: 多集群架构
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

# 多集群架构 {#multi-cluster-architecture}

Ambari 可以通过一台 Server 和一套元数据数据库管理多个独立集群。每个集群拥有自己的服务、主机分配、配置、请求和权限。运维人员还可以选择让新的 HBase 部署使用其他集群中的托管 HDFS 与 ZooKeeper 服务。

本指南说明 [AMBARI-26656 / PR #4216](https://github.com/apache/ambari/pull/4216) 合入的实现，并于 2026-09-22 对照 trunk `fc07b5cb873dc154c48349085494e664baf6b9d1` 核查。它属于 3.1.0 **预览**文档，不构成正式版本的支持认证，详见[源码基线](../release-baseline.md)。

建议先阅读[创建与使用集群](./getting-started.md)，再阅读 [HBase 托管依赖](./managed-dependencies.md)和[运维与恢复](./operations.md)。

## 控制平面与集群边界 {#control-plane-and-cluster-boundaries}

![手绘多集群架构：两个按 URL 隔离的浏览器标签页，共享 Ambari Server 与数据库，各集群拥有独立的 Agent 主机](/img/3.1.0/handdrawn/multi-cluster-architecture-zh.webp)

图中展示了两个使用本地服务依赖的独立集群。两组 Agent 都注册到同一台 Ambari Server，由 Server 向对应主机分发任务，并持久化每个请求所属的集群。共享 Server 不会合并两个 HDFS 命名空间或 ZooKeeper 集群。

| 边界 | 含义 |
| --- | --- |
| Server 与数据库 | 共享管理可用性、升级和备份范围。多集群管理不会额外提供 Server 高可用。 |
| 集群 | 独立的服务部署、期望配置、授权和操作范围。 |
| 主机 | 可以已注册但未分配，也可以归属一个运行时集群；同一台主机不能同时成为两个集群的成员。 |
| 服务 | 部署身份为 `(cluster_id, service_name)`，A 中的 HBase 与 B 中的 HBase 是不同部署。 |
| 托管依赖 | 显式的消费方与提供方关系。提供方保留服务生命周期与数据所有权。 |
| 远程集群注册 | 用于引用远程集群的已有独立集成，不会把另一台 Server 的主机导入当前运行时，也不构成生命周期联邦管理。 |

Server 故障会影响所有集群的管理操作。服务守护进程有各自的可用性机制，不能假设 Server 故障会令所有服务停止，也不能假设所有操作仍然可用。多个集群共享 HDFS 或 ZooKeeper 提供方时，提供方故障也会影响其消费方。

## 路由与权限隔离 {#route-and-authorization-isolation}

运维 URL 中明确包含集群名称：

```text
/latest/#/clusters/analytics-a/main/hosts
/latest/#/clusters/analytics-b/main/services/HBASE/summary
/latest/#/clusters
/latest/#/services

/api/v1/clusters/analytics-a/services/HBASE
/api/v1/clusters/analytics-b/services/HBASE
```

最后两个浏览器路由是全局授权目录。选择服务后，URL 会明确该服务所属的集群。不同标签页可以同时查看不同集群，不会把某个全局“当前集群”值作为权限依据。

React 按登录用户与路由作用域划分运行时。切换集群会使旧请求、缓存、轮询和事件消费逻辑失效，避免它们更新新页面。最近使用的数字集群 ID 偏好仅用于导航，仍需经过 Server 当前授权和集群目录验证。

Server 授权才是安全边界。AMBARI 作用域的授权全局生效，CLUSTER 作用域的授权仅对目标集群生效。集群管理员不因此获得 Ambari 管理权限。服务端 STOMP 授权与投影限制事件投递，请求与任务读取也检查实际归属；仅靠浏览器过滤无法保护其他集群的信息。

## 持久化身份与恢复 {#persistent-identity-and-recovery}

| 身份 | 用途 |
| --- | --- |
| 数字集群 ID | 重命名后保持稳定，兼容的 REST 路径仍使用集群名称。 |
| 创建草稿 UUID | 标识一次安装意图、其所有者，以及由该草稿创建的确切集群。 |
| 工作流作用域与修订号 | 隔离安装草稿与集群工作流；拒绝过期写入，避免覆盖其他会话的检查点。 |
| 绑定 UUID | 标识一条 HDFS 或 ZooKeeper 托管关系及其私有命名空间。 |
| 快照版本与指纹 | 标识已批准的提供方与客户端配置，以及消费方拓扑和安全输入。 |
| 操作 ID 与 epoch | 关联一次尝试，排除先前操作遗留的过期结果。 |
| 部署 UUID 与尝试 ID | 持久化安装、启动和检查流程，不依赖浏览器会话存活。 |
| 请求、任务与主机 ID | 将执行结果关联到精确的调度任务和经过授权的主机。 |

创建时提交 `creation_draft_id`。创建响应丢失后，恢复逻辑检查已保存的草稿与集群关联；仅有相同集群名称，不足以证明它由当前草稿创建。创建过程不会删除已有集群或共享仓库定义。

数据库强制主机独占归属。升级路径检测到历史重复归属时，会停止并要求明确修复，不会静默选择所有者。应先备份并解决归属歧义，再重试升级。

## 共享服务但不转移所有权 {#shared-services-without-shared-ownership}

托管 HBase 部署可以分别选择 HDFS 存储提供方与 ZooKeeper 协调提供方。每条绑定都持久化提供方的数字身份、经过审核的配置快照、私有命名空间及操作历史。

提供方设置通过允许列表进入 HBase 专用的客户端配置覆盖层。消费集群保留自己的 Hadoop 配置，不会接收提供方的管理凭据。客户端安装、凭据处理和连通性检查都针对精确的当前计划执行。

绑定就绪与部署完成是不同状态。Server 协调提供方准备、消费方安装、依赖校验、HBase 启动与服务检查。刷新时读取同一个部署，不重新发起替代任务，详见[绑定与就绪流程](./managed-dependencies.md#deployment-sequence)。

## 实现位置 {#implementation-map}

| 层次 | 源码与职责 |
| --- | --- |
| 浏览器导航 | [React 路由](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/router/RoutesList.tsx)和[集群目录](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Directories/ClusterDirectory.tsx)：明确集群上下文、授权发现和草稿恢复。 |
| 管理界面 | [Admin 路由](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-admin/src/main/resources/ui/ambari-admin/src/router/RoutesList.tsx)：集群概览、主机资源、权限与仓库导航。 |
| 主机归属 | [主机归属升级](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/upgrade/HostMembershipSchemaUpgrade.java)：独占归属与迁移检查。 |
| 依赖批准 | [托管服务协调器](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedServiceDependencyCoordinator.java)：授权、预览、快照、绑定变更与操作关联。 |
| 部署恢复 | [部署协调器](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyDeploymentCoordinator.java)：持久化安装、就绪、启动和服务检查进度。 |
| 启动与生命周期门禁 | [就绪策略](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyReadinessPolicy.java)和[生命周期策略](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyLifecyclePolicy.java)：当前证据、影响确认与删除保护。 |
| Agent 侧执行 | [托管 HBase 脚本](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HBASE/package/scripts/managed_hbase_dependency.py)：结构化观测、私有客户端配置和校验。 |

脚本继承来源目录含有 `BIGTOP/3.2.0`，这个目录名不代表托管依赖的兼容性约定。当前校验器要求使用已激活的 BIGTOP 3.3.0 仓库，并且解析后的版本元数据匹配。

## 验证证据与待验收范围 {#evidence-and-remaining-qualification}

历史[实现与运行记录](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/docs/design/multi-cluster-review-and-remediation.md)区分了以下检查点：

| 场景 | 已记录证据 | 局限 |
| --- | --- | --- |
| 两个独立集群，各自使用本地 HBase 依赖 | 源码 `1ab17a10ea333e35d9952666d57d8f4383762103` 的六主机原生 RPM 部署，验证了不同 HBase 身份、服务检查、跨用户访问拒绝与重复主机归属拒绝。 | 属于历史源码与包验收，并非重新部署当前 trunk。 |
| 跨集群托管 HBase | 一个部署完成，两条绑定就绪，并通过 SDK Put/Get 服务检查。 | 使用了较早 RPM 加已记录的文件与类覆盖补丁，不能描述为最终无覆盖补丁的包验收。 |
| Admin 工作流 | 已记录概览、主机归属、草稿恢复、授权、重命名与删除的浏览器及 API 检查。 | 并未穷尽所有角色、代理和浏览器组合。 |
| 其他故障与安全场景 | 存在实现及聚焦回归覆盖。 | 真实 KDC 回调、托管提供方停止与删除、解绑保留数据、全部崩溃与丢响应边界、完整消息代理撤权矩阵仍需验收。 |

网站构建与浏览器测试验证的是这些文档和图片，不构成集群运行验收。
