---
title: Java Dependencies
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

# Java Dependencies {#java-dependencies}

Ambari 3.1.0 builds with **JDK 17** and **Maven 3.9.x**. The root Maven compiler release is 17; the Enforcer policy accepts Java feature releases in `[17,18)` and Maven versions in `[3.9.0,4.0.0)`. The build rejects unsupported Java releases, old Maven versions, and dependency declarations removed by the Java 17 baseline.

## Managed Versions {#managed-versions}

Shared framework versions are managed in `ambari-project/pom.xml`, normally through BOMs. The effective baseline includes Jetty `11.0.26`, SLF4J `2.0.18`, Logback `1.5.38`, Guice `7.0.0`, Spring `6.2.19`, Spring Security `6.5.11`, Jersey `3.1.12`, Jackson `2.18.2`, JUnit Jupiter `5.14.4`, Commons Lang `3.20.0`, Jakarta WebSocket `2.1.1`, Jakarta JAXB `4.0.5`, PostgreSQL `42.7.13`, EclipseLink `4.0.2`, and Testcontainers `1.21.4`.

The Java baseline is implemented by [AMBARI-26642](https://github.com/apache/ambari/commit/39112e4aea602b46aad41e6c92271194c60a637d). Jakarta Servlet 6 is used for Spring 6.2 compile/test compatibility; Jetty 11 remains the Servlet 5 runtime. New code uses Jakarta JAXB and Jakarta Mail, Commons Lang 3, and the maintained `com.github.mwiede:jsch` fork.

## JDK Selection {#jdk-selection}

Ambari and stack services can use different JDKs. [AMBARI-26641](https://github.com/apache/ambari/commit/821de739a11b34b06a45fab6dc8aaa6f703783e8) adds `--ambari-java-home` for Ambari Server/Agent helpers and `--stack-java-home` for stack services. Ambari helpers require JDK 17 or later; stack services use the independently selected stack JDK. Legacy `--java-home` remains a deprecated alias.

## Verification {#verification}

Run verification in a JDK 17/Maven 3.9.x environment:

```shell
mvn -version
mvn -DskipTests -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true validate
mvn -am test -pl ambari-server,ambari-funtest -DskipPythonTests -DskipFunctionalTests=false -Drat.skip -DskipAdminWebTests=true -DskipUiBuild=true
mvn -B -Psbom -DskipTests -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip org.cyclonedx:cyclonedx-maven-plugin:2.9.1:makeAggregateBom
```

Review the `ambari-server` runtime dependency tree after logging, Servlet, persistence, security, database, or serialization changes. See the [upgrade guide](../upgrade-guide.md) for migration constraints.

## Deferred Migrations {#deferred-migrations}

The baseline does not complete these migrations: Swagger 1 annotations and the custom reader to an OpenAPI 3 Jakarta scanner; PowerMock tests to injectable collaborators or scoped Mockito mocks; Apache HttpClient 4 callers to HttpClient 5; and H2 1.4 test infrastructure to H2 2.x. Their compatibility dependencies remain managed until dedicated source and contract changes land.
