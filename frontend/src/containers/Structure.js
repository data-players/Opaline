import { connect } from 'react-redux';
import Structure from '../components/Structure';
import { getResourceFromSlug } from '../selectors/urls';
import { loadData } from '../actions';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const structure = state.loading.search 
    ? null
    : getResourceFromSlug(state.resourceValues['organizations'], slug);
  const programs = (state.loading.search || ! structure )
    ? []
    : state.resourceValues['programs']?.filter(program => program.programOfferedBy === structure.id)
  const filteredPrograms = programs.filter(program => state.results.find(result=>result.id === program.id))
  return {
    loading: state.loading.search,
    programs: filteredPrograms.length>0 ? filteredPrograms : programs,
    structure: structure,
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadData: () => {
    dispatch(loadData());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Structure);