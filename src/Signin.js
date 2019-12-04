import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import {Button, Card, CardActions, CardContent, CardHeader, CssBaseline, Grid, Typography, Container, ListItem, ListItemIcon, ListItemText} from '@material-ui/core/';
import routes0 from "./Routes0.js";
import routes1 from "./Routes1.js";
import Header from "./Header";
import { Redirect } from 'react-router';
import StarIcon from '@material-ui/icons/StarBorder';
import Login from "./Login";
import Register from "./Register";

import protectedRoutes from './protectedRoutes'
import protectedRoutes2 from './protectedRoutes2'
import protectedRoutes3 from './protectedRoutes3'
import protectedRoutes4 from './protectedRoutes4'
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import ProtectedRouteHoc from './ProtectedRouteHoc'
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import 'firebase/database';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
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
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  headerCarten: {
    display: 'inherit',
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

export default function App() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const user = firebase.auth().currentUser;

  function readSession() {
    const user = window.sessionStorage.getItem(
			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
		);
		if (user) setLoggedIn(true)
  }

  useEffect(() => {
    readSession()
  }, [])

if (isLoggedIn) {
    // User is signed in.
    return (
      <Router>

        <Button href ="/recieveexperiencepoints">Test</Button>
      </Router>
  );
}

if (!isLoggedIn) {
  return  (
  <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
    Is logged in? {JSON.stringify(isLoggedIn)}
    <div className="App">


      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Inloggen of Registreren
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">

            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                    title={'Registreer'}
                    subheader={'Maak een account aan'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={ <StarIcon /> }
                    className={classes.cardHeader}
                />
                <CardActions className={classes.headerCarten}>
                  {/*<Button fullWidth variant='contained' color="primary" href="/experiencepoints"></Button>*/}
                  <Router>
                  <ListItem button component={Link} to="/register">
                    <ListItemText primary={"Registreer"} />
                  </ListItem>
                  <Switch>
                  {routes0.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                    />
                  ))}
                  </Switch>

                </Router>


                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                    title={'Inloggen'}
                    subheader={'Log in met je account'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={ <StarIcon /> }
                    className={classes.cardHeader}
                />

                <CardActions className={classes.headerCarten}>
                  {/*<Button fullWidth variant='contained' color="primary" href="/experiencepoints"></Button>*/}
                  <Router>
                  <ListItem button component={Link} to="/login">
                    <ListItemText primary={"Login"} />
                  </ListItem>

                  <Switch>
                  {routes1.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                    />
                  ))}
                  </Switch>

                </Router>


                </CardActions>
              </Card>
            </Grid>


        </Grid>
      </Container>
    </div>
  </AuthContext.Provider>);

}

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
