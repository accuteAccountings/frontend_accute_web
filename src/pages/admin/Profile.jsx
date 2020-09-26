import React from "react";
import Button from "components/Button";

export default class Profile extends React.Component {

  render() {
    let user = this.props.user
    return (
      <div className="profile_con">
        <div className="profile_details_con">
          <img
            className="profile_img"
            src={ user.pro_pic || "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png" }
            alt=" "
          />
          <div className="details_con">
            <div className="top_details_con">
              <div className="top_details_left_con">
                <div>
                  <span className="account_name">{user.full_name}</span>
                  <span className="account_id">{user.id}</span>
                </div>
                <div>
                  <span className="account_company">{user.company_name}</span>
                </div>
              </div>
              <div className="top_details_right_con">
                <div>
                  <label>Member Since : </label>
                  {user.createdAt.slice(0,10)}
                </div>
                <div>{user.createdAt.slice(11 , 16)}</div>
              </div>
            </div>
            <div className="mid_details_con">
              <div>
                <span>
                  <label>Age : </label> 56
                </span>
                <span>
                  <label>Gender : </label> Male
                </span>
              </div>
              <div>
                <span>
                  <label>Address : </label> {user.address}
                </span>
              </div>
              <div>
                <span>
                  <label>Mobile : </label> {user.phone_num}
                </span>
                <span>
                  <label>Email : </label> {user.email}
                </span>
              </div>
              <div>
                <span>
                  <label>GST No. : </label> VHDAOCI94324234
                </span>
              </div>
            </div>
            <div className="bottom_details_con">
              <Button type="blue">Active</Button>
              <Button type="green">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
