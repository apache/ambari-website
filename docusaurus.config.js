// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Apache Ambari',
  tagline: 'The Apache Ambari project is aimed at making Hadoop management simpler by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'apache', 
  projectName: 'ambari', 

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vivostar/vivostar.github.io/tree/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vivostar/vivostar.github.io/tree/master/',
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
                label: '2.7.6',
                href: 'https://www.apache.org/dyn/closer.cgi/ambari/ambari-2.7.6',
              },
              {
                label: '2.7.5',
                href: 'https://www.apache.org/dyn/closer.cgi/ambari/ambari-2.7.5',
              },
            ],
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Project Information',
            items: [
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
              },
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
              {
                label: 'Maling List',
                target: '_blank',
                to: '/old/mail-lists.html',
              },
              {
                label: "Project License",
                href: 'https://www.apache.org/licenses/'
              }
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/apache/ambari',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Apache Ambari. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: ['docusaurus-plugin-less',],
};

module.exports = config;
