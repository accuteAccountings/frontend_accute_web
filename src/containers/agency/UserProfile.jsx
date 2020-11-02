import React from "react";
import SampleUserPic from "assets/icons/user.svg"
import Button from "../../components/Button";
import {getData} from "helper/Fetch"
import Popup from "../../components/Popup";
import UserProfileEditForm from './UserProfileEditForm'


export default class UserProfile extends React.Component {

constructor(props){


super(props)
this.state = {
userDetails:null,
openEditModal:false,}

}

componentDidMount(){
  this.getD()
}
getD = async ()=>{
const Data = await  getData("/api/profile/details")
this.setState({userDetails:Data})
}
setOpenEditModal=(open) => {
  this.setState({openEditModal:open})
}
resetProfileOnUpdate=(savedUserDetails)=>{
  this.setState({userDetails:savedUserDetails,openEditModal:false})
}

render(){
  console.log(this.state.userDetails)
    return (
      <div className="profile_con">
        {this.state.userDetails && 
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
                  <span className="account_name">{this.state.userDetails.full_name}</span>
                  <span className="account_id">{"#"+this.state.userDetails.id }</span>
                </div>
                <div>
                  <span className="account_company"></span>
                </div>
              </div>
              <div className="top_details_right_con">
                <div>
                  <label>Member Since : </label>
                  {this.state.userDetails.createdAt.slice(0,10)}
                </div>
                <div></div>
              </div>
            </div>
            <div className="mid_details_con">
              <div>
                <span>
                  <label>Age : </label> {this.state.userDetails.age}
                </span>
                <span>
                  <label>Gender : </label> {this.state.userDetails.gender}
                </span>
              </div>
              <div>
                <span>
                  <label>Address : </label> {this.state.userDetails.address}
                </span>
              </div>
              <div>
                <span>
                  <label>Mobile : </label> {this.state.userDetails.phone_num}
                </span>
                <span>
                  <label>Email : </label> {this.state.userDetails.email}
                </span>
              </div>
              <div>
                <span>
                  <label>GST No. : </label> {this.state.userDetails.gst_num}
                </span>
              </div>
            </div>
            <div className="bottom_details_con">
                <Button onHandleClick={()=>this.setOpenEditModal(true)} type="blue">Edit Details</Button>
                <Button type="green">Settings</Button>
            </div>
            <Popup openPopup={this.state.openEditModal} title="Edit Profile Details" setOpenEditModal={this.setOpenEditModal}>
              <UserProfileEditForm setOpenEditModal={this.setOpenEditModal} userDetails={this.state.userDetails} resetProfileOnUpdate={this.resetProfileOnUpdate} accountId={this.props.match.params.id}/>
            </Popup>
          </div>
        </div> }
      </div>
    );
  }
          }
