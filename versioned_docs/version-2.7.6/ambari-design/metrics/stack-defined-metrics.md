# Stack Defined Metrics

The Ambari Stack definition represents the complete declarative description of Services that are comprised in a cluster.

The stack definition also contains a definition file for all metrics that are supported by the Service.

Presently the metrics.json describes the mapping between the metrics name requested in the REST API and the metrics name to use for making a call to the Metrics Service.

Location of the **metrics.json** in the stack:

Level|Location|Comment
-----|--------|-------
Cluster & Host | ganglia_properties.json | Presently, this file defines metrics for Host Component and Service Components as well but these are only used for older versions of stack < 2.0 and unit tests.<br></br>The Cluster and Host sections of this json file drive the Dashboard graphs.
Component & Host Component | common-services.&lt;SERVICE_NAME&gt; | This file contains definition of metrics mapping for Ambari Metrics (type = ganglia) and JMX.

**Note**: The individual stacks that override behavior from common services can redefine the metrics.json file, the inheritance is all-or-nothing, meaning if metrics.json file is present in the child stack, it will override the metrics.json from common-services

**Structure of metrics.json file**

Key|Allowed Values|Comments
-----|--------|-------------
Type  |"ganglia" / "jmx" |type = ganglia implies Metrics Service request fulfilled by either a Ganglia (up to version 2.0) or Ambari Metrics (2.0 and above) backend service, this decision is taken by Ambari server at runtime.
Category | "default" / "performance" ... |This is to group metrics into subsets for better navigability
Metrics |metricKey : { <br></br>"metricName":<br></br>"pointInTime":<br></br>temporal":<br></br>} | metricKey = Key to be used by REST API. This is unique for a service and identifies the requested metric as well as what endpoint to use for serving the data (AMS vs JMX)<br></br>metricName = Name to use for the Metrics Service backend<br></br>pointInTime = Get latest value, no time range query allowed<br></br>temporal = Time range query supported

Example:

```json
{

  "NAMENODE": {

    "Component": [

      {

        "type": "ganglia",

        "metrics": {

          "default": {

            "metrics/dfs/FSNamesystem/TotalLoad": {

              "metric": "dfs.FSNamesystem.TotalLoad",

              "pointInTime": false,

              "temporal": true

            }

        } ]

    },

    "HostComponent" : [

         { "type" : "ganglia", ... }

         {  "type" : "jmx", .... }

   ]

}
```

**Sample API calls to retrieve metric definitions**:

Service metrics:
```
Template => http://<ambari-server>:<port>/api/v1/stacks/<stackName>/versions/<stackVersion>/services/<serviceName>/artifacts/metrics_descriptor
Example => http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/HDFS/artifacts/metrics_descriptor
```
Cluster & Host metrics:
```
Template => http://<ambari-server>:<port>/api/v1/stacks/<stackName>/versions/<stackVersion>/artifacts/metrics_descriptor
Example => http://localhost:8080/api/v1/stacks/HDP/versions/2.3/artifacts/metrics_descriptor
```