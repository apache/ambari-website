---
title: 从源代码构建
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

# 从源代码构建 Apache Ambari {#building-apache-ambari-from-source}

![Apache Ambari 的 Maven、Java、Python、React、测试和 RPM 构建流水线](/img/3.1.0/handdrawn/build-pipeline-zh.webp)

## 前提条件 {#prerequisites}

使用 JDK 17 和 Maven 3.9.x。Ambari 打包在 Linux x86_64 上以 CPython 3.9（`cp39`）为目标；构建解释器必须满足源代码要求，但不能与软件包 ABI 混用。安装 Node 22 和 npm 以构建 React 应用，并安装 `rpmbuild`/`rpm-build`、C++ 编译器以及 [Java 依赖](../platform/java-dependencies.md)和 [Python 运行时](../platform/python-runtime.md)指南中说明的平台库。

对于以下默认打包和测试命令，请使用匹配的 Linux x86_64、CPython 3.9 构建环境：Python 测试会通过 Maven 配置的环境加载暂存私有依赖。为其他目标交叉构建不能证明这些原生扩展可在构建主机上运行；应在匹配的目标运行时上单独验证。

## 克隆和检查 {#clone-and-inspect}

```bash
git clone https://github.com/apache/ambari.git
cd ambari
mvn -version
```

根目录 `pom.xml` 是 Maven reactor。使用 `-pl` 指定模块，使用 `-am` 包含所需 reactor 依赖。

## 构建主 reactor {#build-the-main-reactor}

迭代期间可在不运行测试和打包检查的情况下构建：

```bash
mvn -B -T 2C -pl ambari-server -am clean install -DskipTests -DskipPythonTests -DskipUiBuild=true -Drat.skip
```

构建不排除测试或 UI 的常规 reactor 软件包：

```bash
mvn -B clean package rpm:rpm -Dbuild.os_arch=x86_64
```

Server 和 Agent RPM 会写入各模块的 `target/rpm` 目录。发布制品前应核对其目标架构和版本。VictoriaMetrics 监控后端使用独立的 `metrics-rpm` Maven 构建配置，详见 [RPM 打包](../platform/rpm-packaging.md)。

## React 应用 {#react-applications}

`ambari-web` Maven 模块使用仓库 Node/npm 工具链构建 `ambari-web/latest`，并打包 `latest/dist`。独立的 `ambari-admin` 模块构建其 React 应用，并将输出打包到 `classes/latest`。使用 `-DskipUiBuild=true` 的 Maven 构建不会验证这些应用。

## Python 打包 {#python-packaging}

Maven 打包期间，Agent 和 Server 依赖会安装到 Ambari 私有库。CPython 3.9（`cp39`）是 Wheel 属性选择的默认目标，并不存在名为 `python-wheel-cp39` 的 Maven 构建配置。离线构建必须使用锁定依赖和预先准备的 Wheel 仓库；不要在生产节点运行 `pip install`。源码使用的 Python 解释器与软件包声明的 ABI 相互关联，但不能视为同一项兼容性保证。

## 专用构建配置 {#focused-profiles}

应使用项目为受支持平台或 Wheel ABI 定义的 Maven 构建配置，不要临时修改依赖版本。离线构建必须提供经过批准的 Wheel 仓库，并使用仓库已有的禁止索引访问设置。生成的 RPM、Wheel 元数据和 SBOM 输出应保留在 `target` 目录中供审查。
