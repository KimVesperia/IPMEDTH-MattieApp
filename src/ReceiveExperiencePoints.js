import React from "react";
import { Container, Grid, Button, Paper, Stepper, Step, StepLabel, Typography} from '@material-ui/core/';
import {withRouter, Link} from 'react-router-dom';
import * as firebase from "firebase";
import { withStyles } from "@material-ui/core/styles";
import 'firebase/database';

const styles = theme => ({
  '@global': {
      body: {
          backgroundColor: "#fafafa",
      },
      ul: {
          margin: 0,
          padding: 0,
      },
      li: {
          listStyle: 'none',
      },
  },
  heroContent: {
      padding: theme.spacing(8, 0, 6),
  },
  pos: {
      marginBottom: 12,
  },
  avatar: {
      backgroundColor: '#ababab',
  },
  paper: {
      padding: 16,
      textAlign: 'center',
  },
});

var i = 0;

class ReceiveExperiencePoints extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          name: [],
          courses: [],
      };
    }

    getUserProfile = () => {
      const user = firebase.auth();
      const ref = firebase.database().ref('/users/' + user.W + '/persoonsgegevens/' + 'naam');
      ref.on("value", snapshot => {
        const state = snapshot.val();
        while(i < 5) {
          this.setState({name: state}, function () {
              return this.state.name;
          });
          i++;
          break;
        }
      });
    };

    getUserCourses = () => {
      const user = firebase.auth();
      const ref = firebase.database().ref('/users/' + user.W + '/vakken');
      ref.on("value", snapshot => {
        const state = snapshot.val();
        while(i < 10) {
          this.setState({courses: state}, function () {
              return this.state.courses;
          });
          i++;
          break;
        }
      });
    };

    render() {
      this.getUserProfile();
      this.getUserCourses();
      const listProfile = this.state.name;
      const listCourses = this.state.courses;

      const { classes } = this.props;

      return (
              <Container maxWidth="sm" component="main" className={classes.heroContent}>

                <Typography variant="h2" align="center" gutterBottom>
                      Welkom bij Mattie
                </Typography>

                    {(() => {
                      if (!listProfile && !listCourses) {
                        return (
                          <div>
                            <Stepper activeStep={2} nonLinear alternativeLabel style={{backgroundColor: "#fafafa"}}>
                                <Step >
                                    <StepLabel>Profiel opgesteld</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Leerplan samenstellen</StepLabel>
                                </Step>
                            </Stepper>

                            {/* Paper 1: Start */}
                            <Paper className={classes.paper}>

                                <Grid container spacing={0} alignItems="center" justify="center">
                                  <Grid item xs={9}>
                                    <Typography variant="h6"> Jouw eerste stappen tot succes! </Typography>
                                    <Typography> Je hebt je geregistreerd en bent klaar om je leerplan en profiel samen te stellen. </Typography>
                                    <br></br>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={2} alignItems="center" justify="center">
                                  <Grid item xs={6}>
                                      <Link to="/profile">
                                        <Button variant="contained" color="primary">
                                            Profiel Samenstellen
                                        </Button>
                                      </Link>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <Link to="/curriculum">
                                      <Button variant="contained" color="primary">
                                          Leerplan Samenstellen
                                      </Button>
                                    </Link>
                                  </Grid>

                                </Grid>

                            </Paper>
                          </div>
                        )
                      }
                      else if (listProfile && !listCourses) {
                        return (
                          <div>
                            <Stepper activeStep={0} nonLinear alternativeLabel style={{backgroundColor: "#fafafa"}}>
                                <Step >
                                    <StepLabel completed>Profiel opgesteld</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Leerplan samenstellen</StepLabel>
                                </Step>
                            </Stepper>
                            {/* Paper 2: Profiel = samengesteld */}
                            <Paper className={classes.paper}>

                              <Grid container spacing={0} alignItems="center" justify="center">
                                  <Grid item xs={9}>
                                    <Typography variant="h6"> Goed gedaan, {listProfile}! </Typography>
                                    <Typography> Je profiel is samengesteld. Verdien meer XP door ook je leerplan samen te stellen. </Typography>
                                    <br></br>
                                  </Grid>
                              </Grid>

                              <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item xs={6}>
                                    <Link to="/curriculum">
                                      <Button variant="contained" color="primary">
                                          Leerplan Samenstellen
                                      </Button>
                                    </Link>
                                </Grid>
                              </Grid>
                            </Paper>
                          </div>
                        )
                      }
                      else if (listProfile && listCourses) {
                        return (
                          <div>
                            <Stepper activeStep={2} nonLinear alternativeLabel style={{backgroundColor: "#fafafa"}}>
                                <Step >
                                    <StepLabel completed>Profiel opgesteld</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel completed>Leerplan samenstellen</StepLabel>
                                </Step>
                            </Stepper>
                            {/* Paper 3: Alles voltooid */}
                            <Paper className={classes.paper}>
                                <Grid container spacing={0} alignItems="center" justify="center">
                                  <Grid item xs={8}>
                                    <Typography variant="h6"> Goed gedaan, {listProfile}!</Typography>
                                    <Typography> Je profiel en leerplan zijn beiden samengesteld.</Typography>
                                    <br></br>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={2} alignItems="center" justify="center">
                                  <Grid item xs={6}>
                                      <Typography variant="subtitle1" gutterBottom>
                                        Heb je al het huiswerk gemaakt?
                                      </Typography>
                                      <Link to="/homework">
                                        <Button variant="contained" color="primary">
                                            Huiswerk Overzicht
                                        </Button>
                                      </Link>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <Typography variant="subtitle1" gutterBottom>
                                      Staan er nog vakken open?
                                    </Typography>
                                    <Link to="/curriculum">
                                      <Button variant="contained" color="primary">
                                        Vakken Overzicht
                                      </Button>
                                    </Link>
                                  </Grid>

                                </Grid>

                            </Paper>
                          </div>
                        )
                      }
                      else if (!listProfile && listCourses) {
                        return (
                          <div>
                            <Stepper activeStep={1} nonLinear alternativeLabel style={{backgroundColor: "#fafafa"}}>
                                <Step >
                                    <StepLabel >Profiel opgesteld</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel completed>Leerplan samenstellen</StepLabel>
                                </Step>
                            </Stepper>
                            {/* Paper 4: Leerplan = samengesteld */}
                            <Paper className={classes.paper}>

                              <Grid container spacing={0} alignItems="center" justify="center">
                                  <Grid item xs={9}>
                                    <Typography variant="h6">Je hebt je leerplan samengesteld, goed gedaan! </Typography>
                                    <Typography> Verdien meer XP door ook je profiel samen te stellen. </Typography>
                                    <br></br>
                                  </Grid>
                              </Grid>

                              <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item xs={6}>
                                    <Link to="/profile">
                                      <Button variant="contained" color="primary">
                                          Profiel Samenstellen
                                      </Button>
                                    </Link>
                                </Grid>
                              </Grid>

                            </Paper>
                          </div>
                        )
                      }
                    })()}

              </Container>
            )


  }
}

export default withStyles(styles, { withTheme: true })(withRouter(ReceiveExperiencePoints));
