import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(theme => ({
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    backgroundColor: theme.color.primary,
    '& .MuiListItemText-root .MuiTypography-root': {
      fontWeight: 600,
      color: theme.color.white
    }
  },
  titleContainer: {
    padding: '92px 16px 32px',
    textTransform: 'uppercase',
    '& .MuiTypography-root': {
      fontWeight: 600,
      color: theme.color.white
    }
  },
  closeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    color: theme.color.white,
    cursor: 'pointer'
  },
  menuIcon: {
    transform: 'translateX(12px)'
  }
}));

export default function Drawer({ openContactForm }) {
  
  const classes = useStyles();
  
  const anchor = 'left';
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const handleContactClick = (contact) => {
    openContactForm(contact);
  };

  const list = (anchor) => (
    <Box
      className={classes.drawerContainer}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CloseIcon className={classes.closeIcon} fontSize={'large'} />
      <Box className={classes.titleContainer}>
        <Typography component="h1" variant="h4">Opaline</Typography>
      </Box>
      <List>
        <ListItem button component={Link} to={'/'}>
          <ListItemText primary={'Nouvelle recherche'} />
        </ListItem>
        <ListItem button component={Link} to={'/FAQ'}>
          <ListItemText primary={'FAQ'} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={'/Contact'}
          onClick={() => handleContactClick([{
            Email: process.env.REACT_APP_CONTACT_EMAIL,
            Name: process.env.REACT_APP_CONTACT_LABEL
          }])}
        >
          <ListItemText primary={'Nous contacter'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
          <IconButton
            className={classes.menuIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
        <MuiDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </MuiDrawer>
      </React.Fragment>
    </div>
  );
}