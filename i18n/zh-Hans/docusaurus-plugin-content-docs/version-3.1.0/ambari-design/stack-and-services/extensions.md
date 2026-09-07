---
title: 扩展
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

# 扩展 {#extensions}

扩展是一组独立进行版本管理的自定义服务，可以链接到明确支持的 Stack 版本。链接完成后，集群无需把这些服务复制到 Stack 目录即可使用它们。Ambari Server 的扩展处理逻辑负责读取扩展元数据、验证兼容性并维护链接关系；扩展不会绕过 Stack 服务定义、软件包来源和生命周期命令的正常校验。

## 版本兼容性 {#version-compatibility}

扩展版本通过 `metainfo.xml` 声明支持的 Stack 前置条件，包括 Stack 名称和最低兼容版本。Ambari 会在创建链接前将这些条件与已安装 Stack 比较；名称不一致、版本过低或元数据无法解析时必须拒绝链接。不受支持的扩展不能出现在集群可选服务中，也不应通过手工复制目录来绕过验证。

## 扩展链接 {#extension-links}

扩展链接把一个具体扩展版本关联到一个已经安装的 Stack 版本。管理员可以通过 Server REST 资源查询、创建、更新和删除链接状态。变更链接时应使用明确版本，避免让已有集群在未审查的情况下切换服务定义。链接变更完成后，Server 需要重新加载 Stack、扩展和服务状态，使内存模型、资源目录与持久化链接保持一致。

## 安装和验证 {#installation-and-validation}

Server 会展开扩展归档、读取必需元数据、验证前置条件，将内容暂存到配置的资源区域，并运行适用的检查和 Hook。建立链接前，应核对扩展描述符、服务定义、软件包与命令脚本、配置依赖、告警和服务检查，并在目标平台执行一次受控安装与失败恢复。可将当前 [BIGTOP 服务定义](https://github.com/apache/ambari/tree/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services)作为源码参考；不要假设加载器支持文档未说明的跨 Stack `extends` 形式。
