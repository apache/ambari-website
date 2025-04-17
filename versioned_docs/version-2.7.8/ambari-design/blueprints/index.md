---
slug: /blueprints
---
# Blueprints

## Introduction

Ambari Blueprints are a declarative definition of a cluster. With a Blueprint, you specify a [Stack](../stack-and-services/overview.mdx), the Component layout and the Configurations to materialize a Hadoop cluster instance (via a REST API) **without** having to use the Ambari Cluster Install Wizard.

### **Notable JIRAs**
JIRA                                                              | Description
------------------------------------------------------------------|---------------------------------------------
[AMBARI-4467](https://issues.apache.org/jira/browse/AMBARI-4467)  |Blueprints REST resource.
[AMBARI-5077](https://issues.apache.org/jira/browse/AMBARI-5077)  |Provision cluster with blueprint.
[AMBARI-4786](https://issues.apache.org/jira/browse/AMBARI-4786)  |Export blueprints from running/existing cluster.
[AMBARI-5114](https://issues.apache.org/jira/browse/AMBARI-5114)  |Configurations with blueprints.
[AMBARI-6275](https://issues.apache.org/jira/browse/AMBARI-6275)  |Add hosts using blueprints.
[AMBARI-10750](https://issues.apache.org/jira/browse/AMBARI-10750)|2.1 blueprint changes.

## API Resources and Syntax

The following table lists the basic Blueprints API resources.

The API calls on this wiki page include the HTTP Method (for example: `GET, PUT, POST`) and a sample URI (for example: `/api/v1/blueprints`) . When actually calling the Ambari REST API, you want to be sure to set the `X-Requested-By` header and provide authentication information as appropriate. For example, calling the API using `curl`:

```bash 
curl -H "X-Requested-By: ambari" -X GET -u admin:admin  http://c6401.ambari.apache.org:8080 /api/v1/blueprints
```

## Blueprint Usage Overview

#### Step 0: Prepare Ambari Server and Agents

Install the Ambari Server, run setup and start. Install the Ambari Agents on all hosts and perform manual registration.

#### Step 1: Create Blueprint

A blueprint can be created by hand or can be created by exporting a blueprint from an existing cluster.

To export a cluster from an existing cluster: `GET /api/v1/clusters/:clusterName?format=blueprint`

#### Step 2: Register Blueprint with Ambari

`POST /api/v1/blueprints/:blueprintName`

Request body is blueprint created in **Step 1**.

To disable topology validation and register a blueprint:

`<span>POST /api/v1/blueprints/:blueprintName?validate_topology=false</span>`

Disabling topology validation allows a user to force registration of a blueprint that fails topology validation.

#### Step 3: Create Cluster Creation Template

Map Physical Hosts to Blueprint: Create the mapping between blueprint host groups and physical hosts.

Provide Cluster Specific Configuration Overrides :Configuration can be applied at the cluster and host group scope and overrides any configurations specified in the blueprint.

#### Step 4: Setup Stack Repositories (Optional)

There are scenarios where public Stack repositories may not be accessible during creation of cluster via blueprint or an alternate repository is required for Stack.

To use a local or alternate repository:

```
PUT /api/v1/stacks/:stack/versions/:stackVersion/operating_systems/:osType/repositories/:repoId

{
  "Repositories" : {
    "base_url" : "",
    "verify_base_url" : true
  }
}
```

This API may be invoked multiple times to set Base URL for multiple OS types or Stack versions. If this step is not performed, by default, blueprints will use the latest Base URL defined in the Stack.

#### Step 5: Create Cluster

`POST /api/v1/clusters/:clusterName`

Request body includes blueprint name, host mappings and configurations from **Step 3**.

Request is asynchronous and returns a `/requests` URL which can be used to monitor progress.

#### Step 6: Monitor Cluster Creation Progress

Using the `/requests` URL returned in **Step 4**, monitor the progress of the tasks associated with cluster creation.

#### Limitations

Ambari Blueprints currently does not support creating cluster reflecting a High Availability topology.

Ambari 2.0 adds support for deploying High Availability clusters in Blueprints. Please see [Blueprint Support for HA Clusters](./blueprint-ha.md) for more information on this topic.

## Blueprint Details

### Prepare Ambari Server and Agents

1. Perform your Ambari Server install and setup.

```bash
yum install ambari-server
ambari-server setup
```

2. After setup completes, start your Ambari Server.

```bash
ambari-server start
```

3. Install Ambari Agents on all of the hosts you plan to include in your cluster.

 ```bash
 yum install ambari-agent
 ```

4. Set the Ambari Server on the Ambari Agents.

```bash
vi /etc/ambari-agent/conf/ambari-agent.ini
```

5. Set hostname= to the Fully Qualified Domain Name for the Ambari Server. Save and exit.

```bash
hostname=c6401.ambari.apache.org
```

6. Start the Agents to initiate registration to Server.

```bash
ambari-agent start
```

7. Confirm the Agent hosts are registered with the Server.
[http://your.ambari.server:8080/api/v1/hosts](http://your.ambari.server:8080/api/v1/hosts)


### Blueprint Structure

A blueprint document is in JSON format and has the following structure:

```json
{
  "configurations" : [
    {
      "configuration-type" : {
          "property-name"  : "property-value",
          "property-name2" : "property-value"
      }
    },
    {
      "configuration-type2" : {
          "property-name" : "property-value"
      }
    }
    ...

  ],
  "host_groups" : [
    {
      "name" : "host-group-name",
      "components" : [
        {
          "name" : "component-name"
        },
        {
          "name" : "component-name2",
          "provision_action" : "(INSTALL_AND_START | INSTALL_ONLY)"
        }
        ...

      ],
      "configurations" : [
	    {
          "configuration-type" : {
            "property-name" : "property-value"
          }
        }
        ...

      ],
      "cardinality" : "1"
    }
  ],
  "settings" : [
    "deployment_settings": [
      {"skip_failure":"true"}
    ],
    "repository_settings":[
      {
        "override_strategy":"ALWAYS_APPLY",
        "operating_system":"redhat7",
        "repo_id":"HDP",
        "base_url":"http://myserver/hdp"
      },
      {
        "override_strategy":"APPLY_WHEN_MISSING",
        "operating_system":"redhat7",
        "repo_id":"HDP-UTIL-1.1",
        "base_url":"http://myserver/hdp-util"
      }
	],
    "recovery_settings":[
      {"recovery_enabled":"true"}
    ],
    "service_settings":[
      {
        "name":"SERVICE_ONE",
        "recovery_enabled":"true"
      },
      {
        "name":"SERVICE_TWO",
        "recovery_enabled":"true"
      }
    ],
    "component_settings":[
      {
        "name":"COMPONENT_A_OF_SERVICE_ONE"
        "recover_enabled":"true"
      },
      {
        "name":"COMPONENT_B_OF_SERVICE_TWO",
        "recover_enabled":"true"
      }
    ]
  ],
  "Blueprints" : {
    "stack_name" : "HDP",
    "stack_version" : "2.1",
    "security" : {
         "type" : "(NONE | KERBEROS)",
         "kerberos_descriptor" : {
             ...

          }
     }
  }
}
```

#### **Blueprint Field Descriptions**

* **configurations** : A list of configuration maps keyed by configuration type. An example of a configuration type is "core-site". When specified at the top level, configurations are applied at cluster scope and override default values for the cluster. When specified within a "host_groups" element, configurations are applied at the host level for all hosts mapped to the host group. Host scoped configurations override cluster scoped configuration for all hosts mapped to the host group. The configurations element is optional at both levels.

* **host_groups** : A list of host groups which define topology (components) and configuration for all hosts which are mapped to the host group. At least one host group must be specified.

  - **name** : The name of the host group. Mandatory field which is referred to in the cluster creation body when mapping physical hosts to host groups.

  - **components** : A list of components which will run on all hosts that are mapped to the host group. At least one component must be specified for each host group.

  - **provision_action** : Cluster wide provision action can be specified in Cluster Creation Template (see below), but optionally this can be overwritten on component level, by specifying a different provision_action here. The default provision_action is INSTALL_AND_START.

  - **cardinality** : This field is optional and intended to provide a hint to the deployer as to how many instances of a particular host_group can be instantiated; it has no bearing on how the cluster is deployed. When a blueprint is exported for an existing cluster, this field will indicate the number of hosts that correspond the the host group in that cluster.

* **Blueprints** : Blueprint and stack information
  - **stack_name** : The name of the stack. All stacks currently shipped with Ambari have the name "HDP". This is a required field.

  - **stack_version** : The version of the stack. For example: "1.3.2" or "2.1". This is a required field.When deploying a cluster using a blueprint, the stack definition identified in the blueprint must be available to the Ambari instance in the new cluster.

  - **blueprint_name** : Optional field which specifies that name of the blueprint. Typically the name of the blueprint is specified in the URL of the REST invocation. The only reason to specify the name in the blueprint is when creating multiple blueprints via a single REST invocation. **Be aware that the name specified in this field will override the name specified in the URL.**
  - **security** : Optional block to specify security settings for blueprint. Supported security types are **NONE** and **KERBEROS**. In case of KERBEROS, users have the option to embed a valid kerberos descriptor - to override default values defined for HDP stack - in field **kerberos_descriptor**or as an alternative they may reference a previously saved kerberos descriptor using **kerberos_descriptor_reference**field.

In case of selecting **KERBEROS** as security_type it's mandatory to add **kerberos-env** and **krb5-conf** config types. (Checkout configurations section in **Blueprint example with KERBEROS** on this page)
Be aware that, Kerberos client packages needs to be installed on the host running Ambari server and krb5.conf needs to be configured properly to contain your realm (admin_server and kdc).

[Automated Kerberization](../kerberos/index.md) page describes structure of kerberos_descriptor.

* **settings**: An optional section to provide additional configuration for cluster behavior during and after the blueprint deployment. You can provide configurations for the following properties:
  - recovery_settings: A section to specify if all services (globally) should be set with auto restart once the cluster is deployed. To configure it, specify "recover_enabled" property to either "true" (auto restart), or "false" (do not auto restart). For example:
  ```json
  "settings": [
  "recovery_settings":[
      {
        "recovery_enabled":"true"
      }
    ]
  ],
  ```
  - service_settings: A section to specify if services should be set with auto restart once the cluster is deployed. To configure it, specify "recover_enabled" property to either "true" (auto restart), or "false" (do not auto restart).
  For example:
  ```json
  "settings": [
    "service_settings":[
      {
        "name":"HDFS",
        "recovery_enabled":"true"
      },
      {
        "name":"ZOOKEEPER",
        "recovery_enabled":"true"
      }
    ]
  ],_
  ```
  - component_settings: A section to specify if components should be set with auto restart once the cluster is deployed. To configure it, specify "recover_enabled" property to either "true" (auto restart), or "false" (do not auto restart).
  For example:
  ```json
  "settings": [
    "component_settings":[
      {
        "name":"KAFKA_CLIENT"
        "recover_enabled":"true"
      },
      {
        "name":"METRICS_MONITOR",
        "recover_enabled":"true"
      }
    ]
  ],
  ```
  - deployment_settings: A section to specify if the blueprint deployment should auto skip install and start failures. To configure this behavior, specify "skip_failure" property to either "true" (auto skip failures), or "false" (do not auto skip failures). Blueprint deployment will fail on the very first deployment failure if the blueprint file does not contain the "deployment_settings" section.

  For example:
  
  ```json
  "settings": [
  "recovery_settings":[
      {
        "recovery_enabled":"true"
      }
    ]
  ],
  ```

  - repository_settings: A section to specify custom repository URLs for the blueprint deployment. This section allows you to provide custom URLs to override the default ones. Without this section, you will need to update the repository URLs via REST API before deploying the cluster with the blueprint. "override_strategy" can be "ALWAYS_APPLY" ( always override the default one), or "APPLY_WHEN_MISSING" (only add it if no repository exists with the specific operating system and the repository id information). Repository URLs stored in the Ambari server database will be used if the blueprint does not have the "repository_settings" section.
  For example:
  ```json
   settings: [
   "repository_settings":[
   {
   "override_strategy":"ALWAYS_APPLY"
   "operating_system":"redhat7",
   "repo_id":"HDP",
   "base_url":"[http://myserver/hdp](http://  myserver/hdp) "
   },
   {
   "override_strategy":"APPLY_WHEN_MISSING",
   "operating_system":"redhat7",
   "repo_id":"HDP-UTIL-1.1",
   "base_url":"[http://myserver/hdp-util](http://  myserver/hdp-util) "
  }
  ]
  ]
  ```

### Cluster Creation Template Structure

A Cluster Creation Template is in JSON format and has the following structure:

```json
{
  "blueprint" : "blueprint-name",
  "default_password" : "super-secret-password",
  "provision_action" : "(INSTALL_AND_START | INSTALL_ONLY)"
  "configurations" : [
    {
      "configuration-type" : {
        "property-name" : "property-value"
      }
    }
    ...

  ],
  "host_groups" :[
    {
      "name" : "host-group-name",
      "configurations" : [
        {
          "configuration-type" : {
            "property-name" : "property-value"
          }
        }
      ],
      "hosts" : [
        {
          "fqdn" : "host.domain.com"
        },
        {
          "fqdn" : "host2.domain.com"
        }
        ...

      ]
    }
    ...

  ],
  "credentials" : [
      {
        "alias" : "kdc.admin.credential",
        "principal" : "{PRINCIPAL}",
        "key" : "{KEY}",
        "type" : "(TEMPORARY | PERSISTED)"
      }
  ],
  "security" : {
         "type" : "(NONE | KERBEROS)",
         "kerberos_descriptor" : {
             ...

          }
  }
}
```

Starting in Ambari version 2.1.0, it is possible to specify a host count and a host predicate in the cluster creation template host group section instead of a host name.

```json
{
  "name" : "group-using-host-count",
  "host_count" : 5,
  "host_predicate" : "Hosts/os_type=centos6&Hosts/cpu_count=2"
}
```

Starting in Ambari version 2.2.0, it is possible to specify configuration recommendation strategy in the cluster creation template.

```json
{
  "blueprint" : "blueprint-name",
  "config_recommendation_strategy" : "ONLY_STACK_DEFAULTS_APPLY",
  ...

}
```

Starting in Ambari version 2.2.1, it is possible to specify the host rack info in the cluster creation template ([AMBARI-14600](https://issues.apache.org/jira/browse/AMBARI-14600)).

```json
"hosts" : [
        {
          "fqdn" : "amb2.service.consul",
          "rack_info": "/dc1/rack1"
        }
      ]
```

**Cluster Creation Template Structure: Host Mappings and Configuration Field Descriptions**

* **blueprint** : Name of the blueprint that defines the cluster to be deployed. Blueprint must already exist. Required field.

* **default_password** : Optional field which specifies a default password for all required passwords which are not specified in the blueprint or cluster creation template configurations.

* **provision_action** : Default provision_action is INSTALL_AND_START, optionally this can be overwritten on component level, by specifying a different provision_action for a given component.

* **configurations** : A list of configuration maps keyed by configuration type. An example of a configuration type is "core-site". When specified at the top level, configurations are applied at cluster scope and override default values for the cluster. When specified within a "host_groups" element, configurations are applied at the host level for all hosts mapped to the host group. Host scoped configurations override cluster scoped configuration for all hosts mapped to the host group. All cluster scoped and host group scoped configurations specified here override configurations specified in the corresponding blueprint. The configurations element is optional at both levels.

* **config_recommendation_strategy :** Optional field which specifies the strategy of applying configuration recommendations to a cluster. Recommended configurations gathered by the response of the stack advisor, they may override partly/totally user defined custom configurations depending on selected strategy. A property value is considered as custom configuration in case it has a value other then stack default. Available from Ambari 2.2.0.

  - **NEVER_APPLY** : Configuration recommendations are ignored with this option. (This is the default)
  - **ONLY_STACK_DEFAULTS_APPLY**:Configuration recommendations are applied only for properties defined in HDP stack by default.

  - **ALWAYS_APPLY**: All c onfiguration recommendations are applied, they may override custom configurations provided by the user in the Blueprint and/or Cluster Creation Template.

  - **ALWAYS_APPLY_DONT_OVERRIDE_CUSTOM_VALUES**: All c onfiguration recommendations are applied,however custom configurations defined by the user in the Blueprint and/or Cluster Creation Template are not overridden by recommended configuration values. Available as of Ambari 2.4.0.

* **host_groups** : A list of host groups being deployed to the cluster. At least one host group must be specified.

  - **name** : Required field which must correspond to a name of a host group in the associated blueprint.

  - **hosts** : List of host mapping information
    + **fqdn** : Fully qualified domain name for each host that is being mapped to the host group. At least one host must be specified
  - **host_count** : The number of hosts that should be mapped to this host group. This can be specified instead of concrete host names. If no host_predicate is specified, any host that isn't explicitly mapped to another host group is available to be mapped to this host group. Available as of Ambari 2.1.0.

  - **host_predicate** : Optional field which is used together with host_count to control which hosts are mapped to the host group. This is useful in supporting host 'flavors' where different host groups require different host types. The default predicate matches all hosts which aren't explicitly mapped to another host group. The syntax of the predicate is the standard Ambari API query syntax applied against the "api/v1/hosts" endpoint. Available as of Ambari 2.1.0.

* **credentials** : Optional block to create credentials, kdc.admin.credential is required in case of setting up KERBEROS security. Store type could be **PERSISTED**
or **TEMPORARY**. Temporary admin credentials are valid 90 minutes or until server restart.

* **security** : Optional block to override security settings defined in Blueprint. Supported security types are **NONE** and **KERBEROS**. In case of KERBEROS, users have the option to embed a valid kerberos descriptor - to override default values defined for HDP stack - in field **kerberos_descriptor**or as an alternative they may reference a previously saved kerberos descriptor using **kerberos_descriptor_reference**field. Security settings defined here will override Blueprint settings, however overriding security type used in Blueprint to a less secure mode is not possible (ex. set security.type=NONE in cluster template having security.type=KERBEROS in Blueprint). In case of selecting **KERBEROS** as security_type it's mandatory to add **kerberos-env** and **krb5-conf** config types. (Checkout configurations section in **Blueprint example with KERBEROS** on this page)
[Automated Kerberization](../kerberos/index.md) page describes structure of kerberos_descriptor.

### Configurations

#### Default Values and Overrides

* **Stack Defaults**: Each Stack provides configurations for all included services which serve as defaults for all clusters deployed via Blueprints.

* **Blueprint Cluster Scoped**: Configurations provided at the top level of a Blueprint override the corresponding default values for the entire cluster.

* **Blueprint Host Group Scoped**: Configurations provided within a host_group element of a Blueprint override both the corresponding default values and blueprint cluster scoped values only for hosts mapped to the host group.

* **Cluster Creation Template Cluster Scoped**: Configurations provided at the top level of the Cluster Creation Template override both the corresponding default and blueprint cluster scoped values for the entire cluster.

* **Cluster Creation Template Host Group Scoped**: Configurations provided within a host_group element of a Cluster Creation Template override all other values for hosts mapped to the host group.

#### Required Configurations

* Not all configuration properties have valid defaults
* Required properties must be specified by the Blueprint user
* Come in two categories, passwords and non passwords
* Non password required properties are validated at Blueprint creation time
* Required password properties are validated at cluster creation time
* For required password properties, they may be explicitly set in either the Blueprint or Cluster Creation Template configurations or a default password may be specified in the Cluster Creation Template which will be applied to all passwords which have not been explicitly set
  - "default_password" : "super-secret-password"
* If required configuration validation fails, a 400 response is returned indicating which properties must be specified

## [Blueprint Examples](#)

## Blueprint Example: Single-Node HDP 2.4 Cluster

* Single-node cluster (c6401.ambari.apache.org)
* HDP 2.4 Stack
* Install Core Hadoop Services (HDFS, YARN, MapReduce2, ZooKeeper)

### Example Blueprint

```json
{
  "host_groups" : [
    {
      "name" : "host_group_1",
      "components" : [
        {
          "name" : "NAMENODE"
        },
        {
          "name" : "SECONDARY_NAMENODE"
        },
        {
          "name" : "DATANODE"
        },
        {
          "name" : "HDFS_CLIENT"
        },
        {
          "name" : "RESOURCEMANAGER"
        },
        {
          "name" : "NODEMANAGER"
        },
        {
          "name" : "YARN_CLIENT"
        },
        {
          "name" : "HISTORYSERVER"
        },
        {
          "name" : "MAPREDUCE2_CLIENT"
        },
        {
          "name" : "ZOOKEEPER_SERVER"
        },
        {
          "name" : "ZOOKEEPER_CLIENT"
        }
      ],
      "cardinality" : "1"
    }
  ],
  "Blueprints" : {
    "blueprint_name" : "single-node-hdfs-yarn",
    "stack_name" : "HDP",
    "stack_version" : "2.4"
  }
}
```

### Register blueprint with Ambari Server

Post the blueprint to the "single-node-hdfs-yarn" resource to the Ambari Server.

```
POST /api/v1/blueprints/single-node-hdfs-yarn

...

[ Request Body is the example blueprint defined above ]
...

201 - Created
```

### Example Cluster Creation Template

We are performing a single-node install and the blueprint above has **one** host group. Therefore, for our cluster instance, we define **one** host in **host_group_1** and reference the **single-node-hdfs-yarn** blueprint.

**Explicit Host Name Example**

```json
{
  "blueprint" : "single-node-hdfs-yarn",
  "host_groups" :[
    {
      "name" : "host_group_1",
      "hosts" : [
        {
          "fqdn" : "c6401.ambari.apache.org"
        }
      ]
    }
  ]
}
```

Create Cluster Instance

Post the cluster to the Ambari Server to provision the cluster.

```
POST /api/v1/clusters/MySingleNodeCluster

...

[ Request Body is above Cluster Creation Template ]
...

202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/MyCluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "InProgress"
  }
}
```

## Blueprint Example: Multi-Node HDP 2.4 Cluster

* Multi-node cluster (three hosts)
* Host Groups: "master", "slaves" (one master host, two slave hosts)
* Use HDP 2.4 Stack
* Install Core Hadoop Services (HDFS, YARN, MapReduce2, ZooKeeper)

### Example Blueprint

The blueprint ("multi-node-hdfs-yarn") below defines with **two** host groups (a "master" and the "slaves") which hosts the various Service components (masters, slaves and clients).

```json
{
  "host_groups" : [
    {
      "name" : "master",
      "components" : [
        {
          "name" : "NAMENODE"
        },
        {
          "name" : "SECONDARY_NAMENODE"
        },
        {
          "name" : "RESOURCEMANAGER"
        },
        {
          "name" : "HISTORYSERVER"
        },
        {
          "name" : "ZOOKEEPER_SERVER"
        }
      ],
      "cardinality" : "1"
    },
    {
      "name" : "slaves",
      "components" : [
        {
          "name" : "DATANODE"
        },
        {
          "name" : "HDFS_CLIENT"
        },
        {
          "name" : "NODEMANAGER"
        },
        {
          "name" : "YARN_CLIENT"
        },
        {
          "name" : "MAPREDUCE2_CLIENT"
        },
        {
          "name" : "ZOOKEEPER_CLIENT"
        }
      ],
      "cardinality" : "1+"
    }
  ],
  "Blueprints" : {
    "blueprint_name" : "multi-node-hdfs-yarn",
    "stack_name" : "HDP",
    "stack_version" : "2.4"
  }
}
```

### Register blueprint with Ambari Server

Post the blueprint to the "single-node-hdfs-yarn" resource to the Ambari Server.

```
POST /api/v1/blueprints/multi-node-hdfs-yarn
...

[ Request Body is the example blueprint defined above ]
...

201 - Created
```

### Example Cluster Creation Template

We are performing a multi-node install and the blueprint above has **two** host groups. Therefore, for our cluster instance, we define **one** host in **masters**, **two** hosts in **slaves** and reference the **multi-node-hdfs-yarn** blueprint.

The below multi-node cluster creation template example uses the "host_count" and "host_predicate" syntax for the "slave" host group which is available as of Ambari 2.1.0. For older versions of Ambari, the "hosts/fqdn" syntax must be used.

```
{
  "blueprint" : "multi-node-hdfs-yarn",
  "default_password" : "my-super-secret-password",
  "host_groups" :[
    {
      "name" : "master",
      "hosts" : [
        {
          "fqdn" : "c6401.ambari.apache.org"
        }
      ]
    },
    {
      "name" : "slaves",
      "host_count" : 5,
      "host_predicate" : "Hosts/os_type=centos6&Hosts/cpu_count=2"
    }
  ]
}
```

### Create Cluster Instance

Post the cluster to the Ambari Server to provision the cluster.

```
POST /api/v1/clusters/MyThreeNodeCluster
...

[ Request Body is above Cluster Creation Template ]
...

202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/MyThreeNodeCluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "InProgress"
  }
}
```

## Adding Hosts to an Existing Cluster

After creating a cluster using the Ambari Blueprint API, you may scale up the cluster using the API.

There are two forms of the API, one for adding a single host and another for adding multiple hosts.

The blueprint add hosts API is available as of Ambari 2.0.

Currently, only clusters originally provisioned via the blueprint API may be scaled using this API.

### Example Add Host Template

#### Single Host Example

Host is specified in URL

```
{
  "blueprint" : "multi-node-hdfs-yarn",
  "host_group" : "slaves"
}
```

#### Multiple Host Form

Host is specified in request body

```
[
  {
    "blueprint" : "multi-node-hdfs-yarn",
    "host_group" : "slaves",
    "host_name" : "c6403.ambari.apache.org"
  },
  {
    "blueprint" : "multi-node-hdfs-yarn",
    "host_group" : "slaves",
    "host_name" : "c6404.ambari.apache.org"
  }
]
```

#### Multiple Host Form using host_count

Starting with Ambari 2.1, the fields "host_count" and "host_predicate" can also be used when adding a host.

These fields behave exactly the same as they do when specified in the cluster creation template.

```
[
  {
    "blueprint" : "multi-node-hdfs-yarn",
    "host_group" : "slaves",
    "host_count" : 5,
    "host_predicate" : "Hosts/os_type=centos6&Hosts/cpu_count=2"
  }
]
```

### Add Host Request

#### Single Host

```
POST /api/v1/clusters/myExistingCluster/hosts/c6403.ambari.apache.org
...

[ Request Body is above Single Host Add Host Template ]
...

202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/myExistingCluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "Pending"
  }
}
```

#### Multiple Hosts

```
POST /api/v1/clusters/myExistingCluster/hosts
...

[ Request Body is above Multiple Host Add Host Template ]
...

202 - Accepted
{
  "href" : "http://c6401.ambari.apache.org:8080/api/v1/clusters/myExistingCluster/requests/1",
  "Requests" : {
    "id" : 1,
    "status" : "Pending"
  }
}
```

## Blueprint Example : Provisioning Multi-Node HDP 2.3 Cluster to use KERBEROS

The blueprint below could be used to setup a cluster containing three host groups with KERBEROS security. Overriding default kerberos descriptor is not necessary however specifying a few Kerberos specific properties in kerberos-env and krb5-conf is a must to setup services to use Kerberos. Note: prior to Ambari 2.4.0 use "kdc_host" instead of "kdc_hosts".

```json
{
  "configurations" : [
    {
      "kerberos-env": {
        "properties_attributes" : { },
        "properties" : {
          "realm" : "AMBARI.APACHE.ORG",
          "kdc_type" : "mit-kdc",
          "kdc_hosts" : "(kerberos_server_name)",
          "admin_server_host" : "(kerberos_server_name)"
        }
      }
    },
    {
      "krb5-conf": {
        "properties_attributes" : { },
        "properties" : {
          "domains" : "AMBARI.APACHE.ORG",
          "manage_krb5_conf" : "true"
        }
      }
    }
  ],
  "host_groups" : [
    {
      "name" : "host_group_1",
      "configurations" : [ ],
      "components" : [
        {
          "name" : "ZOOKEEPER_CLIENT"
        },
        {
          "name" : "ZOOKEEPER_SERVER"
        },
        {
          "name" : "NAMENODE"
        },
        {
          "name" : "HDFS_CLIENT"
        },
        {
          "name" : "DATANODE"
        }
      ],
      "cardinality" : "1"
    },
    {
      "name" : "host_group_2",
      "configurations" : [ ],
      "components" : [
        {
          "name" : "ZOOKEEPER_SERVER"
        },
        {
          "name" : "KERBEROS_CLIENT"
        },
        {
          "name" : "SECONDARY_NAMENODE"
        },
        {
          "name" : "DATANODE"
        }
      ],
      "cardinality" : "1"
    },
    {
      "name" : "host_group_3",
      "configurations" : [ ],
      "components" : [
        {
          "name" : "ZOOKEEPER_CLIENT"
        },
        {
          "name" : "ZOOKEEPER_SERVER"
        },
        {
          "name" : "KERBEROS_CLIENT"
        },
        {
          "name" : "HDFS_CLIENT"
        },
        {
          "name" : "DATANODE"
        }
      ],
      "cardinality" : "1"
    }
  ],
  "Blueprints" : {
    "stack_name" : "HDP",
    "stack_version" : "2.3",
    "security" : {
         "type" : "KERBEROS"
    }
  }
}
```

The **Cluster Creation Template** below could be used to setup a cluster containing hosts with KERBEROS security using the Blueprint from above. Overriding default kerberos descriptor is not necessary however specifying kdc.admin credentials is a must.

```json
{
    "blueprint": "kerberosBlueprint",
    "default_password": "admin",
    "host_groups": [
        {
          "hosts": [
              { "fqdn": "ambari-agent-1" }
          ],
          "name": "host_group_1",
          "configurations" : [ ]
        },
        {
          "hosts": [
              { "fqdn": "ambari-agent-2" }
          ],
          "name": "host_group_2",
          "configurations" : [ ]
        },
        {
          "hosts": [
              { "fqdn": "ambari-agent-3" }
          ],
          "name": "host_group_3",
          "configurations" : [ ]
        }
    ],
    "credentials" : [
     {
       "alias" : "kdc.admin.credential",
       "principal" : "admin/admin",
       "key" : "admin",
       "type" : "TEMPORARY"
     }
    ],
    "security" : {
        "type" : "KERBEROS"
   },
   "Clusters" : {"cluster_name":"kerberosCluster"}
}
```

## Blueprint Support for High Availability Clusters

Support for deploying HA clusters for HDFS, Yarn, and HBase has been added in Ambari 2.0. Please see the following link for more information:

[Blueprint Support for HA Clusters](./blueprint-ha.md)
