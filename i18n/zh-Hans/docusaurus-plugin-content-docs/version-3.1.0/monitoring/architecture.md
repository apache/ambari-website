---
title: 监控架构
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

# 监控系统如何工作 {#monitoring-architecture}

Ambari 3.1.0 采集 Linux 主机以及已接入的 Hadoop、HBase、Hive 进程指标。Server 决定采集什么，Agent 提供指标端点，VMAGENT 定时抓取，VictoriaMetrics 保存并查询历史数据。浏览器通过 Ambari 查询，无需持有 VictoriaMetrics 凭据，也无需直接连通存储服务。

一个“样本”是某项指标在某个时刻的值，例如一台主机当前的可用内存。“时序”是同一项指标在相同标签下随时间变化的记录；标签用来区分集群、主机和组件。VMAGENT 定期向端点请求新的样本，这个动作称为“抓取”。

![Ambari 3.1.0 监控的配置下发、指标采集、时序存储和查询架构](/img/3.1.0/handdrawn/monitoring-architecture-zh.webp)

*采集配置与指标样本分开传递；查询通过 Ambari 返回存储中的历史指标，浏览器不直接连接 VictoriaMetrics。*

配置和指标值走不同的路径：Server 向 Agent 下发主机、端点、限制及 JMX 转换规则等配置；实际组件指标在 VMAGENT 每次抓取时读取，Agent 不缓存这些指标值，也不会将它们塞进心跳消息。

## 每个组件负责什么 {#component-responsibilities}

| 组件 | 职责 | 保存什么 |
| --- | --- | --- |
| Stack 服务定义 | 描述读取哪个组件端点、如何转换 JMX 响应 | 随 Stack 提供的描述符和 JMX 转换配置 |
| Ambari Server | 解析配置、发布目标列表、检查查询权限、管理仪表盘 | 元数据数据库中的管理配置、仪表盘和数据源定义 |
| Ambari Agent | 读取 Linux 主机统计，按请求获取已分配组件的指标 | 最近一次有效的采集配置，不保存指标历史 |
| VMAGENT | 发现目标、抓取端点、筛选样本并添加标签、远程写入 | 等待写入存储的样本所使用的本地发送队列 |
| VictoriaMetrics | 保存历史样本并执行查询 | 按配置保留期限保存的时序数据 |
| VMAUTH，可选 | 在存储写入和查询前提供认证与路由网关 | 网关配置，不保存指标历史 |
| React 监控页面 | 通过 Ambari API 展示目标健康状态、查询和仪表盘 | 仪表盘编辑通过 Ambari 持久化，不仅保存在浏览器中 |

**Ambari Agent 和 VMAGENT 是两个不同的进程。** 前者已经运行在受管主机上，负责提供指标；后者作为监控服务的一部分部署，负责请求这些指标并发送到存储。并不要求每台受管主机都单独部署一个 VMAGENT。

## 采集配置如何到达主机 {#control-plane}

Stack 的 `telemetry.json` 描述符定义监控接入方式，包括组件端点（`/prom` 或 `/jmx`）、实际配置项、可选的高可用配置前缀、请求限制，以及带有类型和转换规则的 JMX 配置。JMX 配置明确指定读取哪些 ObjectName 和数值属性、如何转换单位和指标名称，以及最多输出多少条时序。动态 ObjectName 只有在规则明确限定来源时，才能作为标签输出，避免标签无限增长。

Ambari Server 验证描述符与 JMX 配置，读取主机实际生效的配置，选择端口和 HTTP 或 HTTPS，解析带高可用后缀的属性，并替换 Kerberos 主体中的 `_HOST`。Server 为每个组件端点生成稳定的路由 ID，不能用这个 ID 选择任意 URL，未知路由返回 404。目标 URL 不允许包含凭据、查询参数或片段。

每份采集配置包含组件、服务、主机、数据格式、URL、超时、响应大小与并发限制、认证配置引用，以及 JMX 配置校验值。Server 通过现有 STOMP 通道的 `telemetry-v1` 能力及 `/telemetry` 端点发送配置。Agent 只保留当前生效的配置和被引用的 JMX 配置文件，并使用文件内容的校验值识别后者。

集群配置变更、组件或主机添加与移除、Stack 升级完成后，Server 会重新生成采集配置。Agent 注册时立即比较配置校验值，之后每五分钟核对一次；即使漏掉了一次通知，也能重新获取配置，不需要重启 Server 或 Agent。

Agent 先验证整份更新，再启用新配置。配置和规则通过临时文件、`fsync` 及原子重命名写入，避免更新中断后用不完整文件覆盖正常配置。无效或不完整的更新不会替换最近一次有效配置；启动时还会核对引用的 JMX 配置文件校验值。

## 主机和组件指标如何采集 {#data-plane}

Agent 指标服务在 Linux 上默认启用，通常监听 `0.0.0.0:9101`，由 `ambari-agent.ini` 的 `[prometheus]` 配置段控制。端口配置格式错误或超出范围时回退到 9101；端口绑定失败只影响指标服务线程，不会终止整个 Agent 进程。

