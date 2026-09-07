---
title: Stack 钩子
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

# Stack 钩子 {#stack-hooks}

Hook 可通过围绕服务操作运行的操作扩展 Stack 生命周期。Hook 必须记录触发条件、顺序、幂等性、环境和恢复行为。

## 顺序 {#ordering}

前置操作在目标操作前运行，可验证或准备状态。前置操作成功后运行目标操作。后置操作在目标操作后运行，应记录结果或执行清理。

除非依赖图保证顺序，Hook 不得假设无关服务已经完成。失败必须根据 Hook 契约停止操作或报告错误。

## 操作环境 {#action-environment}

操作环境提供命令上下文、主机、服务、组件、配置和操作元数据。应通过受支持的操作 API 读取值，不要依赖旧版 Python 2 行为或未记录路径。

使用稳定明确的标识符，并确保重复执行安全。测试前置、目标和后置操作失败、重试及回滚。
