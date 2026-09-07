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
import remarkGfm from 'remark-gfm';
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
  return {tree: unified().use(remarkParse).use(remarkGfm).parse(content), frontMatter, fileContent};
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
  if (url.startsWith('@site/')) return path.resolve(siteDir, decodeURIComponent(url.slice(6)));
  return path.resolve(path.dirname(document), decodeURIComponent(url));
}

const translatedFiles = (await filesIn(localeDir)).filter(file => file.startsWith(`${translatedDir}${path.sep}`) && /\.mdx?$/.test(file));

test('every version 3.0.0 document has a Chinese translation', async () => {
  const sourceFiles = (await filesIn(sourceDir)).filter(file => /\.mdx?$/.test(file));
  assert.deepEqual(translatedFiles.map(file => path.relative(translatedDir, file)).sort(),
    sourceFiles.map(file => path.relative(sourceDir, file)).sort());
});

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
    assert.ok(/Licensed to the Apache Software Foundation/.test(translated.fileContent), 'Missing ASF license header');
    assert.ok(/\p{Script=Han}/u.test(translated.fileContent), 'No Chinese translation present');
    assert.equal(typeof translated.frontMatter.title, 'string', 'Missing explicit document title for sidebar and metadata');
    assert.ok(/\p{Script=Han}/u.test(translated.frontMatter.title), 'Document title is not translated');
    const unchangedProse = nodesOfType(source.tree, 'text').filter(node => {
      const words = node.value.match(/\b[A-Za-z]{2,}\b/g) || [];
      return node.value.length >= 60 && words.length >= 10 &&
        /\s/.test(node.value) &&
        !/^(?:mvn|curl|sudo|ambari-server|GET|POST|PUT|DELETE)\s/.test(node.value.trim()) &&
        !node.value.includes('Licensed to the Apache Software Foundation') &&
        translated.fileContent.includes(node.value);
    });
    assert.ok(unchangedProse.length === 0,
      `Untranslated English prose at source body lines: ${unchangedProse.map(node => node.position.start.line).join(', ')}`);
    assert.deepEqual(immutableFrontMatter(translated.frontMatter), immutableFrontMatter(source.frontMatter), 'Document metadata changed');
    for (const type of ['code', 'inlineCode']) {
      // Report only the location on failure, never command or credential contents.
      const signature = tree => {
        const values = nodesOfType(tree, type).map(({value, lang, meta}) => ({value, lang, meta}));
        return type === 'inlineCode' ? values.sort((a, b) => a.value.localeCompare(b.value)) : values;
      };
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
