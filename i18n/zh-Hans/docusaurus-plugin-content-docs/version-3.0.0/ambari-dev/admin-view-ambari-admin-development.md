---
title: Admin View（ambari-admin）开发
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# Admin View（ambari-admin）开发 {#admin-view-ambari-admin-development}

## 前端开发 {#frontend-development}

按照此处说明简化 Admin View（ambari-admin 模块）的前端开发：

1. 按照快速入门指南安装并启动 Ambari Server（无需部署集群）。
2. 按照快速入门指南中的“前端开发”部分，使用 git 检出 Ambari 源代码。这会使整个 Ambari 源代码通过 Vagrant VM 中的 /vagrant/ambari 可用。
3. 在 Ambari Server 主机上：

     ```bash
     cd /var/lib/ambari-server/resources/views/work  <- if this directory does not exist, you have      not started ambari-server; run "ambari-server start" to start it
     mv ADMIN_VIEW\{2.5.0.0\} /tmp
     ln -s /vagrant/ambari/ambari-admin/src/main/resources/ui/admin-web/dist ADMIN_VIEW\{2.5.0.0\}
     cp /tmp/ADMIN_VIEW\{2.5.0.0\}/view.xml ADMIN_VIEW\{2.5.0.0\}/ 
     ambari-server restart
     ```

4. 现在可以修改 Admin View 源代码并在本地运行 gulp，更改会自动反映到服务器上。

## 功能测试 {#functional-tests}

要在浏览器上运行端到端功能测试，请执行：

npm run update-webdriver
npm start（此命令在 8000 端口启动 HTTP 服务器）

在同一路径打开另一个终端并执行：npm run protractor（在浏览器中执行 e2e 测试。此库基于 selenium jar 运行）。

## 单元测试 {#unit-tests}

运行单元测试：

转到路径：`/ambari/ambari-admin/src/main/resources/ui/admin-web`
执行 npm run test-single-run（此命令使用 PhantomJS 无头浏览器；与 ambari-web 单元测试使用的相同）

注意：
“npm test”命令在 [http://localhost:9876/](http://localhost:9876/) 启动 karma 服务器并运行单元测试。该服务器会持续运行，自动重新加载测试代码中的任何更改并重新运行测试。在开发单元测试时这非常有用。
