import ConceptCreate from '../ConceptCreate';
import ConceptEdit from '../ConceptEdit';
import ConceptList from '../ConceptList';
import StyleIcon from '@material-ui/icons/Style';

export default {
  config: {
    list: ConceptList,
    create: ConceptCreate,
    edit: ConceptEdit,
    icon: StyleIcon,
    options: {
      label: 'Mode de formation',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: [
      'opal:TrainingMode',
    ],
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Mode de formation |||| Mode de formation',
      fields: {
        '@type': 'Classe',
        'pair:label': 'Nom'
      }
    }
  }
};
