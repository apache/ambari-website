---
title: 升级 Ambari Metrics 系统
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 升级 Ambari Metrics 系统 {#upgrading-ambari-metrics-system}

**从 Ambari 2.0 或 2.0.1 升级到 2.1**

1. 升级 ambari server 并执行所需的升级后检查。（确保所有服务都已启动并正在运行）
2. 停止 Ambari Metrics 服务
3. 在所有主机上执行以下命令。

  ```bash
   yum upgrade -y ambari-metrics-monitor  ambari-metrics-hadoop-sink
  ```
  （在 ubuntu 和 windows 上使用适当的软件包管理器）

4. 在运行指标收集器的主机上执行以下命令

     ```bash
     yum upgrade -y ambari-metrics-collector
     ```

5. 启动 Ambari Metrics 服务
6. Sink jar 将部署到每台主机，守护进程重启后会加载 Sink 实现的更改。（例如：HDFS Namenode / Datanode）
