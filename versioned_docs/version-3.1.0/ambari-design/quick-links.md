---
title: Quick Links
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

# Quick Links {#quick-links}

Quick links are service-owned entries exposed by Ambari for web consoles, status pages, and other service endpoints. They are declared in a service's `quicklinks/quicklinks.json` and inherited with the Stack service definition.

## Definition And Resolution {#definition-and-resolution}

Each entry identifies a label, target component, and URL template or port-backed endpoint. The service definition can associate a link with configuration properties so Ambari resolves the effective protocol, host, port, and path for the installed cluster. Links must not assume a fixed host name or an unconfigured port.

Ambari evaluates the selected Stack and effective configuration when rendering links. HTTPS policies, component assignments, and configuration overrides therefore affect the final URL. A link can be hidden or unavailable when its component is not installed or its required configuration is absent.

## Operational Use {#operational-use}

1. Install the service and components required by the link.
2. Set the service configuration that determines its endpoint and security policy.
3. Open the service page and inspect the resolved Quick Links menu.
4. If a link is unavailable, check component state, effective configuration, host resolution, and the service's `quicklinks.json` definition.

Quick Links are navigation metadata, not a monitoring scrape contract. The pinned [BIGTOP quick-link definitions](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP) show the current service-owned entries.
