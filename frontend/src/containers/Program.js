import { connect } from 'react-redux';
import Program from '../components/Program';
import { getResourceFromSlug } from '../selectors/urls';
import { loadData } from '../actions';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const program = state.loading.search
    ? null
    : getResourceFromSlug(state.resourceValues['programs'], slug)
  const structure = (state.loading.search || ! program)
    ? null
    : state.resourceValues['organizations'].find(structure => structure.id = program.programOfferedBy)
  return {
    loading: state.loading.search,
    program: program,
    structure: structure
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadData: () => {
    dispatch(loadData());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Program);