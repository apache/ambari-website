# Custom Services

There are many aspects to creating custom services.  At its most basic a service must include its metainfo.xml and command script.  It also must be packaged to allow adding it to a cluster.  Some of the further sub-sections define optional elements of the service definition which can be included.

## Defining a Custom Service



### Service Metainfo and Component Category

#### metainfo.xml

The `metainfo.xml` file in a Service describes the service, the components of the service and the management scripts to use for executing commands. A component of a service must be either a **MASTER**, **SLAVE** or **CLIENT** category. The

For each Component you must specify the &lt;commandScript&gt; to use when executing commands. There is a defined set of default commands the component must support depending on the components category.

Component Category | Default Lifestyle Commands
-------------------|--------------------------
MASTER  | install, start, stop, configure, status
SLAVE   | install, start, stop, configure, status
CLIENT  | install, configure, status

Ambari supports different commands scripts written in **PYTHON**. The type is used to know how to execute the command scripts. You can also create **custom commands** if there are other commands beyond the default lifecycle commands your component needs to support.

For example, in the YARN Service describes the ResourceManager component as follows in [`metainfo.xml`](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/metainfo.xml):

```xml
<component>
  <name>RESOURCEMANAGER</name>
  <category>MASTER</category>
  <commandScript>
    <script>scripts/resourcemanager.py</script>
    <scriptType>PYTHON</scriptType>
    <timeout>600</timeout>
  </commandScript>
  <customCommands>
    <customCommand>
      <name>DECOMMISSION</name>
      <commandScript>
        <script>scripts/resourcemanager.py</script>
        <scriptType>PYTHON</scriptType>
        <timeout>600</timeout>
      </commandScript>
    </customCommand>
  </customCommands>
</component>
```

The ResourceManager is a MASTER component, and the command script is `<a href="https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/package/scripts/resourcemanager.py">scripts/resourcemanager.py</a>`, which can be found in the `services/YARN/package` directory. That command script is **PYTHON** and that script implements the default lifecycle commands as python methods. This is the **install** method for the default **INSTALL** command:

```python
class Resourcemanager(Script):
  def install(self, env):
    self.install_packages(env)
    self.configure(env)
```

You can also see a custom command is defined **DECOMMISSION**, which means there is also a **decommission** method in that python command script:

```python
def decommission(self, env):
    import params

    ...

    Execute(yarn_refresh_cmd,
            user=yarn_user
    )
    pass
```

### Implementing a Custom Service

In this example, we will create a custom service called "SAMPLESRV". This service includes MASTER, SLAVE and CLIENT components.

#### Create a Custom Service

1. Create a directory named `<strong>SAMPLESRV</strong>` that will contain the service definition for **SAMPLESRV**.

```bash
mkdir SAMPLESRV
cd SAMPLESRV
```
2. Within the `SAMPLESRV` directory, create a `metainfo.xml` file that describes the new service. For example:

```xml
<?xml version="1.0"?>
<metainfo>
    <schemaVersion>2.0</schemaVersion>
    <services>
        <service>
            <name>SAMPLESRV</name>
            <displayName>New Sample Service</displayName>
            <comment>A New Sample Service</comment>
            <version>1.0.0</version>
            <components>
                <component>
                    <name>SAMPLESRV_MASTER</name>
                    <displayName>Sample Srv Master</displayName>
                    <category>MASTER</category>
                    <cardinality>1</cardinality>
                    <commandScript>
                        <script>scripts/master.py</script>
                        <scriptType>PYTHON</scriptType>
                        <timeout>600</timeout>
                    </commandScript>
                </component>
                <component>
                    <name>SAMPLESRV_SLAVE</name>
                    <displayName>Sample Srv Slave</displayName>
                    <category>SLAVE</category>
                    <cardinality>1+</cardinality>
                    <commandScript>
                        <script>scripts/slave.py</script>
                        <scriptType>PYTHON</scriptType>
                        <timeout>600</timeout>
                    </commandScript>
                </component>
                <component>
                    <name>SAMPLESRV_CLIENT</name>
                    <displayName>Sample Srv Client</displayName>
                    <category>CLIENT</category>
                    <cardinality>1+</cardinality>
                    <commandScript>
                        <script>scripts/sample_client.py</script>
                        <scriptType>PYTHON</scriptType>
                        <timeout>600</timeout>
                    </commandScript>
                </component>
            </components>
            <osSpecifics>
                <osSpecific>
                    <osFamily>any</osFamily>
                </osSpecific>
            </osSpecifics>
        </service>
    </services>
</metainfo>
```
3. In the above, the service name is " **SAMPLESRV**", and it contains:

  - one **MASTER** component " **SAMPLESRV_MASTER**"
  - one **SLAVE** component " **SAMPLESRV_SLAVE**"
  - one **CLIENT** component " **SAMPLESRV_CLIENT**"
