---
title: View API
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

# View API {#view-api}

The View REST API is implemented by `ViewService`, `ViewVersionService`, `ViewInstanceService`, `ViewPermissionService`, and `ViewPrivilegeService` under `ambari-server/src/main/java/org/apache/ambari/server/api/services/views`.

## Discover Views {#discover-views}

List deployed View definitions:

```
GET /api/v1/views
```

Read versions for a View:

```
GET /api/v1/views/{viewName}/versions
GET /api/v1/views/{viewName}/versions/{version}
```

The React directory performs an initial `GET /api/v1/views`, then requests visible non-system instances with `versions/ViewVersionInfo/system=false`. Empty and failed discovery are separate UI states with retry support.

## Manage Instances {#manage-instances}

Create, update, list, and delete instances with the instance resource:

```
POST /api/v1/views/{viewName}/versions/{version}/instances
POST /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}
PUT /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}
GET /api/v1/views/{viewName}/versions/{version}/instances
DELETE /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}
```

An instance identifies one configured View version. Its properties are validated against the View definition; sensitive values should be supplied only through the supported server configuration and permission model.

## Permissions and Privileges {#permissions-and-privileges}

View versions can declare custom permissions through the permissions resource. Instance access is represented by privileges:

```
GET /api/v1/views/{viewName}/versions/{version}/permissions
GET /api/v1/views/{viewName}/versions/{version}/instances/{instanceName}/privileges
```

The server remains authoritative for authorization and filtering. React uses the authorized directory response and does not invent client-side privilege metadata. The `VIEW.USE` authorization determines the reduced View-only shell; administrative View management is a separate Ambari Admin concern.

## Browser URL {#browser-url}

After an instance is selected, React builds a same-origin browser URL from the server-returned `context_path` and hosts the application in an iframe. This preserves the View application’s own assets and routes while the Ambari shell owns navigation, loading, timeout, and retry states.
