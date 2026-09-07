---
title: 新主要功能的开发流程
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 新主要功能的开发流程 {#development-process-for-new-major-features}

## 目标 {#goals}

* 让社区清楚了解正在进行的新功能开发概况
* 更容易将功能与 JIRA 关联
* 更容易跟踪开发中功能的进度
* 更容易了解开发中功能的预计发布计划

## 流程 {#process}

* 在 [Apache Ambari JIRA](https://issues.apache.org/jira/browse/AMBARI) 中为新功能创建类型为“Epic”的 JIRA
* 将功能添加到 [功能 + 路线图](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=30755705) wiki，并链接到已创建的 Epic
* Epic 应包含易于理解的高层描述
* Epic 还应包含初始的详细设计（可以是便于协作的共享 Google Doc、Word 文档、pdf 等形式）
* 发布初始设计后，在开发邮件列表中公告以征求反馈（主题：[DISCUSS] _Epic 名称_。务必在正文中包含 Epic JIRA 链接）。建议要求在某个日期前给出审阅反馈，以免审阅过程拖延。
* 根据社区反馈迭代设计。根据需要纳入多轮审阅。
* 设计最终确定后，将其拆分为链接到 Epic 的任务
* （可选）定义任务后，使用 Agile Board 将其安排到 sprint 中，以便清楚查看谁在何时处理什么、哪些任务仍未分配以供社区从待办列表中认领等。

## 功能分支 {#feature-branches}

使用功能分支可以在不影响 trunk 稳定性的情况下进行大型、可能造成不稳定的更改。

## 功能标志 {#feature-flags}

* 有时我们希望用户能够试用新功能，但由于它尚未经过严格测试，不希望将其作为通用功能公开。在其他情况下，我们希望为某些边缘场景提供逃生机制，但由于使用该机制可能有危险，不希望一般公开，只应在特殊情况下使用。为此，Ambari 提供了**功能标志**概念。添加属于这些类别的新功能时请使用功能标志。[功能标志](./feature-flags.md)中有更多详细信息。

## 贡献流程 {#contribution-flow}

[https://docs.google.com/document/d/1hz7qjGKkNeckMibEs67ZmAa2kxjie0zkG6H_IiC2RgA/edit?pli=1](https://docs.google.com/document/d/1hz7qjGKkNeckMibEs67ZmAa2kxjie0zkG6H_IiC2RgA/edit?pli=1)

## Git 功能分支 {#git-feature-branches}

Git 功能分支工作流是在封装环境中开发新功能的简单而强大的方式，同时还能促进社区协作。其理念是创建短期分支，在其中进行新开发，最终将已完成的功能分支合并回 `trunk`。短期分支可能持续数天到数月，具体取决于功能规模以及分支合并回 `trunk` 的频率。

功能分支也适用于不一定被视为新功能的更改，例如概念验证更改或可能使 `trunk` 不稳定的架构更改。

### 优点 {#benefits}

* 允许增量工作继续进行，而不会使源代码主 trunk 不稳定。
* 更小的提交意味着更小、更清晰的代码审阅。
* 每次代码审阅不必完全可用，可以更灵活地收集功能进度反馈。
* 保留 Git 历史，合并后可以轻松撤回代码。

### 缺点 {#drawbacks}

* 需要频繁将 `trunk` 合并到功能分支，以尽量减少合并冲突。
* 开发期间可能需要定期将功能分支合并回 trunk，以帮助减少频繁的合并冲突。
* 功能分支没有持续集成覆盖。不过这并不是真正的缺点，因为大多数功能分支在开发早期都会破坏 CI 的某些方面。

### 应遵循的指南 {#guidelines-to-follow}

以下简单规则有助于使 Ambari 的功能分支开发方式保持简单一致。

* 创建功能分支时，应使用有意义的名称。可接受的名称包括功能名称或 Ambari JIRA 名称。分支还应始终以 `branch-feature-` 开头。正确命名的功能分支示例包括：
  - `branch-feature-patch-upgrades`
  - `branch-feature-AMBARI-12345`
* 功能分支中的每次提交都应关联一个 `AMBARI-XXXXX` JIRA。这样，当分支合并回 trunk 时，提交历史遵循 Ambari 约定。
* 经常将 trunk 合并到分支，使分支保持最新并减少潜在的合并冲突数量。
* **不要**压缩提交。功能分支中的每次提交都必须与一个 `AMBARI-XXXXX` 关联。
* 功能完成且分支合并到 trunk 后，可以安全删除该分支。功能分支只应在工作仍在进行时存在。

### 方法 {#approach}

以下步骤概述了功能分支的生命周期。请注意，功能完成并合并回 trunk 后，功能分支会被删除。这是保持 git 分支列表尽可能整洁的重要步骤。

```
$ git checkout -b branch-feature-AMBARI-12345 trunk
Switched to a new branch 'branch-feature-AMBARI-12345'

$ git push -u origin branch-feature-AMBARI-12345
Total 0 (delta 0), reused 0 (delta 0)
To https://git-wip-us.apache.org/repos/asf/ambari.git
 * [new branch]      branch-feature-AMBARI-12345 -> branch-feature-AMBARI-12345
Branch branch-feature-AMBARI-12345 set up to track remote branch branch-feature-AMBARI-12345 from origin by rebasing.

```

* 分支命名正确
* 分支已推送到 Apache，因此其他开发人员可以看到

```bash
$ git checkout -b branch-feature-AMBARI-12345 trunk
Switched to a new branch 'branch-feature-AMBARI-12345'

$ git add
$ git commit -m 'AMBARI-28375 - Some Change (me)'

$ git add
$ git commit -m 'AMBARI-28499 - Another Change (me)'

$ git push
```

* 功能分支的每次提交都有自己的 AMBARI-XXXXX JIRA
* 更改推送到功能分支之前允许有多次提交

```bash
$ git checkout branch-feature-AMBARI-12345
Switched to branch 'branch-feature-AMBARI-18456'

$ git merge trunk
Updating ed28ff4..3ab2a7c
Fast-forward
 ambari-server/include.xml | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 ambari-server/include.xml
```

* 经常（每天、每小时）将 trunk 合并到功能分支，可以更快、更容易地解决合并冲突
* 此处允许快进，因为 trunk 始终是真实来源，不需要在功能分支中添加额外的“合并”提交

```bash
$ git checkout trunk
Switched to branch 'trunk'

$ git merge --no-ff branch-feature-AMBARI-12345
Updating ed28ff4..3ab2a7c
 ambari-server/include.xml | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 ambari-server/include.xml
```

请注意，合并回 `trunk` 时提供了 `--no-ff` 选项。这确保创建一个引用所有功能分支提交的额外“合并”提交。通过这个单独的合并提交，如果发现问题使 trunk 不稳定，就可以轻松撤回整个合并。

* 功能已通过“合并”提交成功合并回 trunk
* 在功能开发过程中可以多次执行，只要合并回 trunk 的代码稳定

```bash
$ git checkout trunk
Switched to branch 'trunk'

$ git branch -d branch-feature-AMBARI-12345
Deleted branch branch-feature-AMBARI-12345 (was ed28ff4).

$ git push origin --delete branch-feature-AMBARI-12345
To https://git-wip-us.apache.org/repos/asf/ambari.git
 - [deleted]         branch-feature-AMBARI-12345

$ git remote update origin --prune
Fetching origin
From https://git-wip-us.apache.org/repos/asf/ambari
 x [deleted]         (none)     -> branch-feature-AMBARI-56789
```

* 完成后清理分支，包括本地和远程分支
* 清理不再跟踪远程分支的本地分支
