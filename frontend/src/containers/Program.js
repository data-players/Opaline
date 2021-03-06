import { connect } from 'react-redux';
import Program from '../components/Program';
import { getResourceFromSlug } from '../selectors/urls';
import { loadData, openContactForm } from '../actions';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const program = state.loading.programs
    ? null
    : getResourceFromSlug(state.resourceValues['programs'], slug)
  const structure = (state.loading.structures || ! program)
    ? null
    : state.resourceValues['structures'].find(structure => structure.id === program['pair:offeredBy'])
  const trainingSite = (state.loading.trainingSites || ! program)
    ? null
    : state.resourceValues['trainingSites'].find(trainingSite => trainingSite.id === program['pair:offers'])
  return {
    loading: state.loading.programs || state.loading.structures,
    program: program,
    structure: structure,
    trainingSite: trainingSite
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadData: (container) => {
    dispatch(loadData(container));
  },
  openContactForm: (contact) => {
    dispatch(openContactForm(contact));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Program);