import React from "react";
import map from "../img/svg/map.svg";

class ContactDet extends React.Component {
  render() {
    return (
      <div className="cont_det_con">
        <div className="detItems">
          <div className="det_img">
            <img src={map} alt="" />
          </div>
          <div className="det_body">
            <h1>Office</h1>
            <p>19.A 8th Street, Theni</p>
          </div>
        </div>
        <div className="detItems">
          <div className="det_img">
            <img src={map} alt="" />
          </div>
          <div className="det_body">
            <h1>Office</h1>
            <p>19.A 8th Street, Theni</p>
          </div>
        </div>
        <div className="detItems">
          <div className="det_img">
            <img src={map} alt="" />
          </div>
          <div className="det_body">
            <h1>Office</h1>
            <p>19.A 8th Street, Theni</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactDet;
