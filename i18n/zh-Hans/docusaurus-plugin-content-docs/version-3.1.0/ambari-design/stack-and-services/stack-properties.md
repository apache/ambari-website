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

Stack 属性描述某个 Stack 版本能够提供的服务、组件、配置类型、生命周期命令、服务依赖和可选能力。Ambari Server 会在加载 Stack 时解析这些属性，安装向导、Blueprint、服务操作和升级计划随后都会引用解析结果。属性名称、服务标识符和组件标识符一旦进入公开 API 或持久化部署记录，就应保持稳定；随意重命名会使已有集群配置、自动化脚本和升级路径失效。

## 功能和工具 {#features-and-tools}

应以当前 Stack 元数据为依据声明支持的功能和工具，并明确功能适用的服务版本、操作系统和处理器架构。只有当对应的服务定义、命令脚本、配置渲染、依赖检查、失败报告和恢复行为都已经实现并经过验证时，才能启用功能标志。仅存在一个类、脚本入口或构建参数，不足以证明该功能能够在集群生命周期中正常工作。

每个属性都必须明确声明作用域、默认值、允许的覆盖层级以及缺失值处理方式。不要复制已经过时的 HDP 路径、Python 2 配方或与当前 BIGTOP 服务定义不一致的默认值。审查时应核对当前启用的构建配置，检查属性在继承和覆盖后得到的最终值，并在每个受支持平台上验证生成的部署计划、配置文件和命令参数。

## 验证 {#validation}

测试至少应覆盖父子 Stack 继承、服务级覆盖、依赖排序、配置渲染、首次安装、重复执行、升级、回滚、部分失败和恢复。除检查元数据能否被解析外，还应核对生成的组件分配、软件包列表、命令环境和最终配置。变更记录中应保留对应源码修订、适用平台、兼容性影响、测试结果及已知限制。
