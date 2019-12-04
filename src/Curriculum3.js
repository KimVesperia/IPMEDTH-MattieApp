import React, { useState, useEffect } from 'react';
import {Grid, Card, TextField, Container, MenuItem, CardHeader, CardActions, CardContent, Button, Typography, LinearProgress, Avatar, Badge, Box}  from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const keuzes = [
  {
    value: 'Ik wil tijdens iedere projectgroep de voorzitter zijn.',
    label: 'Ik wil tijdens iedere projectgroep de voorzitter zijn.',
  },
  {
    value: 'Ik schrijf elke dag iets op wat ik goed heb gedaan.',
    label: 'Ik schrijf elke dag iets op wat ik goed heb gedaan.',
  },
  {
    value: 'De eerste 2 uur van de dag werk ik aan mijn planning.',
    label: 'De eerste 2 uur van de dag werk ik aan mijn planning.',
  },
  {
    value: 'Vanaf het begin van een blok elke week 2 uur leren.',
    label: 'Vanaf het begin van een blok elke week 2 uur leren.',
  },
];

const StyledBadge1 = withStyles(theme => ({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#F5F5F5',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
    root: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    h2: {
      color: '#536DFE !important',
    },
    card: {
        margin: 20,
    },
    title: {
        fontSize: 14,
    },
    progressBar: {
      marginBottom: theme.spacing(3),
      backgroundColor: '#1976d269 !important',
    },
    pos: {
        marginBottom: 12,
    },
    fixedHeight: {
        height: 240,
    },
    avatar: {
        backgroundColor: '#ff5722',
    },
    modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    color: 'black',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
    width: '35%',
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  avatar: {
    margin: '-10px -20px',
    position: 'absolute',
  },
  avatar2: {
    margin: '0 100px 0 100px',
    position: 'relative',
  },
  avatar22: {
    position: 'relative',
    width: '100%',
  },
  avatar1: {
    backgroundColor: '#0f795b',
    fontSize: '30px !important',
    width: '100px',
    height: '100px',
    margin: '0 auto',
  },
  cardten: {
    maxHeight: '190px',
  },
}));

export default function SimpleCard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

const handleOpen = () => {
  setOpen(true);
};

