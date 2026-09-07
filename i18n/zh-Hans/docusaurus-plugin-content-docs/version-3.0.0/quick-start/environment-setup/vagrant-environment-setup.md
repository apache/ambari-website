---
title: Apache Ambari 的 Vagrant 环境设置
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
# Apache Ambari 的 Vagrant 环境设置 {#vagrant-environment-setup-for-apache-ambari}

本指南帮助你设置用于 Apache Ambari 开发和测试的基本多节点 Vagrant 环境。该环境由一个 Ambari Server 节点和两个 Agent 节点组成，为开发和测试提供最小平台。

## 概览 {#overview}

本指南属于快速入门部分，涵盖：
1. 设置基本的三节点 Vagrant 环境
2. 配置网络和共享存储
3. 设置节点之间的 SSH 访问
4. 配置安全设置（防火墙、SELinux）
5. 准备 Ambari 安装环境

完整安装说明请参阅 [安装指南](../installation-guide.md).

## 系统要求 {#system-requirements}

- **主机最低资源**:
  - CPU：6 个以上核心（每个 VM 2 个核心）
  - RAM：24GB 以上（每个 VM 8GB）
  - 存储：100GB 以上可用空间
- **软件要求**:
  - VirtualBox 6.1 以上
  - Vagrant 2.2 以上
  - 操作系统：支持虚拟化的 Linux、macOS 或 Windows

## 重要说明 {#important-notes}

1. 此配置满足基本开发和测试的最低要求
2. 每个 VM 至少需要 8GB RAM 才能运行基本 Hadoop 服务
3. RPM 仓库的共享文件夹必须存在于主机上
4. 主机上的 8080 端口应可用于 Ambari Web UI
5. 对于生产环境，请参阅官方容量规划指南
6. 根据具体使用场景，可能需要额外资源

## 前提条件 {#prerequisites}

