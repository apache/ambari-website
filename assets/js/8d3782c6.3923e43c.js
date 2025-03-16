"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[32],{15949:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>a,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"ambari-design/metrics/troubleshooting","title":"Troubleshooting","description":"Cleaning up Ambari Metrics System Data","source":"@site/versioned_docs/version-3.0.0/ambari-design/metrics/troubleshooting.md","sourceDirName":"ambari-design/metrics","slug":"/ambari-design/metrics/troubleshooting","permalink":"/docs/ambari-design/metrics/troubleshooting","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-design/metrics/troubleshooting.md","tags":[],"version":"3.0.0","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Operations","permalink":"/docs/ambari-design/metrics/operations"},"next":{"title":"Ambari Metrics API specification","permalink":"/docs/ambari-design/metrics/metrics-api-specification"}}');var n=i(74848),r=i(28453);const o={},l="Troubleshooting",a={},d=[{value:"Cleaning up Ambari Metrics System Data",id:"cleaning-up-ambari-metrics-system-data",level:2},{value:"Step-by-step guide",id:"step-by-step-guide",level:3},{value:"Moving Metrics Collector to a new host",id:"moving-metrics-collector-to-a-new-host",level:2},{value:"Troubleshooting Guide",id:"troubleshooting-guide",level:2},{value:"Known Issues",id:"known-issues",level:2}];function h(e){const s={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"troubleshooting",children:"Troubleshooting"})}),"\n",(0,n.jsx)(s.h2,{id:"cleaning-up-ambari-metrics-system-data",children:"Cleaning up Ambari Metrics System Data"}),"\n",(0,n.jsx)(s.p,{children:"Following steps would help in cleaning up Ambari Metrics System data in a given cluster."}),"\n",(0,n.jsx)(s.p,{children:"Important Note:"}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsx)(s.li,{children:"Cleaning up the AMS data would remove all the historical AMS data available"}),"\n",(0,n.jsx)(s.li,{children:"The hbase parameters mentioned above are specific to AMS and they are different from the Cluster Hbase parameters"}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"step-by-step-guide",children:"Step-by-step guide"}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsxs)(s.li,{children:["Using Ambari","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Set AMS to maintenance"}),"\n",(0,n.jsxs)(s.li,{children:["Stop AMS from Ambari. Identify the following from the AMS Configs screen","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"'Metrics Service operation mode' (embedded or distributed)"}),"\n",(0,n.jsx)(s.li,{children:"hbase.rootdir"}),"\n",(0,n.jsx)(s.li,{children:"hbase.zookeeper.property.dataDir"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["AMS data would be stored in 'hbase.rootdir' identified above. Backup and remove the AMS data.","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["If the Metrics Service operation mode","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"is 'embedded', then the data is stored in OS files. Use regular OS commands to backup and remove the files in hbase.rootdir"}),"\n",(0,n.jsx)(s.li,{children:"is 'distributed', then the data is stored in HDFS. Use 'hdfs dfs' commands to backup and remove the files in hbase.rootdir"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.li,{children:"Remove the AMS zookeeper data by backing up and removing the contents of 'hbase.tmp.dir'/zookeeper"}),"\n",(0,n.jsx)(s.li,{children:"Remove any Phoenix spool files from 'hbase.tmp.dir'/phoenix-spool folder\n5 Restart AMS using Ambari"}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"moving-metrics-collector-to-a-new-host",children:"Moving Metrics Collector to a new host"}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Stop AMS Service"}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Execute the following API call to Delete Metric Collector. (Replace server-host, cluster-name and host-name with the Metrics Collector host)"}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:'curl -u admin:admin  -H "X-Requested-By:ambari" -i -X DELETE http://<server-host>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>/host_components/METRICS_COLLECTOR\n'})}),"\n",(0,n.jsxs)(s.ol,{start:"3",children:["\n",(0,n.jsx)(s.li,{children:"Execute the following API call to add Metrics collector to a new host. (Replace, server-host, cluster-name, host-name)"}),"\n"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:'curl -u admin:admin  -H "X-Requested-By:ambari" -i -X POST http://<server-host>:8080/api/v1/clusters/<cluster-name>/hosts/<host-name>/host_components/METRICS_COLLECTOR\n'})}),"\n",(0,n.jsxs)(s.ol,{start:"4",children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Install the Metrics Collector component from the Host page of the new host."}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"If the AMS is in embedded mode, copy the AMS data from old node to new node."}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"For embedded mode (ams-site: timeline.metrics.service.operation.mode), copy over the hbase.rootdir and tmpdir to new host from the old collector host."}),"\n",(0,n.jsx)(s.li,{children:"For distributed mode, since AMS HBase is writing to HDFS, no change will be necessary."}),"\n",(0,n.jsxs)(s.li,{children:["Ensure that ams:hbase-site",":hbase",".rootdir and hbase.tmp.dir are pointing to the correct location in the new AMS node"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Start the Metrics Service."}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"The service daemons will be pointing to the old metrics collector host. Perform a rolling restart of slave components and a normal restart of Master components for them to pick up the new collector host."}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"Note : Restart of services is not needed post Ambari-2.5.0 since live collector information is maintained in the cluster zookeeper."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(21156).A+"",width:"2004",height:"1012"})}),"\n",(0,n.jsx)(s.h2,{id:"troubleshooting-guide",children:"Troubleshooting Guide"}),"\n",(0,n.jsx)(s.p,{children:"The following page documents common problems discovered with Ambari Metrics Service and provides a guide for things to look out for and already solved problems."}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Important facts to collect from the system"}),":"]}),"\n",(0,n.jsx)(s.p,{children:"Problems with Metric Collector host"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:'Output of "rpm -qa | grep ambari" on the collector host.'}),"\n",(0,n.jsx)(s.li,{children:'Total available System memory, output of : "free -g"'}),"\n",(0,n.jsx)(s.li,{children:'Total available disk space and available partitions, output of : "df -h "'}),"\n",(0,n.jsx)(s.li,{children:"Total number of hosts in the cluster"}),"\n",(0,n.jsx)(s.li,{children:"Configs: /etc/ams-hbase/conf/hbase-env.sh, /etc/ams-hbase/conf/hbase-site.xml, /etc/ambari-metrics-collector/conf/ams-env.sh, /etc/ambari-metrics-collector/conf/ams-site.xml"}),"\n",(0,n.jsx)(s.li,{children:"Collector logs:"}),"\n"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"/var/log/ambari-metrics-collector/ambari-metrics-collector.log, /var/log/ambari-metrics-collector/hbase-ams-master-<host>.log, /var/log/ambari-metrics-collector/hbase-ams-master-<host>.out\nNote: Additionally, If distributed mode is enabled, /var/log/ambari-metrics-collector/hbase-ams-zookeeper-<host>.log, /var/log/ambari-metrics-collector/hbase-ams-regionserver-<host>.log\n"})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Response to the following URLs -"}),"\n"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"http://<ams-host>:6188/ws/v1/timeline/metrics/metadata\nhttp://<ams-host>:6188/ws/v1/timeline/metrics/hosts \n"})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"The response will be JSON and can be attached as a file."}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"From AMS HBase Master UI - http://<METRICS_COLLECTOR_HOST>:61310"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Region Count"}),"\n",(0,n.jsx)(s.li,{children:"StoreFile Count"}),"\n",(0,n.jsx)(s.li,{children:"JMX Snapshot - http://<METRICS_COLLECTOR_HOST>:61310/jmx"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Problems with Metric Monitor host"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"Monitor log file: /etc/ambari-metrics-monitor/ambari-metrics-monitor.out\n"})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsxs)(s.strong,{children:["Check out ",(0,n.jsx)(s.a,{href:"https://cwiki.apache.org/confluence/display/AMBARI/Configurations+-+Tuning",children:"Configurations - Tuning"})," for scale issue troubleshooting."]})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Issue 1: AMS HBase process slow disk writes"})}),"\n",(0,n.jsxs)(s.p,{children:["The symptoms and resolutions below address the ",(0,n.jsx)(s.strong,{children:"embedded"})," mode of AMS only."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.em,{children:"Symptoms"}),":"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Behavior"}),(0,n.jsx)(s.th,{children:"How to detect"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"High CPU usage"}),(0,n.jsx)(s.td,{children:"HBase process on Collector host taking up close to 100% of every core"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"HBase Log: Compaction times"}),(0,n.jsx)(s.td,{children:"grep hbase-ams-master-<host>.log"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"HBase Log: ZK timeout"}),(0,n.jsxs)(s.td,{children:["HBase crashes saying zookeeper session timed out. This happens because in embedded mode the zk session timeout is limited to max of 30 seconds (HBase issue: fix planned for 2.1.3).",(0,n.jsx)("br",{}),"The cause is again slow disk reads."]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:'Collector Log : "waiting for some tasks to finish"'}),(0,n.jsx)(s.td,{children:"ambari-metric-collector log shows messages where AsyncProcess writes are queued up"})]})]})]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.em,{children:"Resolutions"}),":"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Configuration Change"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ams-hbase-site :: hbase.rootdir"}),(0,n.jsx)(s.td,{children:"Change this path to a disk mount that is not heavily contended."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ams-hbase-ste :: hbase.tmp.dir"}),(0,n.jsx)(s.td,{children:"Change this path to a location different from hbase.rootdir"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsxs)(s.td,{children:["ams-hbase-env :: hbase_master_heapsize",(0,n.jsx)("br",{}),"ams-hbase-site :: hbase.hregion.memstore.flush.size"]}),(0,n.jsxs)(s.td,{children:["Bump this value up so more data is held in memory to address I/O speeds.",(0,n.jsx)("br",{}),"If heap size is increased and resident memory usage does not go up, this parameter can be changed to address how much data can be stored in a memstore per Region. Default is set to 128 MB. The size is in bytes.",(0,n.jsx)("br",{}),"Be careful with modifying this value, generally limit the setting between 64 MB (small heap with fast disk write), to 512 MB (large heap > 8 GB, and average write speed), since more data held in memory means longer time to write it to disk during a Flush operation."]})]})]})]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Issue 2: Ambari Metrics take a long time to load"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.em,{children:"Symptoms"}),":"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Behavior"}),(0,n.jsx)(s.th,{children:"How to detect"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsxs)(s.td,{children:["Graphs: Loading time too long",(0,n.jsx)("br",{}),"Graphs: No data available"]}),(0,n.jsx)(s.td,{children:"Check out service pages / host pages for metric graphs"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Socket read timeouts"}),(0,n.jsx)(s.td,{children:"ambari-server.log shows: Error message saying socket timeout for metrics"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Ambari UI slowing down"}),(0,n.jsxs)(s.td,{children:["Host page loading time is high, heatmaps do not show data",(0,n.jsx)("br",{}),"Dashboard loading time is too high",(0,n.jsx)("br",{}),"Multiple sessions result in slowness"]})]})]})]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.em,{children:"Resolutions"}),":"]}),"\n",(0,n.jsx)(s.p,{children:"Upgrade to 2.1.2+ is highly recommended."}),"\n",(0,n.jsx)(s.p,{children:"Following is a list of fixes in 2.1.2 release that should greatly help to alleviate the slow loading and timeouts:"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"https://issues.apache.org/jira/browse/AMBARI-12654",children:"https://issues.apache.org/jira/browse/AMBARI-12654"})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"https://issues.apache.org/jira/browse/AMBARI-12983",children:"https://issues.apache.org/jira/browse/AMBARI-12983"})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"https://issues.apache.org/jira/browse/AMBARI-13108",children:"https://issues.apache.org/jira/browse/AMBARI-13108"})}),"\n",(0,n.jsx)(s.h2,{id:"known-issues",children:(0,n.jsx)(s.a,{href:"https://cwiki.apache.org/confluence/display/AMBARI/Known+Issues",children:"Known Issues"})})]})}function c(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},21156:(e,s,i)=>{i.d(s,{A:()=>t});const t=i.p+"assets/images/restart-datanode-9d845a689cad8b033dfd594bf15d0a36.png"},28453:(e,s,i)=>{i.d(s,{R:()=>o,x:()=>l});var t=i(96540);const n={},r=t.createContext(n);function o(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);