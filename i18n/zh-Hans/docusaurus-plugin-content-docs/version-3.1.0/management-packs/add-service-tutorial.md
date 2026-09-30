---
title: 一步步给商店添加新服务
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

# 一步步给商店添加新服务 {#add-service-step-by-step}

这篇带你添加一个小服务：**Hello Store**。它只运行一个 HTTP 进程，返回一句话，并允许你在 Ambari 里修改这句话。不需要先准备数据库，可以把注意力放在接入步骤上。

完成后，商店里应该能找到它，安装向导能给它分配一台机器，并支持安装、启动、停止、重启、修改配置和服务检查。

## 也可以先让 AI 帮你做 {#use-ai}

可以把这篇文章交给能读取、修改本地代码的 AI 编程助手。把下面的信息填好，连同本页链接一起发给它，让它先读教程和完整示例，再接入你真正需要的服务。

如果 AI 不能打开网页，就提供本教程的本地文档和下载的示例源码。还要让它能访问你的 Ambari 和商店源码目录；只给一个网页链接，它并不能自动读到本地代码。

**可以直接交给 AI 的任务说明：**

> 请给我的 Ambari 服务商店接入一个新服务，在商店仓库中完成实现和验证，不要只给方案，也不要停在尚未实现的脚手架。
>
> 服务名称和准确的软件版本：[填写]
>
> Ambari 源码目录：[填写]
>
> 服务商店目录：[填写]
>
> 目标操作系统和 CPU 架构：[填写]
>
> 部署规模和角色：[单机／小集群，并说明需要哪些角色]
>
> 软件来源：[官方发布地址／已准备的本地安装包／离线软件源]
>
> 测试集群和机器：[填写，没有就说明暂无]
>
> 先读完本教程、完整示例、链接中的 API 和实现原理文档，再读仓库里的开发约定、商店版本索引和最接近的已有服务包。核对该软件准确版本的官方安装和配置文档，先找出缺少的前置条件，再决定怎么实现。
>
> 确认这个服务适合哪种集群环境，需要什么 Java/Python 版本、外部数据库、端口和数据目录。缺少必要信息时，明确告诉我需要补什么，不要自行编造。不要把凭据写进代码和文档。
>
> 补齐服务包描述、适用环境、组件定义、完整配置文件编辑、安装／配置／启动／停止／状态脚本、服务检查和使用说明。配置沿用软件原生格式，并保留用户修改。把新服务登记进商店版本索引，打合集时带上依赖。基础包版本要读取当前仓库，不能原样照抄脚手架的默认值。
>
> 教程只作为接入方式的例子，不是目标软件的实现。要从指定来源安装真正的软件，校验文件，并实现它实际需要的角色和健康检查。不要拿 Hello Store 的 HTTP 进程或占位命令冒充目标服务。优先复用现有通用 UI，确实需要修改核心代码时再说明原因。
>
> 明确重复安装和失败恢复时如何处理，停止服务不能删除数据。用原生 API、结构化结果和准确标识确认状态，不要靠日志关键词判断成功。除了正常流程，还要测试缺少依赖、错误配置、启动失败和重试。
>
> 实际运行校验并打出可导入的合集。有合适且已获授权的测试集群时，按支持的流程导入，在 UI 选择服务，完成安装、配置修改与生效，并验证启停、重启和服务检查。没有集群时，先完成本地验证，列出待执行的集群步骤，不要把未执行的验收写成通过。
>
> 最后交付修改的文件、合集位置、安装说明、支持范围、实际执行的命令和结果，以及尚未解决的限制。报告里分清静态校验、本地测试和集群验收。保留无关改动，提交、推送和部署遵循已有授权。

让 AI 接着阅读 [API 与服务接入](./authoring-and-bundling.md)和[服务商店如何工作](./implementation.md)，再按下面的步骤实施。你也可以自己照着做，每一步的预期结果都一样。

检查 AI 的交付时，要确认商店中真的能选到服务，向导中能看到组件和配置，并且在指定机器上完成安装和服务检查。只生成一个压缩包，还不能说明接入已经可用。

## 1. 准备一个测试环境 {#prepare}

你需要一份配套的 Ambari 源码、一份独立商店仓库、开发机器上的 Python 3.10 或更新版本，以及包含[服务商店](./overview.md)功能的测试 Ambari。

