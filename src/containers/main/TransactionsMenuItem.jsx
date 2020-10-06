import React from 'react';
import {withRouter} from 'react-router-dom';

import AddVouch from './AddVouch';
import AddJovouch from './AddJoVouch';
import VouchCon from './VouchCon';
class TransactionsMenuItem extends React.Component{
    setPVoJVoDN = (ans, mode, data) => {
        this.setState(prevState => {
          return {
            PVoJVoDN: ans,
            vouchMode: mode,
            vouchEData: data
          };
        });
      };
    
      rmVouch = () => {
        this.setState(prevState => {
          return {
            PVoJVoDN: "no"
          };
        });
      };
      rmDebit = () => {
        this.setState(prevState => {
          return {
            PVoJVoDN: "no"
          };
        });
      };
    
      rmCredit = () => {
        this.setState(prevState => {
          return {
            PVoJVoDN: "no"
          };
        });
      };
    
      setjoBill = ans => {
        this.setState(() => {
          return {
            jobill_num: ans
          };
        });
      };
    
      setVouchPage = p => {
        this.setState({ vouchPage: p });
      };
    constructor(props){
        super(props);
        this.state = {  
            PVoJVoDN: "no",
            AddVouch: true,
            vouchPage: "pv",
            vouchEData: [],
            jobill_num: null,
            vouchMode: "add",
            vouchData: [],
          };
    }
    render(){
        console.log(this.props)
        const { id: item = "no" } = this.props;
        const { id = item } = this.props.match.params;
        const data = {
        "no": {   
          main: (<>
            <VouchCon
             setPVoJVoDN={this.setPVoJVoDN}
             vouchPage={this.state.vouchPage}
             setVouchPage={this.setVouchPage}
             specificJoVouch={this.specificJoVouch}
             setjoBill={this.setjoBill}
           />
          </>)
        
        },
        "purchase-voucher": {
            main: (
                <AddVouch which="pv" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />
                )
        },
        "journal-voucher": {
            main: (
                <AddJovouch
                 mode={this.state.vouchMode}
                 EData={this.state.vouchEData}
                 rm={this.rmVouch}
                 jobill_num={this.state.jobill_num}/>
              )
        }, 
        "debit-notes": {
            main: (
                 <AddVouch which="dn" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} />                 
                 )
        },
        "credit-notes": {
            main: (
                  <AddVouch which="cn" rm={this.rmVouch} mode={this.state.vouchMode} EData={this.state.vouchEData} /> 
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