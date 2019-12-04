import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button} from '@material-ui/core/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SendIcon from '@material-ui/icons/Send';

const columns = [
  { id: 'naam', label: 'Naam'},
  { id: 'studentnummer', label: 'Studentnummer'},
  { id: 'klas', label: 'Klas'},
  { id: 'telefoonnummer', label: 'Telefoonnummer'},
  { id: 'status', label: 'Status'},
  { id: 'uitnodiging', label: 'Uitnodiging'}
];

function createData(naam, studentnummer, klas, telefoonnummer, status, uitnodiging) {
  return { naam, studentnummer, klas, telefoonnummer, status, uitnodiging, };
}

const rows = [
  createData('Marinus van den Oever', 's1101851', 'INF4C', 31620087252, 'Bevestigd', false),
  createData('Thomas Nolst Trenité', 's1101623', 'INF4C', 31610832706, 'Niet bevestigd', true),
  createData('Kim Phung', 's1102710', 'INF4C', 31637601432, 'Bevestigd', false),
];

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function InviteScreen() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
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
            {rows.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.studentnummer}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {console.log(row.telefoonnummer)}
                        {value === true &&
                            <Button variant="outlined" color="primary" endIcon={<SendIcon/>} href={`https://api.whatsapp.com/send?phone=+${row.telefoonnummer}&text=%20Hallo`} target="_blank">Verstuur Uitnodiging</Button>
                        }
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}