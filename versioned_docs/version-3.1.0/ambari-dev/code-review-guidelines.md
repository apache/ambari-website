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

Reviewers should first understand the JIRA problem, acceptance criteria, and compatibility boundary, then inspect both the source implementation and observable behavior. Compilation alone is not sufficient: verify that the change covers the user-visible workflow, authorization, API request and response contracts, asynchronous state transitions, error feedback, and recovery, and confirm that it does not exceed the declared scope.

## Review evidence {#review-evidence}

Require focused tests that identify the failing behavior precisely. Server and Agent changes should cover success, error propagation, state transitions, retry, and repeated execution. React changes should validate loading, empty, read-only, failure, and recovery states against the current API contract. Telemetry changes should verify metric names, types, units, label ownership, cardinality limits, retention, and alert semantics.

Check that tests exercise both success and failure and that the author reports complete commands, the runtime environment, skipped suites, and existing failures. After mocks pass, decide whether representative Server, Agent, database, or Stack validation is still required. The presence of a route, a matching component name, or a rendered page does not by itself prove parity in permissions, data flow, or recovery behavior.

## Review conduct {#review-conduct}

Prefer small, coherent pull requests with a clear topic history. Significant features, data-model changes, and cross-module contracts should complete design discussion and identify migration and rollback behavior before implementation is approved. When documentation, generated output, and runtime behavior disagree, require a pinned source revision, reproducible commands, and runtime evidence rather than filling gaps with assumptions.

The author must not approve their own pull request. At least one independent reviewer familiar with the affected module and compatibility risks should approve; security, database, and release-process changes should include the relevant maintainers. Required automated checks must pass before merge, and failures must not be removed by weakening assertions, broadening exclusions, or skipping the critical path.

Review comments should identify the source location, observable behavior, risk, and expected result so the author can verify the correction directly. Distinguish blockers, non-blocking suggestions, and assumptions that require clarification. On follow-up, verify that the original problem and its test evidence are resolved rather than checking only that the code changed.
