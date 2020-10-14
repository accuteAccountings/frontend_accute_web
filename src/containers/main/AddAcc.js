import React from "react";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import cross from "assets/icons/cancel.svg";
import load from "assets/icons/loading.svg";
import {Button} from "@material-ui/core"

class AddAcc extends React.Component {
  EditOn = () => {
    this.setState(() => {
      return {
        mode: "edit"
      };
    });
  };

  setValue = () => {
    document.querySelector(".add_acc_inp_name").value = this.props.data.acc_name;

    document.querySelector(".add_acc_inp_pname").value = this.props.data.print_name;

    document.querySelector("#add_acc_inp_group").value = this.props.data.acc_type;

    document.querySelector("#add_acc_status").value = this.props.data.status;

    document.querySelector(".add_acc_inp_gst").value = this.props.data.gst_num;

    document.querySelector(".add_acc_inp_pan").value = this.props.data.pan_num;

    document.querySelector(".add_acc_inp_aadhar").value = this.props.data.pan_num;

    document.querySelector("#add_acc_inp_add1").value = this.props.data.address_line1;

    document.querySelector("#add_acc_inp_add2").value = this.props.data.address_line2;

    document.querySelector("#add_acc_inp_state").value = this.props.data.state;

    document.querySelector("#add_acc_inp_city").value = this.props.data.city;

    document.querySelector(".add_acc_inp_pincode").value = this.props.data.pincode;

    // let  mob_num=document.querySelector("#add_acc_inp_mobnum").value + document.querySelector("#add_acc_inp_mob").value

    // let  phone_num=document.querySelector("#add_acc_inp_phonenum").value + document.querySelector("#add_acc_inp_phone").value

    document.querySelector(".add_acc_inp_email").value = this.props.data.emailId;

    document.querySelector(".add_acc_inp_note").value = this.props.data.notes;

    document.querySelector(".add_acc_inp_bal").value = this.props.bal;
  };

  addAccount() {
    this.setState(() => {
      return {
        loading: true
      };
    });

    let acc_name = document.querySelector(".add_acc_inp_name").value;

    let print_name = document.querySelector(".add_acc_inp_pname").value;

    let acc_type = document.querySelector("#add_acc_inp_group").value;

    let status = document.querySelector("#add_acc_status").value;

    let gst_num = document.querySelector(".add_acc_inp_gst").value;

    let pan_num = document.querySelector(".add_acc_inp_pan").value;

    let aadhar_num = document.querySelector(".add_acc_inp_aadhar").value;

    let address_line1 = document.querySelector("#add_acc_inp_add1").value;

    let address_line2 = document.querySelector("#add_acc_inp_add2").value;

    let state = document.querySelector("#add_acc_inp_state").value;

    let city = document.querySelector("#add_acc_inp_city").value;

    let pincode = document.querySelector(".add_acc_inp_pincode").value;

    let mob_num = document.querySelector("#add_acc_inp_mob").value;

    let phone_num = document.querySelector("#add_acc_inp_phone").value;

    let emailId = document.querySelector(".add_acc_inp_email").value;

    let notes = document.querySelector(".add_acc_inp_note").value;

    let bal = document.querySelector(".add_acc_inp_bal").value;

    let data = {
      acc_name,
      print_name,
      acc_type,
      status,
      gst_num,
      pan_num,
      aadhar_num,
      address_line1,
      address_line2,
      state,
      city,
      pincode,
      mob_num,
      phone_num,
      emailId,

      notes,
      bal,
      id: null
    };

    let met;

    if (this.state.mode === "edit") {
      met = "PUT";
      data.id = this.props.data.id;
    } else {
      met = "POST";
    }

    fetch("/api/accounts", {
      method: met, // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(r => {
        if (r.account) {
          this.setState(() => {
            return {
              loading: false
            };
          });
          this.props.getAccounts();
          this.props.AddAccCrossBtn();
        } else {
          alert("Unable to save products, Please Try again later");
          this.props.AddAccCrossBtn();
          this.setState(() => {
            return {
              loading: false
            };
          });
        }
      })
      .catch(err => {
        alert(err);
        this.props.AddAccCrossBtn();
        this.setState(() => {
          return {
            loading: false
          };
        });
      });
  }

  shipAdd() {
    this.setState(() => {
      return {
        bil_add: false
      };
    });
  }
  billAdd() {
    this.setState(() => {
      return {
        bil_add: true
      };
    });
  }

  constructor(props) {
    super(props);

    this.shipAdd = this.shipAdd.bind(this);
    this.billAdd = this.billAdd.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.addAccount = this.addAccount.bind(this);

    this.state = {
      bil_add: true,
      loading: false,
      mode: this.props.mode
    };
  }

  componentDidMount() {
    if (this.state.mode === "edit" || this.state.mode === "view") {
      this.setValue();
    }
  }

