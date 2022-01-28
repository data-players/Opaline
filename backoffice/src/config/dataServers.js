const dataServers = {
  av: {
    name: 'Assemblée Virtuelle',
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
    authServer: true,
    default: true,
    containers: {
      av: {
        'pair:Organization': ['/organizations'],
        'pair:OrganizationType': ['/organization-types'],
        'pair:Person': ['/persons'],
      }
    },
    uploadsContainer: '/files'
  }
};

export default dataServers;
