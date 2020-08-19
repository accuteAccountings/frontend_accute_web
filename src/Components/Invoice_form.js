import React from "react";
import pencil from "../img/pencil.svg";
import trash_can from "../img/trash.svg";
import cross from "./../img/cancel.svg";

class Invoice extends React.Component {

  async addInv() {
  
    let supplier = document.querySelector("#inv_supplier").value;
    let commission = document.querySelector("#inv_comm").value;
    let gst = document.querySelector('#inv_gst').value;
    let service_details = document.querySelector('#inv_sdetails').value;
    let sales_amount = document.querySelector('#inv_sales_amount').value

    let data = {
      supplier,
      gst,
      commission,
      service_details,
      sales_amount
    }

    const isTrue = await postData('/api/invoice' , data);
    if (isTrue) {
     alert('submitted')
    } 
  }

  getVouch = (acc) => {
    fetch(`/api/vouch/specific/${acc}`)
    .then((res) => res.json())
    .then((data) => {
        if(data){
            this.setState(() => {
                return{
                   vouch : data
                }
            })
        }
    })
   }

   Total = async(acc) => {
    let t = 0

        await this.getVouch(acc)

        await this.state.vouch.map(e => {
            if(e.supplier === acc && e.type == 'purchase' && e.status == 0 ){ 
                t = parseInt(t) + (parseInt(e.totalAmt))
            }
            else if(e.supplier === acc && e.type !== 'purchase' && e.status == 0){
                t = parseInt(t) - e.totalAmt
            }
        
        })

    await this.setState(() => {
        return{
            amount : t
        }
    })
    
}

