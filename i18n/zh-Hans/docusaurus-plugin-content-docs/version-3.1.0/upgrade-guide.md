---
title: 规划 3.1.0 升级
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

# 规划 3.1.0 升级 {#plan-the-310-upgrade}

| 领域 | 升级前检查 |
| --- | --- |
| 源代码和软件包来源 | 使用与[文档化基线](./release-baseline.md)一致且经过审查的候选版本，并验证其制品来源 |
| Ambari Java | 在 JDK 17 上构建；选择满足新的 Java 检查的 Ambari 运行时 |
| Stack Java | 记录独立选择的 JDK 以及每个服务的兼容性要求 |
| Python | 检查最低版本、实际可执行文件和打包的原生扩展 ABI |
| 架构 | 确保 RPM 头文件、Python wheel 和 VictoriaMetrics 二进制文件使用相同的目标架构 |
| 数据库 | 备份元数据、配置、凭据/密钥库以及恢复流程 |
| 监控 | 清点 AMS 数据、旧版小组件、外部集成、旧服务记录，以及新系统的数据保留与容量规划 |
| 浏览器/身份验证 | 验证 React 入口、反向代理路径、本地/SSO 登录和角色权限 |

在 Rocky 8 上，不要假设系统的通用 `python3` 可执行文件就是 Python 3.9。[运行时指南](./platform/python-runtime.md)和[打包指南](./platform/rpm-packaging.md)介绍了解释器和 ABI 契约。

移除旧 AMS Stack 定义本身并不等于清理每个现有集群记录。请根据目标构建评估旧服务清单，并使用受支持的迁移流程；不要为了让 Server 启动成功而自行执行数据库删除。

## 维护窗口 {#maintenance-window}

1. 在能够代表生产拓扑、认证方式和数据规模的环境副本上演练候选版本。记录正常启动、中断操作、失败恢复和回滚结果。
2. 保留一致的数据库/配置/软件包备份，并按照维护计划停止 Ambari Server。应用服务的停止决定应与管理服务器升级分开处理。
3. 从所选架构的批准仓库升级 Server 和 Agent 软件包。不要只复制 React `dist` 目录，也不要将旧的私有 Python 库覆盖到新软件包中。
4. 分别配置 Ambari 和 Stack 的 Java Home。需要显式指定时，设置程序支持以下两个独立路径；请将示例值替换为实际安装的 JDK 位置：

```shell
ambari-server setup \
  --ambari-java-home /opt/jdks/ambari-17 \
  --stack-java-home /opt/jdks/stack-java
```

5. 确认 Server 已停止且数据库备份可恢复后，运行候选版本提供的元数据升级：

```shell
ambari-server upgrade
```

6. 启动 Server 前解决所有数据库架构或配置错误。通过软件包安装的服务入口启动 Server 和 Agent，然后确认主机重新注册、心跳恢复并能够执行受控命令。
7. 安装/配置 VictoriaMetrics 和 VMAGENT，验证发现和查询，并重新创建自定义监控定义。
8. 在恢复正常变更活动前完成以下验收检查。

3.1 升级目录会创建新的监控元数据表，但不会导入 AMS 历史样本，也不会自动转换旧版小组件布局。

## 验收检查 {#acceptance-checks}

- 确认 Server 启动时没有 Java 框架或监控后端版本混用错误，并核对 Ambari 与各服务使用的 JDK。
- 验证每个 Agent 均通过运行时封装脚本使用预期的 Python 次版本和 ABI，并能从私有库导入软件包附带的依赖。
- 执行受控的服务检查，并检查其后台请求/任务日志。
- 打开 Hosts，在列表和详情之间移动时保留筛选条件，并确认组件摘要。
- 使用可写角色和只读角色分别读取、编辑、验证并保存一个具有代表性的配置。
- 验证与已部署拓扑相关的 Kerberos/HA 工作流，包括取消、刷新和所有者恢复。
- 在开始单独的 Stack 升级前检查元数据/数据备份和回滚准备情况。
- 验证指标导出端点健康状态、独立发现的组件目标、远程写入与存储结果、数据源连接、仪表盘查询以及基于角色的监控访问权限。
- 确认现有浏览器偏好不会在部署要求 React 时无意中让用户停留在旧体验。

仓库包含静态测试和部分运行时证据。这些内容不能替代环境特定的验收检查。

## 回滚 {#rollback}

回滚必须恢复彼此一致的元数据数据库、Ambari 配置和兼容软件包集合。仅降级软件包无法撤销数据库架构、私有运行时库和仪表盘模型的全部变更。旧监控读取路径应按既定保留策略处理，VictoriaMetrics 存储与 VMAGENT 队列则需要单独制定备份和恢复方案。

## 参考 {#references}

参阅 [JDK 分离](https://github.com/apache/ambari/commit/821de739a11b34b06a45fab6dc8aaa6f703783e8)、[Python 与软件包现代化](https://github.com/apache/ambari/commit/daf7576fb67edbde6b53fa52c9d23f918f23f817)以及固定版本的 [3.1 升级目录](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/java/org/apache/ambari/server/upgrade/UpgradeCatalog310.java)。
