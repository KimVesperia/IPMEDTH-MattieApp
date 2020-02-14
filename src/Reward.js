import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CssBaseline, Grid, Typography, Container} from '@material-ui/core/';
import StarIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Kies je beloning
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Dit zijn je eerste stappen naar een succesvol studiejaar. Kies de beloning die jou het meest aanspreekt.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">

          
            <Grid item xs={12} sm={6} md={4}>
              <Card>                
                <CardHeader              
                    title={'Voortgangspunten'}
                    subheader={'Behaal je eerste punten'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={ <StarIcon /> }
                    className={classes.cardHeader}
                />
                <CardContent>
                    <ul>
                        <Typography component="li" variant="subtitle1" align="center">
                          Behaal dit onderdeel door je punten te verzilveren
                        </Typography>
                    </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant='contained' color="primary" href="/experiencepoints">
                    Kies
                  </Button>
                </CardActions>
              </Card>
            </Grid>


            <Grid item xs={12} sm={6} md={4}>
              <Card>                
                <CardHeader              
                    title={'Badge'}
                    subheader={'Behaal je eerste badge'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={ <StarIcon /> }
                    className={classes.cardHeader}
                />
                <CardContent>
                    <ul>
                        <Typography component="li" variant="subtitle1" align="center">
                          Speel nieuwe badges vrij door het behalen van je doelwitten!
                        </Typography>
                    </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant='contained' color="primary" href="/badges">
                    Kies
                  </Button>
                </CardActions>
              </Card>
            </Grid>


            <Grid item xs={12} sm={6} md={4}>
              <Card>                
                <CardHeader              
                    title={'Koffie'}
                    subheader={'of kortingsvoucher'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={ <StarIcon /> }
                    className={classes.cardHeader}
                />
                <CardContent>
                    <ul>
                        <Typography component="li" variant="subtitle1" align="center">
                          Een gratis koffie is op te halen bij MBO Rijnland
                        </Typography>
                    </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant='contained' color="primary" href="/coffee">
                    Kies
                  </Button>
                </CardActions>
              </Card>
            </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}