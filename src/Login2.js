import React, { useState, useContext } from "react";
import { AuthContext } from "./Signin";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemText, Grid, Typography, TextField} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    loginGoogleButton: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: '#efefef',
        borderRadius: '5px',
        textAlign: 'center',
        },
    loginButton: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: 'rgb(91, 134, 253)',
        color: 'white',
        borderRadius: '5px',
        textAlign: 'center',
        },
  }));

const Login = ({history}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {

    e.preventDefault();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          console.log(result)
          // history.push('/homeworklist')
          window.location.href='/signin';
          Auth.setLoggedIn(true)
        })
        .catch(e => {
          setErrors(e.message);
        });
      })

  };

  const signInWithGoogle = () => {
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
        history.push('/signin')
        window.location.href='signin';
        Auth.setLoggedIn(true)
      })
      .catch(e => setErrors(e.message))
    })

  }


  return (
    <div>
      <form onSubmit={e => handleForm(e)}>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          margin="normal"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          onChange={e => setPassword(e.target.value)}
          name="password"
          margin="normal"
          value={password}
          type="password"
          label="Wachtwoord"
          variant="outlined"
          fullWidth
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
            <ListItemText primary={"Online"} />
        </ListItem>

        <Grid item style={{textAlign:'center'}}>
            <Typography>Of</Typography>
        </Grid>

        {/*

        <ListItem button onClick={() => signInWithGoogle()} type="submit" component="button" className={classes.loginGoogleButton}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="logo" width="35" height="35" position="absolute"/>
            <ListItemText primary={"Login met Google"} />
        </ListItem>

        */}

      </form>
    </div>
  );
};

export default withRouter(Login);
