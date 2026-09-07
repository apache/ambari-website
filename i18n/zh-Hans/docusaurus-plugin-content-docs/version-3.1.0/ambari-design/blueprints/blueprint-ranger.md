---
title: Blueprint 对 Ranger 的支持
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

# Blueprint 对 Ranger 的支持 {#blueprint-support-for-ranger}

## Stack Advisor 工作流 {#ranger-stack-advisor-workflow}

使用已安装的 BIGTOP Ranger Stack 和 Stack Advisor 填充派生的 Ranger 及插件设置。Blueprint 或集群模板仍必须提供无法推断的必需值，尤其是数据库连接和管理员凭据。不要将凭据写入文档或受源代码管理的 Blueprint 示例。

对于 Ranger Admin，检查 `admin-properties`：`DB_FLAVOR`、`db_host`、`db_root_user`、`db_root_password`、`db_password` 和 `audit_db_password`。所选数据库要求 Ambari Server 上存在匹配的 JDBC 驱动。

对于 Ranger 插件，检查 `ranger-env`，包括 `ranger_admin_password` 以及 `ranger-yarn-plugin-enabled`、`ranger-hdfs-plugin-enabled` 和 `ranger-hbase-plugin-enabled` 等插件启用属性。只启用已部署服务所需的插件。

对于 Ranger KMS，检查 `kms-properties` 和 KMS 服务配置。必需字段包括数据库类型、连接器 JAR、主密钥密码、数据库主机和数据库凭据。使用所选 BIGTOP Stack 中对应的 `RANGER_KMS` 服务。

## 必需配置和顺序 {#ranger-required-configuration-and-order}

1. 确认所选 Stack 提供 Ranger、Ranger KMS 和所需插件配置类型。
2. 通过受保护的 Ambari 配置输入提供数据库主机/端口、数据库名称/用户及必需密码属性。
3. 在 Stack Advisor 评估数据库选择前，将 JDBC 驱动安装到 Ambari Server。
4. 明确设置插件启用状态，然后允许 Stack Advisor 生成依赖属性。
5. 检查建议配置，解决未设置的必需属性后再创建集群。

不使用 Stack Advisor 时，Ranger、Ranger KMS 以及已启用插件中没有有效默认值的每个属性，都必须在 Blueprint 或集群模板中显式提供。这在不同 Stack 版本之间更脆弱；建议使用 Advisor 配置并验证生成结果。

## 源码参考 {#ranger-source-references}

当前服务实现位于固定版本的 [BIGTOP Ranger Stack](https://github.com/apache/ambari/tree/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.3.0/services/RANGER)和 [Ranger service advisor](https://github.com/apache/ambari/blob/4e95d2e33493ac934d7d98a14a81d86c0f1bc0c4/ambari-server/src/main/resources/stacks/BIGTOP/3.3.0/services/RANGER/service_advisor.py)。应选择与已安装 BIGTOP 版本（3.2.0、3.3.0 或 3.4.0）匹配的服务路径。
