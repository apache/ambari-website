---
title: 服务商店
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

# 服务商店 {#mpack-store-overview}

想让 Ambari 帮你管理 Nginx、PostgreSQL、Kyuubi 等服务？先导入一个服务包合集，再勾选需要的服务，跟着安装向导操作就行。装好后，就能在服务页面启停服务、修改配置、检查运行情况。

使用商店不需要写脚本，也不需要调用 API。

:::info 使用前确认一下
这里介绍的是 3.1 预览版中的服务商店，你的 Ambari 需要包含这项功能。服务包合集可以向提供 Ambari 安装版本的人获取。需要核对兼容版本时，再看[版本说明](../release-baseline.md#runtime-mpack-follow-up)。
:::

## 能装哪些服务？ {#store-contents}

目前的示例商店提供十种服务：

| 你想做什么 | 可以考虑的服务 |
| --- | --- |
| 提供网页访问或转发请求 | Nginx |
| 运行关系型数据库 | PostgreSQL |
| 为 Spark 提供统一的 SQL 入口 | Kyuubi |
| 调度数据任务 | Airflow、DolphinScheduler |
| 为计算任务提供 Shuffle 存储 | Celeborn |
| 跨数据源执行查询 | Trino |
| 做数据分析 | Doris |
| 搜索和索引数据 | Elasticsearch |
| 通过兼容 S3 的接口存储对象 | MinIO |

可以先看[可选服务和安装准备](./service-catalog.md)。不同服务的要求不一样，有些需要先准备数据库，有些需要特定的 Java 版本。

## 怎么开始？ {#end-to-end-flow}

1. **导入服务包合集。** 导入后，商店里就能看到可以选择的服务。
2. **勾选需要的服务。** 想用哪个就选哪个，不会因为导入了合集就全部安装。
3. **选择集群和机器。** 可以加到兼容的已有集群，也可以新建集群。
4. **填写配置并安装。** 等安装、启动完成，再运行一次服务检查。

比如要安装 Nginx：导入合集，勾选 Nginx，选择装到哪里，分配一台机器，然后按向导完成安装。具体点击步骤见[安装服务](./store-guide.md)。

服务包合集告诉 Ambari“这些服务怎么装、怎么管”。安装时通常还要下载真正的软件。如果机器不能访问外网，需要先让管理员准备好软件源。

## 从哪里进入？ {#administration-and-scope}

用 Ambari 管理员账号登录，在集群页面左侧菜单的上方，点击**管理包**。英文界面显示为 **Management Packs**。本系列文档把这项功能称为**服务商店**，目前控制台里的菜单名称还没有改。

如果你在集群列表页，可以从顶部导航进入。用完后，点击**返回工作区**，就能回到刚才的集群页面。

同一个 Ambari Server 下的集群共用这家商店。更新服务包时，先看页面列出的影响范围，确认会涉及哪些集群。

## 接下来读哪篇？ {#reading-paths}

- [安装服务](./store-guide.md)：从导入到完成安装，一步步操作。
- [可选服务和安装准备](./service-catalog.md)：看看服务能做什么、安装前要准备什么。
- [修改配置](./content-configuration.md)：修改文件、保存配置，并让它生效。
- [常见问题与更新](./operations-and-recovery.md)：出问题后该去哪里看，更新时该注意什么。
- [一步步给商店添加新服务](./add-service-tutorial.md)：跟着完整示例，完成打包、导入和测试。
- [开发者：API 与服务接入](./authoring-and-bundling.md)：需要写工具或增加服务时再读。
- [开发者：服务商店如何工作](./implementation.md)：介绍背后的基本设计。

## 现在支持到什么程度？ {#current-boundaries}

首版主要解决安装、配置、启停和基本健康检查。不要默认它已经支持高可用、自动故障切换或自动升级软件。参考测试环境是 Rocky Linux 8、ARM64；使用其他平台前，要先核对服务要求。

安装服务也不会自动增加对应的监控图表。监控页面的用法见[监控指南](../monitoring/queries-and-dashboards.md#workspace-interactions)。
