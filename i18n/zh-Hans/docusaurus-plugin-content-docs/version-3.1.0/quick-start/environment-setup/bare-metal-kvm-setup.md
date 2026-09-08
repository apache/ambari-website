---
title: 裸机与 KVM 环境准备
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

# 裸机与 KVM 环境准备 {#bare-metal-kvm}

本指南用于准备现有物理服务器或 KVM 虚拟机，以验证经过审查的 Ambari 3.1.0 候选版本。这里给出的是一套可复现的基础环境约束，不构成容量规划建议，也不代表相关操作系统、虚拟化平台或硬件组合已经获得生产认证。

## 环境要求 {#requirements}

至少准备一台管理主机和一台运行 Ambari Agent 的受管主机，并使用候选版本支持的 Linux 发行版。所有主机应采用同一种 RPM 架构，默认构建目标为 x86_64。环境还应具备必要的管理权限、持久化磁盘、稳定主机名，以及 Ambari Server、Agent、元数据库和 Stack 服务之间所需的网络路由。

Ambari Server 和 Agent 辅助程序使用 JDK 17；Hadoop 等 Stack 服务所需的 JDK 应独立选择和记录。Linux 上的 Python 版本不得低于 3.9.2，默认软件包面向 CPython `cp39` ABI。Rocky Linux 8 应使用 AppStream 提供的 `python39`，且已安装的运行时封装脚本必须与软件包中的原生扩展使用相同 ABI。

## 主机名与时间配置 {#host-and-time}

为每台主机配置唯一的完全限定域名，并确保所有节点上的正向解析和反向解析结果一致。可以使用组织统一管理的 DNS 服务，也可以使用内容一致且纳入配置管理的 hosts 文件。使用以下命令核对解析结果：

```shell
hostname --fqdn
getent hosts ambari-server.example.test
```

使用组织批准的 NTP 或 chrony 服务同步时间。在注册 Agent 之前，应确认元数据库主机与所有集群节点的时钟一致。网络策略只应开放所选 Ambari、数据库、Stack 和监控拓扑实际需要的端口。

不要通过全局关闭防火墙或 SELinux 来规避部署问题。应按照操作系统变更流程增加范围明确的策略和防火墙规则，并为元数据库、Ambari 配置、信任材料以及候选 RPM 保留可恢复的备份。

## 安装和验证 {#install-and-validate}

在管理主机安装经过审查的 Server RPM，在每台受管主机安装同一候选集合中的 Agent RPM，然后运行 `ambari-server setup` 配置数据库连接。空的元数据库和服务账号应由数据库管理员按照既定流程创建，不要在本文、命令历史或普通配置记录中保存数据库密码。

```shell
sudo ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
sudo ambari-server start
sudo ambari-agent start
```

通过经过审查的引导注册流程预置 Server CA 和注册信任材料。依次验证 DNS 解析、TLS 身份、Agent 心跳、主机注册以及一次受控的服务检查。发生失败时，应先修正配置并重新读取当前主机状态，再执行重试。

源码构建和软件包检查方法见[下载](../download.md)与[安装](../installation-guide.md)。本流程依据源码提交 `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4` 编写。
