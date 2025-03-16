"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[6877],{28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var i=n(96540);const r={},s=i.createContext(r);function a(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(s.Provider,{value:t},e.children)}},90304:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"ambari-design/quick-links","title":"Quick Links","description":"Introduction","source":"@site/docs/ambari-design/quick-links.md","sourceDirName":"ambari-design","slug":"/ambari-design/quick-links","permalink":"/docs/next/ambari-design/quick-links","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/docs/ambari-design/quick-links.md","tags":[],"version":"current","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Ambari Metrics - Whitelisting","permalink":"/docs/next/ambari-design/metrics/ambari-metrics-whitelisting"},"next":{"title":"Stacks and Services","permalink":"/docs/next/ambari-design/stack-and-services/"}}');var r=n(74848),s=n(28453);const a={},o="Quick Links",l={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Design",id:"design",level:2},{value:"Ambari Web UI",id:"ambari-web-ui",level:2}];function d(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"quick-links",children:"Quick Links"})}),"\n",(0,r.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsx)(t.p,{children:"A service can add a list of quick links to the Ambari web UI by adding meta info to a file following a predefined JSON format. Ambari server parses the quick link JSON file and provides its content to the UI. So that Ambari web UI can calculate quick link URLs based on the information and populate the quick links drop-down list accordingly."}),"\n",(0,r.jsx)(t.h2,{id:"design",children:"Design"}),"\n",(0,r.jsx)(t.p,{children:"By default, the JSON file is called quicklinks.json and is located in the quicklinks directory under the service root directory. For example, for Oozie, the file is OOZIE/quicklinks/quicklinks.json. You can also name the file differently as well as put it in a custom directory under the service root directory."}),"\n",(0,r.jsx)(t.p,{children:"Use YARN as an example, the following is what the metainfo.xml looks like with the quick links configurations."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-xml",children:"<services>\n    <service>\n    <name>YARN</name>\n    <version>2.7.1.2.3</version>\n    <quickLinksConfigurations>\n        <quickLinksConfiguration>\n            <fileName>quicklinks.json</fileName>\n            <default>true</default>\n        </quickLinksConfiguration>\n    </quickLinksConfigurations>\n"})}),"\n",(0,r.jsx)(t.p,{children:"The metainfo.xml can have different quick links configuration as shown here for MapReduce2."}),"\n",(0,r.jsx)(t.p,{children:"The _quickLinksConfigurations-dir_is an optional field that tells Ambari Server where to load the quicklinks.json file. We can skip it if we want the service to use the default _quicklinks_directory."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-xml",children:"<service>\n    <name>MAPREDUCE2</name>\n    <version>2.7.1.2.3</version>\n    <quickLinksConfigurations-dir>quicklinks-mapred</quickLinksConfigurations-dir>\n    <quickLinksConfigurations>\n        <quickLinksConfiguration>\n            <fileName>quicklinks.json</fileName>\n            <default>true</default>\n        </quickLinksConfiguration>\n    </quickLinksConfigurations>\n"})}),"\n",(0,r.jsx)(t.p,{children:'A quick link JSON file has two major sections, the "configuration" section for determine the protocol (HTTP vs HTTPS), and the "links" section for meta information of each quick link to be displayed on the Ambari web UI. The JSON file also includes a "name" section at the top that defines the name of the quick links JSON file that server uses for identification.'}),"\n",(0,r.jsx)(t.p,{children:'Ambari web UI uses information provided in the "configuration" section to determine if the service is running against HTTP or HTTPS. The result is used to construct all quick link URLs defined in the "links" section.'}),"\n",(0,r.jsx)(t.p,{children:"Use YARN as an example, the following is what the quicklinks.json looks like"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",children:'{\n\t"name": "default",\n\t"description": "default quick links configuration",\n\t"configuration": {\n\t\t"protocol": {\n\t\t\t# type tells the UI which protocol to use if all checks meet.\n\n            # Use https_only or http_only with empty checks section to explicitly specify the type\n\t\t\t"type":"https",\n\t\t\t"checks":[ # There can be more than one check needed.\n\t\t\t\t{\n\t\t\t\t\t"property":"yarn.http.policy",\n\t\t\t\t\t# Desired section here either is a specific value for the property specified\n                    # Or whether the property value should exit or not_exist, blank or not_blank\n\t\t\t\t\t"desired":"HTTPS_ONLY",\n\t\t\t\t\t"site":"yarn-site"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t#configuration for individual links\n\t\t"links": [\n\t\t\t{\n\t\t\t\t"name": "resourcemanager_ui",\n\t\t\t\t"label": "ResourceManager UI",\n\t\t\t\t"requires_user_name": "false", #set this to true if UI should attach log in user name to the end of the quick link url\n\t\t\t\t"url": "%@://%@:%@",\n\n\t\t\t\t#section calculate the port numbe.\n\t\t\t\t"port":{\n\t\t\t\t\t#use a property for the whole url if the service does not have a property for the port.\n\t\t\t\t\t#Specify the regex so the url can be parsed for the port value.\n\t\t\t\t\t"http_property": "yarn.timeline-service.webapp.address",\n                    "http_default_port": "8080",\n\t\t\t\t\t"https_property": "yarn.timeline-service.webapp.https.address",\n\t\t\t\t\t"https_default_port": "8090",\n\t\t\t\t\t"regex": "\\\\w*:(\\\\d+)",\n\t\t\t\t\t"site": "yarn-site"\n\t\t\t\t}\n\t\t\t},\n\t\t\t{\n\t\t\t\t"name": "resourcemanager_logs",\n\t\t\t\t"label": "ResourceManager logs",\n\t\t\t\t"requires_user_name": "false",\n\t\t\t\t"url": "%@://%@:%@/logs",\n\t\t\t\t"port":{\n\t\t\t\t\t"http_property": "yarn.timeline-service.webapp.address",\n\t\t\t\t\t"http_default_port": "8088",\n\t\t\t\t\t"https_property": "yarn.timeline-service.webapp.https.address",\n\t\t\t\t\t"https_default_port": "8090",\n\t\t\t\t\t"regex": "\\\\w*:(\\\\d+)",\n\t\t\t\t\t"site": "yarn-site"\n\t\t\t\t}\n\t\t\t}\n\t\t]\n\t}\n}\n'})}),"\n",(0,r.jsx)(t.h1,{id:"rest-api",children:"REST API"}),"\n",(0,r.jsx)(t.p,{children:"You can examine the quick link information made available to the Ambari web UI by running the following REST API as an HTTP GET request."}),"\n",(0,r.jsx)(t.p,{children:"REST API"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"/api/v1/stacks/[stack_name]versions/[stack_version]/services/[service_name]/quicklinks?QuickLinkInfo/default=true&fields=*\n"})}),"\n",(0,r.jsx)(t.p,{children:"Response sent to the Ambari web UI."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",children:'{\n  "href" : "http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/YARN/quicklinks?QuickLinkInfo/default=true&fields=*",\n  "items" : [\n    {\n      "href" : "http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/YARN/quicklinks/quicklinks.json",\n      "QuickLinkInfo" : {\n        "default" : true,\n        "file_name" : "quicklinks.json",\n        "service_name" : "YARN",\n        "stack_name" : "HDP",\n        "stack_version" : "2.3",\n        "quicklink_data" : {\n          "QuickLinksConfiguration" : {\n            "description" : "default quick links configuration",\n            "name" : "default",\n            "configuration" : {\n              "protocol" : {\n                "type" : "https",\n                "checks" : [\n                  {\n                    "property" : "yarn.http.policy",\n                    "desired" : "HTTPS_ONLY",\n                    "site" : "yarn-site"\n                  }\n                ]\n              },\n              "links" : [\n                {\n                  "name" : "resourcemanager_jmx",\n                  "label" : "ResourceManager JMX",\n                  "url" : "%@://%@:%@/jmx",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.timeline-service.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.timeline-service.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                },\n                {\n                  "name" : "resourcemanager_logs",\n                  "label" : "ResourceManager logs",\n                  "url" : "%@://%@:%@/logs",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.timeline-service.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.timeline-service.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                },\n                {\n                  "name" : "resourcemanager_ui",\n                  "label" : "ResourceManager UI",\n                  "url" : "%@://%@:%@",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.resourcemanager.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.resourcemanager.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                },\n                {\n                  "name" : "thread_stacks",\n                  "label" : "Thread Stacks",\n                  "url" : "%@://%@:%@/stacks",\n                  "port" : {\n                    "regex" : "\\\\w*:(\\\\d+)",\n                    "site" : "yarn-site",\n                    "http_property" : "yarn.timeline-service.webapp.address",\n                    "http_default_port" : "8088",\n                    "https_property" : "yarn.timeline-service.webapp.https.address",\n                    "https_default_port" : "8090"\n                  },\n                  "removed" : false,\n                  "component_name" : "RESOURCEMANAGER",\n                  "requires_user_name" : "false"\n                }\n              ]\n            }\n          }\n        }\n      }\n    }\n  ]\n}\n'})}),"\n",(0,r.jsx)(t.h2,{id:"ambari-web-ui",children:"Ambari Web UI"}),"\n",(0,r.jsx)(t.p,{children:"The changes for the stack driven quick links are hidden from the UI presentation. The quick links drop-down list behavior remains unchanged."})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);