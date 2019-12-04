import React from "react";
import HomeAuth from "./HomeAuth";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { Redirect } from 'react-router';

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Signin from "./Signin";
import Header from "./Header";

import Curriculum from "./Curriculum";
import Curriculum2 from "./Curriculum2";
import Curriculum3 from "./Curriculum3";
import Curriculum4 from "./Curriculum4";

import Reward from "./Reward";
import Profile from "./Profile";
import Badges from './Badges';
import Coffee from './Coffee';
import ExperiencePoints from './ExperiencePoints';
import Dashboard from './Dashboard';
import * as firebase from "firebase";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import RevieveExperiencePoints from './RecieveExperiencePoints';
import InviteScreen from "./InviteScreen";

import { useTheme, Hidden, Grid, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import CakeIcon from '@material-ui/icons/Cake';
import SchoolIcon from '@material-ui/icons/School';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
        backgroundColor: "#fafafa",
    },
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}));

export default function App(props) {
  const { container } = props;
  const classes = useStyles();
  const isLoggedIn = true;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick= (event, index) => {
    setSelectedIndex(index);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function logOut(){
    return firebase.auth().signOut();
  }

  const list = (
    <div>
      <List>
        <ListItem>
          <Typography>Mattie App</Typography>
        </ListItem>
        <Divider />
        <ListItem
          button component={Link} to="/"
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          button component={Link} to="/profile"
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={"Profiel opstellen"} />
        </ListItem>
        <ListItem
          button component={Link} to="/curriculum"
          selected={selectedIndex === 2 }
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary={"Curriculum"} />
        </ListItem>
        <ListItem
          button component={Link} to="/reward"
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
          >
          <ListItemIcon><CakeIcon /></ListItemIcon>
          <ListItemText primary={"Beloningen"} />
        </ListItem>
        <ListItem
          button component={Link} to="/recieveexperiencepoints"
          selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4)}
        >
          <ListItemIcon><ExposurePlus1Icon /></ListItemIcon>
          <ListItemText primary={"Voortangspunten ontvangen"} />
        </ListItem>
        <ListItem
          button component={Link} to="/dashboard"
          selected={selectedIndex === 5}
          onClick={event => handleListItemClick(event, 5)}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>

        <ListItem
          button component={Link} to="/invite"
          selected={selectedIndex === 6}
          onClick={event => handleListItemClick(event, 6)}
        >
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary={"Studenten uitnodigen"} />
        </ListItem>

        <ListItem button component="a" onClick={() => { logOut() }} href="/signin">
          <ListItemText primary={"Log Uit"} />
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  function LoggedIn() {
      return(

      <Router>
        <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {list}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/Header">
              <Header />
            </Route>
            <Route path="/recieveexperiencepoints">
              <RevieveExperiencePoints />
            </Route>
            <Route path="/curriculum">
              <Curriculum />
            </Route>
            <Route path="/curriculum2">
              <Curriculum2 />
            </Route>
            <Route path="/curriculum3">
              <Curriculum3 />
            </Route>
            <Route path="/curriculum4">
              <Curriculum4 />
            </Route>
            <Route path="/reward">
              <Reward />
            </Route>
            <Route path="/badges">
              <Badges />
            </Route>
            <Route path="/coffee">
              <Coffee />
            </Route>
            <Route path="/experiencepoints">
              <ExperiencePoints />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/invite">
              <InviteScreen />
            </Route>
            <Route path="/">
              <HomeAuth />
            </Route>
          </Switch>
          </main>
        </div>
      </Router>
      )
  }

  return (
    <>
      {isLoggedIn ? (
        <LoggedIn />
      ) : (
        <HomeAuth />
      )}
    </>
  );
}
