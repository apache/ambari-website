---
title: HA 集群的 Blueprint 支持
---

<!---
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
--->

# HA 集群的 Blueprint 支持 {#blueprint-support-for-ha-clusters}

## 摘要 {#summary}

从 Ambari 2.0 开始，Blueprint 可以部署以下高可用组件：

+    HDFS NameNode HA

+   YARN ResourceManager HA
+   HBase RegionServers HA

从 Ambari 2.1 开始，Blueprint 可以部署以下高可用组件：

+   Hive Components ([AMBARI-10489](https://issues.apache.org/jira/browse/AMBARI-10489))
+   Storm Nimbus ([AMBARI-11087](https://issues.apache.org/jira/browse/AMBARI-11087))
+   Oozie Server ([AMBARI-6683](https://issues.apache.org/jira/browse/AMBARI-6683))  
    

  
此功能目前需要提供细粒度配置。本文档提供相关示例。

### 常见问题 {#faq}

#### 与 Ambari UI 的兼容性 {#compatibility-with-ambari-ui}

虽然此功能运行时不要求 Ambari UI，但 Blueprints HA 功能与 Ambari UI 完全兼容。通过 Blueprint 创建的 HA 集群可以像其他 Blueprint 集群一样，通过 Ambari UI 进行监控和配置。

#### 支持的 Stack 版本 {#supported-stack-versions}

此功能支持 HDP 2.1 及更高版本。尚未针对 HDP 的早期版本测试此功能。

### 示例 {#examples}

#### Blueprint 示例：HDFS NameNode HA 集群 {#blueprint-example-hdfs-namenode-ha-cluster}

HDFS NameNode HA 可以配置集群，使 NameNode 不再成为单点故障。

有关 [HDFS NameNode HA，请参阅 Apache Hadoop 文档](http://hadoop.apache.org/docs/r2.3.0/hadoop-yarn/hadoop-yarn-site/HDFSHighAvailabilityWithQJM.html)。

在 Ambari 部署的 HDFS NameNode HA 集群中：

+   部署 2 个 NameNode：一个为 “active”，另一个为 “passive”。
+   如果 active NameNode 停止正常工作，passive 节点的 Zookeeper 客户端会检测到该情况，passive 节点将成为新的 active 节点。
+   HDFS 依靠 Zookeeper 管理这些情况下的故障转移细节。
+   Blueprints HA 功能会自动调用 HDFS NameNode HA 集群所需的全部命令和设置步骤，前提是 Blueprint 中提供了正确配置。每个 NameNode 的共享编辑日志由 Quorum Journal Manager 管理，而不是由 NFS 共享存储管理。Ambari Blueprints 不支持在 HDFS HA 设置中使用 NFS 共享存储，通常也不建议这样做。

#### 操作方式 {#how}

Blueprints HA 功能会自动调用 HDFS NameNode HA 集群所需的全部命令和设置步骤，前提是 Blueprint 中提供了正确配置。每个 NameNode 的共享编辑日志由 Quorum Journal Manager 管理，而不是由 NFS 共享存储管理。Ambari Blueprints 不支持在 HDFS HA 设置中使用 NFS 共享存储，通常也不建议这样做。

支持 HA HDFS NameNode 的 Blueprint 中，任意 host group 都应包含以下 HDFS stack 组件：

1.  NAMENODE
    
2.  ZKFC
    
3.  ZOOKEEPER_SERVER
    
4.  JOURNALNODE
    

#### 配置 Active 和 Standby NameNode {#configuring-active-and-standby-namenodes}

HDFS 的 “NAMENODE” 组件必须分配给两台服务器，可以通过两个独立的 host group，或通过一个在此集群的 Cluster Creation Template 中映射到两台物理服务器的 host group 来完成。

默认情况下，Blueprint processor 会将 “active” NameNode 分配到一台主机，将 “standby” NameNode 分配到另一台主机。HA Blueprint 的用户无需配置每个 NameNode 的初始状态，因为该状态可以自动分配。

如果需要，用户可以在 “hadoop-env” 命名空间中添加以下配置属性，以配置每个 NameNode 的初始状态：

1.  dfs_ha_initial_namenode_active - 此属性应包含集群中处于“active”状态的 NameNode 的主机名。
    
2.  dfs_ha_initial_namenode_standby - 此属性应包含集群中处于“passive”状态的 NameNode 的主机名。
    
:::caution
只有在需要将 active 或 standby NameNode 的初始状态配置到特定节点时，才应使用这些属性。此设置仅保证在集群初始状态时准确。随着集群中发生故障转移事件，每个 NameNode 的 active/standby 状态可能会随时间变化。

使用 Blueprint REST API endpoint 将 HDFS HA 集群导出为 Blueprint 时，不会记录或表达 NameNode 的 active 或 standby 状态。由于集群会随时间变化，此状态仅在集群初始启动时准确。

通常认为大多数用户不需要选择每个 NameNode 的 active 或 standby 状态，因此 Blueprints HA 的默认行为是自动分配每个节点的状态。
:::

#### Blueprint 示例 {#example-blueprint}

这是一个包含 HDFS HA 的最小 Blueprint：[hdfs_ha_blueprint.json](https://cwiki.apache.org/confluence/download/attachments/55151584/hdfs_ha_blueprint.json?version=4&modificationDate=1434548806000&api=v2)

以下是所需的基础配置。更多详情请参阅上面的 Blueprint：
```json
  "configurations": 
    { "core-site": {
        "properties" : {
          "fs.defaultFS" : "hdfs://mycluster",
          "ha.zookeeper.quorum" : "%HOSTGROUP::master_1%:2181,%HOSTGROUP::master_2%:2181,%HOSTGROUP::master_3%:2181"
      }}
    },
    { "hdfs-site": {
        "properties" : {
          "dfs.client.failover.proxy.provider.mycluster" : "org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider",
          "dfs.ha.automatic-failover.enabled" : "true",
          "dfs.ha.fencing.methods" : "shell(/bin/true)",
          "dfs.ha.namenodes.mycluster" : "nn1,nn2",
          "dfs.namenode.http-address" : "%HOSTGROUP::master_1%:50070",
          "dfs.namenode.http-address.mycluster.nn1" : "%HOSTGROUP::master_1%:50070",
          "dfs.namenode.http-address.mycluster.nn2" : "%HOSTGROUP::master_3%:50070",
          "dfs.namenode.https-address" : "%HOSTGROUP::master_1%:50470",
          "dfs.namenode.https-address.mycluster.nn1" : "%HOSTGROUP::master_1%:50470",
          "dfs.namenode.https-address.mycluster.nn2" : "%HOSTGROUP::master_3%:50470",
          "dfs.namenode.rpc-address.mycluster.nn1" : "%HOSTGROUP::master_1%:8020",
          "dfs.namenode.rpc-address.mycluster.nn2" : "%HOSTGROUP::master_3%:8020",
          "dfs.namenode.shared.edits.dir" : "qjournal://%HOSTGROUP::master_1%:8485;%HOSTGROUP::master_2%:8485;%HOSTGROUP::master_3%:8485/mycluster",
          "dfs.nameservices" : "mycluster"
      }}
    }
  ]
  ```

#### 配置属性值中的主机名拓扑替换 {#hostname-topology-substitution-in-configuration-property-values}

主机相关属性应使用 “HOSTGROUP” 语法引用给定 Blueprint 的 host group，从而将每个 NameNode 的实际主机（在 Cluster Creation Template 中定义）映射到 hdfs-site 中需要这些主机映射的属性。

这些属性的语法应为：

“%HOSTGROUP::HOST_GROUP_NAME%:PORT””

例如，上面代码片段中的以下属性：

"dfs.namenode.http-address.mycluster.nn1":

"%HOSTGROUP::master_1%:50070"

Blueprint processor 会将此属性值解释为映射到 “master_1” host group 的主机，该 host group 的组件列表中应包含 “NAMENODE”。上面列出的地址属性应映射到 “master_1” 的主机及端口 “50070”。

由于不使用直接的主机名引用，使用此语法是在 Blueprint 中定义主机特定属性最具可移植性的方式。这样可以将 Blueprint 应用于更多种类的集群部署，而不局限于特定的主机名集合。

#### 向 Ambari Server 注册 Blueprint {#register-blueprint-with-ambari-server-}

将 Blueprint 发布到 Ambari Server 的 "blueprint-hdfs-ha" 资源。

```
POST /api/v1/blueprints/blueprint-hdfs-ha
 
...
[ Request Body is the example blueprint defined above ]
...
 
201 - Created
```

#### 集群创建模板示例 {#example-cluster-creation-template}

```json
{
  "blueprint": "blueprint-hdfs-ha",
  "default_password": "changethis",
  "host_groups": [
    { "hosts": [
        { "fqdn": "c6401.ambari.apache.org" }
      ], "name": "gateway"
    },
    { "hosts": [
        { "fqdn": "c6402.ambari.apache.org" }
      ], "name": "master_1"
    },
    { "hosts": [
        { "fqdn": "c6403.ambari.apache.org" }
      ], "name": "master_2"
    },
    { "hosts": [
        { "fqdn": "c6404.ambari.apache.org" }
      ], "name": "master_3"
    },
    { "hosts": [
        { "fqdn": "c6405.ambari.apache.org" }
      ],
      "name": "slave_1"     
    }
  ]
}
```

#### 创建集群实例 {#create-cluster-instance}

将集群发布到 Ambari Server 以配置集群。
```
POST /api/v1/clusters/my-hdfs-ha-cluster
 
...
[ Request Body is above Cluster Creation Template ]
...
 
202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/my-hdfs-ha-cluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "InProgress"
  }
}
 
...
[ Client can then monitor the URL in the 202 response to check the status of the cluster deployment. ]
...
```

### Blueprint 示例：Yarn ResourceManager HA 集群 {#blueprint-example-yarn-resourcemanager-ha-cluster}

#### 摘要 {#summary-1}

Yarn ResourceManager 高可用性（HA）支持在给定 Yarn 集群中部署两个 Yarn ResourceManager。此支持消除了使用单个 ResourceManager 时产生的单点故障。

Yarn ResourceManager 的 HA 支持与 HDFS NameNode HA 有些类似：采用 “active/standby” 架构，并使用 Zookeeper 处理两个 ResourceManager 实例之间的故障转移场景。

以下 Apache Hadoop 文档介绍了手动设置 Yarn ResourceManager HA 所需的步骤：

[http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerHA.html](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerHA.html)

:::caution
Ambari Blueprints 会处理本文档中列出的许多服务器设置细节，但 Ambari 用户需要定义本文列出的各种配置属性（yarn.resourcemanager.ha.enabled、yarn.resourcemanager.hostname.$NAME_OF_RESOURCE_MANAGER 等）。下面的 Blueprint 示例将展示 Blueprint 中必须包含哪些配置属性，才能正确启动 HA 集群。
:::

支持 HA Yarn ResourceManager 的 Blueprint 中，任意 host group 都应包含以下 stack 组件：

1.  RESOURCEMANAGER
    
2.  ZOOKEEPER_SERVER
    

#### Active 和 Standby ResourceManager 的初始设置 {#initial-setup-of-active-and-standby-resourcemanagers}

Yarn ResourceManager HA 功能依赖 Zookeeper 来管理给定 ResourceManager 的 “active” 或 “standby” 状态细节。两个 ResourceManager 初次启动时，第一个获得 Zookeeper 锁（称为 “znode”）的 ResourceManager 实例将成为集群的 “active” ResourceManager，另一个实例则承担 “standby” ResourceManager 的角色。

:::caution
Blueprints HA 功能不支持配置 Yarn HA 集群中所部署 ResourceManager 的初始 “active” 或 “standby” 状态。第一个获得 Zookeeper 锁的实例将成为 “active” 节点。这样用户可以指定包含 2 个 ResourceManager 实例的 host group，同时无需选择第一个 “active” 节点。

集群初次启动后， “active” 和 “standby” ResourceManager 的状态可能随时间变化。初始 “active” 服务器不保证在集群整个生命周期中始终是 “active” 节点。发生故障转移时，可能需要由 “standby” 节点承担 “active” 服务器的角色。

使用 Blueprint REST API endpoint 将 Yarn 集群导出为 Blueprint 时，不会记录或表达 ResourceManager 的 active 或 standby 状态。由于集群会随时间变化，此状态仅在集群初始启动时准确。
:::

#### Blueprint 示例 {#example-blueprint-1}

以下链接包含一个 3 节点 Yarn ResourceManager HA 集群的 Blueprint 示例：

[yarn_ha_blueprint.json](https://cwiki.apache.org/confluence/download/attachments/55151584/yarn_ha_blueprint.json?version=2&modificationDate=1432208770000&api=v2)  

```json
{
  "Blueprints": {
    "stack_name": "HDP",
    "stack_version": "2.2"
  },
  "host_groups": [
    {
      "name": "gateway",
      "cardinality" : "1",
      "components": [
        { "name": "HDFS_CLIENT" },
        { "name": "MAPREDUCE2_CLIENT" },
        { "name": "METRICS_COLLECTOR" },
        { "name": "METRICS_MONITOR" },
        { "name": "TEZ_CLIENT" },
        { "name": "YARN_CLIENT" },
        { "name": "ZOOKEEPER_CLIENT" }
      ]
    },
    {
      "name": "master_1",
      "cardinality" : "1",
      "components": [
        { "name": "HISTORYSERVER" },
        { "name": "JOURNALNODE" },
        { "name": "METRICS_MONITOR" },
        { "name": "NAMENODE" },
        { "name": "ZOOKEEPER_SERVER" }
      ]
    },
    {
      "name": "master_2",
      "cardinality" : "1",
      "components": [
        { "name": "APP_TIMELINE_SERVER" },
        { "name": "JOURNALNODE" },
        { "name": "METRICS_MONITOR" },
        { "name": "RESOURCEMANAGER" },
        { "name": "ZOOKEEPER_SERVER" }
      ]
    },
    {
      "name": "master_3",
      "cardinality" : "1",
      "components": [
        { "name": "JOURNALNODE" },
        { "name": "METRICS_MONITOR" },
        { "name": "RESOURCEMANAGER" },
        { "name": "SECONDARY_NAMENODE" },
        { "name": "ZOOKEEPER_SERVER" }
      ]
    },
    {
      "name": "slave_1",
      "components": [
        { "name": "DATANODE" },
        { "name": "METRICS_MONITOR" },
        { "name": "NODEMANAGER" }
      ]
    }
  ],
  "configurations": [
    {
      "core-site": {
        "properties" : {
          "fs.defaultFS" : "hdfs://%HOSTGROUP::master_1%:8020"
      }}
    },{
      "yarn-site" : {
        "properties" : {
          "hadoop.registry.rm.enabled" : "false",
          "hadoop.registry.zk.quorum" : "%HOSTGROUP::master_3%:2181,%HOSTGROUP::master_2%:2181,%HOSTGROUP::master_1%:2181",
          "yarn.log.server.url" : "http://%HOSTGROUP::master_2%:19888/jobhistory/logs",
          "yarn.resourcemanager.address" : "%HOSTGROUP::master_2%:8050",
          "yarn.resourcemanager.admin.address" : "%HOSTGROUP::master_2%:8141",
          "yarn.resourcemanager.cluster-id" : "yarn-cluster",
          "yarn.resourcemanager.ha.automatic-failover.zk-base-path" : "/yarn-leader-election",
          "yarn.resourcemanager.ha.enabled" : "true",
          "yarn.resourcemanager.ha.rm-ids" : "rm1,rm2",
          "yarn.resourcemanager.hostname" : "%HOSTGROUP::master_2%",
          "yarn.resourcemanager.recovery.enabled" : "true",
          "yarn.resourcemanager.resource-tracker.address" : "%HOSTGROUP::master_2%:8025",
          "yarn.resourcemanager.scheduler.address" : "%HOSTGROUP::master_2%:8030",
          "yarn.resourcemanager.store.class" : "org.apache.hadoop.yarn.server.resourcemanager.recovery.ZKRMStateStore",
          "yarn.resourcemanager.webapp.address" : "%HOSTGROUP::master_2%:8088",
          "yarn.resourcemanager.webapp.https.address" : "%HOSTGROUP::master_2%:8090",
          "yarn.timeline-service.address" : "%HOSTGROUP::master_2%:10200",
          "yarn.timeline-service.webapp.address" : "%HOSTGROUP::master_2%:8188",
          "yarn.timeline-service.webapp.https.address" : "%HOSTGROUP::master_2%:8190"
        }
      }
    }
  ]
}
```

#### 向 Ambari Server 注册 Blueprint {#register-blueprint-with-ambari-server}

将 Blueprint 发布到 Ambari Server 的 "blueprint-yarn-ha" 资源。

```
POST /api/v1/blueprints/blueprint-yarn-ha
 
...
[ Request Body is the example blueprint defined above ]
...
 
201 - Created

```

#### 集群创建模板示例 {#example-cluster-creation-template-1}

```json
{
  "blueprint": "blueprint-yarn-ha",
  "default_password": "changethis",
  "configurations": [
    { "yarn-site" : {
        "yarn.resourcemanager.zk-address" : "c6402.ambari.apache.org:2181,c6403.ambari.apache.org:2181,c6404.ambari.apache.org:2181”,
        ”yarn.resourcemanager.hostname.rm1" : "c6403.ambari.apache.org",
        "yarn.resourcemanager.hostname.rm2" : "c6404.ambari.apache.org"
     }}
  ],
  "host_groups": [
    { "hosts": [
        { "fqdn": "c6401.ambari.apache.org" }
      ], "name": "gateway"
    },
    { "hosts": [
        { "fqdn": "c6402.ambari.apache.org" }
      ], "name": "master_1"
    },
    { "hosts": [
        { "fqdn": "c6403.ambari.apache.org" }
      ], "name": "master_2"
    },
    { "hosts": [
        { "fqdn": "c6404.ambari.apache.org" }
      ], "name": "master_3"
    },
    { "hosts": [
        { "fqdn": "c6405.ambari.apache.org" }
      ],
      "name": "slave_1"     
    }
  ]
}
```

#### 创建集群实例 {#create-cluster-instance-1}

将集群发布到 Ambari Server 以配置集群。

```
POST /api/v1/clusters/my-yarn-ha-cluster
 
...
[ Request Body is above Cluster Creation Template ]
...
 
202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/my-yarn-ha-cluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "InProgress"
  }
}
 
...
[ Client can then monitor the URL in the 202 response to check the status of the cluster deployment. ]
...
```
  

### Blueprint 示例：HBase RegionServer HA 集群 {#blueprint-example-hbase-regionserver-ha-cluster}

#### 摘要 {#summary-2}

HBase 为跨 HBase Region Server 的读取提供高可用功能。

以下 Apache HBase 文档链接提供了 HBase HA 支持的更多信息：

[http://hbase.apache.org/book.html#arch.timelineconsistent.reads](http://hbase.apache.org/book.html#arch.timelineconsistent.reads)

:::caution
此处列出的文档介绍如何通过 Blueprint 部署 HBase RegionServer HA 集群，但还必须执行单独的应用程序特定步骤，才能为 HBase 中的特定表启用此功能。必须在启用复制的情况下创建表，以便多个 Region Server 可以处理该表的键。
:::

有关如何定义启用复制的 HBase 表（集群创建后）的更多信息，请参阅以下 HBase 文档：

[http://hbase.apache.org/book.html#_creating_a_table_with_region_replication](http://hbase.apache.org/book.html#_creating_a_table_with_region_replication)

支持 HA HBase RegionServer 的 Blueprint 中，任意 host group 都应包含以下 stack 组件：

1.  HBASE_REGIONSERVER
    

必须至少部署两个 “HBASE_REGIONSERVER” 组件才能启用此功能，从而让表信息可以在多个 Region Server 之间复制。

#### Blueprint 示例 {#example-blueprint-2}

以下链接包含一个 2 节点 HBase RegionServer HA 集群的 Blueprint 示例：

[hbase_rs_ha_blueprint.json](https://cwiki.apache.org/confluence/download/attachments/55151584/hbase_rs_ha_blueprint.json?version=1&modificationDate=1427136904000&api=v2)  

以下 JSON 片段包含使用 HBase RegionServer HA 功能的集群通常所需的 “hbase-site” 配置：

```json
{
  "configurations" : [
    {
      "hbase-site" : {
         ... 
        "hbase.regionserver.global.memstore.lowerLimit" : "0.38",
        "hbase.regionserver.global.memstore.upperLimit" : "0.4",
        "hbase.regionserver.handler.count" : "60",
        "hbase.regionserver.info.port" : "60030",
        "hbase.regionserver.storefile.refresh.period" : "20",
        "hbase.rootdir" : "hdfs://%HOSTGROUP::host_group_1%:8020/apps/hbase/data",
        "hbase.security.authentication" : "simple",
        "hbase.security.authorization" : "false",
        "hbase.superuser" : "hbase",
        "hbase.tmp.dir" : "/hadoop/hbase",
        "hbase.zookeeper.property.clientPort" : "2181",
        "hbase.zookeeper.quorum" : "%HOSTGROUP::host_group_1%,%HOSTGROUP::host_group_2%",
        "hbase.zookeeper.useMulti" : "true",
        "hfile.block.cache.size" : "0.40",
        "zookeeper.session.timeout" : "30000",
        "zookeeper.znode.parent" : "/hbase-unsecure"
      }

    }
   ]
}
```
:::caution
上面的 JSON 示例不是完整的 “hbase-site” 配置集，而是展示与 HBase RegionServer HA 相关的配置设置。特别是，“hbase.regionserver.storefile.refresh.period” 设置与 HBase RegionServer HA 最相关，因为必须将此属性设置为大于零的值，才能启用 HA 功能。
:::

#### 向 Ambari Server 注册 Blueprint {#register-blueprint-with-ambari-server-1}

将 Blueprint 发布到 Ambari Server 的 "blueprint-hbase-rs-ha" 资源。

POST /api/v1/blueprints/blueprint-hbase-rs-ha
 
...
[ Request Body is the example blueprint defined above ]
...
 
201 - Created

#### 集群创建模板示例 {#example-cluster-creation-template-2}
```json
{
  "blueprint" : "blueprint-hbase-rs-ha",
  "default_password" : "default",
  "host_groups" :[
    {
      "name" : "host_group_1", 
      "hosts" : [         
        {
          "fqdn" : "c6401.ambari.apache.org"
        }
      ]
    },
    {
      "name" : "host_group_2", 
      "hosts" : [         
        {
          "fqdn" : "c6402.ambari.apache.org"
        }
      ]
    }
  ]
}
```
  

#### 创建集群实例 {#create-cluster-instance-2}

将集群发布到 Ambari Server 以配置集群。

```
POST /api/v1/clusters/my-hbase-rs-ha-cluster
 
...
[ Request Body is above Cluster Creation Template ]
...
 
202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/my-hbase-rs-ha-cluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "InProgress"
  }
}
 
...
[ Client can then monitor the URL in the 202 response to check the status of the cluster deployment. ]
...
```
