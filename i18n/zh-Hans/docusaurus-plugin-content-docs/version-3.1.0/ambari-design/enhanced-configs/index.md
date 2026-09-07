---
title: 增强配置
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

# 增强配置 {#enhanced-configs}

增强配置仍是 Ambari 3.1 中构建丰富配置表单的服务定义机制。服务主题提供 UI 元数据，无需修改共享 UI 代码。

## 配置解析 {#configuration-resolution}

![Stack 默认值、服务与集群配置、配置组覆盖、主机上下文、受保护输入、验证、版本化保存和 Agent 分配](/img/3.1.0/handdrawn/configuration-resolution-zh.webp)

Ambari 将 Stack 默认值、集群期望配置、匹配的配置组覆盖以及主机或组件上下文解析为一组生效值。受保护输入通过凭据路径处理，不会复制到普通服务属性中。最终配置通过验证并保存为版本后，才分配给 Agent。

## 元数据模型 {#metadata-model}

主题定义 `layouts`、`placement` 和 `widgets`。布局描述标签页、部分和子部分；放置将配置键绑定到子部分；小部件元数据将配置绑定到滑块、列表、切换开关、目录、密码、文本字段、复选框和文本区域等控件。

配置元数据提供 `display-name` 和 `value-attributes`，包括类型、最小值、最大值、单位、步长和枚举项。`depends-on` 属性构成有向依赖图，更改后可触发 Stack Advisor 为依赖值提供建议。

## 有效条件和验证 {#effective-conditions-and-validation}

有效表单结合 Stack 默认值、服务配置元数据、所选主题和当前配置值。小部件显示单位可以不同于持久化单位；显示或保存时会执行转换。提交配置前，验证会检查声明的类型、范围、枚举和必需值。

依赖更新仅限于已更改属性。recommendations 请求接收更改配置列表，并仅返回受影响的依赖项。无效元数据、不支持的小部件定义或超出声明约束的值必须在保存前修正。

## 保存和重新加载 {#save-and-reload}

Ambari 通过常规配置 API 保存最终配置。主题或 Stack 定义更改后必须重启 Ambari Server 才能重新加载元数据。3.1 保留主题；已移除的旧监控小部件模型与这些配置表单控件无关。

当前 Stack 自有元数据见固定版本的[主题和配置实现](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP)。
