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

本流程用于准备和发布 Apache Ambari 3.1.0 候选版本。所有操作都应以发布计划和投票邮件中的实际信息为准，将 `<version>`、`<rc>`、`<branch>` 和 `<candidate-url>` 替换为对应值。不得根据开发版本猜测发布 URL、校验和或软件包名称，也不得覆盖已经进入投票的候选内容。

## 准备分支 {#prepare-the-branch}

确认发布 JIRA、发布分支、候选版本范围和待纳入提交，冻结后续变更边界。检查源码许可证头、LICENSE、NOTICE、第三方依赖、生成文件、版本属性和发布说明，确认源码归档不包含本地凭据或构建产物。使用当前 RPM 构建配置以及要求的 JDK、Python 版本，从干净检出的源码开始构建并记录完整环境。

根据候选版本变更范围运行 Server、Agent、React、Stack 和打包测试，并覆盖关键失败与恢复路径。记录完整命令、工具版本、操作系统、处理器架构、生成制品、测试报告和被跳过的检查。自动测试通过不能替代对安装、升级、回滚和服务操作的代表性环境验证。

## 暂存和投票 {#stage-and-vote}

使用 Apache 发布经理密钥为最终源码归档生成公告要求的校验和和分离式 PGP 签名，并核对签名密钥指纹。将源码归档、签名、校验和、构建日志和来源元数据一并保存到候选暂存区；同一候选编号下的文件必须保持不可变，任何内容变化都应产生新的候选版本。

在 Apache Ambari 开发者邮件列表发布候选 URL、源码标签、校验和、签名、发布经理密钥、构建证据和明确的投票截止时间，并说明验证者应检查的内容。发布投票判断的是 ASF 源码发布是否合规且可用；软件包测试、Bigtop Stack 兼容性和特定平台认证属于需要单独记录的证据，不能互相替代。

投票通过后，只发布投票中获得批准的制品，并更新下载页面、发布说明、版本元数据和公告。投票失败时，应记录阻塞缺陷、修复源码、创建新的候选编号并重新执行全部必要验证；不得原地替换旧候选文件，也不得沿用已经失效的签名或校验和。
