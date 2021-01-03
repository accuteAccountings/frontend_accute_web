import React from "react";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import pencil from "assets/icons/pencil.svg";
import trash_can from "assets/icons/trash.svg";
import ref from "assets/icons/refresh.svg";
import cross from "assets/icons/cancel.svg";

const styles = theme => ({
    select: {
        height:"30px",  
        '&:before': {
          borderRadius:"none",
          borderColor: '#000000',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderRadius:"none",
          borderColor: '#000000',
      }
    }
  });

class AddVouch1 extends React.Component {
  constructor(props){
    super(props);
    
    this.state= {
        products: [],
        accounts: [],
        subAgent: false,
        items: [],
        bill_date:"",
        vouch_type:"",
        bill_num:"",
        g_r_num:"",
        transport_name:"",
        supplier:"",
        supplier_agent:"",
        supplier_agent2:"",
        gst:5,
        set_commission:"",
        customer:"",
        name: null,
        editItem: -1,
        totalAmt:0,
        grossAmt: 0,
        disAmt: 0,
        pro: [],
        acc: [],
        discountArr:[],
        dicountType: "Less",
        freightArr:[],



    }
}
render() {

 
    return (
      <div className="add_vouch_con">
        <div className="add_pro_head">
          <h1>
            {this.props.which === "pv" && "Add Sales Vouch"}
            {this.props.which === "dn" && "Add Debit Note"}
            {this.props.which === "cn" && "Add Credit Note"}
          </h1>

          <div className="add_vouch_right_btns">
            <img src = {ref} alt = " " onClick = {this.clearData}/>
            <p
              onClick={() => {
                this.addVouch();
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
                    {/* <input type="date" name="bill_date" id="vouch_bill_date" /> */}
                    <TextField type="date" size="small" name="bill_date" id="vouch_bill_date"  variant="outlined" />
                  </div>
                  <div className="vouch_si">
                    <span>Type</span>
                    <br />
                    {/* <select name="vouch_type" disabled id="vouch_type">
                      <option value="purchase" selected={this.props.which === "pv" ? true : false}>
                        Sales
                      </option>
                      <option value="credit" selected={this.props.which === "cn" ? true : false}>
                        Credit
                      </option>
                      <option value="debit" selected={this.props.which === "dn" ? true : false}>
                        Debit
                      </option>
                    </select> */}
                   <FormControl >
                     <Select
                      className={`${this.props.classes.select} add_vouch_mui`}
                      name="vouch_type"
                      variant="outlined"
                      id="vouch_type"
                      value={this.state.which}
                      onChange={e => {
                        this.setState({ which: e.target.value },()=>{console.log(this.state.which)});
                      }}
                      autoWidth
                    >
                      <MenuItem value="pv">Purchase</MenuItem>
                      <MenuItem value="cn">Credit</MenuItem>
                      <MenuItem value="dn">Debit</MenuItem>
                    </Select>

                  </FormControl>
                  </div>

                  <div className="vouch_si">
                    <span>Bill No.</span>
                    <br />
                    <input
                      onBlur={() => {
                        if (document.getElementById("vouch_bill_no").value !== "") {
                          this.rmEnterError("vouch_bill_no");
                        }
                      }}
                      type="text"
                      name="bill_num"
                      id="vouch_bill_no"
                    />
                    <p className="error_p" id="vouch_bill_no_error">
                      {" "}
                      Please Enter Bill Number
                    </p>
                  </div>

                  <div className="vouch_si">
                    <span>L. R. No.</span>
                    <br />
                    <input type="text" name="g_r_num" id="vouch_gr_no" />
                  </div>
                  <div className = "vouch_si" >
                    <span>L. R. Date</span>
                      <br />
                    <input type = "date" id = "vouch_lr_date" />
                  </div>
                  <div className="vouch_si vouch_transport_name_con">
                    <span>Transport Name</span>
                    <br />

                    <input
                      onChange={() => {
                        this.filterAcc("transport_list", "vouch_transport_name");
                      }}
                      onFocus={() => {
                        this.filterAcc("transport_list", "vouch_transport_name");
                      }}
                      autoComplete="off"
                      onBlur={() => {
                        setTimeout(() => {
                          document.getElementById("transport_list").style.display = "none";
                                                }, 500);
                      }}
                      name="transport_name"
                      id="vouch_transport_name"
                    />
                    <ul id="transport_list">
                      {this.state.acc.map((acc, index) => {
                        if (acc.acc_type !== "transport") {
                          return;
                        }
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              document.getElementById("pro_list").style.display = "none";
                              document.getElementById("vouch_transport_name").value = acc.acc_real_name;
                            }}
                          >
                            {acc.acc_real_name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="vouch_si vouch_sup_con">
                    <span>Supplier/Seller</span>
                    <br />

                    <input
                      onChange={e => {
                        this.filterAcc("sup_list", "vouch_sup");
                      }}
                      onFocus={e => {
                        this.filterAcc("sup_list", "vouch_sup");
                      }}
                      autoComplete="off"
                      onBlur={() => {
                        if (document.getElementById("vouch_sup").value !== "") {
                          this.rmEnterError("vouch_sup");
                        }
                        setTimeout(() => {
                          document.getElementById("sup_list").style.display = "none";
                                                  }, 500);
                      }}
                      name="supplier"
                      id="vouch_sup"
                    />
                    <ul id="sup_list">
                      {this.state.acc.map((acc, index) => {
                        if (
                          (acc.acc_type !== "debtors" && acc.acc_type !== "creditors") ||
                          document.getElementById("vouch_customer").value === acc.acc_real_name
                        ) {
                          return;
                        }
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              document.getElementById("sup_list").style.display = "none";
                              document.getElementById("vouch_sup").value = acc.acc_real_name;
                            }}
                          >
                            {acc.acc_real_name}
                          </li>
                        );
                      })}
                    </ul>

                    <p className="error_p" id="vouch_sup_error">
                      {" "}
                      Please Enter Supplier/Seller Name
                    </p>
                  </div>

                  <div className="vouch_si">
                    <span>Supplier Agent</span>
                    <br />

                    {/* <select name="vouch_sup_agent" id="vouch_sup_agent">
                      <option defaultChecked value={this.state.name}>
                        {this.state.name}
                      </option>
                      <option value={null}>None</option>
                    </select> */}
                    <FormControl >
                     <Select
                      className={`${this.props.classes.select} add_vouch_mui`}
                      name="vouch_sup_agent"
                      variant="outlined"
                      id="vouch_sup_agent"
                      defaultValue={this.state.name}
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                      autoWidth
                      
                    >
                      <MenuItem value={"null"}>None</MenuItem>
                    </Select>
                    </FormControl>
                  </div>

                  <div className="vouch_si">
                    <span>Set Commission</span>
                    <br />
                    <input
                      type="number"
                      name="vouch_comission"
                      id="vouch_comission"
                      defaultValue={this.props.mode === "edit" ? this.props.EData.det.set_commission : "1"}
                    />
                  </div>
                  <div id="gst_con" className="vouch_si">
                    <span>GST</span>
                    <br />
                    <span id="percentage_gst">%</span>
                    <input
                      defaultValue={this.props.mode === "edit" ? this.props.EData.det.gst : 5}
                      type="number"
                      name="vouch_gst"
                      id="vouch_gst"
                      onBlur={() => {
                        if (document.getElementById("vouch_gst").value === "") {
                          document.getElementById("vouch_gst").value = 0;
                        }
                        this.setState({ gst: document.getElementById("vouch_gst").value });
                        this.updateTotal();
                      }}
                    />
                  </div>
                </div>

                <div className="vouch_customer">
                  <div className="vouch_si vouch_customer_con">
                    <span>Customer/Buyer</span>
                    <br />

                    <input
                      onChange={() => {
                        this.filterAcc("customer_list", "vouch_customer");
                      }}
                      onFocus={() => {
                        this.filterAcc("customer_list", "vouch_customer");
                      }}
                      autoComplete="off"
                      onBlur={() => {
                        if (document.getElementById("vouch_customer").value !== "") {
                          this.rmEnterError("vouch_customer");
                        }
                        setTimeout(() => {
                          document.getElementById("customer_list").style.display = "none";
                                               }, 500);
                      }}
                      name="customer"
                      id="vouch_customer"
                    />
                    <ul id="customer_list">
                      {this.state.acc.map((acc, index) => {
                        if (
                          (acc.acc_type !== "debtors" && acc.acc_type !== "creditors") ||
                          acc.acc_real_name === document.getElementById("vouch_sup").value
                        ) {
                          return;
                        }
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              document.getElementById("customer_list").style.display = "none";
                              document.getElementById("vouch_customer").value = acc.acc_real_name;
                            }}
                          >
                            {acc.acc_real_name}
                          </li>
                        );
                      })}
                    </ul>
                    <p className="error_p" id="vouch_customer_error">
                      {" "}
                      Please Enter Customer Name
                    </p>
                  </div>
                  {this.state.subAgent ? (
                    <div className="vouch_si vouch_sub_agnent_con">
                      <span>Sub Agent</span>
                      <br />
                      <input
                        onChange={() => {
                          this.filterAcc("subAgnet_list", "vouch_sup_agent2");
                        }}
                        onFocus={() => {
                          this.filterAcc("subAgnet_list", "vouch_sup_agent2");
                        }}
                        autoComplete="off"
                        onBlur={() => {
                          if (document.getElementById("vouch_sup_agent2").value !== "") {
                          }
                          setTimeout(() => {
                            document.getElementById("subAgnet_list").style.display = "none";

                            if (!document.getElementById("vouch_sup_agent2").value) {
                              return;
                            } else {
                              let data = {
                                acc_real_name: document.getElementById("vouch_sup_agent2").value,
                                acc_type: "Sub Agent"
                              };

                              let exist = false;
                              this.state.accounts.map(e => {
                                if (e.acc_real_name === data.acc_name && e.acc_type === data.acc_type) {
                                  exist = true;
                                }
                              });
                              if (exist) {
                                return;
                              }

                              fetch("/api/accounts", {
                                method: "POST", // *GET, POST, PUT, DELETE, etc.
                                headers: {
                                  "Content-Type": "application/json"
                                  // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify(data) // body data type must match "Content-Type" header
                              })
                                .then(res => res.json())
                                .catch(() => {
                                  document.getElementById("vouch_sup_agent2").value = "";
                                });
                            }
                          }, 500);
                        }}
                        name="customer"
                        id="vouch_sup_agent2"
                      />
                      <ul id="subAgnet_list">
                        {this.state.acc.map((acc, index) => {
                          if (acc.acc_type !== "Sub Agent") {
                            return;
                          }
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                document.getElementById("subAgnet_list").style.display = "none";
                                document.getElementById("vouch_sup_agent2").value = acc.acc_real_name;
                              }}
                            >
                              {acc.acc_real_name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <span
                      style={{
                        marginLeft: "20px",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        this.setState({ subAgent: true });
                      }}
                      id="add_sub_agent"
                    >
                      {" "}
                      + Add Sub Agent
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="vouch_body_middle">
              <div className="vouch_si" id="vouch_pro_con">
                <span>Product / Item</span>
                <br />
                <input
                  name="vouch_pro_item"
                  id="vouch_pro_item"
                  onChange={this.filterPro}
                  onFocus={() => {
                    this.filterPro();
                    this.selectAllText();
                  }}
                  autoComplete="off"
                  onBlur={() => {
                    setTimeout(() => {
                      document.getElementById("pro_list").style.display = "none";
                    }, 500);
                  }}
                />
                <ul id="pro_list">
                  {this.state.pro.map((pro, index) => {
                    console.log(pro);
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          document.getElementById("vouch_pro_item").value = pro.product_name;
                          document.getElementById("vouch_hsn_num").value = pro.hsn_num;
                          document.getElementById("pro_list").style.display = "none";
                        }}
                      >
                        {pro.product_name}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="vouch_si">
                <span>HSN No.</span>
                <br />
                <input type="text" name="vouch_hsn_num" id="vouch_hsn_num" />
              </div>
              <div className="vouch_si">
                <span>Quantity</span>
                <br />
                <input
                  onFocus={e => e.target.select()}
                  onChange={e => {
                    if (e.target.value >= 0 && document.getElementById("vouch_rate").value) {
                      document.getElementById("vouch_amount").value =
                        parseFloat(e.target.value) * parseFloat(document.getElementById("vouch_rate").value);
                    }
                  }}
                  type="number"
                  name="vouch_quantity"
                  id="vouch_quantity"
                  defaultValue=""
                />
              </div>
              <div className="vouch_si">
                <span>Rate</span>
                <br />
                <input
                  onFocus={e => e.target.select()}
                  onChange={e => {
                    if (e.target.value >= 0 && document.getElementById("vouch_quantity").value) {
                      document.getElementById("vouch_amount").value =
                        parseFloat(e.target.value) * parseFloat(document.getElementById("vouch_quantity").value);
                    }
                  }}
                  type="number"
                  name="vouch_rate"
                  id="vouch_rate"
                  defaultValue=""
                />
              </div>
              <div className="vouch_si" id="gst_con">
                <span>Discount</span>
                <br />
                <span id="percentage_dis">%</span>
                <input
                  onBlur={() => {
                    if (document.getElementById("vouch_dicon").value === "") {
                      document.getElementById("vouch_dicon").value = 0;
                    }
                  }}
                  type="number"
                  name="vouch_dicon"
                  onFocus={e => e.target.select()}
                  id="vouch_dicon"
                  defaultValue={0}
                />
              </div>
              <div className="vouch_si">
                <span>Amount</span>
                <br />
                <input
                  onFocus={e => e.target.select()}
                  type="number"
                  name="vouch_amount"
                  id="vouch_amount"
                  defaultValue=""
                />
              </div>
              <div className="vouch_si">
                <button id="vouch_add_btn" onClick={this.state.editItem === -1 ? this.vochAddPro : this.editPro}>
                  {this.state.editItem === -1 ? "Add" : "Edit"}
                </button>
              </div>
            </div>

            <div className="vouch_table_con">
              <table id="vouch_table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Product/Item</th>
                    <th>HSN No.</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Discount</th>

                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((i, index) => {
                    if (index === this.state.editItem) {
                      return;
                    }
                    return (
                      <tr key={index}>
                        <td className="tbtn">{index + 1}</td>
                        <td>{i.product_name}</td>
                        <td>{i.hsn_num}</td>
                        <td>{i.quantity}</td>
                        <td>{i.rate}</td>
                        <td>{i.dicon}%</td>

                        <td>{i.amount}</td>
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
                <td> Gross Amount :</td>
                <td className="bold">
                  <strong>₹{this.state.grossAmt}</strong>
                </td>
              </tr>
              <tr>
                <td> Discount :</td>
                <td className="bold">
                  <strong>
                    {"-"}₹{this.state.disAmt}
                  </strong>
                </td>
              </tr>
              <tr>
                <td> GST ({this.state.gst}%) :</td>
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
              {this.state.discontArr.map((ele, i) => {
                return (
                  <tr>
                    <td className="relative">
                      <span
                        value={i}
                        onClick={e => {
                          let a = this.state.discontArr;
                          console.log(i);

                          a.splice(i, 1);

                          this.setState({ discontArr: a });
                          this.updateTotal();
                        }}
                        className="crossBtn"
                      >
                        +
                      </span>
                      {ele.type} {ele.type !== "Less" && ` (${ele.value}%)`}
                    </td>
                    <td className="bold">
                      <strong>
                        {"-"}
                        {"₹"}
                        {ele.type !== "Less" && ele.amt}
                        {ele.type === "Less" && ele.value}
                      </strong>
                    </td>
                  </tr>
                );
              })}

              {this.state.freightArr.map((ele, i) => {
                return (
                  <tr>
                    <td className="relative">
                      <span
                        value={i}
                        onClick={e => {
                          let a = this.state.freightArr;
                          console.log(i);

                          a.splice(i, 1);

                          this.setState({ freightArr: a });
                          this.updateTotal();
                        }}
                        className="crossBtn"
                      >
                        +
                      </span>

                      {ele.remark}
                    </td>
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
            <div className="add_discount_con">
              <h3>Add Discount</h3>
              <div className="add_dis_btn_con">
                <div className="vouch_si_add_dis">
                  <span>Type</span>
                  <br />
                  {/* <select
                    id="add_dis_discount_type"
                    disabled={this.state.totalAmt === 0 ? true : false}
                    onChange={e => {
                      this.setState({ dicountType: e.target.value });
                    }}
                  >
                    {" "}
                    <option>Less </option>
                    <option>Cash Discount </option>
                    <option> No G.R. Less </option>
                  </select> */}
                 <FormControl >
    
                    <Select
                    className="add_vouch_mui"
                      variant="outlined"
                      id="add_dis_discount_type"
                      disabled={this.state.totalAmt === 0 ? true : false}
                      value={this.state.discountType}
                      onChange={e => {
                        this.setState({ dicountType: e.target.value });
                      }}
                      autoWidth
                      style={{height:"35px",width:"70px"}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"less"}>Less</MenuItem>
                      <MenuItem value={"cash_discount"}>Cash Discount</MenuItem>
                      <MenuItem value={"no_gr_less"}>No G.R. Less</MenuItem>
                    </Select>

                  </FormControl>
                </div>
                <div className="vouch_si_add_dis">
                  <span>{this.state.dicountType === "Less" ? "Amount" : "Percentage"}</span>
                  <br />
                  <input
                    id="add_discount_input"
                    placeholder={this.state.dicountType === "Less" ? "Amount" : "Percentage"}
                    disabled={this.state.totalAmt === 0 ? true : false}
                  />
                </div>
                <button
                  onClick={e => {
                    let a = {
                      type: document.getElementById("add_dis_discount_type").value,
                      value: document.getElementById("add_discount_input").value
                    };
                    if (a.value === "") {
                      return;
                    }
                    let arr = this.state.discontArr;
                    arr.push(a);
                    this.setState({ discontArr: arr });
                    document.getElementById("add_discount_input").value = "";

                    this.updateTotal();
                  }}
                  id="add_freight_addBtn"
                  disabled={this.state.totalAmt === 0 ? true : false}
                >
                  Add
                </button>
              </div>
              <div className="add_freight_con">
                <h3>Add Freight</h3>
                <div className="add_fre_btn_con">
                  <div className="vouch_si_add_fre">
                    <span>Remark</span>
                    <br />
                    <input
                      id="add_freight_remark_input"
                      placeholder="Freight"
                      disabled={this.state.totalAmt === 0 ? true : false}
                    />
                  </div>
                  <div className="vouch_si_add_fre">
                    <span>Amount</span>
                    <br />
                    <input
                      id="add_freight_input"
                      placeholder={"Amount"}
                      disabled={this.state.totalAmt === 0 ? true : false}
                    />
                  </div>

                  <button
                    disabled={this.state.totalAmt === 0 ? true : false}
                    onClick={() => {
                      let a = {
                        remark: document.getElementById("add_freight_remark_input").value,
                        value: document.getElementById("add_freight_input").value
                      };
                      if (a.value === "") {
                        return;
                      }
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddVouch1);