---
title: Apache Ambari JIRA 使用指南
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# Apache Ambari JIRA 使用指南 {#apache-ambari-jira}

以下页面介绍 [Apache Ambari JIRA](https://issues.apache.org/jira/browse/AMBARI) 中用于核心项目和贡献内容的任务、错误和改进的组件。

## 组件 {#components}

拟议名称 | 描述
------|---------------------
alerts | 与 Ambari Alerts 系统相关的 JIRA。
ambari-admin | 专门用于 Ambari Admin 的新组件。
ambari-agent | 与 Ambari Agent 相关的 JIRA。
ambari-client | 与 Ambari Client 相关的 JIRA。
ambari-metrics | 与 Ambari Metrics 系统相关的 JIRA。
ambari-server | 与 Ambari Server 相关的 JIRA。
ambari-shell | 专门用于 Ambari Shell 的新组件。
ambari-views | 与 [Ambari Views 框架](../ambari-design/views/index.md)相关的 JIRA。基于该框架构建的具体视图将使用标签处理。
ambari-web | 专门用于 Ambari Web 的新组件。
blueprints | 与 [Ambari Blueprints](../ambari-design/blueprints/index.md) 相关的 JIRA。
contrib | 与 contrib 下贡献内容相关的 JIRA，例如 Ambari SCOM。
documentation | 与项目文档（包括 Wiki）相关的 JIRA。
infra | 与项目基础设施相关的 JIRA，包括构建、发布机制和自动化。
security | 与 Ambari 安全功能相关的 JIRA，包括 Kerberos。
site | 与项目网站 http://ambari.apache.org/ 相关的 JIRA。
stacks | 与 Ambari Stacks 相关的 JIRA。
test | 与单元测试和测试自动化相关的 JIRA。

## 标签的使用 {#use-of-labels}

在某些情况下，上述组件可能范围“过宽”，需要指定该组件的具体领域。为此，请结合使用组件和标签。示例：

功能领域 | 描述|组件|标签
-------------|------------|---------|---------
HDP Stack | 这些是 HDP 的具体 Stack 实现。 |stacks | HDP
BigTop | 这是 BigTop 的具体 Stack 实现。 | stacks | BigTop
Files View | 这是 Files 的具体视图实现。 | ambari-views | Files
Ambari SCOM | 这是 Microsoft System Center 的管理包的具体贡献。 | contrib |Ambari-SCOM
