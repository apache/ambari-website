---
title: 集成服务 Telemetry
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

# 集成服务遥测 {#integrate-service-telemetry}

![服务遥测描述符、端点发现、采集和存储集成](/img/3.1.0/handdrawn/service-telemetry-integration-zh.webp)

| 描述符字段 | 含义 |
| --- | --- |
| `format` | 原生公开使用 `prometheus_text`，类型化转换使用 `jmx_json` |
| `path` | 组件已知端点，例如 `/prom` 或 `/jmx` |
| `profile` | 使用 JMX 时相对于服务的类型化 JMX 配置文件 |
| `endpoint.policy` | 选择 HTTP 或 HTTPS 的生效配置 |
| `endpoint.http` / `endpoint.https` | 配置属性、可选 HA 属性前缀和默认端口 |
| `auth.principal` / `auth.keytab` | Kerberos 的生效配置引用，不嵌入密钥 |

Ambari Server 选择组件所在主机作为目标，并从生效配置中解析端口。描述符和配置文件验证会拒绝不受支持的数据格式及不安全路由。Stack 的服务继承机制同样适用于遥测元数据。

## 原生与 JMX {#native-versus-jmx}

基线对 NameNode、DataNode 和 ResourceManager 使用原生 Hadoop `/prom`。属性 `hadoop.prometheus.endpoint.enabled=true` 会在受支持的位置启用该原生端点。

NodeManager 按照 Hadoop 3.3 契约，有意使用稳定的 Web UI `/jmx` 端点。包含进程内 Timeline Collector 的进程可以在其他位置附加全局 Prometheus Sink，使预期的 NodeManager Web UI `/prom` 为空。不要仅因为其他 Hadoop 组件支持原生公开就替换此路由。

HBase Master、HBase RegionServer 和 HiveServer2 在文档基线中也使用类型化 JMX 配置文件。较新的组件版本或其他原生端点在更改描述符前需要验证输出和身份验证。

## 类型化配置文件 {#typed-profile}

下面的精简示例展示了随包提供的 NodeManager 配置文件中的一条规则。生产配置文件包含更多规则；应扩展经过审查的配置文件，而不是用此摘录替换它。

```json
{
  "schemaVersion": 1,
  "id": "nodemanager-3.3",
  "maxSeries": 64,
  "rules": [
    {
      "bean": {
        "domain": "Hadoop",
        "properties": {
          "service": "NodeManager",
          "name": "NodeManagerMetrics"
        }
      },
      "attributes": {
        "ContainersRunning": {
          "name": "yarn_nodemanager_containers_running",
          "type": "gauge",
          "unit": "containers",
          "help": "Current number of containers running on the NodeManager."
        }
      }
    }
  ]
}
```

匹配明确的 ObjectName 和数值属性。定义稳定的指标名称、正确的类型和单位，并限制序列数量。计数器名称使用 `_total` 后缀。不要将每个 JMX 属性都转换为无界标签。

## 注册和验证 {#registration-and-validation}

1. 添加或更新服务描述符；对于 JMX，还要添加或更新其 `telemetry-profiles` 内容。
2. 验证该组件支持的普通、HA、HTTP、HTTPS 和 Kerberos 变体的生效配置解析。
3. 提供具有代表性的原生或 JMX 响应固定样例。检查成功转换，以及格式错误、超大、重复序列和不匹配响应被拒绝的情况。
4. 将元数据包含在 Server/Stack 软件包中，并遵循其正常部署生命周期。使用受支持的配置/组件变更触发分配重新编译。
5. 通过 HTTP 服务发现确认已分配的路由，抓取实际路由，并在 Explorer 中查询生成的指标。
6. 使用导出的名称和单位添加仪表板，然后测试 active/standby 及故障行为。

分配是完整的、带哈希的软件包；如果候选配置无效，Agent 会保留最后一个有效配置。不得将这种恢复行为误认为已成功接受新描述符。

## 分离管理信号 {#management-signals}

保留的 `metrics.json` 文件只定义管理操作所需的少量直接 JMX 属性，并不是新的历史监控定义。例如，Ambari 仍需读取 NameNode HA 状态、集群 ID、安全模式和检查点信息、JournalNode 日志状态，以及 HBase 主节点和存活服务节点信息。

将服务迁移到 `telemetry.json` 时不要移除这些属性：即使监控仪表板使用 Prometheus 查询，管理工作流也可能依赖它们。

## 源代码示例 {#source-examples}

请参阅固定版本的 [HDFS 描述符](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/telemetry.json)、[YARN 描述符](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/YARN/telemetry.json)和 [NodeManager 配置文件](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/YARN/telemetry-profiles/nodemanager-3.3.json)。
