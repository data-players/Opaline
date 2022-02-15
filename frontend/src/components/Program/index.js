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
                  { structure.depictedBy &&
                    <img src={structure.depictedBy} alt={`logo ${structure.label}`} />
                  }
                </Box>
                <Typography component="h1" className={classes.title}>
                  {program.label}
                </Typography>
                <Typography component="div" className={classes.description}>
                  <ReactMarkdown children={program.description} />
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
                      onClick={() => handleEmailClick({
                        label: structure.label,
                        emails: structure["e-mail"]
                      })}
                    >
                      <MailOutlineIcon />
                    </Button>
                    <Button 
                      variant="contained"
                      color="primary"
                      className={classes.webSiteButton}
                      href={structure.webPage}
                      target="_blank"
                    >
                      site web
                    </Button>
                    <Button variant="contained" color="primary" className={classes.addressButton}>voir l'adresse</Button>
                  </Stack>
                </Container>
                <PhoneDialog
                  phone={structure.phone}
                  open={phoneDialogOpen}
                  handleClose={handlePhoneDialogClose}
                />
              </Container>
            </>
          }
        </>
      }
    </>
  );
}

export default Program;