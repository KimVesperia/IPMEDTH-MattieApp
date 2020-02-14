import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);

//importeer de invitepagina
import InviteScreen from './InviteScreen';
//functie om te testen
it('Invite screen renders without crashing', () => {
  //maak een div aan om de pagina op te vangen
  const div = document.createElement('div');
  //render en test of het lukt zonder te crashen
  ReactDOM.render(<InviteScreen />, div);
});

//importeer de homepagina
import HomeAuth from './HomeAuth';
//functie om te testen
it('Homepage renders without crashing', () => {
  //maak een div aan om de pagina op te vangen
  const div = document.createElement('div');
  //render en test of het lukt zonder te crashen
  ReactDOM.render(<HomeAuth />, div);
});

//met dit script wordt de koppeling met de database getest
it('Connection with the database works without crashing', () => {
  //probeer toegang te krijgen tot de users JSON tabel
  const ref = firebase.database().ref('/users');
  //maak een div aan om de pagina op te vangen
  const div = document.createElement('div');
  //console log de output van de database als er verbinding is.
  ReactDOM.render(console.log(ref), div);
});

//met dit script wordt er getest of de gebruikers kunnen inloggen
it('users can login without crashing', () => {
  //functie login met firebase
  function login() {
    firebase
    .auth()
    .signInWithEmailAndPassword('student@mborijnland.nl', 'test991')
  };
  //run de functie
  login();
});

//met dit script wordt er getest of de gebruikers kunnen registreren
it('users can register without crashing', () => {
  //functie register met firebase
  function register() {
    firebase
    .auth()
    //dummy account
    .createUserWithEmailAndPassword('henkdevries@mborijnland.nl', '123testing')
  };
  //run de functie
  register();
});

//met dit script wordt er getest of de gebruikers kunnen uitloggen
it('function logout works without crashing', () => {
  //functie logout
  function logOut(){
    return firebase.auth().signOut();
  }
  //run de functie
  logOut();
});

//met dit script wordt er getest of er iets uitgelezen kan worden uit de database (uid)
it('Reading data from the database works', () => {
  //functie om de uid uit te lezen
  function getUID() {
    //dit is de uid van de admin(docent)
    const ref = firebase.database().ref('/users/' + 'DeUOkW1weFdz7cEx6Bwtfxq1WNe2');
    //print het uit
    console.log(ref.path.pieces_);
  };
  //run de functie
  getUID();
});

//met dit script wordt er getest of er iets weggeschreven kan worden naar de database
it('Writing data to the database works', () => {
  //functie om data the writen naar de database
  function writeDataToDatabase() {
    //dummy data onder de users tabel
    firebase.database().ref('/users/' + 'jest').set('Success')
  };
  //run de functie
  writeDataToDatabase();
});

//failed login script
// it('fail test', () => {
//   //functie login met firebase
//   function login() {
//     firebase
//     .auth()
//     //deze functie klopt niet
//     .signInWithEmailAndtest('student@mborijnland.nl', 'test991')
//   };
//   //run de functie
//   login();
// });
