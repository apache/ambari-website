---
title: Blueprint support for Ranger
---
Starting from HDP2.3 Ranger can be deployed using Blueprints in two ways either using stack advisor or setting all the needed properties in the Blueprint.

## Deploy Ranger with the use of stack advisor

Stack advisor makes simple the deployment of Ranger as it sets automatically the needed properties thus the user has to provided only a minimal set of configurations. The configurations properties that must be provided in either the Blueprint or cluster creation template are:

* admin-properties:
  - DB_FLAVOR - the default is MYSQL. No need to provide this if MYSQL is to be used the database server for Ranger databases. Consult Ranger documentation for supported database servers. Also ensure the ambari-server has the appropriate jdbc driver installed for the selected database server type (e.g.: ambari-server setup --jdbc-driver)
  - db_host - set the host:port of the database server that Ranger Admin will use
  - db_root_user - the db user with root access that will be used during deployment to create the databases used by Ranger. By default root is used if this property is not specified.

  - db_root_password - the password for root user
  - db_password - the password that will be used access the Ranger database
  - audit_db_password - the password that will be used to access the Ranger Audit db
* ranger-env
  - ranger_admin_password - this is the Ambari user password created for creating repositories and policies in Ranger Admin for each plugin
  - ranger-yarn-plugin-enabled - Enable/Disable YARN Ranger plugin. The default is Disable.

  - ranger-hdfs-plugin-enabled - Enable/Disable HDFS Ranger plugin. The default is Disable.

  - ranger-hbase-plugin-enabled -Enable/Disable HBase Ranger plugin. The default is Disable.

  - ... - check Ranger documentation for the list of supported ranger plugins
* kms-properties
  - DB_FLAVOR - the default is MYSQL. No need to provide this if MYSQL is to be used the database server for Ranger databases. Consult Ranger KMS documentation for supported database servers. Also ensure the ambari-server has the appropriate jdbc driver installed for the selected database server type (e.g.: ambari-server setup --jdbc-driver)
  - SQL_CONNECTOR_JAR - the default is /usr/share/java/mysql-connector-java.jar
  - KMS_MASTER_KEY_PASSWD
  - db_host - the host:port of the database server that Ranger KMS will use
  - db_root_user - the db user with root access that will be used during deployment to create the databases used by Ranger KMS. By default root is used if this property is not specified.

  - db_root_password - database password for root user
  - db_password - database password for the Ranger KMS schema

* hadoop-env
  - keyserver_port - Port number where Key Management Server is available
  - keyserver_host - Hostnames where Key Management Server is installed

## Deploy Ranger without the use of stack advisor

Without stack advisor all the configs related to Ranger, Ranger KMS and ranger plugins that don't have default values must be set in the Blueprint or cluster creation template. Consult Ranger and ranger plugin plugins documentation for all properties.

An example of such Blueprint where everything is set manually (note that this just covers a subset of currently supported configuration properties and ranger plugins):

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
## Deploy Ranger in HA mode

The difference from deploying Ranger in non-HA mode is:

* Deploy RANGER_ADMIN component to multiple host
* Setup a load balancer and configure it to front all RANGER_ADMIN instances (The URL of a Ranger Admin instance is [http://host:port](http://hostport) (default port 6080) )
* admin-properties
  - policymgr_external_url - override the value of this configuration property with the URL of the load balancer. Each component interacting with Ranger is using the value of this property to connect to Ranger thus these will connect via the balancer.
