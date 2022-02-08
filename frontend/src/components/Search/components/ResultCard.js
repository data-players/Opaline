import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    height: 64,
    textAlign: 'center',
    '& img': {
      height: '100%'
    }
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%'
  },
  resultTitle: {
    color: theme.color.primary,
    fontSize: '18px !important',
    fontWeight: '600 !important',
    textAlign: 'center',
  },
  button: {
    maxWidth: 600,
    borderRadius: '20px !important'
  }
}));

export default function ResultCard( {label, id}) {
  const classes = useStyles();
  return (
    <Card sx={{ minWidth: 275 }} className={classes.mainContainer}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4} container={true} className={classes.flexCenter}>
            <Box className={classes.imageContainer}>
              <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt={`logo ${label}`} />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box className={classes.textContainer}>
              <Typography component="h3" className={classes.resultTitle}>
                {label}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.flexCenter}>
        <Button size="small" variant="contained" color="primary" className={classes.button}>
          En savoir plus
        </Button>
      </CardActions>
    </Card>
  );
}