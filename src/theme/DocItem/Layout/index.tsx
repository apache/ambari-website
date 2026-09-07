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

import React from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemLayout from '@theme-original/DocItem/Layout';
import type {Props} from '@theme/DocItem/Layout';

export default function LocalizedDocItemLayout(props: Props): React.JSX.Element {
  const {metadata} = useDoc();
  const {i18n: {currentLocale, defaultLocale, localeConfigs}} = useDocusaurusContext();
  const isFallback = currentLocale !== defaultLocale &&
    !metadata.source.startsWith(`@site/i18n/${currentLocale}/`);
  const defaultUrl = localeConfigs[defaultLocale].baseUrl +
    metadata.permalink.slice(localeConfigs[currentLocale].baseUrl.length);

  return (
    <>
      {isFallback && (
        <aside className="alert alert--info margin-bottom--md" data-testid="translation-fallback">
          <Translate id="docs.translationFallback">
            This page has not been translated yet. The original English content is shown below.
          </Translate>{' '}
          <a href={defaultUrl} lang="en">
            <Translate id="docs.viewEnglish">Read in English</Translate>
          </a>
        </aside>
      )}
      <DocItemLayout {...props} />
    </>
  );
}
