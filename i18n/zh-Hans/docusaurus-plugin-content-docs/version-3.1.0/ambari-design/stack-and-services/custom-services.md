---
title: 自定义服务
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

# 自定义服务 {#custom-services}

自定义服务是向堆栈添加组件和生命周期行为的服务定义。将服务放在堆栈的 `services` 目录下，或提供由堆栈服务引用的通用定义。当前 BIGTOP 示例位于 `ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services`。

## 生命周期和软件包 {#lifecycle-and-packages}

服务 `metainfo.xml` 会命名组件、类别、cardinality、脚本、依赖、软件包和配置文件。Python 脚本实现安装、配置、启动、停止和状态操作；自定义命令添加服务专用操作。软件包脚本和模板与服务一起保存，并通过 Ambari 的 Python 3 运行时执行。

## 配置和操作 {#configuration-and-actions}

使用 `configuration-dependencies` 声明服务或组件依赖的配置类型，使用 `quicklinks/quicklinks.json` 定义服务链接，并使用 `themes` 定义受支持的服务展示元数据。Service Advisor 可以验证组件部署并提出配置建议。`telemetry.json` 描述遥测后端的采集输入；`metrics.json` 仍然是 Ambari 控制平面使用的服务指标契约。

## 继承 {#inheritance}

使用现有的堆栈/服务继承模型，并验证最终描述符。不要假定复制的服务定义会继承文件，除非堆栈加载器明确支持其父级关系。部署前验证组装后的服务、软件包路径、命令和配置依赖。

## 验证 {#verification}

在目标堆栈上测试完整生命周期、服务检查、配置渲染、自定义操作和升级行为。请将 [BIGTOP HDFS 定义](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/HDFS/metainfo.xml)作为当前具体参考。
