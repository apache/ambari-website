---
title: 快速链接
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

# 快速链接 {#quick-links}

## 简介 {#introduction}

服务可以通过向遵循预定义 JSON 格式的文件添加元信息，为 Ambari Web UI 添加快速链接列表。Ambari Server 会解析快速链接 JSON 文件并将其内容提供给 UI，因此 Ambari Web UI 可以根据这些信息计算快速链接 URL，并相应填充快速链接下拉列表。

## 设计 {#design}

默认情况下，JSON 文件名为 quicklinks.json，位于服务根目录下的 quicklinks 目录中。例如，Oozie 的文件位于 OOZIE/quicklinks/quicklinks.json。您也可以使用其他文件名，或将文件放在服务根目录下的自定义目录中。

以 YARN 为例，带有快速链接配置的 metainfo.xml 如下所示。

```xml
<services>
    <service>
    <name>YARN</name>
    <version>2.7.1.2.3</version>
    <quickLinksConfigurations>
        <quickLinksConfiguration>
            <fileName>quicklinks.json</fileName>
            <default>true</default>
        </quickLinksConfiguration>
    </quickLinksConfigurations>
```

如下面的 MapReduce2 示例所示，metainfo.xml 可以包含不同的快速链接配置。

_quickLinksConfigurations-dir_ 是可选字段，用于告知 Ambari Server 从何处加载 quicklinks.json 文件。如果希望服务使用默认的 _quicklinks_directory_，则可以省略该字段。

```xml
<service>
    <name>MAPREDUCE2</name>
    <version>2.7.1.2.3</version>
    <quickLinksConfigurations-dir>quicklinks-mapred</quickLinksConfigurations-dir>
    <quickLinksConfigurations>
        <quickLinksConfiguration>
            <fileName>quicklinks.json</fileName>
            <default>true</default>
        </quickLinksConfiguration>
    </quickLinksConfigurations>
```

快速链接 JSON 文件包含两个主要部分：“configuration”部分用于确定协议（HTTP 或 HTTPS），“links”部分包含要在 Ambari Web UI 中显示的每个快速链接的元信息。JSON 文件顶部还包含“name”部分，用于定义服务器识别该快速链接 JSON 文件时使用的名称。

Ambari Web UI 使用“configuration”部分提供的信息确定服务使用 HTTP 还是 HTTPS。该结果用于构造“links”部分中定义的所有快速链接 URL。

以 YARN 为例，quicklinks.json 如下所示：
```json
{
	"name": "default",
	"description": "default quick links configuration",
	"configuration": {
		"protocol": {
			# type tells the UI which protocol to use if all checks meet.

            # Use https_only or http_only with empty checks section to explicitly specify the type
			"type":"https",
			"checks":[ # There can be more than one check needed.
				{
					"property":"yarn.http.policy",
					# Desired section here either is a specific value for the property specified
                    # Or whether the property value should exit or not_exist, blank or not_blank
					"desired":"HTTPS_ONLY",
					"site":"yarn-site"
				}
			]
		},
		#configuration for individual links
		"links": [
			{
				"name": "resourcemanager_ui",
				"label": "ResourceManager UI",
				"requires_user_name": "false", #set this to true if UI should attach log in user name to the end of the quick link url
				"url": "%@://%@:%@",

				#section calculate the port numbe.
				"port":{
					#use a property for the whole url if the service does not have a property for the port.
					#Specify the regex so the url can be parsed for the port value.
					"http_property": "yarn.timeline-service.webapp.address",
                    "http_default_port": "8080",
					"https_property": "yarn.timeline-service.webapp.https.address",
					"https_default_port": "8090",
					"regex": "\\w*:(\\d+)",
					"site": "yarn-site"
				}
			},
			{
				"name": "resourcemanager_logs",
				"label": "ResourceManager logs",
				"requires_user_name": "false",
				"url": "%@://%@:%@/logs",
				"port":{
					"http_property": "yarn.timeline-service.webapp.address",
					"http_default_port": "8088",
					"https_property": "yarn.timeline-service.webapp.https.address",
					"https_default_port": "8090",
					"regex": "\\w*:(\\d+)",
					"site": "yarn-site"
				}
			}
		]
	}
}
```

