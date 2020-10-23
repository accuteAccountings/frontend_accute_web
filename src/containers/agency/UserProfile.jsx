import React from "react";
import SampleUserPic from "assets/icons/user.svg"
import Button from "components/Button";
import {getData} from "helper/Fetch"

export default function UserProfile() {

console.log(getData("/api/profile/details"))

    return (
      <div className="profile_con">
        {true && 
        <div className="profile_details_con">
          <img
            className="profile_img"
            src={ SampleUserPic }
            alt=" "
          />
          <div className="details_con">
            <div className="top_details_con">
              <div className="top_details_left_con">
                <div>
                  <span className="account_name">{"TUshar"}</span>
                  <span className="account_id">{"#f4tr34"}</span>
                </div>
                <div>
                  <span className="account_company"></span>
                </div>
              </div>
              <div className="top_details_right_con">
                <div>
                  <label>Member Since : </label>
                  {"sadfads"}
                </div>
                <div>{"fasdf"}</div>
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
                  <label>Address : </label> {"fasdf"}
                </span>
              </div>
              <div>
                <span>
                  <label>Mobile : </label> {"usraedf"}
                </span>
                <span>
                  <label>Email : </label> {"Users"}
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
        </div> }
      </div>
    );
  }
