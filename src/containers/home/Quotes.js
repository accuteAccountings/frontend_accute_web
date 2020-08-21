import React from "react";
import quote_auth_img from "../img/svg/avatar1.jpg";

class Quotes extends React.Component {
  render() {
    return (
      <div className="quotes_con">
        <div className="quote">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            provident, minima veritatis alias iure vero asperiores nisi
            repellendus velit tempora fugit officia ullam, molestiae animi
            cupiditate perspiciatis maxime! Unde, facilis?{" "}
          </p>
          <h2>- JOHN DOE</h2>
          <img src={quote_auth_img} alt="" />
        </div>
      </div>
    );
  }
}

export default Quotes;
