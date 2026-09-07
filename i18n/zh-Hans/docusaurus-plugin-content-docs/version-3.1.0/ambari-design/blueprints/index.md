---
title: Blueprint（蓝图）
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

# Blueprint {#blueprints}

## 概览 {#blueprint-overview}

Blueprint 是集群的声明式定义，描述 Ambari 通过 REST API 创建集群时使用的 Stack、主机组、组件和配置，无需交互式集群安装向导。

![Blueprint 注册、集群模板主机映射、配置优先级和异步创建流程](/img/3.1.0/handdrawn/blueprint-provisioning-zh.webp)

*Blueprint 定义可复用拓扑，集群模板再把拓扑绑定到已注册主机，并启动异步 Ambari 请求。*

3.1 实现会在分配组件前编译 Stack `telemetry.json` 和其他服务元数据。当前 Stack 示例位于 BIGTOP 3.2.0、3.3.0 和 3.4.0 资源中；不要假定存在 HDP 2.x 示例或已发布的 3.1 Stack。

## 创建和注册 Blueprint {#create-and-register-a-blueprint}

1. 准备 Ambari Server 并注册所有 Agent 主机，确认可通过 Ambari API 看到这些主机。
2. 创建包含 `Blueprints` 和 `host_groups` 的 JSON 文档。`Blueprints.stack_name` 和 `Blueprints.stack_version` 选择已安装的 Stack，每个主机组指定其组件。
3. 使用 `POST /api/v1/blueprints/:blueprintName` 注册。请求正文是 Blueprint 文档。默认启用拓扑验证；`validate_topology=false` 是处理验证失败的显式例外，仅应在理解拓扑时使用。
4. 创建包含 `blueprint`、`host_groups`、可选 `configurations` 以及可选 `credentials`/`security` 的集群模板。映射物理 FQDN，或使用 `host_count` 和 `host_predicate` 选择符合条件的主机。
5. 使用 `POST /api/v1/clusters/:clusterName` 创建集群。异步响应会提供用于查看进度的 `/requests` URL。

集群模板可以包含 `config_recommendation_strategy`：`NEVER_APPLY`、`ONLY_STACK_DEFAULTS_APPLY`、`ALWAYS_APPLY` 或 `ALWAYS_APPLY_DONT_OVERRIDE_CUSTOM_VALUES`。建议由 Stack Advisor 生成，并可按所选策略覆盖自定义值。

## 主机组和配置 {#host-groups-and-configuration}

`host_groups` 是组件放置单元。主机组需要 `name` 和 `components`；模板通过带 `fqdn` 的 `hosts` 映射，或通过 `host_count` 及可选 `host_predicate` 映射。谓词使用标准 Ambari 主机查询语法，例如 `Hosts/cpu_count=4`。

配置优先级依次为 Stack 默认值、Blueprint 集群范围、Blueprint 主机组范围、模板集群范围、模板主机组范围。没有默认值的必需属性必须在相关操作前提供；缺少必需属性会产生指出该属性的客户端错误。

对于启用监控的服务，应保持 Stack 描述符与有效组件配置一致。组件遥测端点、端口、协议策略和身份验证由 Server 根据已安装 Stack 解析，不接受任意请求 URL。有关 VictoriaMetrics 服务流程，请参阅[监控部署](../../monitoring/deployment.md)。

## API 和源码参考 {#api-and-source-references}

Blueprint 创建使用上述 Ambari REST 资源。当前 Stack 和 Blueprint 资源位于固定版本的 [BIGTOP Stack 源码](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP)；分配编译由 [TelemetryAssignmentCompiler](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/agent/stomp/TelemetryAssignmentCompiler.java) 实现。
