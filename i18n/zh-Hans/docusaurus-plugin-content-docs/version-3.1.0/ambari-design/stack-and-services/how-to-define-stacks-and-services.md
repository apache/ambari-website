---
title: 如何定义堆栈和服务
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

# 如何定义堆栈和服务 {#how-to-define-stacks-and-services}

## 服务定义 {#service-definition}

在 `metainfo.xml` 中定义服务。为服务指定唯一名称和版本，列出其组件，并提供 Python 3 生命周期脚本。组件使用 `MASTER`、`SLAVE` 和 `CLIENT` 等类别；`cardinality` 表示允许的部署数量。

根据需要声明 `commandScript`、`customCommands`、`requiredServices`、`configuration-dependencies`、`osSpecifics` 和生成的 `configFiles`。配置依赖告知 Ambari 组件所需的配置类型，以及哪些变更可能要求重启。软件包脚本和模板必须生成服务使用的文件。

服务可以定义 `alerts.json`、`quicklinks/quicklinks.json`、`themes` 和 service advisor。服务 `metrics.json` 描述 Ambari 控制平面保留的服务指标。当前 BIGTOP 服务还使用 `telemetry.json` 和 telemetry profile 支持 Prometheus/VictoriaMetrics 监控路径；这些是独立契约。

## 堆栈定义 {#stack-definition}

使用描述符、服务、仓库、配置和受支持的升级元数据定义堆栈版本。验证继承关系和完整组装的服务定义。当前示例包括 [BIGTOP HDFS](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml) 和 [BIGTOP VictoriaMetrics](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS/metainfo.xml)。

## 验证 {#validation}

在目标堆栈上执行描述符验证、软件包和配置渲染、服务检查、自定义操作、advisor 验证和升级测试。检查每个引用的脚本、软件包、配置类型、仓库和 telemetry profile 是否存在。明确目标操作系统和架构；源码 profile 本身不等于生产认证。
