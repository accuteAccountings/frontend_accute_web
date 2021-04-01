import React from "react";
import Home_Page from "./Home"
import UserLists from "containers/admin/user_list";
import Profile from "./Profile";

class App extends React.Component {
  pageHandler = page => {
    this.setState(() => {
      return {
        page: page
      };
    });
  };

  specificUser = (id) => {
    this.setState(() => {
      return{
        userId : id
      }
    })
  }

  getUsers = () => {
    fetch('/api/users')
    .then((res) => res.json())
    .then((data) => {
        this.setState(() => {
          return{
            users : data
          }
        })
    })
  }

  constructor(props) {
    super(props);

    this.getUsers()

    this.state = {
      page: "home",
      users : [],
      userId : 0,
      
    };
  }

  render() {
    return (
      <div className="App">
        <div className="left_border"></div>
        <div className="inner_home_body">
          <div className="upper_border"></div>
          {this.state.page === "home" && <Home_Page pageHandler={this.pageHandler}
           users = {this.state.users} specificUser = {this.specificUser} />}
          {this.state.page === "user_list" && <UserLists pageHandler = {this.pageHandler}
           users = {this.state.users} specificUser = {this.specificUser} />}
          {this.state.page === "profile" && <Profile  user = {this.state.users[this.state.userId]}/>}
        </div>
      </div>
    );
  }
}

export default App;
