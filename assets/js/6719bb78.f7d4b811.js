"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[1289],{28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>a});var s=i(96540);const t={},o=s.createContext(t);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:n},e.children)}},93124:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"quick-start/docker-environment-setup","title":"Docker Environment Setup for Apache Ambari","description":"This guide helps you set up a Docker environment for Apache Ambari development and testing. Using Docker containers provides a lightweight alternative to full virtual machines while still allowing you to create a multi-node environment for Ambari.","source":"@site/docs/quick-start/docker-environment-setup.md","sourceDirName":"quick-start","slug":"/quick-start/docker-environment-setup","permalink":"/docs/next/quick-start/docker-environment-setup","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/docs/quick-start/docker-environment-setup.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3}}');var t=i(74848),o=i(28453);const r={sidebar_position:3},a="Docker Environment Setup for Apache Ambari",c={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Overview",id:"overview",level:2},{value:"1. Create a Docker Compose File",id:"1-create-a-docker-compose-file",level:2},{value:"2. Create a Directory for Ambari Repository",id:"2-create-a-directory-for-ambari-repository",level:2},{value:"3. Create a Hosts File",id:"3-create-a-hosts-file",level:2},{value:"4. Understanding the BigTop Image",id:"4-understanding-the-bigtop-image",level:2},{value:"5. Start the Docker Environment",id:"5-start-the-docker-environment",level:2},{value:"6. Verify the Environment",id:"6-verify-the-environment",level:2},{value:"7. Configure SSH Access Between Containers",id:"7-configure-ssh-access-between-containers",level:2},{value:"8. Disable Security Features",id:"8-disable-security-features",level:2},{value:"9. Install Required Packages on All Containers",id:"9-install-required-packages-on-all-containers",level:2},{value:"10. Enable Development Repository",id:"10-enable-development-repository",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Container Connectivity Issues",id:"container-connectivity-issues",level:3},{value:"SSH Issues",id:"ssh-issues",level:3},{value:"Resource Issues",id:"resource-issues",level:3},{value:"BigTop Image Specific Issues",id:"bigtop-image-specific-issues",level:3},{value:"Next Steps",id:"next-steps",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"docker-environment-setup-for-apache-ambari",children:"Docker Environment Setup for Apache Ambari"})}),"\n",(0,t.jsx)(n.p,{children:"This guide helps you set up a Docker environment for Apache Ambari development and testing. Using Docker containers provides a lightweight alternative to full virtual machines while still allowing you to create a multi-node environment for Ambari."}),"\n",(0,t.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsx)(n.p,{children:"Before proceeding, ensure you have the following installed on your system:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Docker Engine (version 20.10.0 or later)"}),"\n",(0,t.jsx)(n.li,{children:"Docker Compose (version 2.0.0 or later)"}),"\n",(0,t.jsx)(n.li,{children:"At least 8GB of free RAM (for a 4-node cluster)"}),"\n",(0,t.jsx)(n.li,{children:"At least 20GB of free disk space"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(n.p,{children:"This setup creates a multi-container environment with:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["One container (",(0,t.jsx)(n.code,{children:"bigtop_hostname0"}),") for the Ambari Server"]}),"\n",(0,t.jsxs)(n.li,{children:["Three containers (",(0,t.jsx)(n.code,{children:"bigtop_hostname1"}),", ",(0,t.jsx)(n.code,{children:"bigtop_hostname2"}),", ",(0,t.jsx)(n.code,{children:"bigtop_hostname3"}),") for Ambari Agents"]}),"\n",(0,t.jsx)(n.li,{children:"A shared volume for the Ambari repository"}),"\n",(0,t.jsx)(n.li,{children:"The BigTop image which includes many pre-configured dependencies"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The setup uses the ",(0,t.jsx)(n.code,{children:"bigtop/puppet:trunk-rockylinux-8"})," image, which is pre-configured with many of the dependencies needed for Ambari and Hadoop services."]}),"\n",(0,t.jsx)(n.h2,{id:"1-create-a-docker-compose-file",children:"1. Create a Docker Compose File"}),"\n",(0,t.jsxs)(n.p,{children:["Create a file named ",(0,t.jsx)(n.code,{children:"docker-compose.yml"})," with the following content:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"version: '3'\n\nservices:\n  bigtop_hostname0:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    ports:\n      - \"8080:8080\"\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n\n  bigtop_hostname1:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n\n  bigtop_hostname2:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n\n  bigtop_hostname3:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n"})}),"\n",(0,t.jsx)(n.p,{children:"This configuration creates four containers:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"bigtop_hostname0"}),": Ambari Server node with port 8080 exposed"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"bigtop_hostname1"}),", ",(0,t.jsx)(n.code,{children:"bigtop_hostname2"}),", ",(0,t.jsx)(n.code,{children:"bigtop_hostname3"}),": Ambari Agent nodes"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Each container uses the ",(0,t.jsx)(n.code,{children:"bigtop/puppet:trunk-rockylinux-8"})," image, which is pre-configured with many of the dependencies needed for Ambari and Hadoop services."]}),"\n",(0,t.jsx)(n.h2,{id:"2-create-a-directory-for-ambari-repository",children:"2. Create a Directory for Ambari Repository"}),"\n",(0,t.jsx)(n.p,{children:"Create a directory to store Ambari RPMs that will be shared with all containers:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir -p ambari-repo\n"})}),"\n",(0,t.jsx)(n.p,{children:"If you have Ambari RPMs, place them in this directory. Otherwise, you'll configure the containers to use online repositories later."}),"\n",(0,t.jsx)(n.h2,{id:"3-create-a-hosts-file",children:"3. Create a Hosts File"}),"\n",(0,t.jsx)(n.p,{children:"The containers need to be able to communicate with each other using hostnames. Create a hosts file that will be mounted in each container:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir -p conf\ncat > conf/hosts << EOF\n127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4\n::1         localhost localhost.localdomain localhost6 localhost6.localdomain6\n\n# Container hostnames\n172.20.0.2  bigtop_hostname0\n172.20.0.3  bigtop_hostname1\n172.20.0.4  bigtop_hostname2\n172.20.0.5  bigtop_hostname3\nEOF\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now update your docker-compose.yml to mount this hosts file:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"version: '3'\n\nservices:\n  bigtop_hostname0:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    ports:\n      - \"8080:8080\"\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n\n  bigtop_hostname1:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n\n  bigtop_hostname2:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n\n  bigtop_hostname3:\n    command: /sbin/init\n    domainname: bigtop.apache.org\n    image: bigtop/puppet:trunk-rockylinux-8\n    mem_limit: 8g\n    mem_swappiness: 0\n    privileged: true\n    volumes:\n      - ./ambari-repo:/var/repo/ambari\n      - ./conf/hosts:/etc/hosts\n"})}),"\n",(0,t.jsx)(n.h2,{id:"4-understanding-the-bigtop-image",children:"4. Understanding the BigTop Image"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"bigtop/puppet:trunk-rockylinux-8"})," image is part of the Apache BigTop project, which provides a framework for building and testing Hadoop-related projects. This image includes:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Rocky Linux 8 as the base OS"}),"\n",(0,t.jsx)(n.li,{children:"Pre-installed Java and development tools"}),"\n",(0,t.jsx)(n.li,{children:"Puppet for configuration management"}),"\n",(0,t.jsx)(n.li,{children:"System configurations optimized for Hadoop ecosystem services"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Using this image simplifies the setup process as many of the dependencies required for Ambari are already installed or configured."}),"\n",(0,t.jsx)(n.h2,{id:"5-start-the-docker-environment",children:"5. Start the Docker Environment"}),"\n",(0,t.jsx)(n.p,{children:"Launch the Docker containers:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker-compose up -d\n"})}),"\n",(0,t.jsx)(n.p,{children:"This command starts the containers in detached mode. You should see output indicating that the containers are being created."}),"\n",(0,t.jsx)(n.h2,{id:"6-verify-the-environment",children:"6. Verify the Environment"}),"\n",(0,t.jsx)(n.p,{children:"Ensure all containers are running and properly configured:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Check container status\ndocker ps\n\n# Test network connectivity between containers\ndocker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname1\ndocker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname2\ndocker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname3\n"})}),"\n",(0,t.jsx)(n.h2,{id:"7-configure-ssh-access-between-containers",children:"7. Configure SSH Access Between Containers"}),"\n",(0,t.jsx)(n.p,{children:"SSH setup is required for Ambari to function properly. Execute these commands:"}),"\n",(0,t.jsx)(n.p,{children:"First, on the bigtop_hostname0 container:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'docker exec -it bigtop_hostname0 bash\n\n# Generate SSH key\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\n\n# Start SSH service\nsystemctl enable sshd\nsystemctl start sshd\n\n# Exit the container\nexit\n'})}),"\n",(0,t.jsx)(n.p,{children:"Now set up SSH on the agent containers and copy the server's key:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# For bigtop_hostname1\ndocker exec -it bigtop_hostname1 bash\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nsystemctl enable sshd\nsystemctl start sshd\nexit\n\n# For bigtop_hostname2\ndocker exec -it bigtop_hostname2 bash\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nsystemctl enable sshd\nsystemctl start sshd\nexit\n\n# For bigtop_hostname3\ndocker exec -it bigtop_hostname3 bash\nssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa\nsystemctl enable sshd\nsystemctl start sshd\nexit\n\n# Copy SSH key from server to agents\ndocker exec -it bigtop_hostname0 bash\ncat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname1 bash -c \'cat >> ~/.ssh/authorized_keys\'\ncat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname2 bash -c \'cat >> ~/.ssh/authorized_keys\'\ncat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname3 bash -c \'cat >> ~/.ssh/authorized_keys\'\n\n# Test SSH connections\nssh -o StrictHostKeyChecking=no bigtop_hostname1 echo "Connection successful"\nssh -o StrictHostKeyChecking=no bigtop_hostname2 echo "Connection successful"\nssh -o StrictHostKeyChecking=no bigtop_hostname3 echo "Connection successful"\nexit\n'})}),"\n",(0,t.jsx)(n.h2,{id:"8-disable-security-features",children:"8. Disable Security Features"}),"\n",(0,t.jsx)(n.p,{children:"For development environments, disable SELinux and firewall on all containers:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)\ndocker exec -it bigtop_hostname0 bash\nsetenforce 0\nsed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config\nexit\n"})}),"\n",(0,t.jsx)(n.h2,{id:"9-install-required-packages-on-all-containers",children:"9. Install Required Packages on All Containers"}),"\n",(0,t.jsx)(n.p,{children:"Execute these commands on each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3):"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Example for bigtop_hostname0 container\ndocker exec -it bigtop_hostname0 bash\n\n# Install basic utilities\ndnf install -y sudo openssh-server openssh-clients which iproute net-tools less vim-enhanced\n\n# Install development tools\ndnf install -y initscripts wget curl tar unzip git\n\n# Enable PowerTools repository (needed for some dependencies)\ndnf install -y dnf-plugins-core\ndnf config-manager --set-enabled powertools\n\n# Update the system\ndnf update -y\n\n# Exit the container\nexit\n"})}),"\n",(0,t.jsx)(n.p,{children:"Repeat for bigtop_hostname1, bigtop_hostname2, and bigtop_hostname3 containers."}),"\n",(0,t.jsx)(n.h2,{id:"10-enable-development-repository",children:"10. Enable Development Repository"}),"\n",(0,t.jsx)(n.p,{children:"The Rocky Linux development repository needs to be enabled on each container to install dependencies required for Ambari:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)\ndocker exec -it bigtop_hostname0 bash\n\n# Edit the Rocky-Devel repository configuration\nvi /etc/yum.repos.d/Rocky-Devel.repo\n\n# There are two possible scenarios:\n# 1. If all lines are commented (start with #), uncomment all lines\n# 2. If you see "enabled=0", change it to "enabled=1"\n\n# After editing, verify the repository is enabled\ndnf repolist | grep devel\nexit\n'})}),"\n",(0,t.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,t.jsx)(n.p,{children:"If you encounter issues with the Docker environment:"}),"\n",(0,t.jsx)(n.h3,{id:"container-connectivity-issues",children:"Container Connectivity Issues"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Check if all containers are running\ndocker ps -a\n\n# Check network configuration\ndocker network inspect bridge\n\n# Restart a specific container\ndocker restart bigtop_hostname0\n"})}),"\n",(0,t.jsx)(n.h3,{id:"ssh-issues",children:"SSH Issues"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Check SSH service status\ndocker exec -it bigtop_hostname0 systemctl status sshd\n\n# Verify SSH key permissions\ndocker exec -it bigtop_hostname0 ls -la ~/.ssh/\n\n# Check SSH configuration\ndocker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PasswordAuthentication\ndocker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PermitRootLogin\n"})}),"\n",(0,t.jsx)(n.h3,{id:"resource-issues",children:"Resource Issues"}),"\n",(0,t.jsx)(n.p,{children:"If containers are terminating unexpectedly, you might need to allocate more resources to Docker:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Check container logs\ndocker logs bigtop_hostname0\n\n# Check resource usage\ndocker stats\n"})}),"\n",(0,t.jsx)(n.h3,{id:"bigtop-image-specific-issues",children:"BigTop Image Specific Issues"}),"\n",(0,t.jsx)(n.p,{children:"If you encounter issues with the BigTop image:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Check if Java is installed correctly\ndocker exec -it bigtop_hostname0 java -version\n\n# Verify puppet is available\ndocker exec -it bigtop_hostname0 puppet --version\n\n# Check for any BigTop-specific logs\ndocker exec -it bigtop_hostname0 ls -la /var/log/\n"})}),"\n",(0,t.jsx)(n.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,t.jsxs)(n.p,{children:["Now that your Docker environment is set up, proceed to the ",(0,t.jsx)(n.a,{href:"/docs/next/quick-start/installation-guide",children:"Installation Guide"})," to install and configure Ambari Server and Agents. The installation guide provides standardized instructions that work across all environments (Vagrant, Docker, and bare metal/KVM)."]}),"\n",(0,t.jsx)(n.p,{children:"When following the installation guide, remember:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"All commands should be run as root (which is the default user in the BigTop containers)"}),"\n",(0,t.jsxs)(n.li,{children:["Run Ambari Server setup and installation on the ",(0,t.jsx)(n.code,{children:"bigtop_hostname0"})," container"]}),"\n",(0,t.jsx)(n.li,{children:"Run Ambari Agent installation on all containers"}),"\n",(0,t.jsxs)(n.li,{children:["Access the Ambari Web UI via ",(0,t.jsx)(n.a,{href:"http://localhost:8080",children:"http://localhost:8080"})," after installation"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"The Docker environment provides a lightweight and reproducible way to test and develop with Apache Ambari, while following the same installation and configuration steps as other deployment methods."})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}}}]);