---
title: Custom Services
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

# Custom Services {#custom-services}

A custom service is a service definition that adds components and lifecycle behavior to a stack. Place the service under the stack `services` directory, or provide a common definition that a stack service references. Current BIGTOP examples are under `ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services`.

## Lifecycle and Packages {#lifecycle-and-packages}

The service `metainfo.xml` names components, categories, cardinality, scripts, dependencies, packages, and configuration files. Python scripts implement install, configure, start, stop, and status; custom commands add service-specific operations. Package scripts and templates are kept with the service and run through Ambari's Python 3 runtime.

## Configuration and Actions {#configuration-and-actions}

Use `configuration-dependencies` to declare the configuration types required by a service or component. Use `quicklinks/quicklinks.json` for service links and `themes` for supported service presentation metadata. A service advisor can validate placement and recommend configuration. `telemetry.json` describes telemetry-provider inputs; `metrics.json` remains the Ambari control-plane service metrics contract.

## Inheritance {#inheritance}

Use the existing stack/service inheritance model and verify the resulting descriptor. Do not assume that a copied service definition inherits files unless its parent relationship is explicitly supported by the stack loader. Validate the assembled service, package paths, commands, and configuration dependencies before deployment.

## Verification {#verification}

Test the complete lifecycle, service checks, configuration rendering, custom actions, and upgrade behavior on the target stack. The [BIGTOP HDFS definition](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml) is a concrete current reference.
