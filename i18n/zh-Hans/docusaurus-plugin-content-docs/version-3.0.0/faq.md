---
title: 常见问题（FAQ）
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

# 常见问题（FAQ） {#frequently-asked-questions-faq}

本页面回答有关 Apache Ambari 3.0.0 的常见问题。如果您在这里找不到答案，请通过[邮件列表](https://ambari.apache.org/community.html)或 [Slack 频道](https://the-asf.slack.com/archives/C014FSPE668)联系社区。

## 常规问题 {#general-questions}

### 什么是 Apache Ambari？ {#what-is-apache-ambari}

Apache Ambari 是一款开源管理工具，旨在简化 Apache Hadoop 集群的管理、监控和维护。Ambari 提供直观的 Web UI 和强大的 REST API，以简化 Hadoop 集群的部署、管理和监控。

### Ambari 3.0.0 有哪些新功能？ {#whats-new-in-ambari-300}

Ambari 3.0.0 包含多项重大改进：
- Alluxio 支持（AMBARI-26055）
- Ozone 文件系统服务（AMBARI-24976）
- Grafana 仪表盘（AMBARI-25960）
- Ruff 集成（AMBARI-26147）
- HiveServer2 Web UI 快速链接（AMBARI-26270）
- Java 17 支持
- Python 3 兼容性
- OceanBase 支持

完整的新功能列表请参见[发行说明](./release-notes.md)。

## 安装和设置 {#installation-and-setup}

### Ambari 3.0.0 的系统要求是什么？ {#what-are-the-system-requirements-for-ambari-300}

使用 Vagrant 的开发环境要求：
- 主机 CPU：至少 6 个核心（每个 VM 2 个核心）
- 主机内存：至少 24GB（每个 VM 8GB）
- 存储：至少 100GB 可用空间
- VirtualBox 6.1+ 和 Vagrant 2.2+

生产环境的要求将根据集群规模和工作负载而有所不同。

### 支持哪些操作系统？ {#which-operating-systems-are-supported}

Ambari 3.0.0 支持：
- Rocky Linux 8
- CentOS 7
- Red Hat Enterprise Linux 7 和 8
- Ubuntu 18.04 和 20.04

### 如何启用 Rocky-Devel 仓库？ {#how-do-i-enable-the-rocky-devel-repository}

您需要在每个 VM 上编辑 Rocky-Devel.repo 文件。可能遇到以下两种情况：
1. 所有行都被注释：取消必要行的注释
2. 仓库通过 enabled=0 禁用：将其改为 enabled=1

验证仓库是否正确启用：
```bash
yum repolist | grep devel
```

### 如何排查 SSH 连接问题？ {#how-do-i-troubleshoot-ssh-connectivity-issues}

如果遇到 SSH 连接问题：
1. 验证 SSH 服务正在运行：`systemctl status sshd`
2. 检查 SSH 配置：`cat /etc/ssh/sshd_config`（确保 PasswordAuthentication 和 PermitRootLogin 设置为 yes）
3. 重启 SSH 服务：`systemctl restart sshd`
4. 如有需要，重新分发 SSH 密钥：`ssh-copy-id -o StrictHostKeyChecking=no user@host`

## 配置 {#configuration}

### 如何禁用 SELinux？ {#how-do-i-disable-selinux}

临时禁用 SELinux：
```bash
setenforce 0
```

永久禁用 SELinux：编辑 `/etc/selinux/config` 并设置：
```
SELINUX=disabled
```

### 如何正确配置 hosts 文件？ {#how-do-i-configure-the-hosts-file-correctly}

确保 hosts 文件：
1. 不包含集群主机名的回环地址条目
2. 包含所有节点正确的静态 IP 映射
3. 在集群的所有节点上保持一致

例如：
```
192.168.56.20 vm1
192.168.56.21 vm2
192.168.56.22 vm3
```

### 支持哪些数据库系统？ {#which-database-systems-are-supported}

Ambari 3.0.0 支持：
- PostgreSQL 9.6+
- MySQL 5.7+
- MariaDB 10.2+
- OceanBase

## 故障排查 {#troubleshooting}

### 常见安装问题 {#common-installation-issues}

1. **仓库访问问题**：
   - 验证互联网连接
   - 检查仓库配置
   - 确保 Rocky-Devel 仓库已启用

2. **数据库连接问题**：
   - 验证数据库服务正在运行
   - 检查连接字符串和凭据
   - 确保数据库用户拥有适当权限

3. **Agent 注册失败**：
   - 验证主机名解析可双向正常工作
   - 检查防火墙设置
   - 确保所有节点的时间已同步

### 如何检查 Ambari Server 日志？ {#how-do-i-check-ambari-server-logs}

Ambari Server 日志位于：
```
/var/log/ambari-server/ambari-server.log
```

实时查看日志：
```bash
tail -f /var/log/ambari-server/ambari-server.log
```

### 如何检查 Ambari Agent 日志？ {#how-do-i-check-ambari-agent-logs}

Ambari Agent 日志位于：
```
/var/log/ambari-agent/ambari-agent.log
```

实时查看日志：
```bash
tail -f /var/log/ambari-agent/ambari-agent.log
```

## 开发 {#development}

### 如何为 Ambari 做贡献？ {#how-do-i-contribute-to-ambari}

为 Ambari 做贡献：
1. 阅读[如何贡献](./ambari-dev/how-to-contribute.md)指南
2. 遵循[编码指南](./ambari-dev/coding-guidelines-for-ambari.md)
3. 按照[如何提交代码](./ambari-dev/how-to-commit.md)流程提交贡献

### 如何设置开发环境？ {#how-do-i-set-up-a-development-environment}

设置开发环境：
1. 遵循 [Vagrant 环境设置](./quick-start/environment-setup/vagrant-environment-setup.md)或 [Docker 环境设置](./quick-start/environment-setup/docker-environment-setup.md)指南
2. 阅读 [Docker 中的开发](./ambari-dev/development-in-docker.md)文档

### 如何为 Ambari 创建自定义服务？ {#how-do-i-create-a-custom-service-for-ambari}

创建自定义服务：
1. 阅读[自定义服务](./ambari-design/stack-and-services/custom-services.md)文档
2. 遵循[如何定义 Stack 和服务](./ambari-design/stack-and-services/how-to-define-stacks-and-services.md)指南
3. 参阅[编写 Metainfo](./ambari-design/stack-and-services/writing-metainfo.md)文档，了解服务定义详情
