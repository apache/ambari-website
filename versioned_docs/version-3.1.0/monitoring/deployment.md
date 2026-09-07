---
title: Deploying And Operating Monitoring
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

# Deploy And Operate Monitoring {#deploy-and-operate-monitoring}

![Single-node and cluster VictoriaMetrics topologies managed by Ambari](/img/3.1.0/handdrawn/victoriametrics-topology-en.webp)

| Topology | Components | Role |
| --- | --- | --- |
| `deployment_mode=single` | One `VICTORIAMETRICS_SERVER` and at least one `VMAGENT` | One storage process handles writes and queries |
| `deployment_mode=cluster` | `VMSTORAGE`, `VMINSERT`, `VMSELECT`, and `VMAGENT` | Separate storage, write, and read roles |
| Optional `VMAUTH` | In front of the selected write/read topology | A stable gateway with optional configured authentication |

Do not assign both storage modes as though they were independent required masters. The service scripts validate the topology before starting components. Size storage, replication, scrape frequency, and queue capacity for the actual workload; the defaults are not a capacity recommendation.

## Install Through Ambari {#install-through-ambari}

1. Open Add Service, or select VictoriaMetrics during cluster installation.
2. Assign components for the chosen topology. For a small initial deployment, select single mode with VictoriaMetrics Server and VMAGENT; add VMAUTH if a gateway is needed.
3. Review the `victoriametrics`, `victoriametrics-scrape`, `victoriametrics-auth`, and `victoriametrics-env` configuration types.
4. Keep `managed_discovery_identity=true` unless an explicitly managed replacement identity is required. Ambari provisions the cluster-scoped identity and discovery configuration before the first VMAGENT start. Do not substitute an administrator password in a scrape template.
5. Configure discovery protocol, port, and CA to match the deployed Ambari API. Keep `ambari_sd_tls_insecure_skip_verify=false` for verified TLS.
6. Start the storage components, optional gateway, and VMAGENT through the service workflow. Follow the background request to completion and inspect individual task failures before retrying.
7. Confirm the component state, discovered targets, recent samples, and datasource queries independently.

## Key Defaults {#key-defaults}

| Configuration | Default | Meaning |
| --- | --- | --- |
| Agent `[prometheus] enabled` | `true` on Linux | Start the built-in exporter |
| Agent `bind_address` / `port` | `0.0.0.0` / `9101` | Restrict reachability with interface/firewall policy |
| Server `prometheus.agent.metrics.port` | Must match Agent ports | Port advertised by HTTP discovery |
| `scrape_interval` / `scrape_timeout` | `30s` / `10s` | VMAGENT scrape timing |
| `http_sd_refresh_interval` | `30s` | Discovery refresh |
| `retention_period` | `12` | VictoriaMetrics interprets this as months; explicit values such as `30d` are also supported |
| `remote_write_max_disk_usage` | `10GB` | Queue limit per remote-write URL |
| `vmagent_replication_factor` | `1`, at most `2` | Scrape redundancy, separate from storage replication |
| `require_authentication` | `false` | Enable and configure VMAUTH authentication when required |

Agent port changes must be coordinated with Server discovery configuration. Changing a scrape endpoint is different from changing a Stack component's own Web UI port.

## Network Paths {#network-paths}

| Connection | Default destination port |
| --- | --- |
| VMAGENT to Ambari discovery | Ambari API port, `8080` by default; use the configured HTTPS endpoint when enabled |
| VMAGENT to Agent | `9101` |
| Single-node ingestion/query | `8428` |
| VMINSERT / VMSELECT HTTP | `8480` / `8481` |
| VMSTORAGE HTTP / insert / select | `8482` / `8400` / `8401` |
| VMAGENT HTTP / VMAUTH | `8429` / `8427` |

The Agent exporter has no application-level authentication. VMAUTH credentials protect its gateway, not the Agent's port. Restrict both paths independently.

## Verify Each Layer {#verify-each-layer}

On an Agent host, verify exporter health and host metrics:

```shell
curl --fail http://127.0.0.1:9101/-/healthy
curl --fail http://127.0.0.1:9101/metrics
```

From an authorized management environment, verify discovery. Set the URL and cluster for the installation; curl prompts for the user's password rather than placing it in the command:

```shell
export AMBARI_URL=https://ambari.example.com:8443
export AMBARI_USER=metrics-reader
export CLUSTER_NAME=cluster1
curl --fail --user "$AMBARI_USER" "$AMBARI_URL/api/v1/clusters/$CLUSTER_NAME/prometheus_targets"
```

A healthy exporter is not proof that every component scrape works. Use Monitoring > Targets and run `up{cluster="cluster1",ambari_target="host"}` in the [explorer](./queries-and-dashboards.md). Open a discovered component route only after obtaining its actual route ID from discovery.

## Failure And Recovery {#failure-and-recovery}

| Symptom | Check |
| --- | --- |
| No exporter response | Agent log, exporter enablement/bind/port, firewall, and whether the host is Linux |
| Discovery returns 401/403 | Identity credentials, cluster metrics-view authorization, API protocol/port, and CA |
| Host target works but a component target fails | Effective component configuration, upstream endpoint, profile match, keytab/principal, and TLS |
| Targets are up but charts are empty | Datasource URL, cluster selector, time range, remote-write path, storage health, and ingestion delay |
| Queue grows | Remote-write reachability, storage capacity, gateway authentication, and queue disk space |
| An assignment update is rejected | Descriptor/profile validation and Agent logs; the last valid assignment remains active |

Keep the default managed URL derivation unless an override is intentional. An incorrect `remote_write_url` can bypass the expected gateway or select the wrong tenant. After a topology or configuration change, verify discovery, writes, and reads again.

## Implementation References {#implementation-references}

See the pinned [service scripts and templates](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS) and [telemetry architecture](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/ambari-agent-prometheus-telemetry-architecture.md).
