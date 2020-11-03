import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {putData} from '../../helper/Fetch';
import { findByLabelText } from '@testing-library/react';

class AccountProfileEditForm extends React.Component{
 
    constructor(props){
        super(props);
   
        this.state={
            acc_real_name:"",
            print_name:"",
            address_line1:"",
            mob_num:"",
            phone_num:"",
            emailId:"",
            pan_num:"",
            gst_num:"",
            aadhar_num:"",
            Bank_Acc_Num:"",
            Bank_Name:"",
            Bank_Branch:"",
            IIFC_Code:"",
            Remarks:"",
            loading:false,
            errorMsg:"",
            snackbarOpen:false,
        }
    }
    /*
            account_num:"",
            branch_name:"",
            iifc_code:"",
            remarks:"",
     */
    componentDidMount(){    

         const { acc_real_name,
            print_name,
            address_line1,
            mob_num,
            phone_num,
            emailId,
            pan_num,
            gst_num,
            aadhar_num,
            Bank_Acc_Num,
            Bank_Name,
            Bank_Branch,
            IIFC_Code,
            Remarks} = this.props.account;
        this.setState({
            acc_real_name,
            print_name,
            address_line1,
            mob_num,
            phone_num,
            emailId,
            pan_num,
            gst_num,
            aadhar_num,
            Bank_Acc_Num,
            Bank_Name,
            Bank_Branch,
            IIFC_Code,
            Remarks
        })
    } 
    
    saveUpdatedData =  updatedData => {
          return fetch(`/api/accounts/edit?id=${this.props.account.id}` , {
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        }).then(res => res.json())
        .then(parJson => {
            console.log(parJson)
            return parJson;
        })
        .catch(error => error)

    }
// closing the snackbar
   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackbarOpen:false});
  };
// handle on change of value in textfields
    handleOnChange= e=>{
        const {target: { value, name }} = e;
        this.setState({
            [name]:value
        })
    }

  //on form submit ie save changes button click
    handleSaveChanges= async (e)=>{
      
      e.preventDefault();
      //if(this.validate())
      const {acc_real_name,
        print_name,
        address_line1,
        mob_num,
        phone_num,
        emailId,
        pan_num,
        gst_num,
        aadhar_num,
        Bank_Acc_Num,
        Bank_Name,
        Bank_Branch,
        IIFC_Code,
        Remarks} = this.state;
      const updatedData={
        acc_real_name,
        print_name,
        address_line1,
        mob_num,
        phone_num,
        emailId,
        pan_num,
        gst_num,
        aadhar_num,
        Bank_Acc_Num,
        Bank_Name,
        Bank_Branch,
        IIFC_Code,
        Remarks
      }
 
      try {
          this.setState({loading:true})
          const savedData= await this.saveUpdatedData(updatedData)
          if(savedData){
            this.setState({loading:false},()=>this.props.resetProfileOnUpdate(savedData))}
      } catch (error) {
          this.setState({loading:false,errorMsg:error},()=>this.props.setOpenEditModal(false))
      }
      
    }
    render(){
        const {   acc_real_name,
            print_name,
            address_line1,
            mob_num,
            phone_num,
            emailId,
            pan_num,
            gst_num,
            aadhar_num,
            Bank_Acc_Num,
            Bank_Name,
            Bank_Branch,
            IIFC_Code,
            Remarks
           } = this.state;
        return (
        <div style={{display:"flex", flexDirection:"column",padding:"5px"}}>
            { this.state.loading? (
            <LinearProgress color="secondary" />):null} 
            {this.state.errorMsg?(<Snackbar open={this.state.snackbarOpen} autoHideDuration={3000} onClose={this.handleClose} 
            anchorOrigin={{  vertical: 'top',
            horizontal: 'center'}}>
                <Alert  severity="error">
                   {this.state.errorMsg}
                </Alert>
            </Snackbar>):null} 
            <form onSubmit={this.handleSaveChanges}>

             <div style={{display:"flex",justifyContent:"space-between"}}>
             <TextField margin="normal"  
                variant="outlined"                    
                style={{marginRight:"5px"}}
                fullWidth
                id="acc_name"
                label="Account Name"
                name="acc_real_name"
                size="small"
                value={acc_real_name}
                onChange={this.handleOnChange}
                />
              <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="print_name"
                label="Account Print Name"
                name="print_name"
                size="small"
                value={print_name}
                onChange={this.handleOnChange}
                />
             </div>
             <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="address_line1"
                label="Address Line 1"
                name="address_line1"
                size="small"
                value={address_line1}
                onChange={this.handleOnChange}
                />
            
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex"}}>
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                style={{marginRight:"5px"}}
                id="mob_num"
                label="Mobile Number"
                name="mob_num"
                size="small"
                value={mob_num}
                onChange={this.handleOnChange}
                />
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="phone_num"
                label="Phone Number"
                name="phone_num"
                size="small"
                value={phone_num}
                onChange={this.handleOnChange}
                />
                </div>
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="emailId"
                label="Email"
                name="emailId"
                size="small"
                value={emailId}
                onChange={this.handleOnChange}
                />
                <div style={{display:"flex"}}>
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                style={{marginRight:"5px"}}
                id="pan_num"
                label="Pan No."
                name="pan_num"
                size="small"
                value={pan_num}
                
                onChange={this.handleOnChange}
                />
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                style={{marginRight:"5px"}}
                id="gst_num"
                label="GST No."
                name="gst_num"
                size="small"
                value={gst_num}
                
                onChange={this.handleOnChange}
                />
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="aadhar_num"
                label="Aadhar No."
                name="aadhar_num"
                size="small"
                value={aadhar_num}
                
                onChange={this.handleOnChange}
                />
                </div>
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="Bank_Acc_Num"
                label="Account Number"
                name="Bank_Acc_Num"
                size="small"
                value={Bank_Acc_Num}
                onChange={this.handleOnChange}
                />
                <div style={{display:"flex"}}>
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                style={{marginRight:"5px"}}
                id="Bank_Name"
                label="Bank Name"
                name="Bank_Name"
                size="small"
                value={Bank_Name}
                onChange={this.handleOnChange}
                />
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="Bank_Branch"
                label="Bank Branch"
                name="Bank_Branch"
                size="small"
                value={Bank_Branch}
                onChange={this.handleOnChange}
                />
                </div>
                <div style={{display:"flex"}}>
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                style={{marginRight:"5px"}}
                id="IIFC_Code"
                label="IIFC Code"
                name="IIFC_Code"
                size="small"
                value={IIFC_Code}
                onChange={this.handleOnChange}
                />
                <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="Remarks"
                label="Remarks"
                name="Remarks"
                size="small"
                value={Remarks}
                onChange={this.handleOnChange}
                />
                </div>
            </div>
            <div className="buttonGroup"style={{margin:"10px 0", display:"flex", justifyContent:"space-between"}}>
                <Button variant="outlined" type="submit" color="primary">
                 Save Changes
                </Button>
                <Button variant="outlined" type="button"   color="secondary" onClick={()=>this.props.setOpenEditModal(false)}>Cancel</Button>
            </div>
  
            </form>
        </div>
        )
    }

}
    
export default AccountProfileEditForm;
