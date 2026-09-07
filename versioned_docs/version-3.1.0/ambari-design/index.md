---
title: Ambari Design
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

# Ambari Design {#ambari-design}

Ambari 3.1 retains cluster provisioning and management while replacing its monitoring backend and primary Web UI. This section describes the current management contracts, not an archived installation recipe.

## System Boundaries {#system-boundaries}

Start with the [overall architecture](./ambari-architecture.md) and [technology stack](./technology-stack.md). Ambari Server owns topology, authorization, desired configuration, and operation records. Agents execute host-level work. React presents the management workflows. Monitoring has a separate scrape/storage/query data plane.

## Provisioning And Security {#provisioning-and-security}

[Blueprints](./blueprints/index.md) describe logical host groups and configuration for repeatable cluster deployment. The template maps those groups to real hosts; inspect asynchronous request state rather than assuming that successful submission means installation has finished.

[Kerberos](./kerberos/index.md) adds identity, keytab, and service-configuration management. Its descriptors and KDC settings remain management contracts even when time-series monitoring no longer uses AMS.

## Stack And Service Contracts {#stack-and-service-contracts}

[Stack definitions](./stack-and-services/index.md) declare supported services, components, packages, commands, configuration, dependencies, and upgrade behavior. Inheritance and common-service reuse avoid duplicating complete service definitions.

[Enhanced Configs](./enhanced-configs/index.md) use service Themes for configuration forms. These form controls are not the removed monitoring widgets. [Quick links](./quick-links.md) resolve service endpoints from installed topology and configuration.

## Operational Feedback And Extensions {#operational-feedback-and-extensions}

[Alerts](./alerts.md) are Ambari health checks and notifications. Do not assume that installing VictoriaMetrics also installs Prometheus Alertmanager.

[Views](./views/index.md) extend Ambari through server-managed view definitions, instances, permissions, and embedded applications. See the [extension overview](../ambari-plugin-contribution/index.md) before choosing an integration boundary.

For historical time-series data, dashboards, and PromQL, use the dedicated [monitoring architecture](../monitoring/architecture.md) and [service telemetry guide](../monitoring/service-integration.md).

