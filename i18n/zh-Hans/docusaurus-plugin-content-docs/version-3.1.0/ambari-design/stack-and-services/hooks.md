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

Hook 在服务操作之前或之后执行附加动作，用于扩展 Stack 的生命周期。它适合完成跨服务前置检查、环境准备、结果记录或必要清理，但不应隐藏目标操作本身应承担的职责。每个 Hook 都必须记录触发条件、执行顺序、输入环境、幂等要求、失败传播方式和恢复行为，使调用方能够判断重试是否安全。

## 顺序 {#ordering}

前置操作在目标操作之前运行，可以验证依赖、检查配置或准备共享状态；只有全部必要前置操作成功后，目标操作才应继续。后置操作在目标操作之后运行，通常用于记录结果、刷新派生状态或清理临时资源。设计时需要明确目标操作失败后是否仍执行后置操作，以及后置操作失败应影响整个请求还是只记录告警。

除非依赖图明确保证先后关系，Hook 不得假设其他主机、组件或无关服务已经完成。并行任务之间也不能依赖未持久化的进程内状态。发生失败时，应按照 Hook 契约停止后续操作或返回能够定位阶段和主机的错误，不能吞掉异常后继续执行并产生表面成功的请求状态。

## 操作环境 {#action-environment}

操作环境提供请求与命令上下文、目标主机、服务和组件标识、生效配置以及操作元数据。Hook 应通过受支持的操作 API 读取这些值，并验证必需输入是否存在；不要依赖旧版 Python 2 行为、临时工作目录、未记录的环境变量或特定发行版上的偶然文件路径。

使用稳定且作用域明确的标识符，并保证同一个请求因网络中断、Server 重启或人工重试而重复执行时不会破坏已有状态。测试应分别覆盖前置操作失败、目标操作失败、后置操作失败、部分主机成功、再次执行和回滚，并检查最终请求状态与日志是否能够准确反映失败位置。
