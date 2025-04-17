# Management Packs

## **Background**

At present, stack definitions are bundled with Ambari core and are part of Apache Ambari releases. This enforces having to do an Ambari release with updated stack definitions whenever a new version of a stack is released. Also to add an "add-on" service (custom service) to the stack definition, one has to manually add the add-on service to the stack definition on an Ambari Server. There is no release vehicle that can be used to ship add-on services.

Apache Ambari Management Packs addresses this issue by decoupling Ambari's core functionality (cluster management and monitoring) from stack management and definition. An Apache Ambari Management Pack (Mpack) can bundle multiple service definitions, stack definitions, stack add-on service definitions, view definitions services so that releasing these artifacts don't enforce an Apache Ambari release. Apache Ambari Management Packs will be released as separate release artifacts and will follow its own release cadence instead of being tightly coupled with Apache Ambari releases.

Management packs are released as tarballs, however they contain a metadata file (mpack.json) that specify the contents of the management pack and actions to perform when installing the management pack.

## **Apache JIRA**

[AMBARI-14854](https://issues.apache.org/jira/browse/AMBARI-14854)

## **Release Timelines**

* Short Term Goals (Apache Ambari 2.4.0.0 release)
  1. Provide a release vehicle for stack definitions (example:HDP management pack, IOP management pack).

  2. Provide a release vehicle for add-on/custom services (example: Microsoft-R management pack)
  3. Retrofit in existing stack processing infrastructure
  4. Command line to update stack definitions and service definitions

* Long Term Goals (Ambari 2.4+)
  1. Release HDP stacks as mpacks
  2. Build management pack processing infrastructure that will replace the stack processing infrastructure.

  3. Dynamic creation of stack definitions by processing management packs
  4. Provide a REST API adding/removing /upgrading managment packs.

## **Management Pack Metadata (Mpack.json)**

Management pack should contain following metadata information in mpack.json.

* **Name**: Unique management pack name
* **Version**: Management pack version
* **Description**: Friendly description of the management pack
* **Prerequisites**:
  - Minimum Ambari Version on which the management pack is installable.

    + **Example**: To install stackXYZ-­ambari-­mpack­1.0.0.0 management pack, Ambari should be atleast on Apache Ambari 2.4.0.0 version.

  - Minimum management pack version that should be installed before upgrading to this management pack.

    + **Example**: To upgrade to stackXYZ-­ambari­-mpack­-2.0.0.0 management pack, stackXYZ-­ambari-­mpack-­1.8.0.0 management pack or higher should be installed.

  - Minimum stack version that should already be present in the stack definitions for this management pack to be applicable.

    + **Example**: To add a add-on service management pack myservice-­ambari­-mpack­-1.0.0.0 management pack stackXYZ-­2.1 stack definition should be present.

* **Artifacts**:
  - List of release artifacts (service definitions, stack definitions, stack-addon-service-definitions, view-definitions) bundled in the management pack.

  - Metadata for each artifact like source directory, additional applicability for that artifact etc.

  - Supported Artifact Types
    + **service­-definitions**: Contains service definitions similar to common-services/serviceA/1.0.0
    + **stack-­definitions**: Contains stack definitions similar to stacks/stackXYZ/1.0
    + **extension-definitions**: Contains dynamic stack extensions (Refer:[Extensions](./extensions.md))
    + **stack­-addon-service-­definitions**: Defines add-on service applicability for stacks and how to merge the add-on service into the stack definition.

    + **view­-definitions** (Not supported in Apache Ambari 2.4.0.0)
  - A management pack can have more than one release artifacts.

    + **Example**: It should be possible to create a management pack that bundles together
      * **stack-definitions**: stackXYZ­-1.0, stackXYZ-1.1, stackXYZ-2.0
      * **service-definitions**: HAWQ, HDFS, ZOOKEEPER
      * **stack-addon-service-definitions**: HAWQ/2.0.0 is applicable to stackXYZ-2.0, stackABC-1.0
      * **view-definitions**: Hive, Jobs, Slider (Apache Ambari 2.4.0.0)

## **Management Pack Structure**

### StackXYZ Management Pack Structure

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

### StackXYZ Management Pack Mpack.json

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

### Add­-On Service Management Pack Structure

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

### Add­-On Service Management Pack Mpack.json

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

## **Installing Management Pack**

```bash
ambari-­server install-­mpack ­­--mpack=/path/to/mpack.tar.gz --­­purge --verbose
```

**Note**: Do not pass the "--purge" command line parameter when installing an add-on service management pack. The "--purge" flag is used to purge any existing stack definition (HDP is included in Ambari release) and should be included only when installing a Stack Management Pack.

## **Upgrading Management Pack**

```bash
ambari-server upgrade-mpack --mpack=/path/to/mpack.tar.gz --verbose
```
