import React from 'react'
import MenuBtn from './../img/menu.svg'
import help from './../img/info.svg'
import settings from './../img/settings.svg'

class TopBar extends React.Component {




    render() {


        let margin = {
            marginBottom: "50px",
        }

        return (

            <div className="top_bar" style={margin}>

                <img className="menu_btn" src={MenuBtn} alt="" />


                <li className="top_btns help_btn"><span><img src={help} alt="?" /></span> Help</li>
                <li className="top_btns settings_btn"> <span><img src={settings} alt="" /></span> Settings</li>


            </div>
        )
    }
}

TopBar.defaultProps = {
    margin: "5px"
}

export default TopBar