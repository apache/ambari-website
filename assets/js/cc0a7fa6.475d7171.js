"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[5835],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>m});var i=t(67294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,s=function(e,n){if(null==e)return{};var t,i,s={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=i.createContext({}),c=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=c(e.components);return i.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,s=e.mdxType,r=e.originalType,l=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=c(t),m=s,k=u["".concat(l,".").concat(m)]||u[m]||p[m]||r;return t?i.createElement(k,a(a({ref:n},d),{},{components:t})):i.createElement(k,a({ref:n},d))}));function m(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var r=t.length,a=new Array(r);a[0]=u;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:s,a[1]=o;for(var c=2;c<r;c++)a[c]=t[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},19772:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=t(87462),s=(t(67294),t(3905));const r={},a="Extensions",o={unversionedId:"ambari-design/stack-and-services/extensions",id:"version-2.7.5/ambari-design/stack-and-services/extensions",title:"Extensions",description:"Background",source:"@site/versioned_docs/version-2.7.5/ambari-design/stack-and-services/extensions.md",sourceDirName:"ambari-design/stack-and-services",slug:"/ambari-design/stack-and-services/extensions",permalink:"/docs/2.7.5/ambari-design/stack-and-services/extensions",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-design/stack-and-services/extensions.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Defining a Custom Stack and Services",permalink:"/docs/2.7.5/ambari-design/stack-and-services/defining-a-custom-stack-and-services"},next:{title:"How-To Define Stacks and Services",permalink:"/docs/2.7.5/ambari-design/stack-and-services/how-to-define-stacks-and-services"}},l={},c=[{value:"Background",id:"background",level:2},{value:"Structure",id:"structure",level:2},{value:"Extension Inheritance",id:"extension-inheritance",level:2},{value:"Supported Stack Versions",id:"supported-stack-versions",level:2},{value:"Installing Extensions",id:"installing-extensions",level:2},{value:"Extension REST APIs",id:"extension-rest-apis",level:2},{value:"Get all extensions",id:"get-all-extensions",level:3},{value:"Get extension",id:"get-extension",level:3},{value:"Get extension version",id:"get-extension-version",level:3},{value:"Extension Links",id:"extension-links",level:2},{value:"Extension Link REST APIs",id:"extension-link-rest-apis",level:2},{value:"Create Extension Link",id:"create-extension-link",level:3},{value:"Get All Extension Links",id:"get-all-extension-links",level:3},{value:"Get Extension Link",id:"get-extension-link",level:3},{value:"Delete Extension Link",id:"delete-extension-link",level:3},{value:"Update All Extension Links",id:"update-all-extension-links",level:3}],d={toc:c};function p(e){let{components:n,...t}=e;return(0,s.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"extensions"},"Extensions"),(0,s.kt)("h2",{id:"background"},"Background"),(0,s.kt)("p",null,"Added in Ambari 2.4."),(0,s.kt)("p",null,"An Extension is a collection of one or more custom services which are packaged together. Much like stacks, each extension has a name which needs to be unique in the cluster. It also has a version directory to distinguish different releases of the extension. Much like stack versions which go in ",(0,s.kt)("inlineCode",{parentName:"p"},"/var/lib/ambari-server/resources/stacks with <stack_name>/<stack_version>")," sub-directories, extension versions go in ",(0,s.kt)("inlineCode",{parentName:"p"},"/var/lib/ambari-server/resources/extensions with <extension_name>/<extension_version>")," sub-directories. "),(0,s.kt)("p",null,"An extension can be linked to supported stack versions.  Once an extension version has been linked to the currently installed stack version, the custom services contained in the extension version may be added to the cluster in the same manner as if they were actually contained in the stack version."),(0,s.kt)("p",null,"Third party developers can release Extensions which can be added to a cluster."),(0,s.kt)("h2",{id:"structure"},"Structure"),(0,s.kt)("p",null,"The structure of an Extension definition is as follows:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"|_ extensions\n   |_ <extension_name>\n      |_ <extension_version>\n         |_ metainfo.xml\n         |_ services\n            |_ <service_name>\n               |_ metainfo.xml\n               |_ metrics.json\n               |_ configuration\n                  |_ {configuration files}\n               |_ package\n                  |_ {files, scripts, templates}\n")),(0,s.kt)("p",null,"An extension version is similar to a stack version but it only includes the metainfo.xml and the services directory. This means that the alerts, kerberos, metrics, role command order, widgets files are not supported and should be included at the service level. In addition, the repositories, hooks, configurations, and upgrades directories are not supported although upgrade support can be added at the service level."),(0,s.kt)("h2",{id:"extension-inheritance"},"Extension Inheritance"),(0,s.kt)("p",null,"Extension versions can extend other Extension versions in order to share command scripts and configurations. This reduces duplication of code across Extensions with the following:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"add new Services in the child Extension version (not in the parent Extension version)"),(0,s.kt)("li",{parentName:"ul"},"override command scripts of the parent Services"),(0,s.kt)("li",{parentName:"ul"},"override configurations of the parent Services")),(0,s.kt)("p",null,"For example, ",(0,s.kt)("strong",{parentName:"p"},"MyExtension 2.0")," could extend ",(0,s.kt)("strong",{parentName:"p"},"MyExtension 1.0")," so only the changes applicable to the ",(0,s.kt)("strong",{parentName:"p"},"MyExtension 2.0")," extension are present in that Extension definition. This extension is defined in the metainfo.xml for ",(0,s.kt)("strong",{parentName:"p"},"MyExtension 2.0"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-xml"},"<metainfo>\n  <extends>1.0</extends>\n")),(0,s.kt)("h2",{id:"supported-stack-versions"},"Supported Stack Versions"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Each Extension Version must support one or more Stack Versions."),"  The Extension Version specifies the minimum Stack Version which it supports.  This is included in the extension's metainfo.xml in the prerequisites section like so:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-xml"},"<metainfo>\n  <prerequisites>\n    <min-stack-versions>\n      <stack>\n        <name>HDP</name>\n        <version>2.4</version>\n      </stack>\n      <stack>\n        <name>OTHER</name>\n        <version>1.0</version>\n      </stack>\n    </min-stack-versions>\n  </prerequisites>\n</metainfo>\n\n")),(0,s.kt)("h2",{id:"installing-extensions"},"Installing Extensions"),(0,s.kt)("p",null,"It is recommended to install extensions using ",(0,s.kt)("a",{parentName:"p",href:"/docs/2.7.5/ambari-design/stack-and-services/management-packs"},"management packs"),".  For more details see the ",(0,s.kt)("a",{parentName:"p",href:"/docs/2.7.5/ambari-design/stack-and-services/custom-services"},"instructions on packaging custom services using extensions and management packs"),"."),(0,s.kt)("p",null,"Once the extension version directory has been created under the resource/extensions directory with the required metainfo.xml file, you can restart ambari-server."),(0,s.kt)("h2",{id:"extension-rest-apis"},"Extension REST APIs"),(0,s.kt)("p",null,"You can query for extensions by calling REST APIs."),(0,s.kt)("h3",{id:"get-all-extensions"},"Get all extensions"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'curl -u admin:admin -H \'X-Requested-By:ambari\' -X GET \'http://<server>:<port>/api/v1/extensions\'\n{\n  "href" : "http://<server>:<port>/api/v1/extensions/",\n  "items" : [\n    {\n      "href" : "http://<server>:<port>/api/v1/extensions/EXT",\n      "Extensions" : {\n        "extension_name" : "EXT"\n      }\n    }\n  ]\n}\n')),(0,s.kt)("h3",{id:"get-extension"},"Get extension"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'curl -u admin:admin -H \'X-Requested-By:ambari\' -X GET \'http://<server>:<port>/api/v1/extensions/EXT\'\n\n{\n  "href" : "http://<server>:<port>/api/v1/extensions/EXT",\n  "Extensions" : {\n    "extension_name" : "EXT"\n  },\n  "versions" : [\n    {\n      "href" : "http://<server>:<port>/api/v1/extensions/EXT/versions/1.0",\n      "Versions" : {\n        "extension_name" : "EXT",\n        "extension_version" : "1.0"\n      }\n    }\n  ]\n}\n')),(0,s.kt)("h3",{id:"get-extension-version"},"Get extension version"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'curl -u admin:admin -H \'X-Requested-By:ambari\' -X GET \'http://<server>:<port>/api/v1/extensions/EXT/versions/1.0\'\n\n{\n  "href" : "http://<server>:<port>/api/v1/extensions/EXT/versions/1.0/",\n  "Versions" : {\n    "extension-errors" : [],\n    "extension_name" : "EXT",\n    "extension_version" : "1.0",\n    "parent_extension_version" : null,\n    "valid" : true\n  }\n}\n')),(0,s.kt)("h2",{id:"extension-links"},"Extension Links"),(0,s.kt)("p",null,"An Extension Link is a link between a stack version and an extension version.  Once an extension version has been linked to the currently installed stack version, the custom services contained in the extension version may be added to the cluster in the same manner as if they were actually contained in the stack version."),(0,s.kt)("p",null,"It is only possible to link an extension version to a stack version if the stack version is supported by the extension version.  The stack name must be specified in the prerequisites section of the extension's metainfo.xml and the stack version must be greater than or equal to the minimum version number specified."),(0,s.kt)("h2",{id:"extension-link-rest-apis"},"Extension Link REST APIs"),(0,s.kt)("p",null,"You can retrieve, create, update and delete extension links by calling REST APIs."),(0,s.kt)("h3",{id:"create-extension-link"},"Create Extension Link"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'The following curl command will link an extension EXT/1.0 to the stack HDP/2.4\n\ncurl -u admin:admin -H \'X-Requested-By: ambari\' -X POST -d \'{"ExtensionLink": {"stack_name": "HDP", "stack_version":\n\n"2.4", "extension_name": "EXT", "extension_version": "1.0"}}\' http://<server>:<port>/api/v1/links/\n')),(0,s.kt)("h3",{id:"get-all-extension-links"},"Get All Extension Links"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'curl -u admin:admin -H \'X-Requested-By:ambari\' -X GET \'http://<server>:<port>/api/v1/links\'\n\n{\n  "href" : "http://<server>:<port>/api/v1/links/",\n  "items" : [\n    {\n      "href" : "http://<server>:<port>:8080/api/v1/links/1",\n      "ExtensionLink" : {\n        "extension_name" : "EXT",\n        "extension_version" : "1.0",\n        "link_id" : 1,\n        "stack_name" : "HDP",\n        "stack_version" : "2.4"\n      }\n    }\n  ]\n}\n')),(0,s.kt)("h3",{id:"get-extension-link"},"Get Extension Link"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'curl -u admin:admin -H \'X-Requested-By:ambari\' -X GET \'http://<server>:<port>/api/v1/link/1\'\n{\n  "href" : "http://<server>:<port>/api/v1/links/1",\n  "ExtensionLink" : {\n    "extension_name" : "EXT",\n    "extension_version" : "1.0",\n    "link_id" : 1,\n    "stack_name" : "HDP",\n    "stack_version" : "2.4"\n  }\n}\n')),(0,s.kt)("h3",{id:"delete-extension-link"},"Delete Extension Link"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"You must specify the ID of the Extension Link to be deleted.\n\ncurl -u admin:admin -H 'X-Requested-By: ambari' -X DELETE http://<server>:<port>/api/v1/links/<link_id>\n")),(0,s.kt)("h3",{id:"update-all-extension-links"},"Update All Extension Links"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"This will reread the stacks, extensions and services in order to make sure the state of the stack is up to date in memory.\n\ncurl -u admin:admin -H 'X-Requested-By: ambari' -X PUT http://<server>:<port>/api/v1/links/\n")))}p.isMDXComponent=!0}}]);