---
title: Choose A Service
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

# Choose A Service {#reference-service-catalog}

Choose a service based on what you want to run, then check its installation requirements below. The example store currently includes ten services.

This is a [preview](./overview.md). The list describes the tested example packages, not every mode supported by the upstream software.

## Available Services {#packages-and-software}

| Service | What it is for | Software in the example store |
| --- | --- | --- |
| Nginx | Web serving and reverse proxying | From the operating system's package repository |
| PostgreSQL | Relational data storage | From the operating system's repository; PostgreSQL 10 in the reference test |
| Kyuubi | A shared SQL entry point for Spark | 1.9.4 |
| Airflow | Scheduling and tracking workflows | 3.3.2 |
| Celeborn | Shuffle storage for computing jobs | 0.7.0 |
| DolphinScheduler | Building and scheduling data workflows | 3.1.9 |
| Trino | SQL queries across data sources | 483 |
| Doris | Analytical data storage and queries | 4.1.4 |
| Elasticsearch | Search and indexing | 9.5.4 |
| MinIO | S3-compatible object storage | `RELEASE.2025-10-15T17-29-55Z` |

Nginx, PostgreSQL, Airflow, Elasticsearch, and MinIO use the generic environment and do not need a Hadoop cluster simply to appear in the store. Kyuubi, Celeborn, DolphinScheduler, Trino, and Doris use the example BIGTOP environment. The page checks which services fit your destination; they cannot all be combined into any one cluster.

The store also contains a small foundation package. Ambari selects it when needed; it is not another application you need to run.

## What Do I Need Before Installing? {#topology-and-prerequisites}

| Service | Initial setup | Prepare first |
| --- | --- | --- |
| Nginx | One managed instance | A reachable OS package repository and a free port |
| PostgreSQL | One managed instance | OS packages, a persistent data directory, local management access, and backups |
| Kyuubi | Server and client components | Java 17, Spark 3.5/Scala 2.12, Hadoop clients, and ZooKeeper configuration |
| Airflow | One host, LocalExecutor | Python 3.11, a dedicated external PostgreSQL 14-18 database, and administrator details |
| Celeborn | One master and one or more workers | Java 17, the matching release archive, storage directories, and free ports |
| DolphinScheduler | Master, worker, API, and alert processes on one host | External PostgreSQL 14-18, ZooKeeper, Java 11 or 17, and administrator details |
| Trino | One coordinator, optional workers | Java 25 on every assigned host, the release archive, and data directories |
| Doris | One FE and one BE, on the same or separate hosts | ARM64 archive, Java 17, enough disk space, and explicit credentials |
| Elasticsearch | One node using HTTPS and authentication | Linux/ARM64 archive, the required OS settings, storage, and administrator credentials |
| MinIO | One server with a console | The specified source release, Go 1.24.8, access to build dependencies or a prepared cache, storage, and new root credentials |

**Airflow and DolphinScheduler need a newer PostgreSQL database than the PostgreSQL 10 instance in the example store.** Installing the PostgreSQL card is not enough for them.

Doris needs substantial temporary disk space: its archive is about 4.35 GB and expands to about 6.8 GB before you store any data. Leave room for both, plus previous installations and application data.

## A Few Things To Know About The First Installation {#service-initialization}

Airflow and DolphinScheduler need their own database space. Prepare an empty, dedicated database/schema and the right account. The installer initializes an eligible empty database and sets up the administrator; it does not take over someone else's existing data or automatically upgrade an existing schema.

Kyuubi uses an official binary distribution. Prepare compatible Spark and Hadoop dependencies before starting SQL engines.

Trino needs Java 25 even though Ambari itself uses Java 17. Its sample TPCH catalog is useful for a first query; connections to Hive, Iceberg, or other production data sources need your own configuration.

MinIO is built from the specified source release. The bundle does not contain a ready-made MinIO binary. Prepare the build environment and dependencies before installation; distributors also need to check upstream AGPL-3.0 requirements.

## How Do I Know It Works? {#service-checks}

After installation and startup, run the service check from its Ambari service page. Checks exercise basic service behavior, such as a Trino query, a Doris write/read, or a MinIO object upload/download and cleanup.

If the check fails, open its task details and correct the reported problem. A running process alone is not enough to show that a query or object request works.

A passed check confirms basic operation. It does not replace capacity testing, backup recovery testing, or a production security review.

## What Is Not Included Yet? {#limits-and-extension-work}

The first packages target single-server or small-cluster use. Airflow CeleryExecutor, distributed MinIO, Celeborn high availability, and Doris replication/cloud mode are not included. Editing a setting does not add the missing deployment support.

You can [edit full configuration files](./content-configuration.md) for all ten services. Monitoring support varies; seeing host CPU and memory charts does not mean every service has its own dashboard.

For the exact package revisions used in these examples, see the [source baseline](../release-baseline.md#runtime-mpack-follow-up).
