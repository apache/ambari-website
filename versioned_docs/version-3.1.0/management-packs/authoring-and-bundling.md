---
title: Developer Guide - API And Service Integration
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

# Developer Guide - API And Service Integration {#author-and-bundle}

This article is for developers automating the [service store](./overview.md) or adding a service to it. For ordinary installation, use the console walkthrough. The first half describes HTTP calls; the second covers the packaging tool. See [how the store works](./implementation.md) for the design behind these calls.

## API Basics {#api-basics}

Adding your first service? Start with [the step-by-step tutorial](./add-service-tutorial.md), which includes complete downloadable scripts and a UI acceptance walkthrough.

All paths below are relative to `/api/v1`. Use an authenticated Ambari administrator with `AMBARI.MANAGE_STACK_VERSIONS`. Supply the normal Ambari authentication and `X-Requested-By` header for writes; inject credentials through your client's secret mechanism.

JSON responses use integer `schema_version: 1`; collection responses contain `items`. Check the capability endpoint first and use the schema from the same Server build. These are the development APIs identified in the [source baseline](../release-baseline.md#runtime-mpack-follow-up), not a promise that an older Ambari release supports them.

## Available Endpoints {#api-endpoints}

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/mpack_capabilities` | Discover supported actions, target environments, and Agent requirements |
| GET | `/mpack_capabilities/manifest_schema` | Obtain the package manifest schema |
| POST | `/mpack_uploads` | Upload and inspect an archive; does not install it |
| POST | `/mpack_plans` | Preview a package import, update, binding change, or removal |
| GET | `/mpack_plans/{id}` | Read a saved plan |
| GET | `/mpack_services` | List service choices, unavailable reasons, and destinations |
| POST | `/mpack_service_plans` | Preview a selection of services for a destination |
| POST | `/mpack_operations` | Submit a saved plan for execution |
| GET | `/mpack_operations` | List operations |
| GET | `/mpack_operations/{id}` | Read progress and structured results |
| GET | `/mpack_operations/{id}/members` | Read the results for bundle members |
| GET | `/mpack_operations/{id}/deployment` | Obtain the verified installation-wizard handoff |
| POST | `/mpack_operations/{id}/recover` | Reconcile the result of interrupted work |
| POST | `/mpack_operations/{id}/retry` | Retry a failed action when the Server allows it |
| POST | `/mpack_operations/{id}/cancel` | Cancel when its effects make cancellation safe |
| GET | `/mpacks` | List package releases |
| GET | `/mpacks/{name}/versions/{version}` | Read one exact package release |
| GET | `/mpacks/{name}/versions/{version}/usages` | Find what still uses a release |
| GET | `/mpack_bindings` | Read which package definitions are currently connected to each environment |

## Example Flow: Import, Select, Install {#api-walkthrough}

**Upload.** Send the compressed bytes to the upload endpoint with `Content-Type: application/octet-stream`. The optional `X-Content-SHA256` header must match the archive. The default limits are 256 MiB compressed, 1 GiB expanded, and 100,000 entries.

**Preview the import.** Collect every member's archive digest from the bundle inspection and submit this shape to the plan endpoint. Replace the sample digest with the real values, including all members:

~~~json
{
  "schema_version": 1,
  "action": "IMPORT",
  "archive_digests": ["<member-archive-sha256>"],
  "release_ids": [],
  "bindings": [],
  "activate": false,
  "maintenance": false
}
~~~

Plan requests use `Content-Type: application/json`. All mutation fields are required; unknown fields and duplicate JSON keys are rejected. Keep the returned plan's `id` and `digest`. Previewing does not execute the operation.

**Submit the saved plan.** Persist a fresh `Idempotency-Key` with that plan before sending it to the operation endpoint:

~~~json
{
  "schema_version": 1,
  "plan_id": "<returned-plan-id>"
}
~~~

HTTP 202 means accepted, not finished. Poll the operation returned in the response. A plan expires after one hour; changed catalog or environment inputs can also make it stale.

If the submission response is lost, resend the same plan and key using the same account. That returns the original operation. Do not generate a new key merely because a request timed out.

**Select services.** Once the import succeeds, read the service catalog and use the exact IDs it returns. Submit this shape to the service-plan endpoint:

~~~json
{
  "schema_version": 1,
  "service_ids": ["<catalog-service-id>"],
  "cluster_id": null,
  "maintenance": false
}
~~~

Use `null` for a new cluster or the existing cluster's numeric ID. Review the returned destination and service selection, then submit this new plan with its own key and wait for completion.

**Continue installation.** After `SUCCEEDED`, request the operation's deployment handoff. It rechecks the selected definitions and supplies the destination for Create Cluster or Add Services. Host assignments, configuration, and installation still happen through the ordinary Ambari deployment workflow.

When consuming progress, verify `id`, `plan_id`, `plan_digest`, and `generation`, together with the effective result. A log line or a successful HTTP request is not enough to establish completed installation.

## Errors And Recovery {#operation-recovery-api}

Errors contain `error.code`, a diagnostic message, and structured details. Branch on the code, not on translated text.

| Result | What the client should do |
| --- | --- |
| HTTP 403 / `FORBIDDEN` | Use an account with the required authorization |
| HTTP 413 / `UPLOAD_LIMIT` | Check the archive and configured limits |
| HTTP 409 / `STALE_PLAN` | After definite rejection, obtain a new preview |
| HTTP 409 / `IDEMPOTENCY_CONFLICT` | Check that the saved key and request match; do not silently replace the key |
| HTTP 409 / `RESOURCE_IN_USE` | Inspect usage references before removal |
| HTTP 409 / `OPERATION_CONFLICT` | Resolve or wait for the conflicting operation |
| HTTP 503 / `STORAGE_FAILURE` | Diagnose storage and establish the previous operation's state before resubmitting |

Recovery checks recorded results. Retry is restricted to eligible failed, idempotent hooks with a confirmed no-effect result. Cancellation can be refused if effects were applied or remain uncertain. Unknown results must remain unresolved rather than being treated as success.

The matching CLI also exposes these actions. First inspect the operation:

~~~shell
ambari-mpack --json operations show "$OPERATION_ID"
ambari-mpack --json operations members "$OPERATION_ID"
~~~

Then choose the appropriate action below. These are alternatives, not commands to run one after another:

~~~shell
ambari-mpack --json operations recover "$OPERATION_ID"
ambari-mpack --json operations retry "$OPERATION_ID"
ambari-mpack --json operations cancel "$OPERATION_ID"
~~~

The implementation contract is in the matching Ambari checkout's `docs/mpack/http-api.md`. Endpoint handling is in `MpackLifecycleApiService`; state and validation are defined by `MpackLifecycleState`, `MpackLifecycleService`, and `MpackExceptionMapper`.

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
