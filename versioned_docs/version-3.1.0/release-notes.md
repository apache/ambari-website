---
title: Apache Ambari 3.1.0 Release Notes
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

# Apache Ambari 3.1.0 Release Notes {#release-notes}

Apache Ambari 3.1.0 brings a new monitoring architecture, a React-based primary interface, and a modernized Java, Python, and RPM foundation. It is the next feature release after 3.0.0, not a 3.0.x maintenance update. Existing installations need to plan the monitoring transition and runtime changes together with the Server and Agent upgrade.

These notes describe the **3.1.0 preview**. The documented feature set includes monitoring PR #4182 and the community changes in the reviewed source baseline. Release artifacts, a final release date, and a qualified upgrade matrix are not announced by this page.

## Release Highlights {#release-highlights}

### Monitoring Rebuilt Around Prometheus-Compatible Collection {#monitoring-rebuilt}

The new monitoring system **replaces AMS**. The previous AMS Monitor, Collector, and HBase-backed storage path gives way to Agent telemetry endpoints, VMAGENT collection, and VictoriaMetrics time-series storage. This separates component integration, collection, storage, and visualization instead of treating monitoring as one Collector deployment.

Ambari Server compiles Stack telemetry descriptors and typed JMX profiles into per-host assignments. Agents expose Linux host metrics and independently assigned component endpoints. VMAGENT discovers targets from Ambari, scrapes them, and sends samples to VictoriaMetrics through remote write. Native Prometheus endpoints and typed JMX conversion let services join the same collection pipeline without implementing an AMS-specific sink.

VictoriaMetrics can run with a single storage process or separate write, storage, and query components; VMAUTH is an optional gateway. The React monitoring interface provides datasource management, PromQL exploration, scrape-target status, and dashboards with editing, import, export, and cloning. Browser queries pass through Ambari's authorization boundary rather than requiring direct access to the storage service.

For operators, the practical changes are independent storage sizing, explicit target visibility, and a shared query model across host and service metrics. Existing metric names, custom queries, and dashboards need review: this is not an AMS configuration toggle. Agent telemetry endpoints also need network access controls because the exporter does not provide application-level authentication.

