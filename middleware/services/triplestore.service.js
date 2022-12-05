const { TripleStoreService } = require('@semapps/triplestore');
const CONFIG = require('../config');

module.exports = {
  mixins: [TripleStoreService],
  settings: {
    url: CONFIG.SPARQL_ENDPOINT,
    mainDataset: CONFIG.MAIN_DATASET,
    user: CONFIG.JENA_USER,
    password: CONFIG.JENA_PASSWORD
  }
};
