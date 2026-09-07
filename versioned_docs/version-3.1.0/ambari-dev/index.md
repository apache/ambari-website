---
title: Ambari Development
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

# Ambari Development {#ambari-development}

This section is the entry point for building and testing Apache Ambari 3.1. Start with [Building from Source](./building-from-source.md) to prepare the Java, Maven, Python, and React toolchains. Use [Running Tests](./running-tests.md) for Maven reactor commands and [Unit Test Reports](./unit-test-reports.md) to locate generated results.

## Source And Modules {#source-and-modules}

The repository root is the Maven reactor. Server, Agent, shared libraries, Views, and the `ambari-web` and `ambari-admin` React packages are separate modules. Prefer `-pl` with `-am` so Maven selects the requested module and builds its reactor dependencies.

## Toolchain {#toolchain}

Ambari 3.1 builds with JDK 17 and Maven 3.9.x. The packaged Agent and Server Python runtime targets CPython 3.9 (`cp39`) on Linux x86_64; this package target is distinct from the Python interpreter used to run build helpers. The React applications use the Node/npm versions configured by the repository toolchain and require Node 22 for the current frontend scripts.

## Build Boundaries {#build-boundaries}

The normal Maven build includes Java and Python packaging and can invoke the `ambari-web/latest` React build. A focused Java build can skip Python or UI work with the supported properties documented in the build guide. Do not treat a skipped profile as evidence that the skipped product area passed.

## Test Boundaries {#test-boundaries}

Maven Surefire/Failsafe, Python runner output, and React tests validate Ambari product code. Website Markdown/i18n and browser checks validate this documentation site and are separate from Ambari Server/Agent acceptance. A green website check does not prove a real cluster workflow.

## Development Workflow {#development-workflow}

1. Check out the source and inspect the affected module.
2. Run `mvn -version`, confirm JDK 17/Maven 3.9.x, and confirm the required CPython/Node toolchains.
3. Build or test the smallest reactor slice with `-pl` and `-am`.
4. Review reports, generated artifacts, and skipped-test properties.
5. Validate deployment behavior on a representative Ambari Server/Agent and Stack when changing runtime workflows.
