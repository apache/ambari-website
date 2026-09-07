---
title: 常见问题
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
# 常见问题 {#faq}

## **[STACK]/[SERVICE]/metainfo.xml** {#stackservicemetainfoxml}

**如果父堆栈中存在某个组件，而子堆栈仅使用少量属性再次定义该组件，这些值只是用于覆盖父堆栈的值，还是会替换整个组件定义？对于 metainfo.xml 中的其他元素，适用哪些规则？**

Ambari 会逐个属性地将父堆栈与子堆栈进行合并。因此，例如从子堆栈中移除某个类别后，它仍会从父堆栈继承；这基本适用于所有属性。

因此，问题在于如何处理父堆栈和子堆栈中同时存在的属性。这里大多数决策仍遵循同一范式：使用子堆栈的值替代父堆栈的值，而父堆栈中的每个属性只要未通过类似标记显式地从子堆栈中删除，就会

- 对于 config-dependencies，我们采用全有或全无的方式：如果子堆栈中存在此属性，则使用它及其所有子项；否则从父堆栈中获取。

- 自定义命令按名称合并，合并后的定义是所有命令的并集；子堆栈中同名的命令会覆盖父堆栈中的命令。

- Cardinality 会由子堆栈中的值覆盖；如果子堆栈未提供该值，则使用父堆栈中的值。

有关详情，请参阅此方法：`org.apache.ambari.server.api.util.StackExtensionHelper#mergeServices`

有关更多信息，请参阅 [Service Inheritance](./custom-services.md#service-inheritance) wiki 页面。

**如果新定义中缺少某个组件，但父堆栈中存在该组件，它会被继承吗？**

通常会。

**服务的配置依赖是被覆盖还是合并？**

覆盖。


