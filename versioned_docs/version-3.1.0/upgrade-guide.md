---
title: Planning The 3.1.0 Upgrade
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

# Plan The 3.1.0 Upgrade {#plan-the-310-upgrade}

| Area | Pre-upgrade checks |
| --- | --- |
| Source and package provenance | Use one reviewed candidate containing the [documented baseline](./release-baseline.md), and verify its artifacts |
| Ambari Java | Build on JDK 17; select an Ambari runtime satisfying the new Java checks |
| Stack Java | Record the independently selected JDK and each service's compatibility requirements |
| Python | Check the minimum version, actual executable, and packaged native-extension ABI |
| Architecture | Keep RPM headers, Python wheels, and VictoriaMetrics binaries on the same target architecture |
| Database | Back up metadata, configuration, credentials/keystores, and the restore procedure |
| Monitoring | Inventory AMS data, widgets, integrations, legacy service records, and the new retention/capacity plan |
| Browser/authentication | Validate React entry points, reverse-proxy paths, local/SSO login, and role permissions |

On Rocky 8, do not assume the system's generic `python3` executable is Python 3.9. The [runtime guide](./platform/python-runtime.md) and [packaging guide](./platform/rpm-packaging.md) describe the interpreter and ABI contract.

The removal of old AMS Stack definitions is not itself cleanup of every existing cluster record. Qualify the legacy service inventory against the target build and use the supported migration procedure; do not invent manual database deletions to make startup succeed.

## Maintenance Window {#maintenance-window}

1. Rehearse the candidate on a representative copy of the environment. Record normal startup, an interrupted operation, and rollback.
2. Preserve a consistent database/configuration/package backup and stop Ambari Server according to the maintenance plan. Keep application service shutdown decisions separate from the management-server upgrade.
3. Upgrade Server and Agent packages from the approved repository for the selected architecture. Do not copy only a React `dist` directory or overlay old private Python libraries onto the new package.
4. Configure Ambari and Stack Java homes independently. If configuration is required, the setup interface supports the following separate paths; replace them with installed JDK locations:

```shell
ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
```

5. With Server stopped and the database backup available, run the candidate's metadata upgrade:

```shell
ambari-server upgrade
```

6. Resolve any schema/configuration errors before starting Server. Start Server and Agents using the installed service entry points, then confirm host registration and command execution.
7. Install/configure VictoriaMetrics and VMAGENT, validate discovery and queries, and recreate custom monitoring definitions.
8. Complete the acceptance checks below before returning the environment to normal change activity.

The 3.1 catalog establishes the new monitoring metadata tables. It does not import AMS historical samples or automatically convert old widget layouts.

## Acceptance Checks {#acceptance-checks}

- Confirm Server starts without mixed Java framework/provider errors, and both Ambari and service JDK choices are correct.
- Verify every Agent runs through its wrapper with the expected Python minor ABI and can import its packaged dependencies.
- Execute a controlled service check and inspect its background request/task logs.
- Open Hosts, retain filters while moving between list and detail, and confirm component summaries.
- Read, edit, validate, and save a representative configuration using both a writable role and a read-only role.
- Validate Kerberos/HA workflows relevant to the deployed topology, including cancellation, refresh, and owner recovery.
- Check metadata/data backups and rollback readiness before initiating a separate Stack upgrade.
- Verify exporter health, independently discovered component targets, storage delivery, datasource connection, dashboard queries, and role-based monitoring access.
- Confirm that an existing browser preference does not unintentionally keep users on Classic when the deployment requires React.

The repository contains static tests and selected runtime evidence. Those do not substitute for these environment-specific acceptance checks.

## Rollback {#rollback}

A rollback must restore a consistent metadata database, configuration, and compatible package set. A package downgrade alone cannot undo all schema, private-library, and dashboard-model changes. Preserve the old monitoring read path as required by retention policy, and treat VictoriaMetrics storage and VMAGENT queue recovery separately.

## References {#references}

See [JDK separation](https://github.com/apache/ambari/commit/821de739a11b34b06a45fab6dc8aaa6f703783e8), [Python/package modernization](https://github.com/apache/ambari/commit/daf7576fb67edbde6b53fa52c9d23f918f23f817), and the pinned [3.1 upgrade catalog](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/upgrade/UpgradeCatalog310.java).
