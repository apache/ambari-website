# Ambari Server Metrics

## Outline
Ambari Server can be used to manage a few tens of nodes to 1000+ nodes. In large clusters, or clusters with sub-optimal infrastructure, capturing Ambari Server performance can be useful for tuning the server as well as guiding future performance optimization efforts. Through this feature, a Metrics Source-Sink framework has been implemented within the AmbariServer which facilitates fine grained control of the various metric sources as well as eases addition of future metrics sources.

Specifically, Ambari server JVM and database (EclipseLink) metric sources have been wired up to send metrics to AMS, and visualized through Grafana dashboards. 

## Metrics System Terminology

## Configuration / Enabling
* To enable Ambari Server metrics, make sure the following config file exists during Ambari Server start/restart -  /etc/ambari-server/conf/metrics.properties.
* Currently, only 2 metric sources have been implemented - JVM Metric Source and Database Metric Source.
* To add / remove a metric source to be tracked the following config needs to be modified in the metrics.properties file.
    ```
        metric.sources=jvm,database
    ```
* Source specific configs are discussed in the metrics source section.

## Metric Sources

Name|Functionality|Interface|Implementation(s)
----|-------------|---------|-----------------------
Metrics Service |Serves as a starting point for the Metrics system.<br></br>Loads metrics configuration.<br></br>Initializes the sink. If the sink is not properly initialized (AMS is not yet deployed), it tries to re-initialize every 5 minutes asynchronously.<br></br>Initializes and starts configured sources. | org.apache.ambari.server.metrics.system.MetricsService | org.apache.ambari.server.metrics.system.impl.MetricsServiceImpl
Metric Source | Any sub-component of Ambari Server that has metrics of interest.<br></br>Needs subset of metrics configuration corresponding to the source and the Sink to be initialized.<br></br>Periodically publishes metrics to the Sink.<br></br>Example - JVM, database etc. | org.apache.ambari.server.metrics.system.MetricsSource |org.apache.ambari.server.metrics.system.impl.JvmMetricsSource<br></br>org.apache.ambari.server.metrics.system.impl.DatabaseMetricsSource
Metric Sink | Flushes the metrics to an external metrics collection system (Metrics Collector) | org.apache.ambari.server.metrics.system.MetricsSink | org.apache.ambari.server.metrics.system.impl.AmbariMetricSinkImp

### JVM Metrics

**Working**

* Collects and publishes Ambari Server JVM related metrics using Codahale library. 
* Metrics collected for GC, Buffers, Threads, Memory and File descriptor. 
* To enable this source, add "jvm" to the metric.sources config in metrics.properties and restart Ambari Server.

**Configs**

Config Name|Default Value|Explanation
-----------|-------------|---------------------
source.jvm.class | org.apache.ambari.server.metrics.system.impl.JvmMetricsSource | Class used to collect JVM Metrics.
source.jvm.interval | 10 | Interval, in seconds, used to denote how often metrics should be collected.

**Grafana dashboard**

* The 'Ambari Server - JVM' dashboard represents the metrics captured from the JvmMetricsSource. 
* Contains memory, GC and threads related graphs that might be of interest on a non performing syste

### Database Metrics

**Working**

The EclipseLink PeformanceMonitor has been extended to support a custom Ambari Database Metrics source. It provides us with monitoring data per entity and per operation on the entity. 

The Performance Monitor provides 2 kinds of metrics -

* Counter - Number of occurrences of the operation / query. For such type of metrics, the metric name will start with Counter.
* Timer - Total cumulative time spent on the operation / query. For such type of metrics, the metric name will start with Timer.
For example, some of the metrics being collected tothe Database Metrics Source.

* Counter.ReadObjectQuery.HostRoleCommandEntity.readHostRoleCommandEntity

* Timer.ReadAllQuery.StackEntity.StackEntity.findByNameAndVersion.ObjectBuilding


In addition to the Counter & Timer metrics collected from EclipseLink, a computed metric of Timer/Counter (divided by) is also sent. This metrics provides the average time taken for an operation across time. 

For example, if

```
 Counter Metric : Counter.ReadAllQuery.HostRoleCommandEntity = 10000
 Timer Metric : Timer.ReadAllQuery.HostRoleCommandEntity = 50
 Computed Metric (Avg time for the operation) : ReadAllQuery.HostRoleCommandEntity = 200 (10000 div by 50)
```

As seen above, the computed metric name will be the same as the Timer & Counter metric except without the 'Timer.' / 'Counter.' prefix.

To enable this source, add "**database**" to the **metric.sources** config in metrics.properties and restart Ambari Server.

**configs**

Config Name|Default Value|Explanation
-----------|-------------|---------------------
source.database.class | org.apache.ambari.server.metrics.system.impl.DatabaseMetricsSource | Class used to collect Database Metrics from extended Performance Monitor class - org.apache.ambari.server.metrics.system.impl.AmbariPerformanceMonitor.
source.database.performance.monitor.query.weight | HEAVY | EclipseLink Performance monitor granularity : NONE / NORMAL / HEAVY / ALL
source.database.monitor.dumptime | 60000 | Collection interval in milliseconds
source.database.monitor.entities | Cluster(.*)Entity,Host(.*)Entity,ExecutionCommandEntity, ServiceComponentDesiredStateEntity,Alert(.*)Entity,StackEntity,StageEntity | Only these entities' metrics will be collected and tracked. (org.apache.ambari.server.orm.entities).
source.database.monitor.query.keywords.include | CacheMisses | Include some metrics which have the keyword even if they are not part of requested Entities.

**Grafana dashboards**

Ambari database metrics have been represented in 2 Grafana dashboards.

* 'Ambari Server - Database' dashboard
    * An aggregate dashboard that displays Total ReadAllQuery, Cache Hits, Cache Misses, Query Stages, Query Types across all entities.
    * It also contains an example of how to visualize Timer, Counter and Avg Timing data for a specific entity - HostRoleCommandEntity. 
* 'Ambari Server - Top N Entities' dashboard
    * Shows Top N entities that have maximum number of ReadAllQuery operations done on them.
    * Shows Top N entities that the database spent the most time in ReadAllQuery operations. 
    * Shows Top N entities that have maximum Cache Misses
These dashboard graphs are meant to provide an example of how to create graphs to query specific entities or operations in an Ad Hoc manner. 

## Disabling Ambari Server metrics globally

* Add the following config to /etc/ambari-server/conf/ambari.properties
  * ambariserver.metrics.disable=true
* Restart Ambari Server

## Related JIRA

[AMBARI-17589](https://issues.apache.org/jira/browse/AMBARI-17589)