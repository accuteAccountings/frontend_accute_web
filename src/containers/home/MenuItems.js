import React from "react";

class MenuItems extends React.Component {
  render() {
    return (
      <div className="menu_item_full" style={this.props.isOn}>
        <div className="menu_con">
          <li>Home</li>
          <li id="about_btn">About</li>
          <li>Home</li>
          <li>Home</li>
          <li onClick={this.props.toggle_Contact}>Contact Us</li>
          <li onClick={this.props.toggleLogin}>Login/Register</li>
        </div>
      </div>
    );
  }
}

export default MenuItems;
