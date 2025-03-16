"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[3164],{28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>o});var r=t(96540);const i={},a=r.createContext(i);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(a.Provider,{value:n},e.children)}},37056:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"ambari-dev/admin-view-ambari-admin-development","title":"Admin View (ambari-admin) Development","description":"Frontend Development","source":"@site/versioned_docs/version-2.7.5/ambari-dev/admin-view-ambari-admin-development.md","sourceDirName":"ambari-dev","slug":"/ambari-dev/admin-view-ambari-admin-development","permalink":"/docs/2.7.5/ambari-dev/admin-view-ambari-admin-development","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-dev/admin-view-ambari-admin-development.md","tags":[],"version":"2.7.5","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Releasing Ambari","permalink":"/docs/2.7.5/ambari-dev/releasing-ambari"},"next":{"title":"Unit Test Reports","permalink":"/docs/2.7.5/ambari-dev/unit-test-reports"}}');var i=t(74848),a=t(28453);const s={},o="Admin View (ambari-admin) Development",d={},l=[{value:"Frontend Development",id:"frontend-development",level:2},{value:"Functional Tests",id:"functional-tests",level:2},{value:"Unit Tests",id:"unit-tests",level:2}];function m(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"admin-view-ambari-admin-development",children:"Admin View (ambari-admin) Development"})}),"\n",(0,i.jsx)(n.h2,{id:"frontend-development",children:"Frontend Development"}),"\n",(0,i.jsx)(n.p,{children:"Follow the instructions here to ease frontend development for Admin View (ambari-admin module):"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Follow the Quick Start Guide to install and start Ambari Server (cluster need not be deployed)."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:'Follow the "Frontend Development" section in Quick Start Guide to check out the Ambari source using git.  This makes the entire Ambari source available via /vagrant/ambari from the Vagrant VM.'}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"From the Ambari Server host:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cd /var/lib/ambari-server/resources/views/work  <- if this directory does not exist, you have      not started ambari-server; run "ambari-server start" to start it\nmv ADMIN_VIEW\\{2.5.0.0\\} /tmp\nln -s /vagrant/ambari/ambari-admin/src/main/resources/ui/admin-web/dist ADMIN_VIEW\\{2.5.0.0\\}\ncp /tmp/ADMIN_VIEW\\{2.5.0.0\\}/view.xml ADMIN_VIEW\\{2.5.0.0\\}/ \nambari-server restart\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Now you can change the source code for Admin View and run gulp locally, and the changes are automatically reflected on the server."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"functional-tests",children:"Functional Tests"}),"\n",(0,i.jsx)(n.p,{children:"To run end-to-end functional tests on the browser, execute:"}),"\n",(0,i.jsx)(n.p,{children:"npm run update-webdriver\nnpm start (This starts http server at 8000 port)"}),"\n",(0,i.jsx)(n.p,{children:"Open another terminal at same path and execute: npm run protractor (does e2e test in the browser. This library works on top of selenium jar)."}),"\n",(0,i.jsx)(n.h2,{id:"unit-tests",children:"Unit Tests"}),"\n",(0,i.jsx)(n.p,{children:"To run unit tests:"}),"\n",(0,i.jsxs)(n.p,{children:["Go to path: ",(0,i.jsx)(n.code,{children:"/ambari/ambari-admin/src/main/resources/ui/admin-web"}),"\nExecute npm run test-single-run (this uses PhantomJS headless browser; it's the same used by the ambari-web unit tests)"]}),"\n",(0,i.jsxs)(n.p,{children:['Note:\n"npm test" command starts karma server at ',(0,i.jsx)(n.a,{href:"http://localhost:9876/",children:"http://localhost:9876/"})," and runs unit tests. This server remain up, autoreloads any changes in the test code and reruns the tests. This is useful while developing unit tests."]})]})}function c(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}}}]);