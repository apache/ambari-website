"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[5453],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=c(r),d=a,m=f["".concat(l,".").concat(d)]||f[d]||u[d]||o;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},97590:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const o={},i="Hooks",s={unversionedId:"ambari-design/stack-and-services/hooks",id:"version-2.7.5/ambari-design/stack-and-services/hooks",title:"Hooks",description:"A stack can add during the following points in Ambari actions:",source:"@site/versioned_docs/version-2.7.5/ambari-design/stack-and-services/hooks.md",sourceDirName:"ambari-design/stack-and-services",slug:"/ambari-design/stack-and-services/hooks",permalink:"/docs/2.7.5/ambari-design/stack-and-services/hooks",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-design/stack-and-services/hooks.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"FAQ",permalink:"/docs/2.7.5/ambari-design/stack-and-services/faq"},next:{title:"Version functions: conf-select and stack-select",permalink:"/docs/2.7.5/ambari-design/stack-and-services/version-functions-conf-select-and-stack-select"}},l={},c=[],p={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"hooks"},"Hooks"),(0,a.kt)("p",null,"A stack can add during the following points in Ambari actions:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"before ANY"),(0,a.kt)("li",{parentName:"ul"},"before and after INSTALL"),(0,a.kt)("li",{parentName:"ul"},"before RESTART"),(0,a.kt)("li",{parentName:"ul"},"before START")),(0,a.kt)("p",null,"As mentioned in ",(0,a.kt)("a",{parentName:"p",href:"/docs/2.7.5/ambari-design/stack-and-services/stack-inheritance"},"Stack Inheritance"),", the hooks directory if defined in the current stack version replace those from the parent stack version. This means the files included in those directories at the parent level will not be inherited. You will need to copy all the files you wish to keep from that directory structure."),(0,a.kt)("p",null,"The hooks directory should have 5 sub-directories:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"after-INSTALL"),(0,a.kt)("li",{parentName:"ul"},"before-ANY"),(0,a.kt)("li",{parentName:"ul"},"before-INSTALL"),(0,a.kt)("li",{parentName:"ul"},"before-RESTART"),(0,a.kt)("li",{parentName:"ul"},"before-START")),(0,a.kt)("p",null,"Each hook directory can have 3 sub-directories:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"files"),(0,a.kt)("li",{parentName:"ul"},"scripts"),(0,a.kt)("li",{parentName:"ul"},"templates")),(0,a.kt)("p",null,"The scripts directory is the main directory and must be supplied. This must contain a hook.py file. It may contain other python scripts which initialize variables (like a params.py file) or other utility files contain functions used in the hook.py file."),(0,a.kt)("p",null,"The files directory can any non-python files such as scripts, jar or properties files."),(0,a.kt)("p",null,"The templates folder can contain any required j2 files that are used to set up properties files."),(0,a.kt)("p",null,"The hook.py file should extend the Hook class defined in resource_management/libraries/script/hook.py. The naming convention is to name the hook class after the hook folder such as AfterInstallHook if the class is in the after-INSTALL folder. The hook.py file must define the hook(self, env) function. Here is an example hook:"),(0,a.kt)("blockquote",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-py"},'from resource_management.libraries.script.hook import Hook\n \nclass AfterInstallHook(Hook):\n \n  def hook(self, env):\n    import params\n    env.set_params(params)\n    # Call any functions to set up the stack after install\n \nif __name__ == "__main__":\n  AfterInstallHook().execute()\n')))}u.isMDXComponent=!0}}]);