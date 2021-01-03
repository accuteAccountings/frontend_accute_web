import React , {useState , useEffect} from 'react'
import Chart from 'react-apexcharts'
import product from 'assets/icons/product.svg'
import rich from 'assets/icons/rich.svg'
import truck from 'assets/icons/truck.svg'
import up from 'assets/icons/up-arrow.svg'

export default class DailyBook extends React.Component{

  Account_data = () => {

    fetch('/api/vouch/specific/Test1')
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState(() => {
            return {
              bal : data
            };
          });
        }
      })
      return
  }

  totalDebit = (acc_name) => {
    let t = 0;

    this.state.bal.map(e => {
      if (e.supplier === acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      } else if (e.debit_acc === acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    });

    return t;
  };

  totalCredit = (acc_name) => {
    let t = 0;

    this.state.bal.map(e => {
      if (e.customer === acc_name) {
        t = parseInt(t) + parseInt(e.totalAmt);
      } else if (e.credit_acc === acc_name) {
        t = parseInt(t) + parseInt(e.amount) - parseInt(e.balance);
      }
    })
    return t;
  }


   getSales = async() => {
    await fetch('/api/vouch/TotalSales')
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

  }

  getPayment = async() => { 
    await fetch(`/api/jovouch/TotalPayment`)
    .then((res) => res.json())
    .then((data) => {
      if(data){
        this.setState(() => {
          return{
            payments : data
          }
        })
      }
    })
  }

  DayWiseSales = (num) => {

    let t = 0

    let date = new Date()
    let today = date.getDate()
    let cdate = parseInt(num)*3 + 3
    if(parseInt(cdate) - parseInt(today) > 0 && parseInt(cdate) - parseInt(today) >= 3){
      return null;
  }

     this.state.sales.map((e , i) => {
      i == num && (
        e.map((x) => {
          x.type == 'purchase' && (
           t = parseInt(t) + parseInt(x.totalAmt)
          )
        })
      )
    })
  
    return t
  }

  DayWisepurchase = (num) => {

    let t = 0

    let date = new Date()
    let today = date.getDate()
    let cdate = parseInt(num)*3 + 3
    if(parseInt(cdate) - parseInt(today) > 0 && parseInt(cdate) - parseInt(today) >= 3){
      return null;
  }

     this.state.payments.map((e , i) => {
      i == num && (
        e.map((x) => {
          t = parseInt(t) + parseInt(x.amount) - x.balance
        })
      )
    })
  
    return t
  }


  Total_sales = (arr) => {

    let t = 0

    arr.map( (e) => {
              e.map((x) => {
                  t = parseInt(t) + parseInt(x.totalAmt)
              })
          })
          return t;
      
}

number_goods = () => {
  let t = 0

  this.state.sales.map( (e) => {
    e.map((x) => {
      x.type !== 'purchase' && (
                t = parseInt(t) + 1
      )}
      )
        })

  return t
}
number_sales = () => {
  let t = 0

  this.state.sales.map( (e) => {
    e.map((x) => {
      x.type == 'purchase' && (
                t = parseInt(t) + 1
      )}
      )
        })

  return t
}


Total_goods = (arr) => {

  let t = 0

  arr.map( (e) => {
    e.map((x) => {
      x.type !== 'purchase' && (
                t = parseInt(t) + parseInt(x.totalAmt)
      )
    })
        })

        return t;
    
}


Total_payments = (arr) => {

  let t = 0

  arr.map( (e) => {
    e.map((x) => {
                t = parseInt(t) + parseInt(x.amount) - x.balance
    })
        })
        return t;
    
}

Date = (gdate) => {
  let date = new Date()
  let year = date.getFullYear()
  let month = parseInt(date.getMonth())

  let monthArr = ['January' , 'February' , 'March' , 'April' , 'May' , 'June',
         'July' , 'August' , 'September' , 'October' , 'November' , 'December']

  let fdate = year + '-' + monthArr[month] + '-' + gdate
  let today = date.getDate()
  if(parseInt(gdate) - parseInt(today) > 0 && parseInt(gdate) - parseInt(today) >= 3){
      return '';
  }
  return fdate;
}

number_payments = () => {
  let t = 0

  this.state.payments.map( (e) => {
    e.map((x) => {
      x.amount && (
                t = parseInt(t) + 1
      )
    })
        })
        return t;
}

getAccounts = () => {
  fetch("/api/accounts?mode=newest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}

  constructor(props) {
    super(props);

      this.state = {
        options: {
          chart: {
            sparkline: {
              enabled: true
            }
          },
          xaxis: {
            categories: [ this.Date(3), this.Date(6), this.Date(9), this.Date(12), this.Date(15),
              this.Date(18), this.Date(21), this.Date(24), this.Date(27) , this.Date(31) ]
          }
        },
  

       options2 : {
        
          labels: ['Direct Sales', 'Referal Sales', 'Affilate Sales'],
        
        dataLabels : {enabled : false}
       },
       sales : [],
       payments : [],
       accounts : [],
       bal : []
      }


    }
componentDidMount(){
  this.getSales()
  this.getPayment()
  this.Account_data()
  this.getAccounts()

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
}
    render(){
 
        return(
            <div className = "daily_book">
                <div className = "upper_db">
                   <Det_bar 
                    src = {product}
                    head = "Total Sales"
                    value = {this.Total_sales(this.state.sales)}
                    bills = {this.number_sales()}
                    />
                   <Det_bar 
                    src = {rich}
                    head = "Payments"
                    value = {this.Total_payments(this.state.payments)}
                    bills = {this.number_payments()}
                   />
                   <Det_bar 
                    src = {truck}
                    head = "Good Returns"
                    value = {this.Total_goods(this.state.sales)}
                    bills = {this.number_goods()}
                   />
                   
                </div>

                <div className = "middle_db">
                  <div className = "middle_db_lt">
                  <Graph_cont 
                    options = {this.state.options}
                    series = {   [
                      {
                        name : "sales",
                        data : [this.DayWiseSales(0), this.DayWiseSales(1), this.DayWiseSales(2), this.DayWiseSales(3),
                          this.DayWiseSales(4), this.DayWiseSales(5), this.DayWiseSales(6), this.DayWiseSales(7) ,
                          this.DayWiseSales(8) ,  this.DayWiseSales(9)],
                        color : "#0040FF"
                      }]}
                    lower = {true}
                    cat = 'Sales'
                    sales = {this.Total_sales(this.state.sales)}
                    />
                    <Graph_cont 
                    options = {this.state.options}
                    series = {   [
                      {
                        name : "Payments",
                        data : [this.DayWisepurchase(0), this.DayWisepurchase(1), this.DayWisepurchase(2), this.DayWisepurchase(3),
                          this.DayWisepurchase(4), this.DayWisepurchase(5), this.DayWisepurchase(6), this.DayWisepurchase(7) ,
                          this.DayWisepurchase(8) ,  this.DayWisepurchase(9)],
                        color : "#ff0040"
                      }]}
                    lower = {false}
                    cat = 'Payments'
                    sales = {this.Total_payments(this.state.payments)}
                    />
                  
                </div>
              </div>

            <div className = "lower_db">
              <div className = "table">
                <div className = "upper">
                  <div className = "hd">Pending Payments</div>  
                </div>
                <div className = "lower">
                  <div className = "id">Id.</div>
                  <div className = "name_city">Account Name</div>
                  <div className = "status">Payment Status</div>
                  <div className = "balance">Balance</div>
                  {/* <div className = "action">Actions</div> */}
                </div>
                <div className = "scroller">
                {this.state.accounts.map((e ,i) => {
                  //  this.Account_data(e.acc_name)
                  return(
                    <User_Det 
                    id = {i + 1}
                      acc_id={e.id}
                    acc = {e.acc_real_name}
                    city = {e.address_line1}
                    payment = {this.totalCredit(e.acc_name) - this.totalDebit(e.acc_name)}
                    balance = {this.totalCredit(e.acc_name) - this.totalDebit(e.acc_name)}
                    acc_name = {e.acc_name}
                    Account_data = {this.Account_data}
                    navTo = {this.props.navTo}
                    getspecific_acc = {this.props.getspecific_acc}
                    i = {i}
                    len = {this.state.accounts.length - 1}
                    setAccProfile = {this.props.setAccProfile}
                    />
                  )
                })}
                </div>
             </div>
              <div className ="donut">
                <div className = "donut_div">
                  <Chart
                  options = {this.state.options2}
                  series ={[10 ,20 , 30]}
                  type = "donut"
                  width = "100%"
                  height = "100%" />
                </div>
            </div>
            </div>

            </div>
        )
    }
}

const Graph_cont = (props) => {
  return(
    <div className = "graph_cont">
    <div className = "value">
        
        <div className = "value_lt">
          <div>
            <span className = "dollar">$</span>
            <span className = "val">{props.sales}</span>
          </div>
          <div className = {props.lower ? 'lower_three' : 'lower_four' }>{props.cat}</div>
      </div>

    </div>
    <div className = "chart">
        <Chart
        options={props.options}
        series={props.series}
        width="80%"
        type = "line"
        height = "100"
      
      />
    </div>


  </div>
  )
}

const Det_bar = (props) => {
  return(
    <div className = "det_db_bar">
    <div className = "img_bar">
      <img src = {props.src} alt = " " />
    </div>
    <div className = "middle">
      <div className = "head">{props.head} <div className = "fade">This month</div></div>
      <div className = "num">{props.value} 
        <div className = "perc">
          for {props.bills} bills
        </div>
      </div>
    </div>
  </div>
  )
} 

const User_Det = (props) => {
  const [total_bal , setTotal_bal] = useState(0)

  useEffect(() => {
    fetch(`/api/ledger_balance/total?supplier=${props.acc}`)
    .then(res => res.json())
    .then((data) => {
      if(data.error){
        alert(data.error)
      }
      else{
        setTotal_bal(data.balance)
      }
    })
  } , [])
  return(<>
    { parseInt(total_bal) > 0 ?(
    <div className = {parseInt(props.id)%2 === 0 ? 'lower_ud_even' : 'lower_ud_odd'  }>
    <div className = "id">{props.id}</div>
    <div className = "name_city">
      <a className = "acc_name" href={"/agency/acc-profile/" + props.acc_id}>{props.acc}</a>
      <div className = "city">{props.city}</div>
    </div>
    <div className = {props.payment == 0 ? 'completed' : 'status'}><span>{props.payment == 0 ? 'Completed' : 'Pending'}</span></div>
    <div className = "balance"><span>{total_bal} {' '} Cr</span></div>
    {/* <div className = "action" onClick = {async() => {
      await props.getspecific_acc(props.len - props.i)
      await props.setAccProfile('ledger')
      await props.navTo('accounting')
      
    }}><span>Open Ledger</span></div> */}
  </div>):""}
  </>
  )
}
