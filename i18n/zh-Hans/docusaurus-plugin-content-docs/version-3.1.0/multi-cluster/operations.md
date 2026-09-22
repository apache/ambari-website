---
title: 运维与恢复
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

# 运维与恢复 {#operations-and-recovery}

操作必须针对明确的集群和精确保存的操作身份。HTTP 提交成功、进程退出码为零、某条日志或无关请求完成，都不能证明目标工作流已经结束。应使用 Server 的结构化状态与标识。

本手册补充[集群创建](./getting-started.md)和 [HBase 托管依赖](./managed-dependencies.md)。[架构指南](./architecture.md#evidence-and-remaining-qualification)区分了历史运行证据与尚待完成的验收。

## 只读 API 示例 {#read-only-api-examples}

以下是供已认证 API 客户端使用的 HTTP 请求目标。将示例集群名和标识占位符替换为本次操作返回的值，并保留部署环境的认证与代理设置。不要将凭据写入脚本或共享诊断输出。

```http
GET /api/v1/clusters?fields=Clusters/cluster_id,Clusters/cluster_name,Clusters/provisioning_state
GET /api/v1/clusters/analytics-a/hosts?fields=Hosts/host_name
GET /api/v1/clusters/analytics-a/services/HBASE/dependencies
GET /api/v1/clusters/analytics-a/services/HBASE/dependencies/{bindingId}
GET /api/v1/clusters/analytics-a/services/HBASE/dependencies/deployments/{deploymentId}
GET /api/v1/clusters/analytics-a/requests/{requestId}
GET /api/v1/clusters/analytics-a/requests/{requestId}/tasks
```

| 观测对象 | 读取与验证 |
| --- | --- |
| 集群目录 | `Clusters.cluster_id` 与 `Clusters.cluster_name`；名称变化时数字身份必须保持不变。 |
| 绑定列表 | `items`；归属可能为 `managed`、`local`、`unmanaged` 或 `unknown`。缺少托管绑定不代表本地依赖健康。 |
| 绑定详情 | `binding_id`、`consumer`、`provider`、`phase`、`row_version`、`operation_epoch`、期望与已应用快照版本和操作身份。 |
| 绑定就绪 | `readiness` 标识必需、已准备及已验证的守护进程主机；`capabilities`、`allowed_actions` 与 `next_action` 说明允许的后续步骤。 |
| 部署 | `deployment_id`、`cluster_id`、`attempt_id`、`request_id`、`history`、`state`、`phase`、`failure_code`、`retry_allowed`、`completed` 与 `install_only`。 |
| 任务完成 | 读取精确请求的任务及所属集群，确认任务、主机和操作的关联及终态结果，不要搜索全部近期请求来猜测。 |

结构化依赖错误包含 `code` 与 `message`。应按 HTTP 状态和精确错误码处理分支，消息文本只用于诊断。字段缺失、值格式错误或身份属于其他操作时，必须保留错误或未解决状态。

## 集成方变更契约 {#mutation-contract-for-integrators}

常规管理优先使用界面。自动化请以固定版本的 [API 客户端](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/api/serviceDependenciesApi.ts)和 [REST 服务](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/api/services/ManagedServiceDependencyService.java)作为请求体契约。

表中的 `D` 表示 `/api/v1/clusters/{clusterName}/services/HBASE/dependencies`。

| 方法与资源 | 契约 |
| --- | --- |
| `GET D/candidates?type=HDFS` | 为已有 HBase 消费方发现已授权候选提供方；ZooKeeper 使用其对应依赖类型。 |
| `POST D/preview` | 预览单个或完整选择集，不表示批准或开始准备。 |
| `POST D` | 使用操作 UUID，批准精确的绑定 ID、提供方身份、预览 schema 版本与返回的指纹；支持包含一项或两项的集合。 |
| `POST D/deployments/{deploymentId}` | 在不可变部署 UUID 下持久化或启动精确目标，并明确是否仅安装。 |
| `POST D/deployments/{deploymentId}/actions/retry` | 仅在返回能力允许时，使用操作 UUID 重试该部署。 |
| `GET D/{bindingId}/preview-update` | 批准提供方配置变化前，读取最新更新提案。 |
| `POST D/{bindingId}/actions/update` | 随操作 UUID 提交最新预览中的行版本、快照版本、指纹、批准值和 schema 版本。 |
| `POST D/{bindingId}/actions/retry` | 提交操作 UUID 与期望的当前行版本。 |
| `POST D/{bindingId}/actions/verify-credentials` | 在工作流允许手动凭据处理时，针对预期的当前 epoch 校验凭据。 |
| `DELETE D/{bindingId}` | 满足生命周期门禁后，使用操作 UUID 和期望行版本解绑，不擦除提供方数据。 |

草稿和添加服务的发现入口为 `/api/v1/service-dependencies/candidates` 与 `/api/v1/service-dependencies/preview`，需要对应的草稿或服务计划作用域与期望修订号。不要仅为发现提供方而创建一个虚假的 HBase 服务。

提供方侧读取使用 `/api/v1/clusters/{clusterName}/services/{serviceName}/dependents` 和 `/api/v1/clusters/{clusterName}/services/{serviceName}/dependency-impact`。停止或重启确认与当前影响修订号及精确提供方、动作绑定。其他消费方变化后应重新读取影响。

提交前持久化启动和重试 ID。超时后先读取原资源，再决定是否重试；同一次尝试应保留不可变的重试身份。已确认存在的部署随后返回 404 时，不能发起替代部署。

## 绑定阶段 {#binding-phases}

| 阶段 | 运维含义 |
| --- | --- |
| `PREVIEWED` | 绑定尚未建立提供方准备证据。 |
| `PROVIDER_PREPARING` | 提供方正在执行工作，应检查对应请求。 |
| `PROVIDER_PREPARED` | 提供方准备已具备，消费方安装和校验仍有门禁。 |
| `ZOOKEEPER_HANDOFF_RECONCILING` | 执行专用的 ZooKeeper 交接核对流程，不能视为就绪。 |
| `CONSUMER_VERIFYING` | 正在收集当前客户端、身份与连通性证据。 |
| `READY` | 当前批准输入对应的绑定就绪已建立，部署完成仍需单独观测。 |
| `STALE` | 批准输入或证据不再匹配当前提供方或消费方状态，应审核变更。 |
| `FAILED` | 检查失败详情及允许的重试动作。 |
| `FENCING_UNCERTAIN` | 无法可靠确认现有操作所有权，进一步变更前应调查。 |
| `DETACHING`、`RETIRED`、`DETACHED`、`TOMBSTONED` | 退役与解绑生命周期阶段，均不代表自动删除数据，也不授予重启旧依赖的权限。 |

应结合阶段与返回能力判断。阶段名称本身不能替代拓扑、快照、身份和权限检查。

## 恢复场景 {#recovery-cases}

| 现象或精确错误码 | 检查对象 | 恢复方式 |
| --- | --- | --- |
| 安装刷新或创建响应丢失 | 原草稿 UUID、所有者、修订号与已保存的集群关联。 | 恢复原草稿，重新输入要求的敏感信息；没有关联证明时，不接管同名集群。 |
| 工作流修订冲突 | 最新保存的作用域、修订号及其他活动编辑者。 | 重新加载权威检查点，审核差异，再提交当前修改。 |
| `DEPENDENCY_OPERATION_STALE` | 当前操作、行版本、快照与 epoch。 | 重新加载，输入变化时重新预览，不将旧批准重放到新状态。 |
| `DEPENDENCY_VERSION_UNSUPPORTED` | 双方活动仓库记录与解析后的版本元数据。 | 选择兼容提供方或修正仓库，不绕过校验器。 |
| `DEPENDENCY_SECURITY_MISMATCH` 或 `CROSS_REALM_NOT_SUPPORTED` | 双方安全模式与 realm。 | 使用受支持拓扑，不复制提供方 keytab 来绕过不匹配。 |
| `DEPENDENCY_CONSUMER_NOT_READY` | 每台必需守护进程主机的包、配置、凭据与校验证据。 | 修复失败前提，再使用界面提供的准备或校验动作。 |
| `DEPENDENCY_NAMENODE_RPC_FAILED` 或 `DEPENDENCY_DATANODE_READ_WRITE_FAILED` | 配置端点、网络、身份及精确结构化探测结果。 | 修正报告的问题，再对受影响的当前计划重新校验。 |
| `DEPENDENCY_ZOOKEEPER_SESSION_FAILED` 或 `DEPENDENCY_ZOOKEEPER_AUTHORIZATION_FAILED` | ZooKeeper 连通性、客户端身份与私有 znode 策略。 | 修正连通性或授权，再按受支持路径校验。 |
| `DEPENDENCY_FENCING_UNCERTAIN` | 持久化操作与提供方所有权记录。 | 保留不确定状态并调查，不删除日志记录来强行标记成功。 |
| 部署 `UNRESOLVED` | 精确部署历史及缺失或不匹配的请求、任务关联。 | 保留证据并调查，仅在 Server 明确允许时重试。 |
| 提供方停止或删除受阻 | 当前消费方与影响，以及消费方停止和解绑要求。 | 协调维护，审核当前影响，或通过受支持流程退役、解绑消费方。 |
| 某个集群目录数据加载失败 | 该集群授权及失败的读取。 | 针对该范围重试，保留其他成功加载的授权行。 |

按场景记录精确的集群、草稿、绑定、部署、操作、epoch、请求和任务 ID，并附脱敏结构化响应。日志可用于解释失败，但不能作为工作流成功依据。问题报告中不得包含凭据或原始 keytab。

## Blueprint 交接 {#blueprint-handoff}

托管 Blueprint 通过设置声明需要的依赖类型：

```json
{
  "settings": [
    {
      "managed_dependencies": [
        {"consumer_service": "HBASE", "dependency_type": "HDFS"},
        {"consumer_service": "HBASE", "dependency_type": "ZOOKEEPER"}
      ]
    }
  ]
}
```

使用 `provision_action: PREPARE_ONLY`，等待真实主机放置和拓扑配置完成，然后预览完整 HBase 选择，应用审核后的配置，批准精确绑定指纹，并以精确目标启动持久化部署。提供方 ID 和凭据不应放入可复用模板。常规本地 Blueprint 路径保留默认动作。

这说明的是交接契约，不是完整部署请求体。实现集成时应同时参考 [Blueprint 实现](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyBlueprintPlan.java)和[通用 Blueprint 指南](../ambari-design/blueprints/index.md)。

## 升级与验收工作 {#upgrade-and-acceptance-work}

升级前备份共享数据库和 Server 配置，验证主机独占归属以及作用域工作流和依赖表迁移。未确认正确所有者之前，不要通过删除归属行来“修复”重复记录。

在依赖生产部署之前，应验证双集群主机与权限隔离、双标签页导航、精确草稿恢复、逐主机托管就绪，以及实际需要的提供方维护路径。安全安装还需真实 KDC 与凭据测试。网络中断和 Server 重启演练应始终使用已保存的操作 ID。

正式发布前仍需补充最终制品与 tag 矩阵、受支持的升级与数据库组合、真实 KDC 结果、托管解绑与数据保留证据，以及故障注入和消息代理撤权结果。只有对应测试实际执行后才能补充结论，历史源码审查不能替代这些证据。
