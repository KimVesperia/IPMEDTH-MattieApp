import React, {Component} from 'react';
import 'firebase/database';
import { Typography, Grid, TextField, Button, Snackbar } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import * as firebase from "firebase";
import { Link } from 'react-router-dom';
import {xpUP} from "./MenuBar";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

var reward = 25;

const styles = theme => ({
  root: {
    background: '#4caf50',
    fontWeight: '600',
    justifyContent: 'center',
  }
});

class SnackbarCompCS3 extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    handleClick = () => {
        this.setState({ activeSnackbarCS3: true })
        const user = firebase.auth().currentUser;
        const uid = firebase.auth().W;

        function writeDataToCourseCS3() {
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'status').set('Ingeschreven');
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'huiswerk/' + '1/' + 'antwoord').set('');
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'huiswerk/' + '1/' + 'id').set(1);
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'huiswerk/' + '1/' + 'vraag').set('Wat zijn de vaktermen binnen dit vakgebied?');
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'huiswerk/' + '2/' + 'antwoord').set('');
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'huiswerk/' + '2/' + 'id').set(2);
          firebase.database().ref('/users/' + uid + '/vakken/' + '/medewerker_poetsbedrijf/' + 'huiswerk/' + '2/' + 'vraag').set('Omschrijf de vaktermen.');
        }
        const xpArray = [];
        const ref = firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + 'xp');
        ref.on('value', function(studentxp) {
          xpArray.push(studentxp.val());
        });
        const intXP = Number(xpArray);
        this.setState({xp: intXP}, function () {
          const listXP = this.state.xp;
          if(reward == 25) {
            const beloning = listXP+25;
            reward = 0;
            xpUP();
            firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + '/xp/').set(beloning);
          }
        });
        setTimeout(writeDataToCourseCS3, 3000);
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ activeSnackbarCS3: false })
    };

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid>
                  <Link to='/Curriculum'>
                    <Button variant='contained' endIcon={<MenuBookIcon/>} onClick={() => {this.handleClick()}}>
                      Inschrijven
                    </Button>
                  </Link>

                  <Snackbar style={{right: '8px', left: '8px', justifyContent: 'center'}}
                  ContentProps={{
                      classes: {
                          root: classes.root
                      }
                  }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={this.state.activeSnackbarCS3}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={<span><CheckCircleOutlineIcon style= {{marginBottom: '-5px', paddingRight: '5px'}}/>Je hebt 25XP verdient!</span>}
                   />
                </Grid>
            </div>

        );

    }
}

export default withStyles(styles)(SnackbarCompCS3);
