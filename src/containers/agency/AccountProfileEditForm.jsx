import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MobNumList from '../../components/MobNumList';
import {putData} from '../../helper/Fetch';
import { findByLabelText } from '@testing-library/react';

class AccountProfileEditForm extends React.Component{
 
    constructor(props){
        super(props);
   
        this.state={
            acc_real_name:"",
            print_name:"",
            address_line1:"",
            mob_num:[],
            phone_num:[],
            emailId:"",
            pan_num:"",
            gst_num:"",
            aadhar_num:"",
            loading:false,
            errorMsg:"",
            snackbarOpen:false,
            addMobNumInput:false,
            addPhoneNumInput: false
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
            } = this.props.account;

            let mobArr = mob_num.split(',').map(e=>({id:`mob-${Math.random()}`,number:e}));
            let phoneArr = phone_num.split(',').map(e=>({id:`phone-${Math.random()}`,number:e}));

        this.setState({
            acc_real_name,
            print_name,
            address_line1,
            mob_num:[...mobArr],
            phone_num:[...phoneArr],
            emailId,
            pan_num,
            gst_num,
            aadhar_num,
        })
    } 
    
    saveUpdatedData =  updatedData => {
     console.log(updatedData);
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

  // adding more mobile numbers
  addNum=(type,num)=>{
  
    if(type==="mob_num"){
        this.setState(prevState=>({
            mob_num:[...prevState.mob_num,{id:`mob-${Math.random()}`,number:""}]
        }))
    }else{
        this.setState(prevState=>({
            phone_num:[...prevState.phone_num,{id:`phone-${Math.random()}`,number:""}]
        }))
    }
  }
  removeNum= (type,num) =>{
      if(type==="mob_num"){
        this.setState(prevState=>({
            mob_num:prevState.mob_num.filter(ele=>ele.id!==num.id)
        }))
      }else{
        this.setState(prevState=>({
            phone_num:prevState.phone_num.filter(ele=>ele.id!==num.id)
        }))
      }
  } 
   handleNumChange = (type, num, event) => {
    const newNumber = event.target.value;
    if(type="mob_num"){
        this.setState(prevState=>{
            const newNumAddedList = prevState.mob_num.map(ele=>{
                if(ele.id===num.id){
                    ele.number = newNumber;
                    return ele;
                }
                return ele;
            })
            return {mob_num:[...newNumAddedList]}
        })
    }
  
        this.setState(prevState=>{
            const newNumAddedList = prevState.phone_num.map(ele=>{
                if(ele.id===num.id){
                    ele.number = newNumber;
                    return ele;
                }
                return ele;
            })
            return {phone_num:[...newNumAddedList]}
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
 
    } = this.state;
      const updatedData={
        acc_real_name,
        print_name,
        address_line1,
        mob_num:mob_num.map(ele=>ele["number"]).join(","),
        phone_num:phone_num.map(ele=>ele["number"]).join(","),
        emailId,
        pan_num,
        gst_num,
        aadhar_num,
      }
 
      try {
          this.setState({loading:true})
          const savedData= await this.saveUpdatedData(updatedData)
          if(savedData){
            this.setState({loading:false},()=>this.props.resetProfileOnUpdate(savedData))}
      } catch (error) {
          this.setState({loading:false,errorMsg:error},()=>this.props.setOpenEditModal("basic",false))
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
                    
                        {/* <MobNumList mobNumList={mob_num} addMobNum={this.addMobNum} removeMobNum={this.removeMobNum} handleChange={this.handleMobNumChange}/> */}

                      {/* {this.state.addMobNumInput?(
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
                       />):null} */}
                       {/* <Button variant="outlined" color="primary" style={{textTransform:"none"}} onClick={addMobNum}>+</Button> */}
                       <div style={{display:"flex", flexDirection:"column", width:"48%",marginRight:"3px"}}>
                        {mob_num.map((num,index)=>(
                            <div key={num.id} style={{display:"flex", width:"90%"}} >
                                    <TextField margin="normal"  
                                      variant="outlined"  
                                      fullwidth                  
                                      style={{marginRight:"5px"}}
                                      id="mob_num"
                                      label="Mobile Number"
                                      name="mob_num"
                                      size="small"
                                      value={num.number}
                                      onChange={e=>this.handleNumChange("mob_num",num,e)}
                                      />
                                      <div style={{width:"20%",marginTop:"18px"}} >
                                      {index===0?(<Button variant="outlined" color="primary" style={{textTransform:"none"}} onClick={()=>this.addNum("mob_num",num)}>+</Button>):(<Button variant="outlined" color="secondary" style={{textTransform:"none"}} onClick={()=>this.removeNum("mob_num",num)}>-</Button>) }
                                      </div>
                            </div>
                        ))}   
                       </div>
                    {/* <div style={{display:"flex", flexDirection:"column"}} >
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
                      <Button variant="outlined" color="primary" style={{textTransform:"none"}} onClick={this.addPhoneNum}>+ Add Number</Button>
                    </div> */}
                      <div style={{display:"flex", flexDirection:"column",width:"48%"}}>
                        {phone_num.map((num,index)=>(
                            <div key={num.id} style={{display:"flex",width:"90%"}}>
                                    <TextField margin="normal"  
                                    fullwidth 
                                      variant="outlined"                    
                                      id="phone_num"
                                      style={{marginRight:"5px"}}
                                      label="Phone Number"
                                      name="phone_num"
                                      size="small"
                                      value={num.number}
                                      onChange={e=>this.handleNumChange("phone_num",num,e)}
                                      />
                                      <div style={{width:"20px",marginTop:"18px"}} >
                                      {index===0?(<Button variant="outlined" color="primary" style={{textTransform:"none"}} onClick={()=>this.addNum("phone_num",num)}>+</Button>):(<Button variant="outlined" color="secondary" style={{textTransform:"none"}} onClick={()=>this.removeNum("phone_num",num)}>-</Button>) }
                                      </div>
                            </div>
                        ))} 
                        </div>
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
                
            </div>
            <div className="buttonGroup"style={{margin:"10px 0", display:"flex", justifyContent:"space-between"}}>
                <Button variant="outlined" type="submit" color="primary">
                 Save Changes
                </Button>
                <Button variant="outlined" type="button"   color="secondary" onClick={()=>this.props.setOpenEditModal("basic",false)}>Cancel</Button>
            </div>
  
            </form>
        </div>
        )
    }

}
    
export default AccountProfileEditForm;
