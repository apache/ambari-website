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

import {readFile, readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import {visit} from 'unist-util-visit';
import {toString} from 'mdast-util-to-string';
import {createSlugger, DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile, parseMarkdownHeadingId} from '@docusaurus/utils';

const siteDir = fileURLToPath(new URL('../', import.meta.url));
const sourceDir = path.join(siteDir, 'versioned_docs/version-3.0.0');
const localeDir = path.join(siteDir, 'i18n/zh-Hans/docusaurus-plugin-content-docs/version-3.0.0');
const excluded = new Set(process.argv.slice(2));

async function documentsIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await documentsIn(file));
    else if (/\.mdx?$/.test(file)) files.push(file);
  }
  return files;
}

async function parse(filePath) {
  const raw = await readFile(filePath, 'utf8');
  const {content} = await parseMarkdownFile({filePath, fileContent: raw,
    parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER, removeContentTitle: false});
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content);
  const headings = [];
  visit(tree, 'heading', node => {
    headings.push(node);
  });
  return {raw, content, headings, offset: raw.indexOf(content)};
}

let changed = 0;
for (const file of await documentsIn(localeDir)) {
  const relative = path.relative(localeDir, file);
  if (excluded.has(relative)) continue;
  const original = await parse(path.join(sourceDir, relative));
  const translated = await parse(file);
  if (original.headings.length !== translated.headings.length || translated.offset < 0) {
    throw new Error(`Heading structure differs: ${relative}`);
  }
  const slugger = createSlugger();
  const ids = original.headings.map(node => {
    const text = toString(node);
    return parseMarkdownHeadingId(text).id ?? slugger.slug(text);
  });
  let output = translated.raw;
  for (let i = translated.headings.length - 1; i >= 0; i--) {
    const heading = translated.headings[i];
    if (heading.depth !== original.headings[i].depth) throw new Error(`Heading depth differs: ${relative}`);
    const start = translated.offset + heading.position.start.offset;
    const end = translated.offset + heading.position.end.offset;
    const title = parseMarkdownHeadingId(output.slice(start, end)).text;
    output = `${output.slice(0, start)}${title} {#${ids[i]}}${output.slice(end)}`;
  }
  if (output !== translated.raw) {
    await writeFile(file, output);
    changed++;
  }
}
console.log(`Synchronized heading anchors in ${changed} translated documents.`);
