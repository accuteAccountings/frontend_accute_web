import React from 'react'
import ref from '../img/refresh.svg'


class NavSec extends React.Component {

    render() {

        return (

            <div className="nav_sec">

                <div className="nav_items">
                    {this.props.navItems.map((item) => {
                        return (<li>{item}</li>)
                    })}
                </div>

                <div className="other_det">
                    <div className="add_account" onClick={this.props.AddProCrossBtn}>

                        + Add Account

                    </div>

                    <img src={ref} alt="" />

                    <input type="text" />
                </div>



            </div>
        )
    }
}

export default NavSec