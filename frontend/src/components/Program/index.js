import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { 
  Box,
  Button,
  Container,
  Typography,
  makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ReactMarkdown from 'react-markdown';
import AppBar from '../../containers/AppBar';
import Loading from '../Loading';
import PhoneDialog from './components/PhoneDialog';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header,
    paddingTop: 24
  },
  imageContainer: {
    zIndex: 9999,
    height: theme.margin.header,
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    '& img': {
      height: '100%'
    }
  },
  title: {
    fontSize: '125%',
    color: theme.color.primary,
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      fontSize: '150%'
    },
  },
  description: {
    '& p *': {
      color: theme.color.black
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '125%'
    },
  },
  contactContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: theme.color.white,
    '@media(min-height:600px)': {
      paddingTop: 16,
      paddingBottom: 32,
    },
    '& button, a': {
      fontSize: 12,
      lineHeight: '110%',
      textTransform: 'uppercase',
      textAlign: 'center',
      height: 54,
      [theme.breakpoints.up(400)]: {
        height: 64
      },
      '&.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.26) !important',
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.12) !important'
      }
    }
  },
  contactTitle: {
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  contactStack: {
    [theme.breakpoints.up(400)]: {
      justifyContent: 'flex-start !important'
    }
  },
  iconButton: {
    minWidth: 54,
    width: 54,
    borderRadius: '50%',
    [theme.breakpoints.up(400)]: {
      minWidth: 64,
      width: 64
    }
  },
  webSiteButton: {
    minWidth: 54,
    width: 54,
    borderRadius: '50%',
    [theme.breakpoints.up(400)]: {
      minWidth: 64,
      width: 64
    }
  },
  addressButton: {
    minWidth: 'unset',
    maxWidth: 140,
    borderRadius: 40
  }
}))

const Program = ({ loading, program, structure, loadData, openContactForm }) => {
  const classes = useStyles();
  
  useEffect( () => { 
    loadData('programs');
    loadData('structures');
  }, [])
  
  const [phoneDialogOpen, setPhoneDialogOpen] = React.useState(false);
  const handlePhoneClick = () => {
    setPhoneDialogOpen(true);
  };
  const handlePhoneDialogClose = (value) => {
    setPhoneDialogOpen(false);
  };
  const handleEmailClick = (contact) => {
    openContactForm(contact);
  };
  
  let location = null;
  if (structure) {
    location = structure["pair:hasLocation"];
  }
  
  return (
    <>
      { loading &&
        <Loading message={"Chargement..."} />
      }
      { ! loading &&
        <>
          { ! program && 
            <Redirect to="/404" />
          }
          { program &&
            <>
              <AppBar/>
              <Container className={classes.mainContainer} maxWidth="sm">
                <Box className={classes.imageContainer}>
                  { structure["pair:depictedBy"] &&
                    <img src={structure["pair:depictedBy"]} alt={`logo ${structure.label}`} />
                  }
                </Box>
                <Typography component="h1" className={classes.title}>
                  {program.label}
                </Typography>
                <Typography component="div" className={classes.description}>
                  <ReactMarkdown children={program["pair:description"]} />
                </Typography>
                <Container className={classes.contactContainer} maxWidth="sm">
                  <Typography component="h2" className={classes.contactTitle}>
                    Prendre contact
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" spacing={{ xs: 1, sm: 2 }} className={classes.contactStack}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      aria-label="phone" 
                      className={classes.iconButton}  
                      onClick={handlePhoneClick}
                      disabled={structure["pair:phone"] ? false : true}
                    >
                      <PhoneIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-label="e-mail"
                      className={classes.iconButton}
                      component={Link}
                      to={'/Contact'}
                      onClick={() => handleEmailClick([{
                        Email: structure["pair:e-mail"],
                        Name: structure.label
                      }])}
                      disabled={structure["pair:e-mail"] ? false : true}
                    >
                      <MailOutlineIcon />
                    </Button>
                    <Button 
                      variant="contained"
                      color="primary"
                      className={classes.webSiteButton}
                      href={structure["pair:webPage"]}
                      target="_blank"
                      disabled={structure["pair:webPage"] ? false : true}
                    >
                      site web
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.addressButton}
                      href={`https://maps.google.com/?q="${location["pair:label"]}&ll=${location["pair:latitude"]},${location["pair:longitude"]}&z=12"`}
                      target="_blank"
                      disabled={(location && location["pair:hasPostalAddress"]) ? false : true}
                    >
                      
                      voir l'adresse
                    </Button>
                  </Stack>
                </Container>
                { structure["pair:phone"] &&
                  <PhoneDialog
                    phone={structure["pair:phone"]}
                    open={phoneDialogOpen}
                    handleClose={handlePhoneDialogClose}
                  />
                }
              </Container>
            </>
          }
        </>
      }
    </>
  );
}

export default Program;