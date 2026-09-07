---
title: 管理包
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
# 管理包 {#management-packs}

## **Background** {#background}

目前，堆栈定义与 Ambari 核心捆绑在一起，属于 Apache Ambari 发布内容的一部分。因此，每当堆栈发布新版本时，都必须发布包含更新堆栈定义的 Ambari 版本。此外，要将“附加”服务（自定义服务）加入堆栈定义，必须在 Ambari Server 上手动添加。没有可用于发布附加服务的发布载体。

Apache Ambari 管理包通过将 Ambari 核心功能（集群管理和监控）与堆栈管理及定义解耦来解决此问题。Apache Ambari 管理包（Mpack）可以捆绑多个服务定义、堆栈定义、堆栈附加服务定义和视图定义服务，因此发布这些制品不再要求发布 Apache Ambari。Apache Ambari 管理包将作为独立发布制品发布，并遵循自己的发布节奏，而不再与 Apache Ambari 发布紧密耦合。

管理包以 tarball 形式发布，但其中包含一个元数据文件（mpack.json），用于指定管理包内容以及安装管理包时要执行的操作。

## **Apache JIRA** {#apache-jira}

[AMBARI-14854](https://issues.apache.org/jira/browse/AMBARI-14854)

## **Release Timelines** {#release-timelines}

* 短期目标（Apache Ambari 2.4.0.0 发布）
  1. 为堆栈定义提供发布载体（例如 HDP 管理包、IOP 管理包）。

  2. 为附加/自定义服务提供发布载体（例如 Microsoft-R 管理包）
  3. 改造现有堆栈处理基础设施
  4. 提供用于更新堆栈定义和服务定义的命令行工具

* 长期目标（Ambari 2.4+）
  1. 将 HDP 堆栈作为管理包发布
  2. 构建用于替代堆栈处理基础设施的管理包处理基础设施。

  3. 通过处理管理包动态创建堆栈定义
  4. 提供用于添加、删除和升级管理包的 REST API。

## **Management Pack Metadata (Mpack.json)** {#management-pack-metadata-mpackjson}

管理包应在 mpack.json 中包含以下元数据信息。

* **Name**：唯一的管理包名称
* **Version**：管理包版本
* **Description**：管理包的易读描述
* **Prerequisites**：
  - 可安装该管理包的最低 Ambari 版本。

    + **示例**：要安装 stackXYZ-­ambari-­mpack­1.0.0.0 管理包，Ambari 至少应为 Apache Ambari 2.4.0.0 版本。

  - 升级到此管理包前必须安装的最低管理包版本。

    + **示例**：要升级到 stackXYZ-­ambari­-mpack­-2.0.0.0 管理包，必须已安装 stackXYZ-­ambari-­mpack-­1.8.0.0 或更高版本的管理包。

  - 堆栈定义中必须已存在的最低堆栈版本，管理包才适用。

    + **示例**：要添加 myservice-­ambari­-mpack­-1.0.0.0 附加服务管理包，必须存在 stackXYZ-­2.1 堆栈定义。

* **Artifacts**：
  - 管理包中捆绑的发布制品列表（服务定义、堆栈定义、stack-addon-service-definitions、view-definitions）。

  - 每个制品的元数据，例如源目录、该制品的其他适用条件等。

  - 支持的制品类型
    + **service­-definitions**：包含类似 common-services/serviceA/1.0.0 的服务定义
    + **stack-­definitions**：包含类似 stacks/stackXYZ/1.0 的堆栈定义
    + **extension-definitions**：包含动态堆栈扩展（参阅：[Extensions](./extensions.md)）
    + **stack­-addon-service-­definitions**：定义附加服务对堆栈的适用性，以及如何将附加服务合并到堆栈定义中。

    + **view­-definitions**（Apache Ambari 2.4.0.0 不支持）
  - 一个管理包可以包含多个发布制品。

    + **示例**：应可以创建一个捆绑以下内容的管理包：
      * **stack-definitions**: stackXYZ­-1.0, stackXYZ-1.1, stackXYZ-2.0
      * **service-definitions**: HAWQ, HDFS, ZOOKEEPER
      * **stack-addon-service-definitions**：HAWQ/2.0.0 适用于 stackXYZ-2.0、stackABC-1.0
      * **view-definitions**：Hive、Jobs、Slider（Apache Ambari 2.4.0.0）

## **Management Pack Structure** {#management-pack-structure}

### StackXYZ Management Pack Structure {#stackxyz-management-pack-structure}

_stackXYZ­-ambari­-mpack-­1.0.0.0_

```
├── mpack.json

├── common-­services

│     └── HDFS

│         └── 2.1.0.2.0

│            └── configuration

└── stacks

    └── stackXYZ

       └── 1.0

           ├── metainfo.xml

           ├── repos

           │     └── repoinfo.xml

           ├── role_command_order.json

           └── services

           ├── HDFS

           │      ├── configuration

           │      │     └── hdfs-­site.xml

           │     └── metainfo.xml

           ├── stack_advisor.py

           └── ZOOKEEPER

                   └── metainfo.xml
```

### StackXYZ Management Pack Mpack.json {#stackxyz-management-pack-mpackjson}

_stackXYZ-­ambari-­mpack­1.0.0.0/mpack.json_

```json
{

    "type" : "full­-release",

    "name" : "stackXYZ-­ambari­-mpack",

    "version": "1.0.0.0",

    "description" : "StackXYZ Management Pack",

    "prerequisites": {

        "min_ambari_version" : "2.4.0.0"

    },

    "artifacts": [

        {

            "name" : "stackXYZ-service-definitions",

            "type" : "service-­definitions",

            "source_dir": "common-­services"

        },

       {

           "name" : "stackXYZ-­stack-­definitions",

           "type" : "stack­-definitions",

           "source_dir": "stacks"

        }

    ]

}
```

### Add­-On 服务 Management Pack Structure {#add-on-service-management-pack-structure}

_myservice-­ambari­-mpack­-1.0.0.0_

```
├── common­-services

│     └── MYSERVICE

│         └── 1.0.0

│         ├── configuration

│         │     └── myservice­config.xml

│         ├── metainfo.xml

│         ├── package

│         │     └── scripts

│         │         ├── client.py

│         │         ├── master.py

│         │         └── slave.py

│         └── role_command_order.json

├── custom­-services

│     └── MYSERVICE

│     ├── 1.0.0

│     │    └── metainfo.xml

│     └── 2.0.0

│         └── metainfo.xml

└── mpack.json
```

### Add­-On 服务 Management Pack Mpack.json {#add-on-service-management-pack-mpackjson}

_myservice-­ambari-­mpack­-1.0.0.0/mpack.json_

```json
{

    "type" : "full­-release",

    "name" : "myservice-­ambari­-mpack",

    "version": "1.0.0.0",

    "description" : "MyService Management Pack",

    "prerequisites": {

        "min-­ambari-­version" : "2.4.0.0",

        "min­-stack­-versions" : [

            {

                "stack_name" : "stackXYZ",

                "stack_version" : "2.2"

           }

        ]

    },

    "artifacts": [

        {

            "name" : "MYSERVICE­-service-definition",

            "type" : "service­-definition",

           "source_dir" : "common­-services/MYSERVICE/1.0.0",

           "service_name" : "MYSERVICE",

           "service_version" : "1.0.0"

        },

       {  

           "name" : "MYSERVICE­-1.0.0",

           "type" : "stack­-addon-service-­definition",

           "source_dir": "addon-services/MYSERVICE/1.0.0",

           "service_name" : "MYSERVICE",

           "service_version" : "1.0.0",

           "applicable_stacks" : [

               {

                   "stack_name" : "stackXYZ", "stack_version" : "2.2"

               }

            ]

        },

       {

           "name" : "MYSERVICE­-2.0.0",

           "type" : "stack-addon-service-definition",

           "source_dir": "custom­-services/MYSERVICE/2.0.0",

           "service_name" : "MYSERVICE",

           "service_version" : "2.0.0",

           "applicable_stacks" : [

               {

                   "stack_name" : "stackXYZ",

                   "stack_version" : "2.4"

                }

            ]

        }

    ]

}
```

## **Installing Management Pack** {#installing-management-pack}

```bash
ambari-­server install-­mpack ­­--mpack=/path/to/mpack.tar.gz --­­purge --verbose
```

**注意**：安装附加服务管理包时不要传递 "--purge" 命令行参数。"--purge" 标志用于清除现有堆栈定义（Ambari 发布中包含 HDP），仅在安装堆栈管理包时使用。

## **升级 Management Pack** {#upgrading-management-pack}

```bash
ambari-server upgrade-mpack --mpack=/path/to/mpack.tar.gz --verbose
```
