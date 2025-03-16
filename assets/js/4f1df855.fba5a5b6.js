"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[859],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>d});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(a),d=r,k=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return a?n.createElement(k,i(i({ref:t},p),{},{components:a})):n.createElement(k,i({ref:t},p))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var u=2;u<o;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},9487:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=a(87462),r=(a(67294),a(3905));const o={title:"Frequently Asked Questions (FAQ)"},i="Frequently Asked Questions (FAQ)",l={unversionedId:"faq",id:"version-3.0.0/faq",title:"Frequently Asked Questions (FAQ)",description:"This page provides answers to commonly asked questions about Apache Ambari 3.0.0. If you don't find an answer to your question here, please reach out to the community via the mailing lists or Slack channel.",source:"@site/versioned_docs/version-3.0.0/faq.md",sourceDirName:".",slug:"/faq",permalink:"/docs/faq",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/faq.md",tags:[],version:"3.0.0",frontMatter:{title:"Frequently Asked Questions (FAQ)"},sidebar:"ambariSidebar",previous:{title:"Apache Ambari 3.0.0 Release Notes",permalink:"/docs/release-notes"},next:{title:"Quick Start Guide",permalink:"/docs/quick-start/quick-start-guide"}},s={},u=[{value:"General Questions",id:"general-questions",level:2},{value:"What is Apache Ambari?",id:"what-is-apache-ambari",level:3},{value:"What&#39;s new in Ambari 3.0.0?",id:"whats-new-in-ambari-300",level:3},{value:"Installation and Setup",id:"installation-and-setup",level:2},{value:"What are the system requirements for Ambari 3.0.0?",id:"what-are-the-system-requirements-for-ambari-300",level:3},{value:"Which operating systems are supported?",id:"which-operating-systems-are-supported",level:3},{value:"How do I enable the Rocky-Devel repository?",id:"how-do-i-enable-the-rocky-devel-repository",level:3},{value:"How do I troubleshoot SSH connectivity issues?",id:"how-do-i-troubleshoot-ssh-connectivity-issues",level:3},{value:"Configuration",id:"configuration",level:2},{value:"How do I disable SELinux?",id:"how-do-i-disable-selinux",level:3},{value:"How do I configure the hosts file correctly?",id:"how-do-i-configure-the-hosts-file-correctly",level:3},{value:"Which database systems are supported?",id:"which-database-systems-are-supported",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Common installation issues",id:"common-installation-issues",level:3},{value:"How do I check Ambari Server logs?",id:"how-do-i-check-ambari-server-logs",level:3},{value:"How do I check Ambari Agent logs?",id:"how-do-i-check-ambari-agent-logs",level:3},{value:"Development",id:"development",level:2},{value:"How do I contribute to Ambari?",id:"how-do-i-contribute-to-ambari",level:3},{value:"How do I set up a development environment?",id:"how-do-i-set-up-a-development-environment",level:3},{value:"How do I create a custom service for Ambari?",id:"how-do-i-create-a-custom-service-for-ambari",level:3}],p={toc:u};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"frequently-asked-questions-faq"},"Frequently Asked Questions (FAQ)"),(0,r.kt)("p",null,"This page provides answers to commonly asked questions about Apache Ambari 3.0.0. If you don't find an answer to your question here, please reach out to the community via the ",(0,r.kt)("a",{parentName:"p",href:"https://ambari.apache.org/community.html"},"mailing lists")," or ",(0,r.kt)("a",{parentName:"p",href:"https://the-asf.slack.com/archives/C014FSPE668"},"Slack channel"),"."),(0,r.kt)("h2",{id:"general-questions"},"General Questions"),(0,r.kt)("h3",{id:"what-is-apache-ambari"},"What is Apache Ambari?"),(0,r.kt)("p",null,"Apache Ambari is an open-source administration tool designed to simplify the management, monitoring, and maintenance of Apache Hadoop clusters. Ambari provides an intuitive web UI and robust REST APIs to simplify the provisioning, managing, and monitoring of Hadoop clusters."),(0,r.kt)("h3",{id:"whats-new-in-ambari-300"},"What's new in Ambari 3.0.0?"),(0,r.kt)("p",null,"Ambari 3.0.0 includes several major improvements:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Alluxio support (AMBARI-26055)"),(0,r.kt)("li",{parentName:"ul"},"Ozone file system service (AMBARI-24976)"),(0,r.kt)("li",{parentName:"ul"},"Grafana dashboards (AMBARI-25960)"),(0,r.kt)("li",{parentName:"ul"},"Ruff integration (AMBARI-26147)"),(0,r.kt)("li",{parentName:"ul"},"HiveServer2 web UI quicklink (AMBARI-26270)"),(0,r.kt)("li",{parentName:"ul"},"Java 17 support"),(0,r.kt)("li",{parentName:"ul"},"Python 3 compatibility"),(0,r.kt)("li",{parentName:"ul"},"OceanBase support")),(0,r.kt)("p",null,"For a complete list of new features, see the ",(0,r.kt)("a",{parentName:"p",href:"/docs/release-notes"},"Release Notes"),"."),(0,r.kt)("h2",{id:"installation-and-setup"},"Installation and Setup"),(0,r.kt)("h3",{id:"what-are-the-system-requirements-for-ambari-300"},"What are the system requirements for Ambari 3.0.0?"),(0,r.kt)("p",null,"For a development environment using Vagrant:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Host CPU: 6+ cores (2 cores per VM)"),(0,r.kt)("li",{parentName:"ul"},"Host RAM: 24GB+ (8GB per VM)"),(0,r.kt)("li",{parentName:"ul"},"Storage: 100GB+ free space"),(0,r.kt)("li",{parentName:"ul"},"VirtualBox 6.1+ and Vagrant 2.2+")),(0,r.kt)("p",null,"For production environments, requirements will vary based on cluster size and workload."),(0,r.kt)("h3",{id:"which-operating-systems-are-supported"},"Which operating systems are supported?"),(0,r.kt)("p",null,"Ambari 3.0.0 supports:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Rocky Linux 8"),(0,r.kt)("li",{parentName:"ul"},"CentOS 7"),(0,r.kt)("li",{parentName:"ul"},"Red Hat Enterprise Linux 7 and 8"),(0,r.kt)("li",{parentName:"ul"},"Ubuntu 18.04 and 20.04")),(0,r.kt)("h3",{id:"how-do-i-enable-the-rocky-devel-repository"},"How do I enable the Rocky-Devel repository?"),(0,r.kt)("p",null,"You need to edit the Rocky-Devel.repo file on each VM. You may encounter two scenarios:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"All lines commented out: Uncomment the necessary lines"),(0,r.kt)("li",{parentName:"ol"},"Repository disabled with enabled=0: Change to enabled=1")),(0,r.kt)("p",null,"To verify the repository is properly enabled, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yum repolist | grep devel\n")),(0,r.kt)("h3",{id:"how-do-i-troubleshoot-ssh-connectivity-issues"},"How do I troubleshoot SSH connectivity issues?"),(0,r.kt)("p",null,"If you're experiencing SSH connectivity issues:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Verify SSH service is running: ",(0,r.kt)("inlineCode",{parentName:"li"},"systemctl status sshd")),(0,r.kt)("li",{parentName:"ol"},"Check SSH configuration: ",(0,r.kt)("inlineCode",{parentName:"li"},"cat /etc/ssh/sshd_config")," (ensure PasswordAuthentication and PermitRootLogin are set to yes)"),(0,r.kt)("li",{parentName:"ol"},"Restart SSH service: ",(0,r.kt)("inlineCode",{parentName:"li"},"systemctl restart sshd")),(0,r.kt)("li",{parentName:"ol"},"Redistribute SSH keys if needed: ",(0,r.kt)("inlineCode",{parentName:"li"},"ssh-copy-id -o StrictHostKeyChecking=no user@host"))),(0,r.kt)("h2",{id:"configuration"},"Configuration"),(0,r.kt)("h3",{id:"how-do-i-disable-selinux"},"How do I disable SELinux?"),(0,r.kt)("p",null,"To temporarily disable SELinux:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"setenforce 0\n")),(0,r.kt)("p",null,"To permanently disable SELinux, edit ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/selinux/config")," and set:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"SELINUX=disabled\n")),(0,r.kt)("h3",{id:"how-do-i-configure-the-hosts-file-correctly"},"How do I configure the hosts file correctly?"),(0,r.kt)("p",null,"Ensure your hosts file:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Does not contain loopback entries for your cluster hostnames"),(0,r.kt)("li",{parentName:"ol"},"Contains proper static IP mappings for all nodes"),(0,r.kt)("li",{parentName:"ol"},"Is consistent across all nodes in the cluster")),(0,r.kt)("p",null,"For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"192.168.56.20 vm1\n192.168.56.21 vm2\n192.168.56.22 vm3\n")),(0,r.kt)("h3",{id:"which-database-systems-are-supported"},"Which database systems are supported?"),(0,r.kt)("p",null,"Ambari 3.0.0 supports:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"PostgreSQL 9.6+"),(0,r.kt)("li",{parentName:"ul"},"MySQL 5.7+"),(0,r.kt)("li",{parentName:"ul"},"MariaDB 10.2+"),(0,r.kt)("li",{parentName:"ul"},"OceanBase")),(0,r.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,r.kt)("h3",{id:"common-installation-issues"},"Common installation issues"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Repository access problems"),":"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Verify internet connectivity"),(0,r.kt)("li",{parentName:"ul"},"Check repository configuration"),(0,r.kt)("li",{parentName:"ul"},"Ensure Rocky-Devel repository is enabled"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Database connection issues"),":"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Verify database service is running"),(0,r.kt)("li",{parentName:"ul"},"Check connection string and credentials"),(0,r.kt)("li",{parentName:"ul"},"Ensure database user has proper permissions"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Agent registration failures"),":"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Verify hostname resolution works in both directions"),(0,r.kt)("li",{parentName:"ul"},"Check firewall settings"),(0,r.kt)("li",{parentName:"ul"},"Ensure time is synchronized across all nodes")))),(0,r.kt)("h3",{id:"how-do-i-check-ambari-server-logs"},"How do I check Ambari Server logs?"),(0,r.kt)("p",null,"Ambari Server logs are located at:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"/var/log/ambari-server/ambari-server.log\n")),(0,r.kt)("p",null,"To view the logs in real-time:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tail -f /var/log/ambari-server/ambari-server.log\n")),(0,r.kt)("h3",{id:"how-do-i-check-ambari-agent-logs"},"How do I check Ambari Agent logs?"),(0,r.kt)("p",null,"Ambari Agent logs are located at:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"/var/log/ambari-agent/ambari-agent.log\n")),(0,r.kt)("p",null,"To view the logs in real-time:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tail -f /var/log/ambari-agent/ambari-agent.log\n")),(0,r.kt)("h2",{id:"development"},"Development"),(0,r.kt)("h3",{id:"how-do-i-contribute-to-ambari"},"How do I contribute to Ambari?"),(0,r.kt)("p",null,"To contribute to Ambari:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Review the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-dev/how-to-contribute"},"How to Contribute")," guide"),(0,r.kt)("li",{parentName:"ol"},"Follow the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-dev/coding-guidelines-for-ambari"},"Coding Guidelines")),(0,r.kt)("li",{parentName:"ol"},"Submit your contribution following the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-dev/how-to-commit"},"How to Commit")," process")),(0,r.kt)("h3",{id:"how-do-i-set-up-a-development-environment"},"How do I set up a development environment?"),(0,r.kt)("p",null,"For setting up a development environment:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Follow the ",(0,r.kt)("a",{parentName:"li",href:"/docs/quick-start/environment-setup/vagrant-environment-setup"},"Vagrant Environment Setup")," or ",(0,r.kt)("a",{parentName:"li",href:"/docs/quick-start/environment-setup/docker-environment-setup"},"Docker Environment Setup")," guide"),(0,r.kt)("li",{parentName:"ol"},"Review the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-dev/development-in-docker"},"Development in Docker")," documentation")),(0,r.kt)("h3",{id:"how-do-i-create-a-custom-service-for-ambari"},"How do I create a custom service for Ambari?"),(0,r.kt)("p",null,"To create a custom service:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Review the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-design/stack-and-services/custom-services"},"Custom Services")," documentation"),(0,r.kt)("li",{parentName:"ol"},"Follow the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-design/stack-and-services/how-to-define-stacks-and-services"},"How to Define Stacks and Services")," guide"),(0,r.kt)("li",{parentName:"ol"},"See the ",(0,r.kt)("a",{parentName:"li",href:"/docs/ambari-design/stack-and-services/writing-metainfo"},"Writing Metainfo")," documentation for service definition details")))}m.isMDXComponent=!0}}]);