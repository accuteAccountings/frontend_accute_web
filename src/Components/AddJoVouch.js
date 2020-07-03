import React from "react";
import cross from "./../img/cancel.svg";

async function postData(url = "", data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": "application/json"
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

class AddJovouch extends React.Component {
  bill_list_change = i => {
    let arr = [];

    document.querySelector(".pro_list" + i).style.display = "block";
    const bill = document.querySelector(".jo_bill_no" + i).value;
    if (i === 0) {
      const is = this.state.data.map(e => {
        if (e.det.bill_num.indexOf(bill) === -1) {
          return false;
        } else {
          arr.push(e);
          return true;
        }
      });

      this.setState({
        vouchData: arr
      });
    } else {
      const is = this.state.data.map(e => {
        if (
          e.det.bill_num.indexOf(bill) !== -1 &&
          e.det.customer === this.state.CBill.customer &&
          e.det.supplier === this.state.CBill.supplier
        ) {
          arr.push(e);
          return true;
        } else {
          return true;
        }
      });

      this.setState({
        vouchData: arr
      });
    }
  };
  addjovouch = async () => {
    let bill_date = document.querySelector("#jovouch_bill_date").value;
    let type = document.querySelector("#jovouch_type").value;
    let debit_acc = document.querySelector("#jovouch_debit_acc").value;
    let credit_acc = document.querySelector("#jovouch_credit_acc").value;
    let amount = document.querySelector("#jovouch_amount").value;
    let balance = document.querySelector("#jovouch_balance").value;

    let Vdata = {
      bill_date,
      type,
      debit_acc,
      credit_acc,
      amount,
      balance,
      billArr: this.state.BillArr,
      payArr: this.state.payArr
    };
    let t = await postData("api/jovouch", Vdata);
    if (t) {
      this.props.rm();
    } else {
      alert("Internal Error , Please Try Again Later");
    }
  };

  updateVouchData = () => {
    fetch("/api/vouch")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(() => {
          return {
            data: data
          };
        });
      });
  };

  constructor(props) {
    super(props);
    this.updateVouchData();
    this.state = {
      products: [],
      amt: 0,
      accounts: [],
      items: [],
      vouchData: [],
      data: [],
      editItem: 0,
      CBill: null,
      BillArr: [""],
      payArr: [
        {
          mode: "cheque",
          det: "",
          amt: ""
        }
      ]
    };
  }

  render() {
    return (
      <div className="add_jovouch_con">
        <div className="add_pro_head">
          <h1>Add Journal jovoucher</h1>

          <div className="add_jovouch_right_btns">
            <p>Save</p>
            <p>Reset</p>
            <img onClick={this.props.rm} src={cross} alt="" />
          </div>
        </div>

        <div className="jovouch_body">
          <form action="/api/jovouch" id="jovouch_det" method="post">
            <div className="jovouch_details">
              <div className="jovouch_si">
                <span> Date</span>
                <br />
                <input type="date" name="jovouch_bill_date" id="jovouch_bill_date" />
              </div>
              <div className="jovouch_si">
                <span>Type</span>
                <br />
                <select name="jovouch_type" id="jovouch_type">
                  <option value="option1">Journal</option>
                  <option value="option1">Journal</option>
                  <option value="option1">Journal</option>
                </select>
              </div>
            </div>

            <div className="jovouch_customer">
              <div className="jovouch_si ">
                <span>Add Bill </span>

                <div className="second_row">
                  {this.state.BillArr.map((e, i) => {
                    return (
                      <span className="jovouch_bill_list">
                        <input
                          type="text"
                          placeholder="Bill No."
                          onBlur={() => {
                            setTimeout(() => {
                              document.querySelector(".pro_list" + i).style.display = "none";
                              let arr = this.state.BillArr;
                              arr[i] = document.querySelector(".jo_bill_no" + i).value;
                              this.setState({
                                BillArr: arr
                              });
                            }, 500);
                          }}
                          onChange={() => {
                            this.bill_list_change(i);
                          }}
                          id="jovouch_bill_no"
                          className={"jo_bill_no" + i}
                          autoComplete="off"
                        />
                        <ul id="pro_list" className={"pro_list" + i} style={{ display: "none" }}>
                          {this.state.vouchData.map((pro, index) => {
                            console.log(pro);
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  document.querySelector(".jo_bill_no" + i).value = pro.det.bill_num;
                                  document.querySelector(".pro_list" + i).style.display = "none";
                                  if (i === 0) {
                                    this.setState({ CBill: pro.det });
                                    document.getElementById("jovouch_debit_acc").value = pro.det.customer;
                                    document.getElementById("jovouch_credit_acc").value = pro.det.supplier;
                                  } else {
                                  }
                                }}
                              >
                                {pro.det.bill_num}
                              </li>
                            );
                          })}
                        </ul>
                      </span>
                    );
                  })}
                  <span>
                    <span
                      onClick={() => {
                        let arr = this.state.BillArr;
                        arr.push("");

                        this.setState({ BillArr: arr });
                      }}
                      className="jovouch_plus"
                    >
                      +
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="vouch_body">
              <div className="jovouch_debit">
                <span>Debit Account</span>
                <br />
                <input name="jovouch_debit_acc" id="jovouch_debit_acc" />
              </div>

              <div className="jovouch_debit">
                <span>Credit Account</span>
                <br />
                <input name="jovouch_credit_acc" id="jovouch_credit_acc" />
              </div>
            </div>
          </form>
        </div>
        <div className="pay_head">Payment Details</div>
        <div className="jovouch_payment_det ">
          {this.state.payArr.map((e, index) => {
            return (
              <div className="jovouch_customer ">
                <div className="jovouch_si ">
                  <div className="mode_head">
                    <span>Mode </span>
                    <span>+</span>
                  </div>

                  <span>
                    <select name="jovouch_mode" id={"jovouch_mode" + index}>
                      <option value="cheque">Cheque</option>
                      <option value="cash">Cash</option>
                    </select>
                  </span>
                </div>

                <div className="jovouch_si  ">
                  <span>Cheque No. </span>
                  <br />

                  <div className="second_row">
                    <input type="text" placeholder="Cheque No." className="paydet" id={"payDet" + index} />
                  </div>
                </div>
                <div className="jovouch_si  ">
                  <span>Amount </span>
                  <br />

                  <div className="second_row">
                    <input
                      onBlur={() => {
                        let nn = {
                          mode: document.getElementById(`jovouch_mode${index}`).value,
                          det: document.getElementById(`payDet${index}`).value,
                          amt: document.getElementById(`payAmt${index}`).value
                        };
                        let arr = this.state.payArr;
                        arr[index].dd = nn.mode;
                        arr[index].det = nn.det;
                        {
                          nn.amt ? (arr[index].amt = nn.amt) : (arr[index].amt = 0);
                        }
                        let am = 0;
                        for (let e of arr) {
                          console.log(e);
                          am = parseFloat(am) + parseFloat(e.amt);
                        }
                        this.setState({
                          payArr: arr,
                          amt: am
                        });
                      }}
                      type="text"
                      placeholder="Amount"
                      id={"payAmt" + index}
                      className="amount"
                    />
                    {index === this.state.payArr.length - 1 && (
                      <span
                        className="jovouch_plus"
                        onClick={() => {
                          let arr = this.state.payArr;
                          arr.push({ mode: "cheque", det: "", amt: 0 });
                          this.setState({
                            payArr: arr
                          });
                        }}
                      >
                        +
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <br />
          <br />
          <div className="jovouch_amount">
            <span>Amount:</span>
            <span>
              <input type="text" id="jovouch_amount" value={this.state.amt} placeholder="Amount" />
            </span>
            <span className="jovouch_balance">Balance:</span>
            <span>
              <input id="jovouch_balance" type="text" placeholder="Balance" />
            </span>
          </div>
        </div>
        <div className="jovouch_add_btn_div">
          <button onClick={this.addjovouch} className="jovouch_add_btn">
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddJovouch;
