---
title: Managed HBase Dependencies
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

# Managed HBase Dependencies {#managed-hbase-dependencies}

Managed dependencies let a new HBase service consume an existing managed HDFS service and/or ZooKeeper ensemble while keeping its own cluster, hosts and lifecycle. They are optional: independent clusters can continue using their own local HDFS and ZooKeeper.

Read the [architecture and evidence boundary](./architecture.md) before planning a shared deployment. The current consumer is HBase, and the implemented dependency types are `HDFS` and `ZOOKEEPER`; this is not a general-purpose service federation or arbitrary external-endpoint feature.

## Topology And Ownership {#topology-and-ownership}

![Hand-drawn HBase dependency architecture with separate storage and coordination bindings, private configuration, private namespaces and direct service traffic](/img/3.1.0/handdrawn/multi-cluster-bindings-en.webp)

The diagram deliberately places HDFS and ZooKeeper in different provider clusters. They can also be in the same provider cluster. Each selection has its own binding and readiness checks; review the complete plan before provisioning. The consumer's hosts remain members of its own cluster.

| Choice | Effect |
| --- | --- |
| Local HDFS and ZooKeeper | Conventional independent HBase deployment; no managed cross-cluster binding is needed. |
| Managed HDFS, local ZooKeeper | HBase storage uses the selected provider; coordination stays local. |
| Local HDFS, managed ZooKeeper | Storage stays local; coordination uses the selected provider. |
| Managed HDFS and ZooKeeper | Two bindings, each with its own provider identity, private namespace and readiness evidence. |

Ambari coordinates approval, preparation and verification. HBase communicates directly with provider daemons for storage and coordination; data does not flow through Ambari Server. A shared provider introduces shared availability and maintenance dependencies.

## Compatibility And Permissions {#compatibility-and-permissions}

| Check | Current contract |
| --- | --- |
| Consumer lifecycle | A draft/new service plan or fresh HBase service in initial state. Converting a data-bearing local HBase deployment is not supported. |
| Stack and versions | Consumer and provider use active BIGTOP 3.3.0 repositories with nonempty, equal resolved version metadata and compatible client features. A matching display version alone is insufficient. |
| Provider readiness | The selected service is installed and healthy before snapshot approval. |
| HDFS features | Federation and Observer NameNode clients are rejected by the managed binding validator. Do not infer support from their availability elsewhere in Ambari. |
| Security | Both sides are unsecured, or satisfy the dedicated same-realm Kerberos checks. Mixed secure/insecure and cross-realm bindings are rejected. |
| Network | Every current HBase daemon host can resolve and reach the configured NameNode RPC, DataNode data-transfer and ZooKeeper endpoints. Use the actual provider configuration, not assumed default ports. |
| Consumer authority | Modification and identity planning require `SERVICE.MODIFY_CONFIGS` and `SERVICE.SET_SERVICE_USERS_GROUPS`; Add Service additionally requires `SERVICE.ADD_DELETE_SERVICES`. |
| Provider authority | Discovery requires service-view authorization; preparation/mutation requires `SERVICE.RUN_CUSTOM_COMMAND` on the provider cluster. Consumer-only administration is insufficient. |

Installer drafts require global cluster-creation authority. Installation, Start and service checks also retain their ordinary operation permissions; the table lists dependency-specific prerequisites, not an exhaustive role grant recipe.

The initial secure path adds HBase to an **already Kerberized consumer cluster**. A new cluster installation does not automatically establish a usable secure dependency plan. Same-realm support includes identity mapping, provider policy proof, credential issuance and verification; the existence of source support does not close the real-KDC acceptance gap.

## Choose And Review Providers {#choose-and-review-providers}

