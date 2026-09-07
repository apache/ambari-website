---
title: Ambari 3.1 Architecture
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

# Ambari 3.1 Architecture {#ambari-31-architecture}

![Ambari Server, Agent, React applications, metadata database, managed services, and monitoring data plane](/img/3.1.0/handdrawn/overall-architecture-en.webp)

| Component | Responsibilities |
| --- | --- |
| Ambari Server | REST APIs, authorization, topology/configuration, operation scheduling, Agent coordination, Stack metadata, and the monitoring query boundary |
| Metadata database | Durable management state, configuration versions, request/task records, user/permission data, and monitoring dashboard/datasource definitions |
| Ambari Agent | Host registration, package/configuration work, service lifecycle scripts, command status, and the Linux/component telemetry exporter |
| React Web and Admin applications | Authorized operator and administrative workflows based on Server state |
| Managed services | Hadoop ecosystem processes defined by the installed Stack |
| VMAGENT and VictoriaMetrics | Independent metric scraping, remote-write buffering, time-series storage, and queries |

## Request And Data Paths {#request-and-data-paths}

The following shows control and request paths; metric responses return to the scraper:

```text
React / Admin UI -> Ambari REST API -> Ambari Server -> Metadata database
                                          |
Stack metadata ---------------------------+
                                          |
                                          +-> Agent commands -> Service scripts
                                          +-> Telemetry assignments -> Agent exporter

VMAGENT -> HTTP service discovery -> Ambari Server
VMAGENT -> Agent exporter -> Linux /proc and service endpoints
VMAGENT -> remote write -> VictoriaMetrics
React -> Ambari query proxy -> VictoriaMetrics
```

Server records operations as requests and tasks. Agent-side scripts perform host work and report status; the UI observes authoritative state through REST and realtime updates. A successful API submission is not a completed operation.

## Request, Task, And Recovery State {#request-task-recovery-state}

![Persisted Ambari requests, stages, host tasks, Agent commands, status reports, reconnect recovery, and supported retry](/img/3.1.0/handdrawn/request-task-recovery-en.webp)

*Refresh and reconnect reload persisted Server state rather than restarting work. A supported retry creates follow-up work from the failed boundary without silently repeating completed tasks.*

## Configuration And Extensions {#configuration-and-extensions}

Stack metadata determines which services, components, configuration properties, dependencies, and commands are valid. Configuration versions and host/group overrides are resolved before Agent work is dispatched. [Blueprints](./blueprints/index.md), [Stack inheritance](./stack-and-services/stack-inheritance.md), and [Themes](./enhanced-configs/index.md) build on these contracts.

Extensions must preserve permissions, state transitions, cancellation, retries, and reload recovery. Adding a React route or button alone does not establish a supported management operation.

## Monitoring Separation {#monitoring-separation}

Telemetry descriptors and JMX profiles are compiled into complete per-host assignments. Agent exporters expose current values; metric samples do not travel inside Agent heartbeats. VMAGENT discovers and scrapes targets, then sends samples to VictoriaMetrics.

The metadata database stores datasource and dashboard definitions, not the historical metric samples. Small direct-JMX values needed for management and health checks remain separate from time-series monitoring. See the [monitoring architecture](../monitoring/architecture.md).

## Security And Recovery {#security-and-recovery}

Ambari API authorization, Agent enrollment/trust, component Kerberos authentication, exporter network access, and datasource credentials are separate boundaries. Configure and verify each one. A monitoring-view permission does not grant service installation or configuration mutation.

Recover failed operations through the Server's request/task state and the workflow's supported retry path. Validate package/database/configuration consistency before rollback, as described in the [upgrade guide](../upgrade-guide.md).

## Source References {#source-references}

See the pinned [Server source](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server), [Agent source](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-agent/src/main/python/ambari_agent), and [React routes](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-web/latest/src/router/RoutesList.tsx).
