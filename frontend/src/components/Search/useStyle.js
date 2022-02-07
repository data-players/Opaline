import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: 48,
    padding: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '1rem',
    }
  },
  stepTitle: {
    marginBottom: '2rem',
    textAlign: 'left'
  },
  criteriaContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  criteriaButtonContainer: {
    width: 'calc(50% - .5rem)',
    margin: '.5rem',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      width: 'calc(50% - 1rem)',
      margin: '1rem',
    },
    '&:nth-child(2n+0)': {
      marginRight: 0,
    },
    '&:nth-child(2n+1)': {
      marginLeft: 0,
    },
    '& button': {
      width: '100%',
      maxWidth: 'unset',
      height: 50,
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      wordBreak: 'break-word',
      lineHeight: '125%'
    },
  },
  fullWidth: {
    width: '100%',
    marginRight: 0,
    marginLeft: 0
  },
  choiceButton: {
    '& button': {
      height: 90
    }
  },
  booleanButton: {
    '& button': {
      height: 180
    }
  },
  iconButton: {
    '& button': {
      height: 180
    }
  },
  criteriaContainerMultiple: {
    marginBottom: 75,
    '@media(min-height:600px)': {
      marginBottom: 100,
    },
  },
  nextButtonContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: theme.color.white,
    '@media(min-height:600px)': {
      paddingTop: 16,
      paddingBottom: 32,
    },
  },
  criteriaContainerText: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 50,
    '& div': {
      width: '100%'
    },
    '& input[Type="text"]': {
      height: 40,
      padding: '6px 16px',
      boxShadow: 'inset rgba(0, 0, 0, 0.35) 0px 0px 10px',
      '&:before': {
        border: 'none'
      }
    }
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
  criteria: {
    width: '90%',
    maxWidth: 600,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    textAlign: 'left'
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