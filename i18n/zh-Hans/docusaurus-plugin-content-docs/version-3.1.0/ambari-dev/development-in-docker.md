---
title: 在 Docker 中开发
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

# 在 Docker 中开发 {#development-in-docker}

Ambari 提供基于 Docker 的构建环境，用于可复现的开发和验证。此环境用于构建和测试 Ambari；它不是已发布的生产镜像，也不承诺提供完整的 Hadoop 部署配方。

## 入口 {#entry-point}

从仓库根目录运行 `start-build-env.sh`。该脚本从 `dev-support/docker/${BUILD_OS}` 构建基础镜像，构建通用 Ambari 构建镜像，并启动用户专用容器。在已审核的 3.1 源码中，`BUILD_OS` 默认为 `rocky8`，`MAVEN_VERSION` 默认为 `3.9.11`；验证其他受支持的构建环境时应显式设置这些值。

```bash
./start-build-env.sh mvn -version
```

脚本后的参数会在容器中执行。不带参数时，脚本打开交互式 shell。源码树挂载到 `/home/${USER_NAME}/src`，主机 Maven 缓存挂载到 `/home/${USER_NAME}/.m2`。

这些默认值和挂载方式定义于固定版本的[构建环境脚本](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/start-build-env.sh)。

## 构建环境 {#build-environment}

`dev-support/docker` 下的 Dockerfile 会安装所选环境使用的构建前置依赖。请查看具体 Dockerfile 了解确切的操作系统软件包和工具版本，不要假设某个镜像标签或外部仓库包含特定版本。

容器不会替代仓库的模块构建。请从挂载的源码树运行常规 Maven 命令，并按照开发者指南中的说明，通过模块或 package 脚本构建主要 React 和 Admin React 应用。

## 架构和 ABI {#architecture-and-abi}

选择与待验证构件匹配的镜像和软件包目标。Python wheel 和原生扩展必须匹配目标 Python ABI 与 CPU 架构；Java 和 Node 工具链必须匹配项目支持的版本。某一架构的容器构建成功并不代表其他软件包目标已通过认证。

将生成输出、凭据、私钥和仅限主机的配置排除在提交之外。挂载的 `.m2` 目录是缓存，不是源码依赖声明。

## 验证边界 {#verification-boundary}

使用容器进行可重复的编译、单元测试、打包和构件检查。容器本身不会验证浏览器行为、SSO、运行中的 Ambari Server、已部署的 Stack、监控存储或跨主机恢复。记录确切的 `BUILD_OS`、工具链、命令以及跳过的环境相关检查。
