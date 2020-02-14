import React from "react";

import { Typography, ListItem } from '@material-ui/core/'
import { Redirect } from 'react-router';
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import {Container, Button, Collapse, IconButton, Grid, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, } from '@material-ui/core/';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

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

class StudentHomeWorkList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            open: true,
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


    getAllCourses() {
        const openstaandHuiswerkArray = [];
        const afgerondHuiswerkArray = [];
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
                }
                if(vakData.status ==="Goedgekeurd" || vakData.status === "Afgekeurd"){
                    vakActie = <Button className="btnClear1" variant="contained" color="primary" endIcon={<MenuBookIcon/>} component={Link} to={ {pathname: "/MakeHomework", state: { uid: uid, vak: vakNaam }} }> Terugkoppeling Bekijken</Button>
                }
                if(vakData.status === "Nakijken"){
                    vakActie = <Button variant="outlined" endIcon={<MenuBookIcon/>} component={Link} to={ {pathname: "/MakeHomework", state: { uid: uid, vak: vakNaam }} }> Huiswerk Aanpassen</Button>
                }

                if(vakData.status === "Afgerond"){
                    vakActie = <Button variant="outlined" endIcon={<MenuBookIcon/>} component={Link} to={ {pathname: "/MakeHomework", state: { uid: uid, vak: vakNaam }} }> Huiswerk Inzien</Button>
                    vakXP = 'Ontvangen'
                    afgerondHuiswerkArray.push({vakNaam, vakWeek, vakXP, vakStatus, vakActie})
                }else{
                    openstaandHuiswerkArray.push({vakNaam, vakWeek, vakXP, vakStatus, vakActie})
                }
            })

        })
        this.setState({openstaandHuiswerk: openstaandHuiswerkArray});
        this.setState({afgerondHuiswerk: afgerondHuiswerkArray})
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
                                style={{textTransform: 'capitalize'}}
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

    setOpen = () => {
        this.setState({open: true})
    }

    render(){
        const { classes } = this.props;
        const user = firebase.auth().currentUser;

        if(user) {
          return(
              <div className={classes.root}>
                  {this.state.isLoading ?
                      <></>
                  :
                      <Grid container>

                          <Grid item xs={12}>
                              <Typography style={{marginBottom: 10}} component="h4" variant="h5" gutterBottom={true}>Openstaand Huiswerk</Typography>
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
                                } else {
                                  return (
                                    <TableContainer component={Paper}>
                                        {this.generateTable(this.state.openstaandHuiswerk)}
                                    </TableContainer>
                                  )
                                }
                              })()}
                          </Grid>

                          <Grid item xs={12}>
                              <br />
                              <Typography style={{marginBottom: 20}} component="h4" variant="h5" gutterBottom={true}>Afgerond Huiswerk</Typography>
                              {(() => {
                                if (this.state.afgerondHuiswerk.length == 0) {
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
                                                            Geen afgerond huiswerk? Ga naar <Link to='/Curriculum' style={{display: 'contents'}}> leerplan</Link> of klik nogmaals op 'huiswerk' in het menu.
                                                        </Alert>
                                                    </Collapse>
                                                  </TableCell>
                                              </TableRow>
                                          </TableHead>
                                        </Table>
                                      </TableContainer>
                                  </div>
                                  )
                                } else {
                                  return (
                                    <TableContainer component={Paper}>{this.generateTable(this.state.afgerondHuiswerk)}</TableContainer>
                                  )
                                }
                              })()}
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

export default withStyles(styles, { withTheme: true })(withRouter(StudentHomeWorkList));
