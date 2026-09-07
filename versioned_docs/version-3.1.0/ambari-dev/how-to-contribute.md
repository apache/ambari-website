---
title: How to Contribute
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

# How to Contribute {#how-to-contribute}

Apache Ambari contributions are developed openly through Apache JIRA and GitHub. Before starting, search existing JIRA issues and discussions; reuse the issue when one already covers the work.

## Choose and scope the work {#choose-and-scope-the-work}

Describe the problem, affected modules, user-visible behavior, and recovery behavior. A change spanning server, agent, React UI, or telemetry should identify each contract and its owner.

For a new feature, publish a short design in JIRA before implementation. Explain compatibility, API or event changes, permissions, migration, observability, and rollback. Ask for community feedback before treating the design as accepted.

## Develop on a fork {#develop-on-a-fork}

Fork `apache/ambari` on GitHub and clone your personal fork. Keep `upstream` pointed at `apache/ambari`, and base the work on `trunk` unless the JIRA specifies another supported branch.

Create a topic branch for each coherent change. Do not mix unrelated cleanup, generated output, dependency upgrades, or formatting churn into the feature branch.

## Make and test changes {#make-and-test-changes}

Use explicit staging when committing: inspect `git diff`, stage only intended paths, and verify `git diff --cached` before each commit. Use the JIRA key in commit subjects.

Add focused tests for changed behavior, including failure and recovery paths for asynchronous or stateful workflows. Run the narrowest relevant server, agent, React, or telemetry tests and record the exact commands and results.

## Submit and review {#submit-and-review}

Push the topic branch to your fork and open a pull request from that branch to `apache/ambari:trunk`. Link the JIRA and explain the implementation, risks, test evidence, and any source or documentation limitations.

The author must not approve their own pull request. Request an independent reviewer familiar with the affected area; reviewers should inspect source evidence, API payloads, permissions, and recovery behavior rather than relying on matching names or routes.

Address review comments with follow-up commits, keep the pull request focused, and update the test evidence after changes. Merge only after required independent approval and automated checks succeed.
