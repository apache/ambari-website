"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[2523],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var a=t(67294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,s=function(e,n){if(null==e)return{};var t,a,s={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},h={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,s=e.mdxType,i=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=c(t),d=s,p=m["".concat(l,".").concat(d)]||m[d]||h[d]||i;return t?a.createElement(p,r(r({ref:n},u),{},{components:t})):a.createElement(p,r({ref:n},u))}));function d(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var i=t.length,r=new Array(i);r[0]=m;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:s,r[1]=o;for(var c=2;c<i;c++)r[c]=t[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3424:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=t(87462),s=(t(67294),t(3905));const i={sidebar_position:4},r="Bare Metal and KVM Environment Setup for Apache Ambari",o={unversionedId:"quick-start/environment-setup/bare-metal-kvm-setup",id:"version-3.0.0/quick-start/environment-setup/bare-metal-kvm-setup",title:"Bare Metal and KVM Environment Setup for Apache Ambari",description:"This guide provides instructions for configuring existing bare metal servers or KVM virtual machines for Apache Ambari installation. It assumes you already have at least 3 machines (physical or virtual) available and focuses on the necessary system configurations to prepare them for Ambari deployment.",source:"@site/versioned_docs/version-3.0.0/quick-start/environment-setup/bare-metal-kvm-setup.md",sourceDirName:"quick-start/environment-setup",slug:"/quick-start/environment-setup/bare-metal-kvm-setup",permalink:"/docs/quick-start/environment-setup/bare-metal-kvm-setup",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/quick-start/environment-setup/bare-metal-kvm-setup.md",tags:[],version:"3.0.0",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"ambariSidebar",previous:{title:"Docker Environment Setup for Apache Ambari",permalink:"/docs/quick-start/environment-setup/docker-environment-setup"},next:{title:"Ambari Installation Guide",permalink:"/docs/quick-start/installation-guide"}},l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Machine Roles",id:"machine-roles",level:2},{value:"1. Configure Hostnames and Networking",id:"1-configure-hostnames-and-networking",level:2},{value:"1.1 Set Hostnames",id:"11-set-hostnames",level:3},{value:"1.2 Configure /etc/hosts on All Machines",id:"12-configure-etchosts-on-all-machines",level:3},{value:"2. Configure Security Settings",id:"2-configure-security-settings",level:2},{value:"2.1 Disable SELinux on All Machines",id:"21-disable-selinux-on-all-machines",level:3},{value:"2.2 Configure Firewall on All Machines",id:"22-configure-firewall-on-all-machines",level:3},{value:"3. Configure SSH Access",id:"3-configure-ssh-access",level:2},{value:"3.1 Generate SSH Key on the Server Machine",id:"31-generate-ssh-key-on-the-server-machine",level:3},{value:"3.2 Configure SSH for Password Authentication",id:"32-configure-ssh-for-password-authentication",level:3},{value:"3.3 Distribute SSH Keys from Server to Agents",id:"33-distribute-ssh-keys-from-server-to-agents",level:3},{value:"4. Install Required Packages on All Machines",id:"4-install-required-packages-on-all-machines",level:2},{value:"4.1 Update the System and Install Basic Utilities",id:"41-update-the-system-and-install-basic-utilities",level:3},{value:"4.2 Enable Development Repository",id:"42-enable-development-repository",level:3},{value:"4.3 Install Java on All Machines",id:"43-install-java-on-all-machines",level:3},{value:"5. Configure Network Time Protocol (NTP)",id:"5-configure-network-time-protocol-ntp",level:2},{value:"6. Verify the Environment",id:"6-verify-the-environment",level:2},{value:"6.1 Check Network Connectivity",id:"61-check-network-connectivity",level:3},{value:"6.2 Verify SSH Access",id:"62-verify-ssh-access",level:3},{value:"6.3 Verify Security Settings",id:"63-verify-security-settings",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Network Issues",id:"network-issues",level:3},{value:"SSH Issues",id:"ssh-issues",level:3},{value:"SELinux Issues",id:"selinux-issues",level:3},{value:"Next Steps",id:"next-steps",level:2}],u={toc:c};function h(e){let{components:n,...t}=e;return(0,s.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"bare-metal-and-kvm-environment-setup-for-apache-ambari"},"Bare Metal and KVM Environment Setup for Apache Ambari"),(0,s.kt)("p",null,"This guide provides instructions for configuring existing bare metal servers or KVM virtual machines for Apache Ambari installation. It assumes you already have at least 3 machines (physical or virtual) available and focuses on the necessary system configurations to prepare them for Ambari deployment."),(0,s.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"At least 3 machines (physical servers or KVM virtual machines)"),(0,s.kt)("li",{parentName:"ul"},"Rocky Linux 8 (or compatible RHEL-based distribution) installed on all machines"),(0,s.kt)("li",{parentName:"ul"},"Root access to all machines"),(0,s.kt)("li",{parentName:"ul"},"Network connectivity between all machines")),(0,s.kt)("h2",{id:"machine-roles"},"Machine Roles"),(0,s.kt)("p",null,"For a basic Ambari cluster, you'll need to designate your machines for the following roles:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Machine 1"),": Ambari Server"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Machine 2, 3, ..."),": Ambari Agents")),(0,s.kt)("p",null,"All machines will need similar base configurations, with some specific settings for the Ambari Server."),(0,s.kt)("h2",{id:"1-configure-hostnames-and-networking"},"1. Configure Hostnames and Networking"),(0,s.kt)("h3",{id:"11-set-hostnames"},"1.1 Set Hostnames"),(0,s.kt)("p",null,"If you haven't already configured hostnames for your machines, you can set them as follows:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Example hostname configuration (only if needed)\nsudo hostnamectl set-hostname your-preferred-hostname\n")),(0,s.kt)("p",null,"The specific hostnames you choose don't matter, but they should be:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Unique across all machines"),(0,s.kt)("li",{parentName:"ul"},"Fully qualified domain names (FQDN) if possible"),(0,s.kt)("li",{parentName:"ul"},"Consistent with your network naming conventions")),(0,s.kt)("p",null,"If you've already configured your hostnames, you can skip this step."),(0,s.kt)("h3",{id:"12-configure-etchosts-on-all-machines"},"1.2 Configure /etc/hosts on All Machines"),(0,s.kt)("p",null,"Ensure all machines can resolve each other's hostnames by editing the ",(0,s.kt)("inlineCode",{parentName:"p"},"/etc/hosts")," file on each machine:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Login as root\nsudo su -\n\n# Edit the hosts file\nvi /etc/hosts\n\n# Add entries for all machines (use your actual IP addresses and hostnames)\n192.168.1.10 server-hostname\n192.168.1.11 agent-machine1-hostname\n192.168.1.12 agent-machine2-hostname\n# Add more entries for additional machines\n")),(0,s.kt)("p",null,"Make sure these changes are identical across all machines. This step is critical for Ambari to function properly, as it relies on hostname resolution for communication between the server and agents."),(0,s.kt)("h2",{id:"2-configure-security-settings"},"2. Configure Security Settings"),(0,s.kt)("h3",{id:"21-disable-selinux-on-all-machines"},"2.1 Disable SELinux on All Machines"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Temporarily disable SELinux\nsetenforce 0\n\n# Permanently disable SELinux\nsed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config\n")),(0,s.kt)("h3",{id:"22-configure-firewall-on-all-machines"},"2.2 Configure Firewall on All Machines"),(0,s.kt)("p",null,"For development environments, you may disable the firewall:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Disable and stop firewalld\nsystemctl disable firewalld\nsystemctl stop firewalld\n")),(0,s.kt)("h2",{id:"3-configure-ssh-access"},"3. Configure SSH Access"),(0,s.kt)("p",null,"Similar to the Vagrant environment setup, you need to configure passwordless SSH access from the Ambari Server to all agent machines."),(0,s.kt)("h3",{id:"31-generate-ssh-key-on-the-server-machine"},"3.1 Generate SSH Key on the Server Machine"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'# Login as root on the server machine\nsudo su -\n\n# Generate SSH key if not exists\nif [ ! -f ~/.ssh/id_rsa ]; then\n  ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nfi\n')),(0,s.kt)("h3",{id:"32-configure-ssh-for-password-authentication"},"3.2 Configure SSH for Password Authentication"),(0,s.kt)("p",null,"Edit the SSH configuration on all machines if not already configured:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Edit sshd_config\nvi /etc/ssh/sshd_config\n\n# Ensure these lines are set\nPasswordAuthentication yes\nPermitRootLogin yes\n\n# Restart SSH service\nsystemctl restart sshd\n")),(0,s.kt)("h3",{id:"33-distribute-ssh-keys-from-server-to-agents"},"3.3 Distribute SSH Keys from Server to Agents"),(0,s.kt)("p",null,"From the Ambari server machine, copy your SSH key to each agent machine:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'# Copy SSH key to all agent machines (replace with your actual hostnames)\nssh-copy-id -o StrictHostKeyChecking=no root@agent-machine1-hostname\nssh-copy-id -o StrictHostKeyChecking=no root@agent-machine2-hostname\n# Repeat for additional agent machines\n\n# Test SSH connections (replace with your actual hostnames)\nssh root@agent-machine1-hostname echo "Connection successful"\nssh root@agent-machine2-hostname echo "Connection successful"\n# Test additional connections as needed\n')),(0,s.kt)("h2",{id:"4-install-required-packages-on-all-machines"},"4. Install Required Packages on All Machines"),(0,s.kt)("h3",{id:"41-update-the-system-and-install-basic-utilities"},"4.1 Update the System and Install Basic Utilities"),(0,s.kt)("p",null,"Run these commands on all machines:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Update package lists and upgrade packages\ndnf update -y\n\n# Install basic utilities\ndnf install -y sudo openssh-server openssh-clients which iproute net-tools less vim-enhanced\ndnf install -y wget curl tar unzip git\n")),(0,s.kt)("h3",{id:"42-enable-development-repository"},"4.2 Enable Development Repository"),(0,s.kt)("p",null,"The Rocky Linux development repository needs to be enabled on all machines to install dependencies required for Ambari:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},'# Edit the Rocky-Devel repository configuration\nvi /etc/yum.repos.d/Rocky-Devel.repo\n\n# There are two possible scenarios:\n# 1. If all lines are commented (start with #), uncomment all lines\n# 2. If you see "enabled=0", change it to "enabled=1"\n\n# After editing, verify the repository is enabled\ndnf repolist | grep devel\n')),(0,s.kt)("h3",{id:"43-install-java-on-all-machines"},"4.3 Install Java on All Machines"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Install OpenJDK 8\ndnf install -y java-1.8.0-openjdk-devel\n\n# Verify Java installation\njava -version\n")),(0,s.kt)("h2",{id:"5-configure-network-time-protocol-ntp"},"5. Configure Network Time Protocol (NTP)"),(0,s.kt)("p",null,"Synchronize time across all machines:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Install chrony (NTP implementation)\ndnf install -y chrony\n\n# Start and enable chronyd service\nsystemctl start chronyd\nsystemctl enable chronyd\n\n# Verify time synchronization\nchronyc sources\n")),(0,s.kt)("h2",{id:"6-verify-the-environment"},"6. Verify the Environment"),(0,s.kt)("h3",{id:"61-check-network-connectivity"},"6.1 Check Network Connectivity"),(0,s.kt)("p",null,"From the server machine, test connectivity to all agent machines:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Test connectivity to all agent machines (replace with your actual hostnames)\nping -c 2 agent-machine1-hostname\nping -c 2 agent-machine2-hostname\n# Test additional machines as needed\n")),(0,s.kt)("h3",{id:"62-verify-ssh-access"},"6.2 Verify SSH Access"),(0,s.kt)("p",null,"From the server machine, verify SSH access to all agent machines:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Verify SSH access to all agent machines (replace with your actual hostnames)\nssh root@agent-machine1-hostname hostname\nssh root@agent-machine2-hostname hostname\n# Verify additional machines as needed\n")),(0,s.kt)("h3",{id:"63-verify-security-settings"},"6.3 Verify Security Settings"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Check SELinux status on all machines (replace with your actual hostnames)\nfor host in server-hostname agent-machine1-hostname agent-machine2-hostname; do\n  echo \"=== $host SELinux Status ===\"\n  ssh root@$host getenforce  # Should show 'Disabled'\ndone\n\n# Check firewall status on all machines (replace with your actual hostnames)\nfor host in server-hostname agent-machine1-hostname agent-machine2-hostname; do\n  echo \"=== $host Firewall Status ===\"\n  ssh root@$host systemctl status firewalld  # Should show 'inactive' for dev environments\ndone\n")),(0,s.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,s.kt)("h3",{id:"network-issues"},"Network Issues"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Check network interfaces\nip addr show\n\n# Test DNS resolution (replace with your actual hostnames)\nnslookup server-hostname\nnslookup agent-machine1-hostname\nnslookup agent-machine2-hostname\n")),(0,s.kt)("h3",{id:"ssh-issues"},"SSH Issues"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Check SSH service status\nsystemctl status sshd\n\n# Verify SSH key permissions\nls -la ~/.ssh/\n\n# Check SSH configuration\ncat /etc/ssh/sshd_config | grep PasswordAuthentication\ncat /etc/ssh/sshd_config | grep PermitRootLogin\n")),(0,s.kt)("h3",{id:"selinux-issues"},"SELinux Issues"),(0,s.kt)("p",null,"If you encounter permission problems even after disabling SELinux:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"# Verify SELinux is disabled\ngetenforce\n\n# If it shows 'Enforcing', disable it again\nsetenforce 0\n")),(0,s.kt)("h2",{id:"next-steps"},"Next Steps"),(0,s.kt)("p",null,"Now that your bare metal or KVM environment is configured, proceed to the ",(0,s.kt)("a",{parentName:"p",href:"/docs/quick-start/installation-guide"},"Installation Guide")," to install and configure Ambari Server and Agents. The installation guide provides standardized instructions that work across all environments (Vagrant, Docker, and bare metal/KVM)."),(0,s.kt)("p",null,"When following the installation guide, remember:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"All commands should be run as root"),(0,s.kt)("li",{parentName:"ol"},"Run Ambari Server setup and installation on the designated server machine"),(0,s.kt)("li",{parentName:"ol"},"Run Ambari Agent installation on all machines"),(0,s.kt)("li",{parentName:"ol"},"Access the Ambari Web UI via the server machine's IP address on port 8080 (http://server-hostname:8080)")))}h.isMDXComponent=!0}}]);