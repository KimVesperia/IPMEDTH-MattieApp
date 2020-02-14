import React, {Component} from 'react';
import 'firebase/database';
import { Typography, Grid, TextField, Button, Snackbar } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import * as firebase from "firebase";
import { Link } from 'react-router-dom';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const styles = theme => ({
  root: {
    background: '#4caf50',
    fontWeight: '600',
    justifyContent: 'center',
  }
});

class SnackbarCompInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    handleClick = () => {
        this.setState({ activeSnackbarInfo: true })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ activeSnackbarInfo: false })
    };

    render() {

        const { classes } = this.props;
        return (
            <div>
                <Grid>
                  <Link to='/profile'>
                    <Button variant='contained' color='primary' onClick={() => {this.handleClick()}}>
                      Profiel Aanmaken
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
                    open={this.state.activeSnackbarInfo}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={<span><CheckCircleOutlineIcon style= {{marginBottom: '-5px', paddingRight: '5px'}}/>Je hebt 25XP verdient!</span>}
                   />
                </Grid>
            </div>

        );

    }
}

export default withStyles(styles)(SnackbarCompInfo);