1. Start a new cluster installation or open **Add Service** in the intended consumer cluster and select HBase.
2. In service selection, review the separate **Storage** and **ZooKeeper** choices. Keep the local default for any dependency that should remain local.
3. For a managed dependency, open the authorized provider list. Verify the provider cluster, service, compatibility result and any returned reasons before selecting it.
4. Save the selection and preview the plan. The wizard can release local daemon services selected solely to satisfy HBase, but retains services explicitly selected or required by another local consumer. Client packages remain necessary.
5. At configuration, inspect the managed client values and edit ordinary HBase properties as appropriate. Change provider-owned values through provider selection/review, not by copying complete provider configurations.
6. At Review, verify consumer identity, provider ownership, private paths, host placement and the current compatibility result. A changed provider or topology invalidates the old preview.
7. Submit the reviewed plan, then follow the Server-owned deployment. Do not start HBase manually while dependency preparation or verification is incomplete.

Adding an unrelated service beside an existing HBase deployment preserves its dependency ownership; it does not offer a migration opportunity. Unsupported choices should be resolved before provisioning.

## Private Configuration And Data Paths {#private-configuration-and-data-paths}

For each binding, the Server derives private paths from its UUID:

```text
HDFS binding:
  hdfs://<provider-authority>/apps/ambari-managed/hbase/<hdfs-binding-id>/root
  hdfs://<provider-authority>/apps/ambari-managed/hbase/<hdfs-binding-id>/wal

ZooKeeper binding:
  /ambari-managed-hbase/<zk-binding-id>/hbase
```

The HDFS and ZooKeeper binding IDs are independent. Root and WAL paths are distinct; the ZooKeeper binding has a private container and coordination child. Ambari also maintains ownership/fencing records. Do not manually delete those records or reuse the reserved paths for another application.

Only allowlisted client settings enter the approved snapshot. The HBase overlay does not overwrite an unrelated local service's Hadoop configuration. Provider administrative principals and keytabs are not copied to consumers. Read the returned namespace and planned identity instead of inventing an HBase user or path convention.

## Deployment Sequence {#deployment-sequence}

![Hand-drawn persistent HBase deployment sequence from saved preview and approval through provider preparation, installation, credentials, verification, Start, checks and exact-identity recovery](/img/3.1.0/handdrawn/multi-cluster-recovery-en.webp)

| Stage | What must be established |
| --- | --- |
| Save and preview | Exact draft/service-plan revision, selected providers and current fingerprints. |
| Approve and prepare | Persisted binding snapshot; provider preparation for its exact namespace and identity. |
| Install/configure | Approved clients and private configuration on the intended consumer hosts; durable request/task association. |
| Credentials and verification | Credential completion when required; NameNode RPC plus DataNode write/read checks, ZooKeeper session/private-znode checks, and current client/identity evidence. |
| Ready and Start | All managed bindings ready and evidence valid for **every current HBase daemon host**. |
| Service checks and completion | Exact Start and service-check request/task results associated with the same durable deployment. |

`READY` on one binding does not imply deployment completion. Inspect the deployment's `completed` field, current request/task results and operation identity. `INSTALL_ONLY` is a deliberate branch and does not mean `COMPLETE`.

## Updates, Maintenance And Detach {#updates-maintenance-and-detach}

Open HBase's **Dependencies** tab, or use the dependency link in the Services directory. The page shows ownership, phase, desired/applied snapshot versions, readiness and permitted next actions.

For provider configuration drift, use **Review changes**, inspect the proposed snapshot, and apply the reviewed changes when allowed. A concurrency conflict requires a new preview. **Retry preparation** retries the current binding through the supported operation; it must not reuse an unrelated task result.

Before stopping or restarting a provider, review its dependent consumers and confirm the current impact revision. Hidden consumers may appear as an anonymous count when you lack permission to see their names; an empty visible-name list does not imply no impact. Provider deletion is blocked while active bindings remain.

Stop HBase before **Detach provider**. Detach preserves provider services and stored data, and the detached dependency cannot be used to restart HBase. Detach is not a data migration or data-erasure command. Plan consumer retirement, data retention and any later cleanup explicitly; real detach/retention acceptance remains a qualification item.

## Source References {#source-references}

See the [snapshot validator](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencySnapshotValidator.java), [namespace allocation](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyNamespace.java), [dependency API client](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/api/serviceDependenciesApi.ts) and [dependency action UI](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Services/DependencyActions.tsx). [Operations and Recovery](./operations.md) documents the API read paths, failure codes and recovery decisions.
