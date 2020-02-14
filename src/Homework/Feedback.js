import React from 'react';
import {Grid, Card,CardContent, Container, Button, Typography}  from '@material-ui/core/';
import { Link, withRouter } from 'react-router-dom';

import Questions from "../Questions";

import * as firebase from "firebase";
import 'firebase/database';

class Feedback extends React.Component {
    constructor(props) {
      super(props);

      this.addFunction = this.addFunction.bind(this);
      this.subtractFunction = this.subtractFunction.bind(this);

      this.setQuestionStatusGreen = this.setQuestionStatusGreen.bind(this);
      this.setQuestionStatusRed = this.setQuestionStatusRed.bind(this);

      this.uid = this.props.location.state.uid
      this.vak = this.props.location.state.vak

      this.state = {
          user: [],
          isLoading: true,
          awnsersWrong: 0,
          awnsersCorrect: 0,
      };
    }

    componentDidMount = () => {
      this.getQuestions();
      this.getDate();
      this.getTime();
      this.setState({isLoading: false});
    }

    addFunction = () => {
      this.setState({awnsersCorrect: this.state.awnsersCorrect + 1})
    }

    subtractFunction = () => {
      this.setState({awnsersWrong: this.state.awnsersWrong + 1})
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

    generateQuestions = () => {
      const vragenObject = this.state.questions
      return(
        <>
          {vragenObject.map(question=>{
            return(
              <Questions
              homework={question.antwoord}
              vraagNummer={question.id}
              vraag={question.vraag}
              vraagStatusGreen = {this.setQuestionStatusGreen}
              vraagStatusRed = {this.setQuestionStatusRed}
              addOne = {this.addFunction}
              subtractOne = {this.subtractFunction}
              callbackText = {this.getTextFieldValue}
            />
            )
          })}
        </>
      )
    }

    getTextFieldValue = (text, vraagNummer) => {
      this.setState({
        [vraagNummer]: {...this.state[vraagNummer], text: text}
      })
    }

    setQuestionStatusGreen = (vraagNummer) => {
      this.setState({
        [vraagNummer]: {...this.state[vraagNummer], vraagStatus: 'goedgekeurd'}
      })
    }

    setQuestionStatusRed = (vraagNummer) => {
      this.setState({
        [vraagNummer]: {...this.state[vraagNummer], vraagStatus: 'afgekeurd'}
      })
    }

    writeFeedbackApproved = () => {
      this.sendFeedbackData();
      firebase.database().ref('/users/'+this.uid+'/vakken/'+'/'+ this.vak+'/' + '/status').set('Goedgekeurd')
    };

    writeFeedbackDisapproved = () => {
      this.sendFeedbackData();
      firebase.database().ref('/users/'+this.uid+'/vakken/'+'/'+ this.vak+'/' + '/status').set('Afgekeurd')
    }

    sendFeedbackData = () => {
      Object.keys(this.state).map(key => {
        if(!isNaN(key)){
            var terugkoppeling = this.state[key].text;
            if(!terugkoppeling) {
              terugkoppeling = ''
              console.log(terugkoppeling);
            }

            firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/huiswerk/'+key+'/commentaar').set(terugkoppeling)
            firebase.database().ref('/users/'+this.uid+'/vakken/'+this.vak+ '/huiswerk/'+key+'/vraagStatus').set(this.state[key].vraagStatus)
            console.log(terugkoppeling);
        }
      })
    }

    render() {
      const card = {
        margin: 20,
      }
      const homeworkContent = {
        margin: 10,
        textAlign: "center",
        alignItems: 'center',
      }
      const verzendKnop = {
        margin: 5,
      }
      const link = {
        textDecoration: 'none',
      }

      const date = this.state.date;
      const time = this.state.time;
      const vak = this.props.location.state.vak;
      const vakString = vak.replace("_", " ");

      return (
        <Container maxWidth="sm">
          {this.state.isLoading ?
          <></>
          :
          <>
          <Grid item xs={12} sm={12}>
            <Card style={card}>
                <CardContent>
                    <Grid item xs={12} style={homeworkContent}>
                      <Typography style={{textTransform: 'capitalize'}} component="h5" variant="h4">{vakString}</Typography>
                    </Grid>

                    <Grid item xs={12} style={homeworkContent}>
                        <Typography component="h4" variant="h5" style={{fontSize: '20px'}}> Ingeleverd op {date} om {time}</Typography>
                    </Grid>

                    {this.generateQuestions()}

                    <Grid item xs={12} style={homeworkContent}>
                        <Typography>Aantal antwoorden goedgekeurd: {this.state.awnsersCorrect} </Typography>
                        <Typography>Aantal antwoorden afgekeurd: {this.state.awnsersWrong} </Typography>
                    </Grid>

                    <Grid item xs={12} style={homeworkContent}>
                        <Link to="/homeworklist" style={link}>
                          <Button onClick={() => {this.writeFeedbackApproved()}} variant='contained' color="primary" style={verzendKnop}> Huiswerk goedkeuren </Button>
                          <Button onClick={() => {this.writeFeedbackDisapproved()}} variant='contained' color="primary" style={verzendKnop}> Huiswerk afkeuren </Button>
                        </Link>
                    </Grid>

                </CardContent>
            </Card>
          </Grid>
          </>
          }
        </Container>

      )
  }
}

export default withRouter(Feedback)
