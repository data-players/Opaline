import { connect } from 'react-redux';
import Contact from '../components/Contact';

// state
const mapStateToProps = (state) => ({
  contact: state.contact
});

// actions
const mapDispatchToProps = (dispatch) => ({});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Contact);