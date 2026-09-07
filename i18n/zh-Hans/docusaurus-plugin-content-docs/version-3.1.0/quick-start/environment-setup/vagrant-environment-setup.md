---
title: Vagrant 环境准备
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

# Vagrant 环境准备 {#vagrant-environment}

Vagrant 可以为经过审查的 Ambari 3.1.0 候选版本提供可重复创建的验证环境。Ambari 项目并未在此发布或指定官方 3.1.0 Box；应使用组织批准、已在本地验证且与候选 Linux 发行版一致的可信 Box。

## 主机与 Box 要求 {#host-and-box-requirements}

安装宿主机支持的 Vagrant Provider，并为一台 Server 和至少一台 Agent 虚拟机分配足够的 CPU、内存和持久化存储。元数据库、Ambari 配置和 RPM 仓库都应位于可持久化的位置。Box 必须为 Ambari 提供 JDK 17，以及兼容 CPython `cp39` ABI 的 Linux Python 3.9.2 或更高版本；Rocky Linux 8 需要 AppStream `python39` 和 Ambari 运行时封装脚本。Stack 服务使用的 JDK 应独立选择。

## 定义环境 {#define-the-envelope}

使用可信 Box 和私有网络创建 `Vagrantfile`。不要把密码、注册口令、证书私钥或其他凭据写入该文件：

```ruby
Vagrant.configure("2") do |config|
  config.vm.define "ambari-server" do |vm|
    vm.vm.box = "your-approved-box"
    vm.vm.hostname = "ambari-server"
    vm.vm.network "private_network", ip: "192.168.56.20"
    vm.vm.network "forwarded_port", guest: 8080, host: 8080
  end
  config.vm.define "ambari-agent" do |vm|
    vm.vm.box = "your-approved-box"
    vm.vm.hostname = "ambari-agent"
    vm.vm.network "private_network", ip: "192.168.56.21"
  end
  config.vm.synced_folder "./ambari-repo", "/vagrant/ambari-repo"
end
```
```shell
mkdir -p ambari-repo
vagrant up
vagrant status
```

从共享仓库安装经过审查的 RPM，并配置 DNS 或统一管理的 hosts 文件、时间同步、数据库访问、范围明确的端口规则、两套 Java Home 以及 CA 信任。防火墙和 SELinux 应保持启用，只增加部署所需的规则。

运行 `sudo ambari-server setup`，然后依次运行 `sudo ambari-server start` 和 `sudo ambari-agent start`。确认 TLS 身份、Agent 心跳和主机注册均正常，并验证执行 `vagrant reload` 后的数据持久性以及一次受控的服务检查。完整流程见[安装](../installation-guide.md)。