4. Next, let's create that command script. Create a directory for the command script `SAMPLESRV` `/` ** `package/scripts`** that we designated in the service metainfo.

```bash
mkdir -p package/scripts
cd package/scripts
```
5. Within the scripts directory, create the `.py` command script files mentioned in the metainfo. For example `master.py` file:

```python
import sys
from resource_management import *
class Master(Script):
  def install(self, env):
    print 'Install the Sample Srv Master';
  def configure(self, env):
    print 'Configure the Sample Srv Master';
  def stop(self, env):
    print 'Stop the Sample Srv Master';
  def start(self, env):
    print 'Start the Sample Srv Master';
  def status(self, env):
    print 'Status of the Sample Srv Master';
if __name__ == "__main__":
  Master().execute()
```

For example `slave` `.py` file:

```python
import sys
from resource_management import *
class Slave(Script):
  def install(self, env):
    print 'Install the Sample Srv Slave';
  def configure(self, env):
    print 'Configure the Sample Srv Slave';
  def stop(self, env):
    print 'Stop the Sample Srv Slave';
  def start(self, env):
    print 'Start the Sample Srv Slave';
  def status(self, env):
    print 'Status of the Sample Srv Slave';
if __name__ == "__main__":
  Slave().execute()
```

For example `sample_client` `.py` file:

```python
import sys
from resource_management import *
class SampleClient(Script):
  def install(self, env):
    print 'Install the Sample Srv Client';
  def configure(self, env):
    print 'Configure the Sample Srv Client';
if __name__ == "__main__":
  SampleClient().execute()
```

#### Implementing a Custom Command

1. Browse to the `SAMPLESRV` directory, and edit the `metainfo.xml` file that describes the service. For example, adding a custom command to the SAMPLESRV_CLIENT:

```xml

                <component>
                    <name>SAMPLESRV_CLIENT</name>
                    <displayName>Sample Srv Client</displayName>
                    <category>CLIENT</category>
                    <cardinality>1+</cardinality>
                    <commandScript>
                        <script>scripts/sample_client.py</script>
                        <scriptType>PYTHON</scriptType>
                        <timeout>600</timeout>
                    </commandScript>
                    <customCommands>
                      <customCommand>
                        <name>SOMETHINGCUSTOM</name>
                        <commandScript>
                          <script>scripts/sample_client.py</script>
                          <scriptType>PYTHON</scriptType>
                          <timeout>600</timeout>
                        </commandScript>
                      </customCommand>
                    </customCommands>
                </component>
```
2. Next, let's create that command script by editing the package/scripts/sample_client.py file that we designated in the service metainfo.


```python
import sys
from resource_management import *

class SampleClient(Script):
  def install(self, env):
    print 'Install the Sample Srv Client';
  def configure(self, env):
    print 'Configure the Sample Srv Client';
  def somethingcustom(self, env):
    print 'Something custom';

if __name__ == "__main__":
  SampleClient().execute()
```

#### Adding Configs to the Custom Service

In this example, we will add a configuration type "test-config" to our SAMPLESRV.

1. Modify the metainfo.xml Add the configuration files to the CLIENT component will make it available in the client tar ball downloaded from Ambari.

