import React from "react";

class MenuBtn extends React.Component {
  render() {
    return (
      <div className="menu_btn_home" onClick={this.props.toggleMenu}>
        <div className="bar" id={this.props.btn}></div>
        <div className="bar" id={this.props.btn}></div>
        <div className="bar" id={this.props.btn}></div>
      </div>
    );
  }
}

export default MenuBtn;
