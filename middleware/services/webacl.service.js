const { WebAclService } = require('@semapps/webacl');

module.exports = {
  mixins: [WebAclService],
  settings: {
    baseUrl: process.env.SEMAPPS_HOME_URL,
    superAdmins: [
      'http://localhost:3000/persons/v.farcy72',
      'http://localhost:3000/persons/simon.louvet.zen',
      'http://localhost:3000/persons/simon.louvet.zen',
      'https://data.opaline.data-players.com/persons/pierre',
      'https://data.opaline.data-players.com/persons/simon.louvet.zen',
      'https://data.opaline.data-players.com/persons/v.farcy72',
      'https://data.opaline.data-players.com/persons/helene'
    ]
  }
};
