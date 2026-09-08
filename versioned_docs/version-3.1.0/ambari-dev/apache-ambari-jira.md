---
title: Apache Ambari JIRA
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

# Apache Ambari JIRA {#apache-ambari-jira}

Apache Ambari uses [JIRA](https://issues.apache.org/jira/browse/AMBARI) to track defects, improvements, documentation, and new features. Search existing issues before creating another record for the same problem. Once implementation starts, link design discussion, pull requests, test results, and compatibility decisions so the issue preserves the complete path from proposal to delivery.

## Required issue context {#required-issue-context}

A defect report should describe actual and expected behavior, affected releases, environment prerequisites, minimal reproduction steps, and redacted logs or source evidence. A feature should also identify goals and non-goals, compatibility impact, permissions, API or event contracts, data migration, observability, failure handling, and rollback. Mark facts that still require validation instead of presenting them as established behavior.

Use one JIRA for one coherent, independently reviewable deliverable. If work spans Ambari Server, Agent, React, the database, and telemetry, identify each module's responsibility, interface changes, and delivery order. Keep commits, tests, documentation, and migration steps traceable to that plan. Update the issue or create linked subtasks when the scope expands rather than silently adding unrelated work to a pull request.

## Workflow {#workflow}

Create a topic branch from the latest `apache/ambari:trunk` in a personal fork. Open a pull request from the fork to `apache/ambari:trunk`, reference the JIRA in its title and commits, and update the issue when review, implementation scope, or test conclusions change. Before submission, confirm that the branch does not contain commits from another task.

Inspect and stage files explicitly, include the JIRA key in commit subjects, and review the staged diff before committing. Do not include credentials, local environment files, build output, large generation sources, unrelated formatting, or refactoring outside the declared scope. Generated deliverables that must be retained should document their source, reproduction method, and review path.

Close the JIRA only after independent review, required automated checks, focused tests, recovery-path evidence, and consistent documentation. Keep unverified platforms, roles, and failure scenarios open or create follow-up work. If source behavior differs from the intended contract, record the discrepancy with evidence instead of inventing a fix in documentation.
