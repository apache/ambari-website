"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[4007],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>h});var o=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,i=function(e,n){if(null==e)return{};var t,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=o.createContext({}),c=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},p=function(e){var n=c(e.components);return o.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(t),h=i,d=u["".concat(l,".").concat(h)]||u[h]||m[h]||a;return t?o.createElement(d,r(r({ref:n},p),{},{components:t})):o.createElement(d,r({ref:n},p))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,r=new Array(a);r[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var c=2;c<a;c++)r[c]=t[c];return o.createElement.apply(null,r)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},24826:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var o=t(87462),i=(t(67294),t(3905));const a={sidebar_position:3},r="Docker Environment Setup for Apache Ambari",s={unversionedId:"quick-start/environment-setup/docker-environment-setup",id:"version-3.0.0/quick-start/environment-setup/docker-environment-setup",title:"Docker Environment Setup for Apache Ambari",description:"This guide helps you set up a Docker environment for Apache Ambari development and testing. Using Docker containers provides a lightweight alternative to full virtual machines while still allowing you to create a multi-node environment for Ambari.",source:"@site/versioned_docs/version-3.0.0/quick-start/environment-setup/docker-environment-setup.md",sourceDirName:"quick-start/environment-setup",slug:"/quick-start/environment-setup/docker-environment-setup",permalink:"/docs/quick-start/environment-setup/docker-environment-setup",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/quick-start/environment-setup/docker-environment-setup.md",tags:[],version:"3.0.0",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"ambariSidebar",previous:{title:"Vagrant Environment Setup for Apache Ambari",permalink:"/docs/quick-start/environment-setup/vagrant-environment-setup"},next:{title:"Bare Metal and KVM Environment Setup for Apache Ambari",permalink:"/docs/quick-start/environment-setup/bare-metal-kvm-setup"}},l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Useful Docker Shortcuts",id:"useful-docker-shortcuts",level:2},{value:"Quick Container Access",id:"quick-container-access",level:3},{value:"Overview",id:"overview",level:2},{value:"1. Create a Docker Compose File",id:"1-create-a-docker-compose-file",level:2},{value:"2. Create a Directory for Ambari Repository",id:"2-create-a-directory-for-ambari-repository",level:2},{value:"3. Create a Hosts File",id:"3-create-a-hosts-file",level:2},{value:"4. Understanding the BigTop Image",id:"4-understanding-the-bigtop-image",level:2},{value:"5. Start the Docker Environment",id:"5-start-the-docker-environment",level:2},{value:"6. Verify the Environment",id:"6-verify-the-environment",level:2},{value:"7. Configure SSH Access Between Containers",id:"7-configure-ssh-access-between-containers",level:2},{value:"8. Disable Security Features",id:"8-disable-security-features",level:2},{value:"9. Install Required Packages on All Containers",id:"9-install-required-packages-on-all-containers",level:2},{value:"10. Enable Development Repository",id:"10-enable-development-repository",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Container Connectivity Issues",id:"container-connectivity-issues",level:3},{value:"SSH Issues",id:"ssh-issues",level:3},{value:"Resource Issues",id:"resource-issues",level:3},{value:"BigTop Image Specific Issues",id:"bigtop-image-specific-issues",level:3},{value:"Next Steps",id:"next-steps",level:2}],p={toc:c};function m(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,o.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"docker-environment-setup-for-apache-ambari"},"Docker Environment Setup for Apache Ambari"),(0,i.kt)("p",null,"This guide helps you set up a Docker environment for Apache Ambari development and testing. Using Docker containers provides a lightweight alternative to full virtual machines while still allowing you to create a multi-node environment for Ambari."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"Before proceeding, ensure you have the following installed on your system:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Docker Engine (version 20.10.0 or later)"),(0,i.kt)("li",{parentName:"ul"},"Docker Compose (version 2.0.0 or later)"),(0,i.kt)("li",{parentName:"ul"},"At least 8GB of free RAM (for a 4-node cluster)"),(0,i.kt)("li",{parentName:"ul"},"At least 20GB of free disk space")),(0,i.kt)("h2",{id:"useful-docker-shortcuts"},"Useful Docker Shortcuts"),(0,i.kt)("h3",{id:"quick-container-access"},"Quick Container Access"),(0,i.kt)("p",null,"To make it easier to access your Docker containers, you can add a helpful shell function to your system. This function allows you to quickly enter any container with a simple command."),(0,i.kt)("p",null,"Add the following function to your ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/profile")," (requires root access):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'# Login as root or use sudo\nsudo su -\n\n# Edit the profile file\nvi /etc/profile\n\n# Add this function at the end of the file\ndke() {\n    docker exec -it "$1" /bin/bash\n}\n\n# Save the file and exit\n# Source the profile to apply changes immediately\nsource /etc/profile\n')),(0,i.kt)("p",null,"After adding this function, you can quickly enter any container using:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Enter the Ambari server container\ndke bigtop_hostname0\n\n# Enter an agent container\ndke bigtop_hostname1\n")),(0,i.kt)("p",null,"This shortcut saves you from typing the full ",(0,i.kt)("inlineCode",{parentName:"p"},"docker exec -it container_name /bin/bash")," command each time you need to access a container."),(0,i.kt)("h2",{id:"overview"},"Overview"),(0,i.kt)("p",null,"This setup creates a multi-container environment with:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"One container (",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname0"),") for the Ambari Server"),(0,i.kt)("li",{parentName:"ul"},"Three containers (",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname1"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname2"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname3"),") for Ambari Agents"),(0,i.kt)("li",{parentName:"ul"},"A shared volume for the Ambari repository"),(0,i.kt)("li",{parentName:"ul"},"The BigTop image which includes many pre-configured dependencies")),(0,i.kt)("p",null,"The setup uses the ",(0,i.kt)("inlineCode",{parentName:"p"},"bigtop/puppet:trunk-rockylinux-8")," image, which is pre-configured with many of the dependencies needed for Ambari and Hadoop services."),(0,i.kt)("h2",{id:"1-create-a-docker-compose-file"},"1. Create a Docker Compose File"),(0,i.kt)("p",null,"Create a file named ",(0,i.kt)("inlineCode",{parentName:"p"},"docker-compose.yml")," with the following content:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"version: '3'\n\nservices:\n  bigtop_hostname0:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    ports:\n      - \"8080:8080\"\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n\n  bigtop_hostname1:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n\n  bigtop_hostname2:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n\n  bigtop_hostname3:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n")),(0,i.kt)("p",null,"This configuration creates four containers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname0"),": Ambari Server node with port 8080 exposed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname1"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname2"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname3"),": Ambari Agent nodes")),(0,i.kt)("p",null,"Each container uses the ",(0,i.kt)("inlineCode",{parentName:"p"},"bigtop/puppet:trunk-rockylinux-8")," image, which is pre-configured with many of the dependencies needed for Ambari and Hadoop services."),(0,i.kt)("h2",{id:"2-create-a-directory-for-ambari-repository"},"2. Create a Directory for Ambari Repository"),(0,i.kt)("p",null,"Create a directory to store Ambari RPMs that will be shared with all containers:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir -p ambari-repo\n")),(0,i.kt)("p",null,"If you have Ambari RPMs, place them in this directory. Otherwise, you'll configure the containers to use online repositories later."),(0,i.kt)("h2",{id:"3-create-a-hosts-file"},"3. Create a Hosts File"),(0,i.kt)("p",null,"The containers need to be able to communicate with each other using hostnames. Create a hosts file that will be mounted in each container:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir -p conf\ncat > conf/hosts << EOF\n127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4\n::1         localhost localhost.localdomain localhost6 localhost6.localdomain6\n\n# Container hostnames\n172.20.0.2  bigtop_hostname0\n172.20.0.3  bigtop_hostname1\n172.20.0.4  bigtop_hostname2\n172.20.0.5  bigtop_hostname3\nEOF\n")),(0,i.kt)("p",null,"Now update your docker-compose.yml to mount this hosts file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"version: '3'\n\nservices:\n  bigtop_hostname0:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    ports:\n      - \"8080:8080\"\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n\n  bigtop_hostname1:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n\n  bigtop_hostname2:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n\n  bigtop_hostname3:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n")),(0,i.kt)("h2",{id:"4-understanding-the-bigtop-image"},"4. Understanding the BigTop Image"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"bigtop/puppet:trunk-rockylinux-8")," image is part of the Apache BigTop project, which provides a framework for building and testing Hadoop-related projects. This image includes:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Rocky Linux 8 as the base OS"),(0,i.kt)("li",{parentName:"ul"},"Pre-installed Java and development tools"),(0,i.kt)("li",{parentName:"ul"},"Puppet for configuration management"),(0,i.kt)("li",{parentName:"ul"},"System configurations optimized for Hadoop ecosystem services")),(0,i.kt)("p",null,"Using this image simplifies the setup process as many of the dependencies required for Ambari are already installed or configured."),(0,i.kt)("h2",{id:"5-start-the-docker-environment"},"5. Start the Docker Environment"),(0,i.kt)("p",null,"Launch the Docker containers:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose up -d\n")),(0,i.kt)("p",null,"This command starts the containers in detached mode. You should see output indicating that the containers are being created."),(0,i.kt)("h2",{id:"6-verify-the-environment"},"6. Verify the Environment"),(0,i.kt)("p",null,"Ensure all containers are running and properly configured:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Check container status\ndocker ps\n\n# Test network connectivity between containers\ndocker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname1\ndocker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname2\ndocker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname3\n")),(0,i.kt)("h2",{id:"7-configure-ssh-access-between-containers"},"7. Configure SSH Access Between Containers"),(0,i.kt)("p",null,"SSH setup is required for Ambari to function properly. Execute these commands:"),(0,i.kt)("p",null,"First, on the bigtop_hostname0 container:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'docker exec -it bigtop_hostname0 bash\n\n# Generate SSH key\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\n\n# Start SSH service\nsystemctl enable sshd\nsystemctl start sshd\n\n# Exit the container\nexit\n')),(0,i.kt)("p",null,"Now set up SSH on the agent containers and copy the server's key:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'# For bigtop_hostname1\ndocker exec -it bigtop_hostname1 bash\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nsystemctl enable sshd\nsystemctl start sshd\nexit\n\n# For bigtop_hostname2\ndocker exec -it bigtop_hostname2 bash\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nsystemctl enable sshd\nsystemctl start sshd\nexit\n\n# For bigtop_hostname3\ndocker exec -it bigtop_hostname3 bash\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nsystemctl enable sshd\nsystemctl start sshd\nexit\n\n# Copy SSH key from server to agents\ndocker exec -it bigtop_hostname0 bash\ncat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname1 bash -c \'cat >> ~/.ssh/authorized_keys\'\ncat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname2 bash -c \'cat >> ~/.ssh/authorized_keys\'\ncat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname3 bash -c \'cat >> ~/.ssh/authorized_keys\'\n\n# Test SSH connections\nssh -o StrictHostKeyChecking=no bigtop_hostname1 echo "Connection successful"\nssh -o StrictHostKeyChecking=no bigtop_hostname2 echo "Connection successful"\nssh -o StrictHostKeyChecking=no bigtop_hostname3 echo "Connection successful"\nexit\n')),(0,i.kt)("h2",{id:"8-disable-security-features"},"8. Disable Security Features"),(0,i.kt)("p",null,"For development environments, disable SELinux and firewall on all containers:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)\ndocker exec -it bigtop_hostname0 bash\nsetenforce 0\nsed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config\nexit\n")),(0,i.kt)("h2",{id:"9-install-required-packages-on-all-containers"},"9. Install Required Packages on All Containers"),(0,i.kt)("p",null,"Execute these commands on each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Example for bigtop_hostname0 container\ndocker exec -it bigtop_hostname0 bash\n\n# Install basic utilities\ndnf install -y sudo openssh-server openssh-clients which iproute net-tools less vim-enhanced\n\n# Install development tools\ndnf install -y initscripts wget curl tar unzip git\n\n# Enable PowerTools repository (needed for some dependencies)\ndnf install -y dnf-plugins-core\ndnf config-manager --set-enabled powertools\n\n# Update the system\ndnf update -y\n\n# Exit the container\nexit\n")),(0,i.kt)("p",null,"Repeat for bigtop_hostname1, bigtop_hostname2, and bigtop_hostname3 containers."),(0,i.kt)("h2",{id:"10-enable-development-repository"},"10. Enable Development Repository"),(0,i.kt)("p",null,"The Rocky Linux development repository needs to be enabled on each container to install dependencies required for Ambari:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)\ndocker exec -it bigtop_hostname0 bash\n\n# Edit the Rocky-Devel repository configuration\nvi /etc/yum.repos.d/Rocky-Devel.repo\n\n# There are two possible scenarios:\n# 1. If all lines are commented (start with #), uncomment all lines\n# 2. If you see "enabled=0", change it to "enabled=1"\n\n# After editing, verify the repository is enabled\ndnf repolist | grep devel\nexit\n')),(0,i.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,i.kt)("p",null,"If you encounter issues with the Docker environment:"),(0,i.kt)("h3",{id:"container-connectivity-issues"},"Container Connectivity Issues"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Check if all containers are running\ndocker ps -a\n\n# Check network configuration\ndocker network inspect bridge\n\n# Restart a specific container\ndocker restart bigtop_hostname0\n")),(0,i.kt)("h3",{id:"ssh-issues"},"SSH Issues"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Check SSH service status\ndocker exec -it bigtop_hostname0 systemctl status sshd\n\n# Verify SSH key permissions\ndocker exec -it bigtop_hostname0 ls -la ~/.ssh/\n\n# Check SSH configuration\ndocker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PasswordAuthentication\ndocker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PermitRootLogin\n")),(0,i.kt)("h3",{id:"resource-issues"},"Resource Issues"),(0,i.kt)("p",null,"If containers are terminating unexpectedly, you might need to allocate more resources to Docker:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Check container logs\ndocker logs bigtop_hostname0\n\n# Check resource usage\ndocker stats\n")),(0,i.kt)("h3",{id:"bigtop-image-specific-issues"},"BigTop Image Specific Issues"),(0,i.kt)("p",null,"If you encounter issues with the BigTop image:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Check if Java is installed correctly\ndocker exec -it bigtop_hostname0 java -version\n\n# Verify puppet is available\ndocker exec -it bigtop_hostname0 puppet --version\n\n# Check for any BigTop-specific logs\ndocker exec -it bigtop_hostname0 ls -la /var/log/\n")),(0,i.kt)("h2",{id:"next-steps"},"Next Steps"),(0,i.kt)("p",null,"Now that your Docker environment is set up, proceed to the ",(0,i.kt)("a",{parentName:"p",href:"/docs/quick-start/installation-guide"},"Installation Guide")," to install and configure Ambari Server and Agents. The installation guide provides standardized instructions that work across all environments (Vagrant, Docker, and bare metal/KVM)."),(0,i.kt)("p",null,"When following the installation guide, remember:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"All commands should be run as root (which is the default user in the BigTop containers)"),(0,i.kt)("li",{parentName:"ol"},"Run Ambari Server setup and installation on the ",(0,i.kt)("inlineCode",{parentName:"li"},"bigtop_hostname0")," container"),(0,i.kt)("li",{parentName:"ol"},"Run Ambari Agent installation on all containers"),(0,i.kt)("li",{parentName:"ol"},"Access the Ambari Web UI via http://localhost:8080 after installation")),(0,i.kt)("p",null,"The Docker environment provides a lightweight and reproducible way to test and develop with Apache Ambari, while following the same installation and configuration steps as other deployment methods."))}m.isMDXComponent=!0}}]);