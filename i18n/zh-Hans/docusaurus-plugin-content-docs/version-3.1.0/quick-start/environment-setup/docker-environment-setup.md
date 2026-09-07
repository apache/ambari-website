---
title: Docker 环境设置
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

# Docker 环境设置 {#docker-environment}
Docker 可为 3.1.0 候选版本提供开发环境，但不提供官方 Ambari 3.1.0 镜像。使用批准的基础镜像，并安装审查过的 RPM 仓库或候选 RPM。
## 主机要求 {#host-requirements}
准备足够 CPU、内存和磁盘运行 Server 与 Agent，使用用户管理的 bridge 网络和稳定服务名，并持久化数据库和仓库目录。
镜像应提供 Ambari JDK 17；Stack 服务可独立使用另一 JDK。提供 Python 3.9.2+ 和 `cp39` ABI；Rocky 8 需要 AppStream `python39` 与 wrapper。
## Compose 封装 {#compose-envelope}
创建本地 `docker-compose.yml`，使用你的批准镜像：
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
在容器中安装同一审查制品，运行 `sudo ambari-server setup`，配置独立 Java home 和预置 CA。验证 DNS、TLS、时间、端口、heartbeat 及重启后的持久性，不要通过关闭全部安全控制解决连接问题。
源码仓库提供 Rocky 8 构建封装：
```shell
./start-build-env.sh bash
./start-build-env.sh mvn -B -DskipTests package
```
这些是构建命令，不是现成集群镜像。参阅[下载](../download.md)。
