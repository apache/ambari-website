---
title: Creating And Using Clusters
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

# Creating And Using Clusters {#creating-and-using-clusters}

Use this procedure for two independent clusters managed by the same Ambari Server. For the architecture and version boundary, read [Multi-cluster Architecture](./architecture.md). Sharing providers is optional and is covered separately in [Managed HBase Dependencies](./managed-dependencies.md).

## Before You Start {#before-you-start}

Use matching Server, Agent, Web and Admin artifacts containing the multi-cluster implementation. Complete the normal [installation prerequisites](../quick-start/installation-guide.md), including DNS, connectivity, repositories and Agent enrollment. Existing installations must follow the [upgrade procedure](../upgrade-guide.md); this guide is not a substitute for the database migration.

| Requirement | Check |
| --- | --- |
| Creation authority | Your account has `AMBARI.ADD_DELETE_CLUSTERS`. Cluster-only administration does not grant global creation. |
| Host inventory | New hosts are registered with this Server and are unassigned. Check Admin's Host Resources before installation. |
| Repository definition | The selected Stack and repository work on the target hosts. Reuse identical settings; resolve a conflicting shared definition explicitly. |
| Unique target | Choose a new cluster name and start a fresh installation draft. |
| Capacity | Size the shared Server/database and each service deployment for their combined load. No fixed cluster-count capacity guarantee is implied. |

A small example uses six hosts:

| Cluster | Hosts | Local services |
| --- | --- | --- |
| analytics-a | worker1, worker2, worker3 | HDFS, ZooKeeper and HBase |
| analytics-b | worker4, worker5, worker6 | HDFS, ZooKeeper and HBase |

This is a topology example, not a production sizing recommendation. Hosts need not match these names. The critical property is that the two host sets do not overlap.

## Create The First Or Next Cluster {#create-the-first-or-next-cluster}

1. Sign in through the primary React entry point. Open **Clusters**, or use the cluster menu's **Admin Cluster Management** entry if authorized.
2. In Admin, open **Create Cluster** and choose **Start installation wizard**. The global Clusters directory also exposes creation to authorized users.
3. Enter the new cluster name. The wizard URL includes a draft identifier; retain that URL if the installation is interrupted.
4. Select the Stack/version and review repository URLs. Register or select only unassigned hosts for this cluster.
5. Select services. For an independent HBase deployment, retain the local HDFS and ZooKeeper choices. Do not choose managed providers merely because other clusters are present.
6. Review component placement and configurations. Confirm that every hostname belongs to the intended target, especially when adding the second cluster.
7. Submit Review, follow installation and startup progress, and inspect any failed request/task before retrying.
8. Finish the wizard, open the cluster's Hosts and Services screens, and verify the actual inventory and component states. Run the service checks appropriate to the selected services.

Repeat from a **new** draft to create the next cluster. Do not reuse the first cluster's saved installer URL. Existing clusters and shared repository records are preserved.

A name collision is a validation failure, not permission to overwrite or adopt the existing cluster. Choose another name, or open the existing cluster through an authorized link if that was your intent.

## Resume An Interrupted Installation {#resume-an-interrupted-installation}

Open **Clusters** or Admin **Create Cluster** using the same account. Your saved installations show their target, phase and installation ID; choose the resume/continue action for the original draft.

Allow the workflow to load its saved revision before editing. Passwords, private keys and other sensitive fields are stripped from persisted checkpoints and may need to be entered again. A missing secret blocks the affected operation, while non-secret inputs can remain saved.

If a create or host-assignment response was lost, let the wizard reconcile its original draft and recorded assignment intent. Do not create another same-name cluster to “repair” uncertainty. A revision conflict requires reloading the current checkpoint before retrying edits. See [recovery cases](./operations.md#recovery-cases).

Leaving or refreshing a page does not establish that Server work was cancelled. Inspect the saved workflow and its request IDs after reconnecting.

## Switch And Compare Safely {#switch-and-compare-safely}

| Task | Entry |
| --- | --- |
| Browse authorized clusters | `/latest/#/clusters` |
| Compare service deployments | `/latest/#/services` |
| Open A's hosts | `/latest/#/clusters/analytics-a/main/hosts` |
| Open B's HBase configuration | `/latest/#/clusters/analytics-b/main/services/HBASE/configs` |
| Inspect B's operations | `/latest/#/clusters/analytics-b/main/requests` |

These paths assume the standard deployment base; preserve any configured reverse-proxy prefix. Encode a cluster name as one URL path segment instead of concatenating an unescaped name.

Directories retain search, sorting and pagination in the URL. The Services directory identifies both the service and owning cluster and shows HBase dependency summaries. A failure loading one cluster does not turn another cluster's rows into its replacement; retry the failed scope.

After login, Ambari revalidates an authorized continuation or the user's last numeric cluster preference. A sole authorized cluster can be selected automatically; otherwise the UI asks for a selection. Old unscoped links preserve their intended destination through this selection. A removed or forbidden target must not silently become another cluster.

## Admin Tasks {#admin-tasks}

| Screen | Use |
| --- | --- |
| Cluster Overview | Find managed clusters and open the desired cluster or its details. |
| Cluster Details | Review Basic Information, Services & Hosts, Access Permissions, Operation History, and Configuration & Export. |
| Host Resources | Distinguish assigned and unassigned hosts; open the target cluster's existing Add Host wizard. |
| Cluster Permissions | Grant or remove access for the explicit target cluster, then read back its privileges. |
| Versions & Repositories | Review the global repository catalog and the selected cluster's version state. |
| Remote Clusters | Maintain remote references; this does not create another locally managed runtime cluster. |

Rename preserves numeric identity. Deletion is a separate guarded operation: inspect service state and dependency impact, stop the required components, and use the authorized deletion workflow. Do not interpret removing a UI row or receiving an accepted request as proof of deletion.

## Check The Result {#check-the-result}

1. In each cluster's Hosts screen, confirm the expected host set and disjoint ownership.
2. Open each cluster's HBase service in a separate tab. Verify the owning cluster, effective storage/coordination configuration and service-check results.
3. With a cluster-limited account, verify only the intended inventory and operations are available. A global administrator is not a useful isolation test account.
4. Refresh an explicit cluster URL and confirm it reloads the same target; resume any unfinished workflow from its original checkpoint.
5. Check the request and task states for the exact operation you launched. Do not use a recent unrelated successful task as its completion evidence.

For scripted checks, use the [read-only API examples](./operations.md#read-only-api-examples). Real topology and role acceptance must be performed in your deployment; the website examples do not execute those checks.

## Source References {#source-references}

The procedure follows [Admin Create Cluster](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-admin/src/main/resources/ui/ambari-admin/src/screens/ClusterManagement/ClusterCreate.tsx), the [cluster directory](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Directories/ClusterDirectory.tsx), the [service directory](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/screens/Directories/ServiceDirectory.tsx) and the [scoped workflow utilities](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/Utils/scopedWorkflow.ts).
