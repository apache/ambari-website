---
title: 技术栈
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

# 技术栈 {#technology-stack}

| 领域 | 实现 |
| --- | --- |
| Server 构建 | 根构建强制要求 JDK 17 和 Maven 3.9.x |
| Server 框架 | 统一管理的 Spring/Spring Security、Jetty、Jersey、Jakarta API、Guice 和 EclipseLink 依赖 |
| Agent 与 Server 工具 | Python 源码最低版本为 3.9.2，使用锁定的官方依赖及软件包特定的原生 ABI |
| 主 Web 界面 | latest 前端模块中的 React、TypeScript、Vite 和 Vitest |
| 管理界面 | 随 Ambari 打包的独立 React Admin 模块 |
| 管理数据持久化 | 配置的关系数据库与 JDBC 驱动 |
| 历史指标监控 | 兼容 Prometheus 的指标端点、VMAGENT 和 VictoriaMetrics |
| 配置与扩展元数据 | Stack/服务 XML 和 JSON、Theme、遥测描述符、JMX 配置和 View 定义 |

[Java 指南](../platform/java-dependencies.md)记录有效的框架版本和暂缓的大版本迁移。[Python 指南](../platform/python-runtime.md)解释为什么更高版本的解释器不一定满足另一种次版本 ABI 软件包的要求。

## 构建工具与运行时 {#build-tools-versus-runtime}

Maven 和 Node/npm 属于构建环境工具，不是所有受管集群节点的通用前置依赖。应部署经过审核的制品，不能将前端开发服务器或可变的系统 Python 环境当作产品部署。

默认 RPM 目标使用 CPython 3.9 Wheel。针对其他处理器架构和 Python ABI 的构建配置会选择独立制品，详见 [RPM 打包](../platform/rpm-packaging.md)和[源码构建](../ambari-dev/building-from-source.md)。

## 受管服务 {#managed-services}

已审核的 BIGTOP 源码树包含通过继承组织的 3.2.0、3.3.0 和 3.4.0 定义。应选择候选版本验证过的 Stack 和组件版本。这些目录名并不表示 Ambari 发行版本是 3.4.0，Ambari 的 JDK 也不会覆盖所有服务的 JDK。

服务软件包、配置、依赖和生命周期命令仍由 Stack 服务元数据定义。扩展或重新构建服务软件包时，请阅读 [Stack 定义](./stack-and-services/index.md)和 [Bigtop 构建指南](../ambari-dev/bigtop-guide.md)。

## 源码参考 {#source-references}

实现依据参见[根构建文件](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/pom.xml)、[统一依赖版本](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-project/pom.xml)和 [BIGTOP 元数据](https://github.com/apache/ambari/tree/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-server/src/main/resources/stacks/BIGTOP)。
