import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dash"
import Clogo from "containers/main/Clogo"
import TopBar from "containers/main/TopBar"
import SideBar from 'containers/main/SideBar'
import Agency from "./Agency"
import NavSec from "containers/main/NavSec"
import Accountings from './Accountings.jsx'
import Trash from './Trash.jsx'
import Transactions from './Transactions.jsx'

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
        </div>
       </div>
      </Switch>
    </BrowserRouter>
  );
}
