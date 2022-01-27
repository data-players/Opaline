const CONFIG = require('./config');

const writePermissionsToCreator = creatorUri => {
  console.log('---------------------------- writePermissionsToCreator',CONFIG.HOME_URL+'_groups/superadmins');
  return {
    anon : {
      read: true
    },
    anyUser: {
      read: true,
    },
    user: {
      uri: creatorUri,
      read: true,
      write: true,
      control : true
    },
    group: {
      uri : CONFIG.HOME_URL+'_groups/superadmins',
      read: true,
      write: true,
      control : true
    }
  }
};

module.exports = [
    {
      path: '/',
    },
  {
    path: '/files'
  },
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    dereference: ['pair:hasLocation/pair:hasPostalAddress'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/organization-types',
    acceptedTypes: ['pair:OrganizationType'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/persons',
    acceptedTypes: ['pair:Person'],
    newResourcesPermissions: writePermissionsToCreator
  },
];
