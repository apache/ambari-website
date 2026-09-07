---
title: Apache Ambari 3.1.0
slug: /
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

# Apache Ambari 3.1.0 Overview {#ambari-310-overview}

| Area | Change in 3.1.0 | Guide |
| --- | --- | --- |
| Monitoring | Replace AMS with Prometheus-compatible collection, VMAGENT, VictoriaMetrics, and native React monitoring | [Architecture comparison](./monitoring/architecture-comparison.md) |
| User interface | Make React the primary experience for the operational and administrative workflows carried forward from Ember | [React user interface](./frontend/react-ui.md) |
| Java | Consolidate the JDK 17/Maven 3.9 baseline, managed framework dependencies, and separate Ambari/Stack JDK selection | [Java dependencies](./platform/java-dependencies.md) |
| Python | Replace maintained-in-tree third-party forks with locked upstream distributions and standard-library APIs | [Python runtime](./platform/python-runtime.md) |
| Distribution | Make Python ABI, target architecture, dependency provenance, and RPM contents explicit | [RPM packaging](./platform/rpm-packaging.md) |

The new monitoring system is not an AMS configuration toggle. Metrics names, dashboard storage, service descriptors, and the storage deployment change. Plan the transition before replacing an existing installation.

## Reading Paths {#reading-paths}

- Operators deploying monitoring: read [deployment](./monitoring/deployment.md), then [queries and dashboards](./monitoring/queries-and-dashboards.md).
- Existing 3.0.0 installations: start with the [upgrade checklist](./upgrade-guide.md) and [monitoring migration](./monitoring/migration.md).
- Stack maintainers: read the [architecture](./monitoring/architecture.md) and [service telemetry contract](./monitoring/service-integration.md).
- Package builders: review the [Java](./platform/java-dependencies.md), [Python](./platform/python-runtime.md), and [RPM](./platform/rpm-packaging.md) contracts together.

## Illustrated Guides {#illustrated-guides}

| Diagram | Guide |
| --- | --- |
| Overall Ambari architecture | [Ambari architecture](./ambari-design/ambari-architecture.md) |
| React request lifecycle | [React user interface](./frontend/react-ui.md) |
| Repository module map | [Ambari code layout](./ambari-dev/ambari-code-layout.md) |
| Stack and service anatomy | [Stacks and services](./ambari-design/stack-and-services/overview.mdx) |
| Blueprint provisioning | [Blueprints](./ambari-design/blueprints/index.md) |
| Kerberos enablement | [Kerberos](./ambari-design/kerberos/index.md) |
| Build pipeline | [Building from source](./ambari-dev/building-from-source.md) |
| Installation and Agent enrollment | [Installation guide](./quick-start/installation-guide.md) |
| Monitoring architecture | [Monitoring architecture](./monitoring/architecture.md) |
| VictoriaMetrics topology | [Monitoring deployment](./monitoring/deployment.md) |
| Service telemetry integration | [Service integration](./monitoring/service-integration.md) |
| AMS migration | [Monitoring migration](./monitoring/migration.md) |
| Dashboard query path | [Queries and dashboards](./monitoring/queries-and-dashboards.md) |
| Alert evaluation and notification | [Alerts](./ambari-design/alerts.md) |
| Configuration resolution | [Enhanced configs](./ambari-design/enhanced-configs/index.md) |
| Request, task, and recovery state | [Ambari architecture](./ambari-design/ambari-architecture.md) |

## Version Boundaries {#version-boundaries}

These pages describe Ambari 3.1.0, not a new 3.0.x maintenance release. The existing 3.0.0 documentation remains the historical reference for AMS and the older packaging instructions.

Ambari's release number, the BIGTOP Stack version, and the VictoriaMetrics software version are independent. A Stack descriptor located under BIGTOP 3.2.0 may be inherited by another Stack version; its directory name is not an Ambari release requirement. Use the Stack metadata in the package being deployed.

The default website documentation entry remains the released 3.0.0 version while 3.1.0 is in preview. See [release notes](./release-notes.md) for the change summary and the [source baseline](./release-baseline.md) for the reviewed revisions.
