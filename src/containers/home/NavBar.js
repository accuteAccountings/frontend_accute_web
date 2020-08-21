import React from "react";
import MenuBtn from "./MenuBtn";

window.onscroll = function () {
  myFunction();
};

function myFunction() {
  if (window.scrollY > 130) {
    document.getElementById("nav").style.animationName = "dowhite";
    document.getElementsByClassName("bar")[0].classList.add("black");
    document.getElementsByClassName("bar")[1].classList.add("black");
    document.getElementsByClassName("bar")[2].classList.add("black");
    document.getElementsByClassName("bar")[0].classList.remove("white");
    document.getElementsByClassName("bar")[1].classList.remove("white");
    document.getElementsByClassName("bar")[2].classList.remove("white");
  } else {
    document.getElementById("nav").style.animationName = "dotrans";
    document.getElementsByClassName("bar")[0].classList.add("white");
    document.getElementsByClassName("bar")[1].classList.add("white");
    document.getElementsByClassName("bar")[2].classList.add("white");
    document.getElementsByClassName("bar")[0].classList.remove("black");
    document.getElementsByClassName("bar")[1].classList.remove("black");
    document.getElementsByClassName("bar")[2].classList.remove("black");
  }
}

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav_con" id="nav">
          <div
            className={
              this.props.btn === "cross" ? "logo_con nn cross" : "logo_con nn"
            }
          >
            Acute Accountings
          </div>
          <div className="nn">
            <MenuBtn toggleMenu={this.props.toggleMenu} btn={this.props.btn} />
          <li>Home</li>
          <li id="about_btn">About</li>
          <li>Home</li>
          <li>Home</li>
          <li onClick={this.props.toggle_Contact}>Contact Us</li>
          <li onClick={this.props.toggleLogin}>Login/Register</li>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
