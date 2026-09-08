---
title: 堆栈继承
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

# 堆栈继承 {#stack-inheritance}

堆栈继承将堆栈版本与受支持父级提供的文件和服务组合起来。`StackExtensionHelper` 和堆栈加载器应用继承规则；应将结果作为组装后的堆栈验证，而不是从目录名称推断。

## 文件和服务规则 {#file-and-service-rules}

部分堆栈文件会被继承，部分文件在子级定义时替换父级文件，部分文件则合并。服务定义遵循服务继承规则：服务可以复用 `common-services` 中的定义，子级元数据可以添加或覆盖受支持属性。合并后必须检查配置依赖和角色命令顺序。

## 合并和删除行为 {#merge-and-deletion-behavior}

合并按属性进行。子级值通常覆盖父级值；如果规则允许继承，子级省略的属性会保留。配置依赖采用全有或全无规则；自定义命令按名称合并，子级定义覆盖同名父级命令。提供子级 cardinality 时使用子级值，否则使用父级值。堆栈合并实现会遵循显式删除标记。

## 通用服务和验证 {#common-services-and-validation}

当前 BIGTOP 服务展示了如何复用 `common-services` 中的定义，例如 [BIGTOP AMBARI-METRICS](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/AMBARI-METRICS/metainfo.xml)。应验证最终解析得到的 `metainfo.xml`、脚本、配置文件、软件包路径、告警、`metrics.json`、`telemetry.json` 和服务检查。不要使用加载器未明确支持的跨 Stack `extends` 语法，也不要假定只允许替换的文件会自动参与继承。

合并实现是 `org.apache.ambari.server.api.util.StackExtensionHelper#mergeServices`；服务继承结果不明确时请检查该实现。
