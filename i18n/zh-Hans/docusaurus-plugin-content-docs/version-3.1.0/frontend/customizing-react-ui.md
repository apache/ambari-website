---
title: 定制 React UI
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

# 定制 React UI {#customize-react-ui}

Ambari 3.1 从 `ambari-web/latest` 提供主要 Web UI。本指南说明如何修改该应用、验证改动、构建 Server Web 制品，以及测试开发环境部署。它适用于应该进入 Ambari 公共 shell 或内置工作流的改动。

能够独立部署的工具通常更适合实现为 Ambari View。在主要 UI 中添加产品专用页面之前，请先阅读 [React View 开发](../ambari-design/views/developing-react-views.md)。

## 选择扩展边界 {#choose-extension-boundary}

| 需求 | 扩展点 | 原因 |
| --- | --- | --- |
| 修改公共导航、身份验证、主机、服务、配置、告警或其他内置工作流 | `ambari-web/latest` | 此功能需要参与主要 shell、共享状态和 Ambari 权限控制。 |
| 添加具有独立版本、UI 和 REST 资源的应用 | [Ambari View](../ambari-design/views/developing-react-views.md) | View 无需重新构建主要 UI，就可以单独打包、部署、升级和分配权限。 |
| 修改服务配置布局或控件 | [服务 Theme](../ambari-design/stack-and-services/extensions.md) | 服务专用的配置展示由 Stack 元数据管理。 |
| 添加编排、持久化或高权限操作 | Ambari Server API 加上以上一种 UI 扩展方式 | Server 必须是权限判断和变更操作的最终依据。 |

不要因为不想创建 View，就把功能直接塞进主要 UI。核心 UI 改动会影响每套 Ambari，需要兼容所有支持的身份验证、权限、代理和集群状态行为。

## 环境要求与基线 {#requirements-and-baseline}

使用当前 Ambari `trunk` 源码和其中声明的工具链。3.1 基线使用 JDK 17、Maven 3.9.x、Node 22.23.1 和 npm 10.9.8。Maven 前端插件会下载锁定的 Node 和 npm 版本；直接运行前端命令时，`PATH` 中需要存在兼容版本。

修改 UI 之前：

1. 确认工作树基于目标 `trunk` 修订。
2. 阅读附近的测试以及相关 Server API 或 Stack 契约。
3. 不要编辑 `latest/dist` 或 `target/classes/latest`，它们都是生成目录。
4. 不要把产品凭据和高权限逻辑放进浏览器代码。

## 源码目录 {#source-map}

| 路径 | 职责 |
| --- | --- |
| `ambari-web/latest/src/router/RoutesList.tsx` | 路由树，以及路由级权限、功能和操作状态保护 |
| `ambari-web/latest/src/screens` | 工作流与页面实现 |
| `ambari-web/latest/src/api` | Ambari REST 客户端、请求载荷和响应处理 |
| `ambari-web/latest/src/store` | 已认证用户、集群、服务和应用共享状态 |
| `ambari-web/latest/src/components` | 可复用控件、进度展示、路由保护、导航和 View 集成 |
| `ambari-web/latest/src/locales` | 英文和简体中文 UI 文案 |
| `ambari-web/latest/src/test` | 共享 Vitest 和 jsdom 测试设置 |
| `ambari-web/latest/vite.config.ts` | Vite 基础路径、React 插件和测试配置 |

优先沿用相邻功能的实现，不要创建第二套请求、状态或通知模式。例如，新的服务操作应该复用现有的请求进度模型，不能把 API 已受理误认为操作已经完成。

## 开发核心 UI 改动 {#develop-a-core-ui-change}

### 安装、测试与构建 {#install-test-and-build}

直接运行前端命令可以获得最短的修改反馈周期：

```shell
cd ambari-web/latest
npm ci --no-audit --no-fund
npm test
npm run build
```

`npm run build` 会执行 TypeScript 构建，并把新的 Vite bundle 写入 `ambari-web/latest/dist`。`npm test` 会运行完整 Vitest 测试。还应执行 `npm run lint`，但要将仓库级结果与未修改的 `trunk` 基线比较，不要把已有 lint 问题都归因于本次改动。

Vite 开发服务器适合组件开发：

```shell
npm run dev -- --host 127.0.0.1
```

它本身不会还原 Ambari Server 身份验证、WebSocket 消息、View 托管或反向代理前缀。要验证集成行为，必须使用打包后的部署，或者配置同源开发代理。

### 添加路由与导航 {#add-routes-and-navigation}

在 `RoutesList.tsx` 中注册内置路由，并使用现有保护组件：

* `ProtectedRoute` 检查 Ambari 权限名，并提供安全的回退页面。
* `FeatureRouteGuard` 检查 Stack 或 Server 功能标志。
* `ServiceOperationRouteGuard` 防止互相冲突的服务工作流同时运行。
* 特定工作流的保护组件负责持久化的所有者和恢复状态。

