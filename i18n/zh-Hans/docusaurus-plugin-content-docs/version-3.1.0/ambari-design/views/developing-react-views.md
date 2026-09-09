---
title: 开发 React View
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

# 开发和部署 React View {#develop-and-deploy-react-view}

Ambari View 是由 Ambari Server 管理的版本化应用归档。它可以包含浏览器应用、JAX-RS 资源、实例参数、权限和生命周期钩子。主要 React shell 会发现用户有权访问的 View 实例，并在 Server 提供的同源 iframe 上下文中打开应用。

文件浏览器、调度器编辑器、诊断控制台或 AI 辅助运维页面等可独立部署的工具适合使用 View。需要修改 Ambari 公共导航或内置工作流时，则应修改[主要 React UI](../../frontend/customizing-react-ui.md)。

## 参考实现 {#reference-implementations}

Ambari `trunk` 包含两个 React View 实现：

| View | 前端 | Server 资源 | 可参考的模式 |
| --- | --- | --- | --- |
| Files | `contrib/views/files/src/main/resources/ui` | `contrib/views/files/src/main/java` | 能识别部署路径的 API 根路径、文件操作、上传下载、错误处理和反向代理测试 |
| Capacity Scheduler | `contrib/views/capacity-scheduler/src/main/resources/ui` | `contrib/views/capacity-scheduler/src/main/java` | 配置编辑、权限检查、YARN 操作、保存并刷新和保存并重启流程 |

在 3.1 构建中，两者都使用 React 19、TypeScript、Vite、Vitest、Node 22.23.1 和 npm 10.9.8。可以同时参考这两个模块，但不要把其中针对 HDFS 或 YARN 的依赖复制到无关 View。

## 归档结构 {#archive-layout}

React View 通常使用以下目录：

```text
my-view/
├── pom.xml
└── src/main/
    ├── java/org/example/ambari/view/
    │   └── MyViewService.java
    └── resources/
        ├── view.xml
        ├── view.log4j.properties
        └── ui/
            ├── package.json
            ├── package-lock.json
            ├── vite.config.ts
            ├── index.html
            └── src/
```

Maven 构建需要在资源处理前完成前端构建，并将生成的 `ui/dist` 文件放在归档根目录。归档还要包含 `view.xml`、View 的 Server 类，以及 `WEB-INF/lib` 下的运行时库。Ambari Server 已提供的依赖必须使用 `provided` scope；重复打包 Servlet、Jetty、Jersey 或日志实现可能破坏 View classloader。

## 定义 View {#define-the-view}

`src/main/resources/view.xml` 定义稳定的 View 名称、版本、配置参数、REST 资源、权限和可选的自动实例。下面是包含一个受保护资源的最小定义：

```xml
<view>
  <name>AI-ASSISTANT</name>
  <label>AI Assistant</label>
  <version>1.0.0</version>
  <min-ambari-version>3.1.*</min-ambari-version>

  <parameter>
    <name>request.timeout.seconds</name>
    <description>Maximum time for an assisted request.</description>
    <required>true</required>
    <default-value>30</default-value>
  </parameter>

  <resource>
    <name>assistant</name>
    <service-class>org.example.ambari.view.AssistantService</service-class>
  </resource>

  <permission>
    <name>USE_ASSISTANT</name>
    <description>Submit requests to the assistant.</description>
  </permission>
</view>
```

`<name>` 和 `<version>` 会成为公开 URL 和持久化 View 标识的一部分。发布不兼容的前端、资源、参数或数据改动时，应使用新版本。需要在版本间移动实例数据时，应定义明确的迁移过程。

参数属于实例配置，不能用来安全保存明文凭据。敏感值应通过 Server 端受保护凭据存储读取，绝不能返回给浏览器。

完整描述符见 [View 定义](./view-definition.md)，实例数据、持久化、事件和生命周期服务见[框架服务](./framework-services.md)。

## 实现 Server 资源 {#implement-server-resources}

`<resource>` 条目将资源名映射到 View 服务类。Ambari 会把该资源发布在经过身份验证的实例 URL 下：

```text
/api/v1/views/{view}/versions/{version}/instances/{instance}/resources/{resource}
```

在 Server 类中使用 `ViewContext` 获取当前用户、实例属性、关联集群和数据服务。每个受保护操作都要先调用 `ViewContext.hasPermission`；React UI 可以隐藏控件，但资源端点仍是最终授权边界。

响应应使用有大小限制且字段明确的 DTO。验证路径、标识、查询大小和外部目标。调用 HDFS、YARN、Ambari 和外部服务时设置超时。将预期失败转换为有意义的 HTTP 状态码，但不要返回堆栈、凭据或未经限制的模型输出。

### AI 辅助 View {#ai-assisted-views}

AI 服务调用应放在 View 资源后面：

```text
React View
    │ same-origin request
    ▼
View JAX-RS resource
    ├── authorized Ambari or service API
    └── approved AI provider
```

