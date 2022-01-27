import { PairResourceCreate } from '../../pair';
import OrganizationEdit from './OrganizationEdit';
import OrganizationList from './OrganizationList';
import OrganizationShow from './OrganizationShow';
import HomeIcon from '@material-ui/icons/Build';

export default {
    config: {
        list: OrganizationList,
        show: OrganizationShow,
        create: PairResourceCreate,
        edit: OrganizationEdit,
        icon: HomeIcon,
        options: {
          label: 'Organisations'
        },
    },
    dataModel: {
        types: ['pair:Organization'],
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
          name: 'Organisation |||| Les organisations',
          fields: {
            'pair:label': 'Titre',
            'pair:hasType': 'Type',
            'pair:description': 'Contenu',
            'pair:depictedBy': 'Photo',
            'pair:hasLocation': 'Emplacement',
            'pair:e-mail': 'E-mail',
            'pair:phone': 'Téléphone',
            'pair:webPage': 'Site internet',
          }
        }
      }
};
