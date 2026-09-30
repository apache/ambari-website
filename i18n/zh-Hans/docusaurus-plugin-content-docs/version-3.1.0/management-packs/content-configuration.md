---
title: 修改配置
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

# 修改配置 {#edit-complete-configuration-files}

你可以直接在 Ambari 里编辑服务的配置文件，不必等页面为每个参数增加一个输入框。比如，完整修改 Nginx 配置，或者给 Kyuubi 增加一个新参数。

## 在哪里修改？ {#files-and-basic-settings}

打开服务，进入 **Configs（配置）→ 配置文件**，找到要改的文件，直接编辑其中的文字。安装路径、连接信息、密码等内容，可以在**基本设置**里修改。

![在 Ambari 中编辑 Doris 配置文件](@site/static/img/3.1.0/mpack-store/configuration-files-dark.jpg)

目前的编辑器是多行文本框，不会检查所有软件的每一个参数是否正确。

| 服务 | 可以编辑的文件举例 |
| --- | --- |
| PostgreSQL | `postgresql.conf`、`pg_hba.conf`、`pg_ident.conf` |
| Nginx | `nginx.conf` |
| Kyuubi | `kyuubi-defaults.conf`、环境设置、`log4j2.properties` |
| Trino | `config.properties`、`node.properties`、`log.properties`、`jvm.config`、数据源目录文件 |
| Doris | `fe.conf`、`be.conf` |
| Elasticsearch | `elasticsearch.yml`、JVM 选项、`log4j2.properties` |
| MinIO | `minio.env` |
| Airflow | `airflow.cfg`、`webserver_config.py` |
| Celeborn | `celeborn-defaults.conf`、环境设置、`log4j2.properties` |
| DolphinScheduler | 各角色的 `application.properties`、`common.properties`、日志和 JVM 设置 |

## 改完之后怎么生效？ {#editing-workflow}

1. 先确认服务和配置组没有选错。
2. 修改文件内容，保留已有的模板占位符和必需的引用。
3. 保存，并写一句修改原因，方便以后回看。
4. 按页面提示重启服务；如果服务支持重新加载，也可以使用对应命令。
5. 查看任务结果，再运行一次服务检查。

**保存成功不等于配置已经生效。** 保存只是让 Ambari 记住了这个配置版本，运行中的服务还需要重新加载它。

修改配置组时还要注意：整份文件的覆盖会替换该组的整个文件，不是只覆盖其中一行。

## 文件里的占位符要不要改？ {#managed-values-and-formats}

端口、安装路径、数据目录等值，有些来自**基本设置**，文件里会用占位符引用它们。除非服务说明要求修改，否则请保留。两处填写相互冲突的值，可能导致服务无法启动。

内容按软件原本的文件格式填写。环境文件可以写变量赋值，不适合放任意 Shell 命令。

## 已经装好的服务怎么办？ {#existing-installations}

如果已经保存过完整配置文件，更新服务包不会用新包的默认配置覆盖你的修改。上游软件增加了参数时，可以继续往现有文件里补充。

部分旧配置可以根据之前表单里保存的值生成文件内容，保存前要检查一遍。密码字段和配置组中的覆盖值需要单独处理，并不是所有旧配置都会自动转换。

较早安装的 Nginx、PostgreSQL，可能有人直接在机器上改过文件。Ambari 不会自动把这些文件读回编辑器。保存和应用前，要把机器上的实际配置与页面内容核对一下。

## 例子：给 Nginx 增加一个访问路径 {#nginx-example}

在已有的 server 段里增加：

~~~nginx
location /docs-check {
    return 200 "managed configuration\n";
}
~~~

保留文件里的其他内容，包括 `conf.d` 下已有的健康检查引用。保存后，如果组件提供 `RELOAD` 命令，就用它重新加载，再访问服务地址下新增的路径，确认返回内容。

服务包会先运行 `nginx -t` 检查新配置，再替换主配置文件。如果检查失败，先点开任务详情修正内容，不要反复重启。

## 例子：修改 PostgreSQL 内存参数 {#postgresql-example}

找到已有参数并修改，避免再加一条相互冲突的设置：

~~~properties
work_mem = '8MB'
~~~

保存并按要求重启后，连接 PostgreSQL 检查：

~~~sql
SHOW work_mem;
~~~

保留原有路径、端口占位符和本机管理访问规则。修改数据目录的设置，不会自动搬迁已有数据库。

## 改完出问题了怎么办？ {#validation-and-recovery}

点开失败任务，找到它指出的文件或参数。修正后保存新版本，再应用一次。需要退回时，以之前确认可用的配置为基础恢复，并检查执行结果。

Nginx 和 PostgreSQL 会在替换前检查配置，并保留之前的文件用于恢复。这有助于处理配置变更失败，但不能恢复数据库数据，也不能撤销数据迁移。

安装失败、商店操作中断等其他情况，见[常见问题与更新](./operations-and-recovery.md)。
