# Writing metainfo.xml

metainfo.xml is a declarative definition of an Ambari managed service describing its content. Itis the most critical file for any service definition. This section describes various key sub-sections within a metainfo.xml file.

_Non-mandatory fields are described in italics._

The top level fields to describe a service are as follows:

Feild | What is it used for | Sample Values
------|---------------------|---------------
name  | the name of the service. A name has to be unique among all the services that are included in the stack definition containing the service.  | HDFS
displayName | the display name of the service | HDFS
version | the version of the service. name and version together uniquely identify a service. Usually, the version is the version of the service binary itself.  | 2.1.0.2.0
components | the list of component that the service is comprised of  | `<check out HDFS metainfo>`
osSpecifics | OS specific package information for the service | `<check out HDFS metainfo>`
commandScript | service level commands may also be defined. The command is executed on a component instance that is a client | `<check out HDFS metainfo>`
comment       | a short description describing the service  | Apache Hadoop Distributed File System
requiredServices | what other services that should be present on the cluster | `<check out HDFS metainfo>`
configuration-dependencies | configuration files that are expected by the service (config files owned by other services are specified in this list) | `<check out HDFS metainfo>`
restartRequiredAfterRackChange | Restart Required After Rack Change  | true / false
configuration-dir | Use this to specify a different config directory if not 'configuration' | -

**service/components - A service contains several components. The fields associated with a component are**:

Feild | What is it used for | Sample Values
------|---------------------|---------------
name | name of the component | HDFS
displayName | display name of the component.  | HDFS
category | type of the component - MASTER, SLAVE, and CLIENT | 2.1.0.2.0
commandScript | application wide commands may also be defined. The command is executed on a component instance that is a client | `<check out HDFS metainfo>`
cardinality | allowed/expected number of instances  | For example, 1-2 for MASTER, 1+ for Slave
reassignAllowed | whether the component can be reassigned / moved to a different host.  | true / false
versionAdvertised | does the component advertise its version - used during rolling/express upgrade  | Apache Hadoop Distributed File System
timelineAppid | This will be the component name under which the metrics from this component will be collected. | `<check out HDFS metainfo>`
dependencies | the list of components that this component depends on | `<check out HDFS metainfo>`
customCommands | a set of custom commands associated with the component in addition to standard commands. | RESTART_LLAP (Check out HIVE metainfo)

**service/osSpecifics - OS specific package names (rpm or deb packages)**

Feild | What is it used for | Sample Values
------|---------------------|---------------
osFamily | the os family for which the package is applicable | any => all<br></br>amazon2015,redhat6,debian7,ubuntu12,ubuntu14,ubuntu16
packages  | list of packages that are needed to deploy the service | `<check out HDFS metainfo>`
package/name | name of the package (will be used by the yum/zypper/apt commands) | Eg hadoop-lzo.

**service/commandScript - the script that implements service check**

Feild | What is it used for 
------|---------------------
script | the relative path to the script 
scriptType | the type of the script, currently only supported type is PYTHON
timeout | custom timeout for the command - this supersedes ambari default 

sample values: 

```xml
<commandScript>
  <script>scripts/service_check.py</script>
  <scriptType>PYTHON</scriptType>
  <timeout>300</timeout>
</commandScript>
```
**service/component/dependencies/dependency**

Feild | What is it used for 
------|---------------------
name | name of the component it depends on 
scope | cluster / host. specifies whether the dependent component<br></br>should be present in the same cluster or the same host.
auto-deploy | custom timeout for the command - this supersedes ambari default 
conditions | Conditions in which this dependency exists. For example, the presence of a property in a config.

sample values: 

```xml
<dependency>
  <name>HDFS/ZKFC</name>
  <scope>cluster</scope>
  <auto-deploy>
    <enabled>false</enabled>
  </auto-deploy>
  <conditions>
    <condition xsi:type="propertyExists">
      <configType>hdfs-site</configType>
      <property>dfs.nameservices</property>
    </condition>
  </conditions>
</dependency>
```

**service/component/commandScript - the script that implements components specific default commands (Similar to service/commandScript )**

**service/component/logs - provides log search integration.**

Feild | What is it used for 
------|---------------------
logId | logid of the component  
primary | primary log id or not.

sample values: 

```xml
<log>
  <logId>hdfs_namenode</logId>
  <primary>true</primary>
</log>
```

