---
title: Stack and Services FAQ
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

# Stack and Services FAQ {#stack-and-services-faq}

## How does inheritance work? {#how-does-inheritance-work}

A child Stack may inherit service definitions, scripts, configuration, and properties from a parent Stack. Ambari loads the inherited content first and then applies explicit child overrides to form the final service model used by deployment plans. Override parent content only when platform, component-version, or compatibility requirements actually differ; keep common behavior in the parent so copied definitions do not drift across versions.

## Which version is selected? {#which-version-is-selected}

Stack selection identifies available service definitions, component versions, and compatible configuration. It is independent of selecting Ambari Server and Agent RPM versions, and a service-version change does not install or upgrade Ambari Metrics RPMs. A deployment or upgrade plan should record the Ambari, Stack, service, Metrics package, and monitoring-backend versions separately and validate that the candidate supports the combination.

## What should a new Stack document? {#what-should-a-new-stack-document}

At minimum, document services and components, cardinality, dependencies, configuration types and defaults, packages, lifecycle commands, custom actions, alerts, quick links, telemetry integration, and supported platforms. Keep public identifiers stable. For changes that can affect existing clusters, also document configuration migration, version selection, failure recovery, and rollback behavior.

## How should changes be tested? {#how-should-changes-be-tested}

Test inheritance resolution, service-version selection, initial installation, start, stop, restart, upgrade, repeated execution, partial host failure, and recovery. In addition to loading the Stack metadata, inspect generated host-component assignments, packages, configuration, command arguments, request state, and service-check results. Preserve evidence for every platform claimed as supported.