| 端点 | 返回内容 |
| --- | --- |
| `/metrics` | Linux 主机指标及指标服务自身的运行指标 |
| `/metrics/components/{routeId}` | 一个已分配组件目标的指标 |
| `/-/healthy` | 指标服务自身的健康状态 |

主机采集器读取 `/proc` 和 `statvfs`，获取 CPU、内存、交换空间、负载、运行时长、启动时间、进程状态和线程总数，以及文件系统容量、inode、磁盘读写次数与吞吐量、网络流量与错误和丢包、上下文切换、中断、文件描述符、熵、OOM 终止、连接跟踪和 TCP 状态。内核没有提供的可选文件会单独跳过，不会导致所有采集失败。指标不携带每个进程、命令行、套接字、用户或容器的身份标签，以限制时序数量。

VMAGENT 调用 `GET /api/v1/clusters/{cluster}/prometheus_targets` 获取需要采集的目标，这就是 HTTP 服务发现。Server 为每个主机指标端点和组件路由返回独立目标组。`__metrics_path__` 指定 `/metrics` 或组件路径；`cluster`、`host`、`service`、`component`、`ambari_target` 等标签以 Server 返回的身份信息为准。主机目标没有服务或组件标签。VMAGENT 随后执行 HTTP 抓取，应用允许列表和标签调整规则，再远程写入样本。

### 一次采集的完整过程 {#collection-cycle}

以运行 DataNode 的主机为例，一次采集按以下顺序进行：

1. VMAGENT 从 Server 目标列表中取得主机端点和独立的 DataNode 端点。它们可以使用同一个 Agent 地址，但请求路径不同。
2. VMAGENT 请求主机端点，Agent 读取当前 Linux 统计并返回主机样本。
3. VMAGENT 单独请求已分配的 DataNode 路由，Agent 此时才读取 DataNode 的指标端点并验证响应。
4. VMAGENT 给样本附上目标的集群和主机身份，应用配置的筛选规则，并将接受的样本放入远程写入队列。
5. VictoriaMetrics 接收并保存样本。之后的仪表盘查询读取这段历史，而不是要求 DataNode 重新提供过去时刻的数值。

托管服务默认每 30 秒刷新目标列表、每 30 秒抓取一次，抓取超时为 10 秒。Agent 请求组件的超时是另一项限制，默认为 5 秒。Server 的 `prometheus.agent.metrics.port` 必须与 Agent 实际监听端口一致。

对于原生指标，Agent 验证非空 UTF-8 Prometheus 文本，保持指标名称和标签不变。对于 JMX，Agent 解析 JSON 的 `beans` 数组，按结构化 ObjectName 匹配规则并输出数值；缺失属性会单独跳过。JSON 无效、输出时序重复、没有匹配规则或时序数量超限，都会导致该组件路由本次采集失败。

### 已接入的组件 {#component-collection}

初始 BIGTOP 3.2.0 Stack 集成覆盖以下七种组件：

| 组件 | 端点及默认端口 | Agent 处理方式 |
| --- | --- | --- |
| HDFS NameNode | 原生 `/prom` | 验证后直接传递 |
| HDFS DataNode | 原生 `/prom` | 验证后直接传递 |
| YARN ResourceManager | 原生 `/prom` | 验证后直接传递 |
| YARN NodeManager | Web UI `/jmx`，8042/8044 | 按 JMX 配置转换 |
| HBase Master | `/jmx`，16010 | 按 JMX 配置转换 |
| HBase RegionServer | `/jmx`，16030 | 按 JMX 配置转换 |
| HiveServer2 | Web UI `/jmx`，10002 | 按 JMX 配置转换 |

Hadoop 原生指标需要启用 `hadoop.prometheus.endpoint.enabled=true`。这套集成特意为 NodeManager 选择稳定的 Web UI `/jmx` 端点。Hive 根据 `hive.server2.webui.use.ssl` 选择 HTTPS。每个路由独立工作，一个组件故障不会隐藏主机指标或其他组件指标。

## 历史指标存在哪里 {#storage-topology}

两种存储方式都由 VMAGENT 负责采集。在 `single` 模式下，`VICTORIAMETRICS_SERVER` 同时接收写入、保存样本和处理查询。在 `cluster` 模式下，`VMINSERT` 分发写入，`VMSTORAGE` 持久保存样本，`VMSELECT` 根据租户执行查询。可选的 `VMAUTH` 可以放在写入和查询入口之前。

受 Agent 路由并发限制约束，托管 VMAGENT 最多安排两个采集成员重复抓取同一目标。这与 VictoriaMetrics 的 `replication_factor` 不同：后者控制样本在 VMSTORAGE 节点之间保存几份。当两个 VMAGENT 重复采集时，托管存储按采集间隔对重复样本去重。VMAGENT 本地队列可缓冲已采集、尚未成功写入的样本，但不是 Agent 对指标值的缓存。

