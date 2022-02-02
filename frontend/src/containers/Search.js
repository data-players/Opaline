import { connect } from 'react-redux';
import Search from '../components/Search';
import { 
  addBooleanField,
  fetchContainer }
from '../actions';


// state
const mapStateToProps = (state) => ({
  resourceValues: state.resourceValues,
  fieldValues: state.fieldValues
});

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchContainer: (container, containerType) => {
    dispatch(fetchContainer(container, containerType));
  },
  addBooleanField: (field) => {
    dispatch(addBooleanField(field));
  }
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Search);