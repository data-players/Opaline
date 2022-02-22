import * as React from 'react';
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Drawer from './components/Drawer';

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    backgroundColor: theme.color.white + ' !important',
    position: 'fixed',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0
  },
  appBar: {
    backgroundColor: 'transparent !important',
    color: theme.color.secondary + ' !important',
    boxShadow: 'none !important',
  },
  goBackButtonContainer: {
    paddingLeft: '0px !important',
    justifyContent: 'flex-start !important'
  }
}))


function GoBack({searchIndex, goToSearchField}) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const handleGoBackClick = () => {
    if ( ! searchIndex || searchIndex <= 0 || ! location.pathname.startsWith('/recherche')) {
      history.goBack()
    } else {
      goToSearchField(searchIndex - 1)
    }
  }
  return (
    <BrowserRouter>
      <Button color="inherit" onClick={handleGoBackClick}>
        <ArrowBackIcon/>
      </Button>
    </BrowserRouter>
  );
}

export default function AppBar({
  hasBackButton=true,
  message,
  searchIndex,
  goToSearchField,
  openContactForm,
  setMessage
}) {
  const classes = useStyles();
  const handleClick = () => {
    setMessage('')
  }
  return (
    <Container
      maxWidth="sm"
      className={classes.appBarContainer}
      onClick={handleClick}
    >
      <MuiAppBar position="static" className={classes.appBar}>
        <Stack  
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <Box className={classes.goBackButtonContainer}>
            { hasBackButton &&
              <GoBack 
                className={classes.goBackButtonContainer}
                searchIndex={searchIndex}
                goToSearchField={goToSearchField}
              />
            }
          </Box>
          <Drawer openContactForm={openContactForm} />
        </Stack>
      </MuiAppBar>
    </Container>
  );
}