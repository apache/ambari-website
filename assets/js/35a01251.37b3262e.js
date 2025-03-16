"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8746],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),u=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(a),m=n,d=p["".concat(l,".").concat(m)]||p[m]||h[m]||o;return a?r.createElement(d,i(i({ref:t},c),{},{components:a})):r.createElement(d,i({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var u=2;u<o;u++)i[u]=a[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},38037:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=a(87462),n=(a(67294),a(3905));const o={},i="How to Contribute",s={unversionedId:"ambari-dev/how-to-contribute",id:"version-2.7.5/ambari-dev/how-to-contribute",title:"How to Contribute",description:"Contributing code changes",source:"@site/versioned_docs/version-2.7.5/ambari-dev/how-to-contribute.md",sourceDirName:"ambari-dev",slug:"/ambari-dev/how-to-contribute",permalink:"/docs/2.7.5/ambari-dev/how-to-contribute",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-2.7.5/ambari-dev/how-to-contribute.md",tags:[],version:"2.7.5",frontMatter:{},sidebar:"ambariSidebar",previous:{title:"How to Commit",permalink:"/docs/2.7.5/ambari-dev/how-to-commit"},next:{title:"Code Review Guidelines",permalink:"/docs/2.7.5/ambari-dev/code-review-guidelines"}},l={},u=[{value:"Contributing code changes",id:"contributing-code-changes",level:2},{value:"Checkout source code",id:"checkout-source-code",level:3},{value:"Keep your Fork Up to Date",id:"keep-your-fork-up-to-date",level:3},{value:"JIRA",id:"jira",level:3},{value:"Pull Request",id:"pull-request",level:3},{value:"Commit and Push changes",id:"commit-and-push-changes",level:4},{value:"Create Pull Request",id:"create-pull-request",level:4},{value:"Jenkins Job",id:"jenkins-job",level:4},{value:"Repeat",id:"repeat",level:4},{value:"Review Process",id:"review-process",level:2},{value:"Apache Ambari Committers",id:"apache-ambari-committers",level:2}],c={toc:u};function h(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,r.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"how-to-contribute"},"How to Contribute"),(0,n.kt)("h2",{id:"contributing-code-changes"},"Contributing code changes"),(0,n.kt)("h3",{id:"checkout-source-code"},"Checkout source code"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Fork the project from Github at ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/ambari"},"https://github.com/apache/ambari")," if you haven't already "),(0,n.kt)("li",{parentName:"ul"},"Clone this fork: ")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"# Replace [forked-repository-url] with your git clone url\ngit clone [forked-repository-url] ambari\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Set upstream remote:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"cd ambari\ngit remote add upstream https://github.com/apache/ambari.git\n")),(0,n.kt)("h3",{id:"keep-your-fork-up-to-date"},"Keep your Fork Up to Date"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"# Fetch from upstream remote\ngit fetch upstream\n# Checkout the branch that needs to sync\ngit checkout trunk\n# Merge with remote\ngit merge upstream/trunk\n")),(0,n.kt)("p",null,"Repeat these steps for all the branches that needs to be synced with the remote."),(0,n.kt)("h3",{id:"jira"},"JIRA"),(0,n.kt)("p",null,"Apache Ambari uses JIRA to track issues including bugs and improvements, and uses Github pull requests to manage code reviews and code merges. Major design changes are discussed in JIRA and implementation changes are discussed in pull requests after a pull request is created."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Find an existing Apache JIRA that the change pertains to"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Do not create a new JIRA if the change is minor and relates to an existing JIRA; add to the existing discussion and work instead"),(0,n.kt)("li",{parentName:"ul"},"Look for existing pull requests that are linked from the JIRA, to understand if someone is already working on the JIRA"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"If the change is new, then create a new JIRA:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Provide a descriptive Title"),(0,n.kt)("li",{parentName:"ul"},"Write a detailed Description. For bug reports, this should ideally include a short reproduction of the problem. For new features, it may include a design document."),(0,n.kt)("li",{parentName:"ul"},"Fill the required fields:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Issue Type. Bug and Task are the most frequently used issue types in Ambari."),(0,n.kt)("li",{parentName:"ul"},"Priority. Their meaning is roughly:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Blocker: pointless to release without this change as the release would be unusable to a large minority of users"),(0,n.kt)("li",{parentName:"ul"},"Critical: a large minority of users are missing important functionality without this, and/or a workaround is difficult"),(0,n.kt)("li",{parentName:"ul"},"Major: a small minority of users are missing important functionality without this, and there is a workaround"),(0,n.kt)("li",{parentName:"ul"},"Minor: a niche use case is missing some support, but it does not affect usage or is easily worked around"),(0,n.kt)("li",{parentName:"ul"},"Trivial: a nice-to-have change but unlikely to be any problem in practice otherwise"))),(0,n.kt)("li",{parentName:"ul"},"Component. Choose the components that are affected by this change. Choose from Ambari Components"),(0,n.kt)("li",{parentName:"ul"},"Affects Version. For Bugs, assign at least one version that is known to exhibit the problem or need the change"))),(0,n.kt)("li",{parentName:"ul"},"Do not include a patch file; pull requests are used to propose the actual change.")))),(0,n.kt)("h3",{id:"pull-request"},"Pull Request"),(0,n.kt)("p",null,"Apache Ambari uses ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari/pulls"},"Github pull requests")," to review and merge changes to the source code. Before creating a pull request, one must have a fork of apache/ambari checked out. Follow instructions in step 1 to create a fork if you haven't already."),(0,n.kt)("h4",{id:"commit-and-push-changes"},"Commit and Push changes"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Create a branch AMBARI-XXXXX-branchName before starting to make any code changes. Ex: If the Fix Version of the JIRA you are working on is 2.6.2, then create a branch based on branch-2.6"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"git checkout branch-2.6\ngit pull upstream branch-2.6\ngit checkout -b AMBARI-XXXXX-branch-2.6\n"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},'Mark the status of the related JIRA as "In Progress" to let others know that you have started working on the JIRA.')),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Make changes to the code and commit them to the newly created branch.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Run all the tests that are applicable and make sure that all unit tests pass")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Push your changes. Provide your Github user id and ",(0,n.kt)("a",{parentName:"p",href:"https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/"},"personal access token")," when asked for user name and password "),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"git push origin AMBARI-XXXXX-branch-2.6\n")))),(0,n.kt)("h4",{id:"create-pull-request"},"Create Pull Request"),(0,n.kt)("p",null,"Navigate to your fork in Github and ",(0,n.kt)("a",{parentName:"p",href:"https://help.github.com/articles/creating-a-pull-request-from-a-fork/"},"create a pull request"),". The pull request needs to be opened against the branch you want the patch to land."),(0,n.kt)("p",null,"The pull request title should be of the form ",(0,n.kt)("strong",{parentName:"p"},"[AMBARI-xxxx]"," Title"),", where AMBARI-xxxx is the relevant JIRA number"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"If the pull request is still a work in progress, and so is not ready to be merged, but needs to be pushed to Github to facilitate review, then add ",(0,n.kt)("strong",{parentName:"li"},"[WIP]")," after the ",(0,n.kt)("strong",{parentName:"li"},"AMBARI-XXXX")),(0,n.kt)("li",{parentName:"ul"},"Consider identifying committers or other contributors who have worked on the code being changed. Find the file(s) in Github and click \u201cBlame\u201d to see a line-by-line annotation of who changed the code last. You can add @username in the PR description or as a comment to request review from a developer."),(0,n.kt)("li",{parentName:"ul"},'Note: Contributors do not have access to edit or add reviewers in the "Reviewers" widget. Contributors can only @mention to get the attention of committers. '),(0,n.kt)("li",{parentName:"ul"},'The related JIRA will automatically have a link to the PR as shown below. Mark the status of JIRA as "Patch Available" manually.')),(0,n.kt)("p",null,(0,n.kt)("img",{src:a(6308).Z,width:"1862",height:"812"})),(0,n.kt)("h4",{id:"jenkins-job"},"Jenkins Job"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"A Jenkins Job is configured to be triggered everytime a new pull request is created. The job is configured to perform the following tasks:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Validate the merge"),(0,n.kt)("li",{parentName:"ul"},"Build Ambari"),(0,n.kt)("li",{parentName:"ul"},"Run unit tests"))),(0,n.kt)("li",{parentName:"ul"},"It reports the outcome of the build as an integrated check in the pull request as shown below.")),(0,n.kt)("p",null,(0,n.kt)("img",{src:a(57970).Z,width:"1480",height:"530"})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"It is the responsibility of the contributor of the pull request to make sure that the build passes. Pull requests should not be merged if the Jenkins job fails to validate the merge."),(0,n.kt)("li",{parentName:"ul"},'To re-trigger the build job, just comment "retest this please" in the PR. Visit this page to check the latest build jobs.')),(0,n.kt)("h4",{id:"repeat"},"Repeat"),(0,n.kt)("p",null,"Repeat the above steps for patches that needs to land in multiple branches. Ex: If a patch needs to be committed to branches branch-2.6 and trunk, then you need to create two branches and open two pull requests by following the above steps."),(0,n.kt)("h2",{id:"review-process"},"Review Process"),(0,n.kt)("p",null,"Ambari uses Github for code reviews. All committers are required to follow the instructions in this ",(0,n.kt)("a",{parentName:"p",href:"https://gitbox.apache.org/setup/"},"page")," and link their github accounts with gitbox to gain Merge access to ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/ambari"},"apache/ambari")," in github."),(0,n.kt)("p",null,"To try out the changes locally, you can checkout the pull request locally by following the instructions in this ",(0,n.kt)("a",{parentName:"p",href:"https://help.github.com/articles/checking-out-pull-requests-locally/"},"guide"),"."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Other reviewers, including committers can try out the changes locally and either approve or give their comments as suggestions on the pull request by submitting a review on the pull request. More help can be found here."),(0,n.kt)("li",{parentName:"ul"},"If more changes are required, reviewers are encouraged to leave their comments on the lines of code that require changes. The author of the pull request can then update the code and push another commit to the same branch to update the pull request and notify the committers."),(0,n.kt)("li",{parentName:"ul"},'The pull request can be merged if atleast one committer has approved it or commented "LGTM" which means "Looks Good To Me" and the jenkins job validated the merge successfully. If you comment LGTM you will be expected to help with bugs or follow-up issues on the patch. (Remember committers cannot review their own patch. If a committer opens a PR, they should make sure that another committer reviews it.)'),(0,n.kt)("li",{parentName:"ul"},"Sometimes, other changes might be merged which conflict with the pull request\u2019s changes. The PR can\u2019t be merged until the conflict is resolved. This can be resolved by running ",(0,n.kt)("strong",{parentName:"li"},"git fetch")," upstream followed by git rebase ",(0,n.kt)("strong",{parentName:"li"},"upstream/","[branch-name]")," and resolving the conflicts by hand, then pushing the result to your branch."),(0,n.kt)("li",{parentName:"ul"},'If a PR is merged, promptly close the PR and resolve the JIRA as "Fixed".')),(0,n.kt)("h2",{id:"apache-ambari-committers"},"Apache Ambari Committers"),(0,n.kt)("p",null,"Please read more on Apache Committers at: ",(0,n.kt)("a",{parentName:"p",href:"http://www.apache.org/dev/committers.html"},"http://www.apache.org/dev/committers.html")),(0,n.kt)("p",null,"In general a contributor that makes sustained, welcome contributions to the project may be invited to become a committer, though the exact timing of such invitations depends on many factors. Sustained contributions over 6 months is a welcome sign of contributor showing interest in the project. A contributor receptive to feedback and following development guidelines stated above is a good sign for being a committer to the project. We have seen contributors contributing 20-30 patches become committers but again this is very subjective and can vary on the patches submitted to the project. Ultimately it is the Ambari PMC that suggests and votes for committers in the project."))}h.isMDXComponent=!0},57970:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/jenkins-job-746391c8fc8fa38c0972eae1f430235e.png"},6308:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/pull-request-11e69b4f41b113947410baee635d365a.png"}}]);