**service/component/customCommand - custom commands can be added to components.**

- **name**: name of the custom command
- **commandScript**: the details of the script that implements the custom command
- commandScript/script: the relative path to the script
- commandScript/scriptType: the type of the script, currently only supported type is PYTHON
- commandScript/timeout: custom timeout for the command - this supersedes ambari default 

**service/component/configFiles - list of config files to be available when client config is to be downloaded (used to configure service clients that are not managed by Ambari)**

- **type**: the type of file to be generated, xml or env sh, yaml, etc
- **fileName**: name of the generated file
- **dictionary**: data dictionary that contains the config properties (relevant to how ambari manages config bags internally)

## Sample metainfo.xml

```xml
<metainfo>
  <schemaVersion>2.0</schemaVersion>
  <services>
    <service>
      <name>HBASE</name>
      <displayName>HBase</displayName>
      <comment>Non-relational distributed database and centralized service for configuration management &amp;
 synchronization
      </comment>
      <version>0.96.0.2.0</version>
      <components>
        <component>
          <name>HBASE_MASTER</name>
          <displayName>HBase Master</displayName>
          <category>MASTER</category>
          <cardinality>1+</cardinality>
          <versionAdvertised>true</versionAdvertised>
          <timelineAppid>HBASE</timelineAppid>
          <dependencies>
            <dependency>
              <name>HDFS/HDFS_CLIENT</name>
              <scope>host</scope>
              <auto-deploy>
                <enabled>true</enabled>
              </auto-deploy>
            </dependency>
            <dependency>
              <name>ZOOKEEPER/ZOOKEEPER_SERVER</name>
              <scope>cluster</scope>
              <auto-deploy>
                <enabled>true</enabled>
                <co-locate>HBASE/HBASE_MASTER</co-locate>
              </auto-deploy>
            </dependency>
          </dependencies>
          <commandScript>
            <script>scripts/hbase_master.py</script>
            <scriptType>PYTHON</scriptType>
            <timeout>1200</timeout>
          </commandScript>
          <customCommands>
            <customCommand>
              <name>DECOMMISSION</name>
              <commandScript>
                <script>scripts/hbase_master.py</script>
                <scriptType>PYTHON</scriptType>
                <timeout>600</timeout>
              </commandScript>
            </customCommand>
          </customCommands>
        </component>

        <component>
          <name>HBASE_REGIONSERVER</name>
          <displayName>RegionServer</displayName>
          <category>SLAVE</category>
          <cardinality>1+</cardinality>
          <versionAdvertised>true</versionAdvertised>
          <timelineAppid>HBASE</timelineAppid>
          <commandScript>
            <script>scripts/hbase_regionserver.py</script>
            <scriptType>PYTHON</scriptType>
          </commandScript>
        </component>

        <component>
          <name>HBASE_CLIENT</name>
          <displayName>HBase Client</displayName>
          <category>CLIENT</category>
          <cardinality>1+</cardinality>
          <versionAdvertised>true</versionAdvertised>
          <commandScript>
            <script>scripts/hbase_client.py</script>
            <scriptType>PYTHON</scriptType>
          </commandScript>
          <configFiles>
            <configFile>
              <type>xml</type>
              <fileName>hbase-site.xml</fileName>
              <dictionaryName>hbase-site</dictionaryName>
            </configFile>
            <configFile>
              <type>env</type>
              <fileName>hbase-env.sh</fileName>
              <dictionaryName>hbase-env</dictionaryName>
            </configFile>
          </configFiles>
        </component>
      </components>

      <osSpecifics>
        <osSpecific>
          <osFamily>any</osFamily>
          <packages>
            <package>
              <name>hbase</name>
            </package>
          </packages>
        </osSpecific>
      </osSpecifics>

      <commandScript>
        <script>scripts/service_check.py</script>
        <scriptType>PYTHON</scriptType>
        <timeout>300</timeout>
      </commandScript>
      
      <requiredServices>
        <service>ZOOKEEPER</service>
        <service>HDFS</service>
      </requiredServices>

      <configuration-dependencies>
        <config-type>core-site</config-type>
        <config-type>hbase-site</config-type>
        <config-type>ranger-hbase-policymgr-ssl</config-type>
        <config-type>ranger-hbase-security</config-type>
      </configuration-dependencies>

    </service>
  </services>
</metainfo>
```