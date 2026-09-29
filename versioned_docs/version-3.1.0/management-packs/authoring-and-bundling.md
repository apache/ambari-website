---
title: Author And Bundle Management Packs
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

# Author And Bundle Management Packs {#author-and-bundle}

This guide targets maintainers of the [runtime store preview](./overview.md). Use tooling and schemas from the same implementation as the destination Server. The reference repository is maintained separately from Ambari core and can be distributed as source or a reviewed bundle.

## Install The Matching Tool {#matching-tool}

The development CLI package requires Python 3.10 or later. Install it from the matching Ambari source checkout into an isolated environment:

~~~shell
export AMBARI_SOURCE=/path/to/ambari
export MPACKSTORE_DIR=/path/to/ambari-mpacks
python3 -m venv .venv-mpack
. .venv-mpack/bin/activate
python -m pip install "$AMBARI_SOURCE/dev-support/mpack"
ambari-mpack --help
~~~

These paths are examples to replace locally. The source package supplies the `ambari-mpack` entry point and its schema validator. This procedure does not assume that an equivalent package has been published to a public package registry.

## Package Layout {#package-layout}

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

A minimal extension-package manifest can declare:

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

The extension/service descriptors must supply the actual compatible Stack contexts, component names, categories, cardinalities, commands, and configuration ownership. A manifest example is not a complete runnable service.

To create a starting project:

~~~shell
ambari-mpack --json scaffold example-service --directory ./example-service
~~~

Fill in the real definitions and lifecycle implementation before validation and deployment. Do not publish an unchanged scaffold as a supported service.

## Build The Complete Store {#build-complete-store}

The repository's `release.json` maps each package name to its source path and exact definition version. The builder rejects a selection whose manifest identity does not match that index. Named profiles are stored under `profiles/<name>.json`.

~~~shell
ambari-mpack --json validate "$MPACKSTORE_DIR/mpacks/nginx"
ambari-mpack --json build --all \
  --repository "$MPACKSTORE_DIR" \
  --output dist \
  --bundle mpackstore
~~~

The deliverable is `dist/mpackstore.bundle.tar.gz` plus the individual package archives. The bundle has its own `bundle.json` index and member digests; members retain independent versions.

For the existing infrastructure-only profile:

~~~shell
ambari-mpack --json build --profile infrastructure \
  --repository "$MPACKSTORE_DIR" \
  --output dist-infrastructure \
  --bundle infrastructure
~~~

Archive identity is immutable. Publish a new version when content changes rather than replacing bytes behind a previously distributed release ID. Retain the build output and digests with the source revision used to produce them.

## Inspect And Import Through The CLI {#cli-import}

Use the Server base URL without appending the API path. In an interactive terminal the client prompts for the password:

~~~shell
export AMBARI_SERVER_URL=https://ambari.example.org
export AMBARI_USERNAME=admin
ambari-mpack --json import dist/mpackstore.bundle.tar.gz
ambari-mpack --json list
ambari-mpack --json services
~~~

For unattended use, inject `AMBARI_PASSWORD` through the execution environment's secret mechanism. Do not place credentials in the repository, bundle, command arguments, screenshots, or operation checkpoints. For a private CA, supply the CLI's `--ca-file` option.

Catalog service IDs are exact provider/context identities, not service display names. A dry-run selection against an existing cluster can be inspected before acceptance:

~~~shell
ambari-mpack --json enable "$CATALOG_SERVICE_IDS" \
  --cluster-id "$CLUSTER_ID" \
  --dry-run
~~~

Use a comma-separated list of IDs returned by the current catalog. Omitting the cluster-ID option selects a new environment. The CLI's enable operation prepares definitions and a deployment handoff; the normal deployment workflow still performs host installation.

## Author Lifecycle And Observation Contracts {#lifecycle-contracts}

Implement installation, configuration, start/stop/status, and service checks using the service's actual metadata and runtime. Separate read-only status checks from mutating commands. Preserve owned identities and persistent data, and distinguish a first installation from an existing unrelated installation.

Use structured observations to verify exact host, component, software version, execution identity, and result. Human-readable logs are diagnostic evidence, not a substitute for a native status or a matching task receipt.

Online package hooks must declare `scope: "DEFINITIONS"` and stay within the declared resource boundary. Omitted or Server-wide hook scope is rejected for online execution, although import can still register the package. This declaration is not a security sandbox.

Do not duplicate an existing Stack provider merely to make a service selectable. Declare the dependencies, compatible contexts, owned configuration types, and generic component metadata that the Server and UI need.

## Prepare Software For Disconnected Hosts {#disconnected-hosts}

A store bundle delivers management definitions. An offline rollout also needs every service's runtime inputs:

- OS repositories and packages for the destination architecture.
- The pinned upstream archive, or the pack's documented verified preloaded cache.
- Python wheels and constraints where an isolated Python environment is used.
- Java runtimes appropriate for each service.
- Source/toolchain/module inputs where a source build is required.
- Reachable external databases and coordination services.

Use the exact cache paths and digest rules in each package's README and source metadata. Disabling checksum verification to use a different archive changes the installation contract. A full software mirror or air-gapped acceptance run is separate work from producing a small store bundle.

## Maintainer Acceptance Checklist {#maintainer-acceptance}

Validate the manifest and dependency closure, build the selected archives, inspect licenses and provenance, import into a test Server, select only the intended services, and verify the handoff before host deployment. Exercise successful install/start/check paths and representative failures, including missing prerequisites, invalid configuration, interrupted work, stale identities, and retries.

Definition updates must preserve existing edited content and data. Unsupported in-use component-model changes should be rejected until a migration is implemented. See [content configuration](./content-configuration.md) and [recovery semantics](./operations-and-recovery.md).
