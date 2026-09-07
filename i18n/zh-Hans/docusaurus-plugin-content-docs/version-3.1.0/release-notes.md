---
title: Apache Ambari 3.1.0 发行说明
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

# Apache Ambari 3.1.0 发行说明 {#release-notes}

Apache Ambari 3.1.0 带来全新的监控架构、以 React 为主的管理界面，以及现代化的 Java、Python 和 RPM 基础。这是 3.0.0 之后的下一个功能版本，而不是 3.0.x 维护更新。对于现有集群，需要将监控迁移、运行时调整和 Server、Agent 升级纳入同一份升级计划。

本文描述 **3.1.0 预览版**，功能范围包含监控 PR #4182 及已审查源码基线中的社区变更。本页尚不宣布正式发行包、最终发布日期或已完成验证的升级兼容矩阵。

## 版本重点 {#release-highlights}

### 以兼容 Prometheus 的采集体系重构监控 {#monitoring-rebuilt}

新监控系统**替代 AMS**。原有的 AMS Monitor、Collector 和基于 HBase 的存储链路，被 Agent 遥测端点、VMAGENT 采集和 VictoriaMetrics 时序存储取代。组件接入、指标采集、存储和可视化由不同模块负责，监控不再围绕单一 Collector 部署组织。

Ambari Server 将 Stack 遥测描述符和类型化 JMX 配置编译为按主机分配的采集任务；Agent 提供 Linux 主机指标和独立的组件端点；VMAGENT 从 Ambari 发现目标、抓取指标，再通过远程写入发送至 VictoriaMetrics。服务可以通过原生 Prometheus 端点或类型化 JMX 转换接入同一条采集链路，不必再实现 AMS 专用的指标输出器。

VictoriaMetrics 支持单存储进程部署，也支持写入、存储、查询分离的部署方式，并可选择 VMAUTH 作为网关。React 监控界面提供数据源管理、PromQL 查询、采集目标状态，以及仪表盘编辑、导入、导出和克隆。浏览器查询经过 Ambari 的授权边界，无需直接访问时序存储服务。

对运维人员而言，这意味着可以独立规划存储容量、直接检查采集目标，并用统一的查询模型分析主机和服务指标。现有指标名称、自定义查询和仪表盘需要逐项检查，不能通过修改一个 AMS 开关完成迁移。Agent 指标端点没有应用层身份验证，还必须配合网络访问控制部署。

