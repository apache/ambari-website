---
title: 自定义服务
---

<!---
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
--->

# 自定义服务 {#custom-services}

There 是 many aspects to creating custom services.  At its most basic a service 必须 include its metainfo.xml 和 command script.  It also 必须 be packaged to allow adding it to a cluster.  Some of the further sub-sections define optional elements of the service definition which 可以 be included.

## 定义自定义服务 {#defining-a-custom-service}



### 服务元信息和组件类别 {#service-metainfo-and-component-category}

#### metainfo.xml {#metainfoxml}

The `metainfo.xml` file in a Service describes the service, the components of the service 和 the management scripts to use for executing commands. A component of a service 必须 be either a **MASTER**, **SLAVE** 或 **CLIENT** category. The

For each Component you 必须 specify the &lt;commandScript&gt; to use when executing commands. There 是 a defined set of default commands the component 必须 support depending on the components category.

组件类别 | 默认生命周期命令
-------------------|--------------------------
MASTER  | install, start, stop, configure, status
SLAVE   | install, start, stop, configure, status
CLIENT  | install, configure, status

Ambari supports different commands scripts written in **PYTHON**. The type 是 used to know how to execute the command scripts. 您可以 also create **custom commands** if there 是 other commands beyond the default lifecycle commands your component needs to support.

例如, in the YARN Service describes the ResourceManager component as follows in [`metainfo.xml`](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/metainfo.xml):

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

The ResourceManager 是 a MASTER component, 和 the command script 是 `<a href="https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/YARN/package/scripts/resourcemanager.py">scripts/resourcemanager.py</a>`, which 可以 be found in the `services/YARN/package` directory. That command script 是 **PYTHON** 和 that script implements the default lifecycle commands as python methods. This 是 the **install** method for the default **INSTALL** command:

```python
class Resourcemanager(Script):
  def install(self, env):
    self.install_packages(env)
    self.configure(env)
```

您可以 also see a custom command 是 defined **DECOMMISSION**, which means there 是 also a **decommission** method in that python command script:

```python
def decommission(self, env):
    import params

    ...

    Execute(yarn_refresh_cmd,
            user=yarn_user
    )
    pass
```

### 实现自定义服务 {#implementing-a-custom-service}

在本示例中, we will create a custom service called "SAMPLESRV". This service includes MASTER, SLAVE 和 CLIENT components.

#### 创建自定义服务 {#create-a-custom-service}

1. Create a directory named `<strong>SAMPLESRV</strong>` that will contain the service definition for **SAMPLESRV**.

```bash
mkdir SAMPLESRV
cd SAMPLESRV
```
2. Within the `SAMPLESRV` directory, create a `metainfo.xml` file that describes the new service. 例如:

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
3. In the above, the service name 是 " **SAMPLESRV**", 和 it contains:

  - one **MASTER** component " **SAMPLESRV_MASTER**"
  - one **SLAVE** component " **SAMPLESRV_SLAVE**"
  - one **CLIENT** component " **SAMPLESRV_CLIENT**"
4. 接下来创建命令脚本。创建服务元信息中指定的命令脚本目录 `SAMPLESRV` `/` ** `package/scripts`**。

```bash
mkdir -p package/scripts
cd package/scripts
```
5. Within the scripts directory, create the `.py` command script files mentioned in the metainfo. 例如 `master.py` file:

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

例如 `slave` `.py` file:

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

例如 `sample_client` `.py` file:

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

#### 实现自定义命令 {#implementing-a-custom-command}

1. Browse to the `SAMPLESRV` directory, 和 edit the `metainfo.xml` file that describes the service. 例如, adding a custom command to the SAMPLESRV_CLIENT:

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
2. 接下来通过编辑服务元信息中指定的 package/scripts/sample_client.py 文件来创建命令脚本。


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

#### 向自定义服务添加配置 {#adding-configs-to-the-custom-service}

在本示例中, we will add a configuration type "test-config" to our SAMPLESRV.

