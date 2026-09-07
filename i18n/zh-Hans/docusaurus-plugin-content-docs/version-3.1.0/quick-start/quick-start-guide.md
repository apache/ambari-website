---
title: Ambari 3.1.0 快速入门指南
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

# Ambari 3.1.0 快速入门指南 {#quick-start-guide-310}

使用本流程在小型且有代表性的 Linux 环境中评估经过审查的 Ambari 3.1.0 候选版本。3.1.0 当前按候选版本记录，因此请从项目审查渠道获取制品，或从源码构建。不假设存在公开镜像、校验和、默认凭据或生产认证。

## 1. 评估环境 {#qualify-the-environment}

为所有主机选择一个受支持的候选 OS 家族和架构。默认制品目标是 Linux x86_64。提供 Linux Python 3.9.2 或更高版本；默认 ABI 是 CPython `cp39`。Rocky Linux 8 需要 AppStream `python39`，通用 `python3` 可能选择错误的解释器。

为 Ambari 安装 JDK 17，为 Stack 服务单独选择并记录 JDK。对于默认 cp39 RPM 目标，检查运行时工具：

```shell
java -version
/usr/bin/python3.9 --version
```

按安全策略准备主机名解析、时间同步、数据库连接和所需服务端口。不要用关闭防火墙或 SELinux 规避问题。

## 2. 获取或构建 {#obtain-or-build}

Maven 3.9.x 和 Node/npm 工具链只要求安装在构建机上，而非每台运行节点。源码构建使用 JDK 17。

Server 和 Agent 使用同一经过审查的候选制品集合。源码 RPM 构建命令：

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm \
  -Dbuild.os_arch=x86_64
```

离线 Python wheelhouse 可通过 `-Dpython.wheelhouse=/srv/build/wheelhouse` 提供，且必须包含所有锁定制品。Maven 和前端依赖需要单独的缓存或镜像。架构规则和制品检查见[下载](./download.md)。

## 3. 安装并配置 {#install-and-configure}

在管理主机安装 Server，在各受管主机安装 Agent，来源必须是同一审查仓库。RPM 已包含私有 Python 库，目标节点不运行 `pip install`。

在 Rocky/RHEL 上通过 DNF 安装，以便从批准的仓库解析依赖。Server 命令在管理主机执行，Agent 命令在受管主机执行：

```shell
sudo dnf install /path/to/ambari-server-*.rpm
sudo dnf install /path/to/ambari-agent-*.rpm
```

使用管理员批准的数据库流程创建空的 Ambari 元数据库和服务账号。只在 setup 提示或受支持的秘密管理方式中输入连接信息，不要把它们写入本文档或 shell 历史。

需要时明确设置两个 Java 边界：

```shell
sudo ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
```

## 4. 启动并注册 {#start-and-enroll}

通过批准的 bootstrap 流程预置 Server CA 和注册信任材料。Agent 必须验证 Server 身份，CA 缺失或错误时拒绝连接；不支持 `DEV` 回退。

```shell
sudo ambari-server start
sudo ambari-agent start
```

打开 React Ambari 界面，确认 Agent heartbeat 和主机注册，再执行一次受控服务检查。修正主机或信任配置后，从当前 Server 状态重试。

## 5. 连接监控 {#connect-monitoring}

监控需要安装经过审查的 `ambari-metrics` 包及匹配的 VictoriaMetrics/VMAGENT 部署。Agent 暴露主机 `/metrics` 和稳定的组件路由。VMAGENT 负责发现、抓取并 remote-write 到 VictoriaMetrics；Ambari 受保护的 proxy 向 React Dashboard 提供 Prometheus 兼容查询。验证 exporter 健康、目标发现、存储、datasource 连接和角色授权。

该流程替代旧 AMS/Ganglia 指南，不会自动导入 AMS 历史数据或转换旧 Dashboard 布局。

## 6. 记录结果 {#record-results}

记录候选版本修订、包架构、OS/Python ABI、两个 JDK 路径、数据库备份位置、注册方式和监控验证结果。在尝试 Stack 服务前保留回滚包和元数据备份。升级规划见[3.1.0 升级规划](../upgrade-guide.md)。

上述流程和选项依据源码提交 `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4`；Java 基线提交为 `94c6389a96b38bccef0b6a08269481a086b63ca1`。
