---
title: Framework Services
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

# Framework Services {#framework-services}

The View framework exposes server-side services through `ViewContext` and related interfaces under `ambari-views/src/main/java/org/apache/ambari/view`.

## ViewContext {#view-context}

View server resources receive a [ViewContext](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/ViewContext.java). It provides the authenticated users, View definition, instance name and properties, instance data, Ambari properties, resource providers, stream providers, and the View controller.

```java
@Inject
ViewContext context;
```

Use `getUsername()`, `getLoggedinUser()`, and `hasPermission()` for identity and permission checks. Do not treat client-side visibility as authorization; the server must enforce access to View resources and Web contexts.

## Instance Data {#instance-data}

`putInstanceData`, `getInstanceData`, and `removeInstanceData` store lightweight key/value data scoped to a View instance and user. This is suitable for preferences and other small state, not metric history or large documents.

```java
viewContext.putInstanceData("key", "value");
String value = viewContext.getInstanceData("key");
```

Calls without an associated instance can fail according to the `ViewContext` contract. Handle validation and persistence errors explicitly.

## Resource Providers {#resource-providers}

`getResourceProvider(type)` returns a provider for a resource declared in `view.xml`. The `ResourceProvider` interface defines read, create, update, and delete operations and the corresponding resource/error contracts. Providers are server-side endpoints used by the hosted View application.

## Framework Events {#framework-events}

An implementation of `View` can receive lifecycle callbacks:

| Callback | Meaning |
| --- | --- |
| `onDeploy` | A View version was deployed. |
| `onCreate` | A View instance was created. |
| `onUpdate` | A View instance definition was updated. |
| `onDestroy` | A View instance was destroyed. |

Register the implementation with `<view-class>` and keep callbacks safe to retry. Deployment callbacks are server operations and are independent of a browser iframe.

## View Events {#view-events}

The View controller can register listeners and fire events between Views. Address listeners by View name, or by View name and version, according to the `ViewController` contract. Event communication does not replace REST authorization or instance-data scoping.
