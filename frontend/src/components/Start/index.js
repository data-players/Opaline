import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    border: '1px solid lightgrey',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-root': {
      lineHeight: '80%',
      [theme.breakpoints.up('sm')]: {
        lineHeight: '100%',
      },
      '& span': {
        fontSize: '80%',
        [theme.breakpoints.up('sm')]: {
          fontSize: '100%',
        },
      }
    },
    '@media (orientation:portrait)': {
      maxWidth: 600
    }
  },
  innerContainer: {
    minHeight: '100vh',
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
    height: '30%'
  },
  subTitleContainer: {
    height: '50%'
  },
  buttonContainer: {
    height: '10%',
    paddingBottom: '4%'
  }
}))

const Start = () => {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer} maxWidth="md">
      <Box className={classes.innerContainer}>
        <Box className={classes.logoContainer}>
          <Typography component="p" variant="h4"><span>Collectif Emploi</span></Typography>
        </Box>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h2"><span>Bienvenue sur Opaline</span></Typography>
        </Box>
        <Box className={classes.subTitleContainer}>
          <Typography component="h2" variant="h3"><span>Accélérer votre retour à l'emploi !</span></Typography>
        </Box>
        <Box className={classes.buttonContainer}>
          <Button variant="contained" href="/recherche" align="center">Commencer</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Start;