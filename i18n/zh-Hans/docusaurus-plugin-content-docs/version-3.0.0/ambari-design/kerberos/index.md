---
slug: /kerberos
title: Ambari Kerberos 自动化
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# Ambari Kerberos 自动化 {#ambari-kerberos-automation}

- [简介](#introduction)
  - [工作原理](#how-it-works)
  - [启用 Kerberos](#enabling-kerberos)
  - [添加组件](#adding-components)
  - [添加主机](#adding-hosts)
  - [重新生成 Keytab](#regenerating-keytabs)
  - [禁用 Kerberos](#disabling-kerberos)
- [Kerberos 描述符](kerberos_descriptor.md)
- [Kerberos 服务](kerberos_service.md)
- [启用 Kerberos](enabling_kerberos.md)

<a name="introduction"></a>

## 简介 {#introduction}

在 Ambari 2.0.0 之前，要配置 Ambari 集群使用 Kerberos，需要在每台主机上设置 Kerberos 客户端基础设施、创建所需身份、生成并分发所需的 keytab 文件，以及更新必要的配置属性。对于小型集群，这项工作似乎并不繁重；但是，随着集群规模扩大，所需工作量也会增加。

Ambari 的 Kerberos 自动化功能正可以解决这个问题。它会执行所有这些步骤，并帮助在添加新服务和主机时维护集群。

Kerberos 自动化既可以通过 Ambari REST API 调用，也可以通过 Ambari UI 中的 _启用 Kerberos 向导_ 调用。

<a name="how-it-works"></a>

### 工作原理 {#how-it-works}

能够使用 Kerberos 凭据进行身份验证的 Stack 和服务必须提供 Kerberos 描述符，声明所需的 Kerberos 身份以及更新配置的方式。Ambari 基础设施利用这些数据和管理员应用的任何更新，执行初始启用 Kerberos、为主机和新增组件启用 Kerberos、重新生成凭据以及禁用 Kerberos 等相关操作。

需要注意的是，在执行任何自动化任务之前，必须先在集群的所有主机上安装 Kerberos 服务。如果使用 Ambari UI，这应作为启用 Kerberos 向导流程的一部分完成。

<a name="enabling-kerberos"></a>

### 启用 Kerberos {#enabling-kerberos}

启用 Kerberos 时，集群中的所有服务都应处于停止状态。主要原因是避免服务停止后、集群切换为使用 Kerberos 并重新启动服务时出现状态问题。

批量为集群启用 Kerberos 时会执行以下步骤：

1. 在配置的 KDC（或 Active Directory）中创建或更新账号
2. 生成 keytab 文件并将其分发到适当的主机
3. 更新相关配置

<a name="adding-components"></a>

### 添加组件 {#adding-components}

如果 Ambari 集群已启用 Kerberos，每当添加新组件时，都会自动为新组件配置 Kerberos，并根据需要创建和分发所需的 principal 和 keytab 文件。

每个新组件安装并启动前会执行以下步骤：

1. 更新相关配置
2. 在配置的 KDC（或 Active Directory）中创建或更新账号
3. 生成 keytab 文件并将其分发到适当的主机

<a name="adding-hosts"></a>

### 添加主机 {#adding-hosts}

添加新主机时，必须在该主机上安装 Kerberos 客户端。这不会自动发生；但是，如果 Ambari 集群已启用 Kerberos，Ambari UI 中的 _添加主机向导_ 会执行此步骤。添加主机后，通常会在其上安装一个或多个组件，请参阅[添加组件](#adding-components)。

<a name="regenerating-keytabs"></a>

### 重新生成 Keytab {#regenerating-keytabs}

集群启用 Kerberos 后，可能需要重新生成 keytab。可以采用以下两种模式之一：

- `all`：创建缺失的 principal，并无条件更新现有 principal 的密码，然后创建并分发所有相关 keytab 文件
- `missing`：创建缺失的 principal，然后为新创建的 principal 创建并分发 keytab 文件

无论采用哪种模式，重新生成过程完成后都应重启受影响的服务。

通过 Ambari UI 执行时，系统会询问用户要使用哪种 keytab 重新生成模式，以及是否重启服务。

<a name="disabling-kerberos"></a>

### 禁用 Kerberos {#disabling-kerberos}

如果需要从 Ambari 集群中移除 Kerberos，Ambari 会删除受其管理的 Kerberos 身份、keytab 文件和 Kerberos 专用配置。Ambari UI 会执行停止和启动服务以及删除 Kerberos 服务的步骤；但是，如果使用 Ambari REST API，则需要手动完成这些操作。
