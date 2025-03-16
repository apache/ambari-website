"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[7458],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>u});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),b=c(r),u=a,f=b["".concat(l,".").concat(u)]||b[u]||m[u]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=b;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},5634:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const i={},o="Ambari Alerts",s={unversionedId:"ambari-alerts",id:"version-3.0.0/ambari-alerts",title:"Ambari Alerts",description:"Help page for Alerts defined in Ambari.",source:"@site/versioned_docs/version-3.0.0/ambari-alerts.md",sourceDirName:".",slug:"/ambari-alerts",permalink:"/docs/ambari-alerts",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-alerts.md",tags:[],version:"3.0.0",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Step-by-step guide on adding a dashboard widget for a host.",permalink:"/docs/ambari-plugin-contribution/step-by-step"}},l={},c=[{value:"Ambari Agent Heartbeat",id:"ambari-agent-heartbeat",level:2}],p={toc:c};function m(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"ambari-alerts"},"Ambari Alerts"),(0,a.kt)("p",null,"Help page for Alerts defined in Ambari."),(0,a.kt)("h2",{id:"ambari-agent-heartbeat"},"Ambari Agent Heartbeat"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Service"),": Ambari\n",(0,a.kt)("strong",{parentName:"p"},"Component"),": Ambari Server\n",(0,a.kt)("strong",{parentName:"p"},"Type"),": SERVER\n",(0,a.kt)("strong",{parentName:"p"},"Groups"),": AMBARI Default\n",(0,a.kt)("strong",{parentName:"p"},"Description"),": This alert is triggered if the server has lost contact with an agent."),(0,a.kt)("p",null,"If this alert is generated then the alert text will contain the host name (e.g. c6401.ambari.apache.org is not sending heartbeats.). Check that the agent is running and if its running tail the log to see if its receiving and heartbeat response from the server. Check if the server host name is correct in /etc/ambari-agent/conf/ambari-agent.ini file and is reachable."))}m.isMDXComponent=!0}}]);