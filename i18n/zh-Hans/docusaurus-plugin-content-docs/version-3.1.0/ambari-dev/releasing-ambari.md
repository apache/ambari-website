---
title: 发布 Apache Ambari 3.1.0
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

# 发布 Apache Ambari 3.1.0 {#releasing-apache-ambari-310}

本流程用于发布 Apache Ambari 3.1.0 候选版本。将 `<version>`、`<rc>`、`<branch>` 和 `<candidate-url>` 替换为实际发布值；绝不编造 URL、校验和或软件包名称。

## 准备分支 {#prepare-the-branch}

确认 JIRA 问题和发布分支。检查源代码、NOTICE、许可证、依赖、生成文件和版本属性。使用当前 RPM profile 及所需 JDK 和 Python 版本从干净检出构建。

运行聚焦的 Server、Agent、React 和打包测试，包括失败和恢复路径。记录准确命令、工具版本、操作系统、构件和跳过的检查。

## 暂存和投票 {#stage-and-vote}

使用 Apache 发布经理密钥生成校验和和分离式 PGP 签名。将源代码归档、签名、校验和、日志和来源元数据保存在候选暂存区。

在 Apache Ambari 开发者邮件列表发布候选 URL、标签、校验和、签名、构建证据和投票截止时间。发布投票独立于软件包测试和 Bigtop Stack 兼容性。

投票成功后发布批准的构件；投票失败时记录缺陷、创建新候选并重复验证，不替换已有候选。
