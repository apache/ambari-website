---
title: Stack Inheritance
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

# Stack Inheritance {#stack-inheritance}

Stack inheritance combines a stack version with the files and services supplied by its supported parent. `StackExtensionHelper` and the stack loader apply the inheritance rules; the result must be validated as an assembled stack rather than inferred from directory names.

## File and Service Rules {#file-and-service-rules}

Some stack files are inherited, some are replaced when defined by the child, and some are merged. Service definitions follow the service inheritance rules: a service can reuse a definition from `common-services`, while child metadata can add or override supported properties. Configuration dependencies and role command order must be checked after merging.

## Merge and Deletion Behavior {#merge-and-deletion-behavior}

The merge is property-specific. A child value generally overrides a parent value; an omitted child property is retained when the rule permits inheritance. Configuration dependencies use an all-or-nothing rule, while custom commands merge by name and child definitions override same-name parent commands. Cardinality is taken from the child when supplied, otherwise from the parent. Explicit deletion markers are honored by the stack merge implementation.

## Common Services and Validation {#common-services-and-validation}

Current BIGTOP services demonstrate reuse from `common-services`, including [BIGTOP AMBARI-METRICS](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/AMBARI-METRICS/metainfo.xml). Validate the final `metainfo.xml`, scripts, configuration files, package paths, alerts, `metrics.json`, `telemetry.json`, and service checks. Do not assume unsupported cross-stack `extends` syntax or inheritance for files that the loader treats as replacement-only.

The merge implementation is `org.apache.ambari.server.api.util.StackExtensionHelper#mergeServices`; inspect it when a service inheritance result is ambiguous.
