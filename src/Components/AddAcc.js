import React from 'react'
import cross from '../img/cancel.svg'

class AddAcc extends React.Component {

    shipAdd() {

        this.setState(() => {

            return {
                bil_add: false
            }
        })
    }
    billAdd() {

        this.setState(() => {

            return {
                bil_add: true
            }
        })
    }


    constructor(props) {

        super(props)

        this.shipAdd = this.shipAdd.bind(this)
        this.billAdd = this.billAdd.bind(this)


        this.state = {

            bil_add: true
        }
    }


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

                            <div className="two_items">

                                <div className="add_acc_name si">

                                    <span>Account Name</span><br />
                                    <input className="add_acc_inp_name" type="text" placeholder="Enter Name here" />

                                </div>

                                <div className="add_acc_type si">

                                    <span>Account Type</span><br />

                                    <select name="Group" className="add_acc_inp" id="add_acc_inp_group" placeholder="Select Group">

                                        <option>Option one</option>
                                        <option>Option one</option>
                                        <option>Option one</option>
                                    </select>


                                </div>



                            </div>


                            <div className="add_acc_print_name si">

                                <span>Print Name</span><br />

                                <input className="add_acc_inp_name" placeholder="Enter Name here" type="text" />


                            </div>


                            <div className="add_acc_obal si">

                                <span>Opening Balacing</span><br />

                                <input className="add_acc_inp_num" placeholder="Enter Amount" type="text" />
                                {/* 
                                <span className="checkboxes"> <input name="n" type="radio" /> Dr.</span>
                                <span className="checkboxes"> <input name="n" type="radio" /> Cr.</span> */}


                            </div>







                            <h1 id="reg_det_h"> Registration Details</h1>


                            <div className="two_items">
                                <div className="add_acc_status si">

                                    <span>Status </span><br />

                                    <select id="add_acc_status">
                                        <option value="option one">option one</option>
                                        <option value="option one">option one</option>
                                        <option value="option one">option one</option>
                                        <option value="option one">option one</option>
                                    </select>


                                </div>
                                <div className="add_acc_gstnum si">

                                    <span>GST No.</span><br />

                                    <input className="add_acc_inp_gst" placeholder="Enter GST No." type="text" />


                                </div>
                            </div>

                            <div className="two_items">
                                <div className="add_acc_pan si">

                                    <span>Pan No.</span><br />

                                    <input className="add_acc_inp_pan" placeholder="Enter Pan No." type="text" />


                                </div>
                                <div className="add_acc_aadhar si">

                                    <span>Aadhar No.</span><br />

                                    <input className="add_acc_inp_aadhar" placeholder="Enter Aadhar No." type="text" />


                                </div>
                            </div>


                        </div>

                        <div className="add_acc_body_right ">

                            <h1>

                                <span id="billing_add" onClick={this.billAdd}
                                    style={this.state.bil_add ? { color: "black" } : null} >
                                    Billing Address
                                </span>

                                <span onClick={this.shipAdd} id="shipping_add"
                                    style={this.state.bil_add ? null : { color: "black" }}>
                                    Shipping Address
                                </span>

                            </h1>

                            <div className="add_acc_add1 si">

                                <span>Address Line 1</span><br />
                                <input id="add_acc_inp_add1" type="text" placeholder="Address Line 1" />

                            </div>


                            <div className="add_acc_add2 si">

                                <span>Address Line 2</span><br />
                                <input id="add_acc_inp_add2" type="text" placeholder="Address Line 2" />

                            </div>

                            <div className="two_items">

                                <div className="add_acc_state si">

                                    <span>State</span><br />

                                    <select name="Group" id="add_acc_inp_state" >

                                        <option>Select State</option>
                                        <option>Option one</option>
                                        <option>Option one</option>
                                    </select>


                                </div>

                                <div className="add_acc_city si">

                                    <span>City</span><br />

                                    <select name="Group" id="add_acc_inp_city" >

                                        <option>Select City</option>
                                        <option>Option one</option>
                                        <option>Option one</option>
                                    </select>


                                </div>


                            </div>
                            <div className="add_acc_pincode si">

                                <span>Pincode</span><br />
                                <input className="add_acc_inp_pincode" type="text" placeholder="Enter Pincode" />

                            </div>

                            <div className="two_items">


                                <div className="add_acc_mobnum si">

                                    <span>Mobile No.</span><br />

                                    <select name="mob" id="add_acc_inp_mobnum" >

                                        <option>+91</option>
                                        <option>+1</option>
                                        <option>+2</option>
                                    </select>

                                    <input type="Number" id="add_acc_inp_mob" placeholder="Enter Mobile No." />



                                </div>
                                <div className="add_acc_phonenum si">

                                    <span>Phone No.</span><br />

                                    <select name="mob" id="add_acc_inp_phonenum" >

                                        <option>+91</option>
                                        <option>Option one</option>
                                        <option>Option one</option>
                                    </select>

                                    <input type="Number" id="add_acc_inp_phone" placeholder="Enter Phone No." />


                                </div>


                            </div>


                            <div className="two_items">
                                <div className="add_acc_email si">

                                    <span>E-mail ID</span><br />
                                    <input className="add_acc_inp_email" type="Email" placeholder="Enter e-mail Id" />

                                </div>


                                <div className="add_acc_note si">

                                    <span>Note (If any)</span><br />
                                    <input className="add_acc_inp_note" type="text" placeholder="Note , if any" />

                                </div>

                            </div>

                        </div>



                    </div>

                    <div id="bottom_btns" className="two_items">
                        <button className="add_acc_can_btn" onClick={this.props.AddAccCrossBtn}>Cancel</button>
                        <button className="add_acc_btn" onClick={this.props.AddAccSaveBtn}>Save</button>

                    </div>
                </div >

            </div >
        )
    }
}

export default AddAcc