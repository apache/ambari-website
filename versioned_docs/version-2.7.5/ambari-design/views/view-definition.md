# View Definition

The following describes the syntax of the View Definition File (`view.xml`) as part of the View Package.

An XML Schema Definition is available [here](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/resources/view.xsd).

## `<view>`

The `<view>` element is the enclosing element in the Definition File. The following table describes the elements you can include in the `<view>` element:

Element | Requred | Description
--------|---------|---------------
name    | Yes | The unique name of the view. See `<name>` for more information.
label   | Yes | The display label of the view. See `<label>` for more information.
version | Yes | The version of the view. See `<version>` for more information.
min-ambari-version<br></br>max-ambari-version | No | The minimum and maximum Ambari version this view can be deployed with. See `<min-ambari-version>` for more information.
description | No | The description of the view. See `<description>` for more information.
icon | No | The 32x32 icon to display for this view. Suggested size is 32x32 and will be displayed as 8x8 and 16x16 as necessary. If this property is not set, a default view framework icon is used.
icon64 | No | The 64x64 icon to display for this view. If this property is not set, the 32x32 sized icon will be used.
permission | No | Defines a custom permission for this view. See `<permission>` for more information.
parameter | No | Defines a configuration parameter that is used to when creating a view instance. See `<parameter>` for more information.
resource  | No | Defines a resource that is exposed by the view. See `<resource>` for more information.
instance  | No | Defines a static instance of the view. See `<instance>` for more information.
view-class | No|  Registers a view class to receive framework events. See `<view-class>` for more information.
validator-class | No | Registers a validator class to receive framework events. See `<validator-class>` for more information.

## `<name>`

The unique name of the view. Example:

```xml
<name>MY_COOL_VIEW</name>
```

## `<label>`

The label of the view. Example:

```xml
<label>My Cool View</label>
```

## `<version>`

The version of the view. Example:

```xml
<version>0.1.0</version>
```

## `<min-ambari-version> <max-ambari-version>`

The minimum and maximum version of Ambari server that can run this view. Example:

```xml
<min-ambari-version>1.7.0</min-ambari-version>
<min-ambari-version>1.7.*</min-ambari-version>
<max-ambari-version>2.0</max-ambari-version>
```

## `<description>`

The description of the view. Example:

```xml
<description>This view is used to display information.</description>

```

## `<parameter>`

Element | Requred | Description
--------|---------|---------------
name | Yes | The name of the configuration parameter.
description | Yes | The description of the configuration parameter.
label | No | The user friendly name of the configuration parameter (used in the Ambari Administration Interface UI).
placeholder| No | The placeholder value for the configuration parameter (used in the Ambari Administration Interface UI).
default-value | No|  The default value for the configuration parameter (used in the Ambari Administration Interface UI).
required  | Yes |If true, the configuration parameter is required in order to create a view instance.
masked | No  | Indicated this parameter value is to be "masked" in the Ambari Web UI (i.e. not shown in the clear). Omitting this element default to not-masked. Otherwise, if true, the parameter value will be "masked" in the Web UI.

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

See the [Property View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/property-view/docs/index.md) to see the different parameter options in use.

## `<permission>`

Element | Requred | Description
--------|---------|---------------
name       | Yes| The unique name of the permission.
description| Yes| The description of the permission.

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

## `<resource>`

Element | Requred | Description
--------|---------|---------------
name           | Yes| The name of the resource. This will be the resource endpoint name of the view instance.
plural-name    | No | The plural name of the resource.
service-class  | No | The JAX-RS annotated resource service class.
id-property    | No | The resource identifier.
provider-class | No | The Ambari ResourceProvider resource class.
resource-class | No | The JavaBean resource class.

```xml
<resource>
  <name>calculator</name>
  <service-class>org.apache.ambari.view.proxy.CalculatorResource</service-class>
</resource>
```

See the [Calculator View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/calculator-view/docs/index.md) to see a REST service endpoint view implementation.

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

See the [Weather View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/weather-view/docs/index.md) to see an Ambari ResourceProvider view implementation..

## `<instance>`

Element | Requred | Description
--------|---------|---------------
name       | Yes |The unique name of the view instance.
label      | No  |The display label of the view instance. If not set, the view definition `<label>` is used.
description| No  |The description of the view instance. If not set, the view definition `<description>` is used.
visible    | No  |If true, for the view instance to show up in the users view instance list.
icon       | No  |Overrides the view icon for this specific view instance.
icon64     | No  |Overrides the view icon64 for this specific view instance.
property   | No  |Specifies any necessary configuration parameters for the view instance. See  `<property>` for more information.

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

## `<property>`

Element | Requred | Description
--------|---------|---------------
key   |Yes |The property key (for the configuration parameter to set).
value |Yes |The property value (for the configuration parameter to set).

```xml
<property>
  <key>units</key>
  <value>imperial</value>
</property>
```

## `<view-class>`

Registers a view class to receive framework events. The view class must implement the [View](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/View.java) interface.

```xml
<view-class>this.is.my.viewclazz</view-class>
```

## `<validator-class>`

Registers a validator class to receive property and instance validation requests. The validator class must implement the [Validator](https://github.com/apache/ambari/blob/trunk/ambari-views/src/main/java/org/apache/ambari/view/validation/Validator.java) interface.

```xml
<validator-class>org.apache.ambari.view.property.MyValidator</validator-class>
```

See [Property Validator View Example](https://github.com/apache/ambari/blob/trunk/ambari-views/examples/property-validator-view/docs/index.md) to see view property and instance validation in use.
