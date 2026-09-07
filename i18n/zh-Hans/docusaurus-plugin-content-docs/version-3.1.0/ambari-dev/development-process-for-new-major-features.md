---
title: 新主要功能的开发流程
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

# 新主要功能的开发流程 {#development-process-for-new-major-features}

Ambari 3.1 的新主要功能必须在实现前提供书面设计。设计应在 Apache JIRA 中讨论，并标明用户工作流、兼容性边界和负责人。

## 设计要求 {#design-requirements}

如果涉及这些界面，应描述 Ambari Server 和 Agent API、React UI 路由和权限，以及遥测或告警契约。包含数据迁移、升级和降级行为、失败恢复、可观测性、安全性和回滚。

将提议行为与相关旧版实现和当前源代码进行对比，记录源代码证据，并指出任何不一致或已知源代码问题；不要仅根据名称推断对等性。

## 实现 {#implementation}

从派生仓库的 `apache/ambari:trunk` 创建主题分支。保持共享契约、所需消费者和聚焦测试在一起。分离无关清理、生成证据和广泛机械编辑。

只暂存预期文件，每次提交前检查 `git diff --cached`。提交主题中使用 JIRA key。保留 API 标识符，并为下游用户记录兼容性。

## 验证和审查 {#validation-and-review}

测试成功、失败、重试、刷新和恢复路径。运行聚焦的 Server、Agent、React 和遥测测试，并在拉取请求中记录准确命令、跳过测试和剩余风险。

从派生仓库向 `apache/ambari:trunk` 发起拉取请求。作者不得批准该请求；要求每个受影响界面的负责人独立审查，只有检查和证据通过后才能合并。
