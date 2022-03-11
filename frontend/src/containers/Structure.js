import { connect } from 'react-redux';
import Structure from '../components/Structure';
import { getResourceFromSlug } from '../selectors/urls';
import { loadData } from '../actions';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const structure = state.loading.structures
    ? null
    : getResourceFromSlug(state.resourceValues['structures'], slug);
  const programs = (state.loading.programs || ! structure )
    ? []
    : state.resourceValues['programs']?.filter(program => program['pair:offeredBy'] === structure.id)
  const filteredPrograms = programs.filter(program => state.results.find(result=>result.id === program.id))
  return {
    loading: state.loading.programs || state.loading.structures,
    programs: filteredPrograms.length>0 ? filteredPrograms : programs,
    structure: structure,
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadData: (container) => {
    dispatch(loadData(container));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Structure);