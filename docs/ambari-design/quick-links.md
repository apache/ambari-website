# Quick Links

## Introduction

A service can add a list of quick links to the Ambari web UI by adding meta info to a file following a predefined JSON format. Ambari server parses the quick link JSON file and provides its content to the UI. So that Ambari web UI can calculate quick link URLs based on the information and populate the quick links drop-down list accordingly.

## Design

By default, the JSON file is called quicklinks.json and is located in the quicklinks directory under the service root directory. For example, for Oozie, the file is OOZIE/quicklinks/quicklinks.json. You can also name the file differently as well as put it in a custom directory under the service root directory.


Use YARN as an example, the following is what the metainfo.xml looks like with the quick links configurations.

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

The metainfo.xml can have different quick links configuration as shown here for MapReduce2.

The _quickLinksConfigurations-dir_is an optional field that tells Ambari Server where to load the quicklinks.json file. We can skip it if we want the service to use the default _quicklinks_directory.

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

A quick link JSON file has two major sections, the "configuration" section for determine the protocol (HTTP vs HTTPS), and the "links" section for meta information of each quick link to be displayed on the Ambari web UI. The JSON file also includes a "name" section at the top that defines the name of the quick links JSON file that server uses for identification.

Ambari web UI uses information provided in the "configuration" section to determine if the service is running against HTTP or HTTPS. The result is used to construct all quick link URLs defined in the "links" section.

Use YARN as an example, the following is what the quicklinks.json looks like

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

# REST API

You can examine the quick link information made available to the Ambari web UI by running the following REST API as an HTTP GET request.

REST API

```
/api/v1/stacks/[stack_name]versions/[stack_version]/services/[service_name]/quicklinks?QuickLinkInfo/default=true&fields=*
```

Response sent to the Ambari web UI.

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

## Ambari Web UI

The changes for the stack driven quick links are hidden from the UI presentation. The quick links drop-down list behavior remains unchanged.