```xml
<component>
    <name>SAMPLESRV_CLIENT</name>
    <displayName>Sample Srv Client</displayName>
    <category>CLIENT</category>
    <cardinality>1+</cardinality>
    <commandScript>
        <script>scripts/sample_client.py</script>
        <scriptType>PYTHON</scriptType>
        <timeout>600</timeout>
    </commandScript>
    <configFiles>
      <configFile>
        <type>xml</type>
        <fileName>test-config.xml</fileName>
        <dictionaryName>test-config</dictionaryName>
      </configFile>
    </configFiles>
</component>
```
2. Create a directory for the configuration dictionary file `SAMPLESRV` `/` **`configuration`**.

```bash
mkdir -p configuration
cd configuration
```
3. Create the `test-config.xml` file. For example:

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
 
<configuration>
  <property>
    <name>some.test.property</name>
    <value>this.is.the.default.value</value>
    <description>This is a test description.</description>
  </property>
  <property>
    <name>another.test.property</name>
    <value>5</value>
    <description>This is a second test description.</description>
  </property>
</configuration>

```
4. There is an optional setting "configuration-dir". Custom services should either not include the setting or should leave it as the default value "configuration".

```xml
<configuration-dir>configuration</configuration-dir>
```
5. Configuration dependencies can be included in the metainfo.xml in the a " `configuration-dependencies`" section. This section can be added to the service as a whole or a particular component. One of the implications of this dependency is that whenever the config-type is updated, Ambari automatically marks the component or service as requiring restart.

For example, HIVE defines a component level configuration dependencies for the HIVE_METASTORE component

```xml
      <component>
          <name>HIVE_METASTORE</name>
          <displayName>Hive Metastore</displayName>
          <category>MASTER</category>
          <cardinality>1</cardinality>
          <versionAdvertised>true</versionAdvertised>
          <reassignAllowed>true</reassignAllowed>
          <clientsToUpdateConfigs></clientsToUpdateConfigs>
... ...
          <configuration-dependencies>
            <config-type>hive-site</config-type>
          </configuration-dependencies>
        </component>
```

HIVE also defines service level configuration dependencies.

```xml
<configuration-dependencies>
   <config-type>core-site</config-type>
   <config-type>hive-log4j</config-type>
   <config-type>hive-exec-log4j</config-type>
   <config-type>hive-env</config-type>
   <config-type>hivemetastore-site.xml</config-type>
   <config-type>webhcat-site</config-type>
   <config-type>webhcat-env</config-type>
   <config-type>parquet-logging</config-type>
   <config-type>ranger-hive-plugin-properties</config-type>
   <config-type>ranger-hive-audit</config-type>
   <config-type>ranger-hive-policymgr-ssl</config-type>
   <config-type>ranger-hive-security</config-type>
   <config-type>mapred-site</config-type>
   <config-type>application.properties</config-type>
   <config-type>druid-common</config-type>
 </configuration-dependencies>
```

## Packaging and Installing Custom Services

### Introduction

Custom services in Apache Ambari can be packaged and installed in many ways. Ideally, they should all be packaged and installed in the same manner. This document describes how to package and install custom services using Extensions and Management Packs. Using this approach, the custom service definitions do not get inserted under the stack versions services directory. This keeps the stack clean and allows users to easily see which services were installed by which package (stack or extension).

### Management Packs

A [management pack](./management-packs.md) is a mechanism for installing stacks, extensions and custom services. A management pack is packaged as a tar.gz file which expands as a directory that includes an mpack.json file and the stack, extension and custom service definitions that it defines.

#### Example Structure

myext-mpack1.0.0.0

├── mpack.json

└──

#### mpack.json Format

The mpacks.json file allows you to specify the name, version and description of the management pack along with the prerequisites for installing the management pack. For extension management packs, the only important prerequisite is the min_ambari_version. The most important part is the artifacts section. For the purpose here, the artifact type will always be "extension-definitions". You can provide any name for the artifact and you can potentially change the source_dir if you wish to package your extensions under a different directory than "extensions". For consistency, it is recommended that you use the default source_dir "extensions".

```json
{

"type" : "full-release",

"name" : "myextension-mpack",

"version": "1.0.0.0",

"description" : "MyExtension Management Pack",

"prerequisites": {

"min_ambari_version" : "2.4.0.0"

},

"artifacts": [

{

"name" : "myextension-extension-definitions",

"type" : "extension-definitions",

"source_dir": "extensions"

}

]

}
```

### Extensions

An [extension](./extensions.md)is a collection of one or more custom services which are packaged together. Much like stacks, each extension has a name which needs to be unique in the cluster. It also has a version folder to distinguish different releases of the extension which go in the resources/extensions folder with

An extension version is similar to a stack version but it only includes the metainfo.xml and the services directory. This means that the alerts, kerberos, metrics, role command order and widgets files are not supported and should be included at the service level. In addition, the repositories, hooks, configurations, and upgrades directories are not supported although upgrade support can be added at the service level.

#### Extension Structure

```
MY_EXT

