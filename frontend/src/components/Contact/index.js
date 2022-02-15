import React from 'react';
import { useHistory } from 'react-router-dom';
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
    }
  },
  innerContainer: {
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 600,
    padding: '2rem 0'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px 0',
    '& button': {
      width: '49%'
    }
  }
}))
  
const ContactForm = ({contact}) => {
  const classes = useStyles();
  const history = useHistory();
  
  const handleSubmit = () => {
    console.log('submit');    
  }
  
  const handleCancel = () => {
    history.goBack();    
  }
  
  return (
    <>
      <Container className={classes.mainContainer} maxWidth="sm">
        <Box className={classes.innerContainer}>
          <Typography component="h1" className={classes.title}>Contacter {contact.label}</Typography>
          <form>
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
  );
}

export default ContactForm;