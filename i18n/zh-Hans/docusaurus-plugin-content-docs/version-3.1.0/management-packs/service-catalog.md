---
title: 参考服务目录
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

# 参考服务目录 {#reference-service-catalog}

本矩阵描述[运行时 mpack 预览实现](./overview.md)配套的独立参考商店快照 `c10a271`。管理包版本来自 `release.json`，它们属于定义版本，与上游软件版本及 Ambari 自身版本分别管理。

## 管理包与软件版本 {#packages-and-software}

| 管理包 | 定义版本 | 软件基线 | 适用环境 |
| --- | --- | --- | --- |
| generic-base | `1.0.0.3` | 基础定义，不部署应用 | `GENERIC/1.0` |
| nginx | `1.0.1.1` | 操作系统仓库软件包 | `GENERIC/1.0` |
| postgresql | `1.0.1.1` | 操作系统仓库软件包，参考部署使用 PostgreSQL 10 | `GENERIC/1.0` |
| kyuubi | `1.0.1.0` | Apache Kyuubi 1.9.4 | `BIGTOP/3.3.0` |
| airflow | `1.0.1.0` | Apache Airflow 3.3.2 | `GENERIC/1.0` |
| celeborn | `1.0.1.0` | Apache Celeborn 0.7.0 | `BIGTOP/3.3.0` |
| dolphinscheduler | `1.0.1.0` | Apache DolphinScheduler 3.1.9 | `BIGTOP/3.3.0` |
| trino | `1.0.1.0` | Trino 483 | `BIGTOP/3.3.0` |
| doris | `1.0.1.0` | Apache Doris 4.1.4 | `BIGTOP/3.3.0` |
| elasticsearch | `1.0.1.0` | Elasticsearch 9.5.4 | `GENERIC/1.0` |
| minio | `1.0.1.0` | MinIO `RELEASE.2025-10-15T17-29-55Z` | `GENERIC/1.0` |

基础定义通过管理包依赖引入，不是需要额外部署的应用。Nginx 和 PostgreSQL 不要求安装 Hadoop。通用环境服务与 BIGTOP 服务不能仅因为放在同一个 bundle 中，就任意组合到同一种环境。

## 拓扑与安装前提 {#topology-and-prerequisites}

| 服务 | 首版拓扑 | 安装前需要准备 |
| --- | --- | --- |
| Nginx | 一个受管理服务实例 | OS 软件包、配置及 include 路径、可用的受管理监听端口 |
| PostgreSQL | 一个受管理数据库实例 | OS 软件包、持久化数据目录、本地管理连接和备份 |
| Kyuubi | Server 与 Client 定义 | JDK 17、匹配的 Spark 3.5 / Scala 2.12 二进制、Hadoop 客户端及 ZooKeeper 配置 |
| Airflow | 单主机，使用 LocalExecutor | Python 3.11、外部 PostgreSQL 14-18 数据库、数据库用户和管理员信息 |
| Celeborn | 一个 Master 和至少一个 Worker | JDK 17、固定的官方归档、存储路径与角色端口 |
| DolphinScheduler | 单主机托管 Master、Worker、API 和 Alert 进程 | 外部 PostgreSQL 14-18、ZooKeeper、Java 11 或 17，以及管理员信息 |
| Trino | 一个 Coordinator，可配置 Worker | 每台目标主机上的 Java 25、固定归档、节点和数据路径及端口 |
| Doris | 一个 FE 和一个 BE，可同机或分开 | ARM64 归档、Java 17、数据目录、足够的下载解压空间和显式凭据 |
| Elasticsearch | 单节点，认证和 HTTPS | 官方 Linux/ARM64 归档、内核及 OS 前提、数据目录和受保护的管理员输入 |
| MinIO | 一个源码构建的 Server 和 Console | 固定源码、Go 1.24.8 工具链、模块来源或缓存、持久存储和新的 root 凭据 |

参考 PostgreSQL 服务使用的版本为 10，不能满足 Airflow 或 DolphinScheduler 的 PostgreSQL 14-18 要求。需要单独准备合适的外部数据库，不能认为勾选 PostgreSQL 卡片就补齐了前提条件。

Doris 记录的归档约 4.35 GB，展开后约 6.8 GB，尚不包含服务数据。应为下载、解压、旧安装、元数据和应用数据预留空间，商店 bundle 的大小不能作为容量估算。

## 各服务的初始化要点 {#service-initialization}

**Airflow：** 安装会创建独立 Python 环境，只初始化空的专用数据库，并验证管理员设置。已有 schema 会被检查，不会自动升级。声明的 `INITIALIZE_DATABASE` 和 `CREATE_ADMIN` 操作保留用于显式恢复。还应验证专用健康工作流。首版固定为 LocalExecutor，仅在文件中改为其他执行器，不会自动提供 Celery Worker 或消息代理部署。

**DolphinScheduler：** 管理的伪集群使用外部持久化 PostgreSQL schema 与 ZooKeeper，不采用上游 standalone 的内存 H2 和测试 ZooKeeper。空 schema 的归属检查、初始化和管理员设置属于受管理生命周期，不要把非空的其他业务 schema 当作初始化目标。

**Kyuubi：** 管理包固定使用官方二进制，并提供工具把它封装为兼容 RPM。正常的二进制打包路径不会从源码编译 Kyuubi。启动引擎前，需要配置匹配的 Spark/Hadoop 依赖。

**Trino：** Java 25 是服务自身的前提，即使 Ambari 的 Java 基线是 17。内置 TPCH catalog 用于验证；Hive、Iceberg、认证、TLS 和生产资源组都需要显式配置并验证。

**MinIO：** 当前参考实现可通过固定源码构建安装，早期不可安装的草稿已被替代。构建会验证源码和可复现二进制摘要。商店中不附带 MinIO 软件二进制；制作分发内容时，应检查其上游 AGPL-3.0 许可与源码分发要求。

## 服务检查能证明什么 {#service-checks}

服务检查使用软件原生观察。典型例子包括 Kyuubi 引擎和会话操作、Airflow 健康 DAG 结果、Celeborn Worker 注册、DolphinScheduler 认证后的进程状态、Trino TPCH 查询、Doris 临时表写读、Elasticsearch 认证后的集群检查，以及 MinIO 对象写读与清理。

临时测试资源属于准确的执行实例。进程存在、下载成功或命令退出码为零，并不足以证明所有检查通过。应查看 Ambari 请求、任务结果和软件的结构化观察。

基础检查通过，不代表高可用、安全加固、备份恢复、生产容量或任意连接器兼容性已经通过。

## 能力边界与扩展工作 {#limits-and-extension-work}

参考首版不承诺高可用或自动故障转移。Airflow CeleryExecutor、MinIO 分布式存储、Celeborn HA、Doris 复制和云模式、自动数据库迁移以及生产连接器集成都需要另外实现和验收。

停止服务或退役定义，不表示要求删除用户持久化数据；删除定义仍可能因正在使用而被阻止。修改绑定前先阅读[操作语义](./operations-and-recovery.md)。

十项服务均提供[完整配置文档编辑](./content-configuration.md)。专属服务指标是独立能力，仅有 Linux 主机指标并不能证明已经具备服务级监控覆盖。
