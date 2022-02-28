const dataServers = {
  av: {
    name: 'Opaline',
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
    authServer: true,
    default: true,
    containers: {
      av: {
        'opal:BusinessCreationGoal': ['/business-creation-goals'],
        'opal:Configuration': ['/configurations'],
        'opal:ContactPerson': ['/contact-persons'],
        'opal:DegreeLevel': ['/degree-levels'],
        'opal:FAQ': ['/faq'],
        'opal:FindingHelpGoal': ['/finding-help-goals'],
        'opal:Gender': ['/genders'],
        'opal:JobSearchGoal': ['/job-search-goals'],
        'opal:TrainingGoal': ['/training-goals'],
        'opal:Program': ['/programs'],
        'pair:Organization': ['/organizations'],
        'pair:Person': ['/persons'],
      }
    },
    uploadsContainer: '/files'
  }
};

export default dataServers;
