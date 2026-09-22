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

# Multi-cluster diagram sources

These six WebP illustrations accompany the bilingual 3.1.0 preview guides.
They depict source revision fc07b5cb873dc154c48349085494e664baf6b9d1, reviewed
on 2026-09-22. They are conceptual diagrams, not runtime screenshots.

## Generation and delivery

- Model: gpt-image-2, image-edit API with the existing overall architecture
  illustration as a style reference.
- Requested size: 1536 x 1024, medium quality, WebP output.
- Style reference: overall-architecture-en.webp in this directory, reduced to
  836 pixels wide for the reference request.
- Final delivery: WebP, maximum width 1536, cwebp quality 78, method 6.
- Visual review: compressed 836-pixel-wide previews only.
- The credential and API account configuration are deliberately not included.
- English and Chinese explain the same boundaries; geometry need not be identical.

The overview shows local dependencies in both clusters. The binding diagram shows
two separately selected providers; using one provider cluster for both is also
possible. The recovery diagram summarizes the normal managed deployment path.
Its persisted identity applies throughout the workflow, not only after Start.
The page text and structured API contract define the complete gates and failure
paths.

## Shared prompt

```text
Use case: infographic-diagram.
Asset type: Apache Ambari 3.1 preview documentation, landscape 1536x1024, ordinary resolution.
Input image: STYLE REFERENCE ONLY. Replace all architecture content with the specified new diagram; do not retain the old architecture.
Style: match the reference's hand-drawn technical sketch, warm off-white paper, fine irregular graphite ink outlines, light pencil hatching, restrained teal control arrows and ochre dashed service/data arrows, small sketched browser/server/database icons. Clean readable handwritten labels, generous spacing. This is an engineering illustration, not a corporate slide or a grid of colored cards. No gradients, giant colored panels, logos, watermark, footer credits, tiny text, decorative prose or invented components.
Render exact labels and accurate directed arrows; retain code identifiers untranslated.
```

## architecture-en

Output: multi-cluster-architecture-en.webp

```text
Title: "Ambari 3.1: Multi-cluster architecture".
Top: two small browser windows side by side, labelled "Tab A / analytics-a" and "Tab B / analytics-b"; under both "URL-scoped cluster context". Both point down to one central large Ambari Server sketched machine labelled "REST + RBAC", "Authorized events", "Requests / tasks". Server connects right to a single cylinder "Metadata DB", with small labels "Cluster IDs", "Drafts / revisions", "Bindings / operations".
Server sends control arrows down into TWO SEPARATE outlined cluster enclosures: left "Cluster A / ID 2" with three hosts "worker1-3", right "Cluster B / ID 3" with three different hosts "worker4-6". Inside each enclosure show "Agents", then "HDFS + ZooKeeper + HBase", connected by short control arrows. This is the independent LOCAL-dependencies example. NO arrows between A and B.
Bottom three concise notes: "One host, at most one cluster"; "Independent configs, tasks and permissions"; "Shared Server and DB failure boundary".
Legend: solid teal "Management traffic". Make ownership and the single shared control plane visually unmistakable.
```

## architecture-zh

Output: multi-cluster-architecture-zh.webp

```text
Title: "Ambari 3.1：多集群架构".
Top: two small browser windows side by side, labelled "标签页 A / analytics-a" and "标签页 B / analytics-b"; under both "URL 明确集群上下文". Both point down to one central large Ambari Server sketched machine labelled "REST + RBAC", "授权事件投递", "请求 / 任务". Server connects right to a single cylinder "元数据数据库", with small labels "集群 ID", "草稿 / 修订号", "绑定 / 操作".
Server sends control arrows down into TWO SEPARATE outlined cluster enclosures: left "集群 A / ID 2" with three hosts "worker1-3", right "集群 B / ID 3" with three different hosts "worker4-6". Inside each enclosure show "Agents", then "HDFS + ZooKeeper + HBase", connected by short control arrows. This is the independent LOCAL-dependencies example. NO arrows between A and B.
Bottom three concise notes: "每台主机最多属于一个集群"; "配置、任务与权限各自独立"; "Server 与数据库仍是共享故障边界".
Legend: solid teal "管理流量". Make ownership and the single shared control plane visually unmistakable. All explanatory labels Simplified Chinese.
```

## bindings-en

Output: multi-cluster-bindings-en.webp

