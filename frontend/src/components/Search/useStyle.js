import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 16,
      paddingRight: 16
    },
    textAlign: 'center',
    '& button': {
      width: '90%',
      maxWidth: 400
    },
    '& hr': {
      width: '90%'
    },
  },
  stepsContainer: {
    padding: '0 8px 16px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '& Button': {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      color: '#203142 !important',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  },
  dNone: {
    display: 'none'
  },
  loading: {
    height: 'unset'
  },
  stepContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  selectedCriterias: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  criteriasContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24,
      paddingRight: 24
    },
  },
  criteriaContainer: {
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: 'unset',
      minWidth: 400
    },
  },
  criteria: {
    width: '90%',
    maxWidth: 600,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    textAlign: 'left'
  },
  manyCriterias: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '& > *': {
        width: '50%'
      }
    }
  },
  criteriaChevronContainer: {
    margin: 'auto 0',
    minWidth: 50,
    [theme.breakpoints.up('sm')]: {
      minWidth: 90
    },
  },
  criteriaChevron: {
    fontSize: 50,
    [theme.breakpoints.up('sm')]: {
      fontSize: 90
    },
    stroke: 'white',
    cursor: 'pointer',
    '&:hover': {
      opacity: .8
    }
  },
  resourceContainer: {
    '& button': {
      justifyContent: 'flex-start',
      '& svg': {
        transform: 'scale(2)',
        margin: '0 8px',
        [theme.breakpoints.up('sm')]: {
          margin: '0 16px',
        },
      }
    }
  },
  noChoiceButton: {
    color: '#203142 !important'
  },
  resultsContainer: {
    width: '90%',
    maxWidth: 600,
    margin: '-16px auto'
  },
  resultItem: {
    marginTop: 2,
    listStyleType: 'disc',
  }
}));

export default useStyles;