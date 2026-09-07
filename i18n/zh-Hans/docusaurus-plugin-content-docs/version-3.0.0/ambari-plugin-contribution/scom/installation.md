---
title: 安装
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

# 安装 {#installation}

## 前提软件 {#prerequisite-software}

设置 Ambari SCOM 需要以下前提软件：

- Ambari SCOM 1.0
  - Apache Hadoop 1.x 集群（HDFS 和 MapReduce）1
- Ambari SCOM 2.0
  - Apache Hadoop 2.x 集群（HDFS 和 YARN/MapReduce）2
- JDK 1.7
- Microsoft SQL Server 2012
- Microsoft JDBC Driver 4.0 for SQL Server 3
- Microsoft System Center Operations Manager（SCOM）2012 SP1 或更高版本
- 安装在 **Watcher Node** 上的 System Center Monitoring Agent 4

1 _Ambari SCOM_ 1.0 已在基于 **Hortonworks Data Platform 1.3 for Windows** 的 Hadoop 集群上测试（“[HDP 1.3 for Windows](http://hortonworks.com/products/releases/hdp-1-3-for-windows/)”）。

2 _Ambari SCOM_ 2.0 已在基于 **Hortonworks Data Platform 2.1 for Windows** 的 Hadoop 集群上测试（“[HDP 2.1 for Windows](http://docs.hortonworks.com/HDPDocuments/HDP2/HDP-2.1-Win-latest/bk_installing_hdp_for_windows/content/win-getting-ready.html)”）。

3 从 [Microsoft JDBC Driver 4.0 for SQL Server](http://technet.microsoft.com/en-us/library/ms378749.aspx) 获取 JAR 文件（`sqljdbc4.jar`）。

4 请参阅 Microsoft TechNet 的[管理发现和代理](http://technet.microsoft.com/en-us/library/hh212772.aspx)主题。代理最低要求为 _.NET 4_ 和 _PowerShell 2.0 + 3.0_。

## 软件包内容 {#package-contents}

```
├─ ambari-scom- _**version**_.zip
├── README.md
├── server.zip
├── metrics-sink.zip
├── mp.zip
└── ambari-scom.msi
```

| 文件 | 名称 | 描述 |
| --- | --- | --- |
| server.zip | Server Package | 包含配置 Ambari SCOM Server 软件所需的软件。 |
| metrics-sink.zip | Metrics Sink Package | 包含手动配置 SQL Server 和 Hadoop Metrics Sink 所需的软件。 |
| ambari-scom.msi | MSI Installer | 用于配置 Ambari SCOM Server 和 Hadoop Metrics Sink 的 Ambari SCOM MSI 安装程序。 |
| mp.zip | Management Pack Package | 包含 Ambari SCOM Management Pack 软件。 |

## Ambari SCOM Server 安装 {#ambari-scom-server-installation}

:::caution **Ambari SCOM Management Pack** 必须连接到 Ambari SCOM Server 才能获取集群指标。因此，集群中必须运行 Ambari SCOM Server。如果已经使用 Ambari 安装 Hadoop 集群（包括 Ganglia Service，SCOM 2.0.0 至少需要 **Ambari 1.5.1**），并且已有 Ambari Server 运行并管理 Hadoop 1.x 集群，则可以使用该 Ambari Server，并让 **Management Pack** 指向该主机。可以直接继续[安装 Ambari SCOM Management Pack](#installing-ambari-scom-management-pack)，跳过安装 Ambari SCOM Server 的步骤。如果没有运行并管理集群的 Ambari Server，则**必须**使用以下方法之一安装 Ambari SCOM Server。:::

安装 Ambari SCOM Server 有以下方法：

- **手动安装** - 需要配置 SQL Server 数据库、设置 Ambari SCOM Server 并配置 Hadoop Metrics Sink。该方法可根据环境提供最灵活的安装选项。
- **MSI 安装** - 使用 MSI 安装程序在集群所有主机上自动安装 Ambari SCOM Server 并配置 Hadoop Metrics Sink。启动 MSI 后，提供 SQL Server 数据库和集群信息，由安装程序完成配置。

## 手动安装 {#manual-installation}

### 配置 SQL Server {#configuring-sql-server}

1. 将现有 SQL Server 实例配置为“混合模式”身份验证。
2. 确认 SQL Server 已安装并启用 TCP/IP。（默认端口：1433）
3. 创建用户和密码。请记住该用户和密码，它们将作为 Hadoop metrics interface 捕获指标时使用的帐户。（默认用户：sa）
4. 解压 `metrics-sink.zip` 软件包以获取 DDL 脚本。
5. 运行 `Hadoop-Metrics-SQLServer-CREATE.ddl` 脚本创建 Ambari SCOM 数据库架构。

:::info Hadoop Metrics DDL 脚本将创建名为 “HadoopMetrics” 的数据库。:::

### 配置 Hadoop Metrics Sink {#configuring-hadoop-metrics-sink}

#### 准备 Metrics Sink {#preparing-the-metrics-sink}

1. 解压 `metrics-sink.zip` 软件包以获取 `metrics-sink-<strong><em>version</em></strong>.jar` 文件。
2. 获取 _Microsoft JDBC Driver 4.0 for SQL Server_ 的 `sqljdbc4.jar` 文件。
3. 将 `sqljdbc4.jar` 和 `metrics-sink-version.jar` 复制到集群中的每台主机。例如，在每台主机上复制到 `C:\Ambari\metrics-sink-version.jar` 和 `C:\Ambari\sqljdbc4.jar`。

#### 设置 Hadoop Metrics2 接口 {#setup-hadoop-metrics2-interface}

1. 在集群每台主机上设置 Hadoop metrics2 接口，使其使用 `SQLServerSink`。

编辑 `hadoop-metrics2.properties` 文件（位于集群每台主机的 `<strong><em>{C:\hadoop\install\dir}</em></strong>\bin` 文件夹中）：

```
*.sink.sql.class=org.apache.hadoop.metrics2.sink.SqlServerSink

namenode.sink.sql.databaseUrl=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
datanode.sink.sql.databaseUrl=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
jobtracker.sink.sql.databaseUrl=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
tasktracker.sink.sql.databaseUrl=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
maptask.sink.sql.databaseUrl=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
reducetask.sink.sql.databaseUrl=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
```

:::info _其中：_
- _server = SQL Server 主机名_
- _port = SQL Server 端口（例如 1433）_
- _user = SQL Server 用户（例如 sa）_
- _password = SQL Server 密码（例如 BigData1）_ :::

1. 更新每个 Hadoop 服务的 Java 类路径，使其包含 `metrics-sink-<strong><em>version</em></strong>.jar` 和 `sqljdbc4.jar` 文件。
   - HDP for Windows 集群的 Java 类路径更新示例
     `service.xml` 文件位于集群每台主机的 `C:\hadoop\install\dir\bin` 文件夹中。每个服务的 Java 类路径在 `<arguments>` 元素的 `service.xml` 文件中指定。例如，要更新 `NameNode` 组件的 Java 类路径，请编辑 `C:\hadoop\bin\namenode.xml` 文件。
     ```
     ...

     ... -classpath ...;C:\Ambari\metrics-sink-1.5.1.2.0.0.0-673.jar;C:\Ambari\sqljdbc4.jar ...

     ...

     ```
2. 重启 Hadoop 使这些更改生效。

#### 验证指标收集 {#verify-metrics-collection}

1. 查询 `MetricRecord` 表，确认指标已捕获到 SQL Server 数据库中：

```sql
select * from HadoopMetrics.dbo.MetricRecord
```

:::info 上述 SQL 语句中的 `HadoopMetrics` 是数据库名称。:::

### 安装和配置 Ambari SCOM Server {#installing-and-configuring-ambari-scom-server}

#### 运行 Server {#running-the-server}

1. 指定集群中的一台机器运行 Ambari SCOM Server。
2. 解压 `server.zip` 软件包以获取 Ambari SCOM Server 软件包。

```
├── ambari-scom-server- **_version_**-conf.zip
├── ambari-scom-server- **_version_**-lib.zip
└── ambari-scom-server- **_version_**.jar
```

3. 解压 `ambari-scom-server-version-lib.zip` 软件包以获取 Ambari SCOM 依赖项。
4. 解压 `ambari-scom-server-version-conf.zip` 软件包以获取 Ambari SCOM 配置文件。
5. 在配置文件中编辑 `ambari.properties` 文件：

```
scom.sink.db.driver=com.microsoft.sqlserver.jdbc.SQLServerDriver
scom.sink.db.url=jdbc:sqlserver://[server]:[port];databaseName=HadoopMetrics;user=[user];password=[password]
```

:::info _其中：_
- _server = SQL Server 主机名_
- _port = SQL Server 端口（例如 1433）_
- _user = SQL Server 用户（例如 sa）_
- _password = SQL Server 密码（例如 BigData1）_ :::

6. 在 Java 命令行中运行 `org.apache.ambari.scom.AmbariServer` 类，启动 Ambari SCOM Server。

:::info 确保类路径包含：
- `ambari-scom-server-version.jar` 文件
- 包含 Ambari SCOM 配置文件的 configuration 文件夹
- 包含 Ambari SCOM 依赖项的 lib 文件夹
- Hadoop 安装中包含 `clusterproperties.txt` 文件的文件夹，例如 `c:\hadoop\install\dir`
- `sqljdbc4.jar` SQLServer JDBC Driver 文件 ::

例如：

```bash
java -server -XX:NewRatio=3 -XX:+UseConcMarkSweepGC -XX:-UseGCOverheadLimit -XX:CMSInitiatingOccupancyFraction=60 -Xms512m -Xmx2048m -cp "c:\ambari-scom\server\conf;c:\ambari-scom\server\lib\*;c:\jdbc\sqljdbc4.jar;c:\hadoop\install\dir;c:\ambari-scom\server\ambari-scom-server-1.5.1.2.0.0.0-673.jar" org.apache.ambari.scom.AmbariServer
```

:::info 在上述命令中，务必替换 `ambari-scom-server-version.jar` 中的 Ambari SCOM 版本，并将 `c:\hadoop\install\dir` 替换为包含 `clusterproperties.txt` 文件的文件夹。:::

#### 验证 Server API {#verify-the-server-api}

1. 在浏览器中访问 API：
```
http://[ambari-scom-server]:8080/api/v1/clusters
```
2. 验证指标正在报告。
```
http://[ambari-scom-server]:8080/api/v1/clusters/ambari/services/HDFS/components/NAMENODE
```

## MSI 安装 {#msi-installation}

### 配置 SQL Server {#configuring-sql-server-1}

1. 将现有 SQL Server 实例配置为“混合模式”身份验证。
2. 确认 SQL Server 已安装并启用 TCP/IP。（默认端口：1433）
3. 创建用户和密码。（默认用户：sa）

### 运行 MSI 安装程序 {#running-the-msi-installer}

1. 指定集群中的一台机器运行 Ambari SCOM Server。
2. 解压 `server.zip` 软件包以获取 Ambari SCOM Server 软件包。
3. 运行 `ambari-scom.msi` 安装程序。此时会显示 “Ambari SCOM Setup” 对话框：

   ![](@site/versioned_docs/version-3.0.0/ambari-plugin-contribution/scom/imgs/ambari-scom-msi2.png)

4. 提供以下信息：

| 字段 | 描述 |
| --- | --- |
| Ambari SCOM package directory | 安装程序放置 Ambari SCOM Server 软件包的目录，例如：C:\Ambari |
| SQL Server hostname | Ambari SCOM Server 用于存储 Hadoop 指标的 SQL Server 实例主机名。 |
| SQL Server port | SQL Server 实例的端口。 |
| SQL Server login | 登录用户名。 |
| SQL Server password | 登录密码。 |
| Path to SQL Server JDBC Driver (sqljdbc4.jar) | JDBC Driver JAR 文件路径。 |
| Path to the cluster layout file (clusterproperties.txt) | 集群布局属性文件路径。 |

5. 可以选择 Start Services。
6. 单击 Install。
7. 完成后，桌面会创建 “Start Ambari SCOM Server”、“Browse Ambari API” 和 “Browse Ambari API Metrics” 链接。启动 Ambari SCOM Server 后，浏览 API 和 Metrics，确认服务器正常工作。

:::info MSI 安装程序日志位于 `C:\AmbariInstallFiles\AmbariSetupTools\ambari.winpkg.install.log`。:::

### 安装 Ambari SCOM Management Pack {#installing-ambari-scom-management-pack}

:::info 安装 Management Pack 前，务必按照 Ambari SCOM Server 安装说明安装 Ambari SCOM Server。:::

#### 导入 Management Pack {#import-the-management-pack}

执行以下步骤，将 Ambari SCOM Management Pack 导入 System Center Operations Manager。

1. 解压 `mp.zip` 软件包以获取 Ambari SCOM management pack（`.mpb`）文件。
2. 确保 Windows Server 2012 正在运行带 SQL Server（全文搜索）的 SCOM。
3. 打开 System Center Operations Manager。
4. 转到 Administration -> Management Packs。
5. 在 Tasks 面板中选择 Import Management Packs...
6. 在 Import Management Packs 对话框中选择 Add -> Add from disk...
7. 系统会提示搜索 Online Catalog。单击 “No”。
8. 浏览 Ambari SCOM management pack 文件。
9. 选择以下文件：

```
Ambari.SCOM.Monitoring.mpb
Ambari.SCOM.Management.mpb
Ambari.SCOM.Presentation.mpb
```

10. 单击 “Open”。
11. 查看 Import 列表并单击 “Install”。
12. Ambari SCOM Management Pack 安装将开始。

:::info Ambari SCOM 软件包还包括 `AmbariSCOMManagementPack.msi`，它是 `mp.zip` 的另一种打包形式。此版本中该 MSI 以 **beta** 形式提供。:::

#### 创建 Run As 帐户 {#create-run-as-account}

执行以下步骤，配置 Ambari SCOM Management Pack 与 Ambari SCOM Server 通信时使用的帐户。

1. Management Pack 导入完成后，转到 Administration -> Run As Configuration -> Accounts。
2. 在 Tasks 面板中选择 “Create Run as Account...”。
3. 此时会显示 Create Run As Account Wizard。
4. 完成向导，在 Run As account type 中选择 “Basic Authentication”。
5. 输入帐户显示名称并单击 “Next”。
6. 输入 Ambari SCOM Server 的帐户名和密码。此帐户用于连接 Ambari SCOM Server 并访问 Ambari REST API。默认帐户名和密码为预设值。
7. 单击 “Next”。
8. 选择 “Less secure” 分发安全选项。
9. 单击 “Next” 并完成向导。

#### 配置 Management Pack {#configure-the-management-pack}

执行以下步骤，配置 Ambari SCOM Management Pack 与 Ambari SCOM Server 通信。

1. 转到 Authoring -> Management Pack Templates -> Ambari SCOM。
2. 在 Tasks 面板中选择 “Add Monitoring Wizard”。
3. 选择监控类型 “Ambari SCOM”。
4. 提供名称并选择目标 management pack。
5. 按以下格式提供 Ambari URI，即 Ambari SCOM Server 的地址：

```
http://[ambari-scom-server]:8080/api/
```

:::info 上述 Ambari URI 中，`ambari-scom-server` 是 Ambari SCOM Server。:::

6. 选择在“创建 Run As 帐户”中创建的 Run As Account。
7. 选择 “Watcher Node”。如果节点未列出，单击 “Add” 并浏览选择节点，然后单击 “Next”。
8. 完成 Add Monitoring Wizard，然后继续阅读 Monitoring Scenarios，了解 management pack 的使用方法。

#### 最佳实践：为自定义设置创建 Management Pack {#best-practice-create-management-pack-for-customizations}

默认情况下，Operations Manager 会将 overrides 等所有自定义设置保存到 **Default Management Pack**。最佳实践是为要自定义的每个 sealed management pack 创建单独的 management pack。

创建用于存储 sealed management pack 自定义设置的 management pack 时，建议根据被自定义的 management pack 名称命名，例如 **Ambari SCOM Customizations**。

为每个 sealed management pack 创建用于存储自定义设置的新 management pack，可以更轻松地将自定义设置从测试环境导出到生产环境，也更便于删除 management pack，因为删除 management pack 前必须删除所有依赖项。如果所有 management pack 的自定义设置都保存到 **Default Management Pack**，而需要删除单个 management pack，则必须先删除 **Default Management Pack**，这也会删除其他 management pack 的自定义设置。

## 监控场景 {#monitoring-scenarios}

[监控场景](https://cwiki.apache.org/confluence/display/AMBARI/3.+Monitoring+Scenarios)
