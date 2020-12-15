import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const invoices= [
    {
        invoiceId:1243,
        description:"annual charges for trading",
        invoiceDate:"28 / Aug / 2020",
        dueDate: "05 / Sept / 2020",
        amount:1500,
        status: "paid",
    },
    {
        invoiceId:124,
        description:"annual charges for trading",
        invoiceDate:"28 / Aug / 2020",
        dueDate: "05 / Sept / 2020",
        amount:1500,
        status: "unpaid",
    },
    {
        invoiceId:123,
        description:"annual charges for trading",
        invoiceDate:"28 / Aug / 2020",
        dueDate: "05 / Sept / 2020",
        amount:1500,
        status: "paid",
    }
]
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    container1:{
        width:"70%",
        padding:"10px",
    },
    container2:{
        height:"100%",
        width:"20%",
    },
  });
function Billings() {
    const classes = useStyles();
    return (
        <div style={{display:"flex",justifyContent:"space-around", height:"400px"}}>

         
            <TableContainer className={classes.container1} component={Paper}>
                <h3>Invoices</h3>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Invoice Date</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((row) => (
                      <TableRow key={row.invoiceId}>
                        <TableCell>{row.invoiceId}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.invoiceDate}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
    
            
            <div className={classes.container2}>
              <Paper >
                <div style={{padding:"10px"}}>
                <p>Total:</p>
                <hr/>
                <p>Unpaid:</p>
                <hr/>
                <p>Paid:</p>
                <hr/>
                <p>Cancelled:</p>
                </div>
              </Paper>
              </div>
        </div>
    )
}

export default Billings
