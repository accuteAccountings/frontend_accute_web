import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Test from "pages/App";
import Home_Page from 'pages/admin/Home';
import UserLists from 'containers/admin/user_list'
import Profile from 'pages/admin/Profile'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/main" component={Test} />
        <div className="App">
          <div className="left_border"></div>
          <div className="inner_home_body">
            <div className="upper_border"></div>
              <Route path="/admin" component={Home_Page} exact = {true}/>
              <Route path="/admin/userslist" component={UserLists} exact = {true}/>
              <Route path="/admin/profile/:id" component={Profile} exact = {true}/>
          </div>
        </div>
        

        
      </Switch>
    </BrowserRouter>
  );
}
