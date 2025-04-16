---

title: Alerts

---
WEB and METRIC alert types include a `connection_timeout` property on the alert definition (see below in `AlertDefinition : source : uri : connection_timeout`). This value is in seconds and defaults to 5.0. Use the Ambari REST API by updating the `source` block if you need to modify the connection timeout.

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

For example, to update the `connection_timeout` with the API, you need to PUT the entire contents of the `source` block with your API call. For example, you need to PUT the following to update the `connection_timeout` to **6.5** seconds.

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

## Creating a Script-based Alert Dispatcher

This document will describe how to enable a custom script-based alert dispatcher which is capable of responding to Ambari alerts. The dispatcher will invoke a script with the parameters of the alert as command line arguments.

The dispatcher must know the location of the script that is being executed. This is configured through `ambari.properties` by setting either:

* `notification.dispatch.alert.script`
* a custom property key that points to the script, such as `foo.bar.alert.dispatch.script`

Some examples of this are:

```
notification.dispatch.alert.script=/contrib/ambari-alerts/scripts/default_logger.py
com.mycompany.dispatch.syslog.script=/contrib/ambari-alerts/scripts/legacy_sys_logger.py
com.mycompany.dispatch.shell.script=/contrib/ambari-alerts/scripts/shell_logger.sh
```

When an alert instance changes state and Ambari needs to dispatch that alert state change, the custom script will be invoked:

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

The above call will create a global alert target that will dispatch all alerts across all alert groups. Without specifying `ambari.dispatch-property.script` as a property of the alert target, Ambari will look for the default configuration key of `notification.dispatch.alert.script` in `ambari.properties`.

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

The above call also creates a global alert target. However, a specific script key is being specified. The result is that `ambari.properties` should contain something similar to:

```
com.mycompany.dispatch.syslog.script=/contrib/ambari-alerts/scripts/legacy_sys_logger.py
```

## Customizing the Alert Template
Ambari 2.0 leverages its own alerting system to convey the state of various aspects of managed clusters. The notification template content produced by Ambari is tightly coupled to a notification type. Email and SNMP both have customizable templates that can be used to generate content. This document describes the steps necessary to change the template used by Ambari 2.0 when creating alert notifications.

This procedure is targeted at Ambari Administrators that have access to the Ambari Server file system and the `ambari.properties` file. Those Administrators can create new templates or change the existing templates that are used when generating alert notification content. At this time, there is no mechanism to expose this flexibility via the APIs or the web client to end users.

By default, an [alert-templates.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/alert-templates.xml) ships with Ambari 2.0 bundled inside of Ambari Server JAR. This file contains all of the templates for every known type of notification (for example EMAIL and SNMP). This file is bundled in the Ambari Server JAR so the template is not exposed on the disk. But we can use that file as a reference example.

When you customize the alert template, you are effectively overriding the template bundled by default. To override the alert templates XML:

Some alert notification types, such as EMAIL, automatically combine all pending alerts into a single outbound notification (" **digest**"). Others, like SNMP, never combine pending alerts and will always create a 1:1 notification for every alert in the system (" **individual**"). All alert notification types are specified in the same alert templates file, but the specific alert template for each notification type will most likely vary greatly.

The structure of the template file is defined as follows. Each `<alert-template></alert-template>` element declares what type of alert notification it should be used for.

Variable                                     |Description
---------------------------------------------|-------------------------------------------------
$alert.getAlertDefinition()	                 |The definition that the alert is an instance of.
$alert.getAlertName()	                       |The name of the alert.
$alert.getAlertState()	                     |The alert state (OK\|WARNING\|CRITICAL\|UNKNOWN)
$alert.getAlertText()	                       |The specific alert text.
$alert.getComponentName()	                   |The component, if any, that the alert is defined for.      
$alert.getHostName()	                       |The hostname, if any, that the alert was triggered for.      
$alert.getServiceName()	                     |The name of the service that the alert is defined for.      
$alert.hasComponentName()	                   |True if the alert is for a specific service component.      
$alert.hasHostName()	                       |True if the alert was triggered for a specific host.      
$ambari.getServerHostName()	                 |The Ambari Server hostname.
$ambari.getServerUrl()	                     |The Ambari Server URL.
$ambari.getServerVersion()	                 |The Ambari Server version.
$dispatch.getTargetDescription()	           |The notification target description.
$dispatch.getTargetName()	                   |The notification target name.
$summary.getAlerts()                         |A list of all of the alerts in the notification.
$summary.getAlerts(service,alertState)	     |A list of all alerts for a given service or alert state (OK\|WARNING\|CRITICAL\|UNKNOWN).   
$summary.getCriticalCount()	                 |The CRITICAL alert count.
$summary.getOkCount()	                       |The OK alert count.
$summary.getServices()	                     |A list of all services that are reporting an alert in the notification.
$summary.getServicesByAlertState(alertState) |A list of all services for a given alert state (OK|WARNING|CRITICAL|UNKNOWN).
$summary.getTotalCount()                     |The total alert count.
$summary.getUnknownCount()	                 |The UNKNOWN alert count.
$summary.getWarningCount()	                 |The WARNING alert count.

The template uses Apache Velocity to render all tokenized content. The following variables are available for use in your template:

```
$summary.getTotalCount()
```

```
$summary.getAlerts()
```

The following example illustrates how to change the subject line of all outbound email notifications to include a hard coded identifier:

