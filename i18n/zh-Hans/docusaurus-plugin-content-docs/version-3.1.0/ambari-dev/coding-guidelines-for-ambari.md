---
title: Ambari 编码指南
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

# Ambari 编码指南 {#coding-guidelines}

本指南描述当前 3.1 开发基线。请将更改限制在所属模块内，保留现有契约，并为行为更改添加有针对性的测试。

## Java 和 Maven {#java-and-maven}

使用 JDK 17 构建 Ambari。Maven 依赖和插件版本在 `ambari-project/pom.xml` 中集中管理；已有受管理版本时应使用该版本。Java 源码应遵循所在模块的格式和 checkstyle 规则，为公共 API 添加有信息量的 Javadoc，并避免使用 `@author` 标签。

保持 import 明确，并按项目要求排序：`java`、`javax`、`org`、`com`，然后是其他软件包。使用 `slf4j` 作为日志门面，并使用兼容 Log4j 的级别。当项目 mock 测试需要替换依赖时，避免使用静态状态和 final 类。

## React 和 TypeScript {#react-and-typescript}

主要 UI 位于 `ambari-web/latest`，是 React 19、TypeScript 和 Vite 应用。可用脚本如下：

```bash
npm run dev
npm run build
npm run lint
npm run test
```

使用现有的 `ambariApi`、React Router 路由对象、权限 hook、React Bootstrap 组件以及共享的加载/错误模式。保持 API DTO 类型明确，保留同源基础路径，取消过期的异步工作，并提供可重试的失败状态。不要向当前应用添加旧版 Brunch、Router 5、React 17 或未经审查的 UI framework。

独立的 Admin React 应用位于 `ambari-admin/src/main/resources/ui/ambari-admin`，并拥有自己的构建配置。View 应用仍是由服务器托管的软件包，不要复制到主要 React 源码树中。

## Python 和 Agent {#python-and-agent}

Agent Python 代码从 `ambari-agent/src/main/python` 打包。模块的 `pyproject.toml`、锁定文件和打包元数据定义受支持的解释器和依赖集。优先使用官方上游发行版和标准库 API；没有经过审查的兼容性决策时，不要添加 vendored 分支或未锁定的运行时依赖。

Python 更改必须保留机密处理、确定性的子进程行为、受支持的 ABI/架构选择和软件包边界。测试应位于模块的测试树中，并通过仓库配置的 Python 测试入口运行。

## 测试和审查 {#tests-and-reviews}

每个行为更改都应包含有针对性的单元测试，覆盖成功以及失败或恢复路径。React 测试使用 Vitest 和 Testing Library；Java 测试使用项目的 JUnit 设置；Python 测试使用配置的 Python 测试运行器。完整 Maven 验证仍是广泛的集成检查：

```bash
mvn clean test
```

审查前运行最适用的窄范围测试，检查 diff 中是否有无关文件或生成输出，并记录跳过的或依赖环境的检查。切勿将凭据、私钥、cookie 或机密放入源码、fixture、日志或测试输出。