└── 1.0

        ├── metainfo.xml

        └── services

                ├── SERVICEA

                ├── ...
```

#### Extension metainfo.xml Format:

The extension metainfo.xml is very simple, it just specifies the minimum stack versions which are supported.

```xml
<metainfo>

  <prerequisites>

    <min-stack-versions>

      <stack>

        <name>BIGTOP</name>

        <version>1.0.*</version>

      </stack>

    </min-stack-versions>

  </prerequisites>

</metainfo>
```

#### Extension Inheritance

Extension versions can _extend_ other Extension versions in order to share command scripts and configurations. This reduces duplication of code across Extensions with the following:

* add new Services in the child Extension version (not in the parent Extension version)
* override command scripts of the parent Services
* override configurations of the parent Services

For example, **MyExtension 2.0**could extend **MyExtension 1.0** so only the changes applicable to **the MyExtension 2.0** extension are present in that Extension definition. This extension is defined in the metainfo.xml for **MyExtension 2.0**:

```xml
<metainfo>
  <extends>1.0</extends>

```

### Extension Management Packs Structure

```
myext-mpack1.0.0.0

├── mpack.json

└── extensions

        └── MY_EXT

                └── 1.0

                        ├── metainfo.xml

                        └── services

                                └── SERVICEA

                └── 2.0

                         ├── metainfo.xml

                         └── services

                                 ├── SERVICEA

                                 └── …


```

### Installing Management Packs

In order to install an extension management pack, you run the following command with or without the "-v" option:

ambari-server install-mpack --mpack=/dir/to/myext-mpack-1.0.0.0.tar.gz -v

This will check to see if the management pack's prerequisites are met (min_ambari_version). In addition it will check to see if there are any errors in the management pack format. Assuming everything is correct, the management pack will be extracted in:

/var/lib/ambariserver/resources/mpacks.

It will then create symlinks from /var/lib/ambari-server/resources/extensions for each extension version in /var/lib/ambari-server/resources/mpacks/

Extension Directory | Target Management Pack Symlink
--------------------|------------------------------------------------------------------
resources/extensions/MY_EXT/1.0 | resources/mpacks/myext-mpack1.0.0.0/extensions/MY_EXT/1.0
resources/extensions/MY_EXT/2.0 | resources/mpacks/myext-mpack1.0.0.0/extensions/MY_EXT/2.0

### Verifying the Extension Installation

Once you have installed the extension management pack, you can restart ambari-server.

```bash
ambari-server restart
```

After ambari-server has been restarted, you will see in the ambari DB your extension listed in the extension table:

```
ambari=> select * from extension;

extension_id | extension_name | extension_version

--------------+----------------+-------------------

1 | EXT | 1.0

(1 row)
```

You can also query for extensions by calling REST APIs.

```
curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://

{

"href" : "http://

"items" : [{

"href" : "http://

"Extensions" : {

"extension_name" : "EXT"

}

}]

}

curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://

{

"href" : "http://

"Extensions" : {

"extension_name" : "EXT"

},

"versions" : [{

"href" : "http://

"Versions" : {

"extension_name" : "EXT",

"extension_version" : "1.0"

}

}]

}

curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://

