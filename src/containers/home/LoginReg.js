import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import cross from "assets/icons/cancel.svg";
import lod from "assets/icons/refresh.svg";

class LoginReg extends Component {
  login = () => {
    document.getElementById("full_name").value = "";
    document.getElementById("com_name").value = "";

    this.setState(() => {
      return { islog: true };
    });
  };
  reg = () => {
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";

    this.setState(() => {
      return { islog: false };
    });
  };

  responseFacebook = response => {
    if (!response.accessToken) {
      this.setState(() => {
        return { facebook: false };
      });
    }
    fetch("/api/register/facebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: response.accessToken,
        pic: response.picture.data.url
      })
    })
      .catch(error => {
        this.setState(() => {
          return { facebook: false };
        });
      })
      .then(res => res.json())
      .then(parJson => {
        if (parJson.email) {
          window.location.href = "/main";
        } else if (parJson.error) {
          this.setState(() => {
            return { facebook: false };
          });
        }
      });
  };
  sendLogData() {
    this.setState(() => {
      return { loading: true };
    });
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

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
  }

  sendRegData() {
    this.setState(() => {
      return { loading: true };
    });

    let email = document.getElementById("email").value;
    let pass = document.getElementById("reg_pass").value;
    let name = document.getElementById("full_name").value;
    let com_name = document.getElementById("com_name").value;
    let c_code = document.getElementById("c_code").value;
    let mob_num = document.getElementById("mob_num").value;

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      this.setState(() => {
        return {
          errormsg: "Please Enter A Valid Email Address"
        };
      });
      this.showError();
      this.setState(() => {
        return { loading: false };
      });

      return;
    }

    if (pass.length < 8) {
      this.setState(() => {
        return {
          errormsg: "Password Should Be Greater Than 8 letter"
        };
      });
      this.showError();
      this.setState(() => {
        return { loading: false };
      });
      return;
    }

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          company_name: com_name,
          email: email,
          password: pass,
          phone_num: mob_num,
          c_code: c_code,
          full_name: name
        }
      })
    })
      .then(res => res.json())
      .then(parJson => {
        if (parJson.user.token) {
          this.setlog();

          this.showsuc();
          pass = "";

          this.setState(() => {
            return {
              islog: true,
              loading: false
            };
          });
        } else if (parJson.error) {
          this.setState(() => {
            return {
              errormsg: parJson.error
            };
          });
          this.showError();
          this.setState(() => {
            return { loading: false };
          });
        }
      })
      .catch(error => {
        this.setState(() => {
          return { errormsg: "Connection Error" };
        });
        this.showError();
        this.setState(() => {
          return { loading: false };
        });
      });
  }

  setreg() {
    this.setState(() => {
      return { loc: "reg" };
    });
  }
  setlog() {
    this.setState(() => {
      return { loc: "log" };
    });
  }

  responseGoogleError = response => {
    console.log(response);

    this.setState(() => {
      return { google: false };
    });

    // this.setState(() => {
    // 	return { errormsg: 'Unable to login with Google' };
    // });

    // this.showError();

    // alert('Unable to login with Google Please try again with different
    // method');
  };

  responseGoogle = response => {
    fetch("/api/register/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId: response.tokenId })
    })
      .then(res => res.json())
      .then(parJson => {
        if (parJson.email) {
          window.location.href = "/main";
        } else if (parJson.error) {
          this.setState(() => {
            return { loading: false };
          });
        }
      })
      .catch(error => {
        this.setState(() => {
          return {
            google: false,
            errormsg: "Error Login with Google"
          };
        });
        this.showError();
        this.setState(() => {
          return { loading: false };
        });
      });
  };

  rmError = () => {
    this.setState(() => {
      return { error: false };
    });
  };
  rmsuc = () => {
    this.setState(() => {
      return { suc: false };
    });
  };

  showError = () => {
    this.setState(() => {
      return { error: true };
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

    this.setreg = this.setreg.bind(this);
    this.setlog = this.setlog.bind(this);
    this.sendLogData = this.sendLogData.bind(this);
    this.sendRegData = this.sendRegData.bind(this);
    this.state = {
      loc: "log",
      loading: false,
      islog: true,
      error: false,
      errormsg: "",
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
              {this.state.error && (
                <div class="alert alert-danger">
                  <div class="alert-container">
                    <div class="alert-icon">
                      <i class="fa fa-info-circle" />
                    </div>

                    <b class="alert-info">{this.state.errormsg} </b>
                  </div>
                </div>
              )}{" "}
              {this.state.suc && (
                <div class="alert alert-success">
                  <div class="alert-container">
                    <div class="alert-icon">
                      <i class="fa fa-info-circle" />
                    </div>

                    <b class="alert-info">Registration Complete </b>
                  </div>
                </div>
              )}{" "}
              {this.state.islog ? (
                <div className="login_cont">
                  <div className="login_cont_head">
                    <h2>Login</h2>
                    <span>
                      New User?{" "}
                      <a id="register_btn_s" onClick={this.reg}>
                        Sign-In
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
                    forget password?
                  </a>

                  <button className="loginBtn btnbtn" onClick={this.sendLogData}>
                    {this.state.loading ? <img className="loadingsvg" src={lod} /> : "Login"}
                  </button>
                </div>
              ) : (
                <div className="login_cont">
                  <div className="login_cont_head">
                    <h2>Sign In</h2>
                    <span>
                      Registered User?{" "}
                      <a id="register_btn_s" onClick={this.login}>
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
                    {this.state.loading ? <img className="loadingsvg" src={lod} /> : "Register"}
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

export default LoginReg;
