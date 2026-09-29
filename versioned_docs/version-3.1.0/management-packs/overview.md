---
title: Mpack Store Overview
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

# Mpack Store Overview {#mpack-store-overview}

The mpack store is a separately maintained collection of Ambari service definitions and lifecycle scripts. A distributor can package the selected releases into one `mpackstore.bundle.tar.gz`. An administrator imports that bundle once, then chooses the services to manage through Ambari's normal deployment wizard.

:::info Development snapshot
These guides describe the `AMBARI-26663` development implementation reviewed on 2026-09-29, including Ambari commit `3a71190847` and reference-store commit `c10a271`. They require a build containing that implementation. The 3.1 documentation remains a preview; these snapshots do not establish an ASF release or production support matrix. See the [source baseline](../release-baseline.md#runtime-mpack-follow-up).
:::

## What The Store Contains {#store-contents}

A full store bundle transports individually versioned packages, manifests, service descriptors, configuration definitions, and installation/management scripts. The reference snapshot contains eleven packages: one foundation package and ten selectable services.

Host software comes from the repositories, verified binary archives, Python dependencies, or pinned source builds described by each pack. Importing the store does not fetch all of those runtime artifacts onto every host. Prepare them before installation, especially for a disconnected environment.

| Object | Purpose | Example |
| --- | --- | --- |
| Bundle | Transport several independent packages together | `mpackstore.bundle.tar.gz` |
| Package release | Identify an immutable management definition | `nginx/1.0.1.1` |
| Stack context | Define the environment to which services can be bound | `GENERIC/1.0` or `BIGTOP/3.3.0` |
| Catalog service ID | Select one exact provider/context in a deployment plan | The ID returned by the service catalog |
| Service descriptor version | Supply the version label from service metadata | The version in `metainfo.xml` |
| Software version | Identify the application installed on a host | Trino `483` |
| Operation | Track a durable package change and its recovery | An operation ID and authoritative phase |

The version beside a service name comes from descriptor metadata; it must not replace an observed installed-software version. For example, a Kyuubi descriptor can say `1.0` while the reference runtime is `1.9.4`. The package version in the selector identifies the management definition. Updating scripts in a package does not by itself upgrade the application binary or its database schema.

## The End-to-End Flow {#end-to-end-flow}

| Stage | Result to verify |
| --- | --- |
| Obtain and inspect | The bundle matches the expected publisher, versions, and digest |
| Upload and import | Package releases appear in the catalog; host software has not been deployed |
| Select services and destination | One provider per chosen service, with a compatible environment |
| Enable definitions | The package operation reaches a verified successful state |
| Deploy through the wizard | Host assignments and configuration produce successful installation/start tasks |
| Run service checks | The service responds correctly; the check's result belongs to the actual request |
| Operate | Edit configurations, inspect alerts, and use declared lifecycle commands |

Importing a multi-service bundle does not select every service. The Server resolves required package dependencies and bindings for the chosen services; deployment prerequisites still need operator input.

For a new cluster, the handoff opens cluster creation. For a compatible existing cluster, it opens Add Services with the selected services. A successful definition operation is not proof that the subsequent installation has completed.

## Administration And Scope {#administration-and-scope}

The Management Packs entry is an Ambari administrator function. The runtime endpoints require authenticated administrator access and `AMBARI.MANAGE_STACK_VERSIONS`. Service deployment and later lifecycle actions also retain their normal permissions and validation.

The store is global to an Ambari Server. Definition bindings are shared by exact Stack name and version, rather than providing independent definition versions for each cluster. A definition update may therefore affect several clusters using the same context. Review the plan's affected clusters and maintenance requirements.

Package operations reserve their affected definition scope. Ordinary writes and tasks unrelated to that scope can continue. This does not permit a conflicting service, configuration, or topology change while its definitions are being replaced. See [operation recovery](./operations-and-recovery.md).

## Choosing A Reading Path {#reading-paths}

- Operators: start with the [store walkthrough](./store-guide.md), then inspect [service prerequisites](./service-catalog.md).
- Administrators changing configurations: use the [content configuration guide](./content-configuration.md).
- Pack maintainers: use [authoring and bundling](./authoring-and-bundling.md).
- Operators handling failed or interrupted work: use [operations and recovery](./operations-and-recovery.md).
- Web users: read [workspace navigation and appearance](../frontend/workspace-and-appearance.md) and [monitoring interactions](../monitoring/queries-and-dashboards.md#workspace-interactions).

## Current Boundaries {#current-boundaries}

The reference acceptance environment is Rocky Linux 8 on aarch64 with systemd. Individual services have different Java, Python, database, repository, and network requirements. Existing definitions for another platform do not establish tested deployment support there.

The first service packs focus on basic installation, configuration, start/stop, and service checks. HA, automatic failover, topology expansion, software upgrades, schema migrations, and production security vary by service and must not be assumed. Installing a service also does not automatically add its exporter or dashboards.

The runtime store workflow and the legacy `ambari-server install-mpack` mechanism have different manifests and activation behavior. Use the [management-pack compatibility entry](../ambari-design/stack-and-services/management-packs.md) before mixing older instructions with this preview.
