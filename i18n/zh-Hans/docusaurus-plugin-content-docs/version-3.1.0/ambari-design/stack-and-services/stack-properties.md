---
title: Stack 属性
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

# Stack 属性 {#stack-properties}

Stack 属性描述 Stack 可用的服务、组件、配置、命令、依赖和能力。保持属性名称和服务标识符稳定，因为部署计划和 API 会使用它们。

## 功能和工具 {#features-and-tools}

使用当前 Stack 元数据声明支持的功能和工具。只有在服务定义、命令、配置及恢复行为已实现并测试后，才能启用功能。

属性必须明确作用域和默认值。不要复制过时的 HDP 路径或 Python 2 配方。检查活动 profile 配置，并在每个受支持平台上验证生成的计划。

## 验证 {#validation}

测试继承、覆盖、服务依赖、配置渲染、安装、升级、失败和恢复，并为变更保留源代码证据和兼容性说明。
