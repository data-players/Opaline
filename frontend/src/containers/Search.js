import { connect } from 'react-redux';
import Search from '../components/Search';
import { 
  addBooleanField,
  fetchContainer,
  goToSearchField
 }
from '../actions';


// state
const mapStateToProps = (state) => ({
  searchIndex: state.searchIndex,
  loading: state.loading,
  resourceValues: state.resourceValues,
  fieldValues: state.fieldValues
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
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Search);