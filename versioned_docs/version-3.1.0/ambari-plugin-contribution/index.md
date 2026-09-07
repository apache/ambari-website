---
title: Ambari Plugin Contributions
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

# Ambari Plugin Contributions {#ambari-plugin-contributions}

Extensions in this section integrate with current Ambari Stack and React contracts. Treat each extension as a separately versioned component with explicit tests and deployment documentation.

## Stack And Service Extensions {#stack-and-service-extensions}

A Stack extension declares service and component metadata, configuration types, dependencies, commands, and lifecycle behavior. Keep names and defaults compatible with the target Stack, and use configuration dependencies to identify components that require restart after a change.

## Telemetry Extensions {#telemetry-extensions}

Current monitoring integrations use a service `telemetry.json` descriptor and, for JMX, a typed `telemetry-profiles` file. Declare the supported endpoint format, path, HTTP/HTTPS policy, authentication references, bounded metric names, types, units, and series limits. Validate actual native/JMX output, HA roles, malformed responses, and the Agent’s last-valid-assignment recovery. See [Integrating Service Telemetry](../monitoring/service-integration.md).

## Themes And Views {#themes-and-views}

Service Themes define configuration layouts, widgets, attributes, conditions, recommendations, and permission/read-only behavior. Views run in the authenticated React shell using the server-provided same-origin context; test authorization, navigation, and packaged assets rather than assuming a standalone page.

## Testing And Packaging {#testing-and-packaging}

Test extensions against a representative Stack and role set. Include installation, configuration validation, service restart, failure, retry, and upgrade checks. Package metadata and assets through the normal Server/Stack lifecycle; do not rely on copying a local React `dist` directory or private Python libraries.

## Retired Tutorials {#retired-tutorials}

The historical SCOM management-pack material and Ember monitoring-widget tutorial are retained as historical references only. They are not a 3.1 extension path. Do not use them to implement React dashboards, Prometheus telemetry, or current Stack service integration.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
