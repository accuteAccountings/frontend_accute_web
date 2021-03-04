import React from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import pencil from "assets/icons/pencil.svg";
import trash_can from "assets/icons/trash.svg";
import ref from "assets/icons/refresh.svg";
import cross from "assets/icons/cancel.svg";

async function postData(url = "", data, m) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: m, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
const styles = (theme) => ({
  select: {
    height: "30px",
    "&:before": {
      borderRadius: "none",
      borderColor: "#000000",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderRadius: "none",
      borderColor: "#000000",
    },
  },
});
class AddVouch extends React.Component {
  enterError = (id) => {
    document.getElementById(id).style.borderColor = "red";
    document.getElementById(id + "_error").style.display = "block";
  };
  rmEnterError = (id) => {
    document.getElementById(id).style.borderColor = "#505050";
    document.getElementById(id + "_error").style.display = "none";
  };

  clearData = () => {
    // document.querySelector("#vouch_bill_date").value = null;
    // document.querySelector("#vouch_type").value = null;
    this.setState({ voucher_type: "", bill_date: "", l_r_date: "" });
    document.querySelector("#vouch_bill_no").value = null;
    document.querySelector("#vouch_gr_no").value = null;
    document.querySelector("#vouch_transport_name").value = null;
    document.querySelector("#vouch_sup").value = null;
    document.querySelector("#vouch_lr_date").value = null;
    document.querySelector("#vouch_comission").value = null;
    document.querySelector("#vouch_customer").value = null;
    document.querySelector("#vouch_pro_item").value = null;
    document.querySelector("#vouch_hsn_num").value = null;
    document.querySelector("#vouch_quantity").value = "";
    document.querySelector("#vouch_dicon").value = 0;
    document.querySelector("#vouch_rate").value = "";
    document.querySelector("#vouch_amount").value = "";
  };

  setData = () => {
    let d = this.props.EData.det;
    if (d.bill_date) this.setState({ bill_date: d.bill_date, l_r_date: d.bill_date });
    if (d.l_r_date) this.setState({ l_r_date: d.l_r_date });
    this.setState({ voucher_type: d.type });
    document.querySelector("#vouch_bill_no").defaultValue = d.bill_num;
    document.querySelector("#vouch_gr_no").defaultValue = d.g_r_num;
    document.querySelector("#vouch_transport_name").defaultValue = d.transport_name;
    document.querySelector("#vouch_sup").defaultValue = d.supplier;
    document.querySelector("#vouch_sup_agent").defaultValue = d.supplier_agent;
    document.querySelector("#vouch_comission").defaultValue = d.set_commission;
    document.querySelector("#vouch_customer").defaultValue = d.customer;
    if (d.supplier_agent2) {
      this.setState({ subAgent: true });
      setTimeout(() => {
        document.querySelector("#vouch_sup_agent2").defaultValue = d.supplier_agent2;
      }, 500);
    }
    document.querySelector("#vouch_gst").defaultValue = parseFloat(d.gst);
    let arr = [];
    let i = this.props.EData.product;

    i.map((e, index) => {
      let a = {
        dicon: e.dicon,
        hsn_num: e.hsn_num,
        product_name: e.product_name,
        rate: e.rate,
        quantity: e.quantity,
        g_amount: e.g_amount,
        amount: e.amount,
      };
      arr.push(a);
    });
    console.log(d.discountArr);
    console.log(d.freightArr);
    console.log(JSON.parse(d.discountArr[0]));

    let arr1 = [];
    let arr2 = [];
    if (JSON.parse(d.discountArr[0]).type !== "") {
      d.discountArr.map((e) => {
        let a = JSON.parse(e);
        arr1.push(a);
      });
    }
    if (JSON.parse(d.freightArr[0]).remark !== "") {
      d.freightArr.map((e) => {
        let a = JSON.parse(e);
        arr2.push(a);
      });
    }
    this.setState({ discontArr: arr1, freightArr: arr2 });

    this.setState({ items: arr });
  };

