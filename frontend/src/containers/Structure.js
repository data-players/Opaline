import { connect } from 'react-redux';

import Structure from '../components/Structure';
import { getResourceFromSlug } from '../selectors/urls';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const structure = getResourceFromSlug(state.resourceValues['organizations'], slug);
  const programs = state.resourceValues['programs']?.filter(program => program.programOfferedBy === structure.id)
  const filteredPrograms = programs.filter(program => state.results.find(result=>result.id === program.id))
  return {
    structure: structure,
    programs: filteredPrograms.length>0 ? filteredPrograms : programs,
  };
};

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Structure);