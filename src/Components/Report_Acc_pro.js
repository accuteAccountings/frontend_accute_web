import React from 'react';
import {Line, Bar} from 'react-chartjs-2';
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
                labels : ['' , this.DateWW('5') , this.DateWW('10') , this.DateWW('15') , this.DateWW('20') , this.DateWW('25'),
                 this.DateWW('31')],
                data_sales : [ 0 , this.Total_sales_WW('1'), this.Total_sales_WW('2'), this.Total_sales_WW('3'), this.Total_sales_WW('4') ,
             this.Total_sales_WW('5') , this.Total_sales_WW('6') ],
                purchase : [ 0 , this.Total_purchase_WW('1') , this.Total_purchase_WW('2') , this.Total_purchase_WW('3') , this.Total_purchase_WW('4') ,
              this.Total_purchase_WW('5') , this.Total_purchase_WW('6')],
                payment : [ 0 , this.Total_payment_WW('1') , this.Total_payment_WW('2') , this.Total_payment_WW('3') , this.Total_payment_WW('4') ,
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
            labels : [this.DateX('9'), this.DateX('8') , this.DateX('7') ,this.DateX('6'), this.DateX('5') , this.DateX('4'), this.DateX('3') , this.DateX('2') ,
            this.DateX('1') , this.DateX('0')],
            data_sales : [ this.Sales_DW('9') , this.Sales_DW('8') , this.Sales_DW('7') , this.Sales_DW('6'), this.Sales_DW('5'), this.Sales_DW('4'), this.Sales_DW('3') , this.Sales_DW('2'),
             this.Sales_DW('1') , this.Sales_DW('0') ],
             purchase : [ this.Purchase_DW('9') , this.Purchase_DW('8') , this.Purchase_DW('7') , this.Purchase_DW('6'), this.Purchase_DW('5'), this.Purchase_DW('4'), this.Purchase_DW('3') , this.Purchase_DW('2'),
             this.Purchase_DW('1') , this.Purchase_DW('0') ],
             payment : [this.Payment_DW('9') , this.Payment_DW('8') , this.Payment_DW('7') , this.Payment_DW('6'), this.Payment_DW('5'), this.Payment_DW('4'), this.Payment_DW('3') , this.Payment_DW('2'),
             this.Payment_DW('1') , this.Payment_DW('0') ],
        }
    })
            
        }

        if(ans == 'three_months'){
            await fetch(`/api/report/threeMonths?supplier=${this.props.acc_name}`)
            .then((res) => res.json())
            .then((data) => {
                if(data){
                    this.setState(() => {
                        return{
                            monthdata : data
                        }
                    })
                }
            })

            await this.setState(() => {
                return{
                    labels : [ '', this.Date_MW('2' , '14'), this.Date_MW('2' , '31') , this.Date_MW('1' , '14'), this.Date_MW('1.' , '31') 
                        , this.Date_MW('0' , '14') , this.Date_MW('0' , '31') ],
                    data_sales : [ 0 , this.Sales_MW('0'), this.Sales_MW('1'), this.Sales_MW('2'), this.Sales_MW('3') , this.Sales_MW('4'),
                     this.Sales_MW('5') ],
                     purchase : [0 , this.Purchase_MW('0') , this.Purchase_MW('1') , this.Purchase_MW('2') , this.Purchase_MW('3') ,
              this.Purchase_MW('4') , this.Purchase_MW('5')],
                     payment : [ 0 , this.Payment_MW('0'), this.Payment_MW('1'), this.Payment_MW('2'), this.Payment_DW('3') , this.Payment_MW('4'),
                     this.Payment_MW('5')],
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
        let year = date.getFullYear()
        let monthArr = ['January' , 'February' , 'March' , 'April' , 'May' , 'June',
         'July' , 'August' , 'September' , 'October' , 'November' , 'December']
        let cdate = parseInt(i)
        let today = date.getDate()
        if(cdate - parseInt(today) > 0 && cdate - parseInt(today) > 5){
            return '';
        }
        if(cdate > 25){
            cdate = this.getDaysInMonth(month + 1 , year)
        }
        var finaldate =  cdate + ' ' + monthArr[month]

        return finaldate;
    }

    Date_MW = (m,d) => {
        var date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() -parseInt(m)
        let monthArr = ['January' , 'February' , 'March' , 'April' , 'May' , 'June',
         'July' , 'August' , 'September' , 'October' , 'November' , 'December']
        let cdate =  parseInt(d)
        let today = date.getDate()
        if(cdate - parseInt(today) > 0 && cdate - parseInt(today) > 14 && month == date.getMonth()){
            return '';
        }
        if(parseInt(cdate) < 10){
            cdate = '0' + cdate
        }
        if(cdate > 14){
            cdate = this.getDaysInMonth(month + 1 , year)
        }
        var finaldate =  cdate + ' ' + monthArr[month]

        return finaldate
    }

     getDaysInMonth = (month,year) => {

       return new Date(year, month, 0).getDate();
      };

    Sales_MW = (ans) => {
        let t = 0
        this.state.monthdata.map((e , i) => {
            i == ans && (
                e.vouch.map(x => {
                    x.supplier === this.props.acc_name && (
                        t = parseInt(t) + parseInt(x.totalAmt)
                        )
                })
        
            )
        })
        return t;
    }

    Purchase_MW = (ans) => {
        let t = 0
    
            this.state.monthdata.map((e,i) => {
                i == ans && (
                    e.vouch.map(x => {
                        x.customer === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.totalAmt)
                            )
                    })
            
                )
            })
        return t;
    }

    Payment_MW = (ans) => {
        let t = 0
            this.state.monthdata.map((e,i) => {
                i == ans && (
                    e.jovouch.map(x => {
                        x.credit_acc === this.props.acc_name && (
                            t = parseInt(t) + parseInt(x.amount - x.balance)
                            )
                    })
            
                )
            })
        return t;
    
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
        if(this.DateWW(parseInt(ans)*5)){
        this.state.weekdata.map((e , i) => {
            i == parseInt(ans-1) && (
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
        if(this.DateWW(parseInt(ans)*5)){
            this.state.weekdata.map((e,i) => {
                i == parseInt(ans - 1) && (
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
        if(this.DateWW(parseInt(ans)*5)){
            this.state.weekdata.map((e,i) => {
                i == parseInt(ans - 1) && (
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
    else if(ans == 'three_months'){
        this.state.monthdata.map(e => {

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
    else if(ans == 'three_months'){
        this.state.monthdata.map(e => {

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
    else if(ans == 'three_months'){
        this.state.monthdata.map(e => {
            e.jovouch.map(x => {
                x.credit_acc === this.props.acc_name && (
                    t = parseInt(t) + parseInt(x.amount - x.balance)
                )
                
            })
            
    })    
    }
        return t;
    }


componentDidMount(){
    this.WeekWiseData()
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
            monthdata : [],
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
                backgroundColor: '#29a8ab',
                borderColor: '#1f888a',
                color : 'black',
                data: this.state.data_sales,
                tension: 0,
            }]
        }
        let   data2 =  {
            labels: this.state.labels,
            datasets: [{
                label: 'Purchase',
                display: true,
                backgroundColor: '#29a8ab',
                borderColor: '#1f888a',
                data: this.state.purchase,
                tension: 0
            }]
        }
        let   data3 =  {
            labels: this.state.labels,
            datasets: [{
                label: 'Payment',
                backgroundColor: '#29a8ab',
                borderColor: '#1f888a',
                data: this.state.payment,
                tension: 0
            }]
        }

        
        return(
            <div className = "charts_pro">
                <div className = "report_upper">
                    <div className = "left_head">
                    </div>
                    <div className = "report_icons">
                        <span>
                            <select name = "period" id="report_period" onChange = {this.WeekWiseData} defaultValue='seven_days' >
                                <option value = "this_month" >This Month</option>
                                <option value = "seven_days">Last 10 Days</option>
                                <option value = "three_months">Last 3 Months</option>
                            </select>
                        </span>
                        </div>
                        
                    </div>
            
                        <div className = "report_box">
                            <div className = "chart_pro">
                                <Bar data = {data1} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className = "chart_pro">
                                <Bar data = {data2} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className = "chart_pro">
                                <Bar data = {data3} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className = "chart_pro">
                                <Bar data = {data1} options={{ maintainAspectRatio: false }} />
                            </div>
                         </div>
                            
            </div>
        )
    }
}