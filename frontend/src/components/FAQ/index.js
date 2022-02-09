import React, { useEffect } from 'react';
import { 
  Box,
  Container,
  Typography,
  makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ReactMarkdown from 'react-markdown';
import AppBar from '../AppBar';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header,
    paddingTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 600
  },
  listItem: {
    display: 'block !important'
  },
  itemTitle: {
    fontWeight: 600
  },
}))

const FAQ = ( { faq, loading, loadFAQ } ) => {
  const classes = useStyles();
  
  useEffect( () => { 
    loadFAQ()
  }, [])
  
  return (
    <>
      { loading &&
        <div className="loading">
          Chargement, veuillez patienter...
        </div>
      }
      { ! loading &&
        <>
          <AppBar/>
          <Container className={classes.mainContainer} maxWidth="sm">
            <Typography component="h1" className={classes.title}>FAQ</Typography>
            <List className={classes.list}>
              { faq.map((question, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <Typography component="h2" className={classes.itemTitle}>{question.label}</Typography>
                  <Typography component="div" className={classes.description}>
                    <ReactMarkdown children={question.description} />
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Container>
        </>
      }
    </>
  );
}

export default FAQ;