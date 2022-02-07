import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import AppBar from '../AppBar';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header
  },
}))

const Program = ({ program }) => {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer}>
      { ! program && 
        <Redirect to="/404" />
      }
      { program &&
        <>
          <AppBar/>
          <div>Programme : {program.label}</div>
        </>
      }
    </Container>
  );
}

export default Program;