---
title: Kerberos 安全
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

# Kerberos 安全 {#kerberos}

Apache Ambari 3.1 通过 React 安装程序和服务配置工作流支持安全 Kerberos 的 Hadoop 集群。界面只收集所选配置模式所需的凭据和选项；本文档不显示或持久化任何默认秘密材料。

![Kerberos 从 KDC 验证、受保护凭据、后台请求到重启、服务检查和失败恢复的启用流程](/img/3.1.0/handdrawn/kerberos-enablement-zh.webp)

*凭据只在受保护步骤输入；描述符定义身份和 keytab 路径，不包含密码或 keytab 内容。*

## 选择工作流 {#choose-a-workflow}

- 安装或保护集群时使用[启用 Kerberos](./enabling_kerberos.md)。向导会验证所选 KDC 或 Active Directory 模式，收集必要输入，并记录进度以便重试。
- 使用 [Kerberos 描述符](./kerberos_descriptor.md)在 Stack 或服务定义中描述身份、principal、keytab、服务、组件和生成的配置属性。
- 使用 [Kerberos 服务配置](./kerberos_service.md)了解服务级配置组、依赖关系以及安全变更后的重启行为。

## 支持的模式 {#supported-modes}

当前向导定义了现有 MIT KDC、Active Directory、IPA 和手动准备的 Kerberos 环境选项。所选模式决定所需的 principal、realm、管理访问、keytab 和分发字段。集群管理员仍负责 KDC 策略、DNS、时间同步和主机加入；不能据此推断未列出的 KDC 实现已经通过兼容性验证。

## 安全边界 {#security-boundaries}

KDC 管理凭据通过受保护的向导流程输入，并仅用于需要它的请求。凭据必须通过安装所使用的部署配置或秘密存储提供，绝不能提交到 Stack 定义或复制到描述符示例中。Keytab 内容和密码不是 telemetry、标签、URL 或普通配置文本。

## 恢复和运维 {#recovery-and-operations}

Kerberos 操作是由发起用户拥有的后台请求。React 界面会在刷新或会话恢复后恢复请求检查点，报告失败，并允许在不静默重复已完成步骤的情况下按支持方式重试。服务器重启可能中断请求；重试前应检查持久化状态。启用或变更 Kerberos 后，在服务页面检查受影响的配置组和重启要求。

## 相关文档 {#related-documentation}

详见 [Kerberos 描述符](./kerberos_descriptor.md)、[Kerberos 服务](./kerberos_service.md)和[启用 Kerberos](./enabling_kerberos.md)。
