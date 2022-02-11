import {
  LOAD_DATA,
  LOAD_FIELDS,
  LOAD_FAQ,
  addBooleanField,
  getFieldValues,
  getResourceValues,
} from '../actions';

import ontologies from '../config/ontologies.json';

import DataFactory from '@rdfjs/data-model';
const { literal, namedNode, quad, variable } = DataFactory;


// == Api Middleware
const middleware = (store) => (next) => (action) => {
  
  const state = store.getState();
  
  const fetchResourceContainer = (container) => {
    if (container.slug === 'structures') {
      container.slug = 'organizations'
    }
    return fetchContainer(container, 'resource')
  }
  const fetchFieldContainer = (container) => {
    return fetchContainer(container, 'field')
  }
  const fetchContainer = (container, type) => {
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
            args: [variable('containerUri'), [namedNode(process.env.REACT_APP_MIDDLEWARE_URL + container.slug)]]
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
      return sparqljsParams.prefixes = {
        ...sparqljsParams.prefixes,
        [ontology.prefix]: ontology.url
      };
    });
    // Regenerate a SPARQL query from a JSON object
    let SparqlGenerator = require('sparqljs').Generator;
    let generator = new SparqlGenerator({});
    const sparqljsQuery = generator.stringify(sparqljsParams);
    
    // console.log('middleware-LOAD_DATA SPARQL', sparqljsQuery);
    
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
      
      if (data.find(d => d['@id']) === undefined) {
        console.log('error: data not found', container);
        
      } else {
        
        const formatedData = data.map(d => ({ 
          ...d,
          id: d['@id'],
          type: d['@type']
        }))
        
        // console.log('middleware-LOAD_DATA DATA', container, formatedData);
      
        if (type === 'resource') {
          store.dispatch(getResourceValues(container, formatedData));
        } else {
          store.dispatch(getFieldValues(container, formatedData));
        }
      }
    })
    .catch((error) => {
      console.log('error:', error);
    });
  }
  
  switch (action.type) {
    
    case LOAD_DATA:
      if (!state.resourceValues[action.container]) {
        fetchResourceContainer({name: action.container, slug: action.container})
      }
    break;
    
    case LOAD_FIELDS:
      const getFieldData = (data) => {
        data.forEach(field => {
          if (! state.fieldValues[field.name]) {
            switch (field.type) {
              case 'field-choice': getFieldData(field.fields); break;
              case 'boolean': store.dispatch(addBooleanField(field)); break;
              case 'standard': fetchFieldContainer(field); break;
              case 'chosen-field': fetchFieldContainer(field); break;
            }
          }
        })
      }
      getFieldData(state.resourceValues['configurations'][0].json.fields);
    break;
    
    case LOAD_FAQ:
      if (!state.resourceValues['faq']) {
        fetchResourceContainer({name: 'faq', slug: 'faq'})
      }
    break;

    default:
      next(action);
  }
};

// == Export
export default middleware;