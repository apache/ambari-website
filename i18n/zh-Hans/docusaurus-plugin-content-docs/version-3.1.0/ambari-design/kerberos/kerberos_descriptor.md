---
title: Kerberos 描述符
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

# Kerberos 描述符 {#kerberos-descriptor}

Kerberos 描述符是描述保护部署所需身份和配置的 Stack 或服务元数据。它是声明式元数据，不是存放密码、私钥、keytab 内容或 KDC 管理凭据的位置。

## 描述符结构 {#descriptor-structure}

顶层描述符可以包含 `properties`、`identities`、`auth-to-local-properties`、`configurations` 和 `services`。服务描述符包含 `name`，也可以包含 `identities`、`auth-to-local-properties`、`configurations` 和 `components`。组件描述符包含 `name` 以及可选的身份、auth-to-local 和配置块。

## 属性和配置 {#properties-and-configurations}

`properties` 提供用于受控替换的命名值。`configurations` 为受保护的服务提供配置类型/属性值。替换是显式的，应限制在已知配置字段内；不要用它注入秘密或任意目标。配置变更可以根据声明的依赖关系将组件标记为需要重启。

## 身份、Principal 和 Keytab {#identities-principals-and-keytabs}

身份具有稳定的 `name`，并可以通过相对或绝对路径引用其他身份。`principal` 描述其规范化名称、`type`、配置属性和可选的本地用户名映射。`keytab` 描述目标路径、所有者/组权限和配置属性。描述符可以引用 keytab 路径，但绝不包含 keytab 字节。

如果 Stack 契约要求服务 principal，应使用 `_HOST` 或受支持的主机名替换。将 realm 和 principal 变量保留在描述符中，通过所选集群配置和受保护的配置输入解析其值。

## 服务和组件 {#services-and-components}

Stack 描述符声明共享身份和服务条目。服务级条目可以由组件专门化，而组件级条目只描述该组件。继承模型会为子级创建解析后的副本；覆盖属性不会修改父级定义。

## 验证 {#validation}

Server 会在分配工作前验证描述符结构、身份引用、受支持的配置规范以及服务/组件名称。无效描述符会作为候选项被拒绝；Agent 会保留最后一个有效分配。在启用生产安全前，应测试普通、HA、KDC、Active Directory 和手动准备的环境。

有关启用流程和凭据处理，请参阅[启用 Kerberos](./enabling_kerberos.md)；有关服务配置组和重启行为，请参阅 [Kerberos 服务](./kerberos_service.md)。
