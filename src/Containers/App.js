import React from 'react';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import AddProducts from '../Components/AddProduct';
import AddAcc from '../Components/AddAcc';
import Clogo from '../Components/Clogo';
import NavSec from '../Components/NavSec';
import ProCon from '../Components/ProCon';
import AddVouch from '../Components/AddVouch';
import Dash from './Dash';

class App extends React.Component {

    navTo(page) {

        this.setState(() => {
            return {
                page: page
            }
        })
    }


    AddProCrossBtn() {


        this.setState(() => {

            if (this.state.AddPro) return {
                AddPro: false
            }

            else return {
                AddPro: true
            }
        })
    }

    AddAccCrossBtn() {


        this.setState(() => {

            if (this.state.AddAcc) return {
                AddAcc: false
            }

            else return {
                AddAcc: true
            }
        })
    }


    constructor(props) {

        super(props)
        this.AddProCrossBtn = this.AddProCrossBtn.bind(this)
        this.AddAccCrossBtn = this.AddAccCrossBtn.bind(this)
        this.navTo = this.navTo.bind(this)


        this.state = {
            AddPro: false,
            AddAcc: false,
            page: "trans"
        }

    }

    render() {

        let currentPage = (null)


        if (this.state.page === "rep") {
            currentPage = (
                <div className="pageBody" >

                    <TopBar />
                    <Clogo />
                    <NavSec AddProCrossBtn={this.AddProCrossBtn}
                        navItems={["Challen Reg.", "Daily Book ", "Ledger"]}
                    />
                    <ProCon />

                </div>

            )
        }

        if (this.state.page === "dash") {
            currentPage = (
                <div className="pageBody" >

                    <TopBar />
                    <Clogo />
                    <Dash addAccBtn={this.AddAccCrossBtn} />

                </div>
            )
        }

        if (this.state.page === "accounting") {

            currentPage = (
                <div className="pageBody" >

                    <TopBar />
                    <Clogo />
                    <NavSec AddProCrossBtn={this.AddProCrossBtn}
                        navItems={["Accounts ", "Products"]}
                    />
                    <ProCon />

                </div>

            )

        }
        if (this.state.page === "trans") {

            currentPage = (
                <div className="pageBody" >

                    <TopBar margin={{ marginBottom: "50px" }} />

                    <NavSec AddProCrossBtn={this.AddProCrossBtn} isAddAccount={false}

                    />
                    <AddVouch />

                </div>

            )

        }






        return (

            <div className="app" >
                <div className="side">
                    <SideBar
                        AddAccCrossBtn={this.AddAccCrossBtn}
                        navTo={this.navTo}
                        actPage={this.state.page} />
                </div>

                {currentPage}

                {this.state.AddPro ? <AddProducts AddProCrossBtn={this.AddProCrossBtn} /> : null}
                {this.state.AddAcc ? <AddAcc AddAccCrossBtn={this.AddAccCrossBtn} /> : null}




            </div >
        )
    }
}

export default App