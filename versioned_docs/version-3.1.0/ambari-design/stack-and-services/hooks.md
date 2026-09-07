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

Hooks extend a Stack lifecycle with actions that run around service operations. A hook must document its trigger, ordering, idempotency, environment, and recovery behavior.

## Ordering {#ordering}

Pre-actions run before the target action and may validate or prepare state. The target action runs after successful pre-actions. Post-actions run after the target action and should record outcome or perform cleanup.

Hooks must not assume that unrelated services have completed unless the dependency graph guarantees that order. Failures must stop or report the operation according to the hook contract.

## Action environment {#action-environment}

The action environment supplies the command context, host, service, component, configuration, and operation metadata. Read values through the supported action APIs rather than relying on legacy Python 2 behavior or undocumented paths.

Use stable, explicit identifiers and make repeated execution safe. Test pre-action failure, target failure, post-action failure, retry, and rollback.
