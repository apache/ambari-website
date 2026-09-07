---
title: Integrating Service Telemetry
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

# Integrate Service Telemetry {#integrate-service-telemetry}

![Service telemetry descriptors, endpoint discovery, collection, and storage integration](/img/3.1.0/handdrawn/service-telemetry-integration-en.webp)

| Descriptor field | Meaning |
| --- | --- |
| `format` | `prometheus_text` for native exposition or `jmx_json` for typed conversion |
| `path` | The component's known endpoint, such as `/prom` or `/jmx` |
| `profile` | Service-relative typed JMX profile when using JMX |
| `endpoint.policy` | Effective configuration that selects HTTP versus HTTPS |
| `endpoint.http` / `endpoint.https` | Configuration property, optional HA property prefix, and default port |
| `auth.principal` / `auth.keytab` | Effective-configuration references for Kerberos, not embedded secrets |

The Server chooses the component host as the destination and extracts the configured port. Descriptor/profile validation rejects unsupported formats and unsafe routes. The Stack service inheritance mechanism also applies to telemetry metadata.

## Native Versus JMX {#native-versus-jmx}

The baseline uses native Hadoop `/prom` for NameNode, DataNode, and ResourceManager. The property `hadoop.prometheus.endpoint.enabled=true` enables that native endpoint where supported.

NodeManager intentionally uses its stable Web UI `/jmx` endpoint in the Hadoop 3.3 contract. A process containing an in-process Timeline Collector can attach the global Prometheus sink elsewhere, leaving the expected NodeManager Web UI `/prom` empty. Do not replace this route merely because another Hadoop component supports native exposition.

HBase Master, HBase RegionServer, and HiveServer2 also use typed JMX profiles in the documented baseline. A newer component version or another native endpoint requires output and authentication validation before changing its descriptor.

## A Typed Profile {#typed-profile}

This reduced example shows one rule from the packaged NodeManager profile. The production profile contains more rules; extend a reviewed profile rather than replacing it with this excerpt.

```json
{
  "schemaVersion": 1,
  "id": "nodemanager-3.3",
  "maxSeries": 64,
  "rules": [
    {
      "bean": {
        "domain": "Hadoop",
        "properties": {
          "service": "NodeManager",
          "name": "NodeManagerMetrics"
        }
      },
      "attributes": {
        "ContainersRunning": {
          "name": "yarn_nodemanager_containers_running",
          "type": "gauge",
          "unit": "containers",
          "help": "Current number of containers running on the NodeManager."
        }
      }
    }
  ]
}
```

Match explicit ObjectNames and numeric attributes. Define stable metric names, correct types and units, and bounded series counts. Counter names use the `_total` suffix. Do not convert every JMX property into an unbounded label.

## Registration And Validation {#registration-and-validation}

1. Add or update the service's descriptor and, for JMX, its `telemetry-profiles` content.
2. Verify effective configuration resolution for normal, HA, HTTP, HTTPS, and Kerberos variants supported by that component.
3. Supply representative native or JMX response fixtures. Check successful conversion and rejected malformed, oversized, duplicate-series, and unmatched responses.
4. Include the metadata in the Server/Stack package and follow its normal deployment lifecycle. Use supported configuration/component changes to trigger assignment recompilation.
5. Confirm the assigned route through HTTP service discovery, scrape the actual route, and query the resulting metric in the Explorer.
6. Add dashboards using the emitted names and units, then test active/standby and failure behavior.

Assignments are complete, hashed bundles, and the Agent keeps its last valid configuration if a candidate is invalid. That recovery behavior must not be confused with successful acceptance of a new descriptor.

## Keep Management Signals Separate {#management-signals}

The retained `metrics.json` files define a small set of direct-JMX attributes needed by management operations, not the new historical monitoring definition. Examples include NameNode HA state, cluster ID, safe mode and checkpoint information, JournalNode journal state, and HBase active-master/live-server information.

Do not remove these attributes while migrating a service to `telemetry.json`: management workflows can depend on them even when the monitoring dashboard uses Prometheus queries.

## Source Examples {#source-examples}

Consult the pinned [HDFS descriptor](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/telemetry.json), [YARN descriptor](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/YARN/telemetry.json), and [NodeManager profile](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/YARN/telemetry-profiles/nodemanager-3.3.json).
