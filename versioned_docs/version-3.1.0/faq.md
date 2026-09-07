---
title: Frequently Asked Questions (FAQ)
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

# Frequently Asked Questions (FAQ) {#frequently-asked-questions-faq}

This page answers common questions about Apache Ambari 3.1. For documented behavior, follow the linked platform, monitoring, frontend, upgrade, and development guides rather than older 3.0 setup examples.

## What runtime does 3.1 require? {#what-runtime-does-31-require}

Ambari helpers build and run with JDK 17 and Maven 3.9.x. Linux packages target CPython 3.9 (`cp39`) on the selected platform ABI; the packaged private libraries must not be replaced with a runtime `pip install`. See [Python Runtime](./platform/python-runtime.md) and [Java Dependencies](./platform/java-dependencies.md).

## Which Python is used to build Ambari? {#which-python-is-used-to-build-ambari}

The source-level interpreter requirement and the native-extension ABI in a packaged RPM are separate contracts. Verify the executable selected by the build and use the matching `cp39` wheel target. On Rocky Linux 8, do not assume generic `python3` is Python 3.9.

## Which UI is supported? {#which-ui-is-supported}

Ambari 3.1 uses `ambari-web/latest` as the primary React UI. The `/latest/#` entry point, authentication, permissions, Hosts, Services, Configs, Alerts, Kerberos, HA, upgrades, Views, Themes, and monitoring workflows are covered by the [React User Guide](./frontend/react-ui.md). Classic Ember is a migration comparison, not the 3.1 operating path.

## Why can I see a page but not change it? {#why-can-i-see-a-page-but-not-change-it}

Read access and mutation access are separate. Cluster, host, service, datasource, dashboard, and administration operations use distinct permission checks. A direct URL does not grant a missing permission; test the actual role and API authorization response.

## What changed in monitoring? {#what-changed-in-monitoring}

The native monitoring area uses Prometheus-compatible discovery, VMAGENT, VictoriaMetrics, datasources, PromQL, targets, and dashboards. The [monitoring migration guide](./monitoring/migration.md) explains that new metadata tables do not import AMS history or convert old widget layouts. Plan archives and custom query rewrites separately.

## How do I qualify a 3.1 candidate? {#how-do-i-qualify-a-31-candidate}

Use the [upgrade guide](./upgrade-guide.md) to separate Ambari package/UI/database changes, Stack service changes, and monitoring cutover. Verify artifact provenance, Java/Python ABI, database backup, browser/authentication paths, and the real topology before maintenance.

## How should I troubleshoot a failed operation? {#how-should-i-troubleshoot-a-failed-operation}

Inspect the persisted background request, task logs, component state, and owner before retrying. Refresh and server restart recovery restore checkpoints where available; they do not justify resubmitting completed work. For monitoring, distinguish discovery, scrape, remote-write, storage, datasource, and dashboard failures.

## Where are test reports? {#where-are-test-reports}

Java reports are under `ambari-server/target/surefire-reports/` and `ambari-server/target/failsafe-reports/`; Python results and coverage are under `ambari-server/target/python-test-results/` and `ambari-server/target/python-coverage/`. Website `yarn test:i18n` and browser checks are separate from Ambari product acceptance. See [Unit Test Reports](./ambari-dev/unit-test-reports.md).
