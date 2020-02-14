import React from "react";
import HomeAuth from "../HomeAuth";

import Login from "../Login";
import Logout from "../Logout";
import Register from "../Register";
import Signin from "../Signin";

//Student Routes
import MakeHomework from "../Student/MakeHomework";
import StudentHomeworkList from "../Student/StudentHomeworkList";

import Curriculum from "../Curriculum";

import StudentProfile from "../StudentProfile";
import Dashboard from '../Dashboard';
import * as firebase from "firebase";
import 'firebase/database';

import ReceiveExperiencePoints from '../ReceiveExperiencePoints';
import InviteScreen from "../InviteScreen";
import HomeworkList from '../Teacher/HomeworkList';
import Feedback from '../Homework/Feedback';

import { withStyles } from "@material-ui/core/styles";
import MenuBar from '../MenuBar';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import StudentDashboard from "../Student/StudentDashboard";


const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: "#fafafa",
        },
    },
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
});


class Routes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            authentication: false,
        };
    }

    componentDidMount(){
        this.validateUser();
    }

    validateUser(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user.uid !== 'DeUOkW1weFdz7cEx6Bwtfxq1WNe2'){
                this.setState({authentication: false})
            } else{
                this.setState({authentication: true})
            }
          });
      };

    render() {
        const TeacherIsAuthenticated = this.state.authentication;

        function PrivateRoute({ children, ...rest }) {
            return (
              <Route
                {...rest}
                render={({ location }) =>
                    TeacherIsAuthenticated ? (
                    children
                  ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                      }}
                    />
                  )
                }
              />
            );
        }
        const { classes } = this.props;
        return(
            <Router>
                <div className={classes.root}>
                    <MenuBar isAdmin={this.state.authentication}/>
                    <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
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
                            <StudentProfile />
                        </Route>
                        <Route path="/makehomework">
                            <MakeHomework/>
                        </Route>
                        <Route path="/homework">
                            <StudentHomeworkList />
                        </Route>
                        <Route path="/receiveexperiencepoints">
                            <ReceiveExperiencePoints />
                        </Route>
                        <Route path="/curriculum">
                            <Curriculum />
                        </Route>
                        <Route path="/dashboard">
                            <StudentDashboard />
                        </Route>

                        {/* Docent routes */}
                        <PrivateRoute path="/homeworklist">
                            <HomeworkList />
                        </PrivateRoute>
                        <PrivateRoute path="/feedback">
                            <Feedback />
                        </PrivateRoute>
                        <PrivateRoute path="/invite">
                            <InviteScreen />
                        </PrivateRoute>

                        <Route path="/">
                            <HomeAuth />
                        </Route>

                        {/* PLAATS HIER GEEN ROUTES */}
                    </Switch>
                    </main>
                </div>
            </Router>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Routes);
