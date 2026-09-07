---
title: Development Process for New Major Features
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

# Development Process for New Major Features {#development-process-for-new-major-features}

New major features for Ambari 3.1 require a written design before implementation. The design is discussed in Apache JIRA and must identify the user workflow, compatibility boundary, and owners.

## Design requirements {#design-requirements}

Describe behavior for Ambari Server and Agent APIs, React UI routes and permissions, and telemetry or alert contracts when those surfaces are affected. Include data migration, upgrade and downgrade behavior, failure recovery, observability, security, and rollback.

Compare the proposed behavior with the relevant legacy implementation and current source. Record source evidence and call out any disagreement or known source inaccuracy; do not infer parity from names alone.

## Implementation {#implementation}

Develop on a topic branch forked from `apache/ambari:trunk`. Keep shared contracts, required consumers, and focused tests together. Separate unrelated cleanup, generated evidence, and broad mechanical edits.

Stage only intended files and review `git diff --cached` before each commit. Use the JIRA key in commit subjects. Preserve API identifiers and document compatibility for downstream users.

## Validation and review {#validation-and-review}

Test success, failure, retry, refresh, and recovery paths. Run focused Server, Agent, React, and telemetry tests, then record exact commands, skipped tests, and residual risks in the pull request.

Open the pull request from your fork to `apache/ambari:trunk`. The author must not approve it; require independent review from owners of each affected surface and merge only after required checks and evidence pass.
