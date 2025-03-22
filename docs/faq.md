---
title: Frequently Asked Questions (FAQ)
---

# Frequently Asked Questions (FAQ)

This page provides answers to commonly asked questions about Apache Ambari 3.0.0. If you don't find an answer to your question here, please reach out to the community via the [mailing lists](https://ambari.apache.org/community.html) or [Slack channel](https://the-asf.slack.com/archives/C014FSPE668).

## General Questions

### What is Apache Ambari?

Apache Ambari is an open-source administration tool designed to simplify the management, monitoring, and maintenance of Apache Hadoop clusters. Ambari provides an intuitive web UI and robust REST APIs to simplify the provisioning, managing, and monitoring of Hadoop clusters.

### What's new in Ambari 3.0.0?

Ambari 3.0.0 includes several major improvements:
- Alluxio support (AMBARI-26055)
- Ozone file system service (AMBARI-24976)
- Grafana dashboards (AMBARI-25960)
- Ruff integration (AMBARI-26147)
- HiveServer2 web UI quicklink (AMBARI-26270)
- Java 17 support
- Python 3 compatibility
- OceanBase support

For a complete list of new features, see the [Release Notes](./release-notes.md).

## Installation and Setup

### What are the system requirements for Ambari 3.0.0?

For a development environment using Vagrant:
- Host CPU: 6+ cores (2 cores per VM)
- Host RAM: 24GB+ (8GB per VM)
- Storage: 100GB+ free space
- VirtualBox 6.1+ and Vagrant 2.2+

For production environments, requirements will vary based on cluster size and workload.

### Which operating systems are supported?

Ambari 3.0.0 supports:
- RHEL (Redhat Enterprise Linux) 8, 7.4, 7.3, 7.2
- CentOS 7.4, 7.3, 7.2
- OEL (Oracle Enterprise Linux) 7.4, 7.3, 7.2
- Amazon Linux 2
- SLES (SuSE Linux Enterprise Server) 12 SP3, 12 SP2
- Ubuntu 20.04, 18.04 
- Debian 9
- Rocky Linux 9, 8
- openEuler-22.03

### How do I enable the Rocky-Devel repository?

You need to edit the Rocky-Devel.repo file on each VM. You may encounter two scenarios:
1. All lines commented out: Uncomment the necessary lines
2. Repository disabled with enabled=0: Change to enabled=1

To verify the repository is properly enabled, run:
```bash
yum repolist | grep devel
```

### How do I troubleshoot SSH connectivity issues?

If you're experiencing SSH connectivity issues:
1. Verify SSH service is running: `systemctl status sshd`
2. Check SSH configuration: `cat /etc/ssh/sshd_config` (ensure PasswordAuthentication and PermitRootLogin are set to yes)
3. Restart SSH service: `systemctl restart sshd`
4. Redistribute SSH keys if needed: `ssh-copy-id -o StrictHostKeyChecking=no user@host`

## Configuration

### How do I disable SELinux?

To temporarily disable SELinux:
```bash
setenforce 0
```

To permanently disable SELinux, edit `/etc/selinux/config` and set:
```
SELINUX=disabled
```

### How do I disable the firewall (using systemd)?
1. systemctl stop firewalld
2. systemctl disable firewalld

### How do I configure the hosts file correctly?

Ensure your hosts file:
1. Does not contain loopback entries for your cluster hostnames
2. Contains proper static IP mappings for all nodes
3. Is consistent across all nodes in the cluster

For example:
```
192.168.56.20 vm1
192.168.56.21 vm2
192.168.56.22 vm3
```

### Which database systems are supported?

Ambari 3.0.0 supports:
- PostgreSQL 9.6+
- MySQL 5.7+
- MariaDB 10.2+
- OceanBase

## Troubleshooting

### Common installation issues

1. **Repository access problems**:
   - Verify internet connectivity
   - Check repository configuration
   - Ensure Rocky-Devel repository is enabled

2. **Database connection issues**:
   - Verify database service is running
   - Check connection string and credentials
   - Ensure database user has proper permissions

3. **Agent registration failures**:
   - Verify hostname resolution works in both directions
   - Check firewall settings
   - Ensure time is synchronized across all nodes

### How do I check Ambari Server logs?

Ambari Server logs are located at:
```
/var/log/ambari-server/ambari-server.log
```

To view the logs in real-time:
```bash
tail -f /var/log/ambari-server/ambari-server.log
```

### How do I check Ambari Agent logs?

Ambari Agent logs are located at:
```
/var/log/ambari-agent/ambari-agent.log
```

To view the logs in real-time:
```bash
tail -f /var/log/ambari-agent/ambari-agent.log
```

## Development

### How do I contribute to Ambari?

To contribute to Ambari:
1. Review the [How to Contribute](./ambari-dev/how-to-contribute.md) guide
2. Follow the [Coding Guidelines](./ambari-dev/coding-guidelines-for-ambari.md)
3. Submit your contribution following the [How to Commit](./ambari-dev/how-to-commit.md) process

### How do I set up a development environment?

For setting up a development environment:
1. Follow the [Vagrant Environment Setup](./quick-start/environment-setup/vagrant-environment-setup.md) or [Docker Environment Setup](./quick-start/environment-setup/docker-environment-setup.md) guide
2. Review the [Development in Docker](./ambari-dev/development-in-docker.md) documentation

### How do I create a custom service for Ambari?

To create a custom service:
1. Review the [Custom Services](./ambari-design/stack-and-services/custom-services.md) documentation
2. Follow the [How to Define Stacks and Services](./ambari-design/stack-and-services/how-to-define-stacks-and-services.md) guide
3. See the [Writing Metainfo](./ambari-design/stack-and-services/writing-metainfo.md) documentation for service definition details
