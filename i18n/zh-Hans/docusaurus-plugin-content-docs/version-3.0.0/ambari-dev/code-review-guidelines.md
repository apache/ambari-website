---
title: 代码审查指南
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# 代码审查指南 {#code-review-guidelines}

请参阅[如何贡献](./how-to-contribute.md)，了解如何向 Github 提交代码审查。

**怎样进行良好的代码审查？**

- 作者应在审查前注释源代码。这会使开发者更容易审查代码，也可能帮助你在审查者之前发现错误。
- 尽可能提交小规模代码审查。每小时审查超过 400 行会降低我们发现缺陷的能力。
- 审查代码超过一小时同样会降低我们发现错误的能力。
- 如有可能，将大型审查拆分为独立但功能完整的阶段。如果需要临时注释单元测试，可以这样做。提交巨型补丁会延长审查时间，因为审查者需要安排更多时间进行检查，而你也可能花费更多时间反复迭代和变基。

我们拥有全球性的提交者社区，因此请注意，即使已经获得必要的 +1，也应在合并拉取请求前**至少等待 24 小时**。

这会鼓励其他人关注你的拉取请求，并帮助我们发现更多错误（为了加快进度而放慢速度是可以接受的）。

**始终至少包含两名熟悉该代码区域的提交者。**

如果希望订阅特定区域的代码审查，[可以编辑本节](https://cwiki.apache.org/confluence/display/AMBARI/Code+Review+Guidelines)。

![](@site/versioned_docs/version-3.0.0/ambari-dev/imgs/reviewers.png "Reviewers")
