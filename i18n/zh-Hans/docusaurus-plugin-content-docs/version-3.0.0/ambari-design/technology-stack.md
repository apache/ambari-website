---
sidebar_position: 1
title: 技术栈
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# 技术栈 {#technology-stack}

## Ambari Server {#ambari-server}

- 服务端代码：Java 1.7 / 1.8
- Agent 脚本：Python
- 数据库：Postgres、Oracle、MySQL
- ORM：EclipseLink
- 安全：Spring Security，集成远程 LDAP 和本地数据库
- REST 服务端：Jersey (JAX-RS)
- 依赖注入：Guice
- 单元测试：JUnit
- Mock：EasyMock
- 配置管理：Python

## Ambari Web {#ambari-web}

- 前端代码：JavaScript
- 客户端 MVC 框架：Ember.js / AngularJS
- 模板：Handlebars.js（与 Ember.js 集成）
- DOM 操作：jQuery
- 外观与交互：Bootstrap 2
- CSS 预处理器：LESS
- 单元测试：Mocha
- Mock：Sinon.js
- 应用组装器/测试器：Brunch / Grunt / Gulp
