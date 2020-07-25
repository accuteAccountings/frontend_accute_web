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

  Ledger_Balance = id => {
    let t = 0;
    this.props.details.map((e, i) => {
      i <= id &&
        (e.credit_acc
          ? e.credit_acc === this.props.account.acc_name
            ? (t = parseInt(t) + parseInt(e.amount - e.balance))
            : (t = parseInt(t) - parseInt(e.amount - e.balance))
          : e.customer === this.props.account.acc_name
          ? (t = parseInt(t) + parseInt(e.totalAmt))
          : (t = parseInt(t) - parseInt(e.totalAmt)));
    });
    return t;
  };

  Rec_Ledger_Balance = (id) => {
    let t = 0;
    // let arr = this.props.det2.splice(0,8)
    this.props.det2.slice(0,7).reverse().map((e, i) => {
      i <= 6 - parseInt(id) &&
        (e.credit_acc
          ? e.credit_acc === this.props.account.acc_name
            ? (t = parseInt(t) + parseInt(e.amount - e.balance))
            : (t = parseInt(t) - parseInt(e.amount - e.balance))
          : e.customer === this.props.account.acc_name
          ? (t = parseInt(t) + parseInt(e.totalAmt))
          : (t = parseInt(t) - parseInt(e.totalAmt)));
    });
    return t;
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div className="ledger_con">
        <div className="ledger_tab">
          <div className="acc_pro_ledger_upper">
            <div className="filters_ledger">
              <div className="upp_date">
                <div>
                  <label for="ledger_date_start">From </label>
                  <br />
                  <input type="date" id="ledger_date_start" name="ledger_date_start" placeholder="From" />
                </div>
                <div>
                  <label for="ledger_date_end">To </label>
                  <br />
                  <input type="date" id="ledger_date_end" />
                </div>
                <div className="buttons_sec">
                  <div className="search_date">
                    <button onClick={this.props.getDet} className="btn_search">
                      Search
                    </button>
                  </div>

                  <div>
                    <button onClick={this.props.clearall} className="btn_search">
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              <div className="print_search">
                <div>
                  <button onClick={this.handleModal} className="print_btn_ledger">
                    Print ledger
                  </button>
                </div>
                <div>
                  <input
                    type="search"
                    placeholder="Search Account/Bill No."
                    id="search_filters"
                    onKeyPress={this.enterPressed.bind(this)}
                  />
                </div>
              </div>
            </div>

            <div className="ledger_upp_right_div">
              <div className="ledger_upp_right">
                <span className="upp_head">Debit : </span>
                {this.props.totalDebit()}
              </div>
              <div className="ledger_upp_right">
                <span className="upp_head">Credit : </span>
                {this.props.totalCredit()}
              </div>
              <div className="leger_upp_right">
                <span className="upp_head">Balance : </span>
                {parseInt(this.props.totalDebit()) - parseInt(this.props.totalCredit()) < 0
                  ? parseInt(this.props.totalCredit()) - parseInt(this.props.totalDebit()) + " (Cr.)"
                  : parseInt(this.props.totalDebit()) - parseInt(this.props.totalCredit()) + " (Dr.)"}
              </div>
            </div>
          </div>

          <div className="between_led">
            <div className="sort">
              <span>Sort By</span>
              <select id="filter_op" defaultValue="date" onChange={this.props.getDet}>
                <option value="date">Date</option>
                <option value="parti">Particulars</option>
                <option value="bill">Bill no.</option>
              </select>
            </div>
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
                      <td className="td_date">{e.bill_date}</td>
                      <td className="parti_td">
                        {e.credit_acc === this.props.account.acc_name ? e.debit_acc : e.credit_acc}
                      </td>
                      <td>{e.billArr.join(" , ")}</td>
                      <td className="td_dc">
                        {e.credit_acc === this.props.account.acc_name ? "-" : e.amount - e.balance}
                      </td>
                      <td className="td_dc">
                        {e.credit_acc === this.props.account.acc_name ? e.amount - e.balance : "-"}
                      </td>
                      <td>
                        {parseInt(this.Ledger_Balance(i)) < 0
                          ? this.Ledger_Balance(i) + " (Dr.)"
                          : this.Ledger_Balance(i) + " (Cr.)"}{" "}
                      </td>
                    </tr>
                  ) : (
                    <tr className="tr_acc">
                      <td className="td_date">{e.bill_date}</td>
                      <td className="parti_td">
                        {e.customer === this.props.account.acc_name ? e.supplier : e.customer}
                      </td>
                      <td>{e.bill_num}</td>
                      <td className="td_dc">{e.supplier === this.props.account.acc_name ? e.totalAmt : "-"}</td>
                      <td className="td_dc">{e.customer === this.props.account.acc_name ? e.totalAmt : "-"} </td>
                      <td>
                        {parseInt(this.Ledger_Balance(i)) < 0
                          ? this.Ledger_Balance(i) + " (Dr.)"
                          : this.Ledger_Balance(i) + " (Cr.)"}{" "}
                      </td>
                    </tr>
                  );
                })}

                {this.props.det2.map((e, i) => {
                  return e.credit_acc && i < 7 ? (
                    <tr className="tr_acc">
                      <td className="td_date">{e.bill_date}</td>
                      <td className="parti_td">
                        {" "}
                        {e.credit_acc === this.props.account.acc_name ? e.debit_acc : e.credit_acc}
                      </td>
                      <td>{e.billArr.join(" , ")}</td>
                      <td className="td_dc">
                        {e.credit_acc === this.props.account.acc_name ? "-" : e.amount - e.balance}
                      </td>
                      <td className="td_dc">
                        {e.credit_acc === this.props.account.acc_name ? e.amount - e.balance : "-"}
                      </td>
                      <td>
                        {parseInt(this.Rec_Ledger_Balance(i)) < 0
                          ? -this.Rec_Ledger_Balance(i) + " (Dr.)"
                          : this.Rec_Ledger_Balance(i) + " (Cr.)"}{" "}
                      </td>
                    </tr>
                  ) : (
                    i < 7 && (
                      <tr className="tr_acc">
                        <td className="td_date">{e.bill_date}</td>
                        <td className="parti_td">
                          {e.customer === this.props.account.acc_name ? e.supplier : e.customer}
                        </td>
                        <td>{e.bill_num}</td>
                        <td className="td_dc">{e.supplier === this.props.account.acc_name ? e.totalAmt : "-"}</td>
                        <td className="td_dc">{e.customer === this.props.account.acc_name ? e.totalAmt : "-"} </td>
                        <td>
                          {parseInt(this.Rec_Ledger_Balance(i)) < 0
                            ? -this.Rec_Ledger_Balance(i) + " (Dr.)"
                            : this.Rec_Ledger_Balance(i) + " (Cr.)"}{" "}
                        </td>
                      </tr>
                    )
                  );
                })}
                <tr className="tr_acc">
                  <td className="td_date"> </td>
                  <td className="parti_td"> </td>
                  <td> </td>
                  <td className="td_dc"> </td>
                  <td className="td_dc"> </td>
                  <td> </td>
                </tr>

                <tr className="tr_acc">
                  <td className="td_date"> </td>
                  <td className="parti_td"> </td>
                  <td> </td>
                  <td className="td_dc"> </td>
                  <td className="td_dc"> </td>
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
