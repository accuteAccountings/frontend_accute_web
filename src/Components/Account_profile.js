import React from "react";
import pencil from "../img/pencil.svg";
import back from "../img/camera-back.svg";

export default class Account_pro extends React.Component {
  getDet = async () => {

  
    let start_date = await  document.getElementById("ledger_date_start").value;
    let  end_date = await document.getElementById("ledger_date_end").value
 
    
    await fetch(`/api/vouch/specific/${this.props.account.acc_name}/${start_date}/${end_date}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState(() => {
            return {
              details: data,
              det2 : []
            };
          });
        }
      });

      
  };

  totalDebit = () => {
    let t = 0;

    this.state.details.map(e => {
      if (e.supplier === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      }
      else if (e.debit_acc === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });

    return t;
  };

  totalCredit = () => {
    let t = 0;

    this.state.details.map(e => {
      if (e.customer === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      }
      else  if (e.credit_acc === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });


    return t;
  };

  totalDebitpre = () => {
    let t = 0;

    this.state.det2.map(e => {
      if (e.supplier === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      }
      else if (e.debit_acc === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });

    return t;
  };

  totalCreditpre = () => {
    let t = 0;

    this.state.det2.map(e => {
      if (e.customer === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      }
      else  if (e.credit_acc === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });


    return t;
  };




  constructor(props) {
    super(props);


  let date = new Date()
    this.state = {
      details: [],
      det2 : [],
      debited: [],
      credited: [],
      today_date : date
    };

    
  }



  render() {

    if(this.props.acc_pro_val === "ledger"){
    
         fetch(`/api/vouch/recent/${this.props.account.acc_name}`)
            .then(res => res.json())
            .then(data => {
              if (data) {
                this.setState(() => {
                  return {
                    det2: data.reverse(),
                    details : []
                  };
                });
              }else{
                alert('nothing')
              }
            });
      
      
        
    }
 
    return (
      <div>
        <div className="acc_pro_location">
          <span>
            <img src={back} onClick={() => this.props.backToAcc()} />
          </span>
          accounting / accounts / account profile
        </div>
        <div className="acc_pro_body">
          <div className="acc_pro_sbar">
            <div className="acc_pro_img" />
            <div className="acc_pro_name">{this.props.account.acc_name}</div>
            <div className="sbar_list" id="sbar_list">
              <div
                className={this.props.acc_pro_val === "acc_det" ? "acc_det" : "sbar_list_value"}
                onClick={() => {
                  this.props.setAccProfile("acc_det");
                }}
              >
                Account Details
              </div>
              <div
                className={this.props.acc_pro_val === "ledger" ? "acc_det" : "sbar_list_value"}
                onClick={() => {
                  this.props.setAccProfile("ledger");
                  
                }}
                id="ledger"
              >
                Ledger
              </div>
              <div
                className={this.props.acc_pro_val === "reports" ? "acc_det" : "sbar_list_value"}
                onClick={() => this.props.setAccProfile("reports")}
                id="reports"
              >
                Reports
              </div>
            </div>
          </div>

          {this.props.acc_pro_val === "acc_det" && (
            <div className="acc_pro_right">
              <div className="acc_pro_right_upper">
                <div className="acc_pro_right_name">
                  {this.props.account.acc_name}
                  <span className="acc_pro_right_pname">({this.props.account.print_name})</span>
                </div>
                <div className="acc_pro_right_add">{this.props.account.address_line1}</div>
              </div>
              <div className="acc_pro_right_lower">
                <div className="acc_pro_right_heading">
                  <div>BASIC DETAILS</div>
                  <div className="acc_pro_right_edit">
                    <img src={pencil} />
                  </div>
                </div>
                <div className="acc_pro_right_details">
                  <div className="acc_pro_detail_heading">
                    <span>Phone</span>
                    <br />
                    <span className="acc_pro_details_value">
                      {this.props.account.mob_num}

                      <span className="acc_pro_details_bvalue">(Mobile)</span>
                    </span>
                    <span className="acc_pro_details_value">
                      {this.props.account.phone_num}

                      <span className="acc_pro_details_bvalue">(Office)</span>
                    </span>
                  </div>
                  <div className="acc_pro_detail_heading">
                    <span>Email</span>
                    <br />
                    <span className="acc_pro_details_value">{this.props.account.emailId}</span>
                  </div>
                  <div className="acc_pro_detail_last">
                    <div className="acc_pro_detail_heading">
                      Pan No.
                      <br />
                      <span className="acc_pro_details_value">{this.props.account.pan_num}</span>
                    </div>
                    <div className="acc_pro_detail_heading">
                      GST No.
                      <br />
                      <span className="acc_pro_details_value">{this.props.account.gst_num}</span>
                    </div>
                    <div className="acc_pro_detail_heading">
                      Adhaar No.
                      <br />
                      <span className="acc_pro_details_value">{this.props.account.aadhar_num}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="right_lower_heading">BANKING DETAILS</div>
                  <div className="acc_pro_detail_last_lowr">
                    <div className="acc_pro_detail_heading">
                      Account No.
                      <br />
                      <span className="acc_pro_details_value" />
                    </div>
                    <div className="acc_pro_detail_heading">
                      Bank Name , Branch
                      <br />
                      <span className="acc_pro_details_value">State Bnak of India , karnal haryana</span>
                    </div>
                    <div className="acc_pro_detail_heading">
                      IIFC Code
                      <br />
                      <span className="acc_pro_details_value">BTVPN9211R</span>
                    </div>
                    <div className="acc_pro_detail_heading">
                      Remarks
                      <br />
                      <span className="acc_pro_details_value">BTVPN9211R</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {this.props.acc_pro_val === "ledger" && (
            <div className="ledger_tab">
              <div className="acc_pro_ledger_upper">
                <div className="upp_date">
                <label for = "ledger_date_start">From : </label>
                  <input type="date" id="ledger_date_start" name = "ledger_date_start" placeholder = "From"  />
                <label for = "ledger_date_end">To : </label>
                  <input type="date" id="ledger_date_end"   />
                  <button onClick={this.getDet}>search</button>
                </div>
                <div className="ledger_upp_right_div">
                  <div className="ledger_upp_right">
                    <span className="upp_head">Debit : </span>
                    {this.state.det2.length ?this.totalDebitpre() : this.totalDebit()}
                  </div>
                  <div className="ledger_upp_right">
                    <span className="upp_head">Credit : </span>
                    {this.state.det2.length ? this.totalCreditpre() : this.totalCredit()}
                  </div>
                  <div className="leger_upp_right">
                    <span className="upp_head">Balance : </span>
                    {this.props.account.Balance}
                  </div>
                </div>
              </div>
              <div className="acc_pro_ledger">
                <table className="acc_pro_table">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Date</th>
                      <th>Particulars</th>
                      <th>Bill No.</th>
                      <th>Debit</th>

                      <th>Credit</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.details.map((e, i) => {
                      return (
                        
                          e.credit_acc ?(<tr className = "tr_acc">
                          <td>{i + 1}</td>
                          <td className="td_date">{e.bill_date}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? e.debit_acc : e.credit_acc}</td>
                          <td className="td_bill">{e.billArr.join(" , ")}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? "-" : e.amount - e.balance}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? e.amount - e.balance : "-"}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? e.Bal_left_credit : e.Bal_left_debit}</td>
                          </tr>
                          ) : (<tr className = "tr_acc">
                          <td>{i + 1}</td>
                          <td className="td_date">{e.bill_date}</td>
                          <td>{e.customer === this.props.account.acc_name ? e.supplier : e.customer}</td>
                          <td className="td_bill">{e.bill_num}</td>
                          <td>{e.supplier === this.props.account.acc_name ? e.totalAmt : "-"}</td>
                          <td>{e.customer === this.props.account.acc_name ? e.totalAmt : "-"} </td>
                          <td>
                            {e.supplier === this.props.account.acc_name ? e.Bal_left_supplier : e.Bal_left_costumer}{" "}
                          </td>
                          </tr>
                          )
                            
                      );
                    })}


                    {this.state.det2.map((e, i) => {
                      return (
                        
                        e.credit_acc && i < 7 ? (<tr className = "tr_acc">
                          <td>{i + 1}</td>
                          <td className="td_date">{e.bill_date}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? e.debit_acc : e.credit_acc}</td>
                          <td className="td_bill">{e.billArr.join(" , ")}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? "-" : e.amount - e.balance}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? e.amount - e.balance : "-"}</td>
                          <td>{e.credit_acc === this.props.account.acc_name ? e.Bal_left_credit : e.Bal_left_debit}</td>
                          </tr>
                          ) : (
                              i < 7 &&
                            <tr className = "tr_acc">
                          <td>{i + 1}</td>
                          <td className="td_date">{e.bill_date}</td>
                          <td>{e.customer === this.props.account.acc_name ? e.supplier : e.customer}</td>
                          <td className="td_bill">{e.bill_num}</td>
                          <td>{e.supplier === this.props.account.acc_name ? e.totalAmt : "-"}</td>
                          <td>{e.customer === this.props.account.acc_name ? e.totalAmt : "-"} </td>
                          <td>
                            {e.supplier === this.props.account.acc_name ? e.Bal_left_supplier : e.Bal_left_costumer}{" "}
                          </td>
                          </tr>
                          )
                            
                      );
                    })}


                    <tr className="tr_acc">
                      <td></td>
                      <td className="td_date"> </td>
                      <td> </td>
                      <td className="td_bill"> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                    
                    <tr className="tr_acc">
                      <td> </td>
                      <td className="td_date"> </td>
                      <td> </td>
                      <td className="td_bill"> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>

                      <tr className="tr_acc">
                        <td> </td>
                        <td className="td_date"> </td>
                        <td> </td>
                        <td className="td_bill"> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                      </tr>

                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
async function postData(url = "", data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": "application/json"
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer"
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