隐藏导航入口不等于完成授权。直接访问的路由也必须受保护，Server API 还要检查相同权限。需要测试直接输入 URL、浏览器刷新、无权限角色、关闭的功能标志和冲突中的操作。

### 复用 API 与状态契约 {#use-shared-api-and-state-contracts}

把 REST 调用放在 `src/api` 下，并复用已配置的 `ambariApi` 客户端。该客户端会发送同源凭据，并统一处理身份验证失败。变更类请求应沿用现有端点对 `X-Requested-By`、内容类型和载荷结构的处理；不要内置用户名、密码、token 或外部服务密钥。

Ambari 操作是异步的。变更操作创建请求后，需要保留 request ID，跟踪 Server 中的权威任务状态，展示失败主机或任务，并在刷新后提供同样受支持的重试或恢复入口。不要用定时器或乐观成功提示替代 Server 状态。

### 保持本地化与可访问性 {#preserve-localization-and-accessibility}

用户可见文案要同时加入 `src/locales/en/translation.json` 和 `src/locales/zh/translation.json`。API 载荷使用稳定资源标识，只翻译展示标签。新控件需要支持键盘操作、提供可访问名称、保留清晰焦点，并展示加载、空数据、成功和失败状态，不能只依赖颜色传递信息。

## 构建 Server Web 制品 {#build-the-server-web-artifact}

Maven 模块会锁定前端工具链、构建 React 应用，并把 `latest/dist` 复制到 `ambari-web/target/classes/latest`：

```shell
mvn -B -pl :ambari-web -am \
  -DskipTests -DskipPythonTests=true package
```

受支持的交付方式是构建并安装经过审查的 Ambari Server 软件包。这样可以让 Web 文件、Java 制品、版本元数据和软件包所有权保持一致。不要把 `node_modules`、Vite 开发服务器或源码复制到受管集群节点。

## 在开发环境替换静态文件 {#replace-static-files-for-development}

默认 RPM 配置将 `webapp.dir` 设为 `/usr/lib/ambari-server/web`，React 应用从它的 `latest` 子目录提供。自定义安装可能在 `ambari.properties` 中设置不同的 `webapp.dir`，替换前应先检查实际配置。

在一次性开发 Server 上，可以先停止 Server，再暂存并整体切换 `dist` 目录：

```shell
ambari-server stop
stamp=$(date +%Y%m%d%H%M%S)
install -d /usr/lib/ambari-server/web/latest.new
cp -a /path/to/ambari-web/latest/dist/. \
  /usr/lib/ambari-server/web/latest.new/
mv /usr/lib/ambari-server/web/latest \
  "/usr/lib/ambari-server/web/latest.${stamp}"
mv /usr/lib/ambari-server/web/latest.new \
  /usr/lib/ambari-server/web/latest
ambari-server start
```

必须整体切换目录。Vite 文件名带有内容哈希，只复制部分文件可能使 `index.html` 指向不兼容的资源集合。验证完成前保留带时间戳的目录。需要回退时，停止 Server，将失败的 `latest` 目录移开，把带时间戳的目录恢复为 `latest`，再启动 Server。

这套流程只适用于开发环境。生产改动应该通过有版本、可审查的软件包和站点正常发布流程交付。

## 验证清单 {#validation-checklist}

不要只验证页面能否成功打开：

* 对改动的页面、API 客户端、store 和保护组件运行定向测试。
* 运行完整 Vitest 测试和生产构建。
* 通过部署环境实际使用的基础路径和 TLS 入口打开 `/latest/#`。
* 测试本地登录、已配置的 SSO、会话过期和退出。
* 通过导航和直接 URL 分别测试有权限与无权限角色。
* 注入 API 拒绝、超时、部分任务失败、刷新和重试。
* 验证英文、简体中文、键盘操作和窄屏布局。
* 如果页面使用实时状态，检查 WebSocket 或轮询恢复。
* 检查浏览器控制台、网络请求、CSP 行为和 Server 日志。

## 安全规则 {#security-rules}

浏览器代码应视为公开内容。不得将密码、API token、私钥或 AI 服务凭据编译进 React bundle 或 `VITE_` 变量。需要高权限的外部调用必须经过 Server 端点，并使用受保护的凭据存储、明确授权、输入输出限制和可审计的错误处理。

不要把 Server 或模型输出直接作为原始 HTML 渲染。保留 Ambari 的同源凭据模式、CSRF 请求头约定、CSP、代理前缀和权限检查。React 路由保护能改善用户体验，但不能替代 Server 权限检查。

## 相关文档 {#related-documentation}

* [React 用户指南](./react-ui.md)
* [React View 开发](../ambari-design/views/developing-react-views.md)
* [从源码构建 Ambari](../ambari-dev/building-from-source.md)
* [运行测试](../ambari-dev/running-tests.md)
* [View 定义](../ambari-design/views/view-definition.md)
* [Stack 扩展](../ambari-design/stack-and-services/extensions.md)
