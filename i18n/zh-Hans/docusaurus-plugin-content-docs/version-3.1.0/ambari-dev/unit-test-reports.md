---
title: 单元测试报告
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

# 单元测试报告 {#unit-test-reports}

## Ambari 产品报告 {#ambari-product-reports}

Maven 测试完成后，检查实际执行的模块：

- Java 单元测试：`ambari-server/target/surefire-reports/`
- 功能模块 Surefire 测试：`ambari-funtest/target/surefire-reports/`
- 功能模块 Failsafe 测试：`ambari-funtest/target/failsafe-reports/`
- Agent Python runner 日志：`ambari-agent/target/tests.log`，以及捕获的测试输出和退出状态
- Server Python runner：捕获的 stdout/stderr，包括发现的测试总数、失败信息和退出状态

默认 Python runner 使用文本测试结果。它们不会自动生成 `python-test-results` 或 `python-coverage` 目录；请使用验证作业选择的工具单独收集覆盖率。

报告只能证明所选 Maven Reactor 和构建配置实际执行的测试。被跳过的测试套件不能视为已经通过；即使 Maven 配置为忽略失败，报告中记录的失败仍必须按失败处理。

## 构建和打包报告 {#build-and-packaging-reports}

检查模块的 `target` 目录，核对 RPM、Wheel 元数据、依赖审计和 SBOM 输出。打包使用的 CPython 3.9 ABI 和平台构建配置必须与待审查制品一致。

路径和输出行为由固定版本的 [Agent runner](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/src/test/python/unitTests.py)、[Server runner](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/src/test/python/unitTests.py) 和[功能测试模块](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-funtest/pom.xml)定义。

## 网站报告 {#website-reports}

网站检查独立于 Ambari 产品测试：

- `yarn test:i18n` 报告 Markdown 结构、链接、图片和语言环境覆盖情况。
- `yarn test:e2e` 报告网站/UI 构建的浏览器行为。

这些检查不能证明 Server、Agent、Stack、KDC、数据库或真实集群行为。

## 解读结果 {#interpreting-results}

记录完整命令、模块与构建配置、运行时版本、被跳过的测试套件以及报告路径。对于发布或运行时变更，应结合具有代表性的 Server、Agent 和 Stack 验证；不能根据单个仪表盘、一次网站检查或一个生成的 XML 文件推断端到端验收已经完成。
