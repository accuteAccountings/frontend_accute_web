import React from "react";
import DashBoardIcon from "assets/icons/dashboard1.svg";
import AccountingIcon from "assets/icons/money.svg";
import TransactionsIcon from "assets/icons/transaction.svg";
import ReportsIcon from "assets/icons/reports.svg";
import AgencyIcon from "assets/icons/agency.svg";
import TrashIcon from "assets/icons/trash.svg";
import sample from "assets/icons/user.svg"

class SideBar extends React.Component {
  
  navTo(page) {
    this.props.navTo(page);
  }

  constructor(props) {
    super(props);
    this.navTo = this.navTo.bind(this);
  
  }

  render() {
    return (
      <div className="side_bar">
        <div className="side_bar_con">
          <img className="add_img_btn" src={sample} alt="" />
          

          <li className="new_btn" onClick={this.props.AddAccFromUsersCrossBtn}>
            <span>New</span> <img src="" alt="" />
          </li>

          <li className={this.props.actPage === "dash" ? "side_btn act_s_btn" : "side_btn"} onClick={()=>this.navTo("dashboard")}>
            <img src={DashBoardIcon} alt="" /> <span>DashBoard</span>
            <div className="side_pop" />
          </li>
          <li
            className={this.props.actPage === "accounting" ? "side_btn act_s_btn" : "side_btn"}
            onClick={() => {
              this.navTo("accounting");
            }}
          >
            <img src={AccountingIcon} alt="" />
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
              this.navTo("transactions");
            }}
          >
            <img src={TransactionsIcon} alt="" />
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
          <li className={this.props.actPage === "rep" ? "side_btn act_s_btn" : "side_btn"} onClick={()=>this.navTo("Reports")}>
            <img src={ReportsIcon} alt="" />
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
            onClick={() => {
              this.props.navTo("agency");
            }}
          >
            <img src={AgencyIcon} alt="" />
            <span>Agency</span>
            <img src="" alt="" />
            <div className="side_pop">
              <li>Products</li>
              <li>Products</li>
            </div>
          </li>
          <hr className="hr_line" />
          <li
            className="side_btn"
            onClick={() => {
              this.props.navTo("trash");
            }}
          >
            <img src={TrashIcon} alt="" />
            Trash
          </li>
        </div>
      </div>
    );
  }
}

export default SideBar;
