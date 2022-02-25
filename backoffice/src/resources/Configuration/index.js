import { PairResourceCreate } from '../../pair';
import ConfigurationEdit from './ConfigurationEdit';
import ConfigurationList from './ConfigurationList';
import BuildIcon from '@material-ui/icons/Build';

export default {
  config: {
      list: ConfigurationList,
      create: PairResourceCreate,
      edit: ConfigurationEdit,
      icon: BuildIcon,
      options: {
        label: 'Configuration'
      },
  },
  dataModel: {
    types: ['opal:Configuration'],
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
      name: 'Configuration |||| Configuration',
      fields: {
        'pair:label': 'Nom',
        'pair:description': 'Description',
        'opal:json': 'JSON'
      }
    }
  }
};
