---
title: 告警
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
WEB 和 METRIC 告警类型的告警定义中包含 `connection_timeout` 属性（参见下方的 `AlertDefinition : source : uri : connection_timeout`）。此值以秒为单位，默认值为 5.0。如果需要修改连接超时时间，请通过更新 `source` 块使用 Ambari REST API。

```json
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/MyCluster/alert_definitions/42",
  "AlertDefinition" : {
    "cluster_name" : "MyCluster",
    "component_name" : "APP_TIMELINE_SERVER",
    "description" : "This host-level alert is triggered if the App Timeline Server Web UI is unreachable.",
    "enabled" : true,
    "id" : 42,
    "ignore_host" : false,
    "interval" : 1,
    "label" : "App Timeline Web UI",
    "name" : "yarn_app_timeline_server_webui",
    "scope" : "ANY",
    "service_name" : "YARN",
    "source" : {
      "reporting" : {
        "ok" : {
          "text" : "HTTP {0} response in {2:.3f}s"
        },
        "warning" : {
          "text" : "HTTP {0} response from {1} in {2:.3f}s ({3})"
        },
        "critical" : {
          "text" : "Connection failed to {1} ({3})"
        }
      },
      "type" : "WEB",
      "uri" : {
        "http" : "{{yarn-site/yarn.timeline-service.webapp.address}}",
        "https" : "{{yarn-site/yarn.timeline-service.webapp.https.address}}",
        "https_property" : "{{yarn-site/yarn.http.policy}}",
        "https_property_value" : "HTTPS_ONLY",
        "kerberos_keytab" : "{{yarn-site/yarn.timeline-service.http-authentication.kerberos.keytab}}",
        "kerberos_principal" : "{{yarn-site/yarn.timeline-service.http-authentication.kerberos.principal}}",
        "default_port" : 0.0,
        "connection_timeout" : 5.0
      }
    }
  }
}
```

例如，要通过 API 更新 `connection_timeout`，需要在 API 调用中 PUT 整个 `source` 块。例如，执行以下 PUT 可将 `connection_timeout` 更新为 **6.5** 秒。

```
PUT /api/v1/clusters/MyCluster/alert_definitions/42

{
"AlertDefinition" : {
  "source" : {
      "reporting" : {
        "ok" : {
          "text" : "HTTP {0} response in {2:.3f}s"
        },
        "warning" : {
          "text" : "HTTP {0} response from {1} in {2:.3f}s ({3})"
        },
        "critical" : {
          "text" : "Connection failed to {1} ({3})"
        }
      },
      "type" : "WEB",
      "uri" : {
        "http" : "{{yarn-site/yarn.timeline-service.webapp.address}}",
        "https" : "{{yarn-site/yarn.timeline-service.webapp.https.address}}",
        "https_property" : "{{yarn-site/yarn.http.policy}}",
        "https_property_value" : "HTTPS_ONLY",
        "kerberos_keytab" : "{{yarn-site/yarn.timeline-service.http-authentication.kerberos.keytab}}",
        "kerberos_principal" : "{{yarn-site/yarn.timeline-service.http-authentication.kerberos.principal}}",
        "default_port" : 0.0,
        "connection_timeout" : 6.5
      }
    }
  }
}
```

## 创建基于脚本的告警分发器 {#creating-a-script-based-alert-dispatcher}

本文介绍如何启用能够响应 Ambari 告警的自定义基于脚本的告警分发器。分发器会将告警参数作为命令行参数调用脚本。

分发器必须知道要执行的脚本位置。通过在 `ambari.properties` 中设置以下任一项进行配置：

* `notification.dispatch.alert.script`
* a custom property key that points to the script, such as `foo.bar.alert.dispatch.script`

示例：

```
notification.dispatch.alert.script=/contrib/ambari-alerts/scripts/default_logger.py
com.mycompany.dispatch.syslog.script=/contrib/ambari-alerts/scripts/legacy_sys_logger.py
com.mycompany.dispatch.shell.script=/contrib/ambari-alerts/scripts/shell_logger.sh
```

当告警实例状态发生变化且 Ambari 需要分发该状态变化时，会调用自定义脚本：

```
# main method which is called when invoked on the command line
# :param definitionName: the alert definition unique ID
# :param definitionLabel: the human readable alert definition label
# :param serviceName: the service that the alert definition belongs to
# :param alertState: the state of the alert (OK, WARNING, etc)
# :param alertText: the text of the alert

def main():
    definitionName = sys.argv[1]
    definitionLabel = sys.argv[2]
    serviceName = sys.argv[3]
    alertState = sys.argv[4]
    alertText = sys.argv[5]
```

