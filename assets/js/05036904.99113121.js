"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8010],{3507:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"ambari-design/metrics/metrics-collector-api-specification","title":"Metrics Collector API Specification","description":"Sending Metrics to AMS (POST)","source":"@site/versioned_docs/version-3.0.0/ambari-design/metrics/metrics-collector-api-specification.md","sourceDirName":"ambari-design/metrics","slug":"/ambari-design/metrics/metrics-collector-api-specification","permalink":"/docs/ambari-design/metrics/metrics-collector-api-specification","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-design/metrics/metrics-collector-api-specification.md","tags":[],"version":"3.0.0","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Metrics","permalink":"/docs/ambari-design/metrics/"},"next":{"title":"Configuration","permalink":"/docs/ambari-design/metrics/configuration"}}');var s=n(74848),r=n(28453);const a={},c="Metrics Collector API Specification",d={},l=[{value:"Sending Metrics to AMS (POST)",id:"sending-metrics-to-ams-post",level:2},{value:"Fetching Metrics from AMS (GET)",id:"fetching-metrics-from-ams-get",level:2},{value:"AMS Metadata API",id:"ams-metadata-api",level:2},{value:"Guide to writing your own Sink",id:"guide-to-writing-your-own-sink",level:2}];function o(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"metrics-collector-api-specification",children:"Metrics Collector API Specification"})}),"\n",(0,s.jsx)(t.h2,{id:"sending-metrics-to-ams-post",children:"Sending Metrics to AMS (POST)"}),"\n",(0,s.jsx)(t.p,{children:"Sending metrics to Ambari Metrics Service can be achieved through the following API call."}),"\n",(0,s.jsx)(t.p,{children:"The Sink implementations responsible for sending metrics to AMS, buffer data for 1 minute before sending. TimelineMetricCache provides a simple cache implementation to achieve this behavior."}),"\n",(0,s.jsxs)(t.p,{children:["Sample sink implementation use by Hadoop daemons: ",(0,s.jsx)(t.a,{href:"https://github.com/apache/ambari/tree/trunk/ambari-metrics/ambari-metrics-hadoop-sink",children:"https://github.com/apache/ambari/tree/trunk/ambari-metrics/ambari-metrics-hadoop-sink"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-uri",children:"POST http://<ambari-metrics-collector>:6188/ws/v1/timeline/metrics\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "metrics": [\n    {\n      "metricname": "AMBARI_METRICS.SmokeTest.FakeMetric",\n      "appid": "amssmoketestfake",\n      "hostname": "ambari20-5.c.pramod-thangali.internal",\n      "timestamp": 1432075898000,\n      "starttime": 1432075898000,\n      "metrics": {\n        "1432075898000": 0.963781711428,\n        "1432075899000": 1432075898000\n      }\n    }\n  ]\n}\n'})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"Connecting (POST) to <ambari-metrics-collector>:6188/ws/v1/timeline/metrics/\nHttp response: 200 OK\n"})}),"\n",(0,s.jsx)(t.h2,{id:"fetching-metrics-from-ams-get",children:"Fetching Metrics from AMS (GET)"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Sample call"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:'GET http://<ambari-metrics-collector>:6188/ws/v1/timeline/metrics?metricNames=AMBARI_METRICS.SmokeTest.FakeMetric&appId=amssmoketestfake&hostname=<hostname>&precision=seconds&startTime=1432075838000&endTime=1432075959000\nHttp response: 200 OK\nHttp data:\n{\n   "metrics": [\n      {\n         "timestamp": 1432075898089,\n         "metricname": "AMBARI_METRICS.SmokeTest.FakeMetric",\n         "appid": "amssmoketestfake",\n         "hostname": "ambari20-5.c.pramod-thangali.internal",\n         "starttime": 1432075898000,\n         "metrics": {\n            "1432075898000": 0.963781711428,\n            "1432075899000": 1432075898000\n         }\n      }\n   ]\n}\n'})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Generic GET call format"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-uri",children:"http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=<>&hostname=<>&appId=<>&startTime=<>&endTime=<>&precision=<>\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Query Parameters Explanation"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Parameter"}),(0,s.jsx)(t.th,{children:"Optional/Mandatory"}),(0,s.jsx)(t.th,{children:"Explanation"}),(0,s.jsx)(t.th,{children:"Values it can take"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"metricNames"}),(0,s.jsx)(t.td,{children:"Mandatory Comma"}),(0,s.jsx)(t.td,{children:"separated list of metrics that are required."}),(0,s.jsx)(t.td,{children:"disk_free,mem_free... etc"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"appId"}),(0,s.jsx)(t.td,{children:"Mandatory"}),(0,s.jsx)(t.td,{children:"The AppId that corresponds to the metricNames that were requested. Currently, only 1 AppId is required and allowed."}),(0,s.jsx)(t.td,{children:"HOST/namenode/datanode/nimbus/hbase/kafka_broker/FLUME_HANDLER etc"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"hostname"}),(0,s.jsx)(t.td,{children:"Optional"}),(0,s.jsx)(t.td,{children:"Comma separated list of hostnames. When no specified, cluster aggregates are returned."}),(0,s.jsx)(t.td,{children:"h1,h2..etc"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"startTime, endTime"}),(0,s.jsx)(t.td,{children:"Optional"}),(0,s.jsx)(t.td,{children:"Start and End time values. If not specified, the last data point of the metric is returned."}),(0,s.jsx)(t.td,{children:"epoch times in seconds or milliseconds"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"precision"}),(0,s.jsx)(t.td,{children:"Optional"}),(0,s.jsx)(t.td,{children:"What precision the data needs to be returned. If not specified, the precision is calculated based on the time range requested (Table below)"}),(0,s.jsx)(t.td,{children:"SECONDS/MINUTES/DAYS/HOURS"})]})]})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Precision query parameter (Default resolution)"})}),"\n",(0,s.jsxs)("table",{class:"confluenceTable",children:[(0,s.jsxs)("colgroup",{children:[(0,s.jsx)("col",{}),(0,s.jsx)("col",{}),(0,s.jsx)("col",{})]}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsxs)("th",{class:"confluenceTh",children:[(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Query Time"})}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"range"})})]}),(0,s.jsx)("th",{class:"confluenceTh",children:(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{children:"Resolution of "}),(0,s.jsx)("span",{children:"returned metrics"})]})}),(0,s.jsx)("th",{class:"confluenceTh",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Comments"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Upto 2 hours"})})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"SECONDS"})})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:(0,s.jsx)("span",{children:(0,s.jsx)("span",{children:"10 second data for host metrics"})})}),(0,s.jsx)("li",{children:(0,s.jsxs)("span",{children:[(0,s.jsx)("span",{children:"30 second data for Aggregated query (No host specified)"}),(0,s.jsx)("br",{class:"_mce_tagged_br"})]})})]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"2 hours - 1 day"})})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"MINUTES"})})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"5 minute data"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsxs)("span",{children:[(0,s.jsx)("span",{children:"1 day"})," - 30 days"]})})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:"HOURS"})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"1 hour data"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"> 30 days"})})}),(0,s.jsx)("td",{class:"confluenceTd",children:(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"DAYS"})})}),(0,s.jsx)("td",{class:"confluenceTd",children:"1 day data"})]})]})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Specifying Aggregate Functions"})}),"\n",(0,s.jsx)(t.p,{children:"The metricName can have a specific aggregate function qualifier after the metricName (as shown below) to request specific aggregates. Valid values are ._avg, ._max, ._min, ._sum. When an aggregate query is requested without an aggregate function in the metricName, the default is AVG.\nExamples"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.totalRequestCount._avg,regionserver.Server.writeRequestCount._max&appId=hbase&startTime=14000000&endTime=14200000\n\nhttp://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.readRequestCount,regionserver.Server.writeRequestCount._max&appId=hbase&startTime=14000000&endTime=14200000\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Specifying Post processing Functions"})}),"\n",(0,s.jsx)(t.p,{children:"Similar to aggregate functions, post processing functions can also be specified. Currently, we have 2 post processing functions - rate (Rate per second) and diff (difference between consecutive values). Post processing functions can also be applied after aggregate functions.\nExamples"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.totalRequestCount._rate,regionserver.Server.writeRequestCount._diff&appId=hbase&startTime=14000000&endTime=14200000\n\nhttp://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.readRequestCount._max._diff&appId=hbase&startTime=14000000&endTime=14200000\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Specifying Wild Cards"})}),"\n",(0,s.jsx)(t.p,{children:"Both metricNames and hostname take wildcard (%) values for a group of metric (or hosts). A query can have a combination of full metric names and names with wildcards also."}),"\n",(0,s.jsx)(t.p,{children:"Examples"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.%&appId=hbase&startTime=14000000&endTime=14200000\n\nhttp://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.%&hostname=abc.testdomain124.devlocal&appId=hbase&startTime=14000000&endTime=14200000\n\nhttp://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=master.AssignmentManger.ritCount,regionserver.Server.%&hostname=abc.testdomain124.devlocal&appId=hbase&startTime=14000000&endTime=14200000\n\nhttp://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.%&hostname=abc.testdomain12%.devlocal&appId=hbase&startTime=14000000&endTime=14200000\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Downsampling"})}),"\n",(0,s.jsx)(t.p,{children:'As discussed before, AMS downsamples data when higher time ranges are requested. The default "downsampled across time" data returned is AVG. Specific downsamples can be requested by adding the aggregate function qualifiers ( ._avg, ._max, ._min, ._sum ) to the metric names the same way like requesting aggregates across the cluster.\nExample'}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:" http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.totalRequestCount._max&hostname=abc.testdomain124.devlocal&appId=hbase&startTime=14000000&endTime=14200000&precision=MINUTES\n"})}),"\n",(0,s.jsx)(t.p,{children:"The above query returns 5 minute data for the metric, where the data point value is the MAX of the values found in every 5 minute range."}),"\n",(0,s.jsx)(t.h2,{id:"ams-metadata-api",children:"AMS Metadata API"}),"\n",(0,s.jsx)(t.p,{children:"AMS has 2 metadata endpoints that are useful for finding out the set of metrics it received, as well as the topology of the cluster."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"METRICS METADATA"})}),"\n",(0,s.jsx)(t.p,{children:"Endpoint :"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:" http://<AMS_HOST>:6188/ws/v1/timeline/metrics/metadata\n"})}),"\n",(0,s.jsx)(t.p,{children:"Data returned : A mapping between the set of APP_IDs to the list of metrics received with that AppId."}),"\n",(0,s.jsx)(t.p,{children:"Sample data returned"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{src:n(13569).A+"",width:"1218",height:"618"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"HOSTS METADATA"})}),"\n",(0,s.jsx)(t.p,{children:"Endpoint :"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:" http://<AMS_HOST>:6188/ws/v1/timeline/metrics/hosts\n"})}),"\n",(0,s.jsx)(t.p,{children:"Data returned : A mapping between the hosts in the cluster and the set of APP_IDs on the host."}),"\n",(0,s.jsx)(t.p,{children:"Sample data returned"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{src:n(85227).A+"",width:"848",height:"1022"})}),"\n",(0,s.jsx)(t.h2,{id:"guide-to-writing-your-own-sink",children:"Guide to writing your own Sink"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Include the ambari-metrics-common artifacts from source or maven-central (when available) into your project"}),"\n",(0,s.jsx)(t.li,{children:"Find below helpful info regarding common data-structures to use from the ambari-metrics-common module"}),"\n",(0,s.jsx)(t.li,{children:"Extend the org.apache.hadoop.metrics2.sink.timeline.AbstractTimelineMetricsSink class and implement the required methods"}),"\n",(0,s.jsx)(t.li,{children:"Use the org.apache.hadoop.metrics2.sink.timeline.cache.TimelineMetricsCache to store intermediate data until it is time to send (example: collection interval = 10 seconds, send interval = 1 minute). The cache implementation provides the logic needed for buffering and local aggregation."}),"\n",(0,s.jsx)(t.li,{children:"Use org.apache.hadoop.metrics2.sink.timeline.AbstractTimelineMetricsSink#emitMetrics to send metrics to AMS backend."}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"METRIC DATA STRUCTURE"})}),"\n",(0,s.jsxs)(t.p,{children:["Source location for common data structures module: ",(0,s.jsx)(t.a,{href:"https://github.com/apache/ambari/tree/trunk/ambari-metrics/ambari-metrics-common/",children:"https://github.com/apache/ambari/tree/trunk/ambari-metrics/ambari-metrics-common/"})]}),"\n",(0,s.jsxs)(t.p,{children:["Example sink implementation: ",(0,s.jsx)(t.a,{href:"https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-hadoop-sink/",children:"https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-hadoop-sink/"})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{src:n(7971).A+"",width:"1062",height:"528"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"INTERNAL PHOENIX KEY STRUCTURE"})}),"\n",(0,s.jsx)(t.p,{children:"The Metric Record Key data structure is described below:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Comment"}),(0,s.jsx)(t.th,{children:"Optional"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Metric Name"}),(0,s.jsx)(t.td,{children:"String"}),(0,s.jsx)(t.td,{children:"First key part, important consideration while querying from HFile storage"}),(0,s.jsx)(t.td,{children:"N"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Hostname"}),(0,s.jsx)(t.td,{children:"String"}),(0,s.jsx)(t.td,{children:"Second key part"}),(0,s.jsx)(t.td,{children:"N"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Server time"}),(0,s.jsx)(t.td,{children:"Long"}),(0,s.jsx)(t.td,{children:"Timestamp on server when first metric write request was received"}),(0,s.jsx)(t.td,{children:"N"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Application Id"}),(0,s.jsx)(t.td,{children:"String"}),(0,s.jsx)(t.td,{children:"Uniquely identify service"}),(0,s.jsx)(t.td,{children:"N"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Instance Id"}),(0,s.jsx)(t.td,{children:"String"}),(0,s.jsx)(t.td,{children:"Second key part to identify instance/ component"}),(0,s.jsx)(t.td,{children:"Y"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Start time"}),(0,s.jsx)(t.td,{children:"Long"}),(0,s.jsx)(t.td,{children:"Start of the timeseries data"}),(0,s.jsx)(t.td,{})]})]})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"HOW AGGREGATION WORKS"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"The granularity of aggregate data can be controlled by setting wake up interval for each of the aggregator threads."}),"\n",(0,s.jsxs)(t.li,{children:["Presently we support 2 types of aggregators, HOST and APPLICATION with 3 time dimensions, per minute, per hour and per day.","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"The HOST aggregates are just aggregates on precision data across the supported time dimensions."}),"\n",(0,s.jsx)(t.li,{children:"The APP aggregates are across appId. Note: We ignore instanceId for APP level aggregates. Same time dimensions apply for APP level aggregates."}),"\n",(0,s.jsx)(t.li,{children:'We also support HOST level metrics for APP, meaning you can expect a system metric example: "cpu_user" to be aggregated across datanodes, effectively calculating system metric for hosted apps.'}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.li,{children:"Each aggregator performs checkpointing by storing last successful time of completion in a file. If the checkpoint is too old, the aggregators will discard checkpoint and aggregate data for the configured interval, meaning data in between (now - interval) time."}),"\n",(0,s.jsxs)(t.li,{children:["Refer to ",(0,s.jsx)(t.a,{href:"/docs/ambari-design/metrics/operations",children:"Phoenix table schema"})," for details of tables and records."]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},7971:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/metrics-datastructure-0a1bb015473da49e72bc088e16529e60.png"},13569:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/metrics-metadata-743e7d6996525df1e402c9717c67a883.png"},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>c});var i=n(96540);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}},85227:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/hosts-metadata-ae5251d1eadb22f289b0f95b0a308ff1.png"}}]);