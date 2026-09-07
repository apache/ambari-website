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

import {test, expect, type Page} from '@playwright/test';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const zh = '\u7b80\u4f53\u4e2d\u6587';
const start = '\u5f00\u59cb\u4f7f\u7528';
const fallbackCount = (document: string) => existsSync(path.resolve(
  'i18n/zh-Hans/docusaurus-plugin-content-docs/version-3.0.0', document,
)) ? 0 : 1;

async function switchLocale(page: Page, language: string, isMobile: boolean) {
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  if (isMobile) {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar')).toBeVisible();
    if (await page.locator('.navbar-sidebar__items--show-secondary').count()) {
      await page.locator('.navbar-sidebar__back').click();
    }
    await expect(page.locator('.navbar-sidebar__items')).not.toHaveClass(/show-secondary/);
    await page.locator('.navbar-sidebar').getByRole('button', {name: /^(Languages|\u9009\u62e9\u8bed\u8a00)$/}).click();
    await page.locator('.navbar-sidebar').getByRole('link', {name: language, exact: true}).click();
  } else {
    const current = language === zh ? 'English' : zh;
    await page.locator('.navbar').getByRole('button', {name: current, exact: true}).hover();
    await page.locator('.navbar').getByRole('link', {name: language, exact: true}).click();
  }
}

