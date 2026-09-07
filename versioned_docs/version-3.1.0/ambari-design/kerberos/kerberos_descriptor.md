---
title: Kerberos Descriptor
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

# Kerberos Descriptor {#kerberos-descriptor}

A Kerberos Descriptor is Stack or service metadata that describes the identities and configuration required to secure a deployment. It is declarative metadata, not a place for passwords, private keys, keytab contents, or KDC administrator credentials.

## Descriptor Structure {#descriptor-structure}

The top-level descriptor may contain `properties`, `identities`, `auth-to-local-properties`, `configurations`, and `services`. A service descriptor contains `name`, and may contain `identities`, `auth-to-local-properties`, `configurations`, and `components`. A component descriptor contains `name` and optional identity, auth-to-local, and configuration blocks.

## Properties And Configurations {#properties-and-configurations}

`properties` provides named values for controlled substitution. `configurations` provides configuration-type/property values for the secured service. Substitution is explicit and should be limited to known configuration fields; do not use it to inject secrets or arbitrary destinations. Configuration changes can mark components for restart through their declared dependencies.

## Identities, Principals, And Keytabs {#identities-principals-and-keytabs}

An identity has a stable `name` and may reference another identity by relative or absolute path. A `principal` describes its normalized name, `type`, configuration property, and optional local username mapping. A `keytab` describes the destination path, owner/group access, and configuration property. The descriptor may refer to a keytab path, but never contains the keytab bytes.

Use `_HOST` or the supported hostname substitution for service principals where the Stack contract requires it. Keep realm and principal variables in the descriptor; resolve their values through the selected cluster configuration and protected provisioning inputs.

## Services And Components {#services-and-components}

The Stack descriptor declares shared identities and service entries. Service-level entries can be specialized by components, while component-level entries describe only that component. The inheritance model creates a resolved copy for the child; overriding a property does not mutate the parent definition.

## Validation {#validation}

The Server validates descriptor shape, identity references, supported configuration specifications, and service/component names before assigning work. Invalid descriptors are rejected as a candidate; the Agent keeps its last valid assignment. Test normal, HA, KDC, Active Directory, and manually prepared environments before enabling production security.

For the enabling workflow and credential handling, see [Enabling Kerberos](./enabling_kerberos.md). For service configuration groups and restart behavior, see [Kerberos Service](./kerberos_service.md).
