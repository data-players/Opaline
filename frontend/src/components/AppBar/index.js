import * as React from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Drawer from '../Drawer';

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
    color: theme.color.black + ' !important',
    boxShadow: 'none !important',
  },
  goBackButton: {
    paddingLeft: '0px !important',
    justifyContent: 'flex-start !important'
  }
}))


function GoBack({searchIndex, goToSearchField}) {
  const history = useHistory();
  const classes = useStyles();
  const handleGoBackClick = () => {
    if ( ! searchIndex || searchIndex === 0 ) {
      history.goBack()
    } else {
      goToSearchField(searchIndex - 1)
    }
  }
  return (
    <BrowserRouter>
      <Button color="inherit" className={classes.goBackButton} onClick={handleGoBackClick}>
        <ArrowBackIcon/>
      </Button>
    </BrowserRouter>
  );
}

export default function AppBar({logo, searchIndex, goToSearchField}) {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.appBarContainer}>
      <MuiAppBar position="static" className={classes.appBar}>
        <Stack  
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <Box>
            <GoBack searchIndex={searchIndex} goToSearchField={goToSearchField} />
          </Box>
          { logo &&
            <Typography variant="h6" component="div">
              Logo
            </Typography>
          }
          <Drawer/>
        </Stack>
      </MuiAppBar>
    </Container>
  );
}