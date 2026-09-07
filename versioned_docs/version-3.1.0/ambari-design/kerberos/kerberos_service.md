---
title: Kerberos Service Configuration
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

# Kerberos Service Configuration {#kerberos-service-configuration}

Kerberos changes are service configuration changes as well as security operations. Ambari resolves the selected Stack, service, host, and component settings before it creates the background request.

## Configuration Groups {#configuration-groups}

A configuration group associates selected hosts or components with a versioned set of service properties. The Kerberos workflow updates the group that owns the affected service settings; it does not overwrite unrelated groups. Review the target group, host membership, and effective values before confirming the operation.

## Dependencies And Restarts {#dependencies-and-restarts}

Service metadata declares configuration dependencies. When a Kerberos property, principal, keytab path, or related security setting changes, Ambari can mark the affected component for restart. The restart scope follows the resolved dependency and component state; it is not a blanket restart of every service.

Review the pending operations in the React request view. A completed request may leave some components requiring a restart, while a failed request must be inspected before retrying. Do not treat a successful API response as proof that every daemon has reloaded its credentials.

## Effective Configuration {#effective-configuration}

The effective configuration combines Stack defaults, service values, configuration-group overrides, host context, and protected provisioning inputs. Descriptor references are resolved before assignment. Secret values remain in the protected credential path and must not be copied into ordinary service properties, logs, dashboards, or telemetry.

## Host And HA Behavior {#host-and-ha-behavior}

For HA services, validate active and standby components separately. Principal names, `_HOST` substitution, keytab paths, and restart requirements can differ by host role. Use the Hosts and Services pages to inspect component state and recover missed operations after a refresh or server restart.

## Safe Change Procedure {#safe-change-procedure}

1. Confirm the intended configuration group and affected hosts.
2. Validate realm, principal, KDC/AD mode, and keytab references through the protected workflow.
3. Submit the operation and follow its persisted request progress.
4. Review failures, restart recommendations, and component health before retrying.
5. Verify service checks and both HA roles after all required restarts.

The [Kerberos Descriptor](./kerberos_descriptor.md) page defines metadata structure. The [Enabling Kerberos](./enabling_kerberos.md) page defines the installation workflow.
