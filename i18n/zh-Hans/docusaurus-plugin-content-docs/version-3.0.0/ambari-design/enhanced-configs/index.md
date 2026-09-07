---
title: 增强配置
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

Ambari-2.1.0 引入的增强配置功能让服务提供者能够大幅自定义服务配置，并确定向用户突出显示哪些配置，而无需更改任何 UI 代码。自定义内容包括提供友好的服务布局、更好的控件（滑块、组合框、列表、切换开关、微调器等）、更好的验证（最小值、最大值、枚举）、自动单位转换（MB、GB、秒、毫秒等）、配置依赖关系，以及改进的默认值动态建议。

服务提供者只需更改 _stacks_/ 文件夹中的服务定义即可完成上述所有操作。

Example: HBase Enhanced Configs

![](@site/versioned_docs/version-3.0.0/ambari-design/enhanced-configs/imgs/enhanced_hbase_configs.png "Hbase Enhanced Config")

## 功能 {#features}

* 使用配置的自定义布局定义主题
  - Tabs
  - Sections
  - Sub-sections
* 将选定配置放置在上述布局中
* 为配置关联要使用的 UI 小部件
  - Radio Buttons
  - Slider
  - Combo
  - Time Interval Spinner
  - Toggle
  - Directory
  - Directories
  - List
  - Password
  - Text Field
  - Checkbox
  - Text Area
* 自动转换配置的单位，使显示单位可以不同于保存单位。

  - Memory - B, KB, MB, GB, TB, PB
  - Time - milliseconds, seconds, minutes, hours, days, months, years
  - Percentage - float, percentage
* 能够定义跨服务配置之间的依赖关系（depends-on、depended-by）。

* 配置更改时动态更新其他 depended-by 配置的值。

## 启用增强配置 - 步骤 {#enable-enhanced-configs---steps}

### 步骤 1 - 创建主题（UI 元数据） {#step-1---create-theme-ui-metadata}

第一步是在 Stack 定义文件夹中为服务创建主题。主题提供构建增强配置所需的 UI 信息，包括布局（标签页、部分、子部分）、配置在子部分中的位置，以及每项配置使用的小部件和单位。

![](@site/versioned_docs/version-3.0.0/ambari-design/enhanced-configs/imgs/create_theme.png "Apache Ambari > Enhanced Configs > Screen Shot 2015-07-13 at 3.32.59 PM.png")

1. 通过包含 themes 块，修改 metainfo.xml 以定义主题。

```
themes-dir      theme.json    true
```
2. 如果不希望使用默认主题文件夹 ' _themes_'，或者同一 _metainfo.xml_ 中的另一个服务已占用该文件夹，可以使用此可选元素。

3. 可以定义多个主题，但服务只会使用第一个 _default_theme。

4. 每个主题都通过 _fileName_ 元素指向 _themes-dir_ 文件夹中的主题 JSON 文件。

5. _theme.json_ 文件包含一个 _configuration_ 块，其中有三个主要键
  1. _layouts_ - 指定标签页、部分和子部分布局
  2. _placement_ - 指定要放入子部分的配置
  3. _widgets_ - 指定每项配置使用的 UI 小部件

```json
{  
  "configuration": {   
  "layouts": [      ...    ],  
  "placement": {      ...    },    
  "widgets": [      ...    ]  
  }
}
```
6. 布局 - 一个主题可以定义多个布局。目前渲染时只使用第一个布局。_layout_ 包含以下内容：
  1. 选项卡：一个布局中可以定义多个选项卡。每个选项卡都可以通过 _tab-columns_ 和 _tab-rows_ 键，使用简单的网格布局组织内容。

下面示例中的 _Settings_ 标签页有一个 3 行 2 列的网格，可在其中放置部分。

