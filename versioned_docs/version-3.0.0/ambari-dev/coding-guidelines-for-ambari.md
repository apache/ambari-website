# Coding Guidelines for Ambari

## Ambari Web Frontend Development Environment

### Application Assembler: Brunch

* Brunch was used to create the application skeleton for Ambari Web.

* Brunch builds and deploys code automatically in the background as you modify the source files. This lets you break up the application into a number of JS files for code organization and reuse without worrying about development turnaround or runtime load performance.

* Run a Node.js-based web server with a single command so that you can easily run Ambari Web without setting up Ambari Server (you still need to run Ambari Server for true end-to-end testing).

To check out Ambari Web from the Github repository and run it:

* Install Node.js from [http://nodejs.org](http://nodejs.org)
* Execute the following:

```bash
git clone https://git-wip-us.apache.org/repos/asf/ambari.git
cd ambari/ambari-web
sudo npm install -g brunch@1.7.20
rm -rf node_modules public
npm install
brunch build
```

_Note: if you receive a "gyp + xcodebuild" error when running "npm install", confirm you have Xcode CLI tools installed (Xcode > Preferences > Downloads)_
_Note: if you receive "Error: EMFILE, open" errors when running "brunch build", increase the ulimit for file descriptors (for example, "ulimit -n 10000")_

To run the web server in isolation with Ambari Server:

```
brunch watch --server (or use the shorthand: brunch w -s)
```

The above runs Ambari Web with a local test server at localhost:3333. The login/password is admin/admin

All Ambari front-end developers are highly recommended to use PhpStorm by JetBrains. JetBrains has kindly granted Apache Ambari an open-source license for PhpStorm and IntelliJ. These products are available to Ambari committers (if you are an Ambari committer, email [private@ambari.apache.org](mailto:private@ambari.apache.org) to request license keys). You can also use Eclipse if that is your preference.

* IDE Plugins

Go to Preferences->Plugins->Browse repositories and install "Node.js" and "Handlebars" plugins.

### Coding Conventions

For any JavaScript/Handlebars/LESS files, they should be formatted with the IDE to maintain consistency.

Also, the IDE will give warnings in the editor about implicit globals, etc. Fix these warnings before submitting patches.

We will use all default settings for Code Style in the IDE, except for the following:

```
Go to Preferences
Code Style->General
Line separator (for new files): Unix
Make sure "Use tab character" is NOT checked
Tab size: 2
Indent: 2
Continuation indent: 2
Code Style->JavaScript:
Tabs and Indents
Make sure "use tab character" is NOT checked
Set Tab size, Indent, and Continuation indent to "2".

Spaces->Other
Turn on "After name-value property separator ':'
```

In general, the following conventions should be followed for all JavaScript code: http://javascript.crockford.com/code.html

Exceptions to the rule from the above:

* We use 2 spaces instead of 4.

* Variable Declarations:
"It is preferred that each variable be given its own line and comment. They should be listed in alphabetical order."
Comment only where it makes sense. - No need to do alphabetical sorting.

* "JavaScript does not have block scope, so defining variables in blocks can confuse programmers who are experienced with other C family languages. Define all variables at the top of the function." - This does not need to be followed.

### Java Import Order

Some IDEs define their default import order differently and this can cause a lot of problems when creating patches and merging commits to different branches. The following are the checkstyle rules which are applied while executing the test phase of the build. Your IDE of choice should be updated to match these settings:

* The use of the wild card character, '*', should be avoided and all imports should be explicitly stated.

* The following order should be used for all import statements:
  - java
  - javax
  - org
  - com
  - other

### UI Unit Tests

All patches must be accompanied by unit tests ensuring good coverage. When unit tests are not applicable (e.g., stylistic or layout changes, etc.), you must explicitly state in the JIRA that unit tests are not applicable.

Unit tests are written using Mocha and run with the PhantomJS headless browser.

To run unit tests for ambari-web, run:

```bash
cd ambari-web
mvn test
```

## Ambari Backend Development

**Following points are borrowed from hadoop wiki:**

* All public classes and methods should have informative Javadoc comments.

* Do not use @author tags.

* Code must be formatted according to Sun's conventions, with one exception:
* Indent two spaces per level, not four.

* Contributions must pass existing unit tests.

* The code changes must be accompanied by unit tests. In cases where unit tests are not possible or don't make sense an explanation should be provided on the jira.

* New unit tests should be provided to demonstrate bugs and fixes. JUnit (junit4) is our test framework:
* You must implement a class that uses @Test annotations for all test methods.

* Define methods within your class whose names begin with test, and call JUnit's many assert methods to verify conditions. Please add meaningful messages to the assert statement to facilitate diagnostics.

* By default, do not let tests write any temporary files to /tmp. Instead, the tests should write to the location specified by the test.build.data system property.

* Logging levels should conform to Log4j levels
* Use slf4j instead of commons logging as the logging facade.

* Logger name should be the class name as far as possible.


**Unit tests**

* Developers should always run full unit tests before submitting their patch for code review and before committing to Apache. From the top-level directory,

```bash
mvn clean test
```

Sometimes it is useful to run unit tests just for the feature you are working on (e.g., Kerberos, Rolling/Express Upgrade, Stack Inheritance, Alerts, etc.). For this purpose, you can run unit tests with a given profile.

The profiles run all test classes/cases annotated with a given Category, E.g.,

```java
@Category({ category.AlertTest.class})
```

To run one of the profiles, look at the available names in the top-level pom.xml . E.g.,

```bash
mvn clean test -P AlertTests # Other options are AmbariUpgradeTests, BlueprintTests, KerberosTests, MetricsTests, StackUpgradeTests
```


After you're done testing just that suite, **you should run a full unit test using "mvn clean test".**
* [http://wiki.apache.org/hadoop/HowToDevelopUnitTests](http://wiki.apache.org/hadoop/HowToDevelopUnitTests)
* The tests should be named *Test.java
* **Unit testing with databases**
  - We should use JavaDB as the in-memory database for unit-test. The database layer/ORM should be configurable to use in memory database. Two things are important for the db in testing.

  - Ability to bootstrap the db with any initial data dynamically.

  - Ability to modify the db state out of band to simulate certain test cases. One way to achieve the above could be to implement a database access layer only for testing purposes, but it might cause inconsistency in ORM objects, which needs to be figured out.

* **Stub Heartbeat handler**
  - For testing purpose it may be a good idea to implement a stub heartbeat handler that only simulates interaction with the agents but doesn't interact with any real agent: It will expose an action queue similar to the real heartbeat handler, but will not send anything anywhere, will just periodically remove the action from the queue. It will expose an interface to inject artificial responses for each of the actions, which can be used in tests to simulate agent responses. It will also expose an interface to inject node state to simulate failure of nodes or lost heartbeats. Guice framework can be used to inject stub heartbeat handler in testing.

* **EasyMock**
  - EasyMock is our mocking framework of choice. It has been successfully used in hadoop.A few important points: An example of a scenario where Easymock is apt: Suppose we are testing deployment of a service but want to bypass a service dependency or want to inject an artificial component dependency, the dependency tracker object can be mocked to simulate the desired dependency scenario. Ambari server is by and large a state driven system. EasyMock can be used to bypass the state changes and test components narrowly. However, it is probably better to rather use in-memory database to simulate state changes and use EasyMock only when certain behavior cannot be easily simulated. For example consider testing API implementation to get status of a transaction. It can be tested by mocking the action manager object, alternatively, it can be tested by setting the state in the in-memory database. In this case, the later is a more comprehensive test.
  Avoid static methods and objects, Easymock cannot mock these. Use configuration or dependency injection to initialize static objects if they are likely to be mocked.
  EasyMock cannot mock final classes, so those should be avoided for classes likely to be mocked. Take a look at:[http://www.easymock.org/EasyMock3_1_Documentation.html](http://www.easymock.org/EasyMock3_1_Documentation.html) for docs.

**Guice**

Guice is a dependency injection framework and can be used to dynamically inject pluggable components.
Please refer http://code.google.com/p/google-guice/wikJamiroquaii/Motivation. We can use Guice in following scenarios:

* Pluggable manifest generator: It may be desirable to have different implementation of manifest generator for non-puppet setup or for testing.

* Injecting in-memory database (if possible) instead of a real persistent database for testing. It needs to be investigated how Guice fits with the ORM tools.

* Injecting a stub implementation of heartbeat handler.

* It may be a good idea to bind API implementations for management or monitoring via Guice. This will allow testing of APIs and the server independent of the implementation via mock implementations. For example, the management api implementation in coordinator can be mocked so that API definitions and URIs can be independently tested.

* Injecting mock objects for dependency tracker, or stage planner for testing.
