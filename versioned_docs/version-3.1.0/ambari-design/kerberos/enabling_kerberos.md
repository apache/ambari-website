---
title: Enabling Kerberos
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

# Enabling Kerberos {#enabling-kerberos}

Use the React installer or the service security workflow to enable Kerberos after the target Stack and hosts are selected. The workflow validates inputs, submits background operations, and persists checkpoints for refresh, retry, and request ownership recovery.

## Before You Begin {#before-you-begin}

Prepare DNS and time synchronization for every host. Decide whether the cluster uses an existing KDC, Active Directory, or a manually prepared Kerberos environment. Confirm realm, administrative policy, principal naming, keytab distribution, and the configuration group that should receive the service changes.

## Provisioning Modes {#provisioning-modes}

- **Existing KDC**: provide the realm and the protected administrative inputs needed to create or validate principals and distribute keytabs.
- **Active Directory**: provide the domain-specific principal and account settings required by the selected Stack, and verify delegation and encryption policy with the domain administrators.
- **Manual**: prepare principals, keytabs, and KDC policy outside Ambari, then provide the references and paths required by the service configuration. Ambari does not infer missing KDC state.

The exact fields are determined by the selected Stack and mode. Do not copy credentials into descriptors, source files, screenshots, or ordinary configuration values.

## Wizard Sequence {#wizard-sequence}

1. Select the security mode and validate the realm and host prerequisites.
2. Review the generated principal, identity, service, and component settings.
3. Supply KDC or directory credentials only in the protected credential step when requested.
4. Select the target configuration group and confirm the affected hosts and components.
5. Submit the operation and follow request progress through completion or failure.
6. Apply required service restarts, then verify service checks, component health, and HA active/standby behavior.

## Credentials And Keytabs {#credentials-and-keytabs}

Credentials are scoped to the operation that needs them. The UI must not expose them in URLs, telemetry, labels, ordinary logs, or descriptor examples. Keytab contents are distributed through the supported server/agent path; descriptors contain references such as paths and configuration properties, not secret bytes.

## Failure And Recovery {#failure-and-recovery}

If validation fails, correct the reported input before submission. If a background request fails, inspect its persisted progress and failed component before retrying. Refresh and session recovery restore the owned request checkpoint where available; they do not authorize a second submission of completed work. After a server restart, verify request state and component state before taking action.

## After Enabling {#after-enabling}

Review configuration groups and restart requirements in the Services view. Verify principals and keytabs on representative hosts, test service checks, and validate both HA roles. For metadata details, see [Kerberos Descriptor](./kerberos_descriptor.md); for restart and group behavior, see [Kerberos Service](./kerberos_service.md).
