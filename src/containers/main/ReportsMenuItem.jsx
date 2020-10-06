import React from 'react';
import {withRouter} from 'react-router-dom';
import DailyBook from './DailyBook';
class TransactionsMenuItem extends React.Component{
constructor(props){
    super(props);
}
render(){
    console.log(this.props)
    const { id: item = "daily-book" } = this.props;
    const { id = item } = this.props.match.params;
    const data = {
    "daily-book": {   
      main: (
        <DailyBook/>
     )
    
    },
    "ledger": {
        main: (
            <p>Ledger</p>
            )
    },
    "challan-register": {
        main: (
            <p>challan-register</p>
          )
    }, 
    "commission": {
        main: (
             <p>Commission</p>               
             )
    }
    }
  
  return (
    data && data[id] ? (

     data[id].main
  
  ) : null
  )
    }
}
export default TransactionsMenuItem;