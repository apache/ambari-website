---
title: Unit Test Reports
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

# Unit Test Reports {#unit-test-reports}

## Ambari Product Reports {#ambari-product-reports}

After Maven tests, inspect the module that was actually executed:

- Java unit tests: `ambari-server/target/surefire-reports/`
- Functional-module Surefire tests: `ambari-funtest/target/surefire-reports/`
- Functional-module Failsafe tests: `ambari-funtest/target/failsafe-reports/`
- Agent Python runner log: `ambari-agent/target/tests.log`, together with captured test output and exit status
- Server Python runner: captured stdout/stderr, including discovered test totals, failures, and exit status

The default Python runners use text test results. They do not automatically produce `python-test-results` or `python-coverage` directories; collect coverage separately with the tooling selected by the validation job.

Reports are evidence for the selected Maven reactor and profile. A skipped suite has no passing report, and a failure ignored by Maven remains a failure in the report.

The paths and output behavior are defined by the pinned [Agent runner](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/src/test/python/unitTests.py), [Server runner](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/src/test/python/unitTests.py), and [functional-test module](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-funtest/pom.xml).

## Build And Packaging Reports {#build-and-packaging-reports}

Review module `target` directories for RPMs, wheel metadata, dependency audits, and SBOM output. The packaged CPython 3.9 ABI and platform profile must match the artifact under review.

## Website Reports {#website-reports}

Website checks are separate from Ambari product tests:

- `yarn test:i18n` reports Markdown structure, links, images, and locale coverage.
- `yarn test:e2e` reports browser behavior for the website/UI build.

These checks do not certify Server, Agent, Stack, KDC, database, or real-cluster behavior.

## Interpreting Results {#interpreting-results}

Record the exact command, module/profile, runtime versions, skipped suites, and report paths. For a release or runtime change, combine focused reports with representative Server/Agent and Stack validation; do not infer end-to-end acceptance from a single dashboard, website check, or generated XML file.
