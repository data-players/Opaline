import { connect } from 'react-redux';
import Start from '../components/Start';
import { newSearch } from '../actions';

// state
const mapStateToProps = (state) => ({});

// actions
const mapDispatchToProps = (dispatch) => ({
  newSearch: (searchIndex) => {
    dispatch(newSearch(searchIndex));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Start);