---
title: 定义自定义堆栈和服务
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

# 定义自定义堆栈和服务 {#defining-a-custom-stack-and-services}

堆栈由包含 `metainfo.xml`、服务、配置、仓库和可选升级元数据的版本目录组装而成。首先确定唯一的堆栈名称和版本，然后仅添加堆栈所需的文件。当前 BIGTOP 布局位于 `ambari-server/src/main/resources/stacks/BIGTOP/3.2.0`。

## 堆栈组装 {#stack-assembly}

定义堆栈描述符及其活动版本。在 `services/<SERVICE>` 下添加服务描述符，在服务软件包目录下添加软件包脚本，并在服务配置目录下添加配置 XML。堆栈可以在加载器支持该关系时引用通用服务定义；不要仅根据目录名称推断关系，应验证组装结果。

## 继承和提供程序 {#inheritance-and-providers}

Stack 继承会提供受支持的父级文件和服务。Service Advisor 可以验证组件部署并给出配置建议。BIGTOP Stack 包含 VictoriaMetrics 服务和遥测配置文件；监控后端专用的 `telemetry.json` 与各服务保留的控制平面 `metrics.json` 相互独立，不能因为接入新监控链路而删除后者。

## 验证 {#validation}

验证描述符标识、组件类别与部署数量约束、命令脚本、软件包路径、配置依赖、仓库元数据和服务检查。在目标操作系统和架构上实际执行安装、配置、启动、停止、状态检查、自定义命令和升级流程。不能仅根据源码中存在的构建配置，推断某个架构已经获得生产支持。

## 参考 {#references}

请使用[BIGTOP 堆栈描述符](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/metainfo.xml)、[HDFS 服务](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml)和 [VictoriaMetrics 服务](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS/metainfo.xml)作为当前源码参考。
