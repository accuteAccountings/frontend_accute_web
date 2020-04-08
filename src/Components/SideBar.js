import React from 'react'
import add_img from '../img/add_img.svg'

class SideBar extends React.Component {

    render() {

        return (

            <div className="side_bar">

                <div className="side_bar_con">

                    <img className="add_img_btn" src={add_img} alt="" />

                    <li className="new_btn" onClick={this.props.AddAccCrossBtn}>

                        <span>New</span> <img src="" alt="" />

                    </li>

                    <li className="side_btn">
                        <span>DashBoard</span>
                        <img src="" alt="" />
                    </li>
                    <li className="side_btn act_s_btn" >
                        <span>Lists</span>
                        <img src="" alt="" />
                    </li>
                    <li className="side_btn">
                        <span>Lists</span>
                        <img src="" alt="" />
                    </li>
                    <li className="side_btn">
                        <span>Reports</span>
                        <img src="" alt="" />
                    </li>

                </div>


            </div>
        )
    }
}

export default SideBar