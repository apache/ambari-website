---
sidebar_position: 1
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--->

# 快速入门指南 {#quick-start-guide}

本文档快速概述如何在各种环境中设置 Apache Ambari 3.0.0。有关特定环境的详细设置说明，请参阅相应的环境设置指南。

## 环境设置选项 {#environment-setup-options}

Apache Ambari 3.0.0 可以安装在多种不同环境中：

### 1. Vagrant 环境 {#1-vagrant-environment}

Vagrant 环境通过在本地计算机上使用虚拟机，提供了快速设置开发集群的方式。它非常适合测试和开发用途。

[**查看 Vagrant 环境设置指南**](environment-setup/vagrant-environment-setup.md)

### 2. Docker 环境 {#2-docker-environment}

Docker 环境使用包含一个服务器和两个代理的多个容器，提供了轻量级的容器化方案。此设置以 Rocky Linux 8 作为基础镜像，并包含容器网络、SSH 设置和安全配置。

[**查看 Docker 环境设置指南**](environment-setup/docker-environment-setup.md)

### 3. 裸机/KVM 设置 {#3-bare-metalkvm-setup}

对于生产部署或较大的开发环境，裸机/KVM 设置涵盖物理服务器和 KVM 虚拟机。本指南包含详细的系统要求、网络配置，以及开发和生产安全设置。

[**查看裸机/KVM 设置指南**](environment-setup/bare-metal-kvm-setup.md)

## 安装指南 {#installation-guide}

使用上述任一方法设置环境后，即可执行以下步骤：

### 安装步骤 {#installation-steps}

1. **下载软件包**  
   首先，从我们的[**下载页面**](download.md)下载所需的软件包。

2. **安装 Ambari**  
   然后按照[**安装指南**](installation-guide.md)中的详细说明进行安装。

## Ambari 3.0.0 的主要功能 {#key-features-in-ambari-300}

Apache Ambari 3.0.0 在多个方面进行了大量增强和改进：

### 新服务支持 {#new-service-support}

- **Alluxio 集成** (AMBARI-26055) - 完整支持 Alluxio 分布式文件系统
- **Ozone 文件系统** (AMBARI-24976) - 集成 Apache Hadoop Ozone 对象存储
- **OceanBase 支持** - 增加与 OceanBase 数据库系统的兼容性

### 监控和可视化 {#monitoring-and-visualization}

- **Grafana 仪表板** (AMBARI-25960) - 通过预配置的 Grafana 仪表板增强监控能力
- **HiveServer2 Web UI 快速链接** (AMBARI-26270) - 直接访问 HiveServer2 Web 界面
- **改进指标收集** - 增强指标收集，以便更好地了解系统
- **Timeline Service 增强** - 提高 Timeline Service 的性能和可靠性

### 开发和代码质量 {#development-and-code-quality}

- **Java 17 支持** - 完全兼容 OpenJDK 17
- **Python 现代化** - 代码改进包括：
  - 使用 f-string 提高可读性
  - 在整个代码库中实现 Python 3 兼容性
  - 集成 Ruff (AMBARI-26147) 以提升代码质量
- **Spark 性能改进** - 优化 Spark 处理

### 安全增强 {#security-enhancements}

- **多个 CVE 修复** - 解决安全漏洞
- **依赖更新** - 面向安全性的升级包括：
  - Commons-collections 库
  - Logback 框架
  - PostgreSQL 客户端
  - Snakeyaml 解析器
- **Kerberos 加密修复** - 提高 Kerberos 身份验证安全性
- **LDAP/AD 身份验证改进** - 增强目录服务集成

### 基础设施改进 {#infrastructure-improvements}

- **Docker 和容器化支持** - 更好地支持容器化部署
- **Rocky Linux 8 兼容性** - 增加对 Rocky Linux 8 部署的支持
- **增强安装工作流** - 简化各环境中的安装流程

如需完整的新功能、改进和修复列表，请参阅[**发行说明**](release-notes.md)

## 获取帮助 {#getting-help}

如果在设置或安装过程中遇到问题，请参阅[**常见问题**](faq.md)中的常见问题和故障排除提示。

如需其他帮助，您可以：

- 加入 [**Ambari 邮件列表**](mailing-list)
- 在 [**Ambari JIRA**](https://issues.apache.org/jira/projects/AMBARI) 中提交问题
- 为 [**Ambari Wiki**](https://cwiki.apache.org/confluence/display/AMBARI/Ambari) 做出贡献
