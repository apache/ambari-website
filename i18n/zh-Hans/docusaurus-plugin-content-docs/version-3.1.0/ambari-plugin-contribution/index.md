---
title: Ambari 插件贡献
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

# Ambari 插件贡献 {#ambari-plugin-contributions}

本节中的扩展与当前 Ambari Stack 和 React 契约集成。应将每个扩展视为独立版本化的组件，并提供明确的测试和部署文档。

## Stack 和服务扩展 {#stack-and-service-extensions}

Stack 扩展声明服务和组件元数据、配置类型、依赖关系、命令和生命周期行为。名称和默认值应与目标 Stack 兼容，并使用配置依赖关系标识变更后需要重启的组件。

## 遥测扩展 {#telemetry-extensions}

当前监控集成使用服务级 `telemetry.json` 描述符；使用 JMX 时，还需要提供类型化的 `telemetry-profiles` 配置文件。描述符应明确声明受支持的端点格式、访问路径、HTTP/HTTPS 策略、身份验证引用、有限的指标名称集合、数据类型、单位和时序数量上限。验证时应覆盖真实的原生端点或 JMX 输出、高可用角色、格式错误响应，以及 Agent 在新分配无效时保留最后一份有效配置的恢复行为。详见[服务遥测集成](../monitoring/service-integration.md)。

## Themes 和 Views {#themes-and-views}

服务 Theme 定义配置布局、小组件、属性、条件、建议以及权限/只读行为。Views 在经过身份验证的 React Shell 中使用服务器提供的同源上下文运行；应测试授权、导航和打包资源，而不要假设存在独立页面。

## 测试和打包 {#testing-and-packaging}

应在具有代表性的 Stack 和角色集合上测试扩展。包含安装、配置验证、服务重启、失败、重试和升级检查。通过正常的 Server/Stack 生命周期打包元数据和资源；不要依赖复制本地 React `dist` 目录或私有 Python 库。

## 已停止的教程 {#retired-tutorials}

历史 SCOM 管理包材料和 Ember 监控小组件教程仅作为历史参考保留，不属于 3.1 的扩展路径。不要以这些旧材料实现 React 仪表盘、Prometheus 遥测或当前 Stack 服务集成。

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
