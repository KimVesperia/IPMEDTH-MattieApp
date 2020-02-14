import React from 'react';
import { Grid, Card, Divider, CardContent, Button, Typography }  from '@material-ui/core/';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import SnackbarComp from "./SnackbarComp";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposurePlus2Icon from '@material-ui/icons/ExposurePlus2';
import FeedbackIcon from '@material-ui/icons/Feedback';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as firebase from "firebase";
import 'firebase/database';
import './dashboard.css'

export function Welcome() {
    var weekday = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    var monthday = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    var monthYear = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

    // Dinsdag
    const getDay = () => {
        var currentDay = new Date();
        var dayOfTheWeek = weekday[currentDay.getDay()];
        return dayOfTheWeek;
     }

     //  10
     const getDate = () => {
        var currentDate = new Date();
        var dayOfTheMonth = monthday[currentDate.getDate() - 1];
        return dayOfTheMonth;
     }

     //  December
     const getMonth = () => {
        var currentMonth = new Date();
        var monthInYear = monthYear[currentMonth.getMonth()];
        return monthInYear;
     }

     // 2019
    const getYear = () => {
        const currentYear = new Date().getFullYear();
        return currentYear;
    }

    const day = getDay();
    const date = getDate();
    const month = getMonth();
    const year = getYear();

     return (
        day + ' ' + date + ' ' + month + ' ' + year
     );
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      count: 0,
      ToDoList: true,
      PriorityList: true,
      name: [],
      courseNL: [],
      courseEN: [],
      course1: [],
      course2: [],
      course3: [],
      course4: [],
      course5: [],
      homeWorkStatus: [],
      activeSnackbar: false,
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getUserName();
    this.getHomeWorkNL();
    this.getHomeWorkEN();
    this.getHomeWork1();
    this.getHomeWork2();
    this.getHomeWork3();
    this.getHomeWork4();
    this.getHomeWork5();
    this.getHomeWorkStatus();
  }

  componentWillMount() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.forceUpdate();
            }
        );
    }

  getUserData = () => {
    const ref = firebase.database().ref('/');
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  getUserName = () => {
    const user = firebase.auth();
    const ref = firebase.database().ref('/users/' + user.W + '/persoonsgegevens/' + 'naam');
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({name: state}, function () {
          return this.state.name;
      });
    });
  };

  getHomeWorkStatus = () => {
    const user = firebase.auth();
    const ref = firebase.database().ref('/users/' + user.W + '/vakken');
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({homeWorkStatus: state}, function () {
          return this.state.homeWorkStatus;
      });
    });
  };

  getHomeWorkNL = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({courseNL: hwArray})
  };

  getHomeWorkEN = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({courseEN: hwArray})
  };

  getHomeWork1 = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({course1: hwArray})
  };

  getHomeWork2 = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({course2: hwArray})
  };

  getHomeWork3 = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({course3: hwArray})
  };

  getHomeWork4 = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({course4: hwArray})
  };

  getHomeWork5 = () => {
    const user = firebase.auth();
    const hwArray = [];
    firebase.database().ref('/users/' + user.W).on('value', function(snap) {
      snap.forEach(function(studenthw){
        hwArray.push(studenthw.val());
      })
    })
    this.setState({course5: hwArray})
  };

  render() {
    const columns = [
        { id: 'vak', label: 'Vak'},
        { id: 'deadlineDatum', label: '(uiterste) Inleverdatum'},
        { id: 'status', label: 'Status'},
        { id: 'actie', label: 'Actie'},
    ];
    function createData(vak, deadlineDatum, status, actie) {
        return { vak, deadlineDatum, status, actie};
    }

    const rowsNL = [
        createData('Nederlands', 'Week 1', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsEN = [
        createData('Engels', 'Week 2', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsCourse1 = [
        createData('Caravanhersteller', 'Week 2', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsCourse2 = [
        createData('Medewerker Montage/Demontage', 'Week 2', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsCourse3 = [
        createData('Medewerker Poetsbedrijf', 'Week 2', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsCourse4 = [
        createData('Assistent Fietsenmaker', 'Week 2', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsCourse5 = [
        createData('Assistent Monteur', 'Week 2', 'Ingeschreven', <Link to='/homework'><Button variant="contained" color="primary" endIcon={<MenuBookIcon/>}> Maak Huiswerk</Button></Link>)
    ];

    const rowsEMPTY = [
        createData('Geen openstaand huiswerk', '', '', <Link to='/Curriculum'><Button variant="outlined" color="primary" endIcon={<MenuBookIcon/>}> Naar Leerplan</Button></Link>)
    ];

    const user = firebase.auth();

    const handleClickToDoList = () => {
      this.setState(prevState => ({
        ToDoList: !prevState.ToDoList
      }));
    };

    const handleClickPriorityList = () => {
       this.setState(prevState => ({
         PriorityList: !prevState.PriorityList
       }));
     };

    const listName = this.state.name;

    const listHomeWorkStatus = this.state.homeWorkStatus;

    const listHomeWorkNL = this.state.courseNL.map((studenthuiswerk) =>
      studenthuiswerk.nederlands ? studenthuiswerk.nederlands.status : ""
    )

    const listHomeWorkEN = this.state.courseEN.map((studenthuiswerk) =>
      studenthuiswerk.engels ? studenthuiswerk.engels.status : ""
    )

    const listHomeWorkCourse1 = this.state.course1.map((studenthuiswerk) =>
      studenthuiswerk.caravanhersteller ? studenthuiswerk.caravanhersteller.status : ""
    )

    const listHomeWorkCourse2 = this.state.course2.map((studenthuiswerk) =>
      studenthuiswerk.medewerker_montage ? studenthuiswerk.medewerker_montage.status : ""
    )

    const listHomeWorkCourse3 = this.state.course3.map((studenthuiswerk) =>
      studenthuiswerk.medewerker_poetsbedrijf ? studenthuiswerk.medewerker_poetsbedrijf.status : ""
    )

    const listHomeWorkCourse4 = this.state.course4.map((studenthuiswerk) =>
      studenthuiswerk.assistent_fietsenmaker ? studenthuiswerk.assistent_fietsenmaker.status : ""
    )

    const listHomeWorkCourse5 = this.state.course5.map((studenthuiswerk) =>
      studenthuiswerk.assistent_monteur ? studenthuiswerk.assistent_monteur.status : ""
    )

    var hwCheck = false;

    function displayName(){
     if(listName === null | listName === "") {
       return(
         <Typography style={{ float: 'left', marginLeft: '25px', fontWeight: '500', fontSize: '26px', letterSpacing: '0.5',}}>
          Welkom!
          <Typography>
          <Welcome></Welcome>
          </Typography>
         </Typography>
         );
     } else {
         return(
           <Typography style={{ float: 'left', marginLeft: '25px', fontWeight: '500', fontSize: '26px', letterSpacing: '0.5',}}>
            Welkom, {listName}!<br/>
            <Typography>
            <Welcome></Welcome>
            </Typography>
           </Typography>
         );
       }
    }

    function homeWork(){
     if(listHomeWorkNL.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Nederlands Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     }
     else if(listHomeWorkEN.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Engels Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     }
     else if(listHomeWorkCourse1.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Caravan Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     }
     else if(listHomeWorkCourse2.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Montage Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     }
     else if(listHomeWorkCourse3.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Poetsbedrijf Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     }
     else if(listHomeWorkCourse4.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Fietsenmaker Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     }
     else if(listHomeWorkCourse5.includes('Ingeschreven')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
              <ListItemText primary="Monteur Huiswerk" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
        return(<div></div>);
      }
    }

    function feedBackNL(){
     if(listHomeWorkNL.includes('Goedgekeurd') || listHomeWorkNL.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Nederlands" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function feedBackEN() {
     if(listHomeWorkEN.includes('Goedgekeurd') || listHomeWorkEN.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Engels" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function feedBackCourse1() {
     if(listHomeWorkCourse1.includes('Goedgekeurd') || listHomeWorkCourse1.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Caravanhersteller" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function feedBackCourse2() {
     if(listHomeWorkCourse2.includes('Goedgekeurd') || listHomeWorkCourse2.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Montage" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function feedBackCourse3() {
     if(listHomeWorkCourse3.includes('Goedgekeurd') || listHomeWorkCourse3.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Poetsbedrijf" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function feedBackCourse4() {
     if(listHomeWorkCourse4.includes('Goedgekeurd') || listHomeWorkCourse4.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Fietsenmaker" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function feedBackCourse5() {
     if(listHomeWorkCourse5.includes('Goedgekeurd') || listHomeWorkCourse5.includes('Afgekeurd')) {
       return(
         <Link to="homework">
           <ListItem button>
              <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
              <ListItemText primary="Terugkoppeling Monteur" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function noHomeWork(){
     if(!listHomeWorkStatus) {
       return(
         <Link to="Curriculum">
           <ListItem button>
               <ListItemIcon><ExposurePlus1Icon></ExposurePlus1Icon></ListItemIcon>
                  <ListItemText primary="Vakken Kiezen" style={{textAlign: 'left', color: 'red'}} />
           </ListItem>
         </Link>
         );
     } else {
       return(<div></div>);
     }
    }

    function noProfile(){
      if(listName == null) {
         return(
           <Link to="Profile">
             <ListItem button>
                 <ListItemIcon><ExposurePlus1Icon></ExposurePlus1Icon></ListItemIcon>
                    <ListItemText primary="Profiel Opstellen" style={{textAlign: 'left', color: 'red'}} />
             </ListItem>
           </Link>
           );
       } else {
          return(<div></div>);
        }
    }

    if (user.currentUser) {
      // User is signed in.
      return (
        <div className="root">
            <Grid container>
                  {/* Begroeting */}
                  <Grid item xs={12} className="welcomeToolBar">
                          {displayName()}
                  </Grid>

                  {/* To do list */}
                  <Grid item xs={12} sm={4} >
                    <Grid item xs={12} className="cardInfo">
                        <Typography component="h4" variant="h5">Wat moet ik doen?</Typography>
                    </Grid>
                    <Card className="card">
                        <CardContent>
                            <List>
                                <ListItem button onClick={handleClickPriorityList} style={{color: '#3f5cfc'}}>
                                    <ListItemIcon style={{color: '#3f5cfc'}}>
                                        <PriorityHighIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Belangrijkste punt" />
                                    {this.state.PriorityList ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                                <Collapse in={this.state.PriorityList} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {homeWork()}
                                        {noProfile()}
                                        {noHomeWork()}
                                        {feedBackNL()}
                                        {feedBackEN()}
                                        {feedBackCourse1()}
                                        {feedBackCourse2()}
                                        {feedBackCourse3()}
                                        {feedBackCourse4()}
                                        {feedBackCourse5()}
                                    <ListItem button>
                                        <ListItemIcon></ListItemIcon>
                                        <ListItemText primary="Doelwitten opstellen" style={{textAlign: 'left'}} />
                                    </ListItem>
                                    </List>
                                    <Divider />
                                </Collapse>

                                <ListItem button onClick={handleClickToDoList}>
                                    <ListItemIcon>
                                        <LowPriorityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Algemeen" />
                                    {this.state.ToDoList ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                                <Collapse in={this.state.ToDoList} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button component={Link} to='/homework' className="nestedGeneral">
                                            <ListItemIcon></ListItemIcon>
                                            <ListItemText primary="Huiswerk Overzicht" />
                                        </ListItem>

                                        <ListItem button component={Link} to='/homework' className="nestedGeneral">
                                            <ListItemIcon></ListItemIcon>
                                            <ListItemText primary="Feedback" />
                                        </ListItem>

                                    </List>
                                </Collapse>

                                </List>
                        </CardContent>
                    </Card>

                  </Grid>
                  {/* Tabel */}
                  <Grid item sm={8}>
                      <Grid item xs={12} className="cardInfo">
                          <Typography component="h4" variant="h5">Openstaande Huiswerk</Typography>
                      </Grid>
                      <Paper className="paper">
                          <Table className="table" aria-label="simple table">
                              <TableHead>

                                  <TableRow>
                                      {columns.map(column => (
                                          <TableCell
                                          key={column.id}
                                          align={column.align}
                                          style={{ minWidth: column.minWidth, backgroundColor: '#ffffff' }}
                                          >
                                          {column.label}
                                          </TableCell>
                                      ))}
                                  </TableRow>

                              </TableHead>

                              <TableBody>
                              {/*Nederlands 1*/}
                              {(() => {
                                if (listHomeWorkNL.includes('Ingeschreven')) {
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
                              {/*Engels 1*/}
                              {(() => {
                                if (listHomeWorkEN.includes('Ingeschreven')) {
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
                              {/*Caravanhersteller 1*/}
                              {(() => {
                                if (listHomeWorkCourse1.includes('Ingeschreven')) {
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
                              {/*Medewerker Montage/Demontage 1*/}
                              {(() => {
                                if (listHomeWorkCourse2.includes('Ingeschreven')) {
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
                              {/*Medewerker Poetsbedrijf 1*/}
                              {(() => {
                                if (listHomeWorkCourse3.includes('Ingeschreven')) {
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
                              {/*Assistent Fietsenmaker 1*/}
                              {(() => {
                                if (listHomeWorkCourse4.includes('Ingeschreven')) {
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
                              {/*Assistent Monteur 1*/}
                              {(() => {
                                if (listHomeWorkCourse5.includes('Ingeschreven')) {
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
                              {/*NO HOMEWORK*/}
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
                      </Paper>
                  </Grid>
            </Grid>
        </div>
      );
    }

    if (!user.currentUser) {
        return  (<Redirect push to="/signin" />);
    }
  }
}

export default Dashboard;
