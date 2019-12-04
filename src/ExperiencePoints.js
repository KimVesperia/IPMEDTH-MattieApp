import React from 'react';
import {Grid, Card, CardActions, CardContent, Button, Typography, LinearProgress, Avatar, Badge, Box}  from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge1 = withStyles(theme => ({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 20,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    fixedHeight: {
        height: 240,
    },
    avatar: {
        backgroundColor: '#ababab',
    }
}));

export default function SimpleCard() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
        <Grid container>
            <Grid item xs={9}>
                <Card className={classes.card}>
                        <CardContent>

                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Laatst behaalde resultaat
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                    Actiepunt - profiel opgesteld
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Jouw eerste stappen tot succes! 
                                    Je hebt je geregistreerd en bent klaar voor de volgende stap.
                                    <br /> 
                                    en hoe je met handgereedschap werkt.
                                    </Typography>
                                </Grid>
                                <Grid item xs container direction="row" justify="flex-end" alignItems="flex-end">
                                    <Box m={2}>
                                        <StyledBadge1 badgeContent={'XP'} color="primary">
                                            <Avatar style={{backgroundColor: '#3855f5'}}>100</Avatar>
                                        </StyledBadge1>
                                    </Box>
                                </Grid>
                            </Grid>

                        </CardContent>
                        <CardActions>
                            <Button size="small">Overzicht</Button>
                        </CardActions>
                    </Card>
                </Grid>
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent>
                        
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Jouw voortgang
                        </Typography>

                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar className={classes.avatar}>M</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>Marinus van den Oever</Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Typography className={classes.pos} color="textSecondary">
                        Level 1 - 100/1000 XP
                        </Typography>
                        <LinearProgress variant="determinate" value={10} />
                    </CardContent>
                    <CardActions>
                        <Button size="small">Naar profiel</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} style={{marginLeft: 20}}>
                <Typography component="h2" variant="h6" gutterBottom>
                    Aankomende doelen
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Typography variant="h5" component="h2">
                                Gereedschap, materialen en machines
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Leerdoel - Tijd resterend: 1 week
                                </Typography>
                                <Typography variant="body2" component="p">
                                Natuurlijk leer je hoe je met machines kan zagen, boren en schaven
                                <br /> 
                                en hoe je met handgereedschap werkt.
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
                    </CardContent>
                    <CardActions>
                        <Button size="small">Overzicht</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Typography variant="h5" component="h2">
                                Meetkunde
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Leerdoel - Tijd resterend: 2 weken
                                </Typography>
                                <Typography variant="body2" component="p">
                                Allereerst leert u de basisprincipes zoals het assenstelsel, coördinaten berekenen en de methoden van puntsbepaling. 
                                <br />
                                Daarna leert u meer over inwinningstechnieken zoals waterpassen, tachymetrie en GNSS.
                                <br /> 
                                In de derde module leert u meer over het uitzetten van landmeetkundige gegevens zoals het aanmaken van bestanden, uitzetten van punten lijnen en verklikken.
                                </Typography>
                            </Grid>
                            <Grid item xs container direction="row" justify="flex-end" alignItems="flex-end">
                                <Box m={2}>
                                    <StyledBadge1 badgeContent={'XP'} color="primary">
                                    <Avatar>350</Avatar>
                                    </StyledBadge1>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Overzicht</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Typography variant="h5" component="h2">
                                Taal en rekenen
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Leerdoel - Tijd resterend: 10 weken
                                </Typography>
                                <Typography variant="body2" component="p">
                                Om succesvol te zijn in je opleiding en je beroep is het belangrijk dat je niveau taal en rekenen voldoende is.
                                Het is belangrijk dat alle mbo-studenten een bepaald rekenniveau behalen. 
                                Voor hun beroep, maar ook voor de eventuele doorstroom naar het hbo. 
                                Er komen meer mogelijkheden voor de manier waarop dat wordt getoetst. 
                                </Typography>
                            </Grid>
                            <Grid item xs container direction="row" justify="flex-end" alignItems="flex-end">
                                <Box m={2}>
                                    <StyledBadge1 badgeContent={'XP'} color="primary">
                                    <Avatar>400</Avatar>
                                    </StyledBadge1>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Overzicht</Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    </div>

  );
}
