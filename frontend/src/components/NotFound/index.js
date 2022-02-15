import React from 'react';
import { 
  Box,
  Button,
  Container,
  Link,
  Typography,
  makeStyles } from '@material-ui/core';
  import AppBar from '../../containers/AppBar';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingTop: '20vh',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  innerContainer: {
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '200%',
    paddingBottom: '2rem'
  },
  buttonContainer: {
    '& a': {
      width: '100%'
    }
  }
}))
  
const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar hasBackButton={false}/>
      <Container className={classes.mainContainer} maxWidth="sm">
        <Box className={classes.innerContainer}>
          <Typography component="h1" className={classes.title}>Oups.... <br/> Désolé, page non trouvée</Typography>
          <Box className={classes.buttonContainer}>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              href={"/"}
              align="center"
            >
              Retour à l'accueil
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default NotFound;