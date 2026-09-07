---
title: 为主机添加仪表板小组件的分步指南
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

# 为主机添加仪表板小组件的分步指南 {#step-by-step-guide-on-adding-a-dashboard-widget-for-a-host}

## 为主机创建自己的仪表板小组件 {#create-your-own-dashboard-widget-for-hosts}

要求：

- Jmxtrans
    - Jmxtrans 是用于编译 rrd 文件、从而在 Ganglia 上生成图形数据的应用程序。
https://github.com/jmxtrans/jmxtrans
- .rrd 文件
    - 所有 Ganglia rrd 文件都存储在安装 Ganglia Server 的主机上的 /var/lib/rrds 目录中。
    - 本例将使用“**Nimbus_JVM_Memory_Heap_used.rrd**”文件作为自定义小组件的数据。

**步骤 1**：

首先，需要将 rrd 文件添加到位于 Ambari 源代码 `ambari\ambari-server\src\main\resources` 目录中的“**ganglia_properties.json**”文件。这是为了让 Ambari-server 能够通过 Ambari API 从 Ganglia 调用 rrd 文件。

![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/imgs/step1.png "step1")

第 108 行：创建要包含在 API 中的指标路径。

第 109 行：指定 rrd 文件。

**步骤 2**：

现在，将步骤 1 第 108 行创建的 API 路径添加到位于 `ambari\ambari-web\app\controllers\global` 目录中的“**update_controller.js**”文件，以便图形数据能够频繁更新。

![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/imgs/step2.png "step2")

**步骤 3**：

为自定义小组件模板的视图创建 JavaScript 文件，并将其保存到 Ambari 源代码的 `ambari\ambari-web\app\views\main\host\metrics` 目录中。本例将文件保存为“**nimbus.js**”。

![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/imgs/step3.png "step3")

**步骤 4**：

将上一步创建的 JavaScript 文件添加到位于 `ambari\ambari-web\app` 目录中的“**views.js**”文件。

![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/imgs/step4.png "step4")

**步骤 5**：

将步骤 3 创建的 .js 文件视图添加到位于 `ambari\ambari-web\app\templates\main\host` 目录中的“**metrics.hbs**”模板文件。

![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/imgs/step5.png "step5")

**步骤 6**：

将 API 调用添加到位于 `ambari\ambari-web\app\utils` 目录中的“**ajax.js**”文件。

![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/imgs/step6.png "step6")
