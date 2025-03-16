"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[667],{28453:(e,r,i)=>{i.d(r,{R:()=>a,x:()=>c});var n=i(96540);const s={},t=n.createContext(s);function a(e){const r=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(t.Provider,{value:r},e.children)}},51628:(e,r,i)=>{i.r(r),i.d(r,{assets:()=>o,contentTitle:()=>c,default:()=>l,frontMatter:()=>a,metadata:()=>n,toc:()=>m});const n=JSON.parse('{"id":"ambari-design/metrics/upgrading-ambari-metrics-system","title":"Upgrading Ambari Metrics System","description":"Upgrading from Ambari 2.0 or 2.0.1 to 2.1","source":"@site/docs/ambari-design/metrics/upgrading-ambari-metrics-system.md","sourceDirName":"ambari-design/metrics","slug":"/ambari-design/metrics/upgrading-ambari-metrics-system","permalink":"/docs/next/ambari-design/metrics/upgrading-ambari-metrics-system","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/docs/ambari-design/metrics/upgrading-ambari-metrics-system.md","tags":[],"version":"current","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Stack Defined Metrics","permalink":"/docs/next/ambari-design/metrics/stack-defined-metrics"},"next":{"title":"Ambari Server Metrics","permalink":"/docs/next/ambari-design/metrics/ambari-server-metrics"}}');var s=i(74848),t=i(28453);const a={},c="Upgrading Ambari Metrics System",o={},m=[];function d(e){const r={code:"code",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"upgrading-ambari-metrics-system",children:"Upgrading Ambari Metrics System"})}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.strong,{children:"Upgrading from Ambari 2.0 or 2.0.1 to 2.1"})}),"\n",(0,s.jsxs)(r.ol,{children:["\n",(0,s.jsx)(r.li,{children:"Upgrade ambari server and perform needed post-upgrade checks. (make sure all services are up and running)"}),"\n",(0,s.jsx)(r.li,{children:"Stop Ambari Metrics service"}),"\n",(0,s.jsx)(r.li,{children:"Execute the following command on all hosts."}),"\n"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-bash",children:" yum upgrade -y ambari-metrics-monitor  ambari-metrics-hadoop-sink\n"})}),"\n",(0,s.jsx)(r.p,{children:"(Use appropriate package manager on ubuntu and windows)"}),"\n",(0,s.jsxs)(r.ol,{start:"4",children:["\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"Execute the following command on host running Metrics Collector"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-bash",children:"yum upgrade -y ambari-metrics-collector\n"})}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"Start Ambari Metrics Service"}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"The Sink jars will be deployed on every host, the daemons will pick the changes to sink implementations when they are restarted. (E.g.: HDFS Namenode / Datanode)"}),"\n"]}),"\n"]})]})}function l(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);