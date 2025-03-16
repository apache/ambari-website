# Vagrant Environment Setup for Apache Ambari

This guide helps you set up a basic multi-node Vagrant environment for Apache Ambari development and testing. The environment consists of one Ambari Server node and two Agent nodes, providing a minimal platform for development and testing.

## Overview

This guide is part of the Quick Start section and covers:
1. Setting up a basic three-node Vagrant environment
2. Configuring network and shared storage
3. Setting up SSH access between nodes
4. Configuring security settings (firewall, SELinux)
5. Preparing the environment for Ambari installation

For complete installation instructions, refer to the [Installation Guide](installation-guide.md).

## System Requirements

- **Minimum Host Machine Resources**:
  - CPU: 6+ cores (2 cores per VM)
  - RAM: 24GB+ (8GB per VM)
  - Storage: 100GB+ free space
- **Software Requirements**:
  - VirtualBox 6.1+
  - Vagrant 2.2+
  - Operating System: Linux, macOS, or Windows with virtualization support

## Important Notes

1. This configuration provides minimum requirements for basic development and testing
2. Each VM requires 8GB RAM minimum for basic Hadoop services
3. The shared folder for RPM repository must exist on the host machine
4. Port 8080 should be available on the host machine for Ambari Web UI
5. For production environments, refer to the official sizing guide
6. Additional resources may be required depending on your specific use case

## Prerequisites

1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Install [Vagrant](https://www.vagrantup.com/downloads)

## Environment Architecture

The Vagrant environment creates a minimal distributed setup with the following components:

1. **Ambari Server Node (vm1)**:
   - Primary controller node
   - Hosts Ambari Server and Web UI
   - Manages cluster configuration and operations
   - IP: 192.168.56.20
   - Web UI accessible at http://localhost:8080

2. **Agent Nodes (vm2, vm3)**:
   - Execute and monitor Hadoop services
   - Report status to Ambari Server
   - Support service distribution and scaling
   - IPs: 192.168.56.21-22

3. **Network Layout**:
   - Private network for inter-node communication
   - Port 8080 forwarded for Ambari Web UI access
   - Automated hosts file configuration
   - Disabled firewall for development ease

4. **Shared Storage**:
   - RPM repository accessible to all nodes
   - Consistent package access across cluster

## Setting Up Vagrant Environment

1. Create a new directory for your Vagrant environment:
```bash
mkdir ambari-vagrant
cd ambari-vagrant
```

2. Create the RPM repository directory:
```bash
mkdir -p ./ambari-repo
```

3. Create a `Vagrantfile`:
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

4. Install sshpass (required for SSH key distribution):
```bash
# For macOS:
brew install sshpass

# For Linux:
sudo apt-get install sshpass  # Ubuntu/Debian
sudo yum install sshpass      # RHEL/CentOS
```

5. Start the Vagrant environment:
```bash
vagrant up
```

## Manual Configuration Steps

After starting your VMs, you must perform several important configuration steps to ensure proper cluster operation. These manual steps make it easier to understand the configuration process and troubleshoot issues.

### 1. Root User Configuration

By default, `vagrant ssh vm1` logs you in as the `vagrant` user. For Ambari installation and configuration, we'll use the root user for all operations:

1. Switch to the root user on each VM:
```bash
# Connect to each VM
vagrant ssh vm1  # Repeat for vm2, vm3

# Switch to root user
sudo su -
```

2. Set a password for the root user:
```bash
# While logged in as root
passwd

# Enter and confirm a new password when prompted
# Remember this password for future root access
```

> **Note**: Root access is required for Ambari installation. The Ambari setup process needs to install packages and modify system configurations that require root privileges. All subsequent steps should be performed as the root user.

### 2. SSH Configuration

1. On each VM, modify SSH configuration to allow password authentication and root login:
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

2. Generate SSH keys on vm1 as root:
```bash
# Connect to vm1 and switch to root
vagrant ssh vm1
sudo su -

# Generate SSH key if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
fi
```

3. Set up passwordless SSH from vm1 to all VMs as root:
```bash
# On vm1 as root
# Copy keys to each VM (including vm1 itself)
ssh-copy-id -o StrictHostKeyChecking=no root@vm1
ssh-copy-id -o StrictHostKeyChecking=no root@vm2
ssh-copy-id -o StrictHostKeyChecking=no root@vm3
```

4. Test SSH connectivity as root:
```bash
# Test SSH access between nodes as root
ssh root@vm2 echo "Connection to vm2 successful"
ssh root@vm3 echo "Connection to vm3 successful"
```

### 3. Security Configuration

1. Disable SELinux on each VM as root:
```bash
# Connect to each VM and switch to root if not already
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Disable SELinux immediately
setenforce 0

# Disable SELinux permanently
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
```

2. Ensure firewall is disabled on each VM as root:
```bash
# Connect to each VM and switch to root if not already
vagrant ssh vm1  # Repeat for vm2, vm3
sudo su -

# Stop firewall
systemctl stop firewalld

# Disable firewall on boot
systemctl disable firewalld
```

### 4. Hosts File Configuration

1. Configure /etc/hosts on each VM as root:
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

### 5. Enable Development Repository

The Rocky Linux development repository needs to be enabled on each VM to install dependencies required for Ambari:

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

> **Note**: Enabling the development repository is critical for installing dependencies required by Ambari. Without this repository, you may encounter package installation failures during Ambari setup.

### 6. Verify Configuration

1. Check SSH connectivity as root:
```bash
# Connect to vm1 and switch to root if not already
vagrant ssh vm1
sudo su -

# Test SSH connections as root
ssh root@vm2 echo "Connection to vm2 successful"
ssh root@vm3 echo "Connection to vm3 successful"
```

2. Verify security settings as root:
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

3. Verify hosts file configuration as root:
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

4. Test network connectivity as root:
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

## Troubleshooting

If you encounter issues during the manual configuration:

1. SSH Issues:
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

2. SELinux/Firewall Issues:
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

3. Hosts File Issues:
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

4. Resource Issues:
   - If VMs are slow or unresponsive, check host resource usage
   - Ensure each VM has at least 8GB RAM allocated
   - Verify at least 2 CPU cores per VM
   - Check available disk space on host

5. Network Connectivity:
   - Test inter-VM communication with ping
   - Verify VirtualBox network settings
   - Check for IP conflicts
   - Ensure port 8080 is available on host

## Next Steps

After setting up your Vagrant environment:

1. Verify all VMs are running:
```bash
vagrant status
```

2. Test SSH access to each VM:
```bash
vagrant ssh vm1  # Similarly for vm2, vm3
```

3. Proceed to the [Installation Guide](installation-guide.md) to install and configure Ambari Server and Agents.

## Common Vagrant Commands

- `vagrant up`: Start the VMs
- `vagrant halt`: Stop the VMs
- `vagrant destroy`: Remove the VMs
- `vagrant status`: Check VMs status
- `vagrant reload`: Restart VMs with new Vagrantfile configuration
- `vagrant ssh vm1`: Connect to VM1 (similarly for vm2, vm3)
