---
title: Ambari 3.1.0 Quick Start Guide
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

# Ambari 3.1.0 Quick Start Guide {#quick-start-guide-310}
Use this path to evaluate a reviewed Ambari 3.1.0 candidate on a small,
representative Linux environment. Version 3.1.0 is documented as a candidate,
so obtain artifacts through the reviewed project channel or build them from
source. There is no assumed public mirror, checksum, default credential, or
production certification in this guide.

## 1. Qualify The Environment {#qualify-the-environment}
Choose one supported candidate OS family and architecture for all hosts. The
default package target is Linux x86_64. Provide Linux Python 3.9.2 or later;
the default packaged ABI is CPython `cp39`. Rocky Linux 8 requires AppStream
`python39`, while a generic `python3` may select the wrong interpreter.

Install JDK 17 for Ambari. Choose and record a separate JDK for Stack services.
For the default cp39 RPM target, confirm the runtime tools:

```shell
java -version
/usr/bin/python3.9 --version
```
Keep hostname resolution, time synchronization, database connectivity, and
required service ports aligned with your security policy. Do not disable
firewall or SELinux controls as a shortcut.

## 2. Obtain Or Build {#obtain-or-build}
Maven 3.9.x and the Node/npm toolchains are required on the build host, not on
every runtime node. Use JDK 17 for the source build.

Use one reviewed candidate set for Server and Agent. A source RPM build is:

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm \
  -Dbuild.os_arch=x86_64
```
An offline Python wheelhouse can be supplied with
`-Dpython.wheelhouse=/srv/build/wheelhouse`; it must contain all locked
artifacts. Maven and frontend dependencies require separate caches or mirrors.
See [Download](./download.md) for artifact inspection and architecture rules.

## 3. Install And Configure {#install-and-configure}
Install the Server package on the management host and the Agent package on each
managed host from the same reviewed repository. The RPM bundles private Python
libraries, so target nodes do not run `pip install`.

On Rocky/RHEL, install through DNF so approved repositories can resolve
dependencies. Run the Server command on the management host and the Agent
command on managed hosts:

```shell
sudo dnf install /path/to/ambari-server-*.rpm
sudo dnf install /path/to/ambari-agent-*.rpm
```
Create the empty Ambari metadata database and service account with the
administrator-approved database procedure. Enter connection details only at
the setup prompt or through the supported secret handling; do not put them in
this document or shell history.

Set the two Java boundaries explicitly when needed:

```shell
sudo ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
```

## 4. Start And Enroll {#start-and-enroll}
Provision the Server CA and enrollment trust material through the approved
bootstrap process. The Agent must verify the Server identity and fail closed
when its CA is absent or incorrect; no `DEV` fallback is supported.

```shell
sudo ambari-server start
sudo ambari-agent start
```
Open the React Ambari interface, confirm the Agent heartbeat and host
registration, then run a controlled service check. Correct failed host or trust
configuration and retry from the current server state.

## 5. Connect Monitoring {#connect-monitoring}
For monitoring, install the reviewed `ambari-metrics` package and matching
VictoriaMetrics/VMAGENT deployment. Agents expose host `/metrics` and stable
component routes. VMAGENT discovers, scrapes, and remote-writes to
VictoriaMetrics; Ambari's protected proxy serves Prometheus-compatible queries
to React dashboards. Validate exporter health, discovered targets, storage,
datasource connectivity, and role authorization.

This path replaces legacy AMS/Ganglia guidance. It does not import old AMS
history or convert old dashboard layouts automatically.

## 6. Record Results {#record-results}
Record candidate revision, package architecture, OS/Python ABI, both JDK paths,
database backup location, enrollment method, and monitoring validation. Keep a
rollback package and metadata backup before experimenting with Stack services.
For upgrade planning, see [Planning the 3.1.0 upgrade](../upgrade-guide.md).

The procedures and options above reflect source commit
`4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4`; the Java baseline reference is
`94c6389a96b38bccef0b6a08269481a086b63ca1`.
