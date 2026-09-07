---
title: 视图
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# 视图 {#views}

:::info 此功能目前正在开发中。 :::info

**Ambari Views** 提供一种系统化方式，将 UI 能力插件化，以便在 Ambari Web 中呈现自定义的可视化、管理和监控功能。“**视图**”是扩展 Ambari 的一种方式，允许第三方插入新的资源类型，以及支持这些资源的 API、提供程序和 UI。换言之，视图是部署到 Ambari 容器中的应用程序。

## 有用资源 {#useful-resources}

| 资源 | 链接 |
| ------------------------ | ---------------------------------------------------------------------- |
| Views 概述 | http://www.slideshare.net/hortonworks/ambari-views-overview |
| Views 框架 API 文档 | https://github.com/apache/ambari/blob/trunk/ambari-views/docs/index.md |
| Views 框架示例 | https://github.com/apache/ambari/tree/trunk/ambari-views/examples |

## 术语 {#terminology}

以下部分介绍与视图相关的基本术语。

| 术语 | 描述 |
| --- | --- |
| 视图名称 | 视图的名称，用于向 Ambari 标识视图。 |
| 视图版本 | 视图的版本。一个唯一的视图名称可以在 Ambari 中部署多个版本。 |
| 视图软件包 | 包含特定视图版本的**视图定义**及全部视图资源（服务端资源和客户端资源）的 JAR 软件包。有关软件包内容和结构的更多信息，请参阅[视图软件包](#view-package)。 |
| 视图定义 | 定义视图名称、版本、资源以及视图所需或可选的配置参数。视图定义文件包含在视图软件包中。有关视图定义文件语法和功能的更多信息，请参阅视图定义。 |
| 视图实例 | 基于已配置的视图定义和特定版本的唯一视图实例。有关更多信息，请参阅版本和实例。 |
| 视图 API | 用于查看已部署视图列表和创建视图实例的 REST API。有关更多信息，请参阅视图 API。 |
| 框架服务 | 视图框架服务端公开供视图使用的服务，包括视图实例数据持久化和视图事件。有关更多信息，请参阅框架服务。 |

## 视图的组件 {#components-of-a-view}

视图可以由**客户端资源**（即 Ambari Web 中公开的 UI）和**服务端资源**（即公开 REST 端点的类）组成。视图加载到 Ambari Web 后，其 UI 可按需使用视图服务端资源来提供视图功能。

![Apache Ambari > Views > view-components.jpg](@site/versioned_docs/version-3.0.0/ambari-design/views/imgs/view-components.jpg)

### 客户端资源 {#client-side-assets}

视图不限制或约束所使用的客户端技术。您可以将客户端依赖（例如 JavaScript 和 CSS 框架）与视图一起打包。

### 服务端资源 {#server-side-resources}

视图可以公开 REST 端点，配合客户端资源提供视图应用功能。这些资源使用 Java 编写，可以是 servlet、普通 REST 服务，也可以是 Ambari ResourceProvider（即一种特殊的 REST 服务，处理部分响应和分页等 REST 能力，前提是遵循 Ambari ResourceProvider 接口）。有关框架向视图服务端公开的功能，请参阅[框架服务](./framework-services.md)。

:::info 请查看 **Weather View**，它展示了公开 servlet 和 REST 端点的视图示例。

[https://github.com/apache/ambari/tree/trunk/ambari-views/examples/weather-view](https://github.com/apache/ambari/tree/trunk/ambari-views/examples/weather-view) :::

## 视图软件包 {#view-package}

视图关联的资源以 JAR 软件包形式交付。**视图定义文件**必须位于软件包根目录。UI 资源和服务端类从根目录提供，依赖的 Java 库放在 `WEB-INF/lib` 目录中。

```
view.jar
|
|- view.xml
|
|-
|
|- index.html
| |
| |_
|
|_ WEB-INF
  |
  |_ lib/*.jar
```

## 版本和实例 {#versions-and-instances}

一个视图可以在 Ambari 中部署多个版本，每个版本也可以创建多个实例。例如，可以创建名为 FILES 的视图并部署 0.1.0 和 0.2.0 版本，然后为每个版本创建 `FILES_0.1.0` 和 `FILES_0.2.0` 实例，使部分 Ambari 用户使用旧版 FILES（0.1.0），其他用户使用新版（0.2.0）。

使用上述示例，可以创建两个 `FILES_0.2.0` 版本的实例：一个按某种方式配置，另一个采用不同配置。这样，部分 Ambari 用户可以采用一种方式使用 FILES，其他用户则采用另一种方式。

有关实例配置属性的更多信息，请参阅[框架服务](./framework-services.md)。

## 视图生命周期 {#view-lifecycle}

下图展示了视图的生命周期。部署视图并创建实例时，会调用服务端框架事件。有关框架向视图服务端公开的功能，请参阅[框架服务](./framework-services.md)。

![Apache Ambari > Views > view-lifecycle.png](@site/versioned_docs/version-3.0.0/ambari-design/views/imgs/view-lifecycle.png)
