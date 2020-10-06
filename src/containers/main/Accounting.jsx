import React from 'react';
import {Switch, Route,withRouter} from 'react-router-dom';
import AccountingMenuItem from './AccountingMenuItem';
import TopBar from './TopBar';
import Clogo from './Clogo';
import NavSec from './NavSec';
import ProCon from './ProCon';


const Accounting =(props)=>{
     
    
    console.log(props)
        return (
        <div className="pageBody">
        <TopBar />
        <Clogo />
        <Switch>
        <Route exact path={props.match.path}>
          <AccountingMenuItem id="accounts"/>
        </Route>
        <Route path={`${props.match.url}/:id`} component={AccountingMenuItem}/>
        </Switch>
        
        </div>
    )
}

export default withRouter(Accounting)
