---
title: 常见问题（FAQ）
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

# 常见问题（FAQ） {#frequently-asked-questions-faq}

本页回答 Apache Ambari 3.1 的常见问题。对于文档化行为，请遵循链接的平台、监控、前端、升级和开发指南，而不要使用旧的 3.0 设置示例。

## 3.1 需要什么运行时？ {#what-runtime-does-31-require}

Ambari 辅助程序使用 JDK 17 和 Maven 3.9.x 构建和运行。Linux 软件包以所选平台 ABI 上的 CPython 3.9（`cp39`）为目标；不得通过运行时 `pip install` 替换打包的私有库。请参阅 [Python 运行时](./platform/python-runtime.md)和 [Java 依赖](./platform/java-dependencies.md)。

## 构建 Ambari 使用哪个 Python？ {#which-python-is-used-to-build-ambari}

源代码级解释器要求与打包 RPM 中的原生扩展 ABI 是两个独立契约。验证构建选择的可执行文件，并使用匹配的 `cp39` wheel 目标。在 Rocky Linux 8 上，不要假设通用 `python3` 是 Python 3.9。

## 支持哪个 UI？ {#which-ui-is-supported}

Ambari 3.1 使用 `ambari-web/latest` 作为主要 React UI。`/latest/#` 入口、身份验证、权限、Hosts、Services、Configs、Alerts、Kerberos、HA、升级、Views、Themes 和监控工作流由 [React 用户指南](./frontend/react-ui.md)覆盖。Classic Ember 仅用于迁移比较，不是 3.1 的运行路径。

## 为什么能看到页面却无法修改？ {#why-can-i-see-a-page-but-not-change-it}

读取权限和修改权限是分开的。集群、主机、服务、数据源、仪表板和管理操作使用不同的权限检查。直接访问 URL 不会授予缺失的权限；请测试实际角色和 API 授权响应。

## 监控发生了什么变化？ {#what-changed-in-monitoring}

原生监控区域使用 Prometheus 兼容发现、VMAGENT、VictoriaMetrics、数据源、PromQL、目标和仪表板。[监控迁移指南](./monitoring/migration.md)说明新元数据表不会导入 AMS 历史数据，也不会转换旧小组件布局。请分别规划归档和自定义查询重写。

## 如何评估 3.1 候选版本？ {#how-do-i-qualify-a-31-candidate}

使用[升级指南](./upgrade-guide.md)区分 Ambari 软件包/UI/数据库变更、Stack 服务变更和监控切换。在维护前验证构件来源、Java/Python ABI、数据库备份、浏览器/身份验证路径以及真实拓扑。

## 如何排查失败操作？ {#how-should-i-troubleshoot-a-failed-operation}

重试前检查持久化后台请求、任务日志、组件状态和所有者。刷新和服务器重启会在可用时恢复检查点；不能据此重新提交已完成的工作。监控问题应区分发现、抓取、远程写入、存储、数据源和仪表板故障。

## 测试报告在哪里？ {#where-are-test-reports}

Java 报告位于 `ambari-server/target/surefire-reports/` 和 `ambari-server/target/failsafe-reports/`；Python 结果和覆盖率位于 `ambari-server/target/python-test-results/` 和 `ambari-server/target/python-coverage/`。网站 `yarn test:i18n` 和浏览器检查独立于 Ambari 产品验收。请参阅[单元测试报告](./ambari-dev/unit-test-reports.md)。