{

"href" : "http://

"Versions" : {

"extension-errors" : [ ],

"extension_name" : "EXT",

"extension_version" : "1.0",

"parent_extension_version" : null,

"valid" : true

}

}
```

### Linking Extensions to the Stack

Once you have verified that Ambari knows about your extension, the next step is linking the extension version to the current stack version. Linking adds the extension version's services to the list of stack version services. This allows you to install the extension services on the cluster. Linking an extension version to a stack version, will first verify whether the extension supports the given stack version. This is determined by the stack versions listed in the extension version's metainfo.xml.

The following REST API call, will link an extension version to a stack version. In this example it is linking EXT/1.0 with the BIGTOP/1.0 stack version.

```bash
curl -u admin:admin -H 'X-Requested-By: ambari' -X POST -d '{"ExtensionLink": {"stack_name": "BIGTOP", "stack_version": "1.0", "extension_name": "EXT", "extension_version": "1.0"}}' http://
```

You can examine links (or extension links) either in the Ambari DB or with REST API calls.

```
ambari=> select * from extensionlink;

link_id | stack_id | extension_id

---------+----------+--------------

1 | 2 | 1

(1 row)

curl -u admin:admin -H 'X-Requested-By:ambari' -X GET 'http://

{

"href" : "http://

"items" : [{

"href" : "http://

"ExtensionLink" : {

"extension_name" : "EXT",

"extension_version" : "1.0",

"link_id" : 1,

"stack_name" : "BIGTOP",

"stack_version" : "1.0"

}

}]

}
```

## Role Command Order

Each service can define its own role command order by including a role_command_order.json file in its service folder. The service should only specify the relationship of its components to other components. In other words, if a service only includes COMP_X, it should only list dependencies related to COMP_X. If when COMP_X starts it is dependent on the NameNode start and when the NameNode stops it should wait for COMP_X to stop, the following would be included in the role command order:

```json
{
  "_comment" : "Record format:",
  "_comment" : "blockedRole-blockedCommand: [blockerRole1-blockerCommand1, blockerRole2-blockerCommand2, ...]",
  "general_deps" : {
    "_comment" : "dependencies for all cases"
  },
  "_comment" : "Dependencies that are used when GLUSTERFS is not present in cluster",
  "optional_no_glusterfs": {
    "COMP_X-START": ["NAMENODE-START"],
    "NAMENODE-STOP": ["COMP_X-STOP"]
  }
}
```

The entries in the service's role command order will be merged with the role command order defined in the stack. For example, since the stack already has a dependency for NAMENODE-STOP, in the example above COMP_X-STOP would be added to the rest of the NAMENODE-STOP dependencies and the COMP_X-START dependency on NAMENODE-START would be added as a new dependency.

**Sections**
Ambari uses the below sections only:

Section Name | When Used
-------------|------------
general_deps | Command orders are applied in all situations
optional_glusterfs | Command orders are applied when cluster has instance of GLUSTERFS service
optional_no_glusterfs | Command orders are applied when cluster does not have instance of GLUSTERFS service
namenode_optional_ha | Command orders are applied when HDFS service is installed and JOURNALNODE component exists (HDFS HA is enabled)
resourcemanager_optional_ha | Command orders are applied when YARN service is installed and multiple RESOURCEMANAGER host-components exist (YARN HA is enabled)

**Commands**
Commands currently supported by Ambari are

* INSTALL
* UNINSTALL
* START
* RESTART
* STOP
* EXECUTE
* ABORT
* UPGRADE
* SERVICE_CHECK
* CUSTOM_COMMAND
* ACTIONEXECUTE

## Service Advisor

Each custom service can provide a service advisor as a Python script named service-advisor.py in their service folder. A Service Advisor allows custom services to integrate into the stack advisor behavior which only applies to the services within the stack.

### Service Advisor Inheritance

Unlike the Stack-advisor scripts, the service-advisor scripts do not automatically extend the parent service's service-advisor scripts. The service-advisor script needs to explicitly extend their parent's service service-advisor script.  The following code sample shows how you would refer to a parent's service_advisor.py.  In this case it is extending the root service-advisor.py file in the resources/stacks directory.

**Sample service-advisor.py file inheritance**

```python
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STACKS_DIR = os.path.join(SCRIPT_DIR, '../../../stacks/')
PARENT_FILE = os.path.join(STACKS_DIR, 'service_advisor.py')
 
