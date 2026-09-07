---
title: View 定义
---

<!---
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
--->

# View 定义 {#view-definition}

以下介绍 View Package 中 View Definition File（`view.xml`）的语法。

XML Schema Definition 可在[此处](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/resources/view.xsd)获取。

## `<view>` {#view}

`<view>` 元素是 Definition File 中的封装元素。下表介绍可以包含在 `<view>` 元素中的元素：

元素 | 必需 | 描述
--------|---------|---------------
name    | 是 | View 的唯一名称。有关更多信息，请参阅 `<name>`。
label   | 是 | View 的显示标签。有关更多信息，请参阅 `<label>`。
version | 是 | View 的版本。有关更多信息，请参阅 `<version>`。
min-ambari-version<br></br>max-ambari-version | 否 | 此 View 可部署的 Ambari 最低和最高版本。有关更多信息，请参阅 `<min-ambari-version>`。
description | 否 | View 的描述。有关更多信息，请参阅 `<description>`。
icon | 否 | 此 View 要显示的 32x32 图标。建议大小为 32x32，必要时将显示为 8x8 和 16x16。如果未设置此属性，则使用默认的 View framework 图标。
icon64 | 否 | 此 View 要显示的 64x64 图标。如果未设置此属性，则使用 32x32 大小的图标。
permission | 否 | 为此 View 定义自定义权限。有关更多信息，请参阅 `<permission>`。
parameter | 否 | 定义创建 View 实例时使用的配置参数。有关更多信息，请参阅 `<parameter>`。
resource  | 否 | 定义 View 暴露的资源。有关更多信息，请参阅 `<resource>`。
instance  | 否 | 定义 View 的静态实例。有关更多信息，请参阅 `<instance>`。
view-class | 否| 注册一个接收 framework 事件的 View class。有关更多信息，请参阅 `<view-class>`。
validator-class | 否 | 注册一个接收 framework 事件的 validator class。有关更多信息，请参阅 `<validator-class>`。

## `<name>` {#name}

View 的唯一名称。例如：

```xml
<name>MY_COOL_VIEW</name>
```

## `<label>` {#label}

View 的标签。例如：

```xml
<label>My Cool View</label>
```

## `<version>` {#version}

View 的版本。例如：

```xml
<version>0.1.0</version>
```

## `<min-ambari-version> <max-ambari-version>` {#min-ambari-version-max-ambari-version}

可以运行此 View 的 Ambari server 最低和最高版本。例如：

```xml
<min-ambari-version>1.7.0</min-ambari-version>
<min-ambari-version>1.7.*</min-ambari-version>
<max-ambari-version>2.0</max-ambari-version>
```

## `<description>` {#description}

View 的描述。例如：

```xml
<description>This view is used to display information.</description>

```

## `<parameter>` {#parameter}

元素 | 必需 | 描述
--------|---------|---------------
name | 是 | 配置参数的名称。
description | 是 | 配置参数的描述。
label | 否 | 配置参数的用户友好名称（在 Ambari Administration Interface UI 中使用）。
placeholder| 否 | 配置参数的占位符值（在 Ambari Administration Interface UI 中使用）。
default-value | 否| 配置参数的默认值（在 Ambari Administration Interface UI 中使用）。
required  | 是 |如果为 true，则创建 View 实例时必须提供配置参数。
masked | 否  | 指示是否在 Ambari Web UI 中对该参数值进行“掩码”处理（即不以明文显示）。省略此元素时默认为不掩码；否则，如果为 true，则在 Web UI 中对参数值进行“掩码”处理。

```xml
<parameter>
    <name>someParameter</name>
    <description>Some parameter this is used to configure an instance of this view</description>
    <required>false</required>
</parameter>
```

```xml
<parameter>
    <name>name.label.descr.default.place</name>
    <description>Name, label, description, default and placeholder</description>
    <label>NameLabelDescDefaultPlace</label>
    <placeholder>this is placeholder text but you should see default</placeholder>
    <default-value>youshouldseethisdefault</default-value>
    <required>true</required>
</parameter>
```

请参阅 [Property View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/property-view/docs/index.md)，了解不同参数选项的使用方式。

## `<permission>` {#permission}

元素 | 必需 | 描述
--------|---------|---------------
name       | 是| 权限的唯一名称。
description| 是| 权限的描述。

```xml
<permission>
  <name>SOME_CUSTOM_PERM</name>
  <description>A custom permission for this view</description>
</permission>
<permission>
  <name>SOME_OTHER_PERM</name>
  <description>Another custom permission for this view</description>
</permission>
```

## `<resource>` {#resource}

元素 | 必需 | 描述
--------|---------|---------------
name           | 是| 资源的名称。这将成为 View 实例的资源端点名称。
plural-name    | 否 | 资源的复数名称。
service-class  | 否 | 使用 JAX-RS 注解的资源服务 class。
id-property    | 否 | 资源标识符。
provider-class | 否 | Ambari ResourceProvider 资源 class。
resource-class | 否 | JavaBean 资源 class。

```xml
<resource>
  <name>calculator</name>
  <service-class>org.apache.ambari.view.proxy.CalculatorResource</service-class>
</resource>
```

请参阅 [Calculator View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/calculator-view/docs/index.md)，了解 REST service endpoint View 的实现。

```xml
<resource>
  <name>city</name>
  <plural-name>cities</plural-name>
  <id-property>id</id-property>
  <resource-class>org.apache.ambari.view.weather.CityResource</resource-class>
  <provider-class>org.apache.ambari.view.weather.CityResourceProvider</provider-class>
  <service-class>org.apache.ambari.view.weather.CityService</service-class>
</resource>
```

请参阅 [Weather View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/weather-view/docs/index.md)，了解 Ambari ResourceProvider View 的实现。

## `<instance>` {#instance}

元素 | 必需 | 描述
--------|---------|---------------
name       | 是 |View 实例的唯一名称。
label      | 否  |View 实例的显示标签。如果未设置，则使用 View 定义中的 `<label>`。
description| 否  |View 实例的描述。如果未设置，则使用 View 定义中的 `<description>`。
visible    | 否  |如果为 true，则在用户的 View 实例列表中显示该 View 实例。
icon       | 否  |覆盖此特定 View 实例的 View 图标。
icon64     | 否  |覆盖此特定 View 实例的 View icon64。
property   | 否  |指定 View 实例所需的配置参数。有关更多信息，请参阅 `<property>`。

```xml
<instance>
  <name>US_WEST</name>
  <property>
    <key>cities</key>
    <value>Palo Alto, US;Los Angeles, US;Portland, US;Seattle, US</value>
  </property>
  <property>
    <key>units</key>
    <value>imperial</value>
  </property>
</instance>
```

## `<property>` {#property}

元素 | 必需 | 描述
--------|---------|---------------
key   |是 |要设置的配置参数的属性键。
value |是 |要设置的配置参数的属性值。

```xml
<property>
  <key>units</key>
  <value>imperial</value>
</property>
```

## `<view-class>` {#view-class}

注册一个接收 framework 事件的 View class。View class 必须实现 [View](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/View.java) 接口。

```xml
<view-class>this.is.my.viewclazz</view-class>
```

## `<validator-class>` {#validator-class}

注册一个接收属性和实例验证请求的 validator class。validator class 必须实现 [Validator](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/validation/Validator.java) 接口。

```xml
<validator-class>org.apache.ambari.view.property.MyValidator</validator-class>
```

请参阅 [Property Validator View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/property-validator-view/docs/index.md)，了解 View 属性和实例验证的使用方式。
