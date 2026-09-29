---
title: 编写管理包与整体打包
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

# 编写管理包与整体打包 {#author-and-bundle}

本指南面向[运行时商店预览](./overview.md)的维护者。工具和 schema 应与目标 Server 的实现匹配。参考仓库独立于 Ambari 核心维护，可以按源码或已审核 bundle 的形式分发。

## 安装匹配的工具 {#matching-tool}

开发版 CLI 包要求 Python 3.10 或更高版本。通过匹配的 Ambari 源码检出，在独立环境中安装：

~~~shell
export AMBARI_SOURCE=/path/to/ambari
export MPACKSTORE_DIR=/path/to/ambari-mpacks
python3 -m venv .venv-mpack
. .venv-mpack/bin/activate
python -m pip install "$AMBARI_SOURCE/dev-support/mpack"
ambari-mpack --help
~~~

示例路径需要替换为本地实际位置。源码包提供 `ambari-mpack` 入口及 schema 校验器；本流程不假设已有等价的公开软件仓库发布包。

## 管理包目录结构 {#package-layout}

~~~text
example-service/
  mpack.json
  LICENSE
  NOTICE
  extensions/
    EXAMPLE/
      1.0/
        metainfo.xml
        services/
          EXAMPLE/
            metainfo.xml
            configuration/
            package/
              scripts/
              templates/
~~~

最小扩展包清单可以声明为：

~~~json
{
  "schema_version": 1,
  "type": "full-release",
  "name": "example-service",
  "version": "1.0.0.0",
  "artifacts": [
    {
      "name": "example-definitions",
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

扩展及服务描述还必须提供实际兼容的 Stack 上下文、组件名称、分类、数量限制、命令和配置归属。仅有清单示例并不能构成可运行的服务。

可以先生成项目骨架：

~~~shell
ambari-mpack --json scaffold example-service --directory ./example-service
~~~

填写真实定义和生命周期实现后，再进行校验与部署，不要直接把未经修改的骨架作为受支持服务发布。

## 构建完整商店 {#build-complete-store}

仓库的 `release.json` 把管理包名称映射到源码路径和准确的定义版本。所选包的清单身份与索引不一致时，构建器会拒绝。命名 profile 位于 `profiles/<name>.json`。

~~~shell
ambari-mpack --json validate "$MPACKSTORE_DIR/mpacks/nginx"
ambari-mpack --json build --all \
  --repository "$MPACKSTORE_DIR" \
  --output dist \
  --bundle mpackstore
~~~

交付物为 `dist/mpackstore.bundle.tar.gz` 和各个独立包归档。Bundle 使用自己的 `bundle.json` 索引与成员摘要，每个成员仍保留独立版本。

只构建已有的基础设施 profile 时：

~~~shell
ambari-mpack --json build --profile infrastructure \
  --repository "$MPACKSTORE_DIR" \
  --output dist-infrastructure \
  --bundle infrastructure
~~~

归档身份应不可变。修改内容后发布新版本，不要替换已经分发过的发布 ID 对应字节。构建输出、摘要与所用源码修订应一并保留。

## 通过 CLI 检查与导入 {#cli-import}

填写 Server 基础地址，不要自行附加 API 路径。在交互式终端中，客户端会提示输入密码：

~~~shell
export AMBARI_SERVER_URL=https://ambari.example.org
export AMBARI_USERNAME=admin
ambari-mpack --json import dist/mpackstore.bundle.tar.gz
ambari-mpack --json list
ambari-mpack --json services
~~~

无人值守执行时，通过执行环境的秘密管理机制注入 `AMBARI_PASSWORD`。不要把凭据写入仓库、bundle、命令参数、截图或操作检查点。使用私有 CA 时，提供 CLI 的 `--ca-file` 选项。

目录服务 ID 是准确的提供方和上下文身份，不是服务显示名称。为已有集群选择服务时，可先查看 dry-run 结果：

~~~shell
ambari-mpack --json enable "$CATALOG_SERVICE_IDS" \
  --cluster-id "$CLUSTER_ID" \
  --dry-run
~~~

使用当前目录返回的 ID，并用逗号分隔多项选择。省略集群 ID 选项表示新建环境。CLI 的 enable 操作负责准备定义和部署交接，主机安装仍由正常部署流程执行。

## 编写生命周期与观察契约 {#lifecycle-contracts}

按服务实际元数据和运行时实现安装、配置、启停、状态查询与服务检查。区分只读状态检查和有副作用的命令，保留受管理身份与持久数据，并区分首次安装和已有的其他业务安装。

通过结构化观察核对准确的主机、组件、软件版本、执行身份和结果。可读日志用于诊断，不能替代原生状态或与任务相匹配的回执。

在线包 hook 必须声明 `scope: "DEFINITIONS"`，并遵守声明的资源范围。省略范围或声明 Server 级范围时，会拒绝在线执行，但仍可导入登记。这项声明并不是安全沙箱。

不要仅为了让服务可选就复制现有 Stack 提供方。应声明 Server 和 UI 所需的依赖、兼容上下文、拥有的配置类型及通用组件元数据。

## 为断网主机准备软件 {#disconnected-hosts}

商店 bundle 交付管理定义。离线部署还需要各服务的完整运行时输入：

- 与目标架构相符的 OS 软件仓库和软件包。
- 固定的上游归档，或按包说明准备的可验证预置缓存。
- 使用独立 Python 环境时需要的 wheels 和 constraints。
- 符合各服务要求的 Java 运行时。
- 需要源码构建时使用的源码、工具链和模块输入。
- 可访问的外部数据库及协调服务。

缓存路径和摘要规则以各包的 README 与源码元数据为准。为了使用另一份归档而关闭摘要检查，会改变安装契约。完整软件镜像和断网验收，与生成体积较小的商店 bundle 是不同工作。

## 维护者验收清单 {#maintainer-acceptance}

校验清单与依赖闭包，构建所选归档，检查许可和来源，导入测试 Server，选择准确的服务，并在主机部署前确认交接。除了成功的安装、启动和检查路径，还应覆盖缺失前提、无效配置、操作中断、过期身份和重试等代表性失败。

定义更新应保留已有编辑内容和数据。正在使用的组件模型若发生不支持的变化，应在实现迁移前明确拒绝。参见[完整内容配置](./content-configuration.md)和[恢复语义](./operations-and-recovery.md)。
