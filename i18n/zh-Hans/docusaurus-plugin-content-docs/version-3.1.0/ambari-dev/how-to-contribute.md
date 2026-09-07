---
title: 如何贡献
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

# 如何贡献 {#how-to-contribute}

Apache Ambari 贡献通过 Apache JIRA 和 GitHub 公开开发。开始前请搜索已有的 JIRA 问题和讨论；已有问题覆盖该工作时应复用它。

## 选择并界定工作范围 {#choose-and-scope-the-work}

描述问题、受影响模块、用户可见行为以及恢复行为。涉及 Server、Agent、React UI 或遥测的变更应标明每个契约及其负责人。

新功能应在实现前于 JIRA 发布简短设计，说明兼容性、API 或事件变更、权限、迁移、可观测性和回滚，并在设计被接受前征求社区反馈。

## 在派生仓库中开发 {#develop-on-a-fork}

在 GitHub 派生 `apache/ambari` 并克隆个人派生仓库。将 `upstream` 指向 `apache/ambari`，除非 JIRA 指定其他受支持分支，否则以 `trunk` 为基础。

每项连贯变更创建一个主题分支。不要在功能分支中混入无关清理、生成输出、依赖升级或格式变更。

## 修改并测试 {#make-and-test-changes}

提交时显式暂存：检查 `git diff`，只暂存预期路径，并在每次提交前检查 `git diff --cached`。提交主题中使用 JIRA key。

为变更行为添加聚焦测试，包括异步或有状态工作流的失败和恢复路径。运行最相关的 Server、Agent、React 或遥测测试，并记录准确命令及结果。

## 提交和审查 {#submit-and-review}

将主题分支推送到个人派生仓库，并从该分支向 `apache/ambari:trunk` 发起拉取请求。关联 JIRA，说明实现、风险、测试证据以及源代码或文档限制。

作者不得批准自己的拉取请求。邀请熟悉受影响领域的独立审查者；审查者应检查源代码证据、API 负载、权限和恢复行为，而不能只依据名称或路由。

通过后续提交处理审查意见，保持拉取请求聚焦，并在变更后更新测试证据。只有独立审查完成且自动检查成功后才可合并。
