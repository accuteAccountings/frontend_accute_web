import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
class BankDetail extends React.Component {
   
    constructor(props){
        super(props);
        this.state={
           Bank_Acc_Num:"",
           Bank_Name:"",
           Bank_Branch:"",
           IIFC_Code:"",
           Remarks:"", 
           id:""
        }
    }
    componentDidMount(){     
       console.log(this.props.bankDetail)
        const {Bank_Acc_Num,Bank_Branch,Bank_Name,IIFC_Code,Remarks,id} = this.props.bankDetail
        this.setState({Bank_Acc_Num,Bank_Branch,Bank_Name,IIFC_Code,Remarks,id})
    }
    handleOnChange= e =>{
       const {name, value} = e.target;
       this.setState({
          [name]:value
       },()=> this.props.handleDetailsChange(this.state))
    }
    render(){

       const {addBankAccount, removeBankAccount, bankDetail, i} = this.props;
      const {id,Bank_Acc_Num,Bank_Branch,Bank_Name,IIFC_Code,Remarks} = this.state;
    return (
           <div>
            <div style={{display:"flex",justifyContent:"space-between", borderBottom:"1px solid #767676"}}>
              <div>
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
                 
                 <div style={{width:"20%",marginLeft:"10px", marginTop:"7px"}}>
                    {this.props.index===0?(<Button variant="outlined" color="primary"  style={{height:"40px", marginTop:"8px",width:"100px"}} onClick={()=>addBankAccount()}>Add</Button>):(<Button variant="outlined" color="secondary"  style={{height:"40px", marginTop:"8px", width:"100px"}} onClick={()=>removeBankAccount(bankDetail)}>Remove</Button>)}
                 </div>
                 
             </div>
             
             </div>
     )
    }

}
export default BankDetail;