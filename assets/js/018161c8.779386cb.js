"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[7697],{612:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"ambari-dev/development-in-docker","title":"Development in Docker","description":"Overview","source":"@site/versioned_docs/version-3.0.0/ambari-dev/development-in-docker.md","sourceDirName":"ambari-dev","slug":"/ambari-dev/development-in-docker","permalink":"/docs/ambari-dev/development-in-docker","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-dev/development-in-docker.md","tags":[],"version":"3.0.0","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Unit Test Reports","permalink":"/docs/ambari-dev/unit-test-reports"},"next":{"title":"Developer Tools","permalink":"/docs/ambari-dev/developer-tools"}}');var o=n(74848),t=n(28453);const a={},s="Development in Docker",d={},c=[{value:"Overview",id:"overview",level:2},{value:"Source code",id:"source-code",level:3},{value:"Requirements",id:"requirements",level:2},{value:"Create Docker Image",id:"create-docker-image",level:2},{value:"Unit Test",id:"unit-test",level:2},{value:"Deploy Hadoop",id:"deploy-hadoop",level:2}];function l(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.header,{children:(0,o.jsx)(r.h1,{id:"development-in-docker",children:"Development in Docker"})}),"\n",(0,o.jsx)(r.h2,{id:"overview",children:"Overview"}),"\n",(0,o.jsx)(r.p,{children:"This page describes how to develop, build and test Ambari on Docker."}),"\n",(0,o.jsx)(r.p,{children:"In order to build Ambari, there are a quite few steps to execute and it is a bit cumbersome. You can build an environment in Docker and are good to go!"}),"\n",(0,o.jsx)(r.p,{children:"This is NOT meant for running production level Ambari in Docker (though you can run Ambari and deploy Hadoop in a single Docker container for testing purpose)"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.img,{src:n(93777).A+"",width:"1481",height:"664"})}),"\n",(0,o.jsx)(r.p,{children:"(This is not only about Jenkins slaves but think it is your laptop)"}),"\n",(0,o.jsx)(r.p,{children:"First, we will make a Docker image that has all third party libraries Ambari requires."}),"\n",(0,o.jsx)(r.p,{children:"Second, prepare your code on Docker host machine. It can be trunk or a branch, or your developing code or with a patch applied. Note that your code does not reside inside of Docker container, but on the Docker host and we link it by Docker volume (like mount)"}),"\n",(0,o.jsx)(r.p,{children:"And you are ready to go!"}),"\n",(0,o.jsx)(r.h3,{id:"source-code",children:"Source code"}),"\n",(0,o.jsx)(r.p,{children:"This code has been migrated to Ambari trunk."}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.a,{href:"https://github.com/apache/ambari/tree/trunk/dev-support/docker",children:"https://github.com/apache/ambari/tree/trunk/dev-support/docker"})}),"\n",(0,o.jsx)(r.h2,{id:"requirements",children:"Requirements"}),"\n",(0,o.jsx)(r.p,{children:"There are a few system requirements if you want to play with this document."}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:["Docker ",(0,o.jsx)(r.a,{href:"https://docs.docker.com/#installation-guides",children:"https://docs.docker.com/#installation-guides"})]}),"\n"]}),"\n",(0,o.jsx)(r.h2,{id:"create-docker-image",children:"Create Docker Image"}),"\n",(0,o.jsx)(r.p,{children:"First thing first, we have to build an Docker image for this solution. This will setup libraries including ones from yum and maven dependencies. In my environment (Centos 6.5 VM with 8GB and 4CPUs) takes 30mins. Good news is this is one time."}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"git clone https://github.com/apache/ambari.git\ncd ambari\ndocker build -t ambari/build ./dev-support/docker/docker\n"})}),"\n",(0,o.jsx)(r.p,{children:'This is going to build a image named "ambari/build" from configuration files under ./dev-support/docker/docker'}),"\n",(0,o.jsx)(r.h2,{id:"unit-test",children:"Unit Test"}),"\n",(0,o.jsx)(r.p,{children:"For example our unit test Jenkins job on trunk runs on Docker. If you want to replicate the environment, read this section."}),"\n",(0,o.jsx)(r.p,{children:"The basic"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"cd {ambari_root}\ndocker run --privileged -h node1.mydomain.com -v $(pwd):/tmp/ambari ambari/build /tmp/ambari/dev-support/docker/docker/bin/ambaribuild.py test -b\n"})}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsx)(r.li,{children:"'docker run' is the command to run a container from a image. Which image was run? It is 'ambari/build'"}),"\n",(0,o.jsx)(r.li,{children:"-h sets a host name in the container."}),"\n",(0,o.jsx)(r.li,{children:"-v is to mount your Ambari code on the host to the container's /tmp. Make sure you are at the Ambari root directory."}),"\n",(0,o.jsx)(r.li,{children:"ambaribuild.py runs some script to eventually run 'mvn test' for ambari."}),"\n",(0,o.jsx)(r.li,{children:"-b option is to rebuild the entire source tree. It runs test as is on your host if omitted."}),"\n"]}),"\n",(0,o.jsx)(r.h2,{id:"deploy-hadoop",children:"Deploy Hadoop"}),"\n",(0,o.jsx)(r.p,{children:"You want to run Ambari and Hadoop to test your improvements that you have just coded on your host. Here is the way!"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"cd {ambari_root}\ndocker run --privileged -t -p 80:80 -p 5005:5005 -p 8080:8080 -h node1.mydomain.com --name ambari1 -v $(pwd):/tmp/ambari ambari/build /tmp/ambari-build-docker/bin/ambaribuild.py deploy -b\n  \n# once your are done\ndocker kill ambari1 && docker rm ambari1\n"})}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsx)(r.li,{children:"--privileged is important as ambari-server accessing to /proc/??/exe"}),"\n",(0,o.jsx)(r.li,{children:"-p 80:80 to ensure you can access to web UI from your host."}),"\n",(0,o.jsx)(r.li,{children:"-p 5005 is java debug port"}),"\n",(0,o.jsx)(r.li,{children:"'deploy' to build, install rpms and start ambari-server and ambari-agent and deploy Hadoop through blueprint."}),"\n"]}),"\n",(0,o.jsxs)(r.p,{children:["You can take a look at ",(0,o.jsx)(r.a,{href:"https://github.com/apache/ambari/tree/trunk/dev-support/docker/docker/blueprints",children:"https://github.com/apache/ambari/tree/trunk/dev-support/docker/docker/blueprints"})," to see what is actually deployed."]}),"\n",(0,o.jsx)(r.p,{children:"There are a few other parameters you can play."}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-bash",children:"cd {ambari_root}\ndocker run --privileged -t -p 80:80 -p 5005:5005 -p 8080:8080 -h node1.mydomain.com --name ambari1 -v ${AMBARI_SRC:-$(pwd)}:/tmp/ambari ambari/build /tmp/ambari-build-docker/bin/ambaribuild.py [test|server|agent|deploy] [-b] [-s [HDP|BIGTOP|PHD]]\n"})}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsx)(r.li,{children:"test: mvn test"}),"\n",(0,o.jsx)(r.li,{children:"server: install and run ambari-server"}),"\n",(0,o.jsx)(r.li,{children:"agent: install and run ambari-server and ambari-agent"}),"\n",(0,o.jsx)(r.li,{children:"deploy: install and run ambari-server and ambari-agent, and deploy a hadoop"}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>s});var i=n(96540);const o={},t=i.createContext(o);function a(e){const r=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(t.Provider,{value:r},e.children)}},93777:(e,r,n)=>{n.d(r,{A:()=>i});const i=n.p+"assets/images/with-without-docker-83c24ed867bae888a7b3f638b665213f.png"}}]);