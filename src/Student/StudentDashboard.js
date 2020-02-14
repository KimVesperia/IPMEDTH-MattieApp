import React from "react";

import { Typography, ListItem } from '@material-ui/core/'
import { Redirect } from 'react-router';
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, List, Container, Divider, Button, Collapse, IconButton, Grid, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, } from '@material-ui/core/';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExposurePlus2Icon from '@material-ui/icons/ExposurePlus2';

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
});

const columns = [
    { id: 'vakNaam', label: 'Vak'},
    { id: 'vakWeek', label: 'Week'},
    { id: 'vakXP', label: 'Beloning'},
    { id: 'vakStatus', label: 'Status'},
    { id: 'vakActie', label: 'Actie'}
];

class StudentDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            open: true,
            PriorityList: true,
        };
      }

    componentDidMount() {
        this.getUserData();
    }

    getUserData(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user.uid){
                this.setState({uid: user.uid});
                this.getAllCourses();

            } else{
                this.setState({uid: null})
            }
          });
      };

    getUserName = () => {
        let naam = ""
        firebase.database().ref('/users/' + this.state.uid + '/persoonsgegevens/' + 'naam').on('value', function(snap) {
            naam = snap.val();
        })
        this.setState({name: naam})
    };

    getAllCourses() {
        const openstaandHuiswerkArray = [];
        const feedbackArray = [];
        const uid = this.state.uid;

        firebase.database().ref('/users/' + this.state.uid + '/vakken/').on('value', function(snap) {
            snap.forEach(function(course){
                let vakData = course.val()
                let vakNaam = course.key
                let vakWeek = "Week 2"
                let vakXP = "25XP"
                let vakStatus = vakData.status
                let vakActie = ""
                if(vakData.status ==="Ingeschreven"){
                    vakActie = <Button variant="contained" color="primary" endIcon={<MenuBookIcon/>} component={Link} to={ {pathname: "/MakeHomework", state: { uid: uid, vak: vakNaam }} }> Maak Huiswerk</Button>
                    openstaandHuiswerkArray.push({vakNaam, vakWeek, vakXP, vakStatus, vakActie})
                }
                if(vakData.status === "Goedgekeurd" || vakData.status === "Afgekeurd"){
                    feedbackArray.push({vakNaam})
                }
            })

        })
        this.getUserName();
        this.setState({feedbackArray: feedbackArray});
        this.setState({openstaandHuiswerk: openstaandHuiswerkArray});
        this.setState({isLoading: false});
    }

    generateTable = (huiswerk) => {
        return(
            <Table>
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
                    {huiswerk.map(row => {
                        return(
                            <TableRow
                                component={ListItem}
                                button
                                tabIndex={-1}
                            >
                                {columns.map(column => {
                                    const value = row[column.id];
                                    return(
                                        <TableCell>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        )
    }

    displayName = () => {
        if(this.state.name === null | this.state.name === "") {
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
               Welkom, {this.state.name}!<br/>
               <Typography>
               <Welcome></Welcome>
               </Typography>
              </Typography>
            );
        }
    }
    returnPriorityItem = (openstaandHuiswerkArray) => {
        return(
            <Link to="homework">
                <ListItem button>
                    <ListItemIcon><ExposurePlus2Icon></ExposurePlus2Icon></ListItemIcon>
                    <ListItemText primary={`Huiswerk ${openstaandHuiswerkArray[0].vakNaam}`} style={{textAlign: 'left', color: 'red'}} />
                </ListItem>
            </Link>
        )
    }

    returnListItems = (feedbackArray) => {
        return(
            <Link to="homework">
                {feedbackArray.map(vak=>{
                    return(
                        <ListItem button>
                            <ListItemIcon><FeedbackIcon></FeedbackIcon></ListItemIcon>
                            <ListItemText primary={`Terugkoppeling ${vak.vakNaam}`} style={{textAlign: 'left', color: 'red'}} />
                        </ListItem>
                    )
                })}
            </Link>
        )

    }

    setOpen = () => {
        this.setState({open: true})
    }

    render(){
        const { classes } = this.props;
        const user = firebase.auth().currentUser;

        const handleClickPriorityList = () => {
            this.setState(prevState => ({
              PriorityList: !prevState.PriorityList
            }));
        };

        const handleClickToDoList = () => {
            this.setState(prevState => ({
              ToDoList: !prevState.ToDoList
            }));
        };

        if(user) {
          return(
              <div>
                  {this.state.isLoading ?
                      <></>
                  :
                      <Grid container>
                            <Grid item xs={12} className="welcomeToolBar">
                                {this.displayName(user)}
                            </Grid>

                            <Grid container className={classes.root} spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <Grid item xs={12}>
                                        <Typography component="h4" gutterBottom={true} variant="h5">Wat moet ik doen?</Typography>
                                    </Grid>
                                    <Card>
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
                                                        {this.returnPriorityItem(this.state.openstaandHuiswerk)}
                                                        {this.returnListItems(this.state.feedbackArray)}
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

                                <Grid item sm={8}>
                                    <Grid item xs={12}>
                                        <Typography component="h4" gutterBottom={true} variant="h5">Openstaand Huiswerk</Typography>
                                    </Grid>
                                    {(() => {
                                    if (this.state.openstaandHuiswerk.length == 0) {
                                        return (
                                        <div>
                                            <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                        key={'1'.id}
                                                        >
                                                        <Collapse in={this.state.open}>
                                                            <Alert
                                                                className="alertColor"
                                                                style={{border: '1px solid #3f5cfc'}}
                                                                action={
                                                                    <IconButton
                                                                    aria-label="close"
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        this.setState({open: false});
                                                                    }}
                                                                    >
                                                                    <CloseIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                }
                                                                severity="info"
                                                                variant="outlined"
                                                                >
                                                                Geen openstaand huiswerk? Ga naar <Link to='/Curriculum' style={{display: 'contents'}}> leerplan</Link> of klik nogmaals op 'huiswerk' in het menu.
                                                            </Alert>
                                                        </Collapse>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            </Table>
                                            </TableContainer>
                                        </div>
                                        )
                                    }
                                    else {
                                        return (
                                        <TableContainer component={Paper}>
                                            {this.generateTable(this.state.openstaandHuiswerk)}
                                        </TableContainer>
                                        )
                                    }
                                    })()}
                                </Grid>
                            </Grid>

                      </Grid>
                  }
              </div>
          )
        }
        else {
          return (<Redirect to ='/signin'/>)
        }

    }
}

export default withStyles(styles, { withTheme: true })(withRouter(StudentDashboard));
