import React from "react";

class Pricing extends React.Component {
  render() {
    return (
      <div className="pri_con">
        <div className="pri_head">
          <h1>Pricing</h1>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut quo
            similique veniam officiis{" "}
          </p>
        </div>

        <div className="pri_body">
          <PriCard
            heading={"standard"}
            price={"52"}
            features={["live updates ", "Free Updates", "and More"]}
          />
          <PriCard
            heading={"standard"}
            price={"52"}
            features={["live updates ", "Free Updates", "and More"]}
          />
          <PriCard
            heading={"standard"}
            price={"52"}
            features={["live updates ", "Free Updates", "and More"]}
          />
        </div>
      </div>
    );
  }
}

export default Pricing;

class PriCard extends React.Component {
  render() {
    return (
      <div className="pri_card_con">
        <div className="pri_card_head">
          <h4>{this.props.heading}</h4>
          <h1>
            <span className="dollar">$</span>
            {this.props.price}{" "}
          </h1>
          <hr />
        </div>
        <div className="pri_card_body">
          {this.props.features.map((rr, index) => {
            return <p key={index}>{rr}</p>;
          })}

          <button>SIGN UP</button>
        </div>
      </div>
    );
  }
}
