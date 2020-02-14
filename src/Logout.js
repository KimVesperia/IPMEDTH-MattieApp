import React from 'react';
import { Button }  from '@material-ui/core/';
import { BrowserRouter as Router } from "react-router-dom";

import * as firebase from "firebase";
import ReactDOM from "react-dom";

function logOut(){
  return firebase.auth().signOut();
}

export default function App() {
  return (
    <Router>
      <Button variant="outlined" onClick={() => { logOut() }} href="/signin">
        Offline
      </Button>
    </Router>
  );
}
