---
title: Stack 继承
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
# Stack 继承 {#stack-inheritance}

每个堆栈版本都必须提供 metainfo.xml 描述符文件，用于声明该堆栈是否继承自另一个堆栈版本：

```xml
<metainfo>
    <versions>
      <active>true</active>
    </versions>
    <extends>2.3</extends>
         ...
</metainfo>
```

当一个堆栈继承另一个堆栈版本时，其定义文件和目录的继承方式遵循若干不同模式。

以下文件不应在子堆栈版本级别重新定义：

- properties/stack_features.json
- properties/stack_tools.json

注意：这些文件只能存在于基础堆栈级别。

如果在当前堆栈版本中定义以下文件，它们会替换父堆栈版本中的定义：

- kerberos.json
- widgets.json

如果在当前堆栈版本中定义以下文件，它们会与父堆栈版本合并：

- configuration/cluster-env.xml

- role_command_order.json

注意：所有服务的角色命令顺序都会与堆栈的角色命令顺序合并，以提供一个主列表。

当前堆栈版本 metainfo.xml 的所有属性都会替换父堆栈版本中定义的属性。

如果在当前堆栈版本中定义以下目录，它们会替换父堆栈版本中的目录：

- hooks

这意味着不会继承父级这些目录中包含的文件。需要从该目录结构中复制所有希望保留的文件。

以下目录不会被继承：

- repos
- upgrades

每个堆栈版本都应定义 repos/repoinfo.xml 文件。支持升级的所有堆栈版本都应定义 upgrades 目录及其对应的 XML 文件。

## 服务 Folder {#services-folder}

services 文件夹是一个特殊情况。这里有两种继承机制同时生效。首先，stack_advisor.py 会自动导入父堆栈版本的 stack_advisor.py 脚本，但其余继承行为由脚本作者决定。Ambari 服务器源代码中有多个 [stack_advisor.py](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.3/services/stack_advisor.py) 文件示例。

```python
    class HDP23StackAdvisor(HDP22StackAdvisor):
      def __init__(self):
        super(HDP23StackAdvisor, self).__init__()
        Logger.initialize_logger()

      def getComponentLayoutValidations(self, services, hosts):
        parentItems = super(HDP23StackAdvisor, self).getComponentLayoutValidations(services, hosts)
                 ...
```

services 文件夹中定义的服务遵循 [service inheritance](./custom-services.md#service-inheritance) 规则。默认情况下，如果服务未通过 **extends** 标签声明显式继承关系，则会继承父堆栈版本中定义的服务。