```json
"layouts": [  
  {    
    "name": "default",   
     "tabs": [     
       {        
        "name": "settings",        
        "display-name": "Settings",       
         "layout": {         
           "tab-columns": "2",          
           "tab-rows": "3",          
           "sections": [ ... ]        
           }      
      }
     ] 
    }
]
```
  2. 部分：每个部分定义在标签页内，并使用 _row-index_、_column-index_、_row-span_ 和 _column-span_ 键指定其在标签页网格布局中的位置和大小。作为容器，它还可以使用 _section-rows_ 和 _section-columns_ 键为包含的子部分定义网格布局。

下面示例中的 _MapReduce_ 部分占据 _Settings_ 标签页网格的第一个单元格，其自身有一个 1 行 3 列的网格布局。

```
"sections": [  {    "name": "section-mr-scheduler",    "display-name": "MapReduce",    "row-index": "0",    "column-index": "0",    "row-span": "1",    "column-span": "1",    "section-columns": "3",    "section-rows": "1",    "subsections": [ ... ]  },  ...]
```
  3. 子部分：每个子部分定义在部分内，并使用 _row-index_、_column-index_、_row-span_ 和 _column-span_ 键指定其在部分网格布局中的位置和大小。每个部分还有可选的 _border_ 布尔键，用于指示是否用边框包围其内容。

```
"subsections": [  {    "name": "subsection-mr-scheduler-row1-col1",    "display-name": "MapReduce Framework",    "row-index": "0",    "column-index": "0",    "row-span": "1",    "column-span": "1"  },  ...]
```
7. 放置：指定要放入每个子部分的配置顺序。每个放置项标识一项配置及其应出现的子部分。放置项使用 _configuration-layout_ 键指定适用的布局。

```
"placement": {  "configuration-layout": "default",  "configs": [    {      "config": "mapred-site/mapreduce.map.memory.mb",      "subsection-name": "subsection-mr-scheduler-row1-col1"    },    {      "config": "mapred-site/mapreduce.reduce.memory.mb",      "subsection-name": "subsection-mr-scheduler-row1-col2"    },    ...  ]}
```
8. 小部件：widgets 数组指定显示特定配置时使用的 UI 小部件，还包含显示小部件所需的其他 UI 专用元数据。

下面的示例中两项配置都使用滑块小部件，但单位不同，因此一项以字节显示，另一项以百分比显示。此单位仅用于显示配置，与配置在 Ambari 中实际持久化时使用的单位不同。例如，下面的百分比单位可能以 _float_ 持久化，而下面的 MB 配置可能以 B（字节）持久化。

```
"widgets": [  {    "config": "yarn-site/yarn.nodemanager.resource.memory-mb",    "widget": {      "type": "slider",      "units": [        {          "unit-name": "MB"        }      ]    }  },  {    "config": "yarn-site/yarn.nodemanager.resource.percentage-physical-cpu-limit",    "widget": {      "type": "slider",      "units": [        {          "unit-name": "percent"        }      ]   } }, {   "config": "yarn-site/yarn.node-labels.enabled",   "widget": {     "type": "toggle"   } }, ...]
```

有关可用 UI 小部件及每个小部件可指定元数据的完整参考，请参阅_附录 A_。

### 步骤 2 - 注释 Stack 配置（非 UI 元数据） {#step-2---annotate-stack-configs-non-ui-metadata}

服务主题使用的每项配置都必须提供额外的配置元数据。可用元数据包括：

* display-name
* value-attributes
  - type
    + string
    + value-list
    + float
    + int
    + boolean
  - minimum
  - maximum
  - unit
  - increment-step
  - entries
    + entry
      * value
      * description
* depends-on
  - property
    + type
    + name

value-attributes 提供有关值的元信息，适当的小部件可以将其用作提示。例如，滑块小部件可以使用最小值和最大值工作。

Examples:

```xml
<property>
  <name>namenode_heapsize</name>
  <value>1024</value>
  <description>NameNode Java heap size</description>
  <display-name>NameNode Java heap size</display-name>
  <value-attributes>
    <type>int</type>
    <minimum>0</minimum>
    <maximum>268435456</maximum>
    <unit>MB</unit>
    <increment-step>256</increment-step>
  </value-attributes>
  <depends-on>
    <property>
      <type>hdfs-site</type>
      <name>dfs.datanode.data.dir</name>
    </property>
  </depends-on>
</property>

```

