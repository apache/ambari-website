
 /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import Confetti from '../components/Confetti';
import useMediaQuery from '../hooks/useMediaQuery';

function HomepageHeader() {

  const isMobileScreen = useMediaQuery("(max-width: 800px)")

  const {siteConfig} = useDocusaurusContext();
  
  const [flag, setFlag] = useState(1);

  function changeFlag(val) {
    setFlag(val == 1 ? 2 : 1)
}

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
       <Confetti />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        {isMobileScreen?
        (
        <>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg margin-bottom--sm"
            to="/docs/quick-start/quick-start-guide">
            GET STARTED
          </Link>
        </div>
        <div className={styles.buttons}>
         <Link
            className="button button--secondary button--outline button--lg margin-top--sm"
            to="https://github.com/apache/ambari"
            >
              <img className={styles.button_icon} src={useBaseUrl('/img/github' + flag + '.svg')} alt="github"/>
              <span>GITHUB</span>
          </Link>
        </div>
        <div className={styles.buttons}>
         <Link
            className="button button--secondary button--outline button--lg margin-top--sm"
            to="https://the-asf.slack.com/archives/C014FSPE668">
              <img className={styles.button_icon} src='/img/slack.svg' alt="slack"/>
              <span>SLACK</span>            
          </Link>
        </div>
        </>
        )
          :
        (
        <div className={styles.buttons}>
         <Link
            className="button button--primary button--lg margin-right--sm"
            to="/docs/quick-start/quick-start-guide">
            GET STARTED
          </Link>
          <Link
            className="button button--secondary button--outline button--lg margin-left--sm"
            to="https://github.com/apache/ambari"
            onMouseOver={() => changeFlag(1)} onMouseOut={() => changeFlag(2)}
            >
              <img className={styles.button_icon} src={useBaseUrl('/img/github' + flag + '.svg')} alt="github"/>
              <span>GITHUB</span>
          </Link>
          <Link
            className="button button--secondary button--outline button--lg margin-left--sm"
            to="https://the-asf.slack.com/archives/C014FSPE668">
              <img className={styles.button_icon} src='/img/slack.svg' alt="slack"/>
              <span>SLACK</span>            
          </Link>
        </div>
        )
        }
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
