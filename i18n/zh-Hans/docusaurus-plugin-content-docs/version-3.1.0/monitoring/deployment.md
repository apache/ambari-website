---
title: 部署和操作监控
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

# 部署和操作监控 {#deploy-and-operate-monitoring}

![Ambari 管理的 VictoriaMetrics 单节点与集群拓扑](/img/3.1.0/handdrawn/victoriametrics-topology-zh.webp)

| 拓扑 | 组件 | 作用 |
| --- | --- | --- |
| `deployment_mode=single` | 一个 `VICTORIAMETRICS_SERVER` 和至少一个 `VMAGENT` | 一个存储进程处理写入和查询 |
| `deployment_mode=cluster` | `VMSTORAGE`、`VMINSERT`、`VMSELECT` 和 `VMAGENT` | 分离存储、写入和读取角色 |
| 可选 `VMAUTH` | 位于选定写入/读取拓扑之前 | 提供稳定网关，可选择启用配置的身份验证 |

不要将两种存储模式都分配为独立的必需 master。服务脚本会在启动组件前验证拓扑。请根据实际工作负载规划存储、复制、抓取频率和队列容量；默认值不是容量建议。

## 通过 Ambari 安装 {#install-through-ambari}

1. 打开 Add Service，或在集群安装期间选择 VictoriaMetrics。
2. 为选定拓扑分配组件。对于小型初始部署，选择包含 VictoriaMetrics Server 和 VMAGENT 的单节点模式；需要网关时添加 VMAUTH。
3. 检查 `victoriametrics`、`victoriametrics-scrape`、`victoriametrics-auth` 和 `victoriametrics-env` 配置类型。
4. 除非需要明确管理的替代身份，否则保留 `managed_discovery_identity=true`。Ambari 会在首次启动 VMAGENT 前配置集群范围身份和发现配置。不要在抓取模板中替换为管理员密码。
5. 配置发现协议、端口和 CA，使其匹配已部署的 Ambari API。对于已验证的 TLS，保留 `ambari_sd_tls_insecure_skip_verify=false`。
6. 通过服务工作流启动存储组件、可选网关和 VMAGENT。等待后台请求完成，并在重试前检查各任务的失败情况。
7. 分别确认组件状态、已发现目标、近期样本和数据源查询。

## 关键默认值 {#key-defaults}

| 配置 | 默认值 | 含义 |
| --- | --- | --- |
| Agent `[prometheus] enabled` | `true`（Linux 上） | 启动内置收集器 |
| Agent `bind_address` / `port` | `0.0.0.0` / `9101` | 使用接口/防火墙策略限制可达性 |
| Server `prometheus.agent.metrics.port` | 必须匹配 Agent 端口 | HTTP 发现公布的端口 |
| `scrape_interval` / `scrape_timeout` | `30s` / `10s` | VMAGENT 抓取时序 |
| `http_sd_refresh_interval` | `30s` | 发现刷新间隔 |
| `retention_period` | `12` | VictoriaMetrics 将其解释为月；也支持 `30d` 等显式值 |
| `remote_write_max_disk_usage` | `10GB` | 每个远程写入 URL 的队列限制 |
| `vmagent_replication_factor` | `1`, 最大 `2` | 抓取冗余，与存储复制分离 |
| `require_authentication` | `false` | 需要时启用并配置 VMAUTH 身份验证 |

Agent 端口更改必须与 Server 发现配置协调。更改抓取端点不同于更改 Stack 组件自身的 Web UI 端口。

## 网络路径 {#network-paths}

| 连接 | 默认目标端口 |
| --- | --- |
| VMAGENT 到 Ambari 发现 | Ambari API 端口，默认为 `8080`；启用 HTTPS 时使用已配置的 HTTPS 端点 |
| VMAGENT 到 Agent | `9101` |
| 单节点摄取/查询 | `8428` |
| VMINSERT / VMSELECT HTTP | `8480` / `8481` |
| VMSTORAGE HTTP / insert / select | `8482` / `8400` / `8401` |
| VMAGENT HTTP / VMAUTH | `8429` / `8427` |

Agent 收集器没有应用层身份验证。VMAUTH 凭据保护其网关，而不是 Agent 端口。请分别限制两条路径。

## 验证各层 {#verify-each-layer}

在 Agent 主机上验证收集器健康状态和主机指标：

```shell
curl --fail http://127.0.0.1:9101/-/healthy
curl --fail http://127.0.0.1:9101/metrics
```

从有权管理的环境验证发现。为安装设置 URL 和集群；curl 会提示输入用户密码，而不是将密码放入命令中：

```shell
export AMBARI_URL=https://ambari.example.com:8443
export AMBARI_USER=metrics-reader
export CLUSTER_NAME=cluster1
curl --fail --user "$AMBARI_USER" "$AMBARI_URL/api/v1/clusters/$CLUSTER_NAME/prometheus_targets"
```

收集器健康并不意味着每个组件抓取都正常。在[explorer](./queries-and-dashboards.md)的 Monitoring > Targets 中使用 `up{cluster="cluster1",ambari_target="host"}`。只有从发现结果获得实际路由 ID 后，才打开已发现的组件路由。

## 故障和恢复 {#failure-and-recovery}

| 症状 | 检查 |
| --- | --- |
| 收集器无响应 | Agent 日志、收集器启用状态/绑定/端口、防火墙以及主机是否为 Linux |
| 发现返回 401/403 | 身份凭据、集群指标查看授权、API 协议/端口和 CA |
| 主机目标正常但组件目标失败 | 有效组件配置、上游端点、配置匹配、keytab/主体和 TLS |
| 目标正常但图表为空 | 数据源 URL、集群选择器、时间范围、远程写入路径、存储健康状态和摄取延迟 |
| 队列增长 | 远程写入可达性、存储容量、网关身份验证和队列磁盘空间 |
| 分配更新被拒绝 | 描述符/配置验证和 Agent 日志；最后有效分配仍保持活动状态 |

除非有意覆盖，否则保留默认的托管 URL 派生方式。错误的 `remote_write_url` 可能绕过预期网关或选择错误租户。拓扑或配置更改后，再次验证发现、写入和读取。

## 实现参考 {#implementation-references}

请参阅固定版本的[服务脚本和模板](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS)和[遥测架构](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/ambari-agent-prometheus-telemetry-architecture.md)。
