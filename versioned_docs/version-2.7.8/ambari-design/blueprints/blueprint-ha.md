  
# Blueprint Support for HA Clusters

## Summary

As of Ambari 2.0, Blueprints are able to deploy the following components with HA:

+    HDFS NameNode HA

+   YARN ResourceManager HA
+   HBase RegionServers HA

As of Ambari 2.1, Blueprints are able to deploy the following components with HA:

+   Hive Components ([AMBARI-10489](https://issues.apache.org/jira/browse/AMBARI-10489))
+   Storm Nimbus ([AMBARI-11087](https://issues.apache.org/jira/browse/AMBARI-11087))
+   Oozie Server ([AMBARI-6683](https://issues.apache.org/jira/browse/AMBARI-6683))  
    

  
This functionality currently requires providing fine-grained configurations. This document provides examples.

### FAQ

#### Compatibility with Ambari UI 

While this feature does not require the Ambari UI to function, the Blueprints HA feature is completely compatible with the Ambari UI.  An HA cluster created via Blueprints can be monitored and configured via the Ambari UI, just as any other Blueprints cluster would function.    

#### Supported Stack Versions

This feature is supported as of HDP 2.1 and newer releases. Previous versions of HDP have not been tested with this feature.  

### Examples

#### Blueprint Example: HDFS NameNode HA Cluster

HDFS NameNode HA allows a cluster to be configured such that a NameNode is not a single point of failure.

For more details on [HDFS NameNode HA see the Apache Hadoop documentation](http://hadoop.apache.org/docs/r2.3.0/hadoop-yarn/hadoop-yarn-site/HDFSHighAvailabilityWithQJM.html).

In an Ambari-deployed HDFS NameNode HA cluster:  

+   2 NameNodes are deployed: an “active” and a “passive” namenode.
+   If the active NameNode should stop functioning properly, the passive node’s Zookeeper client will detect this case, and the passive node will become the new active node.
+   HDFS relies on Zookeeper to manage the details of failover in these cases.
+   The Blueprints HA feature will automatically invoke all required commands and setup steps for an HDFS NameNode HA cluster, provided that the correct configuration is provided in the Blueprint.  The shared edit logs of each NameNode are managed by the Quorum Journal Manager, rather than NFS shared storage.  The use of NFS shared storage in an HDFS HA setup is not supported by Ambari Blueprints, and is generally not encouraged.  

#### How

The Blueprints HA feature will automatically invoke all required commands and setup steps for an HDFS NameNode HA cluster, provided that the correct configuration is provided in the Blueprint.  The shared edit logs of each NameNode are managed by the Quorum Journal Manager, rather than NFS shared storage.  The use of NFS shared storage in an HDFS HA setup is not supported by Ambari Blueprints, and is generally not encouraged.  

The following HDFS stack components should be included in any host group in a Blueprint that supports an HA HDFS NameNode:

1.  NAMENODE
    
2.  ZKFC
    
3.  ZOOKEEPER_SERVER
    
4.  JOURNALNODE
    

#### Configuring Active and Standby NameNodes

The HDFS “NAMENODE” component must be assigned to two servers, either via two separate host groups, or to a host group that maps to two physical servers in the Cluster Creation Template for this cluster.  

By default, the Blueprint processor will assign the “active” NameNode to one host, and the “standby” NameNode to another.  The user of an HA Blueprint does not need to configure the initial status of each NameNode, since this can be assigned automatically.  

If desired, the user can configure the initial state of each NameNode by adding the following configuration properties in the “hadoop-env” namespace:

1.  dfs_ha_initial_namenode_active - This property should contain the hostname for the “active” NameNode in this cluster.
    
2.  dfs_ha_initial_namenode_standby - This property should contain the host name for the “passive” NameNode in this cluster.
    
:::caution
These properties should only be used when the initial state of the active or standby NameNodes needs to be configured to a specific node.  This setting is only guaranteed to be accurate in the initial state of the cluster.  Over time, the active/standby state of each NameNode may change as failover events occur in the cluster.

The active or standby status of a NameNode is not recorded or expressed when an HDFS HA Cluster is being exported to a Blueprint, using the Blueprint REST API endpoint.  Since clusters change over time, this state is only accurate in the initial startup of the cluster.

Generally, it is assumed that most users will not need to choose the active or standby status of each NameNode, so the default behavior in Blueprints HA is to assign the status of each node automatically.
:::

#### Example Blueprint

This is a minimal blueprint with HDFS HA: [hdfs_ha_blueprint.json](https://cwiki.apache.org/confluence/download/attachments/55151584/hdfs_ha_blueprint.json?version=4&modificationDate=1434548806000&api=v2) 

These are the base configurations required. See the blueprint above for more details:
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

#### HostName Topology Substitution in Configuration Property Values

The host-related properties should be set using the “HOSTGROUP” syntax to refer to a given Blueprint’s host group, in order to map each NameNode’s actual host (defined in the Cluster Creation Template) to the properties in hdfs-site that require these host mappings.  

The syntax for these properties should be:

“%HOSTGROUP::HOST_GROUP_NAME%:PORT””

For example, the following property from the snippet above:

"dfs.namenode.http-address.mycluster.nn1":

"%HOSTGROUP::master_1%:50070"

This property value is interpreted by the Blueprint processor to refer to the host that maps to the “master_1” host group, which should include a “NAMENODE” among its list of components.  The address property listed above should map to the host for “master_1”, at the port “50070”.  

Using this syntax is the most portable way to define host-specific properties within a Blueprint, since no direct host name references are used.  This will allow a Blueprint to be applied in a wider variety of cluster deployments, and not be tied to a specific set of hostnames.  

#### Register Blueprint with Ambari Server  

Post the blueprint to the "blueprint-hdfs-ha" resource to the Ambari Server.

```
POST /api/v1/blueprints/blueprint-hdfs-ha
 
...
[ Request Body is the example blueprint defined above ]
...
 
201 - Created
```

#### Example Cluster Creation Template

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

#### Create Cluster Instance

Post the cluster to the Ambari Server to provision the cluster.
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

### Blueprint Example: Yarn ResourceManager HA Cluster

#### Summary

Yarn ResourceManager High Availability (HA) adds support for deploying two Yarn ResourceManagers in a given Yarn cluster.  This support removes the single point of failure that occurs when single ResourceManager is used.  

The Yarn ResourceManager support for HA is somewhat similar to HDFS NameNode HA in that an “active/standby” architecture is adopted, with Zookeeper used to handle the failover scenarios between the two ResourceManager instances.  

The following Apache Hadoop documentation describes the steps required in order to setup Yarn ResourceManager HA manually:

[http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerHA.html](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerHA.html)

:::caution
Ambari Blueprints will handle much of the details of server setup listed in this documentation, but the user of Ambari will need to define the various configuration properties listed in this article (yarn.resourcemanager.ha.enabled, yarn.resourcemanager.hostname.$NAME_OF_RESOURCE_MANAGER, etc).  The example Blueprints listed below will demonstrate the configuration properties that must be included in the Blueprint for this feature to startup the HA cluster properly.
:::

  The following stack components should be included in any host group in a Blueprint that supports an HA Yarn ResourceManager

1.  RESOURCEMANAGER
    
2.  ZOOKEEPER_SERVER
    

#### Initial setup of Active and Standby ResourceManagers

The Yarn ResourceManager HA feature depends upon Zookeeper in order to manage the details of  the “active” or “standby” status of a given ResourceManager.  When the two ResourceManagers are starting up initially, the first ResourceManager instance to acquire a Zookeeper lock, called a “znode”, will become the “active” ResourceManager for the cluster, with the other instance assuming the role of the “standby” ResourceManager.  

:::caution
The Blueprints HA feature does not support configuring the initial “active” or “standby” status of the ResourceManagers deployed in a Yarn HA cluster.  The first instance to obtain the Zookeeper lock will become the “active” node.  This allows the user to specify the host groups that contain the 2 ResourceManager instances, but also shields the user from the need to select the first “active” node.

After the cluster has started up initially, the state of the “active” and “standby” ResourceManagers may change over time.  The initial “active” server is not guaranteed to remain the “active” node over the lifetime of the cluster.  During a failover event, the “standby” node may be required to fulfill the role of the “active” server.

The active or standby status of a ResourceManager is not recorded or expressed when a Yarn cluster is being exported to a Blueprint, using the Blueprint REST API endpoint.  Since clusters change over time, this state is only accurate in the initial startup of the cluster.
:::

#### Example Blueprint

The following link includes an example Blueprint for a 3-node Yarn ResourceManager HA Cluster:

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

#### Register Blueprint with Ambari Server

Post the blueprint to the "blueprint-yarn-ha" resource to the Ambari Server.

```
POST /api/v1/blueprints/blueprint-yarn-ha
 
...
[ Request Body is the example blueprint defined above ]
...
 
201 - Created

```

#### Example Cluster Creation Template

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

#### Create Cluster Instance

Post the cluster to the Ambari Server to provision the cluster.

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
  

### Blueprint Example: HBase RegionServer HA Cluster

#### Summary

HBase provides a High Availability feature for reads across HBase Region Servers.  

The following link to the Apache HBase documentation provides more information on HA support in HBase:

[http://hbase.apache.org/book.html#arch.timelineconsistent.reads](http://hbase.apache.org/book.html#arch.timelineconsistent.reads)

:::caution
The documentation listed here explains how to deploy an HBase RegionServer HA cluster via a Blueprint, but there are separate application-specific steps that must be taken in order to enable this feature for a specific table in HBase.  A table must be created with replication enabled, so that multiple Region Servers can handle the keys for this table.
:::

For more information on how to define an HBase table with replication enabled (after the cluster has been created), please refer to the following HBase documentation:

[http://hbase.apache.org/book.html#_creating_a_table_with_region_replication](http://hbase.apache.org/book.html#_creating_a_table_with_region_replication)

The following stack components should be included in any host group in a Blueprint that supports an HA HBase RegionServer:

1.  HBASE_REGIONSERVER
    

At least two “HBASE_REGIONSERVER” components must be deployed in order to enable this feature, so that table information can be replicated across more than one Region Server.  

#### Example Blueprint

The following link includes an example Blueprint for a 2-node HBase RegionServer HA Cluster:

[hbase_rs_ha_blueprint.json](https://cwiki.apache.org/confluence/download/attachments/55151584/hbase_rs_ha_blueprint.json?version=1&modificationDate=1427136904000&api=v2)  

The following JSON snippet includes the “hbase-site” configuration typically required for a cluster that utilizes the HBase RegionServer HA feature:  

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
The JSON example above is not a complete set of “hbase-site” configurations, but rather shows the configuration settings that are relevant to HBase RegionServer HA.  In particular, the “hbase.regionserver.storefile.refresh.period” setting is the most relevant to HBase RegionServer HA, since this property must be set to a value greater than zero in order for the HA feature to be enabled.
:::

#### Register Blueprint with Ambari Server  

Post the blueprint to the "blueprint-hbase-rs-ha" resource to the Ambari Server.

POST /api/v1/blueprints/blueprint-hbase-rs-ha
 
...
[ Request Body is the example blueprint defined above ]
...
 
201 - Created

#### Example Cluster Creation Template
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
  

#### Create Cluster Instance

Post the cluster to the Ambari Server to provision the cluster.

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