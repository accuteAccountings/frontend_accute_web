import React from "react";
import FeaturesCard from "./FeaturesCard";

class Features extends React.Component {
  render() {
    return (
      <div className="feat_back">
        <div className="features_con">
          <FeaturesCard />
          <FeaturesCard />
          <FeaturesCard />
          <FeaturesCard />
        </div>
      </div>
    );
  }
}

export default Features;
