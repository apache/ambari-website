---
title: 裸机和 KVM 环境设置
sidebar_position: 4
---

<!--
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
-->

# 裸机和 KVM 环境设置 {#bare-metal-kvm}

本指南准备现有服务器或 KVM 客户机，以评估经过审查的 3.1.0 候选版本。它是环境封装，不是容量或生产认证声明。

## 要求 {#requirements}
准备管理主机和至少一个 Agent 主机，运行受支持的 Linux 候选 OS。所有主机使用相同 RPM 架构，默认是 x86_64。准备管理权限、持久磁盘、稳定主机名和所需网络路由。
Ambari Server/Agent helper 使用 JDK 17；Hadoop 等 Stack 服务单独选择 JDK。Linux Python 要求 3.9.2+，默认包使用 CPython `cp39` ABI。Rocky 8 使用 AppStream `python39`，wrapper 必须匹配原生扩展。

## 主机和时间配置 {#host-and-time}
为所有主机设置唯一 FQDN，确保正向和反向解析。使用站点 DNS 或统一管理的 hosts 文件。
```shell
hostname --fqdn
getent hosts ambari-server.example.test
```
使用批准的 NTP/chrony 服务同步时钟。注册前确认数据库和集群主机时间一致，只开放拓扑需要的端口。
不要全局关闭防火墙或 SELinux；通过变更流程添加精确规则。保留数据库、配置、信任材料和候选 RPM 备份。

## 安装和验证 {#install-and-validate}
在管理主机安装 Server RPM，在各客户机安装 Agent RPM，使用 `ambari-server setup` 配置数据库。通过管理员流程创建空元数据库和服务账号，本文不保存密码。
```shell
sudo ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
sudo ambari-server start
sudo ambari-agent start
```
通过批准的 bootstrap 流程预置 Server CA 和注册信任材料。验证 DNS、TLS 身份、Agent heartbeat、主机注册和一次受控服务检查。修正配置后重新读取状态再重试。
源码构建和包检查见[下载](../download.md)与[安装](../installation-guide.md)。流程依据源码提交 `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4`。
