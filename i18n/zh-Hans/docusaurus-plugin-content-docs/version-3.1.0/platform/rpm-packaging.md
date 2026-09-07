---
title: RPM 打包
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

# RPM 打包 {#rpm-packaging}

Ambari RPM 在 Linux 构建环境中使用 JDK 17 和 Maven 3.9.x 构建。Java 构建范围由 Maven Enforcer 强制执行；这是构建要求，与运行时 JDK 选择分开。

## Agent Python 制品 {#agent-python-artifacts}

默认 Python 打包元组为 CPython `cp39`、Python `3.9.2`、实现 `cp`、ABI `cp39` 和平台 `manylinux2014_x86_64`。RPM 依赖在适用时要求 Python 3.9.2 及匹配的 `python(abi) = 3.9`。Rocky 8 使用 `python39`；已安装的 `ambari-python-wrap` 会验证打包 ABI 和解释器。节点不会运行 `pip install`。

Maven 在打包前会清理暂存目录。运行时 lock 使用 hash 锁定，并通过 `--only-binary=:all:`、`--no-deps` 以及所选平台/版本/ABI 安装二进制 wheel。唯一的分发例外是 `docopt==0.6.2`，它是 stomp.py 的硬依赖，会从单独 hash 锁定的 sdist 安装。软件包审计会验证 RECORD 元数据、许可证、ABI/平台并生成 SBOM。依赖会放入 Ambari 私有库。

普通 Agent/Server RPM 构建命令如下：

```shell
mvn -B -am -pl ambari-agent,ambari-server clean package rpm:rpm -Dbuild.os_arch=x86_64
```

如需使用离线 Python Wheel 仓库，请添加 `-Dpython.wheelhouse=/srv/build/wheelhouse`。该参数会激活设置 `PIP_NO_INDEX=true` 的 Maven 构建配置；指定目录必须包含锁定的运行时依赖和构建依赖所需的全部制品。此设置只会禁止访问 Python 软件包索引；要实现完全离线构建，还需要分别为 Maven、Node/npm 和监控后端下载准备缓存或镜像。

使用 `-Dbuild.os_arch=aarch64` 会激活 `python-wheel-aarch64` 构建配置并选择 `manylinux2014_aarch64`；`python-wheel-cp310` 则生成独立的 CPython 3.10 制品。这些构建配置只声明制品目标，不代表所有平台组合都经过生产认证。

## Metrics RPM {#metrics-rpm}

Metrics RPM 是面向 VictoriaMetrics 监控后端的独立 `ambari-metrics` 打包模块，并非旧版 AMS 实现。根项目的 `metrics-rpm` Maven 构建配置会包含该模块。当前固定的 VictoriaMetrics 版本为 `1.150.0`。独立的 `metrics.package.version` 属性修改的是 Ambari RPM 版本，而不是 VictoriaMetrics 二进制版本。更新监控后端时，必须同时审查其版本、固定源码修订和校验和清单。RPM 架构由 `build.os_arch` 决定；后端准备脚本负责验证并暂存经过审查的二进制文件、元数据和 LICENSE/NOTICE 文件。

使用明确的候选软件包版本单独构建 Metrics RPM：

```shell
mvn -B -Pmetrics-rpm -pl ambari-metrics -am package rpm:rpm -Dmetrics.package.version=3.1.0.0 -Dpackage.release=0.candidate1 -Dbuild.os_arch=x86_64
```

这些命令描述构建流程，并不表示构建已经运行。发布前应检查 RPM 内容和依赖元数据。

将 `AGENT_RPM` 设置为候选文件，并在不安装的情况下检查：

```shell
rpm -qp --queryformat '%{NAME} %{VERSION}-%{RELEASE} %{ARCH}\n' "$AGENT_RPM"
rpm -qp --requires "$AGENT_RPM"
rpm -qpl "$AGENT_RPM"
```

验证目标架构和 ABI、运行时封装脚本入口、私有运行时库、LICENSE/NOTICE 文件以及生成的 SBOM。成功生成构建归档并不能替代在目标发行版上实际安装 RPM，以及验证依赖导入、Agent 注册和服务命令。

## 参考 {#references}

Python/RPM 打包变更位于 [AMBARI-26643](https://github.com/apache/ambari/commit/daf7576fb67edbde6b53fa52c9d23f918f23f817)。Metrics 打包由固定版本的 [Metrics POM](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-metrics/pom.xml) 和[监控后端准备脚本](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-metrics/src/main/scripts/prepare-victoriametrics.sh)定义。另请参阅 [Python 运行时](./python-runtime.md)、[Java 依赖](./java-dependencies.md)和[升级指南](../upgrade-guide.md)。
