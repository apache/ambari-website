"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[6930],{28453:(e,a,n)=>{n.d(a,{R:()=>t,x:()=>o});var r=n(96540);const i={},s=r.createContext(i);function t(e){const a=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(s.Provider,{value:a},e.children)}},89817:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>t,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"ambari-dev/releasing-ambari","title":"Releasing Ambari","description":"Useful Links","source":"@site/versioned_docs/version-3.0.0/ambari-dev/releasing-ambari.md","sourceDirName":"ambari-dev","slug":"/ambari-dev/releasing-ambari","permalink":"/docs/ambari-dev/releasing-ambari","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-dev/releasing-ambari.md","tags":[],"version":"3.0.0","frontMatter":{},"sidebar":"ambariSidebar","previous":{"title":"Code Review Guidelines","permalink":"/docs/ambari-dev/code-review-guidelines"},"next":{"title":"Admin View (ambari-admin) Development","permalink":"/docs/ambari-dev/admin-view-ambari-admin-development"}}');var i=n(74848),s=n(28453);const t={},o="Releasing Ambari",c={},h=[{value:"Useful Links",id:"useful-links",level:2},{value:"Publishing Maven Artifacts",id:"publishing-maven-artifacts",level:3},{value:"Apache Release Guidelines",id:"apache-release-guidelines",level:3},{value:"Preparing for release",id:"preparing-for-release",level:2},{value:"Creating Release Candidate",id:"creating-release-candidate",level:2},{value:"Voting on Release Candidate",id:"voting-on-release-candidate",level:2},{value:"Publishing and Announcement",id:"publishing-and-announcement",level:2},{value:"Publish Ambari artifacts to Maven central",id:"publish-ambari-artifacts-to-maven-central",level:2}];function l(e){const a={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.header,{children:(0,i.jsx)(a.h1,{id:"releasing-ambari",children:"Releasing Ambari"})}),"\n",(0,i.jsx)(a.h2,{id:"useful-links",children:"Useful Links"}),"\n",(0,i.jsx)(a.h3,{id:"publishing-maven-artifacts",children:(0,i.jsx)(a.a,{href:"http://apache.org/dev/publishing-maven-artifacts.html",children:"Publishing Maven Artifacts"})}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Setting up release signing keys"}),"\n",(0,i.jsx)(a.li,{children:"Uploading artifacts to staging and release repositories"}),"\n"]}),"\n",(0,i.jsx)(a.h3,{id:"apache-release-guidelines",children:(0,i.jsx)(a.a,{href:"http://www.apache.org/legal/release-policy.html",children:"Apache Release Guidelines"})}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Release requirements"}),"\n",(0,i.jsx)(a.li,{children:"Process for staging"}),"\n"]}),"\n",(0,i.jsx)(a.h2,{id:"preparing-for-release",children:"Preparing for release"}),"\n",(0,i.jsx)(a.p,{children:"Setup for first time release managers"}),"\n",(0,i.jsx)(a.p,{children:"If you are being a release manager for the first time, you will need to run the following additional steps so that you are not blocked during the actual release process."}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Configure SSH/SFTP to home.apache.org"})}),"\n",(0,i.jsx)(a.p,{children:"SFTP to home.apache.org supports only Key-Based SSH Logins"}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"# Generate RSA Keys\n mkdir ~/.ssh\n chmod 700 ~/.ssh\n ssh-keygen -t rsa -b 4096\n\n# Note: This will create ~/.ssh/id_rsa and ~/.ssh/id_rsa.pub files will be generated\n\n# Upload Public RSA Key\nLogin at http://id.apache.org\nAdd Public SSH Key to your profile from ~/.ssh/id_rsa.pub\nSSH Key (authorized_keys line):\nSubmit changes\n\n# Verify SSH to minotaur.apache.org works\nssh -i ~/.ssh/id_rsa {username}@minotaur.apache.org\n\n# SFTP to home.apache.org\nsftp {username}@home.apache.org\nmkdir public_html\ncd public_html\nput test #This test file is a sample empty file present in current working directory from which you sftp.\n\nVerify URL http://home.apache.org/{username}/test\n"})}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Generate OpenGPG Key"})}),"\n",(0,i.jsx)(a.p,{children:"You should get a signing key, keep it in a safe place, upload the public key to apache, and build a web of trust."}),"\n",(0,i.jsxs)(a.p,{children:["Ref: ",(0,i.jsx)(a.a,{href:"http://zacharyvoase.com/2009/08/20/openpgp/",children:"http://zacharyvoase.com/2009/08/20/openpgp/"})]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"gpg2 --gen-key\ngpg2 --keyserver pgp.mit.edu --send-key {key}\ngpg2 --armor --export {username}@apache.org > {username}.asc\nCopy over {username}.asc to {username}@home.apache.org:public_html/~{username}.asc\nVerify URL http://home.apache.org/~{username}/{username}.asc\nQuery PGP KeyServer http://pgp.mit.edu:11371/pks/lookup?search=0x{key}&op=vindex\n\nWeb of Trust:\nRequest others to sign your PGP key.\n\nLogin at http://id.apache.org\nAdd OpenPGP Fingerprint to your profile\nOpenPGP Public Key Primary Fingerprint: XXXX YYYY ZZZZ ....\nSubmit changes\nVerify that the public PGP key is exported to http://home.apache.org/keys/committer/{username}.asc\n"})}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsxs)(a.strong,{children:["Email ",(0,i.jsx)(a.a,{href:"mailto:dev@ambari.apache.org",children:"dev@ambari.apache.org"})," mailing list notifying that you will be creating the release branch at least one week in advance"]})}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"Subject: Preparing Ambari X.Y.Z branch\n\nHi developers and PMCs,\n\nI am proposing cutting a new branch branch-X.Y for Ambari X.Y.Z on __________  as per the outlined tasks in the Ambari Feature + Roadmap page (https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=30755705).\n\nAfter making the branch, we (i.e., development community) should only accept blocker or critical bug fixes into the branch and harden it until it meets a high enough quality bar.\n\nIf you have a bug fix, it should first be committed to trunk, and after ensuring that it does not break any tests (including smoke tests), then it should be integrated to the Ambari branch-X.Y\nIf you have any doubts whether a fix should be committed into branch-X.Y, please email me for input at ____________\nStay tuned for updates on the release process.\n\nThanks\n"})}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Create the release branch"})}),"\n",(0,i.jsx)(a.p,{children:"Create a branch for a release using branch-X.Y (ex: branch-2.1) as the name of the branch."}),"\n",(0,i.jsx)(a.p,{children:"Note: Going forward, we should be creating branch-[majorVersion].[minorVersion], so that the same branch can be used for maintenance releases."}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Checkout the release branch"})}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"git checkout branch-X.Y\n"})}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Update Ambari REST API docs"})}),"\n",(0,i.jsxs)(a.p,{children:["Starting with Ambari's ",(0,i.jsx)(a.code,{children:"<span>trunk</span>"})," branch as of Ambari 2.8, the release manager should generate documentation from existing source code. The documentation should be checked back into the branch before performing the release."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"# Generate the following artifacts:\n# - Configuration markdown at docs/configuration/index.md\n# - swagger.json and index.html at docs/api/generated/\ncd ambari-server/\nmvn clean compile exec:java@configuration-markdown test -Drat.skip -Dcheckstyle.skip -DskipTests -Dgenerate.swagger.resources\n\n# Review and Commit the changes to branch-X.Y\ngit commit\n"})}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Update release version"})}),"\n",(0,i.jsx)(a.p,{children:"Once the branch has been created, the release version must be set and committed. The changes should be committed to the release branch."}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Ambari 2.8+"})}),"\n",(0,i.jsxs)(a.p,{children:["Starting with Ambari 2.8, the build process relies on ",(0,i.jsx)(a.a,{href:"https://maven.apache.org/maven-ci-friendly.html",children:"Maven 3.5+ which allows the"})," ",(0,i.jsxs)(a.a,{href:"https://maven.apache.org/maven-ci-friendly.html",children:["use of the ",(0,i.jsx)(a.code,{children:"${revision}"})," tag"]}),". This means that the release version can be defined once in the root ",(0,i.jsx)(a.code,{children:"pom.xml"})," and then inherited by all submodules. In order to build Ambari with a specific build number, there are two methods:"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"mvn -Drevision=2.8.0.0.0 ...\nEditing the root pom.xml to include the new build number\n<revision>2.8.0.0-SNAPSHOT</revision>\n"})}),"\n",(0,i.jsxs)(a.p,{children:["To be consistent with prior releases, the ",(0,i.jsx)(a.code,{children:"pom.xml"})," should be updated in order to contain the new version."]}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Steps followed for 2.8.0 release as a reference"})}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"# Update the revision property to the release version\nmvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0\n\n# Remove .versionsBackup files\ngit clean -f -x\n\n# Review and commit the changes to branch-X.Y\ngit commit\n"})}),"\n",(0,i.jsxs)(a.admonition,{title:"Ambari 2.7 and Earlier Releases (Deprecated) :::",type:"danger",children:[(0,i.jsxs)(a.p,{children:["Older Ambari branches still required that you update every ",(0,i.jsx)(a.code,{children:"pom.xml"})," manually through the below process:"]}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Steps followed for 2.2.0 release as a reference"})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:'# Update the release version\nmvn versions:set -DnewVersion=2.2.0.0.0\npushd ambari-metrics\nmvn versions:set -DnewVersion=2.2.0.0.0\npopd\npushd contrib/ambari-log4j\nmvn versions:set -DnewVersion=2.2.0.0.0\npopd\npushd contrib/ambari-scom\nmvn versions:set -DnewVersion=2.2.0.0.0\npopd\npushd docs\nmvn versions:set -DnewVersion=2.2.0.0.0\npopd\n\n# Update the ambari.version properties in all pom.xml\n$ find . -name "pom.xml" | xargs grep "ambari\\.version"\n\n./contrib/ambari-scom/ambari-scom-server/pom.xml:        2.1.0-SNAPSHOT\n./contrib/ambari-scom/ambari-scom-server/pom.xml:            ${ambari.version}\n./contrib/views/hive/pom.xml:    2.1.0.0.0\n./contrib/views/jobs/pom.xml:        ${ambari.version}\n./contrib/views/pig/pom.xml:    2.1.0.0.0\n./contrib/views/pom.xml:    2.1.0.0.0\n./contrib/views/storm/pom.xml:      ${ambari.version}\n./contrib/views/tez/pom.xml:      ${ambari.version}\n./docs/pom.xml:        2.1.0\n./docs/pom.xml:        ${project.artifactId}-${ambari.version}\n\n# Update any 2.1.0-SNAPSHOT references in pom.xml\n$ grep -r --include "pom.xml" "2.1.0-SNAPSHOT" .\n\n# Remove .versionsBackup files\ngit clean -f -x -d\n\n# Review and commit the changes to branch-X.Y\ngit commit\n'})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Update KEYS"})}),(0,i.jsxs)(a.p,{children:["If this is the first time you have taken release management responsibilities, make sure to update the KEYS file and commit the updated KEYS in both the ambari trunk branch and the release branch. Also in addition to updating the KEYS file in the tree, you also need to p ush the KEYS file to ",(0,i.jsx)(a.a,{href:"https://dist.apache.org/repos/dist/release/ambari/",children:"https://dist.apache.org/repos/dist/release/ambari/"})]}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"gpg2 --list-keys jluniya@apache.org >> KEYS\ngpg2 --armor --export jluniya@apache.org >> KEYS\n\n# commit the changes to both trunk and new release branch\ngit commit\n\n# push the updated KEYS file to https://dist.apache.org/repos/dist/release/ambari/.\n\n# Only PMCs members can do this 'svn' step.\n\nsvn co https://dist.apache.org/repos/dist/release/ambari ambari_svn\ncp {path_to_keys_file}/KEYS ambari_svn/KEYS\nsvn update KEYS\nsvn commit -m \"Updating KEYS for Ambari\"\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Setup Build"})}),(0,i.jsxs)(a.p,{children:["Setup Jenkins Job for the new branch on ",(0,i.jsx)(a.a,{href:"http://builds.apache.org",children:"http://builds.apache.org"})]}),(0,i.jsx)(a.h2,{id:"creating-release-candidate",children:"Creating Release Candidate"}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"Note: The first release candidate is rc0. The following documented process assumes rc0, but replace it with the appropriate rc number as required.\n\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Checkout the release branch"})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"git checkout branch-X.Y\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Create a Release Tag from the release branch"})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"git tag -a release-X.Y.Z-rc0 -m 'Ambari X.Y.Z RC0'\ngit push origin release-X.Y.Z-rc0\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Create a tarball"})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"# create a clean copy of the source\n cd ambari-git-X.Y.Z\n git clean -f -x -d\n cd ..\n\n cp -R ambari-git-X.Y.Z apache-ambari-X.Y.Z-src\n\n # create ambari-web/public by running the build instructions per https://cwiki.apache.org/confluence/display/AMBARI/Ambari+Development\n # once ambari-web/public is created, copy it as ambari-web/public-static\n cp -R ambari-git-X.Y.Z/ambari-web/public apache-ambari-X.Y.Z-src/ambari-web/public-static\n\n # make sure apache rat tool runs successfully\n cp -R apache-ambari-X.Y.Z-src apache-ambari-X.Y.Z-ratcheck\n cd apache-ambari-X.Y.Z-ratcheck\n mvn clean apache-rat:check\n cd ..\n\n # if rat check fails, file JIRAs and fix them before proceeding.\n\n # tar it up, but exclude git artifacts\n tar --exclude=.git --exclude=.gitignore --exclude=.gitattributes -zcvf apache-ambari-X.Y.Z-src.tar.gz apache-ambari-X.Y.Z-src\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Sign the tarball"})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"gpg2  --armor --output apache-ambari-X.Y.Z-src.tar.gz.asc --detach-sig apache-ambari-X.Y.Z-src.tar.gz\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Generate SHA512 checksums:"})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"sha512sum apache-ambari-X.Y.Z-src.tar.gz > apache-ambari-X.Y.Z-src.tar.gz.sha512\n"})}),(0,i.jsx)(a.p,{children:"or"}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"openssl sha512 apache-ambari-X.Y.Z-src.tar.gz > apache-ambari-X.Y.Z-src.tar.gz.sha512\n"})}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Upload the artifacts to your apache home:"})}),(0,i.jsx)(a.p,{children:"The artifacts then need to be copied over (SFTP) to"}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"public_html/apache-ambari-X.Y.Z-rc0\n"})}),(0,i.jsx)(a.h2,{id:"voting-on-release-candidate",children:"Voting on Release Candidate"}),(0,i.jsx)(a.p,{children:(0,i.jsxs)(a.strong,{children:["Call for a vote on the ",(0,i.jsx)(a.a,{href:"mailto:dev@ambari.apache.org",children:"dev@ambari.apache.org"})," mailing list with something like this:"]})}),(0,i.jsx)(a.p,{children:"I have created an ambari-** release candidate."}),(0,i.jsx)(a.p,{children:"GIT source tag (r***)"}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"https://git-wip-us.apache.org/repos/asf/ambari/repo?p=ambari.git;a=log;h=refs/tags/release-x.y.z-rc0\n"})}),(0,i.jsxs)(a.p,{children:["Staging site: ",(0,i.jsx)(a.a,{href:"http://home.apache.org/user_name/apache-ambari-X.Y.Z-rc0",children:"http://home.apache.org/user_name/apache-ambari-X.Y.Z-rc0"})]}),(0,i.jsx)(a.p,{children:"Vote will be open for 72 hours."}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"[ ] +1 approve\n[ ] +0 no opinion\n[ ] -1 disapprove (and reason why)\n"})}),(0,i.jsxs)(a.p,{children:['Once the vote passes/fails, send out an email with subject like "[RESULT] [VOTE] Apache Ambari x.y.z rc0" to ',(0,i.jsx)(a.a,{href:"mailto:dev@ambari.apache.org",children:"dev@ambari.apache.org"}),". For the vote to pass, 3 +1 votes are required. If the vote does not pass another release candidate will need to be created after addressing the feedback from the community."]}),(0,i.jsx)(a.h2,{id:"publishing-and-announcement",children:"Publishing and Announcement"}),(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsxs)(a.li,{children:["Login to ",(0,i.jsx)(a.a,{href:"https://id.apache.org",children:"https://id.apache.org"})," and verify the fingerprint of PGP key used to sign above is provided. (gpg --fingerprint)"]}),"\n",(0,i.jsxs)(a.li,{children:["Upload your PGP public key only to ",(0,i.jsx)(a.em,{children:"/home/"})]}),"\n"]}),(0,i.jsx)(a.p,{children:"Publish the release as below:"}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"svn co https://dist.apache.org/repos/dist/release/ambari ambari\n\n# Note : Only PMCs members can do this 'svn' step.\n\ncd ambari\nmkdir ambari-X.Y.Z\nscp ~/public_html/apache-ambari-X.Y.Z-rc0/* ambari-X.Y.Z\nsvn add ambari-X.Y.Z\nsvn rm ambari-A.B.C  # Remove the older release from the mirror.  Only the latest version should appear in dist.\n\nsvn commit -m \"Committing Release X.Y.Z\"\n"})}),(0,i.jsx)(a.p,{children:"Create the release tag:"}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"git tag -a release-X.Y.Z -m 'Ambari X.Y.Z'\ngit push origin release-X.Y.Z\n"})}),(0,i.jsx)(a.p,{children:"Note that it takes 24 hours for the changes to propagate to the mirrors."}),(0,i.jsx)(a.p,{children:"Wait 24 hours and verify that the bits are available in the mirrors before sending an announcement."}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Update Ambari Website and Wiki"})}),(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:"http://ambari.apache.org",children:"http://ambari.apache.org"})," is checked in Git in ",(0,i.jsx)(a.code,{children:"/ambari/docs/src/site"})," folder."]}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"cd docs\nmvn versions:set -DnewVersion=X.Y.Z\n\n# Make necessary changes, typically to pom.xml, site.xml, index.apt, and whats-new.apt\nmvn clean site\n"})}),(0,i.jsxs)(a.p,{children:["Examine the changes under ",(0,i.jsx)(a.em,{children:"/ambari/docs/target"})," folder."]}),(0,i.jsxs)(a.p,{children:["Update the wiki to add pages for installation of the new version. ",(0,i.jsx)(a.em,{children:"Usually you can copy the pages for the last release and make the URL changes to point to new repo/tarball location."})]}),(0,i.jsx)(a.p,{children:(0,i.jsxs)(a.strong,{children:["Send out Announcement to ",(0,i.jsx)(a.a,{href:"mailto:dev@ambari.apache.org",children:"dev@ambari.apache.org"})," and ",(0,i.jsx)(a.a,{href:"mailto:user@ambari.apache.org",children:"user@ambari.apache.org"}),"."]})}),(0,i.jsx)(a.p,{children:"Subject: [ANNOUNCE] Apache Ambari X.Y.Z."}),(0,i.jsx)(a.p,{children:"The Apache Ambari team is proud to announce Apache Ambari version X.Y.Z"}),(0,i.jsx)(a.p,{children:"Apache Ambari is a tool for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari consists of a set of RESTful APIs and a browser-based management console UI."}),(0,i.jsxs)(a.p,{children:["The release bits are at: ",(0,i.jsx)(a.a,{href:"http://www.apache.org/dyn/closer.cgi/ambari/ambari-X.Y.Z",children:"http://www.apache.org/dyn/closer.cgi/ambari/ambari-X.Y.Z"}),"."]}),(0,i.jsx)(a.p,{children:"To use the released bits please use the following documentation:"}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.a,{href:"https://cwiki.apache.org/confluence/display/AMBARI/Installation+Guide+for+Ambari+X.Y.Z",children:"https://cwiki.apache.org/confluence/display/AMBARI/Installation+Guide+for+Ambari+X.Y.Z"})}),(0,i.jsx)(a.p,{children:"We would like to thank all the contributors that made the release possible."}),(0,i.jsx)(a.p,{children:"Regards,"}),(0,i.jsx)(a.p,{children:"The Ambari Team"}),(0,i.jsx)(a.p,{children:(0,i.jsx)(a.strong,{children:"Submit release data to Apache reporter database."})}),(0,i.jsx)(a.p,{children:"This step can be done only by a project PMC. If release manager is not an Ambari PMC then please reach out to an existing Ambari PMC or contact Ambari PMC chair to complete this step."}),(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsxs)(a.li,{children:["Login to ",(0,i.jsx)(a.a,{href:"https://reporter.apache.org/addrelease.html?ambari",children:"https://reporter.apache.org/addrelease.html?ambari"})," with apache credentials."]}),"\n",(0,i.jsxs)(a.li,{children:["Fill out the fields:","\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Committe: ambari"}),"\n",(0,i.jsx)(a.li,{children:"Full version name: 2.2.0"}),"\n",(0,i.jsx)(a.li,{children:"Date of release (YYYY-MM-DD): 2015-12-19"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(a.li,{children:"Submit the data"}),"\n",(0,i.jsxs)(a.li,{children:["Verify that the submitted data is reflected at ",(0,i.jsx)(a.a,{href:"https://reporter.apache.org/?ambari",children:"https://reporter.apache.org/?ambari"})]}),"\n"]}),(0,i.jsxs)(a.p,{children:["Performing this step keeps ",(0,i.jsx)(a.a,{href:"https://reporter.apache.org/?ambari",children:"https://reporter.apache.org/?ambari"})," site updated and people using the Apache Reporter Service will be able to see the latest release data for Ambari."]}),(0,i.jsx)(a.h2,{id:"publish-ambari-artifacts-to-maven-central",children:"Publish Ambari artifacts to Maven central"}),(0,i.jsxs)(a.p,{children:["Please use the following ",(0,i.jsx)(a.a,{href:"https://docs.google.com/document/d/1RjWQOaTUne6t8DPJorPhOMWAfOb6Xou6sAdHk96CHDw/edit",children:"document"})," to publish Ambari artifacts to Maven central."]})]})]})}function d(e={}){const{wrapper:a}={...(0,s.R)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}}}]);