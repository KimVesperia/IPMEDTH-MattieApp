import React, {Component} from 'react';
import 'firebase/database';
import { Typography, Grid, TextField, Button, Snackbar } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import * as firebase from "firebase";

const styles = theme => ({

});

class SnackbarComp extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    handleClick = () => {
        this.setState({ activeSnackbar: true })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ activeSnackbar: false })
    };

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid>
                  <Button variant='contained' color="primary" onClick={() => {this.handleClick()}}>
                    Open success snackbar
                  </Button>

                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={this.state.activeSnackbar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="Zieke winst!"
                   />
                </Grid>
            </div>

        );

    }
}

export default withStyles(styles)(SnackbarComp);
