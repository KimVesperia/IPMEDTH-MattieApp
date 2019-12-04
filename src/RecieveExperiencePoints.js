import React, { useState, useEffect } from 'react';
import {Container, LinearProgress, Button, Paper, Stepper, Step, StepLabel, Card, CardActions, CardContent, CardHeader, Avatar, CssBaseline, Grid, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: "#fafafa",
        },
        ul: {
            margin: 0,
            padding: 0,
        },
        li: {
            listStyle: 'none',
        },
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: '#ababab',
    },
    paper: {
        padding: 16,
    }
}));


export default function RecieveExperiencePoints() {
    const classes = useStyles();
    const [completed, setCompleted] = useState(0);

    const progress = (completed) => {
        if (completed > 10) {
            setCompleted(10);
        } else {
            const diff = Math.random() * 10;
            var timer = setTimeout(() => progress(completed + diff), 100);
            setCompleted(completed);
        }
    }

    useEffect(() => {
        if(completed<10){
            var timer = setTimeout(() => progress(0), 100);
        }
        return function cleanup() {
            clearInterval(timer);
        };
    });

  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>

        <Typography variant="h2" align="center" gutterBottom>
            Welkom bij Mattie
        </Typography>

        <Stepper activeStep={1}nonLinear alternativeLabel style={{backgroundColor: "#fafafa"}}>
            <Step completed={true}>
                <StepLabel>Profiel opgesteld</StepLabel>
            </Step>
            <Step>
                <StepLabel>Curriculum samenstellen</StepLabel>
            </Step>
            <Step>
                <StepLabel>Leerdoelen inplannen</StepLabel>
            </Step>
        </Stepper>

        <Paper className={classes.paper}>


            <Typography variant="subtitle1" gutterBottom>
            Jouw eerste stappen tot succes! Je hebt je geregistreerd en bent klaar om je curriculum samen te stellen.
            </Typography>


            <Typography variant="h6" gutterBottom color="primary">
                Jouw voortgang
            </Typography>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar className={classes.avatar}>M</Avatar>
                </Grid>
                <Grid item xs>
                    <Typography>Marinus van den Oever</Typography>
                    <Typography variant="caption" color="textSecondary">Student Hogeschool Leiden</Typography>
                </Grid>
            </Grid>
            <br />
            <Typography className={classes.pos} color="textSecondary">
            Level 1 - 100/1000 XP
            </Typography>
            <LinearProgress variant="determinate" value={completed} className={classes.pos} />

            <Button href ="/curriculum" variant="outlined" color="primary" style={{marginTop: 16}}>
                Curriculum Samenstellen
            </Button>
        </Paper>
    </Container>
  );
}
