import { connect } from 'react-redux';
import Program from '../components/Program';
import { getResourceFromSlug } from '../selectors/urls';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const program = getResourceFromSlug(state.resourceValues['programs'], slug)
  return {
    program: program,
    structure: state.resourceValues['organizations'].find(structure => structure.id = program.programOfferedBy)
  };
};

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Program);