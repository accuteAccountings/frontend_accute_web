import React from 'react';
import {Line} from 'react-chartjs-2';
import graph_icon from '../img/graph_view.svg'
import menu from '../img/grid.svg'
import blue_menu from '../img/blue_grid.svg'
import blue_graph from '../img/blue_graph.svg'

export default class Report_pro extends React.Component{

    WeekWiseData = async() => {
        
    let ans = await document.getElementById('report_period').value

        if(ans === 'this_month'){

        await fetch(`/api/report/sales?supplier=${this.props.acc_name}`)
        .then((res) => res.json())
        .then((data) => {
            if(data){
                this.setState(() => {
                    return{
                        weekdata : data
                    }
                })
            }
        })

       
       await this.setState(() => {
            return{
                labels : [this.DateWW('1') , this.DateWW('5') , this.DateWW('10') , this.DateWW('15') , this.DateWW('20') , this.DateWW('25'),
                 this.DateWW('31')],
                data_sales : [ '0' , this.Total_sales_WW('1'), this.Total_sales_WW('2'), this.Total_sales_WW('3'), this.Total_sales_WW('4') ,
             this.Total_sales_WW('5') , this.Total_sales_WW('6') ],
                purchase : ['0' , this.Total_purchase_WW('1') , this.Total_purchase_WW('2') , this.Total_purchase_WW('3') , this.Total_purchase_WW('4') ,
              this.Total_purchase_WW('5') , this.Total_purchase_WW('6')],
                payment : ['0' , this.Total_payment_WW('1') , this.Total_payment_WW('2') , this.Total_payment_WW('3') , this.Total_payment_WW('4') ,
                this.Total_payment_WW('5') , this.Total_payment_WW('6')]
            }
        })

    }
        if(ans === 'seven_days'){
            await fetch(`/api/report/daywise?supplier=${this.props.acc_name}`)
            .then((res) => res.json())
            .then((data) => {
                if(data){
                    this.setState(() => {
                        return{
                            dayData : data
                        }
                    })
                }
            })
                
       await this.setState(() => {
        return{
            labels : [ this.DateX('0'), this.DateX('1') , this.DateX('2'), this.DateX('3') , this.DateX('4') ,
            this.DateX('5') , this.DateX('6')],
            data_sales : [this.Sales_DW('0'), this.Sales_DW('1'), this.Sales_DW('2'), this.Sales_DW('3') , this.Sales_DW('4'),
             this.Sales_DW('5') , this.Sales_DW('6') ],
             purchase : [this.Purchase_DW('0'), this.Purchase_DW('1'), this.Purchase_DW('2'), this.Purchase_DW('3') , this.Purchase_DW('4'),
             this.Purchase_DW('5') , this.Purchase_DW('6') ],
             payment : [this.Payment_DW('0'), this.Payment_DW('1'), this.Payment_DW('2'), this.Payment_DW('3') , this.Payment_DW('4'),
             this.Payment_DW('5') , this.Payment_DW('6') ],
        }
    })
            
        }

        let sales = await this.Total_sales(ans)
        let purchase = await this.Total_purchase(ans)
        let payment = await this.Total_payment(ans)
        await  this.setState(() => {
             return{
                 sales_val : sales,
                 payment_val : payment,
                 purchase_val : purchase
             }
         })

    }


    DateX = (i) => {
        var date = new Date()
        let month = date.getMonth()
        let monthArr = ['January' , 'February' , 'March' , 'April' , 'May' , 'June',
         'July' , 'August' , 'September' , 'October' , 'November' , 'December']
        let cdate = date.getDate() - parseInt(i)
        if(parseInt(cdate) < 10){
            cdate = '0' + cdate
        }
        var finaldate =  cdate + ' ' + monthArr[month]

        return finaldate;
    }

    DateWW = (i) => {
        var date = new Date()
        let month = date.getMonth()
        let monthArr = ['January' , 'February' , 'March' , 'April' , 'May' , 'June',
         'July' , 'August' , 'September' , 'October' , 'November' , 'December']
        let cdate = parseInt(i)
       
        var finaldate =  cdate + ' ' + monthArr[month]

        return finaldate;
    }

