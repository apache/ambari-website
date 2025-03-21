---
sidebar_position: 2
---

# Apache Ambari 3.0.0 Release Notes

## Overview

:::tip Major Release
Apache Ambari 3.0.0 represents a significant milestone in the project's development, bringing major improvements to cluster management capabilities, user experience, and platform support. This release focuses on modernizing the technology stack, enhancing security features, and improving overall stability and performance.
:::

## Acknowledgment and Important Notes

### A Message to Our Community

:::info Important Transition
We want to acknowledge that Ambari 3.0 represents a significant milestone as the first major release since the HDP project became closed source. Due to this transition, we have made some important decisions:

- The 2.7.x series has reached End-of-Life (EOL) and will no longer be maintained, as we no longer have access to the HDP packaging source code.
- Version 3.0 marks the beginning of our new mainline branch, which will receive primary maintenance and development focus.
:::

### From Our Hearts to the Community

:::note A Journey Together
The path to this release has been long and challenging. Our community has weathered significant changes and obstacles:

<div class="alert alert--secondary">

- 🔄 Community restructuring and transitions
- 👥 A significantly reduced contributor base
- 🛠 Critical infrastructure challenges, especially around RPM distribution
- 🔨 Profound organizational changes

</div>
:::

:::tip Thank You
To every user who has stood by Ambari through these times: your patience and understanding mean more to us than words can express. We know this release has been a long time coming, and we are truly sorry for keeping you waiting.
:::

:::info With Gratitude
Our hearts are filled with gratitude for:

<div class="alert alert--success">

- 🌟 The pioneers who laid Ambari's foundation
- ⭐️ The steadfast contributors who've stayed with us through the storms
- 💫 Every community member whose belief in open source has never wavered

</div>

This release exists because of your unwavering support and dedication to the open source spirit. Your commitment has been our guiding light through these challenging times.
:::

### Technical Changes

#### Apache Bigtop Integration
:::tip New Integration
We are pleased to announce that Ambari 3.0 now uses Apache Bigtop for component packaging:

<div class="alert alert--success">

