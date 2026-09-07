---
title: 开发者工具
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

# 开发者工具 {#developer-tools}

Ambari 开发使用标准 Git、Maven、Java、Python 和 Node.js 工具。请选择能够复现仓库配置版本并保留项目检查的工具。

## 源代码管理 {#source-control}

一个分支对应一个连贯的更改，保持提交聚焦，并在审查前从目标上游分支 rebase。提交前检查 status 和完整 diff，避免包含无关的工作区更改。

可以在 `.gitconfig` 中配置实用别名：

```ini
[alias]
        st = status
        ci = commit
        br = branch
        co = checkout
        lg = log --graph --decorate --oneline --all
```

在分支、提交和审查元数据中使用项目要求的 JIRA key。脚本和自动化中优先使用非交互式 Git 命令。

## Java 和 Maven {#java-and-maven}

使用 JDK 17，以及项目选择的 Maven wrapper 或 Maven 版本。根 POM 管理依赖和插件版本。IDE 应导入 Maven 项目，而不是维护独立的依赖模型。

迭代时运行针对模块或测试的窄范围检查，然后在审查前运行适用的广泛验证。不要将生成的 target 和下载的依赖提交到仓库。

## React 开发 {#react-development}

主要 UI 位于 `ambari-web/latest`，使用 TypeScript、React 19、Vite 和 Vitest。使用 package 脚本进行本地开发、生产类型/构建检查、lint 和测试：

```bash
npm run dev
npm run build
npm run lint
npm run test
```

位于 `ambari-admin/src/main/resources/ui/ambari-admin` 的 Admin React 应用拥有自己的 package 脚本和构建生命周期。不要假设主要 UI 构建成功就能验证 Admin 应用。

## Python 开发 {#python-development}

Agent Python 依赖和打包由模块的 `pyproject.toml` 和锁定文件定义。使用仓库选择的 Python 解释器和锁定依赖；不要将临时软件包安装到系统解释器，也不要重新引入已移除的 vendored 实现。

## 审查检查 {#review-checks}

审查前运行适用的 Java、Python、React 和文档检查；检查许可证和依赖变更；确认凭据、私钥、cookie 和生成构件不存在。 在审查说明中记录确切命令、跳过的检查和依赖环境的结果。
