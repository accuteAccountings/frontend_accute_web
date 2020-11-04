import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {putData} from '../../helper/Fetch';

class UserProfileEditForm extends React.Component{
 
    constructor(props){
        super(props);
   
        this.state={
            gst_num:"",
            age:"",
            address:"",
            gender:"",
            full_name:"",
            email:"",
            phone_num:"",
            loading:false,
            errorMsg:"",
            snackbarOpen:false,
        }
    }
    componentDidMount(){    

         const {gst_num,full_name,email,age, phone_num,address,gender} = this.props.userDetails;
        this.setState({
            gst_num,
            age,
            full_name,
            email,
            phone_num,
            address,
            gender
        })
    } 
    saveUpdatedData =  updatedData => {
   
        return fetch(`/api/users/edit` , {
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        }).then(res =>res.json())
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
    },()=>console.log(this.state.full_name))
}
    handleSaveChanges=async (e)=>{
      
      e.preventDefault();
      //if(this.validate())
      const {gst_num,address,gender,age,full_name,email,phone_num} = this.state;
      const updatedData={
        gst_num,address,gender,age,full_name,email,phone_num
      }
      try {
          this.setState({loading:true})
          const savedData= await this.saveUpdatedData(updatedData) 
          if(savedData){
              console.log(savedData)
            this.setState({loading:false},()=>this.props.resetProfileOnUpdate(savedData))}
      } catch (error) {
          this.setState({loading:false,errorMsg:error},()=>this.props.setOpenEditModal(false))
      }
      
    }
    render(){
        const {gst_num,address,age,gender,full_name,email,phone_num} = this.state;
        return (
        <div style={{display:"flex", flexDirection:"column"}}>
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
            <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="full_name"
                label="Edit Full Name"
                name="full_name"
                size="small"
                value={full_name}
                onChange={this.handleOnChange}
                
                />
            <div style={{display:"flex"}}>
            <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                fullWidth
                style={{marginRight:"5px"}} 
                id="age"
                label="Edit Age"
                name="age"
                size="small"
                value={age}
                onChange={this.handleOnChange}            
                 />
             <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="gender"
                label="Edit Gender"
                name="gender"
                size="small"
                value={gender}
                onChange={this.handleOnChange}             
                />
              
            </div>
            <TextField margin="normal"  
                variant="outlined"                    
                fullWidth
                id="address"
                label="Edit Address"
                name="address"
                size="small"
                value={address} 
                onChange={this.handleOnChange}  
                />
 
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <TextField margin="normal"  
                fullWidth
                style={{marginRight:"5px"}}                    
                variant="outlined"                            
                id="phone_num"
                label="Edit Phone No."
                name="phone_num"
                size="small"
                value={phone_num}
                onChange={this.handleOnChange}
                /> 

             <TextField margin="normal"  
                variant="outlined"                     
                fullWidth
                id="email"
                label="Edit E-mail"
                name="email"
                size="small"
                value={email}
                onChange={this.handleOnChange}       
                />        
              </div>
            
             <TextField margin="normal"  
                variant="outlined"                     
                fullWidth
                id="gst_num"
                label="Edit GST No."
                name="gst_num" 
                size="small"
                value={gst_num}
                onChange={this.handleOnChange}
                />
             
             
            <div className="buttonGroup"style={{margin:"10px 0", display:"flex", justifyContent:"space-between"}}>
            <Button variant="outlined" type="submit" color="primary">
             Save Changes
            </Button>
            <Button variant="outlined" type="button"     color="secondary" onClick={()=>this.props.    setOpenEditModal(false)}>Cancel</Button>
            </div>
            
            </form>
        </div>
        )
    }

}
    
export default UserProfileEditForm;
