---
title: 查询和仪表盘
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

# 查询和仪表盘 {#queries-and-dashboards}

![React 仪表盘和 Explorer 查询通过 Ambari 权限检查、查询代理和数据源访问 VictoriaMetrics，元数据单独保存](/img/3.1.0/handdrawn/dashboard-query-path-zh.webp)

*仪表盘和数据源定义属于 Ambari 元数据。指标样本保留在 VictoriaMetrics 中，浏览器只能通过受限的 Ambari 代理查询。*

| 操作 | 所需权限 |
| --- | --- |
| 读取仪表盘/数据源和查询指标 | `CLUSTER.VIEW_METRICS` |
| 打开 Targets 路由 | `HOST.VIEW_METRICS` |
| 打开服务 Metrics 标签页 | `SERVICE.VIEW_METRICS` |
| 创建/更新/删除仪表盘 | `CLUSTER.MANAGE_USER_PERSISTED_DATA` |
| 创建/更新/删除/设为默认数据源 | `AMBARI.MANAGE_SETTINGS` |

Ambari Server 也会检查权限。菜单可见不代表有权修改数据源或仪表盘。

## 配置数据源 {#configure-a-datasource}

1. 打开 Data sources，检查集群的数据源列表。
2. 对于未启用 VMAUTH 身份验证的 Ambari 托管 VictoriaMetrics 安装，检查自动配置的默认数据源。
3. 对于其他身份验证或路由拓扑，使用 Ambari Server 可访问的查询端点创建显式数据源。VMAGENT 摄取端点不是 VictoriaMetrics 查询端点。
4. 通过数据源设置配置身份验证和 TLS，测试连接，启用数据源并选择所需的默认数据源。
5. 返回 Explorer，在诊断仪表盘布局前验证近期查询。

数据源测试失败可能表示网络、身份验证、TLS、租户路由或 URL 无效。请修复错误报告的边界，不要全局禁用证书验证。

## 从 PromQL 开始 {#start-with-promql}

选择数据源和时间范围。以下示例使用 `cluster1`；请替换为实际集群标签。

```promql
up{cluster="cluster1",ambari_target="host"}
```

值为 1 表示该目标抓取成功。缺失序列与显式零值不同：除收集器健康状态外，还要检查目标发现和所选时间窗口。

```promql
ambari_agent_memory_available_bytes{cluster="cluster1",ambari_target="host"}
```

此 gauge 以字节报告可用内存。主机查询必须包含 `ambari_target="host"`，以免将同名组件指标误认为主机指标。

```promql
sum by (host) (
  rate(ambari_agent_cpu_seconds_total{
    cluster="cluster1",ambari_target="host",cpu="total",mode!="idle"
  }[2m])
)
```

此示例汇总聚合 CPU 序列的非空闲 CPU 时间速率，不是预先标准化的利用率百分比。对于现成的容量/利用率面板，请使用内置 Linux 仪表盘。

## 使用和自定义仪表盘 {#use-and-customize-dashboards}

内置目录包含十一个仪表盘：Linux Fleet Overview、Linux Host Detail、HDFS、NameNode、DataNode、HBase Master、HBase RegionServer、HiveServer2、NodeManager、ResourceManager 和 ResourceManager 主机指标。

打开仪表盘，选择其数据源/时间范围，并使用变量缩小显示的主机或组件。此基线配置的服务标签页覆盖 HDFS、YARN、HBase 和 Hive；其他服务需要自己的遥测和仪表盘集成。

编辑器支持面板配置、变量、克隆、JSON 导入/导出、保存和图表共享。将导出的仪表盘定义置于版本控制中，但不要嵌入数据源密钥。克隆的仪表盘可以以内置查询为起点，同时保留集群和单位约定。

Ambari 将保留的 `cluster` 变量绑定到当前应用集群，并将 `__rate_interval` 计算为四个查询步长或 120 秒中的较大者。这些保留变量不是用户可编辑的仪表盘筛选器。计数器使用 `rate` 或 `increase`；gauge 直接查询。

