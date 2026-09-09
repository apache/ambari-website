---
title: Customizing The React UI
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

# Customize The React UI {#customize-react-ui}

Ambari 3.1 serves the primary Web UI from `ambari-web/latest`. This guide
explains how to change that application, validate the change, build the Server
Web artifact, and test a development deployment. It applies to changes that
belong in Ambari's shared shell or built-in workflows.

An independently deployed tool normally belongs in an Ambari View instead.
Read [Developing React Views](../ambari-design/views/developing-react-views.md)
before adding product-specific pages to the primary UI.

## Choose The Extension Boundary {#choose-extension-boundary}

| Requirement | Extension point | Reason |
| --- | --- | --- |
| Change shared navigation, authentication, Hosts, Services, Configs, Alerts, or another built-in workflow | `ambari-web/latest` | The feature participates in the primary shell, shared state, and Ambari permissions. |
| Add a separately versioned application with its own UI and REST resources | [Ambari View](../ambari-design/views/developing-react-views.md) | A View can be packaged, deployed, upgraded, and granted privileges without rebuilding the primary UI. |
| Change a service configuration layout or widget | [Service Theme](../ambari-design/stack-and-services/extensions.md) | Stack metadata owns service-specific configuration presentation. |
| Add orchestration, persistence, or a privileged operation | Ambari Server API plus one of the UI boundaries above | Authorization and mutation logic must remain authoritative on the Server. |

Do not place a feature in the primary UI only to avoid creating a View. Core UI
changes affect every Ambari installation and must preserve all supported
authentication, authorization, proxy, and cluster-state behavior.

## Requirements And Baseline {#requirements-and-baseline}

Use a current Ambari `trunk` checkout and the toolchain declared by that
checkout. The 3.1 baseline uses JDK 17, Maven 3.9.x, Node 22.23.1, and npm
10.9.8. The Maven frontend plugin downloads the pinned Node and npm versions;
direct frontend commands require compatible tools on `PATH`.

Before changing the UI:

1. Confirm that the worktree is based on the intended `trunk` revision.
2. Read the nearest tests and the relevant Server API or Stack contract.
3. Do not edit `latest/dist` or `target/classes/latest`; both are generated.
4. Keep product-specific credentials and privileged logic out of browser code.

## Source Map {#source-map}

| Path | Responsibility |
| --- | --- |
| `ambari-web/latest/src/router/RoutesList.tsx` | Route tree and route-level permission, feature, and operation guards |
| `ambari-web/latest/src/screens` | Workflow and page implementations |
| `ambari-web/latest/src/api` | Ambari REST clients, request payloads, and response handling |
| `ambari-web/latest/src/store` | Authenticated user, cluster, service, and shared application state |
| `ambari-web/latest/src/components` | Reusable controls, progress, guards, navigation, and View integration |
| `ambari-web/latest/src/locales` | English and Simplified Chinese UI messages |
| `ambari-web/latest/src/test` | Shared Vitest and jsdom test setup |
| `ambari-web/latest/vite.config.ts` | Vite base path, React plugin, and test configuration |

Follow the nearest existing feature rather than creating a second request,
state, or notification pattern. For example, a new service operation should
reuse the existing request-progress model instead of treating an accepted API
response as completed work.

## Develop A Core UI Change {#develop-a-core-ui-change}

### Install, Test, And Build {#install-test-and-build}

Run the frontend directly for the shortest edit cycle:

```shell
cd ambari-web/latest
npm ci --no-audit --no-fund
npm test
npm run build
```

`npm run build` runs the TypeScript build and writes a fresh Vite bundle to
`ambari-web/latest/dist`. `npm test` runs the complete Vitest suite. Run
`npm run lint` as an additional check, but compare any repository-wide findings
with the untouched `trunk` baseline instead of attributing every existing lint
finding to the change.

The Vite development server is useful for component work:

```shell
npm run dev -- --host 127.0.0.1
```

It does not reproduce Ambari Server authentication, WebSocket delivery, View
hosting, or a reverse-proxy prefix by itself. Use a packaged deployment or a
same-origin development proxy before claiming integration behavior.

### Add Routes And Navigation {#add-routes-and-navigation}

Register built-in routes in `RoutesList.tsx` and use the established guards:

* `ProtectedRoute` controls Ambari authorization names and a safe fallback.
* `FeatureRouteGuard` controls Stack or Server feature flags.
* `ServiceOperationRouteGuard` prevents conflicting service workflows.
* Workflow-specific guards protect persisted ownership and recovery state.

