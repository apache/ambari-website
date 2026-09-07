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

# Apache Ambari Website

The website uses Docusaurus 3.10.2, React, and Markdown/MDX. GitHub Actions
builds `main` and publishes the tested static output to `asf-site` for ASF
hosting at <https://ambari.apache.org/>. This is not GitHub Pages hosting.

## Setup

Use Node.js 22 (the CI version) and Yarn 1.22.22:

```bash
corepack enable
yarn install --frozen-lockfile
```

To clone through GitHub SSH on port 443:

```bash
git clone ssh://git@ssh.github.com:443/apache/ambari-website.git
```

## Local Development

```bash
yarn start
yarn start:zh
```

Run either command, not both on the same port. Each development server serves
only one language. Use `--port 3001` to select another port.

To test language switching, build **all** languages and serve the result:

```bash
yarn build
yarn serve --host 127.0.0.1 --port 4198 --no-open
```

English is served at `/`, Simplified Chinese at `/zh-Hans/`. Language changes
load the other language's application, preserving the document path, query
string and heading anchor. They are not in-place React state changes.

## Translation Scope

The Chinese translation includes the homepage, navigation, team page, and all
75 documents from version 3.0.0, including installation, development, release,
Stack/service definitions, Blueprints, Kerberos, metrics, Views, and plugins.

Versions 2.7.9 and 2.7.8 keep the English
content with a visible fallback notice and a link to the English page. There
is no duplicate copy of the English documentation in the translation tree.
Translation preserves the source's technical content, including historical
instructions and illustrative code; it is not a technical modernization of
those guides.

The separate 3.1.0 preview contains 71 paired English/Chinese guides based on
the 3.1 implementation. It retains current installation, development,
Blueprint, Kerberos, Stack/service, View, configuration, and alert topics
alongside monitoring, runtime/package changes, React, and upgrade planning.
The old unversioned `docs/` tree is not published as `Next`; obsolete AMS,
Ganglia, SCOM, and Ember widget tutorials are not carried into 3.1.
Old `/docs/next/` links redirect to the corresponding 3.1 guides, retaining
the language prefix. Retired AMS links lead to the new monitoring guides,
not the historical AMS tutorials. Versioned 3.0 and 2.7 documentation is unchanged.
3.0.0 remains the default stable version. The 3.1 preview is available at
`/docs/3.1.0/` and `/zh-Hans/docs/3.1.0/` and is marked
unreleased and `noindex` until release publication.

Translation files live under `i18n/zh-Hans/`:

- `code.json` contains React UI messages.
- `docusaurus-theme-classic/navbar.json` contains navigation messages.
- `docusaurus-plugin-content-docs/*.json` contains version/sidebar messages.
- `docusaurus-plugin-content-docs/version-3.0.0/` contains translated documents.
- `docusaurus-plugin-content-docs/version-3.1.0/` contains translated preview documents.

Use `Translate` or `translate()` with stable IDs for React text. Run
`yarn write-translations --locale zh-Hans` to extract new messages, then review
the diff. Do not check in a generated footer translation with a frozen year;
the default copyright is calculated at build time.

Preserve document paths, IDs, commands, inline code, link destinations and
explicit heading IDs. Translated headings use the corresponding English
heading IDs, including duplicate suffixes. Reference shared images through
`@site/versioned_docs/...` rather than copying binaries. The
`localized-doc-links` remark plugin normalizes explicit relative document links
so Docusaurus can resolve translated and English fallback files together.

Each Chinese document has an explicit translated `title` in its front matter.
This prevents license comments before the H1 from causing Docusaurus to use
the filename as its sidebar label or page title. After translating headings,
run `node scripts/sync-translation-anchors.mjs` to synchronize their IDs.
For the preview, use `node scripts/sync-translation-anchors.mjs --version 3.1.0`.

## Verification

```bash
yarn test:i18n
yarn test:deployment
yarn typecheck
yarn build
yarn playwright install chromium
yarn test:e2e
```

The browser tests cover desktop/mobile language switching, deep links,
refresh, English fallback, static team rendering, images, and 404 recovery.
They start and stop their own preview server. Set `WEBSITE_TEST_PORT` if the
default test port 4173 is busy. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can point
to an installed Chrome executable. Screenshots and traces are in the ignored
`test-results/` directory.

Static hosts may serve the default English 404 page even for a missing Chinese
URL. Its home link and language menu provide recovery; language-specific HTTP
error documents require host configuration.

## Git And Publication

Make changes on a topic branch using the applicable `AMBARI-xxxxx` JIRA key.
Inspect `git status` and stage explicit paths. `yarn commit` operates only on
already staged changes; it no longer runs `git add -A`. Include the JIRA key
in commit subjects and the PR title. Submit a personal-fork PR against
`apache/ambari-website:main`. Do not edit or push generated `asf-site` content
manually, and do not use `docusaurus deploy` to bypass CI.

Large changes should use reviewable topic commits, keeping focused tests with
their implementation. Suggested boundaries are shared i18n support, translated
content, and deployment infrastructure.

The build job has read-only repository permissions and no persisted checkout
credentials. It runs on PRs and pushes, including forks. Only a successful
build on `apache/ambari-website:main`, triggered by a push or manual dispatch,
can enter the separate write-enabled deployment job. Runs for the same ref
are serialized to avoid simultaneous publication.

The source `.asf.yaml` is the single source of publication metadata. Its
`publish.whoami` and `staging.whoami` intentionally target `asf-site`, preserving
the existing staging behavior. The workflow copies it into `build/` before
uploading the artifact with hidden files enabled. The deploy job verifies the
metadata and both language homepages before publishing the artifact in one
commit. It does not switch the source checkout to `asf-site`, rewrite Git
identity, or make a second metadata-only commit.

Issue and pull request notifications use the existing `issues` and `reviews`
mailing lists. The former `notifications@ambari.apache.org` target did not
exist (AMBARI-26445).

Legacy Maven-generated API/Javadoc assets are optional and remain excluded
from the normal website build.