保留期限、存储路径、副本数、租户 ID（默认为 `0`）和部署方式都是独立的 Stack 配置。没有显式覆盖 URL 时，Stack 根据已分配的组件生成写入和查询地址。

## 页面如何查询并显示指标 {#query-dashboard}

Ambari Server 保存按集群区分的数据源定义，并提供带请求限制的兼容 Prometheus 查询代理。React 调用 `/api/v1/metrics/{datasourceId}/api/v1/query` 和 `query_range`，VictoriaMetrics 执行查询并返回已保存的样本。仪表盘和数据源定义属于 Ambari 元数据，不是 VictoriaMetrics 中的时序样本。

页面将每个面板绑定到 `AppContext.clusterName`。Linux 主机查询使用 Server 确定的 `cluster` 和 `ambari_target="host"` 标签。内置主机总览和主机详情仪表盘直接使用 `ambari_agent_*` 指标，不提供旧 Categraf 或 Telegraf 别名。计数器面板使用 `rate` 或 `increase`，计算时间窗口动态变化但至少为 120 秒；当前值类型的指标则直接查询。

保留的直接 JMX `metrics.json` 属性用于管理操作判断，不用于仪表盘或 VictoriaMetrics 存储：

| 组件 | 保留的属性 |
| --- | --- |
| NameNode | `HAState`、`ClusterId`、`Safemode`、`LastCheckpointTime`、`JournalTransactionInfo` |
| JournalNode | `JournalsStatus` |
| HBase Master | `IsActiveMaster`、`liveRegionServers`、`deadRegionServers` |

这些属性继续支持高可用角色、安全模式、集群身份、检查点、日志和主节点相关操作，与 `telemetry.json` 定义的指标样本分开处理。

## 网络访问与权限 {#security-boundaries}

Agent 指标服务没有应用层身份验证，必须绑定到监控网络接口，或使用主机防火墙限制访问。服务发现、数据源和仪表盘读取以及指标查询要求 `CLUSTER.VIEW_METRICS`；保存仪表盘要求 `CLUSTER.MANAGE_USER_PERSISTED_DATA`；管理数据源要求 `AMBARI.MANAGE_SETTINGS`。

Kerberos 采集配置只包含已解析的主体和本地 keytab 路径，不包含 keytab 内容或密码。Agent 的 Kerberos 辅助程序禁用重定向、检查 HTTP 错误、限制响应大小并验证 TLS；路由没有专用 CA 路径时继承 Agent 配置的 CA。浏览器指标查询通过 Ambari Server，不直接访问存储。

## 故障时会发生什么 {#resilience-and-limits}

| 故障 | 哪些功能仍可工作 | 检查重点 |
| --- | --- | --- |
| 一个组件停机或返回无效指标 | 其他组件路由和 Linux 主机指标仍可独立采集 | 该目标的抓取状态、组件进程、端点和认证 |
| 新采集配置无效 | Agent 保留最近一次有效配置 | 配置重新加载状态、Server 和 Agent 日志 |
| Agent 指标端口无法绑定 | Agent 主进程继续运行，但该指标服务不可用 | 端口冲突、绑定地址和指标服务健康状态 |
| 存储暂时不可达 | VMAGENT 可将已采集样本放入队列等待发送 | 队列容量、本地磁盘、存储可用性及远程写入错误；缓冲不代表无限期保证数据不丢失 |
| 仪表盘查询失败 | 指标采集是独立路径，可能仍在进行 | 数据源地址与凭据、查询权限、时间范围及存储查询服务 |

指标服务自身健康，不代表所有组件都已抓取成功。应查看每个目标的 `up` 结果，以及 Agent 的路由错误、最近成功采集时间、JMX 转换失败和主机采集器健康状态。还要检查存储写入；抓取成功并不能证明远程写入也已成功。

每个路由都有独立的超时、响应大小、并发、重定向、认证和转换处理。默认超时 5 秒、响应上限 32 MiB、每个路由最多两个并发请求；允许范围分别为 1..60 秒、1 KiB..64 MiB 和 1..16。超限或失败会返回非 2xx 响应，VMAGENT 据此将该目标记录为采集失败，主机与其他组件路由不受该次失败影响。

HTTP 服务发现结果按采集配置版本缓存，并使用 ETag 核对是否变化。这只缓存配置，不缓存样本。查询代理限制表达式最长 65,536 字符、范围查询最多 11,000 个点、每批最多 64 个查询、响应最大 16 MiB、请求体最大 8 MiB、超时最多 60 秒，且不跟随重定向。

当前架构不承诺旧指标别名、Grafana 仪表盘或 Windows 主机采集。HBase 原生 `/prometheus` 只有在核对具体版本的输出和认证行为之后，才能替换 JMX。

## 相关指南与源码 {#related-guides}

操作步骤见[部署](./deployment.md)、[查询与仪表盘](./queries-and-dashboards.md)、[服务接入](./service-integration.md)和[迁移](./migration.md)。实现依据为固定修订的 [PR #4182 架构源码说明](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/ambari-agent-prometheus-telemetry-architecture.md)。
