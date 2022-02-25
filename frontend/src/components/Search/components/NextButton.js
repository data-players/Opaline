import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    }
  }
}));

const NextButton = ({ field, value, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.nextButtonContainer}>
      <Button 
        variant="contained" 
        color="secondary"
        onClick={()=>onClick(field, value)}
      >
        Suivant
      </Button>
    </Box>
  )
}

export default NextButton;