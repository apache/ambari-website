---
title: Ambari 编码指南
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

# Ambari 编码指南 {#coding-guidelines-for-ambari}

## Ambari Web 前端开发环境 {#ambari-web-frontend-development-environment}

### 应用程序汇编器：Brunch {#application-assembler-brunch}

* Brunch 用于为 Ambari Web 创建应用程序骨架。

* Brunch 会在后台自动构建和部署代码，当你修改源文件时即可生效。这使你可以将代码拆分为多个 JS 文件以便组织和复用，而无需担心开发周转时间或运行时加载性能。

* 通过一条命令运行基于 Node.js 的 Web 服务器，因此无需设置 Ambari Server 即可轻松运行 Ambari Web（真正进行端到端测试时仍需运行 Ambari Server）。

从 Github 仓库检出 Ambari Web 并运行：

* 从 [http://nodejs.org](http://nodejs.org) 安装 Node.js
* 执行以下命令：

```bash
git clone https://git-wip-us.apache.org/repos/asf/ambari.git
cd ambari/ambari-web
sudo npm install -g brunch@1.7.20
rm -rf node_modules public
npm install
brunch build
```

_注意：如果运行 "npm install" 时收到 "gyp + xcodebuild" 错误，请确认已安装 Xcode CLI 工具（Xcode > Preferences > Downloads）_  
_注意：如果运行 "brunch build" 时收到 "Error: EMFILE, open" 错误，请增大文件描述符的 ulimit（例如 "ulimit -n 10000"）_

要在隔离环境中使用 Ambari Server 运行 Web 服务器：

```
brunch watch --server (or use the shorthand: brunch w -s)
```

以上命令会在 localhost:3333 启动带有本地测试服务器的 Ambari Web。登录名和密码为 admin/admin。

强烈建议所有 Ambari 前端开发者使用 JetBrains 的 PhpStorm。JetBrains 已为 Apache Ambari 授予 PhpStorm 和 IntelliJ 的开源许可证。Ambari committer 可以使用这些产品（如果你是 Ambari committer，请发送邮件至 [private@ambari.apache.org](mailto:private@ambari.apache.org) 申请许可证密钥）。如果你更喜欢，也可以使用 Eclipse。

* IDE 插件

转到 Preferences->Plugins->Browse repositories，安装 "Node.js" 和 "Handlebars" 插件。

### 编码约定 {#coding-conventions}

对于任何 JavaScript/Handlebars/LESS 文件，都应使用 IDE 进行格式化，以保持一致性。

此外，IDE 会在编辑器中针对隐式全局变量等问题给出警告。提交补丁前请修复这些警告。

IDE 中的 Code Style 使用所有默认设置，但以下设置除外：

```
Go to Preferences
Code Style->General
Line separator (for new files): Unix
Make sure "Use tab character" is NOT checked
Tab size: 2
Indent: 2
Continuation indent: 2
Code Style->JavaScript:
Tabs and Indents
Make sure "use tab character" is NOT checked
Set Tab size, Indent, and Continuation indent to "2".

Spaces->Other
Turn on "After name-value property separator ':'
```

通常，所有 JavaScript 代码都应遵循以下约定：http://javascript.crockford.com/code.html

上述规则的例外：

* 使用 2 个空格而不是 4 个空格。

* 变量声明：
"最好让每个变量独占一行并添加注释。变量应按字母顺序排列。" 仅在有意义时添加注释。无需按字母顺序排序。

* "JavaScript 没有块级作用域，因此在代码块中定义变量可能会使熟悉其他 C 系列语言的程序员感到困惑。请在函数顶部定义所有变量。" 此项无需遵循。

### Java 导入顺序 {#java-import-order}

某些 IDE 定义的默认导入顺序不同，这可能会在创建补丁以及将补丁合并到不同分支时造成很多问题。以下是执行构建测试阶段时应用的 checkstyle 规则。你选择的 IDE 应更新为匹配这些设置：

* 应避免使用通配符字符 '*'，所有导入都应明确列出。

* 所有 import 语句应使用以下顺序：
  - java
  - javax
  - org
  - com
  - other

### UI 单元测试 {#ui-unit-tests}

所有补丁都必须附带单元测试，以确保良好的覆盖率。如果不适用单元测试（例如样式或布局更改等），必须在 JIRA 中明确说明单元测试不适用。

单元测试使用 Mocha 编写，并通过 PhantomJS 无头浏览器运行。

要运行 ambari-web 的单元测试，请执行：

```bash
cd ambari-web
mvn test
```

## Ambari 后端开发 {#ambari-backend-development}

**以下内容借鉴自 hadoop wiki：**

* 所有公共类和方法都应包含信息充分的 Javadoc 注释。

* 不要使用 @author 标签。

* 代码必须按照 Sun 的约定格式化，但有一个例外：
* 每层缩进使用两个空格，而不是四个。

* 贡献必须通过现有的单元测试。

* 代码更改必须附带单元测试。如果无法进行单元测试或单元测试没有意义，应在 jira 中提供说明。

* 应提供新的单元测试来证明 bug 和修复。JUnit（junit4）是我们的测试框架：
* 必须实现一个类，并为所有测试方法使用 @Test 注解。

* 在类中定义名称以 test 开头的方法，并调用 JUnit 的各种 assert 方法验证条件。请为 assert 语句添加有意义的消息，以便诊断问题。

* 默认情况下，不要让测试向 /tmp 写入临时文件。测试应写入系统属性 test.build.data 指定的位置。

* 日志级别应符合 Log4j 级别。
* 使用 slf4j 而不是 commons logging 作为日志门面。

* Logger 名称应尽可能使用类名。

**单元测试**

开发者在提交补丁进行代码审查以及提交到 Apache 之前，应始终运行完整的单元测试。在顶层目录执行：

```bash
mvn clean test
```

有时只运行当前功能的单元测试很有用（例如 Kerberos、Rolling/Express Upgrade、Stack Inheritance、Alerts 等）。此时可以使用给定 profile 运行单元测试。

这些 profile 会运行所有使用给定 Category 注解的测试类/用例，例如：

```java
@Category({ category.AlertTest.class})
```

要运行某个 profile，请查看顶层 pom.xml 中可用的名称。例如：

```bash
mvn clean test -P AlertTests # Other options are AmbariUpgradeTests, BlueprintTests, KerberosTests, MetricsTests, StackUpgradeTests
```


完成该测试套件的测试后，**应使用 "mvn clean test" 运行完整的单元测试。**
* [http://wiki.apache.org/hadoop/HowToDevelopUnitTests](http://wiki.apache.org/hadoop/HowToDevelopUnitTests)
* 测试名称应为 *Test.java
* **使用数据库进行单元测试**
  - 我们应使用 JavaDB 作为单元测试的内存数据库。数据库层/ORM 应可配置为使用内存数据库。测试数据库时有两点很重要。

  - 能够使用任意初始数据动态引导数据库。

  - 能够在带外修改数据库状态，以模拟特定测试用例。实现上述目标的一种方式是仅用于测试目的实现数据库访问层，但这可能会导致 ORM 对象不一致，具体方案仍需确定。

* **Stub Heartbeat handler**
  - 为了测试，最好实现一个 stub heartbeat handler，仅模拟与 agent 的交互而不与任何真实 agent 交互：它会暴露与真实 heartbeat handler 类似的 action queue，但不会向任何地方发送内容，只会定期从队列中移除 action。它还会暴露一个接口，用于为每个 action 注入人工响应，以便在测试中模拟 agent 响应；并暴露一个接口，用于注入节点状态，以模拟节点故障或 heartbeat 丢失。可以使用 Guice framework 在测试中注入 stub heartbeat handler。

* **EasyMock**
  - EasyMock 是我们首选的 mock framework，已在 hadoop 中成功使用。一个适合使用 Easymock 的场景是：假设我们正在测试服务部署，但希望绕过服务依赖，或希望注入人工组件依赖，则可以 mock dependency tracker 对象来模拟所需的依赖场景。Ambari server 总体上是一个状态驱动系统。EasyMock 可用于绕过状态变化，对组件进行窄范围测试。不过，最好使用内存数据库模拟状态变化，仅在某些行为无法轻易模拟时使用 EasyMock。例如，测试用于获取事务状态的 API 实现时，可以 mock action manager 对象；也可以在内存数据库中设置状态进行测试。后者是更全面的测试。避免使用静态方法和对象，因为 Easymock 无法 mock 它们。如果静态对象可能需要 mock，请使用配置或依赖注入来初始化它们。EasyMock 无法 mock final 类，因此对于可能被 mock 的类应避免使用 final 类。文档请参阅：[http://www.easymock.org/EasyMock3_1_Documentation.html](http://www.easymock.org/EasyMock3_1_Documentation.html)。

**Guice**

Guice 是一个依赖注入框架，可用于动态注入可插拔组件。
请参阅 [http://code.google.com/p/google-guice/wikJamiroquaii/Motivation](http://code.google.com/p/google-guice/wikJamiroquaii/Motivation)。我们可以在以下场景中使用 Guice：

* 可插拔的 manifest generator：可能需要为非 puppet 设置或测试提供不同的 manifest generator 实现。

* 注入内存数据库（如果可行）以替代用于测试的真实持久化数据库。还需要研究 Guice 如何与 ORM 工具配合。

* 注入 stub implementation of heartbeat handler。

* 可以考虑通过 Guice 绑定用于管理或监控的 API 实现。这样便可使用 mock implementation 独立于实现测试 API 和服务器。例如，可以 mock coordinator 中的 management api implementation，从而独立测试 API 定义和 URI。

* 注入 dependency tracker 或 stage planner 的 mock 对象进行测试。
