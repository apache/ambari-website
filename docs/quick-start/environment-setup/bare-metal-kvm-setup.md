---
sidebar_position: 4
---

# Bare Metal and KVM Environment Setup for Apache Ambari

This guide provides instructions for configuring existing bare metal servers or KVM virtual machines for Apache Ambari installation. It assumes you already have at least 3 machines (physical or virtual) available and focuses on the necessary system configurations to prepare them for Ambari deployment.

## Prerequisites

- At least 3 machines (physical servers or KVM virtual machines)
- Rocky Linux 8 (or compatible RHEL-based distribution) installed on all machines
- Root access to all machines
- Network connectivity between all machines

## Machine Roles

For a basic Ambari cluster, you'll need to designate your machines for the following roles:

- **Machine 1**: Ambari Server
- **Machine 2, 3, ...**: Ambari Agents

All machines will need similar base configurations, with some specific settings for the Ambari Server.

## 1. Configure Hostnames and Networking

### 1.1 Set Hostnames

If you haven't already configured hostnames for your machines, you can set them as follows:

```bash
# Example hostname configuration (only if needed)
sudo hostnamectl set-hostname your-preferred-hostname
```

The specific hostnames you choose don't matter, but they should be:
- Unique across all machines
- Fully qualified domain names (FQDN) if possible
- Consistent with your network naming conventions

If you've already configured your hostnames, you can skip this step.

### 1.2 Configure /etc/hosts on All Machines

Ensure all machines can resolve each other's hostnames by editing the `/etc/hosts` file on each machine:

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

Make sure these changes are identical across all machines. This step is critical for Ambari to function properly, as it relies on hostname resolution for communication between the server and agents.

## 2. Configure Security Settings

### 2.1 Disable SELinux on All Machines

```bash
# Temporarily disable SELinux
setenforce 0

# Permanently disable SELinux
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
```

### 2.2 Configure Firewall on All Machines

For development environments, you may disable the firewall:

```bash
# Disable and stop firewalld
systemctl disable firewalld
systemctl stop firewalld
```


## 3. Configure SSH Access

Similar to the Vagrant environment setup, you need to configure passwordless SSH access from the Ambari Server to all agent machines.

### 3.1 Generate SSH Key on the Server Machine

```bash
# Login as root on the server machine
sudo su -

# Generate SSH key if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
fi
```

### 3.2 Configure SSH for Password Authentication

Edit the SSH configuration on all machines if not already configured:

```bash
# Edit sshd_config
vi /etc/ssh/sshd_config

# Ensure these lines are set
PasswordAuthentication yes
PermitRootLogin yes

# Restart SSH service
systemctl restart sshd
```

### 3.3 Distribute SSH Keys from Server to Agents

From the Ambari server machine, copy your SSH key to each agent machine:

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

## 4. Install Required Packages on All Machines

### 4.1 Update the System and Install Basic Utilities

Run these commands on all machines:

```bash
# Update package lists and upgrade packages
dnf update -y

# Install basic utilities
dnf install -y sudo openssh-server openssh-clients which iproute net-tools less vim-enhanced
dnf install -y wget curl tar unzip git
```

### 4.2 Enable Development Repository

The Rocky Linux development repository needs to be enabled on all machines to install dependencies required for Ambari:

```bash
# Edit the Rocky-Devel repository configuration
vi /etc/yum.repos.d/Rocky-Devel.repo

# There are two possible scenarios:
# 1. If all lines are commented (start with #), uncomment all lines
# 2. If you see "enabled=0", change it to "enabled=1"

# After editing, verify the repository is enabled
dnf repolist | grep devel
```

### 4.3 Install Java on All Machines

```bash
# Install OpenJDK 8
dnf install -y java-1.8.0-openjdk-devel

# Verify Java installation
java -version
```

## 5. Configure Network Time Protocol (NTP)

Synchronize time across all machines:

```bash
# Install chrony (NTP implementation)
dnf install -y chrony

# Start and enable chronyd service
systemctl start chronyd
systemctl enable chronyd

# Verify time synchronization
chronyc sources
```

## 6. Verify the Environment

### 6.1 Check Network Connectivity

From the server machine, test connectivity to all agent machines:

```bash
# Test connectivity to all agent machines (replace with your actual hostnames)
ping -c 2 agent-machine1-hostname
ping -c 2 agent-machine2-hostname
# Test additional machines as needed
```

### 6.2 Verify SSH Access

From the server machine, verify SSH access to all agent machines:

```bash
# Verify SSH access to all agent machines (replace with your actual hostnames)
ssh root@agent-machine1-hostname hostname
ssh root@agent-machine2-hostname hostname
# Verify additional machines as needed
```

### 6.3 Verify Security Settings

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

## Troubleshooting

### Network Issues

```bash
# Check network interfaces
ip addr show

# Test DNS resolution (replace with your actual hostnames)
nslookup server-hostname
nslookup agent-machine1-hostname
nslookup agent-machine2-hostname
```

### SSH Issues

```bash
# Check SSH service status
systemctl status sshd

# Verify SSH key permissions
ls -la ~/.ssh/

# Check SSH configuration
cat /etc/ssh/sshd_config | grep PasswordAuthentication
cat /etc/ssh/sshd_config | grep PermitRootLogin
```

### SELinux Issues

If you encounter permission problems even after disabling SELinux:

```bash
# Verify SELinux is disabled
getenforce

# If it shows 'Enforcing', disable it again
setenforce 0
```

## Next Steps

Now that your bare metal or KVM environment is configured, proceed to the [Installation Guide](../installation-guide.md) to install and configure Ambari Server and Agents. The installation guide provides standardized instructions that work across all environments (Vagrant, Docker, and bare metal/KVM).

When following the installation guide, remember:

1. All commands should be run as root
2. Run Ambari Server setup and installation on the designated server machine
3. Run Ambari Agent installation on all machines
4. Access the Ambari Web UI via the server machine's IP address on port 8080 (http://server-hostname:8080)