  updateTotal = () => {
    let total = 0;
    let g_amount = 0;
    let gst = parseFloat(document.getElementById("vouch_gst").value);
    let disAmt = 0;
    this.state.items.map((e) => {
      g_amount = parseFloat(g_amount) + parseFloat(e.g_amount);
      disAmt = parseFloat(disAmt) + parseFloat(e.g_amount) - parseFloat(e.amount);
      total = parseFloat(total) + parseFloat(e.amount);
    });
    let FTotal = total;

    this.state.discontArr.map((ele) => {
      if (ele.type === "Less") {
        FTotal = parseFloat(FTotal) - parseFloat(ele.value);
      }
      if (ele.type !== "Less") {
        let a = parseFloat(FTotal) * (parseFloat(ele.value) / 100);
        ele.amt = parseFloat(a);
        FTotal = parseFloat(FTotal) - parseFloat(a);
      }
    });
    this.state.freightArr.map((ele) => {
      FTotal = parseFloat(FTotal) + parseFloat(ele.value);
    });
    let gstAmt = (parseFloat(FTotal) * parseFloat(gst)) / 100;
    FTotal = parseFloat(FTotal) + gstAmt;
    this.setState({ totalAmt: total, grossAmt: g_amount, disAmt: disAmt, mainAmnt: FTotal, gstAmt: gstAmt });
  };

  async addVouch() {
    let bool = false;
    if (document.getElementById("vouch_bill_no").value === "") {
      this.enterError("vouch_bill_no");
      bool = true;
    } else {
      this.rmEnterError("vouch_bill_no");
    }

    if (document.getElementById("vouch_sup").value === "None") {
      this.enterError("vouch_sup");
      bool = true;
    } else {
      this.rmEnterError("vouch_sup");
    }
    if (document.getElementById("vouch_customer").value === "None") {
      this.enterError("vouch_customer");
      bool = true;
    } else {
      this.rmEnterError("vouch_customer");
    }
    if (bool) {
      return;
    }

    this.CreateNewSupplier();
    this.CreateNewCustomer();
    this.CreateNewTransport();
    let bill_date = this.state.bill_date;
    let l_r_date = this.state.l_r_date;
    let type = this.state.voucher_type;
    let bill_num = document.querySelector("#vouch_bill_no").value;
    let g_r_num = document.querySelector("#vouch_gr_no").value;
    let transport_name = document.querySelector("#vouch_transport_name").value;
    let supplier = document.querySelector("#vouch_sup").value;
    let supplier_agent = document.querySelector("#vouch_sup_agent").value;
    let set_commission = document.querySelector("#vouch_comission").value;
    let customer = document.querySelector("#vouch_customer").value;
    let supplier_agent2 = null;
    if (document.getElementById("vouch_sup_agent2")) {
      supplier_agent2 = document.querySelector("#vouch_sup_agent2").value;
    }
    let gst = document.querySelector("#vouch_gst").value;
    let Vdata = {
      bill_date,
      l_r_date,
      type,
      bill_num,
      g_r_num,
      transport_name,
      supplier,
      supplier_agent,
      supplier_agent2,
      gst,
      set_commission,
      customer,
      discountArr: this.state.discontArr,
      freightArr: this.state.freightArr,
      items: this.state.items,
      totalAmt: this.state.mainAmnt,
    };
    let m = this.props.mode === "edit" ? "PUT" : "POST";
    let url = this.props.mode === "edit" ? "/api/vouch/" + this.props.EData.det.id : "/api/vouch";
    const isTrue = await postData(url, Vdata, m);
    if (isTrue) {
      this.props.rm();
    } else {
      alert("Unable to save. Please Try again");
    }
  }

