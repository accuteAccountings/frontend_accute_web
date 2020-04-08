import React from 'react';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import AddProducts from '../Components/AddProduct';

class App extends React.Component {


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


    constructor(props) {

        super(props)
        this.AddProCrossBtn = this.AddProCrossBtn.bind(this)


        this.state = {
            AddPro: false
        }

    }

    render() {

        return (

            <div className="app">
                <div className="side">
                    <SideBar AddProCrossBtn={this.AddProCrossBtn} />
                </div>

                <div className="pageBody">

                    <TopBar />

                </div>

                {this.state.AddPro ? <AddProducts AddProCrossBtn={this.AddProCrossBtn} /> : null}




            </div>
        )
    }
}

export default App