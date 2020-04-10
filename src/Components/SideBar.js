import React from 'react'
import add_img from '../img/add_img.svg'

class SideBar extends React.Component {

    navToDash() {
        this.props.navTo("dash")
    }
    navToRep() {
        this.props.navTo("rep")
    }
    navToAcc() {
        this.props.navTo("accounting")
    }

    constructor(props) {
        super(props)
        this.navToDash = this.navToDash.bind(this)
        this.navToRep = this.navToRep.bind(this)
        this.navToAcc = this.navToAcc.bind(this)
    }

    render() {

        return (

            <div className="side_bar">

                <div className="side_bar_con">

                    <img className="add_img_btn" src={add_img} alt="" />

                    <li className="new_btn" onClick={this.props.AddAccCrossBtn}>

                        <span>New</span> <img src="" alt="" />

                    </li>

                    <li className={this.props.actPage === "dash" ? "side_btn act_s_btn" : "side_btn"}
                        onClick={this.navToDash}

                    >

                        <span>DashBoard</span>
                        <img src="" alt="" />

                    </li>
                    <li className={this.props.actPage === "accounting" ? "side_btn act_s_btn" : "side_btn"}
                        onClick={this.navToAcc} >
                        <span>Accounting</span>
                        <img src="" alt="" />
                    </li>
                    <li className={this.props.actPage === "trans" ? "side_btn act_s_btn" : "side_btn"}
                    >
                        <span>Transactions</span>
                        <img src="" alt="" />
                    </li>
                    <li className={this.props.actPage === "rep" ? "side_btn act_s_btn" : "side_btn"}
                        onClick={this.navToRep}
                    >
                        <span>Reports</span>
                        <img src="" alt="" />
                    </li>
                    <li className={this.props.actPage === "agency" ? "side_btn act_s_btn" : "side_btn"}
                        onClick={this.navToAgency}
                    >
                        <span>Agency</span>
                        <img src="" alt="" />
                    </li>

                </div>


            </div >
        )
    }
}

export default SideBar