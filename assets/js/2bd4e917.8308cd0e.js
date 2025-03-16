"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[616],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>u});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=l(r),u=a,g=p["".concat(c,".").concat(u)]||p[u]||d[u]||i;return r?n.createElement(g,o(o({ref:t},m),{},{components:r})):n.createElement(g,o({ref:t},m))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},83214:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(87462),a=(r(67294),r(3905));const i={},o="Metrics",s={unversionedId:"ambari-design/metrics/index",id:"version-2.7.5/ambari-design/metrics/index",title:"Metrics",description:'Ambari Metrics System ("AMS") is a system for collecting, aggregating and serving Hadoop and system metrics in Ambari-managed clusters.',source:"@site/versioned_docs/version-2.7.5/ambari-design/metrics/index.md",sourceDirName:"ambari-design/metrics",slug:"/ambari-design/metrics/",permalink:"/docs/2.7.5/ambari-design/metrics/",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-design/metrics/index.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Enhanced Service Dashboard",permalink:"/docs/2.7.5/ambari-design/service-dashboard/"},next:{title:"Metrics Collector API Specification",permalink:"/docs/2.7.5/ambari-design/metrics/metrics-collector-api-specification"}},c={},l=[{value:"Terminology",id:"terminology",level:2},{value:"Architecture",id:"architecture",level:2},{value:"Learn More",id:"learn-more",level:2}],m={toc:l};function d(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},m,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"metrics"},"Metrics"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Ambari Metrics System"),' ("AMS") is a system for collecting, aggregating and serving Hadoop and system metrics in Ambari-managed clusters.'),(0,a.kt)("h2",{id:"terminology"},"Terminology"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Term"),(0,a.kt)("th",{parentName:"tr",align:null},"Definition"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Ambari Metrics System (\u201cAMS\u201d)"),(0,a.kt)("td",{parentName:"tr",align:null},"The built-in metrics collection system for Ambari.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Metrics Collector"),(0,a.kt)("td",{parentName:"tr",align:null},"The standalone server that collects metrics, aggregates metrics, serves metrics from the Hadoop service sinks and the Metrics Monitor.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Metrics Monitor"),(0,a.kt)("td",{parentName:"tr",align:null},"Installed on each host in the cluster to collect system-level metrics and forward to the Metrics Collector.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Metrics Hadoop Sinks"),(0,a.kt)("td",{parentName:"tr",align:null},"Plugs into the various Hadoop components sinks to send Hadoop metrics to the Metrics Collector.")))),(0,a.kt)("h2",{id:"architecture"},"Architecture"),(0,a.kt)("p",null,"Following image depicts the high level conceptual architecture of the new Ambari Metrics System:"),(0,a.kt)("p",null,(0,a.kt)("img",{src:r(69965).Z,title:"AMS Arch",width:"955",height:"443"})),(0,a.kt)("p",null,"The ",(0,a.kt)("strong",{parentName:"p"},"Metrics Collector"),' is daemon that receives data from registered publishers (the Monitors and Sinks). The Collector itself is build using Hadoop technologies such as HBase Phoenix and ATS. The Collector can store data on the local filesystem (referred to as "embedded mode") or use an external HDFS (referred to as "distributed mode").'),(0,a.kt)("h2",{id:"learn-more"},"Learn More"),(0,a.kt)("p",null,"Browse the following to learn more about the ",(0,a.kt)("a",{parentName:"p",href:"/docs/2.7.5/ambari-design/metrics/metrics-api-specification"},"Ambari Metrics REST API")," specification and about advanced ",(0,a.kt)("a",{parentName:"p",href:"/docs/2.7.5/ambari-design/metrics/configuration"},"Configuration")," of AMS."))}d.isMDXComponent=!0},69965:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/ams-arch-e1f8a953ce31cdf3b26cd39c3ebac341.jpg"}}]);