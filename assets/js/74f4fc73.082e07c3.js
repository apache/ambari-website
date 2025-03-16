"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[5961],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var i=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=i.createContext({}),c=function(e){var t=i.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=c(e.components);return i.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(a),u=n,v=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return a?i.createElement(v,s(s({ref:t},p),{},{components:a})):i.createElement(v,s({ref:t},p))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,s=new Array(r);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var c=2;c<r;c++)s[c]=a[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,a)}m.displayName="MDXCreateElement"},43690:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=a(87462),n=(a(67294),a(3905));const r={},s="Views",o={unversionedId:"ambari-design/views/index",id:"ambari-design/views/index",title:"Views",description:"This capability is currently under development.",source:"@site/docs/ambari-design/views/index.md",sourceDirName:"ambari-design/views",slug:"/ambari-design/views/",permalink:"/docs/next/ambari-design/views/",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/docs/ambari-design/views/index.md",tags:[],version:"current",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Technology Stack",permalink:"/docs/next/ambari-design/technology-stack"},next:{title:"Framework Services",permalink:"/docs/next/ambari-design/views/framework-services"}},l={},c=[{value:"Useful Resources",id:"useful-resources",level:2},{value:"Terminology",id:"terminology",level:2},{value:"Components of a View",id:"components-of-a-view",level:2},{value:"Client-side Assets",id:"client-side-assets",level:3},{value:"Server-side Resources",id:"server-side-resources",level:3},{value:"View Package",id:"view-package",level:2},{value:"Versions and Instances",id:"versions-and-instances",level:2},{value:"Instance Configuration Parameters",id:"instance-configuration-parameters",level:3},{value:"View Lifecycle",id:"view-lifecycle",level:2}],p={toc:c};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"views"},"Views"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"This capability is currently under development.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Ambari Views"),' offer a systematic way to plug-in UI capabilities to surface custom visualization, management and monitoring features in Ambari Web. A " ',(0,n.kt)("strong",{parentName:"p"},"view"),'" is a way of extending Ambari that allows 3rd parties to plug in new resource types along with the APIs, providers and UI to support them. In other words, a view is an application that is deployed into the Ambari container.'),(0,n.kt)("h2",{id:"useful-resources"},"Useful Resources"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Resource"),(0,n.kt)("th",{parentName:"tr",align:null},"Link"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Views Overview"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"http://www.slideshare.net/hortonworks/ambari-views-overview"},"http://www.slideshare.net/hortonworks/ambari-views-overview"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Views Framework API Docs"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/ambari/blob/trunk/ambari-views/docs/index.md"},"https://github.com/apache/ambari/blob/trunk/ambari-views/docs/index.md"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Views Framework Examples"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/ambari/tree/trunk/ambari-views/examples"},"https://github.com/apache/ambari/tree/trunk/ambari-views/examples"))))),(0,n.kt)("h2",{id:"terminology"},"Terminology"),(0,n.kt)("p",null,"The following section describes the basic terminology associated with views."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Term"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"View Name"),(0,n.kt)("td",{parentName:"tr",align:null},"The name of the view. The view name identifies the view to Ambari.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"View Version"),(0,n.kt)("td",{parentName:"tr",align:null},"The version of the view. A unique view name can have multiple versions deployed in Ambari.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"View Package"),(0,n.kt)("td",{parentName:"tr",align:null},"This is the JAR package that contains the ",(0,n.kt)("strong",{parentName:"td"},"view definition")," and all view resources (server-side resources and client-side assets) for a given view version. See ",(0,n.kt)("a",{parentName:"td",href:"#View20%25Package"},"View Package")," for more information on the contents and structure of the package.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"View Definition"),(0,n.kt)("td",{parentName:"tr",align:null},"This defines the view name, version, resources and required/optional configuration parameters for a view. The view definition file is included in the view package. See View Definition for more information on the view definition file syntax and features.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"View Instance"),(0,n.kt)("td",{parentName:"tr",align:null},"An unique instance of a view, that is based on a view definition and specific version that is configured. See Versions and Instances for more information.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"View API"),(0,n.kt)("td",{parentName:"tr",align:null},"The REST API for viewing the list of deployed views and creating view instances. See View API for more information.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Framework Services"),(0,n.kt)("td",{parentName:"tr",align:null},"The server-side of the view framework exposes certain services for use with your views. This includes persistence of view instance data and view eventing. See Framework Services for more information.")))),(0,n.kt)("h2",{id:"components-of-a-view"},"Components of a View"),(0,n.kt)("p",null,"A view can consist of ",(0,n.kt)("strong",{parentName:"p"},"client-side assets")," (i.e. the UI that is exposed in Ambari Web) and ",(0,n.kt)("strong",{parentName:"p"},"server-side resources")," (i.e. the classes that expose REST end points). When the view loads into Ambari Web, the view UI can use the view server-side resources as necessary to deliver the view functionality."),(0,n.kt)("p",null,(0,n.kt)("img",{src:a(91098).Z,title:"Apache Ambari > Views > view-components.jpg",width:"582",height:"196"})),(0,n.kt)("h3",{id:"client-side-assets"},"Client-side Assets"),(0,n.kt)("p",null,"The view does not limit or restrict what client-side technologies a view uses. You can package client-side dependencies (such as JavaScript and CSS frameworks) with your view."),(0,n.kt)("h3",{id:"server-side-resources"},"Server-side Resources"),(0,n.kt)("p",null,"A view can expose resources as REST end points to be used in conjunction with the client-side to deliver the functionality of your view application. Thees resources are written in Java and can be anything from a servlet to a regular REST service to an Ambari ResourceProvider (i.e. a special type of REST service that handles some REST capabilities such as partial response and pagination \u2013 if you adhere to the Ambari ResourceProvider interface). See ",(0,n.kt)("a",{parentName:"p",href:"/docs/next/ambari-design/views/framework-services"},"Framework Services")," for more information on capabilities that the framework exposes on the server-side for views."),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Checkout the ",(0,n.kt)("strong",{parentName:"p"},"Weather View")," as an example of a view that exposes servlet and REST endpoints."),(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/tree/trunk/ambari-views/examples/weather-view"},"https://github.com/apache/ambari/tree/trunk/ambari-views/examples/weather-view"))),(0,n.kt)("h2",{id:"view-package"},"View Package"),(0,n.kt)("p",null,"The assets associated with a view are delivered as a JAR package. The ",(0,n.kt)("strong",{parentName:"p"},"view definition file")," must be at the root of the package. UI assets and server-side classes are served from the root. Dependent Java libraries are placed in the ",(0,n.kt)("inlineCode",{parentName:"p"},"WEB-INF/lib")," directory."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"view.jar\n|\n|- view.xml\n|\n|-\n|\n|- index.html\n| |\n| |_\n|\n|_ WEB-INF\n  |\n  |_ lib/*.jar\n")),(0,n.kt)("h2",{id:"versions-and-instances"},"Versions and Instances"),(0,n.kt)("p",null,"Multiple versions of a given view can be deployed into Ambari and multiple instances of each view can be created for each version. For example, I can have a view named FILES and deploy versions 0.1.0 and 0.2.0. I can then create instances of each version FILES{0.1.0} and FILES{0.2.0} allowing some Ambari users to have an older version of FILES (0.1.0), and other users to have the newer FILES version (0.2.0). I can also create multiple instances for each version, configuring each differently."),(0,n.kt)("p",null,'![](./imgs/view-versions.jpg"Apache Ambari > Views > view-versions.jpg")'),(0,n.kt)("h3",{id:"instance-configuration-parameters"},"Instance Configuration Parameters"),(0,n.kt)("p",null,'As part of a view definition, the instance configuration parameters are specified (i.e. "these parameters are needed to configure an instance of this view"). When you create a view instance, you specify the configuration parameters specific to that instance. Since parameters are scoped to a particular view instance, you can have multiple instances of a view, each instance configured differently.'),(0,n.kt)("p",null,"Using the example above, I can create two instances of the FILES{0.2.0} version, one instance that is configured a certain way and the second that is configured differently. This allows some Ambari users to use FILES one way, and other users a different way."),(0,n.kt)("p",null,"See ",(0,n.kt)("a",{parentName:"p",href:"/docs/next/ambari-design/views/framework-services"},"Framework Services")," for more information on instance configuration properties."),(0,n.kt)("h2",{id:"view-lifecycle"},"View Lifecycle"),(0,n.kt)("p",null,"The lifecycle of a view is shown below. As you deploy a view and create instances of a view, server-side framework events are invoked. See ",(0,n.kt)("a",{parentName:"p",href:"/docs/next/ambari-design/views/framework-services"},"Framework Services")," for more information on capabilities that the framework exposes on the server-side for views."),(0,n.kt)("p",null,(0,n.kt)("img",{src:a(65015).Z,title:"Apache Ambari > Views > view-lifecycle.png",width:"562",height:"230"})))}d.isMDXComponent=!0},91098:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/view-components-7a997189cc9948e0d766b21d9211c5d5.jpg"},65015:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/view-lifecycle-74bbfd87024dfb48f97a04cdb47dbe03.png"}}]);