---
title: 常见问题与更新
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

# 常见问题与更新 {#mpack-operations-recovery}

先分清楚问题出在哪一步。商店里的操作和机器上的服务安装，进度不在同一个地方看。

## 去哪里看进度和错误？ {#operation-phases}

| 刚才在做什么 | 去哪里看 |
| --- | --- |
| 导入合集、准备所选服务 | 商店页面的**操作记录** |
| 在机器上安装或启动服务 | 集群的安装任务或后台任务详情 |
| 应用配置修改 | 服务的配置历史，以及重启或重新加载任务 |
| 检查服务是否正常 | 对应的服务检查任务 |

“导入完成”表示服务已经可以选择，不代表已经装好。后面还要完成安装和启动。

## 页面关了、网络断了怎么办？ {#preserve-identity}

重新打开商店，到**操作记录**里找刚才的操作。如果页面提供了检查上次提交结果的操作，先用它确认。

浏览器报网络错误，不代表 Server 那边也停止了。结果不确定时，不要反复点提交，也不要重复导入同一个文件。

如果是在机器安装阶段断开的，回到集群任务列表查看就行。不要因为安装页面关了，就从导入合集重新开始。

## 一直显示等待怎么办？ {#recovery-actions}

如果在等其他任务，先点开详情，看清楚哪些任务还没结束。可以等待它们完成，或者请集群管理员处理。

如果要求进入维护，先确认会影响哪些集群。如果明确要求重启 Server，请和管理员安排重启，完成后再回到原来的操作检查结果。

重试、取消、恢复各有用途，不要挨个点一遍。按页面针对当前问题提供的操作处理；有些修改已经生效后，就不能直接取消。也不要通过删除 Server 文件来强行清除操作。

## 这时别人还能操作 Ambari 吗？ {#scoped-maintenance}

通常可以。服务包变更进行时，会限制它所影响的服务和配置，其他不相关的普通写操作和任务可以继续。

多个集群可能共用同一套服务管理内容。如果更新会影响它们，页面会列出范围，并不是每个集群各有一份互不影响的副本。

## 更新服务包，会自动升级软件吗？ {#different-change-types}

不会。服务包里放的是“Ambari 应该怎么安装和管理这个服务”的说明和脚本。

| 你的操作 | 实际做了什么 |
| --- | --- |
| 导入新版合集 | 给商店增加可选的服务包版本 |
| 选择并应用新版服务包 | 更换 Ambari 管理服务所使用的说明和脚本 |
| 修改并保存配置 | 保存一个配置版本，之后还要按要求重新加载或重启 |
| 升级软件本身 | 需要按该服务的升级流程操作，包括可能涉及的数据库迁移 |
| 移除服务包 | 会先检查是否仍在使用，不等于删除机器上的软件和业务数据 |

例如，导入新版 Kyuubi 服务包，并不会自动替换机器上的 Kyuubi 软件。

更新前，先看变更说明和受影响的集群，保留当前配置，并按需要备份业务数据。不要认为切回旧服务包，就能撤销已经做过的数据库迁移。

## 几个常见问题 {#troubleshooting}

| 遇到的情况 | 下一步怎么做 |
| --- | --- |
| 找不到商店入口 | 用 Ambari 管理员账号登录，确认当前版本包含该功能；目前菜单叫**管理包** |
| 导入成功了，但机器上没有服务 | 回到服务目录，选择服务和集群，再完成安装向导 |
| 服务卡片不能勾选 | 先看卡片说明，更换为兼容的服务组合或安装位置 |
| 页面提示之前的预览已经过期 | 先确认上次提交已被拒绝，再核对当前选择并重新生成预览 |
| 某台机器安装失败 | 点开失败任务，按提示检查软件下载、Java/Python 版本、数据库连接、磁盘空间和权限 |
| 配置保存了，但没有变化 | 检查要求的重启或重新加载是否已经完成 |
| 服务包无法移除 | 查看哪些服务或集群还在使用，不要通过删文件绕过检查 |
| 服务在运行，但监控没有数据 | 检查[监控配置和查询时间范围](../monitoring/queries-and-dashboards.md#workspace-interactions)，安装服务不会自动接入它的所有指标 |

## 找人帮忙时，要提供什么？ {#report-evidence}

说明服务名称、Ambari 版本、服务包版本、刚才做了什么，并附上完整错误信息。商店操作的问题，附上详情里的操作编号；安装或服务运行的问题，附上失败的机器和任务编号。

配置问题再补充相关改动和配置版本。文字和截图里的密码、Token、数据库密钥等凭据请先去掉。

如果你在开发自动化恢复工具，具体命令和返回字段放在[开发者：API 与服务接入](./authoring-and-bundling.md#operation-recovery-api)中。
