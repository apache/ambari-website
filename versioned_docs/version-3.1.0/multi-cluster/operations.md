---
title: Operations And Recovery
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

# Operations And Recovery {#operations-and-recovery}

Operate on the explicit cluster and the exact saved operation. A successful HTTP submission, a zero process exit, a log message or an unrelated completed request does not prove that the intended workflow finished. Use the Server's structured state and identifiers.

This runbook complements [cluster creation](./getting-started.md) and [managed HBase dependencies](./managed-dependencies.md). The [architecture guide](./architecture.md#evidence-and-remaining-qualification) distinguishes historical runtime evidence from remaining qualification.

## Read-only API Examples {#read-only-api-examples}

The following are HTTP request targets for an already authenticated API client. Replace the example cluster name and identifier placeholders with values returned for your operation; preserve the deployment's authentication and proxy settings. Do not put credentials in scripts or shared diagnostic output.

```http
GET /api/v1/clusters?fields=Clusters/cluster_id,Clusters/cluster_name,Clusters/provisioning_state
GET /api/v1/clusters/analytics-a/hosts?fields=Hosts/host_name
GET /api/v1/clusters/analytics-a/services/HBASE/dependencies
GET /api/v1/clusters/analytics-a/services/HBASE/dependencies/{bindingId}
GET /api/v1/clusters/analytics-a/services/HBASE/dependencies/deployments/{deploymentId}
GET /api/v1/clusters/analytics-a/requests/{requestId}
GET /api/v1/clusters/analytics-a/requests/{requestId}/tasks
```

| Observation | Read and validate |
| --- | --- |
| Cluster inventory | `Clusters.cluster_id` and `Clusters.cluster_name`; a name change must preserve the numeric identity. |
| Binding list | `items`; ownership may be `managed`, `local`, `unmanaged` or `unknown`. A missing managed binding does not prove a local dependency is healthy. |
| Binding detail | `binding_id`, `consumer`, `provider`, `phase`, `row_version`, `operation_epoch`, desired/applied snapshot versions and operation identity. |
| Binding readiness | `readiness` identifies required, prepared and verified daemon hosts; `capabilities`, `allowed_actions` and `next_action` describe permitted progression. |
| Deployment | `deployment_id`, `cluster_id`, `attempt_id`, `request_id`, `history`, `state`, `phase`, `failure_code`, `retry_allowed`, `completed` and `install_only`. |
| Task completion | Read the exact request's tasks and owning cluster. Confirm the task/host/operation association and terminal results rather than searching all recent requests. |

A structured dependency error has `code` and `message`. Branch on the HTTP status and exact error code; the message is diagnostic text. Missing fields, malformed values or foreign identities must remain an error or unresolved observation.

## Mutation Contract For Integrators {#mutation-contract-for-integrators}

Prefer the UI for ordinary administration. For automation, use the pinned [API client](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-web/latest/src/api/serviceDependenciesApi.ts) and [REST service](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/api/services/ManagedServiceDependencyService.java) as the payload contract.

In the table, `D` means `/api/v1/clusters/{clusterName}/services/HBASE/dependencies`.

| Method and resource | Contract |
| --- | --- |
| `GET D/candidates?type=HDFS` | Discover authorized provider candidates for an existing HBase consumer; ZooKeeper uses its own dependency type. |
| `POST D/preview` | Preview one selection or the complete selection set; not approval or provisioning. |
| `POST D` | Approve exact binding IDs, provider identity, preview schema version and returned fingerprints, with an operation UUID. Supports a one- or two-item collection. |
| `POST D/deployments/{deploymentId}` | Persist/launch exact targets and an explicit install-only mode under an immutable deployment UUID. |
| `POST D/deployments/{deploymentId}/actions/retry` | Retry that deployment with an operation UUID only when the returned capability permits it. |
| `GET D/{bindingId}/preview-update` | Read a fresh update proposal before approving provider configuration changes. |
| `POST D/{bindingId}/actions/update` | Submit the fresh preview's row/snapshot versions, fingerprints, approval and schema version with the operation UUID. |
| `POST D/{bindingId}/actions/retry` | Submit an operation UUID and the expected current row version. |
| `POST D/{bindingId}/actions/verify-credentials` | Verify credentials against the expected current epoch, when the workflow permits manual credential handling. |
| `DELETE D/{bindingId}` | Detach with an operation UUID and expected row version after satisfying lifecycle guards; does not erase provider data. |

Draft and Add Service discovery use `/api/v1/service-dependencies/candidates` and `/api/v1/service-dependencies/preview`, with the appropriate draft or service-plan scope and expected revision. Do not create a dummy HBase service simply to make discovery work.

Provider-side reads use `/api/v1/clusters/{clusterName}/services/{serviceName}/dependents` and `/api/v1/clusters/{clusterName}/services/{serviceName}/dependency-impact`. Stop/Restart confirmation is bound to the current impact revision and exact provider/action. Re-read impact if another consumer changes.

Persist launch/retry IDs before submission. Following a timeout, read the original resource before deciding whether to retry; retain an immutable retry identity for the same attempt. An acknowledged deployment later returning 404 must not trigger a replacement launch.

## Binding Phases {#binding-phases}

| Phase | Operator interpretation |
| --- | --- |
| `PREVIEWED` | The binding has not established provider preparation. |
| `PROVIDER_PREPARING` | Provider work is in progress; inspect its associated request. |
| `PROVIDER_PREPARED` | Preparation is available; consumer installation and verification still have gates. |
| `ZOOKEEPER_HANDOFF_RECONCILING` | Follow the specific ZooKeeper handoff reconciliation; do not treat it as ready. |
| `CONSUMER_VERIFYING` | Current client, identity and connectivity evidence is being collected. |
| `READY` | Binding readiness is established for the current approved inputs; deployment completion is a separate observation. |
| `STALE` | Approved inputs/evidence no longer match current provider or consumer state; review changes. |
| `FAILED` | Inspect failure details and permitted retry actions. |
| `FENCING_UNCERTAIN` | Existing operation ownership cannot be established safely; investigate before further mutation. |
| `DETACHING`, `RETIRED`, `DETACHED`, `TOMBSTONED` | Retirement/detach lifecycle phases; none imply automatic data deletion or permission to restart the old dependency. |

Use returned capabilities with the phase. A phase name alone is not a substitute for topology, snapshot, identity and permission checks.

## Recovery Cases {#recovery-cases}

| Symptom or exact code | Inspect | Recovery |
| --- | --- | --- |
| Installer refresh or lost create response | Original draft UUID, owner, revision and saved cluster association. | Resume the original draft; re-enter requested secrets. Do not adopt a same-name cluster without the association. |
| Workflow revision conflict | Latest saved scope/revision and another active editor. | Reload the authoritative checkpoint, review differences, then submit current edits. |
| `DEPENDENCY_OPERATION_STALE` | Current operation, row version, snapshot and epoch. | Reload; preview again when inputs changed. Do not replay an old approval against new state. |
| `DEPENDENCY_VERSION_UNSUPPORTED` | Both active repository records and resolved version metadata. | Select a compatible provider or correct repositories; do not bypass the validator. |
| `DEPENDENCY_SECURITY_MISMATCH` or `CROSS_REALM_NOT_SUPPORTED` | Consumer/provider security modes and realms. | Use a supported topology; do not copy provider keytabs to bypass the mismatch. |
| `DEPENDENCY_CONSUMER_NOT_READY` | Every required daemon host's package, config, credentials and verification evidence. | Repair the failing prerequisite and use the offered preparation/verification action. |
| `DEPENDENCY_NAMENODE_RPC_FAILED` or `DEPENDENCY_DATANODE_READ_WRITE_FAILED` | Configured endpoints, network, identity and exact structured probe result. | Correct the reported cause, then reverify the affected current plan. |
| `DEPENDENCY_ZOOKEEPER_SESSION_FAILED` or `DEPENDENCY_ZOOKEEPER_AUTHORIZATION_FAILED` | Ensemble connectivity, client identity and private-znode policy. | Correct connectivity/authorization and follow the supported verification path. |
| `DEPENDENCY_FENCING_UNCERTAIN` | Persisted operation and provider ownership records. | Preserve uncertain state and obtain operator investigation; never delete journals to force success. |
| Deployment `UNRESOLVED` | Exact deployment history and missing/mismatched request/task lineage. | Preserve evidence and investigate; retry only if the Server explicitly permits it. |
| Provider stop/delete blocked | Current dependents and impact; consumer stop/detach requirements. | Coordinate maintenance, review the current impact or retire/detach consumers through supported flows. |
| One cluster's directory data fails | That cluster's authorization and failed read. | Retry that scope without discarding successful authorized rows. |

Capture exact cluster, draft, binding, deployment, operation, epoch, request and task IDs when relevant, plus sanitized structured responses. Logs can help explain failure but must not establish workflow success. Never include credentials or raw keytabs in an issue.

## Blueprint Handoff {#blueprint-handoff}

A managed Blueprint declares required dependency types through its settings:

```json
{
  "settings": [
    {
      "managed_dependencies": [
        {"consumer_service": "HBASE", "dependency_type": "HDFS"},
        {"consumer_service": "HBASE", "dependency_type": "ZOOKEEPER"}
      ]
    }
  ]
}
```

Provision with `provision_action: PREPARE_ONLY`, wait for actual host placement and topology configuration, then preview the complete HBase selection, apply reviewed configuration, approve the exact binding fingerprints and launch a durable deployment with exact targets. Provider IDs and credentials do not belong in the reusable template. The ordinary local Blueprint path retains its default actions.

This is the handoff contract, not a complete provisioning payload. Use the [Blueprint implementation](https://github.com/apache/ambari/blob/fc07b5cb873dc154c48349085494e664baf6b9d1/ambari-server/src/main/java/org/apache/ambari/server/controller/dependencies/ManagedDependencyBlueprintPlan.java) and the [general Blueprint guide](../ambari-design/blueprints/index.md) when building an integration.

## Upgrade And Acceptance Work {#upgrade-and-acceptance-work}

Back up the shared database and Server configuration before an upgrade. Validate exclusive host ownership and the scoped-workflow/dependency schema migration. Do not “repair” duplicates by deleting membership rows without establishing the correct owner.

Before relying on a deployment, verify two-cluster host and permission isolation, two-tab navigation, exact draft recovery, per-host managed readiness and the provider maintenance paths you will use. Secure installations additionally need real KDC/credential tests. Exercise network loss and Server restart using saved operation IDs.

Still-needed release documentation includes the final artifact/tag matrix, supported upgrade/database combinations, real-KDC results, managed detach/data-retention evidence, and failure-injection/broker-revocation results. Add those only after the corresponding tests run; the historical source review is not a substitute.
