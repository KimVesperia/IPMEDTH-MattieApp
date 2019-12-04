import React, { useState, useContext } from "react";
import { AuthContext } from "./Signin";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

const Register = ({history}) => {
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
          history.push('/dashboard')
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
          history.push('/dashboard')
          Auth.setLoggedIn(true)
        })
        .catch(e => setErrors(e.message))
      })

  }

  return (
    <div>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />
        <button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
            height="50"
          />
          Join With Google
        </button>

        <button type="submit">Registreer</button>

        <span>{error}</span>
      </form>
    </div>
  );
};

export default withRouter(Register);
