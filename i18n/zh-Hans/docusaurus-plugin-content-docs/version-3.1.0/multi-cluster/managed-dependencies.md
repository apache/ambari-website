---
title: HBase 托管依赖
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

# HBase 托管依赖 {#managed-hbase-dependencies}

托管依赖允许新的 HBase 服务使用已有托管 HDFS 服务和／或 ZooKeeper 集群，同时保留独立的消费集群、主机和生命周期。这是可选能力，独立集群仍可使用各自本地的 HDFS 与 ZooKeeper。

规划共享部署前，请阅读[架构与验证边界](./architecture.md)。当前消费方为 HBase，实现的依赖类型为 `HDFS` 和 `ZOOKEEPER`；这不是通用服务联邦，也不支持任意外部端点。

## 拓扑与所有权 {#topology-and-ownership}

![手绘 HBase 依赖架构：分离的存储与协调绑定、私有配置、私有命名空间以及服务间直连流量](/img/3.1.0/handdrawn/multi-cluster-bindings-zh.webp)

图中刻意将 HDFS 与 ZooKeeper 放在不同的提供集群中，它们也可以位于同一个提供集群。每项选择都有独立绑定和就绪检查，执行部署前应审核完整计划。消费方主机始终属于消费集群。

| 选择 | 效果 |
| --- | --- |
| 本地 HDFS 与 ZooKeeper | 常规独立 HBase 部署，不需要跨集群托管绑定。 |
| 托管 HDFS、本地 ZooKeeper | HBase 使用所选提供方存储，协调仍在本地。 |
| 本地 HDFS、托管 ZooKeeper | 存储保留在本地，协调使用所选提供方。 |
| 托管 HDFS 与 ZooKeeper | 两条绑定，各有提供方身份、私有命名空间和就绪证据。 |

Ambari 协调批准、准备与校验。HBase 直接连接提供方守护进程执行存储与协调，数据不经过 Ambari Server。共享提供方也意味着共享其可用性与维护依赖。

## 兼容性与权限 {#compatibility-and-permissions}

| 检查项 | 当前约定 |
| --- | --- |
| 消费方生命周期 | 草稿、新服务计划或处于初始状态的新 HBase 服务。不支持转换已有数据的本地 HBase 部署。 |
| Stack 与版本 | 消费方和提供方均使用已激活的 BIGTOP 3.3.0 仓库，解析后的版本元数据非空且相等，并具备兼容的客户端特性。仅显示版本相同并不充分。 |
| 提供方就绪 | 快照批准前，所选服务必须已安装且健康。 |
| HDFS 特性 | 托管绑定校验器拒绝 Federation 和 Observer NameNode 客户端。不能因 Ambari 其他功能支持它们，就推断此处也支持。 |
| 安全模式 | 双方均非安全模式，或满足专用的同 realm Kerberos 检查。混合安全与非安全模式以及跨 realm 绑定均被拒绝。 |
| 网络 | 每台当前 HBase 守护进程主机均可解析并访问配置中的 NameNode RPC、DataNode 数据传输及 ZooKeeper 端点。以真实提供方配置为准，不要假定默认端口。 |
| 消费方权限 | 修改与身份规划需要 `SERVICE.MODIFY_CONFIGS` 和 `SERVICE.SET_SERVICE_USERS_GROUPS`；添加服务还需要 `SERVICE.ADD_DELETE_SERVICES`。 |
| 提供方权限 | 发现需要服务查看授权；准备与变更需要提供集群上的 `SERVICE.RUN_CUSTOM_COMMAND`。仅有消费集群管理权限并不足够。 |

安装草稿需要全局创建集群权限。安装、启动和服务检查仍保留常规操作权限要求；表中列出的是依赖相关前提，不是完整角色授权配方。

初始安全路径是在**已经启用 Kerberos 的消费集群**中添加 HBase。新建集群安装不会自动建立可用的安全依赖计划。同 realm 支持包含身份映射、提供方策略证明、凭据签发与校验；存在实现不代表真实 KDC 验收已经完成。

## 选择并审核提供方 {#choose-and-review-providers}

