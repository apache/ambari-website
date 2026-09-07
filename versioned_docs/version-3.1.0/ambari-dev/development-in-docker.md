---
title: Development in Docker
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

# Development in Docker {#development-in-docker}

Ambari provides a Docker-based build environment for reproducible development and verification. This environment is for building and testing Ambari; it is not a published production image or a promise of a complete Hadoop deployment recipe.

## Entry Point {#entry-point}

Run `start-build-env.sh` from the repository root. The script builds a base image from `dev-support/docker/${BUILD_OS}`, builds the common Ambari build image, and starts a user-specific container. In the reviewed 3.1 source, `BUILD_OS` defaults to `rocky8` and `MAVEN_VERSION` to `3.9.11`; set these explicitly when validating another supported build environment.

```bash
./start-build-env.sh mvn -version
```

Arguments after the script are executed in the container. Without arguments, the script opens an interactive shell. The source tree is mounted at `/home/${USER_NAME}/src`, and the host Maven cache is mounted at `/home/${USER_NAME}/.m2`.

These defaults and mounts are defined by the pinned [build environment script](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/start-build-env.sh).

## Build Environment {#build-environment}

The Dockerfiles under `dev-support/docker` install the build prerequisites used by the selected environment. Review the Dockerfile for the exact operating-system packages and tool versions instead of assuming that an image tag or external registry contains a particular release.

The container does not replace the repository’s module builds. Run the normal Maven commands from the mounted source tree, and build the primary React and Admin React applications through their module or package scripts as documented in the developer guides.

## Architecture And ABI {#architecture-and-abi}

Choose an image and package target that match the artifacts being verified. Python wheels and native extensions must match the target Python ABI and CPU architecture; Java and Node toolchains must match the project’s supported versions. A successful container build for one architecture does not certify another package target.

Keep generated output, credentials, private keys, and host-only configuration outside commits. The mounted `.m2` directory is a cache, not a source dependency declaration.

## Verification Boundary {#verification-boundary}

Use the container for repeatable compile, unit-test, packaging, and artifact checks. It does not by itself verify browser behavior, SSO, a live Ambari Server, a deployed Stack, monitoring storage, or cross-host recovery. Record the exact `BUILD_OS`, toolchain, commands, and skipped environment-dependent checks.
