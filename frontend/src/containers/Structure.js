import { connect } from 'react-redux';

import Structure from '../components/Structure';
import { getResourceFromSlug } from '../selectors/urls';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  return {
    structure: getResourceFromSlug(state.resourceValues['organizations'], slug),
  };
};

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Structure);