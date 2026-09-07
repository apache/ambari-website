---
title: Management Packs
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

# Management Packs {#management-packs}

An Ambari management pack is an archive of stack, service, extension, or view artifacts plus `mpack.json` metadata. The Server `setupMpacks.py` implementation expands the archive, reads its metadata, validates prerequisites, stages the pack, and creates the resources used by the stack loader.

## Metadata {#metadata}

`mpack.json` identifies the pack with a name, version, and description. Its prerequisites can constrain Ambari versions and installed stack versions. Its artifacts describe the source directories and artifact types, such as stack definitions, service definitions, extension definitions, and stack add-on service definitions. Invalid or missing metadata prevents installation.

## Packaging and Dependencies {#packaging-and-dependencies}

Package only the definitions and files required by the artifact catalog. A full stack pack can provide stack versions and common service definitions; an add-on pack can provide a service and its applicability to an installed stack. Keep package scripts, configuration, repositories, and service metadata in the paths named by each artifact. The management-pack mechanism is independent of the retired AMS/Ganglia packaging model.

## Install, Upgrade, and Purge {#install-upgrade-purge}

The installer validates prerequisites and can run pack hooks around installation or upgrade. Purging Stack definitions is restricted to packs that contain Stack artifacts, preventing an add-on pack from accidentally removing an installed Stack. After staging, Ambari updates resource links and explicitly requests an Ambari Server restart; staging alone does not reload the running Server's Stack model.

In a planned maintenance window, install a reviewed pack and restart Server:

```shell
sudo ambari-server install-mpack --mpack=/path/to/reviewed-management-pack.tar.gz
sudo ambari-server restart
```

Confirm the newly loaded Stack/service metadata and a controlled service operation afterward. Do not add purge options to a normal add-on installation or treat the archive's successful extraction as completed runtime validation.

## Verification {#verification}

Inspect `mpack.json`, artifact paths, service descriptors, package files, configuration dependencies, and prerequisites before deployment. Test installation, upgrade, rollback or uninstall behavior, and service checks on the target stack. The implementation is in [setupMpacks.py](https://github.com/apache/ambari/blob/94c6389a96/ambari-server/src/main/python/ambari_server/setupMpacks.py).
