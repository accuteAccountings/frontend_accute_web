import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const ForgotPassword = (props)=> {

   const testOtp = () => {    
      setLoading(true)
      if(emailedOtp === userOtp){
        setMatched(true);
        setErrorMsg(false);
        setLoading(false);
      }else{
        setErrorMsg('Incorrect OTP');
        setLoading(false);
        snackbarOpen(true);
      }
      
    }
  
    const sendMail = () => {
      setLoading(true)
      let data = {
        email:email
        }
      console.log(data)
        fetch('/api/login/ForgotPassword' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => {
          if(data.error){
            console.log(data.error)
            setErrorMsg(data.error)
            setLoading(false)
            setSnackbarOpen(true)
          }
            else if(data){
                setEmail(null)
                setEmailedOtp(data)
                setSent(true)
                setLoading(false)
            }
        }).catch(err => {
          setErrorMsg(err.message)
          setLoading(false)
          setSnackbarOpen(true)
        })
    }
  
    const resetPassword = () => {
  
      setLoading(true)
  
      if(newPassword === confirmedPassword){
        let data = {
        email :  email,
        password : newPassword,
        }
       fetch('/api/login' , {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => {
           if(data){
             setVerified(true);
             setLoading(false);
             setErrorMsg(false);
           }
        }).catch(err=>{
          setErrorMsg(err.message)
          setLoading(false)
          setSnackbarOpen(true)
        })
    }else{
      setErrorMsg('Password does not match');
      setLoading(false);
    }
    }
  
      // closing the snackbar
   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
 
    const [email, setEmail] = useState(null);
    const [emailedOtp, setEmailedOtp] = useState(null);
    const [userOtp, setUserOtp] = useState(null);
    const [newPassword,setNewPassword]= useState(null);
    const [confirmedPassword, setConfirmedPassword]= useState(null);
    const [verified, setVerified]= useState(false);
    const [sent, setSent] = useState(false);
    const [matched, setMatched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [snackbarOpen, setSnackbarOpen]=  useState(false);
      // this.state = {
      //   email : null,
      //   verified : false,
      //   matched : false,
      //   sent : false,
      //   otp : null,
      //   loading : false,
      //   err : false,
      //   errormsg : null
      // }
    
    
      return(
        <div className = "login_cont">
          {loading? (<LinearProgress color="secondary" />):null}
          {errorMsg?(<Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose} 
          anchorOrigin={{  vertical: 'top',
          horizontal: 'center'}}>
                <Alert  severity="error">
                   {errorMsg}
                </Alert>
          </Snackbar>):null }

             <div className="margin"/>
             {!matched?(
               !sent?(<form onSubmit={e=>{e.preventDefault(); sendMail();}}>
             <TextField  margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      id="recovery_email"
                      label="Enter E-mail"
                      name="email"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      size="small"
                      />

             <div className="margin"/>
                <button type="submit">Submit</button>
            </form>):(
                    <form onSubmit={e=>{e.preventDefault(); testOtp();}}>
                    <TextField  margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      id="recovery_otp"
                      label="Enter OTP"
                      name="userOtp"
                      value={userOtp}
                      onChange={e=>setUserOtp(e.target.value)}
                      size="small"
                      />
                      <div>An otp is sent at tour email . <a href = "#" onClick = {this.SendMail} >Resend</a></div>
                      <button type="submit">Submit</button>
                      </form>
            )):(
              verified?(
              <div>
                Password Reset Successful!
                <a href= "#" onClick = {props.forgotReset}>
                  Login
                </a>
              </div>

              ):(
                <form onSubmit={e=>{e.preventDefault(); resetPassword()}}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="newPassword"
                      label="New Password"
                      type="password"
                      id="password"
                      value={newPassword}
                      onChange={e=>setNewPassword(e.target.value)}
                      size="small"
                    />
                     <div className="margin"></div>
                     <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="confirmedPassword"
                      label="Confirm Password"
                      type="password"
                      id="password"
                      value={confirmedPassword}
                      onChange={e=>setConfirmedPassword(e.target.value)}
                      size="small"
                    />
                     <div className="margin"></div>
                     <button type="submit">Reset</button>
                </form>
              

              )
            )}
          </div>  
      )

         
    
  }
  
  
  
  export default ForgotPassword;
  