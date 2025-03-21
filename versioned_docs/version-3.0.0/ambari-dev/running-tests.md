---
title: Running Tests
---

# Running Tests in Apache Ambari

This guide explains how to run different types of tests in Apache Ambari. For the official test configuration, you can refer to the [Ambari Jenkinsfile](https://github.com/apache/ambari/blob/trunk/Jenkinsfile).

## Java Tests

### Running All Java Tests
To run all Java tests for the Ambari Server:
```bash
mvn -am test -pl ambari-server \
    -DskipPythonTests \
    -Dmaven.test.failure.ignore \
    -Dmaven.artifact.threads=10 \
    -Drat.skip \
    -DskipAdminWebTests=true
```

### Running Specific Java Tests
To run a specific Java test class:
```bash
mvn -am test -pl ambari-server \
    -DskipPythonTests \
    -Dmaven.test.failure.ignore \
    -Dmaven.artifact.threads=10 \
    -Drat.skip \
    -DskipAdminWebTests=true \
    -Dtest=AmbariServerTest
```

To run a specific test method within a test class:
```bash
mvn -am test -pl ambari-server \
    -DskipPythonTests \
    -Dmaven.test.failure.ignore \
    -Dmaven.artifact.threads=10 \
    -Drat.skip \
    -DskipAdminWebTests=true \
    -Dtest=AmbariServerTest#testMethodName
```

### Test Parameters Explained
- `-am`: Also build dependencies
- `-pl ambari-server`: Only build the ambari-server module
- `-DskipPythonTests`: Skip Python tests
- `-Dmaven.test.failure.ignore`: Continue the build even if tests fail
- `-Dmaven.artifact.threads=10`: Use 10 threads for parallel artifact resolution
- `-Drat.skip`: Skip Apache RAT (Release Audit Tool) checks
- `-DskipAdminWebTests`: Skip admin web interface tests
- `-Dtest`: Specify which test class or method to run

## Python Tests

### Running All Python Tests
To run all Python tests:
```bash
mvn test -pl ambari-server \
    -DskipJavaTests \
    -Dpython.test.mask="*_test.py" \
    -Dpython.test.skip.pattern="agent_perf.py"
```

### Running Specific Python Tests
To run a specific Python test file:
```bash
mvn test -pl ambari-server \
    -DskipJavaTests \
    -Dpython.test.mask="test_file_name.py"
```

### Python Test Parameters Explained
- `-DskipJavaTests`: Skip Java tests
- `-Dpython.test.mask`: Pattern to match test files to run
- `-Dpython.test.skip.pattern`: Pattern to match test files to skip

## Integration Tests

### Running Integration Tests
To run integration tests:
```bash
mvn verify -pl ambari-server \
    -P integration-tests \
    -DskipPythonTests \
    -DskipJavaTests
```

### Integration Test Parameters
- `-P integration-tests`: Activate the integration-tests profile
- `-DskipPythonTests`: Skip Python tests
- `-DskipJavaTests`: Skip Java tests

## Test Reports

Test reports can be found in the following locations after test execution:

### Java Test Reports
- Unit Tests: `ambari-server/target/surefire-reports/`
- Integration Tests: `ambari-server/target/failsafe-reports/`

### Python Test Reports
- Test Results: `ambari-server/target/python-test-results/`
- Coverage Reports: `ambari-server/target/python-coverage/`

:::tip
When debugging test failures, check these report directories for detailed test execution logs and stack traces.
:::
