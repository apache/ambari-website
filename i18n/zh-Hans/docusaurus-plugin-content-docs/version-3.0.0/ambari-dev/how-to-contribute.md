<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# 如何贡献 {#how-to-contribute}

## 贡献代码变更 {#contributing-code-changes}

### 检出源代码 {#checkout-source-code}

* 如果尚未操作，请从 Github 派生项目：https://github.com/apache/ambari
* 克隆此派生仓库：

```bash
# Replace [forked-repository-url] with your git clone url
git clone [forked-repository-url] ambari
```

* 设置上游远程仓库：

```bash
cd ambari
git remote add upstream https://github.com/apache/ambari.git
```

### 使派生仓库保持最新 {#keep-your-fork-up-to-date}

```bash
# Fetch from upstream remote
git fetch upstream
# Checkout the branch that needs to sync
git checkout trunk
# Merge with remote
git merge upstream/trunk
```

对需要与远程同步的所有分支重复这些步骤。

### JIRA {#jira}

Apache Ambari 使用 JIRA 跟踪包括错误和改进在内的问题，并使用 Github 拉取请求管理代码审查和代码合并。主要设计变更在 JIRA 中讨论；创建拉取请求后，在拉取请求中讨论实现变更。

:::note JIRA 注册的重要变更
* JIRA 注册目前不对公众开放
* 获取 JIRA 账号：
  1. 在 [Apache JIRA](https://issues.apache.org/jira) 注册
  2. 联系 PMC 成员批准注册
* 也可以：
  1. 先提交拉取请求
  2. 社区成员将帮助创建对应的 JIRA 工单
:::

* 查找与变更相关的现有 Apache JIRA
    * 如果变更很小且与现有 JIRA 相关，请勿创建新的 JIRA；在现有讨论中补充并开展工作
    * 查找从 JIRA 链接的现有拉取请求，了解是否已有其他人在处理该 JIRA

* 如果变更是新的且拥有 JIRA 访问权限，则创建新的 JIRA：
    * 提供描述性标题
    * 撰写详细描述。对于错误报告，最好包含问题的简短复现步骤；对于新功能，可以包含设计文档。
    * 填写必填字段：
        * Issue Type。Bug 和 Task 是 Ambari 最常用的问题类型。
        * Priority。其含义大致如下：
            * Blocker：没有该变更就没有意义发布，因为产品对大量少数用户不可用
            * Critical：大量少数用户缺少重要功能，和/或难以规避
            * Major：少量少数用户缺少重要功能，但存在规避方法
            * Minor：某个小众场景缺少支持，但不影响使用或容易规避
            * Trivial：锦上添花的变更，实际使用中不太可能造成问题
        * Component。选择受此变更影响的组件，从 Ambari Components 中选择
        * Affects Version。对于 Bug，至少指定一个已知出现问题或需要变更的版本
    * 不要包含补丁文件；拉取请求用于提出实际变更。

* 如果没有 JIRA 访问权限：
    * 先提交拉取请求
    * 在 PR 描述中清楚说明问题或改进
    * 社区成员将创建 JIRA 工单并将其链接到 PR

### 拉取请求 {#pull-request}

Apache Ambari 使用 [Github 拉取请求](https://github.com/apache/ambari/pulls)审查和合并源代码。创建拉取请求前，必须检出 apache/ambari 的一个派生仓库。如果尚未派生，请按照步骤 1 的说明创建派生仓库。

#### 提交并推送变更 {#commit-and-push-changes}

- 开始进行代码变更前，创建分支 AMBARI-XXXXX-branchName。例如，如果 JIRA 的修复版本为 2.6.2，则基于 branch-2.6 创建分支

    ```bash
    git checkout branch-2.6
    git pull upstream branch-2.6
    git checkout -b AMBARI-XXXXX-branch-2.6
    ```

- 将相关 JIRA 状态标记为 "In Progress"，让其他人知道你已开始工作。
- 在代码中进行变更，并将其提交到新创建的分支。
- 运行所有适用测试，确保所有单元测试通过
- 推送变更。提示用户名和密码时，提供 Github 用户 ID 和[个人访问令牌](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

    ```bash
    git push origin AMBARI-XXXXX-branch-2.6
    ```

#### 创建拉取请求 {#create-pull-request}

在 Github 中进入你的派生仓库并[创建拉取请求](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)。拉取请求需要针对补丁要合入的目标分支。

拉取请求标题格式应为 **[AMBARI-xxxx] Title**，其中 AMBARI-xxxx 是相关 JIRA 编号。

- 如果拉取请求仍在进行中、尚未准备好合并，但需要推送到 Github 以便审查，请在 **AMBARI-XXXX** 后添加 **[WIP]**
- 可以识别曾参与变更的提交者或其他贡献者。在 Github 中找到文件并点击 “Blame” 查看最后修改每一行的人员。可以在 PR 描述或评论中添加 @username，请开发人员审查。
- 注意：贡献者无权在 “Reviewers” 控件中编辑或添加审查人，只能使用 @mention 引起提交者注意。
- 相关 JIRA 将自动获得 PR 链接，如下所示。手动将 JIRA 状态标记为 "Patch Available"。

![](@site/versioned_docs/version-3.0.0/ambari-dev/imgs/pull-request.png)

#### Jenkins 作业 {#jenkins-job}

* 每次创建新的拉取请求都会触发一个 Jenkins 作业。该作业配置为执行以下任务：
    * 验证合并
    * 构建 Ambari
    * 运行单元测试
* 它会将构建结果作为集成检查报告在拉取请求中，如下所示。

![](@site/versioned_docs/version-3.0.0/ambari-dev/imgs/jenkins-job.png)

* 拉取请求贡献者有责任确保构建通过。Jenkins 作业无法验证合并时，不应合并拉取请求。
* 要重新触发构建作业，只需在 PR 中评论 "retest this please"。访问此页面查看最新构建作业。

#### 重复 {#repeat}

对于需要合入多个分支的补丁，重复上述步骤。例如，如果补丁需要提交到 branch-2.6 和 trunk，则需要创建两个分支，并按照上述步骤打开两个拉取请求。

## 审查流程 {#review-process}

Ambari 使用 Github 进行代码审查。所有提交者都必须遵循此[页面](https://gitbox.apache.org/setup/)中的说明，并将 Github 账号与 gitbox 关联，才能获得在 Github 的 [apache/ambari](https://github.com/apache/ambari) 中的合并权限。

要在本地试用变更，可以按照此[指南](https://help.github.com/articles/checking-out-pull-requests-locally/)中的说明在本地检出拉取请求。

* 其他审查者（包括提交者）可以在本地试用变更，也可以通过在拉取请求上提交审查来批准或提出建议。这里可以找到更多帮助。
* 如果需要更多变更，鼓励审查者在需要修改的代码行上留下评论。拉取请求作者随后可以更新代码，并向同一分支推送另一个提交，以更新拉取请求并通知提交者。
* 至少一名提交者批准或评论 "LGTM"（表示 “Looks Good To Me”），且 Jenkins 作业成功验证合并后，PR 才能合并。如果评论 LGTM，则需要协助处理补丁上的错误或后续问题。（请记住，提交者不能审查自己的补丁。如果提交者创建了 PR，应确保另一名提交者进行审查。）
* 有时其他变更可能已合并，并与拉取请求的变更冲突。解决冲突前无法合并 PR。可以运行 **git fetch** upstream，然后运行 **git rebase** **upstream/[branch-name]**，手动解决冲突，再将结果推送到分支。
* PR 合并后，请及时关闭 PR，并将 JIRA 解决为 "Fixed"。

## Apache Ambari 提交者 {#apache-ambari-committers}

请在 http://www.apache.org/dev/committers.html 进一步阅读 Apache 提交者相关信息。

通常，持续为项目作出受欢迎贡献的贡献者可能会受邀成为提交者，不过邀请的具体时间取决于许多因素。持续贡献 6 个月是贡献者表现出项目兴趣的积极信号。乐于接受反馈并遵循上述开发指南的贡献者，是成为提交者的良好人选。我们见过贡献 20-30 个补丁后成为提交者的情况，但这非常主观，也可能因补丁而异。最终，由 Ambari PMC 在项目中提议并投票决定提交者。
