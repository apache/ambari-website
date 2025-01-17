"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8307],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(a),m=n,d=p["".concat(s,".").concat(m)]||p[m]||h[m]||i;return a?r.createElement(d,o(o({ref:t},u),{},{components:a})):r.createElement(d,o({ref:t},u))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var c=2;c<i;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},9778:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const i={},o="Development Process for New Major Features",l={unversionedId:"ambari-dev/development-process-for-new-major-features",id:"version-2.7.6/ambari-dev/development-process-for-new-major-features",title:"Development Process for New Major Features",description:"Goals",source:"@site/versioned_docs/version-2.7.6/ambari-dev/development-process-for-new-major-features.md",sourceDirName:"ambari-dev",slug:"/ambari-dev/development-process-for-new-major-features",permalink:"/docs/ambari-dev/development-process-for-new-major-features",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.6/ambari-dev/development-process-for-new-major-features.md",tags:[],version:"2.7.6",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"Ambari Development",permalink:"/docs/ambari-dev/"},next:{title:"Ambari Code Layout",permalink:"/docs/ambari-dev/ambari-code-layout"}},s={},c=[{value:"Goals",id:"goals",level:2},{value:"Process",id:"process",level:2},{value:"Feature Branches",id:"feature-branches",level:2},{value:"Feature Flags",id:"feature-flags",level:2},{value:"Contribution Flow",id:"contribution-flow",level:2},{value:"Git Feature Branches",id:"git-feature-branches",level:2},{value:"Benefits",id:"benefits",level:3},{value:"Drawbacks",id:"drawbacks",level:3},{value:"Guidelines to Follow",id:"guidelines-to-follow",level:3},{value:"Approach",id:"approach",level:3}],u={toc:c};function h(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"development-process-for-new-major-features"},"Development Process for New Major Features"),(0,n.kt)("h2",{id:"goals"},"Goals"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Make it clear to the community of new feature development happening at a high level"),(0,n.kt)("li",{parentName:"ul"},"Make it easier to correlate features with JIRAs"),(0,n.kt)("li",{parentName:"ul"},"Make it easier to track progress for features in development"),(0,n.kt)("li",{parentName:"ul"},"Make it easier to understand estimated release schedule for features in development")),(0,n.kt)("h2",{id:"process"},"Process"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},'Create a JIRA of type "Epic" for the new feature in ',(0,n.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/AMBARI"},"Apache Ambari JIRA"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add the feature to the ",(0,n.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=30755705"},"Features + Roadmap")," wiki and link it to the Epic created")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The Epic should contain a high-level description that is easy to understand")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"The Epic should also contain the initial, detailed design (this can be in the form of a shared Google Doc for ease of collaboration,Word doc, pdf, etc)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Once the initial design is posted, announce to the dev mailing list to elicit feedback (Subject: ","[DISCUSS]"," ",(0,n.kt)("em",{parentName:"p"},"Epic Name"),". Be sure include a link to the Epic JIRA in the body).It is recommended to ask for review feedback to be given by a certain date so that the review process does not drag on.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Iterate on the design based on community feedback. Incorporate multiple review cycles as needed.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Once the design is finalized, break it down into Tasks that are linked to the Epic")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"(Nice to have) Once the Tasks are defined, schedule them into sprints using the Agile Board so that it's easy to see who is working on what/when, what tasks remain but unassigned so the community can pick up work from the backlog, etc."))),(0,n.kt)("h2",{id:"feature-branches"},"Feature Branches"),(0,n.kt)("p",null,"The use of feature branches allows for the large, potentially destabilizing changes to be made without affecting the stability of the trunk. "),(0,n.kt)("h2",{id:"feature-flags"},"Feature Flags"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Sometimes, we want to have the ability for the users to experiment with a new feature, but not make expose it as a general feature since it has not gone through rigorous testing. In other cases, we want to provide an escape hatch for certain edge-case scenarios that we may not want to expose in general because using the escape hatch is potentially dangerous and should only be reserved special occasions. For these purposes, Ambari has a notion of ",(0,n.kt)("strong",{parentName:"li"},"feature flags"),". Make use of Feature Flags when adding new features that follow under these categories. ",(0,n.kt)("a",{parentName:"li",href:"/docs/ambari-dev/feature-flags"},"Feature Flags")," has more details on this.")),(0,n.kt)("h2",{id:"contribution-flow"},"Contribution Flow"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1hz7qjGKkNeckMibEs67ZmAa2kxjie0zkG6H_IiC2RgA/edit?pli=1"},"https://docs.google.com/document/d/1hz7qjGKkNeckMibEs67ZmAa2kxjie0zkG6H_IiC2RgA/edit?pli=1")),(0,n.kt)("h2",{id:"git-feature-branches"},"Git Feature Branches"),(0,n.kt)("p",null,"The Git feature branch workflow is a simple, yet powerful way to develop new features in an encapsulated environment while at the same time fostering collaboration within the community. The idea is create short-lived branches where new development will take place and eventually merge the completed feature branch back into ",(0,n.kt)("inlineCode",{parentName:"p"},"trunk"),". A short-lived branch could mean anywhere from several days to several months depending on the extent of the feature and how often the branch is merged back into ",(0,n.kt)("inlineCode",{parentName:"p"},"trunk"),"."),(0,n.kt)("p",null,"Feature branches are also useful for changes which are not necessarily considered to be new features. They can be for proof-of-concept changes or architectural changes which have the likelihood of destabilizing ",(0,n.kt)("inlineCode",{parentName:"p"},"trunk"),"."),(0,n.kt)("h3",{id:"benefits"},"Benefits"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Allows incremental work to proceed without destabilizing the main trunk of source control.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Smaller commits means smaller and clearer code reviews.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Each code review is not required to be fully functional allowing a more agile approach to gathering feedback on the progress of the feature.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Maintains Git history and allows for code to be backed out easily after merging."))),(0,n.kt)("h3",{id:"drawbacks"},"Drawbacks"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Requires frequent merges from ",(0,n.kt)("inlineCode",{parentName:"p"},"trunk")," into your feature branch to keep merge conflicts to a minimum.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"May require periodic merges of the feature branch back into trunk during development to help mitigate frequent merge conflicts.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"No continuous integration coverage on feature branches. Although this is not really a drawback since most feature branches will break some aspects of CI in the early stages of the feature."))),(0,n.kt)("h3",{id:"guidelines-to-follow"},"Guidelines to Follow"),(0,n.kt)("p",null,"The following simple rules can help in keeping Ambari's approach to feature branch development simple and consistent."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"When creating a feature branch, it should be given a meaningful name. Acceptable names include either the name of the feature or the name of the Ambari JIRA. The branch should also always start with the text ",(0,n.kt)("inlineCode",{parentName:"p"},"branch-feature-"),". Some examples of properly named feature branches include:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"branch-feature-patch-upgrades")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"branch-feature-AMBARI-12345")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Every commit in your feature branch should have an associated ",(0,n.kt)("inlineCode",{parentName:"p"},"AMBARI-XXXXX")," JIRA. This way, when your branch is merged back into trunk, the commit history follows Ambari's conventions.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Merge frequently from trunk into your branch to keep your branch up-to-date and lessen the number of potential merge conflicts.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Do ",(0,n.kt)("strong",{parentName:"p"},"NOT")," squash commits. Every commit in your feature branch must have an ",(0,n.kt)("inlineCode",{parentName:"p"},"AMBARI-XXXXX")," association with it."))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Once a feature has been completed and the branch has been merged into trunk, the branch can be safely removed. Feature branches should only exist while the work is still in progress.")),(0,n.kt)("h3",{id:"approach"},"Approach"),(0,n.kt)("p",null,"The following steps outline the lifecycle of a feature branch. You'll notice that once the feature has been completed and merged back into trunk, the feature branch is deleted. This is an important step to keep the git branch listing as clean as possible."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"$ git checkout -b branch-feature-AMBARI-12345 trunk\nSwitched to a new branch 'branch-feature-AMBARI-12345'\n\n$ git push -u origin branch-feature-AMBARI-12345\nTotal 0 (delta 0), reused 0 (delta 0)\nTo https://git-wip-us.apache.org/repos/asf/ambari.git\n * [new branch]      branch-feature-AMBARI-12345 -> branch-feature-AMBARI-12345\nBranch branch-feature-AMBARI-12345 set up to track remote branch branch-feature-AMBARI-12345 from origin by rebasing.\n\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Branch is correctly named"),(0,n.kt)("li",{parentName:"ul"},"Branch is pushed to Apache so it can be visible to other developers")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"$ git checkout -b branch-feature-AMBARI-12345 trunk\nSwitched to a new branch 'branch-feature-AMBARI-12345'\n\n$ git add\n$ git commit -m 'AMBARI-28375 - Some Change (me)'\n\n$ git add\n$ git commit -m 'AMBARI-28499 - Another Change (me)'\n\n$ git push\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Each commit to the feature branch has its own AMBARI-XXXXX JIRA"),(0,n.kt)("li",{parentName:"ul"},"Multiple commits are allowed before pushing the changes to the feature branch")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"$ git checkout branch-feature-AMBARI-12345\nSwitched to branch 'branch-feature-AMBARI-18456'\n\n$ git merge trunk\nUpdating ed28ff4..3ab2a7c\nFast-forward\n ambari-server/include.xml | 0\n 1 file changed, 0 insertions(+), 0 deletions(-)\n create mode 100644 ambari-server/include.xml\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Merging trunk into the feature branch often (daily, hourly) allows for faster and easier merge conflict resolution"),(0,n.kt)("li",{parentName:"ul"},'Fast-forwards are OK here since trunk is always the source of truth and we don\'t need extra "merge" commits in the feature branch')),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"$ git checkout trunk\nSwitched to branch 'trunk'\n\n$ git merge --no-ff branch-feature-AMBARI-12345\nUpdating ed28ff4..3ab2a7c\n ambari-server/include.xml | 0\n 1 file changed, 0 insertions(+), 0 deletions(-)\n create mode 100644 ambari-server/include.xml\n")),(0,n.kt)("p",null,"Notice that the ",(0,n.kt)("inlineCode",{parentName:"p"},"--no-ff")," option was provided when merging back into ",(0,n.kt)("inlineCode",{parentName:"p"},"trunk"),'. This is to ensure that an additional "merge" commit is created which references all feature branch commits. With this single merge commit, the entire merge can be easily backed out if a problem was discovered which destabilized trunk.'),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},'The feature is merged successfully with a "merge" commit back to trunk'),(0,n.kt)("li",{parentName:"ul"},"This can be done multiple times during the course of the feature development as long as the code merged back to trunk is stable")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"$ git checkout trunk\nSwitched to branch 'trunk'\n\n$ git branch -d branch-feature-AMBARI-12345\nDeleted branch branch-feature-AMBARI-12345 (was ed28ff4).\n\n$ git push origin --delete branch-feature-AMBARI-12345\nTo https://git-wip-us.apache.org/repos/asf/ambari.git\n - [deleted]         branch-feature-AMBARI-12345\n\n$ git remote update origin --prune\nFetching origin\nFrom https://git-wip-us.apache.org/repos/asf/ambari\n x [deleted]         (none)     -> branch-feature-AMBARI-56789\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Cleanup the branch when done, both locally and remotely"),(0,n.kt)("li",{parentName:"ul"},"Prune your local branches which no longer track remote branches")))}h.isMDXComponent=!0}}]);