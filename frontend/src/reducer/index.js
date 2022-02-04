import {
  ADD_BOOLEAN_FIELD,
  GET_FIELD_VALUES,
  GET_RESOURCE_VALUES
}
  from '../actions';

const initialState = {
  loading: true
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
      return {
        ...state,
        resourceValues: {
          data: action.resourceValues,
          container: action.container
        },
        loading: false
      };
    default:
      return state;
  }
};

// == Export
export default reducer;