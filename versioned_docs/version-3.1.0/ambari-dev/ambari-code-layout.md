---
title: Ambari Code Layout
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

# Ambari Code Layout {#ambari-code-layout}

Ambari is a Maven multi-module project. The repository separates the server, agent, shared libraries, Web applications, Views, and contribution modules so each build and ownership boundary remains explicit.

![Apache Ambari 3.1 repository modules and ownership boundaries](/img/3.1.0/handdrawn/module-map-en.webp)

*The map groups modules by responsibility; arrows show runtime collaboration or packaging relationships rather than Maven's complete dependency graph.*

## Top-Level Modules {#top-level-modules}

```text
ambari/
  ambari-agent/
  ambari-common/
  ambari-project/
  ambari-server/
  ambari-server-spi/
  ambari-utility/
  ambari-views/
  ambari-web/
  ambari-admin/
  contrib/
  docs/
```

| Module | Purpose |
| --- | --- |
| `ambari-server` | Server APIs, orchestration, persistence, stack processing, and Python server utilities. |
| `ambari-agent` | Agent runtime, command execution, registration, caches, security, and Python packaging. |
| `ambari-common`, `ambari-server-spi`, `ambari-utility` | Shared APIs and implementation utilities. |
| `ambari-web` | Primary Ambari Web application. `latest` contains the React/TypeScript/Vite UI; `classic` is the historical bundle. |
| `ambari-admin` | Separate Ambari Admin Web application, with its React build under `src/main/resources/ui/ambari-admin`. |
| `ambari-views` | View framework interfaces, server integration, examples, and package contracts. |
| `contrib` | Optional integrations and maintained third-party contributions. |
| `docs` | Project, architecture, API, and release documentation. |

## Java Build {#java-build}

The root Maven build targets JDK 17. `ambari-project/pom.xml` centralizes managed dependency versions, plugin versions, test settings, and supported module properties. Module POMs inherit those choices; do not introduce an unmanaged version when an existing property or dependency-management entry applies.

The server and shared Java modules use standard Maven source and test layouts. Server REST resources, state, controllers, DAOs, entities, upgrade catalogs, and tests are under `ambari-server/src/main` and `ambari-server/src/test`.

## Agent And Python {#agent-and-python}

Agent Python sources and tests live under `ambari-agent/src/main/python` and `ambari-agent/src/test/python`. The agent `pyproject.toml`, lock files, and Maven packaging define the supported interpreter, dependencies, wheels, and artifact boundary. Server-side Python utilities follow the corresponding module packaging and test configuration.

## React Applications {#react-applications}

The primary UI is under `ambari-web/latest/src`, with route objects in `src/router`, API clients in `src/api`, shared state in `src/store`, and user workflows under `src/screens`. Its `package.json` uses Vite, TypeScript, React 19, and Vitest. The separate Admin React application is built and packaged by `ambari-admin`; it is not a second root inside `ambari-web/latest`.

Views remain server-hosted extensions. The React shell discovers authorized View instances and opens their server-provided same-origin contexts; View application code belongs in the View package, not in the primary UI module.