Implementation: [#4182](https://github.com/apache/ambari/pull/4182). See the [architecture comparison](./monitoring/architecture-comparison.md), [module architecture](./monitoring/architecture.md), [deployment guide](./monitoring/deployment.md), and [queries and dashboards](./monitoring/queries-and-dashboards.md).

### React Becomes The Primary Interface {#react-primary-interface}

Ambari Web selects the React application by default. The implementation carries forward cluster installation, Hosts, Services, configuration editing, background operations, Alerts, Kerberos, high availability, Stack upgrades, Views, and administration workflows. The Admin application is also packaged as a separate React module. The migration is broader than a visual refresh: routing, permissions, asynchronous requests, progress reporting, and workflow recovery are part of the implementation.

Monitoring uses the new datasource and dashboard model. Legacy AMS/Ganglia widgets and the old standalone Heatmaps experience are not compatibility targets; 3.1.0 documentation no longer presents Ember or AMS tutorials as current operating procedures. Representative roles, authentication modes, custom Stacks, and recovery paths still require validation against the release candidate.

Default entry and packaging: [#4198](https://github.com/apache/ambari/pull/4198). See the [React user guide](./frontend/react-ui.md) for workflow coverage and acceptance boundaries.

### Java Baseline And Independent JDK Selection {#java-baseline}

Source builds require **JDK 17 and Maven 3.9.x**, enforced by Maven. Shared dependency management updates the Spring/Spring Security, Jetty, Jersey, Guice, logging, persistence, and Jakarta API foundations. These changes also require reviewing custom Java extensions and their transitive dependencies; replacing the JDK alone is not a complete migration.

Ambari and the managed Stack can use separate JDK installations. Setup supports `--ambari-java-home` and `--stack-java-home`; the legacy `--java-home` option remains a deprecated alias. Ambari helpers require JDK 17 or later, while each Stack service must use a JDK supported by that service. Build-time Java 17 enforcement is distinct from runtime checks.

Implementation: [#4188](https://github.com/apache/ambari/pull/4188), [#4189](https://github.com/apache/ambari/pull/4189). See [Java dependencies](./platform/java-dependencies.md) for managed versions and migrations that remain deferred.

### Python Dependencies Move To Upstream Distributions {#python-modernization}

Ambari removes maintained-in-tree copies of old third-party Python libraries from its runtime dependency model. Locked upstream distributions replace the vendored APScheduler, Jinja2, STOMP/WebSocket, and cryptography libraries. Standard-library APIs replace simplejson, mock, and the standalone pbkdf2 implementation. Ambari's own Agent and Server Python code remains part of the project.

The source minimum is **Python 3.9.2**. Default packages target CPython 3.9 and its native-extension ABI; a newer Python minor version is not automatically compatible with those packages. Dependencies are prepared into private Ambari libraries during the build, so cluster nodes do not install them from a Python package index at startup.

Implementation: [#4198](https://github.com/apache/ambari/pull/4198). See [Python runtime](./platform/python-runtime.md) for interpreter selection, dependency versions, and ABI requirements.

### RPM Packaging Becomes Explicit About ABI And Provenance {#rpm-packaging}

Python package assembly uses hash-locked artifacts, platform/ABI selection, metadata and license checks, and SBOM generation. The build cleans dependency staging directories before assembly to avoid carrying stale libraries into a new RPM. CPython 3.10 and ARM64 use separate targets; the existence of a build profile does not certify every operating-system and architecture combination.

Monitoring is packaged separately for the VictoriaMetrics provider. The retained `ambari-metrics` module name does not mean that the legacy AMS implementation remains the monitoring backend. Ambari RPM versions and the VictoriaMetrics provider version are independent. An offline Python wheelhouse covers Python artifacts only; fully offline builds also need Maven, npm, and provider-download caches or mirrors.

See [RPM packaging](./platform/rpm-packaging.md) for build commands and artifact inspection, and [building from source](./ambari-dev/building-from-source.md) for the complete build environment.

## Community Improvements {#selected-community-changes}

### Cluster Operations And Configuration {#cluster-operations}

- **Cluster startup:** prevent auto-recovery from blocking cluster-wide start operations. [#4187](https://github.com/apache/ambari/pull/4187).
- **Installation and service actions:** correct multiple issues in the cluster installation wizard and host/service workflows. [#4201](https://github.com/apache/ambari/pull/4201).
- **Capacity Scheduler:** use the combined configuration editor format and prompt for Refresh YARN Queues after a successful change. [#4204](https://github.com/apache/ambari/pull/4204).
- **Configuration propagation:** improve propagation of configuration and configuration-group changes on large clusters. [#4135](https://github.com/apache/ambari/pull/4135).

### Host And Service Workflows {#host-service-workflows}

- **Hosts navigation:** retain host selection across navigation and refresh, correct empty-list pagination, and restore component loading when Host Summary is opened from the Hosts List. Hosts-module filters reset when leaving that module. [#4202](https://github.com/apache/ambari/pull/4202), [#4203](https://github.com/apache/ambari/pull/4203).
- **UI state and requests:** reduce redundant polling, stale service state, and stuck connection-test requests. [#4177](https://github.com/apache/ambari/pull/4177), [#4178](https://github.com/apache/ambari/pull/4178).
- **HDFS and YARN:** add Observer NameNode support in React and refresh rack mappings after DataNode or NodeManager installation. [#4181](https://github.com/apache/ambari/pull/4181), [#4139](https://github.com/apache/ambari/pull/4139).
- **Stack integration:** add HBase Thrift component support, update BIGTOP 3.4.0 service versions and architecture-aware builds, and preserve Ranger JDBC drivers when Ranger and Ambari share a host. [#4122](https://github.com/apache/ambari/pull/4122), [#4078](https://github.com/apache/ambari/pull/4078), [#4040](https://github.com/apache/ambari/pull/4040), [#4043](https://github.com/apache/ambari/pull/4043).

### Authentication And Sensitive Data Handling {#security-improvements}

- **LDAP and Kerberos:** correct LDAPS compatibility with Python 3 and newer Java runtimes, and clean up Kerberos file descriptors. [#4151](https://github.com/apache/ambari/pull/4151), [#4124](https://github.com/apache/ambari/pull/4124).
- **Configuration and command artifacts:** fix exposure of Stack-root configuration passwords and remove executed-command JSON files. [#4086](https://github.com/apache/ambari/pull/4086), [#4045](https://github.com/apache/ambari/pull/4045).
- **Hive startup:** remove an unsafe metatool invocation during HiveServer2 startup. [#4127](https://github.com/apache/ambari/pull/4127).

## Upgrade Impact {#upgrade-impact}

| Area | Required action |
| --- | --- |
| AMS history and custom dashboards | Plan historical-data retention separately. Metadata upgrade does not import AMS samples or convert old widget layouts. Recreate queries and dashboards for the new model. |
| Custom service metrics | Implement telemetry descriptors and typed JMX profiles where needed. Retained direct-JMX management properties are not a replacement for the time-series integration contract. |
| Java and extensions | Select Ambari and Stack JDKs independently; validate custom extensions against the new dependency baseline. |
| Python and RPMs | Match the interpreter minor ABI and target architecture to the package. Do not overlay old private libraries onto the new installation. |
| React access | Validate proxy paths, login/SSO, permissions, Views, and persisted browser preferences against the new primary entry point. |
| Database and rollback | Back up metadata and configuration before schema upgrade. A package downgrade alone does not reverse schema or monitoring-model changes. |

### Prepare The Upgrade {#prepare-the-upgrade}

1. Rehearse the selected candidate on a representative environment, including failed operations and rollback.
2. Back up the metadata database, configuration, credentials/keystores, and the compatible package set.
3. Upgrade Server and Agent together with their required runtime configuration; run the supported metadata upgrade during the maintenance window.
4. Deploy the new monitoring components, verify target discovery and storage delivery, and validate dashboard queries and access permissions.
5. Check service actions, configuration saves, host registration, and the HA/Kerberos workflows used by the cluster before returning to normal operation.

Use the [upgrade guide](./upgrade-guide.md) and [AMS migration guide](./monitoring/migration.md) for the detailed sequence and compatibility boundaries. The Ambari release number, BIGTOP Stack version, and VictoriaMetrics version remain independent; upgrading Ambari does not select a new Stack version for every service.

## Release Scope And Validation {#release-scope}

The reviewed source baseline covers 181 commits reachable after the 3.0.0 source tag, plus the intended monitoring baseline from PR #4182. The entries above group user-visible changes rather than treating every merge, dependency update, or test change as a separate feature. Exact revisions and source references are recorded in the [source baseline](./release-baseline.md).

Website builds and browser tests validate these documents, not cluster upgrade compatibility. Final publication must record the selected release tag, signed artifacts, supported package targets and upgrade paths, and candidate acceptance results. Until then, these notes remain preview documentation rather than a claim of completed release qualification.
