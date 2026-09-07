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
import Translate, {translate} from '@docusaurus/Translate';
import config from "./languages.json";
import Layout from '@theme/Layout';
import './index.less';

export default function () {
  const dataSource = config.en;

  return (
    <Layout
      title={translate({id: 'team.title', message: 'Ambari Team'})}
      description={translate({id: 'team.description', message: 'The Apache Ambari project team.'})}>
      <div className="container">
        <div className="block team_page">
          <h3 className="team_title"><Translate id="team.title">Ambari Team</Translate></h3>
          <p className="team_desc"><Translate id="team.introduction">The Ambari Team</Translate></p>
          <h3 className="team_title"><Translate id="team.pmc">PMC</Translate></h3>
          <p className="team_desc"><Translate id="team.unordered">(In no particular order)</Translate></p>
          <ul className="character_list">
            {
              dataSource.pmc.map((item, i) => (
                <li key={i} className="character_item text_center" style={{ 'listStyle': 'none' }}>
                  <a href={'https://github.com/' + item.githubId} target="_blank" rel="noopener noreferrer">
                    <img className="character_avatar" src={item.avatarUrl} alt={item.name} />
                    <div className="character_desc">
                      <h3 className="character_name">{item.name}</h3>
                      <h3 className="character_id"><span className="mdi--github"></span>{item.githubId}</h3>
                    </div>
                  </a>
                </li>
              ))
            }
          </ul>

          <h3 className="team_title"><Translate id="team.committers">Committers</Translate></h3>
          <p className="team_desc"><Translate id="team.unordered">(In no particular order)</Translate></p>
          <ul className="character_list">
            {
              dataSource.committer.map((item, i) => (
                <li key={i} className="character_item text_center" style={{ 'listStyle': 'none' }}>
                  <a href={'https://github.com/' + item.githubId} target="_blank" rel="noopener noreferrer">
                    <img className="character_avatar" src={item.avatarUrl} alt={item.name} />
                    <div className="character_desc">
                      <h3 className="character_name">{item.name}</h3>
                      <h3 className="character_id"><span className="mdi--github"></span>{item.githubId}</h3>
                    </div>
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );
}
