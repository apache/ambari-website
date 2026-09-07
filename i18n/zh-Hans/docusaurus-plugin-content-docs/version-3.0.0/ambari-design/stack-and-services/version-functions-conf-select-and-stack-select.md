---
title: 版本函数：conf-select 和 stack-select
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
# 版本函数：conf-select 和 stack-select {#version-functions-conf-select-and-stack-select}

尤其是在升级期间，能够设置当前堆栈和配置版本非常重要。对于非自定义服务，这些功能由 conf-select 和 stack-select 函数实现。可以在服务脚本中通过以下导入语句导入它们：

```py
from resource_management.libraries.functions import conf_select

from resource_management.libraries.functions import stack_select
```

通常，在滚动升级期间，会在 pre_upgrade_restart 函数中调用用于设置堆栈和配置版本的 select 函数：

```py
  def pre_upgrade_restart(self, env, upgrade_type=None):
    import params
    env.set_params(params)

    # this function should not execute if the version can't be determined or
    # the stack does not support rolling upgrade
    if not (params.version and check_stack_feature(StackFeature.ROLLING_UPGRADE, params.version)):
      return

    Logger.info("Executing <My Service> Stack Upgrade pre-restart")
    conf_select.select(params.stack_name, "<my_service>", params.version)
    stack_select.select("<my_service>", params.version)
```

select 函数会为当前堆栈或配置版本建立符号链接。对于堆栈，它会建立从堆栈根目录的 current 目录到特定堆栈版本的链接。例如：

```
/usr/hdp/current/hadoop-client -> /usr/hdp/2.5.0.0/hadoop
```

对于配置版本，它会为所有配置目录建立链接，如下所示：

```
/etc/hadoop/conf -> /usr/hdp/current/hadoop-client/conf

/usr/hdp/current/hadoop-client/conf -> /etc/hadoop/2.5.0.0/0
```

stack_select 和 conf_select 函数还可以用于返回 Hadoop 目录：

```
hadoop_prefix = stack_select.get_hadoop_dir("home")

hadoop_bin_dir = stack_select.get_hadoop_dir("bin")

hadoop_conf_dir = conf_select.get_hadoop_conf_dir()
```

conf_select API 如下：

```py
def select(stack_name, package, version, try_create=True, ignore_errors=False)

def get_hadoop_conf_dir(force_latest_on_upgrade=False)
```

stack_select API 如下：
```py
def select(component, version)

def get_hadoop_dir(target, force_latest_on_upgrade=False)
```

遗憾的是，自定义服务无法使用这些函数设置其配置或堆栈版本。自定义服务可以自行实现相应函数，以建立正确的链接。

