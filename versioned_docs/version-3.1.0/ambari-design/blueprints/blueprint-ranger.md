---
title: Blueprint Support For Ranger
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

# Blueprint Support For Ranger {#blueprint-support-for-ranger}

## Stack Advisor Workflow {#ranger-stack-advisor-workflow}

Use the installed BIGTOP Ranger Stack and Stack Advisor to fill derived Ranger and plugin settings. The Blueprint or cluster template must still provide required values that cannot be inferred, especially database connectivity and administrator credentials. Do not copy credentials into documentation or source-controlled Blueprint examples.

For Ranger Admin, review `admin-properties`: `DB_FLAVOR`, `db_host`, `db_root_user`, `db_root_password`, `db_password`, and `audit_db_password`. The selected database requires the matching JDBC driver on Ambari Server.

For Ranger plugins, review `ranger-env`, including `ranger_admin_password` and the plugin enablement properties such as `ranger-yarn-plugin-enabled`, `ranger-hdfs-plugin-enabled`, and `ranger-hbase-plugin-enabled`. Enable only plugins required by the deployed services.

For Ranger KMS, review `kms-properties` and the KMS service configuration. Required fields include the database flavor, connector JAR, master-key password, database host, and database credentials. Use the corresponding `RANGER_KMS` Stack service available in the selected BIGTOP Stack.

## Required Configuration And Order {#ranger-required-configuration-and-order}

1. Confirm the selected Stack provides Ranger, Ranger KMS, and the required plugin configuration types.
2. Provide database host/port, database names/users, and required password properties through protected Ambari configuration input.
3. Install the JDBC driver on Ambari Server before Stack Advisor evaluates the database choice.
4. Set plugin enablement deliberately, then allow Stack Advisor to generate dependent properties.
5. Review the recommended configuration and create the cluster only after unresolved required properties are fixed.

Without Stack Advisor, every Ranger, Ranger KMS, and enabled-plugin property without a valid default must be supplied explicitly in the Blueprint or cluster template. This is more fragile across Stack versions; prefer advisor-backed configuration and verify the generated result.

## Source References {#ranger-source-references}

The current service implementation is in the pinned [BIGTOP Ranger Stack](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.3.0/services/RANGER) and [Ranger service advisor](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.3.0/services/RANGER/service_advisor.py). Select the service path matching the installed BIGTOP version (3.2.0, 3.3.0, or 3.4.0).
