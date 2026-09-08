---
title: Releasing Apache Ambari 3.1.0
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

# Releasing Apache Ambari 3.1.0 {#releasing-apache-ambari-310}

This workflow prepares and publishes an Apache Ambari 3.1.0 release candidate. Every operation must use values from the release plan and vote announcement: replace `<version>`, `<rc>`, `<branch>`, and `<candidate-url>` with the corresponding release values. Never infer a release URL, checksum, or package name from a development version, and never overwrite a candidate that has entered a vote.

## Prepare the branch {#prepare-the-branch}

Confirm the release JIRA, release branch, candidate scope, and included commits, then freeze the change boundary. Review source headers, LICENSE, NOTICE, third-party dependencies, generated files, version properties, and release notes, and confirm that the source archive contains no local credentials or build output. Build from a clean checkout with the current RPM configuration and required JDK and Python versions, recording the complete environment.

Run Server, Agent, React, Stack, and packaging tests appropriate to the candidate, including critical failure and recovery paths. Record complete commands, tool versions, operating system, processor architecture, generated artifacts, test reports, and skipped checks. Passing automated tests does not replace representative installation, upgrade, rollback, and service-operation validation.

## Stage and vote {#stage-and-vote}

Generate the required checksums and detached PGP signatures for the final source archive with an Apache release-manager key, and verify the signing-key fingerprint. Keep the source archive, signatures, checksums, build logs, and provenance together in candidate staging. Files under one candidate identifier must remain immutable; any content change requires a new candidate.

Announce the candidate on the Apache Ambari developer list with its URL, source tag, checksums, signatures, release-manager key, build evidence, and an explicit voting deadline, and state what reviewers should verify. The vote determines whether the ASF source release is compliant and usable. Package tests, BIGTOP Stack compatibility, and platform qualification are separate evidence and do not replace the vote.

After a successful vote, publish only the approved artifacts and update download pages, release notes, version metadata, and the announcement. If the vote fails, record the blocking defects, fix the source, create a new candidate identifier, and repeat all required verification. Do not replace files in an existing candidate or reuse obsolete signatures and checksums.
