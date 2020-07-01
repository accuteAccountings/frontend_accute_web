import React from 'react'
import pencil from "../img/pencil.svg";


export default class Account_pro extends React.Component{
    render(){
        return(
            <div>
                <div className = "acc_pro_location">
                    accountings / accounts / account profile
                </div>
                <div className = "acc_pro_body">
                    <div className = "acc_pro_sbar">
                        <div className = "acc_pro_img">

                        </div>
                        <div className = "acc_pro_name">
                            account name   
                        </div>
                        <div className = "sbar_list">
                            <div className = "sbar_list_value" onClick = {() => this.props.setAccProfile('acc_det')}>
                                Account Details
                            </div>
                            <div className = "sbar_list_value" onClick = {() => this.props.setAccProfile('ledger')}>
                                Ledger
                            </div>
                            <div className = "sbar_list_value" onClick = {() => this.props.setAccProfile('reports')}>
                                Reports
                            </div>
                        </div>
                    </div>
                    {this.props.acc_pro_val === 'acc_det' && (
                        <div className = "acc_pro_right">
                        <div className = "acc_pro_right_upper">
                            <div className = "acc_pro_right_name">
                                {this.props.account.acc_name}
                                <span className = "acc_pro_right_pname">
                                ({this.props.account.print_name})
                                </span>
                            </div>
                            <div className = "acc_pro_right_add">
                            {this.props.account.address_line1}
                                
                            </div>
                        </div>
                        <div className = "acc_pro_right_lower">
                            <div className = "acc_pro_right_heading">
                                <div>
                                    BASIC DETAILS
                                </div>
                                <div className = "acc_pro_right_edit">
                                    <img src = {pencil} />
                                </div>
                            </div>
                            <div className = "acc_pro_right_details">
                                <div className = "acc_pro_detail_heading">
                                    <span>Phone</span>
                                    <br />
                                    <span className = "acc_pro_details_value">
                                         {this.props.account.mob_num}
                                       
                                        <span className="acc_pro_details_bvalue">
                                            (Mobile)
                                        </span>
                                    </span>
                                    <span className = "acc_pro_details_value">
                                        {this.props.account.phone_num}
                                        
                                        <span className="acc_pro_details_bvalue">
                                            (Office)
                                        </span>
                                    </span>
                                </div>
                                <div className = "acc_pro_detail_heading">
                                    <span>Email</span>
                                    <br />
                                    <span className = "acc_pro_details_value">
                                    {this.props.account.emailId}   
                                    </span>
                                </div>
                                <div className = "acc_pro_detail_last">
                                    <div className = "acc_pro_detail_heading">
                                        Pan No.
                                        <br />
                                        <span className = "acc_pro_details_value">{this.props.account.pan_num}</span>
                                    </div>
                                    <div className = "acc_pro_detail_heading">
                                        GST No.
                                        <br />
                                        <span className = "acc_pro_details_value">{this.props.account.gst_num}</span>
                                    </div>
                                    <div className = "acc_pro_detail_heading">
                                        Adhaar No.
                                        <br />
                                        <span className = "acc_pro_details_value">{this.props.account.aadhar_num}</span>
                                    </div>
                                </div>
                            </div>  
                            <div >
                                <div className = "right_lower_heading">
                                    BANKING DETAILS
                                </div>
                                <div className = "acc_pro_detail_last_lowr">
                                    <div className = "acc_pro_detail_heading">
                                        Account No.
                                        <br />
                                        <span className = "acc_pro_details_value"></span>
                                    </div>
                                    <div className = "acc_pro_detail_heading">
                                        Bank Name , Branch 
                                        <br />
                                        <span className = "acc_pro_details_value">State Bnak of India ,  karnal haryana</span>
                                    </div>
                                    <div className = "acc_pro_detail_heading">
                                        IIFC Code
                                        <br />
                                        <span className = "acc_pro_details_value">BTVPN9211R</span>
                                    </div>
                                    <div className = "acc_pro_detail_heading">
                                        Remarks
                                        <br />
                                        <span className = "acc_pro_details_value">BTVPN9211R</span>
                                 </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    ) }
                   
                </div>
            </div>
        )
    }
}