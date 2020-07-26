import React from "react";
import user from "../img/user.svg";
import pencil from "../img/pencil.svg";
import back from "../img/camera-back.svg";
import Ledger from "./Ledger_Account";
import Report_pro from "./Report_Acc_pro";

export default class Account_pro extends React.Component {
  totalDebit = () => {
    let t = 0;

    this.state.bal.map(e => {
      if (e.supplier === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      } else if (e.debit_acc === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });

    return t;
  };

  totalCredit = () => {
    let t = 0;

    this.state.bal.map(e => {
      if (e.customer === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      } else if (e.credit_acc === this.props.account.acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });

    return t;
  };

  getDet = async () => {
    let end_date_p = await document.getElementById("ledger_date_end_p");
    let start_date_p = await document.getElementById("ledger_date_start_p");
    let start_date = await document.getElementById("ledger_date_start").value;
    let end_date = await document.getElementById("ledger_date_end").value;
    let parti = await document.getElementById("print_particulars");
    let subagent = await document.getElementById("print_sub_agent");
    let filter = await document.getElementById("search_filters");
    let mode = await document.getElementById("filter_op");
    

    if(this.state.det2 != null && mode.value){
      await fetch(`/api/vouch/recent/${this.props.account.acc_name}?mode=${mode.value}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState(() => {
            return {
              det2: data,
              det3: data,
              details: [],
              bal : data
            };
          });
        }
      })
    }

    if (parti && start_date_p && end_date_p && subagent) {
      await fetch(
        `/api/vouch/specific/${this.props.account.acc_name}?particulars=${parti.value}&sdate=$
        {start_date_p.value}&edate=${end_date_p.value}&agent=${subagent.value}`
      )
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.setState(() => {
              return {
                details: data,
                det2: [],
                bal : data,
                recent: false
              };
            });
          }
        });
    } else if (filter.value) {
      await fetch(
        `/api/vouch/specific/${this.props.account.acc_name}?particulars=${filter.value}
        &sdate=${start_date}&edate=${end_date}&bill_num=${filter.value}&mode=${mode.value}`
      )
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.setState(() => {
              return {
                details: data,
                det2: [],
                bal : data ,
                recent: false
              };
            });
          }
        });
    } else if (start_date && end_date) {
      await fetch(`/api/vouch/specific/${this.props.account.acc_name}?sdate=${start_date}&edate=${end_date}&mode=${mode.value}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.setState(() => {
              return {
                details: data,
                det2: [],
                bal : data ,
                recent: false
              };
            });
          }
        });
      }
     

        

  };

  clearall = () => {
    document.getElementById("ledger_date_start").value = null;
    document.getElementById("ledger_date_end").value = null;
    document.getElementById("search_filters").value = null;

    fetch(`/api/vouch/recent/${this.props.account.acc_name}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState(() => {
            return {
              det2: data,
              details: [],
              bal :data
            };
          });
        } else {
          alert("nothing");
        }
      });
  };

  handleradio = val => {
    this.setState(() => {
      return {
        filter: val
      };
    });
  };


 async componentDidMount(){
 
    await fetch(`/api/vouch/recent/${this.props.account.acc_name}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState(() => {
            return {
              det2: data,
              det3: data,
              details: [],
              bal : data
            };
          });
        }
      })
     
  }

  constructor(props) {
    super(props);

    this.state = {
      details: [],
      det2: [],
      filter: null,
      det3: [],
      bal : []
    };
  }

  render() {
    return (
      <div>
        <div className="acc_highest">
          <div className="acc_pro_location">
            <span>
              <img src={back} onClick={() => this.props.backToAcc()} />
            </span>
            accounting / accounts / account profile
          </div>
        
        </div>

        <div className="acc_pro_body">
          <div className="acc_pro_sbar">
            <div className="acc_pro_img">
              <img alt=" " src={user} id="acc_pro_img_id" />
            </div>
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
            <Ledger
              account={this.props.account}
              getDet={this.getDet}
              clearall={this.clearall}
              details={this.state.details}
              det2={this.state.det2}
              handleradio={this.handleradio}
              handleSearch={this.handleSearch}
              det3={this.state.det3}
              totalDebit = {this.totalDebit}
              totalCredit = {this.totalCredit}
            />
          )}

          {this.props.acc_pro_val === "reports" && <Report_pro acc_name={this.props.account.acc_name} />}
        </div>
      </div>
    );
  }
}
