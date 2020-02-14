import React from "react";
import { Container, Typography, Button, Card, Grid, CardContent, TextField } from '@material-ui/core/'
import * as firebase from "firebase";
import 'firebase/database';
import firebaseConfig from "./firebaseConfig";
import { Link } from "react-router-dom";

export default class App extends React.Component {
  
    constructor(props) {

    super(props);

    this.state = {
        names: [],
        };
    }

    componentDidMount() {
        this.getUserData();
        this.getUserData2();
      }
    
      getUserData = () => {
        const user = firebase.auth().currentUser;
        const ref = firebase.database().ref('/');
        ref.on("value", snapshot => {
          const state = snapshot.val();
          this.setState(state);
        });
      };
    
      getUserData2 = () => {
        const user = firebase.auth().currentUser;
        const namesArray = [];
        const ref = firebase.database().ref('/users/').on('value', function(snap) {
          snap.forEach(function(student){
            console.log(student.val());
            namesArray.push(student.val());
          })
        })
        this.setState({names: namesArray})
      };
      
    render() {

      const card = {
        margin: 20,
      }
      const listHomework = this.state.names.map((studenthw) =>
        <Grid item xs={12} sm={12}>
            <Card style={card}>
                <CardContent>
                    {studenthw.vakken.nederlands.huiswerk}
                </CardContent>
                <CardContent>
                    {studenthw.vakken.nederlands.huiswerk2}
                </CardContent>
            </Card>
        </Grid>
      )   
      
      return (
        <Container maxWidth="sm">
          <Grid item xs={12} sm={12}>

            <Grid item xs={12} className="cardInfo">
                <Typography component="h4" variant="h5">Overzicht gemaakte huiswerk</Typography>
            </Grid>

            <div>
                <p>{listHomework}</p>
            </div>

          </Grid>
        </Container>

      )
  }
}