  filterAcc = (id, id2) => {
    document.getElementById(id).style.display = "block";
    let temp = document.getElementById(id2).value.toLowerCase();

    let arr = this.state.accounts.filter(e => {
      if (temp.length === 0) {
        return true;
      }
      if (e.acc_name.toLowerCase().indexOf(temp) !== -1) {
        return true;
      } else return false;
    });

    this.setState({ acc: arr });
  };

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
        // aldert(err)
      });
  }
  crossPro = () => {
    this.setState({ addPro: false });
  };

  selectAllText = () => {
    document.getElementById("vouch_pro_item").select();
  };

  addCommission = () => {
      let arr = this.state.items
    let supplier = document.querySelector("#inv_supplier").value;
    let commission = document.querySelector("#inv_comm").value;
    let gst = document.querySelector('#inv_gst').value;
    let service_details = document.querySelector('#inv_sdetails').value;
    let sales_amount = document.querySelector('#inv_sales_amount').value;


    let data = {
        supplier,
        gst,
        commission,
        service_details,
        sales_amount
      }

     arr.push(data)
     this.setState(() => {
         return{
             items : arr
         }
     })


  }

  constructor(props) {
    super(props);
    this.getAccounts = this.getAccounts.bind(this);
    this.state = {
        date : null,
        accounts: [],
        editItem: -1,
        acc: [],
        items : [],
        discontArr : [],
        freightArr : [],
        vouch : [],
        amount : 0
    };
    this.getAccounts();
  }

  componentDidMount = async() =>{
      let today = new Date()
      let tdate = today.getDate()
      let year =  today.getFullYear()
      let month = parseInt(today.getMonth()) + 1
      if(parseInt(month) < 10){
          month = '0'+ month
      }

      let date = tdate + '/' + month + '/' + year

     this.setState(() => {
         return{
            date : date
         }
     })

     let supp = await document.querySelector("#inv_supplier").value

     if(supp){
         await this.getVouch(supp)
         await this.Total(supp)
     }
  }


  render() {
    return (
      <div className="add_vouch_con">
        <div className="add_pro_head">
          <div className="add_vouch_right_btns">
            <p
              onClick={() => {
                this.addInv();
              }}
            >
              Save
            </p>
            <img onClick={this.props.rm} src={cross} alt="" />
          </div>
        </div>

        <div className="vouch_body">
          <div className="vouch_body_left">
            <div className="vouch_body_left_top">
              <form action="/api/vouch" id="vouch_det" method="post">
                <div className="vouch_details">
                  <div className="vouch_si">
                    <span>Bill Date</span>
                    <br />
                    <input type = "text" id = "inv_bill_date" value = {this.state.date} />
                  </div>
                  <div className="vouch_si">
                    <span>Type</span>
                    <br />
                    <select name="vouch_type" disabled id="vouch_type">
                      <option value="purchase" selected={this.props.which === "pv" ? true : false}>
                        Purchase
                      </option>
                      <option value="credit" selected={this.props.which === "cn" ? true : false}>
                        Credit
                      </option>
                      <option value="debit" selected={this.props.which === "dn" ? true : false}>
                        Debit
                      </option>
                    </select>
                  </div>

                  <div className="vouch_si">
                    <span>Bill No.</span>
                    <br />
                    <input
                      type="number"
                      name="vouch_bill_no"
                      id="inv_bill_no"
                      value = "1"
                    />
                  </div>


                  <div id="gst_con" className="vouch_si">
                    <span>GST</span>
                    <br />
                    <input
                      type="number"
                      name="vouch_gst"
                      id="inv_gst"
                    />
                  </div>
                  <div className="vouch_si vouch_customer_con">
                    <span>Bill To</span>
                    <br />

                    <input
                      onChange={async() => {
                        this.filterAcc("customer_list", "inv_supplier");
                   
                      }}
                      onFocus={() => {
                        this.filterAcc("customer_list", "inv_supplier");
                      }}
                      autoComplete="off"
                      onBlur={() => {
                        setTimeout(() => {
                          document.getElementById("customer_list").style.display = "none";
                        }, 500);
                      }}
                      name="customer"
                      id="inv_supplier"
                    />
                    <ul id="customer_list">
                      {this.state.acc.map((acc, index) => {
                        if (
                          (acc.acc_type !== "debtors" && acc.acc_name !== "creditors")  ) {
                          return;
                        }
                        return (
                          <li
                            key={index}
                            onClick={async() => {
        
                              document.getElementById("customer_list").style.display = "none";
                              document.getElementById("inv_supplier").value = acc.acc_name;
                                await this.Total(acc.acc_name)
                            }}
                          >
                            {acc.acc_name}
                          </li>
                        );
                      })}
                    </ul>
                    <p className="error_p" id="vouch_customer_error">
                      {" "}
                      Please Enter Customer Name
                    </p>
                  </div>

                  <div className="vouch_si">
                    <span>Amount </span>
                    <br />
                    <input
                      type="number"
                      id = "amount_inv"
                      value = {this.state.amount}
                    />
                  </div>
                </div>

              </form>
            </div>

            <div className="vouch_body_middle">
              <div className="vouch_si" id="vouch_pro_con">
                <span>Service Detail</span>
                <br />
                <input
                  name="vouch_pro_item"
                  id="inv_sdetails"
                />               
              </div>

              <div className="vouch_si">
                <span>Sales Amount</span>
                <br />
                <input    
                  type="number"
                  name="vouch_quantity"
                  id="inv_sales_amount"
                  defaultValue=""
                />
              </div>
              <div className="vouch_si" id="gst_con">
                <span>Commission</span>
                <br />
                <span id="percentage">%</span>
                <input
                  type="number"
                  name="vouch_dicon"
                  id="inv_comm"
                />
              </div>
          
              <div className="vouch_si">
                <button id="vouch_add_btn" onClick={() => {
                    this.addCommission()
                
                }}>
                  Add
                </button>
              </div>
            </div>

            <div className="vouch_table_con">
              <table id="vouch_table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Service Detail</th>
                    <th>Sales Amount</th>
                    <th>Commission</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((e, index) => {

                    return (
                      <tr key={index}>
                        <td className="tbtn">{index + 1}</td>
                        <td>{e.service_details}</td>
                        <td>{e.sales_amount}</td>
                        <td>{e.commission}</td>
                        <td>{parseInt(e.sales_amount)*parseInt(e.commission)*0.01}</td>        
                        <td
                          className="tbtn"
                          onClick={() => {
                            this.editItem(index);
                          }}
                        >
                          <img className="vouch_edit_pencil" src={pencil} />
                        </td>
                        <td
                          className="tbtn"
                          onClick={() => {
                            this.removeItem(index);
                          }}
                        >
                          <img className="vouch_trash_can" src={trash_can} />
                        </td>
                      </tr>
                    );
                  })}
                  {this.state.items.length === 0 && (
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  )}
                  {this.state.items.length < 2 && (
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  )}
                  {this.state.items.length < 3 && (
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  )}
                  {this.state.items.length < 4 && (
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  )}
                  {this.state.items.length < 5 && (
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  )}
                  {this.state.items.length < 6 && (
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="vouch_body_right">
            <table className="vouch_num_items">
              <tr>
                <td> Sales Amount :</td>
                <td className="bold">
                  <strong>₹{this.state.grossAmt}</strong>
                </td>
              </tr>
              <tr>
                <td> Commission (2 %) :</td>
                <td className="bold">
                  <strong>₹{this.state.gstAmt}</strong>
                </td>
              </tr>
              <tr>
                <td> Net Amount :</td>
                <td className="bold">
                  <strong> ₹{this.state.totalAmt}</strong>
                </td>
              </tr>
            </table>
            <div className="add_discount_con">
              <div className="add_dis_btn_con">
                <div className="vouch_si_add_dis">
                  <span>Type</span>
                  <br />
                  <select id="add_dis_discount_type">
                    {" "}
                    <option>Rate Discount </option>
                    <option>Cash Discount </option>
                    <option> No G.R. Less </option>
                  </select>
                </div>
                <input id="add_discount_input" placeholder={"Discount"} />
                <button
                  onClick={e => {
                    let a = {
                      type: document.getElementById("add_dis_discount_type").value,
                      value: document.getElementById("add_discount_input").value
                    };
                    let arr = this.state.discontArr;
                    arr.push(a);
                    this.setState({ discontArr: arr });
                    document.getElementById("add_discount_input").value = "";

                    this.updateTotal();
                  }}
                  id="add_freight_addBtn"
                >
                  Add
                </button>
              </div>
              <table className="vouch_num_items">
                {this.state.discontArr.map(ele => {
                  return (
                    <tr>
                      <td> {ele.type}</td>
                      <td className="bold">
                        <strong>
                          {"- "}
                          {ele.type === "Rate Discount" && "₹"}
                          {ele.value}
                          {ele.type !== "Rate Discount" && "%"}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
              </table>
              <div className="add_fre_btn_con">
                <div className="vouch_si_add_fre">
                  <input id="add_freight_input" placeholder="Freight" />
                  <input id="add_freight_remark_input" placeholder="Remarks" />
                  <button
                    onClick={() => {
                      let a = {
                        remark: document.getElementById("add_freight_remark_input").value,
                        value: document.getElementById("add_freight_input").value
                      };
                      let arr = this.state.freightArr;
                      arr.push(a);
                      this.setState({ freightArr: arr });
                      this.updateTotal();
                      document.getElementById("add_freight_remark_input").value = "";
                      document.getElementById("add_freight_input").value = "";
                    }}
                    id="add_freight_addBtn"
                  >
                    Add
                  </button>
                </div>
              </div>
              <table className="vouch_num_items">
                {this.state.freightArr.map(ele => {
                  return (
                    <tr>
                      <td> {ele.remark}</td>
                      <td className="bold">
                        <strong>
                          {"₹"}
                          {ele.value}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td> Total Amount :</td>
                  <td className="bold">
                    <strong>₹{this.state.mainAmnt}</strong>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


async function postData(url = "", data, m) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        // 'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

export default Invoice;
