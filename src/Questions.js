import React , {Component} from 'react';
import 'firebase/database';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const question = {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: '5px'
}
const awnser = {
    margin: 25,
}
const questionNumber = {
    backgroundColor: '#3f5cfc',
    color: 'white',
    display: "flex",
    justifyContent:"center",
    width: '2rem',
    height: '2rem',
    alignItems: 'center',
    borderRadius:"50%",
}

const styles = theme => ({
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "lightgrey !important"
    }
});

class Questions extends Component {
    constructor(props) {
        super(props);

        this.handleClickGreen = this.handleClickGreen.bind(this);
        this.handleClickRed = this.handleClickRed.bind(this);

        this.state = {
            borderColorTextField: "", 
            textArea: false,
            disabled: false,
            showGreenButton: true,
            showRedButton: true,
            marginLeftGreen: 0,
            marginLeftRed: 0,
            selectedLanguage: '',
            commentaar: '',
        }
        
    }
    
    handleClickGreen = () => {
        if (this.state.disabled) {
            return;
        }
        this.props.addOne()
        this.props.vraagStatusGreen(this.props.vraagNummer)

        this.setState({ 
            borderColorTextField: "#7dda32", 
            textArea: true,
            disabled: true,
            showRedButton: false,
            marginLeftGreen: 45,
        });
    };
    
    handleClickRed = () => {
        if (this.state.disabled) {
            return;
        }
        this.props.subtractOne()
        this.props.vraagStatusRed(this.props.vraagNummer)
        this.setState({ 
            borderColorTextField: "red", 
            textArea: true,
            disabled: true,
            showGreenButton: false,
            marginLeftRed: -58,
        }); 
    };

    handleTextChange = (text) => {
        this.setState({commentaar: text})
        this.props.callbackText(text, this.props.vraagNummer)
    }

    render() {
        const { classes } = this.props;

        const CssTextField = withStyles({
            root: {
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: this.state.borderColorTextField,
                    borderWidth: '2px'
                },
                '&:hover fieldset': {
                    borderColor: this.state.borderColorTextField,
                },
                '&.Mui-focused fieldset': {
                    borderColor: this.state.borderColorTextField,
                    borderWidth: '2px'
                },
                },
            },
        })(TextField);

        const greenbtn = {
            backgroundColor: '#7dda32',
            color: 'white',
            marginBottom: 20,
            marginLeft: this.state.marginLeftGreen
        }
        const redbtn = {
            backgroundColor: 'red',
            color: 'white',
            marginBottom: 20,
            marginLeft: this.state.marginLeftRed
        }

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography component="h2" style={questionNumber}> {this.props.vraagNummer} </Typography>
                    </Grid>

                    <Grid item style={question}>
                        <Typography component="h2"> {this.props.vraag} </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={awnser}>
                    <CssTextField
                    value={this.props.homework}
                    label="Gegeven antwoord"
                    rows="4"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>

                <Grid container alignItems="center" justify="center">
                    <Grid item xs={3}>
                        { 
                        this.state.showGreenButton
                        ?
                        <Button 
                            disabled={this.state.disabled}
                            onClick = {this.handleClickGreen}  
                            variant="contained"
                            style={greenbtn}
                            startIcon={<DoneIcon />}
                            >
                            {this.state.disabled ? 'Goedgekeurd' : 'Juist'}
                        </Button>
                        : null }
                    </Grid>

                <Grid item xs={3}>
                        { 
                        this.state.showRedButton 
                        ?  
                        <Button    
                            disabled={this.state.disabled}             
                            onClick={this.handleClickRed}  
                            variant="contained"
                            style={redbtn}
                            startIcon={<ClearIcon />}
                            >
                            {this.state.disabled ? 'Afgekeurd' : 'Onjuist'}
                        </Button>
                        : null }
                </Grid> 
            </Grid>

            <Grid container alignItems="center" justify="center">
                <Grid item xs={10}>
                    {this.state.textArea && 
                        <TextField
                        value={this.state.commentaar}
                        onChange={(event)=>{
                          this.handleTextChange(event.target.value);
                        }}
                        InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutline
                            }
                        }}
                        margin="normal"
                        placeholder="Typ hier uw terugkoppeling"
                        label="Terugkoppeling"
                        variant="outlined"
                        fullWidth
                        multiline
                        color="secondary"
                        rows="6"
                      />
                    }
                </Grid> 
            </Grid> 
        </div>
        );
    }
}

export default withStyles(styles)(Questions);
