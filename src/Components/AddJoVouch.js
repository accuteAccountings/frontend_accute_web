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
  addjovouch() {
    let bill_date = document.querySelector("#jovouch_bill_date").value;
    let type = document.querySelector("#jovouch_type").value;
    let bill_num = document.querySelector("#jovouch_bill_no").value;
    let g_r_num = document.querySelector("#jovouch_gr_no").value;
    let transport_name = document.querySelector("#jovouch_transport_name").value;
    let supplier = document.querySelector("#jovouch_sup").value;
    let supplier_agent = document.querySelector("#jovouch_sup_agent").value;
    let set_commission = document.querySelector("#jovouch_comission").value;
    let customer = document.querySelector("#jovouch_customer").value;

    let Vdata = {
      bill_date,
      type,
      bill_num,
      g_r_num,
      transport_name,
      supplier,
      supplier_agent,
      set_commission,
      customer,
      items: this.state.items
    };
    postData("api/jovouch", Vdata);
  }

  jovouchAddPro() {
    let pro_id = document.querySelector("#jovouch_pro_item").value;

    if (!pro_id) return;
    let jovouch_quantity = document.querySelector("#jovouch_quantity").value;
    let jovouch_gst = document.querySelector("#jovouch_gst").value;
    let jovouch_rate = document.querySelector("#jovouch_rate").value;

    let pro_name = this.state.products.find(o => {
      // eslint-disable-next-line
      return o.id == pro_id;
    });
    let item = {
      pro_id,
      product_name: pro_name.product_name,
      quantity: jovouch_quantity,
      gst: jovouch_gst,
      rate: jovouch_rate
    };

    let arr = this.state.items;
    arr.push(item);

    this.setState(prevState => {
      return {
        items: arr
      };
    });
  }

  removeItem = index => {
    let arr = this.state.items;

    arr.splice(index, 1);

    this.setState(() => {
      return {
        items: arr
      };
    });
  };

  editItem = index => {
    let pro_id = document.querySelector("#jovouch_pro_item");

    let jovouch_quantity = document.querySelector("#jovouch_quantity");
    let jovouch_gst = document.querySelector("#jovouch_gst");
    let jovouch_rate = document.querySelector("#jovouch_rate");

    pro_id.value = this.state.items[index].pro_id;
    jovouch_quantity.value = this.state.items[index].quantity;
    jovouch_gst.value = this.state.items[index].gst;
    jovouch_rate.value = this.state.items[index].rate;

    this.setState(() => {
      return {
        editItem: index
      };
    });
  };

  editPro = () => {
    let pro_id = document.querySelector("#jovouch_pro_item").value;

    if (!pro_id) return;
    let jovouch_quantity = document.querySelector("#jovouch_quantity").value;
    let jovouch_gst = document.querySelector("#jovouch_gst").value;
    let jovouch_rate = document.querySelector("#jovouch_rate").value;
    let pro_name = this.state.products.find(o => {
      // eslint-disable-next-line
      return o.id == pro_id;
    });

    let arr = this.state.items;

    arr[this.state.editItem].pro_id = pro_id;
    arr[this.state.editItem].product_name = pro_name;
    arr[this.state.editItem].quantity = jovouch_quantity;
    arr[this.state.editItem].gst = jovouch_gst;
    arr[this.state.editItem].rate = jovouch_rate;

    this.setState(() => {
      return {
        items: arr,
        editItem: false
      };
    });
  };

  getProducts() {
    fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Products) {
          this.setState(() => {
            return {
              products: data.Products
            };
          });
        }
      })
      .catch(err => {
        // alert(err)
      });
  }
  getAccounts() {
    fetch("/api/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.accounts) {
          this.setState(() => {
            return {
              accounts: data.accounts
            };
          });
        }
      })
      .catch(err => {
        // alert(err)
      });
  }

  constructor(props) {
    super(props);
    this.jovouchAddPro = this.jovouchAddPro.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getAccounts = this.getAccounts.bind(this);

    this.state = {
      products: [],
      accounts: [],
      items: [],
      editItem: 0
    };
    this.getProducts();
    this.getAccounts();
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
                  <span>
                    <input type="text" placeholder="Bill No." id="jovouch_bill_no" />
                  </span>
                  <span>
                    {" "}
                    <span className="jovouch_plus">+</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="vouch_body">
              <div className="jovouch_debit">
                <span>Debit Account</span>
                <br />
                <select name="jovouch_debit_acc" id="jovouch_debit_acc">
                  <option value="option1">Costumer</option>
                  <option value="option1">Costumer</option>
                  <option value="option1">Costumer</option>
                </select>
              </div>

              <div className="jovouch_debit">
                <span>Credit Account</span>
                <br />
                <select name="jovouch_debit_acc" id="jovouch_debit_acc">
                  <option value="option1">Supplier</option>
                  <option value="option1">Supplier</option>
                  <option value="option1">Supplier</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="pay_head">Payment Details</div>
        <div className="jovouch_payment_det ">
          <div className="jovouch_customer ">
            <div className="jovouch_si ">
              <div className="mode_head">
                <span>Mode </span>
                <span>+</span>
              </div>

              <span>
                <select name="jovouch_mode" id="jovouch_mode">
                  <option value="option1">Cheque</option>
                </select>
              </span>
            </div>

            <div className="jovouch_si  ">
              <span>Cheque No. </span>
              <br />

              <div className="second_row">
                <input type="text" placeholder="Cheque No." />
                <span className="jovouch_plus">+</span>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="jovouch_amount">
            <span>Amount:</span>
            <span>
              <input type="text" placeholder="Amount" />
            </span>
            <span className="jovouch_balance">Balance:</span>
            <span>
              <input type="text" placeholder="Balance" />
            </span>
          </div>
        </div>
        <div className="jovouch_add_btn_div">
          <button className="jovouch_add_btn">Add</button>
        </div>
      </div>
    );
  }
}

export default AddJovouch;
