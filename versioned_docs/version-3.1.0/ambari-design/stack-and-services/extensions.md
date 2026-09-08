---
title: Extensions
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

# Extensions {#extensions}

An extension is an independently versioned collection of custom services that can be linked to an explicitly supported Stack version. Once linked, its services are available to a cluster without being copied into the Stack directory. Ambari Server reads the extension metadata, validates compatibility, and manages the link; an extension does not bypass normal validation of Stack service definitions, package sources, or lifecycle commands.

## Version Compatibility {#version-compatibility}

An extension version declares its supported Stack prerequisites in `metainfo.xml`, including the Stack name and minimum compatible version. Ambari compares these requirements with the installed Stack before creating a link. A name mismatch, an older version, or invalid metadata must reject the link. An unsupported extension must not appear as a selectable cluster service and must not be forced into place by copying directories manually.

## Extension Links {#extension-links}

An extension link associates one specific extension version with one installed Stack version. Administrators can query, create, update, and delete link state through the Server REST resources. Use explicit versions so an existing cluster does not switch service definitions without review. After changing a link, reload Stack, extension, and service state so the in-memory model, resource directory, and persisted relationship agree.

## Installation and Validation {#installation-and-validation}

The Server expands an extension archive, reads required metadata, validates prerequisites, stages the content under the configured resources area, and runs applicable checks and hooks. Before linking, inspect the extension descriptor, service definitions, package and command scripts, configuration dependencies, alerts, and service checks, then exercise a controlled installation and failure recovery on the target platform. Use the current [BIGTOP service definitions](https://github.com/apache/ambari/tree/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services) as source references; do not assume a cross-Stack `extends` form that the loader does not document.
