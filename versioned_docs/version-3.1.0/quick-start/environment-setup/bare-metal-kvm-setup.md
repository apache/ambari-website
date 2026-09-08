---
title: Bare Metal and KVM Environment Setup
sidebar_position: 4
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

# Bare Metal and KVM Environment Setup {#bare-metal-kvm}

Use this guide to prepare existing physical servers or KVM guests for a
reviewed Ambari 3.1.0 candidate. It defines a reproducible baseline environment;
it is not capacity-planning guidance or certification of any operating-system,
virtualization, or hardware combination for production.

## Requirements {#requirements}

Provide one management host and at least one managed host running Ambari Agent
on a Linux distribution supported by the candidate. Keep the same RPM
architecture on every host; the default build target is x86_64. The environment
also needs administrative access, persistent disks, stable hostnames, and the
network routes required among Ambari Server, Agents, the metadata database, and
Stack services.

Install JDK 17 for Ambari Server and Agent helpers, and select and record the
Stack JDK separately for Hadoop services. Linux Python must be 3.9.2 or newer;
the default package uses the CPython `cp39` ABI. Rocky Linux 8 uses AppStream
`python39`, and the installed runtime wrapper must use the same ABI as the
packaged native extensions.

## Host And Time Configuration {#host-and-time}

Set unique FQDNs and make forward and reverse resolution work on every host.
Use your DNS service or a consistently managed hosts file. Check the result:

```shell
hostname --fqdn
getent hosts ambari-server.example.test
```

Synchronize clocks with the site's approved NTP/chrony service. Verify that the
database and all cluster hosts agree before enrollment. Open only the ports
required by the chosen Ambari, database, Stack, and monitoring topology.

Do not disable firewalls or SELinux globally. Add narrowly scoped policy and
firewall rules through the operating system change process. Preserve disk
backups for the database, configuration, trust material, and candidate RPMs.

## Install And Validate {#install-and-validate}

Install the reviewed Server RPM on the management host and Agent RPM on each
guest, then run `ambari-server setup` for the database configuration. Create
the empty metadata database and service account with the database
administrator's procedure; never put passwords in this guide.

```shell
sudo ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
sudo ambari-server start
sudo ambari-agent start
```

Provision the Server CA and enrollment trust material using the reviewed
bootstrap process. Validate DNS, TLS identity, Agent heartbeat, host
registration, and one controlled service check. Retry only after correcting the
configuration and rereading current host state.

For source builds and package inspection see [Download](../download.md) and
[Installation](../installation-guide.md). These procedures were checked
against source commit `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4`.
