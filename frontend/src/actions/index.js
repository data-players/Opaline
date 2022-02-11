// == Action types
export const ADD_BOOLEAN_FIELD = 'ADD_BOOLEAN_FIELD';
export const GO_TO_SEARCH_FIELD = 'GO_TO_SEARCH_FIELD';
export const GET_FIELD_VALUES = 'GET_FIELD_VALUES';
export const GET_RESOURCE_VALUES = 'GET_RESOURCE_VALUES';
export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_FIELDS = 'LOAD_FIELDS';
export const LOAD_FAQ = 'LOAD_FAQ';
export const NEW_SEARCH = 'NEW_SEARCH';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_MINIMAL_DELAY = 'SET_MINIMAL_DELAY';
export const SET_RESULTS = 'SET_RESULTS';
export const SET_SEARCH_FIELDS = 'SET_SEARCH_FIELDS';
export const SET_SELECTED_VALUES = 'SET_SELECTED_VALUES';

// == Action creators
export const addBooleanField = (field) => ({
  type: ADD_BOOLEAN_FIELD,
  field,
});
export const goToSearchField = (searchIndex) => ({
  type: GO_TO_SEARCH_FIELD,
  searchIndex
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
export const loadData = (container) => ({
  type: LOAD_DATA,
  container
});
export const loadFields = () => ({
  type: LOAD_FIELDS,
});
export const loadFAQ = () => ({
  type: LOAD_FAQ,
});
export const newSearch = () => ({
  type: NEW_SEARCH,
});
export const setResults = (results) => ({
  type: SET_RESULTS,
  results
});
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  message
});
export const setMinimalDelay = (startOfLoading) => ({
  type: SET_MINIMAL_DELAY,
  startOfLoading
});
export const setSearchFields = (searchFields) => ({
  type: SET_SEARCH_FIELDS,
  searchFields
});
export const setSelectedValues = (selectedValues) => ({
  type: SET_SELECTED_VALUES,
  selectedValues
});




