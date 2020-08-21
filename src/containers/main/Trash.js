import React from "react";
import Delete from "./Delete";
import ref from "./../img/refresh.svg";
import trash from "../img/trash.svg";
import restore from "../img/restore.svg";

class Trash extends React.Component {
  deleteIt = url => {
    this.setState({ delete: true, deleteUrl: url });
  };
  restoreIt = async url => {
    try {
      let a = await fetch(url, { method: "PUT" });
      if (a) {
        this.deleteHide();
      } else {
        alert("Internal Error: Cannot Delete ");
      }
    } catch (err) {
      alert("Fetching Error : Cannot Delete ");
    }
  };
  deleteHide = () => {
    this.updateVouchData();
    this.updateJoVouchData();
    this.setState({ delete: false });
  };
  constructor(props) {
    super(props);

    this.state = {
      addVouch: false,
      addDebit: false,
      data: [],
      Debitdata: [],
      JoVouchdata: [],
      Creditdata: [],
      deleteUrl: null,
      delete: false,
      err_vouch: false,
      err_jovouch: false,
      err_debit: false,
      err_credit: false
    };
    this.updateVouchData();

    this.updateJoVouchData();
  }
  updateVouchData = () => {
    fetch("/api/vouch")
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return {
            data: data.reverse()
          };
        });
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_vouch: true
          };
        });
      });
  };
  updateDebitData = () => {
    fetch("/api/debit")
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return {
            Debitdata: data
          };
        });
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_debit: true
          };
        });
      });
  };
  updateCreditData = () => {
    fetch("/api/credit")
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return {
            Creditdata: data
          };
        });
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_credit: true
          };
        });
      });
  };

  updateJoVouchData = () => {
    fetch("/api/jovouch")
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return {
            JoVouchdata: data.reverse()
          };
        });
      })
      .catch(err => {
        this.setState(() => {
          return {
            err_jovouch: true
          };
        });
      });
  };

  render() {
    return (
      <div className="pro_compo">
        <h1 style={{ width: 200, margin: "30px auto" }} className="trash_header">
          Trash
        </h1>
        <div className="nav_sec_trans">
          {this.state.delete && <Delete deleteHide={this.deleteHide} deleteUrl={this.state.deleteUrl} />}
          <div className="nav_items">
            <li
              className={this.props.vouchPage === "pv" ? "black" : "grey"}
              onClick={() => {
                this.props.setVouchPage("pv");
              }}
            >
              Purchase Vouchers
            </li>
            <li
              className={this.props.vouchPage === "jv" ? "black" : "grey"}
              onClick={() => {
                this.props.setVouchPage("jv");
              }}
            >
              Journal Vouchers
            </li>
            <li
              className={this.props.vouchPage === "dn" ? "black" : "grey"}
              onClick={() => {
                this.props.setVouchPage("dn");
              }}
            >
              Debit Note
            </li>
            <li
              className={this.props.vouchPage === "cn" ? "black" : "grey"}
              onClick={() => {
                this.props.setVouchPage("cn");
              }}
            >
              Credit Note
            </li>
          </div>
          <div className="other_det">
            <img
              src={ref}
              alt=" "
              onClick={this.props.ProOrAcc === "Products" ? this.props.getProducts : this.props.getAccounts}
            />

            <input
              type="text"
              id="searchForProOrAcc"
              onChange={() => {
                this.props.fi();
              }}
            />
          </div>
        </div>

        <div className="pro_compo_con">
          <div className="pro_con_vouch">
            {this.props.vouchPage === "pv" && (
              <div className="vouchCon">
                {this.state.err_vouch ? (
                  <div className="wrong_alert">Something Went Wrong....</div>
                ) : (
                  this.state.data.map((e, i) => {
                    if (e.det.IsDeleted) {
                      if (!(e.det.type === "purchase")) {
                        return;
                      }
                      return (
                        <DetCont
                          i={i + 1}
                          editF={this.props.setPVoJVoDN}
                          EData={e}
                          supplier={e.det.supplier}
                          costumer={e.det.customer}
                          date={e.det.bill_date}
                          amt={e.det.totalAmt}
                          bill_num={e.det.bill_num}
                          id={e.det.id}
                          deleteIt={this.deleteIt}
                          restoreIt={this.restoreIt}
                          status={e.det.status}
                        />
                      );
                    } else {
                    }
                  })
                )}
              </div>
            )}

            {this.props.vouchPage === "dn" &&
              (this.state.err_debit ? (
                <div className="wrong_alert">Something Went Wrong....</div>
              ) : (
                <div className="vouchCon">
                  {this.state.data.map((e, i) => {
                    if (e.det.type === "debit") {
                      if (!e.det.IsDeleted) {
                        return;
                      }
                      return (
                        <DetCont
                          i={i + 1}
                          editF={this.props.setPVoJVoDN}
                          EData={e}
                          supplier={e.det.supplier}
                          costumer={e.det.customer}
                          restoreIt={this.restoreIt}
                          date={e.det.bill_date}
                          amt={e.det.totalAmt}
                          bill_num={e.det.bill_num}
                          id={e.det.id}
                          deleteIt={this.deleteIt}
                          status={e.det.status}
                        />
                      );
                    }
                  })}
                </div>
              ))}

            {this.props.vouchPage === "cn" &&
              (this.state.err_credit ? (
                <div className="wrong_alert">Something Went Wrong....</div>
              ) : (
                <div className="vouchCon">
                  {this.state.data.map((e, i) => {
                    if (e.det.type === "credit") {
                      if (!e.det.IsDeleted) {
                        return;
                      }
                      return (
                        <DetCont
                          i={i + 1}
                          editF={this.props.setPVoJVoDN}
                          EData={e}
                          supplier={e.det.supplier}
                          costumer={e.det.customer}
                          date={e.det.bill_date}
                          restoreIt={this.restoreIt}
                          amt={e.det.totalAmt}
                          bill_num={e.det.bill_num}
                          id={e.det.id}
                          deleteIt={this.deleteIt}
                          status={e.det.status}
                        />
                      );
                    }
                  })}
                </div>
              ))}

            {this.props.vouchPage === "jv" &&
              (this.state.err_jovouch ? (
                <div className="wrong_alert">Something Went Wrong....</div>
              ) : (
                <div className="vouchCon">
                  {this.state.JoVouchdata.error
                    ? null
                    : this.state.JoVouchdata.map((e, i) => {
                        if (!e.IsDeleted) {
                          return;
                        }
                        return (
                          <JoVouchDet
                            bills={e.billArr}
                            i={i + 1}
                            amount={e.amount}
                            balance={e.balance}
                            date={e.bill_date}
                            seller={e.debit_acc}
                            restoreIt={this.restoreIt}
                            cust={e.credit_acc}
                            setPVoJVoDN={this.props.setPVoJVoDN}
                            data={e}
                            id={e.id}
                            deleteIt={this.deleteIt}
                            updateJoVouchData={this.updateJoVouchData}
                            specificJoVouch={this.props.specificJoVouch}
                            setjoBill={this.props.setjoBill}
                          />
                        );
                      })}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

class DetCont extends React.Component {
  render() {
    return (
      <div className={this.props.deleted ? " det_cont_vouch   vouch_del" : "det_cont_vouch"}>
        <div className="det_cont_left vouc_det_left">
          <div className="acc_name_vouch">
            <span className="acc_id_vouch">{this.props.id}. </span>
            {this.props.supplier}
            <span className="vouch_to">TO</span>
            <span className="vouch_costumer_name">{this.props.costumer}</span>
            {this.props.deleted && <span id="delete_msg">This will be permanently deleted in 10 days</span>}
          </div>
          <div className="vouch_bill_detail">
            <div className="acc_adress">
              <span className="acc_adress_head vouch_amount">Amount :</span> {this.props.amt}
            </div>
            <div className="acc_adress">
              <span className="acc_adress_head">Biil No :</span> {this.props.bill_num}
            </div>
          </div>
        </div>
        <div className="det_cont_right_vouch vouch_right">
          <div className=" vouch_status">
            <span className="acc_right_vouch">Status:</span>{" "}
            {this.props.status === "0" ? <span style={{ color: "green" }}>Paid</span> : "UnPaid"}
          </div>
          <div className="vouch_date">
            <span className="acc_right_vouch"> Date:</span> {this.props.date}
          </div>
        </div>

        <div className="det_cont_icons">
          <div
            onClick={() => {
              this.props.restoreIt(`/api/vouch/res/${this.props.id}`);
            }}
          >
            <img src={restore} alt=" " />
          </div>
          <div
            onClick={() => {
              this.props.deleteIt("/api/vouch/permanent/" + this.props.id);
            }}
          >
            <img src={trash} alt=" " />
          </div>
        </div>
      </div>
    );
  }
}

class JoVouchDet extends React.Component {
  render() {
    return (
      <div className="det_cont_jovouch">
        <div className="det_cont_right_jovouch_m">
          <div className="vouch_bills">
            <span className="acc_id_vouch">{this.props.id} </span>
            <span className="acc_right_vouch">Bills:</span> {this.props.bills.join(" , ")}
          </div>
          <div className="acc_name_jovouch jovouch_det">
            <span>{this.props.seller} </span>
            <span className="vouch_to">TO</span>
            <span className="vouch_costumer_name">{this.props.cust}</span>
          </div>
        </div>
        <div className="det_cont_right_jovouch">
          <div className=" vouch_bills">
            <span className="acc_right_vouch">Pending Amount:</span> {this.props.balance}
          </div>
          <div className="vouch_bills">
            <span className="acc_right_vouch"> Amount:</span> {this.props.amount}
          </div>
        </div>
        <div className="det_cont_last_jovouch">
          <div className=" vouch_status">
            <span className="acc_right_vouch">Status:</span>{" "}
            <span style={{ color: this.props.balance <= 0 ? "green" : "red" }}>
              {this.props.balance <= 0 ? "Paid" : "UnPaid"}
            </span>
          </div>
          <div className="vouch_date">
            <span className="acc_right_vouch"> Date:</span> {this.props.date}
          </div>
        </div>
        <div className="det_cont_icons">
          <div
            onClick={() => {
              this.props.restoreIt(`/api/jovouch/res/${this.props.id}`);
            }}
          >
            <img src={restore} alt=" " />
          </div>
          <div
            onClick={() => {
              this.props.deleteIt(`/api/jovouch/permanent/${this.props.id}`);
            }}
          >
            <img src={trash} alt=" " />
          </div>
        </div>
      </div>
    );
  }
}

export default Trash;
