import React from "react";
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, TextField, Card, CardContent, Button, Container } from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5),
    },
    questionNumber: {
        backgroundColor: '#3f5cfc',
        color: 'white',
        display: "flex",
        justifyContent:"center",
        width: '2rem',
        height: '2rem',
        alignItems: 'center',
        borderRadius:"50%",
    },
    card: {
        margin: 20
    },
    homeworkContent: {
        margin: 15,
        textAlign: "center",
        alignItems: 'center',
    },
    awnser: {
        margin: 25,
    },
    tf: {
        marginBottom: 10
    },
    question: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: '5px'
    },
    capitalize: {
        textTransform: 'capitalize',
    },
});

class MakeHomework extends React.Component {
    constructor(props) {
        super(props);

        this.uid = this.props.location.state.uid;
        this.vak = this.props.location.state.vak;

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.getQuestions();
        this.getDate();
        this.getTime();
        this.getStatus();
    }

    getQuestions = () => {
        const vragenArray = []
        firebase.database().ref('/users/' + this.uid + '/vakken/' + this.vak + '/huiswerk').on('value', function(snap) {
            snap.forEach(function(vraag){
                vragenArray.push(vraag.val())
            })
        })
        this.setState({questions: vragenArray});
        this.setState({isLoading: false});
    }

    getDate = () => {
      const ref = firebase.database().ref('/users/' + this.uid + '/vakken/' + this.vak + '/datum');
      ref.on("value", snapshot => {
        const state = snapshot.val();
        this.setState({date: state}, function () {
            return this.state.date;
        });
      });
    };

    getTime= () => {
      const ref = firebase.database().ref('/users/' + this.uid + '/vakken/' + this.vak + '/tijd');
      ref.on("value", snapshot => {
        const state = snapshot.val();
        this.setState({time: state}, function () {
            return this.state.time;
        });
      });
    };

    getStatus= () => {
      const ref = firebase.database().ref('/users/' + this.uid + '/vakken/' + this.vak + '/status');
      ref.on("value", snapshot => {
        const state = snapshot.val();
        this.setState({status: state}, function () {
            return this.state.status;
        });
      });
    };

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    submit = () => {

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const datum = dd + '/' + mm + '/' + yyyy;

        const hour = today.getHours();
        const minute = (today.getMinutes()<10?'0':'') + today.getMinutes();

        const time = hour + ':' + minute;

        Object.keys(this.state).map(key => {
            if(!isNaN(key)){
                firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/huiswerk' + '/'+key+'/antwoord').set(this.state[key])

            }
        })
        firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/datum').set(datum)
        firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/tijd').set(time)
        firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/status').set('Nakijken')

    };

    submit2 = () => {
        firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/status').set('Afgerond')
    };

    generateForm = () => {
        const vragenObject = this.state.questions;
        const date = this.state.date;
        const time = this.state.time;
        const status = this.state.status;
        const vak = this.props.location.state.vak;
        const vakString = vak.replace("_", " ");

        const { classes } = this.props;
        return(
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <Grid item xs={12} className={classes.homeworkContent}>
                            <Typography className={classes.capitalize} component="h5" variant="h4"> {vakString} </Typography>
                        </Grid>

                        <Grid item xs={12} className={classes.homeworkContent}>
                            {/* <Typography component="h4" variant="h5" style={{fontSize: '20px'}}> Week 1 en 2 </Typography> */}
                            {(() => {
                              if (date) {
                                return (
                                  <div>
                                    <Typography component="h4" variant="h5" style={{fontSize: '20px'}}> Ingeleverd op {date} om {time}</Typography>
                                  </div>
                                );
                              }
                            })()}
                        </Grid>
                        {vragenObject.map(question=>{
                            return(
                            <Grid>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography component="h2" className={classes.questionNumber}> {question.id} </Typography>
                                    </Grid>

                                    <Grid item className={classes.question}>
                                        <Typography component="h2">{question.vraag}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} className={classes.awnser}>

                                    {
                                    (question.vraagStatus === 'goedgekeurd') ?
                                        <div style={{margin: 25}}>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Huidig antwoord"
                                                disabled
                                                rowsMax="4"
                                                variant="outlined"
                                                multiline
                                                fullWidth
                                                value = {question.antwoord}
                                                className={classes.tf}
                                            />
                                            <Typography>Beoordeling: {question.vraagStatus}</Typography>
                                            <br />
                                            <TextField
                                                    id="standard-multiline-static"
                                                    label="Commentaar"
                                                    disabled
                                                    multiline
                                                    rowsMax="4"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={question.commentaar}
                                            />
                                        </div>
                                    :
                                    (status === 'Nakijken') ?
                                        <div style={{margin: 25}}>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Huidig antwoord"
                                                disabled
                                                rowsMax="4"
                                                multiline
                                                variant="outlined"
                                                fullWidth
                                                value = {question.antwoord}
                                                className={classes.tf}
                                            />
                                            <br />
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Nieuw antwoord"
                                                rowsMax="4"
                                                required
                                                multiline
                                                variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange}
                                                name={question.id}
                                            />
                                        </div>
                                    :
                                    ((question.vraagStatus === 'afgekeurd') ?
                                        <div style={{margin: 25}}>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Huidig antwoord"
                                                disabled
                                                rowsMax="4"
                                                multiline
                                                variant="outlined"
                                                fullWidth
                                                value = {question.antwoord}
                                                className={classes.tf}
                                            />
                                            <Typography>Beoordeling: {question.vraagStatus}</Typography>
                                            <br />
                                            <TextField
                                                    id="standard-multiline-static"
                                                    label="Commentaar"
                                                    disabled
                                                    multiline
                                                    rowsMax="4"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={question.commentaar}
                                            />
                                            <br />
                                            <br />
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Nieuw antwoord"
                                                rowsMax="4"
                                                required
                                                variant="outlined"
                                                multiline
                                                fullWidth
                                                onChange={this.handleChange}
                                                name={question.id}
                                            />
                                        </div>
                                        :
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Jouw antwoord"
                                                rowsMax="4"
                                                required
                                                variant="outlined"
                                                multiline
                                                fullWidth
                                                onChange={this.handleChange}
                                                name={question.id}
                                            />
                                        )

                                    }
                                </Grid>
                            </Grid>
                            )
                        })}
                        {(() => {
                          if (status === 'Goedgekeurd') {
                            return (
                              <div>
                                <Grid item xs={12} className={classes.homeworkContent}>
                                    <Button color="primary" variant="contained" component={Link} to={"/Dashboard"} onClick={()=>{this.submit2()}}>Afronden</Button>
                                </Grid>
                              </div>
                            );
                          } else {
                            return (
                              <div>
                                <Grid item xs={12} className={classes.homeworkContent}>
                                    <Button color="primary" variant="contained" component={Link} to={"/Dashboard"} onClick={()=>{this.submit()}}>Opsturen</Button>
                                </Grid>
                              </div>
                            );
                          }
                        })()}
                    </CardContent>
                </Card>
            </Container>
        )
    }

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.state.isLoading ?
                    <></>
                :
                    <>
                        {this.generateForm()}
                    </>
                }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(MakeHomework));