  render() {
   // const {mode} =this.state;
    return (
      <div className="add_acc">
        <div className="overlay" />

        <div className="add_acc_con">
          <div className="add_acc_head">
            <h1>Add Account</h1>
            <img onClick={this.props.AddAccCrossBtn} src={cross} alt="" />
          </div>

          <div className="add_acc_body">
            <div className="add_acc_body_left">
              <h1>Account Details</h1>

              <div className="two_items">
                <div className="add_acc_name si">
                  <TextField 
                   className="add_acc_inp_name"
                   label="Account Name" 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>

                <div className="add_acc_type si">
                  <FormControl>
                  <InputLabel htmlFor="add_acc_inp_group">Account Type</InputLabel>
                    <Select
                      native
                      className="add_acc_inp"
                      id="add_acc_inp_group"
                      name="Group"
                      inputProps={{ readOnly: this.state.mode === "view" && true}}
                    >
                    <option aria-label="None" value="" />
                    <option value="debtors">Debtors</option>
                    <option value="creditors">Creditors</option>
                    <option value="Sub Agent">Sub Agent</option>
                    <option value="transport">Transport</option>
                    <option value="bank">Bank</option>
                    <option disabled value="salary">
                      Salary
                    </option>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="add_acc_print_name si">
                <TextField 
                   className="add_acc_inp_pname"
                   label="Print Name" 
                 
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
              </div>

              <div className="add_acc_obal si">

                 <TextField 
                   className="add_acc_inp_bal"
                   label="Opening Balancing" 
                   
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
{/* 
                <span className="checkboxe">
                  {" "}
                  <input readOnly={this.state.mode === "view" && true} className="rr" name="n" type="radio" /> Dr.
                </span>
                <span className="checkboxe">
                  {" "}
                  <input readOnly={this.state.mode === "view" && true} className="rr" name="n" type="radio" /> Cr.
                </span> */}
                <FormControl component="fieldset">
                 <RadioGroup row aria-label="position" name="position" defaultValue="Dr.">
                    <FormControlLabel value="Dr." control={<Radio color="primary" />} label="Dr." />
                    <FormControlLabel value="Cr." control={<Radio color="primary" />} label="Cr." />
                  </RadioGroup>
                </FormControl>
              </div>

              <h1 id="reg_det_h"> Registration Details</h1>

              <div className="two_items">
                <div className="add_acc_status si">
                  <FormControl>
                  <InputLabel htmlFor="add_acc_status">Status</InputLabel>
                    <Select
                      native
                      id="add_acc_status"
                      inputProps={{ readOnly: this.state.mode === "view" && true}}
                    >
                    <option aria-label="None" value="" />
                    <option value="regular registered">Regular Registered</option>
                    <option value="unregistered">Unregistered</option>
                    </Select>
                  </FormControl>
                </div>
                <div className="add_acc_gstnum si">
                   <TextField 
                   className="add_acc_inp_gst"
                   label="GST No." 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>
              </div>

              <div className="two_items">
                <div className="add_acc_pan si">
                 <TextField 
                   className="add_acc_inp_pan"
                   label="PAN No." 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>
                <div className="add_acc_aadhar si">
                 <TextField 
                   className="add_acc_inp_aadhar"
                   label="Aadhar No." 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>
              </div>
            </div>

            <div className="add_acc_body_right ">
              <h1>
                <span id="billing_add" onClick={this.billAdd} style={this.state.bil_add ? { color: "black" } : null}>
                  Billing Address
                </span>

                <span onClick={this.shipAdd} id="shipping_add" style={this.state.bil_add ? null : { color: "black" }}>
                  Shipping Address
                </span>
              </h1>

              <div className="add_acc_add1 si">
                  <TextField 
                   id="add_acc_inp_add1"
                   label="Address Line 1" 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
              </div>

              <div className="add_acc_add2 si">
                <TextField 
                   id="add_acc_inp_add2"
                   label="Address Line 2" 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
              </div>

              <div className="two_items">
                <div className="add_acc_state si">
                  <TextField 
                   name="Group" 
                   id="add_acc_inp_state"
                   label="State" 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>

                <div className="add_acc_city si">
                  <TextField 
                   name="Group" 
                   id="add_acc_inp_city"
                   label="City" 
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>
              </div>
              <div className="add_acc_pincode si">
                <TextField 
                   id="add_acc_inp_pincode"
                   label="Pincode" 
                
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
              </div>

              <div className="two_items">
                <div className="add_acc_mobnum si">
                 <TextField 
                   id="add_acc_inp_mob"
                   label="Mobile No." 
                   type="number"
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>
                <div className="add_acc_phonenum si">
                 <TextField 
                   id="add_acc_inp_phone"
                   label="Phone No." 
                   type="number"
                   fullWidth
                   InputProps={{
                    readOnly: this.state.mode === "view" && true,
                  }}
                 />
                </div>
              </div>

              <div className="two_items">
                <div className="add_acc_email si">
                 <TextField 
                  id="add_acc_inp_email"
                  label="E-mail ID" 
                  type="email"
                  fullWidth
                  InputProps={{
                   readOnly: this.state.mode === "view" && true,
                 }}
                />
                </div>

                <div className="add_acc_note si">
                 <TextField 
                  id="add_acc_inp_note"
                  label="Note (If any)" 
                  fullWidth
                  InputProps={{
                   readOnly: this.state.mode === "view" && true,
                 }}
                />
                </div>
              </div>
            </div>
          </div>

          <div id="bottom_btns" className="two_items">
            <Button className="add_acc_can_btn" onClick={this.props.AddAccCrossBtn}>
              Cancel
            </Button>

            <Button
              className="add_acc_btn"
              onClick={this.state.loading ? null : this.state.mode === "view" ? this.EditOn : this.addAccount}
            >
              {this.state.loading ? (
                <img src={load} className="loading" alt=" " />
              ) : this.state.mode === "view" ? (
                "Edit"
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddAcc.defaultProps = {
  mode: "add"
};

export default AddAcc;
