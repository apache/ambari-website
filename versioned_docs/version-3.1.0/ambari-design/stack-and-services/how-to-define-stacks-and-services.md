---
title: How to Define Stacks and Services
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

# How to Define Stacks and Services {#how-to-define-stacks-and-services}

## Service Definition {#service-definition}

Define a service in `metainfo.xml`. Give it a unique name and version, list its components, and provide Python 3 lifecycle scripts. Components use categories such as `MASTER`, `SLAVE`, and `CLIENT`; `cardinality` expresses the allowed placement count.

Declare `commandScript`, `customCommands`, `requiredServices`, `configuration-dependencies`, `osSpecifics`, and generated `configFiles` as needed. Configuration dependencies tell Ambari which configuration types a component requires and which changes can require a restart. Package scripts and templates must render the files consumed by the service.

Services may define `alerts.json`, `quicklinks/quicklinks.json`, `themes`, and a service advisor. The service `metrics.json` describes metrics retained by Ambari's control plane. Current BIGTOP services additionally use `telemetry.json` and telemetry profiles for the Prometheus/VictoriaMetrics monitoring path; these are separate contracts.

## Stack Definition {#stack-definition}

Define a stack version with its descriptor, services, repositories, configuration, and supported upgrade metadata. Verify inheritance and the fully assembled service definitions. Current examples are [BIGTOP HDFS](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml) and [BIGTOP VictoriaMetrics](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS/metainfo.xml).

## Validation {#validation}

Run descriptor validation, package and configuration rendering, service checks, custom actions, advisor validation, and upgrade tests on the target stack. Check that every referenced script, package, configuration type, repository, and telemetry profile exists. Keep the target operating system and architecture explicit; a source profile alone is not a production certification.
