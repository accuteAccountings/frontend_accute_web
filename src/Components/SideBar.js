import React from "react";
import d_img from "./../img/social-media.svg";

class SideBar extends React.Component {
  navToDash() {
    this.props.navTo("dash");
  }
  navToRep() {
    this.props.navTo("rep");
  }
  navToAcc() {
    this.props.navTo("accounting");
  }
  navToTrans() {
    this.props.navTo("trans");
  }

  getUserProImg() {
    fetch("/api/profile/img", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.pro_img) {
          this.setState(() => {
            return {
              pro_img: data.pro_img
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.navToDash = this.navToDash.bind(this);
    this.navToRep = this.navToRep.bind(this);
    this.navToAcc = this.navToAcc.bind(this);
    this.navToTrans = this.navToTrans.bind(this);
    this.getUserProImg = this.getUserProImg.bind(this);

    this.state = {
      pro_img: d_img
    };

    this.getUserProImg();
  }

  render() {
    return (
      <div className="side_bar">
        <div className="side_bar_con">
          <img className="add_img_btn" src={this.state.pro_img} alt="" />
          <li
            className="trash_btn"
            onClick={() => {
              this.props.navTo("trash");
            }}
          >
            Trash
          </li>

          <li className="new_btn" onClick={this.props.AddAccCrossBtn}>
            <span>New</span> <img src="" alt="" />
          </li>

          <li className={this.props.actPage === "dash" ? "side_btn act_s_btn" : "side_btn"} onClick={this.navToDash}>
            <span>DashBoard</span>
            <img src="" alt="" />
            <div className="side_pop" />
          </li>
          <li
            className={this.props.actPage === "accounting" ? "side_btn act_s_btn" : "side_btn"}
            onClick={() => {
              this.navToAcc();
            }}
          >
            <span>Accounting</span>
            <img src="" alt="" />
            <div className="side_pop">
              <li
                onClick={() => {
                  this.props.setProOrAcc("Accounts");
                }}
              >
                Accounts
              </li>
              <li
                onClick={() => {
                  this.props.setProOrAcc("Products");
                }}
              >
                Products
              </li>
            </div>
          </li>
          <li
            className={this.props.actPage === "trans" ? "side_btn act_s_btn" : "side_btn"}
            onClick={() => {
              this.navToTrans();
            }}
          >
            <span>Transactions</span>
            <img src="" alt="" />
            <div className="side_pop">
              <li
                onClick={() => {
                  this.props.setVouchPage("pv");
                }}
              >
                Purchase Voucher
              </li>
              <li
                onClick={() => {
                  this.props.setVouchPage("jv");
                }}
              >
                Journal Voucher
              </li>
              <li
                onClick={() => {
                  this.props.setVouchPage("dn");
                }}
              >
                Debit Note
              </li>
            </div>
          </li>
          <li className={this.props.actPage === "rep" ? "side_btn act_s_btn" : "side_btn"} onClick={this.navToRep}>
            <span>Reports</span>
            <img src="" alt="" />
            <div className="side_pop">
              <li>Daily book</li>
              <li>Ledger</li>
              <li>Challan Register</li>
              <li>Commission</li>
            </div>
          </li>
          <li
            className={this.props.actPage === "agency" ? "side_btn act_s_btn" : "side_btn"}
            onClick={this.navToAgency}
          >
            <span>Agency</span>
            <img src="" alt="" />
            <div className="side_pop">
              <li>Products</li>
              <li>Products</li>
            </div>
          </li>
        </div>
      </div>
    );
  }
}

export default SideBar;
