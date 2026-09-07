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

This workflow releases an Apache Ambari 3.1.0 candidate. Replace `<version>`, `<rc>`, `<branch>`, and `<candidate-url>` with values from the actual release work; never invent URLs, checksums, or package names.

## Prepare the branch {#prepare-the-branch}

Confirm the JIRA issue and release branch. Review source, notices, licenses, dependencies, generated files, and version properties. Build from a clean checkout using the current RPM profile and required JDK and Python versions.

Run focused Server, Agent, React, and packaging tests, including failure and recovery paths. Record exact commands, tool versions, operating system, artifacts, and skipped checks.

## Stage and vote {#stage-and-vote}

Generate checksums and detached PGP signatures with an Apache release-manager key. Keep source archives, signatures, checksums, logs, and provenance together in the candidate staging area.

Announce the candidate on the Apache Ambari developer list with its candidate URL, tag, checksums, signatures, build evidence, and voting deadline. The release vote is separate from package tests and Bigtop Stack compatibility.

After a successful vote, publish the approved artifacts. If the vote fails, record defects, create a new candidate, and repeat verification without replacing an existing candidate.
