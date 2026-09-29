---
title: 导入商店并部署服务
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

# 导入商店并部署服务 {#import-store-deploy-services}

本流程使用[运行时 mpack 预览实现](./overview.md)。从与开发构建配套的分发方取得审核过的 bundle，或[通过参考仓库自行打包](./authoring-and-bundling.md)。

## 开始前的准备 {#before-you-start}

需要管理员账号、已启用的运行时 mpack API、匹配的 Server/Agent 构建，以及可核对摘要的 bundle。为计划选择的服务准备可访问的软件来源、所需数据库、Java/Python 运行时、可写数据目录和可用端口。分配主机前先阅读[服务矩阵](./service-catalog.md)。

替换已启用定义前，记录当前包版本、受影响集群配置和数据备份安排。服务定义归档不能替代数据备份。

## 找到管理包入口 {#open-management-packs}

在集群工作区，从侧栏上方进入**管理包**，位置在 Ambari 品牌与全局集群入口下方。已经进入全局目录时，使用顶部导航中的**管理包**。

页面分为**服务目录**、**已导入包**和**操作记录**。浏览目录时，右侧保留已选服务面板。**返回工作区**可恢复之前离开的集群页面及其 URL 参数。

![按服务聚合的管理包目录，包含版本选择、已选清单和返回工作区入口](@site/static/img/3.1.0/mpack-store/catalog-dark.jpg)

这张开发环境截图使用中文界面和暗色外观。其中主机名、数量和版本是截图时的测试环境数据。

## 导入完整 Bundle {#import-the-bundle}

1. 点击**导入管理包**，打开上传对话框。
2. 选择 `mpackstore.bundle.tar.gz`，等待检查并识别成员包。
3. 核对成员后执行**导入管理包**。完整商店导入会包含检查到的全部成员。
4. 在**操作记录**中查看进度。浏览器或网络断开时，保留操作 ID。
5. 导入成功后返回**服务目录**。

导入只登记管理包，不绑定服务定义、不执行激活 hook，也不向主机部署软件。默认上传协议限制为压缩后 256 MiB、展开后 1 GiB、最多 100,000 个条目；实际限制应以所用 Server 构建为准。

离线安装应按各服务要求准备软件仓库和缓存，不要仅为了离线安装就把数 GB 的软件发行包塞进商店 bundle。

## 每项服务选择一个版本 {#select-one-version}

可以按服务或包搜索，也可以使用环境选择器缩小范围。目录按服务和准确的 Stack 上下文聚合，同组历史版本放进一个选择器，不再重复铺满页面。

默认优先选用当前已启用的定义。其他数字型定义版本按版本排序，但版本号更大并不代表已验证兼容或支持升级运行时软件。切换前应阅读该管理包的发布说明。

勾选服务后，它会进入**已选服务**面板。切换版本会替换该组已选择的提供方。右侧显示准确的管理包发布版本，而不只是软件名称；不需要的服务也可以在这里移除。

与当前选择或部署目标不兼容的服务会禁用并显示原因。清空或调整选择后，可以切换到另一种环境。筛选目录不会自动移除已选服务。

## 选择部署目标 {#choose-a-destination}

在**部署位置**中选择**新建集群**或兼容的已有集群，然后点击**继续部署所选服务**。

Server 会解析必需的提供方和绑定。计划可能要求确认维护或重启，应检查受影响集群和相应要求。简单的启用操作可以不额外弹出确认框直接继续；两种路径都会生成持久化操作。

**定义已启用**表示管理定义已经可用，不等于主机上已经安装并运行了服务。

## 完成部署向导 {#complete-the-deployment}

启用操作经验证成功后，使用页面提供的**创建集群**或**添加服务到集群**入口。在向导中：

1. 核对所选服务及依赖。
2. 把组件分配到满足要求的主机。
3. 填写必要的凭据、数据库地址、软件位置和配置。
4. 复核分配结果并开始安装。
5. 检查安装、启动任务和服务检查，再进入服务 Summary 与 Configs 页面。

安装任务失败与管理包操作失败应分别处理。操作 ID 和部署请求、任务 ID 属于不同流程，排查问题时应同时保留。

## 恢复时避免重复提交 {#recover-without-duplicates}

如果无法确定提交是否被接受，使用页面的核对恢复入口。它会复用已保留的计划与提交身份，不会把超时直接当作“什么都没发生”。

如果计划过期或输入改变，并且已明确拒绝接受，应重新预览。如果操作在等待任务或维护，先检查准确的阻塞项，再决定如何重试。主机安装失败时，不要通过反复上传同一个 bundle 来恢复。

各阶段含义、CLI 查询方法和恢复限制见[操作与恢复](./operations-and-recovery.md)。
