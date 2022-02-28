import { PairResourceCreate } from '../../pair';
import ContactPersonEdit from './ContactPersonEdit';
import ContactPersonList from './ContactPersonList';
import ContactPersonIcon from '@material-ui/icons/ContactMail';

export default {
  config: {
      list: ContactPersonList,
      create: PairResourceCreate,
      edit: ContactPersonEdit,
      icon: ContactPersonIcon,
      options: {
        label: 'Personnes à contacter'
      },
  },
  dataModel: {
    types: ['opal:ContactPerson'],
    list: {
      dereference: [],
      forceArray: [],
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Personne à contacter |||| Personnes à contacter',
      fields: {
        'pair:affiliates': 'Rattachée à', /*Organization*/
        'pair:label': 'Nom complet',
        'pair:description': 'Description',
        'pair:phone': 'Téléphone',
        'pair:e-mail': 'E-mail',
        'opal:civilityTitle': 'Titre de civilité',
      }
    }
  }
};
