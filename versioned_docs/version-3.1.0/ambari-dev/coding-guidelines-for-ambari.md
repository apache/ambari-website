---
title: Coding Guidelines for Ambari
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

# Coding Guidelines for Ambari {#coding-guidelines}

These guidelines describe the current 3.1 development baseline. Keep changes within the owning module, preserve existing contracts, and add focused tests for behavior changes.

## Java and Maven {#java-and-maven}

Use JDK 17 for the Ambari build. Maven dependency and plugin versions are managed centrally in `ambari-project/pom.xml`; use the existing managed version whenever one is available. Java source should follow the surrounding module’s formatting and checkstyle rules, include informative Javadoc for public APIs, and avoid `@author` tags.

Keep imports explicit and ordered as required by the project: `java`, `javax`, `org`, `com`, then other packages. Use `slf4j` as the logging facade and Log4j-compatible levels. Avoid static state and final classes where the project’s mocking tests need to substitute dependencies.

## React and TypeScript {#react-and-typescript}

The primary UI is `ambari-web/latest`, a React 19, TypeScript, and Vite application. Its available scripts are:

```bash
npm run dev
npm run build
npm run lint
npm run test
```

Use the existing `ambariApi`, React Router route objects, authorization hooks, React Bootstrap components, and shared loading/error patterns. Keep API DTOs typed, preserve same-origin base paths, cancel stale asynchronous work, and expose retryable failures. Do not add legacy Brunch, Router 5, React 17, or unreviewed UI frameworks to the current application.

The separate Admin React application is under `ambari-admin/src/main/resources/ui/ambari-admin` and has its own build configuration. View applications remain server-hosted packages and are not copied into the primary React source tree.

## Python and Agent {#python-and-agent}

Agent Python code is packaged from `ambari-agent/src/main/python`. The module `pyproject.toml`, lock files, and packaging metadata define the supported interpreter and dependency set. Prefer official upstream distributions and standard-library APIs; do not add vendored forks or unpinned runtime dependencies without a reviewed compatibility decision.

Python changes must preserve secret handling, deterministic subprocess behavior, supported ABI/architecture selection, and the package boundary. Keep tests under the module’s test tree and run them through the repository’s configured Python test entry points.

## Tests and Reviews {#tests-and-reviews}

Every behavior change should include a focused unit test covering success and failure or recovery. React tests use Vitest and Testing Library; Java tests use the project’s JUnit setup; Python tests use the configured Python test runner. Full Maven verification remains the broad integration check:

```bash
mvn clean test
```

Before review, run the narrowest applicable tests, inspect the diff for unrelated files or generated output, and document skipped or environment-dependent checks. Never include credentials, private keys, cookies, or secrets in source, fixtures, logs, or test output.
