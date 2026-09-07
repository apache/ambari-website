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

子 Stack 可以从父 Stack 继承服务定义和属性。除非平台或版本确实需要，子 Stack 应只覆盖必要值，将通用行为保留在父 Stack 中。

## 选择哪个版本？ {#which-version-is-selected}

Stack 选择用于确定服务定义和兼容配置，与选择 Ambari Server 和 Agent RPM 版本相互独立。服务版本选择不包含 Ambari Metrics RPM。

## 新 Stack 应记录什么？ {#what-should-a-new-stack-document}

记录服务、组件、依赖、配置、生命周期命令、告警和支持的平台。保持标识符稳定，并记录变更的迁移和恢复行为。

## 应如何测试变更？ {#how-should-changes-be-tested}

测试继承、服务版本解析、安装、启动、停止、重启、升级、失败和恢复，同时验证 Stack 元数据及生成的部署计划。
