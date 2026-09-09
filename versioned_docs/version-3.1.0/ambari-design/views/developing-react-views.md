---
title: Developing React Views
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

# Develop And Deploy A React View {#develop-and-deploy-react-view}

An Ambari View is a versioned application archive managed by Ambari Server. It
can contain a browser application, JAX-RS resources, instance parameters,
permissions, and lifecycle hooks. The primary React shell discovers authorized
View instances and opens each application in a Server-provided same-origin
iframe context.

Use a View for a separately deployable tool such as a file browser, scheduler
editor, diagnostics console, or AI-assisted operations page. Use
[the primary React UI](../../frontend/customizing-react-ui.md) when a feature
must change shared Ambari navigation or a built-in workflow.

## Reference Implementations {#reference-implementations}

Ambari `trunk` contains two React View implementations:

| View | Frontend | Server resources | Useful patterns |
| --- | --- | --- | --- |
| Files | `contrib/views/files/src/main/resources/ui` | `contrib/views/files/src/main/java` | Path-aware API root, file operations, upload/download, errors, and reverse-proxy tests |
| Capacity Scheduler | `contrib/views/capacity-scheduler/src/main/resources/ui` | `contrib/views/capacity-scheduler/src/main/java` | Configuration editing, privilege checks, YARN operations, save/refresh, and save/restart flows |

Both use React 19, TypeScript, Vite, Vitest, Node 22.23.1, and npm 10.9.8 in
the 3.1 build. Study both modules, but do not copy their HDFS or YARN
dependencies into an unrelated View.

## Archive Layout {#archive-layout}

A React View normally follows this layout:

```text
my-view/
├── pom.xml
└── src/main/
    ├── java/org/example/ambari/view/
    │   └── MyViewService.java
    └── resources/
        ├── view.xml
        ├── view.log4j.properties
        └── ui/
            ├── package.json
            ├── package-lock.json
            ├── vite.config.ts
            ├── index.html
            └── src/
```

The Maven build must run the frontend build before resource processing and
package the generated `ui/dist` files at the archive root. It also packages
`view.xml`, the View's Server classes, and runtime libraries under
`WEB-INF/lib`. Dependencies supplied by Ambari Server must use `provided`
scope; bundling a second Servlet, Jetty, Jersey, or logging implementation can
break the View classloader.

## Define The View {#define-the-view}

`src/main/resources/view.xml` defines the stable View name, version,
configuration parameters, REST resources, permissions, and optional automatic
instances. A minimal definition with one protected resource looks like this:

```xml
<view>
  <name>AI-ASSISTANT</name>
  <label>AI Assistant</label>
  <version>1.0.0</version>
  <min-ambari-version>3.1.*</min-ambari-version>

  <parameter>
    <name>request.timeout.seconds</name>
    <description>Maximum time for an assisted request.</description>
    <required>true</required>
    <default-value>30</default-value>
  </parameter>

  <resource>
    <name>assistant</name>
    <service-class>org.example.ambari.view.AssistantService</service-class>
  </resource>

  <permission>
    <name>USE_ASSISTANT</name>
    <description>Submit requests to the assistant.</description>
  </permission>
</view>
```

The `<name>` and `<version>` values become part of the public URL and persisted
View identity. Use a new version when releasing incompatible frontend,
resource, parameter, or data changes. Define an explicit migration when
instance data must move between versions.

Parameters are instance configuration, not a safe place for plaintext
credentials. Resolve sensitive values through Server-side protected credential
storage and never return them to the browser.

See [View Definition](./view-definition.md) for the complete descriptor and
[Framework Services](./framework-services.md) for instance data, persistence,
events, and lifecycle services.

## Implement Server Resources {#implement-server-resources}

The `<resource>` entry maps a name to a View service class. Ambari publishes
that resource below the authenticated instance URL:

```text
/api/v1/views/{view}/versions/{version}/instances/{instance}/resources/{resource}
```

Use `ViewContext` in the Server class to obtain the current user, instance
properties, cluster association, and data services. Call
`ViewContext.hasPermission` before each protected operation; the React UI may
hide a control, but the resource remains the authorization boundary.

Return bounded, explicit DTOs. Validate paths, identifiers, query sizes, and
outbound destinations. Set timeouts on HDFS, YARN, Ambari, and external-service
calls. Convert expected failures into useful HTTP status codes without
returning stack traces, credentials, or unrestricted model output.

### AI-Assisted Views {#ai-assisted-views}

Keep AI-provider access behind the View resource:

```text
React View
    │ same-origin request
    ▼
View JAX-RS resource
    ├── authorized Ambari or service API
    └── approved AI provider
```

