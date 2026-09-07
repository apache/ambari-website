---
title: 视图 API
---

<!---
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
--->

# 视图 API {#view-api}

本节介绍 View REST API 的基本用法。有关详细的用法信息和示例，请参阅 [https://github.com/apache/ambari/blob/trunk/ambari-views/docs/index.md](https://github.com/apache/ambari/blob/trunk/ambari-views/docs/index.md)。

## 获取已部署 View 的列表 {#get-list-of-deployed-views}

1. 获取所有已部署 View 的列表。

```
GET /api/v1/views
 
200 - OK
```

2. 获取 View 列表后，可以深入查看某个 View，并查看可用的版本。

```
GET /api/v1/views/FILES
 
200 - OK
```

3. 还可以再深入一层，查看该 View 特定版本的更多信息（例如参数和归档名称），以及该 View 版本的所有实例列表。

```
GET /api/v1/views/FILES/versions/0.1.0
 
200 - OK
```

## 创建 View 实例：Files View {#creating-a-view-instance-files-view}

以下示例展示如何创建 [Files View](https://github.com/apache/ambari/tree/trunk/contrib/views/files) 的实例：名称为 FILES、版本为 0.1.0，实例名称为 "MyFiles"。

1. 创建 View 实例。

```
POST /api/v1/views/FILES/versions/0.1.0/instances/MyFiles
 
[ {
"ViewInstanceInfo" : {
    "properties" : {
      "dataworker.defaultFs" : "webhdfs://your.namenode.host:50070"
    }
  }
} ]
 
201 - CREATED
```

:::info
创建 View 实例时，请务必提供所有必需的 View 实例属性，否则将收到 500 响应，并附带说明所需属性的消息。
:::

2. 重启 Ambari Server，以加载 View 实例和 UI 资源。

```bash
ambari-server restart
```

3. 确认新创建的 View 实例可用。

```
GET /api/v1/views/FILES/versions/0.1.0
 
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/views/FILES/versions/0.1.0/",
  "ViewVersionInfo" : {
    "archive" : "/var/lib/ambari-server/resources/views/work/FILES{0.1.0}",
    "label" : "Files",
    "masker_class" : null,
    "parameters" : [
      {
        "name" : "dataworker.defaultFs",
        "description" : "FileSystem URI",
        "required" : true,
        "masked" : false
      },
      {
        "name" : "dataworker.username",
        "description" : "The username (defaults to ViewContext username)",
        "required" : false,
        "masked" : false
      }
    ],
    "version" : "0.1.0",
    "view_name" : "FILES"
  },
  "permissions" : [ ],
  "instances" : [
    {
      "href" : "http://c6401.ambari.apache.org:8080/api/v1/views/FILES/versions/0.1.0/instances/MyFiles",
      "ViewInstanceInfo" : {
        "instance_name" : "MyFiles",
        "version" : "0.1.0",
        "view_name" : "FILES"
      }
    }
  ]
}
```

直接访问 View 实例。

```
http://c6401.ambari.apache.org:8080/views/FILES/0.1.0/MyFiles/
 
or
 
http://c6401.ambari.apache.org:8080/#/main/views/FILES/0.1.0/MyFiles
```

## 创建 View 实例：Capacity Scheduler View {#creating-a-view-instance-capacity-scheduler-view}

以下示例展示如何创建 [Capacity Scheduler View](https://github.com/apache/ambari/tree/trunk/contrib/views/capacity-scheduler) 的实例：名称为 CAPACITY-SCHEDULER、版本为 0.1.0，实例名称为 "CS_1"，并使用标签 "Capacity Scheduler"。

* 创建 View 实例。

```
POST /api/v1/views/CAPACITY-SCHEDULER/versions/0.1.0/instances/CS_1

[ {
"ViewInstanceInfo" : {
    "label" : "Capacity Scheduler",
    "properties" : {
      "ambari.server.url" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/MyCluster",
      "ambari.server.username" : "admin",
      "ambari.server.password" : "admin"
    }
  }
} ]

201 - CREATED
```

:::info
创建 View 实例时，请务必提供所有**必需**的 View 实例属性，否则将收到 500 响应，并附带说明所需属性的消息。
:::

* 确认新创建的 View 实例可用。

```
GET /api/v1/views/CAPACITY-SCHEDULER/versions/0.1.0

{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/views/CAPACITY-SCHEDULER/versions/0.1.0/",
  "ViewVersionInfo" : {
    "archive" : "/var/lib/ambari-server/resources/views/work/CAPACITY-SCHEDULER{0.1.0}",
    "label" : "Capacity Scheduler",
    "masker_class" : null,
    "parameters" : [
      {
        "name" : "ambari.server.url",
        "description" : "Target Ambari Server REST API cluster URL (for example: http://ambari.server:8080/api/v1/clusters/c1)",
        "required" : true,
        "masked" : false
      },
      {
        "name" : "ambari.server.username",
        "description" : "Target Ambari administrator username (for example: admin)",
        "required" : true,
        "masked" : false
      },
      {
        "name" : "ambari.server.password",
        "description" : "Target Ambari administrator password (for example: admin)",
        "required" : true,
        "masked" : false
      }
    ],
    "version" : "0.1.0",
    "view_name" : "CAPACITY-SCHEDULER"
  },
  "permissions" : [ ],
  "instances" : [
    {
      "href" : "http://c6401.ambari.apache.org:8080/api/v1/views/CAPACITY-SCHEDULER/versions/0.1.0/instances/CS_1",
      "ViewInstanceInfo" : {
        "instance_name" : "CS_1",
        "version" : "0.1.0",
        "view_name" : "CAPACITY-SCHEDULER"
      }
    }
  ]
}
```
* 直接访问 View 实例。

```
http://c6401.ambari.apache.org:8080/views/CAPACITY-SCHEDULER/0.1.0/CS_1/

or

http://c6401.ambari.apache.org:8080/#/main/views/CAPACITY-SCHEDULER/0.1.0/CS_1/
```
