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

服务可以定义 `alerts.json`、`quicklinks/quicklinks.json`、`themes` 和 Service Advisor。服务级 `metrics.json` 描述 Ambari 控制平面保留的管理指标。当前 BIGTOP 服务还使用 `telemetry.json` 和遥测配置文件支持 Prometheus/VictoriaMetrics 监控链路；两者是用途不同、不能互相替代的契约。

## 堆栈定义 {#stack-definition}

使用描述符、服务、仓库、配置和受支持的升级元数据定义堆栈版本。验证继承关系和完整组装的服务定义。当前示例包括 [BIGTOP HDFS](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml) 和 [BIGTOP VictoriaMetrics](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS/metainfo.xml)。

## 验证 {#validation}

在目标 Stack 上执行描述符验证、软件包与配置渲染、服务检查、自定义操作、Advisor 验证和升级测试。逐项确认引用的脚本、软件包、配置类型、仓库和遥测配置文件确实存在。目标操作系统和处理器架构必须明确；源码中存在某套构建配置，并不等于该平台已经获得生产认证。
