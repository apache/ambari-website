"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8378],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>d});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=p(a),d=i,h=u["".concat(s,".").concat(d)]||u[d]||c[d]||r;return a?n.createElement(h,o(o({ref:t},m),{},{components:a})):n.createElement(h,o({ref:t},m))}));function d(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},16625:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var n=a(87462),i=(a(67294),a(3905));const r={},o="Coding Guidelines for Ambari",l={unversionedId:"ambari-dev/coding-guidelines-for-ambari",id:"version-2.7.5/ambari-dev/coding-guidelines-for-ambari",title:"Coding Guidelines for Ambari",description:"Ambari Web Frontend Development Environment",source:"@site/versioned_docs/version-2.7.5/ambari-dev/coding-guidelines-for-ambari.md",sourceDirName:"ambari-dev",slug:"/ambari-dev/coding-guidelines-for-ambari",permalink:"/docs/2.7.5/ambari-dev/coding-guidelines-for-ambari",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-dev/coding-guidelines-for-ambari.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Apache Ambari JIRA",permalink:"/docs/2.7.5/ambari-dev/apache-ambari-jira"},next:{title:"How to Commit",permalink:"/docs/2.7.5/ambari-dev/how-to-commit"}},s={},p=[{value:"Ambari Web Frontend Development Environment",id:"ambari-web-frontend-development-environment",level:2},{value:"Application Assembler: Brunch",id:"application-assembler-brunch",level:3},{value:"Coding Conventions",id:"coding-conventions",level:3},{value:"Java Import Order",id:"java-import-order",level:3},{value:"UI Unit Tests",id:"ui-unit-tests",level:3},{value:"Ambari Backend Development",id:"ambari-backend-development",level:2}],m={toc:p};function c(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"coding-guidelines-for-ambari"},"Coding Guidelines for Ambari"),(0,i.kt)("h2",{id:"ambari-web-frontend-development-environment"},"Ambari Web Frontend Development Environment"),(0,i.kt)("h3",{id:"application-assembler-brunch"},"Application Assembler: Brunch"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Brunch was used to create the application skeleton for Ambari Web.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Brunch builds and deploys code automatically in the background as you modify the source files. This lets you break up the application into a number of JS files for code organization and reuse without worrying about development turnaround or runtime load performance.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Run a Node.js-based web server with a single command so that you can easily run Ambari Web without setting up Ambari Server (you still need to run Ambari Server for true end-to-end testing)."))),(0,i.kt)("p",null,"To check out Ambari Web from the Github repository and run it:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Install Node.js from ",(0,i.kt)("a",{parentName:"li",href:"http://nodejs.org"},"http://nodejs.org")),(0,i.kt)("li",{parentName:"ul"},"Execute the following:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://git-wip-us.apache.org/repos/asf/ambari.git\ncd ambari/ambari-web\nsudo npm install -g brunch@1.7.20\nrm -rf node_modules public\nnpm install\nbrunch build\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},'Note: if you receive a "gyp + xcodebuild" error when running "npm install", confirm you have Xcode CLI tools installed (Xcode > Preferences > Downloads)'),"\n",(0,i.kt)("em",{parentName:"p"},'Note: if you receive "Error: EMFILE, open" errors when running "brunch build", increase the ulimit for file descriptors (for example, "ulimit -n 10000")')),(0,i.kt)("p",null,"To run the web server in isolation with Ambari Server:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"brunch watch --server (or use the shorthand: brunch w -s)\n")),(0,i.kt)("p",null,"The above runs Ambari Web with a local test server at localhost:3333. The login/password is admin/admin"),(0,i.kt)("p",null,"All Ambari front-end developers are highly recommended to use PhpStorm by JetBrains. JetBrains has kindly granted Apache Ambari an open-source license for PhpStorm and IntelliJ. These products are available to Ambari committers (if you are an Ambari committer, email ",(0,i.kt)("a",{parentName:"p",href:"mailto:private@ambari.apache.org"},"private@ambari.apache.org")," to request license keys). You can also use Eclipse if that is your preference."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"IDE Plugins")),(0,i.kt)("p",null,'Go to Preferences->Plugins->Browse repositories and install "Node.js" and "Handlebars" plugins.'),(0,i.kt)("h3",{id:"coding-conventions"},"Coding Conventions"),(0,i.kt)("p",null,"For any JavaScript/Handlebars/LESS files, they should be formatted with the IDE to maintain consistency."),(0,i.kt)("p",null,"Also, the IDE will give warnings in the editor about implicit globals, etc. Fix these warnings before submitting patches."),(0,i.kt)("p",null,"We will use all default settings for Code Style in the IDE, except for the following:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'Go to Preferences\nCode Style->General\nLine separator (for new files): Unix\nMake sure "Use tab character" is NOT checked\nTab size: 2\nIndent: 2\nContinuation indent: 2\nCode Style->JavaScript:\nTabs and Indents\nMake sure "use tab character" is NOT checked\nSet Tab size, Indent, and Continuation indent to "2".\n\nSpaces->Other\nTurn on "After name-value property separator \':\'\n')),(0,i.kt)("p",null,"In general, the following conventions should be followed for all JavaScript code: ",(0,i.kt)("a",{parentName:"p",href:"http://javascript.crockford.com/code.html"},"http://javascript.crockford.com/code.html")),(0,i.kt)("p",null,"Exceptions to the rule from the above:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"We use 2 spaces instead of 4.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},'Variable Declarations:\n"It is preferred that each variable be given its own line and comment. They should be listed in alphabetical order."\nComment only where it makes sense. - No need to do alphabetical sorting.')),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},'"JavaScript does not have block scope, so defining variables in blocks can confuse programmers who are experienced with other C family languages. Define all variables at the top of the function." - This does not need to be followed.'))),(0,i.kt)("h3",{id:"java-import-order"},"Java Import Order"),(0,i.kt)("p",null,"Some IDEs define their default import order differently and this can cause a lot of problems when creating patches and merging commits to different branches. The following are the checkstyle rules which are applied while executing the test phase of the build. Your IDE of choice should be updated to match these settings:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The use of the wild card character, '*', should be avoided and all imports should be explicitly stated.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The following order should be used for all import statements:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"java"),(0,i.kt)("li",{parentName:"ul"},"javax"),(0,i.kt)("li",{parentName:"ul"},"org"),(0,i.kt)("li",{parentName:"ul"},"com"),(0,i.kt)("li",{parentName:"ul"},"other")))),(0,i.kt)("h3",{id:"ui-unit-tests"},"UI Unit Tests"),(0,i.kt)("p",null,"All patches must be accompanied by unit tests ensuring good coverage. When unit tests are not applicable (e.g., stylistic or layout changes, etc.), you must explicitly state in the JIRA that unit tests are not applicable."),(0,i.kt)("p",null,"Unit tests are written using Mocha and run with the PhantomJS headless browser."),(0,i.kt)("p",null,"To run unit tests for ambari-web, run:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd ambari-web\nmvn test\n")),(0,i.kt)("h2",{id:"ambari-backend-development"},"Ambari Backend Development"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Following points are borrowed from hadoop wiki:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"All public classes and methods should have informative Javadoc comments.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Do not use @author tags.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Code must be formatted according to Sun's conventions, with one exception:")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Indent two spaces per level, not four.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Contributions must pass existing unit tests.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The code changes must be accompanied by unit tests. In cases where unit tests are not possible or don't make sense an explanation should be provided on the jira.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"New unit tests should be provided to demonstrate bugs and fixes. JUnit (junit4) is our test framework:")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"You must implement a class that uses @Test annotations for all test methods.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Define methods within your class whose names begin with test, and call JUnit's many assert methods to verify conditions. Please add meaningful messages to the assert statement to facilitate diagnostics.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"By default, do not let tests write any temporary files to /tmp. Instead, the tests should write to the location specified by the test.build.data system property.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Logging levels should conform to Log4j levels")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Use slf4j instead of commons logging as the logging facade.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Logger name should be the class name as far as possible."))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Unit tests")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Developers should always run full unit tests before submitting their patch for code review and before committing to Apache. From the top-level directory,")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"mvn clean test\n")),(0,i.kt)("p",null,"Sometimes it is useful to run unit tests just for the feature you are working on (e.g., Kerberos, Rolling/Express Upgrade, Stack Inheritance, Alerts, etc.). For this purpose, you can run unit tests with a given profile."),(0,i.kt)("p",null,"The profiles run all test classes/cases annotated with a given Category, E.g.,"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@Category({ category.AlertTest.class})\n")),(0,i.kt)("p",null,"To run one of the profiles, look at the available names in the top-level pom.xml . E.g.,"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"mvn clean test -P AlertTests # Other options are AmbariUpgradeTests, BlueprintTests, KerberosTests, MetricsTests, StackUpgradeTests\n")),(0,i.kt)("p",null,"After you're done testing just that suite, ",(0,i.kt)("strong",{parentName:"p"},'you should run a full unit test using "mvn clean test".')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"http://wiki.apache.org/hadoop/HowToDevelopUnitTests"},"http://wiki.apache.org/hadoop/HowToDevelopUnitTests"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The tests should be named *Test.java")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Unit testing with databases")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"We should use JavaDB as the in-memory database for unit-test. The database layer/ORM should be configurable to use in memory database. Two things are important for the db in testing.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Ability to bootstrap the db with any initial data dynamically.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Ability to modify the db state out of band to simulate certain test cases. One way to achieve the above could be to implement a database access layer only for testing purposes, but it might cause inconsistency in ORM objects, which needs to be figured out.")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Stub Heartbeat handler")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"For testing purpose it may be a good idea to implement a stub heartbeat handler that only simulates interaction with the agents but doesn't interact with any real agent: It will expose an action queue similar to the real heartbeat handler, but will not send anything anywhere, will just periodically remove the action from the queue. It will expose an interface to inject artificial responses for each of the actions, which can be used in tests to simulate agent responses. It will also expose an interface to inject node state to simulate failure of nodes or lost heartbeats. Guice framework can be used to inject stub heartbeat handler in testing."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"EasyMock")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"EasyMock is our mocking framework of choice. It has been successfully used in hadoop.A few important points: An example of a scenario where Easymock is apt: Suppose we are testing deployment of a service but want to bypass a service dependency or want to inject an artificial component dependency, the dependency tracker object can be mocked to simulate the desired dependency scenario. Ambari server is by and large a state driven system. EasyMock can be used to bypass the state changes and test components narrowly. However, it is probably better to rather use in-memory database to simulate state changes and use EasyMock only when certain behavior cannot be easily simulated. For example consider testing API implementation to get status of a transaction. It can be tested by mocking the action manager object, alternatively, it can be tested by setting the state in the in-memory database. In this case, the later is a more comprehensive test.\nAvoid static methods and objects, Easymock cannot mock these. Use configuration or dependency injection to initialize static objects if they are likely to be mocked.\nEasyMock cannot mock final classes, so those should be avoided for classes likely to be mocked. Take a look at:",(0,i.kt)("a",{parentName:"li",href:"http://www.easymock.org/EasyMock3_1_Documentation.html"},"http://www.easymock.org/EasyMock3_1_Documentation.html")," for docs.")))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Guice")),(0,i.kt)("p",null,"Guice is a dependency injection framework and can be used to dynamically inject pluggable components.\nPlease refer ",(0,i.kt)("a",{parentName:"p",href:"http://code.google.com/p/google-guice/wikJamiroquaii/Motivation"},"http://code.google.com/p/google-guice/wikJamiroquaii/Motivation"),". We can use Guice in following scenarios:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Pluggable manifest generator: It may be desirable to have different implementation of manifest generator for non-puppet setup or for testing.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Injecting in-memory database (if possible) instead of a real persistent database for testing. It needs to be investigated how Guice fits with the ORM tools.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Injecting a stub implementation of heartbeat handler.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"It may be a good idea to bind API implementations for management or monitoring via Guice. This will allow testing of APIs and the server independent of the implementation via mock implementations. For example, the management api implementation in coordinator can be mocked so that API definitions and URIs can be independently tested.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Injecting mock objects for dependency tracker, or stage planner for testing."))))}c.isMDXComponent=!0}}]);