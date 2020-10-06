import React from 'react';
import {Switch, Route,withRouter} from 'react-router-dom';
import ReportsMenuItem from './TransactionsMenuItem';
import TopBar from './TopBar';
import Clogo from './Clogo';



const Reports =(props)=>{
     
    
    console.log(props)
        return (
         <div className="pageBody">
            <TopBar />
            <Clogo />
            <Switch>
            <Route exact path={props.match.path}>
              <ReportsMenuItem id="daily-book"/>
            </Route>
            <Route path={`${props.match.url}/:id`} component=    {ReportsMenuItem}/>
            </Switch>
        
        </div>
    )
}

export default withRouter(Reports)
