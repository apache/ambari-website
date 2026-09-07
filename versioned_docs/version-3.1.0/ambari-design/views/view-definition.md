---
title: View Definition
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

# View Definition {#view-definition}

The View Definition File (`view.xml`) is the package descriptor read by the View framework. The schema is maintained at `ambari-views/src/main/resources/view.xsd`.

## Required Identity {#required-identity}

The root `<view>` element must identify the View with `<name>`, `<label>`, and `<version>`. Optional `<min-ambari-version>` and `<max-ambari-version>` constrain the Ambari versions that can deploy it. `<description>`, `<icon>`, and `<icon64>` provide display metadata.

```xml
<view>
  <name>MY_VIEW</name>
  <label>My View</label>
  <version>1.0.0</version>
</view>
```

## Resources and Configuration {#resources-and-configuration}

Use `<parameter>` for values required or offered when an instance is created. Parameters can define a label, placeholder, default value, `required`, and `masked` behavior. Use `<permission>` for View-specific permission names.

Use `<resource>` to expose a server resource. A resource may declare `service-class`, `provider-class`, `resource-class`, `plural-name`, and `id-property`. Use `<instance>` and `<property>` to define a static configured instance.

## Framework Classes {#framework-classes}

`<view-class>` registers a class implementing `View` for deploy, create, update, and destroy framework events. `<validator-class>` registers a `Validator` for property and instance validation. These class names must be loadable from the package classpath.

## Package Contract {#package-contract}

The View package is a JAR. `view.xml` is at the package root; client assets and server classes are served from the root, and dependent Java libraries belong in `WEB-INF/lib`. Ambari extracts and serves each deployed View version and creates configured instances through the REST API.

```text
view.jar
|
|- view.xml
|- index.html
|_ WEB-INF/lib/*.jar
```

The framework invokes View lifecycle callbacks as versions are deployed and instances are created, updated, or destroyed. Keep callbacks idempotent and avoid assuming that a browser session is present during deployment or administration.
