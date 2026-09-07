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
import {readFile, readdir, access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {toString} from 'mdast-util-to-string';
import {createSlugger, DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile, parseMarkdownHeadingId, resolveMarkdownLinkPathname} from '@docusaurus/utils';
import localizedDocLinks from '../src/plugins/localized-doc-links.js';

const siteDir = fileURLToPath(new URL('../', import.meta.url));
const localeDir = path.join(siteDir, 'i18n/zh-Hans');
const sourceDir = path.join(siteDir, 'versioned_docs/version-3.0.0');
const translatedDir = path.join(localeDir, 'docusaurus-plugin-content-docs/version-3.0.0');

async function filesIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(file));
    else files.push(file);
  }
  return files;
}

function nodesOfType(tree, type) {
  const nodes = [];
  function visit(node) {
    if (node.type === type) nodes.push(node);
    node.children?.forEach(visit);
  }
  visit(tree);
  return nodes;
}

async function parse(filePath) {
  const fileContent = await readFile(filePath, 'utf8');
  const {content, frontMatter} = await parseMarkdownFile({filePath, fileContent, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER, removeContentTitle: false});
  return {tree: unified().use(remarkParse).parse(content), frontMatter, fileContent};
}

function headingIds(tree) {
  const slugger = createSlugger();
  return nodesOfType(tree, 'heading').map(node => {
    const text = toString(node);
    return parseMarkdownHeadingId(text).id ?? slugger.slug(text);
  });
}

function immutableFrontMatter(frontMatter) {
  const {title, description, sidebar_label, ...immutable} = frontMatter;
  return immutable;
}

function imageDestination(url, document) {
  if (/^(?:[a-z]+:|\/)/i.test(url)) return url;
  if (url.startsWith('@site/')) return path.resolve(siteDir, url.slice(6));
  return path.resolve(path.dirname(document), url);
}

const translatedFiles = (await filesIn(localeDir)).filter(file => file.startsWith(`${translatedDir}${path.sep}`) && /\.mdx?$/.test(file));

test('Chinese UI messages are present independently of document coverage', async () => {
  const catalog = JSON.parse(await readFile(path.join(localeDir, 'code.json'), 'utf8'));
  for (const key of ['homepage.tagline', 'homepage.getStarted', 'team.title', 'docs.translationFallback']) {
    assert.match(catalog[key].message, /\p{Script=Han}/u);
  }
});

for (const translatedFile of translatedFiles) {
  const relativePath = path.relative(translatedDir, translatedFile);
  const sourceFile = path.join(sourceDir, relativePath);
  test(`translation structure: ${relativePath}`, async () => {
    const source = await parse(sourceFile);
    const translated = await parse(translatedFile);
    assert.match(translated.fileContent, /Licensed to the Apache Software Foundation/);
    assert.match(translated.fileContent, /\p{Script=Han}/u);
    assert.deepEqual(immutableFrontMatter(translated.frontMatter), immutableFrontMatter(source.frontMatter), 'Document metadata changed');
    for (const type of ['code', 'inlineCode']) {
      // Report only the location on failure, never command or credential contents.
      const signature = tree => nodesOfType(tree, type).map(({value, lang, meta}) => ({value, lang, meta}));
      assert.ok(JSON.stringify(signature(translated.tree)) === JSON.stringify(signature(source.tree)), `${type} content changed`);
    }
    for (const type of ['link', 'definition']) {
      assert.deepEqual(nodesOfType(translated.tree, type).map(node => node.url), nodesOfType(source.tree, type).map(node => node.url), `${type} destinations changed`);
    }
    assert.deepEqual(nodesOfType(translated.tree, 'heading').map(node => node.depth), nodesOfType(source.tree, 'heading').map(node => node.depth), 'Heading structure changed');
    assert.deepEqual(headingIds(translated.tree), headingIds(source.tree), 'Heading anchors changed');
    assert.deepEqual(nodesOfType(translated.tree, 'image').map(node => imageDestination(node.url, translatedFile)), nodesOfType(source.tree, 'image').map(node => imageDestination(node.url, sourceFile)), 'Image targets changed');
    for (const image of nodesOfType(translated.tree, 'image')) {
      const destination = imageDestination(image.url, translatedFile);
      if (path.isAbsolute(destination) && !image.url.startsWith('/')) await access(destination);
    }
  });
}

test('translation catalogs contain valid, nonempty messages', async () => {
  for (const file of (await filesIn(localeDir)).filter(file => file.endsWith('.json'))) {
    const catalog = JSON.parse(await readFile(file, 'utf8'));
    for (const [key, value] of Object.entries(catalog)) {
      assert.equal(typeof value.message, 'string', `${path.relative(localeDir, file)}: ${key}`);
      assert.ok(value.message.trim(), `Empty translation: ${key}`);
    }
  }
});

for (const sourceRoot of [sourceDir, translatedDir]) {
  test(`relative links use locale-aware resolution from ${path.relative(siteDir, sourceRoot)}`, async () => {
    const sourceFilePath = path.join(sourceRoot, 'ambari-dev/index.md');
    const tree = unified().use(remarkParse).parse('[Translated](./building-from-source.md?ref=test#prerequisites) [Fallback](./code-review-guidelines.md) [Parent](../introduction.md) [Asset](./imgs/example.png) [External](https://example.org/doc.md)');
    await localizedDocLinks()(tree, {path: sourceFilePath});
    const links = nodesOfType(tree, 'link').map(node => node.url);
    assert.deepEqual(links, ['/ambari-dev/building-from-source.md?ref=test#prerequisites', '/ambari-dev/code-review-guidelines.md', '/introduction.md', './imgs/example.png', 'https://example.org/doc.md']);
    const sourceToPermalink = new Map([
      ['@site/i18n/zh-Hans/docusaurus-plugin-content-docs/version-3.0.0/ambari-dev/building-from-source.md', '/zh-Hans/docs/3.0.0/ambari-dev/building-from-source'],
      ['@site/versioned_docs/version-3.0.0/ambari-dev/code-review-guidelines.md', '/zh-Hans/docs/3.0.0/ambari-dev/code-review-guidelines'],
    ]);
    for (const link of links.slice(0, 2)) {
      const permalink = resolveMarkdownLinkPathname(link.split('?')[0], {
        sourceFilePath, sourceToPermalink, siteDir,
        contentPaths: {contentPath: sourceDir, contentPathLocalized: translatedDir},
      });
      assert.ok(permalink?.startsWith('/zh-Hans/docs/3.0.0/ambari-dev/'));
    }
  });
}
