import { connect } from 'react-redux';

import Structure from '../components/Structure';
import { getResourceFromSlug } from '../selectors/urls';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const structure = getResourceFromSlug(state.resourceValues['organizations'], slug);
  return {
    structure: structure,
    programs: state.resourceValues['programs'].filter(program => program.programOfferedBy === structure.id),
  };
};

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Structure);