"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[5968],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>k});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},m=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=c(n),k=r,v=d["".concat(l,".").concat(k)]||d[k]||p[k]||i;return n?a.createElement(v,s(s({ref:t},m),{},{components:n})):a.createElement(v,s({ref:t},m))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},10947:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=n(87462),r=(n(67294),n(3905));const i={},s="Overview",o={unversionedId:"ambari-design/stack-and-services/overview",id:"version-2.7.6/ambari-design/stack-and-services/overview",title:"Overview",description:"Background",source:"@site/versioned_docs/version-2.7.6/ambari-design/stack-and-services/overview.mdx",sourceDirName:"ambari-design/stack-and-services",slug:"/ambari-design/stack-and-services/overview",permalink:"/docs/2.7.6/ambari-design/stack-and-services/overview",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.6/ambari-design/stack-and-services/overview.mdx",tags:[],version:"2.7.6",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Stacks and Services",permalink:"/docs/2.7.6/ambari-design/stack-and-services/"},next:{title:"Custom Services",permalink:"/docs/2.7.6/ambari-design/stack-and-services/custom-services"}},l={},c=[{value:"Background",id:"background",level:2},{value:"Structure",id:"structure",level:2},{value:"Defining a Service and Components",id:"defining-a-service-and-components",level:2},{value:"Using Stack Inheritance",id:"using-stack-inheritance",level:4},{value:"Example: Implementing a Custom Service",id:"example-implementing-a-custom-service",level:2},{value:"Create and Add the Service",id:"create-and-add-the-service",level:2},{value:"Install the Service (via Ambari Web &quot;Add Services&quot;)",id:"install-the-service-via-ambari-web-add-services",level:2},{value:"Example: Implementing a Custom Client-only Service",id:"example-implementing-a-custom-client-only-service",level:4},{value:"Create and Add the Service",id:"create-and-add-the-service-1",level:2},{value:"Install the Service (via the Ambari REST API)",id:"install-the-service-via-the-ambari-rest-api",level:2},{value:"Install the Service (via Ambari Web &quot;Add Services&quot;)",id:"install-the-service-via-ambari-web-add-services-1",level:2},{value:"Example: Implementing a Custom Client-only Service (with Configs)",id:"example-implementing-a-custom-client-only-service-with-configs",level:4},{value:"Create and Add the Service to the Stack",id:"create-and-add-the-service-to-the-stack",level:2}],m={toc:c};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"overview"},"Overview"),(0,r.kt)("h2",{id:"background"},"Background"),(0,r.kt)("p",null,"The Stack definitions can be found in the source tree at ",(0,r.kt)("inlineCode",{parentName:"p"},'<a href="https://github.com/apache/ambari/tree/trunk/ambari-server/src/main/resources/stacks">/ambari-server/src/main/resources/stacks</a>'),". After you install the Ambari Server, the Stack definitions can be found at ",(0,r.kt)("inlineCode",{parentName:"p"},"/var/lib/ambari-server/resources/stacks")),(0,r.kt)("h2",{id:"structure"},"Structure"),(0,r.kt)("p",null,"The structure of a Stack definition is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"|_ stacks\n   |_\n      |_\n         metainfo.xml\n         |_ hooks\n         |_ repos\n            repoinfo.xml\n         |_ services\n            |_\n               metainfo.xml\n               metrics.json\n               |_ configuration\n                  {configuration files}\n               |_ package\n                  {files, scripts, templates}\n")),(0,r.kt)("h2",{id:"defining-a-service-and-components"},"Defining a Service and Components"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"metainfo.xml")," file in a Service describes the service, the components of the service and the management scripts to use for executing commands. A component of a service can be either a ",(0,r.kt)("strong",{parentName:"p"},"MASTER"),", ",(0,r.kt)("strong",{parentName:"p"},"SLAVE")," or ",(0,r.kt)("strong",{parentName:"p"},"CLIENT")," category. The"),(0,r.kt)("p",null,"For each Component you specify the ","<","commandScript",">"," to use when executing commands. There is a defined set of default commands the component must support."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Component Category"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Lifestyle Commands"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MASTER"),(0,r.kt)("td",{parentName:"tr",align:null},"install, start, stop, configure, status")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SLAVE"),(0,r.kt)("td",{parentName:"tr",align:null},"install, start, stop, configure, status")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CLIENT"),(0,r.kt)("td",{parentName:"tr",align:null},"install, configure, status")))),(0,r.kt)("p",null,"Ambari supports different commands scripts written in ",(0,r.kt)("strong",{parentName:"p"},"PYTHON"),". The type is used to know how to execute the command scripts. You can also create ",(0,r.kt)("strong",{parentName:"p"},"custom commands")," if there are other commands beyond the default lifecycle commands your component needs to support."),(0,r.kt)("p",null,"For example, in the YARN Service describes the ResourceManager component as follows in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/metainfo.xml"},(0,r.kt)("inlineCode",{parentName:"a"},"metainfo.xml")),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<component>\n  <name>RESOURCEMANAGER</name>\n  <category>MASTER</category>\n  <commandScript>\n    <script>scripts/resourcemanager.py<\/script>\n    <scriptType>PYTHON</scriptType>\n    <timeout>600</timeout>\n  </commandScript>\n  <customCommands>\n    <customCommand>\n      <name>DECOMMISSION</name>\n      <commandScript>\n        <script>scripts/resourcemanager.py<\/script>\n        <scriptType>PYTHON</scriptType>\n        <timeout>600</timeout>\n      </commandScript>\n    </customCommand>\n  </customCommands>\n</component>\n")),(0,r.kt)("p",null,"The ResourceManager is a MASTER component, and the command script is ",(0,r.kt)("inlineCode",{parentName:"p"},'<a href="https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/package/scripts/resourcemanager.py">scripts/resourcemanager.py</a>'),", which can be found in the ",(0,r.kt)("inlineCode",{parentName:"p"},"services/YARN/package")," directory. That command script is ",(0,r.kt)("strong",{parentName:"p"},"PYTHON")," and that script implements the default lifecycle commands as python methods. This is the ",(0,r.kt)("strong",{parentName:"p"},"install")," method for the default ",(0,r.kt)("strong",{parentName:"p"},"INSTALL")," command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class Resourcemanager(Script):\n  def install(self, env):\n    self.install_packages(env)\n    self.configure(env)\n")),(0,r.kt)("p",null,"You can also see a custom command is defined ",(0,r.kt)("strong",{parentName:"p"},"DECOMMISSION"),", which means there is also a ",(0,r.kt)("strong",{parentName:"p"},"decommission")," method in that python command script:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def decommission(self, env):\n    import params\n\n    ...\n\n    Execute(yarn_refresh_cmd,\n            user=yarn_user\n    )\n    pass\n")),(0,r.kt)("h4",{id:"using-stack-inheritance"},"Using Stack Inheritance"),(0,r.kt)("p",null,"Stacks can ",(0,r.kt)("em",{parentName:"p"},"extend")," other Stacks in order to share command scripts and configurations. This reduces duplication of code across Stacks with the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"define repositories for the child Stack"),(0,r.kt)("li",{parentName:"ul"},"add new Services in the child Stack (not in the parent Stack)"),(0,r.kt)("li",{parentName:"ul"},"override command scripts of the parent Services"),(0,r.kt)("li",{parentName:"ul"},"override configurations of the parent Services")),(0,r.kt)("p",null,"For example, the ",(0,r.kt)("strong",{parentName:"p"},"HDP 2.1 Stack ",(0,r.kt)("em",{parentName:"strong"},"extends")," HDP 2.0.6 Stack")," so only the changes applicable to ",(0,r.kt)("strong",{parentName:"p"},"HDP 2.1 Stack")," are present in that Stack definition. This extension is defined in the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.1/metainfo.xml"},"metainfo.xml")," for HDP 2.1 Stack:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<metainfo>\n  <versions>\n    <active>true</active>\n  </versions>\n  <extends>2.0.6</extends>\n</metainfo>\n")),(0,r.kt)("h2",{id:"example-implementing-a-custom-service"},"Example: Implementing a Custom Service"),(0,r.kt)("p",null,'In this example, we will create a custom service called "SAMPLESRV", add it to an existing Stack definition. This service includes MASTER, SLAVE and CLIENT components.'),(0,r.kt)("h2",{id:"create-and-add-the-service"},"Create and Add the Service"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"On the Ambari Server, browse to the ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services")," directory. In this case, we will browse to the HDP 2.0 Stack definition.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"cd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Create a directory named ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/<strong>SAMPLESRV</strong>")," that will contain the service definition for ",(0,r.kt)("strong",{parentName:"li"},"SAMPLESRV"),".")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Browse to the newly created ",(0,r.kt)("inlineCode",{parentName:"li"},"SAMPLESRV")," directory, create a ",(0,r.kt)("inlineCode",{parentName:"li"},"metainfo.xml")," file that describes the new service. For example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0"?>\n<metainfo>\n    <schemaVersion>2.0</schemaVersion>\n    <services>\n        <service>\n            <name>SAMPLESRV</name>\n            <displayName>New Sample Service</displayName>\n            <comment>A New Sample Service</comment>\n            <version>1.0.0</version>\n            <components>\n                <component>\n                    <name>SAMPLESRV_MASTER</name>\n                    <displayName>Sample Srv Master</displayName>\n                    <category>MASTER</category>\n                    <cardinality>1</cardinality>\n                    <commandScript>\n                        <script>scripts/master.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n                <component>\n                    <name>SAMPLESRV_SLAVE</name>\n                    <displayName>Sample Srv Slave</displayName>\n                    <category>SLAVE</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/slave.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n                <component>\n                    <name>SAMPLESRV_CLIENT</name>\n                    <displayName>Sample Srv Client</displayName>\n                    <category>CLIENT</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/sample_client.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n            </components>\n            <osSpecifics>\n                <osSpecific>\n                    <osFamily>any</osFamily>  \x3c!-- note: use osType rather than osFamily for Ambari 1.5.0 and 1.5.1 --\x3e\n                </osSpecific>\n            </osSpecifics>\n        </service>\n    </services>\n</metainfo>\n')),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},'In the above, my service name is " ',(0,r.kt)("strong",{parentName:"li"},"SAMPLESRV"),'", and it contains:')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"one ",(0,r.kt)("strong",{parentName:"li"},"MASTER"),' component " ',(0,r.kt)("strong",{parentName:"li"},"SAMPLESRV_MASTER"),'"'),(0,r.kt)("li",{parentName:"ul"},"one ",(0,r.kt)("strong",{parentName:"li"},"SLAVE"),' component " ',(0,r.kt)("strong",{parentName:"li"},"SAMPLESRV_SLAVE"),'"'),(0,r.kt)("li",{parentName:"ul"},"one ",(0,r.kt)("strong",{parentName:"li"},"CLIENT"),' component " ',(0,r.kt)("strong",{parentName:"li"},"SAMPLESRV_CLIENT"),'"')),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Next, let's create that command script. Create a directory for the command script ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/servi")," ",(0,r.kt)("inlineCode",{parentName:"li"},"ces/")," ",(0,r.kt)("inlineCode",{parentName:"li"},"SAMPLESRV")," ",(0,r.kt)("inlineCode",{parentName:"li"},"/")," ",(0,r.kt)("strong",{parentName:"li"}," ",(0,r.kt)("inlineCode",{parentName:"strong"},"package/scripts"))," that we designated in the service metainfo.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV/package/scripts\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV/package/scripts\n")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Browse to the scripts directory and create the ",(0,r.kt)("inlineCode",{parentName:"li"},".py")," command script files. For example ",(0,r.kt)("inlineCode",{parentName:"li"},"master.py")," file:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import sys\nfrom resource_management import *\nclass Master(Script):\n  def install(self, env):\n    print 'Install the Sample Srv Master';\n  def stop(self, env):\n    print 'Stop the Sample Srv Master';\n  def start(self, env):\n    print 'Start the Sample Srv Master';\n\n  def status(self, env):\n    print 'Status of the Sample Srv Master';\n  def configure(self, env):\n    print 'Configure the Sample Srv Master';\nif __name__ == \"__main__\":\n  Master().execute()\n")),(0,r.kt)("p",null,"For example ",(0,r.kt)("inlineCode",{parentName:"p"},"slave")," ",(0,r.kt)("inlineCode",{parentName:"p"},".py")," file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import sys\nfrom resource_management import *\nclass Slave(Script):\n  def install(self, env):\n    print 'Install the Sample Srv Slave';\n  def stop(self, env):\n    print 'Stop the Sample Srv Slave';\n  def start(self, env):\n    print 'Start the Sample Srv Slave';\n  def status(self, env):\n    print 'Status of the Sample Srv Slave';\n  def configure(self, env):\n    print 'Configure the Sample Srv Slave';\nif __name__ == \"__main__\":\n  Slave().execute()\n")),(0,r.kt)("p",null,"For example ",(0,r.kt)("inlineCode",{parentName:"p"},"sample_client")," ",(0,r.kt)("inlineCode",{parentName:"p"},".py")," file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import sys\nfrom resource_management import *\nclass SampleClient(Script):\n  def install(self, env):\n    print 'Install the Sample Srv Client';\n  def configure(self, env):\n    print 'Configure the Sample Srv Client';\nif __name__ == \"__main__\":\n  SampleClient().execute()\n")),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"Now, restart Ambari Server for this new service definition to be distributed to all the Agents in the cluster.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server restart\n")),(0,r.kt)("h2",{id:"install-the-service-via-ambari-web-add-services"},'Install the Service (via Ambari Web "Add Services")'),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The ability to add custom services via Ambari Web is new as of Ambari 1.7.0.")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"In Ambari Web, browse to Services and click the ",(0,r.kt)("strong",{parentName:"p"},"Actions")," button in the Service navigation area on the left.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'The "Add Services" wizard launches. You will see an option to include "My Sample Service" (which is the ',(0,r.kt)("inlineCode",{parentName:"p"},"<displayname></displayname>")," of the service as defined in the service ",(0,r.kt)("inlineCode",{parentName:"p"},"metainfo.xml")," file).")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Select "My Sample Service" and click Next.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Assign the "Sample Srv Master" and click Next.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Select the hosts to install the "Sample Srv Client" and click Next.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Once complete, the "My Sample Service" will be available Service navigation area.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'If you want to add the "Sample Srv Client" to any hosts, you can browse to Hosts and navigate to a specific host and click "+ Add".'))),(0,r.kt)("h4",{id:"example-implementing-a-custom-client-only-service"},"Example: Implementing a Custom Client-only Service"),(0,r.kt)("p",null,'In this example, we will create a custom service called "TESTSRV", add it to an existing Stack definition and use the Ambari APIs to install/configure the service. This service is a CLIENT so it has two commands: install and configure.'),(0,r.kt)("h2",{id:"create-and-add-the-service-1"},"Create and Add the Service"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"On the Ambari Server, browse to the ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services")," directory. In this case, we will browse to the HDP 2.0 Stack definition.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"cd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Create a directory named ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/<strong>TESTSRV</strong>")," that will contain the service definition for ",(0,r.kt)("strong",{parentName:"li"},"TESTSRV"),".")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Browse to the newly created ",(0,r.kt)("inlineCode",{parentName:"li"},"TESTSRV")," directory, create a ",(0,r.kt)("inlineCode",{parentName:"li"},"metainfo.xml")," file that describes the new service. For example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0"?>\n<metainfo>\n    <schemaVersion>2.0</schemaVersion>\n    <services>\n        <service>\n            <name>TESTSRV</name>\n            <displayName>New Test Service</displayName>\n            <comment>A New Test Service</comment>\n            <version>0.1.0</version>\n            <components>\n                <component>\n                    <name>TEST_CLIENT</name>\n                    <displayName>New Test Client</displayName>\n                    <category>CLIENT</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/test_client.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                    <customCommands>\n                      <customCommand>\n                        <name>SOMETHINGCUSTOM</name>\n                        <commandScript>\n                          <script>scripts/test_client.py<\/script>\n                          <scriptType>PYTHON</scriptType>\n                          <timeout>600</timeout>\n                        </commandScript>\n                      </customCommand>\n                    </customCommands>\n                </component>\n            </components>\n            <osSpecifics>\n                <osSpecific>\n                    <osFamily>any</osFamily>  \x3c!-- note: use osType rather than osFamily for Ambari 1.5.0 and 1.5.1 --\x3e\n                </osSpecific>\n            </osSpecifics>\n        </service>\n    </services>\n</metainfo>\n')),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'In the above, my service name is " ',(0,r.kt)("strong",{parentName:"p"},"TESTSRV"),'", and it contains one component " ',(0,r.kt)("strong",{parentName:"p"},"TEST_CLIENT"),'" that is of component category " ',(0,r.kt)("strong",{parentName:"p"},"CLIENT"),'". That client is managed via the command script ',(0,r.kt)("inlineCode",{parentName:"p"},"scripts/test_client.py"),". Next, let's create that command script.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create a directory for the command script ",(0,r.kt)("inlineCode",{parentName:"p"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/servi")," ",(0,r.kt)("inlineCode",{parentName:"p"},"ces/")," ",(0,r.kt)("inlineCode",{parentName:"p"},"TESTSRV")," ",(0,r.kt)("inlineCode",{parentName:"p"},"/")," ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"package/scripts"))," that we designated in the service metainfo."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV/package/scripts\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV/package/scripts\n")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Browse to the scripts directory and create the ",(0,r.kt)("inlineCode",{parentName:"li"},"test_client.py")," file. For example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import sys\nfrom resource_management import *\n\nclass TestClient(Script):\n  def install(self, env):\n    print 'Install the client';\n  def configure(self, env):\n    print 'Configure the client';\n  def somethingcustom(self, env):\n    print 'Something custom';\n\nif __name__ == \"__main__\":\n  TestClient().execute()\n")),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"Now, restart Ambari Server for this new service definition to be distributed to all the Agents in the cluster.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server restart\n")),(0,r.kt)("h2",{id:"install-the-service-via-the-ambari-rest-api"},"Install the Service (via the Ambari REST API)"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Add the Service to the Cluster.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'POST\n/api/v1/clusters/MyCluster/services\n\n{\n"ServiceInfo": {\n  "service_name":"TESTSRV"\n  }\n}\n')),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Add the Components to the Service. In this case, add TEST_CLIENT to TESTSRV.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"POST\n/api/v1/clusters/MyCluster/services/TESTSRV/components/TEST_CLIENT\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Install the component on all target hosts. For example, to install on ",(0,r.kt)("inlineCode",{parentName:"li"},"c6402.ambari.apache.org")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"c6403.ambari.apache.org"),", first create the host_component resource on the hosts using POST.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"POST\n/api/v1/clusters/MyCluster/hosts/c6402.ambari.apache.org/host_components/TEST_CLIENT\n\nPOST\n/api/v1/clusters/MyCluster/hosts/c6403.ambari.apache.org/host_components/TEST_CLIENT\n")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Now have Ambari install the components on all hosts. In this single command, you are instructing Ambari to install all components related to the service. This call the ",(0,r.kt)("inlineCode",{parentName:"li"},"install()")," method in the command script on each host.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'PUT\n/api/v1/clusters/MyCluster/services/TESTSRV\n\n{\n  "RequestInfo": {\n    "context": "Install Test Srv Client"\n  },\n  "Body": {\n    "ServiceInfo": {\n      "state": "INSTALLED"\n    }\n  }\n}\n')),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Alternatively, instead of installing all components at the same time, you can explicitly install each host component. In this example, we will explicitly install the TEST_CLIENT on ",(0,r.kt)("inlineCode",{parentName:"li"},"c6402.ambari.apache.org"),":")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'PUT\n/api/v1/clusters/MyCluster/hosts/c6402.ambari.apache.org/host_components/TEST_CLIENT\n\n{\n  "RequestInfo": {\n    "context":"Install Test Srv Client"\n  },\n  "Body": {\n    "HostRoles": {\n      "state":"INSTALLED"\n    }\n  }\n}\n')),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Use the following to configure the client on the host. This will end up calling the ",(0,r.kt)("inlineCode",{parentName:"li"},"configure()")," method in the command script.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'POST\n/api/v1/clusters/MyCluster/requests\n\n{\n  "RequestInfo" : {\n    "command" : "CONFIGURE",\n    "context" : "Config Test Srv Client"\n  },\n  "Requests/resource_filters": [{\n    "service_name" : "TESTSRV",\n    "component_name" : "TEST_CLIENT",\n    "hosts" : "c6403.ambari.apache.org"\n  }]\n}\n')),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"If you want to see which hosts the component is installed.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"GET\n/api/v1/clusters/MyCluster/components/TEST_CLIENT\n")),(0,r.kt)("h2",{id:"install-the-service-via-ambari-web-add-services-1"},'Install the Service (via Ambari Web "Add Services")'),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The ability to add custom services via Ambari Web is new as of Ambari 1.7.0.")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"In Ambari Web, browse to Services and click the ",(0,r.kt)("strong",{parentName:"p"},"Actions")," button in the Service navigation area on the left.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'The "Add Services" wizard launches. You will see an option to include "My Test Service" (which is the ',(0,r.kt)("inlineCode",{parentName:"p"},"<displayname></displayname>")," of the service as defined in the service ",(0,r.kt)("inlineCode",{parentName:"p"},"metainfo.xml")," file).")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Select "My Test Service" and click Next.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Select the hosts to install the "New Test Client" and click Next.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Once complete, the "My Test Service" will be available Service navigation area.')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'If you want to add the "New Test Client" to any hosts, you can browse to Hosts and navigate to a specific host and click "+ Add".'))),(0,r.kt)("h4",{id:"example-implementing-a-custom-client-only-service-with-configs"},"Example: Implementing a Custom Client-only Service (with Configs)"),(0,r.kt)("p",null,'In this example, we will create a custom service called "TESTCONFIGSRV" and add it to an existing Stack definition. This service is a CLIENT so it has two commands: install and configure. And the service also includes a configuration type "test-config".'),(0,r.kt)("h2",{id:"create-and-add-the-service-to-the-stack"},"Create and Add the Service to the Stack"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"On the Ambari Server, browse to the ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services")," directory. In this case, we will browse to the HDP 2.0 Stack definition.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"cd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Create a directory named ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/<strong>TESTCONFIGSRV</strong>")," that will contain the service definition for TESTCONFIGSRV.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Browse to the newly created ",(0,r.kt)("inlineCode",{parentName:"li"},"TESTCONFIGSRV")," directory, create a ",(0,r.kt)("inlineCode",{parentName:"li"},"metainfo.xml")," file that describes the new service. For example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"2.0\n\n            TESTCONFIGSRV\n            New Test Config Service\n           \xa0A New Test Config Service\n            0.1.0\n\n                    TESTCONFIG_CLIENT\n                    New Test Config Client\n                    CLIENT\n                    1+\n\n                        scripts/test_client.py\n                        PYTHON\n                        600\n\n                    any\n")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'In the above, my service name is " ',(0,r.kt)("strong",{parentName:"p"},"TESTCONFIGSRV"),'", and it contains one component " ',(0,r.kt)("strong",{parentName:"p"},"TESTCONFIG_CLIENT"),'" that is of component category " ',(0,r.kt)("strong",{parentName:"p"},"CLIENT"),'". That client is managed via the command script ',(0,r.kt)("inlineCode",{parentName:"p"},"scripts/test_client.py"),". Next, let's create that command script.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create a directory for the command script ",(0,r.kt)("inlineCode",{parentName:"p"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/servi")," ",(0,r.kt)("inlineCode",{parentName:"p"},"ces/")," ",(0,r.kt)("inlineCode",{parentName:"p"},"TESTCONFIGSRV")," ",(0,r.kt)("inlineCode",{parentName:"p"},"/")," ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"package/scripts"))," that we designated in the service metainfo ",(0,r.kt)("inlineCode",{parentName:"p"},"<commandscript></commandscript>"),"."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/package/scripts\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/package/scripts\n")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Browse to the scripts directory and create the ",(0,r.kt)("inlineCode",{parentName:"li"},"test_client.py")," file. For example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import sys\nfrom resource_management import *\n\nclass TestClient(Script):\n  def install(self, env):\n    print 'Install the config client';\n  def configure(self, env):\n    print 'Configure the config client';\n\nif __name__ == \"__main__\":\n  TestClient().execute()\n")),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"Now let's define a config type for this service. Create a directory for the configuration dictionary file ",(0,r.kt)("inlineCode",{parentName:"li"},"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/servi")," ",(0,r.kt)("inlineCode",{parentName:"li"},"ces/")," ",(0,r.kt)("inlineCode",{parentName:"li"},"TESTCONFIGSRV")," ",(0,r.kt)("inlineCode",{parentName:"li"},"/")," ",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"configuration")),".")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/configuration\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/configuration\n")),(0,r.kt)("ol",{start:8},(0,r.kt)("li",{parentName:"ol"},"Browse to the configuration directory and create the ",(0,r.kt)("inlineCode",{parentName:"li"},"test-config.xml")," file. For example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"some.test.property\n    this.is.the.default.value\n    This is a kool description.\n\n")),(0,r.kt)("ol",{start:9},(0,r.kt)("li",{parentName:"ol"},"Now, restart Ambari Server for this new service definition to be distributed to all the Agents in the cluster.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server restart\n")))}p.isMDXComponent=!0}}]);