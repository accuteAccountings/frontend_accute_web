import React from 'react'
import cross from '../img/cancel.svg'

class AddAcc extends React.Component {


    render() {

        return (

            <div className="add_acc">

                <div className="overlay"></div>

                <div className="add_acc_con">

                    <div className="add_acc_head">
                        <h1>Add Account</h1>
                        <img onClick={this.props.AddAccCrossBtn} src={cross} alt="" />
                    </div>

                    <div className="add_acc_body">

                        <div className="add_acc_body_left">

                            <h1>Account Details</h1>

                            <div className="add_acc_name">

                                <span>Name</span>
                                <input className="add_acc_inp_name" type="text" placeholder="Enter Name here" />

                            </div>


                            <div className="add_acc_print_name">

                                <span>Print Name</span>

                                <input className="add_acc_inp_num" placeholder="Enter Name here" type="text" />


                            </div>
                            <div className="add_acc_Group">

                                <span>Group</span>

                                <select name="Group" className="add_acc_inp" id="add_acc_inp_group" placeholder="Select Group">

                                    <option>Option one</option>
                                    <option>Option one</option>
                                    <option>Option one</option>
                                </select>


                            </div>
                            <div className="add_acc_obal">

                                <span>Opening Balacing</span>

                                <input className="add_acc_inp_num" placeholder="Enter Amount" type="text" />


                            </div>
                            <div className="add_acc_deb_cre">

                                <span>Debtor</span>

                                <input className="add_acc_inp_num" type="checkbox" />
                                <span id="creditor">Creditor</span>
                                <input className="add_acc_inp_cre" type="checkbox" />


                            </div>


                            <h1>Registration Details</h1>



                            <div className="add_acc_status">

                                <span>Status </span>

                                <select id="add_acc_status">
                                    <option value="option one">option one</option>
                                    <option value="option one">option one</option>
                                    <option value="option one">option one</option>
                                    <option value="option one">option one</option>
                                </select>


                            </div>
                            <div className="add_acc_gstnum">

                                <span>GST No.</span>

                                <input className="add_acc_inp_gst" placeholder="Enter GST No." type="text" />


                            </div>
                            <div className="add_acc_pan">

                                <span>Pan No.</span>

                                <input className="add_acc_inp_pan" placeholder="Enter Pan No." type="text" />


                            </div>
                            <div className="add_acc_aadhar">

                                <span>Aadhar No.</span>

                                <input className="add_acc_inp_aadhar" placeholder="Enter Aadhar No." type="text" />


                            </div>


                        </div>

                        <div className="add_acc_body_right">

                            <h1>Address</h1>

                            <div className="add_acc_add1">

                                <span>Address Line 1</span>
                                <input className="add_acc_inp_add1" type="text" placeholder="Address Line 1" />

                            </div>


                            <div className="add_acc_add2">

                                <span>Address Line 2</span>
                                <input className="add_acc_inp_add2" type="text" placeholder="Address Line 2" />

                            </div>
                            <div className="add_acc_pincode">

                                <span>Pincode</span>
                                <input className="add_acc_inp_pincode" type="text" placeholder="Enter Pincode" />

                            </div>
                            <div className="add_acc_state">

                                <span>State</span>

                                <select name="Group" id="add_acc_inp_state" >

                                    <option>Select State</option>
                                    <option>Option one</option>
                                    <option>Option one</option>
                                </select>


                            </div>
                            <div className="add_acc_city">

                                <span>City</span>

                                <select name="Group" id="add_acc_inp_city" >

                                    <option>Select City</option>
                                    <option>Option one</option>
                                    <option>Option one</option>
                                </select>


                            </div>
                            <div className="add_acc_mobnum">

                                <span>Mobile No.</span>

                                <select name="mob" id="add_acc_inp_mobnum" >

                                    <option>+91</option>
                                    <option>+1</option>
                                    <option>+2</option>
                                </select>

                                <input type="Number" className="add_acc_inp_mob" placeholder="Enter Mobile No." />



                            </div>
                            <div className="add_acc_phonenum">

                                <span>Phone No.</span>

                                <select name="mob" id="add_acc_inp_phonenum" >

                                    <option>+91</option>
                                    <option>Option one</option>
                                    <option>Option one</option>
                                </select>

                                <input type="Number" className="add_acc_inp_phone" placeholder="Enter Phone No." />


                            </div>

                            <div className="add_acc_email">

                                <span>E-mail ID</span>
                                <input className="add_acc_inp_email" type="Email" placeholder="Enter e-mail Id" />

                            </div>


                            <div className="add_acc_add2">

                                <span>Note (If any)</span>
                                <input className="add_acc_inp_add2" type="text" placeholder="Note , if any" />

                            </div>

                        </div>



                    </div>
                    <button className="add_acc_btn" onClick={this.props.AddAccSaveBtn}>Save</button>


                </div>

            </div>
        )
    }
}

export default AddAcc