import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import cross from 'assets/icons/cancel.svg';
import load from 'assets/icons/loading.svg';

const styles = theme => ({
  select: {
    height: '30px',
    '&:before': {
      borderRadius: 'none',
      borderColor: '#000000',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderRadius: 'none',
      borderColor: '#000000',
    },
  },
});
class AddAcc extends React.Component {
  EditOn = () => {
    this.setState(() => {
      return {
        mode: 'edit',
      };
    });
  };

  setValue = () => {
    document.querySelector('.add_acc_inp_name').value = this.props.data.acc_name;

    // document.querySelector('.add_acc_inp_pname').value = this.props.data.print_name;

    document.querySelector('#add_acc_status').value = this.props.data.status;

    document.querySelector('.add_acc_inp_gst').value = this.props.data.gst_num;

    document.querySelector('.add_acc_inp_pan').value = this.props.data.pan_num;

    //document.querySelector(".add_acc_inp_aadhar").value = this.props.data.pan_num;

    document.querySelector('#add_acc_inp_add1').value = this.props.data.address_line1;

    document.querySelector('#add_acc_inp_add2').value = this.props.data.address_line2;

    document.querySelector('#add_acc_inp_state').value = this.props.data.state;

    document.querySelector('#add_acc_inp_city').value = this.props.data.city;

    document.querySelector('.add_acc_inp_pincode').value = this.props.data.pincode;

    // let  mob_num=document.querySelector("#add_acc_inp_mobnum").value + document.querySelector("#add_acc_inp_mob").value

    // let  phone_num=document.querySelector("#add_acc_inp_phonenum").value + document.querySelector("#add_acc_inp_phone").value

    document.querySelector('.add_acc_inp_email').value = this.props.data.emailId;

    document.querySelector('.add_acc_inp_note').value = this.props.data.notes;

    this.setState({
      acc_type: this.props.data.acc_type,
      //  bal: this.props.data.bal
    });
  };

