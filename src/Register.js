import React, { useState, useContext } from "react";
import { AuthContext } from "./Signin";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {Card, Button, TextField, CardActions, CardHeader, Grid, Typography, Container, ListItem, ListItemText} from '@material-ui/core/';
import routes1 from "./Routes1.js";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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

const Register = ({history}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const database = firebase.database();

  const handleForm = e => {
    e.preventDefault();

    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
          console.log(credential)
          history.push('/ReceiveExperiencePoints')
          if (credential.user) Auth.setLoggedIn(true);
          return firebase.database().ref('/users/' + credential.user.uid).set({
            email: credential.user.email,
            uid: credential.user.uid
          });
        })
        .catch(e => {
          setErrors(e.message);
        });
      })

  };

  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log(result)
          history.push('/ReceiveExperiencePoints')
          Auth.setLoggedIn(true)
        })
        .catch(e => setErrors(e.message))
      })

  }

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">

            <Grid item xs={12} sm={6} md={6}>

              <Card style={{padding: '30px'}}>
                <CardHeader
                    title={'Inschrijven'}
                    subheader={'Maak een account aan'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardActions className={classes.headerCarten}>
                  <Router>

                  <form onSubmit={e => handleForm(e)}>

                    <TextField
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      name="Email"
                      type="Email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      name="password"
                      type="password"
                      label="Wachtwoord"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />

                    <Grid item style={{textAlign:'center'}}>
                    {error
                    ?
                    <Alert severity="error" style={{fontSize: '0.9rem'}}>{error}</Alert>
                    :
                    <Typography></Typography>
                    }

                    </Grid>

                    <ListItem button type="submit" component="button" className={classes.loginButton}>
                      <ListItemText primary={"Inschrijven"} />
                    </ListItem>

                    <Grid item style={{textAlign:'center'}}>
                      <Typography>Of</Typography>
                    </Grid>

                    {/*
                    <ListItem button onClick={() => handleGoogleLogin()} component="button" className={classes.loginGoogleButton}>

                      <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          alt="logo"
                          width="35"
                          height="35"
                          position="absolute"
                        />
                      <ListItemText primary={"Registreer met Google"} />
                    </ListItem>
                    */}
                    <Grid item>

                      <ListItem button type="submit" component="button" href="/signin" className={classes.linkButton}>
                          <ListItemText primary={"Ik heb al een account"} />
                      </ListItem>

                    </Grid>


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
  );
};

export default withRouter(Register);
