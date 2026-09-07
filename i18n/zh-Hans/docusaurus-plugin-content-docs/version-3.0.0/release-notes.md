---
sidebar_position: 2
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# Apache Ambari 3.0.0 发行说明 {#apache-ambari-300-release-notes}

## 概述 {#overview}

:::tip 主要版本
Apache Ambari 3.0.0 是项目发展的重要里程碑，在集群管理能力、用户体验和平台支持方面带来了重大改进。本版本专注于技术 Stack 现代化、增强安全功能，并提升整体稳定性和性能。
:::

## 致谢和重要说明 {#acknowledgment-and-important-notes}

### 致社区的一封信 {#a-message-to-our-community}

:::info 重要过渡
我们要特别说明，Ambari 3.0 是 HDP 项目转为闭源后发布的首个主要版本，是一个重要里程碑。由于这一过渡，我们做出了以下重要决定：

- 2.7.x 系列已达到生命周期终止（EOL），将不再维护，因为我们已无法访问 HDP 软件包源代码。
- 3.0 版本标志着新的主线分支开始，该分支将获得主要的维护和开发投入。
:::

### 我们对社区的真挚心意 {#from-our-hearts-to-the-community}

:::note 一路同行
通往本版本的道路漫长而充满挑战。我们的社区经历了巨大的变化和障碍：

<div class="alert alert--secondary">

- 社区重组和过渡
- 贡献者数量显著减少
- 关键基础设施挑战，尤其是 RPM 分发方面
- 深刻的组织变化

</div>
:::

:::tip 感谢
感谢每一位在这段时期始终支持 Ambari 的用户：您的耐心和理解对我们而言意义非凡，难以用语言表达。我们知道这个版本让大家等待了很久，对于让您久等，我们深表歉意。
:::

:::info 致以谢意
我们对以下各方充满感激：

<div class="alert alert--success">

- 奠定 Ambari 基础的先驱者
- 在风雨中坚持与我们同行的贡献者
- 每一位始终坚信开源的社区成员

</div>

本版本的发布离不开您坚定不移的支持和奉献。在这些艰难时期，您的承诺一直指引着我们。
:::

### 技术变更 {#technical-changes}

#### Apache Bigtop 集成 {#apache-bigtop-integration}
:::tip 新集成
我们很高兴宣布，Ambari 3.0 现在使用 Apache Bigtop 进行组件打包：

<div class="alert alert--success">