浏览器把用户请求发送给 View 资源。Server 检查 View 权限、限制请求大小、读取受保护的服务凭据、调用批准的端点、过滤响应，并记录可审计结果。不要让 React 使用长期密钥直接调用 AI 服务。AI 建议创建 Ambari 请求或变更集群状态前，还应要求用户再次确认。

## 构建路径安全的 React 前端 {#build-a-path-safe-react-frontend}

将 Vite 静态资源基础路径设置为相对路径，使同一归档可以适配不同的 View 名称、版本、实例和反向代理前缀：

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
  test: { environment: "jsdom" },
});
```

不要从站点根目录硬编码 `/api/v1`。View 可能发布在 `/gateway/default/ambari/views/...` 等路径下。应从当前 pathname 推导 Ambari 应用根路径，再构建经过编码的资源 URL：

```ts
const applicationRoot = (pathname: string) => {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const viewsIndex = normalized.lastIndexOf("/views/");
  return viewsIndex >= 0 ? `${normalized.slice(0, viewsIndex)}/` : "/";
};

const resourceRoot = `${applicationRoot(window.location.pathname)}api/v1/` +
  `views/${encodeURIComponent(view)}/versions/${encodeURIComponent(version)}/` +
  `instances/${encodeURIComponent(instance)}/resources/assistant`;
```

资源请求需要发送会话凭据和 Ambari CSRF 请求头：

```ts
const response = await fetch(`${resourceRoot}/query`, {
  method: "POST",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-By": "ai-assistant-view",
  },
  body: JSON.stringify(request),
});
```

除非用户明确离开 View，否则导航应留在 View 自己的 hash 或相对路径内。需要测试 Ambari 可能提供的两种规范路径：

```text
/views/{view}/{version}/{instance}/
/views/{view}/{instance}/
```

Files 和 Capacity Scheduler 的 API helper 会定位最后一个 `/views/` 片段。这样既能保留反向代理前缀，也不会把前面同名的路径片段误认为 View 上下文。

## 构建并检查归档 {#build-and-inspect-the-archive}

在任一参考模块中只迭代前端时：

```shell
cd contrib/views/files/src/main/resources/ui
npm ci --no-audit --no-fund
npm test
npm run build
```

从 Ambari 仓库根目录构建完整参考归档：

```shell
mvn -B -pl :files -am package
mvn -B -pl :capacity-scheduler -am package
```

新模块应将 artifact selector 换成自己的 Maven artifact ID。部署前检查产物：

```shell
jar tf target/my-view-1.0.0.jar | sort
```

确认归档包含 `view.xml`、`index.html`、`index.html` 引用的全部哈希资源、Server 类，并且只包含预期的运行时依赖。Java 资源测试和前端测试应与其验证的行为放在同一个改动中。

## 部署 View {#deploy-the-view}

默认 View 归档目录是 `/var/lib/ambari-server/resources/views`。向自定义 Server 部署前，应先检查 `ambari.properties` 中的 `views.dir`。

安装经过审查的归档并重启 Ambari Server：

```shell
install -m 0644 target/my-view-1.0.0.jar \
  /var/lib/ambari-server/resources/views/
ambari-server restart
```

查看 `ambari-server.log`，确认 View 版本进入 `DEPLOYED`。classloader、描述符或依赖错误会使该版本不可用，创建实例前必须先解决。不要在相同版本下反复用不同内容覆盖正在使用的归档；应发布新版本，使部署、回退和数据迁移保持明确。

在 Ambari 管理 UI 中创建并配置实例，然后向所需用户或组授予该实例及自定义 View 权限。等效的实例 API 见 [View API](./view-api.md)。

有权限的实例会从 Server 返回的 URL 打开，例如：

```text
/views/AI-ASSISTANT/1.0.0/PRODUCTION/
```

不要根据猜测的主机名或上下文根路径拼接浏览器 URL。尤其当 Server 位于 Knox 或其他反向代理后面时，应读取 Ambari 返回的实例 URL。

## 验证清单 {#validation-checklist}

分发 View 归档之前：

* 运行前端单元测试、TypeScript 构建和 Vite 生产构建。
* 为每个 JAX-RS 资源和权限分支运行定向 Java 测试。
* 检查归档内容和依赖版本。
* 部署全新版本、创建实例并按最小权限授权。
* 测试允许、拒绝、未认证、会话过期和 CSRF 失败场景。
* 测试正常、空数据、格式错误、超时、重试和后端不可用场景。
* 验证根路径和反向代理上下文路径下的 View 直接导航。
* 检查刷新、浏览器后退、iframe 错误、窄屏和键盘操作。
* 确认日志、响应、浏览器存储和 bundle 中没有凭据。
* 升级到新的 View 版本，并演练回退或数据迁移。

## 相关文档 {#related-documentation}

* [Views 概览](./index.md)
* [View 定义](./view-definition.md)
* [框架服务](./framework-services.md)
* [View API](./view-api.md)
* [定制 React UI](../../frontend/customizing-react-ui.md)
* [从源码构建 Ambari](../../ambari-dev/building-from-source.md)
