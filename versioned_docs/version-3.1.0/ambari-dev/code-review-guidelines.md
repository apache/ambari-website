---
title: Code Review Guidelines
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

# Code Review Guidelines {#code-review-guidelines}

Reviewers should first understand the JIRA goal and inspect the source implementation. Verify that the change actually covers the user-visible workflow, permissions, API payloads, asynchronous states, and recovery behavior.

## Review evidence {#review-evidence}

Require focused tests for changed behavior. For server and agent changes, inspect failure handling and state transitions. For React changes, compare the legacy behavior and current source. For telemetry, verify metric names, ownership, retention, and alert behavior.

Check that tests cover both success and failure paths, and that the author reports exact commands, skipped tests, and existing failures. Do not treat a route or component name as proof of feature parity.

## Review conduct {#review-conduct}

Prefer small, coherent pull requests and topic commits. Ask for a design discussion before approving a substantial new feature or cross-module contract. Request source evidence when documentation, generated output, or runtime behavior is ambiguous.

The author must not approve their own pull request. At least one independent reviewer familiar with the affected area should approve, and required automated checks must pass before merge.

Review comments should be specific, actionable, and tied to a source line or observable behavior. Distinguish blockers from suggestions, and verify the fix in a subsequent review.
