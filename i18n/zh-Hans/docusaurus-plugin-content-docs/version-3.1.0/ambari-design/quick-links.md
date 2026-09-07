---
title: 快速链接
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

# 快速链接 {#quick-links}

快速链接是服务自有的条目，由 Ambari 暴露，用于 Web 控制台、状态页面和其他服务端点。它们在服务的 `quicklinks/quicklinks.json` 中声明，并随 Stack 服务定义继承。

## 定义和解析 {#definition-and-resolution}

每个条目标识标签、目标组件以及 URL 模板或基于端口的端点。服务定义可以将链接关联到配置属性，使 Ambari 为已安装集群解析有效协议、主机、端口和路径。链接不能假定固定主机名或未配置的端口。

Ambari 渲染链接时会评估所选 Stack 和有效配置。因此 HTTPS 策略、组件分配和配置覆盖会影响最终 URL。组件未安装或缺少所需配置时，链接可能隐藏或不可用。

## 操作使用 {#operational-use}

1. 安装链接所需的服务和组件。
2. 设置决定端点和安全策略的服务配置。
3. 打开服务页面并检查解析后的快速链接菜单。
4. 链接不可用时，检查组件状态、有效配置、主机解析和服务的 `quicklinks.json` 定义。

快速链接是导航元数据，不是监控抓取契约。当前服务自有条目见固定版本的 [BIGTOP 快速链接定义](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP)。
