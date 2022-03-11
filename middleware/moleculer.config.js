const { WebAclMiddleware } = require('@semapps/webacl');

module.exports = {
  middlewares: [
    WebAclMiddleware
  ],
  /*
  logger: {
    type: 'Console',
    options: {
      formatter: 'short',
      level: 'debug'
    }
  }
  */
};
