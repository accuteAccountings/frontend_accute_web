import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import graph_icon from '../img/graph_view.svg'
import menu from '../img/grid.svg'
import blue_menu from '../img/blue_grid.svg'
import blue_graph from '../img/blue_graph.svg'

export default class Report_pro extends React.Component{

    setmode = (ans) => {
        this.setState(() => {
            return{
                mode : ans
            }
        })
    }

    Total_sales = () => {
        let t = 0
        this.state.sales.map(e => {
            t = parseInt(t) + parseInt(e.totalAmt)
        })
        return t;
    }

    Total_purchase = () => {
        let t = 0
        this.state.purchase.map(e => {
            t = parseInt(t) + parseInt(e.totalAmt)
        })
        return t;
    }

    Total_payment = () => {
        let t = 0
        this.state.payment.map(e => {
            t = parseInt(t) + parseInt(e.amount - e.balance)
        })
        return t;
    }


    constructor(props){
        super(props)

        fetch(`/api/report/sales?supplier=${this.props.acc_name}`)
        .then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        sales : data
                    }
                })
            }
        })

        fetch(`/api/report/purchase?customer=${this.props.acc_name}`)
        .then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        purchase : data
                    }
                })
            }
        })

        fetch(`/api/report/payment?account=${this.props.acc_name}`)
        .then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        payment : data
                    }
                })
            }
        })

        this.state = {
            mode : 'grid',
            sales : [],
            purchase : [],
            payment : []
        }
    }
    render(){
      let   data1 =  {
            labels: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
            datasets: [{
                label: 'Sales',
                // backgroundColor: 'white',
                borderColor: '#1f888a',
                data: [this.Total_sales()]
            }]
        }
        let   data2 =  {
            labels: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
            datasets: [{
                label: 'Purchase',
                // backgroundColor: 'white',
                borderColor: '#1f888a',
                data: [this.Total_purchase()]
            }]
        }
        let   data3 =  {
            labels: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
            datasets: [{
                label: 'Payment',
                // backgroundColor: 'white',
                borderColor: '#1f888a',
                data: [this.Total_payment()]
            }]
        }
        return(
            <div className = "charts_pro">
                <div className = "report_upper">
                    <div className = "left_head">
                        Sales Report
                    </div>
                    <div className = "report_icons">
                        <span>
                            <input type="month" />
                        </span>
                        <span className = "menu" onClick = {() => {
                            this.setmode('grid')
                        }}>
                            <img className = {this.state.mode === 'grid'? 'black' : 'blue'} src = {menu} alt = ''  />
                            <img className = {this.state.mode === 'grid'? 'blue' : 'black'} id = "blue_grid"  src = {blue_menu} alt = ''  />
                        </span>
                        <span className = "menu" onClick = {() => {
                            this.setmode('graph')
                        }}>
                            <img className = {this.state.mode === 'graph'? 'black' : 'blue'}
                            src = {graph_icon} alt = '' />
                            <img className = {this.state.mode === 'graph'? 'blue' : 'black'} src = {blue_graph} alt = '' />
                        </span>
                       
                        </div>
                        
                    </div>
                    {this.state.mode === 'graph' ? (
                        <div className = "report_box">
                            <div className = "chart_pro">
                                <Line data = {data1} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className = "chart_pro">
                                <Line data = {data2} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className = "chart_pro">
                                <Line data = {data3} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className = "chart_pro">
                                <Line data = {data1} options={{ maintainAspectRatio: false }} />
                            </div>
                         </div>
                             ) : (
                             <div className = "grid_report ">
                                <div className = "grid_box ">
                                    <div className = "grid_tab ul">
                                      <div>Sales</div>
                                      <div>
                                        <span className = "value">{this.Total_sales()}</span>
                                        <span className = "percent">-60%</span>
                                      </div>
                                    </div>
                                    <div className = "grid_tab ur">
                                        <div>Purchase</div>
                                        <div>
                                            <span className = "value">{this.Total_purchase()}</span>
                                            <span className = "percent">-60%</span>
                                        </div>
                                    </div>
                                     <div className = "grid_tab bl">
                                        <div>Payment</div>
                                        <div>
                                            <span className = "value">{this.Total_payment()}</span>
                                            <span className = "percent">-60%</span>
                                        </div>
                                    </div>
                                    <div className = "grid_tab br">
                                        <div>Goods Return</div>
                                        <div>
                                             <span className = "value"></span>
                                            <span className = "percent"></span>
                                         </div> 
                                    </div>
                                </div>
                             </div>    
                             )}
                
            </div>
        )
    }
}