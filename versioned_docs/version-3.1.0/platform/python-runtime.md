---
title: Python Runtime
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

# Python Runtime {#python-runtime}

Ambari 3.1.0 requires Python **3.9.2 or later** on Linux. The default package target is CPython 3.9 (`cp39`) for `manylinux2014_x86_64`. Rocky Linux 8 explicitly requires AppStream `python39`; Rocky Linux 9 uses system Python 3.9. The installed wrapper validates the interpreter and selects the matching ABI.

The source-level minimum does not make a cp39 RPM compatible with any newer Python minor release. Use the interpreter matching the package's native extensions; CPython 3.10 requires its own package target. Ambari's own Python code remains maintained in Ambari. The removal concerns copied third-party forks, not all Python source files delivered by verified upstream wheels.

## Official Dependencies {#official-dependencies}

The merged Python modernization uses official packages instead of vendored forks: APScheduler `3.11.3`, Jinja2 `3.1.6`, MarkupSafe `3.0.3`, stomp.py `8.2.0`, websocket-client `1.9.0`, cryptography `50.0.1`, distro `1.9.0`, javaproperties `0.8.2`, and PyYAML `6.0.3`. Vendored APScheduler, Jinja2, STOMP/WebSocket, crypto, and test-broker sources are not runtime dependencies.

Standard-library replacements are used for simplejson (`json`), mock (`unittest.mock`), and pbkdf2 (`hashlib.pbkdf2_hmac`). Existing AES-CBC v1 compatibility is retained while protocol changes are handled separately.

## Packaging Contract {#packaging-contract}

Agent and Server dependencies are installed into Ambari private libraries during the Maven build. Nodes must not run `pip install` at runtime. Requirements are hash-locked and the main lock accepts binary wheels only for the selected platform and ABI. `docopt==0.6.2` is the sole exception: stomp.py declares it as a hard dependency, so it is installed from a separately hash-locked source distribution.

The build clears previous dependency directories, audits installed metadata and licenses, and emits an SBOM. The default platform is Linux x86_64; the `python-wheel-aarch64` and `python-wheel-cp310` profiles produce separate artifacts and are not evidence that every platform is production-tested. Offline builds use a supplied wheelhouse with `PIP_NO_INDEX=true`.

The runtime wrapper, dependency directory, and native extensions must use one Python ABI. Do not reintroduce deleted Python 2 extensions, Ambari simulator/test bundles, or unlocked optional test dependencies. Verified upstream distributions may include their own documentation, tests, or examples covered by their RECORD metadata. The normalizer removes unused declared console/GUI entry points and updates RECORD; it does not authorize arbitrary trimming of upstream distributions. See the [RPM packaging guide](./rpm-packaging.md) and [upgrade guide](../upgrade-guide.md) for packaging and migration constraints.

## Source Evidence {#source-evidence}

The runtime and packaging changes are merged in [AMBARI-26643](https://github.com/apache/ambari/commit/daf7576fb67edbde6b53fa52c9d23f918f23f817). The Python floor, interpreter selection, wheel platform/ABI defaults, RPM requirements, and offline Maven installation are defined in the current `pyproject.toml`, requirements locks, root `pom.xml`, Agent `pom.xml`, and Unix wrapper scripts.
