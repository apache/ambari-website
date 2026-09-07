---
title: Version Functions, conf-select, and stack-select
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

# Version Functions, conf-select, and stack-select {#version-functions-conf-select-and-stack-select}

Version functions choose compatible service definitions and configuration from the installed Stack, selected service version, and current operation context. `conf-select` points service configuration at the selected version, while `stack-select` selects the active service version exposed by the Stack. Both operate on managed service content, so their ordering and repeatability must remain consistent with service upgrade and rollback workflows.

These mechanisms do not select or replace Ambari Server or Agent RPMs, and they do not change those packages' runtime dependencies. Ambari Metrics RPMs are also outside service-version selection and follow their own package, target-architecture, and monitoring-backend compatibility rules. When diagnosing a version problem, first distinguish the Ambari package version, Stack version, and individual service version.

## Selection rules {#selection-rules}

Resolve Stack and service versions from the currently loaded metadata, installed packages, and deployment context. Record the result explicitly, then verify that dependencies, configuration directories, and package contents match it. Missing or unsupported combinations must produce a diagnosable error and stop the operation rather than silently falling back to an older version or an arbitrary available directory.

## Testing {#testing}

Test normal selection, parent inheritance, missing and incompatible versions, upgrade, rollback, and repeated execution. Inspect configuration links or selection records, the service command environment, and the version actually running. Record the active build configuration, source references, input versions, generated configuration, and recovery evidence instead of relying only on the command exit code.
