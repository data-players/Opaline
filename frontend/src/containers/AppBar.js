import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import { goToSearchField, setMessage } from '../actions';

// state
const mapStateToProps = (state) => ({
  searchIndex : state.searchIndex,
  message: state.message
});

// actions
const mapDispatchToProps = (dispatch) => ({
  goToSearchField: (searchIndex) => {
    dispatch(goToSearchField(searchIndex));
  },
  setMessage: (message) => {
    dispatch(setMessage(message));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);