const handleOpen1 = () => {
  setOpen1(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleClose1 = () => {
  setOpen1(false);
};

const [currency, setCurrency] = React.useState('EUR');

const handleChange = event => {
  setCurrency(event.target.value);
};

const [completed, setCompleted] = useState(50);

const progress = (completed) => {
    if (completed > 75) {
        setCompleted(75);
    } else {
        const diff = Math.random() * 10;
        var timer = setTimeout(() => progress(completed + diff), 100);
        setCompleted(completed);
    }
}

const [completed2, setCompleted2] = useState(35);

const progress2 = (completed2) => {
    if (completed2 > 60) {
        setCompleted2(60);
    } else {
        const diff2 = Math.random() * 10;
        var timer2 = setTimeout(() => progress2(completed2 + diff2), 100);
        setCompleted2(completed2);
    }
}

useEffect(() => {
    if(completed<75){
        var timer = setTimeout(() => progress(50), 100);
    }
    else if (completed2<60) {
        var timer2 = setTimeout(() => progress2(35), 100);
    }

    return function cleanup() {
        clearInterval(timer);
        clearInterval(timer2);
    };
});

  return (

    <div className={classes.root}>
        <Grid container>
            <Grid item xs={9}>
                <Card className={classes.card}>
                        <CardContent className={classes.cardten}>

                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item style={{width: '100%'}}>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Curriculum Samenstellen
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                    Stap 3/4
                                    </Typography>
                                    <LinearProgress className={classes.progressBar} variant="determinate" value={completed} />

                                    <Typography variant="body2" component="p">
                                    Stel jouw eigen curriculum samen en plan zelf wat jij wilt leren!
                                    <br /><b>- Voer je motivatie in</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs container direction="row" justify="flex-end" alignItems="flex-end">
                                    <Box m={2}>
                                        <StyledBadge1 badgeContent={'XP'} color="primary">
                                            <Avatar >500</Avatar>
                                        </StyledBadge1>
                                    </Box>
                                </Grid>
                            </Grid>
                            <br/>
                            <Button size="small" href="/curriculum2">Stap Terug</Button>
                        </CardContent>
                    </Card>
                </Grid>
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardten}>

                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Jouw voortgang
                        </Typography>

                        <Grid container wrap="nowrap" spacing={2}>
                            {/*<Grid item>
                            //     <Avatar className={classes.avatar}>M</Avatar>
                            // </Grid> */}
                            <Grid item xs>
                                <Typography>Marinus van den Oever</Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Typography className={classes.pos} color="textSecondary">
                        Level 1 - 600/1000 XP
                        </Typography>
                        <LinearProgress className={classes.progressBar} variant="determinate" value={completed2} />
                        <br/>
                        <Button size="small">Naar profiel</Button>
                    </CardContent>
                </Card>
            </Grid>


            <Grid item xs={6} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item style={{width: '100%'}}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Persoonlijke Motivatie
                            </Typography>
                              <Typography variant="body2" component="p">

                              <div>Waarom heb je voor dit vak gekozen?</div>
                              </Typography>
                                <TextField
                                  required
                                  fullWidth
                                  id="outlined-required"
                                  label="Mijn motivatie"
                                  defaultValue=""
                                  className={classes.textField}
                                  margin="normal"
                                  variant="outlined"
                                  />
                            </Grid>
                            <Grid item xs container direction="row" justify="flex-end" alignItems="flex-end">
                                <Box m={2}>
                                    <StyledBadge1 badgeContent={'XP'} color="primary">
                                    <Avatar>250</Avatar>
                                    </StyledBadge1>
                                </Box>
                            </Grid>
                        </Grid>

                        <Button style={{margin: '20px 0 -20px 0'}} variant='contained' color="primary" onClick={handleOpen}>
                          Kies
                        </Button>
                    </CardContent>
                    <CardActions>
                    <div>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>

                          <StyledBadge1 className={classes.avatar22} badgeContent={'XP'} color="primary">
                          <Avatar className={classes.avatar1}>250</Avatar>
                          </StyledBadge1>

                          <h3 id="transition-modal-title" style={{textAlign: 'center'}}>Goed gedaan!</h3>
                          <p id="transition-modal-description">Je hebt je curriculum succesvol samengesteld! Kies in het volgende scherm een beloning om verder te gaan.</p>
                          <Button fullWidth variant='contained' color="primary" href="/curriculum4">
                            Ga Verder
                          </Button>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={6} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item style={{width: '100%'}}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Kies een Leerdoel
                            </Typography>
                              <Typography style={{marginBottom: '3px'}}variant="body2" component="p">

                              <div>Wat is je leerdoel voor het vak?</div>
                              </Typography>
                              <TextField
                                id="standard-select-currency"
                                fullWidth
                                select
                                label=""
                                className={classes.textField}
                                value={currency}
                                onChange={handleChange}
                                SelectProps={{
                                  MenuProps: {
                                    className: classes.menu,
                                  },
                                }}
                                helperText="Selecteer een keuze"
                                margin="normal"
                              >
                                {keuzes.map(option => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid item xs container direction="row" justify="flex-end" alignItems="flex-end">
                                <Box m={2}>
                                    <StyledBadge1 badgeContent={'XP'} color="primary">
                                    <Avatar>100</Avatar>
                                    </StyledBadge1>
                                </Box>
                            </Grid>
                        </Grid>

                        <Button style={{margin: '20px 0 -20px 0'}} variant='contained' color="primary" onClick={handleOpen1}>
                          Kies
                        </Button>
                    </CardContent>
                    <CardActions>
                    <div>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open1}
                      onClose={handleClose1}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open1}>
                        <div className={classes.paper}>

                          <StyledBadge1 className={classes.avatar22} badgeContent={'XP'} color="primary">
                          <Avatar className={classes.avatar1}>100</Avatar>
                          </StyledBadge1>

                          <h3 id="transition-modal-title" style={{textAlign: 'center'}}>Goed gedaan!</h3>
                          <p id="transition-modal-description">Je hebt je curriculum succesvol samengesteld! Kies in het volgende scherm een beloning om verder te gaan.</p>
                          <Button fullWidth variant='contained' color="primary" href="/curriculum4">
                            Ga Verder
                          </Button>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    </div>

  );
}
