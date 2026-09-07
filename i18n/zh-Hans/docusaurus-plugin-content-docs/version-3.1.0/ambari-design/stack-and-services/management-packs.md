---
title: 管理包
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

# 管理包 {#management-packs}

Ambari 管理包是包含堆栈、服务、扩展或视图制品以及 `mpack.json` 元数据的归档。Server 的 `setupMpacks.py` 会展开归档、读取元数据、验证前置条件、暂存管理包，并创建堆栈加载器使用的资源。

## 元数据 {#metadata}

`mpack.json` 使用名称、版本和描述标识管理包。其前置条件可以限制 Ambari 版本和已安装的堆栈版本。其制品描述源目录和制品类型，例如堆栈定义、服务定义、扩展定义和堆栈附加服务定义。元数据缺失或无效会阻止安装。

## 打包和依赖 {#packaging-and-dependencies}

只打包制品目录所需的定义和文件。完整堆栈包可以提供堆栈版本和通用服务定义；附加包可以提供服务及其对已安装堆栈的适用性。将软件包脚本、配置、仓库和服务元数据放在每个制品指定的路径中。管理包机制独立于已退出的 AMS/Ganglia 打包模型。

## 安装、升级和清理 {#install-upgrade-purge}

安装器会验证前置条件，并可在安装或升级前后运行管理包钩子。清理 Stack 定义时，管理包必须实际包含 Stack 制品，以免附加包意外删除已安装 Stack。暂存后，Ambari 会更新资源链接并明确要求重启 Ambari Server；仅完成暂存不会重新加载正在运行的 Server 的 Stack 模型。

在计划的维护窗口内安装经过审核的管理包，并重启 Server：

```shell
sudo ambari-server install-mpack --mpack=/path/to/reviewed-management-pack.tar.gz
sudo ambari-server restart
```

之后确认新的 Stack 和服务元数据已加载，并执行受控的服务操作。不要在普通附加包安装中加入清理参数，也不能把归档解压成功当作运行验证完成。

## 验证 {#verification}

部署前检查 `mpack.json`、制品路径、服务描述符、软件包文件、配置依赖和前置条件。在目标堆栈上测试安装、升级、回滚或卸载行为以及服务检查。实现位于 [setupMpacks.py](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/python/ambari_server/setupMpacks.py)。
