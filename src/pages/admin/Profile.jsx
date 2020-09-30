import React from "react";
import Button from "components/Button";

export default class Profile extends React.Component {

  state = {
    user : null
  }

   componentDidMount = async() => {

    const { id } = this.props.match.params;

    await fetch(`/api/users/specific?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if(data){
        this.setState(() => {
          return{
            user : data
          }
        })
        
      }
    })

  }

  render() {
   
    return (
      <div className="profile_con">
        {this.state.user != null && 
        <div className="profile_details_con">
          <img
            className="profile_img"
            src={ this.state.user.pro_img  || "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png" }
            alt=" "
          />
          <div className="details_con">
            <div className="top_details_con">
              <div className="top_details_left_con">
                <div>
                  <span className="account_name">{this.state.user.full_name}</span>
                  <span className="account_id">{this.state.user.id}</span>
                </div>
                <div>
                  <span className="account_company"></span>
                </div>
              </div>
              <div className="top_details_right_con">
                <div>
                  <label>Member Since : </label>
                  {this.state.user.createdAt.slice(0,10)}
                </div>
                <div>{this.state.user.createdAt.slice(11 , 16)}</div>
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
                  <label>Address : </label> {this.state.user.address}
                </span>
              </div>
              <div>
                <span>
                  <label>Mobile : </label> {this.state.user.phone_num}
                </span>
                <span>
                  <label>Email : </label> {this.state.user.email}
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
}
