---
title: Blueprint Support For High Availability Clusters
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

# Blueprint Support For High Availability Clusters {#blueprint-support-for-high-availability-clusters}

## HA Model {#ha-model}

Blueprints place redundant service components; the service itself and ZooKeeper or another coordination layer determine the active role and failover. Blueprint creation does not permanently encode the active/standby state. After failover, the role may be different from the initial role.

The effective 3.1 component names and host-level endpoints come from the installed BIGTOP Stack. Use the current Stack descriptors rather than copying historical HDP 2.x examples. Relevant service definitions include HDFS NameNode, YARN ResourceManager, and HBase Master/RegionServer components in the BIGTOP resources.

## HDFS NameNode HA {#hdfs-namenode-ha}

Place at least two `NAMENODE` components on separate host groups or hosts, together with `ZKFC`, `ZOOKEEPER_SERVER`, and `JOURNALNODE`. Configure the nameservice and both NameNode addresses in `hdfs-site`, and configure `ha.zookeeper.quorum` in `core-site`.

Use host-group substitutions when a property refers to a physical host. The stable form is `%HOSTGROUP::HOST_GROUP_NAME%:PORT`; the Blueprint processor resolves the token to the host mapped to that group. This avoids binding a reusable Blueprint to one set of host names.

The initial active/standby choice is normally assigned automatically. If the Stack supports explicit initial selection, the relevant `hadoop-env` properties are `dfs_ha_initial_namenode_active` and `dfs_ha_initial_namenode_standby`. They describe only startup state; failover can change it.

## YARN ResourceManager HA {#yarn-resourcemanager-ha}

Place two `RESOURCEMANAGER` components and `ZOOKEEPER_SERVER`. Configure the Stack's `yarn.resourcemanager.ha.enabled` and the namespaced ResourceManager address properties. ZooKeeper elects the first instance that acquires the lock as active; the other starts as standby. Blueprint does not guarantee which physical host becomes active.

## HA Creation Flow {#ha-creation-flow}

1. Define the HA components in separate host groups and include the service's required coordination components.
2. Add all nameservice, address, fencing, and security properties required by the installed Stack. Validate host-group tokens and ports before registration.
3. Register the Blueprint, then map each HA host group in the cluster creation template.
4. POST the cluster template to `/api/v1/clusters/:clusterName` and monitor the asynchronous `/requests` result.
5. Verify service-specific active/standby status after startup and after any failover; Blueprint export should not be treated as a snapshot of the current role.

## References {#ha-references}

The current host assignment and Stack metadata paths are documented in the pinned [Ambari Stack source](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP) and [HA host resolver](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/stack/HostsType.java).
