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

版本函数根据已安装 Stack、服务版本和当前操作上下文选择兼容的服务定义与配置。`conf-select` 将服务配置路径切换到选定版本，`stack-select` 则选择 Stack 对外暴露的活动服务版本。二者处理的都是受管服务内容，调用顺序和可重复执行行为必须与服务升级及回滚流程保持一致。

这些机制不会选择或替换 Ambari Server、Agent RPM，也不会改变它们的运行时依赖。Ambari Metrics RPM 同样不属于服务版本选择范围，必须按照自身的软件包版本、目标架构和监控后端兼容性规则单独安装。排查版本问题时，应先区分 Ambari 软件包版本、Stack 版本和具体服务版本。

## 选择规则 {#selection-rules}

应根据当前加载的 Stack 元数据、已安装软件包和部署上下文解析 Stack 与服务版本。解析结果需要明确记录，后续命令应验证依赖、配置目录和软件包内容与该版本一致。遇到缺失版本或不受支持的组合时，应返回可诊断错误并停止操作，不要静默回退到旧版本或任意可用目录。

## 测试 {#testing}

测试范围应覆盖正常选择、父级继承、版本缺失、不兼容版本、升级、回滚和重复执行，并同时检查配置软链接或选择记录、服务命令环境和最终运行版本。测试报告应记录实际启用的构建配置、源码引用、输入版本、生成配置以及失败恢复证据，避免仅根据命令退出码判断选择成功。
