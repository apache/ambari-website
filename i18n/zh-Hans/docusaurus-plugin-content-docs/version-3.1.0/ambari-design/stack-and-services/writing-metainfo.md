---
title: 编写 metainfo.xml
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

# 编写 metainfo.xml {#writing-metainfoxml}

`metainfo.xml` 是声明式服务描述符。顶层 `service` 使用 `name`、`displayName` 和 `version` 标识服务，并描述 `components`、`osSpecifics`、`commandScript`、`requiredServices`、`configuration-dependencies` 以及可选的 `configuration-dir`。

## 组件 {#components}

每个组件都有唯一的 `name`、显示名称、类别（`MASTER`、`SLAVE` 或 `CLIENT`）和 `cardinality`。组件可以公布版本、允许重新分配、声明依赖、定义自定义命令，并提供专用脚本和日志。

## 命令和配置 {#commands-and-configuration}

`commandScript` 指定服务或组件操作使用的 Python 脚本和超时时间。`configuration-dependencies` 列出服务或组件所需的配置类型；依赖发生变化时，Ambari 可以将受影响的组件标记为需要重启。`configFiles` 标识生成的 XML、环境或 properties 文件及其字典名称。

## 软件包和平台 {#packages-and-platforms}

`osSpecifics` 将操作系统系列映射到部署服务所需的软件包。软件包名称由平台软件包管理器使用。服务还可以声明所需服务和依赖条件，包括集群或主机范围的依赖及自动部署行为。

## 生命周期 {#lifecycle}

脚本实现组件生命周期。标准操作包括安装、启动、停止、状态和配置；`customCommands` 添加服务专用操作。`versionAdvertised` 标志告知 Ambari 组件是否参与面向版本的升级处理。

## 示例 {#example}

描述符应专注于服务元数据和可执行契约。监控后端专用的遥测配置应放在 `telemetry.json` 中，同时保留 `metrics.json` 作为 Ambari 控制平面的指标契约。具体写法可参考当前的 [BIGTOP HDFS metainfo.xml](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml)。
