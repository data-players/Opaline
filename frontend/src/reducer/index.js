import {
  ADD_BOOLEAN_FIELD,
  GO_TO_SEARCH_FIELD,
  GET_FIELD_VALUES,
  GET_RESOURCE_VALUES,
  SET_RESULTS,
}
  from '../actions';

const initialState = {
  searchIndex: -1,
  loading: true,
  resourceValues: {},
  fieldValues: {},
  results: [],
  resultsByStructure: [],
};

const reducer = (state = initialState, action = {}) => {
  console.log('** reducer', state, action);
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
        }
      };
    case GET_RESOURCE_VALUES:
      const mandatoryResources = ['programs', 'organizations']
      const resourcesArray = Object.keys(state.resourceValues).concat([action.container.slug]);
      const loaded = mandatoryResources.every(element => {
        return resourcesArray.includes(element);
      });
      return {
        ...state,
        resourceValues: {
          ...state.resourceValues, 
          [action.container.slug]: action.resourceValues
        },
        loading: ! loaded
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
    default:
      return state;
  }
};

export default reducer;