---
title: 3.1.0 Source Baseline
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

# Source Baseline {#source-baseline}

| Reference | Revision or version |
| --- | --- |
| Previous release source tag | `release-3.0.0`, `3acb048b3f6e209d6d1e5ac54efcbd30f1b25c57` |
| Community trunk reviewed on 2026-09-07 | `94c6389a96b38bccef0b6a08269481a086b63ca1` |
| Monitoring target baseline, PR #4182 | `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4` |
| Maven development version in the reviewed trunk | `3.1.0.0-SNAPSHOT` |

For this documentation, PR #4182 is included in the intended 3.1.0 feature baseline. A release candidate must contain the selected community changes and monitoring implementation together; a reference SHA in this table is not an instruction to replace newer community work with an older feature branch.

The website release label is 3.1.0. The four-part Maven/package development version does not identify an intervening public 3.0.x release.

## How Changes Were Selected {#change-selection}

The review uses source ancestry, not only commit dates. A feature branch can contain older-dated commits that first become part of the mainline after 3.0.0. The reviewed trunk has 181 commits reachable after the previous release tag; the [release notes](./release-notes.md) group their user-visible impact rather than listing every test or merge separately.

Maintainers can reproduce the comparison against the pinned reviewed revision:

```shell
git log --first-parent --date=short --format='%h %ad %s' \
  release-3.0.0..94c6389a96b38bccef0b6a08269481a086b63ca1
git diff --stat release-3.0.0..94c6389a96b38bccef0b6a08269481a086b63ca1
```

## Primary Evidence {#primary-evidence}

| Topic | Source |
| --- | --- |
| Monitoring control/data planes and replacement boundary | [Telemetry architecture](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/ambari-agent-prometheus-telemetry-architecture.md) |
| VictoriaMetrics deployment topology and configuration | [Managed Stack service](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS) |
| New monitoring database model | [UpgradeCatalog310](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/upgrade/UpgradeCatalog310.java) |
| Managed Java dependencies | [Project POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-project/pom.xml), [build policy](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/docs/java-dependency-management.md) |
| Python runtime and distribution contract | [Agent metadata](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/src/main/python/pyproject.toml), [Agent packaging](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/pom.xml), [effective implementation audit](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/docs/ambari-agent-python-modernization-audit.zh-CN.md) |
| React routing and permissions | [Routes](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-web/latest/src/router/RoutesList.tsx), [primary UI selection](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-web/public/index.html) |
| Selected monitoring runtime captures | [Three-node evidence](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/frontend-refactor/runtime-evidence/AMBARI-26638) |

## Evidence Boundaries {#evidence-boundaries}

The monitoring evidence includes a three-node Rocky Linux 8 ARM64 deployment with VictoriaMetrics Server, VMAGENT, VMAUTH, and selected service/host dashboards. It does not certify every distributed topology or every failure mode.

The Python modernization record includes Linux x86_64 RPM and deployment validation, plus separate staged-artifact checks for other ABI/architecture profiles. Configuration support for another profile is not the same as a published and qualified binary for every distribution.

The React parity baseline distinguishes implementation, static comparison, and runtime validation. Its older review snapshot is not a current test certificate and must not be converted into an unconditional statement that every role, SSO mode, custom Stack, and recovery path has passed. The [React guide](./frontend/react-ui.md) lists the implemented workflow surfaces and acceptance boundaries.

Documentation build and browser checks validate this website's routes, translations, labels, and assets. They do not execute an Ambari cluster upgrade, Maven/RPM production build, or monitoring failure drill.

## Before Publishing A Release {#before-publishing-a-release}

Update this baseline after the release candidate is selected. Record final source tags, signed artifact/checksum locations, package target matrix, supported upgrade paths, test results, and the release vote outcome. Only then replace the preview designation with the released version.
