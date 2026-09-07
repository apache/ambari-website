---
title: Java 依赖
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

# Java 依赖 {#java-dependencies}

Ambari 3.1.0 使用 **JDK 17** 和 **Maven 3.9.x** 构建。根 Maven 编译器发布版本为 17；Enforcer 策略接受 `[17,18)` 范围内的 Java 功能版本和 `[3.9.0,4.0.0)` 范围内的 Maven 版本。构建会拒绝不支持的 Java 发布版本、旧版 Maven，以及 Java 17 基线移除的依赖声明。

## 托管版本 {#managed-versions}

共享框架版本在 `ambari-project/pom.xml` 中管理，通常通过 BOM 管理。有效基线包括 Jetty `11.0.26`、SLF4J `2.0.18`、Logback `1.5.38`、Guice `7.0.0`、Spring `6.2.19`、Spring Security `6.5.11`、Jersey `3.1.12`、Jackson `2.18.2`、JUnit Jupiter `5.14.4`、Commons Lang `3.20.0`、Jakarta WebSocket `2.1.1`、Jakarta JAXB `4.0.5`、PostgreSQL `42.7.13`、EclipseLink `4.0.2` 和 Testcontainers `1.21.4`。

Java 基线由 [AMBARI-26642](https://github.com/apache/ambari/commit/39112e4aea602b46aad41e6c92271194c60a637d) 实现。Jakarta Servlet 6 用于 Spring 6.2 的编译和测试兼容性；Jetty 11 仍是 Servlet 5 运行时。新代码使用 Jakarta JAXB、Jakarta Mail、Commons Lang 3 和维护中的 `com.github.mwiede:jsch` fork。

## JDK 选择 {#jdk-selection}

Ambari 与堆栈服务可以使用不同的 JDK。[AMBARI-26641](https://github.com/apache/ambari/commit/821de739a11b34b06a45fab6dc8aaa6f703783e8) 为 Ambari Server/Agent helper 添加 `--ambari-java-home`，并为堆栈服务添加 `--stack-java-home`，保持两者的 Java 选择独立。Ambari helper 要求 JDK 17 或更高版本；堆栈服务使用独立选择的堆栈 JDK。旧版 `--java-home` 仍作为已弃用别名保留。

## 验证 {#verification}

在 JDK 17/Maven 3.9.x 环境中运行验证：

```shell
mvn -version
mvn -DskipTests -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true validate
mvn -am test -pl ambari-server,ambari-funtest -DskipPythonTests -DskipFunctionalTests=false -Drat.skip -DskipAdminWebTests=true -DskipUiBuild=true
mvn -B -Psbom -DskipTests -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip org.cyclonedx:cyclonedx-maven-plugin:2.9.1:makeAggregateBom
```

修改日志、Servlet、持久化、安全、数据库或序列化依赖后，应检查 `ambari-server` 运行时依赖树。有关迁移约束，请参阅[升级指南](../upgrade-guide.md)。

## 延后迁移 {#deferred-migrations}

该基线不会完成以下迁移：将 Swagger 1 注解和自定义读取器迁移到 OpenAPI 3 Jakarta 扫描器；将 PowerMock 测试迁移到可注入协作者或受作用域控制的 Mockito 模拟；将 Apache HttpClient 4 调用方迁移到 HttpClient 5；以及将 H2 1.4 测试基础设施迁移到 H2 2.x。在专门的源代码和契约变更落地前，这些兼容性依赖仍由项目管理。
