import React from "react";
import cross from "assets/icons/cancel.svg";

export default class Contact extends React.Component {
  render() {
    return (
      <div className="Contact">
        <div className="contact_white_back"></div>
        <div className="contact_head">
          <div className="contact_heading">
            Contact Us
            <div className="contact_subhead">We will reach you asap!</div>
          </div>

          <div className="cross_div">
            <img className="gotohomebtn" src={cross} alt=" " onClick={this.props.gotohome} />
          </div>
        </div>

        <div className="form_contact">
          <div className="contact_name">
            <input type="text" name="full_name" placeholder="First Name" required />
            <input className="last_name_cu" type="text" name="full_name" placeholder="Last Name" required />
          </div>

          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Phone Number" required />
          <br />
          <br />
          <textarea type="text" placeholder="Message" required />

          <div className="form_btn">
            <button className="submit_contact">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
