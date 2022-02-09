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
    path: '/business-creation-goals',
    acceptedTypes: ['opal:BusinessCreationGoal'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/degree-levels',
    acceptedTypes: ['opal:DegreeLevel'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/finding-help-goals',
    acceptedTypes: ['opal:FindingHelpGoal'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/faq',
    acceptedTypes: ['opal:FAQ'],
    newResourcesPermissions: writePermissionsToCreator
  },

  {
    path: '/genders',
    acceptedTypes: ['opal:Gender'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/job-search-goals',
    acceptedTypes: ['opal:JobSearchGoal'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    dereference: ['pair:hasLocation/pair:hasPostalAddress'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/persons',
    acceptedTypes: ['pair:Person'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/programs',
    acceptedTypes: ['pair:Program'],
    newResourcesPermissions: writePermissionsToCreator
  },
  {
    path: '/training-goals',
    acceptedTypes: ['opal:TrainingGoal'],
    newResourcesPermissions: writePermissionsToCreator
  },
];
