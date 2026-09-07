---
title: Blueprints
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

# Blueprints {#blueprints}

## Overview {#blueprint-overview}

Blueprints are declarative cluster definitions. They describe the Stack, host groups, components, and configuration that Ambari uses to create a cluster through its REST API. They do not require the interactive cluster-install wizard.

![Blueprint registration, cluster template host mapping, configuration precedence, and asynchronous cluster creation](/img/3.1.0/handdrawn/blueprint-provisioning-en.webp)

*The Blueprint defines reusable topology; the cluster template binds that topology to registered hosts and starts an asynchronous Ambari request.*

The 3.1 implementation compiles Stack `telemetry.json` and other service metadata before assigning components. Current Stack examples are under the BIGTOP 3.2.0, 3.3.0, and 3.4.0 resources; do not assume HDP 2.x examples or a published 3.1 Stack.

## Create And Register A Blueprint {#create-and-register-a-blueprint}

1. Prepare Ambari Server and register every Agent host. Confirm the hosts are visible through the Ambari API.
2. Create a JSON document with `Blueprints` and `host_groups`. `Blueprints.stack_name` and `Blueprints.stack_version` select an installed Stack; each host group names its components.
3. Register it with `POST /api/v1/blueprints/:blueprintName`. The request body is the Blueprint document. Topology validation is enabled by default; `validate_topology=false` is an explicit escape hatch for validation failures and should be used only when the topology is understood.
4. Create a cluster template with `blueprint`, `host_groups`, optional `configurations`, and optional `credentials`/`security`. Map physical FQDNs, or use `host_count` and `host_predicate` to select eligible hosts.
5. Create the cluster with `POST /api/v1/clusters/:clusterName`. The asynchronous response supplies a `/requests` URL for progress.

The cluster template may include `config_recommendation_strategy`: `NEVER_APPLY`, `ONLY_STACK_DEFAULTS_APPLY`, `ALWAYS_APPLY`, or `ALWAYS_APPLY_DONT_OVERRIDE_CUSTOM_VALUES`. Recommendations are produced by Stack Advisor and can override custom values according to the selected strategy.

## Host Groups And Configuration {#host-groups-and-configuration}

`host_groups` are the unit for component placement. A host group requires `name` and `components`; the template maps it to `hosts` with `fqdn`, or to `host_count` plus an optional `host_predicate`. The predicate uses the standard Ambari host query syntax, such as `Hosts/cpu_count=4`.

Configuration precedence is Stack defaults, Blueprint cluster scope, Blueprint host-group scope, template cluster scope, then template host-group scope. Required properties without defaults must be supplied before the relevant operation; a missing required property produces a client error identifying the property.

For monitoring-enabled services, keep the Stack descriptors and effective component configuration consistent. Component telemetry endpoints, ports, protocol policy, and authentication are resolved by Server from the installed Stack rather than accepted as arbitrary request URLs. See [monitoring deployment](../../monitoring/deployment.md) for the VictoriaMetrics service workflow.

## API And Source References {#api-and-source-references}

Blueprint creation uses the Ambari REST resources above. The current Stack and blueprint resources are in the pinned [BIGTOP Stack source](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP). Assignment compilation is implemented by [TelemetryAssignmentCompiler](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/agent/stomp/TelemetryAssignmentCompiler.java).
