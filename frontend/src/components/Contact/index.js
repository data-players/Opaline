import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { 
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Link,
  TextField,
  Typography,
  makeStyles } from '@material-ui/core';
import AppBar from '../AppBar';
import Loading from '../Loading';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    '& input, & textarea': {
      backgroundColor: theme.color.primaryLight,
      borderRadius: 20,
      padding: '18.5px 14px'
    },
    '& .MuiFormControl-root': {
      marginBottom: '1rem'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent !important',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: 0
    },
    ' & .MuiFormLabel-root': {
      position: 'static',
      transform: 'none',
      paddingBottom: 8,
      paddingLeft: 16,
      fontWeight: 600,
      fontSize: 16
    }
  },
  innerContainer: {
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 800,
    padding: '2rem 1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px 0',
    '& button': {
      width: '48%',
      textTransform: 'uppercase'
    }
  }
}))
  
const ContactForm = ({contact}) => {
  const classes = useStyles();
  const history = useHistory();
  const [emailSent, setEmailSent] = React.useState(false);
  
  const handleSubmit = (evt) => {
    evt.preventDefault();    
    setEmailSent(true);
    setTimeout(()=>{
      history.push('/')
    },3000);
  }
  
  const handleCancel = () => {
    history.goBack();
  }
  
  return (
    <>
      { ! contact.emails && 
        <Redirect to="/" />
      }
      { emailSent &&
       <Loading message={'Mail envoyé !'} />
      }
      { contact && ! emailSent &&
        <>
          <Container className={classes.mainContainer} maxWidth="sm">
            <Box className={classes.innerContainer}>
              <Typography component="h1" className={classes.title}>Contacter {contact.label}</Typography>
              <form onSubmit={handleSubmit}>
                <TextField id="name" label="Votre nom (obligatoire)" variant="outlined" required fullWidth />
                <TextField id="email" label="Votre email (obligatoire)" variant="outlined" required fullWidth />
                <TextField id="subject" label="Sujet" variant="outlined" fullWidth />
                <TextField id="message" variant="outlined" multiline rows={4} fullWidth />
                <Box className={classes.buttonContainer}>
                  <Button
                    color="default"
                    variant="contained"
                    align="center"
                    onClick={handleCancel}
                  >
                    Annuler
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    align="center"
                    type="submit"
                  >
                    Envoyer
                  </Button>
                </Box>
              </form>
            </Box>
          </Container>
        </>
      }
    </>
  );
}

export default ContactForm;