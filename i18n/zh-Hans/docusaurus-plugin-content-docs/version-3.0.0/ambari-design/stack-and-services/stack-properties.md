---
title: Stack 属性
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
# Stack 属性 {#stack-properties}

与堆栈配置类似，大多数属性在服务级别定义，但也有一些全局属性可以在堆栈版本级别定义，并影响所有服务。

例如，[stack-selector 和 conf-selector](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_tools.json#L2) 的特定名称，或[堆栈版本支持的特定堆栈功能](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_features.json#L5)。这些属性大多在 Ambari 2.4 中引入，用于参数化堆栈信息，并促进其他发行版复用 common-services 代码。


这类属性可以在堆栈的 [properties 文件夹](https://github.com/apache/ambari/tree/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties)中以 .json 格式定义。

![](@site/versioned_docs/version-3.0.0/ambari-design/stack-and-services/imgs/stacks-properties.png)

# Stack features {#stack-features}

堆栈可以根据版本支持不同的功能，例如升级支持、NFS 支持，以及对特定新组件（如 Ranger、Phoenix）的支持……


作为 HDP 堆栈配置的一部分，堆栈功能化在 [HDP/2.0.6/configuration/cluster-env.xml](http://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/configuration/cluster-env.xml) 中引入，同时新增了 stack_features 属性。堆栈引擎会从外部属性文件中处理该属性的值。

```xml
<!-- Define stack_features property in the base stack. DO NOT override this property for each stack version -->
<property>
  <name>stack_features</name>
  <value/>
  <description>List of features supported by the stack</description>
  <property-type>VALUE_FROM_PROPERTY_FILE</property-type>
  <value-attributes>
    <property-file-name>stack_features.json</property-file-name>
    <property-file-type>json</property-file-type>
    <read-only>true</read-only>
    <overridable>false</overridable>
    <visible>false</visible>
  </value-attributes>
  <on-ambari-upgrade add="true"/>
</property>
```

Stack Features 属性定义在 /HDP/2.0.6/properties 下的 [stack_features.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_features.json) 文件中。现在，服务级代码可以访问这些功能支持，以更改特定的服务行为或配置。以下是 stack_features.jon 文件中描述的功能示例：


```json
"stack_features": [
    {
      "name": "snappy",
      "description": "Snappy compressor/decompressor support",
      "min_version": "2.0.0.0",
      "max_version": "2.2.0.0"
    },
    {
      "name": "lzo",
      "description": "LZO libraries support",
      "min_version": "2.2.1.0"
    },
    {
      "name": "express_upgrade",
      "description": "Express upgrade support",
      "min_version": "2.1.0.0"
    },
    {
      "name": "rolling_upgrade",
      "description": "Rolling upgrade support",
      "min_version": "2.2.0.0"
    }
  ]
}
```

其中 min_version/max_version 是可选约束。

与功能名称对应的功能常量（例如 ROLLING_UPGRADE = "rolling_upgrade"）已添加到新的 StackFeature 类中，位于 [resource_management/libraries/functions/constants.py](https://github.com/apache/ambari/blob/trunk/ambari-common/src/main/python/resource_management/libraries/functions/constants.py#L38)。


```python
class StackFeature:
"""
  Stack Feature supported
"""
  SNAPPY = "snappy"
  LZO = "lzo"
  EXPRESS_UPGRADE = "express_upgrade"
  ROLLING_UPGRADE = "rolling_upgrade"
```

此外，[resource_management/libraries/functions/stack_fetaures.py](https://github.com/apache/ambari/blob/trunk/ambari-common/src/main/python/resource_management/libraries/functions/stack_features.py) 中引入了相应的辅助函数，用于解析 .json 文件内容；服务代码会调用这些函数来检查堆栈是否支持特定功能。

以下是服务代码使用新堆栈功能化设计的示例：

```python
if params.version and check_stack_feature(StackFeature.ROLLING_UPGRADE, params.version):
      conf_select.select(params.stack_name, "hive", params.version)
      stack_select.select("hive-server2", params.version)
```

# Stack Tools {#stack-tools}


与堆栈功能类似，stack-selector 和 conf-selector 工具现在由堆栈驱动，而不是将 hdp-select 和 conf-select 硬编码。它们定义在 /HDP/2.0.6/properties 下的 [stack_tools.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/properties/stack_tools.json) 文件中。

并作为 HDP 堆栈配置的一部分，在 [/HDP/2.0.6/configuration/cluster-env.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/configuration/cluster-env.xml) 中声明为新属性。


```xml
<!-- Define stack_tools property in the base stack. DO NOT override this property for each stack version -->
<property>
  <name>stack_tools</name>
  <value/>
  <description>Stack specific tools</description>
  <property-type>VALUE_FROM_PROPERTY_FILE</property-type>
  <value-attributes>
    <property-file-name>stack_tools.json</property-file-name>
    <property-file-type>json</property-file-type>
    <read-only>true</read-only>
    <overridable>false</overridable>
    <visible>false</visible>
  </value-attributes>
  <on-ambari-upgrade add="true"/>
</property>
```

相应的辅助函数已添加到 [resource_management/libraries/functions/stack_tools.py](https://github.com/apache/ambari/blob/trunk/ambari-common/src/main/python/resource_management/libraries/functions/stack_tools.py) 中。这些辅助函数用于移除 resource_management 库中的硬编码。



