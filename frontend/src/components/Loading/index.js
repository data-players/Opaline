import React from 'react';
import { Box, Container, Slide, makeStyles } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import SanitizedHTML from '../SanitizedHTML';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    zIndex: 99999,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
    overflow: 'hidden',
    '& .MuiCircularProgress-root': {
      color: theme.color.white
    }
  },
  slide: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.color.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: theme.color.white,
    fontSize: 22,
    textAlign: 'center'
  }
}));

const Loading = ({ message }) => {
  const classes = useStyles();
  return (
    
    <Box className={classes.mainContainer}>
      <Slide className={classes.slide} in={true} timeout={500} mountOnEnter direction="up">
        <Box>
          <SanitizedHTML text={message} />
          <br />
          <CircularProgress />
        </Box>
      </Slide>
    </Box>
  )
}

export default Loading;