1. 安装 [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. 安装 [Vagrant](https://www.vagrantup.com/downloads)

## 环境架构 {#environment-architecture}

Vagrant 环境创建包含以下组件的最小分布式设置：

1. **Ambari Server 节点（vm1）**:
   - 主控制器节点
   - 承载 Ambari Server 和 Web UI
   - 管理集群配置和操作
   - IP: 192.168.56.20
   - Web UI 可通过 http://localhost:8080

2. **Agent 节点（vm2、vm3）**:
   - 执行和监控 Hadoop 服务
   - 向 Ambari Server 报告状态
   - 支持服务分布和扩展
   - IPs: 192.168.56.21-22

3. **网络布局**:
   - 用于节点间通信的专用网络
   - 转发 8080 端口以访问 Ambari Web UI
   - 自动配置 hosts 文件
   - 禁用防火墙以便开发

4. **共享存储**:
   - 所有节点均可访问的 RPM 仓库
   - 在整个集群中提供一致的软件包访问

## 设置 Vagrant 环境 {#setting-up-vagrant-environment}

1. 为 Vagrant 环境创建新目录：
```bash
mkdir ambari-vagrant
cd ambari-vagrant
```

2. 创建 RPM 仓库目录：
```bash
mkdir -p ./ambari-repo
```

3. 创建 `Vagrantfile`：
```ruby
# Vagrantfile for Apache Ambari 3-node development environment
# This configuration creates a minimal cluster with one server and two agent nodes
# All manual configuration steps will be performed after VM creation

Vagrant.configure("2") do |config|
  # VM 1 - Primary Ambari Server Node
  # This VM will host the Ambari Server and Web UI
  config.vm.define "vm1" do |vm1|
    # Use Rocky Linux 8 as the base operating system
    vm1.vm.box = "generic/rocky8"
    
    # Set the hostname to vm1 for proper identification
    vm1.vm.hostname = "vm1"

    # Port forwarding for Ambari Web UI
    # This allows accessing the Ambari interface at http://localhost:8080 from your host machine
    vm1.vm.network "forwarded_port", guest: 8080, host: 8080

    # Private network configuration
    # Creates a private network for inter-VM communication with a static IP
    vm1.vm.network "private_network", ip: "192.168.56.20"

    # VirtualBox provider-specific configuration
    vm1.vm.provider "virtualbox" do |vb|
      # Disable GUI mode (headless operation)
      vb.gui = false
      
      # Allocate 8GB RAM to this VM (minimum required for Ambari Server)
      vb.memory = "8192"
      
      # Allocate 2 CPU cores to this VM
      vb.cpus = 2
    end
  end

  # VM 2 - First Agent Node
  # This VM will run Ambari Agent and host Hadoop services
  config.vm.define "vm2" do |vm2|
    # Use Rocky Linux 8 as the base operating system
    vm2.vm.box = "generic/rocky8"
    
    # Set the hostname to vm2 for proper identification
    vm2.vm.hostname = "vm2"

    # Private network configuration
    # Creates a private network for inter-VM communication with a static IP
    vm2.vm.network "private_network", ip: "192.168.56.21"

    # VirtualBox provider-specific configuration
    vm2.vm.provider "virtualbox" do |vb|
      # Disable GUI mode (headless operation)
      vb.gui = false
      
      # Allocate 8GB RAM to this VM (minimum required for Hadoop services)
      vb.memory = "8192"
      
      # Allocate 2 CPU cores to this VM
      vb.cpus = 2
    end
  end

  # VM 3 - Second Agent Node
  # This VM will run Ambari Agent and host additional Hadoop services
  config.vm.define "vm3" do |vm3|
    # Use Rocky Linux 8 as the base operating system
    vm3.vm.box = "generic/rocky8"
    
    # Set the hostname to vm3 for proper identification
    vm3.vm.hostname = "vm3"

    # Private network configuration
    # Creates a private network for inter-VM communication with a static IP
    vm3.vm.network "private_network", ip: "192.168.56.22"

    # VirtualBox provider-specific configuration
    vm3.vm.provider "virtualbox" do |vb|
      # Disable GUI mode (headless operation)
      vb.gui = false
      
      # Allocate 8GB RAM to this VM (minimum required for Hadoop services)
      vb.memory = "8192"
      
      # Allocate 2 CPU cores to this VM
      vb.cpus = 2
    end
  end

  # Shared folder for Ambari RPM repository
  # This maps ./ambari-repo on the host to /vagrant_data on all VMs
  # Used for distributing RPM packages to all nodes
  config.vm.synced_folder "./ambari-repo", "/vagrant_data"

  # Disable VirtualBox Guest Additions auto-update
  # This prevents potential issues during VM startup
  config.vbguest.auto_update = false
  config.vbguest.no_remote = true
end
```

4. 安装 sshpass（SSH 密钥分发所需）：
```bash
# For macOS:
brew install sshpass

# For Linux:
sudo apt-get install sshpass  # Ubuntu/Debian
sudo yum install sshpass      # RHEL/CentOS
```

5. 启动 Vagrant 环境：
```bash
vagrant up
```

## 手动配置步骤 {#manual-configuration-steps}

启动 VM 后，必须执行几个重要配置步骤以确保集群正常运行。这些手动步骤有助于理解配置过程并排查问题。

### 1. Root 用户配置 {#1-root-user-configuration}

默认情况下，`vagrant ssh vm1` 会以 `vagrant` 用户登录。为了安装和配置 Ambari，所有操作都使用 root 用户：

1. 在每个 VM 上切换到 root 用户：
```bash
# Connect to each VM
vagrant ssh vm1  # Repeat for vm2, vm3

# Switch to root user
sudo su -
```

2. 为 root 用户设置密码：
```bash
# While logged in as root
passwd

# Enter and confirm a new password when prompted
# Remember this password for future root access
```

> **注意**：安装 Ambari 需要 root 访问权限。Ambari 设置过程需要安装软件包并修改系统配置，这些操作需要 root 权限。后续所有步骤都应以 root 用户执行。

### 2. SSH 配置 {#2-ssh-configuration}

1. 在每个 VM 上修改 SSH 配置，以允许密码认证和 root 登录：
```bash
# Connect to each VM and switch to root
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Edit sshd_config
vi /etc/ssh/sshd_config

# Make these changes:
# PasswordAuthentication yes
# PermitRootLogin yes

# Restart sshd service
systemctl restart sshd
```

2. 以 root 身份在 vm1 上生成 SSH 密钥：
```bash
# Connect to vm1 and switch to root
vagrant ssh vm1
sudo su -

# Generate SSH key if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
fi
```

3. 以 root 身份设置从 vm1 到所有 VM 的免密码 SSH：
```bash
# On vm1 as root
# Copy keys to each VM (including vm1 itself)
ssh-copy-id -o StrictHostKeyChecking=no root@vm1
ssh-copy-id -o StrictHostKeyChecking=no root@vm2
ssh-copy-id -o StrictHostKeyChecking=no root@vm3
```

4. 以 root 身份测试 SSH 连通性：
```bash
# Test SSH access between nodes as root
ssh root@vm2 echo "Connection to vm2 successful"
ssh root@vm3 echo "Connection to vm3 successful"
```

### 3. 安全配置 {#3-security-configuration}

1. 以 root 身份在每个 VM 上禁用 SELinux：
```bash
# Connect to each VM and switch to root if not already
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Disable SELinux immediately
setenforce 0

# Disable SELinux permanently
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
```

2. 以 root 身份确保每个 VM 都已禁用防火墙：
```bash
# Connect to each VM and switch to root if not already
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Stop firewall
systemctl stop firewalld

# Disable firewall on boot
systemctl disable firewalld
```

### 4. Hosts 文件配置 {#4-hosts-file-configuration}

1. 以 root 身份配置每个 VM 上的 /etc/hosts：
```bash
# Connect to each VM and switch to root if not already
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Edit hosts file
vi /etc/hosts

# Remove or comment out any lines with:
# 127.0.0.1 vm1
# 127.0.0.1 vm2
# 127.0.0.1 vm3

# Add these entries if not present:
192.168.56.20 vm1
192.168.56.21 vm2
192.168.56.22 vm3
```

### 5. 启用开发仓库 {#5-enable-development-repository}

必须在每个 VM 上启用 Rocky Linux 开发仓库，以安装 Ambari 所需的依赖：

```bash
# Connect to each VM and switch to root if not already
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Edit the Rocky-Devel repository configuration
vi /etc/yum.repos.d/Rocky-Devel.repo

# There are two possible scenarios:
# 1. If all lines are commented (start with #), uncomment all lines
# 2. If you see "enabled=0", change it to "enabled=1"

# After editing, verify the repository is enabled
yum repolist | grep devel
```

> **注意**：启用开发仓库对于安装 Ambari 所需依赖至关重要。没有此仓库，Ambari 设置期间可能会遇到软件包安装失败。

### 6. 验证配置 {#6-verify-configuration}

1. 以 root 身份检查 SSH 连通性：
```bash
# Connect to vm1 and switch to root if not already
vagrant ssh vm1
sudo su -

# Test SSH connections as root
ssh root@vm2 echo "Connection to vm2 successful"
ssh root@vm3 echo "Connection to vm3 successful"
```

2. 以 root 身份验证安全设置：
```bash
# Connect to vm1 and switch to root if not already
vagrant ssh vm1
sudo su -

# Check SELinux status on each VM
for i in {1..3}; do
  echo "=== VM$i SELinux Status ==="
  ssh root@vm$i getenforce  # Should show 'Disabled'
done

# Check firewall status on each VM
for i in {1..3}; do
  echo "=== VM$i Firewall Status ==="
  ssh root@vm$i systemctl status firewalld  # Should show 'inactive'
done
```

3. 以 root 身份验证 hosts 文件配置：
```bash
# Connect to vm1 and switch to root if not already
vagrant ssh vm1
sudo su -

# Check hosts file on each VM
for i in {1..3}; do
  echo "=== VM$i Hosts File ==="
  ssh root@vm$i cat /etc/hosts
done
```

4. 以 root 身份测试网络连通性：
```bash
# Connect to vm1 and switch to root if not already
vagrant ssh vm1
sudo su -

# Test ping between all nodes
for i in {1..3}; do
  echo "=== Testing from VM$i ==="
  for j in {1..3}; do
    [ $i -ne $j ] && ssh root@vm$i ping -c 1 vm$j
  done
done
```

## 故障排除 {#troubleshooting}

如果在手动配置期间遇到问题：

1. SSH 问题:
```bash
# If SSH connection fails, check sshd configuration
vagrant ssh vm1
sudo su -
cat /etc/ssh/sshd_config | grep PasswordAuthentication
cat /etc/ssh/sshd_config | grep PermitRootLogin

# Restart sshd on problem node
systemctl restart sshd

# Manually copy SSH keys if needed
ssh-copy-id -o StrictHostKeyChecking=no root@vm2
ssh-copy-id -o StrictHostKeyChecking=no root@vm3
```

2. SELinux/防火墙问题：
```bash
# Connect to vm1 and switch to root
vagrant ssh vm1
sudo su -

# Check SELinux status
ssh root@vm1 getenforce

# Manually disable SELinux
ssh root@vm1 setenforce 0
ssh root@vm1 sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config

# Check firewall status
ssh root@vm1 systemctl status firewalld

# Manually disable firewall
ssh root@vm1 systemctl stop firewalld
ssh root@vm1 systemctl disable firewalld
```

3. Hosts 文件问题：
```bash
# Connect to vm1 and switch to root
vagrant ssh vm1
sudo su -

# Check hosts file content
ssh root@vm1 cat /etc/hosts

# Manually fix hosts file
ssh root@vm1 sed -i '/127.0.0.1.*vm[123]/d' /etc/hosts
ssh root@vm1 "echo '192.168.56.20 vm1' >> /etc/hosts"
ssh root@vm1 "echo '192.168.56.21 vm2' >> /etc/hosts"
ssh root@vm1 "echo '192.168.56.22 vm3' >> /etc/hosts"
```

4. 资源问题:
   - 如果 VM 运行缓慢或无响应，请检查主机资源使用情况
   - 确保每个 VM 至少分配 8GB RAM
   - 确认每个 VM 至少有 2 个 CPU 核心
   - 检查主机上的可用磁盘空间

5. 网络连通性：
   - Test inter-VM communication with ping
   - Verify VirtualBox network settings
   - Check for IP conflicts
   - Ensure port 8080 is available on host

## 后续步骤 {#next-steps}

设置 Vagrant 环境后：

1. 验证所有 VM 正在运行：
```bash
vagrant status
```

2. 测试对每个 VM 的 SSH 访问：
```bash
vagrant ssh vm1  # Similarly for vm2, vm3
```

3. 继续阅读[安装指南](../installation-guide.md)，安装并配置 Ambari Server 和 Agent。

## 常用 Vagrant 命令 {#common-vagrant-commands}

- `vagrant up`: 启动 VM
- `vagrant halt`: 停止 VM
- `vagrant destroy`: 删除 VM
- `vagrant status`: 检查 VM 状态
- `vagrant reload`: 使用新的 Vagrantfile 配置重启 VM
- `vagrant ssh vm1`: 连接到 VM1（vm2、vm3 同理）









