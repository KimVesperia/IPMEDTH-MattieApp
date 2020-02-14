import React from 'react';
import {Grid, Button, Typography}  from '@material-ui/core/';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import SnackbarCompNL from "./SnackbarCompNL";
import SnackbarCompEN from "./SnackbarCompEN";

import SnackbarCompCS1 from "./SnackbarCompCS1";
import SnackbarCompCS2 from "./SnackbarCompCS2";
import SnackbarCompCS3 from "./SnackbarCompCS3";
import SnackbarCompCS4 from "./SnackbarCompCS4";
import SnackbarCompCS5 from "./SnackbarCompCS5";

import {TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core/';

import Alert from '@material-ui/lab/Alert';

import * as firebase from "firebase";
import 'firebase/database';

const styles = theme => ({
  root: {
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
          margin: theme.spacing(2),
      },
      [theme.breakpoints.up('md')]: {
          margin: theme.spacing(3),
      },
      [theme.breakpoints.up('lg')]: {
          margin: theme.spacing(3),
      },
  },
  ButtonStyle: {
    marginTop: 15,
    marginRight: 15,
  }
});

class Curriculum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xp: [],
      courseNL: [],
      courseEN: [],
      course1: [],
      course2: [],
      course3: [],
      course4: [],
      course5: [],
      activeSnackbarNL: false,
      activeSnackbarEN: false,
      activeSnackbarCS1: false,
      activeSnackbarCS2: false,
      activeSnackbarCS3: false,
      activeSnackbarCS4: false,
      activeSnackbarCS5: false,
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getUserXP();
    this.getDataCourseNL();
    this.getDataCourseEN();
    this.getDataCourse1();
    this.getDataCourse2();
    this.getDataCourse3();
    this.getDataCourse4();
    this.getDataCourse5();
  }

  getUserData = () => {
    const ref = firebase.database().ref('/');
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  getUserXP = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const ref = firebase.database().ref('/users/' + uid + '/persoonsgegevens/' + 'xp');
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({xp: state}, function () {
          return this.state.xp;
      });
    });
  };

  getDataCourseNL = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const nlCourse = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'nederlands/').on('value', function(snap) {
      snap.forEach(function(course){
        nlCourse.push(course.val());
      })
    })
    this.setState({courseNL: nlCourse})
  };

  getDataCourseEN = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const enCourse = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'engels/').on('value', function(snap) {
      snap.forEach(function(course){
        enCourse.push(course.val());
      })
    })
    this.setState({courseEN: enCourse})
  };

  getDataCourse1 = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const courseone = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'caravanhersteller/').on('value', function(snap) {
      snap.forEach(function(course){
        courseone.push(course.val());
      })
    })
    this.setState({course1: courseone})
  };

  getDataCourse2 = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const coursetwo = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'medewerker_montage/').on('value', function(snap) {
      snap.forEach(function(course){
        coursetwo.push(course.val());
      })
    })
    this.setState({course2: coursetwo})
  };

  getDataCourse3 = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const coursethree = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'medewerker_poetsbedrijf/').on('value', function(snap) {
      snap.forEach(function(course){
        coursethree.push(course.val());
      })
    })
    this.setState({course3: coursethree})
  };

  getDataCourse4 = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const coursefour = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'assistent_fietsenmaker/').on('value', function(snap) {
      snap.forEach(function(course){
        coursefour.push(course.val());
      })
    })
    this.setState({course4: coursefour})
  };

  getDataCourse5 = () => {
    const user = firebase.auth().currentUser;
    const uid = firebase.auth().W;
    const coursefive = [];
    firebase.database().ref('/users/' + uid + '/vakken/' + 'assistent_monteur/').on('value', function(snap) {
      snap.forEach(function(course){
        coursefive.push(course.val());
      })
    })
    this.setState({course5: coursefive})
  };

  render() {
    const { classes } = this.props;
    const columns = [
        { id: 'vak', label: 'Vak'},
        { id: 'weekDatum', label: 'Week'},
        { id: 'beloning', label: 'Beloning'},
        { id: 'status', label: 'Status'},
        { id: 'actie', label: 'Actie'},
    ];

    function createData(vak, weekDatum, beloning, status, actie) {
        return { vak, weekDatum, beloning, status, actie};
    }

    const rowsNL = [
        createData('Nederlands', 'Week 1', '25XP', 'Open', <SnackbarCompNL/>)
    ];

    const rowsNLDone = [
        createData('Nederlands', 'Week 1', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsNL1 = [
        createData('Nederlands', 'Week 1', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsNL2 = [
        createData('Nederlands', 'Week 1', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsNL3 = [
        createData('Nederlands', 'Week 1', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsNL4 = [
        createData('Nederlands', 'Week 1', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsNL5 = [
        createData('Nederlands', 'Week 1', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsEN = [
        createData('Engels', 'Week 2', '25XP', 'Open', <SnackbarCompEN/>)
    ];

    const rowsENDone = [
        createData('Engels', 'Week 2', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsEN1 = [
        createData('Engels', 'Week 2', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsEN2 = [
        createData('Engels', 'Week 2', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsEN3 = [
        createData('Engels', 'Week 2', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsEN4 = [
        createData('Engels', 'Week 2', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsEN5 = [
        createData('Engels', 'Week 2', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsCourse1 = [
        createData('Caravanhersteller', 'Week 2', '25XP', 'Open', <SnackbarCompCS1/>)
    ];

    const rowsCourse1Done = [
        createData('Caravanhersteller', 'Week 2', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsCourse11 = [
        createData('Caravanhersteller', 'Week 2', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsCourse12 = [
        createData('Caravanhersteller', 'Week 2', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsCourse13 = [
        createData('Caravanhersteller', 'Week 2', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse14 = [
        createData('Caravanhersteller', 'Week 2', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse15 = [
        createData('Caravanhersteller', 'Week 2', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsCourse2 = [
        createData('Medewerker Montage/Demontage', 'Week 2', '25XP', 'Open', <SnackbarCompCS2/>)
    ];

    const rowsCourse2Done = [
        createData('Medewerker Montage/Demontage', 'Week 2', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsCourse21 = [
        createData('Medewerker Montage/Demontage', 'Week 2', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsCourse22 = [
        createData('Medewerker Montage/Demontage', 'Week 2', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsCourse23 = [
        createData('Medewerker Montage/Demontage', 'Week 2', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse24 = [
        createData('Medewerker Montage/Demontage', 'Week 2', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse25 = [
        createData('Medewerker Montage/Demontage', 'Week 2', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsCourse3 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', '25XP', 'Open', <SnackbarCompCS3/>)
    ];

    const rowsCourse3Done = [
        createData('Medewerker Poetsbedrijf', 'Week 2', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsCourse31 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsCourse32 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsCourse33 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse34 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse35 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsCourse4 = [
        createData('Assistent Fietsenmaker', 'Week 2', '25XP', 'Open', <SnackbarCompCS4/>)
    ];

    const rowsCourse4Done = [
        createData('Assistent Fietsenmaker', 'Week 2', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsCourse41 = [
        createData('Assistent Fietsenmaker', 'Week 2', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsCourse42 = [
        createData('Assistent Fietsenmaker', 'Week 2', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsCourse43 = [
        createData('Assistent Fietsenmaker', 'Week 2', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse44 = [
        createData('Assistent Fietsenmaker', 'Week 2', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse45 = [
        createData('Assistent Fietsenmaker', 'Week 2', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsCourse5 = [
        createData('Assistent Monteur', 'Week 2', '25XP', 'Open', <SnackbarCompCS5/>)
    ];

    const rowsCourse5Done = [
        createData('Assistent Monteur', 'Week 2', 'Ontvangen', 'Ingeschreven', <Link to="/homework" style={{ textDecoration: 'none' }}><Button variant='contained' color="primary">Huiswerk Overzicht</Button></Link>)
    ];

    const rowsCourse51 = [
        createData('Assistent Monteur', 'Week 2', '25XP', 'Ingeschreven', 'Je bent ingeschreven')
    ];

    const rowsCourse52 = [
        createData('Assistent Monteur', 'Week 2', '25XP', 'Wordt Nagekeken...', 'Je bent ingeschreven')
    ];

    const rowsCourse53 = [
        createData('Assistent Monteur', 'Week 2', '25XP', 'Goedgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse54 = [
        createData('Assistent Monteur', 'Week 2', '25XP', 'Afgekeurd', 'Je bent ingeschreven')
    ];

    const rowsCourse55 = [
        createData('Assistent Monteur', 'Week 2', '25XP', 'Afgerond', 'Je bent ingeschreven')
    ];

    const rowsEMPTY = [
        createData('Geen openstaande vakken', '', '', '', <Link to='/Homework'><Button variant="outlined" endIcon={<MenuBookIcon/>}> Huiswerk Overzicht</Button></Link>)
    ];


    const user = firebase.auth().currentUser;

    const listXP = this.state.xp;

    const listCourseNL = this.state.courseNL.map((coursestatusNL) =>
      coursestatusNL ? coursestatusNL : "")

    const listCourseEN = this.state.courseEN.map((coursestatusEN) =>
      coursestatusEN ? coursestatusEN : "")

    const listCourse1 = this.state.course1.map((coursestatus1) =>
      coursestatus1 ? coursestatus1 : "")

    const listCourse2 = this.state.course2.map((coursestatus2) =>
      coursestatus2 ? coursestatus2 : "")

    const listCourse3 = this.state.course3.map((coursestatus3) =>
      coursestatus3 ? coursestatus3 : "")

    const listCourse4 = this.state.course4.map((coursestatus4) =>
      coursestatus4 ? coursestatus4 : "")

    const listCourse5 = this.state.course5.map((coursestatus5) =>
      coursestatus5 ? coursestatus5 : "")

    var hwCheck = false;
    var hwDone = false;

    if (user) {
      // User is signed in.
      return (
        <div className={classes.root}>
          <Grid container>

          {/* Begroeting */}

            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography component="h4" variant="h5" gutterBottom={true}>Leerplan</Typography>
                </Grid>
                <Grid item xs={8} md={7} lg={5} style={{marginBottom: 20}}>
                  <Alert 
                      className="alertColor" 
                      style={{border: '1px solid #3f5cfc'}}
                      severity="info" 
                      variant="outlined"
                      >
                      Vakken overzicht | Schrijf je in voor openstaande vakken.
                  </Alert>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
                        <TableHead>

                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                    key={column.id}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>

                        </TableHead>

                        <TableBody>
                        {/*Nederlands*/}
                        {(() => {
                          if (listCourseNL.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsNL.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Nederlands Status*/}
                        {(() => {
                          if (listCourseNL.includes("Ingeschreven") | listCourseNL.includes("Nakijken") | listCourseNL.includes("Goedgekeurd") | listCourseNL.includes("Afgekeurd") | listCourseNL.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsNLDone.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Engels*/}
                        {(() => {
                          if (listCourseEN.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsEN.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Engels Status*/}
                        {(() => {
                          if (listCourseEN.includes("Ingeschreven") | listCourseEN.includes("Nakijken") | listCourseEN.includes("Goedgekeurd") | listCourseEN.includes("Afgekeurd") | listCourseEN.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsENDone.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Caravanhersteller*/}
                        {(() => {
                          if (listCourse1.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse1.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Caravanhersteller Status*/}
                        {(() => {
                          if (listCourse1.includes("Ingeschreven") | listCourse1.includes("Nakijken") | listCourse1.includes("Goedgekeurd") | listCourse1.includes("Afgekeurd") | listCourse1.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse1Done.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Medewerker Montage/Demontage*/}
                        {(() => {
                          if (listCourse2.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse2.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Medewerker Montage/Demontage Status*/}
                        {(() => {
                          if (listCourse2.includes("Ingeschreven") | listCourse2.includes("Nakijken") | listCourse2.includes("Goedgekeurd") | listCourse2.includes("Afgekeurd") | listCourse2.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse2Done.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Medewerker Poetsbedrijf*/}
                        {(() => {
                          if (listCourse3.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse3.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Medewerker Poetsbedrijf Status*/}
                        {(() => {
                          if (listCourse3.includes("Ingeschreven") | listCourse3.includes("Nakijken") | listCourse3.includes("Goedgekeurd") | listCourse3.includes("Afgekeurd") | listCourse3.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse3Done.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Assistent Fietsenmaker*/}
                        {(() => {
                          if (listCourse4.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse4.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Assistent Fietsenmaker Status*/}
                        {(() => {
                          if (listCourse4.includes("Ingeschreven") | listCourse4.includes("Nakijken") | listCourse4.includes("Goedgekeurd") | listCourse4.includes("Afgekeurd") | listCourse4.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse4Done.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Assistent Monteur*/}
                        {(() => {
                          if (listCourse5.length === 0) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse5.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Assistent Monteur Status*/}
                        {(() => {
                          if (listCourse5.includes("Ingeschreven") | listCourse5.includes("Nakijken") | listCourse5.includes("Goedgekeurd") | listCourse5.includes("Afgekeurd") | listCourse5.includes("Afgerond")) {
                            hwCheck = true;
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsCourse5Done.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        {/*Geen Huiswerk*/}
                        {(() => {
                          if (hwCheck === false) {
                            return (
                              <div style={{display: 'contents'}}>
                                {rowsEMPTY.map(row => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id}>
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))}
                              </div>
                            );
                          }
                        })()}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid item xs={12}>
                  <Button color="primary" variant="contained" component={Link} to={"/homework"} className={classes.ButtonStyle}>Huiswerk overzicht</Button>
                  <Button color="primary" variant="contained" component={Link} to={"/Dashboard"} className={classes.ButtonStyle}>Terug</Button>
                </Grid>
              </Grid>
          </Grid>
        </div>
      );
    }

    if (!user) {
        return  (<Redirect push to="/signin" />);
    }
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Curriculum));
