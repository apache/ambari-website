---
title: Ambari 视图
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

# Ambari 视图 {#ambari-views}

Ambari Views 是可插拔的应用程序，用于向 Ambari 添加自定义可视化、管理或监控功能。View 可以提供客户端资源、Java 服务器资源、REST endpoint，以及一个或多个实例的配置。

## 当前 React 体验 {#current-react-experience}

React Web UI 会列出获得授权的 View 实例，并在同源的服务器提供 Web 上下文中打开所选实例。目录使用 `/api/v1/views`；应用本身由 View 上下文提供，而不是在 Ambari React 构件中重新实现。

View-only 用户会获得精简的 Views shell。独立的 Ambari Admin React 模块负责管理应用边界；它不会将托管的 View 应用变成普通 React 页面。

## 核心术语 {#core-terms}

| 术语 | 含义 |
| --- | --- |
| View | 安装在 Ambari 中的命名扩展。 |
| View version | View 的可部署版本；多个版本可以共存。 |
| View package | 包含 `view.xml`、客户端资源、服务器资源和依赖库的 JAR。 |
| View instance | 某个 View 版本的已配置实例。 |
| View context | 用于托管实例的服务器 URL 和执行上下文。 |

## 文档导航 {#documentation-map}

* [View API](./view-api.md)介绍通过 Ambari REST API 发现 View、查看版本、创建实例以及管理权限和特权。
* [View Definition](./view-definition.md)介绍当前 `view.xml` 契约和软件包元数据。
* [框架服务](./framework-services.md)介绍 `ViewContext`、实例数据、资源提供程序和生命周期事件。

REST 契约由 `ambari-server/src/main/java/org/apache/ambari/server/api/services/views` 下的服务器类实现。主要 View 扩展接口位于 `ambari-views/src/main/java/org/apache/ambari/view` 下。
