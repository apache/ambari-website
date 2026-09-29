---
title: Edit Complete Configuration Files
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

# Edit Complete Configuration Files {#edit-complete-configuration-files}

The reference service packs prefer complete native documents in `content` properties. This makes it possible to retain application options, comments, and new upstream settings without waiting for a separate form field for every setting. Read the [preview scope](./overview.md) before applying this workflow to an older installation.

## Configuration Files And Basic Settings {#files-and-basic-settings}

Open the service's **Configs** page. **Configuration Files** is the default view for these packs. **Basic Settings** retains installation inputs, management identities, listener settings, credentials, and management-operation parameters. An empty Advanced tab is not shown merely to provide another tab.

| Service | Documents exposed by the reference pack |
| --- | --- |
| PostgreSQL | `postgresql.conf`, `pg_hba.conf`, `pg_ident.conf` |
| Nginx | `nginx.conf` |
| Kyuubi | `kyuubi-defaults.conf`, environment assignments, `log4j2.properties` |
| Trino | `config.properties`, `node.properties`, `log.properties`, `jvm.config`, catalog documents |
| Doris | `fe.conf` and `be.conf` |
| Elasticsearch | `elasticsearch.yml`, JVM options, `log4j2.properties` |
| MinIO | `minio.env` assignments |
| Airflow | `airflow.cfg` and `webserver_config.py` |
| Celeborn | `celeborn-defaults.conf`, environment assignments, `log4j2.properties` |
| DolphinScheduler | Role-specific `application.properties`, `common.properties`, Logback and JVM documents |

![Complete Doris configuration documents in the dark console](@site/static/img/3.1.0/mpack-store/configuration-files-dark.jpg)

The current content control is a multiline text editor. A dedicated IDE-style file tree, syntax-aware editor, or universal application validator is not implied by the presence of complete documents.

## Safe Editing Workflow {#editing-workflow}

1. Select the intended service, configuration group, and current version.
2. Review **Basic Settings** and any managed paths/listeners before editing content.
3. Edit the complete document, retaining required includes and template placeholders.
4. Save a configuration version with a useful note.
5. Apply the required restart, or a supported reload command.
6. Check the task outcome and the application's effective configuration.
7. Reopen the configuration version to confirm that the saved document is the expected one.

Saving an Ambari version and activating a process configuration are separate operations. A restart-required indicator is not a failed save, and a successful save alone does not prove the process loaded the file.

## Managed Values And Native Formats {#managed-values-and-formats}

Application settings can coexist with management-controlled identity, listener, and path values. The pack can add those managed defaults separately. Conflicting user declarations fail validation rather than silently replacing the management contract.

Properties files retain comments, continuation lines, escapes, and application expressions. INI and YAML use their native structure. Environment documents accept literal `NAME=value` or `export NAME=value` assignments; they do not execute arbitrary shell programs.

The React saver and Blueprint content handling preserve trailing spaces and blank lines. A renderer adds a final newline when needed. Do not assume that arbitrary shell commands, unimplemented service modes, or topology changes become supported just because their text can be entered.

## Existing Installations And Definition Updates {#existing-installations}

For a supported scalar-to-content transition, Configs prepares a document from the currently saved values and declared file-format metadata. It remains a pending edit until saved. Existing saved content is not regenerated from package defaults, and historical versions remain intact.

Automatic conversion is skipped for scalar configuration-group overrides and password-typed properties. Those cases retain the legacy runtime representation until defaults and groups are deliberately converted together. A full-file group override replaces a document; it does not inherit individual lines as scalar property overrides did.

Older PostgreSQL and Nginx definitions did not necessarily store the host's complete configuration files in Ambari. Their new content values are installation templates, not automatic discovery of customized host files. Seed the editor from the actual files before applying content management to such an instance. If the new content types are absent, the legacy runtime path remains available.

## Nginx Example {#nginx-example}

Within an existing server block, a small verification location can be added:

~~~nginx
location /docs-check {
    return 200 "managed configuration\n";
}
~~~

Keep the rest of the full document, including the management health include under `conf.d`. Save the version and execute the declared component `RELOAD` command where available. The pack validates the candidate using `nginx -t` before replacing its main file. Reload verification checks the health response and the exact configuration digest served by the new workers.

If validation fails, inspect the task error and correct the candidate. Do not repeatedly restart the service with the same invalid file.

## PostgreSQL Example {#postgresql-example}

Change an existing setting within the complete document:

~~~properties
work_mem = '8MB'
~~~

After saving and applying the required restart, verify it through a native query:

~~~sql
SHOW work_mem;
~~~

Preserve the supplied path/port placeholders and local peer-management access. Editing a data-directory placeholder does not migrate database data. The pack uses `postgres -C`-style native configuration inspection through its server executable and checks the loaded paths, port, and native error views during activation.

## Validation Failure And Recovery {#validation-and-recovery}

Nginx and PostgreSQL validate candidates before replacement and keep preceding file bytes for recovery. Their staging layout includes untouched resources so relative includes can resolve. Each file replacement is atomic, but a set of files is not a crash-atomic database transaction.

Activation failure can restore the previous files; PostgreSQL stops a failed activation before restoration. An external concurrent edit produces an explicit reconciliation failure. Inspect the task and the retained `.ambari-before` files before attempting manual recovery.

A configuration rollback does not roll back application data or database migrations. Separate data backup and migration procedures remain necessary. See [operations and recovery](./operations-and-recovery.md) for the distinction between package operations and service tasks.