![PR #4182 三节点开发部署中的 Linux 主机群概览](@site/static/img/3.1.0/linux-fleet-dashboard.webp)

此运行截图来自[固定版本的三节点监控验证记录](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/frontend-refactor/runtime-evidence/AMBARI-26638)。图中数值仅代表该开发环境，不是容量规划基准。

## 工作区交互 {#workspace-interactions}

以下交互来自[运行时 mpack 与控制台开发后续版本](../management-packs/overview.md)。应确认所安装的 Web 构建包含这些功能；上文较早的固定监控证据，本身不能证明这些新控件已经提供。

### 刷新与时间范围 {#refresh-and-time-range}

相对时间仪表盘默认每 30 秒刷新。偏好按用户和集群保存，也会保留显式暂停。暂停的视图提供**恢复实时更新**入口。绝对历史时间范围和布局编辑期间，不会自动推进时间。

查询会保留秒精度，不再把结束时间向下截到整分钟。时间序列横轴采用所选查询边界，即使只有一个样本也保持一致。刚安装采集后，应等待首批样本；CPU、吞吐量等速率查询需要足够的观察点才能计算。

### 阅读与操作图例 {#legend-controls}

磁盘吞吐量的一项图例表示一个主机、设备以及读或写方向，并不代表该主机的全部指标。

| 操作 | 效果 |
| --- | --- |
| 点击序列名称 | 只切换这一条曲线的显示或隐藏 |
| 点击**仅看** | 只显示选中的曲线 |
| 点击**全部显示** | 恢复全部返回的曲线 |
| 滚动图例 | 浏览其余项目，不必为了放下所有名称而压缩整个绘图区 |

![左对齐的磁盘吞吐图例，提供明确的显隐和仅看操作](@site/static/img/3.1.0/mpack-store/legend-controls.jpg)

隐藏项使用划线名称和隐藏图标，数量提示区分正在显示的序列和已返回序列；全部隐藏时有明确说明。颜色和可见性按指标标签及查询目标身份跟随序列，刷新或重排时不会串到其他曲线。“仅看”状态下，新到来的序列保持隐藏。如果所选序列离开结果集，可用**全部显示**查看其他序列。

这些控件只影响展示，采集与存储会继续。开始另一条查询时，会重置该图表的显隐上下文。

### 从图表进入查询 {#chart-to-explorer}

打开面板菜单并选择**查看查询**。Explorer 会接收已经解析的查询、数据源、集群路由和时间范围，核对后再显式执行。

Explorer 区分尚未执行、加载中、有结果、无匹配序列和查询失败。取消会终止正在进行的请求，过期上下文的迟到响应不应覆盖当前结果。修改输入后，在下一次查询完成前，原结果会被标记为上次查询的结果。

通过图表、数据视图切换查看结果。最近查询历史按用户和持久集群身份隔离，浏览器存储失败不妨碍查询。键盘用户可以使用 Ctrl/Command + Enter 运行。

### 检查采集目标与数据源 {#inspect-targets-and-datasources}

采集目标支持按主机、组件或端点筛选、需要关注筛选和详情侧栏。从目标详情点击**查看查询**时，会把准确标签带入 Explorer。

对于托管的 VictoriaMetrics 数据源，页面结合 Ambari 服务发现与已存储的采集成功状态、样本时间和耗时进行展示，不会向存储节点索取另一台 VMAGENT 的目标清单。缺失、冲突、不属于当前作用域或超过五分钟的观察不会显示为健康；没有可靠的近期观察时显示未知。明确采集失败与未知状态不同。

其他数据源保留自身的原生目标元数据行为。不支持元数据接口时会明确说明能力限制，不能把它当作一个成功的空目录。

数据源详情显示作用域、端点和是否已配置认证。**已启用**是配置设置，不是连接测试结果，应分别检查查询链路、发现与采集，以及服务专属指标覆盖。

## API 示例 {#api-examples}

以下查询端点相对于 Ambari 通常的 `/api/v1` 基础路径。使用数据源列表中的数据源 ID，而不是仪表盘 ID。保持查询 URL 编码：

```shell
export DATASOURCE_ID=1
curl --fail --get --user "$AMBARI_USER" \
  --data-urlencode 'query=up{cluster="cluster1",ambari_target="host"}' \
  "$AMBARI_URL/api/v1/metrics/$DATASOURCE_ID/api/v1/query"
```

范围查询使用对应的 `query_range` 端点以及 `query`、`start`、`end` 和 `step`。使用此示例前，请按[部署指南](./deployment.md)中的说明设置环境变量。

## 限制和恢复 {#limits-and-recovery}

查询边界将查询限制为 65,536 个字符，将范围查询限制为 11,000 个点，将批处理限制为 64 个查询，将数据源响应限制为 16 MiB，并将配置的请求超时限制为最多 60 秒。重试超大请求前，缩短时间窗口或增大查询步长。

面板请求会在上下文变化时取消，失败面板不会清除其他成功面板。区分空数据、权限错误、不可用数据源、过期目标和无效表达式。更改仪表盘前先检查 Targets，再检查 Explorer。

图表共享属于 Ambari 授权和集群绑定模型，不承诺匿名公开访问。请使用预期接收者的权限测试共享。

## 实现参考 {#implementation-references}

请参阅固定版本的 [Metrics API 客户端](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-web/latest/src/api/metricsApi.ts)、[监控页面](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-web/latest/src/screens/Monitoring)和[Linux 收集器](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-agent/src/main/python/ambari_agent/metrics/linux.py)。
