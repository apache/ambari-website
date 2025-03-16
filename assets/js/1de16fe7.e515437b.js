"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[4844],{3905:(e,a,n)=>{n.d(a,{Zo:()=>p,kt:()=>d});var t=n(67294);function i(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function r(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?r(Object(n),!0).forEach((function(a){i(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function c(e,a){if(null==e)return{};var n,t,i=function(e,a){if(null==e)return{};var n,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||(i[n]=e[n]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var m=t.createContext({}),o=function(e){var a=t.useContext(m),n=a;return e&&(n="function"==typeof e?e(a):s(s({},a),e)),n},p=function(e){var a=o(e.components);return t.createElement(m.Provider,{value:a},e.children)},l={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},k=t.forwardRef((function(e,a){var n=e.components,i=e.mdxType,r=e.originalType,m=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),k=o(n),d=i,u=k["".concat(m,".").concat(d)]||k[d]||l[d]||r;return n?t.createElement(u,s(s({ref:a},p),{},{components:n})):t.createElement(u,s({ref:a},p))}));function d(e,a){var n=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=k;var c={};for(var m in a)hasOwnProperty.call(a,m)&&(c[m]=a[m]);c.originalType=e,c.mdxType="string"==typeof e?e:i,s[1]=c;for(var o=2;o<r;o++)s[o]=n[o];return t.createElement.apply(null,s)}return t.createElement.apply(null,n)}k.displayName="MDXCreateElement"},8231:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>m,contentTitle:()=>s,default:()=>l,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var t=n(87462),i=(n(67294),n(3905));const r={},s="Management Packs",c={unversionedId:"ambari-design/stack-and-services/management-packs",id:"ambari-design/stack-and-services/management-packs",title:"Management Packs",description:"Background",source:"@site/docs/ambari-design/stack-and-services/management-packs.md",sourceDirName:"ambari-design/stack-and-services",slug:"/ambari-design/stack-and-services/management-packs",permalink:"/docs/next/ambari-design/stack-and-services/management-packs",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/docs/ambari-design/stack-and-services/management-packs.md",tags:[],version:"current",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"How-To Define Stacks and Services",permalink:"/docs/next/ambari-design/stack-and-services/how-to-define-stacks-and-services"},next:{title:"Stack Inheritance",permalink:"/docs/next/ambari-design/stack-and-services/stack-inheritance"}},m={},o=[{value:"<strong>Background</strong>",id:"background",level:2},{value:"<strong>Apache JIRA</strong>",id:"apache-jira",level:2},{value:"<strong>Release Timelines</strong>",id:"release-timelines",level:2},{value:"<strong>Management Pack Metadata (Mpack.json)</strong>",id:"management-pack-metadata-mpackjson",level:2},{value:"<strong>Management Pack Structure</strong>",id:"management-pack-structure",level:2},{value:"StackXYZ Management Pack Structure",id:"stackxyz-management-pack-structure",level:3},{value:"StackXYZ Management Pack Mpack.json",id:"stackxyz-management-pack-mpackjson",level:3},{value:"Add\xad-On Service Management Pack Structure",id:"add-on-service-management-pack-structure",level:3},{value:"Add\xad-On Service Management Pack Mpack.json",id:"add-on-service-management-pack-mpackjson",level:3},{value:"<strong>Installing Management Pack</strong>",id:"installing-management-pack",level:2},{value:"<strong>Upgrading Management Pack</strong>",id:"upgrading-management-pack",level:2}],p={toc:o};function l(e){let{components:a,...n}=e;return(0,i.kt)("wrapper",(0,t.Z)({},p,n,{components:a,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"management-packs"},"Management Packs"),(0,i.kt)("h2",{id:"background"},(0,i.kt)("strong",{parentName:"h2"},"Background")),(0,i.kt)("p",null,'At present, stack definitions are bundled with Ambari core and are part of Apache Ambari releases. This enforces having to do an Ambari release with updated stack definitions whenever a new version of a stack is released. Also to add an "add-on" service (custom service) to the stack definition, one has to manually add the add-on service to the stack definition on an Ambari Server. There is no release vehicle that can be used to ship add-on services.'),(0,i.kt)("p",null,"Apache Ambari Management Packs addresses this issue by decoupling Ambari's core functionality (cluster management and monitoring) from stack management and definition. An Apache Ambari Management Pack (Mpack) can bundle multiple service definitions, stack definitions, stack add-on service definitions, view definitions services so that releasing these artifacts don't enforce an Apache Ambari release. Apache Ambari Management Packs will be released as separate release artifacts and will follow its own release cadence instead of being tightly coupled with Apache Ambari releases."),(0,i.kt)("p",null,"Management packs are released as tarballs, however they contain a metadata file (mpack.json) that specify the contents of the management pack and actions to perform when installing the management pack."),(0,i.kt)("h2",{id:"apache-jira"},(0,i.kt)("strong",{parentName:"h2"},"Apache JIRA")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/AMBARI-14854"},"AMBARI-14854")),(0,i.kt)("h2",{id:"release-timelines"},(0,i.kt)("strong",{parentName:"h2"},"Release Timelines")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Short Term Goals (Apache Ambari 2.4.0.0 release)"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Provide a release vehicle for stack definitions (example:HDP management pack, IOP management pack).")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Provide a release vehicle for add-on/custom services (example: Microsoft-R management pack)")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Retrofit in existing stack processing infrastructure")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Command line to update stack definitions and service definitions")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Long Term Goals (Ambari 2.4+)"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Release HDP stacks as mpacks")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Build management pack processing infrastructure that will replace the stack processing infrastructure.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Dynamic creation of stack definitions by processing management packs")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Provide a REST API adding/removing /upgrading managment packs."))))),(0,i.kt)("h2",{id:"management-pack-metadata-mpackjson"},(0,i.kt)("strong",{parentName:"h2"},"Management Pack Metadata (Mpack.json)")),(0,i.kt)("p",null,"Management pack should contain following metadata information in mpack.json."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Name"),": Unique management pack name")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Version"),": Management pack version")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Description"),": Friendly description of the management pack")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Prerequisites"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Minimum Ambari Version on which the management pack is installable."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Example"),": To install stackXYZ-\xadambari-\xadmpack\xad1.0.0.0 management pack, Ambari should be atleast on Apache Ambari 2.4.0.0 version."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Minimum management pack version that should be installed before upgrading to this management pack."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Example"),": To upgrade to stackXYZ-\xadambari\xad-mpack\xad-2.0.0.0 management pack, stackXYZ-\xadambari-\xadmpack-\xad1.8.0.0 management pack or higher should be installed."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Minimum stack version that should already be present in the stack definitions for this management pack to be applicable."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Example"),": To add a add-on service management pack myservice-\xadambari\xad-mpack\xad-1.0.0.0 management pack stackXYZ-\xad2.1 stack definition should be present."))))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Artifacts"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"List of release artifacts (service definitions, stack definitions, stack-addon-service-definitions, view-definitions) bundled in the management pack.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Metadata for each artifact like source directory, additional applicability for that artifact etc.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Supported Artifact Types"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"service\xad-definitions"),": Contains service definitions similar to common-services/serviceA/1.0.0")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"stack-\xaddefinitions"),": Contains stack definitions similar to stacks/stackXYZ/1.0")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"extension-definitions"),": Contains dynamic stack extensions (Refer:",(0,i.kt)("a",{parentName:"p",href:"/docs/next/ambari-design/stack-and-services/extensions"},"Extensions"),")")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"stack\xad-addon-service-\xaddefinitions"),": Defines add-on service applicability for stacks and how to merge the add-on service into the stack definition.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"view\xad-definitions")," (Not supported in Apache Ambari 2.4.0.0)")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"A management pack can have more than one release artifacts."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Example"),": It should be possible to create a management pack that bundles together",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"stack-definitions"),": stackXYZ\xad-1.0, stackXYZ-1.1, stackXYZ-2.0"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"service-definitions"),": HAWQ, HDFS, ZOOKEEPER"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"stack-addon-service-definitions"),": HAWQ/2.0.0 is applicable to stackXYZ-2.0, stackABC-1.0"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"view-definitions"),": Hive, Jobs, Slider (Apache Ambari 2.4.0.0)")))))))),(0,i.kt)("h2",{id:"management-pack-structure"},(0,i.kt)("strong",{parentName:"h2"},"Management Pack Structure")),(0,i.kt)("h3",{id:"stackxyz-management-pack-structure"},"StackXYZ Management Pack Structure"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"stackXYZ\xad-ambari\xad-mpack-\xad1.0.0.0")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"\u251c\u2500\u2500 mpack.json\n\n\u251c\u2500\u2500 common-\xadservices\n\n\u2502     \u2514\u2500\u2500 HDFS\n\n\u2502         \u2514\u2500\u2500 2.1.0.2.0\n\n\u2502            \u2514\u2500\u2500 configuration\n\n\u2514\u2500\u2500 stacks\n\n    \u2514\u2500\u2500 stackXYZ\n\n       \u2514\u2500\u2500 1.0\n\n           \u251c\u2500\u2500 metainfo.xml\n\n           \u251c\u2500\u2500 repos\n\n           \u2502     \u2514\u2500\u2500 repoinfo.xml\n\n           \u251c\u2500\u2500 role_command_order.json\n\n           \u2514\u2500\u2500 services\n\n           \u251c\u2500\u2500 HDFS\n\n           \u2502      \u251c\u2500\u2500 configuration\n\n           \u2502      \u2502     \u2514\u2500\u2500 hdfs-\xadsite.xml\n\n           \u2502     \u2514\u2500\u2500 metainfo.xml\n\n           \u251c\u2500\u2500 stack_advisor.py\n\n           \u2514\u2500\u2500 ZOOKEEPER\n\n                   \u2514\u2500\u2500 metainfo.xml\n")),(0,i.kt)("h3",{id:"stackxyz-management-pack-mpackjson"},"StackXYZ Management Pack Mpack.json"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"stackXYZ-\xadambari-\xadmpack\xad1.0.0.0/mpack.json")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n\n    "type" : "full\xad-release",\n\n    "name" : "stackXYZ-\xadambari\xad-mpack",\n\n    "version": "1.0.0.0",\n\n    "description" : "StackXYZ Management Pack",\n\n    "prerequisites": {\n\n        "min_ambari_version" : "2.4.0.0"\n\n    },\n\n    "artifacts": [\n\n        {\n\n            "name" : "stackXYZ-service-definitions",\n\n            "type" : "service-\xaddefinitions",\n\n            "source_dir": "common-\xadservices"\n\n        },\n\n       {\n\n           "name" : "stackXYZ-\xadstack-\xaddefinitions",\n\n           "type" : "stack\xad-definitions",\n\n           "source_dir": "stacks"\n\n        }\n\n    ]\n\n}\n')),(0,i.kt)("h3",{id:"add-on-service-management-pack-structure"},"Add\xad-On Service Management Pack Structure"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"myservice-\xadambari\xad-mpack\xad-1.0.0.0")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"\u251c\u2500\u2500 common\xad-services\n\n\u2502     \u2514\u2500\u2500 MYSERVICE\n\n\u2502         \u2514\u2500\u2500 1.0.0\n\n\u2502         \u251c\u2500\u2500 configuration\n\n\u2502         \u2502     \u2514\u2500\u2500 myservice\xadconfig.xml\n\n\u2502         \u251c\u2500\u2500 metainfo.xml\n\n\u2502         \u251c\u2500\u2500 package\n\n\u2502         \u2502     \u2514\u2500\u2500 scripts\n\n\u2502         \u2502         \u251c\u2500\u2500 client.py\n\n\u2502         \u2502         \u251c\u2500\u2500 master.py\n\n\u2502         \u2502         \u2514\u2500\u2500 slave.py\n\n\u2502         \u2514\u2500\u2500 role_command_order.json\n\n\u251c\u2500\u2500 custom\xad-services\n\n\u2502     \u2514\u2500\u2500 MYSERVICE\n\n\u2502     \u251c\u2500\u2500 1.0.0\n\n\u2502     \u2502    \u2514\u2500\u2500 metainfo.xml\n\n\u2502     \u2514\u2500\u2500 2.0.0\n\n\u2502         \u2514\u2500\u2500 metainfo.xml\n\n\u2514\u2500\u2500 mpack.json\n")),(0,i.kt)("h3",{id:"add-on-service-management-pack-mpackjson"},"Add\xad-On Service Management Pack Mpack.json"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"myservice-\xadambari-\xadmpack\xad-1.0.0.0/mpack.json")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n\n    "type" : "full\xad-release",\n\n    "name" : "myservice-\xadambari\xad-mpack",\n\n    "version": "1.0.0.0",\n\n    "description" : "MyService Management Pack",\n\n    "prerequisites": {\n\n        "min-\xadambari-\xadversion" : "2.4.0.0",\n\n        "min\xad-stack\xad-versions" : [\n\n            {\n\n                "stack_name" : "stackXYZ",\n\n                "stack_version" : "2.2"\n\n           }\n\n        ]\n\n    },\n\n    "artifacts": [\n\n        {\n\n            "name" : "MYSERVICE\xad-service-definition",\n\n            "type" : "service\xad-definition",\n\n           "source_dir" : "common\xad-services/MYSERVICE/1.0.0",\n\n           "service_name" : "MYSERVICE",\n\n           "service_version" : "1.0.0"\n\n        },\n\n       {  \n\n           "name" : "MYSERVICE\xad-1.0.0",\n\n           "type" : "stack\xad-addon-service-\xaddefinition",\n\n           "source_dir": "addon-services/MYSERVICE/1.0.0",\n\n           "service_name" : "MYSERVICE",\n\n           "service_version" : "1.0.0",\n\n           "applicable_stacks" : [\n\n               {\n\n                   "stack_name" : "stackXYZ", "stack_version" : "2.2"\n\n               }\n\n            ]\n\n        },\n\n       {\n\n           "name" : "MYSERVICE\xad-2.0.0",\n\n           "type" : "stack-addon-service-definition",\n\n           "source_dir": "custom\xad-services/MYSERVICE/2.0.0",\n\n           "service_name" : "MYSERVICE",\n\n           "service_version" : "2.0.0",\n\n           "applicable_stacks" : [\n\n               {\n\n                   "stack_name" : "stackXYZ",\n\n                   "stack_version" : "2.4"\n\n                }\n\n            ]\n\n        }\n\n    ]\n\n}\n')),(0,i.kt)("h2",{id:"installing-management-pack"},(0,i.kt)("strong",{parentName:"h2"},"Installing Management Pack")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-\xadserver install-\xadmpack \xad\xad--mpack=/path/to/mpack.tar.gz --\xad\xadpurge --verbose\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note"),': Do not pass the "--purge" command line parameter when installing an add-on service management pack. The "--purge" flag is used to purge any existing stack definition (HDP is included in Ambari release) and should be included only when installing a Stack Management Pack.'),(0,i.kt)("h2",{id:"upgrading-management-pack"},(0,i.kt)("strong",{parentName:"h2"},"Upgrading Management Pack")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server upgrade-mpack --mpack=/path/to/mpack.tar.gz --verbose\n")))}l.isMDXComponent=!0}}]);