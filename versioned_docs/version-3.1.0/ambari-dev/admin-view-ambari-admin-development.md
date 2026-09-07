---
title: Admin React Development
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

# Admin React Development {#admin-react-development}

Ambari Admin is a separate React application from the primary `ambari-web/latest` UI. Its source, package metadata, Vite configuration, and tests are under `ambari-admin/src/main/resources/ui/ambari-admin`.

## Application Boundary {#application-boundary}

The Admin application owns administration navigation, cluster information, stack/version management, service accounts, auto-start settings, and related admin workflows. The primary Web UI enters it through the authenticated `/adminView` transition and the server-provided Admin View context.

Views hosted by Ambari remain server-provided applications. An Admin React build does not absorb View packages or replace their iframe resources.

## Local Development {#local-development}

Install the dependencies in the Admin application directory and use its package scripts. The Maven `ambari-admin` module uses the configured Node/npm toolchain, runs the Admin React build, and copies the resulting `dist` output into `target/classes/latest` for packaging.

```bash
cd ambari-admin/src/main/resources/ui/ambari-admin
npm install
npm run dev
npm run build
npm run lint
npm run test
```

The development server is useful for UI iteration; a complete deployment check must also verify the packaged server context, proxy root, authentication session, and Admin route transition.

## API And Roles {#api-and-roles}

Use the existing Ambari API client and authorization context. Admin screens must preserve server authorization, cluster scope, and the distinction between read-only access and mutations. Do not bypass role checks with local flags or test-only profiles.

Test representative administrator, operator, read-only, missing-cluster, and another-wizard-owner responses. Check direct navigation as well as menu visibility, because an accessible menu is not the complete route authorization contract.

## Build Evidence {#build-evidence}

The Admin package is independent of the primary `ambari-web` package. Record the exact Admin build and test commands separately from the primary UI checks, and report browser or server-context checks that were not run.