```xml
<property>
  <name>hive.default.fileformat</name>
  <value>TextFile</value>
  <description>Default file format for CREATE TABLE statement.</description>
  <display-name>Default File Format</display-name>
  <value-attributes>
    <type>value-list</type>
    <entries>
      <entry>
        <value>ORC</value>
        <description>The Optimized Row Columnar (ORC) file format provides a highly efficient way to store Hive data. It was designed to overcome limitations of the other Hive file formats. Using ORC files improves performance when Hive is reading, writing, and processi
      </entry>
      <entry>
        <value>TextFile</value>
        <description>Text file format saves Hive data as normal text.</description>
      </entry>
    </entries>
  </value-attributes>
</property>
```

depends-on 有助于构建 Ambari 中不同配置之间的依赖关系图。Ambari 使用这些双向关系（depends-on 和 depended-by），通过 Ambari 的 Stack advisor 功能自动更新依赖配置。

配置之间的依赖关系是有向无环图（DAG）。更新配置时，UI 必须确定它对图中其他配置的影响。为此，应在 changed_configurations 字段中向 /recommendations_ 端点提供刚刚更改的配置数组。根据提供的 changed-configs，响应中只会更新其依赖项。

Example:

下图显示了一些配置依赖关系：A 影响 B 和 C，B、C 分别影响 DE 和 FG。

![](@site/versioned_docs/version-3.0.0/ambari-design/enhanced-configs/imgs/enhanced_configs_dependencies.png "Enhanced Configs Dependencies")

现在假设用户将 B 更改为 B'：调用 _/_ _recommendations_ 只会分别将 D 和 E 更改为 D' 和 E'（AB'CD'E'FG），不会更改其他配置。假设 C 更改为 C'：/recommendations 只会将 F 和 G 更改为 F' 和 G'，同时保留 B'、D'、E' 的值（AB'C'D'E'F'G'）。现在如果将 A 更改为 A'，它会影响所有子项（A'B''C''D''E''F''G''）。用户可以选择要应用的更改。

每当具有依赖关系的配置发生更改时，都会调用 _/recommendations_。POST 调用的 action 为 configuration-dependencies，只会更改 changed_configurations 字段标识的配置及其依赖项。

### 步骤 3 - 重启 Ambari server {#step-3---restart-ambari-server}

必须重启 ambari-server，才能加载主题或 Stack 定义中的任何更改。

## 参考 {#reference}

