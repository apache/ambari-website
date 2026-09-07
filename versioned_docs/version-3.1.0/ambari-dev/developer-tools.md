---
title: Developer Tools
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

# Developer Tools {#developer-tools}

Ambari development uses standard Git, Maven, Java, Python, and Node.js tooling. Select tools that can reproduce the repository’s configured versions and preserve the project’s checks.

## Source Control {#source-control}

Use one branch for one coherent change, keep commits focused, and rebase from the intended upstream branch before review. Inspect status and the complete diff before committing so unrelated worktree changes are not included.

Useful aliases may be configured in `.gitconfig`:

```ini
[alias]
        st = status
        ci = commit
        br = branch
        co = checkout
        lg = log --graph --decorate --oneline --all
```

Use the repository’s required JIRA key in branch, commit, and review metadata. Prefer non-interactive Git commands in scripts and automation.

## Java and Maven {#java-and-maven}

Use JDK 17 and the Maven wrapper or Maven version selected by the project. The root POM manages dependency and plugin versions. IDEs should import the Maven project rather than maintaining a separate dependency model.

Run a focused module or test while iterating, then run the appropriate broad verification before review. Keep generated targets and downloaded dependencies outside commits.

## React Development {#react-development}

The primary UI in `ambari-web/latest` uses TypeScript, React 19, Vite, and Vitest. Use the package scripts for local development, production type/build checks, linting, and tests:

```bash
npm run dev
npm run build
npm run lint
npm run test
```

The Admin React application under `ambari-admin/src/main/resources/ui/ambari-admin` has its own package scripts and build lifecycle. Do not assume that a successful primary UI build verifies the Admin application.

## Python Development {#python-development}

Agent Python dependencies and packaging are defined by the module `pyproject.toml` and lock files. Use the repository’s selected Python interpreter and locked dependencies; do not install ad hoc packages into the system interpreter or reintroduce removed vendored implementations.

## Review Checks {#review-checks}

Before review, run applicable Java, Python, React, and documentation checks; inspect licenses and dependency changes; and verify that credentials, private keys, cookies, and generated artifacts are absent. Record exact commands, skipped checks, and environment-dependent results in the review description.
