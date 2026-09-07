---
title: 功能标志
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->

# 功能标志 {#feature-flags}

* 有时我们希望最终用户能够体验新功能，但由于该功能尚未经过严格测试，不希望将其作为通用功能公开；在其他情况下，我们希望为某些边缘场景提供应急开关，但由于使用该开关可能存在危险，不应普遍公开，只能在特殊情况下使用。为此，Ambari 提供了**功能标志**概念。

* 可以在 App.supports 映射中创建功能标志，位置为 [https://github.com/apache/ambari/blob/trunk/ambari-web/app/config.js](https://github.com/apache/ambari/blob/trunk/ambari-web/app/config.js)
* 这些布尔标志通过 `<ambari-server-protocol>://<ambari-server-host>:<ambari-server-port>/#/experimental` 暴露在 Ambari Web UI 中。
    * 最终用户可以访问上述 URL 来启用某些实验性功能。

        ![](@site/versioned_docs/version-3.0.0/ambari-dev/imgs/experimental-features%20.png)

* 在 Ambari Web 代码中，应通过 App.supports 对象切换实验性功能的启用/禁用。

* 在 ambari-web 项目下递归搜索 "App.supports"，即可看到示例用法。
