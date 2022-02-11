import { connect } from 'react-redux';
import Search from '../components/Search';
import { 
  goToSearchField,
  loadData,
  loadFields,
  setMessage,
  setResults,
  setMinimalDelay,
  setSearchFields,
  setSelectedValues
 }
from '../actions';


// state
const mapStateToProps = (state) => ({
  searchIndex: state.searchIndex,
  loading: state.loading.programs || state.loading.containers || state.loading.configurations || state.loading.fields,
  message: state.message,
  startOfLoading: state.startOfLoading,
  resourceValues: state.resourceValues,
  fieldValues: state.fieldValues,
  results: state.results,
  resultsByStructure: state.resultsByStructure,
  selectedValues: state.selectedValues,
  searchFields: state.searchFields,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  goToSearchField: (searchIndex) => {
    dispatch(goToSearchField(searchIndex));
  },
  loadData: (container) => {
    dispatch(loadData(container));
  },
  loadFields: () => {
    dispatch(loadFields());
  },
  setMessage: (message) => {
    dispatch(setMessage(message));
  },
  setMinimalDelay: (startOfLoading) => {
    dispatch(setMinimalDelay(startOfLoading));
  },
  setResults: (results) => {
    dispatch(setResults(results));
  },
  setSearchFields: (searchFields) => {
    dispatch(setSearchFields(searchFields));
  },
  setSelectedValues: (selectedValues) => {
    dispatch(setSelectedValues(selectedValues));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Search);