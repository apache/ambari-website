"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8867],{3905:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>d});var a=t(67294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)t=s[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)t=s[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var c=a.createContext({}),p=function(e){var r=a.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},l=function(e){var r=p(e.components);return a.createElement(c.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},m=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,s=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),m=p(t),d=n,f=m["".concat(c,".").concat(d)]||m[d]||u[d]||s;return t?a.createElement(f,i(i({ref:r},l),{},{components:t})):a.createElement(f,i({ref:r},l))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var s=t.length,i=new Array(s);i[0]=m;var o={};for(var c in r)hasOwnProperty.call(r,c)&&(o[c]=r[c]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var p=2;p<s;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},51569:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var a=t(87462),n=(t(67294),t(3905));const s={},i="Stack Properties",o={unversionedId:"ambari-design/stack-and-services/stack-properties",id:"version-3.0.0/ambari-design/stack-and-services/stack-properties",title:"Stack Properties",description:"Similar to stack configurations, most properties are defined at the service level, however there are global properties which can be defined at the stack-version level affecting across all services.",source:"@site/versioned_docs/version-3.0.0/ambari-design/stack-and-services/stack-properties.md",sourceDirName:"ambari-design/stack-and-services",slug:"/ambari-design/stack-and-services/stack-properties",permalink:"/docs/ambari-design/stack-and-services/stack-properties",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-design/stack-and-services/stack-properties.md",tags:[],version:"3.0.0",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Stack Inheritance",permalink:"/docs/ambari-design/stack-and-services/stack-inheritance"},next:{title:"Writing metainfo.xml",permalink:"/docs/ambari-design/stack-and-services/writing-metainfo"}},c={},p=[],l={toc:p};function u(e){let{components:r,...s}=e;return(0,n.kt)("wrapper",(0,a.Z)({},l,s,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"stack-properties"},"Stack Properties"),(0,n.kt)("p",null,"Similar to stack configurations, most properties are defined at the service level, however there are global properties which can be defined at the stack-version level affecting across all services."),(0,n.kt)("p",null,"Some examples are: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_tools.json#L2"},"stack-selector and conf-selector")," specific names or what ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_features.json#L5"},"stack versions certain stack features")," are supported by. Most of these properties were introduced in Ambari 2.4 version in the effort of parameterize stack information and facilitate the reuse of common-services code by other distributions."),(0,n.kt)("p",null,"Such properties can be defined in .json format in the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/tree/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties"},"properties folder")," of the stack."),(0,n.kt)("p",null,(0,n.kt)("img",{src:t(98128).Z,width:"216",height:"188"})),(0,n.kt)("h1",{id:"stack-features"},"Stack features"),(0,n.kt)("p",null,"Stacks can support different features depending on their version, for example: upgrade support, NFS support, support for specific new components (such as Ranger, Phoenix )..."),(0,n.kt)("p",null,"Stack featurization was added as part of the HDP stack configurations on ",(0,n.kt)("a",{parentName:"p",href:"http://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/configuration/cluster-env.xml"},"HDP/2.0.6/configuration/cluster-env.xml"),", introducing a new stack_features property which value is processed in the stack engine from an external property file."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml"},'\x3c!-- Define stack_features property in the base stack. DO NOT override this property for each stack version --\x3e\n<property>\n  <name>stack_features</name>\n  <value/>\n  <description>List of features supported by the stack</description>\n  <property-type>VALUE_FROM_PROPERTY_FILE</property-type>\n  <value-attributes>\n    <property-file-name>stack_features.json</property-file-name>\n    <property-file-type>json</property-file-type>\n    <read-only>true</read-only>\n    <overridable>false</overridable>\n    <visible>false</visible>\n  </value-attributes>\n  <on-ambari-upgrade add="true"/>\n</property>\n')),(0,n.kt)("p",null,"Stack Features properties are defined in ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_features.json"},"stack_features.json")," file under /HDP/2.0.6/properties. These features support is now available for access at service-level code to change certain service behaviors or configurations. This is an example of features described in stack_features.jon file:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-json"},'"stack_features": [\n    {\n      "name": "snappy",\n      "description": "Snappy compressor/decompressor support",\n      "min_version": "2.0.0.0",\n      "max_version": "2.2.0.0"\n    },\n    {\n      "name": "lzo",\n      "description": "LZO libraries support",\n      "min_version": "2.2.1.0"\n    },\n    {\n      "name": "express_upgrade",\n      "description": "Express upgrade support",\n      "min_version": "2.1.0.0"\n    },\n    {\n      "name": "rolling_upgrade",\n      "description": "Rolling upgrade support",\n      "min_version": "2.2.0.0"\n    }\n  ]\n}\n')),(0,n.kt)("p",null,"where min_version/max_version are optional constraints."),(0,n.kt)("p",null,'Feature constants, matching features names, such has ROLLING_UPGRADE = "rolling_upgrade" has been added to a new StackFeature class in ',(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-common/src/main/python/resource_management/libraries/functions/constants.py#L38"},"resource_management/libraries/functions/constants.py")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-python"},'class StackFeature:\n"""\n  Stack Feature supported\n"""\n  SNAPPY = "snappy"\n  LZO = "lzo"\n  EXPRESS_UPGRADE = "express_upgrade"\n  ROLLING_UPGRADE = "rolling_upgrade"\n')),(0,n.kt)("p",null,"Additionally, corresponding helper functions has been introduced in ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-common/src/main/python/resource_management/libraries/functions/stack_features.py"},"resource_management/libraries/functions/stack_fetaures.py")," to parse the .json file content and called from service code to check if the stack supports the specific feature."),(0,n.kt)("p",null,"This is an example where the new stack featurization design is used in service code:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-python"},'if params.version and check_stack_feature(StackFeature.ROLLING_UPGRADE, params.version):\n      conf_select.select(params.stack_name, "hive", params.version)\n      stack_select.select("hive-server2", params.version)\n')),(0,n.kt)("h1",{id:"stack-tools"},"Stack Tools"),(0,n.kt)("p",null,"Similar to stack features, stack-selector and conf-selector tools are now stack-driven instead of hardcoding hdp-select and conf-select. They are defined in ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_tools.json"},"stack_tools.json")," file under /HDP/2.0.6/properties"),(0,n.kt)("p",null,"And declared as part of the HDP stack configurations as a new property on ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/configuration/cluster-env.xml"},"/HDP/2.0.6/configuration/cluster-env.xml")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml"},'\x3c!-- Define stack_tools property in the base stack. DO NOT override this property for each stack version --\x3e\n<property>\n  <name>stack_tools</name>\n  <value/>\n  <description>Stack specific tools</description>\n  <property-type>VALUE_FROM_PROPERTY_FILE</property-type>\n  <value-attributes>\n    <property-file-name>stack_tools.json</property-file-name>\n    <property-file-type>json</property-file-type>\n    <read-only>true</read-only>\n    <overridable>false</overridable>\n    <visible>false</visible>\n  </value-attributes>\n  <on-ambari-upgrade add="true"/>\n</property>\n')),(0,n.kt)("p",null,"Corresponding helper functions have been added in ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-common/src/main/python/resource_management/libraries/functions/stack_tools.py"},"resource_management/libraries/functions/stack_tools.py"),". These helper functions are used to remove hardcodings in resource_management library."))}u.isMDXComponent=!0},98128:(e,r,t)=>{t.d(r,{Z:()=>a});const a=t.p+"assets/images/stacks-properties-3130770d4091a02de6005b047a03ac2c.png"}}]);