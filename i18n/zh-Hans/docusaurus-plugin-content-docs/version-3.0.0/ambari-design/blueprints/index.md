---
slug: /blueprints
title: 蓝图
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 蓝图 {#blueprints}

## 简介 {#introduction}

Ambari Blueprint 是集群的声明式定义。通过 Blueprint，可以指定 [Stack](../stack-and-services/overview.mdx)、组件布局和配置，以（通过 REST API）实例化 Hadoop 集群，而**无需**使用 Ambari 集群安装向导。

### **重要 JIRA** {#notable-jiras}
JIRA                                                              | 描述
------------------------------------------------------------------|---------------------------------------------
[AMBARI-4467](https://issues.apache.org/jira/browse/AMBARI-4467)  |Blueprints REST resource.
[AMBARI-5077](https://issues.apache.org/jira/browse/AMBARI-5077)  |Provision cluster with blueprint.
[AMBARI-4786](https://issues.apache.org/jira/browse/AMBARI-4786)  |Export blueprints from running/existing cluster.
[AMBARI-5114](https://issues.apache.org/jira/browse/AMBARI-5114)  |Configurations with blueprints.
[AMBARI-6275](https://issues.apache.org/jira/browse/AMBARI-6275)  |Add hosts using blueprints.
[AMBARI-10750](https://issues.apache.org/jira/browse/AMBARI-10750)|2.1 blueprint changes.

## API 资源和语法 {#api-resources-and-syntax}

下表列出了基本的 Blueprint API 资源。

本 wiki 页面中的 API 调用包含 HTTP 方法（例如：`GET, PUT, POST`）和示例 URI（例如：`/api/v1/blueprints`）。实际调用 Ambari REST API 时，请确保设置 `X-Requested-By` 标头，并按要求提供身份验证信息。例如，使用 `curl` 调用 API：

```bash 
curl -H "X-Requested-By: ambari" -X GET -u admin:admin  http://c6401.ambari.apache.org:8080 /api/v1/blueprints
```

## Blueprint 使用概览 {#blueprint-usage-overview}

#### 步骤 0：准备 Ambari Server 和 Agent {#step-0-prepare-ambari-server-and-agents}

安装 Ambari Server，运行 setup 并启动。在所有主机上安装 Ambari Agent 并手动注册。

#### 步骤 1：创建 Blueprint {#step-1-create-blueprint}

可以手动创建 Blueprint，也可以从现有集群导出 Blueprint。

从现有集群导出：`GET /api/v1/clusters/:clusterName?format=blueprint`

#### 步骤 2：向 Ambari 注册 Blueprint {#step-2-register-blueprint-with-ambari}

`POST /api/v1/blueprints/:blueprintName`

请求正文是**步骤 1**中创建的 Blueprint。

要禁用拓扑验证并注册 Blueprint：

`<span>POST /api/v1/blueprints/:blueprintName?validate_topology=false</span>`

禁用拓扑验证后，用户可以强制注册未通过拓扑验证的 Blueprint。

#### 步骤 3：创建集群创建模板 {#step-3-create-cluster-creation-template}

将物理主机映射到 Blueprint：创建 Blueprint 主机组与物理主机之间的映射。

提供集群专用配置覆盖：可以在集群和主机组范围应用配置，并覆盖 Blueprint 中指定的配置。

#### 步骤 4：设置 Stack 仓库（可选） {#step-4-setup-stack-repositories-optional}

通过 Blueprint 创建集群时，公共 Stack 仓库可能无法访问，或者 Stack 需要使用备用仓库。

要使用本地或备用仓库：

```
PUT /api/v1/stacks/:stack/versions/:stackVersion/operating_systems/:osType/repositories/:repoId

{
  "Repositories" : {
    "base_url" : "",
    "verify_base_url" : true
  }
}
```

可以多次调用此 API，为多个操作系统类型或 Stack 版本设置 Base URL。如果未执行此步骤，Blueprint 默认使用 Stack 中定义的最新 Base URL。

#### 步骤 5：创建集群 {#step-5-create-cluster}

`POST /api/v1/clusters/:clusterName`

请求正文包含 Blueprint 名称、主机映射以及**步骤 3**中的配置。

请求是异步的，并返回可用于监控进度的 `/requests` URL。

#### 步骤 6：监控集群创建进度 {#step-6-monitor-cluster-creation-progress}

使用**步骤 4**返回的 `/requests` URL，监控与集群创建相关任务的进度。

#### 限制 {#limitations}

Ambari Blueprint 目前不支持创建反映高可用拓扑的集群。

Ambari 2.0 增加了在 Blueprint 中部署高可用集群的支持。有关详细信息，请参阅 [Blueprint 对 HA 集群的支持](./blueprint-ha.md)。

## Blueprint 详细信息 {#blueprint-details}

### 准备 Ambari Server 和 Agent {#prepare-ambari-server-and-agents}

1. Perform your Ambari Server install and setup.

```bash
yum install ambari-server
ambari-server setup
```

2. After setup completes, start your Ambari Server.

```bash
ambari-server start
```

3. 在计划纳入集群的所有主机上安装 Ambari Agent。

 ```bash
 yum install ambari-agent
 ```

4. Set the Ambari Server on the Ambari Agents.

```bash
vi /etc/ambari-agent/conf/ambari-agent.ini
```

5. 将 hostname= 设置为 Ambari Server 的完全限定域名，然后保存并退出。

```bash
hostname=c6401.ambari.apache.org
```

6. Start the Agents to initiate registration to Server.

```bash
ambari-agent start
```

7. 确认 Agent 主机已在 Server 中注册。
[http://your.ambari.server:8080/api/v1/hosts](http://your.ambari.server:8080/api/v1/hosts)


### Blueprint Structure {#blueprint-structure}

Blueprint 文档采用 JSON 格式，其结构如下：

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

#### **Blueprint 字段说明** {#blueprint-field-descriptions}

* **configurations**：按配置类型作为键的配置映射列表。例如配置类型为 "core-site"。在顶层指定时，配置应用于集群范围并覆盖集群默认值。在 "host_groups" 元素中指定时，配置应用于映射到该主机组的所有主机。主机范围配置会覆盖这些主机的集群范围配置。两个级别的 configurations 元素均为可选。

* **host_groups**：定义拓扑（组件）以及映射到该主机组的所有主机配置的主机组列表。必须指定至少一个主机组。

  - **name**：主机组名称。将物理主机映射到主机组时，集群创建正文会引用此必填字段。

  - **components**：将在映射到该主机组的所有主机上运行的组件列表。每个主机组必须至少指定一个组件。

  - **provision_action**：可以在集群创建模板中指定集群范围的配置操作（见下文），也可以在此处指定不同的 provision_action，在组件级别覆盖它。默认 provision_action 为 INSTALL_AND_START。

  - **cardinality**：此可选字段用于向部署程序提示某个主机组可以实例化多少个实例；它不影响集群部署方式。为现有集群导出 Blueprint 时，此字段表示该集群中对应主机组的主机数。

* **Blueprints**：Blueprint 和 Stack 信息
  - **stack_name**：Stack 名称。Ambari 当前提供的所有 Stack 名称均为 "HDP"。此字段必填。

  - **stack_version**：Stack 版本，例如："1.3.2" 或 "2.1"。此字段必填。使用 Blueprint 部署集群时，Blueprint 标识的 Stack 定义必须在新集群的 Ambari 实例中可用。

  - **blueprint_name**：指定 Blueprint 名称的可选字段。通常在 REST 调用 URL 中指定 Blueprint 名称。仅在通过一次 REST 调用创建多个 Blueprint 时才需要在 Blueprint 中指定名称。**请注意，此字段指定的名称会覆盖 URL 中指定的名称。**
  - **security**：指定 Blueprint 安全设置的可选块。支持的安全类型为 **NONE** 和 **KERBEROS**。使用 KERBEROS 时，可以在 **kerberos_descriptor** 字段中嵌入有效的 Kerberos 描述符以覆盖 HDP Stack 默认值，也可以使用 **kerberos_descriptor_reference** 字段引用之前保存的 Kerberos 描述符。

如果选择 **KERBEROS** 作为 security_type，则必须添加 **kerberos-env** 和 **krb5-conf** 配置类型。（请查看本页**包含 KERBEROS 的 Blueprint 示例**中的配置部分。）
请注意，运行 Ambari server 的主机必须安装 Kerberos 客户端软件包，并且必须正确配置 krb5.conf 以包含你的 realm（admin_server 和 kdc）。

[自动 Kerberization](../kerberos/index.md) 页面介绍了 kerberos_descriptor 的结构。

* **settings**：用于提供 Blueprint 部署期间及之后集群行为附加配置的可选部分。可以为以下属性提供配置：
  - recovery_settings：用于指定集群部署后是否为所有服务全局启用自动重启。将 "recover_enabled" 属性设置为 "true" 可启用自动重启，设置为 "false" 则不自动重启。例如：
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
  - deployment_settings：用于指定 Blueprint 部署是否自动跳过安装和启动失败。将 "skip_failure" 属性设置为 "true" 可自动跳过失败，设置为 "false" 则不自动跳过。如果 Blueprint 文件没有 "deployment_settings" 部分，部署会在首次失败时终止。

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

### 集群创建模板结构 {#cluster-creation-template-structure}

集群创建模板采用 JSON 格式，结构如下：

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

从 Ambari 2.1.0 开始，可以在集群创建模板的主机组部分指定主机数量和主机谓词来代替主机名。

```json
{
  "name" : "group-using-host-count",
  "host_count" : 5,
  "host_predicate" : "Hosts/os_type=centos6&Hosts/cpu_count=2"
}
```

从 Ambari 2.2.0 开始，可以在集群创建模板中指定配置建议策略。

```json
{
  "blueprint" : "blueprint-name",
  "config_recommendation_strategy" : "ONLY_STACK_DEFAULTS_APPLY",
  ...

}
```

从 Ambari 2.2.1 开始，可以在集群创建模板中指定主机机架信息（[AMBARI-14600](https://issues.apache.org/jira/browse/AMBARI-14600)）。

```json
"hosts" : [
        {
          "fqdn" : "amb2.service.consul",
          "rack_info": "/dc1/rack1"
        }
      ]
```

**集群创建模板结构：主机映射和配置字段说明**

* **blueprint**：定义待部署集群的 Blueprint 名称。Blueprint 必须已存在。必填字段。

* **default_password**：为 Blueprint 或集群创建模板配置中未指定的所有必需密码设置默认密码的可选字段。

* **provision_action**：默认值为 INSTALL_AND_START，也可以为特定组件指定不同的 provision_action，在组件级别覆盖此值。

* **configurations**：按配置类型作为键的配置映射列表。例如配置类型为 "core-site"。在顶层指定时，配置应用于集群范围并覆盖集群默认值。在 "host_groups" 元素中指定时，配置应用于映射到主机组的所有主机。主机范围配置覆盖这些主机的集群范围配置。此处指定的所有集群范围和主机组范围配置都会覆盖对应 Blueprint 中的配置。两个级别的 configurations 元素均为可选。

* **config_recommendation_strategy：**指定向集群应用配置建议策略的可选字段。建议配置由 Stack advisor 的响应收集，根据所选策略可能部分或完全覆盖用户定义的自定义配置。如果属性值不同于 Stack 默认值，则视为自定义配置。从 Ambari 2.2.0 开始可用。

  - **NEVER_APPLY**：使用此选项时忽略配置建议。（这是默认值）
  - **ONLY_STACK_DEFAULTS_APPLY**：配置建议仅应用于 HDP Stack 中默认定义的属性。

  - **ALWAYS_APPLY**：应用所有配置建议，这些建议可能覆盖用户在 Blueprint 和/或集群创建模板中提供的自定义配置。

  - **ALWAYS_APPLY_DONT_OVERRIDE_CUSTOM_VALUES**：应用所有配置建议，但用户在 Blueprint 和/或集群创建模板中定义的自定义配置不会被建议值覆盖。从 Ambari 2.4.0 开始可用。

* **host_groups**：要部署到集群的主机组列表。必须至少指定一个主机组。

  - **name**：必填字段，必须对应关联 Blueprint 中的主机组名称。

  - **hosts**：主机映射信息列表
    + **fqdn**：映射到主机组的每台主机的完全限定域名。必须至少指定一台主机
  - **host_count**：应映射到此主机组的主机数。可以用它代替具体主机名。如果未指定 host_predicate，则任何未显式映射到其他主机组的主机都可映射到此主机组。从 Ambari 2.1.0 开始可用。

  - **host_predicate**：与 host_count 一起使用、控制哪些主机映射到主机组的可选字段。这对于支持主机“类型”很有用，因为不同主机组需要不同主机类型。默认谓词匹配所有未显式映射到其他主机组的主机。谓词语法是应用于 "api/v1/hosts" 端点的标准 Ambari API 查询语法。从 Ambari 2.1.0 开始可用。

* **credentials**：用于创建凭据的可选块；设置 KERBEROS 安全时必须提供 kdc.admin.credential。存储类型可以是 **PERSISTED** 或 **TEMPORARY**。临时管理员凭据有效期为 90 分钟或直到服务器重启。

* **security**：覆盖 Blueprint 中安全设置的可选块。支持的安全类型为 **NONE** 和 **KERBEROS**。使用 KERBEROS 时，可以在 **kerberos_descriptor** 字段中嵌入有效 Kerberos 描述符以覆盖 HDP Stack 默认值，也可以使用 **kerberos_descriptor_reference** 字段引用之前保存的描述符。此处定义的安全设置会覆盖 Blueprint 设置，但不能将 Blueprint 使用的安全类型覆盖为较低安全级别（例如，Blueprint 中为 security.type=KERBEROS 时，不能在集群模板中设置 security.type=NONE）。如果选择 **KERBEROS** 作为 security_type，则必须添加 **kerberos-env** 和 **krb5-conf** 配置类型。（请查看本页**包含 KERBEROS 的 Blueprint 示例**中的配置部分。）
[自动 Kerberization](../kerberos/index.md) 页面介绍 kerberos_descriptor 的结构。

### 配置 {#configurations}

#### 默认值和覆盖 {#default-values-and-overrides}

* **Stack 默认值**：每个 Stack 为包含的所有服务提供配置，作为通过 Blueprint 部署的所有集群的默认值。

* **Blueprint 集群范围**：Blueprint 顶层提供的配置覆盖整个集群的相应默认值。

* **Blueprint 主机组范围**：Blueprint 的 host_group 元素中提供的配置，仅对映射到该主机组的主机覆盖相应默认值和 Blueprint 集群范围值。

* **集群创建模板集群范围**：集群创建模板顶层提供的配置，会为整个集群覆盖相应默认值和 Blueprint 集群范围值。

* **集群创建模板主机组范围**：集群创建模板 host_group 元素中提供的配置，会为映射到该主机组的主机覆盖所有其他值。

#### 必需配置 {#required-configurations}

* 并非所有配置属性都有有效默认值
* Blueprint 用户必须指定必需属性
* 分为密码和非密码两类
* 非密码必需属性在创建 Blueprint 时验证
* 必需密码属性在创建集群时验证
* 对于必需密码属性，可以在 Blueprint 或集群创建模板配置中显式设置，也可以在集群创建模板中指定默认密码，将其应用于所有未显式设置的密码
  - "default_password" : "super-secret-password"
* 如果必需配置验证失败，将返回 400 响应，指出必须指定哪些属性

## [Blueprint 示例](#) {#blueprint-examples}

## Blueprint 示例：单节点 HDP 2.4 集群 {#blueprint-example-single-node-hdp-24-cluster}

* 单节点集群（c6401.ambari.apache.org）
* HDP 2.4 Stack
* 安装核心 Hadoop 服务（HDFS、YARN、MapReduce2、ZooKeeper）

### Blueprint 示例 {#example-blueprint}

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

### Register blueprint with Ambari Server {#register-blueprint-with-ambari-server}

将 Blueprint 发布到 Ambari Server 的 "single-node-hdfs-yarn" 资源。

```
POST /api/v1/blueprints/single-node-hdfs-yarn

...

[ Request Body is the example blueprint defined above ]
...

201 - Created
```

### Example Cluster Creation Template {#example-cluster-creation-template}

我们正在执行单节点安装，上述 Blueprint 有**一个**主机组。因此，对于集群实例，我们在 **host_group_1** 中定义**一个**主机，并引用 **single-node-hdfs-yarn** Blueprint。

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

将集群发布到 Ambari Server 以配置集群。

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

## Blueprint 示例：多节点 HDP 2.4 集群 {#blueprint-example-multi-node-hdp-24-cluster}

* 多节点集群（三台主机）
* 主机组："master"、"slaves"（一台 master 主机、两台 slave 主机）
* 使用 HDP 2.4 Stack
* 安装核心 Hadoop 服务（HDFS、YARN、MapReduce2、ZooKeeper）

### Example Blueprint {#example-blueprint-1}

下面的 Blueprint（"multi-node-hdfs-yarn"）定义了**两个**主机组（"master" 和 "slaves"），用于承载各种服务组件（master、slave 和 client）。

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

### Register blueprint with Ambari Server {#register-blueprint-with-ambari-server-1}

将 Blueprint 发布到 Ambari Server 的 "single-node-hdfs-yarn" 资源。

```
POST /api/v1/blueprints/multi-node-hdfs-yarn
...

[ Request Body is the example blueprint defined above ]
...

201 - Created
```

### Example Cluster Creation Template {#example-cluster-creation-template-1}

我们正在执行多节点安装，上述 Blueprint 有**两个**主机组。因此，对于集群实例，我们在 **masters** 中定义**一个**主机，在 **slaves** 中定义**两个**主机，并引用 **multi-node-hdfs-yarn** Blueprint。

下面的多节点集群创建模板示例对 "slave" 主机组使用 "host_count" 和 "host_predicate" 语法，该语法从 Ambari 2.1.0 开始可用。对于较旧版本的 Ambari，必须使用 "hosts/fqdn" 语法。

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

### 创建集群实例 {#create-cluster-instance}

将集群发布到 Ambari Server 以配置集群。

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

## 向现有集群添加主机 {#adding-hosts-to-an-existing-cluster}

使用 Ambari Blueprint API 创建集群后，可以使用 API 扩展集群。

此 API 有两种形式，一种用于添加单个主机，另一种用于添加多个主机。

从 Ambari 2.0 开始提供 Blueprint 添加主机 API。

目前，只有最初通过 Blueprint API 配置的集群可以使用此 API 扩展。

### 添加主机模板示例 {#example-add-host-template}

#### 单主机示例 {#single-host-example}

主机在 URL 中指定

```
{
  "blueprint" : "multi-node-hdfs-yarn",
  "host_group" : "slaves"
}
```

#### 多主机形式 {#multiple-host-form}

主机在请求正文中指定

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

#### 使用 host_count 的多主机形式 {#multiple-host-form-using-host_count}

从 Ambari 2.1 开始，添加主机时也可以使用 "host_count" 和 "host_predicate" 字段。

这些字段的行为与在集群创建模板中指定时完全相同。

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

### 添加主机请求 {#add-host-request}

#### 单主机 {#single-host}

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

#### 多主机 {#multiple-hosts}

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

## Blueprint 示例：配置使用 KERBEROS 的多节点 HDP 2.3 集群 {#blueprint-example--provisioning-multi-node-hdp-23-cluster-to-use-kerberos}

下面的 Blueprint 可用于设置包含三个主机组并启用 KERBEROS 安全的集群。无需覆盖默认 Kerberos 描述符，但必须在 kerberos-env 和 krb5-conf 中指定一些 Kerberos 专用属性，才能设置服务使用 Kerberos。注意：Ambari 2.4.0 之前请使用 "kdc_host"，而不是 "kdc_hosts"。

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

下面的**集群创建模板**可使用上述 Blueprint 设置包含主机并启用 KERBEROS 安全的集群。无需覆盖默认 Kerberos 描述符，但必须指定 kdc.admin 凭据。

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

## Blueprint 对高可用集群的支持 {#blueprint-support-for-high-availability-clusters}

Ambari 2.0 增加了部署 HDFS、Yarn 和 HBase HA 集群的支持。有关详细信息，请参阅以下链接：

[Blueprint Support for HA Clusters](./blueprint-ha.md)
