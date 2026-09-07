---
title: Ambari 告警
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
--->

# Ambari 告警 {#ambari-alerts}

Ambari 中定义的告警帮助页面。

## Ambari Agent 心跳 {#ambari-agent-heartbeat}

**服务**：Ambari
**组件**：Ambari Server
**类型**：SERVER
**组**：AMBARI Default
**描述**：如果服务器失去与代理的联系，则会触发此告警。

如果生成此告警，告警文本将包含主机名（例如 c6401.ambari.apache.org is not sending heartbeats.）。请检查代理是否正在运行；如果正在运行，请查看日志末尾，确认它是否正在接收服务器的心跳响应。检查 /etc/ambari-agent/conf/ambari-agent.ini 文件中的服务器主机名是否正确且可访问。
