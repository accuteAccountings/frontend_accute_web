import React,{useState} from "react";
import DashBoardIcon from "assets/icons/dashboard1.svg";
import UsersIcon from "assets/icons/add-group.svg";
import ServiceIcon from "assets/icons/planing.svg";
import InvoicesIcon from "assets/icons/invoice.svg";
import sample from "assets/icons/user.svg"
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom'

export default function SideBar ({match}) {
const [activeBtn , setActiveBtn ] = useState("dashboard")
const location = useLocation();

    return (
      <div className="side_bar">
        <div className="side_bar_con">
          <img className="add_img_btn" src={sample} alt="" />
          

          <li className="new_btn" >
            <span>New</span> <img src="" alt="" />
          </li>

            <Link to="/control-panel/dashboard">
              <li className={location.pathname==="/agency/dashboard" ? "side_btn act_s_btn" : "side_btn"} >
            <img src={DashBoardIcon} alt="" /> <span>DashBoard</span>
            <div className="side_pop" />
          </li>
            </Link>

            <Link to="/control-panel/services">
          <li
            className={location.pathname==="/control-panel/services"? "side_btn act_s_btn" : "side_btn"}
          >
            <img src={ServiceIcon} alt="" />
            <span>Services</span>
            <img src="" alt="" />
          </li>
            </Link>
            <Link to="/control-panel/billings">
          <li
            className={location.pathname==="/control-panel/billings" ? "side_btn act_s_btn" : "side_btn"}
          >
            <img src={InvoicesIcon} alt=" " />
            <span>Billings</span>
            <img src="" alt="" />
            <div className="side_pop">
              <li>
                Invoices
              </li>
            </div>
          </li>
            </Link>
            <Link to="/control-panel/manage-users">
              <li className={location.pathname==="/control-panel/manage-users" ? "side_btn act_s_btn" : "side_btn"} >
            <img src={UsersIcon} alt=" " />
            <span>Manage Users</span>
            <div className="side_pop">
              <li>Create New Users</li>
              <li>Assign Software &amp; Permissions</li>
            </div>
          </li>
            </Link>

        </div>
      </div>
    );
  }

