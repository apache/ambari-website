---
title: How to Commit
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

# How to Commit {#how-to-commit}

Committers are responsible for the correctness and maintainability of changes committed to Apache Ambari. Every commit must be traceable to a JIRA issue or an explicitly documented exception.

Review the pull request history, source implementation, and test evidence before committing. A green check is evidence, not a substitute for technical review.

Use Review Then Commit (RTC) for normal changes. The author must not approve their own pull request; an independent committer familiar with the affected area must review it.

## Commit preparation {#commit-preparation}

Confirm that the pull request targets the intended `apache/ambari` branch and that its JIRA key, scope, and source evidence agree. Check permissions, API contracts, migrations, telemetry, and failure or recovery behavior where applicable.

Inspect `git diff` and stage paths explicitly. Before committing, inspect `git diff --cached` and ensure no credentials, generated files, unrelated edits, or unreviewed changes are included.

Keep topic commits coherent. A contract change and the consumers required for that contract belong together; independent workflows, broad mechanical edits, and generated evidence should be separate commits when practical.

## Commit and follow up {#commit-and-follow-up}

Use a JIRA key in the commit subject and preserve useful review context in the body. Run the focused tests listed by the author after the final revision, and record failures or skipped checks honestly.

After committing, verify the branch and remote history. If a bug fix must be backported, create a separate review against the supported target branch and rerun its applicable tests.

If new evidence reveals a defect, stop the commit or open a follow-up JIRA rather than hiding the issue in an unrelated change.
