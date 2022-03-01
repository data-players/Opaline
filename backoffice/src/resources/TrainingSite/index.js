import { PairResourceCreate } from '../../pair';
import TrainingSiteEdit from './TrainingSiteEdit';
import TrainingSiteList from './TrainingSiteList';
import TrainingSiteIcon from '@material-ui/icons/LocationOn';

export default {
  config: {
      list: TrainingSiteList,
      create: PairResourceCreate,
      edit: TrainingSiteEdit,
      icon: TrainingSiteIcon,
      options: {
        label: 'Lieux de formation'
      },
  },
  dataModel: {
    types: ['opal:TrainingSite'],
    list: {
      dereference: ['pair:hasLocation/pair:hasPostalAddress'],
      forceArray: [],
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Lieu de formation |||| Lieux de formation',
      fields: {
        'opal:trainingSiteOfferedBy': 'Proposé par', /*Organization*/
        'pair:label': 'Nom',
        'pair:description': 'Description',
        'pair:hasLocation': 'Adresse',
      }
    }
  }
};
