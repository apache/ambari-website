---
sidebar_position: 1
---

# Quick Start Guide

This document provides a quick overview of setting up Apache Ambari 3.0.0 in various environments. For detailed environment-specific setup instructions, please refer to the appropriate environment setup guide.

## Environment Setup Options

Apache Ambari 3.0.0 can be installed in several different environments:

### 1. Vagrant Environment

The Vagrant environment provides a quick way to set up a development cluster using virtual machines on your local computer. This is ideal for testing and development purposes.

[**View Vagrant Environment Setup Guide**](environment-setup/vagrant-environment-setup.md)

### 2. Docker Environment

The Docker environment offers a lightweight, containerized approach using multiple containers with one server and two agents. This setup uses Rocky Linux 8 as the base image and includes container networking, SSH setup, and security configuration.

[**View Docker Environment Setup Guide**](environment-setup/docker-environment-setup.md)

### 3. Bare Metal/KVM Setup

For production deployments or larger development environments, the Bare Metal/KVM setup covers both physical servers and KVM virtual machines. This guide includes detailed system requirements, network configuration, and both development and production security settings.

[**View Bare Metal/KVM Setup Guide**](environment-setup/bare-metal-kvm-setup.md)

## Installation Guide

Once you have set up your environment using one of the methods above, you can proceed with the following steps:

### Installation Steps

1. **Download Packages**  
   First, download the necessary packages from our [**Download Page**](download.md).

2. **Install Ambari**  
   Then follow the detailed installation instructions in the [**Installation Guide**](installation-guide.md).

## Key Features in Ambari 3.0.0

Apache Ambari 3.0.0 includes numerous enhancements and improvements across various areas:

### New Service Support

- **Alluxio Integration** (AMBARI-26055) - Full support for Alluxio distributed file system
- **Ozone File System** (AMBARI-24976) - Integration with Apache Hadoop Ozone object store
- **OceanBase Support** - Added compatibility with OceanBase database systems

### Monitoring and Visualization

- **Grafana Dashboards** (AMBARI-25960) - Enhanced monitoring capabilities with pre-configured Grafana dashboards
- **HiveServer2 Web UI Quicklink** (AMBARI-26270) - Direct access to HiveServer2 web interface
- **Improved Metrics Collection** - Enhanced metrics gathering for better system insights
- **Timeline Service Enhancements** - Improved performance and reliability of the Timeline Service

### Development and Code Quality

- **Java 17 Support** - Full compatibility with OpenJDK 17
- **Python Modernization** - Code improvements including:
  - Implementation of f-strings for better readability
  - Python 3 compatibility throughout the codebase
  - Ruff integration (AMBARI-26147) for code quality
- **Spark Performance Improvements** - Optimizations for Spark processing

### Security Enhancements

- **Multiple CVE Fixes** - Addressing security vulnerabilities
- **Dependency Updates** - Security-focused upgrades including:
  - Commons-collections library
  - Logback framework
  - PostgreSQL client
  - Snakeyaml parser
- **Kerberos Encryption Fixes** - Improved Kerberos authentication security
- **LDAP/AD Authentication Improvements** - Enhanced directory service integration

### Infrastructure Improvements

- **Docker and Containerization Support** - Better support for containerized deployments
- **Rocky Linux 8 Compatibility** - Added support for Rocky Linux 8 deployments
- **Enhanced Installation Workflows** - Streamlined installation process across environments

For a complete list of new features, improvements, and fixes, please refer to the [**Release Notes**](release-notes.md)

## Getting Help

If you encounter any issues during setup or installation, please refer to our [**FAQ**](faq.md) for common questions and troubleshooting tips.

For additional help, you can:

- Join the [**Ambari mailing lists**](mailing-list.md)
- File issues in the [**Ambari JIRA**](https://issues.apache.org/jira/projects/AMBARI)
- Contribute to the [**Ambari Wiki**](https://cwiki.apache.org/confluence/display/AMBARI/Ambari)
