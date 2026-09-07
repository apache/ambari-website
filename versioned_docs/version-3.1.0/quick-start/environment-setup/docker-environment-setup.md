---
title: Docker Environment Setup
sidebar_position: 3
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

# Docker Environment Setup {#docker-environment}

Docker can provide a repeatable development envelope for a 3.1.0 candidate. It
does not provide an official Ambari 3.1.0 image. Supply a trusted base image
approved for your OS and install the reviewed RPM repository or candidate RPMs.

## Host Requirements {#host-requirements}

Use Docker Engine and Compose versions supported by your host team, with enough
CPU, memory, disk, and nested-service support for one Server and Agents. Use a
user-managed bridge network with stable service names; do not hard-code stale
container IP addresses. Persist the database and repository directories.

The image must provide JDK 17 for Ambari, while Stack services may use a
separate JDK. Provide Linux Python 3.9.2+ and the package's CPython `cp39` ABI;
Rocky 8 images need AppStream `python39` and the Ambari Python wrapper.

## Compose Envelope {#compose-envelope}

Create a local `docker-compose.yml` from your approved base image. The shape
below is intentionally a template; replace the image and paths with reviewed
values:

```yaml
services:
  ambari-server:
    image: your-approved-base-image
    command: /sbin/init
    ports: ["8080:8080"]
    volumes: ["./ambari-repo:/var/repo/ambari", "./state/server:/var/lib/ambari-server"]
  ambari-agent:
    image: your-approved-base-image
    command: /sbin/init
    volumes: ["./ambari-repo:/var/repo/ambari", "./state/agent:/var/lib/ambari-agent"]
```

```shell
mkdir -p ambari-repo state/server state/agent
docker compose up -d
docker compose ps
```

Install the same reviewed Server/Agent packages in the containers. Configure
database details with `sudo ambari-server setup`, separate Java homes, and
pre-provisioned CA trust. Validate container DNS, TLS, time, required ports,
heartbeat, and persistence after restart. Do not solve connectivity by
disabling all security controls.

For building from the actual source tree, its helper provides a Rocky 8 build
envelope with JDK 17 and Python 3.9:

```shell
./start-build-env.sh bash
./start-build-env.sh mvn -B -DskipTests package
```

These are build commands, not a ready-made cluster image. See [Download](../download.md).
