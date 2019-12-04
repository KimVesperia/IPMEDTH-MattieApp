import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Badge collectie
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              In de Mattie app wordt jouw inzet beloond doormiddel van badges. 
              Elke badge heb je nodig om weer een stap verder te komen met het behalen van jouw leerdoel.
              Aan het eind van een vak kan je de badges inwisselen voor een prijs.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
     
              <Grid item key={1} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://www.anquotes.com/wp-content/uploads/2018/09/explore-quotes-anquotes-696x406.jpg"
                    title="Explore"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Ontdekker
                    </Typography>
                    <Typography>
                        Jouw eerste stappen tot succes! Je hebt je geregistreerd en bent klaar voor de volgende stap.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Bekijken
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={2} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://superawesomevectors.com/wp-content/uploads/2017/05/flat-vector-padlock-icon-800x566.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Planmatige werker
                    </Typography>
                    <Typography>
                        Je hebt voor jezelf doelen opgesteld die je wil behalen aankomende periode.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Meer Info
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={3} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://superawesomevectors.com/wp-content/uploads/2017/05/flat-vector-padlock-icon-800x566.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Doorzetter
                    </Typography>
                    <Typography>
                      Je geeft niet op totdat je doel bereikt is!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                        Meer Info
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={4} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://superawesomevectors.com/wp-content/uploads/2017/05/flat-vector-padlock-icon-800x566.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                        Meer Info
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={5} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://superawesomevectors.com/wp-content/uploads/2017/05/flat-vector-padlock-icon-800x566.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Vakman
                    </Typography>
                    <Typography>
                      Je hebt je vaardigheden aangetoond door het behalen van de eindopdracht.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                        Meer Info
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item key={6} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://superawesomevectors.com/wp-content/uploads/2017/05/flat-vector-padlock-icon-800x566.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Hoofdprijs
                    </Typography>
                    <Typography>
                      Gefeliciteerd, je hebt alle badges van dit jaar behaald!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                        Meer Info
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Mattie App
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Elke leerling heeft een Mattie nodig!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}