  addAccount() {
    if (this.validate()) {
      this.setState(() => {
        return {
          loading: true,
        };
      });

      let acc_name = document.querySelector('.add_acc_inp_name').value;

      // let print_name = document.querySelector('.add_acc_inp_pname').value;

      let acc_type = this.state.acc_type;

      let status = document.querySelector('#add_acc_status').value;

      let gst_num = document.querySelector('.add_acc_inp_gst').value;

      let pan_num = document.querySelector('.add_acc_inp_pan').value;

      // let aadhar_num = document.querySelector(".add_acc_inp_aadhar").value;

      let address_line1 = document.querySelector('#add_acc_inp_add1').value;

      let address_line2 = document.querySelector('#add_acc_inp_add2').value;

      let state = document.querySelector('#add_acc_inp_state').value;

      let city = document.querySelector('#add_acc_inp_city').value;

      let pincode = document.querySelector('.add_acc_inp_pincode').value;

      let mob_num = document.querySelector('#add_acc_inp_mob').value;

      let phone_num = document.querySelector('#add_acc_inp_phone').value;

      let emailId = document.querySelector('.add_acc_inp_email').value;

      let notes = document.querySelector('.add_acc_inp_note').value;

      // let bal = this.state.bal;
      // if(!acc_type){
      //   alert("add an account type")
      //   this.setState({loading:false},()=>{return;})

      // }
      // if(!bal){
      //   alert("add opening balance")
      //   this.setState({loading:false},()=>{return;})
      // }
      let data = {
        acc_name,
        // print_name,
        acc_type,
        status,
        gst_num,
        pan_num,
        address_line1,
        address_line2,
        state,
        city,
        pincode,
        mob_num,
        phone_num,
        emailId,

        notes,
        // bal,
        id: null,
      };

      let met;

      if (this.state.mode === 'edit') {
        met = 'PUT';
        data.id = this.props.data.id;
      } else {
        met = 'POST';
      }

      fetch('/api/accounts', {
        method: met, // *GET, POST, PUT, DELETE, etc.

        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then(res => res.json())
        .then(r => {
          if (r.account) {
            this.setState(() => {
              return {
                loading: false,
              };
            });
            this.props.getAccounts();
            this.props.AddAccCrossBtn();
          } else {
            alert('Unable to save products, Please Try again later');
            this.props.AddAccCrossBtn();
            this.setState(() => {
              return {
                loading: false,
              };
            });
          }
        })
        .catch(err => {
          alert(err);
          this.props.AddAccCrossBtn();
          this.setState(() => {
            return {
              loading: false,
            };
          });
        });
    }
  }

  shipAdd() {
    this.setState(() => {
      return {
        bil_add: false,
      };
    });
  }
  billAdd() {
    this.setState(() => {
      return {
        bil_add: true,
      };
    });
  }
  handleChange = (event, newValue) => {
    this.setState({ addressSelection: newValue });
  };

  validate = () => {
    let temp = {};
    temp.acc_type = this.state.acc_type.length !== 0 ? '' : 'This field is required';
    // temp.bal = this.state.bal ? '' : 'This field is required';

    this.setState({ errors: { ...temp } });

    return Object.values(temp).every(x => x == '');
  };
  constructor(props) {
    super(props);

    this.shipAdd = this.shipAdd.bind(this);
    this.billAdd = this.billAdd.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.addAccount = this.addAccount.bind(this);
    console.log('This propssss', this.props);
    this.state = {
      bil_add: true,
      loading: false,
      mode: this.props.mode,
      checkedSB: false,
      addressSelection: 0,
      checkedNonGst: false,
      acc_type: 'debtors',
      // bal: '',
      errors: '',
    };
  }

  componentDidMount() {
    console.log('This componen didi mojnt', this.state);

    if (this.state.mode === 'edit' || this.state.mode === 'view') {
      this.setValue();
    }
  }

  render() {
    console.log('This renderrrr', this.state);

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
                  <span>Account Name</span>
                  <br />
                  <input
                    readOnly={this.state.mode === 'view' && true}
                    className="add_acc_inp_name"
                    type="text"
                    placeholder="Enter Account Name"
                  />
                </div>

                <div className="add_acc_type si">
                  <span>Account Type</span>
                  <br />

                  {/* <select
                    readOnly={this.state.mode === "view" && true}
                    name="Group"
                    className="add_acc_inp"
                    id="add_acc_inp_group"
                    placeholder="Select Group"
                  >
                    <option value="debtors">Debtors</option>
                    <option value="creditors">Creditors</option>
                    <option value="Sub Agent">Sub Agent</option>
                    <option value="transport">Transport</option>
                    <option value="bank">Bank</option>
                    <option disabled value="salary">
                      Salary
                    </option>
                  </select> */}
                  <FormControl>
                    <Select
                      className="add_acc_mui"
                      variant="outlined"
                      name="Group"
                      id="add_acc_inp_group"
                      disabled={this.state.mode === 'view' && true}
                      autoWidth
                      style={{ height: '33px' }}
                      // value={this.state.acc_type}
                      defaultValue="debtors"
                      label="Trader/Manufacturer"
                      onChange={e => this.setState({ acc_type: e.target.value })}
                    >
                      <MenuItem value="debtors">Trader/Manufacturer</MenuItem>
                      {/* <MenuItem value="creditors">Manu.</MenuItem> */}
                      <MenuItem value="sub-agent">Sub Agent</MenuItem>
                      <MenuItem value="transport">Transport</MenuItem>
                      {/* <MenuItem value="bank">Bank</MenuItem> */}
                      {/* <MenuItem disabled value="salary"> */}
                      {/* Salary
                      </MenuItem> */}
                    </Select>
                  </FormControl>
                  <br />
                  {this.state.errors.acc_type ? (
                    <span style={{ color: 'red' }}>{` *${this.state.errors.acc_type}`}</span>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {/* <div className="add_acc_print_name si">
                <span>Print Name</span>
                <br />

                <input
                  readOnly={this.state.mode === 'view' && true}
                  className="add_acc_inp_pname"
                  placeholder="Enter Print Name"
                  type="text"
                />
              </div> */}

              {/* <div className="add_acc_obal si">
                <span>Opening Balance</span>
                {this.state.errors.bal ? <span style={{ color: 'red' }}>{` *${this.state.errors.bal}`}</span> : ''}
                <br />

                <input
                  readOnly={this.state.mode === 'view' && true}
                  className="add_acc_inp_bal"
                  placeholder="Enter Amount"
                  type="text"
                  required
                  value={this.state.bal}
                  onChange={e => this.setState({ bal: e.target.value })}
                />
                <span className="checkboxes">
                  {' '}
                  <input readOnly={this.state.mode === 'view' && true} className="rr" name="n" type="radio" /> Dr.
                </span>
                <span className="checkboxe">
                  {' '}
                  <input readOnly={this.state.mode === 'view' && true} className="rr" name="n" type="radio" /> Cr.
                </span>
              </div> */}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 id="reg_det_h"> Registration Details</h1>
                </div>
                <div className="checked_sb_container">
                  <FormControlLabel
                    control={
                      <Switch
                        className="checked_non_gst"
                        checked={this.state.checkedNonGst}
                        onChange={() =>
                          this.setState(prevState => {
                            return { checkedNonGst: !prevState.checkedNonGst };
                          })
                        }
                        name="checkedNonGst"
                        color="primary"
                      />
                    }
                    label="non gst account"
                  />
                </div>
              </div>

              <div className="two_items">
                <div className="add_acc_status si">
                  <span>Status </span>
                  <br />
                  {/* 
                  <select readOnly={this.state.mode === "view" && true} id="add_acc_status">
                    <option value="regular registered">Regular Registered</option>
                    <option value="unregistered">Unregistered</option>
                  </select> */}
                  <FormControl>
                    <Select
                      className="add_acc_mui"
                      variant="outlined"
                      id="add_acc_status"
                      disabled={this.state.checkedNonGst}
                      value={this.state.discountType}
                      onChange={e => {
                        this.setState({ dicountType: e.target.value });
                      }}
                    >
                      <MenuItem value="regular registered">Regular Registered</MenuItem>
                      <MenuItem value="unregistered">Unregistered</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="add_acc_gstnum si">
                  <span>GST No.</span>
                  <br />

                  <input
                    readOnly={this.state.mode === 'view' && true}
                    className="add_acc_inp_gst"
                    placeholder="Enter GST No."
                    type="text"
                    disabled={this.state.checkedNonGst}
                  />
                </div>
              </div>

              <div className="two_items">
                <div className="add_acc_pan si">
                  <span>Pan No.</span>
                  <br />

                  <input
                    readOnly={this.state.mode === 'view' && true}
                    className="add_acc_inp_pan"
                    placeholder="Enter Pan No."
                    type="text"
                    disabled={this.state.checkedNonGst}
                  />
                </div>
                {/* <div className="add_acc_aadhar si">
                  <span>Aadhar No.</span>
                  <br />

                  <input
                    readOnly={this.state.mode === "view" && true}
                    className="add_acc_inp_aadhar"
                    placeholder="Enter Aadhar No."
                    type="text"
                    disabled={this.state.checkedNonGst}
                  />
                </div> */}
              </div>
            </div>

            <div className="add_acc_body_right ">
              <h2 style={{ margin: '0px', height: '48px', borderBottom: '1px solid #344f6b' }}>
                {/* <span id="billing_add" onClick={this.billAdd} style={this.state.bil_add ? { color: "black" } : null}>
                  Billing Address
                </span>

                <span onClick={this.shipAdd} id="shipping_add" style={this.state.bil_add ? null : { color: "black" }}>
                  Shipping Address
                </span> */}

                <Tabs
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  value={this.state.addressSelection}
                >
                  <Tab label="Billing Address" style={{ color: '#000000' }} />
                  <Tab
                    label="Shipping Address"
                    style={this.state.checkedSB ? { color: 'gray' } : { color: '#000000' }}
                    disabled={this.state.checkedSB}
                  />
                </Tabs>
              </h2>
              {this.state.addressSelection === 0 ? (
                <>
                  <div className="checked_sb_container" style={{ display: 'flex' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          className="checked_sb"
                          checked={this.state.checkedSB}
                          onChange={() =>
                            this.setState(prevState => {
                              return { checkedSB: !prevState.checkedSB };
                            })
                          }
                          name="checkedSB"
                          color="primary"
                        />
                      }
                      label="check if Shipping and Billing address are same"
                    />
                  </div>
                  <div className="add_acc_add1 si">
                    <span>Address Line 1</span>
                    <br />
                    <input
                      readOnly={this.state.mode === 'view' && true}
                      id="add_acc_inp_add1"
                      type="text"
                      placeholder="Address Line 1"
                    />
                  </div>

                  <div className="add_acc_add2 si">
                    <span>Address Line 2</span>
                    <br />
                    <input
                      readOnly={this.state.mode === 'view' && true}
                      id="add_acc_inp_add2"
                      type="text"
                      placeholder="Address Line 2"
                    />
                  </div>

                  <div className="two_items">
                    <div className="add_acc_state si">
                      <span>State</span>
                      <br />

                      <input readOnly={this.state.mode === 'view' && true} name="Group" id="add_acc_inp_state" />
                    </div>

                    <div className="add_acc_city si">
                      <span>City</span>
                      <br />

                      <input readOnly={this.state.mode === 'view' && true} name="Group" id="add_acc_inp_city" />
                    </div>
                  </div>
                  <div className="add_acc_pincode si">
                    <span>Pincode</span>
                    <br />
                    <input
                      readOnly={this.state.mode === 'view' && true}
                      className="add_acc_inp_pincode"
                      type="text"
                      placeholder="Enter Pincode"
                    />
                  </div>

                  <div className="two_items">
                    <div className="add_acc_mobnum si">
                      <span>Mobile No.</span>
                      <br />

                      <input
                        readOnly={this.state.mode === 'view' && true}
                        type="Number"
                        id="add_acc_inp_mob"
                        placeholder="Enter Mobile No."
                      />
                    </div>
                    <div className="add_acc_phonenum si">
                      <span>Phone No.</span>
                      <br />

                      <input
                        readOnly={this.state.mode === 'view' && true}
                        type="Number"
                        id="add_acc_inp_phone"
                        placeholder="Enter Phone No."
                      />
                    </div>
                  </div>

                  <div className="two_items">
                    <div className="add_acc_email si">
                      <span>E-mail ID</span>
                      <br />
                      <input
                        readOnly={this.state.mode === 'view' && true}
                        className="add_acc_inp_email"
                        type="Email"
                        placeholder="Enter e-mail Id"
                      />
                    </div>

                    <div className="add_acc_note si">
                      <span>Note (If any)</span>
                      <br />
                      <input
                        readOnly={this.state.mode === 'view' && true}
                        className="add_acc_inp_note"
                        type="text"
                        placeholder="Note , if any"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="add_acc_add1 si">
                    <span>Address Line 1</span>
                    <br />
                    <input
                      readOnly={this.state.mode === 'view' && true}
                      id="add_acc_inp_add1"
                      type="text"
                      placeholder="Address Line 1"
                    />
                  </div>

                  <div className="add_acc_add2 si">
                    <span>Address Line 2</span>
                    <br />
                    <input
                      readOnly={this.state.mode === 'view' && true}
                      id="add_acc_inp_add2"
                      type="text"
                      placeholder="Address Line 2"
                    />
                  </div>

                  <div className="two_items">
                    <div className="add_acc_state si">
                      <span>State</span>
                      <br />

                      <input readOnly={this.state.mode === 'view' && true} name="Group" id="add_acc_inp_state" />
                    </div>

                    <div className="add_acc_city si">
                      <span>City</span>
                      <br />

                      <input readOnly={this.state.mode === 'view' && true} name="Group" id="add_acc_inp_city" />
                    </div>
                  </div>
                  <div className="add_acc_pincode si">
                    <span>Pincode</span>
                    <br />
                    <input
                      readOnly={this.state.mode === 'view' && true}
                      className="add_acc_inp_pincode"
                      type="text"
                      placeholder="Enter Pincode"
                    />
                  </div>

                  <div className="two_items">
                    <div className="add_acc_mobnum si">
                      <span>Mobile No.</span>
                      <br />

                      <input
                        readOnly={this.state.mode === 'view' && true}
                        type="Number"
                        id="add_acc_inp_mob"
                        placeholder="Enter Mobile No."
                      />
                    </div>
                    <div className="add_acc_phonenum si">
                      <span>Phone No.</span>
                      <br />

                      <input
                        readOnly={this.state.mode === 'view' && true}
                        type="Number"
                        id="add_acc_inp_phone"
                        placeholder="Enter Phone No."
                      />
                    </div>
                  </div>

                  <div className="two_items">
                    <div className="add_acc_email si">
                      <span>E-mail ID</span>
                      <br />
                      <input
                        readOnly={this.state.mode === 'view' && true}
                        className="add_acc_inp_email"
                        type="Email"
                        placeholder="Enter e-mail Id"
                      />
                    </div>

                    <div className="add_acc_note si">
                      <span>Note (If any)</span>
                      <br />
                      <input
                        readOnly={this.state.mode === 'view' && true}
                        className="add_acc_inp_note"
                        type="text"
                        placeholder="Note , if any"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div id="bottom_btns" className="two_items">
            <Button className="add_acc_can_btn" onClick={this.props.AddAccCrossBtn}>
              Cancel
            </Button>

            <Button
              className="add_acc_btn"
              onClick={this.state.loading ? null : this.state.mode === 'view' ? this.EditOn : this.addAccount}
            >
              {this.state.loading ? (
                <img src={load} className="loading" alt=" " />
              ) : this.state.mode === 'view' ? (
                'Edit'
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddAcc.defaultProps = {
  mode: 'add',
};

export default withStyles(styles)(AddAcc);
