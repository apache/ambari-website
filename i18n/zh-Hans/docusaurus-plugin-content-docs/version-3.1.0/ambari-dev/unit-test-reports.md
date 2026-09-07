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

报告是所选 Maven reactor 和 profile 的证据。被跳过的套件没有通过报告；即使 Maven 忽略失败，报告中的失败仍然是失败。

## 构建和打包报告 {#build-and-packaging-reports}

检查模块的 `target` 目录，查看 RPM、wheel 元数据、依赖审计和 SBOM 输出。打包的 CPython 3.9 ABI 和平台 profile 必须与待审查构件匹配。

路径和输出行为由固定版本的 [Agent runner](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/src/test/python/unitTests.py)、[Server runner](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/src/test/python/unitTests.py) 和[功能测试模块](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-funtest/pom.xml)定义。

## 网站报告 {#website-reports}

网站检查独立于 Ambari 产品测试：

- `yarn test:i18n` 报告 Markdown 结构、链接、图片和语言环境覆盖情况。
- `yarn test:e2e` 报告网站/UI 构建的浏览器行为。

这些检查不能证明 Server、Agent、Stack、KDC、数据库或真实集群行为。

## 解读结果 {#interpreting-results}

记录确切命令、模块/profile、运行时版本、跳过的套件和报告路径。对于发布或运行时变更，应结合代表性的 Server/Agent 和 Stack 验证；不要从单个仪表板、网站检查或生成的 XML 文件推断端到端验收。
