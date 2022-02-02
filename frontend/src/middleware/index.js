import {
  FETCH_CONTAINER,
  getFieldValues,
  getResourceValues,
} from '../actions';

import ontologies from '../config/ontologies.json';

import DataFactory from '@rdfjs/data-model';
const { literal, namedNode, quad, variable } = DataFactory;

// == Api Middleware
const middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CONTAINER:
      console.log('middleware-FETCH_CONTAINER:', action);
      let sparqljsParams = {
        queryType: 'CONSTRUCT',
        template: [quad(variable('s1'), variable('p1'), variable('o1'))],
        where: [
          {
            type: 'bgp',
            triples: [quad(variable('s1'), variable('p1'), variable('o1'))]
          },
          {
            type: 'filter',
            expression: {
              type: 'operation',
              operator: 'isiri',
              args: [variable('s1')]
            }
          },
          {
            type: 'filter',
            expression: {
              type: 'operation',
              operator: 'in',
              args: [variable('containerUri'), [namedNode(process.env.REACT_APP_MIDDLEWARE_URL + action.container.slug)]]
            }
          },
          {
            type: 'bgp',
            triples: [quad(variable('containerUri'), namedNode('http://www.w3.org/ns/ldp#contains'), variable('s1'))]
          }
        ],
        type: 'query',
        prefixes: {}
      }
      ontologies.map(ontology => {
        sparqljsParams.prefixes = {
          ...sparqljsParams.prefixes,
          [ontology.prefix]: ontology.url
        };
      });
      // Regenerate a SPARQL query from a JSON object
      let SparqlGenerator = require('sparqljs').Generator;
      let generator = new SparqlGenerator({});
      const sparqljsQuery = generator.stringify(sparqljsParams);
  
      console.log('middleware-FETCH_CONTAINER SPARQL', sparqljsQuery);
      
      fetch(
        process.env.REACT_APP_MIDDLEWARE_URL + 'sparql', {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/ld+json',
            'accept': 'application/json' 
          }),
          mode: 'cors',
          body: sparqljsQuery,
        }
      )
      .then((response) => {
        if (!response.ok) {
          console.log('response.ko');
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        const data = json['@graph'] ? json['@graph'] : [json];
        const formatedData = data.map(d => ({ 
          ...d,
          id: d['@id'],
          type: d['@type']
        }));
        console.log('middleware-FETCH_CONTAINER DATA', action.container, formatedData);
        if (action.container.root) {
          store.dispatch(getResourceValues(action.container, formatedData));
        } else {
          store.dispatch(getFieldValues(action.container, formatedData));
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });

      break;

    default:
      next(action);
  }
};

// == Export
export default middleware;