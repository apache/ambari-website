"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[2223],{3673:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"quick-start/quick-start-guide","title":"Quick Start Guide","description":"This document shows how to quickly set up a cluster using Ambari on your local machine using virtual machines.","source":"@site/docs/quick-start/quick-start-guide.md","sourceDirName":"quick-start","slug":"/quick-start/quick-start-guide","permalink":"/docs/next/quick-start/quick-start-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/docs/quick-start/quick-start-guide.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"ambariSidebar","previous":{"title":"Introduction","permalink":"/docs/next/introduction"},"next":{"title":"Quick Start for New VM Users","permalink":"/docs/next/quick-start/quick-start-for-new-vm-users"}}');var t=r(74848),s=r(28453);const i={sidebar_position:1},o="Quick Start Guide",c={},l=[{value:"Modifying RAM for the VMs",id:"modifying-ram-for-the-vms",level:2},{value:"Taking Snapshots",id:"taking-snapshots",level:2},{value:"Misc",id:"misc",level:2},{value:"Kerberos Support",id:"kerberos-support",level:2},{value:"Pre-Configured Development Environment",id:"pre-configured-development-environment",level:2}];function h(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"quick-start-guide",children:"Quick Start Guide"})}),"\n",(0,t.jsx)(n.p,{children:"This document shows how to quickly set up a cluster using Ambari on your local machine using virtual machines."}),"\n",(0,t.jsxs)(n.p,{children:["This utilizes ",(0,t.jsx)(n.a,{href:"https://www.virtualbox.org/",children:"VirtualBox"})," and ",(0,t.jsx)(n.a,{href:"https://www.vagrantup.com/",children:"Vagrant"})," so you will need to install both."]}),"\n",(0,t.jsx)(n.p,{children:"Note that the steps were tested on MacOS 10.8.4 / 10.8.5."}),"\n",(0,t.jsx)(n.p,{children:'After you have installed VirtualBox and Vagrant on your computer, check out the "ambari-vagrant" repo on github:'}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/u39kun/ambari-vagrant.git\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Edit your ",(0,t.jsx)(n.strong,{children:"/etc/hosts"})," on your computer so that you will be able to resolve hostnames for the VMs:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo -s 'cat ambari-vagrant/append-to-etc-hosts.txt >> /etc/hosts'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Copy the private key to your home directory (or some place convenient for you) so that it's easily accessible for uploading via Ambari Web:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"vagrant\n"})}),"\n",(0,t.jsx)(n.p,{children:"The above command shows the command usage and also creates a private key as ~/.vagrant.d/insecure_private_key. This key will be used in the following steps."}),"\n",(0,t.jsx)(n.p,{children:"First, change directory to ambari-vagrant:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd ambari-vagrant\n"})}),"\n",(0,t.jsxs)(n.p,{children:['You will see subdirectories for different OS\'s. "cd" into the OS that you want to test. ',(0,t.jsx)(n.strong,{children:"centos6.8"})," is recommended as this is quicker to launch than other OS's."]}),"\n",(0,t.jsx)(n.p,{children:"Now you can start VMs with the following command:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd centos6.8\ncp ~/.vagrant.d/insecure_private_key .\n./up.sh\n"})}),"\n",(0,t.jsxs)(n.p,{children:["For example, ",(0,t.jsx)(n.strong,{children:"up.sh 3"})," starts 3 VMs. 3 seems to be a good number with 16GB of RAM without taxing the system too much."]}),"\n",(0,t.jsxs)(n.p,{children:["With the default ",(0,t.jsx)(n.strong,{children:"Vagrantfile"}),", you can specify up to 10 (if your computer can handle it; you can even add more)."]}),"\n",(0,t.jsx)(n.p,{children:"VMs will have the FQDN"}),"\n",(0,t.jsx)(n.p,{children:"If it is your first time running a vagrant command, run:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"vagrant init\n"})}),"\n",(0,t.jsx)(n.p,{children:"Log into the VM:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"vagrant ssh c6801\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo su -\n"})}),"\n",(0,t.jsx)(n.p,{children:"to make yourself root."}),"\n",(0,t.jsxs)(n.p,{children:["To install Ambari, you can build it yourself from source (see ",(0,t.jsx)(n.a,{href:"/docs/next/ambari-dev/",children:"Ambari Development"}),"), or you can use published binaries."]}),"\n",(0,t.jsx)(n.p,{children:"As this is a Quick Start Guide to get you going quickly, ready-made, publicly available binaries are referenced in the steps below."}),"\n",(0,t.jsx)(n.p,{children:"Note that these binaries were built and made publicly available via Hortonworks, a commercial vendor for Hadoop. This is for your convenience. Note that using the binaries shown here would make HDP, Hortonworks' distribution, available to be installed via Apache Ambari. The instructions here should still work (only the repo URLs need to be changed) if you have Ambari binaries from any other vendor/organization/individuals (the instructions here can be updated if anyone wanted to expand this to include such ready-made, publicly accessible binaries from any source - such contributions are welcome). This would also work if you had built the binaries yourself."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# CentOS 6 (for CentOS 7, replace centos6 with centos7 in the repo URL)\n#\xa0\n# to test public release 2.5.1\nwget -O /etc/yum.repos.d/ambari.repo http://public-repo-1.hortonworks.com/ambari/centos6/2.x/updates/2.5.1.0/ambari.repo\nyum install ambari-server -y\n\n# Ubuntu 14 (for Ubuntu 16, replace ubuntu14 with ubuntu16 in the repo URL)\n# to test public release 2.5.1\nwget -O /etc/apt/sources.list.d/ambari.list http://public-repo-1.hortonworks.com/ambari/ubuntu14/2.x/updates/2.5.1.0/ambari.list\napt-key adv --recv-keys --keyserver keyserver.ubuntu.com B9733A7A07513CAD\napt-get update\napt-get install ambari-server -y\n\n# SUSE 11 (for SUSE 12, replace suse11 with suse12 in the repo URL)\n# to test public release 2.5.1\nwget -O /etc/zypp/repos.d/ambari.repo http://public-repo-1.hortonworks.com/ambari/suse11/2.x/updates/2.5.1.0/ambari.repo\nzypper install ambari-server -y\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Ambari offers many installation options (see ",(0,t.jsx)(n.a,{href:"https://cwiki.apache.org/confluence/display/AMBARI/Ambari+User+Guides",children:"Ambari User Guides"}),"), but to get up and running quickly with default settings, you can run the following to set up and start ambari-server."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"ambari-server setup -s\nambari-server start\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"For frontend developers only: see Frontend Development section below for extra setup instructions."})}),"\n",(0,t.jsxs)(n.p,{children:["Once Ambari Server is started, hit ",(0,t.jsx)(n.a,{href:"http://c6801.ambari.apache.org:8080",children:"http://c6801.ambari.apache.org:8080"})," (URL depends on the OS being tested) from your browser on your local computer."]}),"\n",(0,t.jsx)(n.p,{children:"Note that Ambari Server can take some time to fully come up and ready to accept connections. Keep hitting the URL until you get the login page."}),"\n",(0,t.jsxs)(n.p,{children:["Once you are at the login page, login with the default username ",(0,t.jsx)(n.strong,{children:"admin"})," and password ",(0,t.jsx)(n.strong,{children:"admin"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"On the Install Options page, use the FQDNs of the VMs. For example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"c6801.ambari.apache.org\nc6802.ambari.apache.org\nc6803.ambari.apache.org\n"})}),"\n",(0,t.jsx)(n.p,{children:"Alternatively, you can use a range expression:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"c68[01-03].ambari.apache.org\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Specify the the non-root SSH user ",(0,t.jsx)(n.strong,{children:"vagrant"}),", and upload ",(0,t.jsx)(n.strong,{children:"insecure_private_key"})," file that you copied earlier as the private key."]}),"\n",(0,t.jsx)(n.p,{children:"Follow the onscreen instructions to install your cluster."}),"\n",(0,t.jsxs)(n.p,{children:["When done testing, run ",(0,t.jsx)(n.strong,{children:"vagrant destroy -f"})," to purge the VMs."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"vagrant up"}),"\nStarts a specific VM. up.sh is a wrapper for this call."]}),"\n",(0,t.jsx)(n.p,{children:"Note: if you don't specify the"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"vagrant destroy -f"}),"\nDestroys all VMs launched from the current directory (deletes them from disk as well)\nYou can optionally specify a specific VM to destroy"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"vagrant suspend"}),"\nSuspends (snapshot) all VMs launched from the current directory so that you can resume them later\nYou can optionally specify a specific VM to suspend"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"vagrant resume"}),"\nResumes all suspended VMs launched from the current directory\nYou can optionally specify a specific VM to resume"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"vagrant status"}),"\nShows which VMs are running, suspended, etc."]}),"\n",(0,t.jsx)(n.h2,{id:"modifying-ram-for-the-vms",children:"Modifying RAM for the VMs"}),"\n",(0,t.jsxs)(n.p,{children:["Each VM is allocated 2GB of RAM. These can be changed by editing ",(0,t.jsx)(n.strong,{children:"Vagrantfile"}),". To change the RAM allocation, modify the following line:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'vb.customize ["modifyvm", :id, "--memory", 2048]\n'})}),"\n",(0,t.jsx)(n.h2,{id:"taking-snapshots",children:"Taking Snapshots"}),"\n",(0,t.jsx)(n.p,{children:"Vagrant makes it easy to take snapshots of the entire cluster."}),"\n",(0,t.jsx)(n.p,{children:"First, install the snapshot plugin:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"vagrant plugin install vagrant-vbox-snapshot --plugin-version=0.0.2\n"})}),"\n",(0,t.jsx)(n.p,{children:'This enables the "vagrant snapshot" command. Note that the above installs vesion 0.0.2. if you install the latest plugin version 0.0.3 does not allow taking snapshots of the whole cluster at the same time (you have to specify a VM name).'}),"\n",(0,t.jsxs)(n.p,{children:["Run ",(0,t.jsx)(n.strong,{children:"vagrant snapshot"})," to see the syntax."]}),"\n",(0,t.jsx)(n.p,{children:"Note that the plugin tries to take a snapshot of all VMs configured in Vagrantfile. If you are always using 3 VMs, for example, you can comment out c68[04-10] in Vagrantfile so that the snapshot commands only operate on c68[01-03]."}),"\n",(0,t.jsx)(n.p,{children:"Note: Upon resuming a snapshot, you may find that time-sensitive services may be down (e.g, HBase RegionServer is down, etc.)"}),"\n",(0,t.jsx)(n.p,{children:'Tip: After starting the VMs but before you do anything on the VMs, run "vagrant snapshot take init". This way, you can go back to the initial state of the VMs by running "vagrant snapshot go init"; this only takes seconds (much faster than starting the VMs up from scratch by using up.sh or "vagrant up"). Another advantage of this is that you can always go back to the initial state without destroying other named snapshots that you created.'}),"\n",(0,t.jsx)(n.h2,{id:"misc",children:"Misc"}),"\n",(0,t.jsxs)(n.p,{children:["All VMs launched will have a directory called ",(0,t.jsx)(n.strong,{children:"/vagrant"})," inside the VM. This maps to the ",(0,t.jsx)(n.strong,{children:"ambari-vagrant/"})," directory on your local computer. You can use this shared directory mapping to push files, etc."]}),"\n",(0,t.jsxs)(n.p,{children:["If you want to test OS's other than what's currently in the ",(0,t.jsx)(n.strong,{children:"ambari-vagrant"})," repo, please see ",(0,t.jsx)(n.a,{href:"http://www.vagrantbox.es/",children:"http://www.vagrantbox.es/"})," for all the readily available OS images you can test. Note that Ambari currently works on RHEL 5/6, CentOS 5/6, Oracle Linux 5/6, SUSE 11, and SLES 11. Ubuntu support is work in progress."]}),"\n",(0,t.jsx)(n.h2,{id:"kerberos-support",children:"Kerberos Support"}),"\n",(0,t.jsx)(n.p,{children:"Ambari supports adding Kerberos security to an existing Ambari-installed cluster. First setup any one host as the KDC as follows:"}),"\n",(0,t.jsx)(n.p,{children:"Install the Kerberos server on the chosen host. e.g. for Centos/RedHat"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yum install krb5-server krb5-libs krb5-auth-dialog rng-tools -y\n"})}),"\n",(0,t.jsx)(n.p,{children:"Create the Kerberos database."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"rngd -r /dev/urandom -o /dev/random\n/usr/sbin/kdb5_util create -s\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Update ",(0,t.jsx)(n.code,{children:"/etc/krb5.conf"})," on the KDC host. e.g. if your realm is ",(0,t.jsx)(n.code,{children:"EXAMPLE.COM"})," and kdc host is ",(0,t.jsx)(n.code,{children:"c6801.ambari.apache.org"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"[realms]\n\u2002\u2002EXAMPLE.COM = {\n\u2002\u2002\u2002\u2002admin_server = c6801.ambari.apache.org\n\u2002\u2002\u2002\u2002kdc = c6801.ambari.apache.org\n\u2002\u2002}\n"})}),"\n",(0,t.jsx)(n.p,{children:"Restart Kerberos services. e.g. for Centos/RedHat"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"/etc/rc.d/init.d/krb5kdc restart\n/etc/rc.d/init.d/kadmin restart\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'$ sudo kadmin.local\nkadmin.local:  add_principal admin/admin@EXAMPLE.COM\nWARNING: no policy specified for admin/admin@EXAMPLE.COM; defaulting to no policy\nEnter password for principal "admin/admin@EXAMPLE.COM":\nRe-enter password for principal "admin/admin@EXAMPLE.COM":\nPrincipal "admin/admin@EXAMPLE.COM" created.\n\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Remember the password for this principal. The Ambari Kerberos Wizard will request it later.Distribute the updated ",(0,t.jsx)(n.code,{children:"/etc/krb5.conf"})," file to remaining hosts in the cluster."]}),"\n",(0,t.jsxs)(n.p,{children:["Navigate to ",(0,t.jsx)(n.em,{children:"Ambari Dashboard \u2014> Admin \u2014> Kerberos"})," to launch the Kerberos Wizard and follow the wizard steps. If you run into errors, the Ambari server logs can be found at ",(0,t.jsx)(n.code,{children:"/var/log/ambari-server/ambari-server.log"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"pre-configured-development-environment",children:"Pre-Configured Development Environment"}),"\n",(0,t.jsxs)(n.p,{children:["Simply edit ",(0,t.jsx)(n.strong,{children:"Vagrantfile"})," to launch a VM with all the tools necessary to build Ambari from source."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd ambari-vagrant/centos6.8\nvi Vagrantfile  Frontend DevelopmentYou can use this set up to develop and test out Ambari Web frontend code against a real Ambari Server on a multi-node environment.You need to first fork the apache/ambari repository if you haven't already. Read the How to Contribute guide for instructions on how to fork.On the host machine:cd ambari-vagrant/centos6.8\n# Replace the [forked-repository-url] with your fork's clone url\ngit clone [forked-repository-url] ambari\ncd ambari/ambari-web\nnpm install\nbrunch wOn c6801 (where Ambari Server is installed):cd /usr/lib/ambari-server\nmv web web-orig\nln -s /vagrant/ambari/ambari-web/public web\nambari-server restartWith this setup, whenever you change the content of ambari-web files (under ambari-vagrant/ambari/) on the host machine, brunch will pick up changes in the background and update ambari-vagrant/ambari/ambari-web/public. Because of the symbolic link, the changes are automatically picked up by Ambari Server. All you have to do is hit refresh on the browser to see the frontend code changes reflected.Not seeing code changes as expected? If you have run the maven command to build Ambari previously, you will see files called app.js.gz and vendor.js.gz under the public folder. You need to delete these files for the frontend code changes to be effective, as the app.js.gz and vendor.js.gz files take precedence over app.js and vendor.js, respectively.\n\n"})})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>o});var a=r(96540);const t={},s=a.createContext(t);function i(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);