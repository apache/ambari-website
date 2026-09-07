---
title: Enhanced Configs
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

# Enhanced Configs {#enhanced-configs}

Enhanced Configs remain the service-definition mechanism for rich configuration forms in Ambari 3.1. A service theme supplies UI metadata without requiring changes to shared UI code.

## Configuration Resolution {#configuration-resolution}

![Stack defaults, service and cluster configuration, configuration-group overrides, host context, protected inputs, validation, versioned save, and Agent assignment](/img/3.1.0/handdrawn/configuration-resolution-en.webp)

Ambari resolves the Stack defaults, cluster desired configuration, matching configuration-group overrides, and host or component context into one effective value set. Protected inputs follow the credential path instead of being copied into ordinary service properties. The resulting configuration is validated and versioned before assignment to Agents.

## Metadata Model {#metadata-model}

Themes define `layouts`, `placement`, and `widgets`. Layouts describe tabs, sections, and subsections. Placement binds configuration keys to subsections. Widget metadata binds a configuration to controls such as sliders, lists, toggles, directories, passwords, text fields, checkboxes, and text areas.

Configuration metadata supplies `display-name` and `value-attributes`, including type, minimum, maximum, unit, increment-step, and enumerated entries. `depends-on` properties form a directed dependency graph; a change can trigger Stack Advisor recommendations for dependent values.

## Effective Conditions And Validation {#effective-conditions-and-validation}

The effective form combines Stack defaults, service configuration metadata, the selected theme, and the current configuration values. A widget's display unit can differ from the persisted unit; conversion is applied when values are shown or saved. Validation enforces declared types, ranges, enumerations, and required values before a configuration can be submitted.

Dependency updates are scoped to changed properties. The recommendations request receives the changed configuration list and returns only affected dependencies. Invalid metadata, unsupported widget definitions, or values outside declared constraints must be corrected before saving.

## Save And Reload {#save-and-reload}

Ambari saves the resulting configuration through its normal configuration APIs. Changes to a theme or Stack definition require restarting Ambari Server so the metadata is reloaded. Themes are retained in 3.1; the removed legacy monitoring widget model is unrelated to these configuration-form controls.

See the pinned [theme and configuration implementation](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP) for current Stack-owned metadata.
