---
title: 创建与使用集群
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

# 创建与使用集群 {#creating-and-using-clusters}

本流程用于在同一台 Ambari Server 下管理两个独立集群。架构和版本边界请参阅[多集群架构](./architecture.md)。共享提供方是可选能力，另见 [HBase 托管依赖](./managed-dependencies.md)。

## 开始前准备 {#before-you-start}

使用包含多集群实现且相互匹配的 Server、Agent、Web 和 Admin 制品。完成常规[安装准备](../quick-start/installation-guide.md)，包括 DNS、网络连通性、仓库和 Agent 注册。已有安装必须遵循[升级流程](../upgrade-guide.md)，本指南不能替代数据库迁移。

| 要求 | 检查内容 |
| --- | --- |
| 创建权限 | 账号拥有 `AMBARI.ADD_DELETE_CLUSTERS`。仅有集群管理权限不代表拥有全局创建权限。 |
| 主机目录 | 新主机已注册到当前 Server 且尚未分配。安装前查看 Admin 的主机资源页面。 |
| 仓库定义 | 选择的 Stack 与仓库适用于目标主机。相同设置可复用，共享定义冲突需明确处理。 |
| 唯一目标 | 选择新的集群名称，并启动全新的安装草稿。 |
| 容量 | 按总负载规划共享 Server、数据库与各服务部署容量；此处不承诺固定的集群数量上限。 |

一个六主机示例：

| 集群 | 主机 | 本地服务 |
| --- | --- | --- |
| analytics-a | worker1、worker2、worker3 | HDFS、ZooKeeper 与 HBase |
| analytics-b | worker4、worker5、worker6 | HDFS、ZooKeeper 与 HBase |

这只是拓扑示例，不是生产容量建议。主机名无需与示例一致，关键是两组主机不能重叠。

## 创建首个或后续集群 {#create-the-first-or-next-cluster}

1. 从主 React 入口登录。打开 **Clusters（集群）**，或在拥有权限时使用集群菜单中的 **Admin Cluster Management（集群管理）**。
2. 在 Admin 中打开 **Create Cluster（创建集群）**，选择 **Start installation wizard（启动安装向导）**。全局集群目录也为具备权限的用户提供创建入口。
3. 输入新集群名称。向导 URL 含有草稿标识，安装中断时应保留该 URL。
4. 选择 Stack 与版本，检查仓库 URL。仅注册或选择尚未分配给其他集群的主机。
5. 选择服务。如果需要独立的 HBase 部署，保留本地 HDFS 与 ZooKeeper 选项，不要仅因存在其他集群就选择托管提供方。
6. 检查组件放置和配置。确认每个主机名都属于预期目标，创建第二个集群时尤其需要检查。
7. 提交审核页，跟踪安装与启动进度，重试前检查失败的请求和任务。
8. 完成向导后，打开该集群的主机与服务页面，核对真实目录和组件状态，并执行所选服务适用的服务检查。

创建下一个集群时，从**新草稿**重新开始，不要复用第一个集群保存的安装 URL。已有集群和共享仓库记录会被保留。

名称冲突意味着校验失败，不代表可以覆盖或接管已有集群。应选择其他名称；如果实际目标就是已有集群，则通过经过授权的入口打开它。

## 恢复中断的安装 {#resume-an-interrupted-installation}

使用原账号打开 **Clusters（集群）** 或 Admin 的 **Create Cluster（创建集群）**。已保存安装会显示目标、阶段和安装 ID，选择原草稿对应的恢复或继续操作。

编辑前等待工作流加载已保存的修订版本。密码、私钥等敏感字段不会保留在持久化检查点中，可能需要重新输入。敏感信息缺失会阻止受影响的操作，但非敏感输入可以继续保留。

如果创建或主机分配响应丢失，应由向导对照原草稿和已记录的分配意图进行核对，不要再创建一个同名集群来“修复”不确定状态。修订冲突需要先重新加载当前检查点，再重试编辑，详见[恢复场景](./operations.md#recovery-cases)。

离开或刷新页面不代表 Server 工作已取消。重新连接后，应检查保存的工作流及对应请求 ID。

## 切换与比较集群 {#switch-and-compare-safely}

| 任务 | 入口 |
| --- | --- |
| 浏览已授权集群 | `/latest/#/clusters` |
| 比较不同服务部署 | `/latest/#/services` |
| 打开 A 的主机列表 | `/latest/#/clusters/analytics-a/main/hosts` |
| 打开 B 的 HBase 配置 | `/latest/#/clusters/analytics-b/main/services/HBASE/configs` |
| 查看 B 的操作 | `/latest/#/clusters/analytics-b/main/requests` |

这些路径假定使用标准部署根路径；存在反向代理前缀时需保留该前缀。集群名称应编码为单个 URL 路径片段，不要直接拼接未经转义的名称。

目录将搜索、排序和分页保留在 URL 中。服务目录同时标明服务和所属集群，并显示 HBase 依赖摘要。某个集群加载失败时，不会用其他集群的行冒充其结果，应针对失败范围重试。

登录后，Ambari 重新验证已有的授权跳转目标或用户最近使用的数字集群 ID 偏好。仅有一个授权集群时可以自动选择，否则由界面提示选择。旧的不带集群的链接会在选择过程中保留目标页面。目标已删除或无权访问时，不应静默切换到另一集群。

## Admin 管理任务 {#admin-tasks}

| 页面 | 用途 |
| --- | --- |
| Cluster Overview（集群概览） | 查找托管集群，打开目标集群或其详情。 |
| Cluster Details（集群详情） | 查看基本信息、服务与主机、访问权限、操作历史、配置与导出。 |
| Host Resources（主机资源） | 区分已分配与未分配主机，打开目标集群已有的添加主机向导。 |
| Cluster Permissions（集群权限） | 为明确的目标集群授予或移除权限，并重新读取授权结果。 |
| Versions & Repositories（版本与仓库） | 检查全局仓库目录与所选集群的版本状态。 |
| Remote Clusters（远程集群） | 维护远程引用，不会创建另一个由本机管理的运行时集群。 |

重命名保留数字身份。删除属于独立的受保护操作：检查服务状态和依赖影响，停止必要组件，再通过经过授权的删除流程操作。界面行消失或请求已受理，都不能证明删除已经完成。

## 检查结果 {#check-the-result}

1. 在每个集群的主机页面确认主机集合符合预期，且归属互不重叠。
2. 在不同标签页分别打开两个集群的 HBase，核对所属集群、生效的存储与协调配置以及服务检查结果。
3. 使用仅有某个集群权限的账号，验证只能访问预期目录和操作。全局管理员不适合作为隔离测试账号。
4. 刷新含有明确集群的 URL，确认仍加载原目标；未完成工作流应从原检查点恢复。
5. 检查本次发起操作所对应的请求和任务状态，不要使用最近某个无关成功任务作为完成证据。

脚本检查可参考[只读 API 示例](./operations.md#read-only-api-examples)。真实拓扑与角色验收需要在部署环境执行，网站示例本身不会运行这些检查。

## 源码参考 {#source-references}

流程依据为 [Admin 创建集群页面](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-admin/src/main/resources/ui/ambari-admin/src/screens/ClusterManagement/ClusterCreate.tsx)、[集群目录](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Directories/ClusterDirectory.tsx)、[服务目录](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Directories/ServiceDirectory.tsx)和[作用域工作流工具](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/Utils/scopedWorkflow.ts)。
