---
title: Running Tests
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

# Running Tests in Apache Ambari {#running-tests-in-apache-ambari}

Run commands from the repository root with JDK 17, Maven 3.9.x, the supported CPython build environment, and Node 22/npm when UI tests are included.

## Java Tests {#java-tests}

Run Server Java tests and reactor dependencies:

```bash
mvn -am test -pl ambari-server -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

Run one existing class, allowing reactor dependencies that do not contain that class:

```bash
mvn -am test -pl ambari-server -DskipPythonTests -Dtest=AmbariServerTest -Dsurefire.failIfNoSpecifiedTests=false -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

## Python Tests {#python-tests}

The Agent and Server Maven executions invoke their respective `src/test/python/unitTests.py` runners. The default mask is `[Tt]est*.py`, covering both supported filename styles. Run the selected product module without excluding Python tests:

```bash
mvn -am test -pl ambari-agent -DskipSurefireTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
mvn -am test -pl ambari-server -DskipSurefireTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

For an existing Agent file, add `-Dpython.test.mask=TestCommandStatusDict.py` to the Agent command. Use an actual filename or supported glob for the selected runner; zero discovered tests is an error, not a passing suite. These executions test Ambari product Python code, separately from the packaged `cp39` ABI and the website test suite.

## React And Website Checks {#react-and-website-checks}

The `ambari-web/latest` package has its own npm scripts. Run these from that directory with its Node/npm toolchain:

```bash
npm ci
npm test
npm run build
```

In the separate website repository, `yarn test:i18n` checks translated document structure and `yarn test:e2e` runs website browser checks. Website checks do not validate Ambari Server or Agent behavior.

## Integration Tests {#integration-tests}

The functional-test module is `ambari-funtest`. Its Maven configuration defines Surefire/Failsafe execution; prepare its database/container/service prerequisites before running:

```bash
mvn -am verify -pl ambari-funtest -DskipFunctionalTests=false -DskipPythonTests -DskipAdminWebTests=true -DskipUiBuild=true -Drat.skip
```

## Reports And Parameters {#reports-and-parameters}

`-am` builds dependencies, `-pl` selects projects, `-DskipPythonTests` skips the Python executions, `-DskipSurefireTests` skips configured Java Surefire tests, and `-Drat.skip` skips Apache RAT. Functional and UI test switches have their own scopes. Record every skip; do not substitute an undeclared `skipJavaTests` property or a nonexistent integration profile. See [Unit Test Reports](./unit-test-reports.md).

The command contracts come from the pinned [Agent POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/pom.xml), [Server POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/pom.xml), and [functional-test POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-funtest/pom.xml).
