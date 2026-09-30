---
title: Add A Service To The Store, Step By Step
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

# Add A Service To The Store, Step By Step {#add-service-step-by-step}

This tutorial adds a small **Hello Store** service. It runs one HTTP process, returns a message, and lets you edit that message in Ambari. The example has no external database, so you can learn the packaging steps first.

By the end, the service should appear in the store, offer one component to assign to a host, and support installation, start, stop, restart, configuration editing, and a service check.

## Let AI Help You Add The Service {#use-ai}

You can give this page to an AI coding assistant that can read and edit your local repositories. Fill in the details below and send them along with the page link. The assistant should read the tutorial and its example files before implementing your real service.

If the assistant cannot open web pages, give it the local copy of this tutorial and the downloaded example source. It also needs access to your Ambari and store checkouts; a page link alone does not give it that access.

**Task to give the AI:**

> Add a new service to my Ambari Service Store. Implement it in the store repository and verify it; do not stop at a plan or an unimplemented scaffold.
>
> Service and exact software version: [fill in]
>
> Ambari source directory: [fill in]
>
> Service store directory: [fill in]
>
> Target OS and CPU architecture: [fill in]
>
> Deployment size and roles: [one host / a small cluster; specify the roles]
>
> Software source: [official release URL / prepared local archive / offline repository]
>
> Test cluster and hosts: [fill in, or say that none are available]
>
> First read this entire tutorial, its complete example, the linked API and implementation guides, repository instructions, the store's release index, and the closest existing service package. Check the upstream installation and configuration documentation for the exact software version. Identify missing prerequisites before choosing an implementation.
>
> Confirm the service's compatible environment, required Java/Python versions, external databases, ports, and data directories. If a necessary detail is missing, ask me specifically for it rather than inventing a value. Keep credentials out of code and documentation.
>
> Create the package manifest, environment and component descriptions, complete configuration-file editor, installation/configuration/start/stop/status scripts, service check, and usage documentation. Use the upstream configuration format and preserve user edits. Register the package in the store's release index and include its dependencies when building the bundle. Inspect the current foundation version instead of copying the scaffold's default unchanged.
>
> Use the tutorial as a packaging example, not as the application's implementation. Install the real software from the specified source, verify its integrity, and implement its actual roles and health checks. Do not replace it with the Hello Store HTTP process or placeholder commands. Prefer the existing generic UI; explain any core change that is actually needed.
>
> Make repeat installation and recovery behavior explicit. Preserve data on stop. Verify results using native APIs or structured observations and exact identities, not log keywords. Test missing dependencies, invalid configuration, failed startup, and retries as well as the successful path.
>
> Run validation and build an importable bundle. If a suitable authorized test cluster is available, import it through the supported workflow, select the service in the UI, install it, edit and apply its configuration, and verify start/stop/restart and service checks. If no cluster is available, finish local checks and provide the remaining cluster steps; do not report them as passed.
>
> Deliver the changed files, bundle location, installation instructions, supported scope, actual commands and results, and remaining limitations. Separate static validation, local tests, and cluster acceptance in the report. Preserve unrelated changes and follow the existing authorization for commits, pushes, and deployment.

The AI should read [API and service integration](./authoring-and-bundling.md) and [how the store works](./implementation.md), then follow the steps below. You can also follow those steps yourself; the expected result at each stage is the same.

When reviewing the result, check that the service actually appears in the store, offers its components and configuration in the wizard, and passes the installation and health checks on the chosen hosts. A generated archive alone does not demonstrate a working integration.

## 1. Prepare A Test Environment {#prepare}

You need a matching Ambari source checkout, a copy of the separate store repository, Python 3.10 or later on your development machine, and a test Ambari installation that includes the [service store](./overview.md).

The target host for this example must use Rocky Linux 8 with systemd. Its OS repositories must provide Python 3 and the system Python D-Bus binding. Port 18181 must be free and reachable from the host running Ambari's service-check task. Use a private test network: this teaching service has no authentication or TLS.

Set these paths to your own checkouts:

~~~shell
export AMBARI_SOURCE=/path/to/ambari
export MPACKSTORE_DIR=/path/to/ambari-mpacks
python3 -m venv .venv-mpack
. .venv-mpack/bin/activate
python -m pip install "$AMBARI_SOURCE/dev-support/mpack"
ambari-mpack --help
~~~

**Expected result:** the CLI lists commands including scaffold, validate, and build. Nothing has been changed on the cluster.

## 2. Generate The Starting Directory {#create-project}

Choose a new package name. This tutorial uses `hello-store`; the corresponding service and component names are `HELLO_STORE` and `HELLO_STORE_SERVER`.

~~~shell
ambari-mpack --json scaffold hello-store \
  --directory "$MPACKSTORE_DIR/mpacks/hello-store"
~~~

The destination must not already exist. The generated service script deliberately refuses installation until you implement it.

Download the <a href="/examples/service-store/hello-store-1.0.0.0.tar.gz" download="hello-store-1.0.0.0.tar.gz">complete example source archive</a> and extract it into a separate working directory:

