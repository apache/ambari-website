---
title: Ambari Metrics API specification
---

The Ambari REST API supports metric queries at CLUSTER, HOST, COMPONENT and HOST COMPONENT levels.

Broadly, the types of metrics queries supported are: **time range** or **point in time**.

Following is an illustration of an API call that fetches metrics from the Metrics backend service using Ambari API.

## CLUSTER

E.g.: Dashboard metrics : Fetch load average across all nodes of a cluster
```
http://<ambari-server>:8080/api/v1/clusters/<cluster-name>?fields=metrics/load[1430844925,1430848525,15]&_=1430848532904
```
The above API call retrieves the load average, aggregated across all hosts in the cluster.

The request part of the API call selects the cluster instance while the predicate includes the metric with the time range query, followed by current time in milliseconds.

Time range query:

Field      | Value      |Comment
-----------|------------|----------------------------------------
Start time | 1430844925 |Start time for the time range. (Epoch)
End time   | 1430848525 |End time of the time range. (Epoch)
Step       | 15         |Default step, this is used only for zero padding or null padding if the padding interval cannot be determined from the retrieved data.

## HOST

E.g.: Host metrics: Get the cpu utilization on a particular host in the cluster

```
http://<ambari-server>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>?fields=metrics/cpu/cpu_user[1430844610,1430848210,15],metrics/cpu/cpu_wio[1430844610,1430848210,15],metrics/cpu/cpu_nice[1430844610,1430848210,15],metrics/cpu/cpu_aidle[1430844610,1430848210,15],metrics/cpu/cpu_system[1430844610,1430848210,15],metrics/cpu/cpu_idle[1430844610,1430848210,15]&_=1430848217591
```

The above API call retrieves all cpu related metrics required to chart out cpu utilization on a host page.

The request part of the above API call selects the host which is queried while the predicate part includes the metric names with time range query.

## COMPONENT

E.g.: Service metrics: Get the capacity utilization metrics aggregated across all datanodes but only the latest value (point in time)

```
 http://<ambari-server>:8080/api/v1/clusters/<cluster-name>/services/HDFS/components/DATANODE?fields=metrics/dfs/datanode/DfsUsed,metrics/dfs/datanode/Capacity&_=1430849798630
```

The above API call retrieves two metrics values which represent the point in time metric value for the requested metrics obtained for the Metrics Service backend. (non JMX)

For a call to get JMX metrics directly from a Hadoop daemon, use the metrics name that corresponds to the JMX MBean metric, example: metrics/dfs/FSNamesystem/CapacityUsedGB (Refer to Stack Defined Metrics for more info)

The request part of the above API call selects the service from the cluster while predicate part includes the metrics names.

## HOST COMPONENT
E.g.: Daemon metrics: Get the heap memory usage for active Namenode

```
http://<ambari-server>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>/host_components/NAMENODE?fields=metrics/jvm/memHeapCommittedM[1430847303,1430850903,15],metrics/jvm/memHeapUsedM[1430847303,1430850903,15]&_=1430850903846
The above API call retrieves JVM heap metrics for the Active Namenode in the cluster.
```

The request part of the api selects the Namenode host component while predicate part includes metrics with time range query.