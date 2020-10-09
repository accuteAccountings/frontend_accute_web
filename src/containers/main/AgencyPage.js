import React from 'react'
import Invoice from './Invoice_form'
import ref from "assets/icons/refresh.svg";
import trash from "assets/icons/trash.svg";
import pencil from "assets/icons/pencil.svg";
import Commission from  './Commission'

export default class AgencyPage extends React.Component{


    handleForm = (ans) => {
        this.setState(() => {
            return{
                mode : ans
            }
        })
    }

    getInvoices = () => {
        fetch('/api/invoice/Invoices')
        .then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        Invoices : data
                    }
                })
            }
        })
    }

    constructor(props){
        super(props)

        this.getInvoices()

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
            mode : 'list',
            Invoices : [],
        }
    }
    render(){
        return(
            <div className  = "agency_page">

                {this.state.mode === 'list' ? (
                    <div className = "inv_list">
                        <div className="nav_sec_inv">
                            <div className="nav_items_inv">
                                <li
                                    className= "black" 
                                >
                                    Invoices
                                </li>
                            </div>
                            <div className="other_det">
                            <div
                                className="add_vouch"
                                onClick={() => {
                                    this.handleForm('form')
                                }}
                            >
                                + Add Invoice
                            </div>
                
                            <img
                                src={ref}
                                alt=" "
                                onClick={() => {
                                }}
                            />
                    
                        </div>
                    </div>
                    <div className = "inv_cont">
                        {this.state.Invoices.map((e) => {
                            return(
                                <InvoiceDet 
                                 id = {e.id}
                                 supplier = {e.supplier}
                                 date = {e.date}
                                />
                            )
                        })}
                    </div>
                  </div>

                ) : (
                     <div className = "invoice_form">
                        <Invoice 
                         handleForm = {this.handleForm}
                         getInvoices = {this.getInvoices}
                          />
                    </div>
                    )}
                <Commission 
                accounts = {this.state.accounts} />
            </div>
        )
    }
}


  class InvoiceDet extends React.Component {

        getDetails = () => {
            fetch(`/api/invoice/Services?id=${this.props.id}`)
            .then((res) => res.json())
            .then((data) => {
                if(data){
                    this.setState(() => {
                        return{
                            service_details : data.services_details,
                            sales_amount : data.sales_amount,
                            commission : data.commission
                        }
                    })
                }
            })
        }

        constructor(props){
            super(props)

            this.state = {
                service_details : null,
                sales_amount : null,
                commission : null
            }

        }
    render() {
      return (
        <div className="det_cont_invoice">
          <div className="det_cont_right_jovouch_m">
            <div className="vouch_bills">
              <span className="acc_id_vouch">{this.props.id} </span>
              <span className="acc_right_vouch">Commission:</span> {this.state.commission}
            </div>
            <div className="acc_name_jovouch jovouch_det">
              <span>{this.props.supplier} </span>
            </div>
          </div>
          <div className="det_cont_right_jovouch">
            <div className="vouch_bills">
              <span className="acc_right_vouch"> Sales Amount:</span> {this.state.sales_amount}
            </div>
          </div>
          <div className="det_cont_last_jovouch">
            <div className="vouch_date">
              <span className="acc_right_vouch"> Date:</span> {this.props.date}
            </div>
          </div>
          <div className="det_cont_icons">
            <div
              onClick={() => {
              }}
            >
              <img src={pencil} alt=" " />
            </div>
            <div
              onClick={() => {
              }}
            >
              <img src={trash} alt=" " />
            </div>
          </div>
        </div>
      );
    }
  }