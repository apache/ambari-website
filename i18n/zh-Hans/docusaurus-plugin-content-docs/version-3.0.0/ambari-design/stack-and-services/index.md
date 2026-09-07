---
title: Stacks and 服务
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
# Stacks and 服务 {#stacks-and-services}

**简介**

Ambari 在堆栈定义中支持堆栈及其关联服务的概念。借助堆栈定义，Ambari 为安装、管理和监控一组服务提供了一致且明确的接口，并提供了引入新堆栈和服务的扩展模型。

从 Ambari 2.4 开始，扩展定义还支持扩展及其关联自定义服务的概念。

术语

术语 | 描述
-----|------------
堆栈 | 定义一组服务以及获取这些服务软件包的位置。一个堆栈可以有一个或多个版本，每个版本都可以处于活动或非活动状态。例如，Stack = "HDP-1.3.3"。
扩展 | 定义可添加到堆栈版本的一组自定义服务。一个扩展可以有一个或多个版本。
服务 | 定义组成服务的组件（MASTER、SLAVE、CLIENT）。例如，Service = "HDFS"。
组件 | 遵循特定定义生命周期（启动、停止、安装等）的单个组件。例如，Service = "HDFS" 包含以下组件："NameNode (MASTER)"、"Secondary NameNode (MASTER)"、"DataNode (SLAVE)" 和 "HDFS Client (CLIENT)"。

