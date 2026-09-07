// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// For Docusaurus 3 with prism-react-renderer v2
import { themes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Apache Ambari',
  tagline: 'The Apache Ambari project is aimed at making Hadoop management simpler by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs.',
  url: 'https://ambari.apache.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/favicon.ico',
  organizationName: 'apache', 
  projectName: 'ambari-website',
  deploymentBranch: 'asf-site',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en' },
      'zh-Hans': { label: '\u7b80\u4f53\u4e2d\u6587', htmlLang: 'zh-Hans' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          includeCurrentVersion: false,
          sidebarPath: require.resolve('./sidebars.js'),
          beforeDefaultRemarkPlugins: [require('./src/plugins/localized-doc-links')],
          // Enable breadcrumbs for better navigation
          breadcrumbs: true,
          editUrl:
            'https://github.com/apache/ambari-website/tree/main/',
          editLocalizedFiles: true,
          lastVersion: '3.0.0',
          versions: {
            '3.1.0': {
              label: '3.1.0 (Preview)',
              path: '3.1.0',
              banner: 'unreleased',
              noIndex: true,
            },
            '3.0.0': {
              label: '3.0.0',
              path: '3.0.0',
            },
            '2.7.9': {
              label: '2.7.9',
              path: '2.7.9',
            },
            '2.7.8': {
              label: '2.7.8',
              path: '2.7.8',
            },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/apache/ambari-website/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },     
      navbar: {
        title: 'Apache Ambari',
        logo: {
          alt: 'Apache Ambari Logo',
          src: 'img/ambari-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            href: "https://cwiki.apache.org/confluence/display/AMBARI/Ambari",
            label: "Wiki",
            position: "left",
          },
          
          {
            type: 'dropdown',
            position: 'left',
            label: 'Releases',
            items: [
              {
                label: '3.0.0',
                href: 'https://www.apache.org/dyn/closer.cgi/ambari/ambari-3.0.0',
              },
              {
                label: '2.7.9',
                href: 'https://www.apache.org/dyn/closer.cgi/ambari/ambari-2.7.9',
              },
              {
                label: '2.7.8',
                href: 'https://www.apache.org/dyn/closer.cgi/ambari/ambari-2.7.8',
              },
            ],
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Project Information',
            items: [
              /* Temporarily commented out because these two documents are too large and depend on the Ambari project generation.
                 They cannot be treated as static files pushed to git, and they also block the GitHub workflow process.
             {
                label: 'Old Version Website',
                target: '_blank',
                to: '/old/',
              },
              {
                label: 'Swagger API Doc',
                target: '_blank',
                to: '/swagger/',
              },
              {
                label: 'Java Doc',
                target: '_blank',
                to: '/javadoc/apidocs',
              },*/
              {
                label: 'Project Team',
                target: '_blank',
                to: '/team',
              },
              {
                label: 'JIRA',
                href: 'https://issues.apache.org/jira/projects/AMBARI/issues',
              },
              {
                label: 'User Group',
                href: 'https://www.meetup.com/Apache-Ambari-User-Group/',
              },
 /*             {
                label: 'Maling List',
                target: '_blank',
                to: '/old/mail-lists.html',
              },*/
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/apache/ambari',
            label: 'GitHub',
            position: 'right',
          },
          {
            title: 'Legal',
            type: 'dropdown',
            position: 'left',
            label: 'Apache',
            items: [
              {
                label: 'License',
                href: 'https://www.apache.org/licenses/',
              },
              {
                label: 'Apache Software Foundation',
                href: 'https://www.apache.org/',
              },
              {
                label: 'ApacheCon Events',
                href: 'https://www.apachecon.com/',
              },
              {
                label: 'Privacy Policy',
                href: 'https://privacy.apache.org/policies/privacy-policy-public.html',
              },
              {
                label: 'Security',
                href: 'https://www.apache.org/security/',
              },
              {
                label: 'Trademarks',
                href: 'https://www.apache.org/foundation/marks/',
              },
              {
                label: 'Sponsorship',
                href: 'https://www.apache.org/foundation/sponsorship.html',
              },
              {
                label: 'Thanks our Sponsors',
                href: 'https://www.apache.org/foundation/thanks.html',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright ${new Date().getFullYear()} Apache Ambari. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'diff', 'json'],
      }
    }),
    plugins: [
      'docusaurus-plugin-less',
      require.resolve('./src/plugins/csp-plugin'),
      ['@docusaurus/plugin-client-redirects', {
        createRedirects: require('./src/plugins/next-doc-redirects'),
      }],
    ],
  };

export default config;
