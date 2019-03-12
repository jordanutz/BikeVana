const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
      '/callback',
      '/api',
      '/auth',
      '/search',
      '/user',
    ], { target: 'http://localhost:1993/' }));
  };
