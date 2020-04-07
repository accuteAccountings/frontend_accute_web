import React from 'react'
import MenuBtn from '../img/menu.svg'

class TopBar extends React.Component {

    render() {

        return (

            <div className="top_bar">

                <img className="menu_btn" src={MenuBtn} alt="" />


                <li className="top_btns">Help</li>
                <li className="top_btns">Settings</li>


            </div>
        )
    }
}

export default TopBar