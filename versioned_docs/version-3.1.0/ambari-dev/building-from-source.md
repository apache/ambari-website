---
title: Building from Source
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

# Building Apache Ambari from Source {#building-apache-ambari-from-source}

![Apache Ambari Maven, Java, Python, React, testing, and RPM build pipeline](/img/3.1.0/handdrawn/build-pipeline-en.webp)

## Prerequisites {#prerequisites}

Use JDK 17 and Maven 3.9.x. Ambari packaging targets CPython 3.9 (`cp39`) on Linux x86_64; the build interpreter must satisfy the source requirements but is not interchangeable with a package ABI. Install Node 22 and npm for the React applications, plus `rpmbuild`/`rpm-build`, a C++ compiler, and the platform libraries described in the [Java dependencies](../platform/java-dependencies.md) and [Python runtime](../platform/python-runtime.md) guides.

Use a matching Linux x86_64, CPython 3.9 build environment for the default packaging-and-test commands below: Python tests load staged private dependencies through the Maven-configured environment. Cross-building another target does not prove those native extensions can run on the build host; validate them on the matching target runtime separately.

## Clone And Inspect {#clone-and-inspect}

```bash
git clone https://github.com/apache/ambari.git
cd ambari
mvn -version
```

The root `pom.xml` is the Maven reactor. Use `-pl` for a module and `-am` to include required reactor dependencies.

## Build The Main Reactor {#build-the-main-reactor}

Build without tests or packaging checks while iterating:

```bash
mvn -B -T 2C -pl ambari-server -am clean install -DskipTests -DskipPythonTests -DskipUiBuild=true -Drat.skip
```

Build the normal reactor packages without excluding tests or the UI:

```bash
mvn -B clean package rpm:rpm -Dbuild.os_arch=x86_64
```

The Server and Agent RPMs are written below their module `target/rpm` directories. Confirm the architecture and version before publishing an artifact. The VictoriaMetrics provider has a separate `metrics-rpm` profile and is covered by [RPM packaging](../platform/rpm-packaging.md).

## React Applications {#react-applications}

The `ambari-web` Maven module builds `ambari-web/latest` with the repository Node/npm toolchain and packages `latest/dist`. The separate `ambari-admin` module builds its React application and packages its output under `classes/latest`. A Maven build that uses `-DskipUiBuild=true` does not validate these applications.

## Python Packaging {#python-packaging}

Agent and Server dependencies are installed into Ambari private libraries during Maven packaging. CPython 3.9 (`cp39`) is the default target selected by the wheel properties, not a profile named `python-wheel-cp39`. Use the locked dependencies and a supplied wheelhouse when offline; do not run `pip install` on production nodes. The source Python runner and packaged ABI are related contracts, not interchangeable version claims.

## Focused Profiles {#focused-profiles}

Use the project profiles for a supported platform or wheel ABI rather than editing dependency versions ad hoc. Offline builds must provide the approved wheelhouse and use the repository’s no-index settings. Keep generated RPMs, wheel metadata, and SBOM output under `target` for review.
