---
title: Admin React 开发
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

# Admin React 开发 {#admin-react-development}

Ambari Admin 是独立于主要 `ambari-web/latest` UI 的 React 应用。其源码、软件包元数据、Vite 配置和测试位于 `ambari-admin/src/main/resources/ui/ambari-admin` 下。

## 应用边界 {#application-boundary}

Admin 应用负责管理导航、集群信息、Stack/版本管理、服务帐户、自动启动设置及相关管理工作流。主要 Web UI 通过已认证的 `/adminView` 转换和服务器提供的 Admin View 上下文进入该应用。

由 Ambari 托管的 Views 仍是服务器提供的应用。Admin React 构建不会吸收 View 软件包，也不会替换其 iframe 资源。

## 本地开发 {#local-development}

在 Admin 应用目录中安装依赖并使用其 package 脚本。Maven 的 `ambari-admin` 模块使用配置的 Node/npm 工具链，运行 Admin React 构建，并将生成的 `dist` 输出复制到 `target/classes/latest` 以便打包。

```bash
cd ambari-admin/src/main/resources/ui/ambari-admin
npm install
npm run dev
npm run build
npm run lint
npm run test
```

开发服务器适合 UI 迭代；完整部署检查还必须验证打包后的服务器上下文、代理根路径、身份验证会话和 Admin 路由转换。

## API 和角色 {#api-and-roles}

使用现有的 Ambari API 客户端和授权上下文。Admin 页面必须保留服务器授权、集群范围，以及只读访问和变更操作之间的区别。不要使用本地标志或仅用于测试的 profile 绕过角色检查。

测试具有代表性的管理员、操作员、只读用户、缺少集群的用户以及另一个向导所有者的响应。除了菜单可见性，还要检查直接导航，因为可见菜单并不等于完整的路由授权契约。

## 构建证据 {#build-evidence}

Admin 软件包独立于主要 `ambari-web` 软件包。分别记录 Admin 构建和测试命令与主要 UI 检查，并报告未运行的浏览器或服务器上下文检查。
