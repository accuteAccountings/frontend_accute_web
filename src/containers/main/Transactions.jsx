import React from 'react';
import {Switch, Route,withRouter} from 'react-router-dom';
import TransactionsMenuItem from './TransactionsMenuItem';
import TopBar from './TopBar';
import Clogo from './Clogo';



const Transactions =(props)=>{
     
    
    console.log(props)
        return (
        <div className="pageBody">
        <TopBar />
        <Clogo />
        <Switch>
        <Route exact path={props.match.path}>
          <TransactionsMenuItem id="no"/>
        </Route>
        <Route path={`${props.match.url}/:id`} component={TransactionsMenuItem}/>
        </Switch>
        
        </div>
    )
}

export default withRouter(Transactions)