    Sales_DW  = (i) => {
        var date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let cdate = date.getDate() - parseInt(i)
        if(parseInt(cdate) < 10){
            cdate = '0' + cdate
        }
        var finaldate = year + '-' + '0' + month + '-' + cdate

        let t = 0



    this.state.dayData.map(e => {
            e.vouch.map(x => {
                x.bill_date === finaldate && (
                x.supplier === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.totalAmt)
                )
                )
            })
            
    })        

    return t;
    }

    Purchase_DW = (i) => {
        var date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let cdate = date.getDate() - parseInt(i)
        if(parseInt(cdate) < 10){
            cdate = '0' + cdate
        }
        var finaldate = year + '-' + '0' + month + '-' + cdate

        let t = 0



    this.state.dayData.map(e => {
            e.vouch.map(x => {
                x.bill_date === finaldate && (
                x.customer === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.totalAmt)
                )
                )
            })
            
    })        

    return t;
    }

    Payment_DW = (i) => {
        var date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let cdate = date.getDate() - parseInt(i)
        if(parseInt(cdate) < 10){
            cdate = '0' + cdate
        }
        var finaldate = year + '-' + '0' + month + '-' + cdate

        let t = 0



    this.state.dayData.map(e => {
            e.jovouch.map(x => {
                x.bill_date === finaldate && (
                x.credit_acc === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.amount - x.balance)
                )
                )
            })
            
    })        

    return t;
    }

    Total_sales_WW = (ans) => {
        let t = 0
        if(ans == '1'){
        this.state.weekdata.map((e,i) => {
            i == 0 && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '2'){
        this.state.weekdata.map((e,i) => {
            i == 1 && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '3'){
        this.state.weekdata.map((e,i) => {
            i == 2 && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '4'){
        this.state.weekdata.map((e,i) => {
            i == 3 && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '5'){
        this.state.weekdata.map((e,i) => {
            i == 4 && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '6'){
        this.state.weekdata.map((e,i) => {
            i == 5 && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    }

    Total_purchase_WW = (ans) => {
        let t = 0
        if(ans == '1'){
            this.state.weekdata.map((e,i) => {
                i == 0 && (
                    e.vouch.map(x => {
                        x.customer === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.totalAmt)
                            )
                    })
            
                )
            })
        return t;
    }
    else if(ans == '2'){
        this.state.weekdata.map((e,i) => {
            i == 1 && (
                e.vouch.map(x => {
                    x.customer === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '3'){
        this.state.weekdata.map((e,i) => {
            i == 2 && (
                e.vouch.map(x => {
                    x.customer === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '4'){
        this.state.weekdata.map((e,i) => {
            i == 3 && (
                e.vouch.map(x => {
                    x.customer === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '5'){
        this.state.weekdata.map((e,i) => {
            i == 4 && (
                e.vouch.map(x => {
                    x.customer === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '6'){
        this.state.weekdata.map((e,i) => {
            i == 5 && (
                e.vouch.map(x => {
                    x.customer === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }
    }

    Total_payment_WW = (ans) => {
        let t = 0
        if(ans == '1'){
            this.state.weekdata.map((e,i) => {
                i == 0 && (
                    e.jovouch.map(x => {
                        x.credit_acc === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.amount - x.balance)
                            )
                    })
            
                )
            })
        return t;
    }
    else if(ans == '2'){
        this.state.weekdata.map((e,i) => {
            i == 1 && (
                e.jovouch.map(x => {
                    x.credit_acc === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.amount - x.balance)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '3'){
        this.state.weekdata.map((e,i) => {
            i == 2 && (
                e.jovouch.map(x => {
                    x.credit_acc === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.amount - x.balance)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '4'){
        this.state.weekdata.map((e,i) => {
            i == 3 && (
                e.jovouch.map(x => {
                    x.credit_acc === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.amount - x.balance)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '5'){
        this.state.weekdata.map((e,i) => {
            i == 4 && (
                e.jovouch.map(x => {
                    x.credit_acc === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.amount - x.balance)
                        )
                })
        
            )
        })
        return t;
    }
    else if(ans == '6'){
        this.state.weekdata.map((e,i) => {
            i == 5 && (
                e.jovouch.map(x => {
                    x.credit_acc === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.amount - x.balance)
                        )
                })
        
            )
        })
        return t;
    }
    }    

    setmode = (ans) => {
        this.setState(() => {
            return{
                mode : ans
            }
        })
    }

    Total_sales = async(ans) => {

        let t = 0

        if(ans == 'this_month'){
            this.state.weekdata.map((e,i) => {
                    e.vouch.map(x => {
                        x.supplier === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.totalAmt)
                            )
                    })
            })
    }
    else if(ans == 'seven_days'){
        this.state.dayData.map(e => {

            e.vouch.map(x => {
                x.supplier === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.totalAmt)
                )
                
            })
    })     
    }
        return t;
    }

    Total_purchase = async(ans) => {
        let t = 0

        if(ans == 'this_month'){
            this.state.weekdata.map(e => {
                    e.vouch.map(x => {
                        x.customer === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.totalAmt)
                            )
                    })
            
            })
    }
    else if(ans == 'seven_days'){
        this.state.dayData.map(e => {

            e.vouch.map(x => {
                x.customer === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.totalAmt)
                )
                
            })
    })     
    }
        return t;
    }

    Total_payment = async(ans) => {
        let t = 0
        if(ans == 'this_month'){
            this.state.weekdata.map(e => {
               
                    e.jovouch.map(x => {
                        x.credit_acc === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.amount - x.balance)
                            )
                    })
            
                
            })
    }
    else if(ans == 'seven_days'){
        this.state.dayData.map(e => {
            e.jovouch.map(x => {
                x.credit_acc === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.amount - x.balance)
                )
                
            })
            
    })    
    }
        return t;
    }




    constructor(props){
        super(props)

        this.state = {
            mode : 'grid',
            sales : [],
            payment : [],
            weekdata : [],
            labels : [],
            data_sales : [],
            purchase : [],
            payment : [],
            dayData : [],
            sales_val : null,
            payment_val : null,
            purchase_val : null
        }
    }
    render(){
      let   data1 =  {
         
        labels: this.state.labels,
        datasets: [{
                label: 'Sales',
                // backgroundColor: 'white',
                borderColor: '#1f888a',
                data: this.state.data_sales
            }]
        }
        let   data2 =  {
            labels: this.state.labels,
            datasets: [{
                label: 'Purchase',
                // backgroundColor: 'white',
                borderColor: '#1f888a',
                data: this.state.purchase
            }]
        }
        let   data3 =  {
            labels: this.state.labels,
            datasets: [{
                label: 'Payment',
                // backgroundColor: 'white',
                borderColor: '#1f888a',
                data: this.state.payment
            }]
        }

        
        return(
            <div className = "charts_pro">
                <div className = "report_upper">
                    <div className = "left_head">
                    </div>
                    <div className = "report_icons">
                        <span>
                            <select name = "period" id="report_period" onChange = {this.WeekWiseData}>
                            <option>None</option>
                                <option value = "this_month" >This Month</option>
                                <option value = "seven_days">Last 7 Days</option>
                                <option value = "three_months">Last 3 Months</option>
                            </select>
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
                                        <span className = "value">{this.state.sales_val}</span>
                                        <span className = "percent">-60%</span>
                                      </div>
                                    </div>
                                    <div className = "grid_tab ur">
                                        <div>Purchase</div>
                                        <div>
                                            <span className = "value">{this.state.purchase_val}</span>
                                            <span className = "percent">-60%</span>
                                        </div>
                                    </div>
                                     <div className = "grid_tab bl">
                                        <div>Payment</div>
                                        <div>
                                            <span className = "value">{this.state.payment_val}</span>
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