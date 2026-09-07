---
title: Ambari 代码布局
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# Ambari 代码布局 {#ambari-code-layout}

_Ambari 代码检出和构建说明请参阅 Ambari 开发页面。_
_Ambari 设计和架构详见 [Ambari 设计](../ambari-design/index.md)页面。_
_了解 Ambari 架构有助于轻松浏览代码。_

Ambari 源代码布局如下

```
ambari/
   ambari-agent/
   ambari-common/
   ambari-project/
   ambari-server/
   ambari-views/
   ambari-web/
   contrib/
   docs/
```

Ambari 的主要组件位于根文件夹下各自的子文件夹中，以保持代码清晰分离。

文件夹 | 组件或用途
------|---------------------
ambari-server | 管理主 Ambari server 的代码，该 server 通过安装在各节点上的代理管理 Hadoop。
ambari-agent  | Ambari 代理的代码，这些代理运行在上述 server 管理的每个节点上。
ambari-web    | Ambari Web UI 的代码，与上述 Ambari server 交互。
ambari-views  | Ambari Views 的代码，用于扩展 Ambari Web UI 的框架。
ambari-common | Ambari Server 与 Agent 之间的通用代码。
contrib       | Ambari 对其他第三方软件或库所作自定义贡献的代码。
docs          | 基本 Ambari 文档，包括 Ambari REST API。

Ambari Server 和 Agent 通过内部 JSON 协议互相交互。
Ambari Web UI 通过文档化的 Ambari REST API 与 Ambari Server 交互。

## Ambari-Server {#ambari-server}

## Ambari-Agent {#ambari-agent}

## Ambari-Views {#ambari-views}

## Ambari-Web {#ambari-web}

Ambari Web UI 是一个纯浏览器端 JavaScript 应用程序，基于 [Ember](http://emberjs.com/) JavaScript 框架。要轻松理解其代码和布局，需要充分了解 [Ember](http://emberjs.com/)。

由于是纯 JavaScript 应用程序，所有 UI 都在浏览器本地渲染；数据来自 Ambari Server 提供的 Ambari REST API。

```
ambari-web/
   app/
   config.coffee
   package.json
   pom.xml
   test/
   vendor/
```

文件夹 | 描述
------|---------------------
app/          | 主应用程序代码。包含用于渲染 Ambari UI 的 Ember 视图、模板、控制器、模型、路由等
config.coffee | [Brunch](http://brunch.io/) 应用程序构建器配置文件
package.json  | [npm](https://npmjs.org/) 软件包管理器配置文件
test/         | 测试 app/ 文件夹中功能的 Javascript 测试文件
vendor/       | 使用的第三方 Javascript 库和样式表。完整的第三方库列表记录在 /ambari/ambari-web/app/assets/licenses/NOTICE.txt 中

开发人员主要处理 app/ 文件夹中的 Javascript 和其他文件。完成后，使用 Brunch（基于 node.js 的 HTML5 应用程序汇编器）将最终 Javascript 构建到 /ambari/ambari-web/public/ 文件夹。该文件夹包含用于引导 Ambari Web 应用程序的 index.html。

开发时应使用

```bash
brunch w
```

命令以监视模式启动 Brunch，它会在任何更改时重新生成最终应用程序。同样，

```bash
brunch watch --server (or use the shorthand: brunch w -s)
```

会在 http://localhost:3333 启动 HTTP 服务器，提供最终应用程序。无需部署完整 Ambari server，这有助于使用模拟数据查看 UI。

注意：有关在本地构建和运行 Ambari Web 的更多详细信息，请参阅“[Ambari 编码指南](./coding-guidelines-for-ambari.md)”。

**ambari-web/app**

由于开发人员大部分时间都在 ambari-web/app/ 文件夹中工作，下面列出了主要文件及其用途。

文件夹或文件 | 描述
------|---------------------
assets/      | assets/data 中的模拟数据。服务器通过 assets/font、assets/img 提供的静态文件。
controllers/ | MVC 中的 C。主应用程序控制器 controllers/main、安装程序控制器 controllers/wizard 和通用控制器 controllers/global 的 Ember 控制器
data/        | 应用程序的元数据（UI 元数据、服务器数据元数据等）
mappers/     | 将服务器端 JSON 数据结构映射到客户端 Ember 模型的类。
models/      | MVC 中的 M。[Ember Data](http://emberjs.com/guides/models/) 模型。此处定义集群、服务、主机、告警等模型
routes/      | 定义应用程序页面重定向的 [Ember 路由](http://emberjs.com/guides/routing/)。main.js 包含主应用程序路由，installer.js 包含安装程序路由，其他路由位于各种向导中
styles/      | 以 [less](http://lesscss.org/) 格式表示的 CSS 样式表。Brunch 将其编译到 ambari-web/public/stylesheets/app.css
views/       | MVC 中的 V。包含所有 Ember 视图：views/main 中的主应用程序视图、views/installer 中的安装程序视图，以及 views/commons 中的通用视图
templates/   | 上述视图使用的 HTML 模板。通常一个视图对应一个模板，有时视图会以字符串形式在自身中定义模板内容
app.js       | 主 Ember 应用程序
config.js    | Javascript 应用程序的主配置文件。开发人员可以使用 App.testMode 属性等将应用程序保持在测试模式

如果开发人员添加、删除或重命名模型、视图、控制器、模板或路由，应更新 models.js、views.js、controllers.js、templates.js、routes.js 中对应的条目。
