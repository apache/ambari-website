---
title: 代码审查指南
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

# 代码审查指南 {#code-review-guidelines}

审查者应先理解 JIRA 目标并检查源代码实现，验证变更确实覆盖用户可见工作流、权限、API 负载、异步状态和恢复行为。

## 审查证据 {#review-evidence}

要求为变更行为提供聚焦测试。Server 和 Agent 变更应检查失败处理和状态转换；React 变更应对比旧版行为和当前源代码；遥测应验证指标名称、负责人、保留策略和告警行为。

检查测试是否覆盖成功和失败路径，作者是否报告准确命令、跳过测试和已有失败。不要将路由或组件名称视为功能对等的证明。

## 审查规范 {#review-conduct}

优先审查小而连贯的拉取请求和主题提交。重大新功能或跨模块契约应在批准前讨论设计。文档、生成输出或运行时行为有歧义时，应要求源代码证据。

作者不得批准自己的拉取请求。至少应由一名熟悉受影响领域的独立审查者批准，且合并前必须通过必要的自动检查。

审查意见应具体、可操作，并关联源代码行或可观察行为。区分阻塞项和建议，并在后续审查中验证修复。
