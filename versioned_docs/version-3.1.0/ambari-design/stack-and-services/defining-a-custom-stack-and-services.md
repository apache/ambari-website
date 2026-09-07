---
title: Defining a Custom Stack and Services
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

# Defining a Custom Stack and Services {#defining-a-custom-stack-and-services}

A stack is assembled from a version directory containing `metainfo.xml`, services, configuration, repositories, and optional upgrade metadata. Start with a unique stack name and version, then add only the files required by the stack. The current BIGTOP layout is under `ambari-server/src/main/resources/stacks/BIGTOP/3.2.0`.

## Stack Assembly {#stack-assembly}

Define the stack descriptor and its active version. Add service descriptors under `services/<SERVICE>`, package scripts under the service package directory, and configuration XML under the service configuration directory. A stack may reference common service definitions where the loader supports that relationship; verify the assembled result rather than relying on directory names alone.

## Inheritance and Providers {#inheritance-and-providers}

Stack inheritance supplies supported parent files and services. Service advisors can validate component placement and recommend configuration. The BIGTOP stack includes a VictoriaMetrics service and telemetry profiles; provider-specific `telemetry.json` is separate from each service's retained control-plane `metrics.json`.

## Validation {#validation}

Validate descriptor identity, component categories and cardinality, command scripts, package paths, configuration dependencies, repository metadata, and service checks. Exercise install, configure, start, stop, status, custom commands, and upgrade paths on the target operating system and architecture. Do not infer production support for an architecture solely from an available build profile.

## References {#references}

Use the [BIGTOP stack descriptor](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/metainfo.xml), [HDFS service](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml), and [VictoriaMetrics service](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS/metainfo.xml) as current source references.
