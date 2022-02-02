// == Action types
export const ADD_BOOLEAN_FIELD = 'ADD_BOOLEAN_FIELD';
export const FETCH_CONTAINER = 'FETCH_CONTAINER';
export const GET_FIELD_VALUES = 'GET_FIELD_VALUES';
export const GET_RESOURCE_VALUES = 'GET_RESOURCE_VALUES';

// == Action creators
export const addBooleanField = (field) => ({
  type: ADD_BOOLEAN_FIELD,
  field,
});
export const fetchContainer = (container) => ({
  type: FETCH_CONTAINER,
  container
});
export const getFieldValues = (container, fieldValues) => ({
  type: GET_FIELD_VALUES,
  container,
  fieldValues
});
export const getResourceValues = (container, resourceValues) => ({
  type: GET_RESOURCE_VALUES,
  container,
  resourceValues
});



