---
title: 开发者：API 与服务接入
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

# 开发者：API 与服务接入 {#author-and-bundle}

这篇面向要对接[服务商店](./overview.md) API、编写自动化工具或增加服务的开发者。普通安装直接使用控制台即可。前半部分介绍 HTTP 接口，后半部分介绍打包工具。接口背后的设计见[服务商店如何工作](./implementation.md)。

## 调用前先了解这些 {#api-basics}

第一次添加服务，可以先跟着[逐步教程](./add-service-tutorial.md)操作，里面有完整可下载脚本和 UI 验收步骤。

下面的路径都相对于 `/api/v1`。调用者需要是已经登录、具备 `AMBARI.MANAGE_STACK_VERSIONS` 权限的 Ambari 管理员。使用 Ambari 原有的认证方式，写请求携带 `X-Requested-By` 请求头；凭据通过客户端的密钥管理方式注入。

JSON 响应使用整数 `schema_version: 1`，列表响应包含 `items`。先查询能力接口，并使用与 Server 版本一致的 schema。这些接口属于[源码版本说明](../release-baseline.md#runtime-mpack-follow-up)中标明的开发版本，不代表旧版 Ambari 也支持。

## 有哪些接口？ {#api-endpoints}

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/mpack_capabilities` | 查询支持的操作、安装环境和 Agent 要求 |
| GET | `/mpack_capabilities/manifest_schema` | 获取服务包描述文件的 schema |
| POST | `/mpack_uploads` | 上传并检查压缩包，这一步不安装 |
| POST | `/mpack_plans` | 预览导入、更新、关联调整或移除操作 |
| GET | `/mpack_plans/{id}` | 查看已保存的操作方案 |
| GET | `/mpack_services` | 查询可选服务、不可选原因和安装位置 |
| POST | `/mpack_service_plans` | 为选中的服务和安装位置生成预览 |
| POST | `/mpack_operations` | 提交已保存的方案，开始执行 |
| GET | `/mpack_operations` | 列出操作记录 |
| GET | `/mpack_operations/{id}` | 查询进度和结构化结果 |
| GET | `/mpack_operations/{id}/members` | 查看合集内各成员的结果 |
| GET | `/mpack_operations/{id}/deployment` | 获取经过验证的安装向导信息 |
| POST | `/mpack_operations/{id}/recover` | 核对中断操作已经产生的结果 |
| POST | `/mpack_operations/{id}/retry` | 在 Server 允许时重试失败的操作 |
| POST | `/mpack_operations/{id}/cancel` | 在已有执行结果允许时取消 |
| GET | `/mpacks` | 列出服务包版本 |
| GET | `/mpacks/{name}/versions/{version}` | 查看某个服务包的指定版本 |
| GET | `/mpacks/{name}/versions/{version}/usages` | 查询哪些地方还在使用这个版本 |
| GET | `/mpack_bindings` | 查询各环境当前关联了哪些服务包定义 |

## 调用例子：导入、选择、安装 {#api-walkthrough}

**先上传。** 把压缩包的原始字节发送到上传接口，使用 `Content-Type: application/octet-stream`。可选的 `X-Content-SHA256` 请求头必须与文件一致。默认限制为压缩后 256 MiB、解压后 1 GiB、100,000 个条目。

**生成导入预览。** 从合集检查结果中取出每个成员的压缩包摘要，把下面的请求体发给方案接口。示例摘要必须换成真实值，并包含全部成员：

~~~json
{
  "schema_version": 1,
  "action": "IMPORT",
  "archive_digests": ["<member-archive-sha256>"],
  "release_ids": [],
  "bindings": [],
  "activate": false,
  "maintenance": false
}
~~~

方案请求使用 `Content-Type: application/json`。上面的变更字段都必须提供，未知字段和重复的 JSON 键会被拒绝。保存返回方案的 `id` 和 `digest`。生成预览还没有开始执行。

**提交刚才的方案。** 先为它生成并保存一个新的 `Idempotency-Key`，再把请求发送到操作接口：

~~~json
{
  "schema_version": 1,
  "plan_id": "<returned-plan-id>"
}
~~~

HTTP 202 只表示已接收，不表示已完成。继续查询响应中的操作记录。方案一小时后过期；商店内容或环境发生变化，也可能让方案失效。

如果提交后没有收到响应，使用同一账号、同一个方案和同一个 key 重发，可以拿回原来的操作。不要因为超时就换一个 key 重新开始。

**选择服务。** 导入成功后，查询服务目录，使用它返回的准确 ID。向服务选择方案接口提交：

~~~json
{
  "schema_version": 1,
  "service_ids": ["<catalog-service-id>"],
  "cluster_id": null,
  "maintenance": false
}
~~~

新建集群使用 `null`，已有集群使用数字 ID。检查返回的安装位置和服务选择，再用新的 key 提交这份新方案，等待执行完成。

**进入安装。** 状态到达 `SUCCEEDED` 后，查询该操作的安装向导信息。接口会再次检查选中的服务定义，并返回创建集群或添加服务需要的信息。分配机器、填写配置、安装软件，仍走 Ambari 原有的部署流程。

读取进度时，要核对 `id`、`plan_id`、`plan_digest`、`generation` 和实际生效结果。不能只凭一行日志或一次 HTTP 请求成功，就判断安装已经完成。

## 出错后怎么处理？ {#operation-recovery-api}

错误响应包含 `error.code`、用于诊断的说明和结构化详情。客户端应根据错误码处理，不要匹配可能被翻译的提示文字。

| 返回结果 | 客户端怎么处理 |
| --- | --- |
| HTTP 403 / `FORBIDDEN` | 使用具备所需权限的账号 |
| HTTP 413 / `UPLOAD_LIMIT` | 检查文件和上传限制 |
| HTTP 409 / `STALE_PLAN` | 确认已被拒绝后，重新生成预览 |
| HTTP 409 / `IDEMPOTENCY_CONFLICT` | 核对保存的 key 与请求是否一致，不要悄悄更换 key |
| HTTP 409 / `RESOURCE_IN_USE` | 先查询使用关系，再处理移除 |
| HTTP 409 / `OPERATION_CONFLICT` | 等待或处理发生冲突的操作 |
| HTTP 503 / `STORAGE_FAILURE` | 排查存储，并确认之前操作的状态，再决定是否重新提交 |

恢复操作会核对已经记录的结果。重试仅适用于满足条件、可幂等执行且已经确认没有产生效果的失败钩子。如果已经产生效果或结果仍不确定，取消也可能被拒绝。不确定的结果必须继续按未解决处理，不能当作成功。

配套 CLI 也提供了这些操作。先查看记录：

~~~shell
ambari-mpack --json operations show "$OPERATION_ID"
ambari-mpack --json operations members "$OPERATION_ID"
~~~

然后按实际情况选择下面的一项，不要把它们当成连续步骤逐个执行：

~~~shell
ambari-mpack --json operations recover "$OPERATION_ID"
ambari-mpack --json operations retry "$OPERATION_ID"
ambari-mpack --json operations cancel "$OPERATION_ID"
~~~

完整实现约定在对应 Ambari 源码中的 `docs/mpack/http-api.md`。接口入口是 `MpackLifecycleApiService`，状态和校验主要由 `MpackLifecycleState`、`MpackLifecycleService`、`MpackExceptionMapper` 定义。

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
