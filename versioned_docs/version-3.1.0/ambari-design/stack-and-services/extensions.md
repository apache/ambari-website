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

An extension is a versioned collection of custom services that can be linked to a supported stack version. Once linked, its services are available to the cluster without copying them into the stack definition. Extension metadata and links are processed by the Ambari Server extension helpers.

## Version Compatibility {#version-compatibility}

An extension version declares its supported stack prerequisites in `metainfo.xml`. The stack name and minimum version must match the installed stack. Ambari validates these prerequisites before creating a link; an unsupported extension must not be made available to the cluster.

## Extension Links {#extension-links}

An extension link connects one extension version to one installed stack version. The link state can be queried, created, updated, and deleted through the Server REST resources. After changing links, the server reloads stack, extension, and service state so the in-memory model matches the staged resources.

## Installation and Validation {#installation-and-validation}

The Server expands an extension archive, reads its required metadata, validates prerequisites, stages it under the configured resources area, and runs the applicable checks and hooks. Validate the extension descriptor, service definitions, package scripts, configuration, and service checks before linking it. Use the current [BIGTOP service definitions](https://github.com/apache/ambari/tree/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services) as source references; do not assume a cross-stack `extends` form that the loader does not document.
