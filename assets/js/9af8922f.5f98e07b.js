"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8108],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>h});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(a),h=r,d=c["".concat(l,".").concat(h)]||c[h]||m[h]||i;return a?n.createElement(d,o(o({ref:t},u),{},{components:a})):n.createElement(d,o({ref:t},u))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},18441:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=a(87462),r=(a(67294),a(3905));const i={sidebar_position:2},o="Quick Start for New VM Users",s={unversionedId:"quick-start/quick-start-for-new-vm-users",id:"version-3.0.0/quick-start/quick-start-for-new-vm-users",title:"Quick Start for New VM Users",description:"This Quick Start guide is for readers who are new to the use of virtual machines, Apache Ambari, and/or the Apache Hadoop component stack, who would like to install and use a small local Hadoop cluster. The instructions are for a local host machine running OS X.",source:"@site/versioned_docs/version-3.0.0/quick-start/quick-start-for-new-vm-users.md",sourceDirName:"quick-start",slug:"/quick-start/quick-start-for-new-vm-users",permalink:"/docs/quick-start/quick-start-for-new-vm-users",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/quick-start/quick-start-for-new-vm-users.md",tags:[],version:"3.0.0",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"ambariSidebar",previous:{title:"Quick Start Guide",permalink:"/docs/quick-start/quick-start-guide"},next:{title:"Ambari Design",permalink:"/docs/ambari-design/"}},l={},p=[{value:"Terminology",id:"terminology",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Install VirtualBox and Vagrant",id:"install-virtualbox-and-vagrant",level:2},{value:"Start Linux Virtual Machines",id:"start-linux-virtual-machines",level:2},{value:"Access Virtual Machines",id:"access-virtual-machines",level:2},{value:"Install Ambari on the Virtual Machines",id:"install-ambari-on-the-virtual-machines",level:2},{value:"Install the HDP Stack",id:"install-the-hdp-stack",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Confirm Hosts",id:"confirm-hosts",level:3},{value:"Install, Start and Test",id:"install-start-and-test",level:3},{value:"Stopping and Restarting Virtual Machines",id:"stopping-and-restarting-virtual-machines",level:3}],u={toc:p};function m(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,n.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"quick-start-for-new-vm-users"},"Quick Start for New VM Users"),(0,r.kt)("p",null,"This Quick Start guide is for readers who are new to the use of virtual machines, Apache Ambari, and/or the Apache Hadoop component stack, who would like to install and use a small local Hadoop cluster. The instructions are for a local host machine running OS X."),(0,r.kt)("p",null,"The following instructions cover four main steps for installing Ambari and HDP using VirtualBox and Vagrant:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install VirtualBox and Vagrant.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install and start one or more Linux virtual machines. Each machine represents a node in a cluster.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On one of the virtual machines, download, install, and deploy the version of Ambari you wish to use.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Using Ambari, deploy the version of HDP you wish to use."))),(0,r.kt)("p",null,"When you complete the example in this Quick Start, you should have a three-node cluster of virtual machines running Ambari 2.4.1.0 and HDP 2.5.0 (unless you specify different repository versions)."),(0,r.kt)("p",null,"Once VirtualBox and Vagrant are installed, steps 2 through 4 can be done multiple times to change versions, create a larger cluster, and so on. There is no need to repeat step 1 unless you want to upgrade VirtualBox and/or Vagrant later."),(0,r.kt)("p",null,"Note: these steps were most recently tested on MacOS 10.11.6, El Capitan."),(0,r.kt)("h2",{id:"terminology"},"Terminology"),(0,r.kt)("p",null,"A ",(0,r.kt)("em",{parentName:"p"},"virtual machine"),", or ",(0,r.kt)("em",{parentName:"p"},"VM"),", is a software program that exhibits the behavior of a separate computer and is capable of running applications and programs within its own environment."),(0,r.kt)("p",null,"A virtual machine is often called a ",(0,r.kt)("em",{parentName:"p"},"guest"),", because it runs within another computing environment--usually known as the ",(0,r.kt)("em",{parentName:"p"},"host"),". For example, if you install three Linux VMs on a Mac, the Mac is the host machine; the three Linux VMs are guests."),(0,r.kt)("p",null,"Multiple virtual machines can exist within a single host at one time. In the following examples, one or more virtual machines run on a ",(0,r.kt)("em",{parentName:"p"},"host"),' machine running OS X. OS X is the primary operating system. The virtual machines (guests) are installed under OS X. The virtual machines run Linux in separate environments on OS X. Thus, your Mac is the "host" machine, and the virtual machines that run Ambari and Hadoop are called "guest" machines.'),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"You will need the following resources for this Quick Start:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"A solid internet connection, preferably with at least 5 MB available download bandwidth.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If you are installing the VMs on a Mac, at least 16 GB of memory (assuming 3 GB per VM)"))),(0,r.kt)("h2",{id:"install-virtualbox-and-vagrant"},"Install VirtualBox and Vagrant"),(0,r.kt)("p",null,"VirtualBox is a software virtualization package that installs on an operating system as an application. It allows you to run multiple virtual machines at the same time. In this Quick Start you will use VirtualBox to run Linux nodes within VirtualBox on OS X:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(78098).Z,title:"Apache Ambari > Quick Start for New VM Users > Screen Shot 2016-09-24 at 9.18.09 AM.png",width:"598",height:"329"})),(0,r.kt)("p",null,"Vagrant is a tool that makes it easier to work with virtual machines. It helps automate the work of setting up, running, and removingvirtual machine environments. Using Vagrant, you can install and run a preconfigured cluster environment with Ambari and the HDP stack."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Download and install VirtualBox from ",(0,r.kt)("a",{parentName:"p",href:"https://www.virtualbox.org/wiki/Downloads"},"https://www.virtualbox.org/wiki/Downloads"),". This Quick Start has been tested on version 5.1.6.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Download and install Vagrant from ",(0,r.kt)("a",{parentName:"p",href:"https://www.vagrantup.com/downloads.html"},"https://www.vagrantup.com/downloads.html")," ",(0,r.kt)("a",{parentName:"p",href:"http://downloads.vagrantup.com"},".",(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Clone the ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-vagrant")," GitHub repository into a convenient folder on your Mac. Navigate to the folder, and enter the following command from the terminal:"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/u39kun/ambari-vagrant.git\n")),(0,r.kt)("p",null,"The repository contains scripts for setting up Ambari virtual machines on several Linux distributions."),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Add virtual machine hostnames and addresses to the ",(0,r.kt)("inlineCode",{parentName:"li"},"/etc/hosts")," file on your computer. The following command copies a set of host names and addresses from ",(0,r.kt)("inlineCode",{parentName:"li"},"ambari-vagrant/append-to-etc-hosts.txt")," to the end of the ",(0,r.kt)("inlineCode",{parentName:"li"},"/etc/hosts")," files:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo -s 'cat ambari-vagrant/append-to-etc-hosts.txt >> /etc/hosts'\n")),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Use the ",(0,r.kt)("inlineCode",{parentName:"li"},"vagrant")," command to create a private key to use with Ambari:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant")," command displays Vagrant command information, and then it creates a private key in the file ",(0,r.kt)("inlineCode",{parentName:"p"},"~/.vagrant.d/insecure_private_key"),"."),(0,r.kt)("h2",{id:"start-linux-virtual-machines"},"Start Linux Virtual Machines"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-vagrant")," directory (cloned from GitHub) contains several subdirectories, each for a specific Linux distribution. Each subdirectory has scripts and configuration files for running Ambari and HDP on that version of Linux."),(0,r.kt)("p",null,"To start one or more virtual machines:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Change your current directory to ",(0,r.kt)("inlineCode",{parentName:"li"},"ambari-vagrant"),":")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd ambari-vagrant\n")),(0,r.kt)("p",null,"If you run an ",(0,r.kt)("inlineCode",{parentName:"p"},"ls")," command on the ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-vagrant")," directory, you will see subdirectories for several different operating systems and operating system versions."),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"cd")," into the OS subdirectory for the OS you wish to use. CentOS is recommended, because it is quicker to launch than other operating systems.")),(0,r.kt)("p",null,"The remainder of this example uses CentOS 7.0. (To install and use a different version or distribution of Linux, specify the other directory name in place of ",(0,r.kt)("inlineCode",{parentName:"p"},"centos7.0"),".)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd centos7.0\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important"),": All VM ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant")," commands operate within your current directory. Be sure to run them from the local (Mac) subdirectory associated with the VM operating system that you have chosen to use. If you attempt to run a ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant")," command from another directory, it will not find the VM."),(0,r.kt)("p",null,"Copy the private key into the directory associated with the chosen operating system."),(0,r.kt)("p",null,"For this example, which uses ",(0,r.kt)("inlineCode",{parentName:"p"},"centos7.0"),", issue the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cp ~/.vagrant.d/insecure_private_key .\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"(Optional) If you have at least 16 GB of memory on your Mac, consider increasing the amount of memory allocated to the VMs.")),(0,r.kt)("p",null,"Edit the following line in ",(0,r.kt)("inlineCode",{parentName:"p"},"Vagrantfile")," , increasing allocated memory from 3072 to 4096 or more; for example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'vb.customize ["modifyvm", :id, "--memory", 4096] # RAM allocated to each VM\n')),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Every virtual machine will have a directory called ",(0,r.kt)("inlineCode",{parentName:"p"},"/vagrant")," inside the VM. This corresponds to the ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-vagrant/<os></os>")," directory on your local computer, making it easy to transfer files back and forth between your host Mac and the virtual machine. If you have any files to access from within the VM, you can place them in this shared directory.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Start one or more VMs, using the ",(0,r.kt)("inlineCode",{parentName:"p"},"./up.sh")," command. Each VM will run one HDP node.Recommendation: if you have at least 16GB of RAM on your Mac and wish to run a small cluster, start with three nodes."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./up.sh\n")),(0,r.kt)("p",null,"For example, the following command starts 3 VMs:",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"p"},"./up.sh 3")),(0,r.kt)("p",null,"On an early 2013 MacBook Pro, 2.7 GHz core i7 and 16 GB RAM, this step takes five minutes. For CentOS 7.0, the hostnames are ",(0,r.kt)("inlineCode",{parentName:"p"},"c7001"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"c7002"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"c7003"),"."),(0,r.kt)("p",null,"Additional notes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If you ran the VMs before and used ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant destroy")," to remove the VM's, this is the step at which you would recreate and start the VMs.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"The default ",(0,r.kt)("inlineCode",{parentName:"p"},"Vagrantfile")," (in each OS subdirectory) can create up to 10 virtual machines.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"up.sh 3")," command is equivalent to ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant up c700{1..3}"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"The fully-qualified domain name (FQDN) for each VM has the format ",(0,r.kt)("inlineCode",{parentName:"p"},"<os-code>[01-10].ambari.apache.org</os-code>"),", where ",(0,r.kt)("inlineCode",{parentName:"p"},"<os-code></os-code>")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"c59")," (CentOS 5.9), ",(0,r.kt)("inlineCode",{parentName:"p"},"c64")," (CentOS 6.4), etc. For example, ",(0,r.kt)("inlineCode",{parentName:"p"},"c5901.ambari.apache.org")," will be the FQDN for node 01 running CentOS 5.9.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"The IP address for each VM has the format ",(0,r.kt)("inlineCode",{parentName:"p"},"192.168.<os-subnet>.1[01-10]</os-subnet>"),", where ",(0,r.kt)("inlineCode",{parentName:"p"},"<os-subnet></os-subnet>")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"64")," for CentOS 6.4, ",(0,r.kt)("inlineCode",{parentName:"p"},"70")," for CentOS 7.0, and so on. For example, ",(0,r.kt)("inlineCode",{parentName:"p"},"192.168.70.101")," will be the IP address for CentOS 7.0 node ",(0,r.kt)("inlineCode",{parentName:"p"},"c7001"),"."))),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Check the status of your VM(s), and review any errors. The following example shows the results of ",(0,r.kt)("inlineCode",{parentName:"li"},"./upsh 3")," for three VMs running with CentOS 7.0:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"LMBP:centos7.0 lkg$ vagrant status\n\nCurrent machine states:\nc7001                     running (virtualbox)\nc7002                     running (virtualbox)\nc7003                     running (virtualbox)\nc7004                     not created (virtualbox)\nc7005                     not created (virtualbox)\nc7006                     not created (virtualbox)\nc7007                     not created (virtualbox)\nc7008                     not created (virtualbox)\nc7009                     not created (virtualbox)\nc7010                     not created (virtualbox)\n")),(0,r.kt)("p",null,"In the preceding list, three virtual machines are installed and running."),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"At this point, you can snapshot the VMs to have a fresh set of running machines to reuse if desired. This is especially helpful when installing Apache Ambari and the HDP stack for the first time; it allows you to back out to fresh VMs and reinstall Ambari and HDP if you encounter errors. For more information about snapshots, see the ",(0,r.kt)("inlineCode",{parentName:"li"},"vagrant snapshot"),' command in "Basic Vagrant Commands," later in this Quick Start.')),(0,r.kt)("h2",{id:"access-virtual-machines"},"Access Virtual Machines"),(0,r.kt)("p",null,"Use the following steps when you want to access a running virtual machine:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"To log on to a virtual machine, use the ",(0,r.kt)("inlineCode",{parentName:"li"},"vagrant ssh")," command on your host machine, and specify the hostname; for example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"LMBP:centos7.0 lkg$ vagrant ssh c7001\n\nLast login: Tue Jan 12 11:20:28 2016\n[vagrant@c7001 ~]$\n")),(0,r.kt)("p",null,"From this point onward, this terminal window is connected to the virtual machine until yo u exit the virtual machine. All commands go to the VM, not to your Mac."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},(0,r.kt)("strong",{parentName:"em"},"Recommendation")),": Open a second terminal window for your Mac. This is useful when accessing the Ambari Web UI. To distinguish between the two, terminal windows typically list the computer name or VM hostname on each command-line prompt and at the top of the terminal window."),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"When you first access the VM you will be logged in as user ",(0,r.kt)("inlineCode",{parentName:"li"},"vagrant"),". Switch to the ",(0,r.kt)("inlineCode",{parentName:"li"},"root"),' user; be sure to include the space between "su" and "-":')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[vagrant@c7001 ~]$ sudo su -\n\nLast login: Sun Sep 25 01:34:28 AEST 2016 on pts/0\nroot@c7001:~#\n")),(0,r.kt)("p",null,"If at any time you wish to return the terminal window to your host machine:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"Use the ",(0,r.kt)("inlineCode",{parentName:"li"},"logout")," command to log out of root"),(0,r.kt)("li",{parentName:"ol"},"Use the ",(0,r.kt)("inlineCode",{parentName:"li"},"exit")," command to return to your host machine (Mac)")))),(0,r.kt)("p",null,"At this point, the VMs are still running in the background. You can re-issue the ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant ssh")," command later, to reconnect, or you can stop the virtual machines. For more information, see the ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant snapshot"),' command in "Basic Vagrant Commands," later in this Quick Start.'),(0,r.kt)("h2",{id:"install-ambari-on-the-virtual-machines"},"Install Ambari on the Virtual Machines"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Prerequisites"),": Before installing Ambari, the following software packages must be installed on your VM:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"rpm"),(0,r.kt)("li",{parentName:"ul"},"curl"),(0,r.kt)("li",{parentName:"ul"},"wget"),(0,r.kt)("li",{parentName:"ul"},"pdsh")),(0,r.kt)("p",null,"On CentOS: to check if a package is installed, run ",(0,r.kt)("inlineCode",{parentName:"p"},"yum info <package-name></package-name>"),". To install a package, run ",(0,r.kt)("inlineCode",{parentName:"p"},"yum install <package-name></package-name>"),"."),(0,r.kt)("p",null,"To install Ambari, you can build it yourself from source (see ",(0,r.kt)("a",{parentName:"p",href:"/docs/ambari-dev/"},"Ambari Development"),"), or you can use published binaries."),(0,r.kt)("p",null,"As this is a Quick Start Guide to get you going quickly, ready-made publicly-available binaries are referenced. Note that these binaries were built and publicly made available via Hortonworks, a commercial vendor for Hadoop. This is for your convenience. Note that using the binaries shown here would make HDP, Hortonworks' distribution, available to be installed via Apache Ambari. The instructions here should still work (only the repo URLs need to be changed) if you have Ambari binaries from any other vendor/organization/individuals (the instructions here can be updated if anyone wanted to expand this to include such ready-made, publicly accessible binaries from any source - such contributions are welcome). This would also work if you had built the binaries yourself."),(0,r.kt)("p",null,"From the terminal window o n the VM where you want to run the main Ambari service, download the Ambari repository. The following comman ds download Ambari version 2.5.1.0 and install ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-server"),". To install a different version of Ambari, specify the appropriate repo URL. Choose the appropriate commands for the operating system on your VMs:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# CentOS 6 (for CentOS 7, replace centos6 with centos7 in the repo URL)\n#\xa0\n# to test public release 2.5.1\nwget -O /etc/yum.repos.d/ambari.repo http://public-repo-1.hortonworks.com/ambari/centos6/2.x/updates/2.5.1.0/ambari.repo\nyum install ambari-server -y\n\n# Ubuntu 14 (for Ubuntu 16, replace ubuntu14 with ubuntu16 in the repo URL)\n# to test public release 2.5.1\nwget -O /etc/apt/sources.list.d/ambari.list http://public-repo-1.hortonworks.com/ambari/ubuntu14/2.x/updates/2.5.1.0/ambari.list\napt-key adv --recv-keys --keyserver keyserver.ubuntu.com B9733A7A07513CAD\napt-get update\napt-get install ambari-server -y\n\n# SUSE 11 (for SUSE 12, replace suse11 with suse12 in the repo URL)\n# to test public release 2.5.1\nwget -O /etc/zypp/repos.d/ambari.repo http://public-repo-1.hortonworks.com/ambari/suse11/2.x/updates/2.5.1.0/ambari.repo\nzypper install ambari-server -y\n")),(0,r.kt)("p",null,"On an early 2013 MacBook Pro, 2.7 GHz core i7 and 16 GB RAM, this step takes seven minutes. Timing also depends on internet download speeds."),(0,r.kt)("p",null,"To install Ambari with default settings, set up and start ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-server"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server setup -s\nambari-server start\n")),(0,r.kt)("p",null,"To check Ambari Server status, issue the following command:",(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-server status")),(0,r.kt)("p",null,"After Ambari Server has started, launch a browser on your host machine (Mac). Access the Ambari Web UI at ",(0,r.kt)("inlineCode",{parentName:"p"},' http://<hostname>.<a href="http://ambari.apache.org">ambari.apache.org</a>:8080</hostname>'),". The ",(0,r.kt)("inlineCode",{parentName:"p"},"<hostname></hostname>")," part of the URL specifies the VM where you installed Ambari;for example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"http://c7001.ambari.apache.org:8080\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note"),": The Ambari Server can take some time to launch and be ready to accept connections. Keep trying the URL until you see the login page."),(0,r.kt)("p",null,"At this point, you can snapshot the VMs to have a cluster with Ambari installed, to rerun later if desired. This is especially helpful when installing Apache Ambari and the HDP stack for the first time; it allows you to back out to fresh VMs running Ambari, and reinstall a fresh HDP stack if you encounter errors. For more information about snapshots, see the ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant snapshot"),' command in "Basic Vagrant Commands," later in this Quick Start.'),(0,r.kt)("h2",{id:"install-the-hdp-stack"},"Install the HDP Stack"),(0,r.kt)("p",null,"The following instructions describe basic steps for using Ambari to install HDP components."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Ambari screen, login using default username ",(0,r.kt)("inlineCode",{parentName:"p"},"admin"),", password ",(0,r.kt)("inlineCode",{parentName:"p"},"admin"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'On the welcome page, choose "Launch Install Wizard."')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Specify a name for your cluster, and then click Next.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Select Version page, choose which version of HDP to install, and then click Next.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Install Options page, complete the following steps:")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"List the FQDNs of the virtual machines. For example:"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"c7001.ambari.apache.org\nc7002.ambari.apache.org\nc7003.ambari.apache.org\n")),(0,r.kt)("p",null,"Alternatively, you can use a range expression:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"c70[01-03].ambari.apache.org\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Upload the ",(0,r.kt)("inlineCode",{parentName:"p"},"insecure_private_key")," file that you created earlier: browse to the ",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-vagrant")," directory, navigate to the operating system folder for your VM's, and choose the key file.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Change the SSH User Account to ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},'Click "Register and Confirm."')),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Confirm Hosts page, Ambari displays installation status."))),(0,r.kt)("p",null,"If you see a yellow banner with the following message, click on the link to review warnings:",(0,r.kt)("img",{src:a(97132).Z,title:"Apache Ambari > Quick Start for New VM Users > Screen Shot 2016-09-24 at 11.31.36 AM.png",width:"783",height:"471"})),(0,r.kt)("p",null,"See the Troubleshooting section (later on this page) for more information."),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"When all host checks pass, close the warning window:")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(62365).Z,title:"Apache Ambari > Quick Start for New VM Users > Screen Shot 2016-09-24 at 11.45.20 AM.png",width:"504",height:"49"})),(0,r.kt)("ol",{start:8},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Click Next to continue:")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Choose Services page, uncheck any components that you do not expect to use. If any are required for selected components, Ambari will request to add them back in.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Assign Masters screen, choose hosts or simply click Next to use default values.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Assign Slaves and Clients screen, choose hosts or simply click Next to use default values.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Customize Services screen")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Review services with warning notes, such as Hive and Ambari Metrics in the following image:\n",(0,r.kt)("img",{src:a(84624).Z,title:"Apache Ambari > Quick Start for New VM Users > Screen Shot 2016-09-24 at 11.53.17 AM.png",width:"767",height:"251"}))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Specify missing property values (such as admin passwords) as directed by the installation wizard. When all configurations have been addressed, click Next.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On the Review screen, review the service definitions, and then click Next.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"The Install, Start and Test page shows deployment status. This step takes a while; on an early 2013 MacBook Pro, 2.7 GHz core i7 and 16 GB RAM, this step takes 45 minutes.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"When the cluster installs successfully, you can snapshot the VMs to have a fresh cluster with Ambari and HDP installed, to rerun later if desired. This allows you to experiment with the cluster and quickly restore back to a previous state if you wish. For more information about snapshots, see the ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant snapshot"),' command in "Basic Vagrant Commands," later in this Quick Start.'))),(0,r.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,r.kt)("p",null,"This subsection describes a few error conditions that might occur during Ambari installation and HDP cluster deployment:"),(0,r.kt)("h3",{id:"confirm-hosts"},"Confirm Hosts"),(0,r.kt)("p",null,"If you see an error similar to the following on the Confirm Hosts page of the Ambari installation wizard, click the link to see the warnings:\n'Some warnings were encountered while performing checks against the 3 registered hosts above. Click here to see the warnings.\""),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"ntpd")," Error")),(0,r.kt)("p",null,"On the Host Checks window, the following warning indicates that you need to start ",(0,r.kt)("inlineCode",{parentName:"p"},"ntpd")," on each host:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(27881).Z,title:"Apache Ambari > Quick Start for New VM Users > Screen Shot 2016-09-24 at 11.32.38 AM.png",width:"476",height:"122"})),(0,r.kt)("p",null,"To start the services, for each VM navigate to a terminal window (on your Mac, ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant ssh <vm-name></vm-name>"),"). Issue the following commands:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"service ntpd start"),(0,r.kt)("br",null)," ",(0,r.kt)("inlineCode",{parentName:"p"},"service ntpd status")),(0,r.kt)("p",null,"You should see messages confirming that ",(0,r.kt)("inlineCode",{parentName:"p"},"ntpd")," is running. Navigate back to the Host Checks window of the Ambari installation wizard and click Rerun Checks. When all checks complete successfully, click Close to continue the installation process."),(0,r.kt)("h3",{id:"install-start-and-test"},"Install, Start and Test"),(0,r.kt)("p",null,"If the Install, Start and Test step fails with the following error during DataNode deployment:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Error: Package: snappy-devel-1.0.5-1.el6.x86_64 (HDP-UTILS-1.1.0.20) \nRequires: snappy(x86-64) = 1.0.5-1.el6 \nInstalled: snappy-1.1.0-3.el7.x86_64 (@anaconda/7.2)\n")),(0,r.kt)("p",null,"Run the following commands under the root account on each VM:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yum remove -y snappy-1.1.0-3.el7.x86_64\nyum install snappy-devel -y\n")),(0,r.kt)("h3",{id:"stopping-and-restarting-virtual-machines"},"Stopping and Restarting Virtual Machines"),(0,r.kt)("p",null,"Hadoop is a complex ecosystem with a lot of status checks and cross-component messages. This can make it challenging to halt and restart several VMs and restore them later without warnings or errors."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Recommendations")),(0,r.kt)("p",null,"If you would like to save state for a period of time and you plan to stop using your Mac during that time, if you sleep your Mac the cluster should continue from where it left off after you wake the Mac."),(0,r.kt)("p",null,"When stopping a set of VMs--if you don't need to save cluster state--it can be helpful to stop all services first, stop ambari-server (",(0,r.kt)("inlineCode",{parentName:"p"},"ambari-server stop"),"), and then issue a Vagrant ",(0,r.kt)("inlineCode",{parentName:"p"},"halt")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"suspend")," command."),(0,r.kt)("p",null,"When restarting a cluster after halting or taking a snapshot, check Ambari server status and restart it if necessary:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ambari-server status   ambari-server start\n")),(0,r.kt)("p",null,"After logging into the Ambari Web UI, expect to see alert warnings or errors due to timeout conditions. Check the associated messages to determine whether they might affect your use of the virtual cluster. If so, it can be helpful to stop and restart one or more associated components."),(0,r.kt)("h1",{id:"reference-basic-vagrant-commands"},"Reference: Basic Vagrant Commands"),(0,r.kt)("p",null,"The following table lists several common Vagrant commands. For more information, see Vagrant ",(0,r.kt)("a",{parentName:"p",href:"https://www.vagrantup.com/docs/cli/"},"Command-Line Interface")," documentation."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"vagrant up")),(0,r.kt)("p",null,"Create and configure guest machines. Example: ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant up c6406")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"up.sh")," is a wrapper for this call. You can use this command to start more VMs after you called ",(0,r.kt)("inlineCode",{parentName:"p"},"up.sh"),"."),(0,r.kt)("p",null,"Note: if you do not specify the ",(0,r.kt)("inlineCode",{parentName:"p"},"<vm-name></vm-name>")," parameter, Vagrant will attempt to start ten VMs."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"vagrant suspend []")),(0,r.kt)("p",null,"Save the current running state of a VM and stop the VM. A suspend effectively saves the ",(0,r.kt)("em",{parentName:"p"},"exact point-in-time state")," of a machine. When you issue a ",(0,r.kt)("inlineCode",{parentName:"p"},"resume")," command, the VM begins running immediately from that point, rather than doing a full boot."),(0,r.kt)("p",null,"When you are ready to begin working with it again, run ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant up"),". The machine will resume where you left off. The main benefit of ",(0,r.kt)("inlineCode",{parentName:"p"},"suspend")," is that it is very fast; it usually takes only 5 to 10 seconds to stop and start your work. The downside is that the operation uses disk space for the VM and to store all VM state information (in RAM, when running) on disk."),(0,r.kt)("p",null,"Optional: Specify a specific VM to suspend."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"vagrant halt")," ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant up")," ",(0,r.kt)("inlineCode",{parentName:"p"},"halt")," ",(0,r.kt)("strong",{parentName:"p"},"vagrant destroy -f [")),(0,r.kt)("p",null,"Remove all traces of the guest machine from your system. The ",(0,r.kt)("inlineCode",{parentName:"p"},"destroy")," command stops the guest machine, powers it down, and removes all guest hard disks. When you are ready to begin working with it again, run ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant up"),". The benefit of this all disk space and RAM consumed by the guest machine are reclaimed; your host machine is left clean. The downside is that the ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant up")," operation will take extra time; rebuilding the environment takes the longest (compared with ",(0,r.kt)("inlineCode",{parentName:"p"},"suspend")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"halt"),") because it re-imports and re-provisions the machine."),(0,r.kt)("p",null,"Optional: Specify a specific VM to destroy."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"vagrant ssh")),(0,r.kt)("p",null,"Starts a SSH session to the host."),(0,r.kt)("p",null,"Example: ",(0,r.kt)("inlineCode",{parentName:"p"},"vagrant ssh c6401"),"\n",(0,r.kt)("strong",{parentName:"p"},"vagrant status []")," ",(0,r.kt)("strong",{parentName:"p"},"vagrant snapshot")),(0,r.kt)("p",null,"A Vagrant snapshot saves the current state of a VM so that you can restart the VM from the same point at a future time. Commands include push, pop, save, restore, list, and delete. For more information, see ",(0,r.kt)("a",{parentName:"p",href:"https://www.vagrantup.com/docs/cli/snapshot.html"},"https://www.vagrantup.com/docs/cli/snapshot.html"),"."),(0,r.kt)("p",null,"Note: Upon resuming a snapshot, you may find that time-sensitive services such as the (HBase RegionServer) may be down. If this happens, you will need to restart those services."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"vagrant --help")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Recommendation"),": After you start the VMs--but before you run anything on the VMs\u2013save a snapshot. This allows you to restore the initial state of your VMs. This process is much faster than starting the VMs from scratch and then reinstalling Ambari and HDP. You can return to the initial state without destroying other named snapshots that you create later."),(0,r.kt)("p",null,"More information: ",(0,r.kt)("a",{parentName:"p",href:"https://www.vagrantup.com/docs/getting-started/teardown.html"},"https://www.vagrantup.com/docs/getting-started/teardown.html")),(0,r.kt)("p",null,"If you have favorite ways of starting and stopping VMs running a Hadoop cluster, please feel free to share them in the Comments section. Thanks!"))}m.isMDXComponent=!0},97132:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/confirm_hosts-9676e6ae927af9dfa6a064acf05c5b2d.png"},84624:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/custom_services-7b3f767c31c4b36fbbfc0a9048dff2b6.png"},62365:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/host_checked-cac1bc4359c63f76bfed7ed9ae3b3291.png"},27881:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/services_issues-da920e30d5364f1cf607c326c8908979.png"},78098:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/virtual_box_env-f8b492b79cc8c51229de9c358b87ce67.png"}}]);