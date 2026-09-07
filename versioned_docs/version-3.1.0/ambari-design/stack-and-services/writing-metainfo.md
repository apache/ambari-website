---
title: Writing metainfo.xml
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

# Writing metainfo.xml {#writing-metainfoxml}

`metainfo.xml` is the declarative service descriptor. Its top-level `service` identifies the service with `name`, `displayName`, and `version`, and describes `components`, `osSpecifics`, `commandScript`, `requiredServices`, `configuration-dependencies`, and an optional `configuration-dir`.

## Components {#components}

Each component has a unique `name`, display name, category (`MASTER`, `SLAVE`, or `CLIENT`), and `cardinality`. It may advertise a version, allow reassignment, declare dependencies, define custom commands, and provide component-specific scripts and logs.

## Commands and Configuration {#commands-and-configuration}

`commandScript` identifies the Python script and timeout used for service or component operations. `configuration-dependencies` lists the configuration types required by the service or component; when a dependency changes, Ambari can mark the affected component for restart. `configFiles` identifies generated XML, environment, or properties files and their dictionary names.

## Packages and Platforms {#packages-and-platforms}

`osSpecifics` maps an operating-system family to the packages needed to deploy a service. Package names are consumed by the platform package manager. A service can also declare required services and dependency conditions, including cluster- or host-scoped dependencies and auto-deploy behavior.

## Lifecycle {#lifecycle}

Scripts implement the component lifecycle. Standard operations include install, start, stop, status, and configure; `customCommands` adds service-specific operations. The `versionAdvertised` flag tells Ambari whether a component participates in version-aware upgrade processing.

## Example {#example}

The descriptor should remain focused on service metadata and executable contracts. Keep provider-specific telemetry in `telemetry.json`; retain `metrics.json` for Ambari control-plane metrics. Refer to the current [BIGTOP HDFS metainfo.xml](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml) for a concrete descriptor.
