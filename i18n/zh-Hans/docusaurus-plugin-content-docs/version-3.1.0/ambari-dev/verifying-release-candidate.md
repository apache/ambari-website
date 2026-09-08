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

使用发布公告中明确给出的 `<candidate-url>`、`<version>` 和 `<rc>`。验证者应从公告进入候选暂存区，并独立执行下载、签名验证和构建；不要根据分支名或开发版本自行猜测 URL、校验和、标签或软件包版本，也不要复用其他候选版本留下的文件。

## 验证来源 {#verify-provenance}

从候选暂存区下载源代码归档、分离式签名和校验和文件，确认三者名称和版本完全对应。提议标签、归档内容、发布经理密钥和投票公告必须保持一致。展开归档后应检查 LICENSE、NOTICE、源码许可证头、依赖许可证、意外生成内容、捆绑凭据、二进制文件和未声明依赖，并确认归档能够在不依赖发布经理本地工作区的情况下构建。

## 验证签名和构建 {#verify-signatures-and-builds}

从 Apache KEYS 独立导入发布经理公钥，核对密钥指纹，再验证分离式 PGP 签名和公告中指定的校验和。签名与校验和分别证明发布者身份和下载内容完整性，不能互相替代。随后使用当前 RPM 构建配置以及要求的 JDK、Python 版本从源码构建，并记录操作系统、处理器架构、工具版本、依赖来源、完整命令和构建结果。

在一次性或可恢复的验证环境中安装 Server 和 Agent 软件包，检查软件包元数据、服务入口和私有依赖，再测试启动、Agent 注册、数据库迁移、受控服务操作以及失败后的恢复。根据候选版本变更范围运行 Server、Agent、React、Stack 和遥测测试；记录跳过项与已有失败，并在共享日志前清除凭据和内部环境信息。

发布投票、源码归档验证、软件包验证、Bigtop 兼容性和应用运行测试属于不同证据类别。某一类检查成功不能自动替代其他类别；投票意见应明确说明实际验证了哪些内容、使用了什么环境，以及哪些路径没有覆盖。
