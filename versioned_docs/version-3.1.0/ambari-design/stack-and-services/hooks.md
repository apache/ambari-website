---
title: Stack Hooks
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

# Stack Hooks {#stack-hooks}

Hooks extend a Stack lifecycle with actions that run before or after service operations. They are appropriate for cross-service preconditions, environment preparation, result recording, or required cleanup, but should not hide responsibilities that belong to the target operation itself. Every hook must document its trigger, ordering, input environment, idempotency requirements, failure propagation, and recovery behavior so callers can determine whether a retry is safe.

## Ordering {#ordering}

Pre-actions run before the target action and may validate dependencies, check configuration, or prepare shared state. The target action should proceed only after all required pre-actions succeed. Post-actions run after the target action and normally record results, refresh derived state, or clean temporary resources. Define whether post-actions still run after a target failure and whether a post-action failure fails the request or only records a warning.

Hooks must not assume that unrelated hosts, components, or services have completed unless the dependency graph explicitly guarantees that order. Parallel tasks must not depend on transient in-process state. A failure must stop subsequent work or return an error that identifies the stage and host according to the hook contract; swallowing an exception and continuing can produce a falsely successful request.

## Action environment {#action-environment}

The action environment supplies the request and command context, target host, service and component identifiers, effective configuration, and operation metadata. Read and validate these values through supported action APIs rather than relying on legacy Python 2 behavior, temporary working directories, undocumented environment variables, or incidental distribution-specific paths.

Use stable, explicitly scoped identifiers and make repeated execution safe after a network interruption, Server restart, or operator retry. Test pre-action failure, target failure, post-action failure, partial host success, repeated execution, and rollback, and confirm that the final request state and logs identify the actual failure boundary.
