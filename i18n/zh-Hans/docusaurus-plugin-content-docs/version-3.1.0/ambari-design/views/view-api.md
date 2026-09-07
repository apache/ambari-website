---
title: 视图 API
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

# 视图 API {#view-api}

View REST API 由 `ambari-server/src/main/java/org/apache/ambari/server/api/services/views` 下的 `ViewService`、`ViewVersionService`、`ViewInstanceService`、`ViewPermissionService` 和 `ViewPrivilegeService` 实现。

## 发现 Views {#discover-views}

列出已部署的 View 定义：

```
GET /api/v1/views
```

读取某个 View 的版本：

```
GET /api/v1/views/{viewName}/versions
GET /api/v1/views/{viewName}/versions/{version}
```

React 目录先执行 `GET /api/v1/views`，然后使用 `versions/ViewVersionInfo/system=false` 请求可见的非系统实例。空结果和发现失败在 UI 中是不同状态，并支持重试。

## 管理实例 {#manage-instances}

使用实例资源创建、更新、列出和删除实例：

```
POST /api/v1/views/{viewName}/versions/{version}/instances
POST /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}
PUT /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}
GET /api/v1/views/{viewName}/versions/{version}/instances
DELETE /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}
```

实例标识某个已配置的 View 版本。其属性会根据 View 定义进行验证；敏感值只能通过服务器支持的配置和权限模型提供。

## 权限和特权 {#permissions-and-privileges}

View 版本可以通过 permissions 资源声明自定义权限。实例访问由 privileges 表示：

```
GET /api/v1/views/{viewName}/versions/{version}/permissions
GET /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}/privileges
```

服务器仍是授权和过滤的权威来源。React 使用已授权的目录响应，不自行构造客户端特权元数据。`VIEW.USE` 授权决定精简的 View-only shell；View 管理属于独立的 Ambari Admin 范畴。

## 浏览器 URL {#browser-url}

选中实例后，React 根据服务器返回的 `context_path` 构建同源浏览器 URL，并在 iframe 中托管应用。这样可以保留 View 应用自己的资源和路由，同时由 Ambari shell 管理导航、加载、超时和重试状态。
