import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import cross from "assets/icons/cancel.svg";
import lod from "assets/icons/refresh.svg";
import {connect} from 'react-redux'
import { signInStart,signUpStart, googleSignInStart,facebookSignInStart } from '../../redux/login_reg/login_reg.actions';


class LoginReg extends Component {

  log = () => {
    document.getElementById("full_name").value = "";
    document.getElementById("com_name").value = "";

    this.setState({isLog: true });
  };
  reg = () => {
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";
    this.setState({ isLog: false });
  };

  responseFacebook = response => {
    if (!response.accessToken) {
      this.setState({ facebook: false });
    }
    this.props.facebookSignInStart(response)

    if(this.props.currentUser.email){
      window.location.href = "/main";
      this.setState({loading:false});
    }else{
    this.setState({facebook: false,loading:false});
    this.showError();
  };
}
  async sendLogData() {
    
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

<<<<<<< HEAD
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass })
    })
      .then(res => res.json())
      .then(parJson => {
        if (parJson.username) {
          window.location.href = "/agency";
        } else if (parJson.error) {
          this.showError();
          this.setState(() => {
            return {
              loading: false,
              errormsg: "Incorrect Username or Password"
            };
          });
        }
      })
      .catch(error => {
        this.setState(() => {
          return {
            loading: false,
            errormsg: "Connection Error"
          };
        });
        this.showError();
      });
=======
    let data = {
      email : email,
      password : pass
    }
     //calling the signIn start action
     this.setState({loading:true})
     await this.props.signInStart(data);

     if(this.props.currentUser) {
       this.setState({loading:false})
       window.location.href = "/main"
     }
     if(this.props.errormsg){
       this.setState({loading:false})
       this.showError();
     }
        
