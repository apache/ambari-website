---
title: 运行测试
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# 在 Apache Ambari 中运行测试 {#running-tests-in-apache-ambari}

本指南说明如何在 Apache Ambari 中运行不同类型的测试。有关正式测试配置，请参阅 [Ambari Jenkinsfile](https://github.com/apache/ambari/blob/trunk/Jenkinsfile)。

## Java 测试 {#java-tests}

### 运行全部 Java 测试 {#running-all-java-tests}
运行 Ambari Server 的全部 Java 测试：
```bash
mvn -am test -pl ambari-server \
    -DskipPythonTests \
    -Dmaven.test.failure.ignore \
    -Dmaven.artifact.threads=10 \
    -Drat.skip \
    -DskipAdminWebTests=true
```

### 运行指定的 Java 测试 {#running-specific-java-tests}
运行指定的 Java 测试类：
```bash
mvn -am test -pl ambari-server \
    -DskipPythonTests \
    -Dmaven.test.failure.ignore \
    -Dmaven.artifact.threads=10 \
    -Drat.skip \
    -DskipAdminWebTests=true \
    -Dtest=AmbariServerTest
```

运行测试类中的指定测试方法：
```bash
mvn -am test -pl ambari-server \
    -DskipPythonTests \
    -Dmaven.test.failure.ignore \
    -Dmaven.artifact.threads=10 \
    -Drat.skip \
    -DskipAdminWebTests=true \
    -Dtest=AmbariServerTest#testMethodName
```

### 测试参数说明 {#test-parameters-explained}
- `-am`：同时构建依赖项
- `-pl ambari-server`：仅构建 ambari-server 模块
- `-DskipPythonTests`：跳过 Python 测试
- `-Dmaven.test.failure.ignore`：即使测试失败也继续构建
- `-Dmaven.artifact.threads=10`：使用 10 个线程并行解析构件
- `-Drat.skip`：跳过 Apache RAT（发布审计工具）检查
- `-DskipAdminWebTests`：跳过管理 Web 界面测试
- `-Dtest`：指定要运行的测试类或方法

## Python 测试 {#python-tests}

### 运行全部 Python 测试 {#running-all-python-tests}
运行全部 Python 测试：
```bash
mvn test -pl ambari-server \
    -DskipJavaTests \
    -Dpython.test.mask="*_test.py" \
    -Dpython.test.skip.pattern="agent_perf.py"
```

### 运行指定的 Python 测试 {#running-specific-python-tests}
运行指定的 Python 测试文件：
```bash
mvn test -pl ambari-server \
    -DskipJavaTests \
    -Dpython.test.mask="test_file_name.py"
```

### Python 测试参数说明 {#python-test-parameters-explained}
- `-DskipJavaTests`：跳过 Java 测试
- `-Dpython.test.mask`：匹配要运行的测试文件的模式
- `-Dpython.test.skip.pattern`：匹配要跳过的测试的模式

## 集成测试 {#integration-tests}

### 运行集成测试 {#running-integration-tests}
运行集成测试：
```bash
mvn verify -pl ambari-server \
    -P integration-tests \
    -DskipPythonTests \
    -DskipJavaTests
```

### 集成测试参数 {#integration-test-parameters}
- `-P integration-tests`：启用 integration-tests profile
- `-DskipPythonTests`：跳过 Python 测试
- `-DskipJavaTests`：跳过 Java 测试

## 测试报告 {#test-reports}

测试执行后可在以下位置找到测试报告：

### Java 测试报告 {#java-test-reports}
- 单元测试：`ambari-server/target/surefire-reports/`
- 集成测试：`ambari-server/target/failsafe-reports/`

### Python 测试报告 {#python-test-reports}
- 测试结果：`ambari-server/target/python-test-results/`
- 覆盖率报告：`ambari-server/target/python-coverage/`

:::tip
调试测试失败时，请检查这些报告目录，以获取详细的测试执行日志和堆栈跟踪。
:::
