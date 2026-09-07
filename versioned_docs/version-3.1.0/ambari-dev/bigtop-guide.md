---
title: Building Compatible Bigtop Components for Ambari 3.1
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

# Building Compatible Bigtop Components for Ambari 3.1 {#building-compatible-bigtop-components-for-ambari-31}

Ambari 3.1 packages require a deliberately selected compatible Bigtop reference. Ambari 3.1 is not a Bigtop release and must not be described as Bigtop 3.1.

## Select the Stack reference {#select-the-stack-reference}

Check service definitions and release issues for the supported Bigtop Stack reference. Bigtop 3.4 inherits from the 3.3 and 3.2 lines; choose and record the exact compatible ref or tag.

Verify source roots, RPM profile, required JDK, Python interpreter, package manager, and platform support. Do not copy an HDP or CentOS 6 recipe without checking current dependencies.

## Build and validate {#build-and-validate}

Clone Bigtop at the selected ref and inspect its current instructions. Keep the Ambari source tag and Bigtop ref as separate provenance fields. Build only required components and capture output, package names, checksums, and configuration.

Install packages in a disposable Ambari environment. Verify registration, configuration, startup, upgrade, and failure recovery, then run focused Server, Agent, UI, and telemetry tests.

Report build or integration errors with source and compatible-ref evidence; never change the claimed Stack version to make a build appear successful.
