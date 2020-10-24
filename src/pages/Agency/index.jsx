import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dash"
import UserProfile from "containers/agency/UserProfile"
import Clogo from "containers/agency/Clogo"
import TopBar from "containers/agency/TopBar"
import SideBar from 'containers/agency/SideBar'
import Agency from "./Agency"
import NavSec from "containers/agency/NavSec"
import Accountings from './Accountings.jsx'
import Trash from './Trash.jsx'
import Transactions from './Transactions.jsx'
import Account_pro from 'containers/agency/Account_profile'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/agency" to="/agency/dashboard" />
      <div className="app">
        <div className="side" >
          <Route component={SideBar}/>
        </div>
        <div className="pageBody">
          <TopBar />
          <Route path="/agency/dashboard" component={Dashboard}/>
          <Route path="/agency/agency" component={Agency}/>
          <Route path="/agency/reports" component={()=>(<NavSec  navItems={["Challen Reg.", "Daily Book ", "Ledger"]} />)} />
          <Route path="/agency/accountings" component={Accountings}/>
          <Route path="/agency/trash" component={Trash}/>
          <Route path="/agency/transactions" component={Transactions}/>
          <Route path="/agency/my-profile" component={UserProfile}/>
          <Route path="/agency/acc-profile/:id" component={Account_pro} exact = {true}/>
        </div>
       </div>
      </Switch>
    </BrowserRouter>
  );
}
