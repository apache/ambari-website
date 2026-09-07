---
title: 版本函数、conf-select 和 stack-select
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

# 版本函数、conf-select 和 stack-select {#version-functions-conf-select-and-stack-select}

版本函数帮助选择兼容的服务定义和配置。`conf-select` 为选定的服务版本选择配置，`stack-select` 选择 Stack 暴露的活动服务版本。

这些机制选择服务内容，不选择 Ambari Server 或 Agent RPM。Ambari Metrics RPM 也不属于服务版本选择，必须遵循自身的软件包和兼容性规则。

## 选择规则 {#selection-rules}

根据当前元数据和部署上下文解析 Stack 与服务版本。明确记录选定的服务版本，验证依赖，并拒绝不受支持的组合，不要静默回退。

## 测试 {#testing}

测试正常选择、继承、版本缺失、不兼容版本、升级、回滚和重复执行。记录活动 profile、源代码引用、生成配置和恢复证据。
