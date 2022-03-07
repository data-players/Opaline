const urlJoin = require('url-join');
const { MIME_TYPES } = require('@semapps/mime-types');
const containers = require('../containers');
const CONFIG = require('../config');

module.exports = {
  name: 'migration',
  dependencies: ['ldp', 'webacl'],
  actions: {
    async resetRightsToAll(ctx) {
      
      console.log('===> resetRightsToAll');
     
      for (let containerConfig of containers) {
        const container = await ctx.call(
          'ldp.container.get',
          {
            containerUri: urlJoin(CONFIG.HOME_URL, containerConfig.path),
            accept: MIME_TYPES.JSON
          },
          {
            meta: { webId: 'system' }
          }
        );

        const containerSlug = container.id.replace(CONFIG.HOME_URL, '')
        const anonymousHasWritePermission = ['programs', 'organizations', 'faq'].includes(containerSlug);
        
        // delete all rights
        await ctx.call('webacl.resource.deleteAllRights', {
          webId: 'system',
          resourceUri: container.id,
        });

        // add all rights
        console.log('\n---> Adding rights for container', container.id);
        await ctx.call('webacl.resource.addRights', {
          webId: 'system',
          resourceUri: container.id,
          additionalRights: {
            anon: {
              read: true,
              write: anonymousHasWritePermission
            },
            anyUser: {
              read: true,
              write: true
            },
            group: {
              uri : CONFIG.HOME_URL+'_groups/superadmins',
              read: true,
              write: true,
              control : true
            }
          }
        });
        
        if (container.id !== CONFIG.HOME_URL && container['ldp:contains'] && container['ldp:contains'].length > 0) {
          for (let resource of container['ldp:contains']) {
            if (resource && Object.keys(resource).length > 0) {
              
              // delete all rights
              await ctx.call('webacl.resource.deleteAllRights', {
                webId: 'system',
                resourceUri: resource.id,
              });
              
              // add all rights
              console.log('\n---> Adding rights for resource', resource.id);

              if (containerConfig.path === '/users') {
                await ctx.call('webacl.resource.addRights', {
                  webId: 'system',
                  resourceUri: resource.id,
                  additionalRights: {
                    anon: {
                      read: true
                    },
                    user: {
                      uri: resource.id,
                      read: true,
                      write: true,
                      control: true
                    }
                  }
                });
              } else {
                const ressourceFull = await ctx.call('ldp.resource.get',{resourceUri:resource.id,accept:'application/ld+json'})
                const rights={
                  anon: {
                    read: true,
                    write: anonymousHasWritePermission
                  },
                  anyUser: {
                    read: true,
                    write: true,
                  },
                  group: {
                    uri : CONFIG.HOME_URL+'_groups/superadmins',
                    read: true,
                    write: true,
                    control : true
                  }
                }
                if (ressourceFull["dc:creator"] && ressourceFull["dc:creator"].id) {
                  rights.user={
                    uri: ressourceFull["dc:creator"].id,
                    read: true,
                    write: true,
                    control: true
                  }
                }
                await ctx.call('webacl.resource.addRights', {
                  webId: 'system',
                  resourceUri: resource.id,
                  additionalRights: rights
                });
              }
            }
          }
        }
      }
    }
  }
};
