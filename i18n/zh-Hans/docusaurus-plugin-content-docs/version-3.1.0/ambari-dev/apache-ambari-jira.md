---
title: Apache Ambari JIRA 使用指南
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

# Apache Ambari JIRA 使用指南 {#apache-ambari-jira}

Apache Ambari 使用 [JIRA](https://issues.apache.org/jira/browse/AMBARI) 跟踪缺陷、改进、文档和新功能。创建问题前先搜索，并关联相关拉取请求。

## 必需的问题上下文 {#required-issue-context}

描述问题、预期行为、受影响版本、复现步骤以及相关日志或源代码证据。功能应包含设计、兼容性影响、权限、API 或事件契约、迁移、遥测和回滚计划。

一个 JIRA 对应一个连贯交付物。若工作涉及 Ambari Server、Agent、React 前端和遥测，应标明边界，并让实现和测试可追溯到同一计划。

## 工作流 {#workflow}

在派生仓库中从 `apache/ambari:trunk` 创建主题分支。从派生仓库向 `apache/ambari:trunk` 发起拉取请求，关联 JIRA，并保持其状态和描述最新。

显式暂存文件，并在提交主题中使用 JIRA key。不得包含凭据、生成构件、无关重构或超出声明范围的变更。

只有在独立审查、必要检查、聚焦测试和恢复路径证据完成后，才能关闭 JIRA。源代码不准确之处应单独记录，不要自行编造修复。
