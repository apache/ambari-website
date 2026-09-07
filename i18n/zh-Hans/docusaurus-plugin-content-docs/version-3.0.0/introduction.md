---
sidebar_position: 1
title: 简介
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

# 简介 {#introduction}

Apache Ambari 项目旨在通过开发用于部署、管理和监控 Apache Hadoop 集群的软件，简化 Hadoop 管理。Ambari 提供直观易用的 Hadoop 管理 Web UI，并由 RESTful API 提供支持。

Ambari 支持系统管理员：

* 部署 Hadoop 集群
  - Ambari 提供分步向导，可在任意数量的主机上安装 Hadoop 服务。

  - Ambari 负责处理集群的 Hadoop 服务配置。

* 管理 Hadoop 集群
  - Ambari 提供集中式管理，用于在整个集群中启动、停止和重新配置 Hadoop 服务。

* 监控 Hadoop 集群
  - Ambari 提供用于监控 Hadoop 集群运行状况和状态的仪表盘。

  - Ambari 使用 [Ambari Metrics System](https://issues.apache.org/jira/browse/AMBARI-5707) 收集指标。

  - Ambari 使用 [Ambari Alert Framework](https://issues.apache.org/jira/browse/AMBARI-6354) 进行系统告警，并在需要您关注时通知您（例如节点宕机、剩余磁盘空间不足等）。

Ambari 支持应用程序开发者和系统集成商：

* 通过 [Ambari REST APIs](https://github.com/apache/ambari/blob/trunk/ambari-server/docs/api/v1/index.md)，轻松将 Hadoop 部署、管理和监控功能集成到自己的应用程序中。

## 开始使用 Ambari {#getting-started-with-ambari}

请遵循 [Ambari 3.0.0 快速入门指南](quick-start/quick-start-guide.md)。

注意：Ambari 目前支持以下操作系统的 64 位版本：

* Rocky Linux 8
* Rocky Linux 9
* OpenEuler 22
* 其他操作系统将在未来版本中获得支持。

## 版本信息 {#version-information}

### Ambari 3.0.0 {#ambari-300}
Apache Ambari 用于集群管理和监控的核心组件：

| 组件 | CPU | 操作系统 | 版本 |
| --- | --- | ---- | ---- |
| ambari-agent | x86_64 | Rocky Linux 9 | ambari-agent-3.0.0.0-0.x86_64.rpm |
| ambari-server | x86_64 | Rocky Linux 9 | ambari-server-3.0.0.0-0.x86_64.rpm |

### Bigtop Stack 3.3.0 {#bigtop-stack-330}
Apache Bigtop 提供完整的 Hadoop 生态系统，包含以下组件：

| 组件 | CPU | 操作系统 | 版本 |
| --- | --- | ---- | ---- |
| alluxio | x86_64 | Rocky Linux 9 | alluxio_3_3_0-2.9.3-1.el9.x86_64.rpm  |
| bigtop-groovy | x86_64 | Rocky Linux 9 | bigtop-groovy-2.5.4-1.el9.noarch.rpm |
| bigtop-jsvc | x86_64 | Rocky Linux 9 |bigtop-jsvc-1.2.4-1.el9.x86_64.rpm     |
| bigtop-select | x86_64 | Rocky Linux 9 |bigtop-select-3.3.0-1.el9.noarch.rpm |
| bigtop-utils |  x86_64 | Rocky Linux 9 |bigtop-utils-3.3.0-1.el9.noarch.rpm     |
| flink | x86_64 | Rocky Linux 9 |flink_3_3_0-1.16.2-1.el9.noarch.rpm     |
| hadoop | x86_64 | Rocky Linux 9 |hadoop_3_3_0-3.3.6-1.el9.x86_64.rpm <br /> hadoop_3_3_0-yarn-3.3.6-1.el9.x86_64.rpm |
| hbase | x86_64 | Rocky Linux 9 |hbase_3_3_0-2.4.17-1.el9.x86_64.rpm |
| hive | x86_64 | Rocky Linux 9 |hive_3_3_0-3.1.3-1.el9.noarch.rpm  |
| kafka | x86_64 | Rocky Linux 9 |kafka_3_3_0-2.8.2-1.el9.noarch.rpm   |
| livy | x86_64 | Rocky Linux 9 |livy_3_3_0-0.8.0-1.el9.noarch.rpm  |
| ranger | x86_64 | Rocky Linux 9 | ranger_3_3_0-admin-2.4.0-1.el9.x86_64.rpm          <br />ranger_3_3_0-atlas-plugin-2.4.0-1.el9.x86_64.rpm   <br />ranger_3_3_0-elasticsearch-plugin-2.4.0-1.el9.x86_64.rpm   <br />ranger_3_3_0-hbase-plugin-2.4.0-1.el9.x86_64.rpm   <br />ranger_3_3_0-hdfs-plugin-2.4.0-1.el9.x86_64.rpm    <br />ranger_3_3_0-hive-plugin-2.4.0-1.el9.x86_64.rpm    <br />ranger_3_3_0-kafka-plugin-2.4.0-1.el9.x86_64.rpm   <br />ranger_3_3_0-kms-2.4.0-1.el9.x86_64.rpm            <br />ranger_3_3_0-knox-plugin-2.4.0-1.el9.x86_64.rpm    <br />ranger_3_3_0-kylin-plugin-2.4.0-1.el9.x86_64.rpm    <br />ranger_3_3_0-presto-plugin-2.4.0-1.el9.x86_64.rpm  <br />ranger_3_3_0-solr-plugin-2.4.0-1.el9.x86_64.rpm    <br />ranger_3_3_0-sqoop-plugin-2.4.0-1.el9.x86_64.rpm   <br />ranger_3_3_0-storm-plugin-2.4.0-1.el9.x86_64.rpm   <br />ranger_3_3_0-tagsync-2.4.0-1.el9.x86_64.rpm        <br />ranger_3_3_0-usersync-2.4.0-1.el9.x86_64.rpm       <br />ranger_3_3_0-yarn-plugin-2.4.0-1.el9.x86_64.rpm  |
| solr | x86_64 | Rocky Linux 9 | solr_3_3_0-8.11.2-2.el9.noarch.rpm  |
| spark | x86_64 | Rocky Linux 9 | spark_3_3_0-3.3.4-1.el9.noarch.rpm  |
| tez | x86_64 | Rocky Linux 9 | tez_3_3_0-0.10.2-1.el9.noarch.rpm |
| zeppelin | x86_64 | Rocky Linux 9 | zeppelin_3_3_0-0.11.0-1.el9.x86_64.rpm |
| zookeeper | x86_64 | Rocky Linux 9 | zookeeper_3_3_0-3.7.2-1.el9.x86_64.rpm  |

> 注意：以上表格显示的是 Rocky Linux 9 软件包。有关其他受支持操作系统和完整软件包列表，请访问 [下载页面](quick-start/download.md)。

## 参与贡献 {#get-involved}

请访问 [Ambari Wiki](https://cwiki.apache.org/confluence/display/AMBARI/Ambari)，了解设计文档、路线图、开发指南等内容。

[加入 Ambari 用户 Meetup 群组](http://www.meetup.com/Apache-Ambari-User-Group)。您可以查看 [2013 年 4 月 2 日](http://www.meetup.com/Apache-Ambari-User-Group/events/109316812/)、[2013 年 6 月 25 日](http://www.meetup.com/Apache-Ambari-User-Group/events/119184782/) 和 [2013 年 9 月 25 日](http://www.meetup.com/Apache-Ambari-User-Group/events/134373312/) Meetup 活动的幻灯片。
