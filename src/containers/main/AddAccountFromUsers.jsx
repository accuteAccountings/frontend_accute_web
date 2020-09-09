import React from "react";
import { getData, postData } from "helper/Fetch";

export default class AddAccountFromUsers extends React.Component {
  getUser = async () => {
    let username = document.getElementById("getThisUsername").value;

    let user = await getData("/api/accounts/getUser/" + username);
    this.setState({ user: user });
  };

  addUserToAcc = async () => {
    this.setState({ loading: true });
    let data = {
      acc_name: this.state.user.full_name,
      acc_type: "debtors"
    };
    let res = await postData("/api/accounts", data);
    console.log(res);

    if (res.account) {
      this.setState({ loading: false });
      this.props.AddAccFromUsersCrossBtn();
    } else {
      alert("Error In adding Account");
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false
    };
  }

  render() {
    return (
      <>
        <div className="overlay" />
        <div className="AddAccountFromUsers">
          <h1 className="find_user_heading">Find Users</h1>
          <input id="getThisUsername" placeholder="Enter Username" />
          <button onClick={this.getUser}>Find</button>
          {this.state.user && (
            <div className="UserDetails">
              <img src={this.state.user.pro_img} alt=" " />
              <div className="col">
                <h2>{this.state.user.full_name}</h2>
                <button disabled={this.state.loading} onClick={this.addUserToAcc}>
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
