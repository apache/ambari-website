---
title: Verifying an Apache Ambari 3.1.0 Release Candidate
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

# Verifying an Apache Ambari 3.1.0 Release Candidate {#verifying-an-apache-ambari-310-release-candidate}

Use the exact `<candidate-url>`, `<version>`, and `<rc>` from the release announcement. Start from the announced staging location and perform the download, signature verification, and build independently. Never infer a URL, checksum, tag, or package version from a branch name or development version, and do not reuse files left by another candidate.

## Verify provenance {#verify-provenance}

Download the source archive, detached signature, and checksum from candidate staging and confirm that all three names and versions correspond. The proposed tag, archive content, release-manager key, and vote announcement must agree. After extracting the archive, inspect LICENSE, NOTICE, source headers, dependency licenses, unexpected generated content, bundled credentials, binary files, and undeclared dependencies. Confirm that the archive builds without relying on the release manager's local workspace.

## Verify signatures and builds {#verify-signatures-and-builds}

Import the release-manager key independently from Apache KEYS, verify its fingerprint, and then verify both the detached PGP signature and the checksum named in the announcement. The signature establishes the signer and the checksum establishes content integrity; neither replaces the other. Build from source with the current RPM configuration and required JDK and Python versions, recording the operating system, processor architecture, tool versions, dependency sources, complete commands, and results.

Install the Server and Agent packages in a disposable or recoverable environment. Inspect package metadata, service entry points, and private dependencies before testing startup, Agent registration, database migration, a controlled service operation, and recovery after failure. Run Server, Agent, React, Stack, and telemetry tests appropriate to the candidate's scope. Record skipped checks and existing failures, and remove credentials and internal environment details from shared logs.

Release voting, source-archive validation, package verification, BIGTOP compatibility, and application testing are separate evidence categories. Success in one category does not replace the others. A vote should state what was actually verified, in which environment, and which paths were not covered.
