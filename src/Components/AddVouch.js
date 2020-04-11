import React from 'react'
import cross from '../img/cancel.svg'


class AddVouch extends React.Component {

    render() {

        return (

            <div className="add_vouch_con">

                <div className="add_pro_head">
                    <h1>Add Purchase Voucher</h1>

                    <div className="add_vouch_right_btns">

                        <p>Save</p>
                        <p>Reset</p>
                        <img onClick={this.props.AddProCrossBtn} src={cross} alt="" />
                    </div>
                </div>

                <div className="vouch_body">

                    <div className="vouch_body_left">

                        <div className="vouch_body_left_top">

                            <div className="vouch_details">

                                <div className="vouch_si">
                                    <span>Bill Date</span><br />
                                    <input type="date" name="vouch_bill_date" id="vouch_bill_date" />
                                </div>
                                <div className="vouch_si">
                                    <span>Type</span><br />
                                    <select name="vouch_type" id="vouch_type">
                                        <option value="option1">Purchase</option>
                                        <option value="option1">Purchase</option>
                                        <option value="option1">Purchase</option>
                                    </select>
                                </div>

                                <div className="vouch_si">
                                    <span>Bill No.</span><br />
                                    <input type="number" name="vouch_bill_no" id="vouch_bill_no" />
                                </div>

                                <div className="vouch_si">
                                    <span>G. R. No.</span><br />
                                    <input type="number" name="vouch_gr_no" id="vouch_gr_no" />
                                </div>

                                <div className="vouch_si">
                                    <span>Transport Name</span><br />
                                    <input type="text" name="vouch_transport_name" id="vouch_transport_name" />
                                </div>

                                <div className="vouch_si">
                                    <span>Supplier</span><br />
                                    <select name="vouch_sup" id="vouch_sup" >
                                        <option value="opt1">D S Textile</option>
                                        <option value="opt1">D S Textile</option>
                                        <option value="opt1">D S Textile</option>
                                    </select>
                                </div>

                                <div className="vouch_si">
                                    <span>Supplier Agent</span><br />
                                    <select name="vouch_sup_agent" id="vouch_sup_agent" >
                                        <option value="opt1">D S Textile</option>
                                        <option value="opt1">D S Textile</option>
                                        <option value="opt1">D S Textile</option>
                                    </select>
                                </div>



                                <div className="vouch_si">
                                    <span>Set Commission</span><br />
                                    <input type="number" name="vouch_comission" id="vouch_comission" defaultValue="1" />
                                </div>



                            </div>



                            <div className="vouch_customer">
                                <div className="vouch_si">
                                    <span>Customer</span><br />
                                    <select name="vouch_sup_agent" id="vouch_sup_agent" >
                                        <option value="opt1">D S Textile</option>
                                        <option value="opt1">D S Textile</option>
                                        <option value="opt1">D S Textile</option>
                                    </select>

                                    <span style={{ marginLeft: "20px", cursor: "pointer" }}
                                        onClick={() => {
                                            alert("to do : add sub Agent")
                                        }}

                                    >   + Add Sub Agent</span>
                                </div>


                            </div>

                        </div>

                        <div className="vouch_body_middle">


                            <div className="vouch_si">
                                <span>Product / Item</span><br />
                                <select name="vouch_pro_item" id="vouch_pro_item" >
                                    <option value="opt1">D S Textile</option>
                                    <option value="opt1">D S Textile</option>
                                    <option value="opt1">D S Textile</option>
                                </select>
                            </div>



                            <div className="vouch_si">
                                <span>Quality</span><br />
                                <input type="number" name="vouch_quality" id="vouch_quality" defaultValue="1" />
                            </div>
                            <div className="vouch_si">
                                <span>Rate</span><br />
                                <input type="number" name="vouch_rate" id="vouch_rate" defaultValue="1" />
                            </div>
                            <div className="vouch_si">
                                <span>GST</span><br />
                                <input type="number" name="vouch_rate" id="vouch_rate" defaultValue="18" />
                            </div>
                            <div className="vouch_si">

                                <button id="vouch_add_btn">Add</button>
                            </div>




                        </div>


                        <div className="vouch_table_con">

                            <table id="vouch_table">


                                <tr>

                                    <th>S.No.</th>
                                    <th >Product Name</th>
                                    <th>Product HSN No.</th>
                                    <th>Edit</th>
                                    <th>Delete</th>


                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>  <tr>
                                    <td>1</td>
                                    <td>Milk</td>
                                    <td>15684542545</td>
                                    <td><a href="">edit</a></td>
                                    <td><a href="">X</a></td>
                                </tr>

                            </table>

                        </div>

                    </div>

                    <div className="vouch_body_right">

                        <div className="right items">

                        </div>

                    </div>
                </div>



            </div>
        )
    }
}

export default AddVouch