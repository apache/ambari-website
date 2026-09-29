---
title: Reference Service Catalog
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

# Reference Service Catalog {#reference-service-catalog}

This matrix describes the separate reference store at `c10a271` for the [runtime mpack preview](./overview.md). The package versions come from `release.json`. They are definition versions, independent of the upstream software and of Ambari's own version.

## Packages And Software {#packages-and-software}

| Package | Definition version | Software baseline | Environment |
| --- | --- | --- | --- |
| generic-base | `1.0.0.3` | Foundation definitions, no application | `GENERIC/1.0` |
| nginx | `1.0.1.1` | OS repository package | `GENERIC/1.0` |
| postgresql | `1.0.1.1` | OS repository package; reference deployment uses PostgreSQL 10 | `GENERIC/1.0` |
| kyuubi | `1.0.1.0` | Apache Kyuubi 1.9.4 | `BIGTOP/3.3.0` |
| airflow | `1.0.1.0` | Apache Airflow 3.3.2 | `GENERIC/1.0` |
| celeborn | `1.0.1.0` | Apache Celeborn 0.7.0 | `BIGTOP/3.3.0` |
| dolphinscheduler | `1.0.1.0` | Apache DolphinScheduler 3.1.9 | `BIGTOP/3.3.0` |
| trino | `1.0.1.0` | Trino 483 | `BIGTOP/3.3.0` |
| doris | `1.0.1.0` | Apache Doris 4.1.4 | `BIGTOP/3.3.0` |
| elasticsearch | `1.0.1.0` | Elasticsearch 9.5.4 | `GENERIC/1.0` |
| minio | `1.0.1.0` | MinIO `RELEASE.2025-10-15T17-29-55Z` | `GENERIC/1.0` |

The foundation is pulled in as a package dependency; it is not an extra application to deploy. Nginx and PostgreSQL do not require a Hadoop installation. A generic service and a BIGTOP service cannot be combined into an arbitrary single environment just because both are in the bundle.

## Topology And Prerequisites {#topology-and-prerequisites}

| Service | Initial topology | Prepare before installation |
| --- | --- | --- |
| Nginx | A managed server instance | OS packages, configuration/include paths, and a free managed listener |
| PostgreSQL | A managed database instance | OS packages, persistent data directory, local management access, and backups |
| Kyuubi | Server and client definitions | JDK 17, compatible Spark 3.5/Scala 2.12 binaries, Hadoop clients and ZooKeeper configuration |
| Airflow | One server host using LocalExecutor | Python 3.11 and an external PostgreSQL 14-18 database, database user and administrator inputs |
| Celeborn | One master and one or more workers | JDK 17, pinned official archive, storage paths and role ports |
| DolphinScheduler | One host supervising master, worker, API and alert processes | External PostgreSQL 14-18, ZooKeeper, Java 11 or 17, and administrator inputs |
| Trino | One coordinator, optional workers | Java 25 on every assigned host, pinned archive, node/data paths and ports |
| Doris | Exactly one FE and one BE, together or separate | ARM64 archive, Java 17, data directories, sufficient temporary/extracted disk space and explicit credentials |
| Elasticsearch | One authenticated HTTPS node | Official Linux/ARM64 archive, kernel/OS prerequisites, data directory and protected administrator input |
| MinIO | One source-built server and console | Pinned source, Go toolchain 1.24.8, module access/cache, persistent storage and new root credentials |

The PostgreSQL 10 reference service does not satisfy the Airflow or DolphinScheduler PostgreSQL 14-18 requirement. Prepare a suitable external database rather than assuming that installing the PostgreSQL card completes those prerequisites.

Doris's recorded archive is about 4.35 GB and expands to about 6.8 GB before service data. Check free space for download, extraction, previous installations, metadata, and application data; the store bundle's size is not a sizing estimate.

## Service-specific Initialization {#service-initialization}

**Airflow:** installation creates an isolated Python environment, initializes only an empty dedicated database, and verifies administrator provisioning. Existing schemas are checked rather than automatically upgraded. The declared `INITIALIZE_DATABASE` and `CREATE_ADMIN` actions remain available for explicit recovery. Verify the dedicated health workflow. The first pack fixes LocalExecutor; selecting another executor in a file does not provide Celery workers or a broker deployment.

**DolphinScheduler:** the managed pseudo-cluster uses an external persistent PostgreSQL schema and ZooKeeper. It does not use the upstream standalone in-memory H2/testing-ZooKeeper path. Empty-schema ownership, initialization, and administrator setup are part of the managed lifecycle. Do not reuse a nonempty foreign schema as an initialization target.

**Kyuubi:** the pack pins the official binary and can wrap it into a compatible RPM using the provided packaging tool. It does not build Kyuubi from source during the normal binary packaging path. Configure matching Spark/Hadoop dependencies before starting engines.

**Trino:** Java 25 is a service-specific prerequisite even though Ambari's own Java baseline is 17. The supplied TPCH catalog is for verification. Hive, Iceberg, authentication, TLS and production resource groups need explicit configuration and validation.

**MinIO:** the current reference is installable from its pinned source build; the earlier non-installable draft is superseded. The build verifies source and reproduced binary digests. The management definition does not redistribute the MinIO binary inside the store; inspect the upstream AGPL-3.0 licensing and source distribution requirements for your distribution.

## What Service Checks Establish {#service-checks}

Checks use service-native observations. Representative examples include a verified Kyuubi engine/session operation, an Airflow health DAG result, registered Celeborn workers, authenticated DolphinScheduler processes, a Trino TPCH query, a Doris temporary table write/read, Elasticsearch authenticated cluster checks, and a MinIO object write/read/cleanup.

Temporary test resources belong to the specific execution. A process existing, a successful download, or a command exiting zero is not sufficient evidence for every check. Inspect the Ambari request/task result and the service's structured observations.

A passed basic check does not prove HA, security hardening, backup restoration, production capacity, or arbitrary connector compatibility.

## Limits And Extension Work {#limits-and-extension-work}

The reference first releases do not promise HA or automatic failover. Airflow CeleryExecutor, distributed MinIO storage, Celeborn HA, Doris replication/cloud mode, automatic schema upgrades, and production connector integration require separate implementation and acceptance.

Stopping a service or retiring its definition is not a request to delete persistent user data. Removal can still be blocked by active uses. Review [operation semantics](./operations-and-recovery.md) before changing bindings.

All ten service packs expose [editable configuration documents](./content-configuration.md). Dedicated service telemetry remains a separate capability; Linux host metrics alone do not establish service-level monitoring coverage.
