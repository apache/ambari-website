---
sidebar_position: 3
title: Apache Ambari 的 Docker 环境设置
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# Apache Ambari 的 Docker 环境设置 {#docker-environment-setup-for-apache-ambari}

本指南帮助你设置用于 Apache Ambari 开发和测试的 Docker 环境。Docker 容器提供完整虚拟机的轻量替代方案，同时仍可创建 Ambari 多节点环境。

## 前提条件 {#prerequisites}

继续之前，请确保系统已安装以下软件：

- Docker Engine (20.10.0 或更高版本)
- Docker Compose（2.0.0 或更高版本）
- 至少 8GB 可用 RAM（用于四节点集群）
- 至少 20GB 可用磁盘空间

## 概览 {#overview}

此设置创建包含以下内容的多容器环境：

- 一个用于 Ambari Server 的容器（`bigtop_hostname0`）
- 三个用于 Ambari Agent 的容器（`bigtop_hostname1`、`bigtop_hostname2`、`bigtop_hostname3`）
- 用于 Ambari 仓库的共享卷
- 包含许多预配置依赖的 BigTop 镜像

此设置使用 `bigtop/puppet:trunk-rockylinux-8` 镜像，该镜像已预配置 Ambari 和 Hadoop 服务所需的许多依赖。

## 1. 创建 Docker Compose 文件 {#1-create-a-docker-compose-file}

创建名为 `docker-compose.yml` 的文件，内容如下：

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

此配置创建四个容器：
- `bigtop_hostname0`: 暴露 8080 端口的 Ambari Server 节点
- `bigtop_hostname1`, `bigtop_hostname2`, `bigtop_hostname3`: Ambari Agent 节点

每个容器都使用 `bigtop/puppet:trunk-rockylinux-8` 镜像，该镜像已预配置 Ambari 和 Hadoop 服务所需的许多依赖。

## 2. 创建 Ambari 仓库目录 {#2-create-a-directory-for-ambari-repository}

创建用于存放 Ambari RPM 且供所有容器共享的目录：

```bash
mkdir -p ambari-repo
```

如果有 Ambari RPM，请将其放入此目录。否则，稍后配置容器使用在线仓库。

## 3. 创建 Hosts 文件 {#3-create-a-hosts-file}

容器需要能够使用主机名相互通信。创建一个将挂载到每个容器中的 hosts 文件：

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

现在更新 docker-compose.yml 以挂载此 hosts 文件：

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

## 4. 了解 BigTop 镜像 {#4-understanding-the-bigtop-image}

`bigtop/puppet:trunk-rockylinux-8` 镜像属于 Apache BigTop 项目，该项目提供构建和测试 Hadoop 相关项目的框架。此镜像包括：

- Rocky Linux 8 基础操作系统
- 预安装的 Java 和开发工具
- 用于配置管理的 Puppet
- 针对 Hadoop 生态系统服务优化的系统配置

使用此镜像可简化设置过程，因为 Ambari 所需的许多依赖已经安装或配置。

## 5. 启动 Docker 环境 {#5-start-the-docker-environment}

启动 Docker 容器：

```bash
docker-compose up -d
```

此命令以分离模式启动容器。你应看到表示容器正在创建的输出。

## 6. 验证环境 {#6-verify-the-environment}

确保所有容器正在运行且配置正确：

```bash
# Check container status
docker ps

# Test network connectivity between containers
docker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname1
docker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname2
docker exec -it bigtop_hostname0 ping -c 2 bigtop_hostname3
```

## 7. 配置容器间 SSH 访问 {#7-configure-ssh-access-between-containers}

Ambari 正常运行需要设置 SSH。执行以下命令：

首先，在 bigtop_hostname0 容器中：

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

现在在 Agent 容器中设置 SSH，并复制服务器密钥：

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

## 8. 禁用安全功能 {#8-disable-security-features}

对于开发环境，请在所有容器上禁用 SELinux 和防火墙：

```bash
# For each container (bigtop_hostname0, bigtop_hostname1, bigtop_hostname2, bigtop_hostname3)
docker exec -it bigtop_hostname0 bash
setenforce 0
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
exit
```

## 9. 在所有容器上安装所需软件包 {#9-install-required-packages-on-all-containers}

在每个容器（bigtop_hostname0、bigtop_hostname1、bigtop_hostname2、bigtop_hostname3）上执行这些命令：

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

对 bigtop_hostname1、bigtop_hostname2 和 bigtop_hostname3 容器重复执行。

## 10. 启用开发仓库 {#10-enable-development-repository}

必须在每个容器上启用 Rocky Linux 开发仓库，以安装 Ambari 所需的依赖：

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

## 故障排除 {#troubleshooting}

如果 Docker 环境出现问题：

### 容器连通性问题 {#container-connectivity-issues}

```bash
# Check if all containers are running
docker ps -a

# Check network configuration
docker network inspect bridge

# Restart a specific container
docker restart bigtop_hostname0
```

### SSH 问题 {#ssh-issues}

```bash
# Check SSH service status
docker exec -it bigtop_hostname0 systemctl status sshd

# Verify SSH key permissions
docker exec -it bigtop_hostname0 ls -la ~/.ssh/

# Check SSH configuration
docker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PasswordAuthentication
docker exec -it bigtop_hostname0 cat /etc/ssh/sshd_config | grep PermitRootLogin
```

### 资源问题 {#resource-issues}

如果容器意外终止，可能需要为 Docker 分配更多资源：

```bash
# Check container logs
docker logs bigtop_hostname0

# Check resource usage
docker stats
```

### BigTop 镜像特定问题 {#bigtop-image-specific-issues}

如果 BigTop 镜像出现问题：

```bash
# Check if Java is installed correctly
docker exec -it bigtop_hostname0 java -version

# Verify puppet is available
docker exec -it bigtop_hostname0 puppet --version

# Check for any BigTop-specific logs
docker exec -it bigtop_hostname0 ls -la /var/log/
```

## 后续步骤 {#next-steps}

Docker 环境设置完成后，继续阅读[安装指南](./installation-guide.md)，安装并配置 Ambari Server 和 Agent。安装指南提供适用于所有环境（Vagrant、Docker 和裸机/KVM）的标准说明。

阅读安装指南时请记住：

1. 所有命令都应以 root 身份运行 (BigTop 容器中的默认用户就是 root)
2. 在 `bigtop_hostname0` 容器上
3. 在所有容器上运行 Ambari Agent 安装
4. 安装后通过 http://localhost:8080 访问 Ambari Web UI

Docker 环境提供轻量且可复现的 Apache Ambari 测试和开发方式，同时遵循与其他部署方法相同的安装和配置步骤。







