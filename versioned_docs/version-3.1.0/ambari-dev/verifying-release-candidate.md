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

Use `<candidate-url>`, `<version>`, and `<rc>` from the release announcement. Never substitute a guessed URL, checksum, or package version.

## Verify provenance {#verify-provenance}

Download the source archive, detached signature, and checksum from candidate staging. Confirm that archive name, proposed tag, and release-manager key agree with the vote announcement. Inspect licenses, notices, generated content, bundled credentials, and undeclared dependencies.

## Verify signatures and builds {#verify-signatures-and-builds}

Import the release-manager key from Apache KEYS and verify the detached PGP signature and named checksum. Build from source with the current RPM profile and required JDK and Python versions, recording tool versions and provenance.

Install Server and Agent packages in a disposable environment. Exercise startup, registration, migration, and recovery after a failed operation. Run focused Server, Agent, React, and telemetry tests, reporting failures without credentials.

Release voting, package verification, Bigtop compatibility, and application tests are separate evidence categories.
