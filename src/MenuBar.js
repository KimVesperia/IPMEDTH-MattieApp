import React from "react";
import * as firebase from "firebase";
import 'firebase/database';
import { Alert } from '@material-ui/lab';

import { LinearProgress, Dialog, Drawer, Hidden, Typography, AppBar, Toolbar, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText, Button, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core/'
import {withRouter, Link} from 'react-router-dom';

import {AccountCircle} from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from '@material-ui/icons/Chat';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
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
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  dontDisplay: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  doDisplay: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    }
  }
});


const theme = createMuiTheme({
  overrides: {
    MuiLinearProgress:{
      barColorPrimary:{
        backgroundColor: 'white !important'
      }
    }
  },
});

var ixp = 0;
var level2 = true;

const user = firebase.auth();
export function xpUP() {
  ixp = 0;
};

class MenuBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      mobileOpen: false,
      activeScreen: this.props.location.pathname,
      Level: '',
      open: false
    };
  }

  closeDialog = () => {
    this.setState({open: false})
  };

  getUserXP = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user.uid){
          this.setState({uid: user.uid});

          const ref = firebase.database().ref('/users/' +user.uid+ '/persoonsgegevens/' + 'xp');
          ref.on("value", snapshot => {
            const currentXP = snapshot.val();
            this.setState({xp: currentXP})
          });

      } else{
          this.setState({uid: null})
      }
    });
  };

  componentDidMount(){
    this.getUserXP();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      this.setState({activeScreen: this.props.location.pathname});
      this.changeListItem(this.props.location.pathname);
    }

    if(this.state.xp !== prevState.xp) {
      this.changeExperiencePoints(prevState.xp)
    }
  }

  changeExperiencePoints = (prevXP) => {
    if (this.state.xp <= 99) {
      this.setState({level: 'Level 1', remainingXP: 100})
    }
    else if(this.state.xp >= 100){
      this.setState({level: 'Level 2', remainingXP: 200})
      if(this.state.xp === 100) {
        if(prevXP <= this.state.xp){
          this.setState({open: true})
        }
      }
    }
  }

  changeListItem = (path) => {
    if(path === '/dashboard'){
      this.setState({selectedIndex: 0});
    }else if(path === '/profile'){
      this.setState({selectedIndex: 1});
    }else if(path === '/curriculum'){
      this.setState({selectedIndex: 2});
    }else if(path === '/homework'){
      this.setState({selectedIndex: 3});
    }else if(path === '/homeworklist'){
      this.setState({selectedIndex: 4});
    }else if(path === '/invite'){
      this.setState({selectedIndex: 5});
    }else if(path === '/feedback'){
      this.setState({selectedIndex: 6});
    }
  }

  handleDrawerToggle=()=>{
    this.setState(prevState => ({
      mobileOpen: !prevState.mobileOpen
    }));
  };

  logOut(){
    return firebase.auth().signOut();
  }

  studentList(){
    return(
      <div>
      <List>
          <ListItem>
              <Typography>Mattie App</Typography>
          </ListItem>
          <Divider />
          <ListItem
              button component={Link} to="/dashboard"
              selected={this.state.selectedIndex === 0}
          >
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={"Instrumentenpaneel"} />
          </ListItem>
          <ListItem
              button component={Link} to="/profile"
              selected={this.state.selectedIndex === 1}
          >
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={"Profiel"} />
          </ListItem>
          <ListItem
              button component={Link} to="/curriculum"
              selected={this.state.selectedIndex === 2 }
          >
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary={"Leerplan"} />
          </ListItem>

          <ListItem
              button component={Link} to="/homework"
              selected={this.state.selectedIndex === 3}
          >
              <ListItemIcon><MenuBookIcon/></ListItemIcon>
              <ListItemText primary={"Huiswerk"} />
          </ListItem>

          <ListItem button component="a" onClick={() => { this.logOut() }} href="/signin">
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Offline"} />
          </ListItem>
      </List>
      </div>
      )
  }

  teacherList(){
    return(
      <div>
      <List>
          <ListItem>
              <Typography>Mattie App</Typography>
          </ListItem>
          <Divider />
          <ListItem
              button component={Link} to="/homeworklist"
              selected={this.state.selectedIndex === 4}
          >
              <ListItemIcon><SchoolIcon/></ListItemIcon>
              <ListItemText primary={"Huiswerk Nakijken"} />
          </ListItem>

          <ListItem
              button component={Link} to="/invite"
              selected={this.state.selectedIndex === 5}
          >
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary={"Studenten uitnodigen"} />
          </ListItem>
          
          {/*
          <ListItem
              button component={Link} to="/feedback"
              selected={this.state.selectedIndex === 6}
          >
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText primary={"Terugkoppeling geven"} />
          </ListItem>
          */}

          <ListItem button component="a" onClick={() => { this.logOut() }} href="/signin">
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Offline"} />
          </ListItem>
      </List>
      </div>
    )
  }

  render(){
      const { classes } = this.props;

      return(
        <div className={classes.root}>
          {(this.state.activeScreen !== '/') && (this.state.activeScreen !== '/register') && (this.state.activeScreen !== '/signin')&&
          <>
          {(() => {
            if (user.W === 'DeUOkW1weFdz7cEx6Bwtfxq1WNe2') {
              return (
                <div>
                  <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={this.handleDrawerToggle}
                        className={classes.menuButton}
                      >
                        <MenuIcon />
                      </IconButton>

                      <Typography variant="h6" className={classes.title}>
                        MattieApp
                      </Typography>

                      <Link to="profile" style={{textDecoration: 'none', color: 'inherit'}} className={classes.dontDisplay}>
                        <Typography>{user.currentUser ? user.currentUser.email: ""}</Typography>
                      </Link>

                      <div>
                        <ListItem button component="a" onClick={() => { this.logOut() }} href="/signin" className={classes.dontDisplay}>
                            <ExitToAppIcon />
                        </ListItem>
                      </div>
                    </Toolbar>
                  </AppBar>
                </div>
              )
            } else {
              return (
                <div className={classes.root}>
                  <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={this.handleDrawerToggle}
                        className={classes.menuButton}
                      >
                        <MenuIcon />
                      </IconButton>

                      <Typography variant="h6" className={classes.title}>
                          MattieApp
                      </Typography>

                      <Typography>{this.state.level}</Typography>

                      <Dialog onClose={this.closeDialog} open={this.state.open}>
                        <Alert severity="success">Gefeliciteerd je bent level {this.state.level}!</Alert>
                      </Dialog>

                      <div className={classes.dontDisplay} style={{width: '10%', margin: '0em 1em'}}>
                        <ThemeProvider theme={theme}>
                          <LinearProgress style={{minHeight: '7px', borderRadius: 20, backgroundColor: 'darkgray'}} variant="determinate" value={this.state.xp} />
                        </ThemeProvider>
                      </div>

                      <Typography className={classes.doDisplay} style={{marginRight: '2em'}}>{this.state.xp}/{this.state.remainingXP} XP</Typography>

                      <Link to="profile" style={{textDecoration: 'none', color: 'inherit'}} className={classes.dontDisplay}>
                        <Typography>{user.currentUser ? user.currentUser.email: ""}</Typography>
                      </Link>

                      <div>
                        <ListItem button component="a" onClick={() => { this.logOut() }} href="/signin" className={classes.dontDisplay}>
                            <ExitToAppIcon />
                        </ListItem>
                      </div>

                    </Toolbar>
                  </AppBar>
                </div>
              )
            }
          })()}

            <nav className={classes.drawer} aria-label="mailbox folders">
              <Hidden smUp implementation="css">
                <Drawer
                  variant="temporary"
                  anchor={'left'}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {this.props.isAdmin ?
                    (this.teacherList())
                   : (this.studentList())}
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
                  {this.props.isAdmin ?
                    (this.teacherList())
                   : (this.studentList())}
                </Drawer>
              </Hidden>
            </nav>
          </>
          }
        </div>
      )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(MenuBar));