Hiding a navigation item is not authorization. Protect the direct route and
enforce the same privilege in the Server API. Test direct URL entry, browser
refresh, unauthorized roles, disabled feature flags, and conflicting running
operations.

### Use Shared API And State Contracts {#use-shared-api-and-state-contracts}

Add REST calls under `src/api` and reuse the configured `ambariApi` client. It
sends same-origin credentials and centralizes authentication failure handling.
Follow existing mutation endpoints for `X-Requested-By`, content type, and
payload shape; do not embed usernames, passwords, tokens, or provider keys.

Ambari operations are asynchronous. When a mutation creates a request, retain
its request ID, follow authoritative Server task states, surface the failed
host or task, and provide the same supported retry or recovery action after a
refresh. Do not replace Server state with a timer or an optimistic success
message.

### Preserve Localization And Accessibility {#preserve-localization-and-accessibility}

Add user-facing messages to both
`src/locales/en/translation.json` and
`src/locales/zh/translation.json`. Keep stable resource identifiers in API
payloads and translate display labels only. New controls must remain usable by
keyboard, expose an accessible name, retain visible focus, and report loading,
empty, success, and failure states without relying only on color.

## Build The Server Web Artifact {#build-the-server-web-artifact}

The Maven module pins the frontend toolchain, builds the React application, and
copies `latest/dist` into `ambari-web/target/classes/latest`:

```shell
mvn -B -pl :ambari-web -am \
  -DskipTests -DskipPythonTests=true package
```

The supported delivery path is to build and install reviewed Ambari Server
packages. That keeps the Web files, Java artifacts, version metadata, and
package ownership in sync. Do not copy `node_modules`, a Vite development
server, or source files to a managed cluster node.

## Replace Static Files For Development {#replace-static-files-for-development}

The default RPM configuration sets `webapp.dir` to
`/usr/lib/ambari-server/web`, so the React application is served from the
`latest` child directory. A custom installation may set a different
`webapp.dir` in `ambari.properties`; inspect that value first.

For a disposable development Server, the complete `dist` directory can be
staged and swapped while the Server is stopped:

```shell
ambari-server stop
stamp=$(date +%Y%m%d%H%M%S)
install -d /usr/lib/ambari-server/web/latest.new
cp -a /path/to/ambari-web/latest/dist/. \
  /usr/lib/ambari-server/web/latest.new/
mv /usr/lib/ambari-server/web/latest \
  "/usr/lib/ambari-server/web/latest.${stamp}"
mv /usr/lib/ambari-server/web/latest.new \
  /usr/lib/ambari-server/web/latest
ambari-server start
```

Swap the whole directory. Vite filenames are content-hashed, so copying only
selected files can leave `index.html` pointing at an incompatible asset set.
Keep the timestamped directory until validation finishes. For rollback, stop
the Server, move the failed `latest` directory aside, restore the timestamped
directory as `latest`, and start the Server again.

This procedure is for development only. Production changes should be delivered
through versioned, reviewable packages and the site's normal rollout process.

## Validation Checklist {#validation-checklist}

Validate more than the successful page render:

* Run focused tests for the changed screen, API client, store, and guards.
* Run the complete Vitest suite and production build.
* Open `/latest/#` through the deployment's real base path and TLS endpoint.
* Exercise local login and configured SSO, session expiry, and logout.
* Test an allowed role and a denied role by direct URL as well as navigation.
* Inject API rejection, timeout, partial task failure, refresh, and retry.
* Verify English and Simplified Chinese, keyboard use, and narrow viewports.
* Check WebSocket or polling recovery if the page consumes live state.
* Inspect the browser console, network requests, CSP behavior, and Server logs.

## Security Rules {#security-rules}

Treat browser code as public. Never compile a password, API token, private key,
or AI-provider credential into the React bundle or a `VITE_` variable. A
privileged external call needs a Server-side endpoint, protected credential
storage, explicit authorization, input and output limits, and auditable error
handling.

Avoid rendering Server or model output as raw HTML. Preserve Ambari's
same-origin credential model, CSRF header conventions, CSP, proxy prefix, and
authorization checks. A React guard improves the user experience but never
replaces a Server permission check.

## Related Documentation {#related-documentation}

* [React User Guide](./react-ui.md)
* [Developing React Views](../ambari-design/views/developing-react-views.md)
* [Building Ambari From Source](../ambari-dev/building-from-source.md)
* [Running Tests](../ambari-dev/running-tests.md)
* [View Definition](../ambari-design/views/view-definition.md)
* [Stack Extensions](../ambari-design/stack-and-services/extensions.md)
