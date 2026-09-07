---
title: 3.1.0 源代码基线
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

# 源码基线 {#source-baseline}

| 参考项 | 修订或版本 |
| --- | --- |
| 上一版本源代码标签 | `release-3.0.0`, `3acb048b3f6e209d6d1e5ac54efcbd30f1b25c57` |
| 2026-09-07 审查的社区 trunk | `94c6389a96b38bccef0b6a08269481a086b63ca1` |
| 监控目标基线，PR #4182 | `4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4` |
| 审查 trunk 中的 Maven 开发版本 | `3.1.0.0-SNAPSHOT` |

对于本文档，PR #4182 包含在预期的 3.1.0 功能基线中。发布候选版本必须同时包含选定的社区更改和监控实现；表中的参考 SHA 不是要求用旧功能分支替换较新的社区工作。

网站发布标签为 3.1.0。四段式 Maven/软件包开发版本不表示存在中间的公开 3.0.x 版本。

## 变更选择方式 {#change-selection}

审查使用源代码祖先关系，而不只是提交日期。功能分支可能包含较早日期的提交，这些提交在 3.0.0 之后才首次成为主线的一部分。审查的 trunk 在上一版本标签之后包含 181 个可达提交；[发行说明](./release-notes.md)按面向用户的影响归纳这些提交，而不是逐一列出每个测试或合并。

维护者可以针对固定的审查版本重现比较：

```shell
git log --first-parent --date=short --format='%h %ad %s' \
  release-3.0.0..94c6389a96b38bccef0b6a08269481a086b63ca1
git diff --stat release-3.0.0..94c6389a96b38bccef0b6a08269481a086b63ca1
```

## 主要证据 {#primary-evidence}

| 主题 | 来源 |
| --- | --- |
| 监控控制面/数据面及替换边界 | [遥测架构](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/ambari-agent-prometheus-telemetry-architecture.md) |
| VictoriaMetrics 部署拓扑和配置 | [受管理的 Stack 服务](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.2.0/services/VICTORIAMETRICS) |
| 新的监控数据库模型 | [UpgradeCatalog310](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/upgrade/UpgradeCatalog310.java) |
| 受管理的 Java 依赖 | [项目 POM](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-project/pom.xml)、[构建策略](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/docs/java-dependency-management.md) |
| Python 运行时和分发契约 | [Agent 元数据](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/src/main/python/pyproject.toml)、[Agent 打包](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-agent/pom.xml)、[有效实现审计](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/docs/ambari-agent-python-modernization-audit.zh-CN.md) |
| React 路由和权限 | [Routes](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-web/latest/src/router/RoutesList.tsx)、[主要 UI 选择](https://github.com/apache/ambari/blob/94c6389a96b38bccef0b6a08269481a086b63ca1/ambari-web/public/index.html) |
| 选定的监控运行时捕获 | [三节点证据](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/docs/frontend-refactor/runtime-evidence/AMBARI-26638) |

## 证据边界 {#evidence-boundaries}

监控证据包括一个配备 VictoriaMetrics Server、VMAGENT、VMAUTH 以及选定服务/主机仪表板的三节点 Rocky Linux 8 ARM64 部署。它不认证每种分布式拓扑或每种故障模式。

Python 现代化记录包括 Linux x86_64 RPM 和部署验证，以及针对其他 ABI/架构配置的独立暂存构件检查。某个配置受支持不等于每个发行版都有已发布并通过认证的二进制文件。

React 对等基线区分实现、静态比较和运行时验证。较早的审查快照不是当前测试证书，不得将其转换为“每个角色、SSO 模式、自定义 Stack 和恢复路径都已通过”的无条件声明。[React 指南](./frontend/react-ui.md)列出了已实现的工作流界面和验收边界。

文档构建和浏览器检查会验证本网站的路由、翻译、标签和资源，但不会执行 Ambari 集群升级、Maven/RPM 生产构建或监控故障演练。

## 发布版本前 {#before-publishing-a-release}

选定发布候选版本后更新此基线。记录最终源代码标签、签名构件/校验和位置、软件包目标矩阵、支持的升级路径、测试结果和发布投票结果。完成这些工作后，才能将预览标记替换为已发布版本。
