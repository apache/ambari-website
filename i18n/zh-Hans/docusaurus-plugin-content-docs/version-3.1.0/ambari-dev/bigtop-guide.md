---
title: 为 Ambari 3.1 构建兼容的 Bigtop 组件
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

# 为 Ambari 3.1 构建兼容的 Bigtop 组件 {#building-compatible-bigtop-components-for-ambari-31}

Ambari 3.1 软件包需要明确选择兼容的 Bigtop reference。Ambari 3.1 不是 Bigtop 发布版本，不得称为 Bigtop 3.1。

## 选择 Stack 基线 {#select-the-stack-reference}

根据服务定义和发布问题确认受支持的 Bigtop Stack 基线。Bigtop 3.4 会继承 3.3 和 3.2 系列的内容，因此必须选择并记录准确的兼容引用或标签，不能只写一个宽泛的版本范围。

验证源码根目录、RPM 构建配置、所需 JDK、Python 解释器、软件包管理器和平台支持范围。未核对当前依赖和服务定义前，不要复制旧 HDP 或 CentOS 6 配方。

## 构建和验证 {#build-and-validate}

在选定 ref 检出 Bigtop 并查看当前说明。将 Ambari 源代码标签和 Bigtop ref 分开记录为来源字段。只构建所需组件，并保存输出、软件包名称、校验和及配置。

在一次性 Ambari 环境安装软件包，验证注册、配置、启动、升级和失败恢复，然后运行聚焦的 Server、Agent、UI 和遥测测试。

使用源代码和兼容 ref 证据报告构建或集成错误；不要更改 Stack 版本声明来掩盖失败。
