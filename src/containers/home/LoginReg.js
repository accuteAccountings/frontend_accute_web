import React, { Component } from "react";
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {createStructuredSelector} from 'reselect';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import cross from "assets/icons/cancel.svg";
import lod from "assets/icons/refresh.svg";
import {selectCurrentUser,selectError} from '../../redux/login_reg/login_reg.selectors';
import { signInStart,signUpStart, googleSignInStart,facebookSignInStart, resetErrorMessage } from '../../redux/login_reg/login_reg.actions';


class LoginReg extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser:this.props.currentUser,
      errorMsg:this.props.errorMsg,
      loading: false,
      isLog:true,
      google: true,
      facebook: true,
      error:false,
      suc: false,
      full_name:"",
      email:"",
      password:"",
      com_name:"",
      c_code:"+91",
      reg_email:"",
      reg_pass:"",
      mob_num:"",
      snackbarOpen:false,
    };
  }
  handleOnChange = e => {
    const {target: { value, name }} = e;
    this.setState({
     [name]: value
    });
   };
   // for login api call
   handleLoginSubmit = e => {
     e.preventDefault();
     const {email,password}= this.state;
     let data= {
        email, 
        password
      }
     this.setState({loading:true})
     this.props.signInStart(data);
   }

   // for google signin api call
  responseGoogle = response => {    
    this.setState({loading:true})
    this.props.googleSignInStart(response)
  };

   // for facebook signin api call
  responseFacebook = response => {
    if (!response.accessToken) {
      this.setState({ facebook: false });
    }
    this.setState({loading:true})
    this.props.facebookSignInStart(response);
  }

   // for registration api call
   handleRegisterSubmit = e =>{
     e.preventDefault();
     const {reg_email,reg_pass,full_name,com_name,c_code,mob_num}=this.state;
     let data = {
      user: {
        company_name: com_name,
        email: reg_email,
        password: reg_pass,
        phone_num: mob_num,
        c_code: c_code,
        full_name: full_name
      }
    }
    this.setState({loading:true})
    this.props.signUpStart(data)
   }

   // closing the snackbar
   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackbarOpen:false});
  };
 // resetting the states for next attempt
   resetStates= ()=>{
     setTimeout(()=>{this.setState({ ...this.state,
      errorMsg:"",
      successMsg:"",
      full_name:"",
      email:"",
      password:"",
      com_name:"",
      mob_num:"",
      c_code:"+91",
      reg_email:"",
      reg_pass:""});
      this.props.resetErrorMessage();
    },3000)
   }
  // shouldComponentUpdate(nextProps, nextState){
  // let shouldUpdate=true;
  // if((nextProps.errorMsg===this.props.errorMsg )){
  //   shouldUpdate=false
  // }
  // return shouldUpdate;
  // }
  //only receive the props when different from previous value
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser !== nextProps.currentUser ) {
        this.setState({
            currentUser: nextProps.currentUser,
            loading:false
        });
    }
    if (this.props.errorMsg !== nextProps.errorNsg ) {
      this.setState({
        errorMsg: nextProps.errorMsg,
        loading:false,
        snackbarOpen:true
      },()=>this.resetStates());

      if (this.props.successMsg !== nextProps.successMsg ) {
        this.setState({
          successMsg: nextProps.successMsg,
          loading:false,
          isLog:true
        });
    }
  }
}

  render() {
    
    return (
      <div className="log_reg">
        <div className="overlay_home" onClick={this.props.remLogReg} />

        <div className="logReg">
          <div className="login_head">
            <h1>Accute Accountings</h1>
            <img className="gotohomebtn" onClick={this.props.gotohome} src={cross} alt="" />
          </div>
         {this.state.errorMsg?(<Snackbar open={this.state.snackbarOpen} autoHideDuration={3000} onClose={this.handleClose} 
          anchorOrigin={{  vertical: 'top',
          horizontal: 'center'}}>
                <Alert  severity="error">
                   {this.state.errorMsg}
                </Alert>
          </Snackbar>):null 
          }      
           { this.state.successMsg?(<Snackbar open={this.state.snackbarOpen} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{  vertical: 'top',
          horizontal: 'center'}}>
                <Alert onClose={this.handleClose} severity="success">
                    {this.state.successMsg}
                </Alert>
          </Snackbar>):null 
          }
   
          <div className="login_body">
            <div className="or_login">Or</div>

            <div className="login_body_left">
              {this.state.isLog ? (
                <div className="login_cont" id="log_in_content">
                  <div className="login_cont_head">
                    <h2>Login</h2>
                    <span>
                      New User?{" "}
                      <a id="register_btn_s" onClick={()=>this.setState({email:"",password:"",isLog:false})}>
                        Sign-Up
                      </a>{" "}
                      Instead
                    </span>
                  </div>
                 { this.state.loading? (
                  <LinearProgress color="secondary" />):null}
                  <form onSubmit={this.handleLoginSubmit}>
                    <TextField  margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Enter User Id / E-mail"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleOnChange}
                      />
                   
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.handleOnChange}
                    />
                 
                    <br/>
                    <a className="forget_pass" href="#">
                     {" "}
                     forgot password?
                    </a>

                    <button type="submit" className="loginBtn btnbtn">
                     Login
                    </button>
                  </form>
                </div>
              ) : (
                <div className="login_cont" id="sign_up_content">
                  <div className="login_cont_head">
                    <h2>Sign Up</h2>
                    <span>
                      Registered User?{" "}
                      <a id="register_btn_s" onClick={()=>this.setState({full_name:"",reg_email:"",reg_pass:"",mob_num:"",com_name:"",isLog:true})}>
                       Log-In{" "}
                      </a>
                      Instead
                    </span>
                  </div>
                  { this.state.loading? (
                  <LinearProgress color="secondary" />):null}
                  <form onSubmit={this.handleRegisterSubmit}>
                  <TextField margin="normal"  
                      variant="outlined"
                      required
                      fullWidth
                      id="full_name"
                      label="Full Name"
                      name="full_name"
                      value={this.state.full_name}
                      onChange={this.handleOnChange}
                      />
                   <TextField margin="normal"  
                      variant="outlined"
                      required
                      fullWidth
                      id="com_name"
                      label="Company Name"
                      name="com_name"
                      value={this.state.com_name}
                      onChange={this.handleOnChange}
                      />
                   <div id="phone_num_input">
                     <div>
                     <select name="c_code" defaultValue={this.state.c_code} id="c_code" autoComplete="country-code">
                        <option value="+91">+91 </option>
                        <option value="+1">+1</option>
                        <option value="+12">+12 </option>
                        <option value="+55">+55</option>
                      </select>
                      </div>
                      <TextField margin="normal"                      
                      variant="outlined"
                      required       
                      id="mob_num"
                      label="Mobile No."
                      name="mob_num"
                      value={this.state.mob_num}
                      onChange={this.handleOnChange}
                      /> 
                    
                  </div>
                  <TextField margin="normal"  
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Enter User Id / E-mail"
                      name="reg_email"
                      value={this.state.reg_email}
                      onChange={this.handleOnChange}
                      />
                   
                    <TextField margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      name="reg_pass"
                      label="Password"
                      type="password"
                      id="reg_pass"
                      value={this.state.reg_pass}
                      onChange={this.handleOnChange}
                    />
                 
                  <div>
                  <a className="forget_pass" href="#">
                    forget password ?{" "}
                  </a>
                  </div>
                  <button type="submit" className="loginBtn btnbtn">
                   Register
                  </button>
                  </form>
                </div>
              )}
            </div>

            <div className="login_body_right">
              <GoogleLogin
                clientId="859167314128-9b2cts4vdhi2m869ar0sqh0i4del5vb4.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={this.state.google ? "google_btn socialbtn" : "google_btn socialbtn disabled "}
                  >
                    Continue with Google
                  </button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={()=>this.setState({google:false})}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                appId="259513308534935"
                autoLoad={false}
                fields="name,email,picture"
                render={renderProps => (
                  <button
                    className={this.state.facebook ? "fb_btn socialbtn" : "fb_btn socialbtn disabled "}
                    onClick={renderProps.onClick}
                  >
                    Continue with Facebook
                  </button>
                )}
                callback={this.responseFacebook}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// loading : state.register.loading,
// islog : state.register.islog,
// errormsg : state.errormsg.errormsg,
// token : state.register.token,
// user : state.login.loggedin,
const mapStateToProps = state=>({
     currentUser: state.loginReg.currentUser,
     errorMsg: state.loginReg.errorMsg,
     successMsg: state.loginReg.successMsg
  
})

const mapDispatchToProps = dispatch => {
  return {
      signInStart: (data)=> dispatch(signInStart(data)),
      signUpStart: (data)=> dispatch(signUpStart(data)),
      googleSignInStart: (data) => dispatch(googleSignInStart(data)),
      facebookSignInStart: (data) => dispatch(facebookSignInStart(data)),
      resetErrorMessage: ()=> dispatch(resetErrorMessage())
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(LoginReg)
