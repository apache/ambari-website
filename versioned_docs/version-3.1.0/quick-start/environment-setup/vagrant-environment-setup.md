---
title: Vagrant Environment Setup
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

# Vagrant Environment Setup {#vagrant-environment}

Vagrant is an environment envelope for testing a reviewed Ambari 3.1.0
candidate. Ambari does not publish an assumed official 3.1.0 box here. Use a
trusted, locally available box approved for the selected Linux candidate OS.

## Host And Box Requirements {#host-and-box-requirements}

Install a Vagrant provider and allocate resources for one Server and at least
one Agent. Reserve persistent storage for the database, configuration, and RPM
repository. The box must provide JDK 17 for Ambari and Linux Python 3.9.2+ with
CPython `cp39` compatibility; Rocky 8 requires AppStream `python39` and the
Ambari wrapper. Select Stack JDK independently.

## Define The Envelope {#define-the-envelope}

Create a `Vagrantfile` using your trusted box and private network. Do not copy
credentials or private keys into it:

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

Install the reviewed RPMs from the shared repository. Configure DNS or a
managed hosts file, synchronized time, database access, narrowly scoped ports,
JDK homes, and CA trust. Keep firewall and SELinux enabled with required rules.

Run `sudo ambari-server setup`, then `sudo ambari-server start` and
`sudo ambari-agent start`. Confirm TLS, heartbeat, registration, persistence
after `vagrant reload`, and a controlled service check. See [Installation](../installation-guide.md).