实现来源：[#4182](https://github.com/apache/ambari/pull/4182)。详见[新旧架构对比](./monitoring/architecture-comparison.md)、[模块架构](./monitoring/architecture.md)、[部署指南](./monitoring/deployment.md)和[查询与仪表盘](./monitoring/queries-and-dashboards.md)。

### React 成为主要管理界面 {#react-primary-interface}

Ambari Web 默认进入 React 应用。当前实现承接了集群安装、主机、服务、配置编辑、后台操作、告警、Kerberos、高可用、Stack 升级、Views 和管理工作流；Admin 应用也作为独立 React 模块打包。这不只是界面换肤，重构还覆盖路由、权限、异步请求、进度反馈和工作流恢复。

监控界面采用新的数据源和仪表盘模型，不以兼容旧 AMS/Ganglia 小组件及独立 Heatmaps 页面为目标。3.1.0 文档不再把 Ember 或 AMS 教程作为当前版本操作指南。实际发布候选版本仍需验证不同角色、认证方式、自定义 Stack 和异常恢复路径。

默认入口和打包变更：[#4198](https://github.com/apache/ambari/pull/4198)。工作流覆盖范围及验收边界见 [React 用户指南](./frontend/react-ui.md)。

### Java 基线升级，Ambari 与 Stack 独立选择 JDK {#java-baseline}

源码构建要求 **JDK 17 和 Maven 3.9.x**，由 Maven 强制检查。共享依赖管理更新了 Spring/Spring Security、Jetty、Jersey、Guice、日志、持久化和 Jakarta API 等基础组件。自定义 Java 扩展及其传递依赖也需要核对兼容性，不能只替换 JDK 就认为迁移完成。

Ambari 与受管 Stack 可以使用不同的 JDK 安装目录。安装配置支持 `--ambari-java-home` 和 `--stack-java-home`，旧 `--java-home` 参数保留为已弃用的别名。Ambari 辅助程序要求 JDK 17 或更高版本，Stack 中的服务则应使用各自支持的 JDK。构建阶段限定 Java 17，与运行时版本检查是不同的约束。

实现来源：[#4188](https://github.com/apache/ambari/pull/4188)、[#4189](https://github.com/apache/ambari/pull/4189)。具体依赖版本及尚未完成的大版本迁移见 [Java 依赖](./platform/java-dependencies.md)。

### Python 依赖改用官方发行包 {#python-modernization}

Ambari 不再将代码仓库内长期维护的古老第三方 Python 源码副本作为运行时依赖。原有 APScheduler、Jinja2、STOMP/WebSocket 和加密库副本由锁定版本的上游发行包替代；simplejson、mock 和独立 pbkdf2 实现改用标准库 API。Ambari 自身的 Agent 和 Server Python 代码仍由项目维护，并非删除全部 Python 源码。

源码最低要求为 **Python 3.9.2**。默认软件包面向 CPython 3.9 及其原生扩展 ABI，更高的 Python 次版本不代表可以直接运行这些软件包。依赖在构建阶段装入 Ambari 私有库目录，集群节点启动时不再从 Python 包索引安装依赖。

实现来源：[#4198](https://github.com/apache/ambari/pull/4198)。解释器选择、依赖版本和 ABI 要求见 [Python 运行时](./platform/python-runtime.md)。

### RPM 打包明确 ABI、架构与依赖来源 {#rpm-packaging}

Python 依赖打包采用哈希锁定的构件，明确选择平台和 ABI，检查元数据及许可证，并生成软件物料清单（SBOM）。构建前清理依赖暂存目录，避免将旧库残留带入新 RPM。CPython 3.10 和 ARM64 使用独立构建目标；存在构建配置不代表所有操作系统与架构组合均已通过生产验证。

监控部分为 VictoriaMetrics 提供独立的软件包。保留的 `ambari-metrics` 模块名称不表示旧 AMS 仍是监控后端，Ambari RPM 版本与 VictoriaMetrics 组件版本也相互独立。离线 Python Wheel 仓库仅包含 Python 制品；如需完全离线构建，还必须分别准备 Maven、npm 和监控组件下载所需的缓存或镜像。

构建命令与产物检查见 [RPM 打包](./platform/rpm-packaging.md)，完整构建环境见[从源码构建](./ambari-dev/building-from-source.md)。

## 社区改进 {#selected-community-changes}

### 集群操作与配置 {#cluster-operations}

- **集群启动**：防止自动恢复阻塞集群范围的启动操作。[#4187](https://github.com/apache/ambari/pull/4187)。
- **安装与服务操作**：修复集群安装向导及主机、服务工作流中的多项问题。[#4201](https://github.com/apache/ambari/pull/4201)。
- **Capacity Scheduler**：采用组合配置编辑格式，并在成功修改后提示刷新 YARN 队列。[#4204](https://github.com/apache/ambari/pull/4204)。
- **配置传播**：改善大集群中配置和配置组变更的传播。[#4135](https://github.com/apache/ambari/pull/4135)。

### 主机与服务工作流 {#host-service-workflows}

- **主机导航**：跨页面导航和刷新保留主机选择，修正空列表分页，并修复从主机列表进入主机概览时组件未加载的问题。离开主机模块时会重置该模块的筛选条件。[#4202](https://github.com/apache/ambari/pull/4202)、[#4203](https://github.com/apache/ambari/pull/4203)。
- **界面状态与请求**：减少冗余轮询、过期服务状态和卡住的连接测试请求。[#4177](https://github.com/apache/ambari/pull/4177)、[#4178](https://github.com/apache/ambari/pull/4178)。
- **HDFS 与 YARN**：React 新增 Observer NameNode 支持，并在 DataNode 或 NodeManager 安装后刷新机架映射。[#4181](https://github.com/apache/ambari/pull/4181)、[#4139](https://github.com/apache/ambari/pull/4139)。
- **Stack 集成**：新增 HBase Thrift 组件支持，更新 BIGTOP 3.4.0 服务版本和按目标架构构建的逻辑，并在 Ranger 与 Ambari 共用主机时保留 Ranger JDBC 驱动。[#4122](https://github.com/apache/ambari/pull/4122)、[#4078](https://github.com/apache/ambari/pull/4078)、[#4040](https://github.com/apache/ambari/pull/4040)、[#4043](https://github.com/apache/ambari/pull/4043)。

### 认证与敏感数据处理 {#security-improvements}

- **LDAP 与 Kerberos**：修复 Python 3 和较新 Java 运行时中的 LDAPS 兼容性问题，并清理 Kerberos 文件描述符。[#4151](https://github.com/apache/ambari/pull/4151)、[#4124](https://github.com/apache/ambari/pull/4124)。
- **配置与命令产物**：修复 Stack-root 配置密码暴露问题，并移除已执行命令的 JSON 文件。[#4086](https://github.com/apache/ambari/pull/4086)、[#4045](https://github.com/apache/ambari/pull/4045)。
- **Hive 启动**：移除 HiveServer2 启动过程中不安全的 metatool 调用。[#4127](https://github.com/apache/ambari/pull/4127)。

## 升级影响 {#upgrade-impact}

| 领域 | 必要操作 |
| --- | --- |
| AMS 历史数据与自定义仪表盘 | 单独规划历史数据保留。元数据升级不会导入 AMS 样本或转换旧小组件布局，需要按新模型重建查询和仪表盘。 |
| 自定义服务指标 | 按需实现遥测描述符和类型化 JMX 配置。保留的直接 JMX 管理属性不能代替时序指标接入契约。 |
| Java 与扩展 | 独立选择 Ambari 和 Stack JDK，并验证自定义扩展与新依赖基线的兼容性。 |
| Python 与 RPM | 解释器次版本 ABI 和目标架构必须与软件包一致，不要向新安装覆盖旧私有库。 |
| React 访问 | 针对新的默认入口验证代理路径、登录与 SSO、权限、Views 及浏览器已保存的界面偏好。 |
| 数据库与回退 | 执行结构升级前备份元数据和配置，仅降级软件包无法撤销数据库结构或监控模型的变化。 |

### 升级准备 {#prepare-the-upgrade}

1. 在有代表性的环境中演练选定候选版本，包括操作失败和回退。
2. 备份元数据数据库、配置、凭据及密钥库，并保留配套的软件包。
3. 协调升级 Server、Agent 及其运行时配置，在维护窗口内执行受支持的元数据升级。
4. 部署新监控组件，确认目标发现和数据写入正常，再验证仪表盘查询和访问权限。
5. 恢复常规操作前，检查服务操作、配置保存、主机注册，以及集群使用的高可用和 Kerberos 工作流。

详细步骤和兼容性边界见[升级指南](./upgrade-guide.md)与 [AMS 迁移指南](./monitoring/migration.md)。Ambari 发行版本、BIGTOP Stack 版本和 VictoriaMetrics 版本彼此独立，升级 Ambari 不意味着为所有服务自动选择新的 Stack 版本。

## 发行范围与验证状态 {#release-scope}

已审查的源码基线涵盖 3.0.0 源码标签之后可达的 181 个提交，以及纳入目标版本的 PR #4182 监控基线。以上内容按用户可感知的变化归类，不把每个合并、依赖更新或测试修改单列为新功能。具体修订及源码依据见[源码基线](./release-baseline.md)。

网站构建和浏览器测试只验证这些文档，不验证集群升级兼容性。正式发布前还需记录最终源码标签、签名构件、支持的软件包目标与升级路径，以及候选版本验收结果。在这些工作完成前，本文仍是预览文档，不代表发行验收已经完成。
