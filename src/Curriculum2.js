import React, { useState, useEffect } from 'react';
import {Grid, Card, CardActions, CardContent, Button, Typography, LinearProgress, Avatar, Badge, Box}  from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const [completed, setCompleted] = useState(25);

const progress = (completed) => {
    if (completed > 50) {
        setCompleted(50);
    } else {
        const diff = Math.random() * 10;
        var timer = setTimeout(() => progress(completed + diff), 100);
        setCompleted(completed);
    }
}

const [completed2, setCompleted2] = useState(10);

const progress2 = (completed2) => {
    if (completed2 > 35) {
        setCompleted2(35);
    } else {
        const diff2 = Math.random() * 10;
        var timer2 = setTimeout(() => progress2(completed2 + diff2), 100);
        setCompleted2(completed2);
    }
}

useEffect(() => {
    if(completed<50){
        var timer = setTimeout(() => progress(25), 100);
    }
    else if (completed2<35) {
        var timer2 = setTimeout(() => progress2(10), 100);
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
                                    Stap 2/4
                                    </Typography>
                                    <LinearProgress className={classes.progressBar} variant="determinate" value={completed} />

                                    <Typography variant="body2" component="p">
                                    Stel jouw eigen curriculum samen en plan zelf wat jij wilt leren!
                                    <br /><b>- Kies hier de vakken waarvoor je interesse hebt.</b>
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
                            <Button size="small" href="/curriculum">Stap Terug</Button>
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
                        Level 1 - 350/1000 XP
                        </Typography>
                        <LinearProgress className={classes.progressBar} variant="determinate" value={completed2} />
                        <br/>
                        <Button size="small">Naar profiel</Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Assistent fietsenmaker
                            </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Subdoel - Ik weet wat de reden voor de indeling van de werkplek is
                                </Typography>
                                <Typography variant="body2" component="p">
                                Hier leer je al de fijne kneepjes van het fietsenmakersvak. Je krijgt een eigen leerwerkplek met gereedschap en materialen.
                                </Typography>
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
                          <p id="transition-modal-description">Je hebt 250 punten behaald! Klik verder om je curriculum verder samen te stellen en om meer punten te verdienen!</p>
                          <Button fullWidth variant='contained' color="primary" href="/curriculum3">
                            Ga Verder
                          </Button>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Assistent Monteur
                            </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Subdoel - Ik kan 2 beschermingsmiddelen noemen en uitleggen waar deze voor dienen.
                                </Typography>
                                <Typography variant="body2" component="p">
                                Sleutel je graag en vind je vieze handen geen probleem? Maak dan van je hobby je werk van en kies voor deze vak.
                                </Typography>
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
                          <p id="transition-modal-description">Je hebt 250 punten behaald! Klik verder om je curriculum verder samen te stellen en om meer punten te verdienen!</p>
                          <Button fullWidth variant='contained' color="primary" href="/curriculum3">
                            Ga Verder
                          </Button>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Caravanhersteller
                            </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Subdoel - Ik herken de inhoud van een plattegrond van het BPV-bedrijf.
                                </Typography>
                                <Typography variant="body2" component="p">
                                Een caravanhersteller verricht onderhoud en reparaties aan onderstellen van caravans en trailers en houdt zich bezig met de opbouw daarvan.
                                </Typography>
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
                          <p id="transition-modal-description">Je hebt 250 punten behaald! Klik verder om je curriculum verder samen te stellen en om meer punten te verdienen!</p>
                          <Button fullWidth variant='contained' color="primary" href="/curriculum3">
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
