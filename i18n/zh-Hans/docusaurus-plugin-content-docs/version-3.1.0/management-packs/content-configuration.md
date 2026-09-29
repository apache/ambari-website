---
title: 编辑完整配置文件
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

# 编辑完整配置文件 {#edit-complete-configuration-files}

参考服务包优先使用 `content` 属性管理完整的原生配置文档。这样可以保留应用选项、注释和上游新增设置，不必等每个设置都有独立表单字段。对旧安装使用该流程前，先确认[预览范围](./overview.md)。

## 配置文件与基本设置 {#files-and-basic-settings}

打开服务的 **Configs** 页面。这些包默认进入 **Configuration Files**；**Basic Settings** 保留安装输入、管理身份、监听设置、凭据和管理操作参数。页面不会为了凑一个标签而展示空的 Advanced 页签。

| 服务 | 参考包提供的配置文档 |
| --- | --- |
| PostgreSQL | `postgresql.conf`、`pg_hba.conf`、`pg_ident.conf` |
| Nginx | `nginx.conf` |
| Kyuubi | `kyuubi-defaults.conf`、环境变量赋值、`log4j2.properties` |
| Trino | `config.properties`、`node.properties`、`log.properties`、`jvm.config`、catalog 文档 |
| Doris | `fe.conf` 与 `be.conf` |
| Elasticsearch | `elasticsearch.yml`、JVM 选项、`log4j2.properties` |
| MinIO | `minio.env` 赋值 |
| Airflow | `airflow.cfg` 与 `webserver_config.py` |
| Celeborn | `celeborn-defaults.conf`、环境变量赋值、`log4j2.properties` |
| DolphinScheduler | 各角色的 `application.properties`、`common.properties`、Logback 与 JVM 文档 |

![暗色控制台中的 Doris 完整配置文档](@site/static/img/3.1.0/mpack-store/configuration-files-dark.jpg)

当前内容控件是多行文本编辑器。能够管理完整文档，并不代表已经提供 IDE 式文件树、语法编辑器或通用的应用配置校验器。

## 推荐编辑流程 {#editing-workflow}

1. 选中正确的服务、配置组和当前版本。
2. 修改内容前，检查**基本设置**和受管理的路径、监听配置。
3. 编辑完整文档，保留必要的 include 和模板占位符。
4. 保存新的配置版本，并填写有意义的备注。
5. 执行所需重启，或使用服务支持的 reload 命令。
6. 检查任务结果及应用实际生效的配置。
7. 重新打开该配置版本，确认保存的文档符合预期。

保存 Ambari 版本和让进程加载配置是两个步骤。提示需要重启，不表示保存失败；仅保存成功也不能证明进程已经加载文件。

## 管理字段与原生格式 {#managed-values-and-formats}

应用设置可以与管理层控制的身份、监听和路径值共同存在。管理包会单独补充这些默认值，用户声明发生冲突时应明确失败，而不是悄悄覆盖管理契约。

Properties 文档保留注释、续行、转义和应用表达式；INI、YAML 使用各自的原生结构。环境文档接受字面量 `NAME=value` 或 `export NAME=value` 赋值，不执行任意 Shell 程序。

React 保存和 Blueprint 内容处理会保留尾部空格与空行，渲染器在需要时补充末尾换行。能够输入文本，不表示任意 Shell 命令、未实现的运行模式或拓扑变更已经得到支持。

## 已有安装与定义更新 {#existing-installations}

对于受支持的标量到 content 迁移，Configs 按当前已保存的值和声明的文件格式生成候选文档，在保存前仍属于待提交修改。已有的 content 不会根据包默认值重新生成，历史版本也会保留。

存在标量配置组覆盖或密码类型属性时，会跳过自动转换。这些情况继续使用旧运行时表示，直到管理员同时、有计划地转换默认组和其他组。完整文件覆盖会替换整份文档，不会像独立属性那样逐行继承。

旧 PostgreSQL 和 Nginx 定义不一定在 Ambari 中保存了主机上的完整配置。新的 content 是安装模板，不会自动发现已定制的主机文件。对这样的实例启用完整内容管理前，应先把实际文件内容放入编辑器；新 content 类型不存在时，旧运行路径仍可使用。

## Nginx 示例 {#nginx-example}

可以在已有 server 块内部加入一个小型验证 location：

~~~nginx
location /docs-check {
    return 200 "managed configuration\n";
}
~~~

保留完整文档中的其他内容，尤其是 `conf.d` 下管理健康检查文件的 include。保存后，如果组件提供该命令，执行 `RELOAD`。包会先用 `nginx -t` 校验候选配置，再替换主文件；reload 验证会检查健康响应及新 Worker 提供的准确配置摘要。

校验失败时，应查看任务错误并修正候选配置，不要对同一份无效文件反复重启。

## PostgreSQL 示例 {#postgresql-example}

在完整文档中修改已有设置：

~~~properties
work_mem = '8MB'
~~~

保存并完成所需重启后，通过数据库原生查询验证：

~~~sql
SHOW work_mem;
~~~

保留模板中的路径、端口占位符和本地 peer 管理连接。修改数据目录占位符不会迁移数据库数据。管理包通过服务端可执行文件执行 `postgres -C` 风格的原生配置检查，并在激活时核对加载路径、端口和原生错误视图。

## 校验失败与恢复 {#validation-and-recovery}

Nginx 和 PostgreSQL 会在替换前验证候选文件，并保留此前的字节内容以便恢复。暂存布局包含未修改的资源，使相对 include 能够解析。单个文件替换是原子的，但多个文件整体并不是崩溃原子的数据库事务。

激活失败时可以恢复之前的文件；PostgreSQL 会先停止失败的激活，再恢复配置。发现外部并发修改时会明确报出核对失败。手工恢复前应检查任务及保留的 `.ambari-before` 文件。

配置回退不会回退应用数据或数据库迁移，仍需要独立的数据备份和迁移流程。管理包操作与服务任务的区别见[操作与恢复](./operations-and-recovery.md)。
