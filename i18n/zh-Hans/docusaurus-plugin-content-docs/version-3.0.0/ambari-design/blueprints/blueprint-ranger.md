---
title: Ranger 的 Blueprint 支持
---

<!--
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
-->

从 HDP2.3 开始，可以通过两种方式使用 Blueprint 部署 Ranger：使用 stack advisor，或在 Blueprint 中设置所有必需的属性。

## 使用 stack advisor 部署 Ranger {#deploy-ranger-with-the-use-of-stack-advisor}

Stack advisor 会自动设置所需属性，从而简化 Ranger 的部署；用户只需提供最少量的配置。必须在 Blueprint 或集群创建模板中提供的配置属性如下：

* admin-properties：
  - DB_FLAVOR - 默认值为 MYSQL。如果要使用 MYSQL 作为 Ranger 数据库的数据库服务器，则无需提供此项。有关支持的数据库服务器，请参阅 Ranger 文档。同时确保 ambari-server 已安装所选数据库服务器类型对应的 JDBC 驱动（例如：ambari-server setup --jdbc-driver）。
  - db_host - Ranger Admin 将使用的数据库服务器 host:port
  - db_root_user - 部署期间用于创建 Ranger 数据库的、具有 root 访问权限的数据库用户。如果未指定此属性，默认使用 root。

  - db_root_password - root 用户的密码
  - db_password - 用于访问 Ranger 数据库的密码
  - audit_db_password - 用于访问 Ranger Audit 数据库的密码
* ranger-env
  - ranger_admin_password - 用于在 Ranger Admin 中为每个插件创建存储库和策略的 Ambari 用户密码
  - ranger-yarn-plugin-enabled - 启用/禁用 YARN Ranger 插件。默认值为 Disable。

  - ranger-hdfs-plugin-enabled - 启用/禁用 HDFS Ranger 插件。默认值为 Disable。

  - ranger-hbase-plugin-enabled - 启用/禁用 HBase Ranger 插件。默认值为 Disable。

  - ... - Ranger 支持的插件列表请参阅 Ranger 文档
* kms-properties
  - DB_FLAVOR - 默认值为 MYSQL。如果要使用 MYSQL 作为 Ranger 数据库的数据库服务器，则无需提供此项。有关支持的数据库服务器，请参阅 Ranger KMS 文档。同时确保 ambari-server 已安装所选数据库服务器类型对应的 JDBC 驱动（例如：ambari-server setup --jdbc-driver）。
  - SQL_CONNECTOR_JAR - 默认值为 /usr/share/java/mysql-connector-java.jar
  - KMS_MASTER_KEY_PASSWD
  - db_host - Ranger KMS 将使用的数据库服务器 host:port
  - db_root_user - 部署期间用于创建 Ranger KMS 数据库的、具有 root 访问权限的数据库用户。如果未指定此属性，默认使用 root。

  - db_root_password - root 用户的数据库密码
  - db_password - Ranger KMS schema 的数据库密码

* hadoop-env
  - keyserver_port - Key Management Server 可用的端口号
  - keyserver_host - 安装 Key Management Server 的主机名

## 不使用 stack advisor 部署 Ranger {#deploy-ranger-without-the-use-of-stack-advisor}

不使用 stack advisor 时，所有与 Ranger、Ranger KMS 以及没有默认值的 Ranger 插件相关的配置，都必须在 Blueprint 或集群创建模板中设置。有关所有属性，请参阅 Ranger 和 Ranger 插件文档。

以下是完全手动设置所有内容的 Blueprint 示例（请注意，这只涵盖当前支持的配置属性和 Ranger 插件的子集）：