test('homepage language switch and localized primary link', async ({page, isMobile}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', {name: 'Apache Ambari', exact: true})).toBeVisible();
  await switchLocale(page, zh, isMobile);
  await expect(page).toHaveURL(/\/zh-Hans\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  await expect(page.getByRole('link', {name: start, exact: true})).toHaveAttribute('href', '/zh-Hans/docs/3.0.0/introduction');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://ambari.apache.org/zh-Hans/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://ambari.apache.org/');
  await expect(page.locator('.hero__subtitle')).toContainText('\u96c6\u7fa4');
  await expect.poll(() => page.locator('.hero__title').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const heroImages = page.locator('header.hero img');
  for (const image of await heroImages.all()) {
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await page.screenshot({path: testInfo.outputPath('homepage-zh.png'), fullPage: true});
  await page.getByRole('link', {name: start, exact: true}).click();
  await expect(page.locator('article')).toContainText('Apache Ambari');
  await expect(page.getByTestId('translation-fallback')).toHaveCount(fallbackCount('introduction.md'));
  expect(errors).toEqual([]);
});

test('deep link preserves document, query and anchor across language switches', async ({page, isMobile}, testInfo) => {
  const document = '/docs/3.0.0/introduction?ref=i18n#version-information';
  await page.goto(document);
  await switchLocale(page, zh, isMobile);
  await expect(page).toHaveURL(`/zh-Hans${document}`);
  await expect(page.locator('#version-information')).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  await expect(page.locator('#version-information')).toBeVisible();
  await page.screenshot({path: testInfo.outputPath('document-zh.png'), fullPage: true});
  await switchLocale(page, 'English', isMobile);
  await expect(page).toHaveURL(document);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('untranslated versions retain English content with explicit fallback', async ({page, isMobile}) => {
  await page.goto('/docs/2.7.9/introduction');
  await switchLocale(page, zh, isMobile);
  await expect(page).toHaveURL(/\/zh-Hans\/docs\/2\.7\.9\/introduction$/);
  await expect(page.getByTestId('translation-fallback')).toBeVisible();
  await expect(page.getByTestId('translation-fallback').getByRole('link')).toHaveAttribute('href', '/docs/2.7.9/introduction');
  await page.getByTestId('translation-fallback').getByRole('link').click();
  await expect(page).toHaveURL(/\/docs\/2\.7\.9\/introduction$/);
  await expect(page.getByTestId('translation-fallback')).toHaveCount(0);
});

test('team page is translated during static rendering and after hydration', async ({page, request, isMobile}, testInfo) => {
  const response = await request.get('/zh-Hans/team');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain('Ambari \u56e2\u961f');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/zh-Hans/team');
  await expect(page.locator('.team_title').first()).toHaveText('Ambari \u56e2\u961f');
  const members = await page.locator('.character_item').count();
  expect(members).toBeGreaterThan(0);
  await page.screenshot({path: testInfo.outputPath('team-zh.png'), fullPage: true});
  await switchLocale(page, 'English', isMobile);
  await expect(page.locator('.team_title').first()).toHaveText('Ambari Team');
  await expect(page.locator('.character_item')).toHaveCount(members);
  await page.reload();
  expect(errors).toEqual([]);
});

test('missing pages recover through the default 404 page and language menu', async ({page, isMobile}) => {
  await page.goto('/zh-Hans/not-a-real-document');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
  await page.locator('.navbar__brand').first().click();
  await expect(page).toHaveURL('/');
  await switchLocale(page, zh, isMobile);
  await expect(page).toHaveURL(/\/zh-Hans\/$/);
  await expect(page.getByRole('link', {name: start, exact: true})).toBeVisible();
});

test('document links retain the current language', async ({page}) => {
  await page.goto('/zh-Hans/docs/3.0.0/faq');
  const fallback = page.locator('article a[href="/zh-Hans/docs/3.0.0/ambari-dev/how-to-commit"]');
  await expect(fallback).toBeVisible();
  await fallback.click();
  await expect(page.getByTestId('translation-fallback')).toHaveCount(fallbackCount('ambari-dev/how-to-commit.md'));
  const translated = page.locator('article a[href="/zh-Hans/docs/3.0.0/ambari-dev/how-to-contribute"]');
  await translated.click();
  await expect(page.getByTestId('translation-fallback')).toHaveCount(fallbackCount('ambari-dev/how-to-contribute.md'));
  for (const image of await page.locator('article img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test('all 3.0.0 routes render Chinese metadata without fallback', async ({request}) => {
  const data = JSON.parse(readFileSync('.docusaurus/globalData.json', 'utf8'));
  const version = data['docusaurus-plugin-content-docs'].default.versions.find(item => item.name === '3.0.0');
  expect(version.docs).toHaveLength(75);
  for (const document of version.docs) {
    const response = await request.get(document.path);
    expect(response.ok(), document.path).toBe(true);
    const html = await response.text();
    expect(/<html[^>]*lang="zh-Hans"/.test(html), document.path).toBe(true);
    expect(html.includes('data-testid="translation-fallback"'), document.path).toBe(false);
    expect(/<title[^>]*>[^<]*[\u3400-\u9fff]/.test(html), document.path).toBe(true);
  }
});

test('coding guide sidebar uses translated document labels', async ({page, isMobile}) => {
  await page.goto('/zh-Hans/docs/3.0.0/ambari-dev/coding-guidelines-for-ambari');
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  if (isMobile) {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar')).toBeVisible();
  }
  const sidebar = page.locator(isMobile ? '.navbar-sidebar__items--show-secondary .navbar-sidebar__item:not([inert])' : 'aside.theme-doc-sidebar-container');
  const labels = await sidebar.locator('.menu__link').allTextContents();
  expect(labels.length).toBeGreaterThan(30);
  for (const label of labels) expect(label).toMatch(/[\u3400-\u9fff]/);
});

test('version menu preserves the selected language', async ({page, isMobile}) => {
  await page.goto('/zh-Hans/docs/3.0.0/introduction');
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  if (isMobile) {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar')).toBeVisible();
    if (await page.locator('.navbar-sidebar__items--show-secondary').count()) {
      await page.locator('.navbar-sidebar__back').click();
    }
    await page.locator('.navbar-sidebar').getByRole('button', {name: '\u9009\u62e9\u7248\u672c', exact: true}).click();
    await page.locator('.navbar-sidebar a[href="/zh-Hans/docs/2.7.9/introduction"]').click();
  } else {
    await page.locator('.navbar').getByRole('button', {name: '3.0.0', exact: true}).hover();
    await page.locator('.navbar a[href="/zh-Hans/docs/2.7.9/introduction"]').click();
  }
  await expect(page).toHaveURL('/zh-Hans/docs/2.7.9/introduction');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  await expect(page.getByTestId('translation-fallback')).toBeVisible();
});
