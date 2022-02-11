import { PairResourceCreate } from '../../pair';
import ConfigurationEdit from './ConfigurationEdit';
import ConfigurationList from './ConfigurationList';
import ConfigurationShow from './ConfigurationShow';
import HomeIcon from '@material-ui/icons/Build';

export default {
  config: {
      list: ConfigurationList,
      show: ConfigurationShow,
      create: PairResourceCreate,
      edit: ConfigurationEdit,
      icon: HomeIcon,
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
