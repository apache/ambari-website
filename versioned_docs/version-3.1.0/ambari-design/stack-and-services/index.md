---
title: Stacks and Services
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

# Stacks and Services {#stacks-and-services}

Ambari manages a stack as a versioned collection of services. A stack version selects service definitions, packages, configuration, lifecycle scripts, and upgrade metadata. A service is composed of components such as MASTER, SLAVE, and CLIENT, each with lifecycle commands and placement rules.

The current BIGTOP stack demonstrates the model: stack services can inherit shared definitions from `common-services`, while stack-specific metadata overrides the inherited definition. The stack and service descriptors are `metainfo.xml` files; their fields define identity, components, commands, configuration dependencies, packages, and supported operating systems.

Metrics are split by purpose. A service `metrics.json` describes the control-plane metrics that Ambari collects for that service. The current BIGTOP monitoring design separately uses `telemetry.json` for telemetry-provider configuration; it does not replace Ambari's retained control-plane `metrics.json` contract. VictoriaMetrics is packaged as the current metrics provider; this page does not describe the retired AMS/Ganglia or Ember workflows.

See [Stack and Service Overview](./overview.mdx), [Writing metainfo.xml](./writing-metainfo.md), and the [upgrade guide](../../upgrade-guide.md).
