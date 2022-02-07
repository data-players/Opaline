import { connect } from 'react-redux';
import Search from '../components/Search';
import { 
  addBooleanField,
  fetchContainer,
  goToSearchField,
  setResults
 }
from '../actions';


// state
const mapStateToProps = (state) => ({
  searchIndex: state.searchIndex,
  loading: state.loading,
  resourceValues: state.resourceValues,
  fieldValues: state.fieldValues,
  results: state.results,
  resultsByStructure: state.resultsByStructure
});

// actions
const mapDispatchToProps = (dispatch) => ({
  addBooleanField: (field) => {
    dispatch(addBooleanField(field));
  },
  fetchContainer: (container, containerType) => {
    dispatch(fetchContainer(container, containerType));
  },
  goToSearchField: (searchIndex) => {
    dispatch(goToSearchField(searchIndex));
  },
  setResults: (results) => {
    dispatch(setResults(results));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Search);