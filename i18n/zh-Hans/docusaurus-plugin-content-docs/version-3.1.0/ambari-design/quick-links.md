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

快速链接是由服务定义并由 Ambari 展示的导航条目，用于访问服务 Web 控制台、状态页面和其他受支持端点。链接在服务的 `quicklinks/quicklinks.json` 中声明，并随 Stack 服务定义一起加载和继承。它们只描述如何根据当前拓扑生成入口，不负责启动组件、授予权限或验证目标服务是否健康。

## 定义和解析 {#definition-and-resolution}

每个条目应声明显示标签、目标组件，以及 URL 模板或基于端口的端点规则。服务定义可以将协议、端口、路径和高可用信息关联到配置属性，使 Ambari 按已安装集群的生效配置生成最终 URL。链接定义不能假定固定主机名、固定活动角色或尚未配置的端口，也不能把敏感凭据拼接到 URL 中。

Ambari 渲染链接时会同时评估所选 Stack、组件分配、高可用角色和生效配置。因此，HTTP/HTTPS 策略、配置组覆盖、主机变化和活动组件切换都可能改变最终 URL。目标组件未安装、没有可用实例或缺少必要配置时，链接应隐藏或标记为不可用，而不是生成一个看似有效但无法访问的地址。

## 操作使用 {#operational-use}

1. 安装链接所需的服务和组件。
2. 设置决定端点和安全策略的服务配置。
3. 打开服务页面并检查解析后的快速链接菜单。
4. 链接不可用时，检查组件状态、有效配置、主机解析和服务的 `quicklinks.json` 定义。

快速链接属于导航元数据，不是监控抓取契约，也不应作为服务健康检查的唯一依据。当前服务条目的实现可参考固定版本的 [BIGTOP 快速链接定义](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP)。新增或修改链接后，应分别验证普通部署、高可用切换、HTTPS、配置覆盖和缺失组件场景。
