---
title: 安装 Ambari 3.1.0
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

# 安装 Ambari 3.1.0 {#install-ambari-310}

![Ambari Server 安装、Agent 信任注册、主机登记和集群就绪流程](/img/3.1.0/handdrawn/installation-enrollment-zh.webp)

本流程适用于经过审查的 3.1.0 候选版本或由审查源码构建的 RPM。安装前确认制品、OS、架构和仓库。不要将未审查的候选版本当作生产发行版。

## 准备主机 {#prepare-hosts}

从操作系统和批准的 Ambari 仓库安装受支持的候选版本依赖。默认 RPM/Python 目标是 Linux x86_64、CPython 3.9.2+ 和 `cp39` ABI；Rocky Linux 8 使用 AppStream `python39`。所有主机都应按网络策略解析主机名并访问 Server 和数据库。不要以关闭防火墙或 SELinux 作为生产解决方案。

为 Ambari Server 和 Agent 安装 JDK 17。Hadoop 及其他 Stack 服务单独选择 JDK，Ambari 不会静默替换它。对于默认 cp39 RPM 目标，检查运行时工具：

```shell
java -version
/usr/bin/python3.9 --version
```

在 Rocky 8 上使用软件包支持的 `python39` 解释器，不能假设通用 `python3` 指向 Python 3.9。Maven 和 Node/npm 是构建机工具，不是每台运行主机的前置依赖。运行时不要执行 `pip install`。

## 安装软件包 {#install-packages}

从同一经过审查的仓库或候选制品集合，在管理主机安装 Server，在每个受管主机安装 Agent。使用原生包管理器并保留依赖解析所需的仓库元数据。在 Rocky/RHEL 上使用支持仓库的包管理器解析依赖。Server 命令只在管理主机执行，Agent 命令在受管主机执行；以下路径指向经过审核的本地候选 RPM：

```shell
sudo dnf install /path/to/ambari-server-*.rpm
sudo dnf install /path/to/ambari-agent-*.rpm
```

RPM 会安装 Ambari 私有 Python 依赖和对应 ABI 的运行时封装脚本。不要覆盖旧版私有库目录，也不要使用无关的系统软件包替换随 RPM 提供的原生扩展。

## 配置数据库 {#configure-the-database}

使用数据库管理员批准的流程创建空的 Ambari 元数据库和服务账号。不要把数据库主机、端口、名称、用户和密码写入 shell 历史或文档。然后使用安装后的 Server setup 流程写入数据库配置：

```shell
sudo ambari-server setup
```

按提示输入数据库类型和连接信息。候选版本还支持分别配置 Ambari 与 Stack 的 Java Home：

```shell
sudo ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
```

请替换为实际安装路径；示例不会创建 JDK。启动服务前检查并备份生成的配置。

## 启动并注册 Agent {#start-and-enroll-agents}

通过批准的注册流程配置每个 Agent 的 Server 主机名和信任材料。候选版本要求预先建立 Server CA；CA 缺失或校验失败时 Agent 必须拒绝连接。不要使用默认注册口令，也不要提交私钥。

安装向导或添加主机流程会提供预期主机身份、Server 主机名、运行账号、引导端口、注册口令和可信 CA。对于预装 Agent，应在启动前配置相同的信任与连接信息：Server 主机名写入 Agent 配置，注册值以 `AMBARI_PASSPHRASE` 保存于 `/var/lib/ambari-agent/ambari-env.sh`，可信 Server CA 安装到 `/var/lib/ambari-agent/keys/ca.crt`。应保护环境文件，并通过可信通道传输 CA。不要把口令放入交互式命令行，也不要从未经验证的端点获取信任材料。这些路径定义于固定版本的[引导实现](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/python/setupAgent.py)。

```shell
sudo ambari-server start
sudo ambari-agent start
```

在 React 界面确认主机注册和 Agent 心跳正常，并成功执行一次受控命令，然后再安装 Stack。引导注册失败时，应检查 Server 和 Agent 日志，修正主机或信任配置，并在重新读取主机状态后重试；不要通过手动删除数据库记录来强制推进流程。

## 单独安装监控 {#install-monitoring-separately}

需要监控时，安装经过审查的 `ambari-metrics` RPM，并按对应的监控流程部署 VictoriaMetrics 和 VMAGENT。Agent 暴露 `/metrics` 及组件路由；VMAGENT 发现并抓取这些端点，再通过远程写入将样本发送至 VictoriaMetrics。React 通过 Ambari 受保护的指标查询代理读取数据，而不是访问旧 AMS 端点。在依赖仪表盘进行运维判断之前，应分别验证指标导出端点、目标发现、存储写入和数据源访问。

## 验证安装 {#verify-installation}

检查 Server 和 Agent 使用预期的 JDK/Python ABI，元数据库可访问，且服务检查成功。记录候选版本修订和环境结果。本指南不声称这些检查已在此环境运行。

参阅 [快速入门](./quick-start-guide.md)、[Python 运行时](../platform/python-runtime.md) 和 [升级规划](../upgrade-guide.md)。
