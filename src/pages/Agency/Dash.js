import React from "react";
import add_acc_big from "assets/icons/add_acc.svg";
// import add_agents from '../img/add_agents.svg'
import add_rep from "assets/icons/add_rep.svg";
// import add_trans from '../img/add_trans.svg'
import { Bar, Line, Pie } from "react-chartjs-2";

class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 10
    };
  }
  render() {
    let data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 15, 25, this.state.data, 10],
          backgroundColor: [
            "#29A8AB",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "#29A8AB",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };
    // ,    options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }

    return (
      <div className="Dash">
        <div className="dash_con">
          <div className="empty_con ">
            <div onClick={this.props.addAccBtn} className="add_acc_big empty_box empty_box1">
              <img src={add_acc_big} alt="" />
              <h1>Add Accounts</h1>
            </div>
            <div className="add_trans_big empty_box empty_box1">
              <img src={add_rep} alt="" />
              <h1>Add Transactions</h1>
            </div>
          </div>

          <div className="empty_con_text">
            <p>
              Nothing Here to show,
              <br /> Start by adding accounts and much more.
            </p>
          </div>

          <div className="empty_con ">
            <div className="empty_box empty_box2">
              <img src={add_rep} alt="" />
              <h1>Add Reports</h1>
            </div>
            <div className="empty_box empty_box2">
              <img src={add_rep} alt="" />
              <h1>Add Agents</h1>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="chart">
            <div className="chart_con">
              {" "}
              <Bar data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="chart">
            <div className="chart_con">
              <Line data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="chart">
            <div className="chart_con">
              {" "}
              <Pie data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dash;
