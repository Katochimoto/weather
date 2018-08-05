var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (config, options) {
  config = config || {};

  if (!options.isDev) {
    config.minify = {
      minimize: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: false,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleTypeAttributes: true
    };
  }

  config.links = [
    {
      rel: 'preconnect',
      href: 'https://api.hostmon.ru'
    },
    {
      rel: 'preconnect',
      href: 'https://maps.googleapis.com'
    }
  ];

  config.meta = [
    {
      'http-equiv': 'Content-Security-Policy',
      content: options.isDev ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *" :
        "default-src 'self';" +
        "connect-src 'self' https://api.hostmon.ru https://maps.googleapis.com;" +
        "script-src 'self' 'unsafe-inline' https://maps.googleapis.com;" +
        "img-src 'self' data: https://www.google-analytics.com https://maps.gstatic.com;" +
        "style-src 'self' 'unsafe-inline';" +
        // "font-src 'self' data:;" +
        "object-src 'none';" +
        "child-src 'none';" + // deprecated
        "frame-src 'none';" +
        "form-action 'self';" +
        "upgrade-insecure-requests;" +
        "block-all-mixed-content;" +
        "base-uri " + config.baseHref || '/'
    },
    {
      'http-equiv': 'X-XSS-Protection',
      content: '1;mode=block'
    },
    {
      'http-equiv': 'Strict-Transport-Security',
      content: 'max-age=31536000; includeSubDomains; preload'
    },
    {
      'http-equiv': 'X-Content-Type-Options',
      content: 'nosniff'
    },
    {
      name: 'description',
      content: 'Rikishi contact details'
    },
    {
      name: 'google',
      content: 'notranslate'
    },
    {
      name: 'theme-color',
      content: '#9cf1fa'
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    }
  ];

  return new HtmlWebpackPlugin(config);
};