# REST API {#rest-api}

您可以通过以下 REST API 以 HTTP GET 请求方式查看提供给 Ambari Web UI 的快速链接信息。

REST API

```
/api/v1/stacks/[stack_name]versions/[stack_version]/services/[service_name]/quicklinks?QuickLinkInfo/default=true&fields=*
```

发送给 Ambari Web UI 的响应。

```json
{
  "href" : "http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/YARN/quicklinks?QuickLinkInfo/default=true&fields=*",
  "items" : [
    {
      "href" : "http://localhost:8080/api/v1/stacks/HDP/versions/2.3/services/YARN/quicklinks/quicklinks.json",
      "QuickLinkInfo" : {
        "default" : true,
        "file_name" : "quicklinks.json",
        "service_name" : "YARN",
        "stack_name" : "HDP",
        "stack_version" : "2.3",
        "quicklink_data" : {
          "QuickLinksConfiguration" : {
            "description" : "default quick links configuration",
            "name" : "default",
            "configuration" : {
              "protocol" : {
                "type" : "https",
                "checks" : [
                  {
                    "property" : "yarn.http.policy",
                    "desired" : "HTTPS_ONLY",
                    "site" : "yarn-site"
                  }
                ]
              },
              "links" : [
                {
                  "name" : "resourcemanager_jmx",
                  "label" : "ResourceManager JMX",
                  "url" : "%@://%@:%@/jmx",
                  "port" : {
                    "regex" : "\\w*:(\\d+)",
                    "site" : "yarn-site",
                    "http_property" : "yarn.timeline-service.webapp.address",
                    "http_default_port" : "8088",
                    "https_property" : "yarn.timeline-service.webapp.https.address",
                    "https_default_port" : "8090"
                  },
                  "removed" : false,
                  "component_name" : "RESOURCEMANAGER",
                  "requires_user_name" : "false"
                },
                {
                  "name" : "resourcemanager_logs",
                  "label" : "ResourceManager logs",
                  "url" : "%@://%@:%@/logs",
                  "port" : {
                    "regex" : "\\w*:(\\d+)",
                    "site" : "yarn-site",
                    "http_property" : "yarn.timeline-service.webapp.address",
                    "http_default_port" : "8088",
                    "https_property" : "yarn.timeline-service.webapp.https.address",
                    "https_default_port" : "8090"
                  },
                  "removed" : false,
                  "component_name" : "RESOURCEMANAGER",
                  "requires_user_name" : "false"
                },
                {
                  "name" : "resourcemanager_ui",
                  "label" : "ResourceManager UI",
                  "url" : "%@://%@:%@",
                  "port" : {
                    "regex" : "\\w*:(\\d+)",
                    "site" : "yarn-site",
                    "http_property" : "yarn.resourcemanager.webapp.address",
                    "http_default_port" : "8088",
                    "https_property" : "yarn.resourcemanager.webapp.https.address",
                    "https_default_port" : "8090"
                  },
                  "removed" : false,
                  "component_name" : "RESOURCEMANAGER",
                  "requires_user_name" : "false"
                },
                {
                  "name" : "thread_stacks",
                  "label" : "Thread Stacks",
                  "url" : "%@://%@:%@/stacks",
                  "port" : {
                    "regex" : "\\w*:(\\d+)",
                    "site" : "yarn-site",
                    "http_property" : "yarn.timeline-service.webapp.address",
                    "http_default_port" : "8088",
                    "https_property" : "yarn.timeline-service.webapp.https.address",
                    "https_default_port" : "8090"
                  },
                  "removed" : false,
                  "component_name" : "RESOURCEMANAGER",
                  "requires_user_name" : "false"
                }
              ]
            }
          }
        }
      }
    }
  ]
}
```

## Ambari Web UI {#ambari-web-ui}

Stack 驱动快速链接的更改不会显示在 UI 中。快速链接下拉列表的行为保持不变。
