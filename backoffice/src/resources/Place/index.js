import { PairResourceCreate } from '../../pair';
import PlaceEdit from './PlaceEdit';
import PlaceList from './PlaceList';
import PlaceIcon from '@material-ui/icons/LocationOn';

export default {
  config: {
      list: PlaceList,
      create: PairResourceCreate,
      edit: PlaceEdit,
      icon: PlaceIcon,
      options: {
        label: 'Lieux de formation'
      },
  },
  dataModel: {
    types: ['pair:Place'],
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
        'opal:placeOfferedBy': 'Proposé par', /*Organization*/
        'pair:label': 'Nom',
        'pair:description': 'Description',
        'pair:hasLocation': 'Adresse',
      }
    }
  }
};
