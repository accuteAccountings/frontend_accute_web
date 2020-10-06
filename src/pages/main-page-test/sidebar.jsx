import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconContext} from "react-icons";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {ReactComponent as DashboardIcon} from '../../assets/icons/dashboard1.svg';
import {ReactComponent as AccountingIcon} from "assets/icons/money.svg";
import {ReactComponent as TransactionsIcon} from "assets/icons/transaction.svg";
import {ReactComponent as ReportsIcon} from "assets/icons/reports.svg";
import {ReactComponent as AgencyIcon} from "assets/icons/agency.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  myreacticons: { 
      height: '10px',
      width:'10px',
  }
}));

export default function MainListItem() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
        <ListItem button>
     
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={handleClick}>
       <ListItemText primary="Accounting" />
       {open ? <ExpandLess /> : <ExpandMore />}
     </ListItem>
     <Collapse in={open} timeout="auto" unmountOnExit>
       <List component="div" disablePadding>
         <ListItem button className={classes.nested}>
           <ListItemText primary="Accounts" />
         </ListItem>
         <ListItem button className={classes.nested}>
           <ListItemText primary="Products" />
         </ListItem>
       </List>
     </Collapse>
   <ListItem button>
     
      <ListItemText primary="Transactions" />
    </ListItem>
    <ListItem button>
    
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
     
      <ListItemText primary="Agency" />
    </ListItem>
     
    </List>
  );
}