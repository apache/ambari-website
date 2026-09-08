---
title: 框架服务
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

# 框架服务 {#framework-services}

View 框架通过 `ambari-views/src/main/java/org/apache/ambari/view` 下的 `ViewContext` 及相关接口向 View 实现暴露服务器端服务。

## ViewContext {#view-context}

View 服务器资源会接收 [ViewContext](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/ViewContext.java)。它提供已认证用户、View 定义、实例名称和属性、实例数据、Ambari 属性、资源提供程序、流提供程序以及 View controller。

```java
@Inject
ViewContext context;
```

使用 `getUsername()`、`getLoggedinUser()` 和 `hasPermission()` 检查身份与权限。不要将客户端可见性当作授权；服务器必须强制执行对 View 资源和 Web 上下文的访问控制。

## 实例数据 {#instance-data}

`putInstanceData`、`getInstanceData` 和 `removeInstanceData` 用于存储限定在 View 实例和用户范围内的轻量级键值数据。这适合偏好设置和其他小型状态，不适合指标历史或大型文档。

```java
viewContext.putInstanceData("key", "value");
String value = viewContext.getInstanceData("key");
```

没有关联实例时调用这些方法可能按 `ViewContext` 契约失败。请明确处理验证和持久化错误。

## 资源提供程序 {#resource-providers}

`getResourceProvider(type)` 返回 `view.xml` 中声明的资源提供程序。`ResourceProvider` 接口定义读取、创建、更新和删除操作，以及相应的资源/错误契约。提供程序是托管 View 应用使用的服务器端 endpoint。

## 框架事件 {#framework-events}

`View` 的实现可以接收生命周期回调：

| 回调 | 含义 |
| --- | --- |
| `onDeploy` | View 版本已部署。 |
| `onCreate` | View 实例已创建。 |
| `onUpdate` | View 实例定义已更新。 |
| `onDestroy` | View 实例已销毁。 |

使用 `<view-class>` 注册实现，并确保回调可以安全重试。部署回调是服务器操作，与浏览器 iframe 无关。

## View 事件 {#view-events}

View controller 可以注册监听器并在 View 之间触发事件。根据 `ViewController` 契约，按 View 名称，或按 View 名称和版本定位监听器。事件通信不能替代 REST 授权或实例数据范围控制。
