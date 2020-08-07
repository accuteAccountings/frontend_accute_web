import React from 'react'
import Chart from 'react-apexcharts'
import product from '../img/product.svg'
import rich from '../img/rich.svg'
import truck from '../img/truck.svg'
import up from '../img/up-arrow.svg'

export default class DailyBook extends React.Component{

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
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        
        series1: [
          {
            name: "sales",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
            color : "#0040FF"
          },
  
        ],
        series2: [
      
          {
            name: "purchase",
            data: [30 , 50 , 60 , 80 , 100 , 135 , 150 , 160],
            color : "#FF0040"
          },
        ],

       options2 : {
        
          labels: ['Direct Sales', 'Referal Sales', 'Affilate Sales'],
        
        dataLabels : {enabled : false}
       }

        
      }
    }


    render(){
 
        return(
            <div className = "daily_book">
                <div className = "upper_db">
                   <Det_bar 
                    src = {product}
                    head = "Total Sales"
                    />
                   <Det_bar 
                    src = {rich}
                    head = "Payments"
                   />
                   <Det_bar 
                    src = {truck}
                    head = "Good Returns"
                   />
                   
                </div>

                <div className = "middle_db">
                  <div className = "middle_db_lt">
                  <Graph_cont 
                    options = {this.state.options}
                    series = {this.state.series1}
                    lower = {true}
                    />
                    <Graph_cont 
                    options = {this.state.options}
                    series = {this.state.series2}
                    lower = {false}
                    />
                  
                </div>
                <div className ="donut">
                  <div className = "donut_div">
                    <Chart
                    options = {this.state.options2}
                    series ={[10 ,20 , 30]}
              
                    type = "donut"
                    width = "100%"
                    height = "80%" />
                  </div>
                </div>
              </div>

            <div className = "lower_db">
              <div className = "upper">
                <div className = "hd">ACTIVE USERS</div>  
              </div>
              <div className = "lower">
                <div className = "id">Id.</div>
                <div className = "name_city">Account Name</div>
                <div className = "status">Payment Status</div>
                <div className = "balance">Balance</div>
                <div className = "action">Actions</div>
              </div>
              <User_Det 
              id = "1"
              acc = "Sushant Textiles"
              city = "Patna, Bihar"
              payment = "PENDING"
              balance = "$466"/>
              <User_Det 
              id = "2"
              acc = "Sushant Textiles"
              city = "Patna ,Bihar"
              payment = "PENDING"
              balance = "$466"/>
              <User_Det 
              id = "3"
              acc = "Sushant Textiles"
              city = "Patna, Bihar"
              payment = "PENDING"
              balance = "$466"/>
              <User_Det 
              id = "4"
              acc = "Sushant Textiles"
              city = "Patna, Bihar"
              payment = "PENDING"
              balance = "$466"/>
              <User_Det 
              id = "5"
              acc = "Sushant Textiles"
              city = "Patna, Bihar"
              payment = "PENDING"
              balance = "$466"/>
              <User_Det 
              id = "6"
              acc = "Sushant Textiles"
              city = "Patna , Bihar"
              payment = "PENDING"
              balance = "$466"/>
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
            <span className = "val">589</span>
          </div>
          <div className = {props.lower ? 'lower_three' : 'lower_four' }>purchase</div>
      </div>

    </div>
    <div className = "chart">
        <Chart
        options={props.options}
        series={props.series}
        width="70%"
        type = "line"
        height = "100"
      
      />
    </div>
    <div className = {props.lower ? 'lower_gp_one' : 'lower_gp_two'}>
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
      <div className = "num">1896 
        <div className = "perc">
          50%<img src = {up} />
        </div>
      </div>
    </div>
  </div>
  )
} 

const User_Det = (props) => {
  return(
    <div className = {parseInt(props.id)%2 === 0 ? 'lower_ud_even' : 'lower_ud_odd'  }>
    <div className = "id">{props.id}</div>
    <div className = "name_city">
      <div className = "acc_name">{props.acc}</div>
      <div className = "city">{props.city}</div>
    </div>
    <div className = "status"><span>{props.payment}</span></div>
    <div className = "balance">{props.balance}</div>
    <div className = "action"><span>Details</span></div>
  </div>
  )
}
