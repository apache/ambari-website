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

Apache Ambari 使用 [JIRA](https://issues.apache.org/jira/browse/AMBARI) 跟踪缺陷、改进、文档和新功能。创建问题前应检索已有条目，避免将同一问题拆成互不关联的记录。实现开始后，应把设计讨论、相关拉取请求、测试结果和兼容性结论回填到 JIRA，使问题记录能够反映从提出到交付的完整过程。

## 必需的问题上下文 {#required-issue-context}

缺陷报告应说明当前行为、预期行为、受影响版本、环境前提、最小复现步骤以及已经脱敏的日志或源码证据。新功能还应包含设计目标、非目标、兼容性影响、权限模型、API 或事件契约、数据迁移、可观测性、失败处理和回滚计划。无法在提交时确认的内容应明确标为待验证，不能写成已经成立的事实。

一个 JIRA 应对应一个边界清晰、能够独立审查的交付物。若工作同时涉及 Ambari Server、Agent、React 前端、数据库和遥测，应列出各模块职责、接口变化和交付顺序，并让实现提交、测试、文档及迁移步骤都能追溯到同一计划。范围扩大时，应更新 JIRA 或拆分关联子任务，而不是在拉取请求中静默加入无关改动。

## 工作流 {#workflow}

在个人派生仓库中，以最新的 `apache/ambari:trunk` 为基线创建主题分支。从派生仓库向 `apache/ambari:trunk` 发起拉取请求，在标题和提交信息中引用 JIRA，并在评审、重构或测试结论发生变化时同步更新问题描述。提交前应确认分支没有混入其他任务的提交。

应逐项检查并显式暂存文件，在提交主题中使用 JIRA Key，并通过暂存差异确认实际提交范围。提交不得包含凭据、本地环境文件、构建产物、大型生成源文件、无关格式化或超出声明范围的重构；需要保留的生成制品应说明来源、复现方法和审查方式。

只有在独立审查、必要自动检查、范围明确的测试和恢复路径证据全部完成，并且文档与实现一致后，才能关闭 JIRA。仍未验证的平台、角色或失败场景应保留在问题中或创建后续任务。发现源码行为与预期不一致时，应单独记录并提供证据，不要通过文档推测或编造不存在的修复。
