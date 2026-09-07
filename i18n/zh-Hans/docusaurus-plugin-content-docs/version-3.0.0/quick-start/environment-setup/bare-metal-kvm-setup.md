---
sidebar_position: 4
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

# Apache Ambari 裸机和 KVM 环境设置 {#bare-metal-and-kvm-environment-setup-for-apache-ambari}

本指南说明如何配置现有裸机服务器或 KVM 虚拟机以安装 Apache Ambari。假设你已有至少 3 台可用的物理或虚拟机器，重点介绍为 Ambari 部署准备所需的系统配置。

## 前提条件 {#prerequisites}

- 至少 3 台机器（物理服务器或 KVM 虚拟机）
- 所有机器上安装 Rocky Linux 8（或兼容的 RHEL 系列发行版）
- 对所有机器具有 root 访问权限
- 所有机器之间具有网络连通性

## 机器角色 {#machine-roles}

对于基本 Ambari 集群，需要为机器指定以下角色：

- **机器 1**: Ambari Server
- **机器 2、3、...**: Ambari Agents

所有机器都需要类似的基础配置，Ambari Server 还需要一些特定设置。

## 1. 配置主机名和网络 {#1-configure-hostnames-and-networking}

### 1.1 设置主机名 {#11-set-hostnames}

如果尚未为机器配置主机名，可以按如下方式设置：

```bash
# Example hostname configuration (only if needed)
sudo hostnamectl set-hostname your-preferred-hostname
```

选择的具体主机名并不重要，但应满足：
- 在所有机器中唯一
- 尽可能使用完全限定域名（FQDN）
- 与网络命名约定一致

如果已配置主机名，可以跳过此步骤。

### 1.2 在所有机器上配置 /etc/hosts {#12-configure-etchosts-on-all-machines}

通过编辑每台机器上的 `/etc/hosts` 文件，确保所有机器都能解析彼此的主机名：

```bash
# Login as root
sudo su -

# Edit the hosts file
vi /etc/hosts

# Add entries for all machines (use your actual IP addresses and hostnames)
192.168.1.10 server-hostname
192.168.1.11 agent-machine1-hostname
192.168.1.12 agent-machine2-hostname
# Add more entries for additional machines
```

确保所有机器上的这些更改完全一致。此步骤对 Ambari 正常运行至关重要，因为服务器与 Agent 之间的通信依赖主机名解析。

## 2. 配置安全设置 {#2-configure-security-settings}

### 2.1 Disable SELinux on All Machines {#21-disable-selinux-on-all-machines}

```bash
# Temporarily disable SELinux
setenforce 0

# Permanently disable SELinux
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
```

### 2.2 在所有机器上配置防火墙 {#22-configure-firewall-on-all-machines}

对于开发环境，可以禁用防火墙：

```bash
# Disable and stop firewalld
systemctl disable firewalld
systemctl stop firewalld
```


## 3. 配置 SSH 访问 {#3-configure-ssh-access}

与 Vagrant 环境设置类似，需要配置从 Ambari Server 到所有 Agent 机器的免密码 SSH 访问。

### 3.1 在服务器机器上生成 SSH 密钥 {#31-generate-ssh-key-on-the-server-machine}

```bash
# Login as root on the server machine
sudo su -

# Generate SSH key if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
fi
```

### 3.2 配置 SSH 密码认证 {#32-configure-ssh-for-password-authentication}

如果尚未配置，请在所有机器上编辑 SSH 配置：

```bash
# Edit sshd_config
vi /etc/ssh/sshd_config

# Ensure these lines are set
PasswordAuthentication yes
PermitRootLogin yes

# Restart SSH service
systemctl restart sshd
```

### 3.3 Distribute SSH Keys from Server to Agents {#33-distribute-ssh-keys-from-server-to-agents}

在 Ambari 服务器机器上，将 SSH 密钥复制到每台 Agent 机器：

```bash
# Copy SSH key to all agent machines (replace with your actual hostnames)
ssh-copy-id -o StrictHostKeyChecking=no root@agent-machine1-hostname
ssh-copy-id -o StrictHostKeyChecking=no root@agent-machine2-hostname
# Repeat for additional agent machines

# Test SSH connections (replace with your actual hostnames)
ssh root@agent-machine1-hostname echo "Connection successful"
ssh root@agent-machine2-hostname echo "Connection successful"
# Test additional connections as needed
```

