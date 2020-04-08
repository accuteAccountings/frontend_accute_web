import React from 'react'
import MenuBtn from '../img/menu.svg'
import help from '../img/info.svg'
import settings from '../img/settings.svg'

class TopBar extends React.Component {

    render() {

        return (

            <div className="top_bar">

                <img className="menu_btn" src={MenuBtn} alt="" />


                <li className="top_btns help_btn"><span><img src={help} alt="?" /></span> Help</li>
                <li className="top_btns settings_btn"> <span><img src={settings} alt="" /></span> Settings</li>


            </div>
        )
    }
}

export default TopBar