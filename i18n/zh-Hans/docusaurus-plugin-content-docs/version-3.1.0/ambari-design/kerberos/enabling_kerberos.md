---
title: 启用 Kerberos
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

# 启用 Kerberos {#enabling-kerberos}

在选择目标 Stack 和主机后，使用 React 安装程序或服务安全工作流启用 Kerberos。该工作流会验证输入、提交后台操作，并持久化检查点，以支持刷新、重试和请求所有权恢复。

## 开始之前 {#before-you-begin}

为每台主机准备 DNS 和时间同步。确定集群使用现有 KDC、Active Directory，还是手动准备的 Kerberos 环境。确认 realm、管理策略、principal 命名、keytab 分发和接收服务变更的配置组。

## 配置模式 {#provisioning-modes}

- **现有 KDC**：提供 realm 以及创建或验证 principal、分发 keytab 所需的受保护管理输入。
- **Active Directory**：提供所选 Stack 所需的域专用 principal 和帐户设置，并与域管理员验证委派和加密策略。
- **手动**：在 Ambari 外部准备 principal、keytab 和 KDC 策略，然后提供服务配置所需的引用和路径。Ambari 不会推断缺失的 KDC 状态。

具体字段由所选 Stack 和模式决定。不要将凭据复制到描述符、源文件、截图或普通配置值中。

## 向导流程 {#wizard-sequence}

1. 选择安全模式并验证 realm 和主机前提条件。
2. 查看生成的 principal、identity、service 和 component 设置。
3. 仅在受保护的凭据步骤要求时提供 KDC 或目录凭据。
4. 选择目标配置组并确认受影响主机和组件。
5. 提交操作并跟踪请求完成或失败的进度。
6. 应用所需服务重启，然后验证服务检查、组件健康状况以及 HA active/standby 行为。

## 凭据和 Keytab {#credentials-and-keytabs}

凭据的作用域限定为需要它的操作。界面不得在 URL、telemetry、标签、普通日志或描述符示例中暴露凭据。Keytab 内容通过受支持的 Server/Agent 路径分发；描述符只包含路径和配置属性等引用，不包含秘密字节。

## 失败和恢复 {#failure-and-recovery}

如果验证失败，请在提交前修正报告的输入。如果后台请求失败，请检查其持久化进度和失败组件后再重试。刷新和会话恢复会在可用时恢复所属请求检查点；不会授权对已完成工作进行第二次提交。服务器重启后，应在采取操作前验证请求状态和组件状态。

## 启用后 {#after-enabling}

在 Services 视图中检查配置组和重启要求。在具有代表性的主机上验证 principal 和 keytab，测试服务检查，并验证两个 HA 角色。有关元数据详情，请参阅 [Kerberos 描述符](./kerberos_descriptor.md)；有关重启和配置组行为，请参阅 [Kerberos 服务](./kerberos_service.md)。
