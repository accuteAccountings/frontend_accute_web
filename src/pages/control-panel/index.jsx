import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dash"
import Invoices from "containers/control-panel/Invoices";
import Services from "containers/control-panel/Services";
import Billings from "containers/control-panel/Billings";
import ManageUsers from "containers/control-panel/ManageUsers";
import TopBar from "containers/control-panel/TopBar";
import SideBar from 'containers/control-panel/SideBar';
import Agency from "../Agency/index";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/agency" component={Agency}/>
        <Redirect exact from="/control-panel" to="/control-panel/dashboard" />
      <div className="app">
        <div className="side" >
          <Route component={SideBar}/>
        </div>
        <div className="pageBody">
          <TopBar />
          
          <Route path="/control-panel/dashboard" component={Dashboard}/>
          <Route path="/control-panel/invoices" component={Invoices}/>
          <Route path="/control-panel/services" component={Services}/>
          <Route path="/control-panel/billings" component={Billings}/>
          <Route path="/control-panel/manage-users" component={ManageUsers}/>
        </div>
       </div>
      </Switch>
    </BrowserRouter>
  );
}
