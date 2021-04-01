import React from "react";
import NavBar from "containers/home/NavBar";
import Landing from "containers/home/Landing";
import Features from "containers/home/Features";
import MenuItems from "containers/home/MenuItems";
import About from "containers/home/About";
import Data from "containers/home/Data";
import Services from "containers/home/Services";
import Pricing from "containers/home/Pricing";
import Quotes from "containers/home/Quotes";
import ContactDet from "containers/home/ContactDet";
import LoginReg from "containers/home/LoginReg";
import Contact from "containers/home/ContactUs";

class Home extends React.Component {
  toggleMenu() {
    this.setState(() => {
      if (this.state.menuItem) return { menuItem: false };
      else return { menuItem: true };
    });
  }
  toggleLogin() {
    this.setState(() => {
      return { loginPage: true };
    });
  }
  toggle_Contact() {
    this.setState(() => {
      return {
        ContactPage: true
      };
    });
  }
  gotohome() {
    this.setState(() => {
      return {
        loginPage: false,
        ContactPage: false
      };
    });
  }

  //   user Define function

  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggle_Contact = this.toggle_Contact.bind(this);
    this.gotohome = this.gotohome.bind(this);

    this.state = {
      menuItem: false,
      loginPage: false,
      ContactPage: false
    };
  }

  render() {
    return (
      <div>
        {this.state.loginPage ? <LoginReg gotohome={this.gotohome} /> : null}
        {this.state.ContactPage && <Contact gotohome={this.gotohome} />}
        <MenuItems
          isOn={this.state.menuItem ? { transform: "translateY(0px)" } : { transform: "translateY(-200vh)" }}
          toggleLogin={this.toggleLogin}
          toggle_Contact={this.toggle_Contact}
        />
        <NavBar
          toggleMenu={this.toggleMenu}
          toggleLogin={this.toggleLogin}
          toggle_Contact={this.toggle_Contact}
          btn={this.state.menuItem ? "cross" : "bar"}
        />
        <Landing />
        <Features />
        <About />
        <Data />
        <Services />
        <Pricing />
        <Quotes />
        <ContactDet />
      </div>
    );
  }
}

export default Home;