>>>>>>> origin/Redux_Implementation
  }

  async sendRegData() {
    this.setState({loading: true});
    let email = document.getElementById("email").value;
    let pass = document.getElementById("reg_pass").value;
    let name = document.getElementById("full_name").value;
    let com_name = document.getElementById("com_name").value;
    let c_code = document.getElementById("c_code").value;
    let mob_num = document.getElementById("mob_num").value;

    let data = {
      user: {
        company_name: com_name,
        email: email,
        password: pass,
        phone_num: mob_num,
        c_code: c_code,
        full_name: name
      }
    }

        await this.props.signUpStart(data)
        //console.log(this.props.currentUser)
        if (this.props.currentUser.token) {
          this.showsuc();
          pass = "";
          this.setState({
              islog: true,
              loading: false
            });
  
        } 
         if (this.props.errormsg) {
          this.showError();
          this.setState({ loading: false });
        }    
  }


  responseGoogleError = response => {
    console.log(response);

    this.setState({ google: false });

    // this.setState(() => {
    // 	return { errormsg: 'Unable to login with Google' };
    // });

    // this.showError();

    // alert('Unable to login with Google Please try again with different
    // method');
  };

  responseGoogle = response => {

    this.props.googleSignInStart(response)
    
    if(this.props.currentUser.email){
      window.location.href = "/main";
      this.setState({loading:false});
    }else{
    this.setState({google: false,loading:false});
    this.showError();
    }
  };

  rmError = () => {
    this.setState(() => {
      return { errorMsg: "" };
    });
  };
  rmsuc = () => {
    this.setState(() => {
      return { suc: false };
    });
  };

  showError = () => {
    this.setState(() => {
      return { errorMsg: "" };
    });
    setTimeout(this.rmError, 3000);
  };

  showsuc = () => {
    this.setState(() => {
      return {
        suc: true
      };
    });

    setTimeout(this.rmsuc, 3000);
  };
  constructor(props) {
    super(props);

    this.sendLogData = this.sendLogData.bind(this);
    this.sendRegData = this.sendRegData.bind(this);
    this.state = {
      loading: false,
      isLog:true,
      google: true,
      facebook: true,
      suc: false
    };
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

          <div className="login_body">
            <div className="or_login">Or</div>

            <div className="login_body_left">
              {this.state.errorMsg && (
                <div className="alert alert-danger">
                  <div className="alert-container">
                    <div className="alert-icon">
                      <i className="fa fa-info-circle" />
                    </div>

                    <b className="alert-info">{this.props.errormsg}</b>
                  </div>
                </div>
              )}{" "}
              {this.state.suc && (
                <div className="alert alert-success">
                  <div className="alert-container">
                    <div className="alert-icon">
                      <i className="fa fa-info-circle" />
                    </div>

                    <b className="alert-info">Registration Complete </b>
                  </div>
                </div>
              )}{" "}
              {this.state.isLog ? (
                <div className="login_cont">
                  <div className="login_cont_head">
                    <h2>Login</h2>
                    <span>
                      New User?{" "}
                      <a id="register_btn_s" onClick={this.reg}>
                        Sign-Up
                      </a>{" "}
                      Instead
                    </span>
                  </div>

                  <div className="margin">
                    <label htmlFor="username">User Id / E - mail</label>
                    <br />
                    <input id="email" autoComplete="email" type="text" placeholder="Enter User Id / E-mail" />
                  </div>
                  <div className="margin">
                    <label htmlFor="password">Password</label>
                    <br />

                    <input id="pass" type="password" placeholder="*******" />
                  </div>

                  <a className="forget_pass" href="#">
                    {" "}
                    forgot password?
                  </a>

                  <button className="loginBtn btnbtn" onClick={this.sendLogData}>
                    {this.state.loading ? <img className="loadingsvg" src={lod} /> : "Login"}
                  </button>
                </div>
              ) : (
                <div className="login_cont">
                  <div className="login_cont_head">
                    <h2>Sign Up</h2>
                    <span>
                      Registered User?{" "}
                      <a id="register_btn_s" onClick={this.log}>
                        Login{" "}
                      </a>
                      Instead
                    </span>
                  </div>

                  <div className="margin">
                    <label htmlFor="full_name">Full Name</label>
                    <br />
                    <input id="full_name" type="text" autoComplete="off" placeholder="Enter Full Name" />
                  </div>
                  <div className="margin">
                    <label htmlFor="com_name">Company Name</label>
                    <br />
                    <input
                      id="com_name"
                      type="text"
                      name="company name"
                      autoComplete="organization"
                      placeholder="Enter Your Company Name"
                    />
                  </div>
                  <div className="margin">
                    <label htmlFor="mob_num">Mobile Number</label>
                    <br />
                    <div className="mob_num_inp">
                      <select name="c_code" id="c_code" autoComplete="country-code">
                        <option value="+91">+91 </option>
                        <option value="+1">+1</option>
                        <option value="+12">+12 </option>
                        <option value="+55">+55</option>
                      </select>
                      <input id="mob_num" type="tel" autoComplete="tel" placeholder="Enter Mobile No." />
                    </div>
                  </div>
                  <div className="margin">
                    <label htmlFor="email">E - mail</label>
                    <br />
                    <input id="email" type="email" autoComplete="email" name="email" placeholder="Enter E-mail" />
                  </div>
                  <div className="margin">
                    <label htmlFor="password">Password</label>
                    <br />

                    <input id="reg_pass" type="password" placeholder="*******" />
                  </div>

                  <a className="forget_pass" href="#">
                    forget password ?{" "}
                  </a>

                  <button className="loginBtn btnbtn" onClick={this.sendRegData}>
                    {this.props.loading ? <img className="loadingsvg" src={lod} /> : "Register"}
                  </button>
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
                onFailure={this.responseGoogleError}
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
const mapStateToProps = state => {
  return{
     currentUser: state.loginReg.user,
     errormsg: state.loginReg.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      signInStart: (data)=> dispatch(signInStart(data)),
      signUpStart: (data)=> dispatch(signUpStart(data)),
      googleSignInStart: (data) => dispatch(googleSignInStart(data)),
      facebookSignInStart: (data) => dispatch(facebookSignInStart(data)),
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(LoginReg)
