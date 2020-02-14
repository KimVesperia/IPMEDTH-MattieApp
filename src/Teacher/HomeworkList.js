import React from "react";

import { Typography, ListItem } from '@material-ui/core/'
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, } from '@material-ui/core/';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5),
    },
});

const columns = [
    { id: 'naam', label: 'Naam'},
    { id: 'email', label: 'Klas'},
    { id: 'status', label: 'Status'},
];

class HomeworkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            rows: [],
            vakkenRows: []
        };
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        const vakkenArray = {};
        firebase.database().ref('/users/').on('value', (snap) => {
            snap.forEach(function(student){
                let studentData = student.val();
                if(studentData.persoonsgegevens && studentData.vakken){

                    Object.keys(studentData.vakken).map(function(vak, index) {
                        let naam = studentData.persoonsgegevens.naam
                        let email = studentData.persoonsgegevens.email
                        let status = studentData.vakken[vak].status
                        let uid = student.key
                        let element = {naam, email, status, uid}

                        if (!vakkenArray[vak]) { vakkenArray[vak] = [];}
                        vakkenArray[vak].push(element);
                    });
                }
            })
            if(vakkenArray !== this.state.vakkenRows) {
                this.setState({vakkenRows: vakkenArray})
                this.setState({isLoading: false});
            }
        })
    };

    generateTables = () => {
        let vakken = this.state.vakkenRows

        return(
            <Grid container spacing={5}>
            {
                Object.keys(vakken).map(key => (
                    <Grid item xs={6}>
                        <Typography style={{textTransform: 'capitalize'}} component="h4" variant="h5" gutterBottom={true}>{key}</Typography>
                        <Paper >
                            <Table stickyHeader aria-label="sticky table">
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
                                {
                                    vakken[key].map(student => (
                                        <TableRow
                                            component={ListItem}
                                            button
                                            tabIndex={-1}
                                            onClick={()=>
                                            {
                                                student.status==="Nakijken" &&
                                                this.props.history.push("/feedback", {uid: student.uid, vak: key})}
                                            }
                                        >
                                            {columns.map(column => {
                                                const value = student[column.id];
                                                return(
                                                    <TableCell>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                ))
            }
            </Grid>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.state.isLoading ?
                    <></>
                :
                    <>
                        {this.generateTables()}
                    </>
                }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(HomeworkList));