```
POST api/v1/alert_targets

    {
      "AlertTarget": {
        "name": "syslogger",
        "description": "Syslog Target",
        "notification_type": "ALERT_SCRIPT",
        "global": true
      }
    }
```

上述调用会创建一个全局告警目标，分发所有告警组中的全部告警。如果未将 `ambari.dispatch-property.script` 指定为告警目标的属性，Ambari 会在 `ambari.properties` 中查找默认配置键 `notification.dispatch.alert.script`。

```
POST api/v1/alert_targets

    {
      "AlertTarget": {
        "name": "syslogger",
        "description": "Syslog Target",
        "notification_type": "ALERT_SCRIPT",
        "global": true,
        "properties": {
          "ambari.dispatch-property.script": "com.mycompany.dispatch.syslog.script"
        }
      }
    }
```

上述调用同样会创建全局告警目标，但指定了特定的脚本键。因此，`ambari.properties` 应包含类似以下内容：

```
com.mycompany.dispatch.syslog.script=/contrib/ambari-alerts/scripts/legacy_sys_logger.py
```

## 自定义告警模板 {#customizing-the-alert-template}
Ambari 2.0 使用自身的告警系统传达所管理集群各方面的状态。Ambari 生成的通知模板内容与通知类型紧密关联。Email 和 SNMP 都有可自定义的模板，可用于生成内容。本文介绍更改 Ambari 2.0 创建告警通知时所用模板的必要步骤。

此过程面向能够访问 Ambari Server 文件系统和 `ambari.properties` 文件的 Ambari 管理员。这些管理员可以创建新模板，或更改生成告警通知内容时使用的现有模板。目前还没有通过 API 或 Web 客户端向最终用户提供这种灵活性的机制。

默认情况下，[alert-templates.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/alert-templates.xml) 随 Ambari 2.0 一起打包在 Ambari Server JAR 中。该文件包含所有已知通知类型（例如 EMAIL 和 SNMP）的模板。它被打包在 Ambari Server JAR 中，因此模板不会暴露在磁盘上，但可以将该文件作为参考示例。

自定义告警模板实际上会覆盖默认打包的模板。要覆盖告警模板 XML：

某些告警通知类型（例如 EMAIL）会自动将所有待处理告警合并为一个发出通知（“ **digest**”）。另一些类型（例如 SNMP）从不合并待处理告警，而是始终为系统中的每个告警创建一对一通知（“ **individual**”）。所有告警通知类型都在同一个告警模板文件中指定，但每种通知类型的具体告警模板很可能差异很大。

模板文件结构定义如下。每个 `<alert-template></alert-template>` 元素声明它应使用的告警通知类型。

变量                                     |描述
---------------------------------------------|-------------------------------------------------
$alert.getAlertDefinition()	                 |告警所属实例的定义。
$alert.getAlertName()	                       |告警名称。
$alert.getAlertState()	                     |告警状态（OK\|WARNING\|CRITICAL\|UNKNOWN）。
$alert.getAlertText()	                       |具体的告警文本。
$alert.getComponentName()	                   |告警所针对的组件（如果有）。
$alert.getHostName()	                       |触发告警的主机名（如果有）。
$alert.getServiceName()	                     |告警所属服务的名称。
$alert.hasComponentName()	                   |如果告警针对特定服务组件，则为 True。
$alert.hasHostName()	                       |如果告警由特定主机触发，则为 True。
$ambari.getServerHostName()	                 |Ambari Server 主机名。
$ambari.getServerUrl()	                     |Ambari Server URL。
$ambari.getServerVersion()	                 |Ambari Server 版本。
$dispatch.getTargetDescription()	           |通知目标描述。
$dispatch.getTargetName()	                   |通知目标名称。
$summary.getAlerts()                         |通知中所有告警的列表。
$summary.getAlerts(service,alertState)	     |给定服务或告警状态（OK\|WARNING\|CRITICAL\|UNKNOWN）的所有告警列表。
$summary.getCriticalCount()	                 |CRITICAL 告警数量。
$summary.getOkCount()	                       |OK 告警数量。
$summary.getServices()	                     |通知中报告告警的所有服务列表。
$summary.getServicesByAlertState(alertState) |给定告警状态（OK|WARNING|CRITICAL|UNKNOWN）的所有服务列表。
$summary.getTotalCount()                     |告警总数。
$summary.getUnknownCount()	                 |UNKNOWN 告警数量。
$summary.getWarningCount()	                 |WARNING 告警数量.

模板使用 Apache Velocity 渲染所有令牌化内容。模板中可使用以下变量：

```
$summary.getTotalCount()
```

```
$summary.getAlerts()
```

以下示例说明如何更改所有发出邮件通知的主题行，使其包含硬编码标识符：
