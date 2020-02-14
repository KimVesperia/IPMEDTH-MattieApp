import React, {useEffect} from "react";
import HomeAuth from "./HomeAuth";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { Redirect } from 'react-router';

import Login from "./Login";
import Login2 from "./Login2";
import Logout from "./Logout";
import Register from "./Register";
import Signin from "./Signin";
import Loading from "./Loading";
import Dashboard2 from "./Dashboard2";
import Homework from "./Homework";
import Nakijken from "./Nakijken";

import Curriculum from "./Curriculum";

import Reward from "./Reward";
import StudentProfile from "./StudentProfile";
import Badges from './Badges';
import Coffee from './Coffee';
import ExperiencePoints from './ExperiencePoints';
import Dashboard from './Dashboard';
import * as firebase from "firebase";
import 'firebase/database';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ReceiveExperiencePoints from './ReceiveExperiencePoints';
import InviteScreen from "./InviteScreen";
import Settings from "./Settings";
import SubmitHomework from './Homework/SubmitHomework';
import HomeworkList from './Teacher/HomeworkList'; 


import { useTheme, Hidden, Grid, Typography, Button, AppBar, LinearProgress, Toolbar, IconButton, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';


import {
  Router,
  Switch,
  Route,
} from "react-router-dom";

import { createBrowserHistory } from 'history';

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
      boxShadow: 'none'
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
  const user = firebase.auth().currentUser;
  const theme = useTheme();

  // items in drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // store active screen
  const [activeScreen, setActiveScreen] = React.useState(false);

  //check if user is authenticated
  const [TeacherIsAuthenticated, setTeacherAuthenticated] = React.useState();

  // history object for reading the active screen
  const history = createBrowserHistory();

  // listen to history object to see if the user changes screen
  const unlisten = history.listen((location, action) => {
    setActiveScreen(location.pathname);
    changeListItem(location.pathname);
  });

  const changeListItem = (path) => {
    if(path === '/dashboard'){
      setSelectedIndex(0);
    }else if(path === '/profile'){
      setSelectedIndex(1);
    }else if(path === '/curriculum'){
      setSelectedIndex(2);
    }else if(path === '/invite'){
      setSelectedIndex(3);
    }else if(path === '/settings'){
      setSelectedIndex(4);
    }
  }

  // read history object when declared
  useEffect(() => {
    setActiveScreen(history.location.pathname);
    changeListItem(history.location.pathname);
  });

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
          button component={Link} to="/dashboard"
          selected={selectedIndex === 0}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary={"Intrumentenpaneel"} />
        </ListItem>
        <ListItem
          button component={Link} to="/profile"
          selected={selectedIndex === 1}
        >
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={"Profiel"} />
        </ListItem>
        <ListItem
          button component={Link} to="/curriculum"
          selected={selectedIndex === 2 }
        >
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary={"Curriculum"} />
        </ListItem>

        <ListItem
          button component={Link} to="/invite"
          selected={selectedIndex === 3}
        >
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary={"Studenten uitnodigen"} />
        </ListItem>

        <ListItem
          button component={Link} to="/settings"
          selected={selectedIndex === 4}
        >
          <ListItemIcon><SettingsIcon/></ListItemIcon>
          <ListItemText primary={"Instellingen"} />
        </ListItem>

        <ListItem
          button component={Link} to="/submitHomework"
          selected={selectedIndex === 5}
        >
          <ListItemIcon><SettingsIcon/></ListItemIcon>
          <ListItemText primary={"Huiswerk"} />
        </ListItem>

        <ListItem button component="a" onClick={() => { logOut() }} href="/signin">
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary={"Offline"} />
        </ListItem>
      </List>
    </div>
  );
  
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
            TeacherIsAuthenticated ? (
            children
          ) : (
            <Redirect
              push to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  function Routes(){
    return(
      <Router history={history}>
        <div className={classes.root}>
          {(activeScreen !== '/') && (activeScreen !== '/register') && (activeScreen !== '/signin')&&
            <>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <Grid container xs={12} md={8}></Grid>

                <Grid container xs={12} md={4}>  
                    <Grid xs={2}>
                      <Typography>Level 1</Typography>
                    </Grid>
                    <Grid xs={4}>
                      <div style={{maxWidth:"80%", marginTop: '8px', marginLeft: '10px'}}>
                        <LinearProgress style={{minHeight: '7px', borderRadius: 20, backgroundColor: 'darkgray'}} variant="determinate" value={30} />
                      </div>
                    </Grid>
                    <Grid xs={4}>
                      <Typography>300 / 1000 XP</Typography>
                    </Grid>
                    <Grid xs={1}>
                      <PersonIcon color="white" style={{marginTop:'-3px'}} />
                    </Grid>
                    <Grid xs={1}>
                      <Typography>User</Typography>
                    </Grid>
                </Grid>

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
            </>
          }
  
          <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/login2">
                <Login2 />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/loading">
                <Loading />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
  
              <Route path="/profile">
                <StudentProfile />
              </Route>
              <Route path="/submitHomework">
                <SubmitHomework/>
              </Route>
              <Route path="/homework">
                <Homework />
              </Route>
              <Route path="/receiveexperiencepoints">
                <ReceiveExperiencePoints />
              </Route>
              <Route path="/curriculum">
                <Curriculum />
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
              <Route path="/dashboard2">
                <Dashboard2 />
              </Route>
              
              <Route path="/settings">
                <Settings />
              </Route>
              
              <Route path="/">
                <HomeAuth />
              </Route>
  
  
              {/* Docent routes */}
              <PrivateRoute path="/homeworklist">
                <HomeworkList />
              </PrivateRoute>
              <PrivateRoute path="/nakijken">
                <Nakijken />
              </PrivateRoute>
              <PrivateRoute path="/invite">
                <InviteScreen />
              </PrivateRoute>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
  return(
    <Routes/>
  )
}
