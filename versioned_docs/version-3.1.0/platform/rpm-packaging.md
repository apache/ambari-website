---
title: RPM Packaging
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

# RPM Packaging {#rpm-packaging}

Ambari RPMs are built in the Linux build environment with JDK 17 and Maven 3.9.x. The Java build range is enforced by Maven Enforcer; this is a build requirement, separate from runtime JDK selection.

## Agent Python Artifacts {#agent-python-artifacts}

The default Python packaging tuple is CPython `cp39`, Python `3.9.2`, implementation `cp`, ABI `cp39`, and platform `manylinux2014_x86_64`. RPM dependencies require Python 3.9.2 and the matching `python(abi) = 3.9` where applicable. Rocky 8 uses `python39`; the installed `ambari-python-wrap` validates the packaged ABI and interpreter. Nodes do not run `pip install`.

Maven clears staging directories before bundling. The runtime lock is hash-pinned and installs binary wheels with `--only-binary=:all:`, `--no-deps`, and the selected platform/version/ABI. The sole distribution exception is `docopt==0.6.2`, a hard stomp.py dependency installed separately from a hash-pinned sdist. The package audit validates RECORD metadata, licenses, ABI/platform, and emits an SBOM. Dependencies are placed in Ambari private libraries.

A normal Agent/Server RPM build is:

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm -Dbuild.os_arch=x86_64
```

To supply an offline Python wheelhouse, add `-Dpython.wheelhouse=/srv/build/wheelhouse`. This activates the Maven profile that sets `PIP_NO_INDEX=true`; the directory must contain every artifact required by the locked runtime and build dependencies. This only disables Python index access. Maven, Node/npm, and provider downloads need their own caches or mirrors for a fully offline build.

The `python-wheel-aarch64` profile is activated by `-Dbuild.os_arch=aarch64` and selects `manylinux2014_aarch64`; `python-wheel-cp310` is a separate CPython 3.10 artifact. These profiles do not certify all platforms for production.

## Metrics RPM {#metrics-rpm}

The metrics RPM is a separate `ambari-metrics` packaging module for the VictoriaMetrics provider, not the legacy AMS implementation. The root `metrics-rpm` profile includes that module. The pinned provider version is `1.150.0`. The separate `metrics.package.version` property changes the Ambari RPM version, not the VictoriaMetrics binary version. Changing the provider requires reviewing its version, pinned source revisions, and checksum inventory together. The RPM architecture follows `build.os_arch`. Provider preparation validates and stages the reviewed binaries, metadata, and license/NOTICE files.

Build the metrics RPM separately with an explicit candidate package version:

```shell
mvn -B -Pmetrics-rpm -pl ambari-metrics -am package rpm:rpm -Dmetrics.package.version=3.1.0.0 -Dpackage.release=0.candidate1 -Dbuild.os_arch=x86_64
```

These commands describe build procedures; they are not claims that a build was run. Inspect RPM contents and dependency metadata before publication.

Set `AGENT_RPM` to the candidate file and inspect it without installing it:

```shell
rpm -qp --queryformat '%{NAME} %{VERSION}-%{RELEASE} %{ARCH}\n' "$AGENT_RPM"
rpm -qp --requires "$AGENT_RPM"
rpm -qpl "$AGENT_RPM"
```

Verify the matching architecture/ABI, wrapper entry points, private runtime libraries, license/NOTICE files, and generated SBOM. A successful archive build is not a substitute for installing the RPM and validating imports, enrollment, and service commands on the target distribution.

## References {#references}

The Python/RPM packaging changes are in [AMBARI-26643](https://github.com/apache/ambari/commit/daf7576fb67edbde6b53fa52c9d23f918f23f817). Metrics packaging is defined by the pinned [Metrics POM](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-metrics/pom.xml) and [provider preparation script](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-metrics/src/main/scripts/prepare-victoriametrics.sh). See the [Python runtime](./python-runtime.md), [Java dependencies](./java-dependencies.md), and [upgrade guide](../upgrade-guide.md).