```json
{
  "configurations" : [
    {
      "admin-properties" : {
        "properties_attributes" : { },
        "properties" : {
          "DB_FLAVOR" : "MYSQL",
          "audit_db_name" : "ranger_audit",
          "db_name" : "ranger",
          "audit_db_user" : "rangerlogger",
          "SQL_CONNECTOR_JAR" : "/usr/share/java/mysql-connector-java.jar",
          "db_user" : "rangeradmin",
          "policymgr_external_url" : "http://%HOSTGROUP::host_group_1%:6080",
          "db_host" : "172.17.0.9:3306",
          "db_root_user" : "root"
        }
      }
    },
    {
      "ranger-kms-security" : {
        "properties_attributes" : { },
        "properties" : {
          "ranger.plugin.kms.policy.source.impl" : "org.apache.ranger.admin.client.RangerAdminRESTClient",
          "ranger.plugin.kms.service.name" : "{{repo_name}}",
          "ranger.plugin.kms.policy.rest.url" : "{{policymgr_mgr_url}}"
        }
      }
    },
    {
      "kms-site" : {
        "properties_attributes" : { },
        "properties" : {
          "hadoop.kms.security.authorization.manager" : "org.apache.ranger.authorization.kms.authorizer.RangerKmsAuthorizer",
          "hadoop.kms.key.provider.uri" : "dbks://http@localhost:9292/kms"
        }
      }
    },
    {
      "ranger-hdfs-plugin-properties" : {
        "properties_attributes" : { },
        "properties" : {
          "REPOSITORY_CONFIG_USERNAME" : "hadoop",
          "ranger-hdfs-plugin-enabled" : "Yes",
          "common.name.for.certificate" : "",
          "policy_user" : "ambari-qa",
          "hadoop.rpc.protection" : ""
        }
      }
    },
    {
      "ranger-admin-site" : {
        "properties_attributes" : { },
        "properties" : {
          "ranger.ldap.group.searchfilter" : "{{ranger_ug_ldap_group_searchfilter}}",
          "ranger.ldap.group.searchbase" : "{{ranger_ug_ldap_group_searchbase}}",
          "ranger.sso.enabled" : "false",
          "ranger.externalurl" : "{{ranger_external_url}}",
          "ranger.sso.browser.useragent" : "Mozilla,chrome",
          "ranger.service.https.attrib.ssl.enabled" : "false",
          "ranger.ldap.ad.referral" : "ignore",
          "ranger.jpa.jdbc.url" : "jdbc:mysql://172.17.0.9:3306/ranger",
          "ranger.https.attrib.keystore.file" : "/etc/ranger/admin/conf/ranger-admin-keystore.jks",
          "ranger.ldap.user.searchfilter" : "{{ranger_ug_ldap_user_searchfilter}}",
          "ranger.jpa.jdbc.driver" : "com.mysql.jdbc.Driver",
          "ranger.authentication.method" : "UNIX",
          "ranger.service.host" : "{{ranger_host}}",
          "ranger.jpa.audit.jdbc.user" : "{{ranger_audit_db_user}}",
          "ranger.ldap.referral" : "ignore",
          "ranger.jpa.audit.jdbc.credential.alias" : "rangeraudit",
          "ranger.service.https.attrib.keystore.pass" : "SECRET:ranger-admin-site:2:ranger.service.https.attrib.keystore.pass",
          "ranger.audit.solr.username" : "ranger_solr",
          "ranger.sso.query.param.originalurl" : "originalUrl",
          "ranger.service.http.enabled" : "true",
          "ranger.audit.source.type" : "solr",
          "ranger.ldap.url" : "{{ranger_ug_ldap_url}}",
          "ranger.service.https.attrib.clientAuth" : "want",
          "ranger.ldap.ad.domain" : "",
          "ranger.ldap.ad.bind.dn" : "{{ranger_ug_ldap_bind_dn}}",
          "ranger.credential.provider.path" : "/etc/ranger/admin/rangeradmin.jceks",
          "ranger.jpa.audit.jdbc.driver" : "{{ranger_jdbc_driver}}",
          "ranger.audit.solr.urls" : "",
          "ranger.sso.publicKey" : "",
          "ranger.ldap.bind.dn" : "{{ranger_ug_ldap_bind_dn}}",
          "ranger.unixauth.service.port" : "5151",
          "ranger.ldap.group.roleattribute" : "cn",
          "ranger.jpa.jdbc.dialect" : "{{jdbc_dialect}}",
          "ranger.sso.cookiename" : "hadoop-jwt",
          "ranger.service.https.attrib.keystore.keyalias" : "rangeradmin",
          "ranger.audit.solr.zookeepers" : "NONE",
          "ranger.jpa.jdbc.user" : "{{ranger_db_user}}",
          "ranger.jpa.jdbc.credential.alias" : "rangeradmin",
          "ranger.ldap.ad.user.searchfilter" : "{{ranger_ug_ldap_user_searchfilter}}",
          "ranger.ldap.user.dnpattern" : "uid={0},ou=users,dc=xasecure,dc=net",
          "ranger.ldap.base.dn" : "dc=example,dc=com",
          "ranger.service.http.port" : "6080",
          "ranger.jpa.audit.jdbc.url" : "{{audit_jdbc_url}}",
          "ranger.service.https.port" : "6182",
          "ranger.sso.providerurl" : "",
          "ranger.ldap.ad.url" : "{{ranger_ug_ldap_url}}",
          "ranger.jpa.audit.jdbc.dialect" : "{{jdbc_dialect}}",
          "ranger.unixauth.remote.login.enabled" : "true",
          "ranger.ldap.ad.base.dn" : "dc=example,dc=com",
          "ranger.unixauth.service.hostname" : "{{ugsync_host}}"
        }
      }
    },
    {
      "dbks-site" : {
        "properties_attributes" : { },
        "properties" : {
          "ranger.ks.jpa.jdbc.url" : "jdbc:mysql://172.17.0.9:3306/rangerkms",
          "hadoop.kms.blacklist.DECRYPT_EEK" : "hdfs",
          "ranger.ks.jpa.jdbc.dialect" : "{{jdbc_dialect}}",
          "ranger.ks.jdbc.sqlconnectorjar" : "{{ews_lib_jar_path}}",
          "ranger.ks.jpa.jdbc.user" : "{{db_user}}",
          "ranger.ks.jpa.jdbc.credential.alias" : "ranger.ks.jdbc.password",
          "ranger.ks.jpa.jdbc.credential.provider.path" : "/etc/ranger/kms/rangerkms.jceks",
          "ranger.ks.masterkey.credential.alias" : "ranger.ks.masterkey.password",
          "ranger.ks.jpa.jdbc.driver" : "com.mysql.jdbc.Driver"
        }
      }
    },
    {
      "kms-env" : {
        "properties_attributes" : { },
        "properties" : {
          "kms_log_dir" : "/var/log/ranger/kms",
          "create_db_user" : "true",
          "kms_group" : "kms",
          "kms_user" : "kms",
          "kms_port" : "9292"
        }
      }
    },
    {
      "ranger-hdfs-security" : {
        "properties_attributes" : { },
        "properties" : {
          "ranger.plugin.hdfs.policy.source.impl" : "org.apache.ranger.admin.client.RangerAdminRESTClient"
        }
      }
    },

    {
      "ranger-env" : {
        "properties_attributes" : { },
        "properties" : {
          "xml_configurations_supported" : "true",
          "ranger_user" : "ranger",
          "xasecure.audit.destination.hdfs.dir" : "hdfs://ambari-agent-1.node.dc1.consul:8020/ranger/audit",
          "create_db_dbuser" : "true",
          "ranger-hdfs-plugin-enabled" : "Yes",
          "ranger_privelege_user_jdbc_url" : "jdbc:mysql://172.17.0.9:3306",
          "ranger-knox-plugin-enabled" : "No",
          "is_solrCloud_enabled" : "false",
          "bind_anonymous" : "false",
          "ranger-yarn-plugin-enabled" : "Yes",
          "ranger-kafka-plugin-enabled" : "No",
          "xasecure.audit.destination.hdfs" : "true",
          "ranger-hive-plugin-enabled" : "No",
          "xasecure.audit.destination.solr" : "false",
          "xasecure.audit.destination.db" : "true",
          "ranger_group" : "ranger",
          "ranger_admin_username" : "amb_ranger_admin",
          "ranger-hbase-plugin-enabled" : "Yes",
          "admin_username" : "admin"
        }
      }
    },

    {
      "kms-properties" : {
        "properties_attributes" : { },
        "properties" : {
          "REPOSITORY_CONFIG_USERNAME" : "keyadmin",
          "KMS_MASTER_KEY_PASSWD" : "SECRET:kms-properties:1:KMS_MASTER_KEY_PASSWD",
          "DB_FLAVOR" : "MYSQL",
          "db_name" : "rangerkms",
          "SQL_CONNECTOR_JAR" : "/usr/share/java/mysql-connector-java.jar",
          "db_user" : "rangerkms",
          "db_host" : "172.17.0.9:3306",
          "db_root_user" : "root"
        }
      }
    },

    {
      "ranger-yarn-security" : {
        "properties_attributes" : { },
        "properties" : {
          "ranger.plugin.yarn.policy.source.impl" : "org.apache.ranger.admin.client.RangerAdminRESTClient"
        }
      }
    },

    {
      "usersync-properties" : {
        "properties_attributes" : { },
        "properties" : { }
      }
    },

    {
      "ranger-hbase-security" : {
        "properties_attributes" : { },
        "properties" : {
          "ranger.plugin.hbase.policy.source.impl" : "org.apache.ranger.admin.client.RangerAdminRESTClient"
        }
      }
    },
    {
      "hdfs-site" : {
        "properties_attributes" : { },
        "properties" : {
          "dfs.encryption.key.provider.uri" : "kms://http@%HOSTGROUP::host_group_1%:9292/kms",
          "dfs.namenode.inode.attributes.provider.class" : "org.apache.ranger.authorization.hadoop.RangerHdfsAuthorizer"
        }
      }
    },
    {
      "ranger-yarn-plugin-properties" : {
        "properties_attributes" : { },
        "properties" : {
          "REPOSITORY_CONFIG_USERNAME" : "yarn",
          "common.name.for.certificate" : "",
          "ranger-yarn-plugin-enabled" : "Yes",
          "policy_user" : "ambari-qa",
          "hadoop.rpc.protection" : ""
        }
      }
    },
    {
      "ranger-hbase-plugin-properties" : {
        "properties_attributes" : { },
        "properties" : {
          "REPOSITORY_CONFIG_USERNAME" : "hbase",
          "common.name.for.certificate" : "",
          "ranger-hbase-plugin-enabled" : "Yes",
          "policy_user" : "ambari-qa"
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
          "name" : "RANGER_ADMIN"
        },
        {
          "name" : "HBASE_REGIONSERVER"
        },
        {
          "name" : "HBASE_CLIENT"
        },
        {
          "name" : "HBASE_MASTER"
        },
        {
          "name" : "RANGER_USERSYNC"
        },
        {
          "name" : "NAMENODE"
        },
        {
          "name" : "NODEMANAGER"
        },
        {
          "name" : "HDFS_CLIENT"
        },
        {
          "name" : "YARN_CLIENT"
        },
        {
          "name" : "MAPREDUCE2_CLIENT"
        },
        {
          "name" : "DATANODE"
        },
        {
          "name" : "RANGER_KMS_SERVER"
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
          "name" : "HISTORYSERVER"
        },
        {
          "name" : "HBASE_REGIONSERVER"
        },
        {
          "name" : "APP_TIMELINE_SERVER"
        },
        {
          "name" : "HDFS_CLIENT"
        },
        {
          "name" : "NODEMANAGER"
        },
        {
          "name" : "SECONDARY_NAMENODE"
        },
        {
          "name" : "DATANODE"
        },
        {
          "name" : "RESOURCEMANAGER"
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
          "name" : "HBASE_REGIONSERVER"
        },
        {
          "name" : "HBASE_CLIENT"
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
          "name" : "DATANODE"
        }
      ],
      "cardinality" : "1"
    }
  ],
  "Blueprints" : {
    "stack_name" : "HDP",
    "stack_version" : "2.3"
  }
}
```
## 以 HA 模式部署 Ranger {#deploy-ranger-in-ha-mode}

与非 HA 模式部署 Ranger 的区别如下：

* 将 RANGER_ADMIN 组件部署到多个主机
* 设置负载均衡器，并将其配置为置于所有 RANGER_ADMIN 实例之前（Ranger Admin 实例的 URL 为 [http://host:port](http://hostport)，默认端口为 6080）
* admin-properties
  - policymgr_external_url - 使用负载均衡器的 URL 覆盖此配置属性的值。每个与 Ranger 交互的组件都使用此属性值连接 Ranger，因此它们会通过负载均衡器连接。