## 4. 在所有机器上安装所需软件包 {#4-install-required-packages-on-all-machines}

### 4.1 更新系统并安装基本工具 {#41-update-the-system-and-install-basic-utilities}

在所有机器上运行这些命令：

```bash
# Update package lists and upgrade packages
dnf update -y

# Install basic utilities
dnf install -y sudo openssh-server openssh-clients which iproute net-tools less vim-enhanced
dnf install -y wget curl tar unzip git
```

### 4.2 启用开发仓库 {#42-enable-development-repository}

必须在所有机器上启用 Rocky Linux 开发仓库，以安装 Ambari 所需的依赖：

```bash
# Edit the Rocky-Devel repository configuration
vi /etc/yum.repos.d/Rocky-Devel.repo

# There are two possible scenarios:
# 1. If all lines are commented (start with #), uncomment all lines
# 2. If you see "enabled=0", change it to "enabled=1"

# After editing, verify the repository is enabled
dnf repolist | grep devel
```

### 4.3 在所有机器上安装 Java {#43-install-java-on-all-machines}

```bash
# Install OpenJDK 8
dnf install -y java-1.8.0-openjdk-devel

# Verify Java installation
java -version
```

## 5. 配置网络时间协议（NTP） {#5-configure-network-time-protocol-ntp}

同步所有机器上的时间：

```bash
# Install chrony (NTP implementation)
dnf install -y chrony

# Start and enable chronyd service
systemctl start chronyd
systemctl enable chronyd

# Verify time synchronization
chronyc sources
```

## 6. 验证环境 {#6-verify-the-environment}

### 6.1 检查网络连通性 {#61-check-network-connectivity}

在服务器机器上测试与所有 Agent 机器的连通性：

```bash
# Test connectivity to all agent machines (replace with your actual hostnames)
ping -c 2 agent-machine1-hostname
ping -c 2 agent-machine2-hostname
# Test additional machines as needed
```

### 6.2 验证 SSH 访问 {#62-verify-ssh-access}

在服务器机器上验证对所有 Agent 机器的 SSH 访问：

```bash
# Verify SSH access to all agent machines (replace with your actual hostnames)
ssh root@agent-machine1-hostname hostname
ssh root@agent-machine2-hostname hostname
# Verify additional machines as needed
```

### 6.3 验证安全设置 {#63-verify-security-settings}

```bash
# Check SELinux status on all machines (replace with your actual hostnames)
for host in server-hostname agent-machine1-hostname agent-machine2-hostname; do
  echo "=== $host SELinux Status ==="
  ssh root@$host getenforce  # Should show 'Disabled'
done

# Check firewall status on all machines (replace with your actual hostnames)
for host in server-hostname agent-machine1-hostname agent-machine2-hostname; do
  echo "=== $host Firewall Status ==="
  ssh root@$host systemctl status firewalld  # Should show 'inactive' for dev environments
done
```

## 故障排除 {#troubleshooting}

### 网络问题 {#network-issues}

```bash
# Check network interfaces
ip addr show

# Test DNS resolution (replace with your actual hostnames)
nslookup server-hostname
nslookup agent-machine1-hostname
nslookup agent-machine2-hostname
```

### SSH 问题 {#ssh-issues}

```bash
# Check SSH service status
systemctl status sshd

# Verify SSH key permissions
ls -la ~/.ssh/

# Check SSH configuration
cat /etc/ssh/sshd_config | grep PasswordAuthentication
cat /etc/ssh/sshd_config | grep PermitRootLogin
```

### SELinux 问题 {#selinux-issues}

即使禁用 SELinux 后仍遇到权限问题：

```bash
# Verify SELinux is disabled
getenforce

# If it shows 'Enforcing', disable it again
setenforce 0
```

## 后续步骤 {#next-steps}

裸机或 KVM 环境配置完成后，继续阅读[安装指南](../installation-guide.md)，安装并配置 Ambari Server 和 Agent。安装指南提供适用于所有环境（Vagrant、Docker 和裸机/KVM）的标准说明。

阅读安装指南时请记住：

1. 所有命令都应以 root 身份运行
2. 在指定服务器机器上
3. 在所有机器上运行 Ambari Agent 安装
4. 通过服务器机器的 IP 地址和 8080 端口访问 Ambari Web UI (http://server-hostname:8080)







