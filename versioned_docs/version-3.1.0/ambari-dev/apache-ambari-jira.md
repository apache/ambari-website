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

Apache Ambari uses [JIRA](https://issues.apache.org/jira/browse/AMBARI) to track defects, improvements, documentation, and new features. Search before creating an issue and link related pull requests.

## Required issue context {#required-issue-context}

Describe the problem, expected behavior, affected release, reproduction steps, and relevant logs or source evidence. For a feature, include the design, compatibility impact, permissions, API or event contracts, migration, telemetry, and rollback plan.

Use one JIRA for one coherent deliverable. If work spans Ambari Server, Agent, React frontend, and telemetry, identify the boundaries and keep implementation and tests traceable to the same plan.

## Workflow {#workflow}

Create a topic branch from `apache/ambari:trunk` in your fork. Open a pull request from the fork to `apache/ambari:trunk`, link the JIRA, and keep its status and description current.

Stage files explicitly and include the JIRA key in commit subjects. Do not include credentials, generated artifacts, unrelated refactors, or changes outside the declared scope.

Close the JIRA only after independent review, required checks, focused tests, and recovery-path evidence are complete. Record unresolved source inaccuracies separately instead of inventing a fix.
