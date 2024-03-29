import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {  Box, Container, Typography, makeStyles } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import AppBar from '../../containers/AppBar';
import Loading from '../Loading';
import { getSlugFromContainerUrl } from '../../selectors/urls';

import { SocialIcon } from 'react-social-icons';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header,
    paddingTop: 24
  },
  listItem: {
    padding: '8px 0px 16px !important',
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
  cardContainer: {
    width: '100%',
    borderRadius: '20px !important',
    '& .MuiCardContent-root': {
      padding: '16px !important'
    }
  },
  title: {
    fontSize: 32,
    lineHeight: '125%',
    [theme.breakpoints.up('sm')]: {
      fontSize: 40
    },
  },
  subtitle: {
    paddingTop: '4rem',
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      fontSize: 18
    },
  },
  description: {
    paddingTop: '4rem',
    fontSize: 14,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18
    },
  },
  programTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    color: theme.color.primary,
    fontSize: '16px !important',
    fontWeight: '600 !important',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  infos: {
    marginTop: -16,
    color: theme.color.grey75,
    fontSize: '12px !important'
  }
}))

const Structure = ({ loading, programs, structure, loadData }) => {
  const classes = useStyles();

  useEffect( () => {
    loadData('configurations');
    loadData('programs');
    loadData('structures');
  }, [])
  // console.log('structure',structure);
  structure['opal:socialNetworks']=structure['opal:socialNetworks']?Array.isArray(structure['opal:socialNetworks'])?structure['opal:socialNetworks']:[structure['opal:socialNetworks']]:undefined
  return (
    <>
      { loading &&
        <Loading message={"Chargement..."} />
      }
      { ! loading &&
        <>
          { ! structure &&
            <Redirect to="/404" />
          }
          { structure &&
            <>
              <AppBar/>
              <Container className={classes.mainContainer} maxWidth="sm">
                <Box className={classes.imageContainer}>
                  { structure["pair:depictedBy"] &&
                    <img src={structure["pair:depictedBy"]} style="object-fit: contain" alt={`logo ${structure.label}`} />
                  }
                </Box>
                <Typography component="h1" className={classes.title}>
                  {structure.label}
                </Typography>
                <Typography component="h3" className={classes.desription}>
                  {structure['pair:description']}
                </Typography>
                <List sx={{
                      display: 'flex',
                  }}
                >
                  {  structure['opal:socialNetworks']&&structure['opal:socialNetworks'].map(item => <ListItem sx={{
                        width: 'auto',
                    }}
                    >
                      <SocialIcon url={item}/>
                    </ListItem>) }
                </List>
                <Typography component="h2" className={classes.subtitle}>
                  Les programmes d'accompagnement
                </Typography>
                <List>
                  { programs.map((program, index) => (
                    <ListItem
                      button key={index}
                      component={Link}
                      to={`/programmes/${getSlugFromContainerUrl(program.id)}`}
                      className={classes.listItem}
                    >
                      <Card sx={{ minWidth: 275 }} className={classes.cardContainer}>
                        <CardContent>
                          <Grid container spacing={1}>
                            <Grid item xs={10}>
                              <Typography component="h3" className={classes.programTitle}>
                                {program.label}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Box className={classes.infosContainer}>
                                <Typography component="div" className={classes.infos}>
                                  <Box>{program['opal:financialParticipation'] ? "Payant" : "Gratuit"}</Box>
                                  <Box>{program['opal:duration']}</Box>
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </Container>
            </>
          }
        </>
      }
    </>
  );
}

export default Structure;