1. 启动新集群安装，或在目标消费集群中打开 **Add Service（添加服务）** 并选择 HBase。
2. 在服务选择步骤中，分别检查 **Storage（存储）** 与 **ZooKeeper** 选项。需要保留本地的依赖应维持本地默认值。
3. 对于托管依赖，打开授权提供方列表，选择前核对提供集群、服务、兼容性结果和返回的原因。
4. 保存选择并预览计划。向导可以取消仅用于满足 HBase 依赖而自动选中的本地守护进程服务，但会保留用户明确选择或其他本地消费方需要的服务。客户端包仍然必需。
5. 在配置步骤检查托管客户端值，按需编辑普通 HBase 属性。提供方管理的值应通过选择与审核提供方来变更，不要复制完整提供方配置。
6. 在审核步骤确认消费方身份、提供方归属、私有路径、主机放置和当前兼容性结果。提供方或拓扑变化会使旧预览失效。
7. 提交审核后的计划，跟踪服务端拥有的部署。在依赖准备或校验未完成前，不要手动启动 HBase。

在已有 HBase 旁添加其他服务，会保留其依赖归属，不会提供迁移入口。不支持的选择应在执行部署前解决。

## 私有配置与数据路径 {#private-configuration-and-data-paths}

Server 根据每条绑定的 UUID 派生私有路径：

```text
HDFS binding:
  hdfs://<provider-authority>/apps/ambari-managed/hbase/<hdfs-binding-id>/root
  hdfs://<provider-authority>/apps/ambari-managed/hbase/<hdfs-binding-id>/wal

ZooKeeper binding:
  /ambari-managed-hbase/<zk-binding-id>/hbase
```

HDFS 与 ZooKeeper 的绑定 ID 相互独立。root 与 WAL 路径分离，ZooKeeper 绑定拥有私有容器和协调子节点。Ambari 还维护所有权与 fencing 记录，不要手动删除这些记录，或将保留路径用于其他应用。

只有允许列表中的客户端设置进入批准快照。HBase 配置覆盖层不会覆写无关本地服务的 Hadoop 配置，提供方的管理 principal 与 keytab 也不会复制给消费方。应读取返回的命名空间和计划身份，不要自行猜测 HBase 用户或路径规则。

## 部署顺序 {#deployment-sequence}

![手绘持久化 HBase 部署流程：保存预览、批准、提供方准备、安装、凭据、校验、启动、检查与精确身份恢复](/img/3.1.0/handdrawn/multi-cluster-recovery-zh.webp)

| 阶段 | 必须建立的事实 |
| --- | --- |
| 保存与预览 | 精确的草稿或服务计划修订号、所选提供方和当前指纹。 |
| 批准与准备 | 持久化绑定快照，提供方针对精确命名空间与身份完成准备。 |
| 安装与配置 | 在预期消费主机上安装已批准的客户端和私有配置，并持久化请求与任务关联。 |
| 凭据与校验 | 需要时完成凭据处理，检查 NameNode RPC、DataNode 写读、ZooKeeper 会话与私有 znode，以及当前客户端与身份的证据。 |
| 就绪与启动 | 全部托管绑定就绪，并且**每台当前 HBase 守护进程主机**的证据有效。 |
| 服务检查与完成 | 将精确的启动和服务检查请求、任务结果关联到同一个持久化部署。 |

某条绑定处于 `READY` 不代表部署已完成。应检查部署的 `completed` 字段、当前请求和任务结果以及操作身份。`INSTALL_ONLY` 是明确的流程分支，不等于 `COMPLETE`。

## 更新、维护与解绑 {#updates-maintenance-and-detach}

打开 HBase 的 **Dependencies（依赖）** 页签，或使用服务目录中的依赖链接。页面显示归属、阶段、期望与已应用快照版本、就绪情况和允许的后续动作。

提供方配置变化时，使用 **Review changes（审核变更）**，检查候选快照，并在允许时应用审核后的变更。并发冲突需要重新预览。**Retry preparation（重试准备）** 通过受支持的操作重试当前绑定，不能复用无关任务结果。

停止或重启提供方前，应查看依赖它的消费方，并确认当前影响修订号。没有查看权限的消费方可能仅显示匿名数量，因此可见名称列表为空不代表没有影响。存在活动绑定时，提供方删除会被阻止。

执行 **Detach provider（解绑提供方）** 前先停止 HBase。解绑保留提供方服务和存储数据，已解绑依赖不能继续用于重启 HBase。解绑不是数据迁移或数据擦除命令，应明确规划消费方退役、数据保留和后续清理；真实解绑与数据保留验收仍属于待确认范围。

## 源码参考 {#source-references}

参阅[快照校验器](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencySnapshotValidator.java)、[命名空间分配](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyNamespace.java)、[依赖 API 客户端](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/api/serviceDependenciesApi.ts)和[依赖操作界面](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Services/DependencyActions.tsx)。[运维与恢复](./operations.md)说明 API 读取路径、错误码和恢复判断。