try:
  with open(PARENT_FILE, 'rb') as fp:
    service_advisor = imp.load_module('service_advisor', fp, PARENT_FILE, ('.py', 'rb', imp.PY_SOURCE))
except Exception as e:
  traceback.print_exc()
  print "Failed to load parent"
 
class HAWQ200ServiceAdvisor(service_advisor.ServiceAdvisor):
```

### Service Advisor Behavior

Like the stack advisors, service advisors provide information on 4 important aspects for the service:

1. Recommend layout of the service on cluster
2. Recommend service configurations
3. Validate layout of the service on cluster
4. Validate service configurations

By providing the service-advisor.py file, one can control dynamically each of the above for the service. 

The [main interface for the service-advisor](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/service_advisor.py#L51) scripts contains documentation on how each of the above are called, and what data is provided.

**Base service_advisor.py from resources/stacks**

```python

class ServiceAdvisor(DefaultStackAdvisor):
 
  def colocateService(self, hostsComponentsMap, serviceComponents):
    pass
 
  def getServiceConfigurationRecommendations(self, configurations, clusterSummary, services, hosts):
    pass
 
  def getServiceComponentLayoutValidations(self, services, hosts):
    return []
 
  def getServiceConfigurationsValidationItems(self, configurations, recommendedDefaults, services, hosts):
    return []
```

**Examples**
[Service Advisor interface](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/service_advisor.py#L51)
[HAWQ 2.0.0 Service Advisor implementation](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HAWQ/2.0.0/service_advisor.py)
[PXF 3.0.0 Service Advisor implementation](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/PXF/3.0.0/service_advisor.py)

## Service Inheritance

A service can inherit through the stack but may also inherit directly from common-services. This is declared in the metainfo.xml:

```xml
<metainfo>
  <schemaVersion>2.0</schemaVersion>
  <services>
    <service>
      <name>HDFS</name>
      <extends>common-services/HDFS/2.1.0.2.0</extends>
```

When a service inherits from another service version, how its defining files and directories are inherited follows a number of different patterns.

The following files if defined in the current service version replace the definitions from the parent service version:

* alerts.json
* kerberos.json
* metrics.json
* role_command_order.json
* service_advisor.py
* widgets.json

Note: All the services' role command orders will be merge with the stack's role command order to provide a master list.

The following files if defined in the current service version are merged with the parent service version (supports removing/deleting parent entries):

* quicklinks/quicklinks.json
* themes/theme.json

The following directories if defined in the current service version replace those from the parent service version:

* packages
* upgrades

This means the files included in those directories at the parent level will not be inherited. You will need to copy all the files you wish to keep from that directory structure.

The configurations directory in the current service version merges the configuration files with those from the parent service version. Configuration files defined at any level can be omitted from the services configurations by specifying the config-type in the excluded-config-types list:

```xml
      <excluded-config-types>
        <config-type>storm-site</config-type>
      </excluded-config-types>
```

For an individual configuration file (or configuration type) like core-site.xml, it will by default merge with the configuration type from the parent. If the `supports_do_not_extend` attribute is specified as `true`, the configuration type will **not** be merged.

```xml
<configuration supports_do_not_extend="true">
```

### Inheritance and the Service MetaInfo

By default all attributes of the service and components if defined in the metainfo.xml of the current service version will replace those of the parent service version unless specified in the sections that follow.

```xml
<metainfo>
  <schemaVersion>2.0</schemaVersion>
  <services>
    <service>
      <name>HDFS</name>
      <displayName>HDFS</displayName>
      <comment>Apache Hadoop Distributed File System</comment>
      <version>2.1.0.2.0</version>
      <components>
        <component>
          <name>NAMENODE</name>
          <displayName>NameNode</displayName>
          <category>MASTER</category>
          <cardinality>1-2</cardinality>
          <versionAdvertised>true</versionAdvertised>
          <reassignAllowed>true</reassignAllowed>
          <commandScript>
            <script>scripts/namenode.py</script>
            <scriptType>PYTHON</scriptType>
            <timeout>1800</timeout>
          </commandScript>
          ...
