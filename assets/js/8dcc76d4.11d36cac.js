"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[7615],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>u});var a=t(67294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var m=a.createContext({}),c=function(e){var r=a.useContext(m),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},p=function(e){var r=c(e.components);return a.createElement(m.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},d=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,m=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(t),u=n,g=d["".concat(m,".").concat(u)]||d[u]||l[u]||i;return t?a.createElement(g,o(o({ref:r},p),{},{components:t})):a.createElement(g,o({ref:r},p))}));function u(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,o=new Array(i);o[0]=d;var s={};for(var m in r)hasOwnProperty.call(r,m)&&(s[m]=r[m]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},57818:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>m,contentTitle:()=>o,default:()=>l,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=t(87462),n=(t(67294),t(3905));const i={},o="Upgrading Ambari Metrics System",s={unversionedId:"ambari-design/metrics/upgrading-ambari-metrics-system",id:"version-3.0.0/ambari-design/metrics/upgrading-ambari-metrics-system",title:"Upgrading Ambari Metrics System",description:"Upgrading from Ambari 2.0 or 2.0.1 to 2.1",source:"@site/versioned_docs/version-3.0.0/ambari-design/metrics/upgrading-ambari-metrics-system.md",sourceDirName:"ambari-design/metrics",slug:"/ambari-design/metrics/upgrading-ambari-metrics-system",permalink:"/docs/ambari-design/metrics/upgrading-ambari-metrics-system",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-design/metrics/upgrading-ambari-metrics-system.md",tags:[],version:"3.0.0",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Stack Defined Metrics",permalink:"/docs/ambari-design/metrics/stack-defined-metrics"},next:{title:"Ambari Server Metrics",permalink:"/docs/ambari-design/metrics/ambari-server-metrics"}},m={},c=[],p={toc:c};function l(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"upgrading-ambari-metrics-system"},"Upgrading Ambari Metrics System"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Upgrading from Ambari 2.0 or 2.0.1 to 2.1")),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Upgrade ambari server and perform needed post-upgrade checks. (make sure all services are up and running)")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Stop Ambari Metrics service")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Execute the following command on all hosts."),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"}," yum upgrade -y ambari-metrics-monitor  ambari-metrics-hadoop-sink\n")),(0,n.kt)("p",{parentName:"li"},"(Use appropriate package manager on ubuntu and windows)")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Execute the following command on host running Metrics Collector"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"yum upgrade -y ambari-metrics-collector\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Start Ambari Metrics Service")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"The Sink jars will be deployed on every host, the daemons will pick the changes to sink implementations when they are restarted. (E.g.: HDFS Namenode / Datanode)"))))}l.isMDXComponent=!0}}]);