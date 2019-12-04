import React , {useState, useContext} from 'react';
import {Grid, Card, Step, Stepper, StepLabel, CardActions, CardContent, Button, Typography, LinearProgress, Avatar, Badge, Box}  from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StarIcon from '@material-ui/icons/Star';
import * as firebase from "firebase";
import 'firebase/database';

// Graph
import { Chart } from "react-google-charts";

const StyledBadge1 = withStyles(theme => ({
    badge: {
      right: -4,
      padding: '0 5px',
    },
  }))(Badge);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // grijze achtergrond
        backgroundColor: '#fafafa',
    },
    card: {
        margin: 20,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    fixedHeight: {
        height: 240,
    },
}));

const dataLineGraph = [
    ["Maand", "Leerdoelen behaald"],
    ["januari", 0],
    ["februari", 1],
    ["maart", 2],
    ["april", 2],
    ["mei", 2],
    ["juni", 3],
    ["juli", 4]
];
const optionsLineGraph = {
    curveType: "function",
    legend: { position: "bottom" }
};
const dataCalendarGrapgh = [
    [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
    [new Date(2019, 1, 13), 1],
    [new Date(2019, 2, 14), 1],
    [new Date(2019, 3, 15), 2],
    [new Date(2019, 3, 16), 2],
    [new Date(2019, 7, 17), 3],
    [new Date(2019, 8, 17), 3],
    [new Date(2019, 11, 17), 4],
    [new Date(2019, 11, 17), 4],
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref('/users/' + user.uid);
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  render() {
    const { profile } = this.state;
    const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      return (
        <div >
          <Grid container>

            <Grid item xs={12} style={{ marginTop: 30, marginLeft: 20 }}>

              <Typography component="h4" variant="h5" color="primary" gutterBottom>
                Dashboard Hallo {user.email}
                {profile.map(user => (
                    <div className="card-body">
                      <h5 className="card-title">Hallo {user.name}!</h5>
                      <p className="card-text">Jouw roll is {user.role}!</p>
                    </div>
                ))}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Card >
                <CardContent>
                  <Grid item xs={12} md={12}>
                                        <Typography style={{fontSize: '1.2rem'}} component="h4" variant="h5" color="primary" gutterBottom>
                                            Beloningen
                                        </Typography>
                                        <div>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                <ListItemIcon>
                                                    <Box m={1}>
                                                        <StyledBadge1 badgeContent={'XP'} color="primary">
                                                            <Avatar style={{backgroundColor: '#3855f5'}}>100</Avatar>
                                                        </StyledBadge1>
                                                    </Box>
                                                </ListItemIcon>
                                                <ListItemText primary="Profiel opstellen" />
                                                </ListItem>
                                                <ListItem button>
                                                <ListItemIcon>
                                                    <Box m={1}>
                                                        <StyledBadge1 badgeContent={'XP'} color="primary">
                                                            <Avatar style={{backgroundColor: '#3855f5'}}>500</Avatar>
                                                        </StyledBadge1>
                                                    </Box>
                                                </ListItemIcon>
                                                <ListItemText  primary="Curriculum samenstellen" />
                                                </ListItem>
                                            </List>

                                         </div>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4} >
                            <Card >
                                <CardContent>
                                    <Typography style={{fontSize: '1.2rem'}} component="h4" variant="h5" color="primary" gutterBottom>
                                        Volgende stap
                                    </Typography>
                                    <Stepper activeStep={1} nonLinear alternativeLabel>
                                        <Step completed={true}>
                                            <StepLabel>Profiel opgesteld</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Curriculum samenstellen</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Leerdoelen inplannen</StepLabel>
                                        </Step>
                                    </Stepper>

                                    <CardActions>
                                        <Button size="small">Alle stappen</Button>
                                    </CardActions>

                                </CardContent>
                            </Card>
            </Grid>

            <Grid item xs={4}>
                            <Card >
                                <CardContent>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <Typography style={{fontSize: '1.2rem'}} component="h4" variant="h5" color="primary" gutterBottom>
                                            Voortgang
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <StarIcon style={{marginLeft: 280,fontSize: 30, color:'#3855f5' }}/>
                                    </Grid>
                                </Grid>

                                <Typography component="h2" style={{marginBottom:10, marginTop: 5}}>
                                Level 1 - 1000/1000 XP
                                </Typography>
                                <LinearProgress style={{color: 'white'}} variant="determinate" value={100} />

                                </CardContent>
                                {/* <CardActions>
                                    <Button style={{color: 'white'}} size="small">Naar profiel</Button>
                                </CardActions> */}
                            </Card>
            </Grid>

          </Grid>

          <Grid container>
                        <Grid item xs={12} sm={6} >
                                <Card >
                                    <CardContent>
                                        <Typography style={{fontSize: '1.2rem'}} component="h4" variant="h5" color="primary" gutterBottom>
                                            Vordering curriculum
                                        </Typography>
                                            <div className="App">
                                                <Chart
                                                chartType="LineChart"
                                                width="100%"
                                                height="250px"
                                                data={dataLineGraph}
                                                options={optionsLineGraph}
                                                />
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardContent>
                                        <Typography style={{fontSize: '1.2rem'}} component="h4" variant="h5" color="primary" gutterBottom>
                                            Jaarplanning
                                        </Typography>
                                        <div className="App">
                                            <Chart
                                            chartType="Calendar"
                                            width="99%"
                                            height="220px"
                                            data={dataCalendarGrapgh}
                                            />
                                        </div>
                                </CardContent>
                            </Card>
                        </Grid>
          </Grid>
        </div>
      );
    }

    if (!user) {
      return  (<Redirect push to="/signin" />);
    }
  }
}

export default App;
