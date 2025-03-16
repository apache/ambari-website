"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[4994],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var a=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,i=function(e,t){if(null==e)return{};var r,a,i={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var o=a.createContext({}),m=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=m(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var r=e.components,i=e.mdxType,n=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=m(r),d=i,b=p["".concat(o,".").concat(d)]||p[d]||u[d]||n;return r?a.createElement(b,l(l({ref:t},c),{},{components:r})):a.createElement(b,l({ref:t},c))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=r.length,l=new Array(n);l[0]=p;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var m=2;m<n;m++)l[m]=r[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},2475:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>n,metadata:()=>s,toc:()=>m});var a=r(87462),i=(r(67294),r(3905));const n={},l="Ambari Server Metrics",s={unversionedId:"ambari-design/metrics/ambari-server-metrics",id:"version-2.7.5/ambari-design/metrics/ambari-server-metrics",title:"Ambari Server Metrics",description:"Outline",source:"@site/versioned_docs/version-2.7.5/ambari-design/metrics/ambari-server-metrics.md",sourceDirName:"ambari-design/metrics",slug:"/ambari-design/metrics/ambari-server-metrics",permalink:"/docs/2.7.5/ambari-design/metrics/ambari-server-metrics",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-design/metrics/ambari-server-metrics.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Upgrading Ambari Metrics System",permalink:"/docs/2.7.5/ambari-design/metrics/upgrading-ambari-metrics-system"},next:{title:"Ambari Metrics - Whitelisting",permalink:"/docs/2.7.5/ambari-design/metrics/ambari-metrics-whitelisting"}},o={},m=[{value:"Outline",id:"outline",level:2},{value:"Metrics System Terminology",id:"metrics-system-terminology",level:2},{value:"Configuration / Enabling",id:"configuration--enabling",level:2},{value:"Metric Sources",id:"metric-sources",level:2},{value:"JVM Metrics",id:"jvm-metrics",level:3},{value:"Database Metrics",id:"database-metrics",level:3},{value:"Disabling Ambari Server metrics globally",id:"disabling-ambari-server-metrics-globally",level:2},{value:"Related JIRA",id:"related-jira",level:2}],c={toc:m};function u(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"ambari-server-metrics"},"Ambari Server Metrics"),(0,i.kt)("h2",{id:"outline"},"Outline"),(0,i.kt)("p",null,"Ambari Server can be used to manage a few tens of nodes to 1000+ nodes. In large clusters, or clusters with sub-optimal infrastructure, capturing Ambari Server performance can be useful for tuning the server as well as guiding future performance optimization efforts. Through this feature, a Metrics Source-Sink framework has been implemented within the AmbariServer which facilitates fine grained control of the various metric sources as well as eases addition of future metrics sources."),(0,i.kt)("p",null,"Specifically, Ambari server JVM and database (EclipseLink) metric sources have been wired up to send metrics to AMS, and visualized through Grafana dashboards. "),(0,i.kt)("h2",{id:"metrics-system-terminology"},"Metrics System Terminology"),(0,i.kt)("h2",{id:"configuration--enabling"},"Configuration / Enabling"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"To enable Ambari Server metrics, make sure the following config file exists during Ambari Server start/restart -  /etc/ambari-server/conf/metrics.properties."),(0,i.kt)("li",{parentName:"ul"},"Currently, only 2 metric sources have been implemented - JVM Metric Source and Database Metric Source."),(0,i.kt)("li",{parentName:"ul"},"To add / remove a metric source to be tracked the following config needs to be modified in the metrics.properties file.",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"    metric.sources=jvm,database\n"))),(0,i.kt)("li",{parentName:"ul"},"Source specific configs are discussed in the metrics source section.")),(0,i.kt)("h2",{id:"metric-sources"},"Metric Sources"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Functionality"),(0,i.kt)("th",{parentName:"tr",align:null},"Interface"),(0,i.kt)("th",{parentName:"tr",align:null},"Implementation(s)"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Metrics Service"),(0,i.kt)("td",{parentName:"tr",align:null},"Serves as a starting point for the Metrics system.",(0,i.kt)("br",null),"Loads metrics configuration.",(0,i.kt)("br",null),"Initializes the sink. If the sink is not properly initialized (AMS is not yet deployed), it tries to re-initialize every 5 minutes asynchronously.",(0,i.kt)("br",null),"Initializes and starts configured sources."),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.MetricsService"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.impl.MetricsServiceImpl")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Metric Source"),(0,i.kt)("td",{parentName:"tr",align:null},"Any sub-component of Ambari Server that has metrics of interest.",(0,i.kt)("br",null),"Needs subset of metrics configuration corresponding to the source and the Sink to be initialized.",(0,i.kt)("br",null),"Periodically publishes metrics to the Sink.",(0,i.kt)("br",null),"Example - JVM, database etc."),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.MetricsSource"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.impl.JvmMetricsSource",(0,i.kt)("br",null),"org.apache.ambari.server.metrics.system.impl.DatabaseMetricsSource")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Metric Sink"),(0,i.kt)("td",{parentName:"tr",align:null},"Flushes the metrics to an external metrics collection system (Metrics Collector)"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.MetricsSink"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.impl.AmbariMetricSinkImp")))),(0,i.kt)("h3",{id:"jvm-metrics"},"JVM Metrics"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Working")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Collects and publishes Ambari Server JVM related metrics using Codahale library. "),(0,i.kt)("li",{parentName:"ul"},"Metrics collected for GC, Buffers, Threads, Memory and File descriptor. "),(0,i.kt)("li",{parentName:"ul"},'To enable this source, add "jvm" to the metric.sources config in metrics.properties and restart Ambari Server.')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Configs")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Config Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,i.kt)("th",{parentName:"tr",align:null},"Explanation"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.jvm.class"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.impl.JvmMetricsSource"),(0,i.kt)("td",{parentName:"tr",align:null},"Class used to collect JVM Metrics.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.jvm.interval"),(0,i.kt)("td",{parentName:"tr",align:null},"10"),(0,i.kt)("td",{parentName:"tr",align:null},"Interval, in seconds, used to denote how often metrics should be collected.")))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Grafana dashboard")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The 'Ambari Server - JVM' dashboard represents the metrics captured from the JvmMetricsSource. "),(0,i.kt)("li",{parentName:"ul"},"Contains memory, GC and threads related graphs that might be of interest on a non performing syste")),(0,i.kt)("h3",{id:"database-metrics"},"Database Metrics"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Working")),(0,i.kt)("p",null,"The EclipseLink PeformanceMonitor has been extended to support a custom Ambari Database Metrics source. It provides us with monitoring data per entity and per operation on the entity. "),(0,i.kt)("p",null,"The Performance Monitor provides 2 kinds of metrics -"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Counter - Number of occurrences of the operation / query. For such type of metrics, the metric name will start with Counter.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Timer - Total cumulative time spent on the operation / query. For such type of metrics, the metric name will start with Timer.\nFor example, some of the metrics being collected tothe Database Metrics Source.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Counter.ReadObjectQuery.HostRoleCommandEntity.readHostRoleCommandEntity")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Timer.ReadAllQuery.StackEntity.StackEntity.findByNameAndVersion.ObjectBuilding"))),(0,i.kt)("p",null,"In addition to the Counter & Timer metrics collected from EclipseLink, a computed metric of Timer/Counter (divided by) is also sent. This metrics provides the average time taken for an operation across time. "),(0,i.kt)("p",null,"For example, if"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"}," Counter Metric : Counter.ReadAllQuery.HostRoleCommandEntity = 10000\n Timer Metric : Timer.ReadAllQuery.HostRoleCommandEntity = 50\n Computed Metric (Avg time for the operation) : ReadAllQuery.HostRoleCommandEntity = 200 (10000 div by 50)\n")),(0,i.kt)("p",null,"As seen above, the computed metric name will be the same as the Timer & Counter metric except without the 'Timer.' / 'Counter.' prefix."),(0,i.kt)("p",null,'To enable this source, add "',(0,i.kt)("strong",{parentName:"p"},"database"),'" to the ',(0,i.kt)("strong",{parentName:"p"},"metric.sources")," config in metrics.properties and restart Ambari Server."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"configs")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Config Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,i.kt)("th",{parentName:"tr",align:null},"Explanation"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.database.class"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.ambari.server.metrics.system.impl.DatabaseMetricsSource"),(0,i.kt)("td",{parentName:"tr",align:null},"Class used to collect Database Metrics from extended Performance Monitor class - org.apache.ambari.server.metrics.system.impl.AmbariPerformanceMonitor.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.database.performance.monitor.query.weight"),(0,i.kt)("td",{parentName:"tr",align:null},"HEAVY"),(0,i.kt)("td",{parentName:"tr",align:null},"EclipseLink Performance monitor granularity : NONE / NORMAL / HEAVY / ALL")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.database.monitor.dumptime"),(0,i.kt)("td",{parentName:"tr",align:null},"60000"),(0,i.kt)("td",{parentName:"tr",align:null},"Collection interval in milliseconds")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.database.monitor.entities"),(0,i.kt)("td",{parentName:"tr",align:null},"Cluster(.",(0,i.kt)("em",{parentName:"td"},")Entity,Host(."),")Entity,ExecutionCommandEntity, ServiceComponentDesiredStateEntity,Alert(.*)Entity,StackEntity,StageEntity"),(0,i.kt)("td",{parentName:"tr",align:null},"Only these entities' metrics will be collected and tracked. (org.apache.ambari.server.orm.entities).")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"source.database.monitor.query.keywords.include"),(0,i.kt)("td",{parentName:"tr",align:null},"CacheMisses"),(0,i.kt)("td",{parentName:"tr",align:null},"Include some metrics which have the keyword even if they are not part of requested Entities.")))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Grafana dashboards")),(0,i.kt)("p",null,"Ambari database metrics have been represented in 2 Grafana dashboards."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"'Ambari Server - Database' dashboard",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"An aggregate dashboard that displays Total ReadAllQuery, Cache Hits, Cache Misses, Query Stages, Query Types across all entities."),(0,i.kt)("li",{parentName:"ul"},"It also contains an example of how to visualize Timer, Counter and Avg Timing data for a specific entity - HostRoleCommandEntity. "))),(0,i.kt)("li",{parentName:"ul"},"'Ambari Server - Top N Entities' dashboard",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"* Shows Top N entities that have maximum number of ReadAllQuery operations done on them.\n* Shows Top N entities that the database spent the most time in ReadAllQuery operations. \n* Shows Top N entities that have maximum Cache Misses\n")),"These dashboard graphs are meant to provide an example of how to create graphs to query specific entities or operations in an Ad Hoc manner. ")),(0,i.kt)("h2",{id:"disabling-ambari-server-metrics-globally"},"Disabling Ambari Server metrics globally"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Add the following config to /etc/ambari-server/conf/ambari.properties",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"ambariserver.metrics.disable=true"))),(0,i.kt)("li",{parentName:"ul"},"Restart Ambari Server")),(0,i.kt)("h2",{id:"related-jira"},"Related JIRA"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/AMBARI-17589"},"AMBARI-17589")))}u.isMDXComponent=!0}}]);