"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[6491],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),l=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=l(r),f=n,b=m["".concat(p,".").concat(f)]||m[f]||c[f]||o;return r?a.createElement(b,i(i({ref:t},u),{},{components:r})):a.createElement(b,i({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},47459:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=r(87462),n=(r(67294),r(3905));const o={},i="Feature Flags",s={unversionedId:"ambari-dev/feature-flags",id:"version-2.7.5/ambari-dev/feature-flags",title:"Feature Flags",description:"Sometimes, we want to have the ability for the end users to experiment with a new feature, but not expose it as a general feature since it has not gone through rigorous testing and use of the feature could result in problems. In other cases, we want to provide an escape hatch for certain edge-case scenarios that we may not want to expose in general because using the escape hatch is potentially dangerous and should only be reserved special occasions. For these purposes, Ambari has a notion of feature flags*.",source:"@site/versioned_docs/version-2.7.5/ambari-dev/feature-flags.md",sourceDirName:"ambari-dev",slug:"/ambari-dev/feature-flags",permalink:"/docs/2.7.5/ambari-dev/feature-flags",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-dev/feature-flags.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Developer Tools",permalink:"/docs/2.7.5/ambari-dev/developer-tools"},next:{title:"Verifying Release Candidate",permalink:"/docs/2.7.5/ambari-dev/verifying-release-candidate"}},p={},l=[],u={toc:l};function c(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,a.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"feature-flags"},"Feature Flags"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Sometimes, we want to have the ability for the end users to experiment with a new feature, but not expose it as a general feature since it has not gone through rigorous testing and use of the feature could result in problems. In other cases, we want to provide an escape hatch for certain edge-case scenarios that we may not want to expose in general because using the escape hatch is potentially dangerous and should only be reserved special occasions. For these purposes, Ambari has a notion of ",(0,n.kt)("strong",{parentName:"p"},"feature flags"),".")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Feature flags can be created as an attribute of App.supports map under ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/blob/trunk/ambari-web/app/config.js"},"https://github.com/apache/ambari/blob/trunk/ambari-web/app/config.js"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Those boolean flags are exposed in the Ambari Web UI via ",(0,n.kt)("inlineCode",{parentName:"p"},"<ambari-server-protocol>://<ambari-server-host>:<ambari-server-port>/#/experimental")),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The end user can go to the above URL to turn certain experimental features on."),(0,n.kt)("p",{parentName:"li"},"  ",(0,n.kt)("img",{src:r(31853).Z,width:"1816",height:"1456"}))))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"In Ambari Web code, we should toggle experimental features on/off via the App.supports object.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},'You will see sample usage if you recursively grep for "App.supports" under the ambari-web project.'))))}c.isMDXComponent=!0},31853:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/experimental-features -c601078b043b95cde54e962adefef089.png"}}]);