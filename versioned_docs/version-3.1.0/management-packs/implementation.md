---
title: Developer Guide - How The Service Store Works
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

# Developer Guide - How The Service Store Works {#how-service-store-works}

The store adds installation and management instructions to Ambari. The normal Ambari deployment workflow still installs the actual software on hosts. This separation explains why importing a bundle and installing a service are different steps.

For ordinary usage, start with [Service Store](./overview.md). For requests and tooling, see [API and service integration](./authoring-and-bundling.md).

## Three Parts With Different Jobs {#three-parts}

| Part | Responsibility | Example |
| --- | --- | --- |
| Separate store repository | Describe services and provide their configuration templates and scripts | How to install and check Nginx |
| Ambari Server | Inspect packages, build the catalog, check dependencies, and publish the selected definitions | Decide which Nginx package applies to an environment |
| Ambari Agent | Execute the host tasks using the selected resources | Install software, write configuration, and start a process |

A management package, or mpack, is the unit that carries those definitions. A bundle transports several packages together. The reference repository is maintained separately from Ambari core, so adding a service does not require placing all of its code in the Server source tree.

Each package has its own version. The bundle does not turn all of its members into one service or require all of them to be installed.

## What Happens After A Click? {#request-flow}

~~~text
Upload bundle
    -> inspect archives and member digests
    -> import package records
    -> show services in the catalog
    -> select services and destination
    -> check dependencies and preview the change
    -> accept and record an operation
    -> prepare and publish selected definitions
    -> hand off to Create Cluster / Add Services
    -> run host installation and service checks
~~~

Upload and import make packages available. They do not run host installation. Selecting services lets the Server resolve compatible providers and dependencies, instead of requiring the user to construct package bindings manually.

The catalog groups services by their provider and exact Stack name/version. A Stack is the set of service definitions available to an environment. A binding connects a package's definitions to that environment.

The installation handoff is returned only after the operation succeeds and the selected definitions are checked again. That stops the UI from starting a wizard using definitions that have changed in the meantime.

## Why Preview Before Execution? {#plans-and-operations}

A plan describes the proposed change, the catalog revision it was checked against, affected clusters, and any maintenance or restart requirement. It has a limited lifetime. If the environment changes, the Server can reject the stale plan rather than execute a different change from the one reviewed.

An operation is the saved record of an accepted plan. It survives a lost browser connection and lets clients query the same work later.

The idempotency key identifies a submission for one user and one exact plan. Reusing it for that request returns the original operation. This protects against duplicate acceptance after a lost response; it does not make every application script safe to repeat.

## Why Does A Package Change Not Block The Whole Server? {#scoped-publication}

The Server records which definitions the operation affects. It blocks conflicting service, configuration, and topology changes within that scope. Unrelated ordinary writes and tasks can continue.

Slow work such as preparing files, validating candidates, and running package hooks happens outside the exclusive publication lock. A coordinator protects the final resource-view switch and persistence.

This is not unlimited parallel execution of package changes. Conflicting changes still wait or fail, and publication has a single coordinator. Definitions are shared by Stack name/version, so an update can affect several clusters using that same context.

Existing tasks retain compatible references to their resources. Unsupported changes to an in-use component model are rejected; restarting the Server does not supply a missing migration.

## What Does A Snapshot Preserve? {#snapshots-and-versions}

A definition snapshot identifies a particular set of management resources. Keeping its identity lets the Server and Agent refer to the expected scripts and metadata while a newer set is prepared.

It is not a backup of application data. Rolling back definition files cannot undo a database migration or restore deleted records.

| Version or identity | What it identifies |
| --- | --- |
| Package version | A particular release of installation scripts and definitions |
| Service descriptor version | The version label declared in the service metadata |
| Installed software version | The application actually running on a host |
| Snapshot identity | A particular effective set of management resources |

For example, the reference Kyuubi descriptor can show 1.0 while its application version is 1.9.4. These labels are not interchangeable.

## How Does Recovery Avoid Repeating Side Effects? {#recovery-design}

Package hooks return structured receipts containing the operation, plan, archive, attempt, and observed effect. The Server checks those identities before accepting a result. It does not decide success by searching log messages.

| Phase | Meaning for a client |
| --- | --- |
| `ACCEPTED`, `PREPARING` | Recorded and preparing; not finished |
| `WAITING_MAINTENANCE`, `WAITING_RESTART` | Requires the reported maintenance action or a real Server restart |
| `PUBLISHING` | Switching the effective definitions |
| `SUCCEEDED` | Completed; verify the matching result before using it |
| `FAILED` | Failed; inspect its error and effects before retrying |
| `RECOVERY_REQUIRED` | The result is unresolved, not successful |
| `CANCELLING`, `CANCELLED` | Cancellation is in progress or has completed |

Recovery reconciles existing receipts. A completed effect is not replayed. An unknown effect stays unresolved until it can be checked. Only eligible failed hooks with a confirmed no-effect result and supported idempotent behavior can be retried.

Online package hooks must declare `scope: "DEFINITIONS"`. A missing scope means Server-wide effects and is rejected for online execution, although import is still allowed. The declaration limits the supported contract; it is not an operating-system sandbox.

## How Are Full Configuration Files Stored? {#configuration-content}

A service can declare a configuration property named `content` that holds a whole native file. The editor saves it as an Ambari configuration version. Agent-side scripts render it with the required managed values and apply it when a configuration or restart task runs.

This allows new application settings without a new form field for each one. Existing saved content is retained when package defaults change. A full-file configuration-group override replaces a document rather than merging individual lines.

Nginx and PostgreSQL validate candidate files before replacement and retain previous bytes for recovery. Individual replacements are atomic, but replacing several files is not one crash-atomic transaction. Concurrent external edits require reconciliation.

## Where To Read The Code {#source-map}

These names refer to the development snapshot recorded in the [source baseline](../release-baseline.md#runtime-mpack-follow-up). Use a checkout containing that implementation; these references are not published-release claims.

| Source | Start here for |
| --- | --- |
| `MpackLifecycleApiService` | HTTP endpoint handling |
| `MpackServiceCatalog` | Service choices and compatible destinations |
| `MpackLifecycleService` | Planning, acceptance, publication, and recovery |
| `MpackLifecycleState` | Plan, operation, and result contracts |
| `dev-support/mpack` | CLI, validation, scaffolding, and bundle building |
| `ambari-web/latest/src/screens/Mpacks` | Store selection, import, and progress UI |
| `docs/mpack/http-api.md` | Detailed HTTP contract |

Software upgrades, data backups, automatic cache cleanup, and unsupported service topologies remain separate work. The store's package lifecycle does not implement them automatically.
