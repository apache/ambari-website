---
title: Kerberos
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

# Kerberos {#kerberos}

Apache Ambari 3.1 supports Kerberos-secured Hadoop clusters through the React installer and service configuration workflows. The UI collects only the credentials and options required for the selected provisioning mode; it does not display or persist secret material as documentation defaults.

![Kerberos enablement from KDC validation through protected credentials, background request, restarts, service checks, and recovery](/img/3.1.0/handdrawn/kerberos-enablement-en.webp)

*Credentials enter only at the protected step. The descriptor defines identities and keytab paths, never passwords or keytab contents.*

## Choose A Workflow {#choose-a-workflow}

- Use [Enabling Kerberos](./enabling_kerberos.md) when installing or securing a cluster. The wizard validates the selected KDC or Active Directory mode, collects required inputs, and records progress for retry.
- Use [Kerberos Descriptor](./kerberos_descriptor.md) to describe identities, principals, keytabs, services, components, and generated configuration properties in a Stack or service definition.
- Use [Kerberos Service Configuration](./kerberos_service.md) to understand service-level configuration groups, dependencies, and restart behavior after security changes.

## Supported Modes {#supported-modes}

The current wizard defines existing MIT KDC, Active Directory, IPA, and manually prepared Kerberos options. The selected mode determines which principal, realm, administrative access, keytab, and distribution fields are required. Cluster administrators remain responsible for KDC policy, DNS, time synchronization, and host enrollment; this does not establish compatibility with unlisted KDC implementations.

## Security Boundaries {#security-boundaries}

KDC administrative credentials are entered through the protected wizard flow and are used for the request that needs them. They must be supplied through the deployment configuration or secret store used by the installation, never committed to a Stack definition or copied into a descriptor example. Keytab contents and passwords are not telemetry, labels, URLs, or ordinary configuration text.

## Recovery And Operations {#recovery-and-operations}

Kerberos operations are background requests owned by the initiating user. The React UI restores the request checkpoint after refresh or session recovery, reports failures, and allows a supported retry without silently repeating completed steps. A server restart can interrupt a request; inspect its persisted state before retrying. After enabling or changing Kerberos, use the service page to review affected configuration groups and restart requirements.

## Related Documentation {#related-documentation}

See the [Kerberos Descriptor](./kerberos_descriptor.md), [Kerberos Service](./kerberos_service.md), and [Enabling Kerberos](./enabling_kerberos.md) pages for the detailed contracts.
