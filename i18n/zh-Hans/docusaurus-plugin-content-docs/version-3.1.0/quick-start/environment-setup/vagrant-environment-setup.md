---
title: Vagrant 环境设置
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

# Vagrant 环境设置 {#vagrant-environment}
Vagrant 是测试 3.1.0 候选版本的环境封装。Ambari 不提供官方 3.1.0 box；使用批准的本地 Linux box。
## 主机和 box 要求 {#host-and-box-requirements}
安装 Vagrant provider，为 Server 和 Agent 分配 CPU、内存及持久存储。box 必须提供 JDK 17、Python 3.9.2+ 和 CPython `cp39`；Rocky 8 需要 `python39` 和 wrapper。Stack JDK 单独选择。
## 定义环境 {#define-the-envelope}
使用可信 box 和私有网络创建 `Vagrantfile`，不要写入凭据或私钥：
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
从共享仓库安装审查 RPM，配置 DNS、时间、数据库、精确端口、Java home 和 CA。保持防火墙与 SELinux 开启并添加必要规则。运行 `sudo ambari-server setup`，再运行 `sudo ambari-server start` 和 `sudo ambari-agent start`。确认 TLS、heartbeat、注册、`vagrant reload` 后的持久性及服务检查。参阅[安装](../installation-guide.md)。
