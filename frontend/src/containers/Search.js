import { connect } from 'react-redux';
import Search from '../components/Search';
import { 
  goToSearchField,
  loadData,
  setResults,
  setMinimalDelay,
  setSearchFields,
  setSelectedValues
 }
from '../actions';


// state
const mapStateToProps = (state) => ({
  searchIndex: state.searchIndex,
  loading: state.loading.search,
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
  loadData: () => {
    dispatch(loadData());
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