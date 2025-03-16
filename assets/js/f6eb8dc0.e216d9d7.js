"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[2803],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>p});var o=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,i=function(e,t){if(null==e)return{};var r,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=o.createContext({}),m=function(e){var t=o.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):n(n({},t),e)),r},l=function(e){var t=m(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),h=m(r),p=i,d=h["".concat(c,".").concat(p)]||h[p]||u[p]||a;return r?o.createElement(d,n(n({ref:t},l),{},{components:r})):o.createElement(d,n({ref:t},l))}));function p(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,n=new Array(a);n[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,n[1]=s;for(var m=2;m<a;m++)n[m]=r[m];return o.createElement.apply(null,n)}return o.createElement.apply(null,r)}h.displayName="MDXCreateElement"},63631:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>n,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>m});var o=r(87462),i=(r(67294),r(3905));const a={},n="How to Commit",s={unversionedId:"ambari-dev/how-to-commit",id:"version-2.7.6/ambari-dev/how-to-commit",title:"How to Commit",description:"This document describes how to commit changes to Ambari. It assumes a knowledge of Git. While it is for committers to use as a guide, it also provides contributors an idea of how the commit process actually works.",source:"@site/versioned_docs/version-2.7.6/ambari-dev/how-to-commit.md",sourceDirName:"ambari-dev",slug:"/ambari-dev/how-to-commit",permalink:"/docs/2.7.6/ambari-dev/how-to-commit",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.6/ambari-dev/how-to-commit.md",tags:[],version:"2.7.6",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Coding Guidelines for Ambari",permalink:"/docs/2.7.6/ambari-dev/coding-guidelines-for-ambari"},next:{title:"How to Contribute",permalink:"/docs/2.7.6/ambari-dev/how-to-contribute"}},c={},m=[],l={toc:m};function u(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,o.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"how-to-commit"},"How to Commit"),(0,i.kt)("p",null,"This document describes how to commit changes to Ambari. It assumes a knowledge of Git. While it is for committers to use as a guide, it also provides contributors an idea of how the commit process actually works."),(0,i.kt)("p",null,"In general we are very conservative about changing the Apache Ambari code base. It is ground truth for systems that use it, so we need to make sure that it is reliable. For this reason we use Review Then Commit (RTC) ",(0,i.kt)("a",{parentName:"p",href:"http://www.apache.org/foundation/glossary.html#ReviewThenCommit"},"http://www.apache.org/foundation/glossary.html#ReviewThenCommit")," change policy."),(0,i.kt)("p",null,"Except for some very rare cases any change to the Apache Ambari code base will start off as a Jira. (In some cases a change may relate to more than one Jira. Also, there are cases when a Jira results in multiple commits.) Generally, the process of getting ready to commit when the Jira has a patch associated with it and the contributor decides that it is ready for review and marks it patch available."),(0,i.kt)("p",null,"A committer must sign off on a patch. It is very helpful if the community also reviews the patch, but in the end a committer must take responsibility for the correctness of the patch. If the patch is simple enough and the committer feels confident in the review, a single +1 from a committer is sufficient to commit the patch. (Remember committers cannot review their own patch. If a committer submits a patch, they should make sure that another committer reviews it.)"),(0,i.kt)("p",null,"Follow the instructions in ",(0,i.kt)("a",{parentName:"p",href:"/docs/2.7.6/ambari-dev/how-to-contribute"},"How to Contribute")," guide to commit changes to Ambari."),(0,i.kt)("p",null,"If the Jira is a bug fix you may also need to commit the patch to the latest branch in git (trunk)."))}u.isMDXComponent=!0}}]);