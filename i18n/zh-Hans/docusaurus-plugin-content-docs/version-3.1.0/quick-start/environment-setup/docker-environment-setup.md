---
title: Docker 环境准备
sidebar_position: 3
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

# Docker 环境准备 {#docker-environment}

Docker 可以为 Ambari 3.1.0 候选版本提供可重复创建的开发和验证环境，但项目并未在此提供官方 Ambari 3.1.0 镜像。应选择组织信任且与候选操作系统一致的基础镜像，并在其中配置经过审查的 RPM 仓库或安装候选 RPM。

## 主机要求 {#host-requirements}

使用宿主机团队支持的 Docker Engine 和 Compose 版本，并为一台 Server 及所需 Agent 分配足够的 CPU、内存、磁盘和嵌套服务能力。容器应连接到用户管理的桥接网络，并通过稳定的服务名互相访问，不要将可能变化的容器 IP 地址写入配置。元数据库和软件包仓库目录必须持久化。

基础镜像必须为 Ambari 提供 JDK 17，Stack 服务可以按各自兼容性要求使用另一套 JDK。镜像还应提供 Linux Python 3.9.2 或更高版本，并与软件包的 CPython `cp39` ABI 保持一致；Rocky Linux 8 镜像需要 AppStream `python39` 和 Ambari 的 Python 运行时封装脚本。

## Compose 环境 {#compose-envelope}

基于批准的基础镜像创建本地 `docker-compose.yml`。以下内容仅说明环境结构，必须将镜像名和挂载路径替换为经过审查的实际值：

```yaml
services:
  ambari-server:
    image: your-approved-base-image
    command: /sbin/init
    ports: ["8080:8080"]
    volumes: ["./ambari-repo:/var/repo/ambari", "./state/server:/var/lib/ambari-server"]
  ambari-agent:
    image: your-approved-base-image
    command: /sbin/init
    volumes: ["./ambari-repo:/var/repo/ambari", "./state/agent:/var/lib/ambari-agent"]
```
```shell
mkdir -p ambari-repo state/server state/agent
docker compose up -d
docker compose ps
```

在容器中安装同一候选集合中的 Server 和 Agent 软件包。运行 `sudo ambari-server setup` 配置数据库连接和彼此独立的 Java Home，并提前配置 CA 信任。随后验证容器 DNS、TLS 身份、时间同步、必要端口、Agent 心跳，以及容器重启后的数据持久性。不要通过关闭所有安全控制来解决网络连接问题。

如需从实际源码树构建，仓库提供了包含 Rocky Linux 8、JDK 17 和 Python 3.9 的构建环境封装：

```shell
./start-build-env.sh bash
./start-build-env.sh mvn -B -DskipTests package
```

这些命令只用于进入构建环境或执行 Maven 构建，不会生成可直接运行的集群镜像。软件包来源和检查方法见[下载](../download.md)。
