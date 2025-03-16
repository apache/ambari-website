"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8983],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>k});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=i.createContext({}),c=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=c(e.components);return i.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(t),k=r,f=d["".concat(l,".").concat(k)]||d[k]||p[k]||a;return t?i.createElement(f,s(s({ref:n},u),{},{components:t})):i.createElement(f,s({ref:n},u))}));function k(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,s=new Array(a);s[0]=d;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var c=2;c<a;c++)s[c]=t[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},55659:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var i=t(87462),r=(t(67294),t(3905));const a={},s="Quick Links",o={unversionedId:"ambari-design/quick-links",id:"version-2.7.5/ambari-design/quick-links",title:"Quick Links",description:"Introduction",source:"@site/versioned_docs/version-2.7.5/ambari-design/quick-links.md",sourceDirName:"ambari-design",slug:"/ambari-design/quick-links",permalink:"/docs/2.7.5/ambari-design/quick-links",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-design/quick-links.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Ambari Metrics - Whitelisting",permalink:"/docs/2.7.5/ambari-design/metrics/ambari-metrics-whitelisting"},next:{title:"Stacks and Services",permalink:"/docs/2.7.5/ambari-design/stack-and-services/"}},l={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Design",id:"design",level:2},{value:"Ambari Web UI",id:"ambari-web-ui",level:2}],u={toc:c};function p(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,i.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"quick-links"},"Quick Links"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"A service can add a list of quick links to the Ambari web UI by adding meta info to a file following a predefined JSON format. Ambari server parses the quick link JSON file and provides its content to the UI. So that Ambari web UI can calculate quick link URLs based on the information and populate the quick links drop-down list accordingly."),(0,r.kt)("h2",{id:"design"},"Design"),(0,r.kt)("p",null,"By default, the JSON file is called quicklinks.json and is located in the quicklinks directory under the service root directory. For example, for Oozie, the file is OOZIE/quicklinks/quicklinks.json. You can also name the file differently as well as put it in a custom directory under the service root directory."),(0,r.kt)("p",null,"Use YARN as an example, the following is what the metainfo.xml looks like with the quick links configurations."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<services>\n    <service>\n    <name>YARN</name>\n    <version>2.7.1.2.3</version>\n    <quickLinksConfigurations>\n        <quickLinksConfiguration>\n            <fileName>quicklinks.json</fileName>\n            <default>true</default>\n        </quickLinksConfiguration>\n    </quickLinksConfigurations>\n")),(0,r.kt)("p",null,"The metainfo.xml can have different quick links configuration as shown here for MapReduce2."),(0,r.kt)("p",null,"The _quickLinksConfigurations-dir_is an optional field that tells Ambari Server where to load the quicklinks.json file. We can skip it if we want the service to use the default _quicklinks_directory."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<service>\n    <name>MAPREDUCE2</name>\n    <version>2.7.1.2.3</version>\n    <quickLinksConfigurations-dir>quicklinks-mapred</quickLinksConfigurations-dir>\n    <quickLinksConfigurations>\n        <quickLinksConfiguration>\n            <fileName>quicklinks.json</fileName>\n            <default>true</default>\n        </quickLinksConfiguration>\n    </quickLinksConfigurations>\n")),(0,r.kt)("p",null,'A quick link JSON file has two major sections, the "configuration" section for determine the protocol (HTTP vs HTTPS), and the "links" section for meta information of each quick link to be displayed on the Ambari web UI. The JSON file also includes a "name" section at the top that defines the name of the quick links JSON file that server uses for identification.'),(0,r.kt)("p",null,'Ambari web UI uses information provided in the "configuration" section to determine if the service is running against HTTP or HTTPS. The result is used to construct all quick link URLs defined in the "links" section.'),(0,r.kt)("p",null,"Use YARN as an example, the following is what the quicklinks.json looks like"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "default",\n    "description": "default quick links configuration",\n    "configuration": {\n        "protocol": {\n            # type tells the UI which protocol to use if all checks meet.\n\n            # Use https_only or http_only with empty checks section to explicitly specify the type\n            "type":"https",\n            "checks":[ # There can be more than one check needed.\n                {\n                    "property":"yarn.http.policy",\n                    # Desired section here either is a specific value for the property specified\n                    # Or whether the property value should exit or not_exist, blank or not_blank\n                    "desired":"HTTPS_ONLY",\n                    "site":"yarn-site"\n                }\n            ]\n        },\n        #configuration for individual links\n        "links": [\n            {\n                "name": "resourcemanager_ui",\n                "label": "ResourceManager UI",\n                "requires_user_name": "false", #set this to true if UI should attach log in user name to the end of the quick link url\n                "url": "%@://%@:%@",\n\n                #section calculate the port numbe.\n                "port":{\n                    #use a property for the whole url if the service does not have a property for the port.\n                    #Specify the regex so the url can be parsed for the port value.\n                    "http_property": "yarn.timeline-service.webapp.address",\n                    "http_default_port": "8080",\n                    "https_property": "yarn.timeline-service.webapp.https.address",\n                    "https_default_port": "8090",\n                    "regex": "\\\\w*:(\\\\d+)",\n                    "site": "yarn-site"\n                }\n            },\n            {\n                "name": "resourcemanager_logs",\n                "label": "ResourceManager logs",\n                "requires_user_name": "false",\n                "url": "%@://%@:%@/logs",\n                "port":{\n                    "http_property": "yarn.timeline-service.webapp.address",\n                    "http_default_port": "8088",\n                    "https_property": "yarn.timeline-service.webapp.https.address",\n                    "https_default_port": "8090",\n                    "regex": "\\\\w*:(\\\\d+)",\n                    "site": "yarn-site"\n                }\n            }\n        ]\n    }\n}\n')),(0,r.kt)("h1",{id:"rest-api"},"REST API"),(0,r.kt)("p",null,"You can examine the quick link information made available to the Ambari web UI by running the following REST API as an HTTP GET request."),(0,r.kt)("p",null,"REST API"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"/api/v1/stacks/[stack_name]versions/[stack_version]/services/[service_name]/quicklinks?QuickLinkInfo/default=true&fields=*\n")),(0,r.kt)("p",null,"Response sent to the Ambari web UI."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "href" : "http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/YARN/quicklinks?QuickLinkInfo/default=true&fields=*",\n  "items" : [\n    {\n      "href" : "http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/YARN/quicklinks/quicklinks.json",\n      "QuickLinkInfo" : {\n        "default" : true,\n        "file_name" : "quicklinks.json",\n        "service_name" : "YARN",\n        "stack_name" : "HDP",\n        "stack_version" : "2.3",\n        "quicklink_data" : {\n          "QuickLinksConfiguration" : {\n            "description" : "default quick links configuration",\n            "name" : "default",\n            "configuration" : {\n              "protocol" : {\n                "type" : "https",\n                "checks" : [\n                  {\n                    "property" : "yarn.http.policy",\n                    "desired" : "HTTPS_ONLY",\n                    "site" : "yarn-site"\n                  }\n                ]\n              },\n              "links" : [\n                {\n                  "name" : "resourcemanager_jmx",\n                  "label" : "ResourceManager JMX",\n                  "url" : "%@://%@:%@/jmx",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.timeline-service.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.timeline-service.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                },\n                {\n                  "name" : "resourcemanager_logs",\n                  "label" : "ResourceManager logs",\n                  "url" : "%@://%@:%@/logs",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.timeline-service.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.timeline-service.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                },\n                {\n                  "name" : "resourcemanager_ui",\n                  "label" : "ResourceManager UI",\n                  "url" : "%@://%@:%@",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.resourcemanager.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.resourcemanager.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                },\n                {\n                  "name" : "thread_stacks",\n                  "label" : "Thread Stacks",\n                  "url" : "%@://%@:%@/stacks",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.timeline-service.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.timeline-service.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                }\n              ]\n            }\n          }\n        }\n      }\n    }\n  ]\n}\n')),(0,r.kt)("h2",{id:"ambari-web-ui"},"Ambari Web UI"),(0,r.kt)("p",null,"The changes for the stack driven quick links are hidden from the UI presentation. The quick links drop-down list behavior remains unchanged."))}p.isMDXComponent=!0}}]);