---
title: Download Ambari 3.1.0
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

# Download Ambari 3.1.0 {#download-ambari-310}

Ambari 3.1.0 documentation currently describes a reviewed candidate and source
build. It is not a declaration that a final public release, download mirror,
checksum set, or production certification exists. Obtain the candidate and its
reviewed source from the project channel used by your release process.

## Choose An Artifact {#choose-an-artifact}

Use one artifact set for Server, Agent, and optional Metrics packages. Do not
mix packages from different candidates or copy private Python libraries between
installations. Keep the RPM architecture consistent with the host and with
the Python wheel and VictoriaMetrics provider artifacts.

The default Linux packaging target is x86_64 with CPython `cp39` and
`manylinux2014_x86_64`. A separate `aarch64` build selects
`manylinux2014_aarch64`; a CPython 3.10 build is a separate profile. These
profiles are build targets, not claims that every platform is certified.

## Build From Source {#build-from-source}

Build on Linux with JDK 17 and Maven 3.9.x. The repository enforces those
versions. A normal Agent and Server RPM build is:

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm -Dbuild.os_arch=x86_64
```

For a fully controlled Python dependency build, provide a wheelhouse containing
every locked artifact:

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm \
  -Dbuild.os_arch=x86_64 -Dpython.wheelhouse=/srv/build/wheelhouse
```

The wheelhouse activates `PIP_NO_INDEX=true`; Maven, Node, and npm still need
their own caches or mirrors. Inspect the generated RPM before distribution:

```shell
export AGENT_RPM=/path/to/ambari-agent.rpm
rpm -qp --queryformat '%{NAME} %{VERSION}-%{RELEASE} %{ARCH}\n' "$AGENT_RPM"
rpm -qp --requires "$AGENT_RPM"
rpm -qpl "$AGENT_RPM"
```

Confirm the expected architecture, Python ABI wrapper, private libraries,
license/NOTICE files, and SBOM. Do not use `pip install` on a target node.

## Optional Metrics Package {#optional-metrics-package}

The optional `ambari-metrics` RPM packages the reviewed VictoriaMetrics
provider. It replaces the legacy AMS/Ganglia integration; old AMS or Ganglia
installation instructions do not apply to this candidate. Build it separately:

```shell
mvn -B -Pmetrics-rpm -pl ambari-metrics -am package rpm:rpm \
  -Dmetrics.package.version=3.1.0.0 -Dpackage.release=0.candidate1 \
  -Dbuild.os_arch=x86_64
```

Inspect the provider version, source revision, checksums, metadata, and notices
as one reviewed set. The package command is a procedure, not evidence that the
package was built or certified in this environment.

## Before Installation {#before-installation}

Record the candidate identifier, source revision, target OS and architecture,
Ambari JDK, Stack JDK, Python executable, database plan, and rollback backup.
On Rocky Linux 8, install and select AppStream `python39`; a generic `python3`
may point to another minor version. The installed wrapper must use the same ABI
as the packaged native extensions.

Do not publish passwords, private keys, enrollment secrets, or default
credentials in a download manifest. Configure trust anchors and credentials
through the reviewed deployment procedure.

## Evidence {#download-evidence}

This guide follows the source tree at commit
`4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4` and the Java 17 baseline at
`94c6389a96b38bccef0b6a08269481a086b63ca1`. See [Java dependencies](../platform/java-dependencies.md), [Python runtime](../platform/python-runtime.md), and [RPM packaging](../platform/rpm-packaging.md).