The browser sends the user's request to the View resource. The Server checks
the View permission, limits the request, loads the protected provider
credential, calls the approved endpoint, filters the response, and records an
auditable result. Never call a provider with a long-lived key from React.
Require an additional confirmation before an AI suggestion can create an
Ambari request or mutate cluster state.

## Build A Path-Safe React Frontend {#build-a-path-safe-react-frontend}

Set Vite's asset base to a relative path so the same archive works with View
names, versions, instances, and reverse-proxy prefixes:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
  test: { environment: "jsdom" },
});
```

Do not hard-code `/api/v1` from the origin root. A View may be served at a path
such as `/gateway/default/ambari/views/...`. Derive the Ambari application root
from the current pathname and build the encoded resource URL:

```ts
const applicationRoot = (pathname: string) => {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const viewsIndex = normalized.lastIndexOf("/views/");
  return viewsIndex >= 0 ? `${normalized.slice(0, viewsIndex)}/` : "/";
};

const resourceRoot = `${applicationRoot(window.location.pathname)}api/v1/` +
  `views/${encodeURIComponent(view)}/versions/${encodeURIComponent(version)}/` +
  `instances/${encodeURIComponent(instance)}/resources/assistant`;
```

Send session credentials and Ambari's CSRF header on resource requests:

```ts
const response = await fetch(`${resourceRoot}/query`, {
  method: "POST",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-By": "ai-assistant-view",
  },
  body: JSON.stringify(request),
});
```

Keep navigation inside the View's own hash or relative paths unless the user
explicitly leaves the View. Test both canonical paths that Ambari may provide:

```text
/views/{view}/{version}/{instance}/
/views/{view}/{instance}/
```

The Files and Capacity Scheduler API helpers locate the last `/views/` segment,
which preserves a reverse-proxy prefix and avoids confusing an earlier path
segment with the View context.

## Build And Inspect The Archive {#build-and-inspect-the-archive}

For frontend-only iteration in either reference module:

```shell
cd contrib/views/files/src/main/resources/ui
npm ci --no-audit --no-fund
npm test
npm run build
```

Build the complete reference archives from the Ambari repository root:

```shell
mvn -B -pl :files -am package
mvn -B -pl :capacity-scheduler -am package
```

For a new module, replace the artifact selector with its Maven artifact ID.
Inspect the result before deployment:

```shell
jar tf target/my-view-1.0.0.jar | sort
```

Confirm that the archive contains `view.xml`, `index.html`, every hashed asset
referenced by `index.html`, Server classes, and only the intended runtime
libraries. Run Java resource tests and frontend tests in the same change as the
behavior they verify.

## Deploy The View {#deploy-the-view}

The default View archive directory is
`/var/lib/ambari-server/resources/views`. Check the `views.dir` value in
`ambari.properties` before deploying to a customized Server.

Install the reviewed archive and restart Ambari Server:

```shell
install -m 0644 target/my-view-1.0.0.jar \
  /var/lib/ambari-server/resources/views/
ambari-server restart
```

Watch `ambari-server.log` for the View version to reach `DEPLOYED`. A classload,
descriptor, or dependency error leaves the version unavailable and must be
fixed before creating an instance. Do not repeatedly overwrite an active
archive with different content under the same version; publish a new version
so deployment, rollback, and data migration remain explicit.

Create and configure an instance from the Ambari Administration UI, then grant
the required users or groups access to that instance and any custom View
permissions. The equivalent instance API is documented in
[View API](./view-api.md).

An authorized instance is opened at its Server-provided URL, for example:

```text
/views/AI-ASSISTANT/1.0.0/PRODUCTION/
```

Do not construct that browser URL from a guessed host or context root. Read the
instance URL returned by Ambari, particularly when Knox or another reverse
proxy fronts the Server.

## Validation Checklist {#validation-checklist}

Before distributing a View archive:

* Run frontend unit tests, the TypeScript build, and the production Vite build.
* Run focused Java tests for every JAX-RS resource and permission branch.
* Inspect archive contents and dependency versions.
* Deploy a clean version, create an instance, and grant least-privilege access.
* Test allowed, denied, unauthenticated, expired-session, and CSRF failure cases.
* Test normal, empty, malformed, timeout, retry, and backend-unavailable paths.
* Verify direct View navigation under root and reverse-proxy context paths.
* Check refresh, browser Back, iframe errors, narrow viewports, and keyboard use.
* Verify that logs, responses, browser storage, and bundles contain no secrets.
* Upgrade to a new View version and exercise rollback or data migration.

## Related Documentation {#related-documentation}

* [Views Overview](./index.md)
* [View Definition](./view-definition.md)
* [Framework Services](./framework-services.md)
* [View API](./view-api.md)
* [Customizing The React UI](../../frontend/customizing-react-ui.md)
* [Building Ambari From Source](../../ambari-dev/building-from-source.md)
