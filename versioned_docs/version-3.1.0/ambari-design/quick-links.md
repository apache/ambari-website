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

Quick Links are service-owned navigation entries that Ambari exposes for web consoles, status pages, and other supported endpoints. They are declared in a service's `quicklinks/quicklinks.json` and loaded and inherited with the Stack service definition. A Quick Link only describes how to derive an entry from the current topology; it does not start a component, grant authorization, or prove that the target service is healthy.

## Definition And Resolution {#definition-and-resolution}

Each entry identifies a display label, target component, and URL template or port-backed endpoint rule. The service definition can associate protocol, port, path, and high-availability information with configuration properties so Ambari derives the final URL from the installed cluster's effective configuration. A link must not assume a fixed host name, a fixed active role, or an unconfigured port, and it must never append credentials to the URL.

Ambari evaluates the selected Stack, component assignments, high-availability roles, and effective configuration when rendering links. HTTP or HTTPS policy, configuration-group overrides, host changes, and active-component failover can therefore change the final URL. A link should be hidden or unavailable when the target component is absent, no instance is usable, or required configuration is missing, rather than presenting a plausible but invalid address.

## Operational Use {#operational-use}

1. Install the service and components required by the link.
2. Set the service configuration that determines its endpoint and security policy.
3. Open the service page and inspect the resolved Quick Links menu.
4. If a link is unavailable, check component state, effective configuration, host resolution, and the service's `quicklinks.json` definition.

Quick Links are navigation metadata, not a monitoring scrape contract or the sole evidence of service health. The pinned [BIGTOP quick-link definitions](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP) show the current service-owned entries. After adding or changing a link, verify normal deployment, high-availability failover, HTTPS, configuration overrides, and missing-component behavior separately.