- 📦 [Apache Bigtop](https://github.com/apache/bigtop/) 现为默认打包系统
- 🔧 Bigtop Stack 作为默认项目 Stack
- 🚀 该集成提供了更可持续、更由社区驱动的软件包管理方式

</div>
:::

## 发行亮点 {#release-highlights}

### 主要改进 {#major-improvements}

- **Apache Bigtop 集成**：
  - Ambari 3.0.0 现在使用 Apache Bigtop 作为组件管理的默认打包系统。
  - Bigtop Stack 作为默认项目 Stack，提供更可持续、更由社区驱动的软件包管理方式。

:::tip Bigtop 组件编译
对于希望为 Ambari Bigtop Stack 编译组件的开发者，我们准备了**[详细指南](ambari-dev/bigtop-guide.md)**，逐步介绍整个过程。
:::

### 平台支持 {#platform-support}

<div class="alert alert--info">

- ✅ 新增 Rocky Linux 8 和 9 支持（[AMBARI-26133](https://issues.apache.org/jira/browse/AMBARI-26133)）
- ✅ 新增 openEuler-22.03 支持（[AMBARI-26126](https://issues.apache.org/jira/browse/AMBARI-26126)）
- ☕️ 新增 Java 17 支持（[AMBARI-26142](https://issues.apache.org/jira/browse/AMBARI-26142)、[AMBARI-26186](https://issues.apache.org/jira/browse/AMBARI-26186)）
- 🗄 新增 Hive 的 MySQL 8 支持（[AMBARI-26130](https://issues.apache.org/jira/browse/AMBARI-26130)）
- 📈 使用 bigtop/puppet:trunk-rockylinux-8 镜像增强 Docker 环境

</div>

### 新服务和组件 {#new-services-and-components}

- **Alluxio 支持**：新增对 Alluxio 分布式文件系统的支持（[AMBARI-26055](https://issues.apache.org/jira/browse/AMBARI-26055)）
- **Ozone 支持**：新增 Ozone 文件系统服务（[AMBARI-24976](https://issues.apache.org/jira/browse/AMBARI-24976)）
- **Livy 支持**：在 Ambari Bigtop Stack 中新增独立的 Livy 服务（[AMBARI-26090](https://issues.apache.org/jira/browse/AMBARI-26090)）
- **Ranger KMS 支持**：新增 Ranger KMS 支持（[AMBARI-26056](https://issues.apache.org/jira/browse/AMBARI-26056)）
- **Ambari Infra 支持**：在 Ambari Server Bigtop Stack 中新增 Ambari Infra 支持（[AMBARI-25934](https://issues.apache.org/jira/browse/AMBARI-25934)）
- **YARN Timeline Service V2**：新增 YARN TimelineService V2 和 Registrydns 支持（[AMBARI-25971](https://issues.apache.org/jira/browse/AMBARI-25971)）
- **DFSRouter 支持**：在 HDFS 摘要页面通过“操作按钮”新增 DFSRouter（[AMBARI-26109](https://issues.apache.org/jira/browse/AMBARI-26109)）

### 监控和指标改进 {#monitoring-and-metrics-improvements}

- **Grafana 仪表盘**：在 Ambari 指标中新增组件 Grafana 仪表盘（[AMBARI-25960](https://issues.apache.org/jira/browse/AMBARI-25960)）
- **Grafana 升级**：修复升级到 9.x 后指标 Grafana 仪表盘的问题（[AMBARI-25975](https://issues.apache.org/jira/browse/AMBARI-25975)）
- **仪表盘更新**：仪表盘版本变更时更新仪表盘定义（[AMBARI-25944](https://issues.apache.org/jira/browse/AMBARI-25944)）
- **指标改进**：
  - 修复指标排序功能（[AMBARI-26207](https://issues.apache.org/jira/browse/AMBARI-26207)）
  - 修复 Ambari Grafana 数据源插件加载（[AMBARI-25941](https://issues.apache.org/jira/browse/AMBARI-25941)）
  - 修复 Ambari grafana ambari-server-jvm 仪表盘加载（[AMBARI-25940](https://issues.apache.org/jira/browse/AMBARI-25940)）
  - 解决 HBase 和 AMS-HBase 相关图表的 mutate 问题（[AMBARI-25995](https://issues.apache.org/jira/browse/AMBARI-25995)）
  - 同步 Ambari 指标收集器和 AMS HBase 中的批大小（[AMBARI-25945](https://issues.apache.org/jira/browse/AMBARI-25945)）

### 安全改进 {#security-improvements}

- **为解决 CVE 而升级依赖**：
  - 升级 commons-collections 以解决 CVE（[AMBARI-26185](https://issues.apache.org/jira/browse/AMBARI-26185)）
  - 升级 logback 至 1.5.16（[AMBARI-26306](https://issues.apache.org/jira/browse/AMBARI-26306)、[AMBARI-26074](https://issues.apache.org/jira/browse/AMBARI-26074)）
  - 将 PostgreSQL 从 42.2.2 升级至 42.3.8（[AMBARI-25953](https://issues.apache.org/jira/browse/AMBARI-25953)）
  - 将 spring-security-core 从 5.7.2 升级至 5.7.8（[AMBARI-25952](https://issues.apache.org/jira/browse/AMBARI-25952)）
  - 将 net.sf.ehcache 升级至 3.10.0（[AMBARI-26076](https://issues.apache.org/jira/browse/AMBARI-26076)）
  - 解决 snakeyaml 1.12 CVE（[AMBARI-26184](https://issues.apache.org/jira/browse/AMBARI-26184)）
  - 更新 org.codehaus.jackson:jackson-mapper-asl 依赖（[AMBARI-25848](https://issues.apache.org/jira/browse/AMBARI-25848)）
  - 升级 Hadoop 依赖版本（[AMBARI-25986](https://issues.apache.org/jira/browse/AMBARI-25986)）

- **安全增强**：
  - 修复 Kerberos 加密问题（[AMBARI-26277](https://issues.apache.org/jira/browse/AMBARI-26277)）
  - 修复 Kerberos Jinja2 模板错误（[AMBARI-26093](https://issues.apache.org/jira/browse/AMBARI-26093)）
  - 修复安全漏洞 CVE-2016-2183（[AMBARI-26122](https://issues.apache.org/jira/browse/AMBARI-26122)）
  - 修复 8440/8441 端口默认 SSL 密码套件过弱的问题（[AMBARI-26118](https://issues.apache.org/jira/browse/AMBARI-26118)）
  - 为 Ambari 本地用户新增密码验证标准（[AMBARI-26061](https://issues.apache.org/jira/browse/AMBARI-26061)）
  - 改进数据库密码字符类型要求（[AMBARI-26236](https://issues.apache.org/jira/browse/AMBARI-26236)）
  - 修复 Knox SSO 登录 Ambari（[AMBARI-26307](https://issues.apache.org/jira/browse/AMBARI-26307)）
  - 新增如何报告安全问题的文档（[AMBARI-26012](https://issues.apache.org/jira/browse/AMBARI-26012)）

### 用户界面改进 {#user-interface-improvements}

- **UI 框架升级**：升级 jQuery 和 Bootstrap 至最新版本（[AMBARI-25289](https://issues.apache.org/jira/browse/AMBARI-25289)）；修复过时的 ember-collection 依赖（[AMBARI-25988](https://issues.apache.org/jira/browse/AMBARI-25988)）；修复 jQuery 升级导致的测试失败（[AMBARI-26146](https://issues.apache.org/jira/browse/AMBARI-26146)）。
- **UI 修复和增强**：修复工具提示显示、配置组创建、Stack 和版本页面显示、样式渲染、下拉菜单 flex 布局溢出、Ambari 主机页面操作按钮及集群创建流程重定向问题（[AMBARI-26251](https://issues.apache.org/jira/browse/AMBARI-26251)、[AMBARI-26257](https://issues.apache.org/jira/browse/AMBARI-26257)、[AMBARI-26200](https://issues.apache.org/jira/browse/AMBARI-26200)、[AMBARI-26199](https://issues.apache.org/jira/browse/AMBARI-26199)、[AMBARI-26205](https://issues.apache.org/jira/browse/AMBARI-26205)、[AMBARI-26194](https://issues.apache.org/jira/browse/AMBARI-26194)、[AMBARI-26183](https://issues.apache.org/jira/browse/AMBARI-26183)）；改进时间范围选择器、减少 Web UI 中的 websocket 连接、为 Admin/Kerberos 页签的 Download CSV 增加验证，并修复安装向导选择所有主机的问题（[AMBARI-26198](https://issues.apache.org/jira/browse/AMBARI-26198)、[AMBARI-25928](https://issues.apache.org/jira/browse/AMBARI-25928)、[AMBARI-26102](https://issues.apache.org/jira/browse/AMBARI-26102)、[AMBARI-26120](https://issues.apache.org/jira/browse/AMBARI-26120)）。
- **服务 UI 增强**：新增 HiveServer2 Web UI 快速链接和 ZK Admin Server 链接，修复 capacity-scheduler 视图，并依据 ASF 隐私政策移除 Google Analytics（[AMBARI-26270](https://issues.apache.org/jira/browse/AMBARI-26270)、[AMBARI-26201](https://issues.apache.org/jira/browse/AMBARI-26201)、[AMBARI-26255](https://issues.apache.org/jira/browse/AMBARI-26255)、[AMBARI-26103](https://issues.apache.org/jira/browse/AMBARI-26103)）。

### 核心改进 {#core-improvements}

- **Java 17 支持**：完全兼容 JDK 17（[AMBARI-26142](https://issues.apache.org/jira/browse/AMBARI-26142)）；新增 Ambari Java Home 配置（[AMBARI-26238](https://issues.apache.org/jira/browse/AMBARI-26238)）；修复 JDK 升级后的 ambari-env.sh（[AMBARI-26233](https://issues.apache.org/jira/browse/AMBARI-26233)）；修复 JDK 17 编译时的 NoClassesFoundToAnalyzeException（[AMBARI-26275](https://issues.apache.org/jira/browse/AMBARI-26275)）；修复 ConfigurationTest 注解处理问题（[AMBARI-26203](https://issues.apache.org/jira/browse/AMBARI-26203)）。
- **Python 3 支持**：使 Ambari 支持 Python 3 环境（[AMBARI-26000](https://issues.apache.org/jira/browse/AMBARI-26000)）；修复 Python 3 编译错误（[AMBARI-26121](https://issues.apache.org/jira/browse/AMBARI-26121)）；修复 Python 3 类型编码错误（[AMBARI-26062](https://issues.apache.org/jira/browse/AMBARI-26062)、[AMBARI-26068](https://issues.apache.org/jira/browse/AMBARI-26068)）；修复迁移到 Python 3 后的 SyntaxWarnings（[AMBARI-26070](https://issues.apache.org/jira/browse/AMBARI-26070)）；修复所有 Python 脚本文件（[AMBARI-26100](https://issues.apache.org/jira/browse/AMBARI-26100)）；修复 Ranger Python 3 脚本文件（[AMBARI-26096](https://issues.apache.org/jira/browse/AMBARI-26096)）；为 ambari-server 新增 python3-distro 依赖（[AMBARI-26119](https://issues.apache.org/jira/browse/AMBARI-26119)）；修复 Python 2 到 3 升级导致的 PortAlert 测试失败（[AMBARI-26105](https://issues.apache.org/jira/browse/AMBARI-26105)）；修复 TestConfigs Python 测试用例失败（[AMBARI-26081](https://issues.apache.org/jira/browse/AMBARI-26081)）。
- **代码现代化**：新增 Ruff 集成用于 Python 代码 lint（[AMBARI-26147](https://issues.apache.org/jira/browse/AMBARI-26147)）；将字符串格式化转换为 f-string（[AMBARI-26243](https://issues.apache.org/jira/browse/AMBARI-26243)、[AMBARI-26244](https://issues.apache.org/jira/browse/AMBARI-26244)、[AMBARI-26245](https://issues.apache.org/jira/browse/AMBARI-26245)、[AMBARI-26286](https://issues.apache.org/jira/browse/AMBARI-26286)）；为 Ambari Jenkinsfile 实现 Git 版本控制（[AMBARI-26097](https://issues.apache.org/jira/browse/AMBARI-26097)）；将 Karma 测试使用的 PhantomJS 切换为 chromium-browser（[AMBARI-26113](https://issues.apache.org/jira/browse/AMBARI-26113)）；在 Jenkins 文件中配置 Chromium（[AMBARI-26114](https://issues.apache.org/jira/browse/AMBARI-26114)）。
- **构建和打包改进**：修复 Ambari Server 并行编译和打包问题（[AMBARI-26191](https://issues.apache.org/jira/browse/AMBARI-26191)）；修复 RPM 构建失败（[AMBARI-26319](https://issues.apache.org/jira/browse/AMBARI-26319)）；修复 ambari-web 和 ambari-views 的 RPM 打包错误（[AMBARI-26125](https://issues.apache.org/jira/browse/AMBARI-26125)）；修复 ambari-serviceadvisor 版本导致的服务器构建失败（[AMBARI-25920](https://issues.apache.org/jira/browse/AMBARI-25920)）；修复 ambari-admin 编译问题（[AMBARI-25968](https://issues.apache.org/jira/browse/AMBARI-25968)）；修复 ambari-admin 构建进入测试阶段的问题（[AMBARI-26132](https://issues.apache.org/jira/browse/AMBARI-26132)）；为 Ambari Agent 新增 distro 依赖（[AMBARI-26197](https://issues.apache.org/jira/browse/AMBARI-26197)）；修复启动 Ambari Server 时的 jersey 冲突错误（[AMBARI-26320](https://issues.apache.org/jira/browse/AMBARI-26320)）。
- **服务改进**：更新组件版本以匹配 Ambari Bigtopstack 3.3.0（[AMBARI-26087](https://issues.apache.org/jira/browse/AMBARI-26087)）；将服务版本升级到 Bigtop 3.3.0（[AMBARI-25965](https://issues.apache.org/jira/browse/AMBARI-25965)）；将 Bigtop Stack ZK 升级到 Zookeeper 3.7.2（[AMBARI-26088](https://issues.apache.org/jira/browse/AMBARI-26088)）；启用 Spark 使用 Hadoop 原生库以提升性能（[AMBARI-25987](https://issues.apache.org/jira/browse/AMBARI-25987)）；修复 Hive 因缺少依赖导致的安装失败（[AMBARI-26326](https://issues.apache.org/jira/browse/AMBARI-26326)）；设置 Hive 的 xms 配置（[AMBARI-26305](https://issues.apache.org/jira/browse/AMBARI-26305)）；修复 HDFS Web 服务检查（[AMBARI-26276](https://issues.apache.org/jira/browse/AMBARI-26276)）；修复错误的 Ambari infra-solr 服务配置（[AMBARI-25970](https://issues.apache.org/jira/browse/AMBARI-25970)）；修复 Spark service advisor 中错误的配置文件名（[AMBARI-25932](https://issues.apache.org/jira/browse/AMBARI-25932)）；提高 phoenix.mutate.maxSizeBytes 默认值（[AMBARI-25977](https://issues.apache.org/jira/browse/AMBARI-25977)）；修复 HBase 配置问题（[AMBARI-25827](https://issues.apache.org/jira/browse/AMBARI-25827)）；修复 hive-site.xml 默认值（[AMBARI-25897](https://issues.apache.org/jira/browse/AMBARI-25897)）；将主机和用户添加到 tagsync 日志文件名（[AMBARI-26139](https://issues.apache.org/jira/browse/AMBARI-26139)）；修复 Zeppelin 未下载解释器依赖的问题（[AMBARI-25981](https://issues.apache.org/jira/browse/AMBARI-25981)）；从 Hive 配置中移除 hive.load.data.owner（[AMBARI-26129](https://issues.apache.org/jira/browse/AMBARI-26129)）；从 HBase 中移除 Phoenix 配置（[AMBARI-25921](https://issues.apache.org/jira/browse/AMBARI-25921)）；修复 HDFS/YARN/MR 中缺失的 theme.json（[AMBARI-25917](https://issues.apache.org/jira/browse/AMBARI-25917)）；修复部分服务中缺失的 service_advisor.py（[AMBARI-25894](https://issues.apache.org/jira/browse/AMBARI-25894)）；修复 'supported-refresh-commands' 元素问题（[AMBARI-25863](https://issues.apache.org/jira/browse/AMBARI-25863)）；减少 Zookeeper 和 Hadoop 的过量日志（[AMBARI-24140](https://issues.apache.org/jira/browse/AMBARI-24140)）。
- **错误修复**：修复 Ambari MySQL DDL 中的 OceanBase 支持（[AMBARI-26273](https://issues.apache.org/jira/browse/AMBARI-26273)）；修复 ambari_jinja2 过滤器中正则表达式标志位置（[AMBARI-26269](https://issues.apache.org/jira/browse/AMBARI-26269)）；修复 HostInfo.py 中的无效参数问题（[AMBARI-26271](https://issues.apache.org/jira/browse/AMBARI-26271)）；修复 InitializerModule 初始化问题（[AMBARI-26111](https://issues.apache.org/jira/browse/AMBARI-26111)、[AMBARI-25883](https://issues.apache.org/jira/browse/AMBARI-25883)）；修复 PYTHONPATH 解析（[AMBARI-26115](https://issues.apache.org/jira/browse/AMBARI-26115)）；修复检查 firewalld 状态的问题（[AMBARI-26235](https://issues.apache.org/jira/browse/AMBARI-26235)）；修复主机确认期间的 ClusterNotFoundException（[AMBARI-26234](https://issues.apache.org/jira/browse/AMBARI-26234)）；修复 NumberFormatException 处理（[AMBARI-26144](https://issues.apache.org/jira/browse/AMBARI-26144)）；修复 OozieUtils（[AMBARI-26239](https://issues.apache.org/jira/browse/AMBARI-26239)）；修复 shell.py 执行和导入顺序（[AMBARI-26232](https://issues.apache.org/jira/browse/AMBARI-26232)）；修复 Ambari 集群部署受阻问题（[AMBARI-26187](https://issues.apache.org/jira/browse/AMBARI-26187)）；增强 shell 脚本 run 函数的错误日志（[AMBARI-26094](https://issues.apache.org/jira/browse/AMBARI-26094)）；修复 JDK 升级后的各种测试失败（[AMBARI-26222](https://issues.apache.org/jira/browse/AMBARI-26222)、[AMBARI-26215](https://issues.apache.org/jira/browse/AMBARI-26215)、[AMBARI-26211](https://issues.apache.org/jira/browse/AMBARI-26211)）；修复 checkstyle 错误（[AMBARI-26212](https://issues.apache.org/jira/browse/AMBARI-26212)）；修复 Ambari 组件安装失败（[AMBARI-26323](https://issues.apache.org/jira/browse/AMBARI-26323)）；修复 alter dispatcher（[AMBARI-26240](https://issues.apache.org/jira/browse/AMBARI-26240)）；更正文档中的拼写错误（[AMBARI-26104](https://issues.apache.org/jira/browse/AMBARI-26104)）。

## 已知问题 {#known-issues}

- Timeline Service Reader 在未安装 HBase 时可能无法启动（[AMBARI-26248](https://issues.apache.org/jira/browse/AMBARI-26248)）
- Timeline Service v2 可能因创建 leveldb 状态存储目录的问题而无法启动（[AMBARI-26249](https://issues.apache.org/jira/browse/AMBARI-26249)）
- 之前同步的用户可能出现 LDAP/AD 身份验证问题（[AMBARI-26304](https://issues.apache.org/jira/browse/AMBARI-26304)）
- DFSRouter 命令脚本路径可能不正确（[AMBARI-26116](https://issues.apache.org/jira/browse/AMBARI-26116)）
- 模块 'status_params' 可能没有属性 'router_pid_file'（[AMBARI-26141](https://issues.apache.org/jira/browse/AMBARI-26141)）
- _threadlocal 可能没有 uid，因为它始终为 None（[AMBARI-26241](https://issues.apache.org/jira/browse/AMBARI-26241)）

## 路线图 {#roadmap}

Apache Ambari 项目为未来版本制定了积极的路线图，以下计划将在后续开发周期中推进：

### 技术 Stack 现代化 {#technology-stack-modernization}

- **升级 Spring Framework 6**：从当前 Spring 版本迁移到 Spring 6，以利用最新功能、性能改进和安全增强。
- **Ubuntu 支持**：扩展平台兼容性以包含 Ubuntu，为用户提供更多部署选项。

### 部署和运维 {#deployment-and-operations}

- **Docker 自动化**：开发全面的基于 Docker 的集群部署自动化，让用户更容易在容器化环境中部署和管理 Ambari 集群。
- **增强容器化**：改进开发和生产环境中的容器编排能力。

### 前端现代化 {#frontend-modernization}

- **jQuery 错误修复**：持续处理和解决 jQuery 升级带来的 UI 问题。
- **微前端架构**：采用微前端方式，逐步将当前 Ember.js 框架迁移到 React，在不影响现有功能的情况下实现渐进式现代化。
- **UI/UX 改进**：使用现代设计模式增强用户界面和用户体验。

这些路线图项目体现了项目持续改进并适应大数据生态系统不断演进技术的承诺。欢迎社区为这些计划贡献力量并提供反馈。

## 升级到 Apache Ambari 3.0.0 {#upgrading-to-apache-ambari-300}

:::note

TODO

:::

有关从早期版本升级的详细说明，请参阅升级指南。

## 兼容性矩阵 {#compatibility-matrix}

| 组件 | 支持的版本 |
|-----------|-------------------|
| 操作系统 | Rocky Linux 8、Rocky Linux 9、openEuler-22.03、CentOS 7.x、RHEL 7.x、RHEL 8.x |
| Java | OpenJDK 8、OpenJDK 11、OpenJDK 17 |
| 数据库 | PostgreSQL 10+、MySQL 5.7+、MySQL 8+、MariaDB 10.2+、OceanBase |
| 浏览器 | Chrome 80+、Firefox 78+、Edge 80+ |

## 验证 {#verification}

必须使用 PGP 签名和 SHA256 校验和验证下载文件的完整性。

```bash
# Verify the SHA256 checksum
sha256sum --check apache-ambari-3.0.0.tar.gz.sha256

# Verify the PGP signature
gpg --verify apache-ambari-3.0.0.tar.gz.asc apache-ambari-3.0.0.tar.gz
```

可以使用 Apache Ambari 发布经理的公钥验证 PGP 签名，这些公钥位于 [Apache Ambari 下载页面](https://ambari.apache.org/download.html)。

## 致谢 {#acknowledgments}

:::tip 感谢我们出色的贡献者 🌟
Apache Ambari 3.0.0 凝聚了杰出社区的共同努力。我们深感荣幸，感谢为这一里程碑版本作出贡献的每一位成员：

<div class="alert alert--success">

### 贡献者 💫 {#contributors-}
以下贡献者为本版本作出了重要贡献：

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

:::note 特别致谢 🎖
特别感谢我们的发布经理。他们不懈的协调和对细节的关注，是本版本顺利完成的重要保障。
:::

:::tip 加入我们的社区！ 🤝
无论贡献大小，每一份贡献都能帮助 Ambari 变得更好。欢迎新的贡献者加入我们充满活力的社区！
:::

## 社区 {#community}

欢迎为 Apache Ambari 提供反馈并作出贡献：

- [邮件列表](https://ambari.apache.org/mail-lists.html)
- [问题跟踪器](https://issues.apache.org/jira/projects/AMBARI)
- [GitHub 仓库](https://github.com/apache/ambari)

## 许可证 {#license}

Apache Ambari 根据 [Apache License 2.0 版](https://www.apache.org/licenses/LICENSE-2.0)发布。
