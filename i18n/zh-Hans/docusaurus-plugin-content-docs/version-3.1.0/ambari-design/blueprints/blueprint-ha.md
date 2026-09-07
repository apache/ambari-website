---
title: Blueprint 对高可用集群的支持
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

# Blueprint 对高可用集群的支持 {#blueprint-support-for-high-availability-clusters}

## HA 模型 {#ha-model}

Blueprint 放置冗余服务组件；服务本身以及 ZooKeeper 或其他协调层决定活动角色和故障转移。Blueprint 创建不会永久记录活动/备用状态。发生故障转移后，角色可能不同于初始角色。

3.1 的有效组件名称和主机端点来自已安装的 BIGTOP Stack。应使用当前 Stack 描述符，而不是复制历史 HDP 2.x 示例。相关服务定义包括 BIGTOP 资源中的 HDFS NameNode、YARN ResourceManager 和 HBase Master/RegionServer 组件。

## HDFS NameNode HA {#hdfs-namenode-ha}

将至少两个 `NAMENODE` 组件放置在不同主机组或主机上，同时配置 `ZKFC`、`ZOOKEEPER_SERVER` 和 `JOURNALNODE`。在 `hdfs-site` 中配置 nameservice 和两个 NameNode 地址，在 `core-site` 中配置 `ha.zookeeper.quorum`。

主机相关属性应使用主机组替换。稳定格式为 `%HOSTGROUP::HOST_GROUP_NAME%:PORT`；Blueprint 处理器会将令牌解析为映射到该组的主机，避免 Blueprint 绑定到一组固定主机名。

初始活动/备用选择通常自动分配。如果 Stack 支持显式初始选择，相关 `hadoop-env` 属性为 `dfs_ha_initial_namenode_active` 和 `dfs_ha_initial_namenode_standby`。它们只描述启动状态，故障转移可能改变状态。

## YARN ResourceManager HA {#yarn-resourcemanager-ha}

放置两个 `RESOURCEMANAGER` 组件和 `ZOOKEEPER_SERVER`。配置 Stack 的 `yarn.resourcemanager.ha.enabled` 及带名称空间的 ResourceManager 地址属性。ZooKeeper 将第一个获取锁的实例选为活动实例，另一个以备用实例启动。Blueprint 不保证哪个物理主机会成为活动实例。

## HA 创建流程 {#ha-creation-flow}

1. 在不同主机组中定义 HA 组件，并包含服务所需的协调组件。
2. 添加已安装 Stack 要求的所有 nameservice、地址、隔离和安全属性，在注册前验证主机组令牌和端口。
3. 注册 Blueprint，然后在集群创建模板中映射每个 HA 主机组。
4. 将集群模板 POST 到 `/api/v1/clusters/:clusterName`，并监控异步 `/requests` 结果。
5. 在启动后及每次故障转移后验证服务专用的活动/备用状态；不要把 Blueprint 导出当作当前角色快照。

## 参考 {#ha-references}

当前主机分配和 Stack 元数据路径见固定版本的 [Ambari Stack 源码](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP)和 [HA 主机解析器](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/stack/HostsType.java)。
