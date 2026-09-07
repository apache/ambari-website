---
title: Kerberos 服务配置
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

# Kerberos 服务配置 {#kerberos-service-configuration}

Kerberos 变更既是服务配置变更，也是安全操作。Ambari 会在创建后台请求前解析所选 Stack、服务、主机和组件设置。

## 配置组 {#configuration-groups}

配置组将选定主机或组件与一组有版本的服务属性关联起来。Kerberos 工作流会更新拥有受影响服务设置的组，不会覆盖无关组。确认操作前，请检查目标组、主机成员和生效值。

## 依赖关系和重启 {#dependencies-and-restarts}

服务元数据声明配置依赖关系。当 Kerberos 属性、principal、keytab 路径或相关安全设置变更时，Ambari 可以将受影响组件标记为需要重启。重启范围取决于解析后的依赖关系和组件状态，不会盲目重启所有服务。

在 React 请求视图中检查待处理操作。已完成的请求可能仍有组件需要重启；失败请求必须先检查再重试。不要将成功的 API 响应视为每个守护进程都已重新加载凭据的证明。

## 生效配置 {#effective-configuration}

生效配置由 Stack 默认值、服务值、配置组覆盖、主机上下文和受保护的配置输入组合而成。描述符引用会在分配前解析。秘密值保留在受保护的凭据路径中，不得复制到普通服务属性、日志、仪表板或 telemetry 中。

## 主机和 HA 行为 {#host-and-ha-behavior}

对于 HA 服务，应分别验证 active 和 standby 组件。Principal 名称、`_HOST` 替换、keytab 路径和重启要求可能因主机角色而异。使用 Hosts 和 Services 页面检查组件状态，并在刷新或服务器重启后恢复遗漏的操作。

## 安全变更流程 {#safe-change-procedure}

1. 确认目标配置组和受影响主机。
2. 通过受保护工作流验证 realm、principal、KDC/AD 模式和 keytab 引用。
3. 提交操作并跟踪持久化的请求进度。
4. 在重试前检查失败、重启建议和组件健康状况。
5. 完成所有必要重启后，验证服务检查和两个 HA 角色。

[Kerberos 描述符](./kerberos_descriptor.md)页面定义元数据结构，[启用 Kerberos](./enabling_kerberos.md)页面定义安装工作流。
