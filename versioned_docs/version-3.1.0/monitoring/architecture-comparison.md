---
title: Monitoring Architecture Comparison
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

# Monitoring Architecture Comparison {#monitoring-architecture-comparison}

| Area | Previous architecture | 3.1.0 architecture |
| --- | --- | --- |
| Collection | AMS Monitor and service-specific sinks | Agent exporters, typed component routes, and VMAGENT scrapes |
| Storage | AMS Collector and HBase-backed time-series storage | VictoriaMetrics single-node or distributed storage |
| Target configuration | Legacy monitoring service configuration | Server-compiled assignments and HTTP service discovery |
| Queries | AMS-specific metric/property interfaces | Prometheus-compatible query APIs through Ambari |
| Dashboard model | Monitoring widgets and widget layouts | Native React dashboards, panels, and datasources |
| Custom service integration | Legacy temporal metric definitions | Telemetry descriptors and version-specific JMX profiles |
| Management signals | Direct JMX values mixed with historical monitoring definitions | A small direct-JMX set retained separately for management operations such as HA state checks |

## Prometheus-Compatible Model {#prometheus-compatible-model}

The new path has four responsibilities:

| Layer | Responsibility |
| --- | --- |
| Ambari Agent | Exposes Linux host metrics at `/metrics` and assigned component routes at `/metrics/components/{routeId}`. |
| Ambari Server and Stack | Resolve topology, endpoint URLs, ports, protocols, authentication, and typed JMX profiles; publish complete Agent assignments. |
| VMAGENT | Discovers targets from Ambari HTTP service discovery, scrapes them, applies relabeling, and remote-writes samples. |
| VictoriaMetrics | Stores and serves Prometheus-compatible time-series data in single-node or clustered topologies. |

The managed stack does not require a separate Prometheus server or use its local time-series database. VMAGENT is the collector and VictoriaMetrics is the storage/query backend.

## Supported Scope {#supported-scope}

The initial Stack contract covers HDFS NameNode and DataNode native `/prom`, YARN ResourceManager native `/prom`, and typed JMX conversion for YARN NodeManager, HBase Master, HBase RegionServer, and HiveServer2. NodeManager uses stable Web UI `/jmx` because an in-process Timeline Collector can attach the Prometheus sink elsewhere and leave the expected Web UI `/prom` empty.

The Agent host exporter covers CPU, memory, swap, load, uptime, filesystems, disk, network, process-thread totals, and selected kernel counters. Optional kernel sources are isolated when unavailable.

Packaged React dashboards cover HDFS, NameNode, DataNode, HBase Master, HBase RegionServer, HiveServer2, NodeManager, ResourceManager, ResourceManager host metrics, Linux Fleet Overview, and Linux Host Detail.

## Benefits And Trade-offs {#benefits-and-trade-offs}

The new path separates configuration distribution from metric collection, gives each component route independent validation and failure handling, and provides a standard Prometheus-compatible target and query model. Complete assignments carry revision hashes, JMX profiles are content-addressed, and the Agent retains its last valid configuration without caching scraped values.

These are architectural properties, not benchmark claims. The design does not promise a particular throughput, latency, or resource reduction.

The migration is behaviorally breaking for metric consumers: old Categraf or Telegraf names and aliases are not emitted, and existing dashboards or recording rules must query the new metric inventory. There is no automated import of historical AMS data into VictoriaMetrics. Preserve or export required AMS data before changing the deployment, and plan dashboard and query updates using the companion migration guide.

See [Monitoring Architecture](./architecture.md), [Deployment](./deployment.md), [Queries and Dashboards](./queries-and-dashboards.md), and [Migration](./migration.md) for operational details.