```

The custom commands defined in the metainfo.xml of the current service version are merged with those of the parent service version.

```xml
          <customCommands>
            <customCommand>
              <name>DECOMMISSION</name>
              <commandScript>
                <script>scripts/namenode.py</script>
                <scriptType>PYTHON</scriptType>
                <timeout>600</timeout>
              </commandScript>
            </customCommand>
```

The configuration dependencies defined in the metainfo.xml of the current service version are merged with those of the parent service version.

```xml
      <configuration-dependencies>
        <config-type>core-site</config-type>
        <config-type>hdfs-site</config-type>
        ...
      </configuration-dependencies>

```

The components defined in the metainfo.xml of the current service are merged with those of the parent (supports delete).

```xml
        <component>
          <name>ZKFC</name>
          <displayName>ZKFailoverController</displayName>
          <category>SLAVE</category>
```

## Service Upgrade

Each custom service can define its upgrade within its service definition. This allows the custom service to be integrated within the [stack's upgrade](https://cwiki.apache.org/confluence/display/AMBARI/How-To+Define+Stacks+and+Services#How-ToDefineStacksandServices-StackUpgrades).

### Service Upgrade Packs

Each service can define _upgrade-packs_, which are XML files describing the upgrade process of that particular service and how the upgrade pack relates to the overall stack upgrade-packs. These _upgrade-pack_ XML files are placed in the service's _upgrades/_ folder in separate sub-folders specific to the stack-version they are meant to extend. Some examples of this can be seen in the testing code.

**Examples**

- [Upgrades folder](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.0.5/services/HDFS/upgrades/)
- [Upgrade-pack XML](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.0.5/services/HDFS/upgrades/HDP/2.2.0/upgrade_test_15388.xml)

### Matching Upgrade Packs

Each upgrade-pack that the service defines should match the file name of the service defined by a particular stack version. For example in the testing code, HDP 2.2.0 had an [upgrade_test_15388.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.2.0/upgrades/upgrade_test_15388.xml) upgrade-pack. The HDFS service defined an extension to that upgrade pack [HDP/2.0.5/services/HDFS/upgrades/HDP/2.2.0/upgrade_test_15388.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.0.5/services/HDFS/upgrades/HDP/2.2.0/upgrade_test_15388.xml). In this case the upgrade-pack was defined in the HDP/2.0.5 stack. The upgrade-pack is an extension to HDP/2.2.0 because it is defined in upgrade/HDP/2.2.0 directory. Finally the name of the service's extension to the upgrade-pack upgrade_test_15388.xml matches the name of the upgrade-pack in HDP/2.2.0/upgrades.

**Upgrade XML Format**

The file format for the service is much the same as that of the stack. The target, target-stack and type attributes should all be the same as the stack's upgrade-pack.

**Prerequisite Checks**

The service is able to add its own prerequisite checks.

**General Attributes and Prerequisite Checks**
```xml
<upgrade xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <target>2.4.*</target>
  <target-stack>HDP-2.4.0</target-stack>
  <type>ROLLING</type>
  <prerequisite-checks>
    <check>org.apache.ambari.server.checks.FooCheck</check>
  </prerequisite-checks>
```

**Order Section**

The order section of the upgrade-pack, consists of group elements just like the stack's upgrade-pack. The key difference is defining how these groups relate to groups in the stack's upgrade pack or other service upgrade-packs. In the first example we are referencing the PRE_CLUSTER group and adding a new execute-stage for the service FOO. The entry is supposed to be added after the execute-stage for HDFS based on the

**Order Section - Add After Group Entry**
```xml

<order>
  <group xsi:type="cluster" name="PRE_CLUSTER" title="Pre {{direction.text.proper}}">
    <add-after-group-entry>HDFS</add-after-group-entry>
    <execute-stage service="FOO" component="BAR" title="Backup FOO">
      <task xsi:type="manual">
        <message>Back FOO up.</message>
      </task>
    </execute-stage>
  </group>

