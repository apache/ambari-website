---
title: 可选服务和安装准备
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

# 可选服务和安装准备 {#reference-service-catalog}

先按用途选择服务，再看下面的安装要求。目前的示例商店包含十种服务。

这些仍是[预览功能](./overview.md)。下面介绍的是已验证的示例安装方式，不代表上游软件支持的所有模式都已经接入 Ambari。

## 有哪些服务可选？ {#packages-and-software}

| 服务 | 主要用途 | 示例商店使用的软件版本 |
| --- | --- | --- |
| Nginx | 提供网页服务、反向代理 | 从操作系统软件源安装 |
| PostgreSQL | 存储关系型数据 | 从操作系统软件源安装，参考测试使用 PostgreSQL 10 |
| Kyuubi | 为 Spark 提供统一的 SQL 入口 | 1.9.4 |
| Airflow | 调度和跟踪工作流 | 3.3.2 |
| Celeborn | 为计算任务提供 Shuffle 存储 | 0.7.0 |
| DolphinScheduler | 编排和调度数据工作流 | 3.1.9 |
| Trino | 跨数据源执行 SQL 查询 | 483 |
| Doris | 存储和分析数据 | 4.1.4 |
| Elasticsearch | 搜索和索引 | 9.5.4 |
| MinIO | 提供兼容 S3 的对象存储 | `RELEASE.2025-10-15T17-29-55Z` |

Nginx、PostgreSQL、Airflow、Elasticsearch 和 MinIO 使用通用环境，不需要为了在商店中使用它们而先搭一个 Hadoop 集群。Kyuubi、Celeborn、DolphinScheduler、Trino 和 Doris 使用示例 BIGTOP 环境。页面会检查哪些服务能装到你选的集群，不能把所有服务随意混装到同一个集群。

合集里还有一个基础包，Ambari 会在需要时自动选用，不用把它当成另一个应用来安装和运行。

## 安装前要准备什么？ {#topology-and-prerequisites}

| 服务 | 首版安装方式 | 需要提前准备 |
| --- | --- | --- |
| Nginx | 一个受管理的实例 | 可访问的操作系统软件源、空闲端口 |
| PostgreSQL | 一个受管理的实例 | 系统软件包、持久化数据目录、本机管理权限和备份 |
| Kyuubi | 服务端和客户端组件 | Java 17、Spark 3.5/Scala 2.12、Hadoop 客户端、ZooKeeper 配置 |
| Airflow | 单机，使用 LocalExecutor | Python 3.11、专用的外部 PostgreSQL 14-18 数据库、管理员信息 |
| Celeborn | 一个 master 和一个或多个 worker | Java 17、对应版本的安装包、存储目录、空闲端口 |
| DolphinScheduler | master、worker、API、alert 进程放在一台机器上 | 外部 PostgreSQL 14-18、ZooKeeper、Java 11 或 17、管理员信息 |
| Trino | 一个 coordinator，可增加 worker | 每台安装机器上的 Java 25、安装包和数据目录 |
| Doris | 一个 FE、一个 BE，可以同机或分开 | ARM64 安装包、Java 17、足够的磁盘空间、明确设置的账号密码 |
| Elasticsearch | 单节点，启用 HTTPS 和身份验证 | Linux/ARM64 安装包、所需的系统设置、存储空间、管理员凭据 |
| MinIO | 一个服务端和控制台 | 指定版本的源码、Go 1.24.8、可访问的构建依赖或已准备的缓存、存储空间、新的 root 凭据 |

**Airflow 和 DolphinScheduler 要求的 PostgreSQL 版本，比示例商店中的 PostgreSQL 10 更新。** 仅安装商店里的 PostgreSQL，并不能满足它们的要求。

Doris 的临时磁盘需求也比较大：安装包约 4.35 GB，解压后约 6.8 GB，这还不包括业务数据。下载包、解压目录、旧版本和业务数据都要留出空间。

## 第一次安装，有哪些容易忽略的地方？ {#service-initialization}

Airflow 和 DolphinScheduler 需要自己的数据库空间。请准备空的专用数据库或 schema，并配置正确的账号。安装过程会初始化符合要求的空库并设置管理员，不会接管别人已有的数据，也不会自动升级已有数据库结构。

Kyuubi 使用官方发布的二进制安装包。启动 SQL 引擎前，先准备兼容的 Spark 和 Hadoop 依赖。

Trino 需要 Java 25，即使 Ambari 本身使用的是 Java 17。自带的 TPCH 示例目录可以用来验证查询；连接 Hive、Iceberg 或其他生产数据源，需要另行配置。

MinIO 会从指定版本的源码构建。合集里不包含现成的 MinIO 可执行文件，安装前要准备好构建环境和依赖；如果需要再分发，还应确认上游 AGPL-3.0 的要求。

## 怎么确认装好了？ {#service-checks}

安装和启动完成后，在 Ambari 的服务页面运行服务检查。检查会尝试基本操作，比如执行 Trino 查询、在 Doris 中写入再读取数据，或者在 MinIO 中上传、下载并清理测试对象。

检查失败时，点开对应任务查看详情，按提示处理。仅仅看到进程在运行，还不能说明查询或对象访问一定正常。

检查通过说明基本功能可用，不代替容量测试、备份恢复测试或生产环境的安全检查。

## 哪些能力还没包括？ {#limits-and-extension-work}

首版面向单机或小集群。Airflow CeleryExecutor、分布式 MinIO、Celeborn 高可用、Doris 多副本和云模式尚未接入。只在配置里改一个选项，不会自动补齐这些部署能力。

这十种服务都可以[编辑完整配置文件](./content-configuration.md)。监控支持因服务而异；能看到主机 CPU 和内存，不代表已经有该服务的专属仪表盘。

需要核对这些示例对应的服务包版本时，再查看[源码版本说明](../release-baseline.md#runtime-mpack-follow-up)。
