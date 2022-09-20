import { connect } from 'react-redux';
import Page from '../components/Page';
import { loadPage } from '../actions';

// state
const mapStateToProps = (state) => {
  return {
    loading: state.loading.pages,
    page: state.resourceValues['pages'],
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadPage: () => {
    dispatch(loadPage());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Page);
