import {
  ADD_BOOLEAN_FIELD,
  GET_FIELD_VALUES,
  GET_RESOURCE_VALUES
}
  from '../actions';

const initialState = {
  loading: true,
  resourceValues: {},
  fieldValues: {}
};

const reducer = (state = initialState, action = {}) => {
  console.log('** reducer', action);
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
          ... state.resourceValues, 
          [action.container.slug]: action.resourceValues
        },
        loading: ! loaded
      };
    default:
      return state;
  }
};

// == Export
export default reducer;