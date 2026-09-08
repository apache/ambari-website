---
title: Stack Properties
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

# Stack Properties {#stack-properties}

Stack properties describe the services, components, configuration types, lifecycle commands, dependencies, and optional capabilities available in a Stack version. Ambari Server resolves these properties while loading the Stack, and the installer, Blueprints, service operations, and upgrade plans consume the resulting model. Keep property, service, and component identifiers stable once they appear in public APIs or persisted deployment records; renaming them can invalidate existing cluster configuration, automation, and upgrade paths.

## Features and tools {#features-and-tools}

Use the current Stack metadata to declare supported features and tools, including the applicable service versions, operating systems, and processor architectures. Enable a feature only after its service definitions, command scripts, configuration rendering, dependency checks, failure reporting, and recovery behavior have been implemented and tested. The presence of a class, script entry point, or build property alone does not establish that a feature works throughout the cluster lifecycle.

Each property must identify its scope, default, permitted override layers, and missing-value behavior. Do not copy obsolete HDP paths, Python 2 recipes, or defaults that conflict with the current BIGTOP service definitions. Review the active build configuration, inspect the final value after inheritance and overrides, and verify the generated deployment plan, configuration files, and command arguments on every supported platform.

## Validation {#validation}

At minimum, test parent and child Stack inheritance, service-level overrides, dependency ordering, configuration rendering, initial installation, repeated execution, upgrade, rollback, partial failure, and recovery. In addition to parsing the metadata, inspect the generated component assignments, package list, command environment, and effective configuration. Keep the source revision, applicable platforms, compatibility impact, results, and known limitations with the change.
