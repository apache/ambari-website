---
sidebar_position: 3
---

# Docker Environment Setup for Apache Ambari

This guide helps you set up a Docker environment for Apache Ambari development and testing. Using Docker containers provides a lightweight alternative to full virtual machines while still allowing you to create a multi-node environment for Ambari.

## Prerequisites

Before proceeding, ensure you have the following installed on your system:

- Docker Engine (version 20.10.0 or later)
- Docker Compose (version 2.0.0 or later)
- At least 8GB of free RAM (for a 4-node cluster)
- At least 20GB of free disk space

## Useful Docker Shortcuts

### Quick Container Access

To make it easier to access your Docker containers, you can add a helpful shell function to your system. This function allows you to quickly enter any container with a simple command.

Add the following function to your `/etc/profile` (requires root access):

```bash
# Login as root or use sudo
sudo su -

# Edit the profile file
vi /etc/profile

# Add this function at the end of the file
dke() {
    docker exec -it "$1" /bin/bash
}

# Save the file and exit
# Source the profile to apply changes immediately
source /etc/profile
```

After adding this function, you can quickly enter any container using:

```bash
# Enter the Ambari server container
dke bigtop_hostname0

# Enter an agent container
dke bigtop_hostname1
```

This shortcut saves you from typing the full `docker exec -it container_name /bin/bash` command each time you need to access a container.

## Overview

This setup creates a multi-container environment with:

- One container (`bigtop_hostname0`) for the Ambari Server
- Three containers (`bigtop_hostname1`, `bigtop_hostname2`, `bigtop_hostname3`) for Ambari Agents
- A shared volume for the Ambari repository
- The BigTop image which includes many pre-configured dependencies

The setup uses the `bigtop/puppet:trunk-rockylinux-8` image, which is pre-configured with many of the dependencies needed for Ambari and Hadoop services.

## 1. Create a Docker Compose File

Create a file named `docker-compose.yml` with the following content:

```yaml
version: '3'

services:
  bigtop_hostname0:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    ports:
      - "8080:8080"
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari

  bigtop_hostname1:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari

  bigtop_hostname2:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari

  bigtop_hostname3:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari
```

This configuration creates four containers:
- `bigtop_hostname0`: Ambari Server node with port 8080 exposed
- `bigtop_hostname1`, `bigtop_hostname2`, `bigtop_hostname3`: Ambari Agent nodes

Each container uses the `bigtop/puppet:trunk-rockylinux-8` image, which is pre-configured with many of the dependencies needed for Ambari and Hadoop services.

## 2. Create a Directory for Ambari Repository

Create a directory to store Ambari RPMs that will be shared with all containers:

```bash
mkdir -p ambari-repo
```

If you have Ambari RPMs, place them in this directory. Otherwise, you'll configure the containers to use online repositories later.

## 3. Create a Hosts File

The containers need to be able to communicate with each other using hostnames. Create a hosts file that will be mounted in each container:

```bash
mkdir -p conf
cat > conf/hosts << EOF
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

# Container hostnames
172.20.0.2  bigtop_hostname0
172.20.0.3  bigtop_hostname1
172.20.0.4  bigtop_hostname2
172.20.0.5  bigtop_hostname3
EOF
```

Now update your docker-compose.yml to mount this hosts file:

```yaml
version: '3'

services:
  bigtop_hostname0:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    ports:
      - "8080:8080"
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari
      - ./conf/hosts:/etc/hosts

  bigtop_hostname1:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari
      - ./conf/hosts:/etc/hosts

  bigtop_hostname2:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari
      - ./conf/hosts:/etc/hosts

  bigtop_hostname3:
    command: /sbin/init
    domainname: bigtop.apache.org
    image: bigtop/puppet:trunk-rockylinux-8
    mem_limit: 8g
    mem_swappiness: 0
    privileged: true
    volumes:
      - ./ambari-repo:/var/repo/ambari
      - ./conf/hosts:/etc/hosts
```

## 4. Understanding the BigTop Image

The `bigtop/puppet:trunk-rockylinux-8` image is part of the Apache BigTop project, which provides a framework for building and testing Hadoop-related projects. This image includes:

- Rocky Linux 8 as the base OS
- Pre-installed Java and development tools
- Puppet for configuration management
- System configurations optimized for Hadoop ecosystem services

Using this image simplifies the setup process as many of the dependencies required for Ambari are already installed or configured.

## 5. Start the Docker Environment

Launch the Docker containers:

```bash
docker-compose up -d
```

This command starts the containers in detached mode. You should see output indicating that the containers are being created.

## 6. Verify the Environment

Ensure all containers are running and properly configured:

```bash
# Check container status
docker ps

# Test network connectivity between containers
docker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname1
docker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname2
docker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname3
```

