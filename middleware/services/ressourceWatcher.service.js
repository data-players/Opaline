const { ResourcesWatcherBot } = require('@semapps/ldp');
// const urlJoin = require('url-join');
// const ontologies = require('../ontologies');
const CONFIG = require('../config');
// const containers = require('../containers');

module.exports = {
  name:"superAdmin",
  methods: {
    postCreated(resourceUri, newData) {
      console.log('postCreated');
      // This method can be implemented
    },
    postUpdated(resourceUri, newData, oldData) {
      console.log('postUpdated');
      // This method can be implemented
    },

    isMatching(resourceUri) {
      // return getContainerFromUri(resourceUri) === CONFIG.baseUri+'organisation';
      return true;
    }
  },
  events: {
    async 'ldp.resource.created'(ctx) {
      const { resourceUri, newData } = ctx.params;
      if (this.isMatching(resourceUri)) {
        this.postCreated(resourceUri, newData);
      }
    },
    async 'ldp.resource.updated'(ctx) {
      const { resourceUri, newData, oldData } = ctx.params;
      if (this.isMatching(resourceUri)) {
        this.postUpdated(resourceUri, newData, oldData);
      }
    }
  }
};
