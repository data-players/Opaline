import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import { goToSearchField } from '../actions';

// state
const mapStateToProps = (state) => ({
  searchIndex : state.searchIndex
});

// actions
const mapDispatchToProps = (dispatch) => ({
  goToSearchField: (searchIndex) => {
    dispatch(goToSearchField(searchIndex));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);