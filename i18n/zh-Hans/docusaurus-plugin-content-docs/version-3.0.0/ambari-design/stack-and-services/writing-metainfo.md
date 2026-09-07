---
title: 编写 metainfo.xml
---

<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->
# 编写 metainfo.xml {#writing-metainfoxml}

metainfo.xml 是描述 Ambari 托管服务内容的声明式定义，是任何服务定义中最关键的文件。本节介绍 metainfo.xml 文件中的各个主要子部分。

_非必填字段以斜体描述。_

描述服务的顶级字段如下：

字段 | 用途 | 示例值
------|---------------------|---------------
name  | 服务名称。名称在包含该服务的堆栈定义所含的所有服务中必须唯一。  | HDFS
displayName | 服务的显示名称 | HDFS
version | 服务版本。名称和版本共同唯一标识一个服务。通常，该版本是服务二进制文件本身的版本。  | 2.1.0.2.0
components | 组成该服务的组件列表  | `<check out HDFS metainfo>`
osSpecifics | 服务的操作系统专用软件包信息 | `<check out HDFS metainfo>`
commandScript | 也可以定义服务级命令。该命令在作为客户端的组件实例上执行 | `<check out HDFS metainfo>`
comment       | 描述服务的简短说明  | Apache Hadoop Distributed File System
requiredServices | 集群中应存在的其他服务 | `<check out HDFS metainfo>`
configuration-dependencies | 服务所需的配置文件（由其他服务拥有的配置文件在此列表中指定） | `<check out HDFS metainfo>`
restartRequiredAfterRackChange | 机架变更后是否需要重启  | true / false
configuration-dir | 如果不是 configuration，用于指定其他配置目录 | -

**service/components - 一个服务包含多个组件。与组件关联的字段包括**：

字段 | 用途 | 示例值
------|---------------------|---------------
name | 组件名称 | HDFS
displayName | 组件的显示名称。  | HDFS
category | 组件类型 - MASTER、SLAVE 和 CLIENT | 2.1.0.2.0
commandScript | 也可以定义应用范围的命令。该命令在作为客户端的组件实例上执行 | `<check out HDFS metainfo>`
cardinality | 允许/预期的实例数  | 例如，MASTER 为 1-2，Slave 为 1+
reassignAllowed | 组件是否可以重新分配/移动到其他主机。  | true / false
versionAdvertised | 组件是否公布其版本，用于滚动升级/快速升级  | Apache Hadoop Distributed File System
timelineAppid | 收集此组件指标时使用的组件名称。 | `<check out HDFS metainfo>`
dependencies | 此组件依赖的组件列表 | `<check out HDFS metainfo>`
customCommands | 除标准命令外与组件关联的一组自定义命令。 | RESTART_LLAP（参阅 HIVE metainfo）

**service/osSpecifics - 操作系统专用软件包名称（rpm 或 deb 软件包）**

字段 | 用途 | 示例值
------|---------------------|---------------
osFamily | 软件包适用的操作系统系列 | any => all<br></br>amazon2015,redhat6,debian7,ubuntu12,ubuntu14,ubuntu16
packages  | 部署服务所需的软件包列表 | `<check out HDFS metainfo>`
package/name | 软件包名称（将由 yum/zypper/apt 命令使用） | 例如 hadoop-lzo。

**service/commandScript - 实现服务检查的脚本**

字段 | 用途
------|---------------------
script | 脚本的相对路径
scriptType | 脚本类型，目前仅支持 PYTHON
timeout | 命令的自定义超时时间，会覆盖 Ambari 默认值

示例值：

```xml
<commandScript>
  <script>scripts/service_check.py</script>
  <scriptType>PYTHON</scriptType>
  <timeout>300</timeout>
</commandScript>
```
**service/component/dependencies/dependency**

字段 | 用途
------|---------------------
name | 所依赖组件的名称
scope | cluster / host，指定依赖组件应存在于同一集群还是同一主机中。
auto-deploy | 命令的自定义超时时间，会覆盖 Ambari 默认值
conditions | 此依赖存在的条件。例如，配置中存在某个属性。

示例值：

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

**service/component/commandScript - 实现组件特定默认命令的脚本（类似于 service/commandScript）**

**service/component/logs - 提供日志搜索集成。**

字段 | 用途
------|---------------------
logId | 组件的日志 ID
primary | 是否为主要日志 ID。

示例值：

```xml
<log>
  <logId>hdfs_namenode</logId>
  <primary>true</primary>
</log>
```

**service/component/customCommand - 可以向组件添加自定义命令。**

- **name**：自定义命令的名称
- **commandScript**：实现自定义命令的脚本详情
- commandScript/script：脚本的相对路径
- commandScript/scriptType：脚本类型，目前仅支持 PYTHON
- commandScript/timeout：命令的自定义超时时间，会覆盖 Ambari 默认值

**service/component/configFiles - 下载客户端配置时可用的配置文件列表（用于配置不由 Ambari 管理的服务客户端）**

- **type**：要生成的文件类型，例如 xml、env sh 或 yaml
- **fileName**：生成文件的名称
- **dictionary**：包含配置属性的数据字典（与 Ambari 内部管理配置集合的方式有关）

## Sample metainfo.xml {#sample-metainfoxml}

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
