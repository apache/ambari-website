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

扩展是一个按版本管理的自定义服务集合，可以链接到受支持的堆栈版本。链接后，其中的服务无需复制到堆栈定义即可供集群使用。Ambari Server 扩展辅助程序负责处理扩展元数据和链接。

## 版本兼容性 {#version-compatibility}

扩展版本在 `metainfo.xml` 中声明其支持的堆栈前置条件。堆栈名称和最低版本必须与已安装的堆栈匹配。Ambari 会在创建链接前验证这些前置条件；不受支持的扩展不能提供给集群。

## 扩展链接 {#extension-links}

扩展链接将一个扩展版本连接到一个已安装的堆栈版本。可以通过 Server REST 资源查询、创建、更新和删除链接状态。链接变更后，Server 会重新加载堆栈、扩展和服务状态，使内存模型与暂存资源一致。

## 安装和验证 {#installation-and-validation}

Server 会展开扩展归档，读取所需元数据，验证前置条件，将其暂存到配置的资源区域，并运行适用的检查和钩子。链接前验证扩展描述符、服务定义、软件包脚本、配置和服务检查。请将当前的 [BIGTOP 服务定义](https://github.com/apache/ambari/tree/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services)作为源码参考；不要假设加载器未记录的跨堆栈 `extends` 形式。
