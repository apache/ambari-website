---
title: Feature Flags
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

# Feature Flags {#feature-flags}

Feature flags allow Ambari to expose a controlled capability before it becomes a general default, or to provide a deliberate escape hatch for an edge case. A flag is a product and compatibility decision, not a substitute for authorization or server-side validation.

## React Settings Surface {#react-settings-surface}

The React application loads the supported settings from the Ambari context and presents them at `/experimental`. The route is guarded by `AMBARI.MANAGE_SETTINGS`; users without that authorization cannot use the settings page.

The settings page edits flags individually and keeps unsaved changes local to the page. Save writes the per-user key `user-pref-${loginName}-supports` through the existing persistence API, then updates shared application state. A failed save leaves the edit state available for correction and retry.

The application merges persisted values over `DEFAULT_SUPPORTS`, so an absent or malformed persisted value does not remove the shipped defaults. The server remains the source of the persisted preference; feature consumers read the shared React context rather than a legacy global map.

## Resetting UI State {#resetting-ui-state}

Reset UI States is a separate operation from changing a flag. It requires `CLUSTER.MANAGE_USER_PERSISTED_DATA` and is disabled for a user who does not own the active wizard state. On success it clears persisted `wizard-data`, removes the local preferred path, and reloads the application. A failed reset does not claim success or discard the current state.

## Adding A Flag {#adding-a-flag}

Define a flag only when the behavior has a clear owner, default, authorization boundary, and removal plan. Add its default to the current React supports model, consume it through the shared context or an explicit feature guard, and test enabled, disabled, unauthorized, persistence, and failure paths.

Do not add flags by searching for or extending the historical Ember `App.supports` map. The current implementation is in `ambari-web/latest/src/constants.ts`, `ambari-web/latest/src/store/context.tsx`, `ambari-web/latest/src/screens/Experimental`, and `ambari-web/latest/src/components/FeatureRouteGuard.tsx`.

## Test And Ownership Checklist {#test-and-ownership-checklist}

For each flag, document the owning screen or route, the default value, the server persistence key, and the permission required to change it. A flag consumer should have a focused test for both values and for an unavailable or malformed persisted value.

Keep feature flags narrowly scoped and remove them when the guarded behavior is stable. Do not use a flag to hide a failed request, weaken an authorization check, or silently change a persisted workflow.

Review flag changes with the owning workflow maintainer before enabling them in a release.
