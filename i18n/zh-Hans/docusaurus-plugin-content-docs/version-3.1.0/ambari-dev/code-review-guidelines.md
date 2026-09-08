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

审查者应先理解 JIRA 描述的问题、验收条件和兼容性边界，再检查源码实现与实际行为。评审不能只确认代码能够编译，还要验证变更是否完整覆盖用户可见工作流、权限检查、API 请求体与响应、异步状态转换、错误反馈和恢复行为，并确认改动没有超出 JIRA 声明的范围。

## 审查证据 {#review-evidence}

每项行为变更都应提供范围明确、能够在失败时定位问题的测试。Server 和 Agent 变更需要检查成功路径、异常传播、状态转换、重试和重复执行；React 变更应依据当前接口契约核对加载、空数据、只读、失败和恢复状态；遥测变更则应验证指标名称、数据类型、单位、标签归属、基数限制、保留策略和告警语义。

检查测试是否真正执行了成功与失败路径，并确认作者报告了完整命令、运行环境、跳过的测试和已有失败。模拟测试通过后，仍要判断是否需要真实 Server、Agent、数据库或 Stack 环境验证。路由存在、组件名称相同或页面能够渲染，都不能单独证明权限、数据流和恢复行为已经达到功能对等。

## 审查规范 {#review-conduct}

优先审查范围小、目标连贯且提交历史清晰的拉取请求。重大新功能、数据模型变化或跨模块契约应在批准实现前完成设计讨论，并明确迁移与回滚方案。文档、生成输出和运行时行为之间存在歧义时，应以固定源码修订、可复现命令和实际运行证据为依据，不能用推测补齐缺失信息。

作者不得批准自己的拉取请求。至少应由一名熟悉受影响模块和兼容性风险的独立审查者批准，涉及安全、数据库或发布流程时应邀请相应领域维护者参与。合并前必须通过必要的自动检查，并确认测试失败不是通过放宽断言、扩大忽略范围或跳过关键路径来消除。

审查意见应指出具体源码位置、可观察行为、风险和期望结果，使作者能够直接验证修改是否完成。应明确区分阻塞问题、非阻塞建议和需要进一步澄清的假设；后续审查不仅要检查代码发生变化，还要验证原问题及其测试证据是否真正得到解决。
