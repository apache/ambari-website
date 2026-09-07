---
title: 如何提交代码
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

# 如何提交代码 {#how-to-commit}

提交者对提交到 Apache Ambari 的变更的正确性和可维护性负责。每次提交都必须可追溯到 JIRA 问题或明确记录的例外情况。

提交前审阅拉取请求历史、源代码实现和测试证据。绿色检查是证据，不能替代技术审查。

正常变更采用 Review Then Commit（RTC）。作者不得批准自己的拉取请求；必须由熟悉受影响领域的独立提交者审查。

## 提交准备 {#commit-preparation}

确认拉取请求面向预期的 `apache/ambari` 分支，且 JIRA key、范围和源代码证据一致。适用时检查权限、API 契约、迁移、遥测以及失败或恢复行为。

显式检查 `git diff` 并暂存路径。提交前检查 `git diff --cached`，确保不包含凭据、生成文件、无关编辑或未经审查的变更。

保持主题提交连贯。契约变更及其所需消费者应放在一起；独立工作流、广泛机械编辑和生成证据应尽可能分开提交。

## 提交和后续处理 {#commit-and-follow-up}

提交主题中使用 JIRA key，并在正文保留有用的审查上下文。最终修订后运行作者列出的聚焦测试，如实记录失败或跳过的检查。

提交后核验分支和远程历史。如错误修复需要回移，针对受支持目标分支创建单独审查并重新运行适用测试。

如果新证据发现缺陷，应停止提交或创建后续 JIRA，不要将问题隐藏在无关变更中。