- 📦 [Apache Bigtop](https://github.com/apache/bigtop/) is now our default packaging system
- 🔧 Bigtop Stack serves as the default project stack
- 🚀 This integration provides a more sustainable and community-driven approach to package management

</div>
:::

## Release Highlights

### Major Improvements

- **Apache Bigtop Integration**:
  - Ambari 3.0.0 now uses Apache Bigtop as the default packaging system for component management.
  - Bigtop Stack serves as the default project stack, providing a more sustainable and community-driven approach to package management.

:::tip Bigtop Component Compilation
For developers interested in compiling components for the Ambari Bigtop Stack, we have prepared a **[detailed guide](ambari-dev/bigtop-guide.md)** that walks through the process step by step.
:::

### Platform Support

<div class="alert alert--info">

- ✅ Added support for Rocky Linux 8 and 9 ([AMBARI-26133](https://issues.apache.org/jira/browse/AMBARI-26133))
- ✅ Added support for openEuler-22.03 ([AMBARI-26126](https://issues.apache.org/jira/browse/AMBARI-26126))
- ☕️ Added Java 17 support ([AMBARI-26142](https://issues.apache.org/jira/browse/AMBARI-26142), [AMBARI-26186](https://issues.apache.org/jira/browse/AMBARI-26186))
- 🗄 Added MySQL 8 support for Hive ([AMBARI-26130](https://issues.apache.org/jira/browse/AMBARI-26130))
- 📈 Enhanced Docker environment with bigtop/puppet:trunk-rockylinux-8 image

</div>

### New Services and Components

- **Alluxio Support**: Added support for Alluxio distributed file system ([AMBARI-26055](https://issues.apache.org/jira/browse/AMBARI-26055))
- **Ozone Support**: Added Ozone as a file system service ([AMBARI-24976](https://issues.apache.org/jira/browse/AMBARI-24976))
- **Livy Support**: Added Livy as individual service to Ambari Bigtop Stack ([AMBARI-26090](https://issues.apache.org/jira/browse/AMBARI-26090))
- **Ranger KMS Support**: Added Ranger KMS support ([AMBARI-26056](https://issues.apache.org/jira/browse/AMBARI-26056))
- **Ambari Infra Support**: Added support for Ambari Infra in Ambari Server Bigtop Stack ([AMBARI-25934](https://issues.apache.org/jira/browse/AMBARI-25934))
- **YARN Timeline Service V2**: Added YARN TimelineService V2 and Registrydns support ([AMBARI-25971](https://issues.apache.org/jira/browse/AMBARI-25971))
- **DFSRouter Support**: Added DFSRouter via 'Actions Button' in HDFS summary page ([AMBARI-26109](https://issues.apache.org/jira/browse/AMBARI-26109))

### Monitoring and Metrics Improvements

- **Grafana Dashboards**: Added component Grafana dashboards in Ambari metrics ([AMBARI-25960](https://issues.apache.org/jira/browse/AMBARI-25960))
- **Grafana Upgrade**: Fixed issues in metrics Grafana dashboards after upgrade to 9.x ([AMBARI-25975](https://issues.apache.org/jira/browse/AMBARI-25975))
- **Dashboard Updates**: Update dashboard definition when dashboard version is changed ([AMBARI-25944](https://issues.apache.org/jira/browse/AMBARI-25944))
- **Metrics Improvements**: 
  - Fixed metrics sortable functionality ([AMBARI-26207](https://issues.apache.org/jira/browse/AMBARI-26207))
  - Fixed Ambari Grafana datasource plugin loading ([AMBARI-25941](https://issues.apache.org/jira/browse/AMBARI-25941))
  - Fixed Ambari grafana ambari-server-jvm dashboard loading ([AMBARI-25940](https://issues.apache.org/jira/browse/AMBARI-25940))
  - Resolved mutate related graphs for HBase & AMS-HBase ([AMBARI-25995](https://issues.apache.org/jira/browse/AMBARI-25995))
  - Synchronized batch size in Ambari metrics collector and AMS HBase ([AMBARI-25945](https://issues.apache.org/jira/browse/AMBARI-25945))

### Security Improvements

- **Dependency Upgrades to Address CVEs**:
  - Upgraded commons-collections to resolve CVEs ([AMBARI-26185](https://issues.apache.org/jira/browse/AMBARI-26185))
  - Upgraded logback to 1.5.16 ([AMBARI-26306](https://issues.apache.org/jira/browse/AMBARI-26306), [AMBARI-26074](https://issues.apache.org/jira/browse/AMBARI-26074))
  - Upgraded PostgreSQL from 42.2.2 to 42.3.8 ([AMBARI-25953](https://issues.apache.org/jira/browse/AMBARI-25953))
  - Upgraded spring-security-core from 5.7.2 to 5.7.8 ([AMBARI-25952](https://issues.apache.org/jira/browse/AMBARI-25952))
  - Upgraded net.sf.ehcache to 3.10.0 ([AMBARI-26076](https://issues.apache.org/jira/browse/AMBARI-26076))
  - Resolved snakeyaml 1.12 CVE ([AMBARI-26184](https://issues.apache.org/jira/browse/AMBARI-26184))
  - Updated org.codehaus.jackson:jackson-mapper-asl dependency ([AMBARI-25848](https://issues.apache.org/jira/browse/AMBARI-25848))
  - Upgraded Hadoop dependency version ([AMBARI-25986](https://issues.apache.org/jira/browse/AMBARI-25986))

- **Security Enhancements**:
  - Fixed Kerberos encryption issues ([AMBARI-26277](https://issues.apache.org/jira/browse/AMBARI-26277))
  - Fixed Kerberos Jinja2 Template Error ([AMBARI-26093](https://issues.apache.org/jira/browse/AMBARI-26093))
  - Fixed security vulnerability CVE-2016-2183 ([AMBARI-26122](https://issues.apache.org/jira/browse/AMBARI-26122))
  - Fixed default SSL Ciphers of port 8440/8441 that were too weak ([AMBARI-26118](https://issues.apache.org/jira/browse/AMBARI-26118))
  - Added password validation criteria for Ambari local users ([AMBARI-26061](https://issues.apache.org/jira/browse/AMBARI-26061))
  - Improved database password character type requirements ([AMBARI-26236](https://issues.apache.org/jira/browse/AMBARI-26236))
  - Fixed Knox SSO login to Ambari ([AMBARI-26307](https://issues.apache.org/jira/browse/AMBARI-26307))
  - Added documentation on how to report security issues ([AMBARI-26012](https://issues.apache.org/jira/browse/AMBARI-26012))

### User Interface Improvements

- **UI Framework Upgrades**:
  - Upgraded jQuery and Bootstrap to latest versions ([AMBARI-25289](https://issues.apache.org/jira/browse/AMBARI-25289))
  - Fixed outdated ember-collection dependency ([AMBARI-25988](https://issues.apache.org/jira/browse/AMBARI-25988))
  - Fixed test failures caused by jQuery upgrade ([AMBARI-26146](https://issues.apache.org/jira/browse/AMBARI-26146))

- **UI Fixes and Enhancements**:
  - Fixed tooltip display issues ([AMBARI-26251](https://issues.apache.org/jira/browse/AMBARI-26251))
  - Fixed Configuration Group creation ([AMBARI-26257](https://issues.apache.org/jira/browse/AMBARI-26257))
  - Fixed stack and versions page display issues ([AMBARI-26200](https://issues.apache.org/jira/browse/AMBARI-26200))
  - Fixed style rendering errors ([AMBARI-26199](https://issues.apache.org/jira/browse/AMBARI-26199))
  - Fixed dropdown menu flex layout overflow ([AMBARI-26205](https://issues.apache.org/jira/browse/AMBARI-26205))
  - Fixed Ambari host page action button ([AMBARI-26194](https://issues.apache.org/jira/browse/AMBARI-26194))
  - Fixed redirection issue of cluster creation flow ([AMBARI-26183](https://issues.apache.org/jira/browse/AMBARI-26183))
  - Improved time range selector ([AMBARI-26198](https://issues.apache.org/jira/browse/AMBARI-26198))
  - Reduced websocket connections in web UI to improve performance ([AMBARI-25928](https://issues.apache.org/jira/browse/AMBARI-25928))
  - Added validation for Download CSV on Admin/Kerberos tab ([AMBARI-26102](https://issues.apache.org/jira/browse/AMBARI-26102))
  - Fixed issue with selecting all hosts in install wizard ([AMBARI-26120](https://issues.apache.org/jira/browse/AMBARI-26120))

- **Service UI Enhancements**:
  - Added quicklink for HiveServer2 web UI ([AMBARI-26270](https://issues.apache.org/jira/browse/AMBARI-26270))
  - Added server link for ZK Admin server ([AMBARI-26201](https://issues.apache.org/jira/browse/AMBARI-26201))
  - Fixed capacity-scheduler views ([AMBARI-26255](https://issues.apache.org/jira/browse/AMBARI-26255))
  - Removed Google Analytics as per ASF Privacy Policy ([AMBARI-26103](https://issues.apache.org/jira/browse/AMBARI-26103))

### Core Improvements

- **Java 17 Support**: 
  - Full compatibility with JDK 17 ([AMBARI-26142](https://issues.apache.org/jira/browse/AMBARI-26142))
  - Added Ambari Java Home configuration for JDK 17 ([AMBARI-26238](https://issues.apache.org/jira/browse/AMBARI-26238))
  - Fixed ambari-env.sh after JDK upgrade ([AMBARI-26233](https://issues.apache.org/jira/browse/AMBARI-26233))
  - Fixed NoClassesFoundToAnalyzeException when compiling with JDK 17 ([AMBARI-26275](https://issues.apache.org/jira/browse/AMBARI-26275))
  - Fixed annotation processing issue in ConfigurationTest ([AMBARI-26203](https://issues.apache.org/jira/browse/AMBARI-26203))

- **Python 3 Support**: 
  - Made Ambari support Python 3 environment ([AMBARI-26000](https://issues.apache.org/jira/browse/AMBARI-26000))
  - Fixed Python 3 compilation errors ([AMBARI-26121](https://issues.apache.org/jira/browse/AMBARI-26121))
  - Fixed Python 3 type encoding errors ([AMBARI-26062](https://issues.apache.org/jira/browse/AMBARI-26062), [AMBARI-26068](https://issues.apache.org/jira/browse/AMBARI-26068))
  - Fixed SyntaxWarnings after moving to Python 3 ([AMBARI-26070](https://issues.apache.org/jira/browse/AMBARI-26070))
  - Fixed all Python script files for Python 3 ([AMBARI-26100](https://issues.apache.org/jira/browse/AMBARI-26100))
  - Fixed Ranger script file for Python 3 ([AMBARI-26096](https://issues.apache.org/jira/browse/AMBARI-26096))
  - Added dependency python3-distro for ambari-server ([AMBARI-26119](https://issues.apache.org/jira/browse/AMBARI-26119))
  - Fixed PortAlert test failures due to Python 2 to 3 upgrade ([AMBARI-26105](https://issues.apache.org/jira/browse/AMBARI-26105))
  - Fixed TestConfigs Python test case failures ([AMBARI-26081](https://issues.apache.org/jira/browse/AMBARI-26081))

- **Code Modernization**:
  - Added Ruff integration for Python code linting ([AMBARI-26147](https://issues.apache.org/jira/browse/AMBARI-26147))
  - Converted string formatting to f-strings ([AMBARI-26243](https://issues.apache.org/jira/browse/AMBARI-26243), [AMBARI-26244](https://issues.apache.org/jira/browse/AMBARI-26244), [AMBARI-26245](https://issues.apache.org/jira/browse/AMBARI-26245), [AMBARI-26286](https://issues.apache.org/jira/browse/AMBARI-26286))
  - Implemented Git Version Control for Ambari Jenkinsfile ([AMBARI-26097](https://issues.apache.org/jira/browse/AMBARI-26097))
  - Switched PhantomJS used by Karma tests to chromium-browser ([AMBARI-26113](https://issues.apache.org/jira/browse/AMBARI-26113))
  - Configured Chromium Browser in Jenkins file ([AMBARI-26114](https://issues.apache.org/jira/browse/AMBARI-26114))

- **Build and Packaging Improvements**:
  - Fixed Ambari Server parallel compilation and packaging issues ([AMBARI-26191](https://issues.apache.org/jira/browse/AMBARI-26191))
  - Fixed RPM build failures ([AMBARI-26319](https://issues.apache.org/jira/browse/AMBARI-26319))
  - Fixed RPM packaging errors for ambari-web and ambari-views ([AMBARI-26125](https://issues.apache.org/jira/browse/AMBARI-26125))
  - Fixed server build failure due to ambari-serviceadvisor version ([AMBARI-25920](https://issues.apache.org/jira/browse/AMBARI-25920))
  - Fixed ambari-admin compilation issues ([AMBARI-25968](https://issues.apache.org/jira/browse/AMBARI-25968))
  - Fixed issue with ambari-admin build entering testing phase ([AMBARI-26132](https://issues.apache.org/jira/browse/AMBARI-26132))
  - Added distro dependency to Ambari Agent ([AMBARI-26197](https://issues.apache.org/jira/browse/AMBARI-26197))
  - Fixed jersey conflict error when starting Ambari server ([AMBARI-26320](https://issues.apache.org/jira/browse/AMBARI-26320))

- **Service Improvements**:
  - Updated component versions to align with Ambari Bigtopstack 3.3.0 ([AMBARI-26087](https://issues.apache.org/jira/browse/AMBARI-26087))
  - Upgraded service versions to Bigtop 3.3.0 ([AMBARI-25965](https://issues.apache.org/jira/browse/AMBARI-25965))
  - Upgraded Bigtop Stack ZK to Zookeeper 3.7.2 ([AMBARI-26088](https://issues.apache.org/jira/browse/AMBARI-26088))
  - Enabled Spark to use Hadoop native libraries for better performance ([AMBARI-25987](https://issues.apache.org/jira/browse/AMBARI-25987))
  - Fixed Hive installation failures due to missing dependencies ([AMBARI-26326](https://issues.apache.org/jira/browse/AMBARI-26326))
  - Set up Hive's xms config ([AMBARI-26305](https://issues.apache.org/jira/browse/AMBARI-26305))
  - Fixed HDFS web service check ([AMBARI-26276](https://issues.apache.org/jira/browse/AMBARI-26276))
  - Fixed incorrect Ambari infra-solr service config ([AMBARI-25970](https://issues.apache.org/jira/browse/AMBARI-25970))
  - Fixed wrong config file name in Spark service advisor ([AMBARI-25932](https://issues.apache.org/jira/browse/AMBARI-25932))
  - Increased default value of phoenix.mutate.maxSizeBytes ([AMBARI-25977](https://issues.apache.org/jira/browse/AMBARI-25977))
  - Fixed HBase config issue ([AMBARI-25827](https://issues.apache.org/jira/browse/AMBARI-25827))
  - Fixed default value in hive-site.xml ([AMBARI-25897](https://issues.apache.org/jira/browse/AMBARI-25897))
  - Added host and user to the tagsync log's file name ([AMBARI-26139](https://issues.apache.org/jira/browse/AMBARI-26139))
  - Fixed issue with Zeppelin not downloading interpreter dependencies ([AMBARI-25981](https://issues.apache.org/jira/browse/AMBARI-25981))
  - Removed hive.load.data.owner from Hive configuration ([AMBARI-26129](https://issues.apache.org/jira/browse/AMBARI-26129))
  - Removed Phoenix configuration from HBase ([AMBARI-25921](https://issues.apache.org/jira/browse/AMBARI-25921))
  - Fixed missing theme.json in HDFS/YARN/MR ([AMBARI-25917](https://issues.apache.org/jira/browse/AMBARI-25917))
  - Fixed missing service_advisor.py in some services ([AMBARI-25894](https://issues.apache.org/jira/browse/AMBARI-25894))
  - Fixed issue with 'supported-refresh-commands' element ([AMBARI-25863](https://issues.apache.org/jira/browse/AMBARI-25863))
  - Reduced excess Zookeeper and Hadoop logging ([AMBARI-24140](https://issues.apache.org/jira/browse/AMBARI-24140))

- **Bug Fixes**:
  - Fixed OceanBase support in Ambari MySQL DDL ([AMBARI-26273](https://issues.apache.org/jira/browse/AMBARI-26273))
  - Fixed regex pattern flag position in ambari_jinja2 filters ([AMBARI-26269](https://issues.apache.org/jira/browse/AMBARI-26269))
  - Fixed invalid parameter issue in HostInfo.py ([AMBARI-26271](https://issues.apache.org/jira/browse/AMBARI-26271))
  - Fixed initialization issue in InitializerModule ([AMBARI-26111](https://issues.apache.org/jira/browse/AMBARI-26111), [AMBARI-25883](https://issues.apache.org/jira/browse/AMBARI-25883))
  - Fixed PYTHONPATH resolution ([AMBARI-26115](https://issues.apache.org/jira/browse/AMBARI-26115))
  - Fixed issue with checking firewalld status ([AMBARI-26235](https://issues.apache.org/jira/browse/AMBARI-26235))
  - Fixed ClusterNotFoundException during host confirmation ([AMBARI-26234](https://issues.apache.org/jira/browse/AMBARI-26234))
  - Fixed NumberFormatException handling ([AMBARI-26144](https://issues.apache.org/jira/browse/AMBARI-26144))
  - Fixed OozieUtils ([AMBARI-26239](https://issues.apache.org/jira/browse/AMBARI-26239))
  - Fixed shell.py execution and import order ([AMBARI-26232](https://issues.apache.org/jira/browse/AMBARI-26232))
  - Fixed Ambari cluster deployment blockage ([AMBARI-26187](https://issues.apache.org/jira/browse/AMBARI-26187))
  - Enhanced error logging for run function in shell script ([AMBARI-26094](https://issues.apache.org/jira/browse/AMBARI-26094))
  - Fixed various test failures after JDK upgrade ([AMBARI-26222](https://issues.apache.org/jira/browse/AMBARI-26222), [AMBARI-26215](https://issues.apache.org/jira/browse/AMBARI-26215), [AMBARI-26211](https://issues.apache.org/jira/browse/AMBARI-26211))
  - Fixed checkstyle errors ([AMBARI-26212](https://issues.apache.org/jira/browse/AMBARI-26212))
  - Fixed Ambari Component Installation Failure ([AMBARI-26323](https://issues.apache.org/jira/browse/AMBARI-26323))
  - Fixed alter dispatcher ([AMBARI-26240](https://issues.apache.org/jira/browse/AMBARI-26240))
  - Corrected spelling mistakes in documentation ([AMBARI-26104](https://issues.apache.org/jira/browse/AMBARI-26104))

## Known Issues

- Timeline Service Reader may fail to start if HBase is not installed ([AMBARI-26248](https://issues.apache.org/jira/browse/AMBARI-26248))
- Timeline Service v2 may fail to start due to issues with leveldb state store directory creation ([AMBARI-26249](https://issues.apache.org/jira/browse/AMBARI-26249))
- Some LDAP/AD authentication issues may occur with previously synced users ([AMBARI-26304](https://issues.apache.org/jira/browse/AMBARI-26304))
- DFSRouter command script path may not be correct ([AMBARI-26116](https://issues.apache.org/jira/browse/AMBARI-26116))
- Module 'status_params' may have no attribute 'router_pid_file' ([AMBARI-26141](https://issues.apache.org/jira/browse/AMBARI-26141))
- _threadlocal may have no uid because it is always None ([AMBARI-26241](https://issues.apache.org/jira/browse/AMBARI-26241))

## Roadmap

The Apache Ambari project has an ambitious roadmap for future releases. The following initiatives are planned for upcoming development cycles:

### Technology Stack Modernization

- **Spring Framework 6 Upgrade**: Migrate from current Spring version to Spring 6 to leverage the latest features, performance improvements, and security enhancements.
- **Ubuntu Support**: Extend platform compatibility to include Ubuntu, providing more deployment options for users.

### Deployment and Operations

- **Docker Automation**: Develop comprehensive Docker-based automation for cluster deployment, making it easier to provision and manage Ambari clusters in containerized environments.
- **Enhanced Containerization**: Improve container orchestration capabilities for both development and production environments.

### Frontend Modernization

- **jQuery Bug Fixes**: Continue to address and resolve UI issues resulting from the jQuery upgrade.
- **Micro-Frontend Architecture**: Implement a gradual transition from the current Ember.js framework to React using a micro-frontend approach, allowing for incremental modernization without disrupting existing functionality.
- **UI/UX Improvements**: Enhance the user interface with modern design patterns and improved user experience.

These roadmap items represent the project's commitment to continuous improvement and adaptation to evolving technologies in the big data ecosystem. Community contributions and feedback on these initiatives are welcome.

## Upgrading to Apache Ambari 3.0.0

:::note

TODO

:::

For detailed instructions on upgrading from previous versions, please refer to the Upgrade Guide.

## Compatibility Matrix

| Component | Supported Versions |
|-----------|-------------------|
| Operating Systems | Rocky Linux 8, Rocky Linux 9, openEuler-22.03, CentOS 7.x, RHEL 7.x, RHEL 8.x |
| Java | OpenJDK 8, OpenJDK 11, OpenJDK 17 |
| Database | PostgreSQL 10+, MySQL 5.7+, MySQL 8+, MariaDB 10.2+, OceanBase |
| Browser | Chrome 80+, Firefox 78+, Edge 80+ |

## Download

Apache Ambari 3.0.0 can be downloaded from the [Apache Ambari Download Page](https://ambari.apache.org/download.html).

## Verification

It is essential that you verify the integrity of the downloaded files using the PGP signatures and SHA256 checksums.

```bash
# Verify the SHA256 checksum
sha256sum --check apache-ambari-3.0.0.tar.gz.sha256

# Verify the PGP signature
gpg --verify apache-ambari-3.0.0.tar.gz.asc apache-ambari-3.0.0.tar.gz
```

The PGP signatures can be verified using the public keys of the Apache Ambari Release Managers, which can be found on the [Apache Ambari Download Page](https://ambari.apache.org/download.html).

## Acknowledgments

:::tip Our Amazing Contributors 🌟
Apache Ambari 3.0.0 represents the collective effort of our incredible community. We are deeply honored to recognize the individuals who have shaped this milestone release:

<div class="alert alert--success">

### Core Contributors 💫
These dedicated individuals have made substantial contributions to this release:

- **jialiang** 🏆
- **zrain** 🏆
- **Peng Lu** 🏆
- **Mohammad Arshad** 🏆
- **Sandeep Kumar** 🏆
- **coldless177** 🏆
- **Vishal Suvagia** 🏆
- **zhenye zhang** 🏆
- **yaolei** 🏆
- **xjmu** 🏆
- **Himanshu Maurya** 🏆
- **timyuer** 🏆
- **yaruyng** 🏆
- **tongxiaojun** 🏆
### Community Champions 🌠
Their valuable contributions have helped drive the project forward:

- **Ananya Singh**
- **rzuo**
- **Viraj Jasani**
- **William Horn**
- **vanshuhassija**
- **Yu Hou**
- **basapuram-kumar**
- **Prabhjyot Singh**
- **Brahma Reddy Battula**
- **Basapuram Kumar**
- **Shreeya Sand**
- **Bhavik Patel**

### Technical Innovators ⚡
Their technical expertise has been instrumental:

- **lupeng**
- **piaolingzxh**
- **Murali Krishna**
- **LiJie20190102**
- **HARSHITH GANDHE**
- **userhimanshuverma**
- **Arnout Engelen**
- **wangda**
- **Dmytro Sen**
- **Rich Bowen**
- **Shubham Sharma**
- **Weijian Wen**
- **Will Guo**
- **guluo**
- **Peng Lee**
- **liqinwyyx**

</div>

:::note Special Recognition 🎖
A special note of appreciation goes to our Release Manager(s), whose tireless coordination and attention to detail have been crucial in bringing this release to fruition.
:::

:::tip Join Our Community! 🤝
Every contribution, no matter how small, helps make Ambari better. We welcome new contributors to join our vibrant community!
:::

## Community

We welcome your feedback and contributions to Apache Ambari:

- [Mailing Lists](https://ambari.apache.org/mail-lists.html)
- [Issue Tracker](https://issues.apache.org/jira/projects/AMBARI)
- [GitHub Repository](https://github.com/apache/ambari)

## License

Apache Ambari is released under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
