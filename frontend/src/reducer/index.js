import {
  ADD_BOOLEAN_FIELD,
  GO_TO_SEARCH_FIELD,
  GET_FIELD_VALUES,
  GET_RESOURCE_VALUES,
  NEW_SEARCH,
  SET_MESSAGE,
  SET_MINIMAL_DELAY,
  SET_RESULTS,
  SET_SEARCH_FIELDS,
  SET_SELECTED_VALUES
}
  from '../actions';
  

const initialState = {
  searchIndex: -1,
  loading: {
    configurations: true,
    fields: true,
    programs: true,
    structures: true,
    faq: true
  },
  startOfLoading: 0,
  resourceValues: {},
  fieldValues: {},
  results: [],
  resultsByStructure: [],
  searchFields: [],
  selectedValues: [],
  message: ''
};

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
      // Check if at least standard fields are loaded
      let loaded = false;
      if ( state.fieldValues ) {
        const searchConfigFields = state.resourceValues['configurations'][0].json.fields;
        if (searchConfigFields) {
          const searchConfigStandardFields = searchConfigFields.filter(field => field.type === 'standard');
          const loadedStandardFields = Object.keys(state.fieldValues).concat([action.container.name]);
          loaded =  loadedStandardFields.length >= searchConfigStandardFields.length
        }
      }
      return {
        ...state,
        fieldValues: {
          ...state.fieldValues,
          [action.container.name]: action.fieldValues
        },
        loading: {
          ...state.loading,
          fields: ! loaded
        }
      };
    case GET_RESOURCE_VALUES:
      if ( action.container.slug === 'configurations' ) {
        action.resourceValues.map(resource => {
          resource.json = JSON.parse(resource.json);
        })
      }
      return {
        ...state,
        resourceValues: {
          ...state.resourceValues,
          [action.container.name]: action.resourceValues
        },
        loading: {
          ...state.loading,
          [action.container.name]: false
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
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
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
          .map(result => state.resourceValues['structures'].find(resource => resource.id === result));
      return {
        ...state,
        results: action.results,
        resultsByStructure: resultsByStructure
      };
    case SET_SEARCH_FIELDS:
      const searchConfigRoot = state.resourceValues['configurations'][0].json;
      // Clone nested object
      const rootContainer = {...searchConfigRoot, fields:[...searchConfigRoot.fields]}
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