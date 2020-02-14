import React from 'react';
import {Button, Grid, Typography, Stepper, Step, StepLabel } from '@material-ui/core/';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  overrides: {
    MuiStepper: {
      root: {
        background: 'none',
        border: 'none',
      },
    },
    MuiStepLabel: {
      label: {
          color: '#ffffff',
          '&$active': {
              color: '#ffffff',
              fontWeight: '0',
          },
      },
      iconContainer: {
        paddingRight: '12px',
      }
    },
    MuiStepIcon: {
      root: {
        color: '#ffffff',
        '&$active': {
          color: '#ffffff'
        }
      },
      text: {
        fill: "#5f82fe",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "2.5rem",
      }
    },
    MuiStepConnector: {
      lineVertical: {
        minHeight: "80px",
        borderLeftWidth: "3px",
      },
      line: {
        borderColor: '#ffffff'
      },
      vertical: {
        marginLeft: "18px",
        padding: "0 0 0px",
      }
    },
    MuiTypography: {
      body2: {
        fontSize: "1.5rem"
      }
    }
  },

});

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      // backgroundImage: 'rgb(32,210,255)',
      backgroundImage: 'linear-gradient(125deg, rgba(32,210,255,1) 0%, rgba(150,61,254,1) 100%)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
    content: {
      height: '100vh',
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
    start: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: 'white',
      color: 'rgb(91, 134, 253)',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: 'transparent !important',
      border: '1px solid white',
      color: 'white',
    },
    stepDiv: {
      width: '90%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    h1: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '50px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '80px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '80px',
        },
    },
    h2: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '30px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '30px',
        },
    },
}));

export default function SignInSide() {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width:600px)');

    return (
        <Grid container component="main" className={`${classes.content}`} alignItems="center" justify="center">
            <Grid item xs={12} sm={6} style={{color: "white", textAlign: mobile ? "center" : "left"}}>
                <Typography className={classes.h1} variant="h1"  gutterBottom>
                    Mattie App
                </Typography>
                <Typography className={classes.h2} variant="h2" paragraph>
                    Met Mattie heb jij de regie over je eigen leerweg.
                    <br/>
                    Kies je vakken en maak huiswerk wanneer je wilt.
                </Typography>

                <Grid container>
                  <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                      <Button variant='contained' color="contained" className={classes.start} href="/register">
                          Start nu
                      </Button>
                  </Grid>

                  <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                      <Button type="submit" variant='contained' className={classes.submit} href="/signin">
                          Ik heb al een account
                      </Button>
                  </Grid>
                </Grid>
            </Grid>

            <Grid item xs={9} sm={7} md={2} lg={3} xl={4}>
                <ThemeProvider theme={theme}>
                  <Stepper orientation="vertical" className={classes.MuiPaper}>
                    <Step>
                        <StepLabel>Planning opstellen</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Doelwitten behalen</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Versterken</StepLabel>
                    </Step>
                  </Stepper>
                </ThemeProvider>
            </Grid>
        </Grid>
    )
}