* HDFS HDP-2.2 [theme.json](https://github.com/apache/ambari/blob/branch-2.1.2/ambari-server/src/main/resources/stacks/HDP/2.2/services/HDFS/themes/theme.json)
* YARN HDP-2.2 [theme.json](https://github.com/apache/ambari/blob/branch-2.1.2/ambari-server/src/main/resources/stacks/HDP/2.2/services/YARN/themes/theme.json)
* HIVE HDP-2.2 [theme.json](https://github.com/apache/ambari/blob/branch-2.1.2/ambari-server/src/main/resources/stacks/HDP/2.2/services/HIVE/themes/theme.json)
* RANGER HDP-2.3 [theme_version_2.json](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.3/services/RANGER/themes/theme_version_2.json)

## Appendix {#appendix}

### 附录 A - 小部件非 UI 元数据 {#appendix-a---widget-non-ui-metadata}

<table>
  <tr>
    <th>小部件</th>
    <th>使用的元数据</th>
  </tr>
  <tr>
    <td>Slider</td>
    <td>
    &lt;value-attributes&gt;<br></br>
      &lt;type&gt;int&lt;/type&gt;<br></br>
      &lt;minimum&gt;1073741824&lt;/minimum&gt;<br></br>
      &lt;maximum&gt;17179869184&lt;/maximum&gt;<br></br>
      &lt;unit&gt;B&lt;/unit&gt;<br></br>
      &lt;increment-step&gt;1073741824&lt;/increment-step&gt;<br></br>
    &lt;/value-attributes&gt;
    </td>
  </tr>
  <tr>
    <td>Combo</td>
    <td>
    &lt;value-attributes&gt; <br></br>
      &lt;type&gt;value-list&lt;/type&gt;<br></br>
      &lt;entries&gt;<br></br>
        &lt;entry&gt;<br></br>
          &lt;value&gt;2&lt;/value&gt;<br></br>
        &lt;/entry&gt;<br></br>
        &lt;entry&gt;<br></br>
          &lt;value&gt;4&lt;/value&gt;<br></br>
        &lt;/entry&gt;<br></br>
        &lt;entry&gt;<br></br>
          &lt;value&gt;8&lt;/value&gt;<br></br>
        &lt;/entry&gt;<br></br>
      &lt;/entries&gt;<br></br>
      &lt;selection-cardinality&gt;1&lt;/selection-cardinality&gt;<br></br>
    &lt;/value-attributes&gt;
    </td>
  </tr>
  <tr>
    <td>目录、目录列表、密码、文本字段、文本区域</td>
    <td>不需要 value-attributes</td>
  </tr>
  <tr>
    <td>List</td>
    <td>
    &lt;value-attributes&gt;                                          <br></br>
  &lt;type&gt;value-list&lt;/type&gt;<br></br>
  &lt;entries&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;2&lt;/value&gt;<br></br>
    &lt;/entry&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;4&lt;/value&gt;<br></br>
    &lt;/entry&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;8&lt;/value&gt;<br></br>
    &lt;/entry&gt;<br></br>
  &lt;/entries&gt;<br></br>
  &lt;selection-cardinality&gt;2+&lt;/selection-cardinality&gt;<br></br>
&lt;/value-attributes&gt;<br></br>
    </td>
  </tr>
  <tr>
    <td>Radio-Buttons</td>
    <td>
   &lt;value-attributes&gt;                                    <br></br>
  &lt;type&gt;value-list&lt;/type&gt;<br></br>
  &lt;entries&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;1&lt;/value&gt;<br></br>
      &lt;label&gt;Radio Option 1&lt;/label&gt;<br></br>
    &lt;/entry&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;2&lt;/value&gt;<br></br>
      &lt;label&gt;Radio Option 2&lt;/label&gt;<br></br>
    &lt;/entry&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;3&lt;/value&gt;<br></br>
      &lt;label&gt;Radio Option 3&lt;/label&gt;<br></br>
    &lt;/entry&gt;<br></br>
  &lt;/entries&gt;<br></br>
  &lt;selection-cardinality&gt;1&lt;/selection-cardinality&gt;<br></br>
&lt;/value-attributes&gt;   
    </td>
  </tr>
  <tr>
    <td>Time Interval Spinner</td>
    <td>
&lt;value-attributes&gt;                   <br></br>
  &lt;type&gt;int&lt;/type&gt;<br></br>
  &lt;minimum&gt;0&lt;/minimum&gt;<br></br>
  &lt;maximum&gt;2592000000&lt;/maximum&gt;<br></br>
  &lt;unit&gt;milliseconds&lt;/unit&gt;<br></br>
&lt;/value-attributes&gt;
    </td>
  </tr>
  <tr>
    <td>Toggle, Checkbox</td>
    <td>
 &lt;value-attributes&gt;                                       
  &lt;type&gt;value-list&lt;/type&gt;<br></br>
  &lt;entries&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;true&lt;/value&gt;<br></br>
      &lt;label&gt;Native&lt;/label&gt;<br></br>
    &lt;/entry&gt;<br></br>
    &lt;entry&gt;<br></br>
      &lt;value&gt;false&lt;/value&gt;<br></br>
      &lt;label&gt;Off&lt;/label&gt;<br></br>
    &lt;/entry&gt;<br></br>
  &lt;/entries&gt;<br></br>
  &lt;selection-cardinality&gt;1&lt;/selection-cardinality&gt;<br></br>
&lt;/value-attributes&gt;   
    </td>
  </tr>
</table>
