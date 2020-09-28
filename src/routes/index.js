import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Test from "pages/App";
import Admin from "pages/admin/App";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/main" component={Test} />
          <Route path="/admin" component={Admin}/>
      </Switch>
    </BrowserRouter>
  );
}
