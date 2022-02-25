import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header,
    padding: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '1rem',
    }
  },
  stepTitle: {
    marginBottom: '1rem',
    '@media(min-height:500px)': {
      marginBottom: '2rem'
    },
    textAlign: 'left'
  },
  instructions: {
    marginTop: '-1.8rem',
    marginBottom: '1.8rem',
    fontSize: '85%'
  },
  '@keyframes slide_up': {
    'from': { 
      marginTop: 0,
      marginBottom: 0,
      opacity: 0,
      maxHeight: 0,
    },
    'to': {
      marginTop: '-1.8rem',
      marginBottom: '1.8rem',
      opacity: 1,
      maxHeight: '1.8rem',
    }
  },
  message: {
    marginTop: '-1.8rem',
    marginBottom: '1.8rem',
    fontSize: '85%',
    color: theme.color.secondary,
    fontWeight: 600,
    animation: '$slide_up 1s ease'
  },
  stepSubtitle: {
    fontSize: '75%'
  },
  criteriaContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '@media(min-height:500px)': {
      justifyContent: 'space-between',
    },
    alignItems: 'center'
  },
  criteriaButtonContainer: {
    width: 'calc(25% - 1rem)',
    margin: '.5rem',
    padding: 0,
    '@media(min-height:500px)': {
      width: 'calc(50% - .5rem)',
      [theme.breakpoints.up('sm')]: {
        width: 'calc(50% - 1rem)',
        margin: '1rem',
      }
    },
    '&:nth-child(2n+0)': {
      '@media(min-height:500px)': {
        marginRight: 0
      }
    },
    '&:nth-child(2n+1)': {
      '@media(min-height:500px)': {
        marginLeft: 0
      }
    },
    '& button': {
      width: '100%',
      maxWidth: 'unset',
      height: 50,
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      wordBreak: 'break-word',
      lineHeight: '125%'
    }
  },
  selectedValue: {
    '& button': {
      backgroundColor: theme.color.secondaryLight,
      boxShadow: 'inset rgba(0, 0, 0, 0.24) 0px 3px 8px',
    }
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
      height: 120,
      '@media(min-height:660px)': {
        height: 160
      },
    }
  },
  iconButton: {
    '& button': {
      height: 120,
      '@media(min-height:660px)': {
        height: 160
      },
      '& .MuiButton-label': {
        display: 'flex',
        flexDirection: 'column',
        '& .MuiSvgIcon-root': {
          height: 32,
          width: 32,
          '@media(min-height:660px)': {
            height: 64,
            width: 64
          },
        }
      }
    }
  },
  criteriaContainerMultiple: {
    marginBottom: 75,
    '@media(min-height:600px)': {
      marginBottom: 100,
    },
    '& ul': {
      padding: 0,
      '& .MuiListItemIcon-root': {
        minWidth: 32
      },
      '& .MuiTypography-root': {
        fontSize: 16,
        fontWeight: 600
      }
    }
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
  resultListItem: {
    paddingBottom: '2rem !important'
  }
}));

export default useStyles;