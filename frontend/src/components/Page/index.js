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
import AppBar from '../../containers/AppBar';
import Loading from '../Loading';

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

const Page = ( { page, loading, loadPage } ) => {
  const classes = useStyles();

  console.log('Page',page);
  useEffect( () => {
    loadPage()
  }, [])

  return (
    <>
      { loading &&
        <Loading message={"Chargement..."} />
      }
      { ! loading && page  &&
        <>
          <AppBar/>
          <Container className={classes.mainContainer} maxWidth="sm">
            <Typography component="h1" className={classes.title}></Typography>
            <List className={classes.list}>
              { page.map((page, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <Typography component="h2" className={classes.itemTitle}>{page['semapps:title']}</Typography>
                  <Typography component="div" className={classes.description}>
                    <ReactMarkdown children={page['semapps:content']} />
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

export default Page;
