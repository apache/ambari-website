---
title: Ambari 开发
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

# Ambari 开发 {#ambari-development}

本节是 Apache Ambari 3.1 构建和测试的入口。先阅读[从源代码构建](./building-from-source.md)，准备 Java、Maven、Python 和 React 工具链；使用[运行测试](./running-tests.md)了解 Maven reactor 命令，并使用[单元测试报告](./unit-test-reports.md)定位生成结果。

## 源代码和模块 {#source-and-modules}

仓库根目录是 Maven reactor。Server、Agent、共享库、Views，以及 `ambari-web` 和 `ambari-admin` React 包都是独立模块。优先使用 `-pl` 和 `-am`，让 Maven 选择目标模块并构建其 reactor 依赖。

## 工具链 {#toolchain}

Ambari 3.1 使用 JDK 17 和 Maven 3.9.x 构建。打包的 Agent 和 Server Python 运行时目标为 Linux x86_64 上的 CPython 3.9（`cp39`）；该打包目标不同于运行构建辅助程序的 Python 解释器。React 应用使用仓库配置的 Node/npm 工具链，当前前端脚本要求 Node 22。

## 构建边界 {#build-boundaries}

常规 Maven 构建包含 Java 与 Python 打包，并可以调用 `ambari-web/latest` 的 React 构建。迭代开发时，可以使用构建指南中明确支持的属性跳过 Python 或 UI 工作。某个构建配置未执行的产品区域不能视为已经通过验证。

## 测试边界 {#test-boundaries}

Maven Surefire/Failsafe、Python runner 输出和 React 测试用于验证 Ambari 产品代码。网站 Markdown/i18n 和浏览器检查用于验证文档站点，独立于 Ambari Server/Agent 验收。网站检查通过不代表真实集群工作流通过。

## 开发流程 {#development-workflow}

1. 检出源代码并检查受影响的模块。
2. 运行 `mvn -version`，确认 JDK 17/Maven 3.9.x，并确认所需 CPython/Node 工具链。
3. 使用 `-pl` 和 `-am` 构建或测试最小 reactor 范围。
4. 检查报告、生成的构件以及跳过测试的属性。
5. 修改运行时工作流时，在具有代表性的 Ambari Server/Agent 和 Stack 上验证部署行为。
