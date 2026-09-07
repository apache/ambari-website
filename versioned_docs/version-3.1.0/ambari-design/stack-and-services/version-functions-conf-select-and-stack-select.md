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

Version functions help choose compatible service definitions and configuration. `conf-select` selects configuration for the selected service version, while `stack-select` selects the active service version exposed by the Stack.

These mechanisms select service content; they do not select Ambari Server or Agent RPMs. Ambari Metrics RPMs are also outside service-version selection and must follow their own package and compatibility rules.

## Selection rules {#selection-rules}

Resolve the Stack and service versions from current metadata and the deployment context. Keep the selected service version explicit, validate dependencies, and reject unsupported combinations rather than silently falling back.

## Testing {#testing}

Test normal selection, inheritance, missing versions, incompatible versions, upgrade, rollback, and repeated execution. Record the active profile, source references, generated configuration, and recovery evidence.
