---
title: 运行测试
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

# 在 Apache Ambari 中运行测试 {#running-tests-in-apache-ambari}

从仓库根目录运行命令，并准备 JDK 17、Maven 3.9.x、受支持的 CPython 构建环境；包含 UI 测试时还需要 Node 22/npm。

## Java 测试 {#java-tests}

运行 Server Java 测试及 reactor 依赖：

```bash
mvn -am test -pl ambari-server -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

运行一个现有测试类，并允许不包含该类的 reactor 依赖继续执行：

```bash
mvn -am test -pl ambari-server -DskipPythonTests -Dtest=AmbariServerTest -Dsurefire.failIfNoSpecifiedTests=false -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

## Python 测试 {#python-tests}

Agent 和 Server 的 Maven 执行会分别调用其 `src/test/python/unitTests.py` runner。默认掩码为 `[Tt]est*.py`，同时覆盖两种受支持的文件命名风格。在不排除 Python 测试的情况下运行选定产品模块：

```bash
mvn -am test -pl ambari-agent -DskipSurefireTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
mvn -am test -pl ambari-server -DskipSurefireTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

对于现有 Agent 文件，可在 Agent 命令中添加 `-Dpython.test.mask=TestCommandStatusDict.py`。请为选定 runner 使用实际文件名或受支持的 glob；发现零个测试属于错误，而不是通过。上述执行测试的是 Ambari 产品 Python 代码，独立于打包的 `cp39` ABI 和网站测试套件。

## React 和网站检查 {#react-and-website-checks}

`ambari-web/latest` 包拥有自己的 npm 脚本。请在该目录使用其 Node/npm 工具链运行：

```bash
npm ci
npm test
npm run build
```

在独立的网站仓库中，`yarn test:i18n` 检查翻译文档结构，`yarn test:e2e` 运行网站浏览器检查。网站检查不验证 Ambari Server 或 Agent 行为。

## 集成测试 {#integration-tests}

功能测试模块是 `ambari-funtest`。其 Maven 配置定义 Surefire/Failsafe 执行；运行前准备数据库、容器和服务前提条件：

```bash
mvn -am verify -pl ambari-funtest -DskipFunctionalTests=false -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

## 报告和参数 {#reports-and-parameters}

`-am` 构建依赖，`-pl` 选择项目，`-DskipPythonTests` 跳过 Python 执行，`-DskipSurefireTests` 跳过配置的 Java Surefire 测试，`-Drat.skip` 跳过 Apache RAT。功能测试和 UI 测试开关各有作用域。记录每一项跳过设置；不要替换为未声明的 `skipJavaTests` 属性或不存在的 integration profile。报告位置请参阅[单元测试报告](./unit-test-reports.md)。

命令契约来自固定版本的 [Agent POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/pom.xml)、[Server POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/pom.xml) 和 [功能测试 POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-funtest/pom.xml)。