1. Modify the metainfo.xml Add the configuration files to the CLIENT component will make it available in the client tar ball downloaded 从 Ambari.

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
3. Create the `test-config.xml` file. 例如:

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
4. There 是 an optional setting "configuration-dir". Custom services 应 either not include the setting 或 应 leave it as the default value "configuration".

```xml
<configuration-dir>configuration</configuration-dir>
```
5. Configuration dependencies 可以 be included in the metainfo.xml in the a " `configuration-dependencies`" section. 本节 可以 be added to the service as a whole 或 a particular component. One of the implications of this dependency 是 that whenever the config-type 是 updated, Ambari automatically marks the component 或 service as requiring restart.

例如, HIVE defines a component level configuration dependencies for the HIVE_METASTORE component

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

## 打包和安装自定义服务 {#packaging-and-installing-custom-services}

### 简介 {#introduction}

Custom services in Apache Ambari 可以 be packaged 和 installed in many ways. Ideally, they 应 all be packaged 和 installed in the same manner. This document describes how to package 和 install custom services 使用 Extensions 和 Management Packs. Using this approach, the custom service definitions do not get inserted under the stack versions services directory. This keeps the stack clean 和 allows users to easily see which services were installed by which package (stack 或 extension).

### 管理包 {#management-packs}

A [management pack](./management-packs.md) 是 a mechanism for installing stacks, extensions 和 custom services. A management pack 是 packaged as a tar.gz file which expands as a directory that includes an mpack.json file 和 the stack, extension 和 custom service definitions that it defines.

#### 示例结构 {#example-structure}

myext-mpack1.0.0.0

├── mpack.json

└──

#### mpack.json 格式 {#mpackjson-format}

The mpacks.json file allows you to specify the name, version 和 description of the management pack along with the prerequisites for installing the management pack. For extension management packs, the only important prerequisite 是 the min_ambari_version. The most important part 是 the artifacts section. For the purpose here, the artifact type will always be "extension-definitions". 您可以 provide any name for the artifact 和 you 可以 potentially change the source_dir if you wish to package your extensions under a different directory than "extensions". For consistency, it 是 recommended that you use the default source_dir "extensions".

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

### 扩展 {#extensions}

An [extension](./extensions.md)is a collection of one 或 more custom services which 是 packaged together. Much like stacks, each extension has a name which needs to be unique in the cluster. It also has a version folder to distinguish different releases of the extension which go in the resources/extensions folder with

An extension version 是 similar to a stack version but it only includes the metainfo.xml 和 the services directory. This means that the alerts, kerberos, metrics, role command order 和 widgets files 是 not supported 和 应 be included at the service level. In addition, the repositories, hooks, configurations, 和 upgrades directories 是 not supported although upgrade support 可以 be added at the service level.

#### 扩展结构 {#extension-structure}

```
MY_EXT

└── 1.0

        ├── metainfo.xml

        └── services

                ├── SERVICEA

                ├── ...
```

#### 扩展 metainfo.xml 格式： {#extension-metainfoxml-format}

The extension metainfo.xml 是 very simple, it just specifies the minimum stack versions which 是 supported.

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

#### 扩展继承 {#extension-inheritance}

Extension versions 可以 _extend_ other Extension versions in order to share command scripts 和 configurations. This reduces duplication of code across Extensions with the following:

 * 在子扩展版本中添加新服务（不在父扩展版本中）
* override command scripts of the parent Services
* override configurations of the parent Services

例如, **MyExtension 2.0**could extend **MyExtension 1.0** so only the changes applicable to **the MyExtension 2.0** extension 是 present in that Extension definition. This extension 是 defined in the metainfo.xml for **MyExtension 2.0**:

```xml
<metainfo>
  <extends>1.0</extends>

```

### 扩展管理包结构 {#extension-management-packs-structure}

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

### 安装管理包 {#installing-management-packs}

In order to install an extension management pack, you run the following command with 或 without the "-v" option:

ambari-server install-mpack --mpack=/dir/to/myext-mpack-1.0.0.0.tar.gz -v

This will check to see if the management pack's prerequisites 是 met (min_ambari_version). In addition it will check to see if there 是 any errors in the management pack format. Assuming everything 是 correct, the management pack will be extracted in:

