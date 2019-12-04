import React from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useTheme, Hidden, Grid, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import { Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    const user = firebase.auth().currentUser.uid;
    super(props);

    this.state = {
      profile: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    const user = firebase.auth().currentUser;
    firebase.database()
      .ref('/users/' + user.uid)
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref('/users/' + user.uid);
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
      event.preventDefault();
      const user = firebase.auth().currentUser.uid;
      const email = user.email;
      let name = this.refs.name.value;
      let role = this.refs.role.value;
      let nummer = this.refs.nummer.value;
      let uid = this.refs.uid.value;

      if (uid && name && role && nummer) {
        const { profile } = this.state;
        const devIndex = profile.findIndex(data => {
          return data.uid === uid;
        });
        profile[devIndex].name = name;
        profile[devIndex].role = role;
        profile[devIndex].nummer = nummer;
        this.setState({ profile });
      } else if (name && role && nummer) {
        const uid = new Date().getTime().toString();
        const { profile } = this.state;
        profile.push({ uid, name, role, nummer });
        this.setState({ profile });
      }

      this.refs.name.value = "";
      this.refs.role.value = "";
      this.refs.nummer.value = "";
      this.refs.uid.value = "";
    };

    removeData = user => {
      const { profile } = this.state;
      const newState = profile.filter(data => {
        return data.uid !== user.uid;
      });
      this.setState({ profile: newState });
    };

    updateData = user => {
      this.refs.uid.value = user.uid;
      this.refs.name.value = user.name;
      this.refs.role.value = user.role;
      this.refs.nummer.value = user.nummer;
    };

    render() {
      const { profile } = this.state;
      if (profile[0]) {
          return  (
            <React.Fragment>
            <div className="row">
              <div className="col-xl-12">
                {profile.map(user => (
                  <div
                    key={user.uid}
                    className="card float-left"
                    style={{ width: "18rem", marginRight: "1rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                      <p className="card-text">{user.role}</p>
                      <p className="card-text">{user.nummer}</p>
                      <button
                        onClick={() => this.removeData(user)}
                        className="btn btn-link"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => this.updateData(user)}
                        className="btn btn-link"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <h1>Edit Hier</h1>
                <form  onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <input type="hidden" ref="uid" />
                    <div className="form-group col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        ref="name"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Role</label>
                      <input
                        type="text"
                        ref="role"
                        className="form-control"
                        placeholder="Role"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Telefoonnummer</label>
                      <input
                        type="text"
                        ref="nummer"
                        className="form-control"
                        placeholder="Nummer"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Edit
                  </button>

                </form >
              </div>
            </div>
            </React.Fragment>
          );
        }
      if (!profile[0]) {
        return (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <h1>Firebase Development Team</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <h1>Add new team member here</h1>
                <form  onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <input type="hidden" ref="uid" />
                    <div className="form-group col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        ref="name"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Role</label>
                      <input
                        type="text"
                        ref="role"
                        className="form-control"
                        placeholder="Role"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Telefoonnummer</label>
                      <input
                        type="text"
                        ref="nummer"
                        className="form-control"
                        placeholder="Nummer"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form >
              </div>
            </div>
          </div>
        </React.Fragment>
      );
      }
    }
  }

  export default App;
// https://codesandbox.io/s/p2wqnk3zqj?from-embed