示例的安装机器要求 Rocky Linux 8，使用 systemd。操作系统软件源需要提供 Python 3 和系统 Python 的 D-Bus 库。18181 端口不能被占用，执行 Ambari 服务检查的机器也要能访问它。请放在私有测试网络中：这个教学服务没有身份验证和 TLS。

把下面两个路径换成你自己的源码位置：

~~~shell
export AMBARI_SOURCE=/path/to/ambari
export MPACKSTORE_DIR=/path/to/ambari-mpacks
python3 -m venv .venv-mpack
. .venv-mpack/bin/activate
python -m pip install "$AMBARI_SOURCE/dev-support/mpack"
ambari-mpack --help
~~~

**到这里应该看到：** CLI 帮助中包含 scaffold、validate、build 等命令。此时还没有修改集群。

## 2. 生成起始目录 {#create-project}

先给新服务包起个名字。这里使用 `hello-store`，对应的服务名和组件名是 `HELLO_STORE`、`HELLO_STORE_SERVER`。

~~~shell
ambari-mpack --json scaffold hello-store \
  --directory "$MPACKSTORE_DIR/mpacks/hello-store"
~~~

目标目录不能已经存在。脚手架生成的脚本会故意拒绝安装，提醒你先补上实际实现。

下载<a href="/examples/service-store/hello-store-1.0.0.0.tar.gz" download="hello-store-1.0.0.0.tar.gz">完整示例源码包</a>，在另一个工作目录中解压：

~~~shell
tar -xzf hello-store-1.0.0.0.tar.gz
export EXAMPLE_DIR="$PWD/hello-store-1.0.0.0"
cp -R "$EXAMPLE_DIR/." "$MPACKSTORE_DIR/mpacks/hello-store/"
export HELLO_EXTENSION_DIR="$MPACKSTORE_DIR/mpacks/hello-store/extensions/HELLO_STORE/1.0"
export HELLO_SERVICE_DIR="$HELLO_EXTENSION_DIR/services/HELLO_STORE"
~~~

这次复制只用完整示例替换刚生成的教学目录，不要指向你已经维护的服务。下面逐步解释这些文件，以及换成你自己的服务时应该改哪里。

~~~text
mpacks/hello-store/
  mpack.json
  LICENSE
  NOTICE
  extensions/HELLO_STORE/1.0/
    metainfo.xml
    services/HELLO_STORE/
      metainfo.xml
      configuration/hello-store-conf.xml
      themes/theme.json
      package/scripts/
        app.py
        health.py
        observer.py
        service.py
        service_check.py
~~~

**到这里应该看到：** 新目录里有完整的五个脚本。这个例子不需要修改 Ambari Server 源码。

## 3. 告诉商店，这个包里有什么 {#package-manifest}

打开 `mpack.json`。与功能有关的字段如下，生成的许可证说明也要保留：

~~~json
{
  "schema_version": 1,
  "type": "full-release",
  "name": "hello-store",
  "version": "1.0.0.0",
  "artifacts": [
    {
      "name": "hello-store-extension",
      "type": "extension-definitions",
      "source_dir": "extensions"
    }
  ],
  "dependencies": [
    {
      "name": "generic-base",
      "version": "1.0.0.3"
    }
  ]
}
~~~

这里的服务包版本，表示你编写的管理代码版本，不是应用软件自身的版本。

基础包版本要和商店中的 `release.json` 核对。本文配套商店使用 1.0.0.3，而当前脚手架初始生成的是 1.0.0.0。忘记修改这个依赖，是服务无法启用的常见原因。下载的完整示例已经改成了配套商店使用的版本。

## 4. 指定它能装到哪种环境 {#environment}

打开扩展版本目录下的 `metainfo.xml`，注意不是服务目录中的同名文件：

~~~xml
<metainfo>
  <versions><active>true</active></versions>
  <prerequisites>
    <min-stack-versions>
      <stack><name>GENERIC</name><version>1.0</version></stack>
    </min-stack-versions>
  </prerequisites>
  <auto-link>false</auto-link>
</metainfo>
~~~

这个例子属于通用环境，不需要 Hadoop。不要为了让它能选进已有集群，就直接把环境改成 BIGTOP；应先实现并验证目标环境需要的依赖。

## 5. 描述服务和组件 {#component}

