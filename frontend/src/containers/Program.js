import { connect } from 'react-redux';
import Program from '../components/Program';
import { getResourceFromSlug } from '../selectors/urls';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  return {
    program: getResourceFromSlug(state.resourceValues['programs'], slug),
  };
};

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Program);