```text
Title: "HBase: Managed cross-cluster dependencies".
At top one modest controller "Ambari Server" with "Approved snapshots + operation epochs". Teal control arrows go to both consumer and providers for preparation.
Left outlined area "Consumer cluster A": sketched machines "HBase Master" and "RegionServers"; a paper client-settings icon "Private client config"; beneath it "Dedicated HBase identity". 
Right two separate provider enclosures: upper "Provider cluster B / HDFS" with "NameNode + DataNodes", lower "Provider cluster C / ZooKeeper" with "ZooKeeper ensemble". Put two distinct ochre dashed arrows FROM consumer HBase TO the correct provider: upper arrow "Storage binding", lower arrow "Coordination binding".
In HDFS area draw two folder icons labelled "Private root" and "Private WAL". In ZooKeeper area draw tree icon labelled "Private znode". Bottom caption "Each binding owns a private namespace and UUID".
Bottom narrow readiness strip: "Prepare provider -> Install clients -> Verify every daemon host -> READY -> Start HBase".
Two notes: "Data flows directly to providers"; "Stop consumer does not stop providers". Small legend teal solid "Control", ochre dashed "Service traffic". Do NOT imply shared hosts, copied provider credentials, arbitrary storage engines, or proxying data through Ambari.
```

## bindings-zh

Output: multi-cluster-bindings-zh.webp

```text
Title: "HBase：跨集群托管依赖".
At top one modest controller "Ambari Server" with "已批准快照 + 操作 epoch". Teal control arrows go to both consumer and providers for preparation.
Left outlined area "消费集群 A": sketched machines "HBase Master" and "RegionServers"; a paper client-settings icon "私有客户端配置"; beneath it "独立的 HBase 身份". 
Right two separate provider enclosures: upper "提供集群 B / HDFS" with "NameNode + DataNodes", lower "提供集群 C / ZooKeeper" with "ZooKeeper 集群". Put two distinct ochre dashed arrows FROM consumer HBase TO the correct provider: upper arrow "存储绑定", lower arrow "协调绑定".
In HDFS area draw two folder icons labelled "私有 root" and "私有 WAL". In ZooKeeper area draw tree icon labelled "私有 znode". Bottom caption "每个绑定拥有独立的命名空间与 UUID".
Bottom narrow readiness strip: "准备提供方 -> 安装客户端 -> 校验全部守护进程主机 -> READY -> 启动 HBase".
Two notes: "业务数据直接访问提供方"; "停止消费方不会停止提供方". Small legend teal solid "控制流量", ochre dashed "服务流量". Do NOT imply shared hosts, copied provider credentials, arbitrary storage engines, or proxying data through Ambari. All explanatory labels Simplified Chinese.
```

## recovery-en

Output: multi-cluster-recovery-en.webp

```text
Title: "Managed HBase: Deployment and recovery".
Draw a hand-sketched sequence as six numbered milestones in two rows, with large clear arrows in the exact sequence:
1 "Save + preview" with sublabel "Draft / cluster + revision"
2 "Approve + prepare" with sublabel "Binding UUID + snapshot"
3 "Install clients" with sublabel "Exact host / request / task"
4 "Credentials + verify" with sublabel "Every current daemon host"
5 "READY -> Start HBase" with sublabel "All managed bindings ready"
6 "Service checks" with sublabel "Server confirms completion".
First row milestones 1,2,3 left to right. Second row 4,5,6 left to right. Draw a clear connector from 3 to 4 along outside edge, not crossing content.
Below flow a cylinder "Durable deployment UUID" and paper "Operation ID + epoch". Side annotation "Refresh: read the SAME deployment".
Bottom recovery band: "FAILED / STALE / UNRESOLVED -> Read state -> Review / retry when allowed"; curved recovery arrow returns to milestone 2, never directly to success.
Two footer notes: "Missing or stale evidence is not success"; "INSTALL_ONLY is not COMPLETE".
Show refresh as a read, NOT as a new launch. Credential step applies only to secure mode, mark "(if secure)" beside credentials. No code dump or fine print.
```

## recovery-zh

Output: multi-cluster-recovery-zh.webp

```text
Title: "托管 HBase：部署与恢复".
Draw a hand-sketched sequence as six numbered milestones in two rows, with large clear arrows in the exact sequence:
1 "保存并预览" with sublabel "草稿 / 集群 + 修订号"
2 "批准并准备" with sublabel "绑定 UUID + 快照"
3 "安装客户端" with sublabel "精确的主机 / 请求 / 任务"
4 "凭据与校验" with sublabel "全部当前守护进程主机"
5 "READY -> 启动 HBase" with sublabel "全部托管绑定就绪"
6 "服务检查" with sublabel "服务端确认完成".
First row milestones 1,2,3 left to right. Second row 4,5,6 left to right. Draw a clear connector from 3 to 4 along outside edge, not crossing content.
Below flow a cylinder "持久化部署 UUID" and paper "操作 ID + epoch". Side annotation "刷新：读取同一个部署".
Bottom recovery band: "FAILED / STALE / UNRESOLVED -> 读取状态 -> 按允许的动作审核 / 重试"; curved recovery arrow returns to milestone 2, never directly to success.
Two footer notes: "缺失或过期的证据不能视为成功"; "INSTALL_ONLY 不等于 COMPLETE".
Show refresh as a read, NOT as a new launch. Credential step applies only to secure mode, mark "凭据仅限安全模式" beside credentials. No code dump or fine print. All explanatory labels Simplified Chinese.
```

