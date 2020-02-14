import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {Button, Card, CardActions, CardHeader, Grid, ListItem, ListItemText, Container} from '@material-ui/core/';
import routes1 from "./Routes1.js";
import { Redirect } from 'react-router';
import Login2 from "./Login2";
import Routes from "./Login/Routes";

import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import 'firebase/database';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      height: '100vh',
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
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  linkButton: {
    color: 'rgb(91, 134, 253)',
    margin: theme.spacing(2, 0, 2),
    border: '1px solid rgb(91, 134, 253)',
    borderRadius: '5px',
    textAlign: 'center',
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    color: 'white',
  },
  headerCarten: {
    display: 'inherit',
  },
  loginButton: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: 'rgb(91, 134, 253)',
    color: 'white',
    borderRadius: '5px',
    textAlign: 'center',
  },
  loginGoogleButton: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: '#efefef',
    borderRadius: '5px',
    textAlign: 'center',
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
  const user = firebase.auth().currentUser;
  const [isLoggedIn, setLoggedIn] = useState(false);

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
      <div>
        {(() => {
          if (user ? user.Y.W === 'DeUOkW1weFdz7cEx6Bwtfxq1WNe2': "") {
            return (
                  <Redirect push to="/homeworklist"></Redirect>
            )
          } else if (user ? user.Y.W !== 'DeUOkW1weFdz7cEx6Bwtfxq1WNe2': "") {
            return (
                <Redirect push to="/ReceiveExperiencePoints"></Redirect>
            )
          }
        })()}
      </div>
  );
}

if (!isLoggedIn) {
  return  (
  <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
    <div className="App">
      <Container maxWidth="md" component="main">
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">

            <Grid item xs={12} sm={6} md={6}>

              <Card style={{padding: '30px'}}>
                <CardHeader
                    title={'Online'}
                    subheader={'Log in om door te gaan!'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardActions className={classes.headerCarten}>
                  <Router>
                  <form className={classes.form} noValidate>

                    <Login2></Login2>

                    <Grid item xs={12}>

                      {/* <div style={{display: 'inline-block', width: '100%'}}>
                        <Button type="submit" variant="contained" className={classes.linkButton} href="/register">
                            Ik heb nog geen account
                        </Button>
                      </div> */}

                      <ListItem button type="submit" component="button" href="/register" className={classes.linkButton}>
                          <ListItemText primary={"Ik heb nog geen account"} />
                      </ListItem>

                    </Grid>

                    {/*<FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Onthoud mij"
                    />*/}

                  </form>
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
