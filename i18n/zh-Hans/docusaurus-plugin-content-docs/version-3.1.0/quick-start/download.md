---
title: 下载 Ambari 3.1.0
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

# 下载 Ambari 3.1.0 {#download-ambari-310}

Ambari 3.1.0 文档当前描述的是经过审查的候选版本和源码构建，不表示最终公开发布、下载镜像、校验和集合或生产认证已经存在。请从发布流程使用的项目渠道获取候选版本及其经过审查的源码。

## 选择制品 {#choose-an-artifact}

Server、Agent 以及可选 Metrics 包必须来自同一制品集合。不要混用不同候选版本的包，也不要在安装之间复制私有 Python 库。RPM 架构必须与主机、Python wheel 和 VictoriaMetrics provider 制品保持一致。

默认 Linux 打包目标是 x86_64、CPython `cp39` 和 `manylinux2014_x86_64`。单独的 `aarch64` 构建选择 `manylinux2014_aarch64`；CPython 3.10 构建使用独立 profile。这些是构建目标，并不表示所有平台都已认证。

## 从源码构建 {#build-from-source}

在 JDK 17 和 Maven 3.9.x 的 Linux 环境中构建；仓库会强制检查这些版本。Agent 和 Server RPM 的常规构建命令如下：

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm -Dbuild.os_arch=x86_64
```

如需受控的 Python 依赖构建，提供包含全部锁定制品的 wheelhouse：

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm \
  -Dbuild.os_arch=x86_64 -Dpython.wheelhouse=/srv/build/wheelhouse
```

wheelhouse 会启用 `PIP_NO_INDEX=true`；Maven、Node 和 npm 仍需要各自的缓存或镜像。生成 RPM 后先检查，不要直接分发：

```shell
export AGENT_RPM=/path/to/ambari-agent.rpm
rpm -qp --queryformat '%{NAME} %{VERSION}-%{RELEASE} %{ARCH}\n' "$AGENT_RPM"
rpm -qp --requires "$AGENT_RPM"
rpm -qpl "$AGENT_RPM"
```

确认架构、Python ABI wrapper、私有库、license/NOTICE 文件和 SBOM 均符合预期。目标节点不要使用 `pip install`。

## 可选 Metrics 包 {#optional-metrics-package}

可选的 `ambari-metrics` RPM 打包经过审查的 VictoriaMetrics provider，替代旧 AMS/Ganglia 集成；旧的 AMS 或 Ganglia 安装说明不适用于此候选版本。单独构建：

```shell
mvn -B -Pmetrics-rpm -pl ambari-metrics -am package rpm:rpm \
  -Dmetrics.package.version=3.1.0.0 -Dpackage.release=0.candidate1 \
  -Dbuild.os_arch=x86_64
```

将 provider 版本、源码修订、校验和、元数据和 NOTICE 作为一个审查集合检查。命令只是操作流程，不代表本环境已完成构建或认证。

## 安装前 {#before-installation}

记录候选版本标识、源码修订、目标 OS 和架构、Ambari JDK、Stack JDK、Python 可执行文件、数据库方案及回滚备份。Rocky Linux 8 使用 AppStream `python39`；系统通用 `python3` 可能指向其他小版本。wrapper 与原生扩展必须使用相同 ABI。

下载清单中不要发布密码、私钥、注册密钥或默认凭据。请通过经过审查的部署流程配置信任锚点和凭据。

## 依据 {#download-evidence}

本指南依据源码提交 `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4` 和 Java 17 基线提交 `94c6389a96b38bccef0b6a08269481a086b63ca1`。参阅 [Java 依赖](../platform/java-dependencies.md)、[Python 运行时](../platform/python-runtime.md) 和 [RPM 打包](../platform/rpm-packaging.md)。