/var/lib/ambariserver/resources/mpacks.

It will then create symlinks 从 /var/lib/ambari-server/resources/extensions for each extension version in /var/lib/ambari-server/resources/mpacks/

扩展目录 | 目标管理包符号链接
--------------------|------------------------------------------------------------------
resources/extensions/MY_EXT/1.0 | resources/mpacks/myext-mpack1.0.0.0/extensions/MY_EXT/1.0
resources/extensions/MY_EXT/2.0 | resources/mpacks/myext-mpack1.0.0.0/extensions/MY_EXT/2.0

### 验证扩展安装 {#verifying-the-extension-installation}

Once you have installed the extension management pack, you 可以 restart ambari-server.

```bash
ambari-server restart
```

重启 ambari-server 后，您将在 Ambari 数据库的扩展表中看到列出的扩展：

```
ambari=> select * from extension;

extension_id | extension_name | extension_version

--------------+----------------+-------------------

1 | EXT | 1.0

(1 row)
```

您可以 also query for extensions by calling REST APIs.

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

### 将扩展链接到 Stack {#linking-extensions-to-the-stack}

Once you have verified that Ambari knows about your extension, the next step 是 linking the extension version to the current stack version. Linking adds the extension version's services to the list of stack version services. This allows you to install the extension services on the cluster. Linking an extension version to a stack version, will first verify whether the extension supports the given stack version. This 是 determined by the stack versions listed in the extension version's metainfo.xml.

以下 REST API call, will link an extension version to a stack version. 在本示例中 it 是 linking EXT/1.0 with the BIGTOP/1.0 stack version.

```bash
curl -u admin:admin -H 'X-Requested-By: ambari' -X POST -d '{"ExtensionLink": {"stack_name": "BIGTOP", "stack_version": "1.0", "extension_name": "EXT", "extension_version": "1.0"}}' http://
```

您可以 examine links (or extension links) either in the Ambari DB 或 with REST API calls.

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

## 角色命令顺序 {#role-command-order}

Each service 可以 define its own role command order by including a role_command_order.json file in its service folder. The service 应 only specify the relationship of its components to other components. In other words, if a service only includes COMP_X, it 应 only list dependencies related to COMP_X. If when COMP_X starts it 是 dependent on the NameNode start 和 when the NameNode stops it 应 wait for COMP_X to stop, the following would be included in the role command order:

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

The entries in the service's role command order will be merged with the role command order defined in the stack. 例如, since the stack already has a dependency for NAMENODE-STOP, in the example above COMP_X-STOP would be added to the rest of the NAMENODE-STOP dependencies 和 the COMP_X-START dependency on NAMENODE-START would be added as a new dependency.

**Sections**
Ambari uses the below sections only:

Section Name | When Used
-------------|------------
general_deps | Command orders 是 applied in all situations
optional_glusterfs | Command orders 是 applied when cluster has instance of GLUSTERFS service
optional_no_glusterfs | Command orders 是 applied when cluster does not have instance of GLUSTERFS service
namenode_optional_ha | Command orders 是 applied when HDFS service 是 installed 和 JOURNALNODE component exists (HDFS HA 是 enabled)
resourcemanager_optional_ha | Command orders 是 applied when YARN service 是 installed 和 multiple RESOURCEMANAGER host-components exist (YARN HA 是 enabled)

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

## 服务顾问 {#service-advisor}

Each custom service 可以 provide a service advisor as a Python script named service-advisor.py in their service folder. A Service Advisor allows custom services to integrate 到 the stack advisor behavior which only applies to the services within the stack.

### 服务顾问 Inheritance {#service-advisor-inheritance}

Unlike the Stack-advisor scripts, the service-advisor scripts do not automatically extend the parent service's service-advisor scripts. The service-advisor script needs to explicitly extend their parent's service service-advisor script.  以下 code sample shows how you would refer to a parent's service_advisor.py.  In this case it 是 extending the root service-advisor.py file in the resources/stacks directory.

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

### 服务顾问 Behavior {#service-advisor-behavior}

