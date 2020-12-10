import React from 'react';
import { Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import UserProfile from '../../containers/agency/UserProfile';


const useStyles = makeStyles({
  products_container:{
      fontFamily:"Arial, Helvetica, sans-serif",
      width:"90%",
      margin:"30px 20px",
  },
  product_container:{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"20px",
  },
  product_heading:{
    fontSize:"1.3rem",
    color:"#344f6b",
  },
  redirect_button:{
    borderRadius:"40px",
    borderColor:"green",
    color:"green",
  },
  divider:{
    backgroundColor:"grey",
    height:"1px",
    width:"100%"
  }
})
function Dash(props) {
  const classes = useStyles();

  return (
    <div>
        
        <UserProfile/>

        <div className={classes.products_container}>
           <h3 style={{fontFamily:"Arial, Helvetica, sans-serif"}}>Active Products</h3>
           <Paper elevation="3">
             <div>
               <div className={classes.product_container}>
                <p className={classes.product_heading}>Agency (code - 01A)</p>
                <div><Link to="/agency">
                  <Button variant="outlined" size="small"  className={classes.redirect_button} >Go to</Button></Link></div>              
               </div>
               <div className={classes.divider}></div>
               <div className={classes.product_container}>
                <p className={classes.product_heading}>Trading (code - 02T)</p>
                <Button variant="outlined" size="small" className={classes.redirect_button} onClick={()=>alert("trading feature in development")}>Go to</Button>
               </div>
             </div>
           </Paper>
        </div>
        
      
    </div>
  )
}

export default Dash

