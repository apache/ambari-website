---
title: 验证 Apache Ambari 3.1.0 发布候选版本
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

# 验证 Apache Ambari 3.1.0 发布候选版本 {#verifying-an-apache-ambari-310-release-candidate}

使用发布公告中的 `<candidate-url>`、`<version>` 和 `<rc>`，不要替换为猜测的 URL、校验和或软件包版本。

## 验证来源 {#verify-provenance}

从候选暂存区下载源代码归档、分离式签名和校验和。确认归档名称、提议标签和发布经理密钥与投票公告一致。检查许可证、NOTICE、生成内容、捆绑凭据和未声明依赖。

## 验证签名和构建 {#verify-signatures-and-builds}

从 Apache KEYS 导入发布经理公钥，验证 PGP 签名和指定校验和。使用当前 RPM profile 及所需 JDK、Python 版本从源代码构建，并记录工具版本和来源。

在一次性环境安装 Server 和 Agent 软件包，测试启动、注册、迁移以及失败操作后的恢复。运行聚焦的 Server、Agent、React 和遥测测试，报告失败时不得包含凭据。

发布投票、软件包验证、Bigtop 兼容性和应用测试属于不同证据类别。
