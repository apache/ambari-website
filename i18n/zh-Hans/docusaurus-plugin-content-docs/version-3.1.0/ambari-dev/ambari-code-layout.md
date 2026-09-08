---
title: Ambari 代码布局
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

# Ambari 代码布局 {#ambari-code-layout}

Ambari 是一个 Maven 多模块项目。仓库将服务器、Agent、共享库、Web 应用、Views 和贡献模块分开，使每个构建和所有权边界都保持明确。

![Apache Ambari 3.1 仓库模块及职责边界](/img/3.1.0/handdrawn/module-map-zh.webp)

*此图按职责对模块分组，箭头表示运行时协作或打包关系，不表示完整的 Maven 依赖图。*

## 顶层模块 {#top-level-modules}

```text
ambari/
  ambari-agent/
  ambari-common/
  ambari-project/
  ambari-server/
  ambari-server-spi/
  ambari-utility/
  ambari-views/
  ambari-web/
  ambari-admin/
  contrib/
  docs/
```

| 模块 | 用途 |
| --- | --- |
| `ambari-server` | Server API、编排、持久化、Stack 处理和服务器端 Python 工具。 |
| `ambari-agent` | Agent 运行时、命令执行、注册、缓存、安全和 Python 打包。 |
| `ambari-common`、`ambari-server-spi`、`ambari-utility` | 共享 API 和实现工具。 |
| `ambari-web` | 主要 Ambari Web 应用。`latest` 包含 React/TypeScript/Vite UI；`classic` 是历史构件。 |
| `ambari-admin` | 独立的 Ambari Admin Web 应用，其 React 构建位于 `src/main/resources/ui/ambari-admin`。 |
| `ambari-views` | View 框架接口、服务器集成、示例和软件包契约。 |
| `contrib` | 可选集成和维护的第三方贡献。 |
| `docs` | 项目、架构、API 和发布文档。 |

## Java 构建 {#java-build}

根 Maven 构建以 JDK 17 为目标。`ambari-project/pom.xml` 集中管理依赖版本、插件版本、测试设置和受支持的模块属性。模块 POM 继承这些选择；如果已有属性或 dependency-management 条目适用，请不要引入未管理的版本。

服务器和共享 Java 模块使用标准 Maven 源码与测试布局。服务器 REST 资源、状态模型、控制器、DAO、实体、升级目录和测试分别位于 `ambari-server/src/main` 与 `ambari-server/src/test` 下。

## Agent 和 Python {#agent-and-python}

Agent Python 源码和测试位于 `ambari-agent/src/main/python` 与 `ambari-agent/src/test/python` 下。Agent 的 `pyproject.toml`、锁定文件和 Maven 打包定义受支持的解释器、依赖、wheel 和构件边界。服务器端 Python 工具遵循相应模块的打包和测试配置。

## React 应用 {#react-applications}

主要 UI 位于 `ambari-web/latest/src` 下，路由对象在 `src/router`，API 客户端在 `src/api`，共享状态在 `src/store`，用户工作流在 `src/screens`。其 `package.json` 使用 Vite、TypeScript、React 19 和 Vitest。独立的 Admin React 应用由 `ambari-admin` 构建和打包，不是 `ambari-web/latest` 中的第二个根。

Views 仍是由服务器托管的扩展。React shell 发现获得授权的 View 实例，并打开其服务器提供的同源上下文；View 应用代码属于 View 软件包，而不是主要 UI 模块。
