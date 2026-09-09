---
title: Ambari Views
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

# Ambari Views {#ambari-views}

Ambari Views are pluggable applications that add custom visualization, management, or monitoring capabilities to Ambari. A View may provide client assets, Java server resources, REST endpoints, and configuration for one or more instances.

## Current React Experience {#current-react-experience}

The React Web UI lists authorized View instances and opens a selected instance in a same-origin, server-provided Web context. The directory uses `/api/v1/views`; the application itself is served from the View context rather than reimplemented inside the Ambari React bundle.

View-only users receive the reduced Views shell. The separate Ambari Admin React module manages the administration application boundary; it does not turn hosted View applications into ordinary React screens.

## Core Terms {#core-terms}

| Term | Meaning |
| --- | --- |
| View | The named extension installed in Ambari. |
| View version | A deployable version of a View; multiple versions may coexist. |
| View package | A JAR containing `view.xml`, client assets, server resources, and dependent libraries. |
| View instance | A configured instance of one View version. |
| View context | The server-provided URL and execution context used to host an instance. |

## Documentation Map {#documentation-map}

* [Developing React Views](./developing-react-views.md) covers frontend and Server structure, path-safe API calls, permissions, build, deployment, and validation.
* [View API](./view-api.md) covers discovery, versions, instances, permissions, and privileges through the Ambari REST API.
* [View Definition](./view-definition.md) covers the current `view.xml` contract and package metadata.
* [Framework Services](./framework-services.md) covers `ViewContext`, instance data, resource providers, and lifecycle events.

The REST contract is implemented by the server classes under `ambari-server/src/main/java/org/apache/ambari/server/api/services/views`. The main View extension interfaces are under `ambari-views/src/main/java/org/apache/ambari/view`.
