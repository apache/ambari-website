---
title: View 定义
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

# View 定义 {#view-definition}

View Definition File（`view.xml`）是 View framework 读取的软件包描述符。其 schema 维护在 `ambari-views/src/main/resources/view.xsd`。

## 必需的标识 {#required-identity}

根 `<view>` 元素必须使用 `<name>`、`<label>` 和 `<version>` 标识 View。可选的 `<min-ambari-version>` 和 `<max-ambari-version>` 限制可部署它的 Ambari 版本。`<description>`、`<icon>` 和 `<icon64>` 提供显示元数据。

```xml
<view>
  <name>MY_VIEW</name>
  <label>My View</label>
  <version>1.0.0</version>
</view>
```

## 资源和配置 {#resources-and-configuration}

使用 `<parameter>` 定义创建实例时必须提供或可供选择的值。参数可以定义标签、占位符、默认值、`required` 和 `masked` 行为。使用 `<permission>` 定义 View 特定的权限名称。

使用 `<resource>` 暴露服务器资源。资源可以声明 `service-class`、`provider-class`、`resource-class`、`plural-name` 和 `id-property`。使用 `<instance>` 和 `<property>` 定义静态配置实例。

## Framework 类 {#framework-classes}

`<view-class>` 注册一个实现 `View` 的类，用于接收部署、创建、更新和销毁 framework 事件。`<validator-class>` 注册用于属性和实例验证的 `Validator`。这些类名必须能够从软件包 classpath 加载。

## 软件包契约 {#package-contract}

View 软件包是一个 JAR。`view.xml` 位于软件包根目录；客户端资源和服务器类从根目录提供，依赖的 Java 库位于 `WEB-INF/lib`。Ambari 会提取并提供每个已部署的 View 版本，并通过 REST API 创建配置实例。

```text
view.jar
|
|- view.xml
|- index.html
|_ WEB-INF/lib/*.jar
```

当版本部署以及实例创建、更新或销毁时，framework 会调用 View 生命周期回调。请保持回调幂等，不要假设部署或管理期间一定存在浏览器会话。
