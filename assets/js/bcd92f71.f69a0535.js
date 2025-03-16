"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8727],{22143:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"ambari-design/stack-and-services/defining-a-custom-stack-and-services","title":"Defining a Custom Stack and Services","description":"Background","source":"@site/versioned_docs/version-2.7.6/ambari-design/stack-and-services/defining-a-custom-stack-and-services.md","sourceDirName":"ambari-design/stack-and-services","slug":"/ambari-design/stack-and-services/defining-a-custom-stack-and-services","permalink":"/docs/2.7.6/ambari-design/stack-and-services/defining-a-custom-stack-and-services","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.6/ambari-design/stack-and-services/defining-a-custom-stack-and-services.md","tags":[],"version":"2.7.6","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Custom Services","permalink":"/docs/2.7.6/ambari-design/stack-and-services/custom-services"},"next":{"title":"Extensions","permalink":"/docs/2.7.6/ambari-design/stack-and-services/extensions"}}');var r=s(74848),t=s(28453);const a={},c="Defining a Custom Stack and Services",o={},l=[{value:"Background",id:"background",level:2},{value:"Stack Properties",id:"stack-properties",level:2},{value:"Structure",id:"structure",level:2},{value:"Defining a Service and Components",id:"defining-a-service-and-components",level:2},{value:"Using Stack Inheritance",id:"using-stack-inheritance",level:2},{value:"Example: Implementing a Custom Service",id:"example-implementing-a-custom-service",level:2},{value:"Create and Add the Service",id:"create-and-add-the-service",level:3},{value:"Install the Service (via Ambari Web &quot;Add Services&quot;)",id:"install-the-service-via-ambari-web-add-services",level:3},{value:"Example: Implementing a Custom Client-only Service",id:"example-implementing-a-custom-client-only-service",level:2},{value:"Create and Add the Service",id:"create-and-add-the-service-1",level:3},{value:"Adding Repository details in repoinfo.xml",id:"adding-repository-details-in-repoinfoxml",level:3},{value:"Install the Service (via the Ambari REST API)",id:"install-the-service-via-the-ambari-rest-api",level:3},{value:"Install the Service (via Ambari Web &quot;Add Services&quot;)",id:"install-the-service-via-ambari-web-add-services-1",level:3},{value:"Example: Implementing a Custom Client-only Service (with Configs)",id:"example-implementing-a-custom-client-only-service-with-configs",level:2},{value:"Create and Add the Service to the Stack",id:"create-and-add-the-service-to-the-stack",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"defining-a-custom-stack-and-services",children:"Defining a Custom Stack and Services"})}),"\n",(0,r.jsx)(n.h2,{id:"background",children:"Background"}),"\n",(0,r.jsxs)(n.p,{children:["The Stack definitions can be found in the source tree at ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/tree/trunk/ambari-server/src/main/resources/stacks",children:"/ambari-server/src/main/resources/stacks"}),". After you install the Ambari Server, the Stack definitions can be found at ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks"})]}),"\n",(0,r.jsx)(n.h2,{id:"stack-properties",children:"Stack Properties"}),"\n",(0,r.jsxs)(n.p,{children:["The stack must contain or inherit a properties directory which contains two files: ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_features.json",children:"stack_features.json"})," and ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_tools.json",children:"stack_tools.json"}),". The properties directory must be at the root stack version level and must not be included in the other stack versions. This ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/tree/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties",children:"directory"})," is new in Ambari 2.4."]}),"\n",(0,r.jsxs)(n.p,{children:["The stack_features.json contains a list of features that are included in Ambari and allows the stack to specify which versions of the stack include those features. The list of features are determined by the particular Ambari release. The reference list for a particular Ambari version should be found in the ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/blob/branch-2.4/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_features.json",children:"HDP/2.0.6/properties/stack_features.json"})," in the branch for that Ambari release. Each feature has a name and description and the stack can provide the minimum and maximum version where that feature is supported."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n\n"stack_features": [\n\n{\n\n"name": "snappy",\n\n"description": "Snappy compressor/decompressor support",\n\n"min_version": "2.0.0.0",\n\n"max_version": "2.2.0.0"\n\n},\n\n...\n\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"The stack_tools.json includes the name and location where the stack_selector and conf_selector tools are installed."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n\n"stack_selector": ["hdp-select", "/usr/bin/hdp-select", "hdp-select"],\n\n"conf_selector": ["conf-select", "/usr/bin/conf-select", "conf-select"]\n\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["For more information see the ",(0,r.jsx)(n.a,{href:"/docs/2.7.6/ambari-design/stack-and-services/stack-properties",children:"Stack Properties"})," wiki page."]}),"\n",(0,r.jsx)(n.h2,{id:"structure",children:"Structure"}),"\n",(0,r.jsx)(n.p,{children:"The structure of a Stack definition is as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"|_ stacks\n   |_\n      |_\n         metainfo.xml\n         |_ hooks\n         |_ repos\n            repoinfo.xml\n         |_ services\n            |_\n               metainfo.xml\n               metrics.json\n               |_ configuration\n                  {configuration files}\n               |_ package\n                  {files, scripts, templates}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"defining-a-service-and-components",children:"Defining a Service and Components"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"metainfo.xml"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"metainfo.xml"})," file in a Service describes the service, the components of the service and the management scripts to use for executing commands. A component of a service can be either a ",(0,r.jsx)(n.strong,{children:"MASTER"}),", ",(0,r.jsx)(n.strong,{children:"SLAVE"})," or ",(0,r.jsx)(n.strong,{children:"CLIENT"})," category. The"]}),"\n",(0,r.jsxs)(n.p,{children:["For each Component you specify the ",(0,r.jsx)(n.code,{children:"<commandScript>"})," to use when executing commands. There is a defined set of default commands the component must support."]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Component Category"}),(0,r.jsx)(n.th,{children:"Default Lifestyle Commands"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"MASTER"}),(0,r.jsx)(n.td,{children:"install, start, stop, configure, status"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"SLAVE"}),(0,r.jsx)(n.td,{children:"install, start, stop, configure, status"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"CLIENT"}),(0,r.jsx)(n.td,{children:"install, configure, status"})]})]})]}),"\n",(0,r.jsxs)(n.p,{children:["Ambari supports different commands scripts written in ",(0,r.jsx)(n.strong,{children:"PYTHON"}),". The type is used to know how to execute the command scripts. You can also create ",(0,r.jsx)(n.strong,{children:"custom commands"})," if there are other commands beyond the default lifecycle commands your component needs to support."]}),"\n",(0,r.jsxs)(n.p,{children:["For example, in the YARN Service describes the ResourceManager component as follows in ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/metainfo.xml",children:(0,r.jsx)(n.code,{children:"metainfo.xml"})}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:"\n<component>\n  <name>RESOURCEMANAGER</name>\n  <category>MASTER</category>\n  <commandScript>\n    <script>scripts/resourcemanager.py<\/script>\n    <scriptType>PYTHON</scriptType>\n    <timeout>600</timeout>\n  </commandScript>\n  <customCommands>\n    <customCommand>\n      <name>DECOMMISSION</name>\n      <commandScript>\n        <script>scripts/resourcemanager.py<\/script>\n        <scriptType>PYTHON</scriptType>\n        <timeout>600</timeout>\n      </commandScript>\n    </customCommand>\n  </customCommands>\n</component>\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The ResourceManager is a MASTER component, and the command script is ",(0,r.jsx)(n.code,{children:'<a href="https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/package/scripts/resourcemanager.py">scripts/resourcemanager.py</a>'}),", which can be found in the ",(0,r.jsx)(n.code,{children:"services/YARN/package"})," directory. That command script is ",(0,r.jsx)(n.strong,{children:"PYTHON"})," and that script implements the default lifecycle commands as python methods. This is the ",(0,r.jsx)(n.strong,{children:"install"})," method for the default ",(0,r.jsx)(n.strong,{children:"INSTALL"})," command:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"class Resourcemanager(Script):\n  def install(self, env):\n    self.install_packages(env)\n    self.configure(env)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["You can also see a custom command is defined ",(0,r.jsx)(n.strong,{children:"DECOMMISSION"}),", which means there is also a ",(0,r.jsx)(n.strong,{children:"decommission"})," method in that python command script:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"def decommission(self, env):\n    import params\n\n    ...\n\n    Execute(yarn_refresh_cmd,\n            user=yarn_user\n    )\n    pass\n"})}),"\n",(0,r.jsx)(n.h2,{id:"using-stack-inheritance",children:"Using Stack Inheritance"}),"\n",(0,r.jsxs)(n.p,{children:["Stacks can ",(0,r.jsx)(n.em,{children:"extend"})," other Stacks in order to share command scripts and configurations. This reduces duplication of code across Stacks with the following:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"define repositories for the child Stack"}),"\n",(0,r.jsx)(n.li,{children:"add new Services in the child Stack (not in the parent Stack)"}),"\n",(0,r.jsx)(n.li,{children:"override command scripts of the parent Services"}),"\n",(0,r.jsx)(n.li,{children:"override configurations of the parent Services"}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["For example, the ",(0,r.jsxs)(n.strong,{children:["HDP 2.1 Stack ",(0,r.jsx)(n.em,{children:"extends"})," HDP 2.0.6 Stack"]})," so only the changes applicable to ",(0,r.jsx)(n.strong,{children:"HDP 2.1 Stack"})," are present in that Stack definition. This extension is defined in the ",(0,r.jsx)(n.a,{href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.1/metainfo.xml",children:"metainfo.xml"})," for HDP 2.1 Stack:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:"<metainfo>\n  <versions>\n    <active>true</active>\n  </versions>\n  <extends>2.0.6</extends>\n</metainfo>\n"})}),"\n",(0,r.jsx)(n.h2,{id:"example-implementing-a-custom-service",children:"Example: Implementing a Custom Service"}),"\n",(0,r.jsx)(n.p,{children:'In this example, we will create a custom service called "SAMPLESRV", add it to an existing Stack definition. This service includes MASTER, SLAVE and CLIENT components.'}),"\n",(0,r.jsx)(n.h3,{id:"create-and-add-the-service",children:"Create and Add the Service"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["On the Ambari Server, browse to the ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services"})," directory. In this case, we will browse to the HDP 2.0 Stack definition."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:["Create a directory named ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/<strong>SAMPLESRV</strong>"})," that will contain the service definition for ",(0,r.jsx)(n.strong,{children:"SAMPLESRV"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the newly created ",(0,r.jsx)(n.code,{children:"SAMPLESRV"})," directory, create a ",(0,r.jsx)(n.code,{children:"metainfo.xml"})," file that describes the new service. For example:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:'<?xml version="1.0"?>\n<metainfo>\n    <schemaVersion>2.0</schemaVersion>\n    <services>\n        <service>\n            <name>SAMPLESRV</name>\n            <displayName>New Sample Service</displayName>\n            <comment>A New Sample Service</comment>\n            <version>1.0.0</version>\n            <components>\n                <component>\n                    <name>SAMPLESRV_MASTER</name>\n                    <displayName>Sample Srv Master</displayName>\n                    <category>MASTER</category>\n                    <cardinality>1</cardinality>\n                    <commandScript>\n                        <script>scripts/master.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n                <component>\n                    <name>SAMPLESRV_SLAVE</name>\n                    <displayName>Sample Srv Slave</displayName>\n                    <category>SLAVE</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/slave.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n                <component>\n                    <name>SAMPLESRV_CLIENT</name>\n                    <displayName>Sample Srv Client</displayName>\n                    <category>CLIENT</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/sample_client.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n            </components>\n            <osSpecifics>\n                <osSpecific>\n                    <osFamily>any</osFamily>  \x3c!-- note: use osType rather than osFamily for Ambari 1.5.0 and 1.5.1 --\x3e\n                </osSpecific>\n            </osSpecifics>\n        </service>\n    </services>\n</metainfo>\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsxs)(n.li,{children:['In the above, my service name is " ',(0,r.jsx)(n.strong,{children:"SAMPLESRV"}),'", and it contains:']}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["one ",(0,r.jsx)(n.strong,{children:"MASTER"}),' component " ',(0,r.jsx)(n.strong,{children:"SAMPLESRV_MASTER"}),'"']}),"\n",(0,r.jsxs)(n.li,{children:["one ",(0,r.jsx)(n.strong,{children:"SLAVE"}),' component " ',(0,r.jsx)(n.strong,{children:"SAMPLESRV_SLAVE"}),'"']}),"\n",(0,r.jsxs)(n.li,{children:["one ",(0,r.jsx)(n.strong,{children:"CLIENT"}),' component " ',(0,r.jsx)(n.strong,{children:"SAMPLESRV_CLIENT"}),'"']}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{start:"5",children:["\n",(0,r.jsxs)(n.li,{children:["Next, let's create that command script. Create a directory for the command script ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV/package/scripts"})," that we designated in the service metainfo."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV/package/scripts\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/SAMPLESRV/package/scripts\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"6",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the scripts directory and create the ",(0,r.jsx)(n.code,{children:".py"})," command script files. For example ",(0,r.jsx)(n.code,{children:"master.py"})," file:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"import sys\nfrom resource_management import *\nclass Master(Script):\n  def install(self, env):\n    print 'Install the Sample Srv Master';\n  def stop(self, env):\n    print 'Stop the Sample Srv Master';\n  def start(self, env):\n    print 'Start the Sample Srv Master';\n\n  def status(self, env):\n    print 'Status of the Sample Srv Master';\n  def configure(self, env):\n    print 'Configure the Sample Srv Master';\nif __name__ == \"__main__\":\n  Master().execute()\n"})}),"\n",(0,r.jsxs)(n.p,{children:["For example ",(0,r.jsx)(n.code,{children:"slave"})," ",(0,r.jsx)(n.code,{children:".py"})," file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"import sys\nfrom resource_management import *\nclass Slave(Script):\n  def install(self, env):\n    print 'Install the Sample Srv Slave';\n  def stop(self, env):\n    print 'Stop the Sample Srv Slave';\n  def start(self, env):\n    print 'Start the Sample Srv Slave';\n  def status(self, env):\n    print 'Status of the Sample Srv Slave';\n  def configure(self, env):\n    print 'Configure the Sample Srv Slave';\nif __name__ == \"__main__\":\n  Slave().execute()\n"})}),"\n",(0,r.jsxs)(n.p,{children:["For example ",(0,r.jsx)(n.code,{children:"sample_client"})," ",(0,r.jsx)(n.code,{children:".py"})," file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"import sys\nfrom resource_management import *\nclass SampleClient(Script):\n  def install(self, env):\n    print 'Install the Sample Srv Client';\n  def configure(self, env):\n    print 'Configure the Sample Srv Client';\nif __name__ == \"__main__\":\n  SampleClient().execute()\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"7",children:["\n",(0,r.jsx)(n.li,{children:"Now, restart Ambari Server for this new service definition to be distributed to all the Agents in the cluster."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"ambari-server restart\n"})}),"\n",(0,r.jsx)(n.h3,{id:"install-the-service-via-ambari-web-add-services",children:'Install the Service (via Ambari Web "Add Services")'}),"\n",(0,r.jsx)(n.p,{children:"The ability to add custom services via Ambari Web is new as of Ambari 1.7.0."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["In Ambari Web, browse to Services and click the ",(0,r.jsx)(n.strong,{children:"Actions"})," button in the Service navigation area on the left."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:['The "Add Services" wizard launches. You will see an option to include "My Sample Service" (which is the ',(0,r.jsx)(n.code,{children:"<displayname></displayname>"})," of the service as defined in the service ",(0,r.jsx)(n.code,{children:"metainfo.xml"})," file)."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Select "My Sample Service" and click Next.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Assign the "Sample Srv Master" and click Next.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Select the hosts to install the "Sample Srv Client" and click Next.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Once complete, the "My Sample Service" will be available Service navigation area.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'If you want to add the "Sample Srv Client" to any hosts, you can browse to Hosts and navigate to a specific host and click "+ Add".'}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"example-implementing-a-custom-client-only-service",children:"Example: Implementing a Custom Client-only Service"}),"\n",(0,r.jsx)(n.p,{children:'In this example, we will create a custom service called "TESTSRV", add it to an existing Stack definition and use the Ambari APIs to install/configure the service. This service is a CLIENT so it has two commands: install and configure.'}),"\n",(0,r.jsx)(n.h3,{id:"create-and-add-the-service-1",children:"Create and Add the Service"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["On the Ambari Server, browse to the ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services"})," directory. In this case, we will browse to the HDP 2.0 Stack definition."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:["Create a directory named ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/<strong>TESTSRV</strong>"})," that will contain the service definition for ",(0,r.jsx)(n.strong,{children:"TESTSRV"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the newly created ",(0,r.jsx)(n.code,{children:"TESTSRV"})," directory, create a ",(0,r.jsx)(n.code,{children:"metainfo.xml"})," file that describes the new service. For example:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:'<?xml version="1.0"?>\n<metainfo>\n    <schemaVersion>2.0</schemaVersion>\n    <services>\n        <service>\n            <name>TESTSRV</name>\n            <displayName>New Test Service</displayName>\n            <comment>A New Test Service</comment>\n            <version>0.1.0</version>\n            <components>\n                <component>\n                    <name>TEST_CLIENT</name>\n                    <displayName>New Test Client</displayName>\n                    <category>CLIENT</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/test_client.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                    <customCommands>\n                      <customCommand>\n                        <name>SOMETHINGCUSTOM</name>\n                        <commandScript>\n                          <script>scripts/test_client.py<\/script>\n                          <scriptType>PYTHON</scriptType>\n                          <timeout>600</timeout>\n                        </commandScript>\n                      </customCommand>\n                    </customCommands>\n                </component>\n            </components>\n            <osSpecifics>\n                <osSpecific>\n                    <osFamily>any</osFamily>  \x3c!-- note: use osType rather than osFamily for Ambari 1.5.0 and 1.5.1 --\x3e\n                </osSpecific>\n            </osSpecifics>\n        </service>\n    </services>\n</metainfo>\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:['In the above, my service name is " ',(0,r.jsx)(n.strong,{children:"TESTSRV"}),'", and it contains one component " ',(0,r.jsx)(n.strong,{children:"TEST_CLIENT"}),'" that is of component category " ',(0,r.jsx)(n.strong,{children:"CLIENT"}),'". That client is managed via the command script ',(0,r.jsx)(n.code,{children:"scripts/test_client.py"}),". Next, let's create that command script."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Create a directory for the command script ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV/package/scripts"})," that we designated in the service metainfo."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV/package/scripts\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTSRV/package/scripts\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"6",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the scripts directory and create the ",(0,r.jsx)(n.code,{children:"test_client.py"})," file. For example:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"import sys\nfrom resource_management import *\n\nclass TestClient(Script):\n  def install(self, env):\n    print 'Install the client';\n  def configure(self, env):\n    print 'Configure the client';\n  def somethingcustom(self, env):\n    print 'Something custom';\n\nif __name__ == \"__main__\":\n  TestClient().execute()\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"7",children:["\n",(0,r.jsx)(n.li,{children:"Now, restart Ambari Server for this new service definition to be distributed to all the Agents in the cluster."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ambari-server restart\n"})}),"\n",(0,r.jsx)(n.h3,{id:"adding-repository-details-in-repoinfoxml",children:"Adding Repository details in repoinfo.xml"}),"\n",(0,r.jsx)(n.p,{children:"When adding a custom service, it may be needed to add additional repository details for the stack especially if the service binaries are available through a separate repository. Additional"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:'<reposinfo>\n  <os family="redhat6">\n    <repo>\n      <baseurl>http://cust.service.lab.com/Services/centos6/1.1/myservices</baseurl>\n      <repoid>CUSTOM-1.1</repoid>\n      <reponame>CUSTOM</reponame>\n    </repo>\n    <repo>\n      <baseurl>http://public-repo-1.hortonworks.com/HDP/centos6/2.x/updates/2.0.6.1</baseurl>\n      <repoid>HDP-2.0.6</repoid>\n      <reponame>HDP</reponame>\n    </repo>\n    <repo>\n      <baseurl>http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.17/repos/centos6</baseurl>\n      <repoid>HDP-UTILS-1.1.0.17</repoid>\n      <reponame>HDP-UTILS</reponame>\n    </repo>\n  </os>\n</reposinfo>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"install-the-service-via-the-ambari-rest-api",children:"Install the Service (via the Ambari REST API)"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Add the Service to the Cluster."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'POST\n/api/v1/clusters/MyCluster/services\n\n{\n"ServiceInfo": {\n  "service_name":"TESTSRV"\n  }\n}\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"Add the Components to the Service. In this case, add TEST_CLIENT to TESTSRV."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"POST\n/api/v1/clusters/MyCluster/services/TESTSRV/components/TEST_CLIENT\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["Install the component on all target hosts. For example, to install on ",(0,r.jsx)(n.code,{children:'<a href="http://c6402.ambari.apache.org">c6402.ambari.apache.org</a>'})," and ",(0,r.jsx)(n.code,{children:'<a href="http://c6403.ambari.apache.org">c6403.ambari.apache.org</a>'}),", first create the host_component resource on the hosts using POST."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"POST\n/api/v1/clusters/MyCluster/hosts/c6402.ambari.apache.org/host_components/TEST_CLIENT\n\nPOST\n/api/v1/clusters/MyCluster/hosts/c6403.ambari.apache.org/host_components/TEST_CLIENT\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsxs)(n.li,{children:["Now have Ambari install the components on all hosts. In this single command, you are instructing Ambari to install all components related to the service. This call the ",(0,r.jsx)(n.code,{children:"install()"})," method in the command script on each host."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'PUT\n/api/v1/clusters/MyCluster/services/TESTSRV\n\n{\n  "RequestInfo": {\n    "context": "Install Test Srv Client"\n  },\n  "Body": {\n    "ServiceInfo": {\n      "state": "INSTALLED"\n    }\n  }\n}\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"5",children:["\n",(0,r.jsxs)(n.li,{children:["Alternatively, instead of installing all components at the same time, you can explicitly install each host component. In this example, we will explicitly install the TEST_CLIENT on ",(0,r.jsx)(n.code,{children:'<a href="http://c6402.ambari.apache.org">c6402.ambari.apache.org</a>'}),":"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'PUT\n/api/v1/clusters/MyCluster/hosts/c6402.ambari.apache.org/host_components/TEST_CLIENT\n\n{\n  "RequestInfo": {\n    "context":"Install Test Srv Client"\n  },\n  "Body": {\n    "HostRoles": {\n      "state":"INSTALLED"\n    }\n  }\n}\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"6",children:["\n",(0,r.jsxs)(n.li,{children:["Use the following to configure the client on the host. This will end up calling the ",(0,r.jsx)(n.code,{children:"configure()"})," method in the command script."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'POST\n/api/v1/clusters/MyCluster/requests\n\n{\n  "RequestInfo" : {\n    "command" : "CONFIGURE",\n    "context" : "Config Test Srv Client"\n  },\n  "Requests/resource_filters": [{\n    "service_name" : "TESTSRV",\n    "component_name" : "TEST_CLIENT",\n    "hosts" : "c6403.ambari.apache.org"\n  }]\n}\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"7",children:["\n",(0,r.jsx)(n.li,{children:"If you want to see which hosts the component is installed."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"GET\n/api/v1/clusters/MyCluster/components/TEST_CLIENT\n"})}),"\n",(0,r.jsx)(n.h3,{id:"install-the-service-via-ambari-web-add-services-1",children:'Install the Service (via Ambari Web "Add Services")'}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsx)(n.p,{children:"The ability to add custom services via Ambari Web is new as of Ambari 1.7.0."})}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["In Ambari Web, browse to Services and click the ",(0,r.jsx)(n.strong,{children:"Actions"})," button in the Service navigation area on the left."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:['The "Add Services" wizard launches. You will see an option to include "My Test Service" (which is the ',(0,r.jsx)(n.code,{children:"<displayname></displayname>"})," of the service as defined in the service ",(0,r.jsx)(n.code,{children:"metainfo.xml"})," file)."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Select "My Test Service" and click Next.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Select the hosts to install the "New Test Client" and click Next.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'Once complete, the "My Test Service" will be available Service navigation area.'}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:'If you want to add the "New Test Client" to any hosts, you can browse to Hosts and navigate to a specific host and click "+ Add".'}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"example-implementing-a-custom-client-only-service-with-configs",children:"Example: Implementing a Custom Client-only Service (with Configs)"}),"\n",(0,r.jsx)(n.p,{children:'In this example, we will create a custom service called "TESTCONFIGSRV" and add it to an existing Stack definition. This service is a CLIENT so it has two commands: install and configure. And the service also includes a configuration type "test-config".'}),"\n",(0,r.jsx)(n.h3,{id:"create-and-add-the-service-to-the-stack",children:"Create and Add the Service to the Stack"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["On the Ambari Server, browse to the ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services"})," directory. In this case, we will browse to the HDP 2.0 Stack definition."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:["Create a directory named ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/<strong>TESTCONFIGSRV</strong>"})," that will contain the service definition for TESTCONFIGSRV."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the newly created ",(0,r.jsx)(n.code,{children:"TESTCONFIGSRV"})," directory, create a ",(0,r.jsx)(n.code,{children:"metainfo.xml"})," file that describes the new service. For example:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:'<?xml version="1.0"?>\n<metainfo>\n    <schemaVersion>2.0</schemaVersion>\n    <services>\n        <service>\n            <name>TESTCONFIGSRV</name>\n            <displayName>New Test Config Service</displayName>\n            <comment>A New Test Config Service</comment>\n            <version>0.1.0</version>\n            <components>\n                <component>\n                    <name>TESTCONFIG_CLIENT</name>\n                    <displayName>New Test Config Client</displayName>\n                    <category>CLIENT</category>\n                    <cardinality>1+</cardinality>\n                    <commandScript>\n                        <script>scripts/test_client.py<\/script>\n                        <scriptType>PYTHON</scriptType>\n                        <timeout>600</timeout>\n                    </commandScript>\n                </component>\n            </components>\n            <osSpecifics>\n                <osSpecific>\n                    <osFamily>any</osFamily>  \x3c!-- note: use osType rather than osFamily for Ambari 1.5.0 and 1.5.1 --\x3e\n                </osSpecific>\n            </osSpecifics>\n        </service>\n    </services>\n</metainfo>\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:['In the above, my service name is " ',(0,r.jsx)(n.strong,{children:"TESTCONFIGSRV"}),'", and it contains one component " ',(0,r.jsx)(n.strong,{children:"TESTCONFIG_CLIENT"}),'" that is of component category " ',(0,r.jsx)(n.strong,{children:"CLIENT"}),'". That client is managed via the command script ',(0,r.jsx)(n.code,{children:"scripts/test_client.py"}),". Next, let's create that command script."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Create a directory for the command script ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/package/scripts"})," that we designated in the service metainfo ",(0,r.jsx)(n.code,{children:"<commandscript></commandscript>"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/package/scripts\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/package/scripts\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"6",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the scripts directory and create the ",(0,r.jsx)(n.code,{children:"test_client.py"})," file. For example:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"import sys\nfrom resource_management import *\n\nclass TestClient(Script):\n  def install(self, env):\n    print 'Install the config client';\n  def configure(self, env):\n    print 'Configure the config client';\n\nif __name__ == \"__main__\":\n  TestClient().execute()\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"7",children:["\n",(0,r.jsxs)(n.li,{children:["Now let's define a config type for this service. Create a directory for the configuration dictionary file ",(0,r.jsx)(n.code,{children:"/var/lib/ambari-server/resources/stacks/HDP/2.0.6/servicesTESTCONFIGSRV/configuration"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir -p /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/configuration\ncd /var/lib/ambari-server/resources/stacks/HDP/2.0.6/services/TESTCONFIGSRV/configuration\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"8",children:["\n",(0,r.jsxs)(n.li,{children:["Browse to the configuration directory and create the ",(0,r.jsx)(n.code,{children:"test-config.xml"})," file. For example:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-xml",children:'\n<?xml version="1.0"?>\n<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>\n \n<configuration>\n  <property>\n    <name>some.test.property</name>\n    <value>this.is.the.default.value</value>\n    <description>This is a kool description.</description>\n </property>\n</configuration>\n\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"9",children:["\n",(0,r.jsx)(n.li,{children:"Now, restart Ambari Server for this new service definition to be distributed to all the Agents in the cluster."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ambari-server restart\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>c});var i=s(96540);const r={},t=i.createContext(r);function a(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);