与 Stack 顾问一样，服务顾问会为服务的 4 个重要方面提供信息：

1. Recommend layout of the service on cluster
2. Recommend service configurations
3. Validate layout of the service on cluster
4. Validate service configurations

By providing the service-advisor.py file, one 可以 control dynamically each of the above for the service. 

The [main interface for the service-advisor](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/service_advisor.py#L51) scripts contains documentation on how each of the above 是 called, 和 what data 是 provided.

**Base service_advisor.py 从 resources/stacks**

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

## 服务继承 {#service-inheritance}

A service 可以 inherit through the stack but may also inherit directly 从 common-services. This 是 declared in the metainfo.xml:

```xml
<metainfo>
  <schemaVersion>2.0</schemaVersion>
  <services>
    <service>
      <name>HDFS</name>
      <extends>common-services/HDFS/2.1.0.2.0</extends>
```

When a service inherits 从 another service version, how its defining files 和 directories 是 inherited follows a number of different patterns.

以下 files if defined in the current service version replace the definitions 从 the parent service version:

* alerts.json
* kerberos.json
* metrics.json
* role_command_order.json
* service_advisor.py
* widgets.json

注意：所有服务的角色命令顺序都会与 Stack 的角色命令顺序合并，以提供主列表。

以下 files if defined in the current service version 是 merged with the parent service version (supports removing/deleting parent entries):

* quicklinks/quicklinks.json
* themes/theme.json

以下 directories if defined in the current service version replace those 从 the parent service version:

* packages
* upgrades

This means the files included in those directories at the parent level will not be inherited. You will need to copy all the files you wish to keep 从 that directory structure.

The configurations directory in the current service version merges the configuration files with those 从 the parent service version. Configuration files defined at any level 可以 be omitted 从 the services configurations by specifying the config-type in the excluded-config-types list:

```xml
      <excluded-config-types>
        <config-type>storm-site</config-type>
      </excluded-config-types>
```

For an individual configuration file (or configuration type) like core-site.xml, it will by default merge with the configuration type 从 the parent. If the `supports_do_not_extend` attribute 是 specified as `true`, the configuration type will **not** be merged.

```xml
<configuration supports_do_not_extend="true">
```

### 继承与服务元信息 {#inheritance-and-the-service-metainfo}

By default all attributes of the service 和 components if defined in the metainfo.xml of the current service version will replace those of the parent service version unless specified in the sections that follow.

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

The custom commands defined in the metainfo.xml of the current service version 是 merged with those of the parent service version.

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

The configuration dependencies defined in the metainfo.xml of the current service version 是 merged with those of the parent service version.

```xml
      <configuration-dependencies>
        <config-type>core-site</config-type>
        <config-type>hdfs-site</config-type>
        ...
      </configuration-dependencies>

```

The components defined in the metainfo.xml of the current service 是 merged with those of the parent (supports delete).

```xml
        <component>
          <name>ZKFC</name>
          <displayName>ZKFailoverController</displayName>
          <category>SLAVE</category>
```

## 服务升级 {#service-upgrade}

Each custom service 可以 define its upgrade within its service definition. This allows the custom service to be integrated within the [stack's upgrade](https://cwiki.apache.org/confluence/display/AMBARI/How-To+Define+Stacks+and+Services#How-ToDefineStacksandServices-StackUpgrades).

### 服务升级 Packs {#service-upgrade-packs}

Each service 可以 define _upgrade-packs_, which 是 XML files describing the upgrade process of that particular service 和 how the upgrade pack relates to the overall stack upgrade-packs. These _upgrade-pack_ XML files 是 placed in the service's _upgrades/_ folder in separate sub-folders specific to the stack-version they 是 meant to extend. Some examples of this 可以 be seen in the testing code.

**Examples**

- [Upgrades folder](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.0.5/services/HDFS/upgrades/)
- [Upgrade-pack XML](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.0.5/services/HDFS/upgrades/HDP/2.2.0/upgrade_test_15388.xml)

### 匹配升级包 {#matching-upgrade-packs}

服务定义的每个升级包都应与特定 Stack 版本定义的服务文件名匹配。例如，在测试代码中，HDP 2.2.0 有一个 [upgrade_test_15388.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.2.0/upgrades/upgrade_test_15388.xml) 升级包。HDFS 服务定义了该升级包的扩展 [HDP/2.0.5/services/HDFS/upgrades/HDP/2.2.0/upgrade_test_15388.xml](https://github.com/apache/ambari/blob/trunk/ambari-server/src/test/resources/stacks/HDP/2.0.5/services/HDFS/upgrades/HDP/2.2.0/upgrade_test_15388.xml)。本例中，升级包定义在 HDP/2.0.5 Stack 中。由于升级包定义在 upgrade/HDP/2.2.0 目录中，因此它是 HDP/2.2.0 的扩展。最后，服务对升级包的扩展名称 upgrade_test_15388.xml 与 HDP/2.2.0/upgrades 中升级包的名称匹配。

**Upgrade XML Format**

The file format for the service 是 much the same as that of the stack. The target, target-stack 和 type attributes 应 all be the same as the stack's upgrade-pack.

**Prerequisite Checks**

The service 是 able to add its own prerequisite checks.

**General Attributes 和 Prerequisite Checks**
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

The order section of the upgrade-pack, consists of group elements just like the stack's upgrade-pack. The key difference 是 defining how these groups relate to groups in the stack's upgrade pack 或 other service upgrade-packs. In the first example we 是 referencing the PRE_CLUSTER group 和 adding a new execute-stage for the service FOO. The entry 是 supposed to be added after the execute-stage for HDFS based on the

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

The same syntax 可以 be used to order other sections like service check priorities 和 group services.

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

It 是 also possible to add new groups 和 order them after other groups in the stack's upgrade-packs. In the following example, we 是 adding the FOO group after the HIVE group 使用 the add-after-group tag.

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

您也可以在同一组中同时包含 add-after-group 和 add-after-group-entry 标签。如果该组尚不存在，这将创建一个新组，并将其排列在 add-after-group 的组名之后。add-after-group-entry 将决定该组服务、优先级或执行阶段的内部顺序。

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

升级包的 processing 部分与 Stack 升级包中的内容保持一致。

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
## 自定义服务仓库 {#custom-service-repo}

Each service 可以 define its own repo info by adding repos/repoinfo.xml in its service folder.  The service specific repo will be included in the list of repos defined for the stack. 

**示例**：https://github.com/apache/ambari/blob/trunk/contrib/management-packs/microsoft-r_mpack/src/main/resources/custom-services/MICROSOFT_R_SERVER/8.0.5/repos/repoinfo.xml

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

## 自定义服务 - Additional Configuration {#custom-services---additional-configuration}

### Alerts {#alerts}

Each service 是 capable of defining which alerts Ambari 应 track by providing an [alerts.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HDFS/2.1.0.2.0/alerts.json) file.

### Kerberos {#kerberos}

Ambari 是 capable of enabling 和 disabling Kerberos for a cluster. 要 inform Ambari of the identities 和 configurations to be used for the service 和 its components, each service 可以 provide a _kerberos.json_ file.

### Metrics {#metrics}

Ambari provides the [Ambari Metrics System ("AMS")](../metrics/index.md)service for collecting, aggregating 和 serving Hadoop 和 system metrics in Ambari-managed clusters.

Each service 可以 define which metrics AMS 应 collect 和 provide by defining a [metrics.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HDFS/2.1.0.2.0/metrics.json) file.

Read more about the metrics.json file format in the [Stack Defined Metrics](../metrics/stack-defined-metrics.md) page.

### Quick Links {#quick-links}

A service 可以 add a list of quick links to the Ambari web UI by adding a quick links JSON file. Ambari server parses the quick links JSON file 和 provides its content to the Ambari web UI. The UI 可以 calculate quick link URLs based on that information 和 populate the quick links drop-down list accordingly.

### Widgets {#widgets}

Each service 可以 define which widgets 和 heat maps show up by default on the service summary page by defining a [widgets.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/common-services/HDFS/2.1.0.2.0/widgets.json) file.
