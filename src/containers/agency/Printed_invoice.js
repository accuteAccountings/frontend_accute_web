import React from 'react'

export default class Printed_Invoice extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            arr : [1,2,3,4,5,6,7,8,9,10]
        }
    }

    render(){
        return(
            <div className = "print_invoice">
                <div className = "top_pvouch">
                    <div className = "comp_logo">
                        <div className = "comp_name">
                            <div>
                                PRADHANJEE FASHION FABRICS
                            </div>
                            <div className = "moto">
                                A House of Grey Fabrics , Sarees & Dress Materials
                            </div>
                            <div className = "address">
                            Shop No. 4577, Wing 108, Radha Krishan Textile Market, Ring Road, Surat - 399002
                            </div>
                            <div className = "gst_phn">
                                <div>Ph.: 5446876924 , 5876214547</div>
                                <div>GST No. :<span>bhscvsbcs1545v4d</span></div>
                            </div>
                        </div>
                    </div>
                    <div className = "auto_mar_top">
                        <div className = "left">
                            <div className = "row_top">
                                <div className = "headline">GST INVOICE</div>
                            </div>
                            <div className = "row_top_ph_date">
                                <div className = "phone">
                                    <span className = "num_head">Invoice No. :</span>
                                    <span className = "invoice_num">02451745</span>
                                </div>
                                <div className = "phone">
                                    <span className = "num_head">Net Amount :</span>
                                    <span className = "amount_num">279720</span>
                                </div>
                                <div className = "phone">
                                    <span className = "num_head">Date :</span>
                                    <span className = "invoice_gst_date">28/ Aug /20</span>
                                </div>
                            </div>
                        </div>
                        <div className = "acc_bill_det">
                        <div className = "heading">Billing To.</div>
                        <div className = "bill_other_info">
                            <div>John Smith</div>
                        </div>
                        <div className = "bill_adress">
                            H.NO 853 , BHOOS WALI GALI
                        </div>
                        <div className = "bill_adress">
                            KIDWAI NAGAR MEERUT U.P
                        </div>
                        <div className = "bill_adress">
                            GSTIN : 09VHJVHJS56
                        </div>
                        <div className = "bill_adress">
                            STATE : HARYANA
                        </div>
                    </div>    
                    
                    
                    <div className = "acc_bill_det">
                    <div className = "heading">Deleivery Address.</div>
                    <div className = "bill_other_info">
                        <div>John Smith</div>
                    </div>
                    <div className = "bill_adress">
                        H.NO 853 , BHOOS WALI GALI
                    </div>
                    <div className = "bill_adress">
                        KIDWAI NAGAR MEERUT U.P
                    </div>
                    <div className = "bill_adress">
                        GSTIN : 09VHJVHJS56
                    </div>
                    <div className = "bill_adress">
                        STATE : HARYANA
                    </div>
                </div>

                    </div>
                </div>
                <div className = "billing_det_print">
                
                <div className = "tax_invoice_det">
                <div className = "transport_entry_head">
                    <span className = "ques">Transport </span>
                    <span className = "ques_val">MAA ANAPURNA TRAVEL AGENCY</span>
                </div>
                <div className = "transport_entry">
                    <span className = "ques">Station : </span>
                    <span className = "ques_val">Surat</span>
                </div>
                <div className = "transport_entry_lr">
                    <div className = 'lr_det'>
                        <span className = "ques">L.R.No. : </span>
                        <span className = "ques_val">768468</span>
                    </div>
                    <div className = 'lr_det'>
                        <span className = "ques">L.R.Dr. : </span>
                        <span className = "ques_val">22/05/2018</span>
                    </div>
                </div>
                <div className = "transport_entry_lr">
                    <div className = 'case_det'>
                        <span className = "ques">Case.No. : </span>
                        <span className = "ques_val">5544</span>
                    </div>
                    <div className = 'case_det'>
                        <span className = "ques">Freight. : </span>
                        <span className = "ques_val">0.0</span>
                    </div>
                </div>
             </div>

                <div className = "agent_det_inv">
                        <div className = "agent_first">
                            <span>Agent  </span>
                            <span className = "name_val">
                                John Smith
                            </span>
                        </div>
                        <div className = "agent_name">
                            <span>Address </span>
                            <span className = "add_val">
                                Delhi
                            </span>
                        </div>
                        <div className = "bottom_row_age_inv">
                            <div className = "agent_name">
                                <span className = "m_head">Eway Bill no. : </span>
                                <span className = "bottom_val">78684353</span>
                            </div>
                            <div className = "agent_name">
                                <span className = "m_head_date">Eway Bill date. : </span>
                                <span className = "bottom_val_date">25/10/2019</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className = "mid_inv_table">
                    <div className = "headings_content">
                        <div className = "sr">No.</div>
                        <div className = "item_des">Item Description</div>
                        <div className = "unit_price">HSN No.</div>
                        <div className = "qty">QTY</div>
                        <div className = "rate">Rate</div>
                        <div className = "total">Total</div>
                    </div>
                    {this.state.arr.map((e,i) => {
                        return (
                            <div className = "l_content">
                                <div className = "sr">{i+1}</div>
                                <div className = "item_des">Lorem ipsum is a text generator</div>
                                <div className = "unit_price">4568</div>
                                <div className = "qty">15</div>
                                <div className = "rate">185</div>
                                <div className = "total">75000</div>
                            </div>
                        )
                    })}
                    <div className = "headings_content">
                        <div className = "sr"></div>
                        <div className = "item_des"></div>
                        <div className = "unit_price">Total</div>
                        <div className = "qty">1,152</div>
                        <div className = "rate">Avg.: 185</div>
                        <div className = "total">2,12520</div>
                    </div>
                </div>
                <div className = "total_info_inv_pbill">
                    <div className = "pay_methods">
                        <div className = "head_pay">Bank Details For NEFT / RTGS or UPI</div>
                        <div className = "head">
                            <span className = "id">1.</span>
                            <span className = "bank_name">Kotak Mahindra Bank , Surat</span>
                        </div>
                        <div className  = "upi">
                            <div className = "account_iifc">
                                <div className = "pre">Account No. :</div>
                                <div className = "post">79845136812</div>
                            </div>
                            <div className = "account_iifc">
                                <div className = "pre">IIFC :</div>
                                <div className = "post">KKB0000555552</div>
                            </div>
                            </div>
                            <div className = "head">
                                <span className = "id">1.</span>
                                <span className = "bank_name">Kotak Mahindra Bank , Surat</span>
                            </div>
                            <div className  = "upi">
                            <div className = "account_iifc">
                                <div className = "pre">Account No. :</div>
                                <div className = "post">79845136812</div>
                            </div>
                            <div className = "account_iifc">
                                <div className = "pre">IIFC :</div>
                                <div className = "post">KKB0000555552</div>
                            </div>
                            </div>
                            <div className = "payment_time">
                                <span>Payment Within</span>
                                <span className = "time_spent">45 Days</span>
                            </div>
                       
                    </div>
                    <div className = "sub_totals">
                        <div className = "total_head_val">
                            <div className = "sub_heads">Gross Amount :</div>
                            <div className = "heads_val">75000</div>
                        </div>
                        <div className = "total_head_val">
                            <div className = "sub_heads">Discount (5%) :</div>
                            <div className = "heads_val">5000</div>
                        </div>
                        <div className = "total_head_val">
                            <div className = "sub_heads">Cash Discount :</div>
                            <div className = "heads_val">5000</div>
                        </div>
                        <div className = "total_head_val">
                            <div className = "sub_heads">Sub Total :</div>
                            <div className = "heads_val">5000</div>
                        </div>
                        <div className = "sgst_cgst">
                            <div className = "total_scgst">
                                <div className = "sub_heads">SGST (0%)</div>
                                <div className = "heads_val">0</div>
                            </div>
                            <div className = "total_scgst">
                                <div className = "sub_heads">CGST (0%)</div>
                                <div className = "heads_val">0</div>
                            </div>
                        </div>
                        <div className = "total_head_val">
                            <div className = "sub_heads">IGST (5%)</div>
                            <div className = "heads_val">0</div>
                        </div>
                        <div className = "total_head_val">
                            <div className = "sub_heads">Net Amount</div>
                            <div className = "heads_val bold">21,370</div>
                        </div>
                    </div>
                </div>
                <div className = "bottom_most_tandc">
                    <div className = "thnk_note">
                        <div className = "tandc_inv">Terms And Conditions</div>
                        <div className = "tandc_val">
                            1. Payment to be made by A/c . Payee's cheque for demand draft only
                        </div>
                    </div>
                    <div className = "trader_name">
                        For , Pardhanjee Fashion Fabrics
                    </div>
                </div>
            </div>
        )
    }
}