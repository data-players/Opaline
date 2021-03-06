import FAQCreate from './FAQCreate';
import FAQEdit from './FAQEdit';
import FAQList from './FAQList';
import HelpIcon from '@mui/icons-material/Help';

export default {
  config: {
      list: FAQList,
      create: FAQCreate,
      edit: FAQEdit,
      icon: HelpIcon,
      options: {
        label: 'FAQ'
      },
  },
  dataModel: {
    types: ['opal:FAQ'],
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'FAQ |||| FAQ',
      fields: {
        'pair:label': 'Question',
        'pair:description': 'Réponse'
      }
    }
  }
};
