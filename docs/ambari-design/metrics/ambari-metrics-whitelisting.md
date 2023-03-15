# Ambari Metrics - Whitelisting

In large clusters (500+ nodes), sometimes there are performance issues seen in AMS aggregations. In the ambari-metrics-collector log file, we can see log lines that look like

```
20:51:30,952 INFO 2080712366@qtp-974606690-381 AsyncProcess:1597 - #1, waiting for 13948 actions to finish
20:51:31,601 INFO 1279097595@qtp-974606690-359 AsyncProcess:1597 - #1, waiting for 19376 actions to finish
```

In Ambari 3.0.0, we are tackling these performance issues through a complete schema and aggregation logic revamp. Until then, we can use AMS whitelisting to reduce the number of metrics tracked by AMS, there by solving this scale problem. 

## How do we enable whitelisting in AMS.

**Until Ambari 2.4.3**
 A metric whitelist file can be used to track the set of metrics in AMS. All other metrics will be discarded.

**STEPS**

* Metric whitelist file is present in /etc/ambari-metrics-collector/conf. If not present in older Ambari versions, it can be downloaded from https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-timelineservice/conf/unix/metrics_whitelist to the collector host.
* Adding config ams-site : timeline.metrics.whitelist.file = <path_to_whitelist_file>
* Restart AMS collector
* Verify whitelisting config was used. In ambari-metrics-collector log file, verify the line 'Whitelisting # metrics'.

**From Ambari 2.5.0 onwards**
From Ambari 2.5.0, more refinements for whitelisting were included.

* **App Blacklisting** - Blacklist metrics from one or more services. Other service metrics will be entirely allowed or controlled through a whitelist file.

   ``` 
   ams-site : timeline.metrics.apps.blacklist = hbase,namenode
   ```

* **App Whitelisting** - Whitelist metrics from one or more services.

    ```
    ams-site:timeline.metrics.apps.whitelist = nimbus,datanode   
    ```

   NOTE : The App name can be found from the metadata URL :
   
   ```
   http:<metrics_collector_host>:6188/ws/v1/timeline/metrics/metadata
   ```

* **Metric Whitelisting** - Same as the whitelisting method in Ambari 2.4.3 (through a whitelist file).
In addition to supplying metric names in the whitelist file, patterns can also be supplied using the ._p_ perfix. For example, a pattern can be specified as follows

._p_dfs.FSNamesystem.*

._p_jvm.JvmMetrics*

An example of a metric whitelisting file that has both metrics and patterns - https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-timelineservice/src/test/resources/test_data/metric_whitelist.dat.

These whitelisting/blacklisting techniques can be used together.

* If you just have timeline.metrics.whitelist.file = &lt;some_file&gt;, only metrics in that file will be allowed (irrespective of whatever apps might be sending them). 
* If you just have timeline.metrics.apps.blacklist = datanode, all datanode metrics will be disallowed. Metrics from all other services will be allowed.
* If you just have timeline.metrics.apps.whitelist = namenode, it is not useful since there is no blacklisting at all. 
* If you have metric whitelisting enabled (through a file), and have timeline.metrics.apps.blacklist = datanode, all datanode metrics will be disallowed. The whitelisted metrics from other services will be allowed.
* If you have timeline.metrics.apps.blacklist = datanode, timeline.metrics.apps.whitelist = namenode and metric whitelisting enabled (through a file), datanode metrics will be blacklisted, all namenode metrics will be allowed, and whitelisted metrics from other services will be allowed.
