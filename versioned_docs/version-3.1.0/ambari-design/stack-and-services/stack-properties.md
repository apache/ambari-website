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

Stack properties describe the services, components, configuration, commands, dependencies, and capabilities available to a Stack. Keep property names and service identifiers stable because they are consumed by deployment plans and APIs.

## Features and tools {#features-and-tools}

Use the current Stack metadata to declare supported features and tools. A feature should be enabled only when its service definitions, commands, configuration, and recovery behavior are implemented and tested.

Properties must identify their scope and defaults. Do not copy obsolete HDP paths or Python 2 recipes. Review the active profile configuration and verify generated plans on every supported platform.

## Validation {#validation}

Test inheritance, overrides, service dependencies, configuration rendering, install, upgrade, failure, and recovery. Keep source evidence and compatibility notes with the change.
