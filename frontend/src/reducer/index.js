import searchConfig from '../config/searchConfig.json';
import {
  ADD_BOOLEAN_FIELD,
  GO_TO_SEARCH_FIELD,
  GET_FIELD_VALUES,
  GET_RESOURCE_VALUES,
  NEW_SEARCH,
  SET_MINIMAL_DELAY,
  SET_RESULTS,
  SET_SEARCH_FIELDS,
  SET_SELECTED_VALUES,
}
  from '../actions';
  

const initialState = {
  searchIndex: -1,
  loading: {
    search: true,
    faq: true
  },
  startOfLoading: 0,
  resourceValues: {},
  fieldValues: {},
  results: [],
  resultsByStructure: [],
  searchFields: [],
  selectedValues: []
};

const checkForDataLoaded = (state, resources, fields) => {
  const mandatoryResources = ['programs', 'organizations'];
  const resourcesLoaded = mandatoryResources.every(element => {
    return resources.includes(element);
  })
  const fieldsLoaded = Object.keys(fields).length >= searchConfig[0].fields.length;
  return resourcesLoaded && fieldsLoaded;
}

const reducer = (state = initialState, action = {}) => {
  // console.log('** reducer', state, action);
  switch (action.type) {
    case ADD_BOOLEAN_FIELD:
      return {
        ...state,
        fieldValues: {
          ...state.fieldValues,
          [action.field.name]: [
            {id: true, label: 'oui'},
            {id: false, label: 'non'}
          ]
        }
      };
    case GO_TO_SEARCH_FIELD:
      return {
        ...state,
        searchIndex: action.searchIndex
      }
    case GET_FIELD_VALUES:
      return {
        ...state,
        fieldValues: {
          ...state.fieldValues,
          [action.container.name]: action.fieldValues
        },
        loading: {
          ...state.loading,
          search: ! checkForDataLoaded(state,
            Object.keys(state.resourceValues),
            Object.keys(state.fieldValues).concat([action.container.name])
          )
        }
      };
    case GET_RESOURCE_VALUES:
      return {
        ...state,
        resourceValues: {
          ...state.resourceValues, 
          [action.container.slug]: action.resourceValues
        },
        loading: {
          faq: ! Object.keys(state.resourceValues).concat([action.container.slug]).includes('faq'),
          search: ! checkForDataLoaded(state,
            Object.keys(state.resourceValues).concat([action.container.slug]),
            Object.keys(state.fieldValues)
          )
        }
      };
    case NEW_SEARCH:
      return {
        ...state,
        searchIndex: -1,
        results: [],
        resultsByStructure: [],
        selectedValues: []
      };
    case SET_MINIMAL_DELAY:
      return {
        ...state,
        startOfLoading: action.startOfLoading
      };
    case SET_RESULTS:
      const resultsByStructure = 
        action.results
          .map(result => result.programOfferedBy)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map(result => state.resourceValues['organizations'].find(resource => resource.id === result));
      return {
        ...state,
        results: action.results,
        resultsByStructure: resultsByStructure
      };
    case SET_SEARCH_FIELDS:
      // Clone nested object
      const rootContainer = {...searchConfig[0], fields:[...searchConfig[0].fields]}
      if (action.searchFields.length === 0) {
        action.searchFields = rootContainer.fields;
      }
      return {
        ...state,
        searchFields: action.searchFields
      };
    case SET_SELECTED_VALUES:
      return {
        ...state,
        selectedValues: action.selectedValues
      };
    default:
      return state;
  }
};

export default reducer;