import React from 'react';
import {Avatar, Button, CssBaseline, Paper, Grid, Typography, Stepper, Step, StepLabel } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiStepper: {
      root: {
        background: 'none',
        border: 'none',
      },
    },
  },
});

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: 'url("gradient.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    nav: {
      display: 'none',
    },
    header: {
      visibility: 'hidden',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
    MuiPaper:{
      backgroundColor: "transparant",
    },
    content: {
      height: '100vh',
    },
    background: {
      // backgroundImage: 'linear-gradient(70deg, #f59038  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, #FFFFFF 60%, #3f5cfc 60%);',
      // backgroundImage: 'linear-gradient(to right bottom, #3f5cfc, #8482ff, #b2aaff, #dad4ff, #ffffff)',
      backgroundImage: 'url("gradient.jpg")',
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
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: 'white',
      color: 'rgb(91, 134, 253)'
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
        <Grid container component="main" className={`${classes.content} ${classes.background}`} spacing={0} alignItems="center" justify="center">
            <CssBaseline />
            <Grid item xs={12} sm={6} md={6} >
            <div style={{color: 'white', marginLeft: '150px'}}>
                {/* <Avatar className={classes.avatar}>M</Avatar> */}
                <Typography variant="h2" gutterBottom>
                    Mattie App
                </Typography>
                <Typography variant="h5" paragraph>
                    Met Mattie heb jij de regie over je eigen leerproces.
                    Stel je curriculum samen en plan je leerdoelen in!
                </Typography>
                <Typography variant="body1" paragraph>
                    Vul jouw profiel in en claim jouw eerste beloning.
                </Typography>

                <Button type="submit" variant="contained" className={classes.submit} href="/signin">
                    Start nu
                </Button>
                </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} >

                <ThemeProvider theme={theme}>
                  <Stepper orientation="vertical" className={classes.MuiPaper}>
                    <Step>
                        <StepLabel>Planning opstellen</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Leerdoelen behalen</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Certificeren</StepLabel>
                    </Step>
                  </Stepper>
                </ThemeProvider>
                  {/* <img src={'smoken.png'} alt="image" /> */}
            </Grid>
        </Grid>
    )
}
