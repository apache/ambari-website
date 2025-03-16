"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[3006],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>d});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),p=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=p(a),d=r,k=c["".concat(o,".").concat(d)]||c[d]||u[d]||l;return a?n.createElement(k,i(i({ref:t},m),{},{components:a})):n.createElement(k,i({ref:t},m))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},61030:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var n=a(87462),r=(a(67294),a(3905));const l={},i="Ambari Development",s={unversionedId:"ambari-dev/index",id:"version-2.7.6/ambari-dev/index",title:"Ambari Development",description:"Checking out Ambari source",source:"@site/versioned_docs/version-2.7.6/ambari-dev/index.md",sourceDirName:"ambari-dev",slug:"/ambari-dev/",permalink:"/docs/2.7.6/ambari-dev/",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.6/ambari-dev/index.md",tags:[],version:"2.7.6",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"View Definition",permalink:"/docs/2.7.6/ambari-design/views/view-definition"},next:{title:"Development Process for New Major Features",permalink:"/docs/2.7.6/ambari-dev/development-process-for-new-major-features"}},o={},p=[{value:"Checking out Ambari source",id:"checking-out-ambari-source",level:2},{value:"Tools needed to build Ambari",id:"tools-needed-to-build-ambari",level:2},{value:"Running Unit Tests",id:"running-unit-tests",level:2},{value:"Generating Findbugs Report",id:"generating-findbugs-report",level:2},{value:"Building Ambari",id:"building-ambari",level:2},{value:"Setting the Version Using Maven",id:"setting-the-version-using-maven",level:2},{value:"Building Ambari Metrics",id:"building-ambari-metrics",level:2},{value:"Running the Ambari Server",id:"running-the-ambari-server",level:2},{value:"Install and Start the Ambari Agent Manually on Each Host in the Cluster",id:"install-and-start-the-ambari-agent-manually-on-each-host-in-the-cluster",level:2},{value:"Setting up Ambari in Eclipse",id:"setting-up-ambari-in-eclipse",level:2}],m={toc:p};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"ambari-development"},"Ambari Development"),(0,r.kt)("h2",{id:"checking-out-ambari-source"},"Checking out Ambari source"),(0,r.kt)("p",null,"Follow the instructions under ",(0,r.kt)("a",{parentName:"p",href:"/docs/2.7.6/ambari-dev/how-to-contribute"},"Checkout source code"),' section of "How to contribute" guide.'),(0,r.kt)("p",null,'We\'ll refer to the top-level "ambari" directory as ',(0,r.kt)("inlineCode",{parentName:"p"},"AMBARI_DIR")," in this document."),(0,r.kt)("h2",{id:"tools-needed-to-build-ambari"},"Tools needed to build Ambari"),(0,r.kt)("p",null,"The following tools are needed to build Ambari from source."),(0,r.kt)("p",null,"Alternatively, you can easily launch a VM that is preconfigured with all the tools that you need. See the ",(0,r.kt)("strong",{parentName:"p"},"Pre-Configured Development Environment")," section in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/2.7.6/quick-start/quick-start-guide"},"Quick Start Guide"),"."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"xCode (if using Mac - free download from the apple store)"),(0,r.kt)("li",{parentName:"ul"},"JDK 8 (Ambari 2.6 and below can be compiled with JDK 7, from Ambari 2.7, it can be compiled with at least JDK 8)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://maven.apache.org/download.html"},"Apache Maven")," 3.3.9 or later\nTip:In order to persist your changes to the JAVA_HOME environment variable and add Maven to your path, create the following files:\nFile: ~/.profile")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"source ~/.bashrc\n")),(0,r.kt)("p",null,"File: ~/.bashrc"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'export PATH=/usr/local/apache-maven-3.3.9/bin:$PATH\nexport JAVA_HOME=$(/usr/libexec/java_home)\nexport _JAVA_OPTIONS="-Xmx2048m -XX:MaxPermSize=512m -Djava.awt.headless=true"\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Python 2.6 (Ambari 2.7 or later require Python 2.7 as minimum supported version)"),(0,r.kt)("li",{parentName:"ul"},"Python setuptools:\nfor Python 2.6: D ",(0,r.kt)("a",{parentName:"li",href:"http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg#md5=bfa92100bd772d5a213eedd356d64086"},"ownload")," setuptools and run:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sh setuptools-0.6c11-py2.6.egg\n")),(0,r.kt)("p",null,"for Python 2.7: D ",(0,r.kt)("a",{parentName:"p",href:"https://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg#md5=fe1f997bc722265116870bc7919059ea"},"ownload")," setuptools and run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sh setuptools-0.6c11-py2.7.egg\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"rpmbuild (rpm-build package)"),(0,r.kt)("li",{parentName:"ul"},"g++ (gcc-c++ package)")),(0,r.kt)("h2",{id:"running-unit-tests"},"Running Unit Tests"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"mvn clean test")),(0,r.kt)("li",{parentName:"ul"},"Run unit tests in a single module:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mvn -pl ambari-server test\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run only Java tests:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mvn -pl ambari-server -DskipPythonTests\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run only specific Java tests:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mvn -pl ambari-server -DskipPythonTests -Dtest=AgentHostInfoTest test\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run only Python tests:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mvn -pl ambari-server -DskipSurefireTests test\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run only specific Python tests:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mvn -pl ambari-server -DskipSurefireTests -Dpython.test.mask=TestUtils.py test\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run only Checkstyle and RAT checks:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mvn -pl ambari-server -DskipTests test\n")),(0,r.kt)("p",null,"NOTE: Please make sure you have npm in the path before running the unit tests."),(0,r.kt)("h2",{id:"generating-findbugs-report"},"Generating Findbugs Report"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"mvn clean install")),(0,r.kt)("p",null,"This will generate xml and html report unders target/findbugs. You can also add flags to skip unit tests to generate report faster."),(0,r.kt)("h2",{id:"building-ambari"},"Building Ambari"),(0,r.kt)("p",null,"Note: if you can an error that too many files are open while building, then run: ulimit -n 10000 (for example)"),(0,r.kt)("p",null,"To build Ambari RPMs, run the following."),(0,r.kt)("p",null,"Note: Replace ${AMBARI_VERSION} with a 4-digit version you want the artifacts to be (e.g., -DnewVersion=1.6.1.1)"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note"),": If running into errors while compiling the ambari-metrics package due to missing the artifacts of jms, jmxri, jmxtools:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[ERROR] Failed to execute goal on project ambari-metrics-kafka-sink: Could not resolve dependencies for project org.apache.ambari:ambari-metrics-kafka-sink:jar:2.0.0-0: The following artifacts could not be resolved: javax.jms:jms:jar:1.1, com.sun.jdmk:jmxtools:jar:1.2.1, com.sun.jmx:jmxri:jar:1.2.1: Could not transfer artifact javax.jms:jms:jar:1.1 from/to java.net (https://maven-repository.dev.java.net/nonav/repository): No connector available to access repository java.net (https://maven-repository.dev.java.net/nonav/repository) of type legacy using the available factories WagonRepositoryConnectorFactory\n")),(0,r.kt)("p",null,"The work around is to manually install the three missing artifacts:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mvn install:install-file -Dfile=jms-1.1.pom -DgroupId=javax.jms -DartifactId=jms -Dversion=1.1 -Dpackaging=jar\nmvn install:install-file -Dfile=jmxtools-1.2.1.pom -DgroupId=com.sun.jdmk -DartifactId=jmxtools -Dversion=1.2.1 -Dpackaging=jar\nmvn install:install-file -Dfile=jmxri-1.2.1.pom -DgroupId=com.sun.jmx -DartifactId=jmxri -Dversion=1.2.1 -Dpackaging=jar\n\nIf when compiling it seems stuck, and you've already increased Java and Maven heapsize, it could be that Ambari Views has a lot of artifacts, and the rat-check is choking up. In this case, try running\n\ngit clean -df (this will remove untracked files and directories)\nmvn clean package -DskipTests -Drat.ignoreErrors=true\nor\nmvn clean package -DskipTests -Drat.skip\n")),(0,r.kt)("h2",{id:"setting-the-version-using-maven"},"Setting the Version Using Maven"),(0,r.kt)("p",null,"Ambari 2.8+ uses a newer method to update the version when building Ambari. "),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"RHEL/CentOS 6"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'# Update the revision property to the release version\nmvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0\n \nmvn -B clean install package rpm:rpm -DskipTests -Dpython.ver="python >= 2.6" -Preplaceurl\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"SUSE/SLES 11")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'# Update the revision property to the release version\nmvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0\n  \nmvn -B clean install package rpm:rpm -DskipTests -Psuse11 -Dpython.ver="python >= 2.6" -Preplaceurl\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Ubuntu 12"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'# Update the revision property to the release version\nmvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0\n  \nmvn -B clean install package jdeb:jdeb -DskipTests -Dpython.ver="python >= 2.6" -Preplaceurl\n')),(0,r.kt)("p",null,"Ambari Server will create following packages"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"RPM will be created under ",(0,r.kt)("inlineCode",{parentName:"p"},"AMBARI_DIR"),"/ambari-server/target/rpm/ambari-server/RPMS/noarch.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"DEB will be created under ",(0,r.kt)("inlineCode",{parentName:"p"},"AMBARI_DIR"),"/ambari-server/target/"))),(0,r.kt)("p",null,"Ambari Agent will create following packages"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"RPM will be created under ",(0,r.kt)("inlineCode",{parentName:"p"},"AMBARI_DIR"),"/ambari-agent/target/rpm/ambari-agent/RPMS/x86_64.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"DEB will be created under ",(0,r.kt)("inlineCode",{parentName:"p"},"AMBARI_DIR"),"/ambari-agent/target"))),(0,r.kt)("p",null,"Optional parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"-X -e: add these options for more verbose output by Maven. Useful when debugging Maven issues.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"-DdefaultStackVersion=STACK-VERSION")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Sets the default stack and version to be used for installation (e.g., -DdefaultStackVersion=HDP-1.3.0)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"-DenableExperimental=true")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Enables experimental features to be available via Ambari Web (default is false)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"All views can be packaged in RPM by adding ",(0,r.kt)("em",{parentName:"p"},"-Dviews")," parameter"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("em",{parentName:"li"},"mvn -B clean install package rpm:rpm -Dviews -DskipTests")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Specific views can be built by adding ",(0,r.kt)("inlineCode",{parentName:"p"},"--projects")," parameter to the ",(0,r.kt)("em",{parentName:"p"},"-Dviews")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("em",{parentName:"li"},"mvn -B clean install package rpm:rpm --projects ambari-web,ambari-project,ambari-views,ambari-admin,contrib/views/files,contrib/views/pig,ambari-server,ambari-agent,ambari-client,ambari-shell -Dviews -DskipTests"))))),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"NOTE: Run everything as ",(0,r.kt)("inlineCode",{parentName:"em"},"root")," below.")),(0,r.kt)("h2",{id:"building-ambari-metrics"},"Building Ambari Metrics"),(0,r.kt)("p",null,"If you plan on installing the Ambari Metrics service, you will also need to build the Ambari Metrics project."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd ambari-metrics\nmvn clean package -Dbuild-rpm -DskipTests\n\nFor Ubuntu:\ncd ambari-metrics\nmvn clean package -Dbuild-deb -DskipTests\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note:")),(0,r.kt)("p",null,"The metrics rpms will be found at: ambari-metrics-assembly/target/. These would be need for installing the Ambari Metrics service."),(0,r.kt)("h2",{id:"running-the-ambari-server"},"Running the Ambari Server"),(0,r.kt)("p",null,"First, install the Ambari Server RPM."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"On RHEL/CentOS:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yum install ambari-server/target/rpm/ambari-server/RPMS/noarch/ambari-server-*.noarch.rpm\n")),(0,r.kt)("p",null,"On SUSE/SLES:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"zypper install ambari-server/target/rpm/ambari-server/RPMS/noarch/ambari-server-*.noarch.rpm\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"On Ubuntu 12:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"dpkg --install ambari-server/target/ambari-server-*.deb          # Will fail with missing dependencies errors\napt-get update                                                   # Update locations of dependencies\napt-get install -f                                               # Install all failed dependencies\ndpkg --install ambari-server/target/ambari-server-*.deb          # Will succeed\n")),(0,r.kt)("p",null,"Initialize Ambari Server:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server setup\n")),(0,r.kt)("p",null,"Start up Ambari Server:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"ambari-server start\n")),(0,r.kt)("p",null,"See Ambari Server log:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tail -f /var/log/ambari-server/ambari-server.log\n")),(0,r.kt)("p",null,"To access Ambari, go to"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"http://{ambari-server-hostname}:8080\n")),(0,r.kt)("p",null,"from your web browser and log in with username ",(0,r.kt)("em",{parentName:"p"},"admin")," and password ",(0,r.kt)("em",{parentName:"p"},"admin"),"."),(0,r.kt)("h2",{id:"install-and-start-the-ambari-agent-manually-on-each-host-in-the-cluster"},"Install and Start the Ambari Agent Manually on Each Host in the Cluster"),(0,r.kt)("p",null,"Install the Ambari Agent RPM."),(0,r.kt)("p",null,"On RHEL/CentOS:"),(0,r.kt)("p",null,"SUSE/SLES:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"zypper install ambari-agent/target/rpm/ambari-agent/RPMS/x86_64/ambari-agent-*.rpm\n")),(0,r.kt)("p",null,"Ubuntu12:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"dpkg --install ambari-agent/target/ambari-agent-*.deb\n")),(0,r.kt)("p",null,"Edit the location of Ambari Server in /etc/ambari-agent/conf/ambari-agent.ini by editing the ",(0,r.kt)("em",{parentName:"p"},"hostname")," line."),(0,r.kt)("p",null,"Start Ambari Agent:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"ambari-agent start\n")),(0,r.kt)("p",null,"See Ambari Agent log:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tail -f /var/log/ambari-agent/ambari-agent.log\n")),(0,r.kt)("h2",{id:"setting-up-ambari-in-eclipse"},"Setting up Ambari in Eclipse"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ mvn clean eclipse:eclipse\n")),(0,r.kt)("p",null,'After doing the above you should be able to import the project via Eclipse "Import > Maven > Existing Maven Project". Choose the root directory where you cloned the git repository. You should be able to see the following projects on eclipse:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"ambari\n|\n|- ambari-project\n|- ambari-server\n|- ambari-agent\n|- ambari-web\n")),(0,r.kt)("p",null,'Select the top-level "ambari pom.xml" and click Finish.'))}u.isMDXComponent=!0}}]);