  getName() {
    fetch("/api/profile/name", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.name) {
          this.setState(() => {
            return {
              name: data.name,
            };
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  addPro = async () => {};

  async vochAddPro() {
    let pro_name = document.querySelector("#vouch_pro_item").value;
    let isIn = this.state.products.find((element) => element.product_name === pro_name);
    console.log(isIn);

    if (!!!isIn && pro_name !== "") {
      let pro_name = document.querySelector("#vouch_pro_item").value;
      let hsn_num = document.querySelector("#vouch_hsn_num").value;
      let data = {
        product_name: pro_name,
        hsn_num: hsn_num,
      };

      await fetch("/api/products", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((r) => {
          if (r.product) {
          } else {
            alert("Cannot Add Product Please Try Later");
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Cannot Add Product Please Try Later");
          return;
        });
    }

    document.querySelector("#vouch_pro_item").value = "";
    let vouch_quantity = document.querySelector("#vouch_quantity").value;
    document.querySelector("#vouch_quantity").value = "";

    let vouch_dicon = document.querySelector("#vouch_dicon").value;
    document.querySelector("#vouch_dicon").value = 0;

    let vouch_rate = document.querySelector("#vouch_rate").value;
    document.querySelector("#vouch_rate").value = "";
    let amount = document.querySelector("#vouch_amount").value;
    document.querySelector("#vouch_amount").value = "";
    if (amount === "") {
      if (vouch_rate === "" && vouch_quantity === "") {
        alert("Please Add Quantity and Rate");
        return;
      }
    }

    let hsn_num = document.getElementById("vouch_hsn_num").value;
    document.getElementById("vouch_hsn_num").value = "";

    let dicon = parseFloat(vouch_dicon) / 100;
    let v_amount = parseFloat(amount);
    let g_amount = v_amount;
    v_amount = v_amount - v_amount * dicon;
    let item = {
      product_name: pro_name,
      quantity: vouch_quantity,
      dicon: vouch_dicon,
      rate: vouch_rate,
      amount: v_amount,
      hsn_num: hsn_num,
      g_amount,
    };

    let arr = this.state.items;
    arr.push(item);
    this.setState({
      items: arr,
    });
    this.updateTotal();
    return;
  }

  removeItem = (index) => {
    let arr = this.state.items;
    arr.splice(index, 1);

    this.setState((prevState) => {
      return {
        items: arr,
      };
    });
    this.updateTotal();
  };

  editItem = (index) => {
    let pro_name = document.querySelector("#vouch_pro_item");

    let vouch_quantity = document.querySelector("#vouch_quantity");
    let vouch_dicon = document.querySelector("#vouch_dicon");
    let vouch_rate = document.querySelector("#vouch_rate");
    let hsn_num = document.getElementById("vouch_hsn_num");
    let amt = document.getElementById("vouch_amount");

    pro_name.value = this.state.items[index].product_name;
    vouch_quantity.value = this.state.items[index].quantity;
    vouch_dicon.value = this.state.items[index].dicon;
    vouch_rate.value = this.state.items[index].rate;
    hsn_num.value = this.state.items[index].hsn_num;
    amt.value = this.state.items[index].g_amount;
    this.setState(() => {
      return {
        editItem: index,
      };
    });
  };

  editPro = () => {
    let vouch_quantity = document.querySelector("#vouch_quantity").value;
    let vouch_dicon = document.querySelector("#vouch_dicon").value;
    let vouch_rate = document.querySelector("#vouch_rate").value;
    let pro_name = document.getElementById("vouch_pro_item").value;
    let hsn_num = document.getElementById("vouch_hsn_num").value;
    let amt = document.getElementById("vouch_amount").value;
    document.getElementById("vouch_amount").value = "";
    document.querySelector("#vouch_pro_item").value = "";

    document.querySelector("#vouch_quantity").value = "";

    document.querySelector("#vouch_dicon").value = 0;

    document.querySelector("#vouch_rate").value = "";

    document.getElementById("vouch_hsn_num").value = "";
    if (amt === "") {
      if (vouch_rate === "" && vouch_quantity === "") {
        alert("Please Add Quantity and Rate");
        return;
      }
    }
    let dicon = parseFloat(vouch_dicon) / 100;
    let v_amount = parseFloat(amt);
    let g_amt = parseFloat(v_amount);
    v_amount = v_amount - v_amount * dicon;
    v_amount = v_amount.toFixed(2);
    let arr = this.state.items;

    arr[this.state.editItem].product_name = pro_name;
    arr[this.state.editItem].quantity = vouch_quantity;
    arr[this.state.editItem].dicon = vouch_dicon;
    arr[this.state.editItem].rate = vouch_rate;
    arr[this.state.editItem].hsn_num = hsn_num;
    arr[this.state.editItem].amount = v_amount;
    arr[this.state.editItem].g_amount = g_amt;

    this.setState(() => {
      return {
        items: arr,
        editItem: -1,
      };
    });
    this.updateTotal();
  };

  filterPro = () => {
    document.getElementById("pro_list").style.display = "block";
    let temp = document.getElementById("vouch_pro_item").value.toLowerCase();

    let arr = this.state.products.filter((e) => {
      if (temp.length === 0) {
        return true;
      }
      if (e.product_name.toLowerCase().indexOf(temp) !== -1) {
        return true;
      } else return false;
    });

    this.setState({ pro: arr });
  };
  filterAcc = (id, id2) => {
    document.getElementById(id).style.display = "block";
    let temp = document.getElementById(id2).value.toLowerCase();

    let arr = this.state.accounts.filter((e) => {
      if (temp.length === 0) {
        return true;
      }
      if (e.acc_real_name.toLowerCase().indexOf(temp) !== -1) {
        return true;
      } else return false;
    });

    this.setState({ acc: arr });
  };

  getProducts() {
    fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Products) {
          this.setState(() => {
            return {
              products: data.Products,
            };
          });
        }
      })
      .catch((err) => {
        // alert(err)
      });
  }
  getAccounts() {
    fetch("/api/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accounts) {
          this.setState({ accounts: data.accounts });
        }
      })
      .catch((err) => {
        // aldert(err)
      });
  }
  crossPro = () => {
    this.setState({ addPro: false });
  };

  selectAllText = () => {
    document.getElementById("vouch_pro_item").select();
  };

  CreateNewSupplier = () => {
    if (!document.getElementById("vouch_sup").value) {
      return;
    }
    let data = {
      acc_real_name: document.getElementById("vouch_sup").value,
      acc_type: "debtors",
    };
    let exist = false;
    this.state.accounts.map((e) => {
      if (e.acc_real_name === data.acc_real_name && (e.acc_type === "creditors" || e.acc_type === "debtors")) {
        exist = true;
      }
    });
    if (exist) {
      return;
    }

    fetch("/api/accounts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .catch(() => {
        document.getElementById("vouch_sup").value = "";
      });
  };
  CreateNewTransport = () => {
    if (!document.getElementById("vouch_transport_name").value) {
      return;
    }
    let data = {
      acc_real_name: document.getElementById("vouch_transport_name").value,
      acc_type: "transport",
    };

    let exist = false;
    this.state.accounts.map((e) => {
      if (e.acc_real_name === data.acc_real_name && e.acc_type === data.acc_type) {
        exist = true;
      }
    });
    if (exist) {
      return;
    }

    fetch("/api/accounts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .catch(() => {
        document.getElementById("vouch_transport_name").value = "";
      });
  };

  CreateNewCustomer = () => {
    if (!document.getElementById("vouch_customer").value) {
      return;
    }

    let data = {
      acc_real_name: document.getElementById("vouch_customer").value,
      acc_type: "debtors",
    };

    let exist = false;
    this.state.accounts.map((e) => {
      if (e.acc_real_name === data.acc_real_name && (e.acc_type === "creditors" || e.acc_type === "debtors")) {
        exist = true;
      }
    });
    if (exist) {
      return;
    }

    fetch("/api/accounts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .catch(() => {
        document.getElementById("vouch_customer").value = "";
      });
  };
  roundOffTheNumber = (num) => (Math.round(num * 100) / 100).toFixed(2);

  constructor(props) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);
    super(props);
    this.vochAddPro = this.vochAddPro.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.state = {
      products: [],
      accounts: [],
      subAgent: false,
      items: [],
      name: null,
      vouch_sup_agent: currentUser.full_name,
      voucher_type: "",
      editItem: -1,
      totalAmt: 0,
      grossAmt: 0,
      disAmt: 0,
      pro: [],
      acc: [],
      gst: 5,
      gstAmt: 0,
      discontArr: [],
      dicountType: "less",
      mainAmnt: 0,
      freightArr: [],
      l_r_date: "",
      bill_date: "",
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getAccounts();
    this.setState({ voucher_type: this.props.which });
    if (this.props.mode === "edit") {
      this.setState({ subAgent: true });
    }
    this.getName();
    let today = new Date().toLocaleDateString("en-CA");

    this.setState({ bill_date: today, l_r_date: today });

    document.getElementById("pro_list").style.display = "none";
    if (this.props.mode === "edit") {
      this.setData();
      setTimeout(() => {
        this.updateTotal();
      }, 500);
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
            <img src={ref} alt=" " onClick={this.clearData} />
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
                    <input
                      type="date"
                      name="bill_date"
                      id="vouch_bill_date"
                      value={this.state.bill_date}
                      onChange={(e) =>
                        this.setState({ bill_date: e.target.value, l_r_date: e.target.value }, () =>
                          console.log("change done here")
                        )
                      }
                    />
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
                    <FormControl>
                      <Select
                        className={`${this.props.classes.select} add_vouch_mui`}
                        name="vouch_type"
                        variant="outlined"
                        id="vouch_type"
                        value={this.state.voucher_type}
                        onChange={(e) => {
                          this.setState({ voucher_type: e.target.value });
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
                      name="vouch_bill_no"
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
                    <input type="text" name="vouch_gr_no" id="vouch_gr_no" />
                  </div>
                  <div className="vouch_si">
                    <span>L. R. Date</span>
                    <br />
                    <input
                      type="date"
                      id="vouch_lr_date"
                      value={this.state.l_r_date}
                      onChange={(e) => this.setState({ l_r_date: e.target.value })}
                    />
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
                      name="vouch_sup"
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
                      onChange={(e) => {
                        this.filterAcc("sup_list", "vouch_sup");
                      }}
                      onFocus={(e) => {
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
                      name="vouch_sup"
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
                    <FormControl>
                      <Select
                        className={`${this.props.classes.select} add_vouch_mui`}
                        name="vouch_sup_agent"
                        variant="outlined"
                        id="vouch_sup_agent"
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                        autoWidth
                        value={this.state.vouch_sup_agent}
                      >
                        <MenuItem value={this.state.vouch_sup_agent}>{this.state.vouch_sup_agent}</MenuItem>
                        {/* <MenuItem value={this.state.name}>{this.state.name}</MenuItem> */}
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
                                acc_type: "Sub Agent",
                              };

                              let exist = false;
                              this.state.accounts.map((e) => {
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
                                  "Content-Type": "application/json",
                                  // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify(data), // body data type must match "Content-Type" header
                              })
                                .then((res) => res.json())
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
                        cursor: "pointer",
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
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
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
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
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
                  onFocus={(e) => e.target.select()}
                  id="vouch_dicon"
                  defaultValue={0}
                />
              </div>
              <div className="vouch_si">
                <span>Amount</span>
                <br />
                <input
                  onFocus={(e) => e.target.select()}
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
                  <strong>₹{this.roundOffTheNumber(this.state.grossAmt)}</strong>
                </td>
              </tr>
              <tr>
                <td> Discount :</td>
                <td className="bold">
                  <strong>
                    {"-"}₹{this.roundOffTheNumber(this.state.disAmt)}
                  </strong>
                </td>
              </tr>
              <tr>
                <td> Taxable Amount :</td>
                <td className="bold">
                  <strong>₹{this.roundOffTheNumber(this.state.grossAmt - this.state.disAmt)}</strong>
                </td>
              </tr>
              <tr>
                <td> GST ({this.state.gst}%) :</td>
                <td className="bold">
                  <strong>₹{this.roundOffTheNumber(this.state.gstAmt)}</strong>
                </td>
              </tr>
              <tr>
                <td> Net Amount :</td>
                <td className="bold">
                  <strong> ₹{this.roundOffTheNumber(this.state.totalAmt)}</strong>
                </td>
              </tr>
              {this.state.discontArr.map((ele, i) => {
                return (
                  <tr>
                    <td className="relative">
                      <span
                        value={i}
                        onClick={(e) => {
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
                        onClick={(e) => {
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
                <td> Round Off ({this.state.net}%) :</td>
                <td className="bold">
                  <strong>
                    {this.roundOffTheNumber(this.state.mainAmnt) - Math.floor(this.state.mainAmnt) > 0.5
                      ? `(+) ${(this.roundOffTheNumber(this.state.mainAmnt) - Math.floor(this.state.mainAmnt)).toFixed(
                          2
                        )}`
                      : `(-) ${(this.roundOffTheNumber(this.state.mainAmnt) - Math.floor(this.state.mainAmnt)).toFixed(
                          2
                        )}`}
                  </strong>
                </td>
              </tr>
              <tr>
                <td> Total Amount :</td>
                <td className="bold">
                  <strong>₹{this.roundOffTheNumber(this.state.mainAmnt.toFixed())}</strong>
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
                  <FormControl>
                    <Select
                      className="add_vouch_mui"
                      variant="outlined"
                      id="add_dis_discount_type"
                      disabled={this.state.totalAmt === 0 ? true : false}
                      value={this.state.discountType}
                      onChange={(e) => {
                        this.setState({ dicountType: e.target.value });
                      }}
                      autoWidth
                      style={{ height: "35px", width: "70px" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="less">Less</MenuItem>
                      <MenuItem value="cash_discount">Cash Discount</MenuItem>
                      <MenuItem value="no_gr_less">No G.R. Less</MenuItem>
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
                  onClick={(e) => {
                    let a = {
                      type: document.getElementById("add_dis_discount_type").value,
                      value: document.getElementById("add_discount_input").value,
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
                        value: document.getElementById("add_freight_input").value,
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
const mapStateToProps = (state) => ({
  currentUser: state.loginReg.currentUser,
});

export default compose(withStyles(styles), connect(mapStateToProps))(AddVouch);
