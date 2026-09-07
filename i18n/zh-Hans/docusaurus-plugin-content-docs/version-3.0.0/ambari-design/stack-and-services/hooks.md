---
title: 钩子
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
# 钩子 {#hooks}

堆栈可以在 Ambari 操作的以下时间点添加钩子：

* before ANY
* before and after INSTALL
* before RESTART
* before START

如 [Stack Inheritance](./stack-inheritance.md) 中所述，如果当前堆栈版本定义了 hooks 目录，它会替换父堆栈版本中的 hooks 目录。这意味着父级目录中包含的文件不会被继承。需要从该目录结构中复制所有希望保留的文件。

hooks 目录应包含 5 个子目录：

* after-INSTALL
* before-ANY
* before-INSTALL
* before-RESTART
* before-START

每个 hook 目录可以包含 3 个子目录：

* files
* scripts
* templates

scripts 目录是主要目录，必须提供。该目录必须包含 hook.py 文件，也可以包含用于初始化变量的其他 Python 脚本（例如 params.py），或包含 hook.py 所使用函数的其他工具文件。

files 目录可以包含任意非 Python 文件，例如脚本、jar 文件或 properties 文件。

templates 文件夹可以包含用于设置 properties 文件的所需 j2 文件。

hook.py 文件应扩展 resource_management/libraries/script/hook.py 中定义的 Hook 类。命名约定是使用 hook 文件夹命名钩子类，例如类位于 after-INSTALL 文件夹中时命名为 AfterInstallHook。hook.py 文件必须定义 hook(self, env) 函数。下面是一个钩子示例：

>

```py
from resource_management.libraries.script.hook import Hook
 
class AfterInstallHook(Hook):
 
  def hook(self, env):
    import params
    env.set_params(params)
    # Call any functions to set up the stack after install
 
if __name__ == "__main__":
  AfterInstallHook().execute()
```


