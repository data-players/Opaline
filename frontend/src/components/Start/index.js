import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (orientation:portrait)': {
      maxWidth: 600
    }
  },
  innerContainer: {
    minHeight: '100vh',
    width: '100%',
    maxHeight: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    '@media (min-height:600px)': {
      minHeight: 600
    }
  },
  logoContainer: {
    paddingTop: '4%',
    height: '10%'
  },
  titleContainer: {
    color: theme.primary,
    height: '30%'
  },
  subTitleContainer: {
    height: '50%'
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
    paddingBottom: '4%'
  }
}))

const Start = () => {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer} maxWidth="sm">
      <Box className={classes.innerContainer}>
        <Box className={classes.logoContainer}>
          <Typography component="p" variant="h4">Collectif Emploi</Typography>
        </Box>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h1">Bienvenue sur <br/> Opaline</Typography>
        </Box>
        <Box className={classes.subTitleContainer}>
          <Typography component="h2" variant="h2">Accélérer votre retour <br/><strong>à l'emploi !</strong></Typography>
        </Box>
        <Box className={classes.buttonContainer}>
          <Button color="secondary" variant="contained" href="/recherche" align="center">Commencer</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Start;