import { dataProvider as semanticDataProvider, httpClient } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import dataServers from './dataServers';
import * as resources from '../resources';

console.log('dataprovider');

const dataProvider = semanticDataProvider({
  dataServers,
  httpClient,
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  ontologies,
  jsonContext: process.env.REACT_APP_MIDDLEWARE_URL + 'context.json',
  uploadsContainerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'files'
  // sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
});

export default dataProvider;
