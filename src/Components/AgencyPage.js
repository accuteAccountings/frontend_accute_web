import React from 'react'

export default class AgencyPage extends React.Component{


    constructor(props){
        super(props)

        fetch('/api/accounts').then((res) => res.json())
        .then((data) => {
          if(data){
            this.setState(() => {
              return{
                accounts : data.accounts
              }
            })
          }
        })

        this.state = {
            accounts : [],
        }
    }
    render(){
        return(
            <div>
                <div className = "lower_db">
                    <div className = "upper">
                    <div className = "hd">ACTIVE USERS</div>  
                </div>
                <div className = "lower">
                    <div className = "id">Id.</div>
                    <div className = "name_city">Account Name</div>
                    <div className = "balance">Commision(with GST)</div>
                    <div className = "balance">Commision(without GST)</div>
                </div>
                <div className = "scroller">
                    {this.state.accounts.map((e ,i) => {
                    return(
                            <User_Det 
                            id = {i + 1}
                            acc = {e.acc_name}
                            city = {e.address_line1}
                            />
                        )
                        })}
                </div>
            
            </div>

            </div>
        )
    }
}

class  User_Det extends React.Component{

    TotalGst = () => {
        let t = 0
        let x = 0
        this.state.vouch.map((e) => {
            if(e.supplier === this.props.acc && e.gst && e.status == 0){
                x = parseInt(e.totalAmt) - ((parseInt(e.gst))*parseInt(e.totalAmt)*0.01) 
                t = parseInt(t) + (parseInt(x)*parseInt(e.set_commission)*0.01)
            }
        })

        return t;
    }

    Total = () => {
        let t = 0
        this.state.vouch.map((e) => {
            if(e.supplier === this.props.acc && e.gst == null && e.status == 0){
                t = parseInt(t) + (parseInt(e.totalAmt)*parseInt(e.set_commission)*0.01)
            }
        })

        return t;
    }

    getVouch = () => {
        fetch(`/api/vouch/specific/${this.props.acc}`)
        .then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                       vouch : data
                    }
                })
            }
        })
       }

       constructor(props){
           super(props)

           this.getVouch()

           this.state = {
               vouch : []
           }
       }
    render(){
    return(
      <div className = {parseInt(this.props.id)%2 === 0 ? 'lower_ud_even' : 'lower_ud_odd'  }>
        <div className = "id">{this.props.id}</div>
        <div className = "name_city">
            <div className = "acc_name">{this.props.acc}</div>
            <div className = "city">{this.props.city}</div>
        </div>
        <div className = "balance">{this.TotalGst()}</div>
        <div className = "balance">{this.Total()}</div>
    </div>
    )
    }
  }