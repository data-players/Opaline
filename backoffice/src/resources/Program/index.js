import { PairResourceCreate } from '../../pair';
import ProgramEdit from './ProgramEdit';
import ProgramList from './ProgramList';
import ProgramShow from './ProgramShow';
import HomeIcon from '@material-ui/icons/Build';

export default {
  config: {
      list: ProgramList,
      show: ProgramShow,
      create: PairResourceCreate,
      edit: ProgramEdit,
      icon: HomeIcon,
      options: {
        label: 'Programmes'
      },
  },
  dataModel: {
    types: ['opal:Program'],
    list: {
      dereference: ['pair:hasLocation/pair:hasPostalAddress'],
      forceArray: [
        'opal:hasBusinessCreationGoals',
        'opal:hasJoBSearchGoals',
        'opal:hasTrainingGoals',
        'opal:hasFindingHelpGoals',
      ],
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Programme |||| Les programmes',
      fields: {
        'opal:offeredBy': 'Proposé par', /*Organization*/
        'pair:label': 'Nom',
        'opal:minimumAge' : 'Age minimum',
        'opal:maximumAge' : 'Age maximum',
        'opal:hasDegreeLevel': 'Niveau de diplôme',
        'opal:gender': 'Genre',
        'opal:rqth': 'Reconnaissance de la qualité de travailleur handicapé',
        'opal:poleEmploi': 'Inscrit à Pôle Emploi',
        'opal:hasBusinessCreationGoals': 'Création d\'entreprise',
        'opal:hasJobSearchGoals': 'Recherche d\'emploi',
        'opal:hasTrainingGoals': 'Se former',
        'opal:hasFindingHelpGoals': 'Besoin d\'aide',
        'opal:noIdea': 'Je ne sais pas ce que je veux faire',
      }
    }
  }
};