```

The same syntax can be used to order other sections like service check priorities and group services.

**Order Section - Further Add After Group Entry Examples**
```xml
<group name="SERVICE_CHECK1" title="All Service Checks" xsi:type="service-check">
  <add-after-group-entry>ZOOKEEPER</add-after-group-entry>
  <priority>
    <service>HBASE</service>
  </priority>
</group>
 
<group name="CORE_MASTER" title="Core Masters">
  <add-after-group-entry>YARN</add-after-group-entry>
  <service name="HBASE">
    <component>HBASE_MASTER</component>
  </service>
</group>
```

It is also possible to add new groups and order them after other groups in the stack's upgrade-packs. In the following example, we are adding the FOO group after the HIVE group using the add-after-group tag.

**Order Section - Add After Group**
```xml
<group name="FOO" title="Foo">
  <add-after-group>HIVE</add-after-group>
  <skippable>true</skippable>
  <allow-retry>false</allow-retry>
  <service name="FOO">
    <component>BAR</component>
  </service>
</group>
```

You could also include both the add-after-group and the add-after-group-entry tags in the same group. This will create a new group if it doesn't already exist and will order it after the add-after-group's group name. The add-after-group-entry will determine the internal ordering of that group's services, priorities or execute stages.

**Order Section - Add After Group**
```xml
<group name="FOO" title="Foo">
  <add-after-group>HIVE</add-after-group>
  <add-after-group-entry>FOO</add-after-group-entry>
  <skippable>true</skippable>
  <allow-retry>false</allow-retry>
  <service name="FOO2">
    <component>BAR2</component>
  </service>
</group>
```

**Processing Section**

The processing section of the upgrade-pack remains the same as what it would be in the stack's upgrade-pack.

**Processing Section**
```xml
   <processing>
    <service name="FOO">
      <component name="BAR">
        <upgrade>
          <task xsi:type="restart-task" />
        </upgrade>
      </component>
      <component name="BAR2">
        <upgrade>
          <task xsi:type="restart-task" />
        </upgrade>
      </component>
    </service>
  </processing>
```
## Custom Service Repo

Each service can define its own repo info by adding repos/repoinfo.xml in its service folder.  The service specific repo will be included in the list of repos defined for the stack. 

**Example**: https://github.com/apache/ambari/blob/trunk/contrib/management-packs/microsoft-r_mpack/src/main/resources/custom-services/MICROSOFT_R_SERVER/8.0.5/repos/repoinfo.xml

```xml

<reposinfo>
  <os family="redhat6">
    <repo>
      <baseurl>http://cust.service.lab.com/Services/centos6/1.1/myservices</baseurl>
      <repoid>CUSTOM-1.1</repoid>
      <reponame>CUSTOM</reponame>
    </repo>
  </os>
</reposinfo>
```

## Custom Services - Additional Configuration

### Alerts

Each service is capable of defining which alerts Ambari should track by providing an [alerts.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HDFS/2.1.0.2.0/alerts.json) file.

### Kerberos

Ambari is capable of enabling and disabling Kerberos for a cluster. To inform Ambari of the identities and configurations to be used for the service and its components, each service can provide a _kerberos.json_ file.

### Metrics

Ambari provides the [Ambari Metrics System ("AMS")](../metrics/index.md)service for collecting, aggregating and serving Hadoop and system metrics in Ambari-managed clusters.

Each service can define which metrics AMS should collect and provide by defining a [metrics.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HDFS/2.1.0.2.0/metrics.json) file.

Read more about the metrics.json file format in the [Stack Defined Metrics](../metrics/stack-defined-metrics.md) page.

### Quick Links

A service can add a list of quick links to the Ambari web UI by adding a quick links JSON file. Ambari server parses the quick links JSON file and provides its content to the Ambari web UI. The UI can calculate quick link URLs based on that information and populate the quick links drop-down list accordingly.

### Widgets

Each service can define which widgets and heat maps show up by default on the service summary page by defining a [widgets.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HDFS/2.1.0.2.0/widgets.json) file.
