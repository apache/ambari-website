---
title: Stack and Services FAQ
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

# Stack and Services FAQ {#stack-and-services-faq}

## How does inheritance work? {#how-does-inheritance-work}

A child Stack may inherit service definitions and properties from a parent Stack. The child should override only values required for its platform or release, leaving common behavior in the parent.

## Which version is selected? {#which-version-is-selected}

Stack selection identifies service definitions and compatible configuration. It is separate from selecting Ambari Server and Agent RPM versions. Ambari Metrics RPMs are not selected by service-version selection.

## What should a new Stack document? {#what-should-a-new-stack-document}

Document services, components, dependencies, configuration, lifecycle commands, alerts, and supported platforms. Keep identifiers stable and record migration and recovery behavior for changes.

## How should changes be tested? {#how-should-changes-be-tested}

Test inheritance, service version resolution, install, start, stop, restart, upgrade, failure, and recovery. Validate both the Stack metadata and the generated deployment plan.
