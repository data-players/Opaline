import { connect } from 'react-redux';
import FAQ from '../components/FAQ';
import { loadFAQ } from '../actions';

// state
const mapStateToProps = (state) => {
  return {
    loading: state.loading.faq,
    faq: state.resourceValues['faq'],
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadFAQ: () => {
    dispatch(loadFAQ());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(FAQ);