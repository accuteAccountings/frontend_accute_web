import React from "react";
import samplesvg from "../img/svg/menu.svg";

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      datavalue: 0,
    };
  }

  render() {
    return (
      <div>
        <div className="data_con">
          <div className="data_items">
            {" "}
            <img src={samplesvg} alt="" />{" "}
            <span className="data_value">121</span>
            <br /> <span className="data_text"> Sleepless Hours</span>
          </div>
          <div className="data_items">
            {" "}
            <img src={samplesvg} alt="" />{" "}
            <span className="data_value">123</span>
            <br /> <span className="data_text"> Sleepless Hours</span>
          </div>
          <div className="data_items">
            {" "}
            <img src={samplesvg} alt="" />{" "}
            <span className="data_value">123</span>
            <br /> <span className="data_text"> Sleepless Hours</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Data;
