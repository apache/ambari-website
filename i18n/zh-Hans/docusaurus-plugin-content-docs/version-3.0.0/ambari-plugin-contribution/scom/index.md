---
title: Ambari SCOM 管理包
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

# Ambari SCOM 管理包 {#ambari-scom-management-pack}

此信息面向希望使用 **Ambari SCOM 管理包**监控 Hadoop 集群的 **Apache Hadoop** 和 **Microsoft System Center Operations Manager** 用户。

## 简介 {#introduction}

Ambari SCOM 管理包扩展了 Microsoft System Center Operations Manager 的功能，用于监控 Apache Hadoop 集群。它利用 Ambari 和 Ambari REST API 获取 Hadoop 指标，并提供全面的监控能力。

### 兼容性 {#compatibility}

Ambari SCOM 管理包与以下版本兼容：

| Ambari SCOM 版本 | 兼容的 Ambari Server 版本 | 备注 |
|-----------------|------------------------|------|
| 3.0.0 | 3.0.0 | 指标收集功能改进的最新版本 |
| 2.0.0 | 1.5.1+ | 旧版支持 |
| 1.0.0 | 1.4.4 | 旧版支持 |

> **注意：** 为获得最佳体验，建议使用版本匹配的 Ambari Server 和 Ambari SCOM 管理包。

### 源代码 {#source-code}

Ambari SCOM 贡献位于 Apache Ambari 项目仓库中：

- [GitHub：apache/ambari/contrib/ambari-scom](https://github.com/apache/ambari/tree/trunk/contrib/ambari-scom)

## 功能 {#features}

Ambari SCOM 管理包提供以下主要功能：

- **自动发现**：自动发现 Hadoop 集群中的所有节点
- **主动监控**：持续监控 Hadoop 服务的可用性和容量
- **运行状况通知**：运行状况严重时主动通知管理员
- **直观的仪表板**：通过综合仪表板高效展示 Hadoop 集群的运行状况
- **详细指标**：收集并显示所有 Hadoop 组件的详细指标

![Ambari SCOM 仪表板](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/scom/imgs/ambari-scom.jpg)

## 架构 {#architecture}

Ambari SCOM 由以下组件组成：

1. **Ambari Server**：从 Hadoop 集群收集指标
2. **SCOM Management Server**：处理并存储监控数据
3. **SCOM Console**：提供监控和告警用户界面
4. **Ambari SCOM 管理包**：连接 Ambari 与 SCOM，并定义监控规则

## 开始使用 {#getting-started}

开始使用 Ambari SCOM 管理包：

1. 确保拥有正常运行的 Ambari Server（版本 3.0.0 或兼容版本）
2. 安装 Microsoft System Center Operations Manager
3. 按照[安装指南](./installation)安装管理包
4. 配置必要的 Run As 帐户和发现规则

## 其他资源 {#additional-resources}

以下链接提供了与 System Center 管理包相关的常见任务信息：

- [管理管理包生命周期](http://go.microsoft.com/fwlink/?LinkId=211463)
- [在 Operations Manager 中导入管理包](http://go.microsoft.com/fwlink/?LinkID=142351)
- [使用替代项进行监控](http://go.microsoft.com/fwlink/?LinkID=117777)
- [在 Operations Manager 中创建 Run As 帐户](http://technet.microsoft.com/en-us/library/hh321655.aspx)
- [Microsoft System Center 文档](https://docs.microsoft.com/en-us/system-center/scom/)

有关 Operations Manager 和监控包的问题，请访问 [Microsoft Q&A for System Center](https://docs.microsoft.com/en-us/answers/topics/system-center-operations-manager.html) 或 [System Center 博客](https://techcommunity.microsoft.com/t5/system-center-blog/bg-p/SystemCenterBlog)。
