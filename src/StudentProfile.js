import React from "react";
import { Typography, Button, Grid, Card, CardContent, TextField } from '@material-ui/core/'
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router';
import SnackbarCompInfo from "./SnackbarCompInfo";
import SnackbarCompInfo2 from "./SnackbarCompInfo2";
import {xpUP} from "./MenuBar";

var reward = 25;

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          naam: '',
          email: '',
          opleiding: '',
          telefoonnummer: '',
          name: [],
          xp: [],
          activeSnackbarInfo: false,
          activeSnackbarInfo2: false,
      };
    }

    componentDidMount() {
      this.getUserData();
      this.getUserName();
    }

    getUserName = () => {
      const user = firebase.auth().currentUser;
      // const ref = firebase.database().ref('/users/' + user.uid + '/persoonsgegevens/' + 'naam');
      const uid = firebase.auth().W;
      const ref = firebase.database().ref(`/users/${uid}/persoonsgegevens/naam`);
      ref.on("value", snapshot => {
        const state = snapshot.val();
        this.setState({name: state}, function () {
            return this.state.name;
        });
      });
    };

    writeXPToStudent = () => {
      const user = firebase.auth().currentUser;
      const name = this.state.naam ? this.state.naam : null;
      const email = this.state.email;
      const opleiding = this.state.opleiding ? this.state.opleiding : null;
      const telefoonnummer = this.state.telefoonnummer ? this.state.telefoonnummer : null;

      function writeDataToProfile() {
        const uid = firebase.auth().W;
        firebase.database().ref('/users/' + uid + '/persoonsgegevens/'+'/naam').set(name);
        firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + '/email').set(email);
        firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + '/opleiding').set(opleiding);
        firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + '/telefoonnummer').set(telefoonnummer);
      }

      const xpArray = [];
      const ref = firebase.database().ref('/users/' + user.uid + '/persoonsgegevens/' + 'xp');
      ref.on('value', function(studentxp) {
        xpArray.push(studentxp.val());
      });
      const intXP = Number(xpArray);
      this.setState({xp: intXP}, function () {
        const listXP = this.state.xp;
        if(reward == 25) {
          const uid = firebase.auth().W;
          const beloning = listXP+25;
          reward = 0;
          xpUP();
          firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + '/xp/').set(beloning);
        }
      });
      setTimeout(writeDataToProfile, 1500);

    };

    writeDataToStudent = () => {
      const name = this.state.naam ? this.state.naam : null;
      const email = this.state.email;
      const opleiding = this.state.opleiding ? this.state.opleiding : null;
      const telefoonnummer = this.state.telefoonnummer ? this.state.telefoonnummer : null;

      firebase.database().ref('/users/'+this.state.user.uid+'/persoonsgegevens/'+'/naam').set(name);
      firebase.database().ref('/users/'+this.state.user.uid+'/persoonsgegevens/' + '/email').set(email);
      firebase.database().ref('/users/'+this.state.user.uid+'/persoonsgegevens/' + '/opleiding').set(opleiding);
      firebase.database().ref('/users/'+this.state.user.uid+'/persoonsgegevens/' + '/telefoonnummer').set(telefoonnummer);
    };

    async getUserData() {
      let user = await firebase.auth().currentUser;
      const uid = firebase.auth().W;
      this.setState({user: user})

      await firebase.database().ref('/users/' + uid).on("value", snapshot => {
        let data = snapshot.val();
        let userEmail =  firebase.auth().currentUser.email;
        this.setState({email: userEmail});

        if(data != null) {
          if(data.persoonsgegevens){
            this.setState({naam: data.persoonsgegevens.naam});
            this.setState({opleiding: data.persoonsgegevens.opleiding});
            this.setState({telefoonnummer: data.persoonsgegevens.telefoonnummer});
          }
        }

        this.setState({isLoading: false});
      });
    };

    render() {
      const textField = {
        margin: 20,
      }
      const header = {
        marginLeft: 20,
        marginTop: 35
      }
      const verzendKnop = {
        marginTop: 20,
      }

      const link = {
        textDecoration: 'none',
      }

      const ButtonStyle = {
        marginRight: 15
      }

      const opleidingen = [
        {
          value: 'Assistent Mobiliteitsbranche',
          label: 'Assistent Mobiliteitsbranche',
        },
        {
          value: 'Assistent Bouwen, Wonen en Onderhoud',
          label: 'Assistent Bouwen, Wonen en Onderhoud',
        },
      ];

      const listName = this.state.name;

      const user = firebase.auth().currentUser;

      if(user) {
        return (

            <Grid container>

            {this.state.isLoading ?
            <></>
            :
            <>

              <Grid item xs={12} md={8}>
                  <Grid item xs={12} style={header}>
                      <Typography component="h4" variant="h5">Profiel wijzigen</Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Card className="card">
                      <CardContent>
                        <div style={textField}>
                          <form>
                            <Grid item xs={6}>
                              <TextField
                                  value={this.state.naam}
                                  onChange={(event)=>{
                                    this.setState({naam: event.target.value});
                                  }}
                                  margin="normal"
                                  placeholder="Naam"
                                  label="Naam"
                                />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                  value={this.state.email}
                                  onChange={(event)=>{
                                      this.setState({email: event.target.value});
                                  }}
                                  margin="normal"
                                  disabled
                                  placeholder="Email"
                                  label="Email"
                                />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                id="standard-select-currency"
                                select
                                label="Opleiding"
                                value={this.state.opleiding}
                                onChange={(event)=>{
                                    this.setState({opleiding: event.target.value});
                                }}
                                helperText="Kies je opleiding"
                              >
                                {opleidingen.map(option => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                  value={this.state.telefoonnummer}
                                  type="number"
                                  onChange={(event)=>{
                                      this.setState({telefoonnummer: event.target.value});
                                  }}
                                  margin="normal"
                                  placeholder="0612347890"
                                  label="Telefoonnummer"
                                />
                            </Grid>

                          </form>

                          <br></br>
                          
                      
                          <Grid item xs={12}>
                          {/* <Grid container xs={12} spacing={1}> */}
                            {(() => {

                              if (listName == null) {
                                return (
                                  <div style={{width: '100%'}}>
                                      <Button color="primary" variant="contained" className='removeStyleButton' style={ButtonStyle} onClick={() => {this.writeXPToStudent()}}>
                                        <SnackbarCompInfo />
                                      </Button>            

                                      <a href='dashboard'>
                                        <Button variant='contained' color="primary" style={ButtonStyle}>
                                          Terug
                                        </Button>
                                      </a>
                                  </div>
                                )
                              } else {
                                  return (
                                    <div style={{width: '100%'}}>
                                      <Button color="primary" className='removeStyleButton' variant="contained" style={ButtonStyle} onClick={() => {this.writeDataToStudent()}}>
                                          <SnackbarCompInfo2 />
                                      </Button>

                                      <a href='dashboard'>
                                        <Button color="primary" variant="contained" style={ButtonStyle}>
                                            Terug
                                        </Button>
                                      </a>
                                    </div>
                                  )
                                }
                            })()}

                          </Grid>

                        </div>

                      </CardContent>
                    </Card>


                  </Grid>


              </Grid>

              </>
            }

            </Grid>


        )
      }
      else {
        return (<Redirect push to="/signin" />);
      }

  }
}
