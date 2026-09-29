---
title: Mpack Operations And Recovery
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

# Mpack Operations And Recovery {#mpack-operations-recovery}

Use the package **Activity** page to follow definition changes, and Ambari's normal request/task views to follow host installation and service operations. These records have different identities and completion conditions.

The guidance below applies to the [runtime preview](./overview.md), not to manually editing Server resource directories or database rows.

## Interpret Operation Phases {#operation-phases}

| Phase | Meaning and next step |
| --- | --- |
| `ACCEPTED` | The durable submission exists; wait for processing |
| `PREPARING` | Candidate resources and prerequisites are being prepared |
| `WAITING_MAINTENANCE` | Inspect affected scope, blockers, and the required maintenance action |
| `WAITING_RESTART` | A real Server restart is required; follow the operation's restart procedure |
| `PUBLISHING` | The verified definition view is being published |
| `SUCCEEDED` | Verify the operation identity and effective result before using a deployment handoff |
| `FAILED` | Inspect the exact error and receipts; determine whether a new plan or eligible retry is appropriate |
| `RECOVERY_REQUIRED` | Outcome is unresolved; reconcile existing receipts before deciding what to do |
| `CANCELLING` | Cancellation is being reconciled; it is not complete yet |
| `CANCELLED` | Cancellation completed under the Server's validated policy |

An HTTP 202 means accepted, not completed. Do not turn a timeout, missing response, log message, or unknown state into assumed success.

## Preserve Identity After A Disconnect {#preserve-identity}

Retain the exact `plan_id`, `plan_digest` and idempotency key before submitting. Once available, retain `operation_id` and `generation` as well. The browser keeps a pending submission checkpoint under the current account and offers reconciliation when acceptance is uncertain.

Replaying the same user/plan/key returns the original operation. Creating another key or plan after a lost response may create different work; first resolve the original acceptance. A definitively rejected stale plan can be previewed again.

Shared operation history and another account's local checkpoint are different things. Do not copy a different user's browser checkpoint or credentials to force recovery.

## Inspect Through The CLI {#inspect-cli}

Use the matching CLI described in [authoring and bundling](./authoring-and-bundling.md#cli-import). Substitute the actual recorded operation ID:

~~~shell
ambari-mpack --json operations list
ambari-mpack --json operations show "$OPERATION_ID"
ambari-mpack --json operations members "$OPERATION_ID"
~~~

Inspect the phase, error code, affected scope, member identities, and hook receipts. Diagnostic messages explain problems, but automation must use the structured fields and exact identifiers.

## Reconcile, Retry, And Cancel {#recovery-actions}

**Reconcile** asks the Server to establish what already happened. It does not blindly execute a hook again:

~~~shell
ambari-mpack --json operations recover "$OPERATION_ID"
~~~

**Retry** is for eligible failed hooks with an authoritative no-effect observation and supported idempotent behavior:

~~~shell
ambari-mpack --json operations retry "$OPERATION_ID"
~~~

**Cancel** is subject to the retained effects and current operation state:

~~~shell
ambari-mpack --json operations cancel "$OPERATION_ID"
~~~

Choose the action appropriate to the observed state; these commands are alternatives, not a recovery script to run in sequence. Applied or uncertain effects can prevent cancellation or retry. Completed effects are not replayed. An interrupted cancellation resumes cancellation rather than restarting the original install/update.

## Scoped Maintenance And Concurrency {#scoped-maintenance}

Long preparation, verification, and hook subprocess work is outside the exclusive publication lock. A coordinator protects the final view switch and persistence. Reservations block affected definition consumers and relevant service/configuration/topology mutations.

Unrelated ordinary writes and tasks can continue. This does not mean all package publications run concurrently or that two conflicting changes can operate on the same definition. A shared Stack/version can affect multiple clusters.

Blocking tasks are identified by their cluster, request, task, and authoritative status. Existing tasks retain their compatible resource references. Active Stack upgrades or unsupported in-use component-model changes can reject the plan. Restarting Server is not a replacement for an unimplemented component migration.

## Definitions, Software, Configuration, And Data {#different-change-types}

| Change | What it changes | Separate work that may still be needed |
| --- | --- | --- |
| Import a newer bundle | Register additional definition releases | Explicitly select/activate a version |
| Update an active definition | Scripts, metadata and managed resource bindings | Host software upgrade or component migration |
| Save configuration content | Create an Ambari configuration version | Reload/restart and native verification |
| Retire/uninstall a definition | Remove eligible definition ownership/availability | Explicit service retirement and data policy |
| Restore application data | Service-specific data state | A validated backup/restore procedure |

Removal may fail because a package, binding, operation, service, or cluster still uses the resources. Old release records can remain for provenance. Do not delete Server directories or rows to bypass a reference check.

The reference packs preserve persistent user data on stop and definition retirement. This is not a universal rollback engine. PostgreSQL's declared backup/restore operations have their own isolated-target and observation rules; do not generalize them to every service.

## Troubleshooting By Symptom {#troubleshooting}

| Symptom | Inspect first | Recovery direction |
| --- | --- | --- |
| No Management Packs entry | Current account and administrator authorization | Use an authorized account; a URL does not bypass Server permissions |
| Import succeeds but no application appears on hosts | Service selection and deployment handoff | Continue through the new-cluster or Add Services wizard |
| Service is unavailable | Catalog reason and compatible Stack context | Correct dependencies/target definitions and refresh the catalog |
| Several services cannot be selected together | Exact Stack contexts and destination | Deploy compatible groups separately |
| Submission response was lost | Saved plan/key and operation record | Reconcile the existing submission |
| Plan rejected as `STALE_PLAN` | Catalog revision and changed prerequisites | Create a fresh preview after definite rejection |
| `RESOURCE_IN_USE` on removal | Resource usage references | Resolve actual uses through supported lifecycle actions |
| `WAITING_RESTART` persists | Real Server restart and subsequent operation observation | Complete the documented restart/reconciliation step |
| Package succeeds but installation fails | Host request/task and native observations | Repair host prerequisites or configuration; do not re-import blindly |
| All graphs show no data | Time range, refresh state, datasource and fresh target observations | Follow the [monitoring guide](../monitoring/queries-and-dashboards.md#workspace-interactions) |

## Evidence To Include In A Report {#report-evidence}

Include the Server/Agent build, package name/version/digest, exact plan and operation identities, affected clusters, observed phase/error code, relevant task IDs, software observations, and recovery actions already attempted. For configuration failures, include a redacted diff and configuration-version identity.

Keep passwords, tokens, cookies, database connection secrets and private keys out of reports and screenshots. A package success record, a service task result, and a monitoring query result should each be identified separately.