再打开服务目录里的第二个 `metainfo.xml`。它告诉 Ambari：页面显示什么组件，机器上的操作交给哪个脚本执行。

~~~xml
<component>
  <name>HELLO_STORE_SERVER</name>
  <displayName>Hello Store Server</displayName>
  <category>MASTER</category>
  <cardinality>1</cardinality>
  <versionAdvertised>false</versionAdvertised>
  <commandScript>
    <script>scripts/service.py</script>
    <scriptType>PYTHON</scriptType>
    <timeout>120</timeout>
  </commandScript>
</component>
~~~

上面只是片段，不是整个文件。[完整的服务描述文件](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/metainfo.xml)还包括：

- 服务的内部名称和显示名称。
- Rocky 8 需要安装的软件包：Python 3 及其 D-Bus 库。
- 服务检查使用的脚本。
- 配置类型和配置页面的布局。

本教程只有一个 master，数量要求为一个就够了。真正的分布式服务需要按实际情况声明 master、worker、client，并分别处理机器分配和执行命令。

**到这里应该实现的效果：** Ambari 能展示 **Hello Store**，里面有一个 **Hello Store Server** 组件。打包成功不能证明这一点，第 10 步还要在 UI 中确认。

## 6. 增加可以编辑的配置文件 {#configuration}

打开 `configuration/hello-store-conf.xml`。其中的属性保存整份 JSON 文件：

~~~xml
<property>
  <name>content</name>
  <display-name>hello.json</display-name>
  <value><![CDATA[{
  "message": "Hello from Ambari"
}
]]></value>
  <description>Message returned by the tutorial service. Save and restart to apply.</description>
  <value-attributes>
    <type>content</type>
    <property-file-name>hello.json</property-file-name>
    <property-file-type>json</property-file-type>
  </value-attributes>
  <on-ambari-upgrade add="true"/>
</property>
~~~

服务描述文件中声明了这个配置类型，配套的 `themes/theme.json` 则把它放进**配置文件**页签。要一起准备好这三部分：配置属性、服务中的声明、页面布局。

示例只接受一句非空消息，最多 200 个字符。写文件前会拒绝未知字段和重复字段。18181 端口在示例代码中固定，往 JSON 里加一个端口字段，并不会让程序自动支持修改端口。

## 7. 接上安装、启停和检查 {#commands}

阅读完整的[服务脚本](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/service.py)。它实现了下面这些方法：

| 方法 | 示例具体做什么 |
| --- | --- |
| install | 安装系统依赖，放好应用和 systemd 单元文件，写入初始配置，并确认 systemd 已加载该单元 |
| configure | 检查 JSON，再写入配置文件 |
| start | 应用配置、启动单元，再核对运行进程和它加载的配置 |
| stop | 停止单元，并确认已经停止且没有主进程 |
| status | 只读取实际状态并检查应用，不做修改 |

Ambari 的 Script 基类已经通过先 stop、再 start 提供了 restart。示例使用独立的 systemd 单元和无特权的动态用户。修改目录前还会检查归属标记，避免接管别人已经安装的程序。

它管理的机器路径如下：

~~~text
/opt/ambari-hello-store/
/etc/ambari-hello-store/hello.json
/etc/systemd/system/ambari-hello-store.service
~~~

[示例应用](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/app.py)提供一个 HTTP 健康接口，返回包含服务名、进程 ID、消息和配置摘要的 JSON。

[systemd 状态读取脚本](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/observer.py)通过系统 Python 读取 D-Bus 属性。[健康检查代码](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/health.py)把返回内容与预期服务、进程和配置核对，不会只凭命令退出成功或日志中的“启动成功”就认定可用。

最后，[服务检查脚本](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/service_check.py)从 Ambari 获取分配给服务的机器，再访问那台机器，而不是访问碰巧执行检查任务的本机。它会确认保存的消息已经被应用。

接入真实服务时，把示例应用替换为实际安装程序和原生检查方式。下载软件要固定版本并校验摘要；停止服务要保留数据，还要明确重复安装时如何处理。

## 8. 把新服务登记进商店 {#register}

打开商店根目录的 `release.json`，在已有的 packs 对象里增加下面这项，保留其他内容：

~~~json
"hello-store": {
  "path": "mpacks/hello-store",
  "version": "1.0.0.0"
}
~~~

