import React from "react";
import Modal from "react-modal";
import cross from "./../img/cancel.svg";

export default class Ledger extends React.Component {
  handleModal = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      };
    });
  };
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.props.getDet();
    }
  }

  Ledger_Balance = (id) => {
    let t =0;
    this.props.details.map((e , i) => {
      i <= id &&
      (e.credit_acc ? (
        (e.credit_acc === this.props.account.acc_name ) ?
      (t = parseInt(t) + parseInt(e.amount - e.balance)) :
      (t = parseInt(t) - parseInt(e.amount - e.balance))
      ) : (
        (e.customer === this.props.account.acc_name ) ?
      ( t = parseInt(t) + parseInt(e.totalAmt)) :
      (t = parseInt(t) - parseInt(e.totalAmt))
      )
      )
    })
    return t
  }

  Rec_Ledger_Balance = (id) => {
    let t =0;
    this.props.det2.map((e , i) => {
      i <= id &&
      (e.credit_acc ? (
        (e.credit_acc === this.props.account.acc_name ) ?
      (t = parseInt(t) + parseInt(e.amount - e.balance)) :
      (t = parseInt(t) - parseInt(e.amount - e.balance))
      ) : (
        (e.customer === this.props.account.acc_name ) ?
      ( t = parseInt(t) + parseInt(e.totalAmt)) :
      (t = parseInt(t) - parseInt(e.totalAmt))
      )
      )
    })
    return t
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div>
        <div className="ledger_tab">
          <div className="acc_pro_ledger_upper">
            <div className="upp_date">
              <div>
                <label for="ledger_date_start">From : </label>
                <br />
                <input type="date" id="ledger_date_start" name="ledger_date_start" placeholder="From" />
              </div>
              <div>
                <label for="ledger_date_end">To : </label>
                <br />
                <input type="date" id="ledger_date_end" />
              </div>
            </div>

            <div className="filter">
              <div className="checkboxes_search">
                <input
                  type="radio"
                  name="parti"
                  id="check_parti"
                  value="A"
                  onClick={() => {
                    this.props.handleradio("parti");
                  }}
                />
                <label for="A">Particulars</label>
                <input
                  type="radio"
                  name="parti"
                  id="check_agent"
                  value="B"
                  onClick={() => {
                    this.props.handleradio("agent");
                  }}
                />
                <label for="B">Sub Agent</label>
                <input
                  type="radio"
                  name="parti"
                  id="check_bill_num"
                  value="C"
                  onClick={() => {
                    this.props.handleradio("bill_num");
                  }}
                />
                <label for="C">Bill No.</label>
              </div>
              <input
                type="search"
                placeholder="Search"
                id="specific_search_ledger"
                onKeyPress={this.enterPressed.bind(this)}
              />
            </div>

            <div className="search_date">
              <button onClick={this.props.getDet} className="btn_search">
                search
              </button>
            </div>

            <button onClick={this.props.clearall} className="btn_search">
              clear filters
            </button>

            <button onClick={this.handleModal} className="btn_search">
              Print ledger
            </button>
          </div>

          <div>
            <Modal isOpen={this.state.open} onRequestClose={this.handleModal} className="modal">
              <div className="acc_modal">
                <div className="acc_modal_head">
                  <div className="acc_modal_text">GET LEDGER</div>
                  <div>
                    <img onClick={this.handleModal} src={cross} alt="" />
                  </div>
                </div>
                <div className="acc_modal_below">
                  <span>Account Name : </span>
                  <span>
                    <input type="text" value={this.props.account.acc_name} />
                  </span>
                </div>
                <div className="date_print_modal">
                  <label for="ledger_date_start">From : </label>
                  <input type="date" id="ledger_date_start_p" name="ledger_date_start" placeholder="From" />
                  <label for="ledger_date_end">To : </label>
                  <input type="date" id="ledger_date_end_p" />
                </div>
                <div className="parti_agent">
                  <input type="text" id="print_particulars" placeholder="particulars" />
                  <input type="text" id="print_sub_agent" placeholder="Supplier Agent" />
                </div>
                <div className="submit_modal">
                  <button
                    onClick={async () => {
                      await this.props.getDet();
                      await window.print();
                    }}
                    className="print_btn_modal"
                  >
                    Print
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <div className="acc_pro_ledger print_table">
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
                {this.props.details.map((e, i) => {
                  return e.credit_acc ? (
                    <tr className="tr_acc">
                      <td>{i + 1}</td>
                      <td className="td_date">{e.bill_date}</td>
                      <td>{e.credit_acc === this.props.account.acc_name ? e.debit_acc : e.credit_acc}</td>
                      <td className="td_bill">{e.billArr.join(" , ")}</td>
                      <td>{e.credit_acc === this.props.account.acc_name ? "-" : e.amount - e.balance}</td>
                      <td>{e.credit_acc === this.props.account.acc_name ? e.amount - e.balance : "-"}</td>
                      <td>{this.Ledger_Balance(i)} </td>
                    </tr>
                  ) : (
                    <tr className="tr_acc">
                      <td>{i + 1}</td>
                      <td className="td_date">{e.bill_date}</td>
                      <td>{e.customer === this.props.account.acc_name ? e.supplier : e.customer}</td>
                      <td className="td_bill">{e.bill_num}</td>
                      <td>{e.supplier === this.props.account.acc_name ? e.totalAmt : "-"}</td>
                      <td>{e.customer === this.props.account.acc_name ? e.totalAmt : "-"} </td>
                      <td>{this.Ledger_Balance(i)}  </td>
                    </tr>
                  );
                })}

                {this.props.det2.map((e, i) => {
                  return e.credit_acc && i < 7 ? (
                    <tr className="tr_acc">
                      <td>{i + 1}</td>
                      <td className="td_date">{e.bill_date}</td>
                      <td>{e.credit_acc === this.props.account.acc_name ? e.debit_acc : e.credit_acc}</td>
                      <td className="td_bill">{e.billArr.join(" , ")}</td>
                      <td>{e.credit_acc === this.props.account.acc_name ? "-" : e.amount - e.balance}</td>
                      <td>{e.credit_acc === this.props.account.acc_name ? e.amount - e.balance : "-"}</td>
                      <td>{this.Rec_Ledger_Balance(i)} </td>
                    </tr>
                  ) : (
                    i < 7 && (
                      <tr className="tr_acc">
                        <td>{i + 1}</td>
                        <td className="td_date">{e.bill_date}</td>
                        <td>{e.customer === this.props.account.acc_name ? e.supplier : e.customer}</td>
                        <td className="td_bill">{e.bill_num}</td>
                        <td>{e.supplier === this.props.account.acc_name ? e.totalAmt : "-"}</td>
                        <td>{e.customer === this.props.account.acc_name ? e.totalAmt : "-"} </td>
                        <td>{this.Rec_Ledger_Balance(i)} </td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
