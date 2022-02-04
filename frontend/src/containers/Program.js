import { connect } from 'react-redux';

import Program from '../components/Program';
import { getProgramFromSlug } from '../selectors/urls';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  return {
    program: getProgramFromSlug(state.resourceValues.data, slug),
  };
};

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Program);