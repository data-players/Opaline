const ApiGatewayService = require('moleculer-web');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    routes: [
      {
        path: '/ontology',
        use: [
          ApiGatewayService.serveStatic('./public/ontology.ttl', {
            setHeaders: res => {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'text/turtle; charset=utf-8');
            }
          })
        ]
      }
    ],
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      exposedHeaders: '*'
    }
  },
  methods: {
    authenticate(ctx, route, req, res) {
      return ctx.call('auth.authenticate', { route, req, res });
    },
    authorize(ctx, route, req, res) {
      return ctx.call('auth.authorize', { route, req, res });
    }
  }
};