~~~shell
tar -xzf hello-store-1.0.0.0.tar.gz
export EXAMPLE_DIR="$PWD/hello-store-1.0.0.0"
cp -R "$EXAMPLE_DIR/." "$MPACKSTORE_DIR/mpacks/hello-store/"
export HELLO_EXTENSION_DIR="$MPACKSTORE_DIR/mpacks/hello-store/extensions/HELLO_STORE/1.0"
export HELLO_SERVICE_DIR="$HELLO_EXTENSION_DIR/services/HELLO_STORE"
~~~

The copy replaces only the newly generated tutorial skeleton with the complete example. Do not point it at a service you already maintain. The following steps explain the files you now have, and what to change for your own service.

~~~text
mpacks/hello-store/
  mpack.json
  LICENSE
  NOTICE
  extensions/HELLO_STORE/1.0/
    metainfo.xml
    services/HELLO_STORE/
      metainfo.xml
      configuration/hello-store-conf.xml
      themes/theme.json
      package/scripts/
        app.py
        health.py
        observer.py
        service.py
        service_check.py
~~~

**Expected result:** the new directory contains all five scripts. No Ambari Server source edit is needed for this example.

## 3. Tell The Store What The Package Contains {#package-manifest}

Open `mpack.json`. Its functional fields are shown below; keep the generated license comment as well.

