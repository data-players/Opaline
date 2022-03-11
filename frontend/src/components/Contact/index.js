import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles } from '@material-ui/core';
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
  const [emailError, setEmailError] = React.useState(false);
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    const mailparams = {
      from: {
        Email: evt.target.email.value,
        Name: evt.target.name.value
      },
      to: contact,
      body: {
        subject: evt.target.subject.value,
        message: evt.target.message.value
      }
    }
    
    const result = await fetch(process.env.REACT_APP_MIDDLEWARE_URL + '_mailer/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mailparams)
    })
    .then(response => {
      if ( ! response.ok ) {
        console.log('Mailer error (1) : ', response);
        setEmailError(true);
      } else {
        setEmailSent(true);
      }
    })
    .catch(err => {
      console.error('Mailer error (2) : ', err);
      setEmailError(true);
    })
    
    setTimeout(()=>{
      history.push('/')
    },5000);
  }
  
  const handleCancel = () => {
    history.goBack();
  }
  
  return (
    <>
      { ! contact[0].Email && 
        <Redirect to="/" />
      }
      { emailError &&
       <Loading message={'Erreur lors de l\'envoi du message'} />
      }
      { ! emailError && emailSent &&
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
                <TextField id="message" label="Message" variant="outlined" multiline rows={4} fullWidth />
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