# View API

This section describes basic usage of the View REST API. Browse https://github.com/apache/ambari/blob/trunk/ambari-views/docs/index.md for detailed usage information and examples.

## Get List of Deployed Views

1. Gets the list of all deployed views

```
GET /api/v1/views
 
200 - OK
```

2. Once you have a list of views, you can drill-into a view and see the available versions.

```
GET /api/v1/views/FILES
 
200 - OK
```

3. You can go a level deeper and see more information about that specific version for the view, such as the parameters and the archive name, and a list of all instances of the view for that specific view version.

```
GET /api/v1/views/FILES/versions/0.1.0
 
200 - OK
```

## Creating a View Instance: Files View

The following example shows creating an instance of the [Files View](https://github.com/apache/ambari/tree/trunk/contrib/views/files), name FILES, version 0.1.0 view called "MyFiles".

1. Create the view instance.

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
When creating your view instance, be sure to provide all required view instance properties, otherwise you will receive a 500 with a message explaining the properties that are required.
:::

2. Restart Ambari Server to pick-up the view instance and UI resources.

```bash
ambari-server restart
```

3. Confirm the newly created view instance is available.

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

Browse to the view instance directly.

```
http://c6401.ambari.apache.org:8080/views/FILES/0.1.0/MyFiles/
 
or
 
http://c6401.ambari.apache.org:8080/#/main/views/FILES/0.1.0/MyFiles
```

## Creating a View Instance: Capacity Scheduler View

The following example shows creating an instance of the [Capacity Scheduler View](https://github.com/apache/ambari/tree/trunk/contrib/views/capacity-scheduler), name CAPACITY-SCHEDULER, version 0.1.0 view called "CS_1", using the label "Capacity Scheduler".

* Create the view instance.

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
When creating your view instance, be sure to provide all **required** view instance properties, otherwise you will receive a 500 with a message explaining the properties that are required.
:::

* Confirm the newly created view instance is available.

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
* Browse to the view instance directly.

```
http://c6401.ambari.apache.org:8080/views/CAPACITY-SCHEDULER/0.1.0/CS_1/

or

http://c6401.ambari.apache.org:8080/#/main/views/CAPACITY-SCHEDULER/0.1.0/CS_1/
```
