---
title: 功能标志
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

# 功能标志 {#feature-flags}

功能标志允许 Ambari 在某项功能成为通用默认功能前，以受控方式公开它，或为边缘场景提供明确的应急开关。标志是产品和兼容性决策，不能替代授权或服务器端验证。

## React 设置界面 {#react-settings-surface}

React 应用从 Ambari 上下文加载受支持的设置，并在 `/experimental` 提供这些设置。该路由受 `AMBARI.MANAGE_SETTINGS` 保护；没有该授权的用户无法使用设置页面。

设置页面逐项编辑标志，未保存的更改仅保留在页面中。保存时通过现有持久化 API 写入每个用户的键 `user-pref-${loginName}-supports`，然后更新共享应用状态。保存失败时会保留编辑状态，以便修正和重试。

应用会将持久化值合并到 `DEFAULT_SUPPORTS` 之上，因此缺失或格式错误的持久化值不会移除已发布的默认值。服务器是持久化偏好的来源；功能消费者读取共享 React 上下文，而不是旧的全局映射。

## 重置 UI 状态 {#resetting-ui-state}

Reset UI States 与更改标志是不同的操作。它需要 `CLUSTER.MANAGE_USER_PERSISTED_DATA`，并且不拥有活动向导状态的用户无法使用。成功后会清除持久化的 `wizard-data`、移除本地首选路径并重新加载应用。重置失败时不会报告成功，也不会丢弃当前状态。

## 添加标志 {#adding-a-flag}

只有在行为拥有明确负责人、默认值、授权边界和移除方案时，才定义功能标志。将默认值添加到当前 React supports 模型，通过共享上下文或明确的 feature guard 使用它，并测试启用、禁用、未授权、持久化和失败路径。

不要通过搜索或扩展历史 Ember `App.supports` 映射来添加标志。当前实现位于 `ambari-web/latest/src/constants.ts`、`ambari-web/latest/src/store/context.tsx`、`ambari-web/latest/src/screens/Experimental` 和 `ambari-web/latest/src/components/FeatureRouteGuard.tsx`。

## 测试和负责人检查清单 {#test-and-ownership-checklist}

对于每个标志，记录所属页面或路由、默认值、服务器持久化键以及修改它所需的权限。标志消费者应针对两个取值，以及持久化值不可用或格式错误的情况，添加有针对性的测试。

保持功能标志范围明确，受保护行为稳定后将其移除。不要使用标志隐藏失败的请求、削弱授权检查或静默改变持久化工作流。

在发布版本中启用标志前，应与所属工作流维护者一起审查相关更改。
