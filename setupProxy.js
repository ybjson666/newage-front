/**
 * 开发环境请求代理
 */
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/v1', {
    //演示
    'target':'http://neweraback.wjbase.chinamcloud.cn',
    // 测试
    // 'target':'https://neweraback.wjtest.chinamcloud.cn',
    // 'target':'http://cimfront.wjdev.chinamcloud.cn',
    'changeOrigin': true,
    'pathRewrite': {
      '/v1': ''
    }
  })),
    app.use(proxy('/cmc-api', {
      // 'target':'http://cmcapi.flydev.chinamcloud.cn',
      'target':' https://cmcapi.wjtest.chinamcloud.cn/',
      'changeOrigin': true,
      'pathRewrite': {
        '^/cmc-api': ''
      }
    })),
    app.use(proxy('/pgc-upload', {
       // 'target':'http://pgcupload.flydev.chinamcloud.cn',
      'target':' https://pgcupload.chinamcloud.com/',
      'changeOrigin': true,
      'pathRewrite': {
        '^/pgc-upload': ''
      }
    }))
};
