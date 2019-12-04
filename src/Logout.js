import React, { useState, useEffect } from 'react';
import {Grid, Card, Container, CardHeader, CardActions, CardContent, Button, Typography, LinearProgress, Avatar, Badge, Box}  from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import BuildIcon from '@material-ui/icons/Build';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as firebase from "firebase";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const StyledBadge1 = withStyles(theme => ({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#F5F5F5',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
    root: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    h2: {
      color: '#536DFE !important',
    },
    card: {
        margin: 20,
    },
    title: {
        fontSize: 14,
    },
    progressBar: {
      marginBottom: theme.spacing(3),
      backgroundColor: '#1976d269 !important',
    },
    pos: {
        marginBottom: 12,
    },
    fixedHeight: {
        height: 240,
    },
    avatar: {
        backgroundColor: '#ff5722',
    },
    modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    color: 'black',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
    width: '35%',
  },
  avatar: {
    margin: '-10px -20px',
    position: 'absolute',
  },
  avatar2: {
    margin: '0 100px 0 100px',
    position: 'relative',
  },
  avatar22: {
    position: 'relative',
    width: '100%',
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  avatar1: {
    backgroundColor: '#0f795b',
    fontSize: '30px !important',
    width: '100px',
    height: '100px',
    margin: '0 auto',
  },
  cardten: {
    maxHeight: '190px',
  },
}));

function logOut(){
  return firebase.auth().signOut();
}

export default function App() {
  return (
    <Router>
      <ListItem button component="a" onClick={() => { logOut() }} href="/signin">
        <ListItemText primary={"Log Uit"} />
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
      </ListItem>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
