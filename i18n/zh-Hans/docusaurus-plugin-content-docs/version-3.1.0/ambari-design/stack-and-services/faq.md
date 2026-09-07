---
title: Stack 和服务常见问题
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

# Stack 和服务常见问题 {#stack-and-services-faq}

## 继承如何工作？ {#how-does-inheritance-work}

子 Stack 可以继承父 Stack 提供的服务定义、脚本、配置和属性。Ambari 会先加载继承内容，再应用子 Stack 的显式覆盖，从而形成供部署计划使用的最终服务模型。只有平台差异、组件版本或兼容性要求确实发生变化时才应覆盖父级内容；通用行为应继续保留在父 Stack 中，以免多个版本复制后逐渐产生不一致。

## 选择哪个版本？ {#which-version-is-selected}

Stack 选择决定可用的服务定义、组件版本和兼容配置，但它与 Ambari Server 和 Agent RPM 的版本选择相互独立。服务版本切换也不会自动安装或升级 Ambari Metrics RPM。制定部署或升级计划时，应分别记录 Ambari 版本、Stack 版本、服务版本、Metrics 软件包版本和监控后端版本，并验证这些组合是否得到候选版本支持。

## 新 Stack 应记录什么？ {#what-should-a-new-stack-document}

新 Stack 至少应记录服务和组件清单、部署数量约束、依赖关系、配置类型及默认值、软件包、生命周期命令、自定义操作、告警、快速链接、遥测接入和支持平台。公开标识符应保持稳定。对于可能影响已有集群的变更，还应说明配置迁移、版本选择、失败恢复和回滚行为。

## 应如何测试变更？ {#how-should-changes-be-tested}

测试应覆盖继承解析、服务版本选择、首次安装、启动、停止、重启、升级、重复执行、部分主机失败和恢复。除了确认 Stack 元数据能够加载，还要检查生成的主机组件分配、软件包和配置、命令参数、请求状态与服务检查结果。声明支持多个平台时，应在每个目标平台上保留相应验证证据。
