module.exports = function (context, options) {
  return {
    name: 'docusaurus-csp-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              'http-equiv': 'Content-Security-Policy',
              content: "default-src 'self'; img-src 'self' data: https://*.githubusercontent.com https://github.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
            },
          },
        ],
      };
    },
  };
}; 