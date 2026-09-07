---
title: Alerts
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

# Alerts {#alerts}

Ambari alerts evaluate service health using definitions supplied by Stack services and the Ambari alert API. An alert definition identifies a service/component target, an interval, thresholds or a check implementation, and its reporting state.

![Stack and API alert definitions flowing through interval scheduling, checks, state evaluation, history, React display, and optional notification dispatch](/img/3.1.0/handdrawn/alert-lifecycle-en.webp)

*Evaluation records alert state and history on every configured interval. Notification delivery is a separate, optional branch from the evaluated state.*

## Definition Types {#definition-types}

Stack `alerts.json` definitions can use checks appropriate to the service. `WEB` checks an HTTP endpoint, `PORT` checks TCP reachability, `SCRIPT` runs a service health script, and `JMX` evaluates a JMX value when the service exposes one. These are distinct checks and must not be treated as interchangeable Prometheus integrations.

Definitions are grouped and associated with services. Ambari evaluates them on their configured interval and records `OK`, `WARNING`, `CRITICAL`, or `UNKNOWN` states. The alert API exposes definitions, groups, current states, and history through the normal Ambari Server API.

## Configuration And Permissions {#configuration-and-permissions}

Alert definitions may resolve host, port, protocol, and credentials from effective service configuration. Keep secret values in protected Ambari configuration; do not place passwords in a Blueprint or alert example. Users need the relevant cluster and service permissions to read or modify alert definitions and groups.

Notifications are separate from evaluation. Ambari can dispatch alert notifications through its configured notification targets, including email, SNMP, or scripts where enabled. This document does not define a Prometheus Alertmanager integration or an AMS endpoint.

## Use The Alert API {#use-the-alert-api}

1. Inspect service alert definitions and groups in the Ambari API.
2. Confirm the effective configuration used by the check.
3. Run or wait for the configured interval and inspect the resulting state.
4. Correct the endpoint, port, script, JMX attribute, threshold, or service state reported by the alert.
5. Verify notification delivery separately from the alert state.

Current definitions and check implementations are in the pinned [BIGTOP service resources](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP) and [alert dispatchers](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/notifications/dispatchers).
