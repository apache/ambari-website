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

const aliases = {
  'introduction': [''],
  'ambari-design/blueprints': ['blueprints'],
  'ambari-design/kerberos': ['kerberos'],
  'ambari-design/alerts': ['ambari-alerts'],
  'monitoring/architecture-comparison': ['ambari-design/metrics'],
  'monitoring/architecture': ['ambari-design/metrics/ambari-server-metrics'],
  'monitoring/queries-and-dashboards': [
    'ambari-design/metrics/metrics-collector-api-specification',
    'ambari-design/metrics/metrics-api-specification',
    'ambari-design/service-dashboard',
  ],
  'monitoring/service-integration': ['ambari-design/metrics/stack-defined-metrics'],
  'monitoring/deployment': [
    'ambari-design/metrics/configuration',
    'ambari-design/metrics/operations',
    'ambari-design/metrics/troubleshooting',
    'ambari-design/metrics/ambari-metrics-whitelisting',
  ],
  'monitoring/migration': ['ambari-design/metrics/upgrading-ambari-metrics-system'],
  'ambari-plugin-contribution': [
    'ambari-plugin-contribution/step-by-step',
    'ambari-plugin-contribution/scom',
    'ambari-plugin-contribution/scom/installation',
  ],
  'quick-start/environment-setup/docker-environment-setup': ['quick-start/docker-environment-setup'],
};

// The redirects plugin supplies locale-relative paths and restores baseUrl itself.
module.exports = function createNextDocRedirects(route) {
  const prefix = '/docs/3.1.0/';
  if (!route.startsWith(prefix)) return undefined;
  const document = route.slice(prefix.length).replace(/\/$/, '');
  return [document, ...(aliases[document] || [])].map(id => `/docs/next/${id}`);
};
