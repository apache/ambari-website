---
title: Python 运行时
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

# Python 运行时 {#python-runtime}

Ambari 3.1.0 在 Linux 上要求 Python **3.9.2 或更高版本**。默认软件包目标是 CPython 3.9（`cp39`）和 `manylinux2014_x86_64` 平台。Rocky Linux 8 显式要求 AppStream `python39`；Rocky Linux 9 使用系统 Python 3.9。已安装的 wrapper 会验证解释器并选择匹配的 ABI。

源代码级别的最低版本并不意味着 cp39 RPM 与任何更高的 Python 次版本兼容。应使用与软件包原生扩展匹配的解释器；CPython 3.10 需要自己的软件包目标。Ambari 自有 Python 代码仍由 Ambari 维护。删除操作针对复制的第三方 fork，而不是删除经过验证的上游 wheel 中提供的所有 Python 源文件。

## 官方依赖 {#official-dependencies}

合并后的 Python 现代化改用官方软件包，而不是 vendored fork：APScheduler `3.11.3`、Jinja2 `3.1.6`、MarkupSafe `3.0.3`、stomp.py `8.2.0`、websocket-client `1.9.0`、cryptography `50.0.1`、distro `1.9.0`、javaproperties `0.8.2` 和 PyYAML `6.0.3`。vendored APScheduler、Jinja2、STOMP/WebSocket、加密库和测试 broker 源码不是运行时依赖。

simplejson 使用标准库 `json` 替代，mock 使用 `unittest.mock` 替代，pbkdf2 使用 `hashlib.pbkdf2_hmac` 替代。现有 AES-CBC v1 兼容性会保留，协议变更另行处理。

## 打包契约 {#packaging-contract}

Agent 和 Server 依赖在 Maven 构建期间安装到 Ambari 私有库。节点运行时不得执行 `pip install`。依赖要求经过 hash 锁定，主 lock 仅接受所选平台和 ABI 的二进制 wheel。`docopt==0.6.2` 是唯一例外：stomp.py 将其声明为硬依赖，因此从单独 hash 锁定的源代码分发包安装。

构建会清理旧依赖目录，审计已安装的元数据和许可证，并生成 SBOM。默认平台是 Linux x86_64；`python-wheel-aarch64` 和 `python-wheel-cp310` profile 生成独立制品，不能据此证明所有平台都经过生产验证。离线构建使用提供的 wheelhouse，并设置 `PIP_NO_INDEX=true`。

运行时 wrapper、依赖目录和原生扩展必须使用同一个 Python ABI。不得重新引入已删除的 Python 2 扩展、Ambari simulator/test bundle 或未锁定的可选测试依赖。经过验证的上游发行包可以包含其 RECORD 元数据覆盖的自带文档、测试或示例。normalizer 会移除未使用的已声明 console/GUI 入口并更新 RECORD；这不授权任意裁剪上游发行包。有关打包和迁移约束，请参阅 [RPM 打包指南](./rpm-packaging.md) 和[升级指南](../upgrade-guide.md)。

## 源码证据 {#source-evidence}

运行时和打包变更合并于 [AMBARI-26643](https://github.com/apache/ambari/commit/daf7576fb67edbde6b53fa52c9d23f918f23f817)。Python 下限、解释器选择、wheel 平台/ABI 默认值、RPM 要求以及离线 Maven 安装由当前 `pyproject.toml`、requirements lock、根 `pom.xml`、Agent `pom.xml` 和 Unix wrapper 脚本定义。
