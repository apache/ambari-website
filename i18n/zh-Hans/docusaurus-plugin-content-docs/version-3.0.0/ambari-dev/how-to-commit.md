---
title: 如何提交代码
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# 如何提交代码 {#how-to-commit}

本文介绍如何向 Ambari 提交变更，要求读者了解 Git。虽然本文主要供提交者参考，也帮助贡献者了解实际的提交流程。

通常，我们对修改 Apache Ambari 代码库十分谨慎。代码库是使用它的系统的事实依据，因此必须确保其可靠。为此，我们采用 Review Then Commit（RTC）变更策略：[http://www.apache.org/foundation/glossary.html#ReviewThenCommit](http://www.apache.org/foundation/glossary.html#ReviewThenCommit)。

除极少数情况外，对 Apache Ambari 代码库的任何变更都从 Jira 开始（有时一个变更可能关联多个 Jira；一个 Jira 也可能产生多个提交）。通常，当 Jira 已关联补丁、贡献者认为补丁可以审查并将其标记为可用补丁时，提交准备流程就开始了。

提交者必须对补丁签字确认。社区审查补丁非常有帮助，但最终必须由提交者对补丁的正确性负责。如果补丁足够简单且提交者对审查有信心，提交者的单个 +1 就足以提交补丁。（请记住，提交者不能审查自己的补丁。如果提交者提交补丁，应确保另一名提交者进行审查。）

请遵循[如何贡献](./how-to-contribute.md)指南中的说明向 Ambari 提交变更。

如果 Jira 是错误修复，可能还需要将补丁提交到 Git 中最新的分支（trunk）。