这是 JSON 片段，要按插入位置补上分隔逗号。名称和版本必须与服务包描述文件完全一致。

只创建目录，不会让完整商店打包时自动带上这个服务，真正决定打哪些包的是版本索引。如果你还维护了按场景选择服务的 profile，也要单独把它加进去。

## 9. 校验并打包 {#build}

~~~shell
ambari-mpack --json validate "$MPACKSTORE_DIR/mpacks/hello-store"
ambari-mpack --json build --packs generic-base,hello-store \
  --repository "$MPACKSTORE_DIR" \
  --output dist-hello-store \
  --bundle hello-store-demo
~~~

**到这里应该看到：** 校验结果包含 `validation: STATIC`，打包生成 `dist-hello-store/hello-store-demo.bundle.tar.gz`，里面有新服务和它依赖的基础包。

按名称选择服务包时，工具不会自动把所有依赖一起带上，所以命令里明确写了这两个包。

如果想把整个商店一起交给用户，改用：

~~~shell
ambari-mpack --json build --all \
  --repository "$MPACKSTORE_DIR" \
  --output dist-full-store \
  --bundle mpackstore
~~~

校验和打包不会在机器上运行服务。这里成功，只表示可以进入下一步验收。

## 10. 在 UI 中导入并安装 {#install}

1. 用管理员账号登录测试 Ambari。
2. 打开**管理包**，这是目前控制台中的服务商店入口。
3. 点击**导入管理包**，选择第 9 步生成的示例合集，确认导入。
4. 等导入完成，在服务目录中搜索 **Hello Store**。
5. 勾选它，选择新建通用集群，或者已有的兼容集群。
6. 继续进入**创建集群**或**向集群添加服务**。
7. 给 **Hello Store Server** 分配一台测试机器，在配置页保留初始消息。
8. 完成安装和启动，再运行服务检查。

如果卡片不可选，先看页面原因，不要急着改脚本，优先检查基础包版本和目标环境。如果看不到组件或配置，检查服务描述文件以及声明的配置类型。

## 11. 确认这次接入真的可用 {#verify}

把服务包交给别人之前，在测试集群上完成这些检查：

| 检查 | 应该看到什么 |
| --- | --- |
| 安装后运行服务检查 | 检查通过，确认的是分配的机器和保存的配置 |
| 在配置文件中修改消息，保存并重启 | 新消息对应的服务检查通过 |
| 停止服务 | 组件变为停止状态，服务检查不再通过 |
| 再次启动 | 组件和服务检查恢复正常 |
| 填入错误的 JSON 并尝试应用 | 任务明确失败，不会声称新配置已生效；修正文件并重启后恢复 |
| 在一次全新启动前占用 18181 端口 | 启动或检查失败，不会把其他进程当作这个服务 |

也可以在能访问服务机器的终端上简单查看：

~~~shell
curl --fail --max-time 5 http://SERVICE_HOST:18181/health
~~~

把主机占位符换成实际分配的机器名。应返回包含服务名和所保存消息的 JSON。Ambari 的服务检查比这条手工请求检查得更严格。

## 12. 发布下一版服务包 {#next-version}

已经分发过的服务包，修改后要同时更新描述文件和版本索引中的版本，比如从 1.0.0.0 改为 1.0.0.1。使用新的输出目录重新打包，导入测试商店，并分别验证全新安装和已有实例。

不要给不同内容重复使用同一个服务包版本。已经在使用的服务名、组件名和配置类型，也不要在没有迁移方案时直接改名。

正式分发真实服务前，再补齐支持的系统和架构、软件源要求、凭据、数据路径、升级行为和备份说明，并检查所分发软件的许可证和声明。

## 这个示例实际验证到了哪一步？ {#validation-scope}

示例已经通过配套的描述文件校验和合集打包。本地测试运行了真实的 HTTP 应用，并检查错误配置、错误进程标识、过期的状态读取结果以及尚未应用的配置。网站构建也检查了中英文页面和下载资源。

本次文档变更还没有把示例安装到 Rocky Ambari 集群。第 10、11 步是需要执行的集群验收步骤，不表示它们已经通过。这个教学服务不提供身份验证、TLS、高可用、数据持久化或生产升级保证。

需要进一步了解时，再看 [API 与服务接入](./authoring-and-bundling.md)和[服务商店如何工作](./implementation.md)。
