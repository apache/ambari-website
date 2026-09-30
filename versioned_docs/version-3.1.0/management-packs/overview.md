---
title: Service Store
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

# Service Store {#mpack-store-overview}

Want Ambari to manage Nginx, PostgreSQL, Kyuubi, or another service? Import a service bundle, choose what you need, and follow the installation wizard. After installation, use the service page to start or stop it, edit its configuration, and check its health.

You do not need to write scripts or call an API to use the store.

:::info Before you try it
The service store described here is a 3.1 preview feature. Your Ambari installation must include it. Ask the person who provides your Ambari build for a matching service bundle. See the [version details](../release-baseline.md#runtime-mpack-follow-up) if you need to check compatibility.
:::

## What Can I Install? {#store-contents}

The current example store includes ten services:

| What you want to do | Services to consider |
| --- | --- |
| Serve web pages or forward requests | Nginx |
| Run a relational database | PostgreSQL |
| Provide a SQL entry point for Spark | Kyuubi |
| Schedule data jobs | Airflow, DolphinScheduler |
| Support shuffle storage for computing jobs | Celeborn |
| Query data across sources | Trino |
| Run analytical queries | Doris |
| Search and index data | Elasticsearch |
| Store objects through an S3-compatible API | MinIO |

Start with [available services and preparation](./service-catalog.md). Each service has its own requirements; some need an existing database or a particular Java version.

## How Do I Get Started? {#end-to-end-flow}

1. **Import the bundle.** Its services become available to choose from.
2. **Choose your services.** You can install only what you need; importing does not install everything.
3. **Choose a cluster and hosts.** Add services to a compatible existing cluster, or create a new one.
4. **Fill in the configuration and install.** Wait for installation and startup, then run the service check.

For example, to add Nginx, import the bundle, select Nginx, choose its destination, assign a host, and follow the wizard. The [installation walkthrough](./store-guide.md) explains each step.

The bundle teaches Ambari how to install and manage these services. The actual software may still need to be downloaded during installation. For a network without Internet access, ask your administrator to prepare the software sources first.

## Where Do I Open It? {#administration-and-scope}

Sign in with an Ambari administrator account. In the cluster sidebar, near the top, open **Management Packs**. The current Chinese console calls it **管理包**. This documentation calls the feature **Service Store**; the console label has not changed yet.

If you are on the cluster directory page, use the same entry in the top navigation. To go back to the cluster page you left, choose **Return to workspace**.

The store is shared by the clusters on this Ambari Server. When updating a package, read the list of affected clusters before continuing.

## What Should I Read Next? {#reading-paths}

- [Install a service](./store-guide.md): import, select, and finish the installation wizard.
- [Choose a service](./service-catalog.md): check what it does and what you need to prepare.
- [Edit configuration files](./content-configuration.md): change, save, and apply settings.
- [Fix problems and manage updates](./operations-and-recovery.md): find the right place to check a failure.
- [Add a service, step by step](./add-service-tutorial.md): build, import, and test a complete example.
- [API and service integration](./authoring-and-bundling.md): for developers writing tools or adding a service.
- [How the store works](./implementation.md): for developers who want to understand the design.

## What Is Supported Today? {#current-boundaries}

These first service packages focus on installation, configuration, start/stop, and basic health checks. Do not assume that high availability, automatic failover, or automatic software upgrades are included. The reference test environment is Rocky Linux 8 on ARM64; check the service requirements before using another platform.

Installing a service also does not automatically add its monitoring charts. For dashboard usage, see the [monitoring guide](../monitoring/queries-and-dashboards.md#workspace-interactions).
