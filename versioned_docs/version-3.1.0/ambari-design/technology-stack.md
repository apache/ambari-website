---
title: Technology Stack
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

# Technology Stack {#technology-stack}

| Area | Implementation |
| --- | --- |
| Server build | JDK 17 and Maven 3.9.x, enforced by the root build |
| Server frameworks | Managed Spring/Spring Security, Jetty, Jersey, Jakarta APIs, Guice, and EclipseLink dependencies |
| Agent and Server utilities | Python source minimum 3.9.2 with locked upstream dependencies and package-specific native ABI |
| Main Web UI | React, TypeScript, Vite, and Vitest under the latest frontend module |
| Administration UI | Separate React Admin module packaged with Ambari |
| Management persistence | Configured relational database and JDBC driver |
| Historical monitoring | Prometheus-compatible exporters/VMAGENT and VictoriaMetrics |
| Configuration and extension metadata | Stack/service XML and JSON, Themes, telemetry descriptors, JMX profiles, and View definitions |

The [Java guide](../platform/java-dependencies.md) records effective framework versions and deferred major migrations. The [Python guide](../platform/python-runtime.md) explains why a higher interpreter version does not automatically satisfy a package built for another minor ABI.

## Build Tools Versus Runtime {#build-tools-versus-runtime}

Maven and Node/npm belong in the build environment; they are not general prerequisites on every managed cluster node. Deploy the resulting reviewed packages, not a frontend development server or a mutable system-Python installation.

The default RPM target uses CPython 3.9 wheels. Architecture and alternative ABI profiles select separate artifacts. See [RPM packaging](../platform/rpm-packaging.md) and [building from source](../ambari-dev/building-from-source.md).

## Managed Services {#managed-services}

The reviewed BIGTOP tree contains 3.2.0, 3.3.0, and 3.4.0 definitions with inheritance. Select the Stack and component versions qualified for the candidate. These directory names do not make the Ambari release 3.4.0, and the Ambari JDK does not override every service's JDK.

Stack-provided service metadata remains the authority for packages, configuration, dependencies, and lifecycle commands. Use [Stack definitions](./stack-and-services/index.md) and the [Bigtop build guide](../ambari-dev/bigtop-guide.md) when extending or rebuilding service packages.

## Source References {#source-references}

The [root build](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/pom.xml), [managed dependency versions](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-project/pom.xml), and [BIGTOP metadata](https://github.com/apache/ambari/tree/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/src/main/resources/stacks/BIGTOP) provide the implementation references.
