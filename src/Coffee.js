  
import React from 'react';
import {CssBaseline, Paper, Grid, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import mborijnland from './mborijnland.png';
import qr from './qr.png';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${mborijnland})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  stepDiv: {
    width: '90%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.content}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#fafafa"}}>
        <div className={classes.paper}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Coupon inwisselen
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                In de kantine zijn er verschillende vers belegde broodjes, salades, soepen, snacks en warme maaltijden.
                Geen tijd gehad om te ontbijten? Er is ook een verse yoghurt- en fruitbar. 
            </Typography>
            <Typography variant="body2" align="center" paragraph>
                Toon onderstaande code bij de kassa:
            </Typography>
            <img src={qr} alt="QR" height="200" width="200"/>
          </div>
      </Grid>
    </Grid>
  );
}