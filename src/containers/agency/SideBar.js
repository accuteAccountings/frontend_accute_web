import React, { useState } from "react";
import DashBoardIcon from "assets/icons/dashboard1.svg";
import AccountingIcon from "assets/icons/money.svg";
import TransactionsIcon from "assets/icons/transaction.svg";
import ReportsIcon from "assets/icons/reports.svg";
import AgencyIcon from "assets/icons/agency.svg";
import TrashIcon from "assets/icons/trash.svg";
import sample from "assets/icons/user.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SideBar({ match }) {
  const [activeBtn, setActiveBtn] = useState("dashboard");
  const location = useLocation();

  return (
    <div className="side_bar">
      <div className="side_bar_con">
        <img className="add_img_btn" src={sample} alt="" />

        <li className="new_btn">
          <span>New</span> <img src="" alt="" />
        </li>

        <Link to="/agency/dashboard">
          <li className={location.pathname === "/agency/dashboard" ? "side_btn act_s_btn" : "side_btn"}>
            <img src={DashBoardIcon} alt="" /> <span>DashBoard</span>
            <div className="side_pop" />
          </li>
        </Link>

        <Link to="/agency/accountings">
          <li className={location.pathname === "/agency/accountings" ? "side_btn act_s_btn" : "side_btn"}>
            <img src={AccountingIcon} alt="" />
            <span>Accounting</span>
            <img src="" alt="" />
          </li>
        </Link>
        <Link to="/agency/transactions">
          <li className={location.pathname === "/agency/transactions" ? "side_btn act_s_btn" : "side_btn"}>
            <img src={TransactionsIcon} alt=" " />
            <span>Transactions</span>
            <img src="" alt="" />
          </li>
        </Link>
        <Link to="/agency/reports">
          <li className={location.pathname === "/agency/reports" ? "side_btn act_s_btn" : "side_btn"}>
            <img src={ReportsIcon} alt=" " />
            <span>Reports</span>
          </li>
        </Link>
        <Link to="/agency/agency">
          <li className={location.pathname === "/agency/agency" ? "side_btn act_s_btn" : "side_btn"}>
            <img src={AgencyIcon} alt="" />
            <span>Agency</span>
            <img src="" alt="" />
          </li>
        </Link>
        <Link to="/agency/trash">
          <hr className="hr_line" />
          <li className={location.pathname === "/agency/trash" ? "side_btn act_s_btn" : "side_btn"}>
            <img src={TrashIcon} alt="" />
            Trash
          </li>
        </Link>
      </div>
    </div>
  );
}
