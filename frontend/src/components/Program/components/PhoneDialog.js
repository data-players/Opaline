import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiPaper-root': {
      borderRadius: 10
    }
  },
  mainContainer: {
    backgroundColor: theme.color.grey10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    maxHeight: 80,
    padding: '0 32px !important',
    whiteSpace: 'nowrap',
    color: theme.color.black,
    opacity: '.75',
    borderBottom: '2px solid ' +  theme.color.grey50
  },
  button: {
    height: 64,
    padding: '0 32px !important',
    padding: '8px !important',
    fontSize: '16px !important',
    color: theme.color.black + ' !important',
    opacity: '.75',
    textTransform: 'unset !important',
    borderRadius: '0 !important',
    '&:not(:last-child)': {
      borderRight: '2px solid ' +  theme.color.grey50
    }
  }
}));

export default function SimpleDialog({ handleClose, phone, open }) {
  const formatedPhone = phone.startsWith('+') ? phone : '+33' + phone.substring(1);
  const classes = useStyles();
  return (
    <Dialog onClose={handleClose} open={open} className={classes.dialog}>
      <Box className={classes.mainContainer}>
        <DialogTitle className={classes.title}>Appeler le {phone} ?</DialogTitle>
        <Stack direction="row">
          <Button className={classes.button} onClick={handleClose}>Annuler</Button>
          <Button className={classes.button} href={`tel:${formatedPhone}`}><strong>Appeler</strong></Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
