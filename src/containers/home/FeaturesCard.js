import React from "react";
import svg from "assets/icons/menu.svg";

class FeaturesCard extends React.Component {
  render() {
    return (
      <div className="feat_card_con">
        <img src={svg} alt="" />

        <h1>Sleek Design</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem magnam saepe laborum officia,
          cupiditate omnis enim aperiam sequi earum aspernatur reprehenderit ducimus, incidunt iure voluptatem quas?
          Assumenda quis adipisci obcaecati.
        </p>
      </div>
    );
  }
}

export default FeaturesCard;
