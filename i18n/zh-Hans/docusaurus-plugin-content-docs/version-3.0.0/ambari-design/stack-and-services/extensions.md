---
title: 扩展
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
# 扩展 {#extensions}

## Background {#background}
在 Ambari 2.4 中添加。

扩展是一个或多个打包在一起的自定义服务的集合。与堆栈类似，每个扩展都有一个在集群中必须唯一的名称。扩展还具有用于区分不同发布版本的版本目录。堆栈版本位于 `/var/lib/ambari-server/resources/stacks with <stack_name>/<stack_version>` 子目录中，扩展版本则位于 `/var/lib/ambari-server/resources/extensions with <extension_name>/<extension_version>` 子目录中。

扩展可以链接到受支持的堆栈版本。扩展版本链接到当前安装的堆栈版本后，其中包含的自定义服务就可以添加到集群中，方式与这些服务实际包含在堆栈版本中时相同。

第三方开发者可以发布可添加到集群的扩展。

## Structure {#structure}

扩展定义的结构如下：

```
|_ extensions
   |_ <extension_name>
      |_ <extension_version>
         |_ metainfo.xml
         |_ services
            |_ <service_name>
               |_ metainfo.xml
               |_ metrics.json
               |_ configuration
                  |_ {configuration files}
               |_ package
                  |_ {files, scripts, templates}
```

扩展版本类似于堆栈版本，但只包含 metainfo.xml 和 services 目录。这意味着不支持 alerts、kerberos、metrics、role command order 和 widgets 文件，应在服务级别包含这些内容。此外，repositories、hooks、configurations 和 upgrades 目录也不受支持，不过可以在服务级别添加升级支持。

## Extension Inheritance {#extension-inheritance}

扩展版本可以扩展其他扩展版本，以共享命令脚本和配置，从而减少不同扩展之间的代码重复，具体包括：

- 在子扩展版本中添加新服务（不添加到父扩展版本中）
- 覆盖父服务的命令脚本
- 覆盖父服务的配置

例如，**MyExtension 2.0** 可以扩展 **MyExtension 1.0**，这样扩展定义中只需包含适用于 **MyExtension 2.0** 的变更。在 **MyExtension 2.0** 的 metainfo.xml 中按如下方式定义该扩展：

```xml
<metainfo>
  <extends>1.0</extends>
```

## Supported Stack Versions {#supported-stack-versions}

**每个扩展版本都必须支持一个或多个堆栈版本。**扩展版本指定其支持的最低堆栈版本，并在扩展 metainfo.xml 的 prerequisites 部分中按如下方式包含：

```xml
<metainfo>
  <prerequisites>
    <min-stack-versions>
      <stack>
        <name>HDP</name>
        <version>2.4</version>
      </stack>
      <stack>
        <name>OTHER</name>
        <version>1.0</version>
      </stack>
    </min-stack-versions>
  </prerequisites>
</metainfo>

```

## Installing 扩展 {#installing-extensions}

建议使用[管理包](./management-packs.md)安装扩展。有关详情，请参阅[使用扩展和管理包打包自定义服务的说明](custom-services.md)。

在 resource/extensions 目录下创建包含所需 metainfo.xml 文件的扩展版本目录后，即可重启 ambari-server。

## Extension REST APIs {#extension-rest-apis}

可以通过调用 REST API 查询扩展。

### Get all extensions {#get-all-extensions}

```bash
curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://<server>:<port>/api/v1/extensions'
{
  "href" : "http://<server>:<port>/api/v1/extensions/",
  "items" : [
    {
      "href" : "http://<server>:<port>/api/v1/extensions/EXT",
      "Extensions" : {
        "extension_name" : "EXT"
      }
    }
  ]
}
```

### Get extension {#get-extension}

```bash
curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://<server>:<port>/api/v1/extensions/EXT'

{
  "href" : "http://<server>:<port>/api/v1/extensions/EXT",
  "Extensions" : {
    "extension_name" : "EXT"
  },
  "versions" : [
    {
      "href" : "http://<server>:<port>/api/v1/extensions/EXT/versions/1.0",
      "Versions" : {
        "extension_name" : "EXT",
        "extension_version" : "1.0"
      }
    }
  ]
}
```

### Get extension version {#get-extension-version}

```bash
curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://<server>:<port>/api/v1/extensions/EXT/versions/1.0'

{
  "href" : "http://<server>:<port>/api/v1/extensions/EXT/versions/1.0/",
  "Versions" : {
    "extension-errors" : [],
    "extension_name" : "EXT",
    "extension_version" : "1.0",
    "parent_extension_version" : null,
    "valid" : true
  }
}
```

## Extension Links {#extension-links}

扩展链接是堆栈版本与扩展版本之间的链接。扩展版本链接到当前安装的堆栈版本后，其中包含的自定义服务就可以添加到集群中，方式与这些服务实际包含在堆栈版本中时相同。

只有当堆栈版本受扩展版本支持时，才能将扩展版本链接到该堆栈版本。必须在扩展 metainfo.xml 的 prerequisites 部分指定堆栈名称，并且堆栈版本必须大于或等于指定的最低版本号。

## Extension Link REST APIs {#extension-link-rest-apis}

可以通过调用 REST API 获取、创建、更新和删除扩展链接。

### Create Extension Link {#create-extension-link}

```
The following curl command will link an extension EXT/1.0 to the stack HDP/2.4

curl -u admin:admin -H 'X-Requested-By: ambari' -X POST -d '{"ExtensionLink": {"stack_name": "HDP", "stack_version":

"2.4", "extension_name": "EXT", "extension_version": "1.0"}}' http://<server>:<port>/api/v1/links/
```

### Get All Extension Links {#get-all-extension-links}

```bash
curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://<server>:<port>/api/v1/links'

{
  "href" : "http://<server>:<port>/api/v1/links/",
  "items" : [
    {
      "href" : "http://<server>:<port>:8080/api/v1/links/1",
      "ExtensionLink" : {
        "extension_name" : "EXT",
        "extension_version" : "1.0",
        "link_id" : 1,
        "stack_name" : "HDP",
        "stack_version" : "2.4"
      }
    }
  ]
}
```

### Get Extension Link {#get-extension-link}

```bash
curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://<server>:<port>/api/v1/link/1'
{
  "href" : "http://<server>:<port>/api/v1/links/1",
  "ExtensionLink" : {
    "extension_name" : "EXT",
    "extension_version" : "1.0",
    "link_id" : 1,
    "stack_name" : "HDP",
    "stack_version" : "2.4"
  }
}
```

### Delete Extension Link {#delete-extension-link}

```
You must specify the ID of the Extension Link to be deleted.

curl -u admin:admin -H 'X-Requested-By: ambari' -X DELETE http://<server>:<port>/api/v1/links/<link_id>
```

### Update All Extension Links {#update-all-extension-links}

```
This will reread the stacks, extensions and services in order to make sure the state of the stack is up to date in memory.

curl -u admin:admin -H 'X-Requested-By: ambari' -X PUT http://<server>:<port>/api/v1/links/
```
