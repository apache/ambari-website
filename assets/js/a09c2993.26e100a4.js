"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[4128],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>d});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),s=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),c=s(r),d=n,b=c["".concat(l,".").concat(d)]||c[d]||u[d]||i;return r?a.createElement(b,o(o({ref:t},m),{},{components:r})):a.createElement(b,o({ref:t},m))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=c;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:n,o[1]=p;for(var s=2;s<i;s++)o[s]=r[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},88495:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var a=r(87462),n=(r(67294),r(3905));const i={sidebar_position:1},o="Introduction",p={unversionedId:"introduction",id:"introduction",title:"Introduction",description:"The Apache Ambari project is aimed at making Hadoop management simpler by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs.",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/introduction",permalink:"/docs/next/introduction",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/docs/introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"ambariSidebar",next:{title:"Quick Start Guide",permalink:"/docs/next/quick-start/quick-start-guide"}},l={},s=[{value:"Getting Started with Ambari",id:"getting-started-with-ambari",level:2},{value:"Get Involved",id:"get-involved",level:2}],m={toc:s};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"introduction"},"Introduction"),(0,n.kt)("p",null,"The Apache Ambari project is aimed at making Hadoop management simpler by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs."),(0,n.kt)("p",null,"Ambari enables System Administrators to:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Provision a Hadoop Cluster"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Ambari provides a step-by-step wizard for installing Hadoop services across any number of hosts.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Ambari handles configuration of Hadoop services for the cluster.")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Manage a Hadoop Cluster"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Ambari provides central management for starting, stopping, and reconfiguring Hadoop services across the entire cluster."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Monitor a Hadoop Cluster"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Ambari provides a dashboard for monitoring health and status of the Hadoop cluster.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Ambari leverages ",(0,n.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/AMBARI-5707"},"Ambari Metrics System")," for metrics collection.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Ambari leverages ",(0,n.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/AMBARI-6354"},"Ambari Alert Framework")," for system alerting and will notify you when your attention is needed (e.g., a node goes down, remaining disk space is low, etc)."))))),(0,n.kt)("p",null,"Ambari enables Application Developers and System Integrators to:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Easily integrate Hadoop provisioning, management, and monitoring capabilities to their own applications with the ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/docs/api/v1/index.md"},"Ambari REST APIs"),".")),(0,n.kt)("h2",{id:"getting-started-with-ambari"},"Getting Started with Ambari"),(0,n.kt)("p",null,"Follow the ",(0,n.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/AMBARI/Installation+Guide+for+Ambari+2.7.6"},"installation guide for Ambari 2.7.6"),"."),(0,n.kt)("p",null,"Note: Ambari currently supports the 64-bit version of the following Operating Systems:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"RHEL (Redhat Enterprise Linux) 7.4, 7.3, 7.2"),(0,n.kt)("li",{parentName:"ul"},"CentOS 7.4, 7.3, 7.2"),(0,n.kt)("li",{parentName:"ul"},"OEL (Oracle Enterprise Linux) 7.4, 7.3, 7.2"),(0,n.kt)("li",{parentName:"ul"},"Amazon Linux 2"),(0,n.kt)("li",{parentName:"ul"},"SLES (SuSE Linux Enterprise Server) 12 SP3, 12 SP2"),(0,n.kt)("li",{parentName:"ul"},"Ubuntu 14 and 16"),(0,n.kt)("li",{parentName:"ul"},"Debian 9")),(0,n.kt)("h2",{id:"get-involved"},"Get Involved"),(0,n.kt)("p",null,"Visit the ",(0,n.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/AMBARI/Ambari"},"Ambari Wiki")," for design documents, roadmap, development guidelines, etc."),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"http://www.meetup.com/Apache-Ambari-User-Group"},"Join the Ambari User Meetup Group"),". You can see the slides from ",(0,n.kt)("a",{parentName:"p",href:"http://www.meetup.com/Apache-Ambari-User-Group/events/109316812/"},"April 2, 2013"),", ",(0,n.kt)("a",{parentName:"p",href:"http://www.meetup.com/Apache-Ambari-User-Group/events/119184782/"},"June 25, 2013"),", and ",(0,n.kt)("a",{parentName:"p",href:"http://www.meetup.com/Apache-Ambari-User-Group/events/134373312/"},"September 25, 2013")," meetups."))}u.isMDXComponent=!0}}]);