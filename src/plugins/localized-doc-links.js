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

const path = require('node:path');
const {parseLocalURLPath} = require('@docusaurus/utils');

module.exports = function localizedDocLinks() {
  return async (tree, file) => {
    const {visit} = await import('unist-util-visit');
    const siteDir = path.resolve(__dirname, '../..');
    const relativePath = path.relative(siteDir, file.path).split(path.sep).join('/');
    const match = relativePath.match(/^(?:docs\/|versioned_docs\/[^/]+\/|i18n\/[^/]+\/docusaurus-plugin-content-docs\/(?:current|version-[^/]+)\/)(.+)$/);
    if (!match) return;

    visit(tree, ['link', 'definition'], node => {
      const url = parseLocalURLPath(node.url);
      if (!url || !/^\.\.?\//.test(url.pathname) || !/\.mdx?$/.test(url.pathname)) return;
      const documentPath = path.posix.normalize(path.posix.join(path.posix.dirname(match[1]), url.pathname));
      if (documentPath.startsWith('../')) return;
      // Plugin-root links let Docusaurus search both translated and fallback files.
      // Explicit relative links otherwise search only the physical source directory.
      node.url = `/${documentPath}${url.search ? `?${url.search}` : ''}${url.hash ? `#${url.hash}` : ''}`;
    });
  };
};