## 7. Configure SSH Access Between Containers

SSH setup is required for Ambari to function properly. Execute these commands:

First, on the bigtop_hostname0 container:

```bash
docker exec -it bigtop_hostname0 bash

# Generate SSH key
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa

# Start SSH service
systemctl enable sshd
systemctl start sshd

# Exit the container
exit
```

Now set up SSH on the agent containers and copy the server's key:

```bash
# For bigtop_hostname1
docker exec -it bigtop_hostname1 bash
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
systemctl enable sshd
systemctl start sshd
exit

# For bigtop_hostname2
docker exec -it bigtop_hostname2 bash
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
systemctl enable sshd
systemctl start sshd
exit

# For bigtop_hostname3
docker exec -it bigtop_hostname3 bash
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
systemctl enable sshd
systemctl start sshd
exit

# Copy SSH key from server to agents
docker exec -it bigtop_hostname0 bash
cat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname1 bash -c 'cat >> ~/.ssh/authorized_keys'
cat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname2 bash -c 'cat >> ~/.ssh/authorized_keys'
cat ~/.ssh/id_rsa.pub | docker exec -i bigtop_hostname3 bash -c 'cat >> ~/.ssh/authorized_keys'

# Test SSH connections
ssh -o StrictHostKeyChecking=no bigtop_hostname1 echo "Connection successful"
ssh -o StrictHostKeyChecking=no bigtop_hostname2 echo "Connection successful"
ssh -o StrictHostKeyChecking=no bigtop_hostname3 echo "Connection successful"
exit
```

## 8. Disable Security Features

For development environments, disable SELinux and firewall on all containers:

```bash
# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)
docker exec -it bigtop_hostname0 bash
setenforce 0
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
exit
```

## 9. Install Required Packages on All Containers

Execute these commands on each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3):

```bash
# Example for bigtop_hostname0 container
docker exec -it bigtop_hostname0 bash

# Install basic utilities
dnf install -y sudo openssh-server openssh-clients which iproute net-tools less vim-enhanced

# Install development tools
dnf install -y initscripts wget curl tar unzip git

# Enable PowerTools repository (needed for some dependencies)
dnf install -y dnf-plugins-core
dnf config-manager --set-enabled powertools

# Update the system
dnf update -y

# Exit the container
exit
```

Repeat for bigtop_hostname1, bigtop_hostname2, and bigtop_hostname3 containers.

## 10. Enable Development Repository

The Rocky Linux development repository needs to be enabled on each container to install dependencies required for Ambari:

```bash
# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)
docker exec -it bigtop_hostname0 bash

# Edit the Rocky-Devel repository configuration
vi /etc/yum.repos.d/Rocky-Devel.repo

# There are two possible scenarios:
# 1. If all lines are commented (start with #), uncomment all lines
# 2. If you see "enabled=0", change it to "enabled=1"

# After editing, verify the repository is enabled
dnf repolist | grep devel
exit
```

## Troubleshooting

If you encounter issues with the Docker environment:

### Container Connectivity Issues

```bash
# Check if all containers are running
docker ps -a

# Check network configuration
docker network inspect bridge

# Restart a specific container
docker restart bigtop_hostname0
```

### SSH Issues

```bash
# Check SSH service status
docker exec -it bigtop_hostname0 systemctl status sshd

# Verify SSH key permissions
docker exec -it bigtop_hostname0 ls -la ~/.ssh/

# Check SSH configuration
docker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PasswordAuthentication
docker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PermitRootLogin
```

### Resource Issues

If containers are terminating unexpectedly, you might need to allocate more resources to Docker:

```bash
# Check container logs
docker logs bigtop_hostname0

# Check resource usage
docker stats
```

### BigTop Image Specific Issues

If you encounter issues with the BigTop image:

```bash
# Check if Java is installed correctly
docker exec -it bigtop_hostname0 java -version

# Verify puppet is available
docker exec -it bigtop_hostname0 puppet --version

# Check for any BigTop-specific logs
docker exec -it bigtop_hostname0 ls -la /var/log/
```

## Next Steps

Now that your Docker environment is set up, proceed to the [Installation Guide](installation-guide.md) to install and configure Ambari Server and Agents. The installation guide provides standardized instructions that work across all environments (Vagrant, Docker, and bare metal/KVM).

When following the installation guide, remember:

1. All commands should be run as root (which is the default user in the BigTop containers)
2. Run Ambari Server setup and installation on the `bigtop_hostname0` container
3. Run Ambari Agent installation on all containers
4. Access the Ambari Web UI via http://localhost:8080 after installation

The Docker environment provides a lightweight and reproducible way to test and develop with Apache Ambari, while following the same installation and configuration steps as other deployment methods.
