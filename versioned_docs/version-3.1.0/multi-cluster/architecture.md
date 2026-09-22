---
title: Multi-cluster Architecture
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

# Multi-cluster Architecture {#multi-cluster-architecture}

Ambari can manage several independent clusters through one Server and metadata database. A cluster owns its services, host assignments, configurations, requests and permissions. Operators can optionally connect a new HBase deployment to managed HDFS and ZooKeeper services in other clusters.

This guide describes the implementation merged in [AMBARI-26656 / PR #4216](https://github.com/apache/ambari/pull/4216), checked against trunk `fc07b5cb873dc154c48349085494e664baf6b9d1` on 2026-09-22. It belongs to the 3.1.0 **preview** documentation; it is not a released-version support certificate. See [Source Baseline](../release-baseline.md).

Start with [Creating and Using Clusters](./getting-started.md), then [Managed HBase Dependencies](./managed-dependencies.md) and [Operations and Recovery](./operations.md).

## Control Plane And Cluster Boundaries {#control-plane-and-cluster-boundaries}

![Hand-drawn multi-cluster architecture showing two URL-scoped browser tabs, a shared Ambari Server and database, and separately owned Agent hosts](/img/3.1.0/handdrawn/multi-cluster-architecture-en.webp)

The drawing uses two independent clusters with local service dependencies. Both sets of Agents register with the same Ambari Server. The Server dispatches tasks to the appropriate hosts and persists each request's owning cluster. Sharing a Server does not merge the two HDFS namespaces or ZooKeeper ensembles.

| Boundary | What it means |
| --- | --- |
| Server and database | Shared management availability, upgrade and backup scope. Multi-cluster management does not introduce Server high availability. |
| Cluster | Independent service deployment, desired configuration, authorization and operation scope. |
| Host | Registered but unassigned, or assigned to exactly one runtime cluster. One host cannot simultaneously run as a member of both clusters. |
| Service | Deployment identity is the pair `(cluster_id, service_name)`; HBase in A and HBase in B are different deployments. |
| Managed dependency | An explicit consumer/provider relationship. The provider retains service lifecycle and data ownership. |
| Remote Cluster registration | A separate existing integration for remote cluster references. It does not import another Server's hosts into this runtime or federate its lifecycle management. |

A Server outage affects management for every cluster. Service daemons have their own availability mechanisms; do not assume either that they all stop or that every operation remains available during a Server outage. If clusters share an HDFS or ZooKeeper provider, a provider outage also affects its consumers.

## Route And Authorization Isolation {#route-and-authorization-isolation}

Operational URLs include the cluster name:

```text
/latest/#/clusters/analytics-a/main/hosts
/latest/#/clusters/analytics-b/main/services/HBASE/summary
/latest/#/clusters
/latest/#/services

/api/v1/clusters/analytics-a/services/HBASE
/api/v1/clusters/analytics-b/services/HBASE
```

The last two browser routes are global authorized directories. Selecting a service establishes its cluster in the URL. Separate tabs can inspect different clusters without using a global selected-cluster value as authority.

React keys its runtime by authenticated user and route scope. Cluster switches invalidate old requests, caches, polling and event consumers before they can update the new screen. A last-used numeric cluster preference is only a navigation hint; the Server's current authorization and cluster inventory must validate it.

Server authorization remains the security boundary. AMBARI-scoped grants apply globally; CLUSTER-scoped grants apply to the named cluster. Being a cluster administrator does not grant Ambari administration. Server-side STOMP authorization/projection restricts event delivery, and request/task reads validate actual ownership. Browser filtering alone cannot protect another cluster's information.

## Persistent Identity And Recovery {#persistent-identity-and-recovery}

| Identity | Purpose |
| --- | --- |
| Numeric cluster ID | Stable cluster identity across rename; names remain in compatible REST paths. |
| Creation draft UUID | Identifies one installation intent, its owner and the exact cluster created from it. |
| Workflow scope and revision | Separates installer drafts and cluster workflows; rejects obsolete writes instead of overwriting another session's checkpoint. |
| Binding UUID | Identifies one managed HDFS or ZooKeeper relationship and its private namespace. |
| Snapshot version and fingerprints | Identify approved provider/client configuration and consumer topology/security inputs. |
| Operation ID and epoch | Associate an attempt and exclude stale work from an earlier operation. |
| Deployment UUID and attempt ID | Persist the installation/start/check workflow independently of a browser session. |
| Request, task and host IDs | Tie execution results to the exact scheduled work and authorized host. |

Creation submits `creation_draft_id`. If a create response is lost, recovery checks the saved draft-to-cluster association. A matching cluster name is not sufficient proof that the current draft created it. Creation does not delete existing clusters or shared repository definitions.

The database enforces exclusive host membership. The upgrade path detects duplicate historical memberships and stops for explicit remediation; it does not silently select an owner. Back up and resolve ambiguous ownership before retrying an upgrade.

## Shared Services Without Shared Ownership {#shared-services-without-shared-ownership}

A managed HBase deployment may select HDFS for storage and ZooKeeper for coordination independently. Each binding persists the provider's numeric identity, a reviewed configuration snapshot, a private namespace and operation history.

Provider settings enter an allowlisted, HBase-specific client overlay. The consumer retains its own Hadoop configuration and does not receive the provider's administrative credentials. Client installation, credential work and connectivity checks run against the exact current plan.

A binding becoming ready is distinct from a deployment completing. The Server coordinates provider preparation, consumer installation, dependency verification, HBase Start and service checks. Refresh reads the same deployment instead of launching replacement work. See the [binding and readiness walkthrough](./managed-dependencies.md#deployment-sequence).

## Implementation Map {#implementation-map}

| Layer | Source and responsibility |
| --- | --- |
| Browser navigation | [React routes](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/router/RoutesList.tsx) and [cluster directory](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Directories/ClusterDirectory.tsx): explicit cluster context, authorized discovery and draft resume. |
| Administration | [Admin routes](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-admin/src/main/resources/ui/ambari-admin/src/router/RoutesList.tsx): cluster overview, host resources, permissions and repository navigation. |
| Host membership | [Host membership upgrade](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/upgrade/HostMembershipSchemaUpgrade.java): exclusive ownership and migration checks. |
| Dependency approval | [Managed service coordinator](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedServiceDependencyCoordinator.java): authorization, preview, snapshots, binding mutations and operation lineage. |
| Deployment recovery | [Deployment coordinator](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyDeploymentCoordinator.java): persistent install, readiness, start and service-check progression. |
| Start and lifecycle gates | [Readiness policy](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyReadinessPolicy.java) and [lifecycle policy](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyLifecyclePolicy.java): current evidence, impact confirmation and delete protection. |
| Agent-side execution | [Managed HBase scripts](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HBASE/package/scripts/managed_hbase_dependency.py): structured observations, private client configuration and verification. |

The scripts' inherited source directory includes `BIGTOP/3.2.0`; that directory name is not the managed dependency compatibility contract. The current validator requires active BIGTOP 3.3.0 repositories and matching resolved version metadata.

## Evidence And Remaining Qualification {#evidence-and-remaining-qualification}

The historical [implementation and runtime record](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/docs/design/multi-cluster-review-and-remediation.md) contains separate checkpoints:

| Scenario | Recorded evidence | Limit |
| --- | --- | --- |
| Two independent clusters, local HBase dependencies | Six-host native RPM deployment at source `1ab17a10ea333e35d9952666d57d8f4383762103`; distinct HBase identities, service checks, foreign-user denials and duplicate-host rejection. | Historical source/package acceptance, not a new deployment of the current trunk. |
| Cross-cluster managed HBase | A deployment reached complete with both bindings ready and an SDK Put/Get service check. | Used an earlier RPM plus documented file/class overlays; do not describe it as the final clean-package acceptance. |
| Admin workflows | Recorded browser/API checks for overview, host ownership, draft resume, grants, rename and deletion. | Not an exhaustive role, proxy or browser matrix. |
| Remaining fault/security scenarios | Source and focused regression coverage exist. | Real KDC callbacks, managed provider stop/delete/detach retention, every crash/drop boundary and complete broker revocation matrix still need qualification. |

Website build and browser tests validate these documents and images. They do not establish cluster runtime acceptance.
