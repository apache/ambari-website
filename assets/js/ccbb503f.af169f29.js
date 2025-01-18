"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[7798],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>c});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var m=n.createContext({}),p=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=p(e.components);return n.createElement(m.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,m=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(a),c=r,k=u["".concat(m,".").concat(c)]||u[c]||d[c]||i;return a?n.createElement(k,l(l({ref:t},s),{},{components:a})):n.createElement(k,l({ref:t},s))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=u;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},512:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={},l="View Definition",o={unversionedId:"ambari-design/views/view-definition",id:"version-2.7.6/ambari-design/views/view-definition",title:"View Definition",description:"The following describes the syntax of the View Definition File (view.xml) as part of the View Package.",source:"@site/versioned_docs/version-2.7.6/ambari-design/views/view-definition.md",sourceDirName:"ambari-design/views",slug:"/ambari-design/views/view-definition",permalink:"/docs/ambari-design/views/view-definition",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.6/ambari-design/views/view-definition.md",tags:[],version:"2.7.6",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"View API",permalink:"/docs/ambari-design/views/view-api"},next:{title:"Ambari Development",permalink:"/docs/ambari-dev/"}},m={},p=[{value:"<code>&lt;view&gt;</code>",id:"view",level:2},{value:"<code>&lt;name&gt;</code>",id:"name",level:2},{value:"<code>&lt;label&gt;</code>",id:"label",level:2},{value:"<code>&lt;version&gt;</code>",id:"version",level:2},{value:"<code>&lt;min-ambari-version&gt; &lt;max-ambari-version&gt;</code>",id:"min-ambari-version-max-ambari-version",level:2},{value:"<code>&lt;description&gt;</code>",id:"description",level:2},{value:"<code>&lt;parameter&gt;</code>",id:"parameter",level:2},{value:"<code>&lt;permission&gt;</code>",id:"permission",level:2},{value:"<code>&lt;resource&gt;</code>",id:"resource",level:2},{value:"<code>&lt;instance&gt;</code>",id:"instance",level:2},{value:"<code>&lt;property&gt;</code>",id:"property",level:2},{value:"<code>&lt;view-class&gt;</code>",id:"view-class",level:2},{value:"<code>&lt;validator-class&gt;</code>",id:"validator-class",level:2}],s={toc:p};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"view-definition"},"View Definition"),(0,r.kt)("p",null,"The following describes the syntax of the View Definition File (",(0,r.kt)("inlineCode",{parentName:"p"},"view.xml"),") as part of the View Package."),(0,r.kt)("p",null,"An XML Schema Definition is available ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/resources/view.xsd"},"here"),"."),(0,r.kt)("h2",{id:"view"},(0,r.kt)("inlineCode",{parentName:"h2"},"<view>")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"<view>")," element is the enclosing element in the Definition File. The following table describes the elements you can include in the ",(0,r.kt)("inlineCode",{parentName:"p"},"<view>")," element:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Element"),(0,r.kt)("th",{parentName:"tr",align:null},"Requred"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The unique name of the view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<name>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"label"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The display label of the view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<label>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"version"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The version of the view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<version>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"min-ambari-version",(0,r.kt)("br",null),"max-ambari-version"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The minimum and maximum Ambari version this view can be deployed with. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<min-ambari-version>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"description"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The description of the view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<description>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"icon"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The 32x32 icon to display for this view. Suggested size is 32x32 and will be displayed as 8x8 and 16x16 as necessary. If this property is not set, a default view framework icon is used.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"icon64"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The 64x64 icon to display for this view. If this property is not set, the 32x32 sized icon will be used.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"permission"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Defines a custom permission for this view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<permission>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"parameter"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Defines a configuration parameter that is used to when creating a view instance. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<parameter>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"resource"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Defines a resource that is exposed by the view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<resource>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"instance"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Defines a static instance of the view. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<instance>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"view-class"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Registers a view class to receive framework events. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<view-class>")," for more information.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"validator-class"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Registers a validator class to receive framework events. See ",(0,r.kt)("inlineCode",{parentName:"td"},"<validator-class>")," for more information.")))),(0,r.kt)("h2",{id:"name"},(0,r.kt)("inlineCode",{parentName:"h2"},"<name>")),(0,r.kt)("p",null,"The unique name of the view. Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<name>MY_COOL_VIEW</name>\n")),(0,r.kt)("h2",{id:"label"},(0,r.kt)("inlineCode",{parentName:"h2"},"<label>")),(0,r.kt)("p",null,"The label of the view. Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<label>My Cool View</label>\n")),(0,r.kt)("h2",{id:"version"},(0,r.kt)("inlineCode",{parentName:"h2"},"<version>")),(0,r.kt)("p",null,"The version of the view. Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<version>0.1.0</version>\n")),(0,r.kt)("h2",{id:"min-ambari-version-max-ambari-version"},(0,r.kt)("inlineCode",{parentName:"h2"},"<min-ambari-version> <max-ambari-version>")),(0,r.kt)("p",null,"The minimum and maximum version of Ambari server that can run this view. Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<min-ambari-version>1.7.0</min-ambari-version>\n<min-ambari-version>1.7.*</min-ambari-version>\n<max-ambari-version>2.0</max-ambari-version>\n")),(0,r.kt)("h2",{id:"description"},(0,r.kt)("inlineCode",{parentName:"h2"},"<description>")),(0,r.kt)("p",null,"The description of the view. Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<description>This view is used to display information.</description>\n\n")),(0,r.kt)("h2",{id:"parameter"},(0,r.kt)("inlineCode",{parentName:"h2"},"<parameter>")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Element"),(0,r.kt)("th",{parentName:"tr",align:null},"Requred"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the configuration parameter.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"description"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The description of the configuration parameter.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"label"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The user friendly name of the configuration parameter (used in the Ambari Administration Interface UI).")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"placeholder"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The placeholder value for the configuration parameter (used in the Ambari Administration Interface UI).")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"default-value"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The default value for the configuration parameter (used in the Ambari Administration Interface UI).")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"required"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"If true, the configuration parameter is required in order to create a view instance.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"masked"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},'Indicated this parameter value is to be "masked" in the Ambari Web UI (i.e. not shown in the clear). Omitting this element default to not-masked. Otherwise, if true, the parameter value will be "masked" in the Web UI.')))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<parameter>\n    <name>someParameter</name>\n    <description>Some parameter this is used to configure an instance of this view</description>\n    <required>false</required>\n</parameter>\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<parameter>\n    <name>name.label.descr.default.place</name>\n    <description>Name, label, description, default and placeholder</description>\n    <label>NameLabelDescDefaultPlace</label>\n    <placeholder>this is placeholder text but you should see default</placeholder>\n    <default-value>youshouldseethisdefault</default-value>\n    <required>true</required>\n</parameter>\n")),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/examples/property-view/docs/index.md"},"Property View Example")," to see the different parameter options in use."),(0,r.kt)("h2",{id:"permission"},(0,r.kt)("inlineCode",{parentName:"h2"},"<permission>")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Element"),(0,r.kt)("th",{parentName:"tr",align:null},"Requred"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The unique name of the permission.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"description"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The description of the permission.")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<permission>\n  <name>SOME_CUSTOM_PERM</name>\n  <description>A custom permission for this view</description>\n</permission>\n<permission>\n  <name>SOME_OTHER_PERM</name>\n  <description>Another custom permission for this view</description>\n</permission>\n")),(0,r.kt)("h2",{id:"resource"},(0,r.kt)("inlineCode",{parentName:"h2"},"<resource>")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Element"),(0,r.kt)("th",{parentName:"tr",align:null},"Requred"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the resource. This will be the resource endpoint name of the view instance.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"plural-name"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The plural name of the resource.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"service-class"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The JAX-RS annotated resource service class.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id-property"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The resource identifier.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"provider-class"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The Ambari ResourceProvider resource class.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"resource-class"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The JavaBean resource class.")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<resource>\n  <name>calculator</name>\n  <service-class>org.apache.ambari.view.proxy.CalculatorResource</service-class>\n</resource>\n")),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/examples/calculator-view/docs/index.md"},"Calculator View Example")," to see a REST service endpoint view implementation."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<resource>\n  <name>city</name>\n  <plural-name>cities</plural-name>\n  <id-property>id</id-property>\n  <resource-class>org.apache.ambari.view.weather.CityResource</resource-class>\n  <provider-class>org.apache.ambari.view.weather.CityResourceProvider</provider-class>\n  <service-class>org.apache.ambari.view.weather.CityService</service-class>\n</resource>\n")),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/examples/weather-view/docs/index.md"},"Weather View Example")," to see an Ambari ResourceProvider view implementation.."),(0,r.kt)("h2",{id:"instance"},(0,r.kt)("inlineCode",{parentName:"h2"},"<instance>")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Element"),(0,r.kt)("th",{parentName:"tr",align:null},"Requred"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The unique name of the view instance.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"label"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The display label of the view instance. If not set, the view definition ",(0,r.kt)("inlineCode",{parentName:"td"},"<label>")," is used.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"description"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"The description of the view instance. If not set, the view definition ",(0,r.kt)("inlineCode",{parentName:"td"},"<description>")," is used.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"visible"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"If true, for the view instance to show up in the users view instance list.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"icon"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Overrides the view icon for this specific view instance.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"icon64"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Overrides the view icon64 for this specific view instance.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"property"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Specifies any necessary configuration parameters for the view instance. See  ",(0,r.kt)("inlineCode",{parentName:"td"},"<property>")," for more information.")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<instance>\n  <name>US_WEST</name>\n  <property>\n    <key>cities</key>\n    <value>Palo Alto, US;Los Angeles, US;Portland, US;Seattle, US</value>\n  </property>\n  <property>\n    <key>units</key>\n    <value>imperial</value>\n  </property>\n</instance>\n")),(0,r.kt)("h2",{id:"property"},(0,r.kt)("inlineCode",{parentName:"h2"},"<property>")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Element"),(0,r.kt)("th",{parentName:"tr",align:null},"Requred"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"key"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The property key (for the configuration parameter to set).")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"value"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"The property value (for the configuration parameter to set).")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<property>\n  <key>units</key>\n  <value>imperial</value>\n</property>\n")),(0,r.kt)("h2",{id:"view-class"},(0,r.kt)("inlineCode",{parentName:"h2"},"<view-class>")),(0,r.kt)("p",null,"Registers a view class to receive framework events. The view class must implement the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/View.java"},"View")," interface."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<view-class>this.is.my.viewclazz</view-class>\n")),(0,r.kt)("h2",{id:"validator-class"},(0,r.kt)("inlineCode",{parentName:"h2"},"<validator-class>")),(0,r.kt)("p",null,"Registers a validator class to receive property and instance validation requests. The validator class must implement the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/validation/Validator.java"},"Validator")," interface."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<validator-class>org.apache.ambari.view.property.MyValidator</validator-class>\n")),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/examples/property-validator-view/docs/index.md"},"Property Validator View Example")," to see view property and instance validation in use."))}d.isMDXComponent=!0}}]);