---
title: Import A Store And Deploy Services
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

# Import A Store And Deploy Services {#import-store-deploy-services}

This walkthrough uses the [runtime mpack preview](./overview.md). Obtain the reviewed bundle from the distributor of your matching development build, or [build it from the reference repository](./authoring-and-bundling.md).

## Before You Start {#before-you-start}

Have an administrator account, an enabled runtime mpack API, compatible Server/Agent builds, and a bundle whose digest you can verify. Prepare reachable software sources, required databases, Java/Python runtimes, writable data directories, and available ports for the services you intend to select. Read the [service matrix](./service-catalog.md) before assigning hosts.

Record the current package versions, affected cluster configurations, and data backup arrangements before replacing active definitions. A definition archive is not a data backup.

## Open Management Packs {#open-management-packs}

From a cluster workspace, use **Management Packs** near the top of the sidebar, below the Ambari brand and global Clusters entry. From a global directory, use **Management Packs** in the top navigation.

The page has **Service catalog**, **Imported packages**, and **Activity** sections. The right-hand selection panel stays with the catalog as you browse. **Return to workspace** restores the cluster page you left, including its URL parameters.

![Management pack catalog with grouped services, version selectors, a selection panel, and return navigation](@site/static/img/3.1.0/mpack-store/catalog-dark.jpg)

This development capture uses the Chinese UI and dark appearance. Host names, counts, and displayed versions describe the captured test environment.

## Import The Bundle {#import-the-bundle}

1. Select **Import bundle** to open the upload dialog.
2. Choose `mpackstore.bundle.tar.gz`. Wait for inspection to identify its member packages.
3. Review the members, then select **Import Packages**. The complete-store import includes all inspected members.
4. Follow the operation in **Activity**. Keep its operation ID if the browser or network disconnects.
5. Return to **Service catalog** after the import succeeds.

Import registers the packages without binding their definitions, running activation hooks, or deploying software on hosts. The default upload contract limits the compressed archive to 256 MiB, expanded contents to 1 GiB, and entries to 100,000; confirm the limits of the actual Server build.

Do not place multi-gigabyte runtime distributions inside the store merely to make installation offline. Use the runtime repository/cache preparation described by each service.

## Select One Version Per Service {#select-one-version}

Search by service or package and narrow the environment selector when useful. The catalog groups entries by service and exact Stack context; versions for that group appear in one selector instead of duplicate cards.

The default prefers a currently enabled definition. Other numeric definition versions are ordered by version, but a newer number is not a certification of compatibility or runtime upgrade support. Review the package's release information before switching.

Check the service to add it to **Selected services**. Changing its version replaces that group's selected provider. The selection panel shows the actual package release, not just the software name. Remove an unwanted service there.

Services incompatible with the current selection or chosen destination are disabled with an explanation. Clear or change the selection to choose a different environment. Filtering the catalog does not silently remove already selected services.

## Choose A Destination {#choose-a-destination}

Select **New cluster** or an existing compatible cluster in **Deploy To**, then use **Continue With Selected Services**.

The Server derives required providers and bindings. A plan may require maintenance or restart confirmation; inspect its affected clusters and requirements. A straightforward enable operation can proceed without an extra confirmation dialog. Both paths still produce a durable operation.

**Definitions enabled** describes management-definition availability. It does not mean that the service is already installed and running on a host.

## Complete The Deployment {#complete-the-deployment}

After a verified successful enable operation, use the offered **Create cluster** or **Add Services to Cluster** action. In the wizard:

1. Confirm the selected services and dependencies.
2. Assign components to eligible hosts.
3. Enter required credentials, database endpoints, software locations, and configuration.
4. Review the assignments and start installation.
5. Inspect install/start tasks and service checks, then open the service Summary and Configs pages.

Treat an installation task failure separately from a package-operation failure. The operation ID and the deployment request/task IDs identify different workflows; retain both when diagnosing a problem.

## Recover Without Duplicating Work {#recover-without-duplicates}

If submission acceptance is uncertain, use the page's reconciliation action. It reuses the retained plan/submission identity rather than assuming that a timeout means nothing happened.

If a plan has expired or its inputs changed and acceptance was definitively rejected, create a fresh preview. If the operation is waiting on tasks or maintenance, inspect the exact blockers before retrying. Do not repeatedly upload the same bundle to recover a host installation failure.

See [operations and recovery](./operations-and-recovery.md) for phase meanings, CLI inspection, and recovery restrictions.
