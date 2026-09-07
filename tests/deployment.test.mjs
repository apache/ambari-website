/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import yaml from 'js-yaml';

const read = file => readFile(new URL(`../${file}`, import.meta.url), 'utf8');
const workflow = yaml.load(await read('.github/workflows/website.yml'));
const asf = yaml.load(await read('.asf.yaml'));
const pkg = JSON.parse(await read('package.json'));
const deployAction = workflow.jobs.deploy.steps.find(step => step.uses?.startsWith('peaceiris/actions-gh-pages@'));

test('ASF publication and deployment target the same output branch', () => {
  assert.equal(asf.publish.whoami, 'asf-site');
  assert.equal(asf.staging.whoami, 'asf-site');
  assert.equal(deployAction.with.publish_branch, asf.publish.whoami);
  assert.equal(asf.github.homepage, 'https://ambari.apache.org/');
  assert.equal(asf.publish.hostname, undefined, 'ASF infers the apache.org hostname');
  assert.deepEqual(asf.notifications, {
    commits: 'commits@ambari.apache.org',
    issues: 'issues@ambari.apache.org',
    pullrequests: 'reviews@ambari.apache.org',
  });
});

test('PR and fork builds have no write credentials and cannot publish', () => {
  assert.equal(workflow.permissions.contents, 'read');
  assert.equal(workflow.jobs.build.permissions?.contents, undefined);
  assert.equal(workflow.jobs.deploy.permissions.contents, 'write');
  assert.equal(workflow.jobs.deploy.needs, 'build');
  const guard = workflow.jobs.deploy.if.replace(/\s+/g, ' ').trim();
  assert.equal(guard, "github.repository == 'apache/ambari-website' && github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')");
  const checkout = workflow.jobs.build.steps.find(step => step.uses?.startsWith('actions/checkout@'));
  assert.equal(checkout.with['persist-credentials'], false);
  assert.equal(workflow.on.pull_request_target, undefined);
  assert.deepEqual(workflow.on.push.branches, ['main']);
  assert.deepEqual(workflow.on.pull_request.branches, ['main']);
});

test('tested artifacts include the version-controlled ASF metadata', () => {
  const steps = workflow.jobs.build.steps;
  const prepare = steps.findIndex(step => step.name === 'Prepare ASF publication metadata');
  const upload = steps.findIndex(step => step.uses?.startsWith('actions/upload-artifact@'));
  assert.equal(steps[prepare].run, 'cp .asf.yaml build/.asf.yaml');
  assert.ok(upload > prepare);
  assert.equal(steps[upload].with['include-hidden-files'], true);
  assert.equal(steps[upload].with['if-no-files-found'], 'error');
  const download = workflow.jobs.deploy.steps.find(step => step.uses?.startsWith('actions/download-artifact@'));
  assert.equal(download.with.name, steps[upload].with.name);
  assert.equal(download.with.path, 'build');
  assert.equal(deployAction.with.publish_dir, './build');
});

test('publication retains history and cannot race another workflow for the same ref', () => {
  assert.match(workflow.concurrency.group, /github.ref/);
  assert.equal(workflow.concurrency['cancel-in-progress'], false);
  assert.notEqual(deployAction.with.force_orphan, true);
  const commands = Object.values(workflow.jobs).flatMap(job => job.steps.map(step => step.run || '')).join('\n');
  assert.doesNotMatch(commands, /git\s+(?:checkout|reset|push|commit|config)/);
});

test('build tooling never stages every worktree change or bypasses CI publication', () => {
  assert.equal(pkg.scripts.commit, 'git-cz');
  assert.equal(pkg.scripts.deploy, undefined);
  assert.equal(pkg.scripts.build, 'docusaurus build');
  assert.equal(pkg.packageManager, 'yarn@1.22.22');
  assert.ok(workflow.jobs.build.steps.some(step => step.run?.includes('yarn install --frozen-lockfile')));
  const commands = workflow.jobs.build.steps.map(step => step.run || '').join('\n');
  for (const script of ['test:i18n', 'test:deployment', 'typecheck', 'test:e2e']) {
    assert.ok(commands.includes(`yarn ${script}`), `Missing CI gate: ${script}`);
  }
});
