---
title: 安装服务
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

# 安装服务 {#import-store-deploy-services}

这篇从拿到服务包合集开始，带你走到服务安装完成。可以先用 Nginx 熟悉流程，其他服务也按同样的步骤操作。

## 先准备这些 {#before-you-start}

- 一个 Ambari 管理员账号，以及包含[服务商店](./overview.md)功能的 Ambari 版本。
- 与该版本配套的服务包合集，文件通常叫 `mpackstore.bundle.tar.gz`。
- 已经加入 Ambari 的机器，以及这些机器能访问的软件源。
- 服务需要的前置条件，比如数据库地址、账号、Java 环境。具体看[安装准备清单](./service-catalog.md)。

不需要自己解压合集，也不需要往 Ambari 安装目录里复制脚本。

## 1. 打开商店 {#open-management-packs}

在集群页面，点击左侧菜单上方的**管理包**，英文界面显示为 **Management Packs**。如果在集群列表页，就从顶部导航进入。

服务目录用来选择要安装的服务。**已导入包**用来查看已经导入的内容，**操作记录**用来查看商店操作的进度。

![当前控制台中的服务选择和右侧选择面板](@site/static/img/3.1.0/mpack-store/catalog-dark.jpg)

截图使用中文界面和暗色模式，里面的机器名和版本号来自测试环境，仅作示例。

## 2. 导入服务包合集 {#import-the-bundle}

1. 点击**导入管理包**。
2. 选择 `mpackstore.bundle.tar.gz`，等待页面列出其中的服务包。
3. 确认内容后，点击**导入管理包**。
4. 在**操作记录**中等导入完成，再回到服务目录。

到这里，商店里已经有可选服务了，但机器上还没有安装软件。

如果文件被拒绝，先确认选的是服务包合集，而不是某个软件的大型安装压缩包。默认上传上限是 256 MiB。仍然导入不了时，联系提供合集的人确认文件是否正确。

## 3. 勾选要安装的服务 {#select-one-version}

搜索服务名称，勾选对应的卡片。右侧会显示已经选中的服务，不需要的可以在那里移除。

如果有多个服务包版本，选择与你的 Ambari 配套、由提供者推荐的版本。这里的版本表示“安装和管理说明”的版本，不一定等于软件自身的版本。软件版本可以在[服务清单](./service-catalog.md)里核对。

有些服务不能装进同一个集群。如果卡片不可选，先看页面说明，再选择兼容的安装位置。更换搜索条件不会清空已经选中的服务。

## 4. 选择装到哪个集群 {#choose-a-destination}

在**部署位置**中选择兼容的已有集群，或者选择**新建集群**，然后点击**继续部署所选服务**。

Ambari 会先准备好所选服务的安装入口。如果页面要求确认维护或重启，先看清楚会影响哪些集群，再继续。

等这一步完成，点击**创建集群**或**向集群添加服务**，进入安装向导。服务“已启用”只是表示可以开始安装，还不代表已经在机器上运行了。

## 5. 跟着向导完成安装 {#complete-the-deployment}

1. 确认要安装的服务。
2. 给各个组件分配机器。
3. 填写必填配置，比如软件位置、数据库连接信息和密码。
4. 检查刚才的选择，开始安装。
5. 等安装和启动任务完成。如果失败，点开失败任务查看详情。
6. 打开服务页面，运行一次服务检查。

以 Nginx 为例，要确认分配的机器能访问软件源，选定的端口没有被占用。其他服务可能还需要额外准备。

服务装好、运行正常，并且服务检查通过后，这次安装才算完成。以后要改配置，进入服务的 **Configs（配置）** 页面，按[修改配置](./content-configuration.md)中的步骤操作。

## 页面关了或者报错了怎么办？ {#recover-without-duplicates}

先回到**操作记录**查看刚才的操作，不要急着重新提交。如果页面提供了核对上次提交结果的操作，先用它确认上次是否已经提交成功。

如果商店的准备步骤成功了，但某台机器安装失败，就去看安装任务，处理那台机器的问题。重复导入合集不会解决缺少 Java、数据库密码填错之类的问题。

下一步怎么处理，见[常见问题与更新](./operations-and-recovery.md)。
