---
title: Common Problems And Updates
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

# Common Problems And Updates {#mpack-operations-recovery}

First check where the problem happened. A store action and a service installation are shown in different places.

## Where Should I Look? {#operation-phases}

| What you were doing | Where to check |
| --- | --- |
| Importing a bundle or preparing selected services | **Activity** on the store page |
| Installing or starting a service on a host | The cluster's installation or background task details |
| Applying a configuration change | The service's configuration history and restart/reload task |
| Checking whether the service works | Its service-check task |

“Import completed” means the services can be selected. It does not mean they are installed. Installation and startup must finish separately.

## I Closed The Page Or Lost The Connection {#preserve-identity}

Open the store again and check **Activity** for the action you started. If the page offers to check the previous submission, use that first.

A network error does not necessarily mean the Server stopped. Avoid repeatedly clicking Submit or importing the same file while you are unsure of the result.

For a host installation, return to the cluster's task list. Do not start another store import just because the installation page was closed.

## The Page Says It Is Waiting {#recovery-actions}

If it is waiting for other tasks, open the details and see which tasks are still running. Wait for them to finish or ask the cluster administrator to handle them.

If maintenance is required, check the affected clusters before agreeing. If a Server restart is explicitly required, arrange it with the administrator and return to the original action afterward to check its result.

Retry, cancel, and recovery are not interchangeable. Use the action offered for the current problem; some actions are unavailable once changes have already taken effect. Do not delete Server files to force an action to disappear.

## Can Other People Keep Using Ambari? {#scoped-maintenance}

Usually, yes. A package change restricts the services and settings it affects while the change is in progress. Unrelated ordinary writes and tasks can continue.

Several clusters can share the same service setup. If an update affects them, the page lists that scope. It is not a separate private copy for every cluster.

## Does Updating A Package Upgrade My Software? {#different-change-types}

No. The service package contains instructions that tell Ambari how to install and manage a service.

| What you do | What it means |
| --- | --- |
| Import a newer bundle | Add package versions to the store |
| Select and apply a newer package | Change the instructions Ambari uses to manage the service |
| Edit and save a configuration | Save a configuration version; apply the required reload or restart afterward |
| Upgrade the application itself | A separate service-specific procedure, including any database migration |
| Remove a package | Subject to usage checks; not a request to delete host software or business data |

For example, importing a newer Kyuubi package does not automatically replace the Kyuubi software on your hosts.

Before a package update, read its change notes and affected-cluster list. Preserve your current configuration and back up application data as appropriate. Do not assume that switching a package back will reverse a database migration.

## Common Questions {#troubleshooting}

| Problem | What to do next |
| --- | --- |
| I cannot find the store entry | Sign in as an Ambari administrator and confirm the build includes this feature. The current menu is **Management Packs** |
| Import succeeded, but nothing is installed | Return to the catalog, select services and a destination, then finish the installation wizard |
| A service card is disabled | Read its reason. Change the selected services or destination to a compatible combination |
| The page says the previous preview is out of date | Once the previous submission is confirmed rejected, review the current selection and generate a new preview |
| Installation fails on one host | Open that task. Check the software download, Java/Python version, database connection, disk space, and permissions it reports |
| Saving configuration succeeded, but behavior did not change | Check whether the required restart or reload finished |
| A package cannot be removed | Check which services or clusters still use it; do not bypass the check by deleting files |
| A service is running, but charts have no data | Check the [monitoring setup and time range](../monitoring/queries-and-dashboards.md#workspace-interactions); installation alone does not add every service's metrics |

## What Should I Send When Asking For Help? {#report-evidence}

Include the service name, Ambari version, package version, what you clicked, and the full error message. For store problems, include the operation ID from its details. For installation or service problems, include the failed host and task ID.

For a configuration issue, include the relevant change and configuration version. Remove passwords, tokens, database secrets, and other credentials from text and screenshots.

Developers automating recovery can find the exact commands and result fields in [API and service integration](./authoring-and-bundling.md#operation-recovery-api).
