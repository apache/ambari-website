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

import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
// Using a simpler approach that doesn't require special imports
import styles from './styles.module.css';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  // Generate breadcrumb items based on the current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const { pathname } = location;
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Skip rendering breadcrumbs on non-documentation pages
    if (!pathSegments.includes('docs')) {
      return [];
    }
    
    // Remove 'docs' from the path if present
    const segments = pathSegments[0] === 'docs' ? pathSegments.slice(1) : pathSegments;
    
    // Create breadcrumb items
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Add home
    breadcrumbs.push({
      label: 'Home',
      href: '/',
      isActive: false,
    });
    
    // Add docs
    breadcrumbs.push({
      label: 'Docs',
      href: '/docs',
      isActive: segments.length === 0,
    });
    
    // Add intermediate segments
    let currentPath = '/docs';
    for (let i = 0; i < segments.length - 1; i++) {
      currentPath += `/${segments[i]}`;
      
      // Format the label (convert kebab-case to Title Case)
      const label = segments[i]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isActive: false,
      });
    }
    
    // Add current page (if there are segments)
    if (segments.length > 0) {
      const currentLabel = segments[segments.length - 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label: currentLabel,
        href: pathname,
        isActive: true,
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Don't render if we only have Home and Docs (top level) or not on a docs page
  if (breadcrumbs.length <= 2) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumbs" className={styles.breadcrumbsContainer}>
      <ol className={styles.breadcrumbsList}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li 
            key={breadcrumb.href} 
            className={styles.breadcrumbItem}
            aria-current={breadcrumb.isActive ? 'page' : undefined}
          >
            {index > 0 && <span className={styles.separator}>/</span>}
            {breadcrumb.isActive ? (
              <span className={styles.active}>{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