~~~json
{
  "schema_version": 1,
  "type": "full-release",
  "name": "hello-store",
  "version": "1.0.0.0",
  "artifacts": [
    {
      "name": "hello-store-extension",
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

The package version belongs to your management code. It is not the application's version.

Check the foundation version against your store's `release.json`. The referenced store uses 1.0.0.3; the current scaffold starts with 1.0.0.0. Leaving that older dependency unchanged is a common reason the service cannot be enabled. The downloadable example already uses the reference store's version.

## 4. Choose The Environment It Can Join {#environment}

Open the extension-level `metainfo.xml`, directly under the extension's version directory:

~~~xml
<metainfo>
  <versions><active>true</active></versions>
  <prerequisites>
    <min-stack-versions>
      <stack><name>GENERIC</name><version>1.0</version></stack>
    </min-stack-versions>
  </prerequisites>
  <auto-link>false</auto-link>
</metainfo>
~~~

This example belongs to the generic environment. It does not need Hadoop. Do not change the environment to BIGTOP just to make it selectable in an existing cluster; first implement and verify the dependencies that environment needs.

## 5. Describe The Service And Its Component {#component}

Open the second `metainfo.xml`, this time inside the service directory. It tells Ambari what the user will see and which script handles host commands.

~~~xml
<component>
  <name>HELLO_STORE_SERVER</name>
  <displayName>Hello Store Server</displayName>
  <category>MASTER</category>
  <cardinality>1</cardinality>
  <versionAdvertised>false</versionAdvertised>
  <commandScript>
    <script>scripts/service.py</script>
    <scriptType>PYTHON</scriptType>
    <timeout>120</timeout>
  </commandScript>
</component>
~~~

This is an excerpt, not the entire file. The [complete service descriptor](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/metainfo.xml) also contains:

- The service's internal name and display name.
- The Rocky 8 OS packages: Python 3 and its D-Bus binding.
- The service-check script.
- The configuration type and the configuration-page layout.

One master with cardinality one is enough for this tutorial. A real distributed service needs the correct master, worker, and client components, with their own host assignment and command behavior.

**Expected result:** Ambari can show **Hello Store** with one **Hello Store Server** component. A successful package build alone does not verify this; check it in the UI in step 10.

## 6. Add An Editable Configuration File {#configuration}

Open `configuration/hello-store-conf.xml`. The property holds the entire JSON file:

~~~xml
<property>
  <name>content</name>
  <display-name>hello.json</display-name>
  <value><![CDATA[{
  "message": "Hello from Ambari"
}
]]></value>
  <description>Message returned by the tutorial service. Save and restart to apply.</description>
  <value-attributes>
    <type>content</type>
    <property-file-name>hello.json</property-file-name>
    <property-file-type>json</property-file-type>
  </value-attributes>
  <on-ambari-upgrade add="true"/>
</property>
~~~

The service descriptor declares this configuration type. The supplied `themes/theme.json` places the property in a **Configuration Files** tab. These three pieces belong together: property definition, service declaration, and page layout.

The example accepts exactly one nonempty message, up to 200 characters. It rejects unknown keys and duplicate keys before writing the file. Port 18181 is fixed in the example code; adding a port setting to the JSON does not make the application support it.

## 7. Connect Installation, Start, Stop, And Checks {#commands}

Read the complete [service script](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/service.py). It implements these methods:

| Method | What this example does |
| --- | --- |
| install | Install OS prerequisites, place the application and systemd unit, write the initial configuration, and verify that systemd loaded the unit |
| configure | Validate the JSON and write the configuration file |
| start | Apply configuration, start the unit, and verify the running process and loaded configuration |
| stop | Stop the unit and verify that it is inactive with no main process |
| status | Read the actual unit state and check the running application without changing it |

Ambari's base Script class provides restart by calling stop and start. The example uses a dedicated systemd unit with an unprivileged dynamic user. It also checks an ownership marker before changing its directories, to avoid taking over an unrelated installation.

These are the host locations it manages:

~~~text
/opt/ambari-hello-store/
/etc/ambari-hello-store/hello.json
/etc/systemd/system/ambari-hello-store.service
~~~

The [application](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/app.py) answers HTTP requests at the health path with JSON containing its service name, process ID, message, and configuration digest.

The [systemd observer](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/observer.py) reads D-Bus properties through the system Python. The [health verifier](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/health.py) checks the response against the expected service, process, and configuration. This avoids treating a command exit or the words “started successfully” as proof of readiness.

Finally, the [service-check script](/examples/service-store/hello-store/extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts/service_check.py) gets the assigned server host from Ambari and queries that host, not whichever host happens to run the check. It verifies that the saved message has been loaded.

For your real service, replace the sample application with its actual installer and native checks. Use a pinned release and checksum for downloaded software. Preserve data on stop, and define what happens when installation is retried.

## 8. Register The Service In The Store {#register}

Open the store root's `release.json`. Add the following entry inside its existing packs object; keep all other entries:

~~~json
"hello-store": {
  "path": "mpacks/hello-store",
  "version": "1.0.0.0"
}
~~~

This is a JSON fragment. Add the separating comma where needed. The name and version must match the package manifest exactly.

Creating a directory alone does not add it to the complete store build. The release index is what selects it. If you also maintain a named profile, add the service to that profile separately.

## 9. Validate And Build {#build}

~~~shell
ambari-mpack --json validate "$MPACKSTORE_DIR/mpacks/hello-store"
ambari-mpack --json build --packs generic-base,hello-store \
  --repository "$MPACKSTORE_DIR" \
  --output dist-hello-store \
  --bundle hello-store-demo
~~~

**Expected result:** validation reports `validation: STATIC`, and the build produces `dist-hello-store/hello-store-demo.bundle.tar.gz`, containing the new service and its foundation package.

The named-package builder does not automatically add every dependency. That is why the command explicitly includes both packages.

To distribute the whole store instead:

~~~shell
ambari-mpack --json build --all \
  --repository "$MPACKSTORE_DIR" \
  --output dist-full-store \
  --bundle mpackstore
~~~

Validation and archive creation do not run the service on a host. A successful result here is only the start of acceptance.

## 10. Import And Install Through The UI {#install}

1. Sign in to your test Ambari as an administrator.
2. Open **Management Packs**, the current console entry for the service store.
3. Choose **Import bundle**, select the demo bundle from step 9, and confirm the import.
4. After import finishes, search for **Hello Store** in the service catalog.
5. Select it and choose a new generic cluster or an existing compatible one.
6. Continue to **Create cluster** or **Add Services to Cluster**.
7. Assign **Hello Store Server** to one test host. In Configs, keep the initial message.
8. Finish installation and startup, then run the service check.

If the card is unavailable, read its reason before changing scripts. Check the foundation version and destination first. If no component or configuration appears, check the service descriptor and declared configuration type.

## 11. Check That Your Integration Really Works {#verify}

Do these checks on the test cluster before giving the package to someone else:

| Check | Expected result |
| --- | --- |
| Run the service check after installation | Passes for the assigned host and saved configuration |
| Change the message in Configuration Files, save, and restart | The check passes for the new message |
| Stop the service | The component becomes stopped; the check no longer passes |
| Start it again | The component and check return to healthy |
| Enter malformed JSON and attempt to apply it | The task fails explicitly rather than claiming the new settings were applied; correct the file and restart to recover |
| Occupy port 18181 before a fresh start | Start/check fails instead of accepting an unrelated process as the service |

For a quick manual view from a machine that can reach the service host:

~~~shell
curl --fail --max-time 5 http://SERVICE_HOST:18181/health
~~~

Replace the host placeholder with the actual assigned host. Expect JSON with the service name and the message you saved. The Ambari service check performs stricter validation than this manual request.

## 12. Publish Your Next Package Version {#next-version}

After changing a previously distributed package, update its manifest version and the matching release-index version together, for example from 1.0.0.0 to 1.0.0.1. Rebuild into a fresh output directory, import it into the test store, and repeat the checks on both a new installation and an existing one.

Do not reuse an existing package version for different bytes. Do not rename the service, component, or configuration type in an in-use package without a migration plan.

Before distributing a real service, document its supported OS/architecture, required software sources, credentials, data paths, upgrade behavior, and backup requirements. Review the licenses and notices for the software you distribute.

## What Has Been Checked In This Example? {#validation-scope}

The example was checked with the matching manifest validator and bundle builder. Local tests exercise the actual HTTP application, invalid configuration, foreign process identity, stale observer results, and unapplied configuration. The website build checks both language versions and the downloadable assets.

The example has not yet been installed on a Rocky Ambari cluster as part of this documentation change. Steps 10 and 11 are the cluster acceptance procedure, not a claim that those checks already passed. This teaching service provides no authentication, TLS, HA, data persistence, or production upgrade guarantees.

For more detail, see [API and service integration](./authoring-and-bundling.md) and [how the store works](./implementation.md).
